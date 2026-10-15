"""One-time course integration. Source PDFs stay local; only a cited figure excerpt is copied."""
from pathlib import Path
import json, hashlib
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=root.parent
docs=root/'docs'
public=root/'public'/'photogrammetry'
public.mkdir(parents=True,exist_ok=True)
(public/'figures').mkdir(exist_ok=True)
research=json.loads((source/'research'/'english-research.json').read_text(encoding='utf-8'))
chapters=[('intro','第一单元 · 照片为什么能测量'),('flight','第二单元 · 航高、比例尺与覆盖'),('camera','第三单元 · 像素、相机与坐标'),('collinearity','第四单元 · 共线方程'),('stereo','第五单元 · 双像、视差与核线'),('orientation','第六单元 · 交会与定向'),('bundle','第七单元 · 区域网与光束法'),('products','第八单元 · 匹配、DEM 与正射')]
config=json.loads((root/'study-space.config.json').read_text(encoding='utf-8'))
if not any(c['id']=='photogrammetry' for c in config['courses']):
 config['courses'].append({'id':'photogrammetry','title':'摄影测量','subtitle':'PHOTOGRAMMETRY · FROM IMAGES TO GEOMETRY','field':'测绘与地球空间科学','summary':'沿照片射线、坐标、交会、定向和区域网建立几何理解，用双语阅读逐步进入英文原著。','entry':'/course-photogrammetry.html','start':'/photogrammetry-intro.html','source':'/photogrammetry-sources.html','scope':'8 单元主线 · 12 个英文阅读训练 · 期末索引','tags':['中心投影','定向与空三','双语原著阅读'],'prerequisites':'高中几何、基础向量；矩阵与最小二乘在正文就地解释','status':'基础与期末主线已整理，完整教材有章节索引','chapters':[{'slug':'photogrammetry-'+s,'title':t} for s,t in chapters]+[{'slug':'photogrammetry-english','title':'英文阅读训练'},{'slug':'photogrammetry-review','title':'期末索引与勘误'}]})
(root/'study-space.config.json').write_text(json.dumps(config,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
books=[('chinese','摄影测量学','王佩军、徐亚明',260,'中文教材，十章及操作/平差附录。用于几何、解析定向、空三与数字流程核对。'),('english','Introduction to Modern Photogrammetry','Edward M. Mikhail、James S. Bethel、J. Chris McGlone · Wiley 2001',491,'英文教材，十一章及A–G附录。配合12个阅读训练，逐条核实文件页。'),('exam','摄影测量两张纸整理 (1)(2)','复习资料（原件未标明完整署名）',4,'实际四页。题型索引与公式条件经教材回查，原笔记不作为所有结论的最终依据。'),('analytical','解析摄影测量学','李德仁 · 1992',0,'进阶参考书，尚未逐章核读；用于后续更深入的解析方法阅读。'),('slides1','chapter1-2026','课程课件（原件署名以文件为准）',0,'绪论课件，作为课堂范围补充。'),('slides3','chapter3-2026（第2、3次课课件）','课程课件（原件署名以文件为准）',0,'传感系统相关课件，作为课堂范围补充。')]
resources=json.loads((root/'resources.config.json').read_text(encoding='utf-8'))
from pypdf import PdfReader
files=[next(source.glob('摄影测量学_*.pdf')),next(source.glob('英文教材*.pdf')),next(source.glob('摄影测量两张纸*.pdf')),next(source.glob('参考书*.pdf')),source/'PPT'/'chapter1-2026.pdf',source/'PPT'/'chapter3-2026（第2、3次课课件）.pdf']
materials=[]
for (key,title,author,count,desc),file in zip(books,files):
 if not count:count=len(PdfReader(str(file)).pages)
 slug='photogrammetry-material-'+key
 (docs/(slug+'.md')).write_text(f'---\ntitle: {json.dumps(title,ensure_ascii=False)}\nprev: false\nnext: false\n---\n\n# {title}\n\n{author}。{desc}\n\n[返回摄影测量资料索引](/photogrammetry-sources) · [课程总览](/course-photogrammetry)\n\n<PhotogrammetryLocalReader title={json.dumps(title,ensure_ascii=False)} :pages="{count}" />\n\n## 确认文件\n\n选择本机文件：**{file.name}**。共 {count} 个 PDF 文件页。浏览器入口以文件页定位，不依赖全书固定偏移。网页讲解是原创整理，不是完整教材译本。\n',encoding='utf-8')
 rid='photo-'+key
 if not any(r['id']==rid for r in resources):resources.append({'id':rid,'course':'photogrammetry','type':'课件' if key.startswith('slides') else '辅助资料' if key=='exam' else '教材' if key in ['chinese','english'] else '参考教材','title':title,'author':author,'description':desc+' 完整PDF在本机选择后阅读，本站不上传原书。','preview':'/'+slug+'.html','format':'PDF','localOnly':True,'pages':count})
 materials.append({'id':rid,'filename':file.name,'pages':count,'bytes':file.stat().st_size,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'publicFullPdf':False,'reader':'/'+slug+'.html'})
(root/'resources.config.json').write_text(json.dumps(resources,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(public/'sources.json').write_text(json.dumps(materials,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
# Page 69 was visually checked before cropping. Preserve diagram and original caption.
im=Image.open(source/'research'/'book-69.png')
im.crop((260,790,915,1345)).save(public/'figures'/'epipolar.png')
fig=public/'figures'/'epipolar.png'
(public/'figures'/'manifest.json').write_text(json.dumps([{'file':'epipolar.png','source':'王佩军、徐亚明《摄影测量学》','pdfPage':69,'printedPage':60,'figure':'4-9','kind':'cited diagram excerpt','sha256':hashlib.sha256(fig.read_bytes()).hexdigest()}],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
zh=[(1,'绪论','1–7','10–16','intro','基础主线'),(2,'影像获取','8–29','17–38','flight','航摄主线；各遥感平台分类按原章延伸'),(3,'摄影测量基础','30–53','39–62','collinearity','坐标、中心投影、共线和投影差主线'),(4,'双像立体测图','54–70','63–79','stereo','立体几何与核线；旧仪器作历史扩展'),(5,'解析摄影测量基础','71–96','80–105','orientation','前后交会、相对/绝对定向、光束关系'),(6,'解析空中三角测量','97–129','106–138','bundle','三类区域网、光束线性化、基准与POS'),(7,'数字地面模型','130–147','139–156','products','DEM/TIN/插值基础；全部应用算法未逐式展开'),(8,'数字摄影测量','148–185','157–194','products','匹配/核线/重采样基础；VLL/LSM/SIFT深推导作延伸'),(9,'像片纠正与正射影像','186–195','195–204','products','逆映射、重采样、DOM'),(10,'摄影测量外业','196–209','205–218','products','控制布设/独立检查/调绘；完整外业规程回原章'),('I','VirtuoZo NT 操作附录','210–227','219–236','products','历史工作站操作，未逐步骤重制'),('II','区域网平差实例','228–248','237–257','bundle','进阶算例，未重制完整实例')]
text='''---
title: 摄影测量 · 教材地图与资料来源
prev: false
next: false
---

# 教材地图与资料来源

中文教材、英文教材与四页期末整理采用不同的章节组织，不能机械按第几章一一对应。以下保持两本教材的原章顺序，同时标记网站的理解入口与覆盖深度。正文公式和英文短句为原创整理，原著引文与教材图另行署名。

## 文件与阅读入口 {#photo-materials}

完整教材在本机选择后阅读，文件不上传。浏览器可能忽略 PDF 跳页，页面同时保留明确的文件页数。资料原名、大小与 SHA-256 收录于[来源清单](/photogrammetry/sources.json)。

'''
for m,book in zip(materials,books):text+=f'- [{book[1]}]({m["reader"]}) · {m["pages"]} PDF 页 · {book[2]}。\n'
text+='\n## 中文教材的原章节与网站入口\n\n中文书为260 PDF页扫描本，目录PDF7–9；关键公式页已视觉核对，未全书逐字OCR。正文所列范围使用书内印刷页与实际文件页，目录范围不代表范围内每一句均完成审校。\n\n|章|原章主题|印刷页|PDF文件页|网站入口与范围|\n|---|---|---|---|---|\n'
for n,title,printed,pdf,slug,status in zh:text+=f'|{n}|{title}|{printed}|{pdf}|[{status}](/photogrammetry-{slug}.html)|\n'
text+='\n## 英文教材的原章节与附录\n\n*Introduction to Modern Photogrammetry*，Edward M. Mikhail、James S. Bethel、J. Chris McGlone，John Wiley & Sons，2001，ISBN 0-471-30924-9。扉页PDF5、版权PDF6、目录PDF9–11已核实；不额外声称未标明的版次。\n\n**扫描缺少印刷 p.350。** 正文 p.1–349 的核实页为+12，附录A以后已核实页为+11；不要使用全书统一偏移。公式OCR可能错字，应回页面图。\n\n|原章|英文标题与中文理解|印刷起页|PDF起页|阅读用途|\n|---|---|---|---|---|\n'
for c in research['contents']:text+=f'|{c["chapter"]}|[{c["en"]} · {c["zh"]}](/photogrammetry-material-english.html#page={c["pdfPage"]})|{c["printedPage"]}|{c["pdfPage"]}|{c["role"]}|\n'
text+='\n## 中英文关键知识对照\n\n|主题|中文核实PDF页|英文核实PDF页|复习纸|正文|\n|---|---|---|---|---|\n|定义与任务|10–16|13|1|[01](/photogrammetry-intro)|\n|比例尺/覆盖/GSD|39起（目录定位）|25起、165|1、3|[02](/photogrammetry-flight)|\n|坐标/内外方位|49–52、71|92起（章定位）|1、2|[03](/photogrammetry-camera)|\n|共线方程|58|104–105|1、2|[04](/photogrammetry-collinearity)|\n|高差位移/核线/共面|60–61、69–71、91、182–183|25起（章定位）|1、2、4|[05](/photogrammetry-stereo)|\n|交会/相对/绝对定向|81、87–88、90–91、98–99、102|124、127、130–131|2、4|[06](/photogrammetry-orientation)|\n|光束区域网/平差|118–120|131、142、398、401|2–4|[07](/photogrammetry-bundle)|\n|正射逆映射/产品|200、202|240、247、254|3的产品关联|[08](/photogrammetry-products)|\n'
text+='''
## 如何使用期末与课件

“两张纸”文件实际四页，按PDF1–4完整提取并建立[期末主题索引与勘误](/photogrammetry-review)。它压缩了课程要点，不能替代定义、符号和适用条件。两份2026课件已纳入资料目录，其课堂范围不等于整本教材的范围；《解析摄影测量学》为进阶参考，尚未逐章核读。

## 研究与审校范围

中文教材研究、英文阅读研究与交互实现由三个子代理协作；网页端使用 browser-collab，经 Codex 内置浏览器读取完整审阅。采用连续解释、已知/未知明确、公式条件保留、英语按能力选择、主线与期末索引分开；回教材核对绝对定向控制点，重算比例尺/GSD/视差/重投影与单位。

期末压缩说法的修正见[勘误表](/photogrammetry-review)。书中的旧设备、程序、网址与CD-ROM按其出版年代理解，现代滚动快门等补充另标语境。教材图4-9截取保留图号与说明；四个可调几何实验为原创教学示意，示意位置不代替真实定向参数。

英文十一章中，多光谱/高光谱、主动传感、仪器历史及A–G完整附录目前提供定位与阅读用途，未重写完整专章。它们可分别连接既有遥感基础、InSAR、机器学习与最优化课程；八单元不宣称覆盖全部原著推导与习题。
'''
(docs/'photogrammetry-sources.md').write_text(text,encoding='utf-8')
# Register components and preserve the existing theme.
p=root/'docs'/'.vitepress'/'theme'/'index.js';s=p.read_text(encoding='utf-8')
for name in ['PhotogrammetryLab','PhotogrammetryLocalReader','PhotogrammetryReading']:
 if f"import {name} " not in s:s=f"import {name} from './{name}.vue';\n"+s
 if f"app.component('{name}'" not in s:s=s.replace('enhanceApp({app}){',f"enhanceApp({{app}}){{app.component('{name}',{name});")
p.write_text(s,encoding='utf-8')
# Add discovery from existing guide pages with no changes to their existing contents.
for filename,heading,body in [('study-guide.md','摄影测量：从射线开始','先沿[八单元理解路线](/course-photogrammetry.html#photo-path)理解几何，再用[英文阅读训练](/photogrammetry-english)练习找对象、条件和结论。'),('review-guide.md','摄影测量：先检查条件再代公式','用[四页整理索引与勘误](/photogrammetry-review)定位题型，再回到共线、视差、定向和光束法正文；[完整教材地图](/photogrammetry-sources)保留考试范围以外的延伸入口。')]:
 p=docs/filename;s=p.read_text(encoding='utf-8')
 if '## '+heading not in s:p.write_text(s+'\n\n## '+heading+' {#photogrammetry}\n\n'+body+'\n',encoding='utf-8')
print('Integrated course, 6 local source readers, chapter maps, figure excerpt and learning guide links.')
