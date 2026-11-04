"""Package processed notes and assets; exclude personal state and teaching originals."""
import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

parser=argparse.ArgumentParser()
parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
vault=root/'knowledge/geodesy'
files=[]
for p in vault.rglob('*'):
    if not p.is_file(): continue
    rel=p.relative_to(vault)
    if rel.parts[0]=='学习笔记' or p.name.startswith('workspace'): continue
    if p.suffix.lower() not in {'.md','.json','.svg','.png','.jpg','.html'}: continue
    if rel.parts[0]=='.obsidian' and p.name not in {'app.json','appearance.json','core-plugins.json'}: continue
    files.append(p)
args.output.parent.mkdir(parents=True,exist_ok=True)
with ZipFile(args.output,'w',ZIP_DEFLATED) as z:
    for p in sorted(files): z.write(p,'大地测量自学知识库/'+p.relative_to(vault).as_posix())
with ZipFile(args.output) as z:
    assert z.testzip() is None
    assert len(z.namelist())==len(files)
    for p in files:
        assert z.read('大地测量自学知识库/'+p.relative_to(vault).as_posix())==p.read_bytes()
report=dict(status='PASS',date='2026-11-04',archive=args.output.name,files=len(files),bytes=args.output.stat().st_size,
            sha256=hashlib.sha256(args.output.read_bytes()).hexdigest(),crc='PASS',byte_equality='all archived files match canonical vault',
            excluded=['complete PDF/PPTX/DOCX teaching originals','workspace state','personal study notes'])
(root/'reports/geodesy-figures-offline.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
