"""Small, shared transformations for the optics website and editable notes."""
import html,re
from urllib.parse import unquote

PAGES={
'00 内容规划与阅读入口':'course-optics','01 波动与光的电磁理论':'optics-waves',
'02 非相干辐射与热辐射':'optics-incoherent','03 相干辐射与激光':'optics-laser',
'04 光的传播与介质响应':'optics-propagation','05 光学与电动力学关联':'optics-electrodynamics',
'06 公式速查与易错辨析':'optics-formulas','07 课后题索引与复习自检':'optics-exercises',
'08 课件覆盖与来源':'optics-sources','09 课程学习版导读':'optics-learning',
'10 考试复习概念公式精简版':'review-optics','11 光的传播II：散射、偏振与波的合成':'optics-propagation-ii'}

def web_details(text):
    """Keep all headings and named targets outside collapsible derivation bodies."""
    start='<!-- optics-detail:start -->';end='<!-- optics-detail:end -->'
    depth=0
    for mark in re.findall(r'<!-- optics-detail:(start|end) -->',text):
        depth+=1 if mark=='start' else -1
        if depth not in (0,1):raise ValueError('Nested or unbalanced optics detail region')
    if depth:raise ValueError('Unclosed optics detail region')
    def region(match):
        lines=match[1].strip().splitlines();out=[];body=[];answer=False
        def flush():
            if not ''.join(body).strip():body.clear();return
            label='展开答案与解释' if answer else '展开逐步推导与说明'
            out.append('\n<details class="optics-derivation">\n<summary>'+label+'</summary>\n\n'+'\n'.join(body).strip()+'\n\n</details>\n\n');body.clear()
        for line in lines:
            if re.match(r'^#{1,6} ',line) or re.match(r'^<a id=',line):
                flush();out.append(line+'\n');answer='答案' in line if line.startswith('#') else answer
            else:body.append(line)
        flush();return ''.join(out)
    return re.sub(re.escape(start)+r'(.*?)'+re.escape(end),region,text,flags=re.S)

def local_details(text):
    """Use native Markdown headings in Obsidian; maths stays out of raw HTML."""
    def summary(m):
        title=html.unescape(re.sub('<[^>]+>','',m[1])).strip()
        return '\n\n' if title.startswith('展开') else '\n\n#### '+title+'\n\n'
    text=re.sub(r'<details\b[^>]*>\s*<summary>(.*?)</summary>\s*',summary,text,flags=re.S)
    return re.sub(r'</details>','\n',text)

def portable_links(text):
    out=[];pos=0
    while True:
        begin=text.find('](',pos)
        if begin<0:out.append(text[pos:]);break
        out.append(text[pos:begin]);end=begin+2;depth=1
        while end<len(text) and depth:
            if text[end]=='\\':end+=2;continue
            if text[end]=='(':depth+=1
            elif text[end]==')':depth-=1
            end+=1
        if depth:out.append(text[begin:]);break
        raw=text[begin:end];dest=unquote(text[begin+2:end-1].strip('<>'));fragment=''
        if '#' in dest:dest,fragment=dest.split('#',1);fragment='#'+fragment
        normalized=dest.replace('\\','/');stem=normalized.rsplit('/',1)[-1].removesuffix('.md')
        if stem in PAGES:target=PAGES[stem]+'.html'+fragment
        elif '电动力学/' in normalized and normalized.endswith('.md'):target='optics-electrodynamics.html'
        elif '官方教材/' in normalized or '/PPT/' in normalized or normalized.startswith('../PPT/'):target='optics-sources.html'
        elif '第一章作业/' in normalized or '第二章作业/' in normalized:target='optics-exercises.html'
        elif normalized.startswith('assets/ppt/'):target='/optics/figures/'+normalized.rsplit('/',1)[-1]
        else:out.append(raw);pos=end;continue
        out.append(']('+target+')');pos=end
    return ''.join(out)

def merge_figures(provenance,actual):
    records={item['file']:dict(item) for item in provenance}
    for item in actual:records[item['file']]={**records.get(item['file'],{}),**item}
    return [records[name] for name in sorted(records)]
