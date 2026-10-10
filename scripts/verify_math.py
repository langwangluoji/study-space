"""Run reference mathematics and a synthetic training smoke without downloads."""
from pathlib import Path
import subprocess
import sys
import json

root = Path(__file__).resolve().parents[1]
(root / 'reports').mkdir(exist_ok=True)
for file in ['public/downloads/rewrite_reference_checks.py', 'scripts/verify_matrix.py',
             'scripts/verify_theory.py', 'scripts/check_snippets.py','scripts/check_preservation.py']:
    subprocess.run([sys.executable, file], cwd=root, check=True)
smoke = subprocess.run([sys.executable, 'public/downloads/cifar10_mlp_tutorial.py', '--smoke'],
                       cwd=root, check=True, capture_output=True, text=True)
(root/'reports/smoke.json').write_text(json.dumps({'status':'PASS','scope':'synthetic input, one SGD step, no CIFAR download or retraining','output':smoke.stdout.strip()},indent=2)+'\n',encoding='utf-8')
print(smoke.stdout.strip())
