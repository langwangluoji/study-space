## 2.1 从空间射线到像平面 {#derive-2-1}

本补充统一采用地面 $Z$ 向上、相机到辅助系的旋转 $R$，辅助系与物方轴平行时，$q=R^T(P-C)$。去主点后的等效像向量为 $a=(x,y,-f)^T$；这里 $f>0$ 是几何主距，等效像平面不是关于物理感光片位置的断言。$P,C,q$ 用同一种物方长度单位，$x,y,f$ 用同一种像方长度单位，二者可不同。

**从哪里开始？** 中心投影首先说像方向和物方向共线，所以存在比例数 $\mu$，使 $a=\mu q$。写开三分量，最后一行给出比例：

$$x=\mu q_x,\quad y=\mu q_y,\quad -f=\mu q_z
\quad\Longrightarrow\quad
\mu=-\frac f{q_z}.$$

将这个比例放回前两行，才得到 $x=-fq_x/q_z$、$y=-fq_y/q_z$。如果像面原点还不是像主点，应再加 $x_0,y_0$。分母为零表示方向平行于像平面，不存在有限交点，并非程序应该返回像片边缘。

反过来，给定一个像点，物点只能写成

$$P=C+\lambda Ra.$$

若像面用mm、地面用m，这里的 $\lambda$ 带m/mm的换算角色，不能随意称为无量纲。对近垂直 $R=I$、可见点在相机下方的本讲约定，$a_z=-f<0$，向场景射线取 $\lambda>0$。$\lambda$ 改变时像点仍不变，这一步直接展示了单像为什么缺少深度。

**检查：** $q=(200,100,-1000)$ m、$f=100$ mm，得 $(x,y)=(20,10)$ mm，$a$ 与 $q$ 同方向；不能把 $q_z$ 换成正的“深度”后还照留原投影负号。

*Projection eliminates the unknown distance by taking ratios.* 投影通过分量比消去了沿射线的距离；它没有额外测出这个距离。

## 2.2 比例尺、覆盖与倾斜时的局部尺度 {#derive-2-2}

**平坦正直的假设。** 取摄站 $C=(0,0,H_s)$、局部水平地面 $Z=Z_g$，$D=H_s-Z_g>0$ 为相对地面的高度，$R=I$。主点已去除，故 $x=fX/D$、$y=fY/D$。选同一水平面两点相减：

$$\Delta x=\frac fD\Delta X,\quad
\Delta y=\frac fD\Delta Y
\ \Longrightarrow\ 
l^2=(\Delta x)^2+(\Delta y)^2=\left(\frac fD\right)^2L^2.$$

因此 $s=l/L=f/D$，比例尺分母 $m=D/f$。这里 $l,L$ 要同长度单位才形成无量纲比例。若像幅宽 $w$，两端横坐标差就是 $w$，于是地面覆盖宽 $W=Dw/f=mw$；物理像元间隔 $q_p$ 同理给 $\mathrm{GSD}=Dq_p/f$。三条关系来自同一个映射，不是三个互不相关的经验式。

**为什么倾斜后不再整片同尺度？** 用一个可检查的纯倾斜例子。仍令地面相对摄站高差为 $-D$，选相机到物方旋转

$$R=\begin{bmatrix}1&0&0\\0&\cos\alpha&-\sin\alpha\\0&\sin\alpha&\cos\alpha\end{bmatrix}.$$

将 $P-C=(X,Y,-D)^T$ 乘 $R^T$，得到 $q_x=X$、$q_y=Y\cos\alpha-D\sin\alpha$、$q_z=-Y\sin\alpha-D\cos\alpha$。代回投影：

$$x=\frac{fX}{Y\sin\alpha+D\cos\alpha},\qquad
y=\frac{f(Y\cos\alpha-D\sin\alpha)}{Y\sin\alpha+D\cos\alpha}.$$

沿主纵截面 $X=0$，对地面位置求导，分子中含 $Y$ 的项抵消，留下

$$\frac{\partial y}{\partial Y}
=\frac{f\{\cos\alpha(Y\sin\alpha+D\cos\alpha)-\sin\alpha(Y\cos\alpha-D\sin\alpha)\}}
{(Y\sin\alpha+D\cos\alpha)^2}
=\frac{fD}{(Y\sin\alpha+D\cos\alpha)^2}.$$

同一位置横向小线段的尺度为 $\partial x/\partial X=f/(Y\sin\alpha+D\cos\alpha)$。两个方向未必相等，且随 $Y$ 变化。这是“局部比例尺”的具体含义：要说明在哪里、沿哪个方向，而不是用一个全片 $f/H$ 代替。以上只适于所写纯倾斜、水平地面、有限投影且同一可见侧的区域。

**检查：** $\alpha=0$ 时两个导数都退回 $f/D$；$D$ 增大，固定主距下尺度变小、覆盖变大。GSD只表示取样间距，不能从这组几何式独立推出定位精度。

*Tilt makes scale depend on both position and direction.* 倾斜使尺度同时依赖位置和方向。

## 2.3 特殊点距离为何是正切与余切 {#derive-2-3}

正文已有灭点的极限推导，这里补主点、底点、等角点与主合点的距离。**假设与单位：** 像平面到中心 $S$ 的垂距为 $f$，光轴与铅垂方向夹角为 $0<\alpha<\pi/2$，所有距离用同一种像方长度。只在主垂面截面上画图；$So$ 垂直像面，所以以 $o$ 为直角顶点。

在直角三角形 $Son$ 中，$\angle oSn=\alpha$，故 $on/So=\tan\alpha$。角平分线到像面的交点为 $c$，因此 $\angle oSc=\alpha/2$，同理 $oc/So=\tan(\alpha/2)$。水平无穷远方向与铅垂方向垂直，所以它与 $So$ 的夹角大小为 $\pi/2-\alpha$，得到

$$on=f\tan\alpha,\qquad
oc=f\tan(\alpha/2),\qquad
oi=f\tan(\pi/2-\alpha)=f\cot\alpha.$$

它们是无符号距离；坐标的正负还需主纵线正方向。特别是 $c$ 平分角而不是平分线段：$oc/on=\tan(\alpha/2)/\tan\alpha$，只有小角近似才接近 $1/2$。

**空间检查：** $\alpha\to0$ 时 $o,n,c$ 合并，而 $i$ 向无穷远移动；正直像片没有有限几何地平线。正文灭点 $v=(-fd_x/d_z,-fd_y/d_z)$ 中的方向 $d$ 必须已经在相机系；物方方向要先用 $R^T$ 变换。

*An angle bisector does not generally bisect a segment.* 等角点来自角平分线，通常不是主底距离的中点。

## 2.4 从像素变换到仿射参数的含义 {#derive-2-4}

**假设：** 这里恢复二维坐标，尚未估计相机外方位。列、行 $(c,r)$ 以pixel计，像坐标 $(x,y)$ 以mm计；同一图像至少有三个不共线、坐标已知的框标。把列行放成向量 $u$，二维仿射变换写成

$$\begin{bmatrix}x\\y\end{bmatrix}
=\underbrace{\begin{bmatrix}a_0\\b_0\end{bmatrix}}_{t}
+\underbrace{\begin{bmatrix}a_1&a_2\\b_1&b_2\end{bmatrix}}_M
\begin{bmatrix}c\\r\end{bmatrix}.$$

推导其结构可以从三步开始：先对两轴缩放 $S$，再旋转或剪切 $K$，最后平移 $t$，于是 $u\mapsto Su\mapsto KSu\mapsto t+KSu$，将乘积 $KS$ 记作 $M$ 就是六参数式。所有线性步骤可以合并，但非线性镜头畸变通常不能被这六个参数完整表达。

对每个框标，$x$行给 $[1,c,r](a_0,a_1,a_2)^T=x$，$y$行同理。三个框标组成的矩阵 $A$ 是否可逆，不只取决于有三行，还取决于点是否不共线。若所有框标都满足 $r=kc+d$，$A$的第三列就是前两列的线性组合，参数不能唯一解。更多框标则用残差检查几何一致性，而非把每点强行拟合为零。

规则数字像元转换是特例：$M=\operatorname{diag}(p_x,-p_y)$、$t=(-p_xu_0,p_yv_0)^T$，所以得到正文的 $x=p_x(u-u_0)$、$y=-p_y(v-v_0)$。负号来自行向下与像坐标向上，而非镜头把图像“弄错”。

*A coordinate conversion changes the description of an image point, not its depth.* 坐标换算只改变像点的表达，尚未恢复物点深度。

## 2.5 起伏与倾斜：把省略的几何比较展开 {#derive-2-5}

### 起伏位移中的三个地面点

正文已从 $r=fR_g/(H-h)$、$r_0=fR_g/H$ 得到像移，下面明确最后消元与错误落点。**假设：** 正直中心投影，相机距基准面 $H$，高点 $A$ 距基准面 $h$，$0\le h<H$，水平距铅垂足为 $R_g$。像距用mm或m均可，但 $f,r,r_0$ 必须同单位；地面量同单位。

$$r-r_0
=fR_g\left(\frac1{H-h}-\frac1H\right)
=\frac{fR_gh}{H(H-h)}
=\underbrace{\frac{fR_g}{H-h}}_{r}\frac hH.$$

若把真实像点的射线错误地落到基准面，错误地面半径为 $R'_g=Hr/f=HR_g/(H-h)$，故

$$\Delta_g=R'_g-R_g=\frac{R_gh}{H-h}.$$

$A_0$ 是真实物点的铅垂落点，$A'$ 是射线与错误高程面的交点，二者才有上述水平差；它们不是同一个“投影点”。像面位移和地面投影差因而不能混用数值。

### 倾斜近似式从哪个分式截断？

为补正文 $\delta_\alpha\approx-r_c^2\sin\theta\sin\alpha/f$，这里明确一种与等角点比较一致的局部构造。**只比较同一摄影中心、水平物面、主距相同的两张理想像片。** 将水平参考像面记为 $z=-f$；倾斜像面绕两像面的交线旋转，倾角为 $\alpha$。这不是直接拿两个相片的主点居中坐标相减。

在主垂面截面中，等角交点取 $c=(0,t_c,-f)$，其中 $t_c=f\tan(\alpha/2)$。交线沿 $x$ 方向，倾斜像面纵向单位向量为 $e=(0,\cos\alpha,\sin\alpha)$。倾斜面法线为 $(0,-\sin\alpha,\cos\alpha)$，其到 $S$ 的距离仍为 $f$，因为

$$t_c\sin\alpha+f\cos\alpha
=f\{1-\cos\alpha+\cos\alpha\}=f.$$

倾斜面上以 $c$ 为原点的一个像点 $(x_c,y_c)$ 在此三维辅助构造中为

$$A_i=(x_c,t_c+y_c\cos\alpha,-f+y_c\sin\alpha).$$

沿 $SA_i$ 投到水平参考面，比例 $k$ 由第三分量确定：$k(-f+y_c\sin\alpha)=-f$，所以 $k=f/(f-y_c\sin\alpha)$。再将水平参考像点也减去同一 $c$，得到

$$x_c^0=kx_c,\qquad
y_c^0=k(t_c+y_c\cos\alpha)-t_c
=ky_c\left(\cos\alpha+\frac{t_c\sin\alpha}{f}\right)=ky_c.$$

最后一个括号等于1。两个坐标都乘相同 $k$，所以两像点在展开比较后的方向相同：令 $r_c=\sqrt{x_c^2+y_c^2}$、$y_c=r_c\sin\theta$，则

$$\delta_\alpha=r_c-r_c^0
=r_c(1-k)
=-\frac{r_c^2\sin\theta\sin\alpha}{f-r_c\sin\theta\sin\alpha}.$$

在 $\varepsilon=r_c\sin\theta\sin\alpha/f$ 很小时，$1/(1-\varepsilon)=1+\varepsilon+O(\varepsilon^2)$。保留首项便得到正文近似式；下一阶是长度量 $O(r_c\varepsilon^2)$。因此“小倾角”还须结合像点距中心的范围，不能只检查角度大小。

这套构造中的 $z$ 是水平参考像面的局部辅助轴，未改变本讲物方 $Z$ 向上和 $R$ 的方向约定。限于分母正、同一有限射线交点的区域；大倾角与起伏地面应使用严密投影，而非叠加任意两种近似位移。

**检查：** $y_c=0$的等比线上 $k=1$、位移为零；$\alpha=0$时全部为零；$r_c=50$mm、$f=100$mm、$\theta=90^\circ$、$\alpha=2^\circ$，严密比较约 $-0.8880$mm，一阶约 $-0.8725$mm，差异来自所省分母项。

*Displacement is defined by a comparison, so its reference must be stated.* 位移来自比较，必须说清与哪一个位置、哪一坐标表达比较。

## 2.6 从视差差得到高差与误差敏感性 {#derive-2-6}

正文已有理想正直平行像对的 $p=fB/(H-h)$。这里的 $p=x_L-x_R>0$，两个像坐标先去各自主点，等主距，辅助轴相互平行；物点在相机下方，$D=H-h=-q_z>0$。$D$是距离大小，不是将 $Z$ 改成向下为正。

以底点与顶点为例，令 $D_b=H-h_b$、$\Delta p=p_t-p_b$。由 $fB=D_bp_b$，不需再引入一个独立像片基线：

$$\Delta h=fB\left(\frac1{p_b}-\frac1{p_t}\right)
=D_bp_b\frac{p_t-p_b}{p_bp_t}
=D_b\frac{\Delta p}{p_b+\Delta p}.$$

定义 $\epsilon=\Delta p/p_b$，就有 $\Delta h=D_b\epsilon/(1+\epsilon)$。当 $|\epsilon|\ll1$，展开为 $D_b(\epsilon-\epsilon^2+\cdots)$，一阶是 $\Delta h_{lin}=D_b\Delta p/p_b$。若 $\Delta p>0$，一阶值偏大，而且

$$\frac{\Delta h_{lin}-\Delta h}{\Delta h}=\epsilon.$$

所以正文“视差增加10%”例中，线性高差恰比该理想模型严密值大10%，不是一个无根据的经验误差估计。两种视差、基线和参考航高须属于同一几何模型。

进一步对 $h=H-fB/p$ 求导：$dh/dp=fB/p^2=D/p$。若只有小的视差随机误差且 $H,f,B$ 暂视无误差，$\sigma_h\approx(D/p)\sigma_p=D^2\sigma_p/(fB)$。距离平方放大解释了远距离深度较弱；其他参数误差、姿态误差和错误匹配未包括。

人眼正文中的 $\gamma=2\arctan[b_e/(2L)]$，小角时才是 $\gamma\approx b_e/L$。精确导数为 $d\gamma/dL=-b_e/[L^2+b_e^2/4]$；$L\gg b_e$ 时反推得到 $|dL|\approx L^2|d\gamma|/b_e$。约30角秒等生理阈值来自观测经验，不能由相似三角形自行推导。

*The same disparity error produces a larger depth error at a greater distance.* 同样的视差误差，在更远处造成更大的深度误差。

## 2.7 用区间交集推重叠，而不是猜百分比 {#derive-2-7}

**假设：** 等航高正直框幅、水平地面、同样沿航向覆盖长度 $L$、等间距直线摄影，忽略首末边界和遮挡。沿航向把三张覆盖区写成一维区间 $I_0=[0,L]$、$I_1=[B,B+L]$、$I_2=[2B,2B+L]$，长度单位为m。

两张交集的长度是右端较小值减左端较大值，若为负则取0：

$$|I_0\cap I_1|=\max(0,L-B),\qquad
o=\frac{L-B}{L}=1-\frac BL\quad(0\le B\le L).$$

三张共同部分为 $[2B,L]$，故 $|I_0\cap I_1\cap I_2|=\max(0,L-2B)=\max(0,(2o-1)L)$。一般连续 $n$ 张共同长度为 $\max(0,L-(n-1)B)$。它计算的是这些照片**共同**看见的一段，不能当作整条航线每处都被 $n$ 张覆盖的比例。

正直平坦时 $L=Hw/f$，所以

$$\frac BH=(1-o)\frac wf.$$

这里 $w,f$ 同单位，基高比无量纲。提高相邻照片的重叠而其他量不变，会减小该相邻像对的基高比；但多幅影像可选择更远摄站构成其他像对，因此不能据此宣布整个多视网络精度必然下降。

匀速地面速度 $V_g$ 下，$B=V_g\Delta t$，得到摄影间隔 $\Delta t=B/V_g$。单幅曝光持续时间 $t_e$ 不在这个公式里；它进入像移。传统60%/30%和弯曲3%、旋偏6°属于课程/规范条件，不能由这组几何式推出。

*Overlap is the intersection of footprints, not the distance between camera stations.* 重叠是地面覆盖的交集，摄站距离是决定它的一个条件。

## 2.8 核面法向量怎样变成右像上的一条线 {#derive-2-8}

**统一轴系。** 左右辅助轴与物方平行，$R_i$把相机方向转到共同辅助系，$q_1=R_1(x_1,y_1,-f_1)^T$，基线 $B=C_2-C_1$。$B$用m，像方向向量可用mm；只要不将它们直接相加，叉积作为方向构造允许这种比例表达。

给定左像点，取核面法向量 $n=B\times q_1$。右射线必须垂直于这个法向量，所以 $n^Tq_2=0$。代入 $q_2=R_2(x_2,y_2,-f_2)^T$，定义 $\ell=R_2^Tn$，就得到右像主点中心坐标中的直线：

$$n^TR_2a_2=(R_2^Tn)^Ta_2
=\ell_xx_2+\ell_yy_2-f_2\ell_z=0.$$

这也说明 $(B\times q_1)\cdot q_2=B\cdot(q_1\times q_2)=0$ 是同一个标量三重积。若 $\ell_y\ne0$，可解 $y_2=(f_2\ell_z-\ell_xx_2)/\ell_y$；分母接近零时改用另一坐标作参数，而不是除出巨大无意义数值。

**退化检查：** 左射线若与基线平行，$B\times q_1=0$，这个点处不能由它唯一确定一张核面。$R_1=R_2=I$、$B=(B_x,0,0)$、等主距时，上式退化到 $y_2=y_1$，这才是常见同行理想像对；一般原片不能先假定同行。

*The epipolar line is the intersection of a known plane with the other image plane.* 核线是一张已知平面与另一像面的交线，而不是匹配算法凭纹理猜出的路径。

## 3.1 辐射量之间的积分与单位链 {#derive-3-1}

正文已有Lambert半球积分，这里补“为什么要有投影面积与正弦”。取表面法线为极轴，球半径 $r$；极角宽 $d\theta$ 的南北弧为 $r\,d\theta$，纬圈方向的弧为 $r\sin\theta\,d\varphi$，所以球面元 $dA_s=r^2\sin\theta\,d\theta d\varphi$，除以 $r^2$ 才是

$$d\Omega=\sin\theta\,d\theta d\varphi.$$

固定真实面元 $dA$ 在射线方向的投影面积为 $dA\cos\theta$。辐亮度定义因此给 $d\Phi=L\cos\theta\,dA\,d\Omega$。若 $L$与观察方向无关，半球积分分离成

$$M=L\left(\int_0^{2\pi}d\varphi\right)
\left(\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta\right)
=L(2\pi)\left[\frac{\sin^2\theta}{2}\right]_0^{\pi/2}=\pi L.$$

$L$单位W/(m²·sr)，$M$单位W/m²；只有Lambert条件才可将 $L$ 移到积分外。若反射率 $\rho$ 的理想漫反射面满足能量收支 $M_{refl}=\rho E_{in}$，才接得 $L_{refl}=\rho E_{in}/\pi$；目标自身热辐射应另算。

波在一个周期 $T=1/\nu$ 走过一个波长，故传播速度 $v=\lambda/T=\lambda\nu$；真空取 $v=c_0$。$E_\gamma=h_P\nu=h_Pc_0/\lambda$ 是量子物理关系，不从几何光线推导。曝光内窄带能量 $Q$ 可换期望光子数 $N_\gamma=Q/E_\gamma$，波长范围很宽时须按波段积分，不能任取一种波长。

*Radiance is defined per projected area and per solid angle.* 辐亮度同时按投影面积和立体角计量，余弦与球面元分别来自这两个几何对象。

## 3.2 光学公式的补步：哪些来自几何，哪些不是 {#derive-3-2}

### 薄透镜、光圈与视场

**假设与符号：** 近轴薄透镜，光学焦距 $f_o>0$，实物距 $u>f_o$、实像距 $v>0$按各自空间的正距离量取，物高为 $h_o$，倒像的高度大小为 $h_i$。光学正距离不是直接替代摄影测量 $z=-f$ 的坐标。

穿过光学中心的近轴射线给 $h_i/h_o=v/u$；物顶发出的平行光经透镜后过像方焦点，相似三角形又给 $h_i/h_o=(v-f_o)/f_o$。两者相等：

$$\frac vu=\frac{v-f_o}{f_o}
\ \Longrightarrow\ f_ov=uv-uf_o
\ \Longrightarrow\ \frac1{f_o}=\frac1u+\frac1v.$$

其中“平行光经透镜后过焦点”的规则来自近轴折射光学，不是任意玻璃都满足的纯作图假设。折射定律本身可从最短光程的驻值条件得到：跨平面界面的路程参数为 $x$，光程 $\mathcal L=n_1\sqrt{a^2+x^2}+n_2\sqrt{b^2+(L-x)^2}$；令 $d\mathcal L/dx=0$，即 $n_1x/\sqrt{a^2+x^2}=n_2(L-x)/\sqrt{b^2+(L-x)^2}$，两边分别是 $n_1\sin i$与$n_2\sin r$。折射率与波长关系仍需材料物理或测量。

理想瞳直径 $d=f_o/N$，面积 $A_p=\pi d^2/4=\pi f_o^2/(4N^2)$。固定物方辐亮度、透过率和成像距离等条件，像面照度随有效收光立体角、进而随 $d^2$ 变化，所以常用近似 $E\propto N^{-2}$。收光量减半要求 $N_{new}/N_{old}=\sqrt2$；这是整挡光圈倍率的来源。近摄需考虑有效光圈和瞳放大率，不能无限推广远距近似。

主距 $c_p$ 与像幅边界构成直角三角形，$\tan\beta_{left}=w_{left}/c_p$、$\tan\beta_{right}=w_{right}/c_p$，因此 $\mathrm{FOV}=\arctan(w_{left}/c_p)+\arctan(w_{right}/c_p)$。只有主点居中且两边相等时才是正文 $2\arctan[w/(2c_p)]$。

### 景深推导中弥散圆的代数约分

正文已给近远界完整推导，只补最易跳过的一步。对焦距 $s$ 固定像面 $v_s=f_os/(s-f_o)$，另一物距 $u$ 的理想像距 $v_u=f_ou/(u-f_o)$，故

$$v_s-v_u
=\frac{f_o\{s(u-f_o)-u(s-f_o)\}}{(s-f_o)(u-f_o)}
=\frac{f_o^2(u-s)}{(s-f_o)(u-f_o)}.$$

取绝对值、除以 $v_u$、再乘孔径 $d=f_o/N$，中间的 $u-f_o$约掉，便得 $c(u)=f_o^2|u-s|/[Nu(s-f_o)]$。弥散圆阈值 $c_0$ 是任务选择/成像接受标准，不能从这个三角形唯一算出。

正文cos⁴分解已经完整，无须重复四次方推导。艾里斑 $2.44\lambda N_{eff}$ 中的2.44来自圆孔衍射图样第一零点，不能由近轴三角形推导；像差系数和镜头性能数字也必须来自物理设计/检校，而非几何必然值。

*A geometrical derivation still depends on an optical model and a clarity criterion.* 几何推导也依赖采用的光学模型与清晰阈值。

## 3.3 曝光、密度与噪声：把定义和统计假设分开 {#derive-3-3}

**曝光不是永远照度乘时间。** 一般应是 $H_{exp}=\int_{t_0}^{t_1}E(t)dt$；仅照度近似恒定时，才简化成 $Et_e$。辐照度用W/m²时曝光为J/m²；若照度用lx，则为lx·s，不能不经光谱加权换算就混用。

由 $D_{\log}=-\log_{10}T$，直接指数反解 $T=10^{-D_{\log}}$。H-D线性段经验模型可写 $D_{\log}=D_*+\gamma\log_{10}(H_{exp}/H_*)$，对两次曝光作差：

$$D_2-D_1=\gamma\log_{10}\frac{H_2}{H_1},\qquad
\frac{T_2}{T_1}=10^{-(D_2-D_1)}=\left(\frac{H_2}{H_1}\right)^{-\gamma}.$$

这就补足曝光增大10倍、$\gamma=0.8$时透射比乘0.1585的推论。$H_*$使对数中的量无量纲；$\gamma$和曲线趾肩形状来自胶片与冲洗条件的测量，不能从中心投影推出。

**电子数的单位链。** 窄带入射功率 $\Phi_p$（W）在曝光 $t_e$ 内贡献能量 $Q=\Phi_pt_e$（J）；每光子能量 $h_Pc_0/\lambda$，量子效率为 $\eta_Q$，期望有效信号电子数

$$n_s=\eta_Q\frac{\Phi_pt_e\lambda}{h_Pc_0}.$$

光子到达和暗电子积累若近似独立泊松过程，其方差分别等于均值 $n_s,n_d$；独立读噪声方差为 $\sigma_r^2$。独立量相加时方差相加，才得到 $\mathrm{SNR}=n_s/\sqrt{n_s+n_d+\sigma_r^2}$。暗均值可校正扣除，但随机暗电子涨落不会因扣均值而消失。泊松模型、QE与读噪声是统计/器件条件，不是三角形结论。

电荷转移若每一步保留比例 $\eta$ 且稳定，递推 $Q_{j+1}=\eta Q_j$，连续代入得 $Q_K=\eta^KQ_0$。若每步效率不同则为 $Q_K=Q_0\prod_j\eta_j$，不能仍用单一平均值而不检查条件。

*Subtracting a noise mean does not remove its random fluctuations.* 扣掉噪声均值，不等于消除随机涨落。

## 3.4 采样上限、MTF、数据量与精度 {#derive-3-4}

**理想均匀采样的假设：** 间距 $p_s$，被采信号连续且目标讨论范围内可作带限模型；频率 $\nu$ 用cycles/mm，位置用mm。连续余弦在 $x=kp_s$ 处取样：

$$\cos[2\pi(\nu+m/p_s)kp_s]
=\cos(2\pi\nu kp_s+2\pi mk)
=\cos(2\pi\nu kp_s),\quad m\in\mathbb Z.$$

不同连续频率可能产生完全相同的样值，这叫混叠。为使无混叠频带落在唯一的正负频率区间，常取 $|\nu|<1/(2p_s)$。这解释Nyquist界，但恢复定理还需要带限、足够样本等条件。恰在边界时某些相位甚至全部采到零，因此不宜把等号处当实际保证可辨线对。

对于线性、平移不变的简化成像链，若各环节的模糊核为 $h_1,h_2$，输出是 $g=h_2*(h_1*f)$。傅里叶变换把卷积变乘积，$G=H_2H_1F$，所以规范化的MTF幅值相乘。真实胶片工作区、非线性处理、空间变化模糊可能破坏这个模型；MTF不是只由像元数决定的固定常数。

**位深与数据量。** 每个bit有两种状态，$b$个独立二进制位共有 $2\times\cdots\times2=2^b$种码字。若测区面积 $A$、单覆盖地面方形采样间距 $g$，像元数近似 $n=A/g^2$。$K$波段、每样本实际分配 $b_s$ bit，原始数据量为

$$Q_{bit}\approx\frac{A}{g^2}Kb_s,\qquad Q_{byte}=Q_{bit}/8.$$

$g$减半使分母变原来1/4，因此数据量增4倍。12bit有效信号若在文件中逐样本占16bit，计算存储应取16，若紧密打包12bit则取12；压缩/文件头/金字塔/重叠另算。它不能推出定位标准差也改善两倍，因为那个结论还需要摄影几何和误差传播。

弯曲度 $100\delta/L$是定义出来的无量纲指标；3%等阈值是规范/课程条件，不存在从空间三角形推出这个阈值的步骤。

*More samples reduce the sampling interval, not every source of error.* 增加样本减小的是采样间隔，不是所有误差来源。

## 3.5 点、线与面：时间索引也是几何的一部分 {#derive-3-5}

**框幅假设：** 一次全局曝光近似同一时刻 $t_0$，全幅使用同一个 $C(t_0),R(t_0)$。每个像点的物方射线为 $P=C(t_0)+\lambda R(t_0)a$。这不是“数字相机”三个字就自动保证的条件。

**推扫假设：** 线阵沿横向取样，列号 $j$ 规定线内方向，行号 $k$ 标记获取时刻。若相邻行时间间隔稳定为 $\tau$，则 $t_k=t_0+k\tau$，相应射线应写成

$$P=C(t_k)+\lambda_kR(t_k)a(j),$$

不是把所有 $k$ 共用一组外方位。正直、平坦、匀速沿航向移动时，相邻行地面间距近似 $g_{along}=V_g\tau$；若想与横向 $g_{cross}=Hp_s/f$相等，可设计 $\tau\approx Hp_s/(fV_g)$。实际扫描/地形/姿态变化时要用相应时间模型，不能以这条简式替代严密定位。

**全景为何是角度乘焦距？** 理想圆柱记录面半径为 $f$，旋转角 $\theta$ 对应弧长 $s=f\theta$；将圆柱展开，横坐标为弧长。若换成平面像面，射线与平面的直角三角形给 $x=f\tan\theta$。因为 $\tan\theta=\theta+\theta^3/3+\cdots$，两种横坐标只在小角时相近。此处弧度是必要条件：不能直接将60这样的角度数乘 $f$。

点扫描还把线内像素与各自获取时刻联系起来，平台在扫描期间运动会影响同一行几何。多镜头虚拟框幅则依赖子相机相对几何与校正；是否能输出等效单中心模型要由系统建模/检验确定，不能由“已拼成矩形”推出。

*A row index can represent a different exposure time, not merely a different image position.* 行号有时同时编码获取时间，而不只是图上的位置。

## 3.6 从时间导数推像移与补偿残差 {#derive-3-6}

**假设：** 正直相机沿 $+X$匀速移动、地面水平且静止、相对航高 $H$不变、主距 $f$固定、无角运动。物点 $X_P$固定，摄影中心 $X_C(t)=X_C(0)+V_gt$，所以

$$x(t)=\frac fH\{X_P-X_C(t)\},\qquad
\frac{dx}{dt}=-\frac fH V_g.$$

负号表示本讲像坐标中地物像朝 $-x$ 移动；正文 $v_{image}=fV_g/H$只取速度大小。曝光持续时间 $t_e$ 内像轨迹长度为

$$b_{motion}=\left|\int_{t_0}^{t_0+t_e}\frac{dx}{dt}dt\right|
=\frac{fV_gt_e}{H},\qquad
n_{blur}=\frac{b_{motion}}{p_s}=\frac{V_gt_e}{\mathrm{GSD}}.$$

$f,H$应先同单位；输出像移与物理像元 $p_s$同单位才能化为像元数。若成像补偿以本像坐标速度 $v_c$跟随影像，残余轨迹应对**相对速度**积分：$b_{res}=|\int(\dot x-v_c)dt|$，匀速时为 $|\dot x-v_c|t_e$。补偿方向必须匹配，写出带符号式后才不会越补越糊。

若速度在曝光内变化，净位移可能相消而轨迹仍模糊，例如往复振动；这时应考虑轨迹分布或长度，不能仅取首末差当完整模糊描述。倾斜、起伏和角速度还会使不同像点速度不同。

**检查：** $f=152$mm、$H=500000$mm、$V_g=83333.333$mm/s，像速大小25.3333mm/s；曝光1/500s约50.6667μm，10μm像元约5.0667个。曝光间隔 $B/V_g$与这里的 $t_e$是不同的时间。

*Motion compensation must follow image velocity, including its direction.* 像移补偿要跟随像速度，方向也属于条件。

## 3.7 相机构造节能推什么，不能推什么 {#derive-3-7}

物镜、片盒、框标和摄影座的结构与尺寸是仪器设计事实，不存在把这些名称从几何公式证明出来的过程。本节应将每个部件连接到它维护的关系：像面平整支持固定 $z=-f$，框标支持二维坐标恢复，稳定座支持曝光内几何近似不变；框标本身不提供地面绝对坐标。

**快门时序的可推关系。** 若逐行曝光起始时刻为 $t(r)=t_0+r\tau_r$，行号差 $\Delta r$对应时间差 $\Delta t=\tau_r\Delta r$。平台匀速近似下，两行对应摄站差为 $\Delta C\approx V\tau_r\Delta r$；若有角速度，姿态也相差约 $\Delta\theta\approx\omega\tau_r\Delta r$。$\tau_r$单位s/行，$V$为m/s，$\omega$为rad/s。这说明逐行曝光为什么可能破坏整幅单瞬时模型。

全局快门缩小的是行间起始时刻差，不保证曝光持续时间为零，故仍需检查3.6的运动模糊。胶片焦平面狭缝与数字卷帘也不能只按名称说成完全同一物理器件；可比较的是时序造成的模型影响。

摄影间隔 $\Delta t=B/V_g$直接来自 $B=\int V_gdt$的匀速特例；主距稳定、像面平整误差阈值和相机具体性能要靠设计与检校，不从这条运动式推出。

*Hardware makes a geometrical approximation usable; it does not make it exact.* 硬件使几何近似可用，并不把近似变成严格事实。

## 3.8 检校模型与可辨识性：不能给经验系数编造几何证明 {#derive-3-8}

正文已列Brown型模型。它是按对称性和实际镜头误差选取的参数化近似，$k_i,p_i$需通过数据估计，不能仅由 $f$算出。设 $r$为相对畸变中心半径，径向方向单位向量为 $(x/r,y/r)$。若径向**位移大小**为 $\Delta r=k_1r^3+k_2r^5+\cdots$，分解到坐标轴才得到

$$\Delta x=\frac xr\Delta r=x(k_1r^2+k_2r^4+\cdots),\qquad
\Delta y=\frac yr\Delta r.$$

所以径向大小为奇次、坐标括号为偶次不是矛盾。$r=0$处按连续极限取零。用mm坐标时 $k_1$应为mm$^{-2}$，使 $xk_1r^2$仍为mm；改单位而不换系数会直接改变预测量。

若定义测得坐标 $z_d=z_u+\Delta(z_u)$，去畸变需解 $F(z_u)=z_u+\Delta(z_u)-z_d=0$。Newton一步为

$$z_u^{(j+1)}=z_u^{(j)}-
\{I+J_\Delta(z_u^{(j)})\}^{-1}F(z_u^{(j)}).$$

简单近似 $z_u\approx z_d-\Delta(z_d)$只在畸变变化足够小等条件下近似，不能把“减一次”称为任何情形精确逆解。

**为什么平坦正直单片难分焦距和航高？** 映射 $x=fX/H$只依赖比值 $f/H$。若 $f'=kf,H'=kH$，则 $f'X/H'=fX/H$，无论有多少同一平面的像点都不破坏这个等价关系。这是参数相关/不可辨识的具体例子，不是解算器不够聪明。适当的非共面目标、多视角和外部约束用来破除它；“多拍几张相似照片”不自动保证独立信息增加。

*Calibration parameters are inferred from observations, not derived from the camera name.* 检校参数由观测推定，不从相机型号名直接推出来。

## 3.9 主动往返测距及斜距到水平距离 {#derive-3-9}

**假设：** 单站发射接收，传播路径近似往返同一路，目标在往返期间近似静止，仪器时延已校正；传播速度 $v$为所用介质中的有效速度，真空近似 $c_0$。发射到接收的时间为 $\Delta t$，因此走过总路程 $2R$：

$$v\Delta t=R_{out}+R_{back}\approx2R
\quad\Longrightarrow\quad R=\frac{v\Delta t}{2}.$$

$v$为m/s、$\Delta t$为s，输出m。约 $2\,\mu$s往返时延在 $c_0=299792458$m/s下给 $R=299.792458$m。大气折射、硬件延迟、目标运动等需相应改正，这个例子不保证实际仪器同等准确。

若仅有时间小误差，$\sigma_R\approx(v/2)\sigma_t$；若速度也有独立小误差，可加 $(\Delta t/2)^2\sigma_v^2$到距离方差，相关误差则不能直接独立相加。

在平地二维截面、传感器高 $H$、侧向水平距离 $X$时，直角三角形给 $R^2=H^2+X^2$，所以 $X=\sqrt{R^2-H^2}$，并有 $dX/dR=R/X$。近星下点 $X\to0$时，用斜距反求水平距离的敏感性变大。直接把 $R$当 $X$会系统错位；有地形时还需目标高程。雷达方位定位、合成孔径处理和相位测量不是这条单次往返式的全部内容。

*Time of flight measures path length; ground position also needs direction and height.* 飞行时间给路径长度，地面位置还需要方向和高程。

## 3.10 平台选择怎样连接覆盖、时间与几何 {#derive-3-10}

本节设备载荷、续航、姿态稳定和卫星具体参数来自设计/测量，不能从基础摄影几何唯一算出。可推导的是在明确简化条件下，它们怎样影响采集。

**正直平坦、定主距与像元时：** 由2.2有 $\mathrm{GSD}=Hq_p/f$。要求目标GSD $g$，先重排为 $H=fg/q_p$。若 $f=24$mm、$q_p=0.0064$mm、$g=0.2$m，结果是750m；不能把m/mm混在乘除中去解释教材疑似排印值。该航高只满足取样设计，不保证飞行可行、像质和定位精度达标。

矩形传感器为 $n_x\times n_y$，像元 $q_p$，覆盖 $L_x=n_xg,L_y=n_yg$。若航向重叠为 $o_f$、旁向为 $o_s$，理想规则无限内区每张新增地面面积约为

$$A_{new}\approx L_x(1-o_f)L_y(1-o_s).$$

测区远大于像幅且边界冗余相对小，照片数量才可粗估 $N\approx A/A_{new}$。真实区块要加边界、转弯、地形、补飞和多视需求，不能简单向下取整。此式描述相机覆盖规划，不是载荷性能的经验拟合。

**沿轨与跨轨的时间作用。** 对地物以速度 $v_o$移动、两视观测相隔 $\Delta t$，简单匀速位移为 $\Delta X_o=v_o\Delta t$。若仍按“同一静止点”交会，会把变化与视差混在一起；几何上有立体覆盖，不代表动态对象满足静态假设。沿轨常减小观测时差，但不能消除遮挡、角度差或所有运动。

轨道回归周期、可侧视重访间隔、实际无云可用频率也不是同一量。这里只解释关系，不用一个圆周周期公式替代完整地球自转、轨道、指向与任务安排问题；具体卫星复访/定位指标须按型号与时态查证。

*A platform determines when and where observations are possible; the sensor model determines how they map to space.* 平台决定何时何地能观测，传感器模型决定记录怎样对应空间。
