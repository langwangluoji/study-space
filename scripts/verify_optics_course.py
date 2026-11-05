"""Check the PPT-numbered reading tree, portable vault, source figures and physics."""
from pathlib import Path
from collections import Counter,defaultdict
from urllib.parse import unquote
from html.parser import HTMLParser
import json,re,hashlib,zipfile,posixpath,math,cmath
import sys
ROOT=Path(__file__).resolve().parents[1]
source_only='--source-only' in sys.argv
config=json.loads((ROOT/'knowledge/optics/course.json').read_text(encoding='utf-8'))
chapters=config['chapters'];assert [c['number'] for c in chapters]==list(range(1,10))
topics=[t for c in chapters for t in c['topics']];assert len(topics)==34
assert len({t['slug'] for t in topics})==34
class Dom(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.depth=0;self.hidden=[];self.h1=0
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='details':self.depth+=1
        if 'id' in attrs:
            self.ids.append(attrs['id'])
            if self.depth and (tag=='a' or tag.startswith('h')):self.hidden.append(attrs['id'])
        if tag=='h1':self.h1+=1
    def handle_endtag(self,tag):
        if tag=='details':self.depth-=1
doms={}
for e in config['exportPages']:
    s=(ROOT/'docs'/(e['slug']+'.md')).read_text(encoding='utf-8')
    assert not re.search(r'[A-Z]:[/\\]|file:///|\[\[|[\x00-\x08\x0b\x0c\x0e-\x1f]',s),e['slug']
    assert s.count('$$')%2==0 and s.count('<details')==s.count('</details>'),e['slug']
    raw=re.sub(r'\$\$.*?\$\$|\$[^$]*\$','',s,flags=re.S) if source_only else (ROOT/'docs/.vitepress/dist'/(e['slug']+'.html')).read_text(encoding='utf-8')
    d=Dom();d.feed(raw);doms[e['slug']]=d
    if not source_only:assert d.h1==1,(e['slug'],d.h1)
    assert not d.hidden,(e['slug'],d.hidden)
    if e in chapters:
        assert len(re.findall('#### 参考答案：第',s))>=6,e['slug']
source=json.loads((ROOT/'optics-course-sources.json').read_text(encoding='utf-8'));assert len(source['sourceFiles'])==7 and len(source['pages'])==332
mapped=defaultdict(set)
for p in source['pages']:
    assert p['pdfPage'] not in mapped[p['sourcePdf']],p
    mapped[p['sourcePdf']].add(p['pdfPage']);assert doms[p['page']].ids.count(p['anchor'])==1,p
    tier=re.search(r'(?<![\d.])('+re.escape(p['section'])+r'\.\d+)(?![\d.])',p.get('textTitle',''))
    if tier:
        body=(ROOT/'docs'/(p['page']+'.md')).read_text(encoding='utf-8')
        assert re.search(r'(?m)^#{2,5} '+re.escape(tier[1])+r'(?:[^\d]|$)',body),(p['page'],tier[1])
for f in source['sourceFiles']:assert mapped[f['filename']]==set(range(1,f['pages']+1)),f['filename']
figures=json.loads((ROOT/'optics-figures.json').read_text(encoding='utf-8'))['figures'];assert figures
for t in topics:assert '![' in (ROOT/'docs'/(t['slug']+'.md')).read_text(encoding='utf-8'),t['slug']+' no teaching figure'
for f in figures:
    data=(ROOT/'public/optics/figures'/f['file']).read_bytes();assert hashlib.sha256(data).hexdigest()==f['sha256']
    assert f['pdfPage'] in mapped[f['sourcePdf']]
    assert len(f['cropPixels'])==4

def vault_links(path):
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None
        members=set(z.namelist());notes={name:z.read(name).decode('utf-8') for name in members if name.endswith('.md')}
        assert '.obsidian/snippets/optics-priority.css' in members,'Offline emphasis stylesheet missing'
        assert 'optics-priority' in json.loads(z.read('.obsidian/appearance.json'))['enabledCssSnippets']
        provenance=json.loads(z.read('assets/ppt/figures.json'))['figures']
        for f in provenance:
            assert hashlib.sha256(z.read('assets/ppt/'+f['file'])).hexdigest()==f['sha256']
            assert all(key in f for key in ('sourcePdf','pdfPage','cropPixels'))
        assert {f['file'] for f in provenance}=={Path(n).name for n in members if n.startswith('assets/ppt/') and n.endswith('.png')}
        for name,s in notes.items():
            assert '<details' not in s and 'optics-detail:' not in s,name
            assert not re.search(r'[A-Z]:[/\\]|file:///',s),name
            for dest in re.findall(r'\]\(([^()]+)\)',s):
                if dest.startswith(('http:','https:','#','mailto:')):continue
                target,_,anchor=unquote(dest.strip('<>')).partition('#')
                resolved=posixpath.normpath(posixpath.join(posixpath.dirname(name),target))
                assert resolved in members,(name,dest,resolved)
                if anchor and resolved in notes:
                    titles=re.findall(r'(?m)^#{1,6} (.+)$',notes[resolved]);ids=re.findall(r'<a id="([^"]+)"></a>',notes[resolved])
                    assert anchor in titles,(name,dest,'native Obsidian heading fragment')
        return len(notes)
full_notes=vault_links(ROOT/'public/optics/光学期中复习_Obsidian.zip')
review_notes=vault_links(ROOT/'public/optics/光学PPT复习_Obsidian.zip')

# Independent checks: solve boundary equations, then compare energy and limiting cases.
numerical=0
def close(a,b,tol=1e-10):
    global numerical
    assert abs(a-b)<tol,(a,b);numerical+=1
for n1,n2 in [(1.,1.5),(1.5,1.),(1.33,1.7)]:
    for degree in [0,10,25,40,55,70,85]:
        i=math.radians(degree);ci=math.cos(i);st=n1/n2*math.sin(i);ct=cmath.sqrt(1-st*st)
        rs=(n1*ci-n2*ct)/(n1*ci+n2*ct);ts=2*n1*ci/(n1*ci+n2*ct)
        rp=(n2*ci-n1*ct)/(n2*ci+n1*ct);tp=2*n1*ci/(n2*ci+n1*ct)
        close(1+rs,ts);close(n1*ci*(1-rs),n2*ct*ts)
        close(ci*(1-rp),ct*tp);close(n1*(1+rp),n2*tp)
        if st<=1:
            close(abs(rs)**2+(n2*ct.real)/(n1*ci)*abs(ts)**2,1)
            close(abs(rp)**2+(n2*ct.real)/(n1*ci)*abs(tp)**2,1)
        else:close(abs(rs),1);close(abs(rp),1)
i=math.atan(1.5);t=math.asin(math.sin(i)/1.5);close(i+t,math.pi/2)
close((1.5*math.cos(i)-math.cos(t))/(1.5*math.cos(i)+math.cos(t)),0)
close(2*math.pi*.01*15e-6/600e-9,math.pi/2)
close(100/2*math.cos(math.pi/6)**2*math.cos(math.pi/3)**2,9.375)
close((math.radians(20)*600e-9)/(math.pi*.001),6.666666666666667e-5)
report={'status':'PASS','chapters':9,'independentSections':34,'pptFiles':7,'pptPages':332,'sourceFigures':len(figures),'fullVaultNotes':full_notes,'reviewVaultNotes':review_notes,'independentBoundaryAndPolarizationChecks':numerical,'sourceTargetsVisible':True}
(ROOT/'reports/optics-course-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Optics course PASS:',report)
