# 英文教材补充 · 六个连接主讲义的观点

这六个补充依据 **Introduction to Modern Photogrammetry**（Edward M. Mikhail、James S. Bethel、J. Chris McGlone，Wiley，2001）已核原页编写。它们补充概念边界、模型条件和质量判断，现已融入英文顺序主讲义的对应小节，本页保留为观点回读入口；不代表英文全书已逐章完整重写。中文为原创归纳，短英文句均为本站原创说明。下列“印刷页”指书上页码，“PDF页”指查看器从1开始的物理页序。设备现状和软件环境仍须放回2001年出版背景。

## 1 · 现代范围：摄影测量不只处理航空胶片 {#modern-scope}

**影像 / imagery** 包括由不同传感方式取得的图像资料；**量测信息 / metric information** 指可测量的几何信息，不是“只允许使用米制”。英文书第一章把传统照片量测扩展到主动与被动、胶片与数字、单像与重叠影像，同时把核心任务归结为恢复成像时影像与对象的几何关系。这为王书的分类补上一条判断线：分类不同，不等于任务没有共同核心；但不同传感器需要不同成像模型，不能把雷达也直接套进框幅共线方程。认出屋顶属于解译，求屋顶位置与高度还需量测几何。

**原创英文：** *Modern photogrammetry uses different kinds of imagery to recover geometric information.*

**为什么补充：** 用“任务与模型”理解现代范围，避免把摄影测量简单等同于胶片航摄或任何图像识别。

**原著位置：** Chapter 1，§1.1 Definitions，印刷 p.1，**PDF13**。[打开本机原著](./photogrammetry-material-english.html#page=13)

## 2 · 初等几何：直觉帮助理解，前提决定能否计算 {#approximation-parallax}

**视差 / parallax** 是观察位置改变引起的表观位置变化，并非像点一定测错。英文书用乘车时近处电线杆掠过较快、远山变化较慢建立直觉；量化时还必须固定坐标方向和左右差值顺序。同页的建筑高差例题则明确垂直摄影、相机相对建筑底部的高度，以及从主点量到顶部像点的半径。它补充了王书公式的阅读方法：先识别参考面与半径，再计算，不能只看数字和单位相似就换用条件。一般倾斜像对需回到严密几何，不能让生活类比替代相机定向。

**原创英文：** *A change of viewpoint creates parallax; a camera model turns it into a measurement.*

**为什么补充：** 把“知道视差是什么”与“知道这条高差公式何时成立”连起来，防止把初等算式无条件推广。

**原著位置：** Chapter 2，§2.5末尾、Example 2-4与§2.6.1，印刷 p.23，**PDF35**。本次补充已对照原图核实，不凭OCR重造公式。[打开本机原著](./photogrammetry-material-english.html#page=35)

## 3 · 传感器：检校不仅是一张焦距参数表 {#sensing-calibration}

**相机检校 / camera calibration** 用已知条件研究并确定相机的响应；**几何检校 / geometric calibration** 针对成像几何。英文书第三章把检校分为几何、影像质量评价，以及部分任务所需的辐射检校。同页还用侧风示意图说明：机头方向可能偏离地面航迹，相机若跟机头而未按航迹调整，有效覆盖会减小。这说明参数表正确仍不等于采集成功，安装、姿态和像质也必须检查。它补足王书获取与方位章节的联系，也提醒我们不能把“检校”和扫描胶片的框标内定向当成同一步操作。

**原创英文：** *Calibration describes the camera; acquisition checks whether the recorded images are usable.*

**为什么补充：** 从“相机有什么参数”走向“哪些成像条件需要验证”，把传感器知识接到实际质量控制。

**原著位置：** Chapter 3，§3.7.6 Camera Mount、Figure 3-30与§3.8 Camera Calibration首段，印刷 p.67，**PDF79**。[打开本机原著](./photogrammetry-material-english.html#page=79)

## 4 · 定向：先重建射线束，再安放整束光线 {#orientation-models}

**传感器模型 / sensor model** 描述从像点恢复射线所需的相机特性；**平台模型 / platform model** 描述这束射线在物空间中的位置与方向。英文书以这两个名称对应内方位和外方位，并明确内方位至少涉及主距、主点与镜头畸变。它还区分主距与焦距：不在无穷远对焦时，两者不应自动当成同一量。这个组织方式补充王书“先单片、再像对”的流程：恢复像面坐标不等于已经知道相机位姿，整束射线摆正也不自动给出未知物点的深度。矩阵方向仍按本站声明的王书约定使用，不因英文名称而更换。

**原创英文：** *The sensor model defines the rays, and the platform model places them in object space.*

**为什么补充：** 用输入与输出区分内外方位，读不同教材时先对齐几何角色，再比较符号。

**原著位置：** Chapter 4，§4.3 Sensor Model，印刷 p.88，**PDF100**；§4.4 Platform Model首段，印刷 p.90，**PDF102**。[内方位原页](./photogrammetry-material-english.html#page=100) · [外方位原页](./photogrammetry-material-english.html#page=102)

## 5 · 联合平差：多张照片连接起来，控制仍提供外部基准 {#bundle-control}

**光束法平差 / bundle adjustment** 以成像射线的共线关系为基础，联合改正相机参数与物点坐标；**基准 / datum** 指确定结果位置、方向和尺度所需的参照。英文书第五章强调区域网同时确定多幅影像，可改善整体一致性，并减少逐模型地面测量的负担；但讨论导航辅助时仍指出控制信息可提供基准并增强对粗差的可靠性。因此“更多匹配点”和“更多导航观测”不能简单解释成永远不需要外部控制。线性化方程中相机改正与点坐标改正分成两组，也正是理解后续稀疏结构与消元的入口。

**原创英文：** *Bundle adjustment links cameras and points, while control connects the solution to an external datum.*

**为什么补充：** 把王书的计算形式连接到生产目的，同时区分内部一致、外部定位和粗差可靠性。

**原著位置：** Chapter 5，§5.8 Block Triangulation，印刷 p.119，**PDF131**；p.130页首控制说明及§5.11.1，**PDF142**。[区域网原页](./photogrammetry-material-english.html#page=131) · [联合未知量原页](./photogrammetry-material-english.html#page=142)

## 6 · 质量证据：像元大小、细节与坐标精度不是一个指标 {#quality-evidence}

**地面采样间隔 / GSD** 描述像元投到地面的采样间隔；**分辨率 / resolution** 关乎实际辨别细节的能力；**精度元数据 / accuracy metadata** 记录成果采用的精度标准与符合情况。英文书指出实际分辨能力还受大气、运动等因素影响，不能把GSD直接当成分辨率。产品章节进一步提醒，数据转换和共享可能丢掉精度信息，漂亮的显示不能替代质量说明。这补充王书解算之后的检查环节：成果应同时报告采样、坐标基准和检核证据；把像元插得更密，只改变表示方式，不能据此宣称坐标精度提高。

**原创英文：** *A smaller sampling interval does not, by itself, prove better positional accuracy.*

**为什么补充：** 让“算出了坐标”继续走到“有证据说明坐标能用于什么”，避免用清晰度或点数代替质量检验。

**原著位置：** Chapter 6，§6.1.1，印刷 p.153，**PDF165**；Chapter 8，§8.5 Product Accuracy，印刷 p.242，**PDF254**。[GSD原页](./photogrammetry-material-english.html#page=165) · [精度说明原页](./photogrammetry-material-english.html#page=254)

## 怎样回到原著

每次选一个补充，先用中文说出它新增的判断条件，再读原创英文句，最后打开原著的一页找对应主题。先找对象和动词，再读限定词，例如 *at the time of imaging*、*in some cases*、*with respect to*。它们决定模型的时间、适用范围和参考系，不能为了读得快而跳过。

[继续12课英文阅读训练](./photogrammetry-english.md) · [回到主学习路线](./course-photogrammetry.md)

