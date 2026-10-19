---
prev: {"text": "椭球上的局部方向", "link": "/geodesy-local-directions"}
next: {"text": "法曲率与方向曲率", "link": "/geodesy-normal-curvature"}
---

# 曲线曲率与子午曲率半径

<!-- earth-reading-task -->
沿子午线走，单位切向怎样转动？在P处放一把局部曲率规，找到和曲线贴合到二阶的圆。这个圆的半径将解释为何前页的纬度长度系数恰好叫作子午曲率半径M。
<!-- /earth-reading-task -->

切向量说明曲线朝哪里走，曲率则说明这个方向沿曲线改变得有多快。同样转过一个角度，如果发生在较短弧长上，弯曲就更强。先从这个定义推导一般公式，再把它用于子午椭圆，子午曲率半径 $M$ 就有了明确的几何来源。

对应椭球讲义文件页 33–40，其中原曲率页之后有新增推导页。假设曲线二阶连续可微，且参数速度 $v=\|\mathbf r'(t)\|>0$。

## 从弧长定义到一般曲率

沿弧长 $s$ 表达，单位切向量为 $\mathbf T=d\mathbf r/ds$。曲率定义为 $\kappa=\|d\mathbf T/ds\|\ge0$。若 $\kappa>0$，主法线 $\mathbf n_c=(d\mathbf T/ds)/\kappa$，曲率半径为 $R_c=1/\kappa$。

为了用任意参数 $t$ 计算，利用 $ds/dt=v$，便有 $d/ds=(1/v)d/dt$ 与 $\mathbf T=\mathbf r'/v$。再从 $v^2=\mathbf r'\cdot\mathbf r'$ 求导：

$$
2vv'=2\mathbf r'\cdot\mathbf r'',
\qquad v'=\frac{\mathbf r'\cdot\mathbf r''}{v}.
$$

对单位切向量求导并换成弧长导数：

$$
\frac{d\mathbf T}{ds}
=\frac1v\frac d{dt}\left(\frac{\mathbf r'}v\right)
=\frac{\mathbf r''}{v^2}
-\frac{\mathbf r'(\mathbf r'\cdot\mathbf r'')}{v^4}.
$$

第二项减去加速度的切向分量，只留下改变方向的部分。把右侧平方并展开，使用 $\|\mathbf r'\|^2=v^2$，得到

$$
\begin{aligned}
\kappa^2
&=\frac{\|\mathbf r''\|^2}{v^4}
-\frac{(\mathbf r'\cdot\mathbf r'')^2}{v^6}\\
&=\frac{\|\mathbf r'\|^2\|\mathbf r''\|^2
-(\mathbf r'\cdot\mathbf r'')^2}{v^6}.
\end{aligned}
$$

分子就是叉积模长平方，因此

$$
\boxed{\kappa=
\frac{\|\mathbf r'\times\mathbf r''\|}
{\|\mathbf r'\|^3}}.
$$

圆 $\mathbf r(t)=(R\cos t,R\sin t,0)$ 的速度长度为 $R$，叉积长度为 $R^2$，所以 $\kappa=1/R$；直线的二阶导数为零，曲率为零。直线没有唯一主法线，曲率半径只能以无穷大理解。

曲率不取决于走过曲线的快慢，只取决于曲线本身。上式中的速度幂次正是完成参数到弧长转换后出现的，不是一个经验分母。

## 把一般公式应用到子午椭圆

在固定经度的子午面内，选归化纬度作为参数，旋转不影响曲率，所以直接取

$$
\mathbf r(u)=(a\cos u,0,b\sin u).
$$

一阶与二阶导数分别为

$$
\mathbf r_u=(-a\sin u,0,b\cos u),\qquad
\mathbf r_{uu}=(-a\cos u,0,-b\sin u).
$$

叉积只有 Y 分量，其绝对值为 $ab(\sin^2u+\cos^2u)=ab$。速度平方为 $a^2\sin^2u+b^2\cos^2u$，于是

$$
M(u)=\frac1\kappa
=\frac{(a^2\sin^2u+b^2\cos^2u)^{3/2}}{ab}.
$$

要得到大地纬度表达，还需把 $u$ 换成 $B$。由[三种纬度专题的坐标比较](geodesy-ellipsoid-coordinates.html#latitude-relations)：

$$
\cos u=\frac{\cos B}{W},\qquad
\sin u=\frac{\sqrt{1-e^2}\sin B}{W}.
$$

把它们代入速度平方，分子合并为

$$
a^2\sin^2u+b^2\cos^2u
=\frac{a^2(1-e^2)}{W^2}.
$$

再利用 $ab=a^2\sqrt{1-e^2}$，得到

$$
\boxed{M(B)=\frac{a(1-e^2)}{W^3}}.
$$

这与局部方向专题中的纬度长度系数完全相同。还可以独立解释这个相等：子午切向单位向量为
$\mathbf e_N=(-\sin B\cos L,-\sin B\sin L,\cos B)$，
其纬度导数为 $-\mathbf e_U$。由于 $ds=M\,dB$，

$$
\frac{d\mathbf e_N}{ds}
=\frac1M\frac{d\mathbf e_N}{dB}
=-\frac1M\mathbf e_U.
$$

因此子午线曲率为 $1/M$，主法线朝向内侧；几何外法线与它在同一直线上，但方向相反。这一方向约定在法曲率专题中尤为重要。

用二阶Taylor式可以理解“密切”为什么与曲率相连。在曲率非零的点s₀附近，

$$
\mathbf r(s_0+\delta s)=\mathbf r_0+\mathbf T_0\delta s
+\frac{\kappa_0\mathbf n_c}{2}(\delta s)^2+o((\delta s)^2).
$$

以 $\mathbf r_0+\mathbf n_c/\kappa_0$ 为圆心、$1/\kappa_0$ 为半径，在切向与主法向张成的平面内画圆，它有同样的位置、一阶切向和二阶弯曲项。因此密切圆描述的是局部接触，而不是整条曲线都成为这个圆。下图下半部给出这层关系；上半部的法曲率夹角将在下一专题使用。

<SourceFigure src="/geodesy/figures/local-curvature.svg" alt="主法线、方位角与密切圆的局部关系" source="本站绘制" page="示意图" original />

## 边界与局部意义

赤道 $B=0$ 时 $M=a(1-e^2)=b^2/a$；极点处 $W=\sqrt{1-e^2}$，因此 $M=a/\sqrt{1-e^2}=a^2/b$。球面极限 $e=0$ 则在每一点有 $M=a$，符合圆的曲率半径。

$M$ 是接触该点、具有同样切向和曲率的密切圆半径，不是该点到地心的距离。对于扁椭球，赤道附近的子午截线比极点附近弯得更强，所以其曲率半径更小。下一专题会比较同一点不同切向的弯曲，而不是只沿子午线考察。

<LearningMark section="ge-curvature" />
