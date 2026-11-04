"""Export optics learning notes from a local Obsidian vault. No source PDF is copied.

Usage: python scripts/sync-optics.py --vault /path/to/光学期中复习
"""
from pathlib import Path
from difflib import SequenceMatcher
import argparse,re,json,hashlib,shutil,html
from optics_content import PAGES,portable_links,web_details,merge_figures

ROOT=Path(__file__).resolve().parents[1]
LEARNING=['optics-waves','optics-incoherent','optics-laser','optics-propagation','optics-propagation-ii']

def export(vault):
    legacy=json.loads((ROOT/'optics-legacy-anchors.json').read_text(encoding='utf-8'))
    records=json.loads((ROOT/'scripts/optics-legacy-headings.json').read_text(encoding='utf-8'))
    source_map=json.loads((ROOT/'optics-learning-source-map.json').read_text(encoding='utf-8'))
    actual_figures=[];reports=[]
    for stem,slug in PAGES.items():
        if slug not in LEARNING+['course-optics','optics-learning','optics-sources']:continue
        source=(vault/(stem+'.md')).read_text(encoding='utf-8-sig').replace('\ufeff','')
        source=re.sub(r'^---\n.*?\n---\n','',source,flags=re.S)
        source=re.sub(r'^# \d{2} (.+)$',r'# \1',source,flags=re.M)
        source=re.sub(r'\n<!-- optics-local-record:start -->.*?<!-- optics-local-record:end -->\n?','\n',source,flags=re.S)
        source=re.sub(r'```mermaid\n.*?```\n?','',source,flags=re.S)
        source=re.sub(r'^> \[!(?:important|note|abstract|tip|warning)\].*$','> 阅读说明',source,flags=re.M)
        source=source.replace('教材逐段对照记录：`tmp/textbook_update/wave-audit.md`。','教材公式与课件页码见[资料来源与公式订正](optics-sources.html)。')
        source=portable_links(source)
        source=re.sub(r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]',lambda m:'['+(m[2] or m[1])+']('+PAGES.get(m[1],m[1])+'.html)',source)
        source=web_details(source)
        # Include generated headings before resolving legacy targets to avoid
        # creating an explicit alias with the same ID as the download heading.
        if '## 离线阅读' not in source:
            source+='\n## 离线阅读\n\n[下载学习与复习笔记包](/optics/光学期中复习_Obsidian.zip)，解压后在 Obsidian 中打开。公式可编辑，插图可离线阅读。\n'
        headings=list(re.finditer(r'(?m)^(#{1,6}) (.+)$',source));titles={m[2] for m in headings}
        pending={}
        known={item['id']:item for item in records.get(slug,[])}
        for anchor in legacy.get(slug,[]):
            rec=known.get(anchor,{'title':anchor,'level':2})
            if rec['title'] in titles or 'id="'+anchor+'"' in source:continue
            same=[m for m in headings if len(m[1])==rec['level']] or headings
            number=re.match(r'^\d+(?:\.\d+)*',rec['title']);target=None
            if number:target=next((m for m in same if re.match('^'+re.escape(number[0])+r'(?:\D|$)',m[2])),None)
            if target is None:target=max(same,key=lambda m:SequenceMatcher(None,rec['title'],m[2]).ratio())
            pending.setdefault(target.start(),[]).append(anchor)
        # Every source page has a resolvable named target at its learning section.
        chapter=next((c for c in source_map['chapters'] if c['chapter']==slug),None)
        if chapter:
            for item in chapter['pages']:
                page=item.get('pdf_page',item.get('page'));kind=item.get('source','ppt')
                label=item['learning_section'];number=re.search(r'(?:§|第\s*)?(\d+(?:\.\d+)*)',label)
                number=number[1] if number else None
                target=next((m for m in headings if number and re.match('^'+re.escape(number)+r'(?:[.\s]|$)',m[2])),headings[0])
                anchor='ppt-'+str(kind).lower()+'-'+str(page)
                item['learningAnchor']=anchor;item['learningUrl']=slug+'.html#'+anchor;item['learningHeading']=target[2]
                pending.setdefault(target.start(),[]).append(anchor)
            reports.append({'chapter':slug,'mappedPages':len(chapter['pages'])})
        for pos,ids in sorted(pending.items(),reverse=True):
            source=source[:pos]+''.join('<a id="'+html.escape(i,quote=True)+'"></a>\n' for i in dict.fromkeys(ids))+'\n'+source[pos:]
        if chapter:
            # Source tables are available on demand after the actual lesson.
            lookup=re.search(r'(?m)^## (?:PPT—学习小节对照|PPT逐段对照|课件页码与本章位置)\n',source)
            if lookup:
                end=re.search(r'(?m)^## ',source[lookup.end():]);stop=lookup.end()+end.start() if end else len(source)
                content=source[lookup.end():stop].strip()
                rows=['|课件与PDF页码|内容|本章定位|','|---|---|---|']
                for item in chapter['pages']:
                    page=item.get('pdf_page',item.get('page'));kind=item.get('source','PPT')
                    rows.append('|'+str(kind)+' P'+str(page)+'|'+item['topic'].replace('|','/')+'|['+item['learningHeading']+'](#'+item['learningAnchor']+')|')
                source=source[:lookup.end()]+'\n<details class="optics-source-map">\n<summary>查看课件对照与逐页定位</summary>\n\n'+content+'\n\n'+ '\n'.join(rows)+'\n\n</details>\n'+source[stop:]
        assert not re.search(r'[A-Z]:[/\\]|tmp/review_build|\[\[',source),slug
        doc=ROOT/'docs'/(slug+'.md');old=doc.read_text(encoding='utf-8')
        front=re.match(r'^---\n.*?\n---\n',old,re.S)
        source=(front[0] if front else '')+'\n'+source.strip()+'\n'
        doc.write_bytes(source.encode('utf-8'))
        for name in re.findall(r'!\[[^\]]*\]\(/optics/figures/([^\)]+)\)',source):
            src=vault/'assets/ppt'/name;data=src.read_bytes();shutil.copy2(src,ROOT/'public/optics/figures'/name)
            actual_figures.append({'file':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'learningPage':slug+'.html'})
    provenance=json.loads((vault/'assets/ppt/figures.json').read_text(encoding='utf-8'))['figures']
    referenced={x['file'] for x in actual_figures}
    figures=merge_figures([x for x in provenance if x['file'] in referenced],actual_figures)
    for f in figures:assert all(k in f for k in ('sourcePdf','pdfPage','cropPixels','learningPage')),f
    (ROOT/'optics-figures.json').write_bytes((json.dumps({'source':'PPT excerpts with PDF page captions','figures':figures},ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    (ROOT/'optics-learning-source-map.json').write_bytes((json.dumps(source_map,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    print('Exported 8 optics pages;',len(figures),'figures;',sum(x['mappedPages'] for x in reports),'source-page targets.')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--vault',type=Path,required=True);args=parser.parse_args();export(args.vault)
