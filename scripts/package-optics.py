"""Package the editable optics notes without including classroom source files."""
from pathlib import Path
import json,re,zipfile

root=Path(__file__).resolve().parents[1]
pages=['course-optics','optics-waves','optics-incoherent','optics-laser',
       'optics-propagation','optics-electrodynamics','optics-formulas',
       'optics-exercises','optics-sources','optics-learning','review-optics']
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
    z.writestr('开始阅读.md','# 光学学习与复习\n\n[[optics-learning|课程内容学习版]]保留概念解释、完整推导和例题。\n\n[[review-optics|考试概念公式精简版]]集中查阅概念、公式、条件与解题起点。\n\n全部入口见 [[course-optics|光学课程总览]]，课件与教材定位见 [[optics-sources|资料来源与公式订正]]。\n')
with zipfile.ZipFile(out) as z:
    assert len(z.namelist())==len(pages)+2 and z.testzip() is None
summary=(root/'docs'/'review-optics.md').read_text(encoding='utf-8')
summary=re.sub(r'^---\n.*?\n---\n','',summary,flags=re.S)
summary=re.sub(r'\n## 离线阅读\n.*','',summary,flags=re.S)
legacy=json.loads((root/'optics-legacy-anchors.json').read_text(encoding='utf-8')).get('review-optics',[])
for anchor in legacy:summary=summary.replace('<a id="'+anchor+'"></a>\n','')
for target in pages:
    summary=summary.replace(']('+target+'.html)','](https://langwangluoji.github.io/study-space/'+target+'.html)')
(out.parent/'光学考试复习_概念公式精简版.md').write_bytes((summary.rstrip()+'\n').encode('utf-8'))
print('Packaged',len(pages),'editable notes:',out.name)
