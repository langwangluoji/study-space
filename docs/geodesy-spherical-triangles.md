---
title: 球面角超与三角形解算
prev: {"text":"地面方向与边长归算","link":"/geodesy-observation-reduction"}
next: {"text":"高斯平均引数的推导","link":"/geodesy-gauss-derivation"}
---

# 球面角超与三角形解算

<!-- earth-reading-task -->
若测量任务是由P、Q等站组成小三角网，还需要处理曲面内角和超过180°的现象。这个支路先解释面积和角超的联系，再把小球面三角形近似为平面三角形；完成后可回到大地主题主路。
<!-- /earth-reading-task -->

## 为什么曲面三角形的内角和超过180度

在平面上，三角形内角和为 $\pi$。在半径 $R$ 的球面上，用短大圆弧围成的凸三角形，其内角 $\alpha,\beta,\gamma$ 的和超过 $\pi$，超出的量称为**球面角超**：$\varepsilon=\alpha+\beta+\gamma-\pi$。它与球面上的三角形面积 $F$ 满足精确关系 $\varepsilon=F/R^2$，角度用弧度。

例如北极和赤道上经度差90°的两点，由短大圆弧组成三个直角的三角形；角超为 $\pi/2$，面积为 $\pi R^2/2$，正是球面积的八分之一。对大型、跨越半球或不同弧段选择的区域，需要重新明确内外区域；本页沿用原讲义的小凸三角形。

## 月形面积与角超的完整推导

**球面月形**是两个半大圆围成的区域，两个交点互为对跖点，二面角为 $\theta$。不能把一条短弧或局部扇形误当作整个月形。在球坐标中，用余纬 $\vartheta$ 和经度 $\lambda$：

$$
dF=R^2\sin\vartheta\,d\vartheta\,d\lambda,\qquad
F_\theta=R^2\int_0^\theta\int_0^\pi\sin\vartheta\,d\vartheta\,d\lambda=2R^2\theta.
$$

<SourceFigure src="geodesy/figures/S8-spherical-lune.png" alt="半大圆围成的完整球面月形" source="S8 大地坐标计算讲义" page="13" printed="插入说明页" note="θ是弧度；积分中的余纬覆盖0到π，不能只取前半球的投影面积。" />

令三角形顶点为 $P,Q,T$，对跖点为 $P',Q',T'$。由三个大圆划分的球面区域成对对跖；记原三角形面积为 $F$，相邻三个区域 $P'QT,PQ'T,PQT'$ 的面积为 $F_P,F_Q,F_T$。对跖区域面积相等，所以

$$
2(F+F_P+F_Q+F_T)=4\pi R^2.
$$

三个包含原三角形的月形分别具有面积 $F+F_P$、$F+F_Q$、$F+F_T$。相加，原三角形被计算三次，故

$$
F_\alpha+F_\beta+F_\gamma
=3F+F_P+F_Q+F_T=2F+2\pi R^2.
$$

另一方面，每个月形面积为 $2R^2$ 乘它的角，得到

$$
2R^2(\alpha+\beta+\gamma)=2\pi R^2+2F,
\qquad \boxed{\varepsilon=F/R^2.}
$$

这补足了课件中“三块面积之和”的计数依据。椭球曲率不恒定时，严格推广是曲率在区域上的积分；小区域可用局部 $R_G=\sqrt{MN}$ 近似，不能对任意大椭球三角形都把 $F/R^2$ 当精确式。

## 小球面三角形怎样用平面公式解

勒让德定理说：对边长相对球半径很小的球面三角形，可保持三条**弧长边** $a,b,c$，把三个球面角各减去约 $\varepsilon/3$，作为对应平面三角形的角。这是有限阶近似，不是任意球面三角形的恒等式。若记 $\gamma'=\gamma-\varepsilon/3$，讲义的面积展开为

$$
F\simeq\frac{ab\sin\gamma'}2
\left[1+\frac{a^2+b^2+c^2}{24R^2}\right],
\qquad
\varepsilon\simeq\frac{ab\sin\gamma'}{2R^2}
\left[1+\frac{a^2+b^2+c^2}{24R^2}\right].
$$

最低阶可直接用 $\gamma$ 代替 $\gamma'$：$\varepsilon\simeq ab\sin\gamma/(2R^2)$。讲义写边长小于40km时第二项对角超的影响小于 $0.0004''$；这是它给出的工程数量级估计；做严格误差预算还应检查形状和采用的半径。为避免混淆，这里的 $a$ 表示三角形边，下一专题的 $\Delta A$ 表示方位角差。

小三角形的球面角 $\alpha,\beta,\gamma$ 归算为 $\alpha'=\alpha-\varepsilon/3$ 等之后，有

$$
\frac{\sin\alpha'}a\simeq\frac{\sin\beta'}b\simeq\frac{\sin\gamma'}c.
$$

实际计算可先用平面面积估计角超，再修正角并用正弦或余弦定理解算；若需要更高精度，回到球面三角公式或直接解椭球大地线。球面角超也不是地面三角网的任意观测闭合差，观测还包含随机误差、系统误差和归算影响。

<details><summary>本站补充推导：为什么三个角都约减去角超的三分之一</summary>

以 $a,b,c$ 三条球面弧长构造平面三角形，设其对边 $c$ 的角为 $\gamma_0$，则 $\cos\gamma_0=(a^2+b^2-c^2)/(2ab)$。球面余弦定理给出

$$
\cos\gamma=\frac{\cos(c/R)-\cos(a/R)\cos(b/R)}{\sin(a/R)\sin(b/R)}.
$$

展开三角函数并代入平面余弦定理，整理到曲率的一次项：

$$
\cos\gamma=\cos\gamma_0-\frac{ab}{6R^2}\sin^2\gamma_0+O((\ell/R)^4),
$$

其中 $\ell$ 是边长尺度，三角形形状保持非退化。由 $\cos(\gamma_0+\Delta\gamma)\simeq\cos\gamma_0-\sin\gamma_0\Delta\gamma$，得

$$
\gamma-\gamma_0\simeq\frac{ab\sin\gamma_0}{6R^2}=\frac{F_0}{3R^2}.
$$

$F_0$ 是同边平面三角形面积。对另外两个角做同样展开，得到相同的首项；三角相加即 $\varepsilon\simeq F_0/R^2$，所以各角约减 $\varepsilon/3$。这一推导也说明不能把近似视为精确的保距保角展开，或应用到接近退化的任意大三角形。

</details>

## 原讲义中的控制网背景

S8 文件页10–11介绍沿经纬方向布设的一等天文大地锁网：约200km格网、平均约20km三角形边长，以及48000余个基本平面控制点和西安大地原点。这些是原课件的历史背景与图示数量级，说明为什么短线归算和小三角形解算有实际需求，不能当作2026年国家控制网的现状统计。

原控制网图完整保留在[资料库](geodesy-source-s8.html)中。本文的角超证明对应文件页12–14，面积近似与勒让德定理对应15–16；插入的月形说明和分区证明均已纳入。

<LearningMark section="ge-spherical-triangles" />
