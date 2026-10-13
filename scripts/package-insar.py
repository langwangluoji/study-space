"""Rebuild the downloadable notes from their maintained Markdown and figures."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json, hashlib, re

root=Path(__file__).resolve().parents[1]
figures=root/'public/insar/figures'
manifest=json.loads((figures/'manifest.json').read_text(encoding='utf-8'))
for p in sorted(figures.glob('ch*.svg')):
    if not any(m['file']==p.name for m in manifest):manifest.append({'file':p.name,'source_id':'ORIGINAL','source':'Study Space teaching diagram','operation':'original SVG; schematic, not to scale'})
for record in manifest:
    p=figures/record['file']
    actual=hashlib.sha256(p.read_bytes()).hexdigest()
    if record.get('source_id')=='ORIGINAL':record['sha256']=actual
    elif record['sha256']!=actual:raise ValueError('Source figure changed: '+str(p))
(figures/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
names=['course-insar','insar-microwave','insar-imaging','insar-interpretation','insar-review','insar-sources']
def offline(md):
    md=re.sub(r'^---\n.*?\n---\n','',md,flags=re.S)
    def figure(match):
        props=dict(re.findall(r'(\w+)="([^"]*)"',match.group(0)))
        src=props['src'].split('/')[-1]
        caption=props.get('alt','')+'。来源：'+props.get('source','')
        if not re.search(r'\boriginal\b',match.group(0)):caption+='，文件页 '+props.get('page','')
        if props.get('note'):caption+='。'+props['note']
        return '!['+props.get('alt','')+'](../配图/'+src+')\n\n'+caption+'。'
    md=re.sub(r'<SourceFigure\b[^>]*\s/?>',figure,md)
    for name in names:md=md.replace(']('+name+'.html',']('+name+'.md')
    md=md.replace('](resources.html#insar)','](https://langwangluoji.github.io/study-space/resources.html#insar)')
    md=md.replace('](insar/figures/','](../配图/')
    md=md.replace('](insar/downloads/insar-first-three-chapters.zip)','](https://langwangluoji.github.io/study-space/insar/downloads/insar-first-three-chapters.zip)')
    return md
output=root/'public/insar/downloads/insar-first-three-chapters.zip'
output.parent.mkdir(parents=True,exist_ok=True)
with ZipFile(output,'w',ZIP_DEFLATED) as z:
    for name in names:z.writestr('讲义/'+name+'.md',offline((root/f'docs/{name}.md').read_text(encoding='utf-8')))
    for p in sorted(figures.iterdir()):z.write(p,'配图/'+p.name)
    z.write(root/'public/insar/source-manifest.json','来源原件校验.json')
    z.writestr('README.md','# InSAR 前三章离线讲义\n\n[从课程总览开始](讲义/course-insar.md)。使用支持 LaTeX 数学公式的 Markdown 编辑器阅读；配图已转换为相对路径。线上地址：https://langwangluoji.github.io/study-space/course-insar.html\n\n范围：课堂微波遥感基础、SAR成像原理、SAR图像特征及解译。完整教师PDF与教材不包含在包内。原图署名与页码见讲义/insar-sources.md，均为有限教学引用；整理文字与自绘图供个人学习。\n')
with ZipFile(output) as z:
    assert z.testzip() is None
    assert not any(n.lower().endswith('.pdf') for n in z.namelist())
    assert not any(b'<SourceFigure' in z.read(n) for n in z.namelist() if n.endswith('.md'))
print('InSAR notes package:',output.stat().st_size,'bytes;',len(manifest),'figures')
