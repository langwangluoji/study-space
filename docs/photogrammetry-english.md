# 摄影测量英文阅读 · Read with a bridge

用中文建立几何直觉，再把直觉接到英文术语和原著段落。以下 12 小课围绕同一条线索：**影像给出方向，恢复相机几何，再由多条射线求空间位置。** 英文短句为本站原创教学句，不是教材引文。

## 自由选择阅读梯度

- **中文搭桥 / See the idea**：先看中文与图，读英文标题、图注和关键词。建议从入门四课体验。
- **双语对照 / Follow the geometry**：先读原创英文短句，再读原著一个相关段落，逐一对应图中对象和符号。
- **原著优先 / Read and explain**：先读原著，用两句英文说明输入、输出与条件；按需展开中文支架。

梯度是建议，按自己的掌握程度随时切换。任何一课都可以使用 English-first 或中文支架，无需完成章节才能升级。

## 12 小课阅读工作台

<PhotogrammetryReading />

## 教材与页码

**Introduction to Modern Photogrammetry**，Edward M. Mikhail、James S. Bethel、J. Chris McGlone，John Wiley & Sons，2001，ISBN 0-471-30924-9。几何与平差原理是本路径重点；书中设备、软件网址和生产条件反映 2001 年背景。

教材在本机阅读器中由你选择本机 PDF，文件不会上传。每个入口同时标出书上印刷页和 PDF 查看器页序。扫描缺印刷 p.350，附录不能沿用正文的固定页码偏移。

## 可检索的主题索引

### 01 · 从照片测什么？ / What can images measure?

摄影测量用影像恢复对象的几何信息。例如求屋顶点的三维坐标，而不只是认出屋顶。

**Key terms：** photogrammetry（摄影测量：由影像恢复对象的几何信息）；image space（像空间：影像所在的几何空间）；object space（物空间：被拍对象所在的三维空间）；metric information（可测量的几何信息）。

**阅读方向：** 找出该页对 photogrammetry 的定义，再在最后一段找到 image 与 object 的 geometric relationship。

**辨析：** metric 在这里强调测量与几何信息，不是把摄影测量限定为只用米制单位。Photo interpretation 偏重影像判读，二者相关但任务不同。

原著 1.1 Definitions；印刷 p.1；PDF 页 13。

### 02 · 一张照片是一束射线 / A photograph is a bundle of rays

在理想框幅相机模型里，一个地面点、投影中心和它的像点在同一直线上。照片记录方向，单个像点通常不能独自决定这个点离相机多远。

**Key terms：** perspective projection（中心投影 / 透视投影）；perspective center（投影中心）；image plane（像平面）；collinearity（共线性）。

**阅读方向：** 读 pinhole camera 附近段落，找 collinearity 的三个点分别是谁。

**辨析：** 中心投影不是正射投影；近大远小。Pinhole 模型描述几何，真实镜头有畸变，不能把所有相机误差都当成不存在。

原著 2.1 Perspective Projection；印刷 p.13；PDF 页 25。

### 03 · 飞得高，为什么看得广？ / Scale and coverage

垂直摄影、平坦地面且主距固定时，飞得更高，地面对象在照片中更小，覆盖范围更广。比例尺是无量纲比值。

**Key terms：** scale（比例尺：像上距离与对应物距之比）；coverage（覆盖范围）；flying height（航高：必须指明相对哪个面）；principal distance（主距）。

**阅读方向：** 看 Figure 2-6，区分 H、h 与真正物距 H-h，解释为什么不是总写 f/H。

**辨析：** 1:5000 的比例尺大于 1:10000；分母更大通常意味着比例尺更小。飞得高不意味着坐标一定更准确。

原著 2.2 Scale and Coverage；印刷 p.16；PDF 页 28。

### 04 · 高楼为什么往外倒？ / Relief displacement

严格垂直的照片中，离像底点越远的高物体，顶部相对底部越向外偏。主点与像底点在严格垂直摄影时重合，倾斜时不能直接混用。

**Key terms：** relief displacement（由高差造成的像点位移）；nadir point（像底点）；radial distance（径向距离）；principal point（像主点）。

**阅读方向：** 看 Figure 2-12，不背符号，先在图上指出顶、底、相机和径向方向。

**辨析：** Relief 在这里不是救援或缓解，是地形/对象高差；位移不是随机测量噪声。

原著 2.5 Relief Displacement；印刷 p.22, 23；PDF 页 34, 35。

### 05 · 两张照片为何能量高度？ / Parallax and stereo

从不同位置看同一点，它在影像里的位置不同。已知相机几何后，位置差为求深度提供信息。基线太小，深度信号弱；太大，遮挡与匹配也可能更困难。

**Key terms：** parallax（视差：观察位置改变造成的表观位置变化）；stereo（立体）；baseline（基线：两个摄影中心间的距离）；overlap（重叠度）。

**阅读方向：** 读 Parallax 开头的乘车类比，再区分 forward overlap 和 side overlap。

**辨析：** 视差不是像点测错；前方重叠沿同一航线，旁向重叠位于相邻航线。书中 60%/30% 是传统航测示例，不是所有无人机任务的固定标准。

原著 2.6 Parallax and Stereo; 2.7 Image Overlap；印刷 p.23, 29；PDF 页 35, 41。

### 06 · 从二维搜索变成一维搜索 / Epipolar geometry

已知两相机的几何关系时，左像一点在右像的对应点应落在对应核线上，搜索从一整幅二维区域缩到一条线附近。它不告诉你线上哪一个位置就是答案。

**Key terms：** epipolar plane（核面：两个摄影中心和物点所在的平面）；epipolar line（核线：核面与像平面的交线）；conjugate points（同名点 / 对应像点）；image matching（影像匹配）。

**阅读方向：** 对照 Figure 2-20 依次指出基线、物点、核面和两条核线。

**辨析：** 核线不天然都是水平线；经过核线重采样/校正后常可把对应核线对齐为行。几何约束不能独自解决重复纹理与遮挡。

原著 2.8 Epipolar Planes and Lines；印刷 p.31；PDF 页 43。

### 07 · 相机自身与相机姿态 / Interior and exterior orientation

先用内方位知道像点对应相机中的哪条射线，再用外方位把这条射线放进物空间。框幅相机外方位通常有三个位置量和三个姿态量。

**Key terms：** interior orientation（内方位：从像点重建相机中的射线束）；exterior orientation（外方位：射线束在物空间中的位置与姿态）；camera calibration（相机检校）；lens distortion（镜头畸变）。

**阅读方向：** 读 p.88 内方位首段，列出主距、主点和畸变；读 p.90 外方位首段，对比它解决什么问题。

**辨析：** Orientation 不仅是相机朝向。外方位包括位置；内方位不是只指图片显示方向。主距与焦距并非所有对焦条件下都严格相等。

原著 4.3 Sensor Model; 4.4 Platform Model; 3.8 Camera Calibration；印刷 p.67, 88, 90；PDF 页 79, 100, 102。

### 08 · 公式的核心就是三点共线 / Collinearity equations

共线方程把物点坐标、像点坐标和相机参数连起来。它不是只做某一种题：把相机参数设为未知就是后方交会，把物点设为未知就可做前方交会。

**Key terms：** collinearity equations（共线方程）；rotation matrix（旋转矩阵）；knowns（已知量）；unknowns（未知量）。

**阅读方向：** 先看 Figure 4-8 再读 p.93 从向量式到两条标量式；注意消去的是沿射线的比例因子。

**辨析：** 旋转矩阵的使用方向与符号约定要先声明；不同教材的矩阵转置与角度约定可能不同。公式中的分母反映深度，不能逐项随意消掉。

原著 4.5.1 The Collinearity Equations；印刷 p.92, 93；PDF 页 104, 105。

### 09 · 先找相机，再找物点 / Resection and intersection

后方交会用已知地面点和像点去找相机的位置姿态。前方交会在相机定向后，由两张或多张影像求未知地面点的三维位置。

**Key terms：** resection（空间后方交会：由控制点求相机外方位）；intersection（空间前方交会：由多条成像射线求物点）；control point（控制点）；redundancy（多余观测 / 冗余）。

**阅读方向：** 先读各节第一段，用输入→输出各写一条箭头；p.115 再数两像点提供的四个像坐标方程与三个物点未知数。

**辨析：** Resection 不能按普通英语直接理解成外科切除；intersection 是射线交会。实际含噪射线通常不严格相交，要按观测误差模型估计。仅数方程够数不能保证几何稳定或唯一解。

原著 5.3 Resection; 5.5 Intersection；印刷 p.112, 115；PDF 页 124, 127。

### 10 · 模型立起来，再放到地图上 / Relative and absolute orientation

相对定向让两张照片的同名射线恢复几何关系，建立立体模型；模型仍有任意尺度、位置和姿态。绝对定向用统一尺度、三个旋转和三个平移，将它接入目标坐标系。

**Key terms：** relative orientation（相对定向）；absolute orientation（绝对定向）；stereomodel（立体模型）；similarity transformation（相似变换）。

**阅读方向：** p.115 读五个自由度的解释；p.118 读七个参数；p.119 为 Y、X、μ、M、T 分别写中文。

**辨析：** Absolute 不是绝对无误差。相对模型看起来立体，不表示已经获得国家坐标或真实尺度。模型尺度任意不是像内方位完全可以未知。

原著 5.6 Relative Orientation; 5.7 Absolute Orientation；印刷 p.115, 118, 119；PDF 页 127, 130, 131。

### 11 · 多张影像一起求最一致的几何 / Bundle adjustment

光束法把许多相机和许多物点一起调整，让预测像点尽量符合实测像点。加权最小二乘衡量的是残差平方的加权和，较可靠的观测通常给较大的权。

**Key terms：** bundle adjustment（光束法平差）；residual（残差）；least squares（最小二乘）；weight matrix（权矩阵）。

**阅读方向：** p.130 找 image ray 与 linearized collinearity equations；附录 B p.387 看为什么观测互不完全一致，p.390 看 least squares criterion 与 weight matrix。

**辨析：** Bundle 这里是成像射线束，不是文件打包。残差小不必然表示物方绝对精度高；缺控制、弱网形或错误匹配仍会有问题。最小二乘不自动防御粗差。

原著 5.8 Block Triangulation; 5.11 Numerical Aspects of Bundle Adjustment; Appendix B；印刷 p.119, 130, 387, 390；PDF 页 131, 142, 398, 401。

### 12 · 从像素走到 DEM 和正射影像 / Pixels to useful products

GSD 描述一个像素对应的地面采样间隔，它不保证实际分辨率或定位精度。DEM 提供高程；正射纠正结合相机几何和高程把透视影像重投影到地图坐标。

**Key terms：** ground sample distance (GSD)（地面采样距离）；resolution（分辨率：实际辨别细节的能力）；digital elevation model (DEM)（数字高程模型）；orthoimage（正射影像）；accuracy（准确度：与真实/参考值的接近程度）。

**阅读方向：** p.153 找作者怎样区分 GSD 与 resolution；p.235 用 Figure 8-9 解释透视与正射几何；p.242 为什么必须保存 accuracy metadata。

**辨析：** 数字图像不是自动精确地图。插值成更细的像素不能自动产生新细节。普通用地形 DEM 的正射影像可能仍有建筑倾倒；DEM、DSM、DTM 的使用需声明地面/表面定义。

原著 6.1 Digital Imagery; 6.5 Digital Image Measurement; 8.2 Digital Products; 8.5 Product Accuracy；印刷 p.153, 168, 169, 228, 235, 242；PDF 页 165, 180, 181, 240, 247, 254。
