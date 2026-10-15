本片段配合[第5讲](./photogrammetry-en-05.md)阅读：补出公式中容易跳过的几何与线性代数步骤，不把原有完整推导重新抄一遍。统一约定：$R$将相机向量送到与物方轴平行的辅助系统；以主点为原点的理想像向量为$a=(x,y,-f)^T$；物点$P$、摄心$C$用米，像坐标与主距常用毫米；角增量用弧度；残差$v=g(\theta)-z$为预测减观测，$J=\partial g/\partial\theta$始终指预测导数。下列标作“教学展开”的推导由本站编写；经验模型保留出处和适用条件。

## 5.1 同一条射线，为什么产生不同求解问题？ {#derive-5-1}

**假设与空间对象。** 先忽略畸变、折光等已另行处理的影响，令$\Delta=P-C$，$q=R^T\Delta$。相机中的点方向和像向量共线，因此有$q=\lambda a$。写成三分量，$q_x=\lambda x$、$q_y=\lambda y$、$q_z=-\lambda f$，前两式除以第三式，消去未知距离比例$\lambda$：

$$x=-f\frac{q_x}{q_z},\qquad y=-f\frac{q_y}{q_z}.$$

为何只剩两式？三维方向中长度本来不是独立成像信息。将$\Delta$扩大任意正倍数，$q$同倍变化，两个比值不变。一个像点因而只给两个方向约束，不能独自确定沿射线的距离。保持$P$已知而改变$C,R$，就是后方交会；保持$C,R$已知而改变$P$，就是前方交会；把两者都作为未知便进入光束法。

**从几何到本轮改正。** 观测为$z$，近似预测为$g_0$，令$l=z-g_0$。对小增量$\delta$：

$$g(\theta_0+\delta)=g_0+J\delta+O(\|\delta\|^2),\qquad
v\approx J\delta-l.$$

对$\Phi=\tfrac12v^TWv$求导，因$W$对称，得到$\partial\Phi/\partial\delta=J^TW(J\delta-l)$；令零即$J^TWJ\delta=J^TWl$。式中$v$、$l$同单位，$J$每列单位由对应参数决定。若程序用观测减预测残差，导数要整体改号，不能只改常数项。

**复算检查。** $R=I$、$C=(0,0,1000)$米、$P=(100,50,0)$米、$f=100$毫米时，像点为$(10,5)$毫米；将$P-C$扩大两倍，预测仍为$(10,5)$。这是深度歧义的一个明确数值证据。*A projection preserves direction while losing distance along the ray.*

[对应主文与坐标约定](./photogrammetry-en-05.md#e5-1)

## 5.2 改正链、曲率近似与经验系数的边界 {#derive-5-2}

**先分理论关系与经验模型。** 扫描尺度、平面坐标转换和圆几何近似可以推导；ARDC1959折光系数来自特定标准大气模型，不能假装仅由共线方程就能推出它的数值常数。主文的折光经验式应保留$H,h$以千米输入、结果以微弧度输出的条件。

若量测坐标$(u,v)$来自扫描器，而理想框标坐标用毫米，二维仿射可写

$$x=b_0+b_1u+b_2v,\qquad y=c_0+c_1u+c_2v.$$

常数项处理原点，四个线性系数共同描述尺度、转轴和非正交。一个框标提供两式，三个位形不共线的框标满足六参数最低计数；多点才有冗余。若框标量错，最低点数恰好拟合仍可能零残差。之后还要将主点移到原点，不能把“仿射内定向”和“相机参数检校”混成同一未知集合。

**为什么球面改正出现距离平方？** 在半径$R_E$的球面局部，距切点水平距离$D$处相对切平面的下沉量为

$$s=R_E-\sqrt{R_E^2-D^2}
=R_E\left(1-\sqrt{1-\frac{D^2}{R_E^2}}\right)
\approx\frac{D^2}{2R_E},\quad D\ll R_E.$$

所以$Z_{TP}\approx Z_{SL}-D^2/(2R_E)$。若近垂直摄影还采用$r\approx fD/H$，小高差造成的像面径向变化大小约为$|\delta r|\approx(r/H)s$。连续代入，而不是跳到结果：

$$|\delta r|\approx\frac rH\frac{D^2}{2R_E}
\approx\frac rH\frac{H^2r^2}{2R_Ef^2}
=\frac{r^3H}{2f^2R_E}.$$

$r,f$同为像面单位，$H,R_E$同为物方单位，结果与$r$同单位。这仅说明式5-3的量级和近似来源；改正方向仍依原书采用的曲面—平面比较，不能把“下沉”的符号直接当成像坐标加减号。若严密三维地球模型已考虑曲率，不再机械叠加此项。

**折光公式中可推导的部分。** 若特定角定义给出$r=f\tan\alpha$，小角改变量$\delta\alpha$导致

$$\delta r\approx f\sec^2\alpha\,\delta\alpha.$$

例如$f=100$毫米、$\alpha=30^\circ$、$\delta\alpha=10$微弧度，先换成$10^{-5}$弧度，得$\delta r\approx0.001333$毫米。这个微分不负责产生大气模型的$K$，只把已知角改变量转换为像面改变量。*A physical approximation may explain the form of a correction without determining its empirical coefficients.*

[原书六类精化及经验式](./photogrammetry-en-05.md#e5-2)

## 5.3 后方交会：从三维方向变化读懂六列导数 {#derive-5-3}

主文已列王书欧拉角的完整矩阵导数，这里补一条能看出空间意义的链式推导。令去掉主点常数的投影为$\pi(q)$，由商函数得到

$$D_\pi=\frac{\partial\pi}{\partial q}=
\begin{bmatrix}
-f/q_z&0&fq_x/q_z^2\\
0&-f/q_z&fq_y/q_z^2
\end{bmatrix}.$$

它把三维方向的小改动变为两个像坐标改动。直接相乘可验$D_\pi q=0$：沿原射线伸缩不动像点，这正是上一节的深度歧义，不是导数漏算。

摄心改动$\delta C$时，$\delta q=-R^T\delta C$，所以$J_C=-D_\pi R^T$。为了明确角增量的坐标系，本段采用**物方轴表达的左乘小旋转**，$R_{\rm new}\approx(I+[\delta\eta]_\times)R$，其中$[b]_\times c=b\times c$。于是

$$R_{\rm new}^T\Delta\approx
R^T(I-[\delta\eta]_\times)\Delta
=q+R^T[\Delta]_\times\delta\eta.$$

因此姿态预测导数为$J_\eta=D_\pi R^T[\Delta]_\times$。注意正号来自$-\delta\eta\times\Delta=\Delta\times\delta\eta$。这个三列块对应本段定义的小旋转向量，不能直接冒充主文$\varphi,\omega,\kappa$欧拉角的三列；使用后者时仍按各自转序链式求导。

**复算。** 上一节例子中$\partial x/\partial C_X=-0.1$毫米/米，$\partial x/\partial C_Z=-0.01$毫米/米。将$C_Z$增加1米，严密$x=10000/1001\approx9.99000999$毫米，线性式给9.99毫米，差为约$10^{-5}$毫米。小步长可用来验符号，大范围变化则必须重新线性化。*A camera translation changes a ray differently from a camera rotation.*

[完整欧拉角导数及算例](./photogrammetry-en-05.md#w5-s52-jacobian)

## 5.4 单射线反投影：分母为何反映交会稳定性？ {#derive-5-4}

**假设。** 相机内外方位已知，先将$a=(x,y,-f)$通过$R$转到物方，归一化得单位方向$d=Ra/\|a\|$。射线$P(s)=C+sd$中$s$单位为米、$d$无量纲。给定平面$n^TP+b=0$，$n$取无量纲法向、$b$取米，代入即

$$n^TC+s\,n^Td+b=0,\qquad
s=-\frac{n^TC+b}{n^Td}.$$

$n^Td$是射线在平面法向上的分量；接近零意味着射线几乎贴着平面走。很小的平面位置误差便能引起很大的沿线交点变化。它不是无意义的代数分母，而是交会角的表达。

对已知高程$Z_0$，$n=(0,0,1)^T$、$b=-Z_0$，所以

$$s=\frac{Z_0-C_Z}{d_Z},\quad
X=C_X+\frac{d_X}{d_Z}(Z_0-C_Z),\quad
Y=C_Y+\frac{d_Y}{d_Z}(Z_0-C_Z).$$

若高程误差为$\delta Z$，一阶水平误差为$\delta X=(d_X/d_Z)\delta Z$、$\delta Y=(d_Y/d_Z)\delta Z$。近天底方向水平分量小，高程误差的平面传递小；大倾斜方向传递更显著。

**DEM不是一个固定水平面。** 令$F(s)=P_Z(s)-Z_{\rm DEM}(P_X(s),P_Y(s))$，在DEM可微且局部光滑时：

$$F'(s)=d_Z-Z_Xd_X-Z_Yd_Y,\qquad
s_{k+1}=s_k-\frac{F(s_k)}{F'(s_k)}.$$

这是局部Newton步的教学展开，不保证任意地形收敛。$F'$接近零意味着射线与表面近切；多个交点、离散网格和遮挡要求搜索第一个可见交点并检查覆盖，不能让Newton迭代跳到山后。

**复算。** $C=(0,0,1000)$米，$d=(0.1,0,-1)/\sqrt{1.01}$，给$Z_0=0$米得$X=100$米；若面高改成10米，交点变成$X=99$米。*Surface height uncertainty becomes horizontal uncertainty along an oblique ray.*

[射线与DEM及山背反例](./photogrammetry-en-05.md#e5-4)

## 5.5 前方交会：两条有噪射线怎样“找交点”？ {#derive-5-5}

对两摄站$C_1,C_2$和物方单位方向$u,v$，设两条射线上的点为$Q_1=C_1+su$、$Q_2=C_2+tv$，$B=C_2-C_1$。理想同名射线满足$su-tv=B$；含噪时可先求最短连线，最小化$\|su-tv-B\|^2$。对$s,t$分别求导：

$$u^T(su-tv-B)=0,\qquad
-v^T(su-tv-B)=0.$$

令$c=u^Tv$、$d=u^TB$、$e=v^TB$，利用单位长度，便得到

$$
\begin{bmatrix}1&-c\\-c&1\end{bmatrix}
\begin{bmatrix}s\\t\end{bmatrix}
=\begin{bmatrix}d\\-e\end{bmatrix},
\quad
s=\frac{d-ce}{1-c^2},\quad t=\frac{cd-e}{1-c^2}.
$$

分母$1-c^2=\sin^2\beta$，$\beta$为两射线方向的夹角。射线接近平行或反平行时，微小方向误差会放大成很大深度误差。求出$Q_1,Q_2$后可用中点$P=(Q_1+Q_2)/2$作几何初值，并用连线长度检查不闭合；还需检查$s,t$是否位于有效观察方向。

<SourceFigure src="/photogrammetry/figures/derivation-5-rays.svg" alt="两条有噪射线上的最近点及中点，旁图说明近乎平行导致深度不稳定" source="原创几何示意" page="第5讲推导" :original="true" note="示意并非按比例；真正的异面射线需在三维中理解，浅交会对方向误差更敏感。" />

**复算。** $C_1=(0,0,10)$、$C_2=(2,0,10)$米，$u=(1,0,-10)/\sqrt{101}$、$v=(-1,0,-10)/\sqrt{101}$。代入得$s=t=\sqrt{101}$米，两射线同到$(1,0,0)$米，最短连线长为零。

**为什么还要像面最小二乘？** 最短射线距离是在物方定义目标，不自动等价于按像点测量协方差最小化重投影误差。严密像面估计应将$g_i(P)=\pi(R_i^T(P-C_i))$堆叠，用$J_{P,i}=D_{\pi,i}R_i^T$求本轮物点改正。两像给四个标量观测、三个点坐标；满秩才有一个残差自由度。*The closest-ray midpoint is a geometric estimate, not automatically the maximum-likelihood image-space estimate.*

[王书比例系数解及其闭合算例](./photogrammetry-en-05.md#e5-5)

## 5.6 相对定向：五个参数怎样进入一条共面式？ {#derive-5-6}

采用连续像对：左片为坐标基准，基线$B=(b,b_y,b_z)^T$，先固定$b>0$以选定模型尺度。把左右像向量归一化后记$u=a_1/\|a_1\|$、$v=R_2a_2/\|a_2\|$，都在同一辅助系。一个同名点的**共面预测量**为

$$F=B^T(u\times v).$$

它是基线、左方向、右方向的混合积，零值表示三者共面。因为$u,v$无量纲、$B$为米，$F$为米。这里的目标观测是0，因此残差就是$F$，不是像素上下差数值本身。

位置两列直接来自

$$F_{,b_y}=e_Y^T(u\times v),\qquad
F_{,b_z}=e_Z^T(u\times v).$$

右片采用共同辅助轴下的左乘小旋转$\delta\eta$，则$\delta v=\delta\eta\times v$。将它代入，利用向量三重积：

$$\delta F=B^T\{u\times(\delta\eta\times v)\}
=\{(u^Tv)B-(B^Tv)u\}^T\delta\eta.$$

因此一条共面关系有明确的五列导数

$$J_F=\left[
e_Y^T(u\times v),\
e_Z^T(u\times v),\
\{(u^Tv)B-(B^Tv)u\}^T
\right].$$

前两列对米级基线侧分量求导，后三列对弧度角增量求导。本轮$F_0+J_F\delta\approx0$，所以$l=-F_0$、$J_F\delta\approx l$，与统一预测减观测约定相容。这是小旋转向量形式；王书五个欧拉元素的展开需再按其角序换基，不能逐列不加转换地替代。

为何基线主分量不作为第六个相对参数？将$B$及全部模型点距离统一乘同一尺度，射线方向不变，共面零值也不变。因此影像内部不识别绝对尺度。五个同名点只是最低独立条件计数，点位退化、多解和噪声仍可能存在；对归一化共面量给权也应传播像点误差，不宜不经说明便视为与像坐标BA同一目标。

**复算。** 理想双像的$B$和两方向在$XZ$面，$u\times v$沿$Y$轴，故$F=0$；在同一几何中给$b_y$一个小变化，$F$通常立即非零，正体现横向错位引入上下不闭合。*Relative orientation restores the ray relationship while leaving the overall scale free.*

[连续/单独像对和共面不闭合主文](./photogrammetry-en-05.md#e5-6)

## 5.7 七参数定向：重心化、尺度和旋转的不同角色 {#derive-5-7}

假设完整三维对应点、每点采用一个各向同性标量权$w_j>0$，模型到地面映射为$P_{gj}=t+\lambda R_aP_{mj}$。定义加权重心$\bar P=\sum w_jP_j/\sum w_j$。对$t$求导令零，得到

$$\sum_jw_j(t+\lambda R_aP_{mj}-P_{gj})=0
\quad\Rightarrow\quad t=\bar P_g-\lambda R_a\bar P_m.$$

减去重心后，$\tilde P_{gj}\approx\lambda R_a\tilde P_{mj}$，平移不再进入中心化关系。固定某个旋转，令$q_j=R_a\tilde P_{mj}$、$p_j=\tilde P_{gj}$，最小化$\sum w_j\|\lambda q_j-p_j\|^2$。对$\lambda$求导：

$$\sum_jw_jq_j^T(\lambda q_j-p_j)=0
\quad\Rightarrow\quad
\lambda=\frac{\sum_jw_jp_j^Tq_j}{\sum_jw_jq_j^Tq_j}.$$

这说明尺度不是把三个坐标轴分别伸缩；它是使全部中心化点共同拟合的一个长度比。分母很小意味着模型点过于聚集，尺度本身不稳。若点只有部分坐标或各向异性矩阵权，上述简洁重心/尺度式需重新推导，不能无条件套用。

再看局部七列。用对数尺度增量$\delta\sigma$，$\lambda_{\rm new}\approx\lambda(1+\delta\sigma)$，并令$R_{\rm new}\approx(I+[\delta\eta]_\times)R_a$，单点预测微分为

$$\delta g=\delta t+\lambda R_aP_m\,\delta\sigma
-\lambda[R_aP_m]_\times\delta\eta.$$

于是$J=[I,\ \lambda R_aP_m,\ -\lambda[R_aP_m]_\times]$。平移列单位是米/米，尺度列和角度列为米及米/弧度；点距坐标原点越远，旋转产生的位移通常越大，正说明重心化有助于分离平移与旋转作用。

**复算。** 对任意两点，$g_i-g_j=\lambda R_a(P_{mi}-P_{mj})$，所以$\|g_i-g_j\|=|\lambda|\|P_{mi}-P_{mj}\|$；若采用正尺度且纯旋转，全部距离比应一致。*Translation places the centroid; rotation aligns directions; one scale changes all lengths together.*

[主文七参数、控制条件与数值例](./photogrammetry-en-05.md#e5-7)

## 5.8 区域网：一个像点为什么只连接一台相机和一个物点？ {#derive-5-8}

对影像$i$上的点$j$，$\Delta_{ij}=P_j-C_i$、$q_{ij}=R_i^T\Delta_{ij}$，预测为$g_{ij}=\pi(q_{ij})$。沿用5.3的小旋转定义，一次二维观测的基本雅可比为

$$J_{ij}=
\left[\underbrace{-D_\pi R_i^T}_{C_i\ {\rm 三列}},\
\underbrace{D_\pi R_i^T[\Delta_{ij}]_\times}_{\eta_i\ {\rm 三列}},\
\underbrace{D_\pi R_i^T}_{P_j\ {\rm 三列}}\right].$$

它是$2\times9$的局部块；嵌入整个区域网时，对其他相机和物点的列都是零。若$\Sigma_{ij}$是这两个像坐标的协方差，取相应权$W_{ij}$，只需累加

$$N\mathrel{+}=J_{ij}^TW_{ij}J_{ij},\qquad
b\mathrel{+}=J_{ij}^TW_{ij}(z_{ij}-g_{ij,0}).$$

这两行来自对同一个加权平方目标逐观测求和，而非另造一种近似。只在不同观测组的协方差可按该块独立处理时，才能这么分开加权；共享系统误差或跨观测相关需要相应扩展。

<SourceFigure src="/photogrammetry/figures/derivation-5-block.svg" alt="一个二维像点观测的两行雅可比只连接本相机位置姿态和本物点，其他列为零" source="原创矩阵结构示意" page="第5讲推导" :original="true" note="2×9只是局部块；整网列数由全部相机、物点和附加参数决定。" />

**两种旧方法也要按数据层推导。** 航带多项式若写$d_k=\sum_l\Phi_{kl}\beta_l+\epsilon_k$，对$\beta$求导便得$\Phi^TW\Phi\beta=\Phi^TWd$；高次项增加了可拟合形状，也增加参数相关与外推风险。独立模型法用$P=t+\lambda R_mm$，若$m$是有误差的模型坐标，固定变换参数时微分$\delta P=\lambda R_m\delta m$，所以$\Sigma_P=\lambda^2R_m\Sigma_mR_m^T$。因此模型坐标不能未经说明便视为三方向同精度、互不相关的“真值”。

**空间检查。** 把同一物点在相邻影像中的出现连接起来，才会将相机块联系到同一个网；互不连接的两个子网各自保留基准自由度。增加重复量测数量不能自动代替跨区域连接。*A measurement links only the unknowns that appear in its prediction.*

[航带、独立模型和光束法的来源比较](./photogrammetry-en-05.md#e5-8)

## 5.9 自检校：为什么增加参数可能使问题更难解？ {#derive-5-9}

先构造一个能严格看出退化的特例：垂直相机、所有控制点在同一已知水平面，主点已知，平面摄心位置暂视为固定，预测$x=f(X-C_X)/H$、$y=f(Y-C_Y)/H$。对主距与相对航高分别求导：

$$\frac{\partial x}{\partial f}=\frac xf,\qquad
\frac{\partial x}{\partial H}=-\frac xH
=-\frac fH\frac{\partial x}{\partial f},$$

$y$也满足相同比例。因此把全部点堆起来后，$J_H=-(f/H)J_f$：两列线性相关，无法在这个几何中独立区分$f$与$H$。从非线性原式也可验，把两者都乘相同正数，像点完全不变。这是具体不可观测方向，不只是含糊地说“参数可能相关”。加入适当的已知高程变化、不同视角、可靠航高或独立主距检校才可能提供分离信息，效果依实际网形而定。

畸变参数也要说明模型作用位置。若理想中心像坐标为$x,y$，$r^2=x^2+y^2$，只演示一个径向项$\Delta x=k_1xr^2$，则$\partial g_x/\partial k_1=xr^2$。以毫米坐标计算时$k_1$单位为$\mathrm{mm}^{-2}$，这一导数单位为$\mathrm{mm}^3$；若改用归一化坐标，系数数值与单位一并改变。已把同一畸变模型改正到观测中，就不能再不加说明地重复作用于预测。

**经验附加基函数不能冒充物理定律。** 可以从采用的参数化直接求导，但参数模型本身须有检校或误差形态依据。新增列是否与原有列几乎重合，应结合相关性、独立检验和几何解释判断。*More parameters can describe more effects, but they do not create new observations.*

[主文自检校与约束](./photogrammetry-en-05.md#e5-9)

## 5.10 导航观测：杆臂、安装角和时间怎样进入同一预测？ {#derive-5-10}

令$\ell$为从摄影中心指向GNSS天线、**用相机轴表达**的固定杆臂；辅助轴平行物方时，$R$可直接将相机向量转到物方。天线与摄心均处同一物方框架。刚体几何给出

$$g_A=C+R\ell,\qquad v_A=g_A-A^{obs}.$$

摄心平移贡献$\delta C$，杆臂改正贡献$R\delta\ell$；对物方轴表达的左乘小旋转，

$$\delta(R\ell)=[\delta\eta]_\times R\ell
=-[R\ell]_\times\delta\eta,$$

所以位置观测的预测导数块为$[I,\ -[R\ell]_\times,\ R]$，分别对应摄心、姿态和杆臂。姿态观测与位置观测并非同一个东西，但只要杆臂非零，姿态会影响天线位置预测。若$\ell$用机体系表达，必须先按安装旋转转换，不能直接放进这个相机杆臂公式。

安装旋转可按箭头核对：$R_{\text{camera}\to\text{ground}}=
R_{\text{body}\to\text{ground}}R_{\text{camera}\to\text{body}}$。右侧先从相机到机体，再到地面；若拿到的是反方向安装角，须取逆/转置，不可仅按字母外观相乘。

**时间偏差不是另一根固定杆臂。** 定义待估$\tau$为模型评价时刻$t+\tau$的偏移，则

$$g_A(t+\tau)\approx g_A(t)+
\left[\dot C(t)+\omega_g(t)\times R(t)\ell\right]\tau.$$

$\omega_g$为物方轴角速度，弧度/秒；方括号单位米/秒，乘秒得到米。若把时间误差定义在观测时刻的另一侧，符号应按重新写出的预测关系确定。只用匀速平移$V=50$米/秒、忽略转动，1毫秒偏移即约0.05米位置差；转弯时还会出现旋转杆臂速度项，不能一律用$V\tau$替代。

**可检验的闭合。** $\ell=0$时姿态对天线位置的直接导数应为零；静止无转动时上述时间导数为零。两个极限都成立，才说明没有凭空把角和时间塞进位置观测。*Timing errors move the observation along a trajectory; lever-arm errors act through a rigid-body offset.*

[主文GPS/POS、杆臂与安装方向](./photogrammetry-en-05.md#e5-10)

## 5.11 消元以后，点精度为什么不能把相机当成准确已知？ {#derive-5-11}

已有主文完整推导Schur求解，这里补**同一模型的统计传播**。设已有效处理基准、线性化满秩、相对权模型正确，正规矩阵分为

$$N=\begin{bmatrix}N_{cc}&N_{cp}\\N_{pc}&N_{pp}\end{bmatrix},\qquad
S=N_{cc}-N_{cp}N_{pp}^{-1}N_{pc}.$$

可通过直接相乘验证以下分解：

$$N=
\begin{bmatrix}I&N_{cp}N_{pp}^{-1}\\0&I\end{bmatrix}
\begin{bmatrix}S&0\\0&N_{pp}\end{bmatrix}
\begin{bmatrix}I&0\\N_{pp}^{-1}N_{pc}&I\end{bmatrix}.$$

逐因子取逆并取右下块，得到点参数的**边缘协因数 / marginal cofactor**：

$$Q_{pp}=N_{pp}^{-1}
+N_{pp}^{-1}N_{pc}S^{-1}N_{cp}N_{pp}^{-1}.$$

第一项是把相机固定后得到的条件部分；第二项保留相机不确定性与耦合传播。因而“先求出相机再回代点”是代数顺序，不能解释成相机真的没有误差。若$W$为相对权，$\Sigma_{pp}=\sigma_0^2Q_{pp}$；若$W$直接是物理观测协方差的逆，应采用相容的方差因子约定，不重复缩放。

**复算。** 最小标量结构$N=\left[\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right]$中，$S=3/2$，$N_{pp}^{-1}=1/2$；新增耦合项为$(1/2)(2/3)(1/2)=1/6$，所以$Q_{pp}=2/3$，正好等于完整逆的右下项。错误地把相机当固定会报成$1/2$，过于乐观。

数值实现仍不要求形成整个稠密逆；可用同一个三角分解求所需列或采用选定逆元素算法。若基准未处理、点块奇异或使用不相容权，上式普通逆不能照用。*Eliminating variables preserves their influence; it does not make them error-free.*

[主文Schur与计算组织](./photogrammetry-en-05.md#e5-11)

## 5.12 统计评价：残差小为什么还可能藏着大错误？ {#derive-5-12}

**假设。** 在线性化处模型正确，基准已处理，$n$个标量观测、$u$个独立参数，$J$满列秩，观测误差$e$零均值且不含未建模系统项，满足$\operatorname{Cov}(e)=\sigma_0^2W^{-1}$。参数改正误差由$\hat\delta=N^{-1}J^TWe$给出。预测变化为$He$，其中$H=JN^{-1}J^TW$，故预测减观测残差为

$$v=(H-I)e.$$

代入协方差并展开，利用$N=J^TWJ$，得到

$$\operatorname{Cov}(v)
=\sigma_0^2(H-I)W^{-1}(H-I)^T
=\sigma_0^2\left(W^{-1}-JN^{-1}J^T\right).$$

这说明主文$Q_{vv}$中的减项来自已经被参数拟合吸收的误差，而不是人为把方差减小。若观测分量独立且$W$对角，定义局部冗余$r_i=1-H_{ii}$，则$(Q_{vv})_{ii}=r_i/w_i$。仅给第$i$个观测注入错误$d$，其自身残差贡献为$v_i=-r_id$。$r_i$很小时，一个大错误也可能在自身残差里显得很小；错误被模型吸收或转移到其他观测，并未消失。这正是可靠性不能只看原始残差大小的原因。

整体冗余为何为$n-u$？白化后$\tilde H=W^{1/2}J(J^TWJ)^{-1}J^TW^{1/2}$是秩$u$的正交投影，故$\operatorname{tr}(I-\tilde H)=n-u$。在上述假设且$n>u$时才可用

$$\hat\sigma_0^2=\frac{v^TWv}{n-u}.$$

约束、额外观测或秩改变时，须按实际独立维数重计，不能机械套原来的分母。

**独立检查的RMS再拆一步。** 检查差$\Delta_i$、均值$\bar\Delta$满足

$$\frac1n\sum_i\Delta_i^2
=\bar\Delta^2+\frac1n\sum_i(\Delta_i-\bar\Delta)^2.$$

所以RMS同时包含偏差和离散。检查差$(1,2,3)$米时，均值2米、RMS约2.16025米，后者大于零并非全由随机噪声造成。若检查参考坐标本身有误差，且与待检结果独立，差值协方差是两者协方差之和；不独立还须计入交叉项。不能把同一批控制点的拟合残差改名为独立检查误差。

以上是普通加权最小二乘的线性统计解释；稳健重加权、约束估计或随机模型改变后，阈值和协方差解释要相应重新审查。*A small residual can mean a weak check, not a small observation error.*

[主文precision、accuracy、reliability与原书例题](./photogrammetry-en-05.md#e5-12)

