---
prev: {"text": "曲线曲率与子午曲率半径", "link": "/geodesy-curvature"}
next: {"text": "曲面度量 弧长与面积", "link": "/geodesy-metric"}
---

# 法曲率与方向曲率

<!-- earth-reading-task -->
不改变P，只把出发方向从北转向东。我们要得到任意方位A的局部半径，而不是再定义一批互不相干的圆。先用投影找N，再由两个主方向得到RA；第二种坐标证明留作独立核对。
<!-- /earth-reading-task -->

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

前面的写法已经选择弧长。若用任意正则参数t，令 $v_c=\|d\mathbf r/dt\|>0$，则 $\mathbf r_{tt}=v_c^2\mathbf r_{ss}+(dv_c/dt)\mathbf T$；第二项在切平面内，投影到曲面法线后消失。所以

$$
k_n=\frac{\mathbf r_{tt}\cdot\boldsymbol\nu}{v_c^2}
=\frac{L_2\dot u^2+2M_2\dot u\dot v+N_2\dot v^2}
{E\dot u^2+2F\dot u\dot v+G\dot v^2}
=\frac{\mathrm{II}}{\mathrm{I}}.
$$

第一基本形式 I 量切向长度平方，第二基本形式 II 量同一变化在**所选单位法线**上的有符号弯曲，因此

$$
k_n=\frac{\mathrm{II}}{\mathrm{I}}
$$

会随法线反向而整体变号。二者的比消除了参数快慢的影响；当 $t=s$ 时分母才等于 1。本文此后统一使用内法线，使凸椭球的两个主法曲率为正；若改用外法线，应同时把有符号法曲率反号，而正的几何曲率半径仍取其绝对意义。

在固定点、固定单位切向下，$u',v'$ 已经确定，曲线怎样继续走所对应的 $u'',v''$ 不影响 $k_n$。这就是不同曲线只要有同一切向，就有相同法曲率的原因。

若曲线曲率 $\kappa>0$，写 $\mathbf r''=\kappa\mathbf n_c$，$\theta$ 是主法线与所选曲面法线的夹角，则

$$
\boxed{k_n=\kappa\cos\theta}.
$$

包含曲面法线和该切向的平面称为法截面，其交线为法截线。在凸椭球上按内法线约定，法截线主法线与 $\boldsymbol\nu$ 相同，故法截线曲率就是 $k_n>0$。其他具有同一切向的曲线满足 $\kappa=k_n/\cos\theta$。这是 Meusnier 定理在这里的表达；主法线不存在或投影为零时，应使用前面的点积定义，不能无条件除以 $\cos\theta$。

## 从平行圈推导卯酉曲率半径

<!-- anatomy-G3 -->
把圆规压在同一个点上，先沿北向，再转到东向。接触得上的圆为什么需要换半径？

<AnatomyFigure src="/anatomy/earth-observation/geodesy.html?mode=curvature" title="曲率规为什么必须转一个方向？" />

仪器给出两个主方向的半径，但平行圈圆心不在法线上。下面用曲率的法向投影解释N从哪里来。
<!-- /anatomy-G3 -->

<SourceFigure src="/geodesy/figures/normal-sections.png" alt="子午法截面与卯酉法截面" source="1椭球面数学性质   课程讲义.pdf" page="41" printed="32" note="图中P是接触点，PT是子午切线，Pn是椭球法线；图内小写n标记法线延伸，不表示本文的单位向量。" />

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

在原图中，子午面含旋转轴和点P，另一法截面含Pn并与子午面正交；两面在P的切线分别对应本文北向 $\mathbf e_N$ 与东向 $\mathbf e_E$。图内的点名B与角度B须依所处位置辨认，不能把点名代入纬度公式。下面本站示意图把推导真正需要的方向单独画出。

<SourceFigure src="/geodesy/figures/local-curvature.svg" alt="Meusnier法向投影与Euler方位角" source="本站绘制" page="示意图" original />

图左只画平行圈主法线与椭球内法线所在的子午面，东向切线垂直图面；夹角是 $|B|$。图右画切平面，A从北向东量起，因此单位切向为 $\cos A\,\mathbf e_N+\sin A\,\mathbf e_E$。两幅图分别说明法向投影和切向方向，不能把两个角当成同一个角。

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
$\partial_L\mathbf e_N=-\sin B\,\mathbf e_E$。因此两个基本形式在这组参数方向都没有交叉项。更明确地，内法线下 $L_2=M$、$M_2=0$、$N_2=N\cos^2B$：第一式由 $\mathbf r_{BB}=M_B\mathbf e_N-M\mathbf e_U$ 投影得到，末式由 $\mathbf r_{LL}=N\cos B(-\cos L,-\sin L,0)$ 投影得到。将参数方向分别除以M和 $N\cos B$，变成正交单位基后，II对应的矩阵就是 $\operatorname{diag}(1/M,1/N)$。所以子午与卯酉确实是主方向，而不仅是彼此正交的两条曲线。

取 A 从北向往东向量起，Euler 公式成为

$$
\frac1{R_A}=\frac{\cos^2A}{M}+\frac{\sin^2A}{N},
\qquad
\boxed{R_A=\frac{MN}{N\cos^2A+M\sin^2A}}.
$$

由 $N/M=W^2/(1-e^2)=1+e'^2\cos^2B\ge1$ 得 $M\le R_A\le N$。A 为 0 时得到 M，为 $\pi/2$ 时得到 N；极点处 M=N，任意方向相同。

讲义还引入辅助量 $c=a^2/b$、$V=\sqrt{1+e'^2\cos^2B}$。由 $V^2=W^2/(1-e^2)$，可将同一组半径写为 $N=c/V$、$M=c/V^3$、$\sqrt{MN}=c/V^2$。这些是前述公式的代数重写，不是另外三种几何半径。

<details>
<summary>补充证明：由坐标变换和法截线方程独立得到方向曲率</summary>

### 从局部截面方程核对Euler公式 {#normal-section-coordinate-proof}

这对应原讲义文件页58–60。原页用L记大地纬度，本节统一改为B，经度仍用L。利用旋转对称性可先取接触点经度为0，任意经度的情形只需整体绕Z旋转，不改变曲率。记 $d=1-e^2$、$c_B=\cos B$、$s_B=\sin B$、$C_A=\cos A$、$S_A=\sin A$。

接触点为 $\mathbf r_0=(Nc_B,0,Nd s_B)$。局部p轴沿外法线，q轴沿北向往东偏A的切向，剩余的w轴垂直法截面；局部三维分量按(p,w,q)排列，在法截面内w=0，旋转和平移给出

$$
\begin{pmatrix}X\\Y\\Z\end{pmatrix}
=\begin{pmatrix}Nc_B\\0\\Nd s_B\end{pmatrix}
+\begin{pmatrix}c_B&-s_BC_A\\0&S_A\\s_B&c_BC_A\end{pmatrix}
\begin{pmatrix}p\\q\end{pmatrix}.
$$

两个矩阵列向量分别是外法线与所选单位切向，长度为1、点积为0。它与原课件两个旋转矩阵的乘积等价。把位置代入 $X^2+Y^2+Z^2/d=a^2$。常数项是 $N^2(c_B^2+d s_B^2)=N^2W^2=a^2$，所以抵消；一次项是

$$
2N c_B(c_Bp-s_BC_Aq)+2N s_B(s_Bp+c_BC_Aq)=2Np.
$$

二次项按p²、pq、q²合并：

$$
\begin{aligned}
Q={}&\left(c_B^2+\frac{s_B^2}{d}\right)p^2
+2s_Bc_BC_A\left(\frac1d-1\right)pq\\
&+\left(s_B^2C_A^2+S_A^2+\frac{c_B^2C_A^2}{d}\right)q^2.
\end{aligned}
$$

因为 $1/d=1+e'^2$，三个系数依次化为 $1+e'^2s_B^2$、$2e'^2s_Bc_BC_A$、$1+e'^2c_B^2C_A^2$。再把偏心率部分配成平方，截线方程就是

$$
p^2+q^2+2Np+e'^2(s_Bp+c_BC_Aq)^2=0.
$$

这一步保留了原材料的常数、一次、二次项展开逻辑，而不是预先假定Euler公式。令 $\alpha=1+e'^2s_B^2$、$\beta=e'^2s_Bc_BC_A$、$\gamma=1+e'^2c_B^2C_A^2$，写 $F(p,q)=\alpha p^2+2\beta pq+\gamma q^2+2Np=0$。

在原点 $F_p=2N\ne0$，隐函数定理允许局部写p=p(q)。对q求导并除以2，得到

$$
\alpha p p_q+\beta(qp_q+p)+\gamma q+Np_q=0.
$$

代入p=q=0得 $p_q(0)=0$，说明q轴就是切线。再求一次导数：

$$
\alpha(p_q^2+p p_{qq})+\beta(qp_{qq}+2p_q)+\gamma+Np_{qq}=0,
$$

故 $p_{qq}(0)=-\gamma/N$。局部空间曲线是 $(p(q),0,q)$，叉积曲率公式给出

$$
\kappa_A=\frac{|p_{qq}|}{(1+p_q^2)^{3/2}},\qquad
R_A=\frac{N}{\gamma}
=\frac{N}{1+e'^2\cos^2B\cos^2A}.
$$

负的 $p_{qq}$ 表明弯曲朝内，与正文选择内法线后正的法曲率一致。由 $N/M=1+e'^2\cos^2B$，独立结果可写成

$$
\frac1{R_A}=\frac{1+e'^2\cos^2B\cos^2A}{N}
=\frac{\cos^2A}{M}+\frac{\sin^2A}{N}.
$$

A=0得到M，A=π/2得到N；球面或极点极限下各向半径相同。于是坐标截线法与正文的曲率投影法在同一符号约定下闭合。

</details>

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
