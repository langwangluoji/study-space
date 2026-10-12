---
prev: /geodesy-curvature
next: /geodesy-metric
---

# 法曲率与方向曲率

同一曲面上的点可以沿很多方向离开。曲线本身如何弯曲，和曲面沿这个切向如何弯曲，既相关又不同。Meusnier 定理先把这两种曲率联系起来，Euler 公式再说明任意方向的法曲率如何由两个主方向决定。

对应椭球讲义文件页 41–50，包括插入的 Meusnier 与 Euler 证明。为让凸椭球的曲率半径取正值，本专题选择**内法线** $\boldsymbol\nu=-\mathbf e_U$。若改用外法线，有符号法曲率反号，但几何曲率半径的正值不变。

## 曲线曲率怎样投影到曲面法线

设一般正则曲面为 $\mathbf x(u,v)$，面上一条曲线按弧长表达为 $\mathbf r(s)=\mathbf x(u(s),v(s))$。切向与二阶导数分别为

$$
\mathbf r'=\mathbf x_u u'+\mathbf x_v v',
$$

$$
\mathbf r''=
\mathbf x_{uu}(u')^2+2\mathbf x_{uv}u'v'
+\mathbf x_{vv}(v')^2
+\mathbf x_u u''+\mathbf x_v v''.
$$

与单位曲面法线 $\boldsymbol\nu$ 作点积时，最后两项消失，因为一阶偏导都在切平面内。因此定义有符号法曲率

$$
k_n=\mathbf r''\cdot\boldsymbol\nu
=L_2(u')^2+2M_2u'v'+N_2(v')^2,
$$

其中 $L_2=\mathbf x_{uu}\cdot\boldsymbol\nu$、$M_2=\mathbf x_{uv}\cdot\boldsymbol\nu$、$N_2=\mathbf x_{vv}\cdot\boldsymbol\nu$ 是第二基本形式的系数，下标用于区别椭球的曲率半径 $M,N$。

在固定点、固定单位切向下，$u',v'$ 已经确定，曲线怎样继续走所对应的 $u'',v''$ 不影响 $k_n$。这就是不同曲线只要有同一切向，就有相同法曲率的原因。

若曲线曲率 $\kappa>0$，写 $\mathbf r''=\kappa\mathbf n_c$，$\theta$ 是主法线与所选曲面法线的夹角，则

$$
\boxed{k_n=\kappa\cos\theta}.
$$

包含曲面法线和该切向的平面称为法截面，其交线为法截线。在凸椭球上按内法线约定，法截线主法线与 $\boldsymbol\nu$ 相同，故法截线曲率就是 $k_n>0$。其他具有同一切向的曲线满足 $\kappa=k_n/\cos\theta$。这是 Meusnier 定理在这里的表达；主法线不存在或投影为零时，应使用前面的点积定义，不能无条件除以 $\cos\theta$。

## 从平行圈推导卯酉曲率半径

<SourceFigure src="/geodesy/figures/normal-sections.png" alt="子午法截面与卯酉法截面" source="1椭球面数学性质   课程讲义.pdf" page="41" printed="32" note="示意图包含局部轴和角度标记，不能把每个标记字母都当成本文的纬度或曲率半径。" />

卯酉法截面包含法线与东向切线，与子午面正交。平行圈在固定 B 下是半径 $r_B=N\cos B$ 的圆，它与卯酉法截线具有同一东向切线，但通常不是同一曲线。

平行圈的曲率为 $1/r_B$，主法线指向旋转轴：

$$
\mathbf n_{\parallel}=(-\cos L,-\sin L,0).
$$

与椭球内法线
$\boldsymbol\nu=(-\cos B\cos L,-\cos B\sin L,-\sin B)$
作点积，得到 $\cos\theta=\cos B$。Meusnier 定理于是给出

$$
k_{\mathrm{卯酉}}
=\frac{\cos B}{r_B}
=\frac{\cos B}{N\cos B}
=\frac1N.
$$

所以先前出现的 $N=a/W$ 正是卯酉曲率半径。这个推导在非极点成立；极点处平行圈退化，应由极限或另一局部坐标图得到相同结论。

在赤道，平行圈与卯酉法截线局部具有同一法向，所以其曲率半径相同；其他纬度的平行圈半径是 $N\cos B$，不能把它直接当成 $N$。

## Euler 公式为什么成立

第二基本形式是一个对称二次型。在切平面选择正交单位基，它对应对称矩阵，因而可以用正交主方向对角化。先以一般曲面说明其几何意义：在点附近令切平面为 $z=0$，所选法线指向正 z，曲面写作 $z=f(x,y)$，该点有 $f_x=f_y=0$。

对弧长曲线求二阶导数并取法向分量，得到

$$
k_n=f_{xx}(x')^2+2f_{xy}x'y'+f_{yy}(y')^2.
$$

对称 Hessian 的两个正交特征方向就是此处的主方向；在这些方向取坐标后，$f_{xy}=0$，$f_{xx}=k_1,f_{yy}=k_2$。单位切向与第一主方向夹角为 A，则 $x'=\cos A,y'=\sin A$，所以

$$
\boxed{k_n(A)=k_1\cos^2A+k_2\sin^2A}.
$$

对椭球还需确认子午与卯酉方向确实为主方向。已有 $\mathbf r_B=M\mathbf e_N$、$\mathbf r_L=N\cos B\mathbf e_E$，一阶点积为零；混合二阶导数的法向分量也为零，因为
$\partial_L\mathbf e_N=-\sin B\,\mathbf e_E$。因此两个基本形式在这组方向都没有交叉项，子午和卯酉就是主方向，其曲率分别为 $1/M,1/N$。

取 A 从北向往东向量起，Euler 公式成为

$$
\frac1{R_A}=\frac{\cos^2A}{M}+\frac{\sin^2A}{N},
\qquad
\boxed{R_A=\frac{MN}{N\cos^2A+M\sin^2A}}.
$$

由 $N/M=W^2/(1-e^2)=1+e'^2\cos^2B\ge1$ 得 $M\le R_A\le N$。A 为 0 时得到 M，为 $\pi/2$ 时得到 N；极点处 M=N，任意方向相同。

讲义还引入辅助量 $c=a^2/b$、$V=\sqrt{1+e'^2\cos^2B}$。由 $V^2=W^2/(1-e^2)$，可将同一组半径写为 $N=c/V$、$M=c/V^3$、$\sqrt{MN}=c/V^2$。这些是前述公式的代数重写，不是另外三种几何半径。

## 对方向平均得到哪个量

讲义把平均曲率半径定义为各方位曲率半径的平均：

$$
\overline R=\frac1{2\pi}\int_0^{2\pi}R_A\,dA.
$$

利用平方三角函数的对称性，将积分缩为四倍第一象限。令 $t=\tan A$，$dA=dt/(1+t^2)$，分母也带同一个因子，所以

$$
\begin{aligned}
\overline R
&=\frac2\pi\int_0^{\pi/2}
\frac{MN}{N\cos^2A+M\sin^2A}\,dA\\
&=\frac2\pi\int_0^\infty\frac{MN}{N+Mt^2}\,dt.
\end{aligned}
$$

再令 $q=\sqrt{M/N}\,t$，得到

$$
\overline R=\frac2\pi\sqrt{MN}
\int_0^\infty\frac{dq}{1+q^2}
=\boxed{\sqrt{MN}}.
$$

这与通常微分几何中的平均曲率
$\mathcal H=(1/M+1/N)/2$ 含义不同。先对半径平均、先对曲率平均再取倒数，一般不会得到相同数值。球面或椭球极点处 M=N，这些区别才消失。

法截线也不等于任意大地线。法截线由平面与曲面相交产生，大地线要求曲率向量的切平面分量为零；两种定义一般不会给出同一整条曲线。这里用法截线解释局部曲率，并不据此声称得到任意两点的最短路径。

<LearningMark section="ge-normal-curvature" />
