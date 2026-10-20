"""Package the editable optics notes without including classroom source files."""
from pathlib import Path
import json,re,zipfile

root=Path(__file__).resolve().parents[1]
pages=['course-optics','optics-waves','optics-incoherent','optics-laser',
       'optics-propagation','optics-electrodynamics','optics-formulas',
       'optics-exercises','optics-sources']
out=root/'public'/'optics'/'光学期中复习_Obsidian.zip'
out.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for slug in pages:
        text=(root/'docs'/(slug+'.md')).read_text(encoding='utf-8')
        text=re.sub(r'^---\n.*?\n---\n','',text,flags=re.S)
        for target in pages:text=text.replace(target+'.html',target+'.md')
        text=re.sub(r'\n## 离线阅读\n.*', '',text,flags=re.S)
        if re.search(r'[A-Z]:[/\\]|tmp/review_build',text):
            raise ValueError('Local reference in public download: '+slug)
        z.writestr(slug+'.md',text)
    z.writestr('.obsidian/app.json',json.dumps({'showInlineTitle':False}))
    z.writestr('开始阅读.md','# 光学复习资料\n\n从 [[course-optics|光学复习入口]] 开始。全部公式可编辑。课件原件不在此包内，版本和页码见 [[optics-sources|课件覆盖与来源]]。\n')
with zipfile.ZipFile(out) as z:
    assert len(z.namelist())==11 and z.testzip() is None
print('Packaged',len(pages),'editable notes:',out.name)
