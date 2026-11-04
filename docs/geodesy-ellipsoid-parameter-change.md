---
title: "椭球参数改变时，同一点的经纬高怎样变化"
prev: {"text":"坐标微分：方向基与长度标尺","link":"/geodesy-coordinate-differentials"}
next: {"text":"第六章：空间坐标系转换","link":"/geodesy-frame-transformations"}
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-ellipsoid-parameter-change.md; edit the Obsidian source. -->

# 椭球参数改变时，同一点的经纬高怎样变化

把参考椭球放大 1 m，测站仍固定在原来的空间位置，它的椭球高就要重新计量；椭球扁率改变，法线方向也会跟着变化。本页对应 S10 第7–9页，研究原点和轴向保持不变、只改变椭球元素的情况。

<SourceFigure src="/geodesy/figures/ellipsoid-change.svg" alt="固定空间点在两套参考椭球上的经纬高" source="本站绘制" page="示意图" original>

两图的轴、比例和 P 坐标一致，参考椭球改变后，脚点和法线重新确定。h 沿各自法线计量；不能只把两条高度线平行平移。本站用正反算构造，参数差异已放大。

</SourceFigure>

可以先想象保持 B、L、h 数值不变而改变椭球：正算出的空间位置将改变 $K\,d\boldsymbol\theta$。若要求测站的实际 XYZ 不动，经纬高必须再调整，使 $AD\,d\mathbf g=-K\,d\boldsymbol\theta$。这里 $\mathbf g=(B,L,h)^T$、$\boldsymbol\theta=(a,e^2)^T$；负号表示两种贡献相互抵消。

## 用全微分分清两类变化

将正算关系写为 $\mathbf r=\mathbf r(B,L,h;a,q)$，其中 $q=e^2$。它的全微分是

$$
d\mathbf r=AD\,d\mathbf q_g+K\begin{pmatrix}da\\dq\end{pmatrix},\qquad
\mathbf q_g=(B,L,h)^T.
$$

AD 是[上一页的坐标雅可比](geodesy-coordinate-differentials.html)；K 的两列分别是固定 BLH 时对 a 与 q 的偏导。于是

$$
\boxed{d\mathbf q_g=D^{-1}A^T d\mathbf r
-D^{-1}A^T K\begin{pmatrix}da\\dq\end{pmatrix}.}
$$

第一项来自空间直角坐标变化，第二项来自参考椭球大小、形状的变化。只有空间点在同一原点和同一轴向下固定，才令 $d\mathbf r=0$。

## 固定位置时的结果

仍令 $W=\sqrt{1-q\sin^2B}$、$N=a/W$。固定 XYZ 后得到

$$
\boxed{\begin{aligned}
dB={}&\frac{q\sin B\cos B}{W(M+h)}\,da
+\frac{N\sin B\cos B(2-q\sin^2B)}{2W^2(M+h)}\,dq,\\
dL={}&0,\\
dh={}&-W\,da+\frac{N\sin^2B}{2}\,dq.
\end{aligned}}
$$

椭球仍绕同一 Z 轴旋转，且空间点的 X、Y 未变，因此经度保持不变。a 增大意味着参考面向外扩张，固定点的高度通常随之减小；q 增大使椭球在高纬度更扁，纬度与高度的变化由上式定量给出。

<details><summary>完整推导：参数偏导矩阵与投影</summary>

固定 B、L、h 时

$$
N_a=\frac Na=\frac1W,\qquad
N_q=\frac{N\sin^2B}{2W^2}.
$$

逐项微分正算公式得

$$
K=\begin{pmatrix}
N\cos B\cos L/a&N\sin^2B\cos B\cos L/(2W^2)\\
N\cos B\sin L/a&N\sin^2B\cos B\sin L/(2W^2)\\
N(1-q)\sin B/a&-N(\cos^2B+W^2)\sin B/(2W^2)
\end{pmatrix}.
$$

最后一个元素从 $Z=[N(1-q)+h]\sin B$ 求导得到：

$$
Z_q=[(1-q)N_q-N]\sin B
=-\frac{N(\cos^2B+W^2)\sin B}{2W^2}.
$$

S10 第7页该元素末尾印作 $\cos B$，这里按直接求导改为 $\sin B$；第9页的简化结果与上述正确偏导相符。赤道 $B=0$ 时，固定 BLH 的 Z 始终为零，也能独立检出这个局部笔误。

将 K 的两列投影到北、东、上方向：

$$
\begin{aligned}
\mathbf e_N^TK_a&=-q\sin B\cos B/W,&\mathbf e_U^TK_a&=W,\\
\mathbf e_N^TK_q&=-N\sin B\cos B(2-q\sin^2B)/(2W^2),&
\mathbf e_U^TK_q&=-N\sin^2B/2.
\end{aligned}
$$

两列的东向投影均为零。令 $0=AD\,d\mathbf q_g+K(da,dq)^T$，左乘 $-D^{-1}A^T$，逐行便得到本页框内公式。

</details>


## 算例：椭球放大并稍改扁率

固定[本章例点](geodesy-coordinate-forward.html)的 XYZ，令

$$
da=1\ \mathrm m,\qquad dq=10^{-8}.
$$

在原椭球参数和原 BLH 处代入一阶公式，得

$$
\boxed{dB=0.001020628645'',\quad dL=0,\quad dh=-0.990387303678\ \mathrm m.}
$$

用新参数 $a+1,q+10^{-8}$ 对固定 XYZ 重新反算，得到

$$
\Delta B=0.001020628766'',\quad \Delta L=0,\quad
\Delta h=-0.990387302995\ \mathrm m.
$$

一阶式与完整反算一致到本例显示精度。若改用扁率 f 为参数，须先用 $dq=2(1-f)df$ 换算，而不是把 df 直接放入 dq 的位置。

## 检核赤道与极点

在赤道 $\sin B=0,W=1$，有 $dB=dL=0,dh=-da$；改变 q 不改变赤道半径 a。在极点，上式的 $dB$ 为零，而

$$
dh=-\sqrt{1-q}\,da+\frac{a}{2\sqrt{1-q}}\,dq=-db.
$$

这正是固定极轴点到新极半径 b 的距离变化。极点的 L 仍属于未定义参数，$dL=0$ 是沿用同一经度约定的记号。

## 自检

1. 球面只把半径增大 2 m，固定空间点的高度如何变化？
2. 若两个椭球还具有不同原点，能否直接令 dXYZ=0？
3. 为什么更换椭球形状时经度保持不变，而纬度可能变化？

<details><summary>展开答案</summary>

1. $dh=-2\ \mathrm m$，经纬方向保持原值；这里 dq=0。
2. 需要先把同一空间点在两套框架中的坐标关系写清。原点平移会产生 dXYZ 项，再与椭球参数项一起代入全微分。
3. 经度取决于 XY 方向和子午面；同轴旋转椭球的子午面相同。大地纬度取决于该椭球的法线，形状改变会改变法线方向。

</details>


继续：[第六章：空间坐标系转换](geodesy-frame-transformations.html) · 返回[第五章](geodesy-coordinate-conversion.html)。
