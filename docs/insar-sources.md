---
title: InSAR · 资料来源、页码与修订
prev: false
next: false
---

# 资料来源、页码与修订

本课程以教师已提供的三讲确定范围，以参考书补充原理和核对关系。页码中的“文件页”从 PDF 第 1 页开始计数；“印刷页”指书页上印出的页码。三章重新组织为连贯讲义，保留资料署名，不逐字重刊。

## 来源与实际使用范围 {#sources}

| 编号 | 原资料与署名 | 文件页数 | 本次用途 |
| --- | --- | --- | --- |
| L1 | 张磊、梁鸿俞，同济大学测绘与地理信息学院，[《第一讲：微波遥感基础》](material-insar-l1.html)，202609 | 92 | 课堂范围、微波观测、波与复信号、极化、散射、任务举例 |
| L2 | 同课程，[《第二讲：合成孔径雷达成像原理》](material-insar-l2.html)，202609 | 106 | 侧视雷达、距离与方位分辨率、脉冲压缩、合成孔径、工作模式与参数 |
| L3 | 同课程，[《第三讲：SAR 图像特征及解译》](material-insar-l3.html)，202610 | 59 | 参数、极化、尺度与几何特征；统计与典型地物按教材及标明的教学补充展开 |
| B1 | 廖明生、王腾，[《时间序列 InSAR 技术与应用》](material-insar-book.html)，科学出版社，2014 | 259 | 视觉核读封面/版权/目录；第 2 章印刷 19–32 页、34–37 页的相关原理；第 3 章印刷 55–57 页仅用于确定后续误差分析边界 |

B1 为扫描本，自动文本层不能代表正文内容。本次按真实页图核读相关位置，**没有对整本 259 页进行逐式审校**。书中印刷页 1 对应文件页 12，在本次引用的正文页段中换算为“文件页 = 印刷页 + 11”。课本第 2 章的“基本原理”用于辅助课堂前三讲，课本章号不是本站章号。

三份课堂 PDF 与完整教材现已接入在线阅读页，原件名称、大小与校验信息保留。课堂配图用于当前概念说明，保留原页内容与署名。原件的完整范围超出已整理的前三章，全文可阅读不表示全部内容已经核读或改写。本站原创整理的[前三章离线讲义包](insar/downloads/insar-first-three-chapters.zip)包含 Markdown、配图和来源索引，完整原件通过上述资料页另行阅读。

## 公开补核资料 {#public-references}

课堂与扫描书之外，以下原始技术资料用于核对补充解释。任务运行状态、可获取模式等会变化，选择真实数据仍应查当时的产品说明。

| 来源 | 用于核对的概念 |
| --- | --- |
| [Copernicus SentiWiki：Sentinel-1 产品说明](https://sentiwiki.copernicus.eu/web/s1-products) | IW 的三子条带 TOPSAR 获取方式；SLC 与 GRD 的复数/检测处理、斜距/地距坐标；分辨率与像元间距分别列示 |
| [ESA SNAP：辐射定标算子说明](https://step.esa.int/main/wp-content/help/versions/12.0.0/snap-toolboxes/eu.esa.microwavetbx.sar.op.calibration.ui/operators/CalibrationOp.html) | 定量后向散射需使用产品定标信息，不能把原始数字强度直接当作定标系数 |
| [ESA InSAR Principles，Part C](https://www.esa.int/esapub/tm/tm19/TM-19_ptC.pdf)，章节 1.1.4 与相干估计部分 | 充分发展相干斑的统计假设、强度平均与分辨率代价；相干估计与窗口统计 |
| [加拿大航天局：RADARSAT-2](https://www.asc-csa.gc.ca/eng/satellites/radarsat2/about.asp) | 2007 年 12 月 14 日发射，修正课堂平台表的年份；不据该历史事实断言当前数据可用性 |
| [DLR：TanDEM-X](https://www.dlr.de/en/eoc/research-transfer/topics/missions/tandem-x) | 2010 年 6 月 21 日发射，修正课堂年份；区分双站编队 DEM 测量与单景空间分辨率 |
| [JAXA：ALOS 特性](https://www.eorc.jaxa.jp/ALOS/en/alos/a1_about_e.htm) | 标准回归周期 46 天，不能把原表的 4.6 天当作 ALOS 的回归周期 |

公式推导与算例按本站定义独立复算，不以另一轮模型回答作为事实依据。公开资料的定位与核验记录随维护文档保存。

## 知识对应 {#coverage}

| 网站主线 | 课堂文件页 | 教材补核与说明 |
| --- | --- | --- |
| 观测方式、优势与局限 | L1 11–25 | 大气、穿透与形变信息的适用条件写在正文 |
| 发展与代表任务 | L1 26–44；L2 64–89 | 任务比较取课件参数语境，不视作 2026 在轨状态清单 |
| 波、振幅、相位与叠加 | L1 45–53 | B1 印刷 23–24、27 页：复图像、相干叠加与干涉差分 |
| 极化、介电与散射 | L1 54–92；L3 8–17 | B1 印刷 23 页的散射机制；地物表是有条件的教学归纳 |
| 侧视与真实孔径 | L2 10–42 | B1 印刷 19–21 页，局部平地地距关系另行推导核对 |
| 脉冲压缩与合成孔径 | L2 43–63 | B1 印刷 21–22 页的孔径量级关系；网站展开信号推导 |
| 工作模式与数据产品 | L2 64–89；L3 3–7 | 区分获取模式、重复周期、SLC 与 GRD；不把产品名称当传感器能力 |
| 图像尺度与几何畸变 | L3 18–59 | B1 印刷 25–26 页；坡角条件由网站图形与距离导数解释 |
| 复散射、相干斑与多视 | L3 目录列出但实质未展开 | B1 印刷 24 页及统计模型的明确假设；不宣称逐页来自 L3 |
| 干涉联系、相干与解缠边界 | L1 21–23；三章之间的教学联系 | B1 印刷 27–29、32、34–37 页；不展开完整反演处理 |

各章末尾另列细分来源与具体修正。课堂历史、示例影像、仪器照片用于背景，不因全部读取了 PDF 而声称每张图片都已重刊。

本次课堂对照补回了原先压缩过多的中间知识：L1 45–55 页的波与光子、干涉、阵列和衍射，66–74 页的大气，78–92 页的散射截面与穿透；L2 3–18 页的传感器家族、25–29 页的天线与幅宽、61–105 页的发展和平台模式、106 页的数据入口；L3 3–17 页的参数与原图通道、22–25 页的高程像点位移、43–50 页的压缩表、阴影与 DEM 练习、51–59 页的光学比较和方向判读。统计、定标与相干性仍保留为标明来源的教材和处理补充。

<!-- insar-ppt-coverage:start -->
## 按课堂原页查讲义 {#ppt-coverage}

以下逐页对应三份课堂 PDF。点击文件页可打开原件的对应页，点击讲义位置可回到解释与推导。标题、目录、历史资料和重复图例也列出，但不把它们误写成新的理论知识点。教材和本站推导负责补足理解，不改变课堂材料的主次关系。

<details><summary>第一讲 · 微波遥感基础 · 92 个文件页</summary>

| 原件文件页 | 课堂主题 | 讲义位置 | 阅读说明 |
| --- | --- | --- | --- |
| [1](material-insar-l1.html#page=1) | 课程封面 | [课程封面](insar-microwave.html#insar-microwave) | 保留标题与原课件出处，正文重排为连续知识链 |
| [2](material-insar-l1.html#page=2) | 四部分内容提纲 | [四部分内容提纲](insar-microwave.html#insar-microwave) | 保留标题与原课件出处，正文重排为连续知识链 |
| [3](material-insar-l1.html#page=3) | 理论与实践课程目标 | [理论与实践课程目标](insar-microwave.html#microwave-observation) | 补测量、解释、处理及算法目标与后续章节连接 |
| [4](material-insar-l1.html#page=4) | 教材及网络参考资料 | [教材及网络参考资料](insar-microwave.html#microwave-sources) | 保留课件与教材出处及补充/修正边界 |
| [5](material-insar-l1.html#page=5) | 课时、考试、评分及软件准备 | [课时、考试、评分及软件准备](insar-microwave.html#microwave-sources) | 标记为原课件行政页，仅由源资料保留；不当作科学概念缺失 |
| [6](material-insar-l1.html#page=6) | 全课程讲次及课时安排 | [全课程讲次及课时安排](insar-microwave.html#microwave-sources) | 标记为原课件行政页，仅由源资料保留；不当作科学概念缺失 |
| [7](material-insar-l1.html#page=7) | 测绘的位置、位移与属性 | [测绘的位置、位移与属性](insar-microwave.html#microwave-observation) | 补空间位置、属性及GNSS/RS/GIS分工 |
| [8](material-insar-l1.html#page=8) | 现代测绘及GNSS、RS、GIS | [现代测绘及GNSS、RS、GIS](insar-microwave.html#microwave-observation) | 补空间位置、属性及GNSS/RS/GIS分工 |
| [9](material-insar-l1.html#page=9) | 电磁学与空间信息感知 | [电磁学与空间信息感知](insar-microwave.html#microwave-history) | 用电磁学—传播—感知链说明，历史图作为来源背景 |
| [10](material-insar-l1.html#page=10) | 电磁波感知示意图 | [电磁波感知示意图](insar-microwave.html#microwave-history) | 用电磁学—传播—感知链说明，历史图作为来源背景 |
| [11](material-insar-l1.html#page=11) | 电磁波谱与反射/热红外 | [电磁波谱与反射/热红外](insar-microwave.html#microwave-spectrum) | 补波谱、能量来源和光学/微波比较表 |
| [12](material-insar-l1.html#page=12) | 光学与微波影像对比 | [光学与微波影像对比](insar-microwave.html#microwave-spectrum) | 补波谱、能量来源和光学/微波比较表 |
| [13](material-insar-l1.html#page=13) | 遥感波段分类与研究问题 | [遥感波段分类与研究问题](insar-microwave.html#microwave-spectrum) | 补波谱、能量来源和光学/微波比较表 |
| [14](material-insar-l1.html#page=14) | 微波频段名称与波长范围 | [微波频段名称与波长范围](insar-microwave.html#microwave-wavelength) | 保留波段并补频率换算和应用条件 |
| [15](material-insar-l1.html#page=15) | 波长与频率对应 | [波长与频率对应](insar-microwave.html#microwave-wavelength) | 保留波段并补频率换算和应用条件 |
| [16](material-insar-l1.html#page=16) | 云雨雪中的传播优势 | [云雨雪中的传播优势](insar-microwave.html#microwave-penetration) | 区分云层传播与地物穿透，保留撒哈拉例并限定干燥低损耗条件 |
| [17](material-insar-l1.html#page=17) | 云覆盖与全天时需求 | [云覆盖与全天时需求](insar-microwave.html#microwave-penetration) | 区分云层传播与地物穿透，保留撒哈拉例并限定干燥低损耗条件 |
| [18](material-insar-l1.html#page=18) | 撒哈拉SIR-A与光学影像 | [撒哈拉SIR-A与光学影像](insar-microwave.html#microwave-penetration) | 区分云层传播与地物穿透，保留撒哈拉例并限定干燥低损耗条件 |
| [19](material-insar-l1.html#page=19) | 波长、湿度与穿透趋势 | [波长、湿度与穿透趋势](insar-microwave.html#microwave-penetration) | 区分云层传播与地物穿透，保留撒哈拉例并限定干燥低损耗条件 |
| [20](material-insar-l1.html#page=20) | 高度计、海面高度与风场 | [高度计、海面高度与风场](insar-microwave.html#microwave-capabilities) | 补高度计、散射计、DEM、地震、冰川等观测量与成果联系 |
| [21](material-insar-l1.html#page=21) | 回波振幅、相位及干涉 | [回波振幅、相位及干涉](insar-microwave.html#microwave-capabilities) | 补高度计、散射计、DEM、地震、冰川等观测量与成果联系 |
| [22](material-insar-l1.html#page=22) | 巴楚干涉相位与DEM | [巴楚干涉相位与DEM](insar-microwave.html#microwave-capabilities) | 补高度计、散射计、DEM、地震、冰川等观测量与成果联系 |
| [23](material-insar-l1.html#page=23) | 巴姆地震形变与冰川流动 | [巴姆地震形变与冰川流动](insar-microwave.html#microwave-capabilities) | 补高度计、散射计、DEM、地震、冰川等观测量与成果联系 |
| [24](material-insar-l1.html#page=24) | 微波技术优势汇总 | [微波技术优势汇总](insar-microwave.html#microwave-capabilities) | 补高度计、散射计、DEM、地震、冰川等观测量与成果联系 |
| [25](material-insar-l1.html#page=25) | 几何畸变、信噪比与限制 | [几何畸变、信噪比与限制](insar-microwave.html#microwave-capabilities) | 保留侧视畸变、噪声及解译限制并连接第三章 |
| [26](material-insar-l1.html#page=26) | 微波遥感四阶段 | [微波遥感四阶段](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [27](material-insar-l1.html#page=27) | 古代光学思想与小孔成像 | [古代光学思想与小孔成像](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [28](material-insar-l1.html#page=28) | 微粒说与波动说的历史 | [微粒说与波动说的历史](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [29](material-insar-l1.html#page=29) | 杨氏双缝干涉 | [杨氏双缝干涉](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [30](material-insar-l1.html#page=30) | 法拉第电磁感应 | [法拉第电磁感应](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [31](material-insar-l1.html#page=31) | 菲索齿轮测光速 | [菲索齿轮测光速](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [32](material-insar-l1.html#page=32) | 麦克斯韦电磁理论 | [麦克斯韦电磁理论](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [33](material-insar-l1.html#page=33) | 赫兹实验与马可尼通信 | [赫兹实验与马可尼通信](insar-microwave.html#microwave-history) | 凝练四阶段与光学—电磁学发展主线；不逐字重复历史轶事 |
| [34](material-insar-l1.html#page=34) | Radar含义与早期雷达 | [Radar含义与早期雷达](insar-microwave.html#microwave-observation) | 补Radio Detection And Ranging与测距含义 |
| [35](material-insar-l1.html#page=35) | 脉冲、真实孔径与SAR起源 | [脉冲、真实孔径与SAR起源](insar-microwave.html#microwave-history) | 补脉冲雷达、真实孔径、SAR与星载发展四阶段 |
| [36](material-insar-l1.html#page=36) | 空间微波遥感与SEASAT | [空间微波遥感与SEASAT](insar-microwave.html#microwave-history) | 补脉冲雷达、真实孔径、SAR与星载发展四阶段 |
| [37](material-insar-l1.html#page=37) | 1990年代多国SAR任务 | [1990年代多国SAR任务](insar-microwave.html#microwave-history) | 补脉冲雷达、真实孔径、SAR与星载发展四阶段 |
| [38](material-insar-l1.html#page=38) | 雷达演进事件图 | [雷达演进事件图](insar-microwave.html#microwave-history) | 补脉冲雷达、真实孔径、SAR与星载发展四阶段 |
| [39](material-insar-l1.html#page=39) | 现代国际SAR任务谱系 | [现代国际SAR任务谱系](insar-microwave.html#microwave-missions) | 以任务族、波段、分辨率与测量目的组织比较；日期以共享来源核验记录为准 |
| [40](material-insar-l1.html#page=40) | 我国早期样机及机载SAR | [我国早期样机及机载SAR](insar-microwave.html#microwave-history) | 补样机、星载实验及民用应用的发展链 |
| [41](material-insar-l1.html#page=41) | 我国星载微波探测实验 | [我国星载微波探测实验](insar-microwave.html#microwave-history) | 补样机、星载实验及民用应用的发展链 |
| [42](material-insar-l1.html#page=42) | HJ-1C与高分三号 | [HJ-1C与高分三号](insar-microwave.html#microwave-history) | 补样机、星载实验及民用应用的发展链 |
| [43](material-insar-l1.html#page=43) | 国产SAR任务示意 | [国产SAR任务示意](insar-microwave.html#microwave-missions) | 补国产任务原表及功能比较阅读，标记课程时点/模式边界 |
| [44](material-insar-l1.html#page=44) | 国产SAR波段、分辨率与应用表 | [国产SAR波段、分辨率与应用表](insar-microwave.html#microwave-missions) | 补国产任务原表及功能比较阅读，标记课程时点/模式边界 |
| [45](material-insar-l1.html#page=45) | 波粒二象性、光子能量和动量 | [波粒二象性、光子能量和动量](insar-microwave.html#microwave-wave-particle) | 补光子能量、动量式及与SAR相位描述的联系 |
| [46](material-insar-l1.html#page=46) | 电磁场与波的四要素 | [电磁场与波的四要素](insar-microwave.html#microwave-wave-function) | 补传播方向、k、ω、幅值、初相及单位 |
| [47](material-insar-l1.html#page=47) | 沿z传播的正弦波函数 | [沿z传播的正弦波函数](insar-microwave.html#microwave-wave-function) | 补传播方向、k、ω、幅值、初相及单位 |
| [48](material-insar-l1.html#page=48) | 角频率、初相与旋转矢量 | [角频率、初相与旋转矢量](insar-microwave.html#microwave-wave-function) | 将相位写成kz−ωt+φ0并给出传播/单位对应 |
| [49](material-insar-l1.html#page=49) | 单程路径差、相位差与距离 | [单程路径差、相位差与距离](insar-microwave.html#microwave-range-phase) | 补单程路径3λ/4→270°，雷达单程斜距同变化对应540°，说明符号及缠绕 |
| [50](material-insar-l1.html#page=50) | 波的叠加原理 | [波的叠加原理](insar-microwave.html#microwave-interference) | 补复数和到强度，解释相长/相消 |
| [51](material-insar-l1.html#page=51) | 两波叠加图 | [两波叠加图](insar-microwave.html#microwave-interference) | 补复数和到强度，解释相长/相消 |
| [52](material-insar-l1.html#page=52) | 相干性与干涉条件 | [相干性与干涉条件](insar-microwave.html#microwave-interference) | 解释稳定相对相位；同频不保证统计相干 |
| [53](material-insar-l1.html#page=53) | 三个波源振幅与旁瓣 | [三个波源振幅与旁瓣](insar-microwave.html#microwave-array) | 原图配有限等比和推导，说明路径差、波束与旁瓣 |
| [54](material-insar-l1.html#page=54) | 阵列天线与能量集中 | [阵列天线与能量集中](insar-microwave.html#microwave-array) | 原图配有限等比和推导，说明路径差、波束与旁瓣 |
| [55](material-insar-l1.html#page=55) | 衍射与角分辨率限制 | [衍射与角分辨率限制](insar-microwave.html#microwave-diffraction) | 补有限孔径角宽尺度与目标散射尺度 |
| [56](material-insar-l1.html#page=56) | 极化的电场轨迹定义 | [极化的电场轨迹定义](insar-microwave.html#microwave-polarization) | 补给定位置的电场端点轨迹与传播平面 |
| [57](material-insar-l1.html#page=57) | 同相正交分量及合成振幅 | [同相正交分量及合成振幅](insar-microwave.html#microwave-polarization) | 补同相线极化峰值√2A，圆极化瞬时长度A；区分均方及接收复幅 |
| [58](material-insar-l1.html#page=58) | 分量相位差与椭圆 | [分量相位差与椭圆](insar-microwave.html#microwave-polarization) | 用归一化x、y消去时间推椭圆方程并列退化条件 |
| [59](material-insar-l1.html#page=59) | 线、圆、椭圆轨迹 | [线、圆、椭圆轨迹](insar-microwave.html#microwave-polarization) | 用归一化x、y消去时间推椭圆方程并列退化条件 |
| [60](material-insar-l1.html#page=60) | 极化的分量表达式 | [极化的分量表达式](insar-microwave.html#microwave-polarization) | 用归一化x、y消去时间推椭圆方程并列退化条件 |
| [61](material-insar-l1.html#page=61) | 相对相位与极化轨迹图 | [相对相位与极化轨迹图](insar-microwave.html#microwave-polarization) | 补H/V方向和分量基准；原页0/π线向与本文基准不同，保留约定差异 |
| [62](material-insar-l1.html#page=62) | HH、VV、HV、VH通道 | [HH、VV、HV、VH通道](insar-microwave.html#microwave-polarization) | 补收发顺序、建筑与植被解释及彩色图映射阅读 |
| [63](material-insar-l1.html#page=63) | 输电线及塔多极化影像 | [输电线及塔多极化影像](insar-microwave.html#microwave-polarization) | 补收发顺序、建筑与植被解释及彩色图映射阅读 |
| [64](material-insar-l1.html#page=64) | 不同极化海湾影像 | [不同极化海湾影像](insar-microwave.html#microwave-polarization) | 补收发顺序、建筑与植被解释及彩色图映射阅读 |
| [65](material-insar-l1.html#page=65) | 极化彩色合成示意 | [极化彩色合成示意](insar-microwave.html#microwave-polarization) | 补收发顺序、建筑与植被解释及彩色图映射阅读 |
| [66](material-insar-l1.html#page=66) | 大气吸收、散射与衰减 | [大气吸收、散射与衰减](insar-microwave.html#microwave-atmosphere-window) | 补功率衰减ODE及dB、气体吸收谱；限定全透明/X最高频概括 |
| [67](material-insar-l1.html#page=67) | 气体吸收谱与传播窗口 | [气体吸收谱与传播窗口](insar-microwave.html#microwave-atmosphere-window) | 补功率衰减ODE及dB、气体吸收谱；限定全透明/X最高频概括 |
| [68](material-insar-l1.html#page=68) | 星载SAR窗口与吸收峰 | [星载SAR窗口与吸收峰](insar-microwave.html#microwave-atmosphere-window) | 补功率衰减ODE及dB、气体吸收谱；限定全透明/X最高频概括 |
| [69](material-insar-l1.html#page=69) | 瑞利与米氏散射 | [瑞利与米氏散射](insar-microwave.html#microwave-atmosphere-scattering) | 补尺寸参量、Rayleigh尺度，解释Mie区域不是固定幂次 |
| [70](material-insar-l1.html#page=70) | 粒径、频率与散射机制 | [粒径、频率与散射机制](insar-microwave.html#microwave-atmosphere-scattering) | 补尺寸参量、Rayleigh尺度，解释Mie区域不是固定幂次 |
| [71](material-insar-l1.html#page=71) | 非降水云层经验衰减式 | [非降水云层经验衰减式](insar-microwave.html#microwave-cloud-attenuation) | 原式配图，保留M=1 g/m³；T用K、λ数值用cm仅作曲线一致性条件解读 |
| [72](material-insar-l1.html#page=72) | 降雨衰减曲线与雨强 | [降雨衰减曲线与雨强](insar-microwave.html#microwave-rain-and-brightness) | 原雨衰图配阅读；y轴nep/km，不能直接作为dB/km读取 |
| [73](material-insar-l1.html#page=73) | 吸收/散射转换的示例频率 | [吸收/散射转换的示例频率](insar-microwave.html#microwave-atmosphere-scattering) | 保留原课程示例，明确粒径、温度、雨强与材料依赖 |
| [74](material-insar-l1.html#page=74) | 云层亮温、噪声与辐射传输 | [云层亮温、噪声与辐射传输](insar-microwave.html#microwave-rain-and-brightness) | 补等温、纯吸收简化辐射传输ODE及解，并区别被动辐射和主动SAR |
| [75](material-insar-l1.html#page=75) | 地物交互与表面反射 | [地物交互与表面反射](insar-microwave.html#microwave-scattering) | 补反射、吸收、透射与能量分配边界；不将越粗糙越亮绝对化 |
| [76](material-insar-l1.html#page=76) | 反射、吸收、透射 | [反射、吸收、透射](insar-microwave.html#microwave-scattering) | 补反射、吸收、透射与能量分配边界；不将越粗糙越亮绝对化 |
| [77](material-insar-l1.html#page=77) | 相对粗糙度及散射示意 | [相对粗糙度及散射示意](insar-microwave.html#microwave-roughness) | 补高度差导致相位差与相对光滑条件 |
| [78](material-insar-l1.html#page=78) | 方向散射截面的定义 | [方向散射截面的定义](insar-microwave.html#microwave-scattering-cross-section) | 原页配图，从单位立体角功率推σ |
| [79](material-insar-l1.html#page=79) | 后向散射截面与接收量 | [后向散射截面与接收量](insar-microwave.html#microwave-scattering-cross-section) | 区分目标处入射功率密度与雷达处散射功率密度；接收功率需乘有效面积 |
| [80](material-insar-l1.html#page=80) | 点目标、各向异性与多重散射 | [点目标、各向异性与多重散射](insar-microwave.html#microwave-scattering-mechanisms) | 补点、方向性、多次、表面/二次/体散射的形状与回波联系 |
| [81](material-insar-l1.html#page=81) | 体散射及介质不均匀性 | [体散射及介质不均匀性](insar-microwave.html#microwave-scattering-mechanisms) | 补点、方向性、多次、表面/二次/体散射的形状与回波联系 |
| [82](material-insar-l1.html#page=82) | 低损耗介质与幅值趋肤深度 | [低损耗介质与幅值趋肤深度](insar-microwave.html#microwave-dielectric) | 保留ETFE低损耗例，固定复介电常数符号并区分幅值与功率深度 |
| [83](material-insar-l1.html#page=83) | 穿透因素与波长示意 | [穿透因素与波长示意](insar-microwave.html#microwave-penetration-cases) | 补波长相对目标结构尺度及条件，原例不作通用探测深度 |
| [84](material-insar-l1.html#page=84) | 不同波长植被穿透图 | [不同波长植被穿透图](insar-microwave.html#microwave-penetration-cases) | 补波长相对目标结构尺度及条件，原例不作通用探测深度 |
| [85](material-insar-l1.html#page=85) | 不同波长地下结构穿透图 | [不同波长地下结构穿透图](insar-microwave.html#microwave-penetration-cases) | 补波长相对目标结构尺度及条件，原例不作通用探测深度 |
| [86](material-insar-l1.html#page=86) | 材料与穿透应用图例 | [材料与穿透应用图例](insar-microwave.html#microwave-penetration-cases) | 补积雪、冰、植被与季节改变材料损耗和返回机制 |
| [87](material-insar-l1.html#page=87) | 季节/积雪等穿透图例 | [季节/积雪等穿透图例](insar-microwave.html#microwave-penetration-cases) | 补积雪、冰、植被与季节改变材料损耗和返回机制 |
| [88](material-insar-l1.html#page=88) | 功率穿透深度公式及含水量曲线 | [功率穿透深度公式及含水量曲线](insar-microwave.html#microwave-penetration-depth) | 复介电常数→精确衰减→弱损耗功率深度推导；保留图但不硬编码不明深度/百分比 |
| [89](material-insar-l1.html#page=89) | 入射角、折射与路径 | [入射角、折射与路径](insar-microwave.html#microwave-penetration-cases) | 补折射路径ℓ=z/cosθt及双程返回功率 |
| [90](material-insar-l1.html#page=90) | 极化穿透排序的概括 | [极化穿透排序的概括](insar-microwave.html#microwave-polarimetric-height) | 结合三页原图解释HH/HV等通道条件和有效相位中心，不接受无条件VV>HH>HV排序 |
| [91](material-insar-l1.html#page=91) | 植被HH、HV有效散射高度 | [植被HH、HV有效散射高度](insar-microwave.html#microwave-polarimetric-height) | 结合三页原图解释HH/HV等通道条件和有效相位中心，不接受无条件VV>HH>HV排序 |
| [92](material-insar-l1.html#page=92) | 多极化有效散射位置示意 | [多极化有效散射位置示意](insar-microwave.html#microwave-polarimetric-height) | 结合三页原图解释HH/HV等通道条件和有效相位中心，不接受无条件VV>HH>HV排序 |

</details>

<details><summary>第二讲 · 合成孔径雷达成像原理 · 106 个文件页</summary>

| 原件文件页 | 课堂主题 | 讲义位置 | 阅读说明 |
| --- | --- | --- | --- |
| [1](material-insar-l2.html#page=1) | 封面与四部分课程安排 | [封面与四部分课程安排](insar-imaging.html#insar-imaging) | 保留标题、来源与章节主线 |
| [2](material-insar-l2.html#page=2) | 封面与四部分课程安排 | [封面与四部分课程安排](insar-imaging.html#insar-imaging) | 保留标题、来源与章节主线 |
| [3](material-insar-l2.html#page=3) | 主动/被动与成像/非成像分类 | [主动/被动与成像/非成像分类](insar-imaging.html#i2-sensor-family) | 新增五类传感器与直接观测量对照 |
| [4](material-insar-l2.html#page=4) | 散射计组成、角度/极化响应、分贝及SeaWinds风场 | [散射计组成、角度/极化响应、分贝及SeaWinds风场](insar-imaging.html#i2-scatterometer) | 新增仪器链、反演链、dB正反转换与用途边界 |
| [5](material-insar-l2.html#page=5) | 散射计组成、角度/极化响应、分贝及SeaWinds风场 | [散射计组成、角度/极化响应、分贝及SeaWinds风场](insar-imaging.html#i2-scatterometer) | 新增仪器链、反演链、dB正反转换与用途边界 |
| [6](material-insar-l2.html#page=6) | 散射计组成、角度/极化响应、分贝及SeaWinds风场 | [散射计组成、角度/极化响应、分贝及SeaWinds风场](insar-imaging.html#i2-scatterometer) | 新增仪器链、反演链、dB正反转换与用途边界 |
| [7](material-insar-l2.html#page=7) | 散射计组成、角度/极化响应、分贝及SeaWinds风场 | [散射计组成、角度/极化响应、分贝及SeaWinds风场](insar-imaging.html#i2-scatterometer) | 新增仪器链、反演链、dB正反转换与用途边界 |
| [8](material-insar-l2.html#page=8) | 高度计与探地雷达 | [高度计与探地雷达](insar-imaging.html#i2-altimeter-gpr) | 补往返因子、参考面和地下波速条件 |
| [9](material-insar-l2.html#page=9) | 高度计与探地雷达 | [高度计与探地雷达](insar-imaging.html#i2-altimeter-gpr) | 补往返因子、参考面和地下波速条件 |
| [10](material-insar-l2.html#page=10) | 被动/主动成像与ENVISAT多载荷 | [被动/主动成像与ENVISAT多载荷](insar-imaging.html#i2-sensor-family) | 补能量来源图与MWR/ASAR载荷区分 |
| [11](material-insar-l2.html#page=11) | 被动/主动成像与ENVISAT多载荷 | [被动/主动成像与ENVISAT多载荷](insar-imaging.html#i2-sensor-family) | 补能量来源图与MWR/ASAR载荷区分 |
| [12](material-insar-l2.html#page=12) | 被动/主动成像与ENVISAT多载荷 | [被动/主动成像与ENVISAT多载荷](insar-imaging.html#i2-sensor-family) | 补能量来源图与MWR/ASAR载荷区分 |
| [13](material-insar-l2.html#page=13) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [14](material-insar-l2.html#page=14) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [15](material-insar-l2.html#page=15) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [16](material-insar-l2.html#page=16) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [17](material-insar-l2.html#page=17) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [18](material-insar-l2.html#page=18) | 亮温概念、足迹表、辐射路径、光谱/SST例、接收功率 | [亮温概念、足迹表、辐射路径、光谱/SST例、接收功率](insar-imaging.html#i2-radiometer) | 补定义、谱密度积分到功率、TA条件及历史足迹参数 |
| [19](material-insar-l2.html#page=19) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [20](material-insar-l2.html#page=20) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [21](material-insar-l2.html#page=21) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [22](material-insar-l2.html#page=22) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [23](material-insar-l2.html#page=23) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [24](material-insar-l2.html#page=24) | 侧视足迹、回波时序、单程测距、影像案例 | [侧视足迹、回波时序、单程测距、影像案例](insar-imaging.html#i2-side-looking) | 保留侧视图并把空间方向与快慢时间贯通；案例地形解译接第三章 |
| [25](material-insar-l2.html#page=25) | 四种角度、天线宽长、波束角、幅宽、ERS算例 | [四种角度、天线宽长、波束角、幅宽、ERS算例](insar-imaging.html#i2-antenna-swath) | 补角起点、全角、平地端点推导和算例，更正可见原页角宽符号/换算 |
| [26](material-insar-l2.html#page=26) | 四种角度、天线宽长、波束角、幅宽、ERS算例 | [四种角度、天线宽长、波束角、幅宽、ERS算例](insar-imaging.html#i2-antenna-swath) | 补角起点、全角、平地端点推导和算例，更正可见原页角宽符号/换算 |
| [27](material-insar-l2.html#page=27) | 四种角度、天线宽长、波束角、幅宽、ERS算例 | [四种角度、天线宽长、波束角、幅宽、ERS算例](insar-imaging.html#i2-antenna-swath) | 补角起点、全角、平地端点推导和算例，更正可见原页角宽符号/换算 |
| [28](material-insar-l2.html#page=28) | 四种角度、天线宽长、波束角、幅宽、ERS算例 | [四种角度、天线宽长、波束角、幅宽、ERS算例](insar-imaging.html#i2-antenna-swath) | 补角起点、全角、平地端点推导和算例，更正可见原页角宽符号/换算 |
| [29](material-insar-l2.html#page=29) | 四种角度、天线宽长、波束角、幅宽、ERS算例 | [四种角度、天线宽长、波束角、幅宽、ERS算例](insar-imaging.html#i2-antenna-swath) | 补角起点、全角、平地端点推导和算例，更正可见原页角宽符号/换算 |
| [30](material-insar-l2.html#page=30) | RAR/SAR几何、孔径与空间分辨率定义 | [RAR/SAR几何、孔径与空间分辨率定义](insar-imaging.html#i2-real-aperture) | 保留原有几何与两类瓶颈，补PRF工程连接 |
| [31](material-insar-l2.html#page=31) | RAR/SAR几何、孔径与空间分辨率定义 | [RAR/SAR几何、孔径与空间分辨率定义](insar-imaging.html#i2-real-aperture) | 保留原有几何与两类瓶颈，补PRF工程连接 |
| [32](material-insar-l2.html#page=32) | RAR/SAR几何、孔径与空间分辨率定义 | [RAR/SAR几何、孔径与空间分辨率定义](insar-imaging.html#i2-real-aperture) | 保留原有几何与两类瓶颈，补PRF工程连接 |
| [33](material-insar-l2.html#page=33) | RAR/SAR几何、孔径与空间分辨率定义 | [RAR/SAR几何、孔径与空间分辨率定义](insar-imaging.html#i2-real-aperture) | 保留原有几何与两类瓶颈，补PRF工程连接 |
| [34](material-insar-l2.html#page=34) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [35](material-insar-l2.html#page=35) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [36](material-insar-l2.html#page=36) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [37](material-insar-l2.html#page=37) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [38](material-insar-l2.html#page=38) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [39](material-insar-l2.html#page=39) | 未压缩脉冲斜距/地距分辨率与45度算例 | [未压缩脉冲斜距/地距分辨率与45度算例](insar-imaging.html#i2-pulse-limit) | 保留双程推导、21.2m算例及底点线性投影失效条件 |
| [40](material-insar-l2.html#page=40) | RAR方位分辨率与850km长天线算例 | [RAR方位分辨率与850km长天线算例](insar-imaging.html#i2-rar-azimuth) | 新增课件850km结果，与原853km算例区分 |
| [41](material-insar-l2.html#page=41) | RAR方位分辨率与850km长天线算例 | [RAR方位分辨率与850km长天线算例](insar-imaging.html#i2-rar-azimuth) | 新增课件850km结果，与原853km算例区分 |
| [42](material-insar-l2.html#page=42) | RAR方位分辨率与850km长天线算例 | [RAR方位分辨率与850km长天线算例](insar-imaging.html#i2-rar-azimuth) | 新增课件850km结果，与原853km算例区分 |
| [43](material-insar-l2.html#page=43) | RAR方位分辨率与850km长天线算例 | [RAR方位分辨率与850km长天线算例](insar-imaging.html#i2-rar-azimuth) | 新增课件850km结果，与原853km算例区分 |
| [44](material-insar-l2.html#page=44) | 处理链、脉冲压缩、chirp与带宽分辨率 | [处理链、脉冲压缩、chirp与带宽分辨率](insar-imaging.html#i2-range-compression) | 保留匹配滤波独立推导；新增显式聚焦步骤表，明确压缩时间非发射时宽 |
| [45](material-insar-l2.html#page=45) | 处理链、脉冲压缩、chirp与带宽分辨率 | [处理链、脉冲压缩、chirp与带宽分辨率](insar-imaging.html#i2-range-compression) | 保留匹配滤波独立推导；新增显式聚焦步骤表，明确压缩时间非发射时宽 |
| [46](material-insar-l2.html#page=46) | 处理链、脉冲压缩、chirp与带宽分辨率 | [处理链、脉冲压缩、chirp与带宽分辨率](insar-imaging.html#i2-range-compression) | 保留匹配滤波独立推导；新增显式聚焦步骤表，明确压缩时间非发射时宽 |
| [47](material-insar-l2.html#page=47) | 处理链、脉冲压缩、chirp与带宽分辨率 | [处理链、脉冲压缩、chirp与带宽分辨率](insar-imaging.html#i2-range-compression) | 保留匹配滤波独立推导；新增显式聚焦步骤表，明确压缩时间非发射时宽 |
| [48](material-insar-l2.html#page=48) | 处理链、脉冲压缩、chirp与带宽分辨率 | [处理链、脉冲压缩、chirp与带宽分辨率](insar-imaging.html#i2-range-compression) | 保留匹配滤波独立推导；新增显式聚焦步骤表，明确压缩时间非发射时宽 |
| [49](material-insar-l2.html#page=49) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [50](material-insar-l2.html#page=50) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [51](material-insar-l2.html#page=51) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [52](material-insar-l2.html#page=52) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [53](material-insar-l2.html#page=53) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [54](material-insar-l2.html#page=54) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [55](material-insar-l2.html#page=55) | 合成孔径、相干/多普勒、半波束角与La/2 | [合成孔径、相干/多普勒、半波束角与La/2](insar-imaging.html#i2-synthetic-aperture) | 补p54全/半角两种带宽推导与原页邻图，声明理想条带条件 |
| [56](material-insar-l2.html#page=56) | RAR/SAR两方向分辨率数值对照 | [RAR/SAR两方向分辨率数值对照](insar-imaging.html#i2-example-bandwidth) | 保留24.7m与5m关系；天线/带宽分别从原页引用，产品不混口径 |
| [57](material-insar-l2.html#page=57) | 像元间距/分辨率及GRD多视表 | [像元间距/分辨率及GRD多视表](insar-imaging.html#i2-pixel-spacing) | 补SM/IW/EW课件GRD数值和系统分辨率口径差别 |
| [58](material-insar-l2.html#page=58) | 像元间距/分辨率及GRD多视表 | [像元间距/分辨率及GRD多视表](insar-imaging.html#i2-pixel-spacing) | 补SM/IW/EW课件GRD数值和系统分辨率口径差别 |
| [59](material-insar-l2.html#page=59) | 像元间距/分辨率及GRD多视表 | [像元间距/分辨率及GRD多视表](insar-imaging.html#i2-pixel-spacing) | 补SM/IW/EW课件GRD数值和系统分辨率口径差别 |
| [60](material-insar-l2.html#page=60) | 像元间距/分辨率及GRD多视表 | [像元间距/分辨率及GRD多视表](insar-imaging.html#i2-pixel-spacing) | 补SM/IW/EW课件GRD数值和系统分辨率口径差别 |
| [61](material-insar-l2.html#page=61) | H2S、Wiley、Willow Run、光学到数字、行星探测、发展图 | [H2S、Wiley、Willow Run、光学到数字、行星探测、发展图](insar-imaging.html#i2-history) | 新增历史与原理能力连接，说明ft对数轴与年份意义 |
| [62](material-insar-l2.html#page=62) | H2S、Wiley、Willow Run、光学到数字、行星探测、发展图 | [H2S、Wiley、Willow Run、光学到数字、行星探测、发展图](insar-imaging.html#i2-history) | 新增历史与原理能力连接，说明ft对数轴与年份意义 |
| [63](material-insar-l2.html#page=63) | H2S、Wiley、Willow Run、光学到数字、行星探测、发展图 | [H2S、Wiley、Willow Run、光学到数字、行星探测、发展图](insar-imaging.html#i2-history) | 新增历史与原理能力连接，说明ft对数轴与年份意义 |
| [64](material-insar-l2.html#page=64) | H2S、Wiley、Willow Run、光学到数字、行星探测、发展图 | [H2S、Wiley、Willow Run、光学到数字、行星探测、发展图](insar-imaging.html#i2-history) | 新增历史与原理能力连接，说明ft对数轴与年份意义 |
| [65](material-insar-l2.html#page=65) | H2S、Wiley、Willow Run、光学到数字、行星探测、发展图 | [H2S、Wiley、Willow Run、光学到数字、行星探测、发展图](insar-imaging.html#i2-history) | 新增历史与原理能力连接，说明ft对数轴与年份意义 |
| [66](material-insar-l2.html#page=66) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [67](material-insar-l2.html#page=67) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [68](material-insar-l2.html#page=68) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [69](material-insar-l2.html#page=69) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [70](material-insar-l2.html#page=70) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [71](material-insar-l2.html#page=71) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [72](material-insar-l2.html#page=72) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [73](material-insar-l2.html#page=73) | 条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW | [条带/扫描/聚束/滑聚/TOPS/马赛克/波/IW](insar-imaging.html#i2-modes) | 保留全模式表，纠正IW秒级双观测说法；任务表连接模式指标 |
| [74](material-insar-l2.html#page=74) | 平台历史、Seasat/ERS/JERS/RADARSAT1 | [平台历史、Seasat/ERS/JERS/RADARSAT1](insar-imaging.html#i2-platform-history) | 补分组工程表：波段、极化、角度、幅宽、两方向尺度和基线条件 |
| [75](material-insar-l2.html#page=75) | 平台历史、Seasat/ERS/JERS/RADARSAT1 | [平台历史、Seasat/ERS/JERS/RADARSAT1](insar-imaging.html#i2-platform-history) | 补分组工程表：波段、极化、角度、幅宽、两方向尺度和基线条件 |
| [76](material-insar-l2.html#page=76) | 平台历史、Seasat/ERS/JERS/RADARSAT1 | [平台历史、Seasat/ERS/JERS/RADARSAT1](insar-imaging.html#i2-platform-history) | 补分组工程表：波段、极化、角度、幅宽、两方向尺度和基线条件 |
| [77](material-insar-l2.html#page=77) | 平台历史、Seasat/ERS/JERS/RADARSAT1 | [平台历史、Seasat/ERS/JERS/RADARSAT1](insar-imaging.html#i2-platform-history) | 补分组工程表：波段、极化、角度、幅宽、两方向尺度和基线条件 |
| [78](material-insar-l2.html#page=78) | 平台历史、Seasat/ERS/JERS/RADARSAT1 | [平台历史、Seasat/ERS/JERS/RADARSAT1](insar-imaging.html#i2-platform-history) | 补分组工程表：波段、极化、角度、幅宽、两方向尺度和基线条件 |
| [79](material-insar-l2.html#page=79) | SRTM双天线、干涉条纹与DEM成果 | [SRTM双天线、干涉条纹与DEM成果](insar-imaging.html#i2-srtm) | 补单航过设计与DEM格网/高度精度区分，纠正年份与幅宽表头 |
| [80](material-insar-l2.html#page=80) | SRTM双天线、干涉条纹与DEM成果 | [SRTM双天线、干涉条纹与DEM成果](insar-imaging.html#i2-srtm) | 补单航过设计与DEM格网/高度精度区分，纠正年份与幅宽表头 |
| [81](material-insar-l2.html#page=81) | SRTM双天线、干涉条纹与DEM成果 | [SRTM双天线、干涉条纹与DEM成果](insar-imaging.html#i2-srtm) | 补单航过设计与DEM格网/高度精度区分，纠正年份与幅宽表头 |
| [82](material-insar-l2.html#page=82) | SRTM双天线、干涉条纹与DEM成果 | [SRTM双天线、干涉条纹与DEM成果](insar-imaging.html#i2-srtm) | 补单航过设计与DEM格网/高度精度区分，纠正年份与幅宽表头 |
| [83](material-insar-l2.html#page=83) | ENVISAT及模式图 | [ENVISAT及模式图](insar-imaging.html#i2-platform-history) | 补参数与模式组，纠正年份冲突及p85 RADARSAT图标识 |
| [84](material-insar-l2.html#page=84) | ENVISAT及模式图 | [ENVISAT及模式图](insar-imaging.html#i2-platform-history) | 补参数与模式组，纠正年份冲突及p85 RADARSAT图标识 |
| [85](material-insar-l2.html#page=85) | ENVISAT及模式图 | [ENVISAT及模式图](insar-imaging.html#i2-platform-history) | 补参数与模式组，纠正年份冲突及p85 RADARSAT图标识 |
| [86](material-insar-l2.html#page=86) | ALOS/PALSAR、ALOS2/4与具体模式表 | [ALOS/PALSAR、ALOS2/4与具体模式表](insar-imaging.html#i2-platform-modern) | 补全模式参数和ALOS2像元/分辨率细表，列ALOS原页冲突 |
| [87](material-insar-l2.html#page=87) | ALOS/PALSAR、ALOS2/4与具体模式表 | [ALOS/PALSAR、ALOS2/4与具体模式表](insar-imaging.html#i2-platform-modern) | 补全模式参数和ALOS2像元/分辨率细表，列ALOS原页冲突 |
| [88](material-insar-l2.html#page=88) | ALOS/PALSAR、ALOS2/4与具体模式表 | [ALOS/PALSAR、ALOS2/4与具体模式表](insar-imaging.html#i2-platform-modern) | 补全模式参数和ALOS2像元/分辨率细表，列ALOS原页冲突 |
| [89](material-insar-l2.html#page=89) | ALOS/PALSAR、ALOS2/4与具体模式表 | [ALOS/PALSAR、ALOS2/4与具体模式表](insar-imaging.html#i2-platform-modern) | 补全模式参数和ALOS2像元/分辨率细表，列ALOS原页冲突 |
| [90](material-insar-l2.html#page=90) | COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel | [COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel](insar-imaging.html#i2-platform-modern) | 逐任务模式参数与干涉设计；纠正年份，不把旧星座表当实时状态 |
| [91](material-insar-l2.html#page=91) | COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel | [COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel](insar-imaging.html#i2-platform-modern) | 逐任务模式参数与干涉设计；纠正年份，不把旧星座表当实时状态 |
| [92](material-insar-l2.html#page=92) | COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel | [COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel](insar-imaging.html#i2-platform-modern) | 逐任务模式参数与干涉设计；纠正年份，不把旧星座表当实时状态 |
| [93](material-insar-l2.html#page=93) | COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel | [COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel](insar-imaging.html#i2-platform-modern) | 逐任务模式参数与干涉设计；纠正年份，不把旧星座表当实时状态 |
| [94](material-insar-l2.html#page=94) | COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel | [COSMO/RADARSAT2/TerraSAR/TanDEM/Sentinel](insar-imaging.html#i2-platform-modern) | 逐任务模式参数与干涉设计；纠正年份，不把旧星座表当实时状态 |
| [95](material-insar-l2.html#page=95) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [96](material-insar-l2.html#page=96) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [97](material-insar-l2.html#page=97) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [98](material-insar-l2.html#page=98) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [99](material-insar-l2.html#page=99) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [100](material-insar-l2.html#page=100) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [101](material-insar-l2.html#page=101) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [102](material-insar-l2.html#page=102) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [103](material-insar-l2.html#page=103) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [104](material-insar-l2.html#page=104) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [105](material-insar-l2.html#page=105) | GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务 | [GF3/C-SAR/商业小星/编队/Ku/Ka/L国内任务](insar-imaging.html#i2-platform-china) | 覆盖11个主题任务；各自技术差别、尺度/幅宽及任务能力条件化 |
| [106](material-insar-l2.html#page=106) | ASF任务档案与检索入口 | [ASF任务档案与检索入口](insar-imaging.html#i2-asf-acquisition) | 新增研究区→产品→轨道/模式/极化→实际获取→辅助数据→归档步骤 |

</details>

<details><summary>第三讲 · SAR 图像特征及解译 · 59 个文件页</summary>

| 原件文件页 | 课堂主题 | 讲义位置 | 阅读说明 |
| --- | --- | --- | --- |
| [1](material-insar-l3.html#page=1) | InSAR原理与应用 | [InSAR原理与应用](insar-interpretation.html#insar-interpretation) | 课名与教师范围原已列明；保留章节入口 |
| [2](material-insar-l3.html#page=2) | 课程内容 | [课程内容](insar-interpretation.html#insar-interpretation-supplement) | 原已说明目录与正文差异；新增显式课堂/教材层次，防止统计补充遮蔽课堂 |
| [3](material-insar-l3.html#page=3) | SAR 系统工作参数 | [SAR 系统工作参数](insar-interpretation.html#insar-interpretation-observation) | 原参数表未独立解释照射带/高度/姿态；补足覆盖、波束和几何作用 |
| [4](material-insar-l3.html#page=4) | SAR 系统雷达波长的选择 —— 应用考虑 | [SAR 系统雷达波长的选择 —— 应用考虑](insar-interpretation.html#insar-interpretation-band-selection) | 原只概括长波穿透；补X/C/L/P任务线索与尺度条件表 |
| [5](material-insar-l3.html#page=5) | SAR 系统雷达波长对比 | [SAR 系统雷达波长对比](insar-interpretation.html#insar-interpretation-band-selection) | 原没有C/L/P农田实例；加入原图及按同地块、通道/尺度控制读图 |
| [6](material-insar-l3.html#page=6) | 使用 L波段 SAR 图像制作地质图 | [使用 L波段 SAR 图像制作地质图](insar-interpretation.html#insar-interpretation-band-selection) | 原缺L波段地质成图实例；补构造条带、照射方向与岩性判断边界 |
| [7](material-insar-l3.html#page=7) | SAR 系统雷达波长的选择 —— 系统考虑 | [SAR 系统雷达波长的选择 —— 系统考虑](insar-interpretation.html#insar-interpretation-band-selection) | 原缺长短波系统代价；补孔径、器件、供能约束和非单变量定律，保留NISAR课堂例子 |
| [8](material-insar-l3.html#page=8) | 极化 (Polarization) | [极化 (Polarization)](insar-interpretation.html#insar-interpretation-observation) | 原已有HH/VV/HV/VH及发射/接收顺序；保留并与实例相接 |
| [9](material-insar-l3.html#page=9) | 极化 (Polarization) | [极化 (Polarization)](insar-interpretation.html#insar-interpretation-observation) | 把H/V明确为规定坐标下电场方向而非地物水平/竖直面 |
| [10](material-insar-l3.html#page=10) | 极化选择 | [极化选择](insar-interpretation.html#insar-interpretation-polarization-examples) | 将HH/VV线性结构、HV植被、VV海面课堂线索展开并注明非固定分类标签 |
| [11](material-insar-l3.html#page=11) | 极化选择 | [极化选择](insar-interpretation.html#insar-interpretation-polarization-examples) | 补跨波段RGB原图和红C-HH/绿L-HV/蓝L-HH精确映射 |
| [12](material-insar-l3.html#page=12) | 极化选择 | [极化选择](insar-interpretation.html#insar-interpretation-polarization-examples) | 补同为C波段的极化实例，区分强度合成与全极化复分析及精度验证 |
| [13](material-insar-l3.html#page=13) | 斜距显示的距离压缩 | [斜距显示的距离压缩](insar-interpretation.html#insar-interpretation-scale-conventions) | 补原脉冲τ式、θ/俯角互余与30/60度分辨率算例，区别脉冲压缩带宽式 |
| [14](material-insar-l3.html#page=14) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-slant-ground-source) | 补同一农田斜距与地距重采样读图，明确非新增分辨能力 |
| [15](material-insar-l3.html#page=15) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-scale-conventions) | 补方位尺度近似的模式前提、距离向局部比例尺、像元与分辨率区别 |
| [16](material-insar-l3.html#page=16) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-scale-conventions) | 原缺图上距离/比例尺原式；定义a和Δy并推到ΔG sinθ/a |
| [17](material-insar-l3.html#page=17) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-slant-ground-source) | 视觉确认原件有根号；保留SR/H/GR到本站R/H/G的符号映射，限制严格抛物线说法 |
| [18](material-insar-l3.html#page=18) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-slant-ground-source) | 补等宽目标与实际农田重采样对照的读图顺序 |
| [19](material-insar-l3.html#page=19) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-range) | 原已有近距压缩强、远距压缩弱及导数；保留 |
| [20](material-insar-l3.html#page=20) | SAR 图像的比例尺 | [SAR 图像的比例尺](insar-interpretation.html#insar-interpretation-range) | 保留四条距离压缩规律，并强调地距显示不消除山区不可逆几何缺失 |
| [21](material-insar-l3.html#page=21) | SAR 侧视成像示意图 | [SAR 侧视成像示意图](insar-interpretation.html#insar-interpretation-foreshortening) | 补同剖面多山坡上收缩、叠掩、阴影共存，避免只按近远距离硬分类 |
| [22](material-insar-l3.html#page=22) | SAR 图像几何特征 | [SAR 图像几何特征](insar-interpretation.html#insar-interpretation-relief-displacement) | 原未讲高程像点位移；补SAR向近距、光学向像底点外及方位误差边界 |
| [23](material-insar-l3.html#page=23) | 雷达影像与航摄影像 像点位移方向相反 | [雷达影像与航摄影像 像点位移方向相反](insar-interpretation.html#insar-interpretation-relief-displacement) | 加入原光学/SAR位移图，推高目标ΔR约−hcosθ及平地误定位ΔG约−hcotθ |
| [24](material-insar-l3.html#page=24) | 雷达影像与航摄影像 像点位移方向相反 | [雷达影像与航摄影像 像点位移方向相反](insar-interpretation.html#insar-interpretation-relief-displacement) | 以高处/底部对应点解释中心投影与距离排序相反，而非屏幕固定左右 |
| [25](material-insar-l3.html#page=25) | 雷达影像与航摄影像 像点位移方向相反 | [雷达影像与航摄影像 像点位移方向相反](insar-interpretation.html#insar-interpretation-relief-displacement) | 补光学像底点向外高程位移与影像坐标定义 |
| [26](material-insar-l3.html#page=26) | SAR 图像几何畸变 | [SAR 图像几何畸变](insar-interpretation.html#insar-interpretation-foreshortening) | 补连续地形剖面内三种畸变邻接出现 |
| [27](material-insar-l3.html#page=27) | 雷达图像透视收缩 (foreshortening) | [雷达图像透视收缩 (foreshortening)](insar-interpretation.html#insar-interpretation-foreshortening) | 保留前坡投影推导与亮度受散射共同影响的条件 |
| [28](material-insar-l3.html#page=28) | 雷达图像透视收缩 (foreshortening) | [雷达图像透视收缩 (foreshortening)](insar-interpretation.html#insar-interpretation-foreshortening) | 原件透视收缩实例和自绘几何已存在，保留并加课堂数值关系 |
| [29](material-insar-l3.html#page=29) | 透视收缩的极端情况 | [透视收缩的极端情况](insar-interpretation.html#insar-interpretation-front-back-table) | 补零局部角退化极限与增入射角减收缩但增阴影取舍 |
| [30](material-insar-l3.html#page=30) | 前后坡透视收缩情况 | [前后坡透视收缩情况](insar-interpretation.html#insar-interpretation-front-back-table) | 补相同实际坡长、相同坡度前后坡的sin(θ−α)/sin(θ+α)对照 |
| [31](material-insar-l3.html#page=31) | 雷达图像透视收缩 (foreshortening) | [雷达图像透视收缩 (foreshortening)](insar-interpretation.html#insar-interpretation-foreshortening) | 原未写完整百分式；补Fp=(1−sinθℓ)×100%并限正常投影范围 |
| [32](material-insar-l3.html#page=32) | 雷达图像叠掩 (Layover) | [雷达图像叠掩 (Layover)](insar-interpretation.html#insar-interpretation-layover) | 保留α>θ、先收到坡顶回波与近距风险条件 |
| [33](material-insar-l3.html#page=33) | 雷达图像叠掩 (Layover) | [雷达图像叠掩 (Layover)](insar-interpretation.html#insar-interpretation-layover) | 保留坡度+俯角>90与局部带符号入射角关系，避免角名混用 |
| [34](material-insar-l3.html#page=34) | 雷达图像叠掩 (Layover) | [雷达图像叠掩 (Layover)](insar-interpretation.html#insar-interpretation-shadow) | 原已有说明：负局部角是投影反转约定；正局部角不全部意味着前坡收缩 |
| [35](material-insar-l3.html#page=35) | 透视收缩和叠掩 | [透视收缩和叠掩](insar-interpretation.html#insar-interpretation-layover) | 保留原火山/三维地形图，补逐点几何验证读法 |
| [36](material-insar-l3.html#page=36) | 透视收缩和叠掩 | [透视收缩和叠掩](insar-interpretation.html#insar-interpretation-layover) | 新增老师红框标注原图，先按绿色观测箭头对应前坡再辨收缩/叠掩 |
| [37](material-insar-l3.html#page=37) | Ascending | [Ascending](insar-interpretation.html#insar-interpretation-image-orientation) | 原只简述升降轨；补航向/侧视/距离与方位采样/地图北向的分层解释 |
| [38](material-insar-l3.html#page=38) | 雷达阴影 (Shadowing) | [雷达阴影 (Shadowing)](insar-interpretation.html#insar-interpretation-shadow) | 保留阴影缺有效直接回波、弱噪声非零及远距趋势条件 |
| [39](material-insar-l3.html#page=39) | 雷达阴影 (Shadowing) | [雷达阴影 (Shadowing)](insar-interpretation.html#insar-interpretation-geometry-cases) | 补背坡等俯角的掠射边界及小尺度粗糙度影响 |
| [40](material-insar-l3.html#page=40) | 雷达阴影 (Shadowing) | [雷达阴影 (Shadowing)](insar-interpretation.html#insar-interpretation-dem-exercise) | 补真倾向/距离剖面倾向及三维法向、视线遮挡流程 |
| [41](material-insar-l3.html#page=41) | 雷达阴影 (Shadowing) | [雷达阴影 (Shadowing)](insar-interpretation.html#insar-interpretation-geometry-cases) | 加入Sarawak原图、亮面暗带与山脊组织检验，不虚定未给的绝对东/西方向 |
| [42](material-insar-l3.html#page=42) | 前、后坡对比 | [前、后坡对比](insar-interpretation.html#insar-interpretation-geometry-cases) | 加入前/后坡两种临界角图，明确原两侧α与本站前α/后β映射 |
| [43](material-insar-l3.html#page=43) | 透视收缩的数学描述 | [透视收缩的数学描述](insar-interpretation.html#insar-interpretation-foreshortening) | 新增实际坡长/局部角原图，补完整Fp百分单位与有效范围 |
| [44](material-insar-l3.html#page=44) | 雷达图像收缩比随入射角的变化关系 | [雷达图像收缩比随入射角的变化关系](insar-interpretation.html#insar-interpretation-foreshortening) | 视觉核表并补θℓ30/10/90度的50/82.6/0百分数和退化限制 |
| [45](material-insar-l3.html#page=45) | 不同雷达侧视角 —— 雷达影像中坡度长度 （坡度为 15˚ ） | [不同雷达侧视角 —— 雷达影像中坡度长度 （坡度为 15˚ ）](insar-interpretation.html#insar-interpretation-front-back-table) | 新增完整7行前后坡表，按未先舍入正弦复算，不把原表有限小数当新物理规律 |
| [46](material-insar-l3.html#page=46) | 雷达阴影可用于地形起伏的计算 | [雷达阴影可用于地形起伏的计算](insar-interpretation.html#insar-interpretation-shadow-height) | 旧正文回避原测高式；补顶部T/远端F定义及严格相似Ss=hSr/H、h=Ss cosθs |
| [47](material-insar-l3.html#page=47) | 山区 SAR 图像几何畸变实例 | [山区 SAR 图像几何畸变实例](insar-interpretation.html#insar-interpretation-geometry-cases) | 新增山区实景，分开亮度候选解释与DEM几何验证 |
| [48](material-insar-l3.html#page=48) | 山区 SAR 图像几何畸变实例 | [山区 SAR 图像几何畸变实例](insar-interpretation.html#insar-interpretation-geometry-cases) | 新增城市/湘江实景，引用原图地点日期模式，说明暗面不能全等水体 |
| [49](material-insar-l3.html#page=49) | 雅砻江区域 Sentinel -1数据几何畸变分布图 | [雅砻江区域 Sentinel -1数据几何畸变分布图](insar-interpretation.html#insar-interpretation-geometry-cases) | 保留升降轨风险图并注明红是距离压缩非全部叠掩、蓝是阴影，不误读作地形运动 |
| [50](material-insar-l3.html#page=50) | 作业 | [作业](insar-interpretation.html#insar-interpretation-dem-exercise) | 补6步作业算法、signed q阈值、4个坡面和遮挡反例答案；不虚报缺失MAT数据面积 |
| [51](material-insar-l3.html#page=51) | SAR 图像与光学图像比较 | [SAR 图像与光学图像比较](insar-interpretation.html#insar-interpretation-optical-comparison) | 原缺课堂SAR/光学成像比较；按投影、形变、起伏、阴影、观测方向组织表 |
| [52](material-insar-l3.html#page=52) | SAR 图像与光学图像比较 | [SAR 图像与光学图像比较](insar-interpretation.html#insar-interpretation-optical-comparison) | 补城市建筑朝向、二次反射及不同表面贡献，避免光学轮廓一一复制 |
| [53](material-insar-l3.html#page=53) | SAR 图像与光学图像比较 | [SAR 图像与光学图像比较](insar-interpretation.html#insar-interpretation-optical-comparison) | 新增TerraSAR-X/光学同区原图，先按地标配对再读亮线 |
| [54](material-insar-l3.html#page=54) | SAR 图像与光学图像比较 | [SAR 图像与光学图像比较](insar-interpretation.html#insar-interpretation-optical-comparison) | 补放大建筑案例：不同可见表面和混合回波不能唯一还原建筑结构 |
| [55](material-insar-l3.html#page=55) | SAR 图像与摄影测量图像比较 | [SAR 图像与摄影测量图像比较](insar-interpretation.html#insar-interpretation-optical-comparison) | 补电磁波共性、光学角度交会/InSAR距离约束及三维额外条件，区别视差与相位 |
| [56](material-insar-l3.html#page=56) | SAR 图像的左右倒置 | [SAR 图像的左右倒置](insar-interpretation.html#insar-interpretation-image-orientation) | 新增原AB/CD到DC/BA左侧视升轨示意，解释固定记录约定而非所有产品通则 |
| [57](material-insar-l3.html#page=57) | 左侧视 SAR 成像系统 | [左侧视 SAR 成像系统](insar-interpretation.html#insar-interpretation-image-orientation) | 新增原AB/CD不变的左侧视降轨示意，联合航向、侧视和轴约定判断 |
| [58](material-insar-l3.html#page=58) | 上下倒置示例 | [上下倒置示例](insar-interpretation.html#insar-interpretation-image-orientation) | 新增成都HH升轨原图/地图实例与地标核向，不把单幅强度等同LOS位移 |
| [59](material-insar-l3.html#page=59) | 小结 | [小结](insar-interpretation.html#insar-interpretation-classroom-check) | 将课件总结/讨论改成5个有步骤答案的自检，回到公式和读图证据链 |

</details>

逐页主题和讲义定位也保留在[课堂页码对照清单](insar/ppt-coverage.json)。

<!-- insar-ppt-coverage:end -->

## 配图索引 {#figures}

原页图由 PDF 直接渲染，未修改图内关系、批注和参数。文件页位置与尺寸、SHA-256 见[图像清单](insar/figures/manifest.json)。完整原页可点击放大查看；正文公式另用 MathJax 排版，避免依赖截图里的小字。

| 原页图 | 文件页 | 解释用途 |
| --- | --- | --- |
| [沙漠光学与 L 波段图像](insar/figures/l1-p18.png) | L1 18 | 穿透能力必须依赖介质条件 |
| [强度、干涉相位与 DEM](insar/figures/l1-p22.png) | L1 22 | 图像与测量成果之间还需要处理 |
| [输电塔极化对比](insar/figures/l1-p63.png) | L1 63 | 不同通道对结构的响应 |
| [表面粗糙度与散射](insar/figures/l1-p77.png) | L1 77 | 粗糙度是相对于波长和几何而言 |
| [侧视与成像方向](insar/figures/l2-p19.png) | L2 19 | 距离与方位的空间含义 |
| [合成孔径](insar/figures/l2-p53.png) | L2 53 | 运动形成相干观测长度 |
| [透视收缩](insar/figures/l3-p28.png) | L3 28 | 地形与投影压缩 |
| [收缩与叠掩对照](insar/figures/l3-p35.png) | L3 35 | 距离次序变化 |
| [雅砻江几何畸变](insar/figures/l3-p49.png) | L3 49 | 结合地形辨认不可靠区域 |

各章的 `ch1-`、`ch2-`、`ch3-` SVG 为本站自绘的说明图，不冒用课件页码；均不按真实尺度。绘图符号与正文统一，原页图中的其他符号由图注说明。

## 修订原则与关键勘误 {#corrections}

讲义通过定义和推导处理原文差异，保留原件。需要影响读者判断的限制写在对应正文，原资料的历史参数也保留历史语境。

| 原位置 | 需要注意的表述 | 网站处理与核验依据 |
| --- | --- | --- |
| L1 16–19、68 | 全天候、穿透与“全透明” | 说明雨衰、湿度/介质/结构影响，以及干涉相位的大气敏感性 |
| L1 48、52 | 波表达量纲与相干条件 | 用 $\omega t-kz+\phi_0$；同频之外还需相位关系稳定 |
| L1 44、68、90 | 最高频段、极化穿透等泛化 | 限定任务实例和材料/结构/观测条件，不给普遍极化排序 |
| L2 8 | 高度计距离的双程因子 | 单站单程距离采用 $c\Delta t/2$，从往返时间定义推导 |
| L1 71 | 云层经验衰减式与单位 | 原图可见 $M$ 的 $\mathrm{g/m^3}$；温度曲线标摄氏度，公式用开尔文数值才能与其语境一致。波长的 cm 口径是曲线量级的一致性解释，完整适用频段与工程精度未据原页确定 |
| L1 78–79 | 截面与接收功率密度 | 先用 $dP_s/d\Omega$ 和入射功率密度定义方向截面，再区分返回功率密度与天线收集的接收功率 |
| L1 82、88 | “幅度降至 37%”与穿透式 | 原第 88 页弱损耗关系对应单程功率 $1/e$ 深度；本站从复传播常数说明 $d_A=2d_P$，单独说明雷达双程与散射高度 |
| L1 88、90–92 | 土壤图的单位及极化穿透排序 | 原图轴和右侧百分比的口径不充分明确，不把它们写成通用数值；分通道的有效散射高度受结构与观测条件影响，不能给普适极化排序 |
| L2 27–29、56 | 波束符号、弧度换算与幅宽口径 | 按天线长宽区分 $\beta_h$ 与 $\beta_v$；$0.00566$ rad 为约 $19'27.5''$。窄波束几何值约 52.4 km 与系统表的名义 100 km 分列，不能由损坏或隐藏的文本抽取断言可见原页错误 |
| L2 72 | IW 与“同轨 6–12 秒两次成像” | IW 是获取模式；重复观测时刻与轨道/卫星配置另论 |
| L2 平台资料段 74–105 | ALOS 回归周期、RADARSAT-2 与 TanDEM-X 发射年份 | 分别按 JAXA、加拿大航天局和 DLR 原始任务资料补核为 46 天、2007 年和 2010 年；其他课堂模式表仍保留其历史口径 |
| L3 11–12 | 彩色多通道图的波段 | 第 11 页 RGB 混合 C/L 波段，第 12 页为同一 C 波段极化通道，不能把颜色差异全部归因于极化 |
| L3 43–45 | 收缩百分比的量与角度 | 明确 $L_r/L=\sin\omega$、$F_p=100(1-\sin\omega)\%$，复算原表；它不同于相对平地的额外压缩，负投影应按距离次序逆转解释 |
| L3 46 | 阴影测高公式的端点 | $S_r=R_F$ 为阴影远端斜距、$S_s=R_F-R_T$ 为缺失斜距区间；在直线射线与平地接收模型中推导，不能把地距阴影长度代入 |
| L3 50 | DEM 作业的几何条件与数据 | 先将纬经度转换为米制坐标，按雷达视向投影坡度，另做全局射线遮挡；缺少 Canvas 数据时只给可复算的梯度示例，不编造真实区域风险面积 |
| B1 印刷 20 页式 (2.1) | 地距关系写作 $(c\tau/2)\sin\theta$ | 在图示角度为法线角、局部平地条件下，由 $dR/dx=\sin\theta$ 得 $\delta g=\delta R/\sin\theta$；本站注明这一差异 |

相位正负由接收基带约定和差分顺序共同决定；本站统一 $I_{12}=s_1s_2^*$、$\Delta\phi_{12}=\phi_1-\phi_2$。不同软件若采用相反次序，应先换约定再对比位移符号。地物类别表描述典型机理，不替代实际分类验证。

[回课程总览](course-insar.html) · [主线与公式索引](insar-review.html)


<!-- earth-index-boundary -->
这页用于回查术语、来源或维护决定。连续学习请回到[课程主线](course-insar.html)；考前先看[关键总结](review-insar.html)，不要把完成来源检索当成已经理解推导。
