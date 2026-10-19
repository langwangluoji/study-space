---
title: 第五单元 · 双像、视差与核线
prev: false
next: false
---

# 第五单元 · 双像、视差与核线

> **来源保留页。** 原有解释与锚点保留供查证；连续学习从[主讲对应小节](./photogrammetry-en-02.md#e2-6)进入。请按[唯一课程路线](./course-photogrammetry.md#shared-case)推进；考前用[精炼速查](./review-photogrammetry.md)。

## 视差是两次观测的几何差异

闭上一只眼，再换另一只眼看近处物体，你会发现物体相对背景移动。摄影测量中的左右视差（x-parallax）来自不同摄影位置的观测。本节采用经内定向、畸变改正且轴向一致的正直、平行、等航高双像：基线沿 X，相同主距为 $f$，摄站高程为 $H$，物点高程为 $h$，基线长为 $B$，视差定义 $p=x_L-x_R$（地面Z向上，$q_z=h-H<0$，两片均用等效像面$z=-f$；左$x_L=fX/(H-h)$，右$x_R=f(X-B)/(H-h)$，无需再翻转像坐标）。

由两条相似三角形关系相减得到

$$p=\frac{fB}{H-h},\qquad h=H-\frac{fB}{p}.$$

高点离相机近，视差更大。倾斜像对与逐行扫描不能直接使用这条理想式；应恢复定向并使用严密投影模型。$f,p$ 若以 mm 表示可以相消，$B,H,h$ 必须处于同一物方单位。

## 调基线之前，先预测测高误差

<PhotogrammetryLab type="stereo" />

在参考深度 $D=H-h$ 保持不变时，$p=fB/D$。仅考虑小的视差标准差 $\sigma_p$，一阶误差传播给

$$\sigma_h\approx\left|\frac{\partial h}{\partial p}\right|\sigma_p=\frac{fB}{p^2}\sigma_p=\frac{D^2}{fB}\sigma_p.$$

因此固定深度与像点误差时，增大基线可以改善测高几何；同时重叠可能降低、遮挡和匹配困难可能增加。实验若固定实测 $p$ 而单独改 $B$，隐含的高程也随之改变，不能把那种操作当成“同一个点、同一深度”的精度比较。

> 原创学习句：**A larger baseline strengthens depth geometry, but can make matching harder.** 这一权衡比单背“基高比越大越好”更有用。

## 视差差的精确式与近似式

参考点高程 $h_0$、深度 $D_0=H-h_0$、视差 $p_0$；高点视差 $p=p_0+\Delta p$。同一理想像对下：

$$\Delta h=D_0\frac{\Delta p}{p_0+\Delta p},\qquad
\Delta h_{lin}\approx D_0\frac{\Delta p}{p_0}.$$

第二式以 $p_0$ 替代高点视差，只在 $|\Delta p|/p_0$ 足够小时适用。非零高差时，它相对精确式的相对误差为 $|\Delta p|/p_0$。例如 $D_0=1000$ m、$p_0=100$ mm、$\Delta p=10$ mm，精确高差为 90.91 m，近似为 100 m，相对误差 10%。能否采用近似取决于任务容许误差。

复习纸中 $b$ 往往代表参考面像片基线，必须确认它与实际参考点视差的关系；不能把来自不一致条件的 $b,p_0$ 混合代入。[期末勘误](/photogrammetry-review)保留该类题的辨析。

## 核面把二维搜索限制到一条线

摄影基线与物点共同确定核面（epipolar plane）。核面与两张像面的交线是同名核线（corresponding epipolar lines）。已知左像点时，左摄影中心到该点的射线与基线确定一个核面；对应右像点应落在右核线上。

<SourceFigure src="/photogrammetry/figures/epipolar.png" alt="摄影基线、物点与核面核线" source="王佩军、徐亚明《摄影测量学》图4-9" page="69" printed="60" note="先找两个摄影中心，再沿物点所在平面寻找左右像面上的交线。" />

核线重采样（epipolar rectification）把左右对应核线整理成同行，使匹配从二维搜索变成沿行的一维搜索。它减少搜索范围，不保证所有像点都能匹配；纹理重复、遮挡和灰度变化仍会造成错误。

## 共面与交会要分开

左右射线向量 $q_1,q_2$ 和基线向量 $B$ 均表达在同一轴系时，共面条件为

$$B\cdot(q_1\times q_2)=0.$$

叉积给射线所在平面的法向量，点积为零表示基线也在该平面。共面约束有利于相对定向，但平行射线也可能共面；约束成立不保证存在稳定、可见的有限交点。

## 地形高差如何移动像点

正直影像上，高于参考面的物点向外产生高差位移（relief displacement）。若 $r$ 为高点像点至中心的径向距离，$H$ 为相对参考面的航高，$h$ 为相对该面的高程，则 $d=rh/H$。这里的 $r$ 是**高点**像点距离，换成投影到基准面的距离会得到不同表达。

<PhotogrammetryLab type="relief" />

倾斜像片上像主点与像底点不重合，不能把一切径向关系都围绕主点套用；应回到严密摄影几何。

<details><summary>核线约束通过了，就可以认定同名点一定正确吗？</summary>

不能。同一核线上仍可能有重复纹理和多个候选点，遮挡也可能使对应不存在。还需灰度/特征检验、邻域一致性和几何检查。

</details>

<details><summary>$f=150$ mm、$B=600$ m、$H=3000$ m、$p=36$ mm，物点高程是多少？</summary>

$h=3000-(150/36)\times600=500$ m。这是相对给定高程基准的结果；改变基准或将 H 误当相对航高会改变题意。

</details>

## 对照阅读

中文 PDF 60–61（高差位移）、69–71（立体几何）、91（共面）、182–183（核线）；英文 Chapter 2 PDF 25 起，Chapter 4、5 的对应主题见[完整阅读地图](/photogrammetry-sources)。

<LearningMark section="photo-stereo" />
