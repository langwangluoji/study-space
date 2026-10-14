---
title: 克莱劳定理与微分方程
prev: {"text":"法截弧与大地线","link":"/geodesy-geodesic-geometry"}
next: {"text":"第四章 椭球面上大地坐标的计算","link":"/geodesy-computation"}
---

# 克莱劳定理与微分方程

## 由旋转对称性得到守恒量

上一专题证明 $r''=\lambda\nabla F$。前两个分量给出 $X''=2\lambda X/a^2$、$Y''=2\lambda Y/a^2$，从而

$$
XY''-YX''=0,\qquad \frac{d}{ds}(XY'-YX')=0.
$$

这里直接交叉相减，避免原讲义比值式在某坐标或加速度分量为零时不能相除。积分得到 $XY'-YX'=C$。写 $X=r_B\cos L$、$Y=r_B\sin L$，其中 $r_B=N\cos B$ 是平行圈半径，则

$$
X'=r_B'\cos L-r_B\sin L\,L',\qquad
Y'=r_B'\sin L+r_B\cos L\,L',
$$

代回后径向项抵消，得到 $r_B^2L'=C$。局部东向长度为 $r_BdL=\sin A\,ds$，于是

$$
\boxed{r_B\sin A=N\cos B\sin A=C.}
$$

这就是克莱劳（Clairaut）定理。沿同一条大地线，平行圈半径与方位角正弦的乘积不变。若 $C\ne0$，便有 $r_B\ge|C|$；到达纬度极值时北向分量为零，$|\sin A|=1$。这只是某一点瞬时向东或西，不表示后续一直沿普通平行圈走。$C=0$ 对应子午方向，过极点后经纬坐标表达需重新选取。

## 从局部长度分量到三个微分方程

前章度量给出北向长度 $MdB$、东向长度 $N\cos B\,dL$。投影单位切线，得到

$$
\frac{dB}{ds}=\frac{\cos A}{M},\qquad
\frac{dL}{ds}=\frac{\sin A}{N\cos B}.
$$

为推方位角变化，先计算 $r_B$ 对纬度的导数。由

$$
N=\frac{a}{\sqrt{1-e^2\sin^2B}},\quad
M=\frac{a(1-e^2)}{(1-e^2\sin^2B)^{3/2}}
$$

可直接化简得 $dr_B/dB=-M\sin B$，因此 $dr_B/ds=-\sin B\cos A$。对守恒式求导：

$$
r_B'\sin A+r_B\cos A\,A'=0.
$$

在 $\cos A\ne0$ 处约去该因子，得到 $A'=\tan B\sin A/N$。在东西向转折点，原守恒式不能直接除以 $\cos A$；连续的大地线方程给出同样的极限。因此完整系统为

$$
\boxed{B'=\frac{\cos A}{M},\qquad
L'=\frac{\sin A}{N\cos B},\qquad
A'=\frac{\tan B\sin A}{N}.}
$$

<SourceFigure src="geodesy/figures/S7-geodesic-differentials.png" alt="大地线位移的北向与东向分解" source="S7 大地线讲义" page="9" printed="7" note="图中dA表示沿前进方向的切线方位角变化；公式中的角度均为弧度。" />

把这三个方程代回，既得到 $M^2B'^2+N^2\cos^2B\,L'^2=1$，又得到 $d(N\cos B\sin A)/ds=0$。单位速度与克莱劳守恒可作为数值积分的检查量。极点处 $\cos B=0$，经度与方位角坐标本身奇异，并不意味着曲线断裂；极区计算应换用稳定的坐标或完整大地线算法。

## 从微分关系走向坐标计算

例如 WGS84 上 $B=45^\circ,A=60^\circ$，$M\approx6367381.8\,\mathrm m$、$N\approx6388838.3\,\mathrm m$。初始导数约为 $B'=7.8525\times10^{-8}\,\mathrm{rad/m}$、$L'=1.9170\times10^{-7}\,\mathrm{rad/m}$、$A'=1.3555\times10^{-7}\,\mathrm{rad/m}$。前进1km的局部一阶估计约改变纬度16.20″、经度39.54″、方位角27.96″；有限距离仍应积分或采用高阶公式，不能把起点导数当作整段常数。

下一章先把真实地面观测变成椭球上的方向和长度，再用这组方程解算终点坐标。正算给出终点的前进切线方位角 $A_2^+$ 后，反方位角为 $A_{21}=(A_2^++\pi)\bmod2\pi$；一般不能直接写成起点角 $A_{12}+\pi$。

[原文定位：S7 文件页5–10](geodesy-source-s7.html)。

网页为串联原讲义补写了中间推导、符号约定与边界说明；完整原文和批注仍以所列文件页为准。

<LearningMark section="ge-geodesic-equations" />
