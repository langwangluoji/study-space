"""独立核对教材化讲义的关键算例；不下载数据、不训练 CIFAR-10。"""
import json
import numpy as np
import torch


def main():
    torch.set_default_dtype(torch.float64)
    x = np.array([[1., 0.], [1., 1.], [1., 2.]])
    t = np.array([1., 2., 2.])
    w = np.linalg.lstsq(x, t, rcond=None)[0]
    r = x @ w - t
    loss = float(r @ r / (2 * len(t)))
    np.testing.assert_allclose(w, [7/6, .5], atol=1e-12)
    np.testing.assert_allclose(x.T @ r, 0., atol=1e-12)
    np.testing.assert_allclose(loss, 1/36, atol=1e-12)
    sigma2, tau2 = 4., 2.
    precision = x.T @ x / sigma2 + np.eye(2) / tau2
    covariance = np.linalg.solve(precision, np.eye(2))
    mean = np.linalg.solve(precision, x.T @ t / sigma2)
    lam = sigma2 / (len(t) * tau2)
    ridge = np.linalg.solve(x.T @ x + len(t)*lam*np.eye(2), x.T @ t)
    np.testing.assert_allclose(mean, ridge, atol=1e-12)
    assert np.all(np.linalg.eigvalsh(covariance) > 0)
    logits = torch.tensor([[1000., 1001., 999.]])
    stable_ce = torch.nn.functional.cross_entropy(logits, torch.tensor([1]))
    assert abs(stable_ce.item() - .4076059644443804) < 1e-10
    assert abs(torch.nn.functional.cross_entropy(torch.zeros((1, 10)), torch.tensor([0])).item() - np.log(10)) < 1e-12

    # 第三讲 C4 的同一个 2-2-2 网络，数学中样本按列。
    inp = np.array([.5, -1.])
    target = np.array([1., 0.])
    pars = [np.array([[.2, -.4], [.7, .1]]), np.array([.1, -.2]),
            np.array([[.3, -.5], [-.2, .4]]), np.array([.05, -.1])]

    def forward(params):
        w1, b1, w2, b2 = params
        a1 = w1 @ inp + b1
        z = 1/(1+np.exp(-a1))
        a2 = w2 @ z + b2
        m = np.max(a2)
        p = np.exp(a2-m); p /= p.sum()
        objective = float(m + np.log(np.exp(a2-m).sum()) - a2[0])
        return objective, a1, z, a2, p

    before, a1, z, a2, p = forward(pars)
    d2 = p - target
    d1 = z*(1-z)*(pars[2].T @ d2)
    grads = [np.outer(d1, inp), d1, np.outer(d2, z), d2]
    tensor_pars = [torch.tensor(a, requires_grad=True) for a in pars]
    w1, b1, w2, b2 = tensor_pars
    torch_logits = w2 @ torch.sigmoid(w1 @ torch.tensor(inp) + b1) + b2
    torch_loss = torch.nn.functional.cross_entropy(torch_logits[None, :], torch.tensor([0]))
    torch_loss.backward()
    assert abs(torch_loss.item() - before) < 1e-12
    for actual, expected in zip(tensor_pars, grads):
        np.testing.assert_allclose(actual.grad.detach().numpy(), expected, rtol=1e-12, atol=1e-12)
    numerical = []
    eps = 1e-5
    for k, par in enumerate(pars):
        g = np.zeros_like(par)
        for index in np.ndindex(par.shape):
            plus, minus = [a.copy() for a in pars], [a.copy() for a in pars]
            plus[k][index] += eps; minus[k][index] -= eps
            g[index] = (forward(plus)[0] - forward(minus)[0]) / (2*eps)
        numerical.append(g)
        np.testing.assert_allclose(g, grads[k], rtol=1e-7, atol=1e-9)
    ana = np.concatenate([a.ravel() for a in grads])
    num = np.concatenate([a.ravel() for a in numerical])
    absolute = float(np.linalg.norm(ana-num))
    relative = absolute/float(np.linalg.norm(ana)+np.linalg.norm(num))
    after = forward([par-.1*g for par, g in zip(pars, grads)])[0]
    assert after < before
    result = {'checks': ['least-squares', 'Gaussian-posterior-MAP', 'stable-cross-entropy',
                         'manual-backprop-vs-autograd', 'central-difference-all-12-parameters'],
              'half_mean_squared_error': loss, 'posterior_mean': mean.tolist(),
              'posterior_covariance': covariance.tolist(), 'lambda_average': lam,
              'hidden_pre': a1.tolist(), 'hidden': z.tolist(), 'logits': a2.tolist(),
              'probabilities': p.tolist(), 'loss_before': before, 'loss_after': after,
              'gradients': [a.tolist() for a in grads], 'epsilon': eps,
              'gradient_absolute_error': absolute, 'gradient_relative_error': relative,
              'python_torch': torch.__version__, 'status':'PASS'}
    print(json.dumps(result, ensure_ascii=True, indent=2))


if __name__ == '__main__':
    main()
