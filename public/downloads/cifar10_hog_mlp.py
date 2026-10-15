"""Learning supplement, not an exact reproduction of the lecture's 57.4%.
Install: pip install torch torchvision opencv-python numpy
Run: python cifar10_hog_mlp.py --epochs 30 --cell 8 --block 3
Outputs metrics.json, confusion.csv and best.pt under --output.
"""
import argparse
import copy
import csv
import json
import platform
from pathlib import Path
import cv2
import numpy as np
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset
from torchvision.datasets import CIFAR10
import torchvision

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--data', default='./data')
    p.add_argument('--output', default='./hog_mlp_results')
    p.add_argument('--epochs', type=int, default=30)
    p.add_argument('--cell', type=int, choices=[2, 4, 8, 16], default=8)
    p.add_argument('--block', type=int, choices=[1, 2, 3, 4], default=3)
    p.add_argument('--seed', type=int, default=42)
    p.add_argument('--limit', type=int, default=0, help='Smoke run size, 0 uses all training data')
    a = p.parse_args()
    if a.epochs < 1 or a.block*a.cell > 32 or a.limit < 0 or 0 < a.limit < 20:
        p.error('epochs>=1, block*cell<=32; limit must be 0 or >=20')
    torch.manual_seed(a.seed)
    np.random.seed(a.seed)
    # CPU avoids silently claiming reproducibility across GPU backends.
    device = torch.device('cpu')
    # Explicit OpenCV settings: gray uint8, unsigned gradients, L2-Hys,
    # threshold .2, gammaCorrection=False, automatic winSigma=-1.
    hog = cv2.HOGDescriptor((32, 32), (a.block*a.cell,)*2,
                            (a.cell,)*2, (a.cell,)*2, 9,
                            1, -1., 0, .2, False, 64, False)
    dim = ((32//a.cell-a.block+1)**2)*a.block*a.block*9
    assert hog.getDescriptorSize() == dim
    train = CIFAR10(a.data, train=True, download=True)
    test = CIFAR10(a.data, train=False, download=True)
    # Split before fitting any dataset-level preprocessing.
    rng = np.random.default_rng(a.seed)
    ids = rng.permutation(len(train))
    if a.limit:
        ids = ids[:min(a.limit, len(ids))]
    nval = max(1, len(ids)//10)
    vi, ti = ids[:nval], ids[nval:]
    testids = np.arange(min(1000, len(test)) if a.limit else len(test))

    def features(dataset, indices):
        out = np.empty((len(indices), dim), dtype=np.float32)
        for k, i in enumerate(indices):
            # torchvision .data is RGB uint8, not OpenCV BGR.
            gray = cv2.cvtColor(dataset.data[i], cv2.COLOR_RGB2GRAY)
            f = hog.compute(gray).reshape(-1)
            assert len(f) == dim and np.isfinite(f).all()
            out[k] = f
        labels = np.asarray(dataset.targets, dtype=np.int64)[indices]
        return out, labels

    print(f'Extracting HOG: dim={dim}, train={len(ti)}, val={len(vi)}')
    xtr, ytr = features(train, ti)
    xv, yv = features(train, vi)
    xt, yt = features(test, testids)
    # Dataset-level scaling is a learning supplement, fitted on train only.
    mean = xtr.mean(axis=0)
    std = np.maximum(xtr.std(axis=0), 1e-6)

    def loader(x, y, shuffle=False):
        ds = TensorDataset(torch.from_numpy((x-mean)/std), torch.from_numpy(y))
        return DataLoader(ds, batch_size=200, shuffle=shuffle, num_workers=0,
                          generator=torch.Generator().manual_seed(a.seed))

    tr = loader(xtr, ytr, True)
    val = loader(xv, yv)
    model = nn.Sequential(nn.Linear(dim, 128), nn.ReLU(), nn.Linear(128, 10)).to(device)
    loss_fn = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

    @torch.no_grad()
    def evaluate(dl):
        model.eval()
        confusion = np.zeros((10, 10), dtype=np.int64)
        for x, y in dl:
            pred = model(x.to(device)).argmax(1).cpu().numpy()
            np.add.at(confusion, (y.numpy(), pred), 1)
        return float(np.trace(confusion)/confusion.sum()), confusion

    best, best_state, best_epoch = -1., None, 0
    history = []
    for epoch in range(1, a.epochs+1):
        model.train()
        total_loss = 0.
        for x, y in tr:
            optimizer.zero_grad()
            loss = loss_fn(model(x.to(device)), y.to(device))
            loss.backward()
            optimizer.step()
            total_loss += loss.item()*len(y)
        acc, _ = evaluate(val)
        history.append({'epoch': epoch, 'train_loss': total_loss/len(ti), 'val_accuracy': acc})
        print(history[-1])
        if acc > best:
            best, best_epoch = acc, epoch
            best_state = copy.deepcopy(model.state_dict())
    model.load_state_dict(best_state)
    # Test exactly once, after selecting the model using validation accuracy.
    acc, cm = evaluate(loader(xt, yt))
    output = Path(a.output)
    output.mkdir(parents=True, exist_ok=True)
    versions = {'python': platform.python_version(), 'torch': str(torch.__version__),
                'torchvision': torchvision.__version__, 'opencv': cv2.__version__,
                'numpy': np.__version__}
    metrics = {'config': vars(a), 'versions': versions, 'dim': dim,
               'gray': True, 'gamma_correction': False, 'signed_gradient': False,
               'normalization': 'L2-Hys threshold .2; train-only standardization',
               'train_count': len(ti), 'val_count': len(vi), 'test_count': len(yt),
               'smoke_run': bool(a.limit), 'best_epoch': best_epoch,
               'best_val_accuracy': best, 'test_accuracy': acc, 'history': history}
    (output/'metrics.json').write_text(json.dumps(metrics, indent=2), encoding='utf-8')
    with (output/'confusion.csv').open('w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['true/pred'] + list(train.classes))
        for name, row in zip(train.classes, cm):
            writer.writerow([name] + row.tolist())
    torch.save({'state_dict': best_state, 'mean': torch.from_numpy(mean),
                'std': torch.from_numpy(std), 'train_indices': ti.tolist(),
                'val_indices': vi.tolist(), 'config': vars(a)}, output/'best.pt')
    print(f'Test accuracy={acc:.4f}; smoke_run={bool(a.limit)}; saved to {output}')

if __name__ == '__main__':
    main()
