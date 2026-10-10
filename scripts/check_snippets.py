"""Execute complete optional NumPy examples; practice snippets are extracted, not duplicated."""
from pathlib import Path
import re, subprocess, sys, tempfile, json
results=[]
for p in Path('docs/_fragments').glob('*.md'):
    if p.stem.startswith('p'):continue
    for i,code in enumerate(re.findall(r'```python\n([\s\S]*?)```',p.read_text(encoding='utf-8'))):
        with tempfile.TemporaryDirectory() as tmp:
            file=Path(tmp)/'snippet.py';file.write_text(code,encoding='utf-8')
            output=subprocess.run([sys.executable,str(file)],check=True,capture_output=True,text=True)
            results.append({'fragment':p.name,'snippet':i+1,'status':'PASS','output':output.stdout.strip()})
Path('reports/snippets.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8');print('Complete snippets:',len(results),'PASS')
