import fs from 'node:fs';

// Teaching text is retained from reviewed source modules; sections below follow
// the English textbook. This changes the actual prose order, not just navigation.
const cache=new Map(),routes=new Map(),used=[];
const slug=n=>({w1:'photogrammetry-wang-01',w2:'photogrammetry-wang-02',w3:'photogrammetry-wang-03',w4:'photogrammetry-wang-04',w5:'photogrammetry-wang-ch5',w6:'photogrammetry-wang-ch6',intro:'photogrammetry-ppt-intro',optics:'photogrammetry-ppt-optics',sensor:'photogrammetry-ppt-sensors',products:'photogrammetry-products',camera:'photogrammetry-camera',stereo:'photogrammetry-stereo',bridge:'photogrammetry-english-bridges',add:'_fragments/photogrammetry-order-additions',gaps:'_fragments/photogrammetry-english-gaps',mathadd:'_fragments/photogrammetry-english-math-additions',constraints:'_fragments/photogrammetry-english-constraints-additions',numerics:'_fragments/photogrammetry-english-numerics-additions',derive23:'_fragments/photogrammetry-derivations-23',derive4:'_fragments/photogrammetry-derivations-4',derive5:'_fragments/photogrammetry-derivations-5',deriverest:'_fragments/photogrammetry-derivations-1678'}[n]??n);
function headingKey(title){let h=2166136261;for(const c of title)h=Math.imul(h^c.codePointAt(0),16777619)>>>0;return 'h'+h.toString(36)}
function source(key){const p=slug(key);if(!cache.has(p))cache.set(p,fs.readFileSync(`docs/${p}.md`,'utf8').replaceAll('\r\n','\n'));return cache.get(p)}
function locate(key,id){
 const text=source(key),lines=[...text.matchAll(/^(#{2,4}) (.+)$/gm)];
 const h=lines.find(x=>id.startsWith('@')?x[2].replace(/ \{#[^}]+\}/,'')===id.slice(1):x[2].includes(`{#${id}}`));
 if(!h)throw new Error(`Missing source section ${key}:${id}`);
 const level=h[1].length,next=lines.find(x=>x.index>h.index&&x[1].length<=level);
 return {text:text.slice(h.index,next?.index??text.length).trim(),level,title:h[2],id:id.startsWith('@')?headingKey(h[2]):id};
}
function block(key,id,mode='whole',cut){return {key,id,mode,cut}}
const P=block,L=(key,id)=>block(key,id,'lead'),B=(key,id,cut)=>block(key,id,'before',cut),A=(key,id,cut)=>block(key,id,'after',cut);
const Q=(key,start,id,title)=>({key,paragraph:start,id,title});
function remember(old,newTarget){if(!routes.has(old))routes.set(old,newTarget)}
function render(part,dest){
 if(typeof part==='string')return part+'\n\n';
 let selected;
 if(part.paragraph){
  const para=source(part.key).split(/\n\s*\n/).find(p=>p.includes(part.paragraph));if(!para)throw Error('Missing source paragraph '+part.paragraph);
  let body=para.slice(para.indexOf(part.paragraph));
  const next=body.slice(part.paragraph.length).search(/PDF\d+/);if(next>=0)body=body.slice(0,part.paragraph.length+next);
  selected={text:`### ${part.title} {#${part.id}}\n\n`+body,level:3,title:part.title,id:part.id};
 }
 let {text,level,title,id}=selected??locate(part.key,part.id);
 if(part.mode==='lead'){const sub=text.slice(text.indexOf('\n')+1).search(/^#{3,4} /m);if(sub>=0){const start=text.indexOf('\n')+1;text=text.slice(0,start+sub).trim()}}
 if(part.mode==='before'||part.mode==='after'){
  const at=text.indexOf(part.cut);if(at<0)throw Error('Split marker missing '+part.key+':'+part.id);
  text=part.mode==='before'?text.slice(0,at):text.slice(0,text.indexOf('\n')+1)+'\n'+text.slice(at);
 }
 const prefix=part.key.replace(/[^a-z0-9]/g,'')+'-';
 const oldBase='/'+slug(part.key)+'.html';
 const originalIds=[...text.matchAll(/\{#([^}]+)\}/g)].map(x=>x[1]);
 let headId=prefix+id+(part.mode==='before'||part.mode==='after'?'-'+part.mode:'');
 text=text.replace(/\{#([^}]+)\}/g,(_,v)=>`{#${prefix+v}}`);
 if(headId!==prefix+id)text=text.replace(`{#${prefix+id}}`,`{#${headId}}`);
 text=text.replace(/^#{2,4} (.+)$/gm,(match,heading)=>{
  const original=match.match(/^#+/)[0].length,depth=Math.min(5,3+original-level);
  let label=heading.replace(/^\d+-\d+\s*/,'');
  if(part.heading&&original===level)label=part.heading+` {#${headId}}`;
  if(part.key==='gaps'&&label.includes('：'))label=label.split('：').slice(1).join('：');
  return '#'.repeat(depth)+' '+label;
 });
 if(!/^### .*\{#/.test(text))text=text.replace(/^(### .+)$/m,`$1 {#${headId}}`);
 // Source-archive navigation and reading-position paragraphs do not belong in
 // the middle of the newly assembled lesson.
 text=text.replace(/<LearningMark\b[^>]*\/>/g,'');
 text=text.replace(/^\[(?:回到中文书|下一章：|上一章：|王书第一章|第五章解析|本章来源)[^\n]*$/gm,'');
 text=text.replaceAll('本网站以王书前六章为主要自学骨架，同时把课件额外内容分流到本页和传感器补充，避免目录对应错位。','本讲义按英文课本顺序编排，把王书前六章的解释与课件内容融合到对应小节。');
 text=text.replaceAll('读英文顺序可遵循“先Definitions与History，再Systems、Applications and Products、Sources”；自学时则先掌握问题与系统，再把历史作为技术演变的解释。','本讲依英文教材次序阅读Definitions、Systems、Applications and Products、Sources，最后讨论History；课件提纲页仅用于定位。');
 text=text.replaceAll('真实负像面','所选负坐标投影面').replaceAll('真实负片','物理感光片').replaceAll('真实像平面','所选等效像平面').replaceAll('真实像面为','等效投影面取为').replaceAll('这个负号来自真实像面的位置','这个负号来自所选像向量与轴向约定');
 text=text.replaceAll('是一个统一尺度，无量纲；','是一个统一尺度；两套坐标用相同长度单位时无量纲，否则带地面长度/模型单位；');
 if(/^w[1-6]$/.test(part.key))text=text.replaceAll('原书PDF','王佩军、徐亚明教材PDF');
 text=text.replaceAll('重读原书时，先按PDF110–115','重读王佩军、徐亚明教材时，先按PDF110–115').replaceAll('用PDF119式6-32核对本页舒尔推导','用王书PDF119式6-32核对[5.11节舒尔推导](/photogrammetry-en-05.html#e5-11)').replaceAll('本页已覆盖原章六节及精度、自检校、GPS漂移、POS直接与集成定向。','王书第六章六节的迁移位置见覆盖表；精度、自检校、GPS漂移、POS直接与集成定向已分别放入对应主题。').replaceAll('[第五章解析基础]','[交会与定向求解基础]');
 const joins=[
 ['本书第三章用中心投影和共线条件处理第二个问题，第四、五章用立体关系与解析方法组织它们，第六章把多幅影像连接成网。','第2讲先建立中心投影与立体直觉，第4讲给严密条件，第5讲组织交会、定向和区域网求解。'],
 ['第一章建立问题，第三章才详细推导条件。','第1讲建立问题，第2讲给初等几何，第4讲写严密条件。'],
 ['正式共线式、轴方向和旋转矩阵在第三章学习。','正式共线式、轴方向和旋转矩阵在第4讲学习。'],
 ['第二章会具体解释 CCD、面阵、线阵以及航空数码相机的多镜头处理。','CCD、面阵、线阵以及航空数码相机的多镜头处理见第3讲。'],
 ['使用第三章王书约定','采用第4讲统一的王书坐标约定'],
 ['横向轴约定与第三章 $z=-f$ 模型一致。','横向轴采用本讲统一的等效投影坐标约定。'],
 ['第五章讲求解，第七、八、九章将进一步讲地面模型、匹配与正射影像。因此第四章的概述不是以后所有算法的替代品','第5讲讲求解，第6讲讲数字量测，第8讲接地面模型与正射产品。本讲的仪器概述不是所有算法的替代品'],
 ['本章不冒称第二章已有全部规范。','这里把设备与质量条件放入同一工作流理解。'],
 ['和第三章对照学习。','与本讲3.4节的质量条件对照学习。'],
 ['带着这些问题进入第三章的中心投影与坐标系统','带着这些问题进入第4讲的坐标与成像条件'],
 ['这三步是原书第四章的理解主线。第五章还会给','这是王书第四章介绍的恢复路线。本讲5.3与5.5将给'],
 ['沿用[第三章]','沿用[第4讲的旋转约定]']];
 for(const [old,replacement] of joins)text=text.replaceAll(old,replacement);
 remember(oldBase+'#'+id,dest+'#'+headId);
 for(const v of originalIds)remember(oldBase+'#'+v,dest+'#'+(v===id?headId:prefix+v));
 remember(oldBase,dest);
 used.push({source:slug(part.key),section:part.id,sourceParagraph:part.paragraph??null,mode:part.paragraph?'paragraph':part.mode,target:dest+'#'+headId,characters:text.length});
 return text+'\n\n';
}
const sections=[];
const selfChecks={
 1:['认出屋顶与求屋顶坐标，分别还缺什么？','前者属于对象解译；后者还要可靠对应、成像模型、方位与深度/地面约束。系统集成不能替代几何和质量检查。'],
 2:['参考深度1000 m、参考视差100 mm、视差增加10 mm，精确高差与线性近似分别是多少？','理想平行像对且符号约定一致时，精确值为1000×10/110≈90.91 m，线性值100 m。相对误差10%，不能只因公式形式简单就忽略分母变化。'],
 3:['GSD减半，单覆盖同波段同位深的数据量怎样变？能据此断言定位精度翻倍吗？','理想像元数沿两维各加倍，数据量约4倍。GSD是采样间隔，定位精度还受标定、网形、控制、观测与处理影响。'],
 4:['平面单应可逆，为什么单张照片仍不能唯一恢复一般三维场景？','可逆性只限于满足非退化条件的指定平面。一般场景同一投射线存在多个深度；一个像点不提供完整三维坐标。'],
 5:['一个未知点只在两张已定向影像出现，沿核线错配后重投影残差仍可为零吗？','可以。错误候选仍可能让两射线在另一深度相交。零残差既不保证对应正确，也不证明绝对准确；需额外视角、几何与独立检验。'],
 6:['两个小窗口只相差恒定亮度，NCC等于1是否证明它们是同一个物点？','不能。去均值后可得到相同变化形状，但重复纹理也可能高相关；还要检查几何、可见性和一致性。'],
 7:['数字工作站能自动匹配，为什么仍需要检查点和编辑判断？','自动化改变了量测方式，没有取消控制、错误对应、遮挡或语义表达问题。仪器显示与几何、外部精度应分别验证。'],
 8:['树冠点插成规则高程格网，能仅凭DEM文件名认定是裸地吗？','不能。需核对表面定义、地面点筛选和实际覆盖。DSM、DTM及DEM术语依资料定义，重采样也不能凭空恢复被遮挡的裸地。']};
function S(n,en,zh,page,intro,parts){return {n,en,zh,page,intro,parts}}
const chapters=[
{n:1,en:'Introductory Concepts',zh:'入门概念',range:'p.1–12 / PDF13–24',sections:[
 S('1.1','Definitions','定义与几何任务',1,'两本书先在同一件事上对齐：影像提供观测，摄影测量恢复对象的几何信息。现代范围可以扩大，具体模型仍须按传感器建立。',[P('bridge','modern-scope'),P('w1','section-1-1'),L('intro','definitions'),B('intro','stereopair-examples','PDF27')]),
 S('1.2','Photogrammetric Systems','摄影测量系统',2,'沿获取、准备、量测、几何恢复和质量检查认识系统；王书的影像信息学补充各环节如何协同。',[P('intro','system-functions'),P('w1','image-information')]),
 S('1.3','Photogrammetric Applications and Products','应用与产品',6,'先辨认任务和输出，不急于学习完整生产算法。DEM、DOM等如何生成将在第8讲展开。',[P('intro','applications'),L('intro','image-products'),P('intro','vector-products'),P('intro','surface-products')]),
 S('1.4','Sources of Photogrammetric Information','资料与信息来源',9,'原著、学术组织和数据服务各提供不同证据。课件中的旧机构名称与网址按历史语境读取。',[P('intro','course-scope'),L('intro','organizations'),P('intro','references'),P('intro','data-sources')]),
 S('1.5','History','历史与技术演变',11,'按照英文教材把历史放在本章末尾；用王书模拟—解析—数字三个阶段解释变化背后的同一几何任务。',[P('w1','stages'),P('w1','mathematical-projection'),P('w1','development'),L('intro','history-method'),P('intro','history-prehistory'),P('intro','history-platforms'),P('intro','history-archives'),P('intro','history-instruments'),P('intro','software-history'),P('w1','chapter-check')])]},
{n:2,en:'Elementary Photogrammetry',zh:'初等摄影测量',range:'p.13–32 / PDF25–44',sections:[
 S('2.1','Perspective Projection','中心投影',13,'这一章先建立可以画图、用相似三角形检查的几何关系。相机光学在下一章，严密旋转模型在第4章。',[P('w3','s3-2')]),
 S('2.2','Scale and Coverage','比例尺与覆盖',16,'先判断航高相对于哪个地面，再比较像幅长度与地面覆盖。',[P('w3','@比例尺先比较两个对应长度'),P('intro','flight-rays'),'<PhotogrammetryLab type="scale" />']),
 S('2.3','Vanishing Points','灭点与特殊点线面',19,'英文书从平行方向的投影讲灭点；王书的像主点、像底点、等角点和主合点补足航空像片的构造。',[P('add','vanishing-point'),P('w3','s3-3')]),
 S('2.4','Image Coordinate System','像坐标系统',20,'这里先处理二维像面的位置、原点、轴向和单位；物空间参考系与三维旋转留到第4章，避免提前混用。',[P('camera','@像素索引还不是量测坐标'),P('add','pixel-conversion')]),
 S('2.5','Relief Displacement','起伏位移与倾斜影响',22,'先用水平像片理解地形起伏，再用王书补充倾斜造成的不同位移中心。两种现象不等同镜头畸变。',[L('w3','s3-7'),P('w3','@倾斜位移不是镜头坏了'),P('w3','@高差位移：明确顶部半径'),'<PhotogrammetryLab type="relief" />']),
 S('2.6','Parallax and Stereo','视差与立体视觉',23,'英文书先用观察位置变化引入视差，再接到高程；王书补入立体视觉、分像与浮游测标，让数学关系与实际量测连接。',[P('bridge','approximation-parallax'),P('w4','s4-1'),L('w4','s4-2'),P('w4','@视差与高度：先声明理想像对'),P('w4','@摄影过程的几何反转'),Q('intro','PDF27','inverse-case','课件几何反转图怎样读'),'<PhotogrammetryLab type="stereo" />']),
 S('2.7','Image Overlap','影像重叠与航带',29,'比例尺给覆盖，重叠决定相邻观测是否能连接。曝光间隔与曝光持续时间分别控制几何采集与模糊。',[P('w3','@一张照片怎样变成一条航带'),P('intro','overlap')]),
 S('2.8','Epipolar Planes and Lines','核面与核线',31,'先画基线与同名射线，再理解为什么对应搜索可限制在一条线上。共面条件的代数形式在第4章继续推导。',[P('w4','@像对的特殊点线面建立在两个摄影中心上'),P('stereo','@核面把二维搜索限制到一条线'),P('stereo','@共面与交会要分开')])]},
{n:3,en:'Photogrammetric Sensing Systems',zh:'摄影测量传感系统',range:'p.33–79 / PDF45–91',sections:[
 S('3.1','The Physics of Remote Sensing—Electromagnetic Energy','电磁能与辐射量',33,'与老师传感系统PPT同序：先明确能量与波段，再谈光学和探测器。王书的遥感分类在这一能量链上解释。',[P('optics','radiometry'),P('w2','remote-sensing')]),
 S('3.2','Optics','光学系统',35,'薄透镜的光学焦距与摄影测量标定主距分别定义；进入几何计算前，先理解实际镜头的清晰度与位置偏差。',[P('w2','optical-geometry'),P('optics','thin-lens'),P('optics','aperture-fov'),P('optics','cos-fourth'),P('optics','aberrations'),P('optics','depth-of-field'),P('optics','reflectors')]),
 S('3.3','Sensing','感光材料与电子探测',47,'胶片与电子传感器都把光转成可保存信号，但响应、噪声与几何稳定性的机制不同。',[P('sensor','film'),P('sensor','color'),P('sensor','sensitometry'),P('sensor','detectors')]),
 S('3.4','Image Quality','影像质量',54,'接上数字采样、GSD、分辨率、数据量与飞行质量，区分能看到细节和能准确定位。',[P('sensor','sampling'),P('w2','resolutions'),P('w3','@书中的质量要求解决什么问题'),P('intro','flight-quality')]),
 S('3.5','Imaging Geometries','成像几何',57,'先分清框幅、线阵、点扫描与全景，再看王书列举的具体数字航摄系统。型号用于理解几何组织，历史规格不当作当代通用指标。',[B('sensor','scanners','**像移 / image motion**'),P('w2','frame-pushbroom'),Q('intro','PDF28','line-stereo-case','课件线阵立体图怎样读'),P('w2','dmc'),P('w2','ads-ucx')]),
 S('3.6','Image Motion Compensation','像移补偿',62,'从平台速度缩放到像面速度，再乘曝光时间。与第2章的曝光间隔区别开来。',[A('sensor','scanners','**像移 / image motion**')]),
 S('3.7','Construction of a Frame Mapping Camera','框幅航摄相机的构造',63,'把光学、感光面、快门、框标、安装与导航连接起来；相机外观不能替代标定和同步关系。',[P('w2','aerial-acquisition'),P('w2','film-camera'),P('intro','camera-examples'),P('sensor','camera-system'),B('sensor','timing-calibration','检校 calibration'),P('intro','crab')]),
 S('3.8','Camera Calibration','相机检校',67,'这里融合英文书的检校分类和王书的相机几何；估计相机参数与依据已知参数建立内定向不是同一步。',[A('sensor','timing-calibration','检校 calibration'),P('bridge','sensing-calibration')]),
 S('3.9','Active Sensors','主动传感器',71,'按能量来源判断主动与被动，不按能否夜间工作判断；本章只建立概念，第11章是原著专门展开。',[B('sensor','active-platforms','平台 platform')]),
 S('3.10','Platforms for Photogrammetric Sensing Systems','摄影测量平台',72,'将王书的航空、卫星、UAV与具体型号放入英文书的平台框架，连同轨道立体的读图解释。',[A('sensor','active-platforms','平台 platform'),P('w2','levels-uav'),P('w2','remote-development'),P('w2','satellite-examples'),P('w2','chapter-check')])]},
{n:4,en:'Mathematical Concepts in Photogrammetry',zh:'摄影测量数学概念',range:'p.80–106 / PDF92–118',sections:[
 S('4.1','Fundamentals of Perspective Geometry','透视几何基础',80,'第2章的射线直觉在这里升级为可计算的映射，从交比、平面射影到空间投影，明确哪些关系可以保持。',[P('mathadd','perspective-foundations'),P('add','perspective-bridge')]),
 S('4.2','Coordinate Reference Frames','坐标参考系',87,'把二维像坐标扩展到相机、辅助、模型与物空间。每次转换先标原点、轴向、手性与单位。',[P('w3','s3-4')]),
 S('4.3','Sensor Model (Interior Orientation)','传感器模型与内方位',88,'这里用英文书的sensor model组织王书的内部几何：已知一个像点，怎样恢复相机坐标系中的一条射线？',[P('w3','s3-5'),P('bridge','orientation-models')]),
 S('4.4','Platform Model (Exterior Orientation)','平台模型与外方位',90,'内方位决定射线束内部，外方位安放整束光。沿用已核王书旋转约定，并明确它与英文书角色相同而符号不必相同。',[L('w3','s3-6'),P('w3','@第一步：定义向量和方向余弦'),P('w3','@第二步：旋转乘积与角约定'),P('w3','@第三步：把地面点移到摄影中心')]),
 S('4.5','Photogrammetric Conditions','摄影测量条件方程',92,'共线、共面和尺度约束描述不同几何条件。先建立严密关系，再在第5章改变已知与未知来解算。',[P('w3','@第四步：转回相机轴并消去比例'),P('w3','@第五步：做零旋转算例与单位检查'),P('w4','@用向量表达三线共面，避免仅凭图感判断'),P('constraints','additional-conditions'),'<PhotogrammetryLab type="collinearity" />']),
 S('4.6','Satellite Imagery and Orbits','卫星影像与轨道',104,'卫星影像的轨迹和逐行时间是几何模型的一部分。本节的设备例子见第3讲平台，这里讨论模型和坐标链。',[P('gaps','@4.6 Satellite Imagery and Orbits：卫星推扫不是一张大框幅照片')])]},
{n:5,en:'Resection, Intersection, and Triangulation',zh:'后方交会、前方交会与三角测量',range:'p.107–151 / PDF119–163',sections:[
 S('5.1','Introduction','观测、已知与未知',107,'同一成像条件因未知量不同形成不同任务；先列观测与控制，才写矩阵。',[P('w5','s51'),P('w4','@恢复顺序：内定向、相对定向、绝对定向'),P('add','least-squares-primer')]),
 S('5.2','Image Coordinate Refinement','像坐标精化',108,'把量测值转换为与成像模型一致的像坐标，再谈交会。系统改正和随机误差不能混为一件事。',[P('gaps','@5.2 Image Coordinate Refinement：量测值怎样接近理想成像模型'),P('w6','s61-errors'),P('w3','@畸变与其他系统影响不能用“纠正倾斜”替代')]),
 S('5.3','Resection','空间后方交会',112,'已知物点与像坐标求相机；王书补全雅可比、线性化、迭代与可复算例。',[P('w5','s52')]),
 S('5.4','Single-Ray Backprojection','单射线反投影',113,'已知相机后，一个像点仍只给方向。增加已知表面，才可能确定射线上的位置。',[P('gaps','@原书的输入并不只限于已知高程'),P('w3','@已知高程时的反投影仍然需要条件'),P('add','ray-plane'),P('gaps','@DEM为何要迭代，为什么初值太低会落到山背后')]),
 S('5.5','Intersection','空间前方交会',115,'相机位姿已知，利用多条射线共同确定物点；不相交时的最小二乘解还要检查几何稳定性。',[P('w5','s53')]),
 S('5.6','Relative Orientation','相对定向',115,'恢复两束之间的内部关系，不给出绝对尺度。先用英文书的任务顺序，再保留王书连续与单独像对两种参数组织。',[L('w4','s4-3'),P('w4','@为什么两片十二个外方位只剩五个相对自由度'),P('w4','@连续像对：固定左片，求右片相对关系'),P('w4','@单独像对：把基线放在一条轴上'),P('w4','@上下视差为什么不能靠升降测绘台消掉'),{...A('w5','s54-parameter','对每对同名点'),heading:'从共面不闭合到参数改正'},P('w5','s54-model')]),
 S('5.7','Absolute Orientation','绝对定向',118,'用外部基准给相对模型尺度、姿态与位置；完整三维控制与部分平高控制不能按同一种点数背诵。',[P('w5','s55'),P('w4','@一个小模型如何恢复尺度和位置')]),
 S('5.8','Block Triangulation','区域网三角测量',119,'按英文书把区域网紧接在两种定向后面。王书的航带网、独立模型网与光束网成为本节对不同平差单元的完整解释。',[P('bridge','bundle-control'),P('w5','s56'),L('w6','s61'),P('w6','s62'),P('w6','s63'),L('w6','s64')]),
 S('5.9','Block Adjustment with Added Parameters (Self-Calibration)','附加参数与自检校',124,'把系统参数加入模型会增加表达能力，也会引入相关性和弱可观测性。不能把残差变小直接当相机参数已经可靠。',[P('w6','s64-selfcal')]),
 S('5.10','Utilization of Navigational Data','导航观测的利用',125,'英文书在这里讨论导航辅助；王书GPS/POS补入杆臂、安装角、时间同步、控制与精度条件。',[P('w6','s65'),P('w6','s66')]),
 S('5.11','Numerical Aspects of Bundle Adjustment','光束平差的数值问题',130,'把求解组织放在导航和模型之后：先明确同一线性化系统，再讨论分块、Schur、初值、秩亏及回代。',[P('gaps','@权矩阵并非默认每个像坐标都独立'),P('w6','s64-schur'),P('w6','s64-example'),A('gaps','@两类未知量、块结构和Schur改化','书p.134说明：'),P('numerics','numerical-extensions'),P('w6','s64-initial'),P('w6','s64-datum'),P('w6','workflow')]),
 S('5.12','Evaluation of the Block Adjustment','区域网平差的评价',142,'收敛只是计算信号；按原著的规划模拟、图形诊断、精密度、准确度和可靠性组织评价，再用王书检查点算例落实。',[P('mathadd','evaluation'),P('w6','s64-accuracy'),P('bridge','quality-evidence'),P('w6','reading')])]},
{n:6,en:'Digital Photogrammetry',zh:'数字摄影测量',range:'p.152–202 / PDF164–214；本讲为已有数字基础专题',sections:[
 S('6.1','Digital Imagery','数字影像',153,'本讲继承现有数字基础，不宣称完整展开英文书第6章的全部算法。',[P('w1','digital-image')]),
 S('6.2','Digital Image Processing','数字处理的任务',156,'先区分图像处理、识别与几何量测，再进入重采样和匹配。',[P('intro','cv-links')]),
 S('6.3','Digital Image Resampling','数字重采样',164,'几何上找到原像位置，还需把原像灰度放入新的像元格。',[P('products','@2 核线让二维搜索变成一维搜索'),P('products','@5 双线性插值：一个非整数坐标怎样取值？'),P('products','@6 为什么 DOM 通常采用逆映射？')]),
 S('6.4','Digital Image Compression','数字压缩：条件与回读',166,'原著本节完整算法保留原页回读；这里说明与量测有关的最小边界。',[`无损压缩可恢复原始数字值；有损压缩通过近似减少存储，可能改变纹理、边缘和匹配线索。压缩率高低不直接表示几何精度。量测项目应保留原始数据、压缩方式与参数，使用处理后的影像时需评价对任务的影响。原著p.166起 / PDF178起；这里不虚构已完成全部编码算法推导。`]),
 S('6.5','Digital Image Measurement','数字量测',168,'从对应像点到三维点仍要经过标定和交会，算法输出不能跳过几何检查。',[P('products','@1 同名点怎样从人工识别变成影像匹配？'),P('products','@3 匹配之后还要交会，才得到三维点')]),
 S('6.6','Computer Vision','计算机视觉',169,'现代SfM与视觉匹配是延伸阅读；相关任务与摄影测量的精度、基准要求须分别理解。',[`特征检测与描述提供对应候选，几何约束剔除部分错误，联合平差改正相机与点。分类正确率、像素匹配误差、重投影残差与地面坐标误差衡量的对象不同，不能互相替代。第6章其余视觉算法和§6.7数字影像模拟请结合[英文原著章节地图](./photogrammetry-sources.md)继续读；本讲未逐节展开全部视觉理论。`])]},
{n:7,en:'Photogrammetric Instruments',zh:'摄影测量仪器',range:'p.203–224 / PDF215–236；继承王书立体测图仪器解释',sections:[
 S('7.1','Introduction','仪器与计算的共同任务',203,'同一成像几何可以由不同仪器与计算方式实现，按英文书将仪器放到解析理论之后回看。',[L('w4','s4-4'),P('intro','processing')]),
 S('7.2','Hardcopy-based Instruments','胶片与硬拷贝仪器',204,'利用王书对模拟与解析测图仪的说明，看懂物理投影与数学伺服怎样完成同一量测。',[P('w4','@模拟法：把成像关系装进光学与机械结构'),P('w4','@解析法：计算机求理论像点，伺服让人看到它')]),
 S('7.3','Softcopy-based Systems','数字测图系统',214,'数字化改变数据载体和交互方式，控制、几何与编辑判断仍有作用。',[P('w4','@数字法：像元数据进入几何与匹配流程'),P('w4','@人还在流程中的什么位置')])]},
{n:8,en:'Photogrammetric Products',zh:'摄影测量产品',range:'p.225–246 / PDF237–258；继承已有产品基础并连接质量',sections:[
 S('8.1','Hardcopy Photogrammetric Products','地图与硬拷贝表达',225,'平面地图、影像和三维模型表达不同信息，不能只看屏幕上是否清晰。',[P('w3','@航摄照片与地形图的三个差别')]),
 S('8.2','Digital Photogrammetric Products','数字产品',228,'将第1章的产品名词落实为数据表示和生成条件。',[P('w1','products'),P('products','@4 点云如何变成 DEM、DSM、DTM？')]),
 S('8.3','Geographic Information Systems','GIS中的摄影测量数据',239,'几何成果进入GIS后，还需要对象、属性、坐标基准与来源。',[`影像像元、矢量要素和地表格网需要通过坐标参考建立空间联系。相同位置不表示相同语义，产品间转换还可能改变采样、拓扑和属性。来源时间、处理级别、精度与使用条件应一起保存；不能因能叠加显示就宣布彼此精度一致。`]),
 S('8.4','Three-Dimensional Products','三维产品',240,'几何与贴图分别检查，遮挡和表面定义影响产品。',[`三维点云、三角网与带纹理模型不是同一种表示。纹理让模型容易辨识，却不能修复尺度或基准错误。解释建筑、植被和地面模型时，先说清表面包含什么，再报告采样与检查证据。第1讲的三维课件案例可在这些表示之间对照。`]),
 S('8.5','Product Accuracy','产品精度',242,'延续第5章平差评价，把坐标质量与实际产品使用连接。',[P('products','@7 外业控制与检查点决定成果是否可信')]),
 S('8.6','Photogrammetric Project Planning','项目规划',243,'从目标产品倒推传感器、覆盖、控制、检查与交付。',[`先定用途和精度要求，再定地面采样、重叠、网形、控制与独立检查。几何完整但受遮挡的地方仍可能缺数据；采集很密也不保证基准正确。交付时同时提供坐标/高程基准、采集时间、处理说明、覆盖缺口与质量报告。`])]}];

fs.mkdirSync('reports',{recursive:true});
for(const ch of chapters){
 const dest=`/photogrammetry-en-${String(ch.n).padStart(2,'0')}.html`;
 let md=`---\ntitle: 第${ch.n}讲 · ${ch.zh}\ndescription: 按Introduction to Modern Photogrammetry第${ch.n}章顺序融合两本教材的讲义\n---\n\n# ${ch.n} · ${ch.en}\n\n${ch.zh}\n\n本讲的**知识顺序按英文原著第${ch.n}章**（${ch.range}），中文解释融合王佩军、徐亚明教材及已核课件，配图与推导继承此前核验结果。书页引用是来源定位；下列中文和标注的英文短句是教学重写。原著目录顺序不等于所有原著细节均已完整重写。\n\n`;

 md+='[学习总览](./course-photogrammetry.md) · [教材与265页PPT对应](./photogrammetry-coverage.md) · [两书符号约定](./photogrammetry-conventions.md)\n\n';
 for(const section of ch.sections){
  md+=`## ${section.n} ${section.en} · ${section.zh} {#e${section.n.replaceAll('.','-')}}\n\n<LearningMark section="photo-en-${section.n.replaceAll('.','-')}" label="${section.n}" />\n\n原著印刷p.${section.page}起 / PDF${section.page+12}起。${section.intro}\n\n`;
  const derivationKey=ch.n===2||ch.n===3?'derive23':ch.n===4?'derive4':ch.n===5?'derive5':'deriverest';
  const derivationId='derive-'+section.n.replaceAll('.','-');
  // Retain provenance routes, but render the rewritten continuous lesson.
  for(const part of section.parts)render(part,dest);
  render(P(derivationKey,derivationId),dest);
  const group=ch.n===2||ch.n===3?'23':ch.n===4?'4':ch.n===5?'5':'1678';
  const integratedId='integrated-'+section.n.replaceAll('.','-');
  let body=locate('_fragments/photogrammetry-integrated-'+group,integratedId).text;
  body=body.slice(body.indexOf('\n')+1);
  body=body.replace(/<LearningMark\b[^>]*\/>/g,'')
   .replace(new RegExp('<span id="e'+section.n.replace('.','-')+'"></span>','g'),'')
   .replace(/^原著印刷p\.[^\n]*$/gm,'')
   .replace(/^#{2,3} 本讲自学检查[^\n]*[\s\S]*$/m,'')
   .replace(/\n{3,}/g,'\n\n');
  md+=`<span id="${integratedId}"></span>\n\n`+body+'\n\n';

  sections.push({chapter:ch.n,section:section.n,en:section.en,zh:section.zh,printedPage:section.page,pdfPage:section.page+12,target:dest+`#e${section.n.replaceAll('.','-')}`});
 }
 md+='\n## 本讲自学检查 {#self-check}\n\n选一个小节，用图说明已知与未知，写出公式的单位及条件，再用一句英文复述结论。遇到不同教材的符号，先转换坐标与矩阵方向，不能直接混代。\n\n';
 const [question,answer]=selfChecks[ch.n];md+=`**先独立回答：** ${question}\n\n<details><summary>展开思路与条件</summary>\n\n${answer}\n\n</details>\n\n`;
 if(ch.n<8)md+=`[继续第${ch.n+1}讲](./photogrammetry-en-${String(ch.n+1).padStart(2,'0')}.md) · `;
 md+='[本机教材与课件](./photogrammetry-sources.md)\n';
 fs.writeFileSync(`docs/photogrammetry-en-${String(ch.n).padStart(2,'0')}.md`,md);
}
// Resolve all old explicit anchors to the nearest retained parent or containing
// source fragment. This preserves page-by-page coverage after prose is moved.
for(const [name,text] of cache){
 for(const m of text.matchAll(/^(#{2,4}) (.+)\{#([^}]+)\}/gm)){
  const old='/'+name+'.html#'+m[3];if(routes.has(old))continue;
  const key=[...Object.keys({w1:1,w2:1,w3:1,w4:1,w5:1,w6:1,intro:1,optics:1,sensor:1,products:1,camera:1,stereo:1,bridge:1})].find(k=>slug(k)===name);
  if(!key)continue;
  const candidates=used.filter(x=>x.source===name);
  const parent=locate(key,m[3]);
  const contained=candidates.find(x=>{try{return parent.text.includes(locate(key,x.section).text.split('\n')[0])}catch{return false}});
  if(contained)remember(old,contained.target);
 }
}
// Explicit parents that are intentionally distributed across several chapters.
const parentFallbacks={
 '/photogrammetry-wang-01.html#section-1-2':'/photogrammetry-en-01.html#e1-5',
 '/photogrammetry-wang-01.html#section-1-3':'/photogrammetry-en-01.html#e1-2',
 '/photogrammetry-wang-02.html#section-2-1':'/photogrammetry-en-03.html#e3-5',
 '/photogrammetry-wang-02.html#section-2-2':'/photogrammetry-en-03.html#e3-10',
 '/photogrammetry-wang-03.html#s3-1':'/photogrammetry-en-02.html#e2-2',
 '/photogrammetry-wang-03.html#worked-route':'/photogrammetry-en-04.html#e4-5',
 '/photogrammetry-wang-04.html#worked-route':'/photogrammetry-en-05.html#e5-7'};
for(const [old,target] of Object.entries(parentFallbacks))routes.set(old,target);
const wholePages={w1:'/photogrammetry-en-01.html',w2:'/photogrammetry-en-03.html',w3:'/photogrammetry-en-04.html',w4:'/photogrammetry-en-02.html#e2-6',w5:'/photogrammetry-en-05.html#e5-3',w6:'/photogrammetry-en-05.html#e5-8',intro:'/photogrammetry-en-01.html',optics:'/photogrammetry-en-03.html#e3-2',sensor:'/photogrammetry-en-03.html#e3-3'};
for(const ch of chapters){
 const file=`docs/photogrammetry-en-${String(ch.n).padStart(2,'0')}.md`;let text=fs.readFileSync(file,'utf8');
 text=text.replace(/\]\((\.?\/?photogrammetry-[^\s)]+)\)/g,(match,url)=>{
  const normalized='/'+url.replace(/^\.\//,'').replace(/^\//,'').replace(/\.(?:md|html)(?=#|$)/,'.html');
  const [base,hash]=normalized.split('#');const full=base.endsWith('.html')?base:base+'.html';
  if(hash&&routes.has(full+'#'+hash))return ']('+routes.get(full+'#'+hash)+')';
  if(!hash){const key=Object.keys(wholePages).find(k=>'/'+slug(k)+'.html'===full);if(key)return ']('+wholePages[key]+')';}
  return match;
 });fs.writeFileSync(file,text);
}
const derivationRows=sections.map(s=>{
 const group=s.chapter===2||s.chapter===3?'23':s.chapter===4?'4':s.chapter===5?'5':'1678';
 const source='_fragments/photogrammetry-integrated-'+group;
 const id='integrated-'+s.section.replaceAll('.','-');
 const part=locate(source,id);
 return {...s,derivation:s.target.split('#')[0]+'#'+id,source:'docs/'+source+'.md',characters:part.text.length,displayEquations:(part.text.match(/\$\$/g)||[]).length/2};
});
fs.writeFileSync('public/photogrammetry/derivations.json',JSON.stringify({scope:'Continuous explanations integrated at first use across all 56 existing main sections; later chapters retain stated scope limits',sections:derivationRows},null,2)+'\n');
fs.writeFileSync('docs/photogrammetry-derivations.md','# 推导已融入各节正文\n\n概念、图示、公式的条件与推导现在在对应小节中连续阅读。请从[摄影测量讲义](./course-photogrammetry.md)按课堂次序学习。旧链接保留用于兼容历史书签。\n');
fs.writeFileSync('public/photogrammetry/order.json',JSON.stringify({basis:'Introduction to Modern Photogrammetry',scope:'English order; inherited Wang chapters 1–6 and all 265 PPT pages; chapters6–8 existing extensions, later chapters in source map',assembly:'Integrated prose from photogrammetry-integrated-*; blocks retain pre-rewrite provenance locations and sizes, not the final wording',sections,routes:Object.fromEntries(routes),blocks:used},null,2)+'\n');
const cfg=JSON.parse(fs.readFileSync('study-space.config.json','utf8')),course=cfg.courses.find(c=>c.id==='photogrammetry');
course.chapters=[...chapters.map(c=>({slug:`photogrammetry-en-${String(c.n).padStart(2,'0')}`,title:`${c.n} · ${c.zh} / ${c.en}`})),
 {slug:'photogrammetry-conventions',title:'两书符号、目录与来源对照'},{slug:'photogrammetry-english',title:'英文原著阅读训练'},
 {slug:'photogrammetry-review',title:'期末复习与勘误'},{slug:'photogrammetry-coverage',title:'教材与265页PPT覆盖'},
 {slug:'photogrammetry-quality',title:'校验、自评与范围'}];
course.start='/photogrammetry-en-01.html';course.summary='按英文教材章节学习，融合两书的概念、图示、推导与算例，并逐页对应课堂PPT。';course.scope='英文教材顺序 · 双教材融合 · 265页PPT';course.status='前五讲深入理论，6–8讲保留已有拓展；原书来源可追溯';
fs.writeFileSync('study-space.config.json',JSON.stringify(cfg,null,2)+'\n');
console.log(`Integrated ${sections.length} sections into ${chapters.length} English-order lectures; retained ${used.length} source-block provenance records.`);
