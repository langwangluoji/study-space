---
title: 摄影测量 · 按英文教材顺序的双语讲义
description: 英文教材安排学习次序，两本教材共同支撑概念、推导与算例，逐页联系课堂PPT。
prev: false
next: {text: 1 · Introductory Concepts, link: /photogrammetry-en-01}
---

# 摄影测量 · 跟着英文课本学懂两本教材

## 同一个点，贯穿八讲 {#shared-case}

这套讲义跟着英文教材的章节走，但每一讲都推进同一项测量：**用两张照片求点P的坐标，说明它有多准，并能交付地图产品。** 王佩军、徐亚明教材提供已有详细推导；课堂潘励第三版的已核章节与新第2章PPT按主题接入，版本和核读范围见[来源说明](./photogrammetry-sources.md#pan-classroom)。

统一工作单：$C_1=(0,0,1000)$ m、$C_2=(300,0,1000)$ m，$R_1=R_2=I$，标定主距$f=150$ mm，物点$P=(200,100,0)$ m。地面Z向上，$q=R^T(P-C)$、$q_z<0$，等效像面$z=-f$。因此左像$(30,15)$ mm，右像$(-15,15)$ mm，横视差45 mm。默认230 mm方幅、10 μm教学像元保证这些点在片内；若改成36 mm全像幅，左像$x=30$ mm已被裁掉。

1. **先能拍到：** [第2讲](./photogrammetry-en-02.md)确定尺度、共同覆盖、像坐标与视差。
2. **再能量准：** [第3讲](./photogrammetry-en-03.md)排查模糊、像移、畸变和检校；[第4讲](./photogrammetry-en-04.md)把同一几何写成坐标与方程。
3. **解出点位：** [第5讲](./photogrammetry-en-05.md#task-ledger)完成控制后交、前交、模型安放、区域网和验收。
4. **交付并解释：** [第6–8讲](./photogrammetry-en-06.md)衔接匹配、仪器、DEM/DOM与独立检查。

每完成一步，记录“哪些是观测、哪些已知、哪些待求、用了什么前提”。只记公式而不写这四项，很容易把后交当作前交、把精密度当作准确度。考前用[关键公式与题型速查](./review-photogrammetry.md)，推导仍回各讲。

Photogrammetry · One course sequence, two textbook perspectives

老师按 *Introduction to Modern Photogrammetry* 授课，这套讲义也按它的章节与核心小节次序阅读。中文解释、配图、公式推导和例题融合王佩军、徐亚明教材及英文原著；同一概念尽量连续讲清，书的章号只作为出处。

先用第2章的相似三角形和立体关系建立直觉，再在第3章认识真实传感系统，第4章写严密几何，第5章改变已知与未知完成解算。王书原第五章与第六章的大部分内容都在这里的第5讲，不再另设一套并行主线。

## 按课堂顺序进入 {#photo-path}

|英文课本顺序|本讲要解决的问题|两书融合与课堂资料|
|---|---|---|
|[1 · Introductory Concepts 入门概念](./photogrammetry-en-01.md)|测什么，系统怎样工作，产物是什么？|融合王书绪论与PPT定义、系统、应用、资料、历史|
|[2 · Elementary Photogrammetry 初等摄影测量](./photogrammetry-en-02.md)|照片中的尺度、位移和视差怎样携带空间信息？|保留王书的特殊点线面、立体视觉、浮游测标；从2.1投影读到2.8核线|
|[3 · Photogrammetric Sensing Systems 传感系统](./photogrammetry-en-03.md)|光怎样经过镜头、探测器和摄影系统成为可量测影像？|按PPT的3.1–3.10，把王书航空/遥感设备知识就近整合|
|[4 · Mathematical Concepts 数学概念](./photogrammetry-en-04.md)|不同坐标、内外方位与条件方程怎样连接？|融合王书坐标/共线/共面，补原著卫星时变几何|
|[5 · Resection, Intersection, and Triangulation 交会与三角测量](./photogrammetry-en-05.md)|怎样从已知观测求相机、物点、模型和区域网？|融合王书解析基础与空三，补英文坐标精化、反投影与评价|

第1、3章PPT共265个物理页，另已核入新第2章PPT的104个物理页。第2章页码逐页作主题定位；主点换算、立体高度夸大与航片边界计数新增了具体衔接，其余不宣称逐页重制。潘励第三版与王书是不同教材，章节不互换。查某一页用[逐页覆盖表](./photogrammetry-coverage.md)。

概念、原图、条件和推导在正文中连续展开：先说明空间关系与符号，再得到公式，随后用例子和特殊情形检查。

## 每次读一小节，不必一口气读完整章 {#reading}

每次25–40分钟：先画出对象和坐标，再顺着推导计算一个例子，最后回原著读对应的一段。页右大纲按英文小节编号定位；每节先说明任务与条件，详细解释在下面连续展开，原图可放大，长矩阵在窄屏中可横向查看。

第5讲较长，建议分成五个阶段，每阶段可再分为多次25–40分钟的学习：

1. [5.1–5.2 准备观测与像坐标](./photogrammetry-en-05.md#e5-1)：弄清量测、系统改正、已知与未知。
2. [5.3–5.5 后交、反投影与前交](./photogrammetry-en-05.md#e5-3)：同一射线模型，三个不同输入输出任务。
3. [5.6–5.7 相对与绝对定向](./photogrammetry-en-05.md#e5-6)：先恢复内部模型，再赋尺度与地面基准。
4. [5.8–5.10 区域网、自检校与导航](./photogrammetry-en-05.md#e5-8)：把多源观测放进同一模型。
5. [5.11–5.12 数值求解与质量评价](./photogrammetry-en-05.md#e5-11)：理解Schur、基准、残差、精度和可靠性。

## 两本书的表述怎样一起读 {#two-books}

先对齐概念，再比较字母。英文的sensor model / platform model与王书内外方位讨论相接；相对定向、绝对定向与光束法用同一套已知/未知来说明。存在符号、坐标方向或历史术语差异时，正文给明确条件，不把两条形式不同的式子直接拼接。

特别要区分光学焦距和标定主距、像元和像坐标、摄站高程和相对航高、物理感光面和等效投影坐标。[两书符号与来源对照](./photogrammetry-conventions.md)提供统一约定。中文解释、原创英文短句与原著引文分别标明；[12个英文阅读训练](./photogrammetry-english.md)帮助逐渐减少中文支架。

## 英文后续章节中的已有内容 {#later}

下列篇章按英文书第6–8章归位，继承现有数字、仪器和产品基础，深度不同于前五讲，不宣称已重写英文书全部算法：

- [6 · Digital Photogrammetry 数字摄影测量](./photogrammetry-en-06.md)：数字影像、匹配、重采样与插值。
- [7 · Photogrammetric Instruments 摄影测量仪器](./photogrammetry-en-07.md)：保留王书模拟、解析与数字测图的解释。
- [8 · Photogrammetric Products 摄影测量产品](./photogrammetry-en-08.md)：DEM/DSM/DTM、DOM、GIS与产品精度。

第9章近景、第10章多/高光谱、第11章主动传感及附录A–G保留在[英文原著完整章节地图](./photogrammetry-sources.md)中延伸阅读。本轮完整保留的范围是王书前六章知识、三份PPT的主题对照、已融合正文与已核英文原页；没有用目录入口冒充其余章节的完整讲义。

## 复习与核对 {#coverage}

- [教材与PPT覆盖](./photogrammetry-coverage.md)：28个王书原节、369页PPT的分层主题/融合定位与英文次序。
- [期末复习与勘误](./photogrammetry-review.md)：压缩资料用来查重点，条件和推导回主讲义确认。
- [校验、自评与范围](./photogrammetry-quality.md)：查看真实来源核读、数学验证、双端审阅及限制。
- [本机教材与课件](./photogrammetry-sources.md)：选择本机PDF，按讲义页码回读。
