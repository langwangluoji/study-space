"""Package the editable optics notes without including classroom source files."""
from pathlib import Path
import json,re,zipfile
from urllib.parse import quote,unquote
from optics_content import local_details

root=Path(__file__).resolve().parents[1]
pages=['course-optics','optics-waves','optics-incoherent','optics-laser',
       'optics-propagation','optics-electrodynamics','optics-formulas',
       'optics-exercises','optics-sources','optics-learning','review-optics','optics-propagation-ii']
figures=[root/'public/optics/figures'/f['file'] for f in json.loads((root/'optics-figures.json').read_text(encoding='utf-8'))['figures']]
def member(z,name,text):
    info=zipfile.ZipInfo(name,(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
    z.writestr(info,text.encode('utf-8') if isinstance(text,str) else text)
heading_targets={}
for slug in pages:
    source=(root/'docs'/(slug+'.md')).read_text(encoding='utf-8')
    targets={}
    for m in re.finditer(r'(?:<a id="([^"]+)"></a>\s*)+(?=#{1,6} )',source):
        heading=re.match(r'#{1,6} (.+)',source[m.end():])[1]
        for anchor in re.findall(r'id="([^"]+)"',m[0]):targets[anchor]=heading
    heading_targets[slug]=targets
out=root/'public'/'optics'/'光学期中复习_Obsidian.zip'
out.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for slug in pages:
        text=(root/'docs'/(slug+'.md')).read_text(encoding='utf-8')
        text=re.sub(r'^---\n.*?\n---\n','',text,flags=re.S)
        for target in pages:text=text.replace(target+'.html',target+'.md')
        text=text.replace('/optics/figures/','assets/ppt/')
        text=local_details(text)
        def native_heading(m):
            filename,anchor=m[1],unquote(m[2]);target=filename.removesuffix('.md') if filename else slug
            title=heading_targets.get(target,{}).get(anchor)
            return ']('+filename+'#'+quote(title,safe='')+')' if title else m[0]
        text=re.sub(r'\]\(([^()#]*?)#([^()]+)\)',native_heading,text)
        text=re.sub(r'\n## 离线阅读\n.*', '',text,flags=re.S)
        if re.search(r'[A-Z]:[/\\]|tmp/review_build',text):
            raise ValueError('Local reference in public download: '+slug)
        member(z,slug+'.md',text)
    for figure in figures:member(z,'assets/ppt/'+figure.name,figure.read_bytes())
    member(z,'.obsidian/app.json',json.dumps({'showInlineTitle':False,'foldHeading':True}))
    member(z,'开始阅读.md','# 光学学习与复习\n\n[[optics-learning|课程内容学习版]]按图示、概念条件、核心公式、短例题和详细推导分层阅读。所有推导采用原生 Markdown 标题，可在 Obsidian 中折叠。\n\n[[review-optics|PPT考点复习版]]仅按六份课堂PPT整理定义、现象条件、核心公式与直观记法，包含光的传播II。\n\n全部入口见 [[course-optics|光学课程总览]]，课件与教材定位见 [[optics-sources|资料来源与公式订正]]。\n')
with zipfile.ZipFile(out) as z:
    assert len(z.namelist())==len(pages)+2+len(figures) and z.testzip() is None
summary=(root/'docs'/'review-optics.md').read_text(encoding='utf-8')
summary=re.sub(r'^---\n.*?\n---\n','',summary,flags=re.S)
summary=re.sub(r'\n## 离线阅读\n.*','',summary,flags=re.S)
legacy=json.loads((root/'optics-legacy-anchors.json').read_text(encoding='utf-8')).get('review-optics',[])
for anchor in legacy:summary=summary.replace('<a id="'+anchor+'"></a>\n','')
for target in pages:
    summary=summary.replace(']('+target+'.html)','](https://langwangluoji.github.io/study-space/'+target+'.html)')
(out.parent/'光学考试复习_概念公式精简版.md').write_bytes((summary.rstrip()+'\n').encode('utf-8'))
with zipfile.ZipFile(out.parent/'光学PPT复习_Obsidian.zip','w',zipfile.ZIP_DEFLATED) as z:
    member(z,'光学PPT复习.md',summary)
    member(z,'.obsidian/app.json',json.dumps({'showInlineTitle':False}))
    member(z,'开始阅读.md','# 光学PPT考点复习\n\n[[光学PPT复习]]按六份课件复习定义、现象条件、公式含义与记忆方法。\n')
print('Packaged',len(pages),'editable notes:',out.name)
