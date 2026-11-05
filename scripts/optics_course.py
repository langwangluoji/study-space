"""Publish the PPT-numbered optics course from its native Obsidian folders."""
from pathlib import Path
from difflib import SequenceMatcher
from urllib.parse import unquote,quote
import json,re,shutil,hashlib,zipfile,html,unicodedata,posixpath
from optics_content import PAGES,portable_links,web_details,local_details
ROOT=Path(__file__).resolve().parents[1]

def compile_lesson(text,links,current_file=''):
    previous=dict(PAGES)
    try:
        PAGES.update(links)
        out=[];pos=0;parent=posixpath.dirname(current_file)
        while True:
            begin=text.find('](',pos)
            if begin<0:out.append(text[pos:]);break
            out.append(text[pos:begin]);end=begin+2;depth=1
            while end<len(text) and depth:
                if text[end]=='\\':end+=2;continue
                if text[end]=='(':depth+=1
                elif text[end]==')':depth-=1
                end+=1
            raw=text[begin:end];dest=unquote(text[begin+2:end-1].strip('<>'));name,sep,anchor=dest.partition('#')
            full=posixpath.normpath(posixpath.join(parent,name))
            if name and full in links:raw=']('+links[full]+'.html'+(('#'+anchor) if sep else '')+')'
            out.append(raw);pos=end
        text=''.join(out)
        text=re.sub(r'\]\((?:\.\./)+assets/ppt/','](assets/ppt/',text)
        text=portable_links(text)
        text=re.sub(r'^---\n.*?\n---\n','',text,flags=re.S)
        return web_details(text)
    finally:PAGES.clear();PAGES.update(previous)

def contrast_ratio(a,b):
    def luminance(color):
        parts=[int(color[i:i+2],16)/255 for i in (1,3,5)]
        parts=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in parts]
        return sum(x*w for x,w in zip(parts,(.2126,.7152,.0722)))
    hi,lo=sorted((luminance(a),luminance(b)),reverse=True)
    return (hi+.05)/(lo+.05)

def slugify(title):
    s=unicodedata.normalize('NFKD',title);s=re.sub(r'[\u0300-\u036f\x00-\x1f]','',s)
    s=re.sub(r'''[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+''','-',s)
    s=re.sub('-{2,}','-',s).strip('-').lower()
    return '_'+s if s[:1].isdigit() else s

def legacy_aliases(slug,body):
    legacy=json.loads((ROOT/'optics-legacy-anchors.json').read_text(encoding='utf-8'))
    records=json.loads((ROOT/'scripts/optics-legacy-headings.json').read_text(encoding='utf-8'))
    headings=list(re.finditer(r'(?m)^(#{1,6}) (.+)$',body));pending={};known={x['id']:x for x in records.get(slug,[])}
    for anchor in legacy.get(slug,[]):
        if 'id="'+anchor+'"' in body or any(slugify(m[2])==anchor for m in headings):continue
        rec=known.get(anchor,{'title':anchor,'level':2})
        candidates=headings
        subject=rec['title'].lower()+' '+anchor.lower()
        preferred=[]
        subject_rules=[
            (r'激光器的三要素|激光三要素',r'激光三要素'),
            (r'sase|种子自由电子',r'FEL的运行模式|噪声.*种子'),
            (r'什么是黑体|黑体为什么',r'基尔霍夫.*黑体'),
            (r'能级寿命|自然线宽',r'正常布居.*寿命.*宽度'),
            (r'粒子数反转',r'吸收.*增益.*粒子数反转'),
            (r'起振阈值|阈值条件',r'阈值.*往返增益'),
        ]
        for pattern,target_pattern in subject_rules:
            if re.search(pattern,subject):
                preferred=[m for m in headings if re.search(target_pattern,m[2],re.I)]
                if preferred:break
        if preferred:candidates=preferred
        # Subject similarity precedes heading depth: a former H2 concept may
        # legitimately become H4 inside the new chapter review.
        target=max(candidates,key=lambda m:SequenceMatcher(None,re.sub(r'^\d+[.\s]*','',rec['title']),re.sub(r'^\d+[.\s]*','',m[2])).ratio())
        pending.setdefault(target.start(),[]).append(anchor)
    for pos,ids in sorted(pending.items(),reverse=True):body=body[:pos]+''.join('<a id="'+html.escape(x,quote=True)+'"></a>\n' for x in ids)+'\n'+body[pos:]
    return body

def front(title,prev=None,next=None):
    return '---\ntitle: '+json.dumps(title,ensure_ascii=False)+'\noutline: [2, 3]\nprev: '+json.dumps(prev or False,ensure_ascii=False)+'\nnext: '+json.dumps(next or False,ensure_ascii=False)+'\n---\n\n'

def publish(vault):
    config=json.loads((vault/'课程目录.json').read_text(encoding='utf-8'));chapters=config['chapters'];pages=json.loads((vault/'课件逐页对应.json').read_text(encoding='utf-8'))['pages']
    all_pages=[x for c in chapters for x in [c,*c['topics'],c['review']]]
    entries=[*all_pages,*config['supportPages']]
    stems={}
    for e in entries:stems.setdefault(Path(e['localFile']).stem,[]).append(e['slug'])
    links={stem:slugs[0] for stem,slugs in stems.items() if len(slugs)==1}
    links.update({e['localFile']:e['slug'] for e in entries});links.update({e['slug']:e['slug'] for e in entries})
    course_dir=ROOT/'knowledge/optics/lessons';course_dir.mkdir(parents=True,exist_ok=True)
    ordered=[t for c in chapters for t in c['topics']]
    local_sources={}
    for e in entries:
        raw=(vault/e['localFile']).read_text(encoding='utf-8-sig');local_sources[e['slug']]=raw
        # Store portable authoring Markdown, rather than machine-specific original links.
        portable=compile_lesson(raw,links,e['localFile'])
        source=local_details(portable)
        e['source']='knowledge/optics/lessons/'+e['slug']+'.md'
        (course_dir/(e['slug']+'.md')).write_bytes((source.rstrip()+'\n').encode('utf-8'))
        body=portable
        records=[p for p in pages if p['page']==e['slug']]
        if records:
            # Prefer the original PPT's third-level heading, retaining a visible
            # lesson-title target for title/review slides and missing headings.
            headings=list(re.finditer(r'(?m)^(#{1,6}) (.+)$',body));pending={}
            for p in records:
                sub=re.search(r'(?<![\d.])('+re.escape(p['section'])+r'\.\d+)(?![\d.])',p.get('textTitle',''))
                target=next((h for h in headings if sub and re.match(re.escape(sub[1])+r'(?:[^\d]|$)',h[2])),headings[0])
                p['learningHeading']=target[2];pending.setdefault(target.start(),[]).append(p['anchor'])
            for pos,ids in sorted(pending.items(),reverse=True):body=body[:pos]+''.join('<a id="'+x+'"></a>\n' for x in ids)+'\n'+body[pos:]
        if e['slug'] in ('course-optics','optics-learning','optics-sources','review-optics'):body=legacy_aliases(e['slug'],body)
        prev_link=next_link=None
        if e in ordered:
            index=ordered.index(e);previous=ordered[index-1] if index else chapters[0];following=ordered[index+1] if index+1<len(ordered) else chapters[-1]['review']
            prev_link={'text':previous['title'],'link':'/'+previous['slug']+'.html'};next_link={'text':following['title'],'link':'/'+following['slug']+'.html'}
        body+='\n\n## 离线阅读\n\n[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。\n'
        # The generated download heading can also be a preserved old target.
        body=body.replace('<a id="离线阅读"></a>\n','')
        assert not re.search(r'[A-Z]:[/\\]|file:///|optics-detail:|[\x00-\x08\x0b\x0c\x0e-\x1f]',body),e['slug']
        (ROOT/'docs'/(e['slug']+'.md')).write_bytes((front(e['title'],prev_link,next_link)+body.rstrip()+'\n').encode('utf-8'))
    # Old full-length pages remain usable for existing links, with a clear route
    # to the new course. Their existing IDs and detailed derivations are retained.
    for slug in ['optics-waves','optics-incoherent','optics-laser','optics-propagation','optics-propagation-ii']:
        p=ROOT/'docs'/(slug+'.md');s=p.read_text(encoding='utf-8')
        if '<!-- optics-legacy-notice -->' not in s:
            m=re.search(r'(?m)^# .+\n',s);s=s[:m.end()]+'\n<!-- optics-legacy-notice -->\n> 这篇保留原整讲定位；按PPT第1—9章和独立小节学习，请进入[新版课程目录](optics-learning.html)。新增界面调控见[第9章](optics-ch09.html)。\n'+s[m.end():];p.write_bytes(s.encode('utf-8'))
    public=ROOT/'public/optics/figures';public.mkdir(parents=True,exist_ok=True)
    provenance=json.loads((vault/'assets/ppt/figures.json').read_text(encoding='utf-8'))['figures'];figures=[]
    rendered={e['slug']:(ROOT/'docs'/(e['slug']+'.md')).read_text(encoding='utf-8') for e in entries}
    for f in provenance:
        uses=[slug for slug,text in rendered.items() if '/optics/figures/'+f['file'] in text]
        if not uses:continue
        src=vault/'assets/ppt'/f['file'];data=src.read_bytes();shutil.copy2(src,public/f['file'])
        figures.append({**f,'learningPage':uses[0]+'.html','learningPages':[x+'.html' for x in uses],'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
    (ROOT/'optics-figures.json').write_bytes((json.dumps({'source':'PPT source illustrations with page captions','figures':figures},ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    (ROOT/'optics.config.json').write_bytes((json.dumps(chapters,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    (ROOT/'optics-course-sources.json').write_bytes((json.dumps({'sourceFiles':config['sourceFiles'],'pages':pages,'scope':'PPT chapter order, teaching derivations separately explained'},ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    review={'date':'2026-11-05','sourceKind':'classroom-PPT-PDF','pages':sum(f['pages'] for f in config['sourceFiles']),'files':config['sourceFiles'],'scope':'ppt-only'}
    (ROOT/'optics-ppt-review-sources.json').write_bytes((json.dumps(review,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    space=json.loads((ROOT/'study-space.config.json').read_text(encoding='utf-8'));course=next(c for c in space['courses'] if c['id']=='optics')
    course.update(summary='按PPT第1—9章学习：34个独立小节，课件解释图、核心条件、逐步推导与概念思考题；另有按章PPT复习。',scope='7份PPT · 332页 · 第1—9章',chapters=[{'slug':c['slug'],'title':'第'+str(c['number'])+'章 '+c['title'],'topics':[{'slug':t['slug'],'title':t['title']} for t in c['topics']]} for c in chapters])
    (ROOT/'study-space.config.json').write_bytes((json.dumps(space,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    archives=[]
    for p in (vault/'参考与旧版').glob('*.md'):
        if p.name[:2] in ('00','08','09','10'):continue
        slug=PAGES.get(p.stem)
        if not slug:continue
        dest=ROOT/'knowledge/optics/archive'/p.name;dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes((local_details(compile_lesson(p.read_text(encoding='utf-8'),links,'参考与旧版/'+p.name)).rstrip()+'\n').encode('utf-8'))
        archives.append({'slug':slug,'localFile':'参考与旧版/'+p.name,'source':str(dest.relative_to(ROOT)).replace('\\','/')})
    config['archivePages']=archives;config['exportPages']=entries
    (ROOT/'knowledge/optics/course.json').write_bytes((json.dumps(config,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    package(None,config,figures)
    print('PPT course exported:',len(chapters),'chapters,',len(ordered),'independent sections,',len(pages),'PPT pages,',len(figures),'figures.')

def package(vault=None,config=None,figures=None):
    if config is None:config=json.loads((ROOT/'knowledge/optics/course.json').read_text(encoding='utf-8'))
    if figures is None:figures=json.loads((ROOT/'optics-figures.json').read_text(encoding='utf-8'))['figures']
    entries=config['exportPages'];all_entries=[*entries,*config.get('archivePages',[])];slug_to_file={e['slug']:e['localFile'] for e in all_entries}
    def source(e):
        return (vault/e['localFile']).read_text(encoding='utf-8-sig') if vault else (ROOT/e['source']).read_text(encoding='utf-8')
    def member(z,name,data):
        info=zipfile.ZipInfo(name,(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data.encode('utf-8') if isinstance(data,str) else data)
    native_targets={}
    for e in all_entries:
        native=local_details(web_details(source(e)))
        titles=re.findall(r'(?m)^#{1,6} (.+)$',native)
        doc=ROOT/'docs'/(e['slug']+'.md')
        compiled=doc.read_text(encoding='utf-8') if doc.exists() else native
        targets={slugify(title):title for title in titles}
        for match in re.finditer(r'<a id="([^"]+)"></a>',compiled):
            heading=re.search(r'(?m)^#{1,6} (.+)$',compiled[match.end():])
            if not heading:continue
            title=heading[1]
            if title not in titles:title=next((x for x in titles if re.sub(r'^\d+\s+','',x)==title),None)
            if title:targets[match[1]]=title
        native_targets[e['localFile']]=targets
    def offline(e):
        text=local_details(web_details(source(e)));parent=posixpath.dirname(e['localFile'])
        for slug,target in slug_to_file.items():text=text.replace(slug+'.html',quote(posixpath.relpath(target,parent or '.'),safe='/'))
        text=text.replace('/optics/figures/',posixpath.relpath('assets/ppt',parent or '.')+'/')
        # Original source documents are indexed online; classroom originals stay
        # outside this portable public download.
        text=re.sub(r'\]\((?:<)?file:///[^)]+(?:>)?\)','](https://langwangluoji.github.io/study-space/optics-sources.html)',text)
        def native_heading(m):
            raw=m[1];dest=unquote(raw);name,sep,anchor=dest.partition('#')
            if not sep or name.startswith(('http:','https:')):return m[0]
            target=posixpath.normpath(posixpath.join(parent,name)) if name else e['localFile']
            heading=native_targets.get(target,{}).get(anchor)
            return ']('+raw.split('#',1)[0]+'#'+quote(heading,safe='')+')' if heading else m[0]
        text=re.sub(r'\]\(([^()]+)\)',native_heading,text)
        return text
    dest=ROOT/'public/optics/光学期中复习_Obsidian.zip'
    with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
        for e in all_entries:member(z,e['localFile'],offline(e))
        for f in figures:member(z,'assets/ppt/'+f['file'],(ROOT/'public/optics/figures'/f['file']).read_bytes())
        member(z,'assets/ppt/figures.json',json.dumps({'figures':figures},ensure_ascii=False,indent=2)+'\n')
        member(z,'开始阅读.md','# 光学课程知识库\n\n[[00 内容规划与阅读入口]]按PPT第1—9章进入34个独立小节。每章有概念题与思考题；[[10 考试复习概念公式精简版]]进入按章复习。\n')
        member(z,'.obsidian/app.json',json.dumps({'showInlineTitle':False,'foldHeading':True}))
        member(z,'.obsidian/appearance.json',json.dumps({'enabledCssSnippets':['optics-priority']}))
        member(z,'.obsidian/snippets/optics-priority.css',(ROOT/'docs/.vitepress/theme/optics.css').read_text(encoding='utf-8'))
    review_pages=[c['review'] for c in config['chapters']];review_main=next(e for e in entries if e['slug']=='review-optics')
    review_files={e['localFile'] for e in [review_main,*review_pages]};file_to_slug={e['localFile']:e['slug'] for e in all_entries}
    def review_offline(e):
        text=offline(e);parent=posixpath.dirname(e['localFile'])
        def link(m):
            dest=unquote(m[1]);name,sep,anchor=dest.partition('#')
            if not name or name.startswith(('http:','https:')):return m[0]
            absolute=posixpath.normpath(posixpath.join(parent,name))
            if absolute in file_to_slug and absolute not in review_files:
                return '](https://langwangluoji.github.io/study-space/'+file_to_slug[absolute]+'.html'+(('#'+anchor) if sep else '')+')'
            return m[0]
        return re.sub(r'\]\(([^()]+)\)',link,text)
    with zipfile.ZipFile(ROOT/'public/optics/光学PPT复习_Obsidian.zip','w',zipfile.ZIP_DEFLATED) as z:
        for e in [review_main,*review_pages]:member(z,e['localFile'],review_offline(e))
        used=set(re.findall(r'assets/ppt/([^\)]+)', ''.join(review_offline(e) for e in review_pages)))
        for name in sorted(used):member(z,'assets/ppt/'+name,(ROOT/'public/optics/figures'/name).read_bytes())
        member(z,'assets/ppt/figures.json',json.dumps({'figures':[f for f in figures if f['file'] in used]},ensure_ascii=False,indent=2)+'\n')
        member(z,'开始阅读.md','# 光学PPT考点复习\n\n[[10 考试复习概念公式精简版]]按第1—9章检查概念、条件与公式直觉。\n')
        member(z,'.obsidian/app.json',json.dumps({'showInlineTitle':False,'foldHeading':True}))
    standalone=(ROOT/'docs/review-optics.md').read_text(encoding='utf-8');standalone=re.sub(r'^---\n.*?\n---\n','',standalone,flags=re.S);standalone=local_details(standalone)
    for slug in slug_to_file:standalone=standalone.replace(']('+slug+'.html','](https://langwangluoji.github.io/study-space/'+slug+'.html')
    standalone=standalone.replace('](/optics/','](https://langwangluoji.github.io/study-space/optics/')
    (ROOT/'public/optics/光学考试复习_概念公式精简版.md').write_bytes(standalone.encode('utf-8'))
