---
title: "参考点转换与范士模型：中心和旋转轴各管什么"
prev: {"text":"Bursa–Wolf：平移、旋转与尺度的七参数模型","link":"/geodesy-seven-parameters"}
next: {"text":"从同名点估计七参数，再传播到大地坐标","link":"/geodesy-parameter-estimation"}
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-pivot-models.md; edit the Obsidian source. -->

# 参考点转换与范士模型：中心和旋转轴各管什么

区域控制网的同名点聚集在地球表面一块区域。把旋转与尺度作用在“相对该区域参考点的短向量”上，参数就更贴近局部网的几何。进一步沿参考点的北、东、上轴表示旋转，可把倾斜与方位旋转直接联系起来。本页对应 S11 第25–30页。


<AnatomyFigure src="/geodesy/interactive/transform-pivot.html" title="在参考点附近旋转、缩放和平移" :height="1100" poster="/geodesy/figures/lab-transform-pivot.svg" />

先减参考点，再旋转缩放相对向量，最后加回目标参考点。图采用主动正角，与课件被动参数应按正文对应。本站绘制。

[离线打开交互图](/geodesy/interactive/transform-pivot.html)

## 参考点模型先减、再转、再放回

设源系参考点为 $\mathbf p_s$，目标系中该物理参考点为 $\mathbf p_t$，则

$$
\boxed{\mathbf r_t=\mathbf p_t+(1+\mu)R(\mathbf r_s-\mathbf p_s).}
$$

每一项都有明确基底：$\mathbf r_s-\mathbf p_s$ 是源系中的参考点到待转换点向量；乘 R 后成为目标系分量；最后加目标系参考点的位置。

Molodensky–Badekas 常写成

$$
\boxed{\mathbf r_t=\mathbf p+(\mathbf t_p)+(1+\mu)R(\mathbf r_s-\mathbf p).}
$$

这里 p 是源系参考点的坐标数值，目标表达中复制同一组数值作辅助位置，$\mathbf p+\mathbf t_p=\mathbf p_t$。$\mathbf t_p$ 是参考点两套坐标数值的差，通常不等于两套坐标系原点间的平移。S11 第26页补充图正是用辅助点区分这两个含义。课件将此类模型简称为“Molodensky模型”，这里采用能明确指出参考点三维相似变换的名称。

<SourceFigure src="/geodesy/figures/source-pivot-two-frames.png" alt="课件中的源参考点、目标参考点与相对向量" source="S11 三维直角坐标系之间转换" page="26" locator="PDF 文件页 26（插入补充图）">

来源：S11，PDF 文件页26，截取二维关系图。左右两幅分别使用源、目标坐标，先在左图相减，再旋转缩放，最后在右图加目标参考点。原图 t 表示参考点两套坐标的数值差，本文记为 $\mathbf t_p$；它通常不是 Bursa–Wolf 的原点平移。

</SourceFigure>

## 与 Bursa–Wolf 的关系

把参考点模型展开：

$$
\mathbf r_t=\underbrace{[\mathbf p_t-(1+\mu)R\mathbf p_s]}_{\mathbf t_{BW}}
+(1+\mu)R\mathbf r_s.
$$

因此

$$
\boxed{\mathbf t_{BW}=\mathbf p_t-(1+\mu)R\mathbf p_s
=\mathbf t_p+\mathbf p-(1+\mu)R\mathbf p.}
$$

代入 $\mathbf r_s=\mathbf p_s$，参考点式立即给出 $\mathbf r_t=\mathbf p_t$；这是画图和写程序时最直接的检核。固定参考点后，两种模型可以表达相同的相似变换，差别在参数的组织与平移的含义。参考点常取公共点的重心，使旋转、尺度使用较小的中心化坐标，改善平移与其他参数之间的相关性。

<details><summary>推导一阶式与同名点参数方程</summary>

令 $\mathbf d_i=\mathbf r_{s,i}-\mathbf p$。用本章被动小角约定，省去高阶项：

$$
\begin{aligned}
\mathbf r_{t,i}
&\approx\mathbf p+\mathbf t_p+\mathbf d_i
+C(\mathbf d_i)\boldsymbol\varepsilon+\mu\mathbf d_i\\
&=\mathbf r_{s,i}+\mathbf t_p
+C(\mathbf d_i)\boldsymbol\varepsilon+\mu\mathbf d_i.
\end{aligned}
$$

于是参数方程与 Bursa–Wolf 相同，只把旋转和尺度系数中的 $\mathbf r_{s,i}$ 换为中心化向量 $\mathbf d_i$。求解后平移参数是 $\mathbf t_p$，应按上式换回 $\mathbf t_{BW}$ 才能使用全球原点模型。

将两点方程相减，$\mathbf t_p$ 与参考点均相消，故两模型得到相同的基线变换。

</details>


## 算例一：原材料二维补充图

S11 第26页给出源参考点 $\mathbf p_s=(3,2)^T$、待转换点 $\mathbf r_s=(6,3)^T$，目标参考点 $\mathbf p_t=(2,4)^T$。图采用二维主动逆时针25°、尺度1.15，与本章三维被动参数的约定需分别识别。

源相对向量为 $(3,1)^T$，因此

$$
\mathbf r_t=\begin{pmatrix}2\\4\end{pmatrix}
+1.15\begin{pmatrix}\cos25^\circ&-\sin25^\circ\\\sin25^\circ&\cos25^\circ\end{pmatrix}
\begin{pmatrix}3\\1\end{pmatrix}
\approx\begin{pmatrix}4.641\\6.500\end{pmatrix}.
$$

此例 $\mathbf t_p=(-1,2)^T$ 是参考点坐标数值差；全球相似变换的原点平移需计算 $\mathbf p_t-1.15R\mathbf p_s$。图中的虚线 t 表示前者。

## 算例二：三维两种写法闭合

取第五章例点作为源参考点 p，设 $\mathbf t_p=(1,-2,3)^T$ m，$\mu=2$ ppm，$\boldsymbol\varepsilon=(0.1'',-0.2'',0.3'')^T$，待转换点为 $\mathbf r_s=\mathbf p+(1000,2000,3000)^T$ m。采用 $R\approx I-[\boldsymbol\varepsilon]_\times$ 并保留尺度乘积，得

$$
\mathbf r_t=(-2846532.333028,\ 4643172.208265,\ 3313681.318480)^T\ \mathrm m.
$$

换成 Bursa–Wolf 时，同一个 R、尺度对应的平移为

$$
\mathbf t_{BW}=(-3.265391772,-17.028991405,-4.132299142)^T\ \mathrm m.
$$

把它代入原点模型可得到相同的目标坐标。这也说明，模型名称改变后直接复制三个平移数值，会改变变换本身。

<details><summary>进阶：范士 Veis 如何用参考点局部轴表达小旋转</summary>

## 范士 Veis：用参考点的局部轴表达旋转


范士模型沿用参考点变换中心，把全球旋转参数换成参考点局部地平轴的参数。若用右手 ENU，令参考点的方向矩阵为 $Q_{ENU,p}$，则

$$
\boldsymbol\varepsilon=Q_{ENU,p}\boldsymbol\omega_{ENU}.
$$

一阶模型变为

$$
\boxed{\mathbf r_t-\mathbf r_s
=\mathbf t_p+\mu\mathbf d
+C(\mathbf d)Q_{ENU,p}\boldsymbol\omega_{ENU}.}
$$

原课件使用左手 NEU 的代数旋转参数，按[局部旋转向量规则](geodesy-local-polar.html)有 $\boldsymbol\varepsilon=-Q_{NEU,p}\boldsymbol\omega_{NEU}$，所以课件第30页的旋转系数是 $C(\mathbf d)(-Q_{NEU,p})$。局部两轴参数描述倾斜，上轴参数描述方位起始方向的旋转。选择局部轴使旋转具有直观的区域意义。

范士模型改变的是旋转参数的基底表达，参考点模型改变的是旋转和尺度作用的中心。它们在参数正确定义后都可表达相应的三维相似变换。

这里变换的是小旋转生成元的参数，不能把任意有限欧拉角三元组直接乘 Q。局部 Q 使用源参考点在源椭球上的经纬度构造，与本页源相对向量的基底相容。

</details>

## 自检

1. 待转换点恰好就是参考点时，旋转与尺度项如何作用？
2. $\mathbf t_p$ 与 $\mathbf t_{BW}$ 在什么条件下相等？
3. 范士模型把三个全球旋转换成局部旋转，会增加独立参数数量吗？

<details><summary>展开答案</summary>

1. $\mathbf r_s-\mathbf p_s=0$，输出恰为 $\mathbf p_t$，旋转与尺度不改变零相对向量。
2. 当 $\mathbf p-(1+\mu)R\mathbf p=0$ 时相等，例如无旋转无尺度差，或参考点取源原点。一般区域参考点不满足此条件。
3. 不会，局部与全球三个旋转参数通过固定正交基底一一对应，仍是3个独立旋转参数。

</details>


继续：[参数估计与大地坐标微分](geodesy-parameter-estimation.html) · 返回[第六章](geodesy-frame-transformations.html)。
