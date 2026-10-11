"""Verify originals and execution cells against the migration baseline commit."""
from pathlib import Path
import hashlib,json,subprocess
base='7bda518dbc420977d4a2b96c7299e610d6158bf5'
files=subprocess.check_output(['git','ls-tree','-r','--name-only',base,'public/books','public/slides','public/verified-results','public/practice','public/MISSION.md','public/downloads/cifar10_mlp_tutorial.py'],text=True).splitlines()
checks=[]
for file in files:
    old=subprocess.check_output(['git','show',base+':'+file]);now=Path(file).read_bytes()
    compare=now.replace(b'\r\n',b'\n') if file.endswith(('.md','.py')) else now
    assert compare==old, 'Original changed: '+file
    checks.append({'path':file,'sha256':hashlib.sha256(compare).hexdigest(),'unchanged':True,'line_endings':'git-normalized' if file.endswith(('.md','.py')) else 'binary-exact'})
file='public/downloads/CIFAR10_MLP_逐步练习.ipynb'
old=json.loads(subprocess.check_output(['git','show',base+':'+file]));now=json.loads(Path(file).read_text(encoding='utf-8'))
assert len(old['cells'])==len(now['cells'])
for a,b in zip(old['cells'],now['cells']):
    if a['cell_type']=='code':assert a==b,'Notebook execution cell changed'
Path('reports/preservation.json').write_text(json.dumps({'status':'PASS','baseline':base,'files':checks,'notebook_code_and_outputs':'unchanged; one prose reference updated'},indent=2)+'\n',encoding='utf-8')
print('Original files:',len(checks),'and notebook execution cells unchanged')
