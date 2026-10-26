---
title: "波动与光的电磁理论"
outline: [2, 3]
prev: {"text": "课程内容学习版", "link": "/optics-learning.html"}
---


# 波动与光的电磁理论

波动描述一个位置的变化怎样传到别处。对光而言，传播的是电磁场；相位决定各处场的振动状态，波前给出传播几何，场的叠加则决定探测器测到的能流。从波形平移出发，可以逐步建立这些量之间的关系。

研究光的产生、传播调控、探测、物质相互作用和应用时，几何光学、波动光学、矢量电磁理论与量子理论分别提供不同层次的描述。

来源简称：A 为《光学202609-波动.pdf》，B 为《光学20260921_波动.pdf》，Q 为第二章习题与思考题；T2、T3 分别为官方教材第二章《波动》和第三章《光的基本性质》。PDF 按文件页码定位，教材按节号、式号定位。

物理场取复数场的实部：

$$
\psi(\mathbf r,t)=\operatorname{Re}\!\left\{\widetilde A\,e^{i(\mathbf k\cdot\mathbf r-\omega t)}\right\},\qquad \widetilde A=Ae^{i\phi_0}.
$$

$A$ 以及标量或线偏振波的 $E_0$、$H_0$ 表示峰值振幅。一般复向量同时包含分量的振幅和相位，其模平方是各分量复幅模平方之和，与实矢量瞬时模的最大值平方通常不同。波数的模 $k=|\mathbf k|\ge0$，方向由 $\mathbf k$ 给出；$\nu$ 表示频率，$v$ 表示波速。

B 第 3 页、T2 式（2.40）至（2.41）和 T3 式（3.17）至（3.18）使用正时间因子。将 $e^{i(\omega t-kx+\varepsilon)}$ 换成本章形式，同一实波的初相位为 $\phi_0=-\varepsilon$。完整复表示随之共轭，包括偏振向量各分量的相位；微分算符的符号也同步改变。

## 1. 振动、波动与任意波形传播

来源：A 第 1至18 页；T2 §2.1，式（2.1）至（2.9）。

### 1.1 三个概念与两个方向

观察绳上的一个标记，可以看到它在平衡位置附近振动；观察整条绳子，则能看到扰动沿绳传播。前者描述局部物理量的时间变化，后者描述振动状态的空间传播。波场由各位置的场量组成，用来记录这种时空变化。机械质点的振动速度与波形的传播速度分别描述这两个过程。光波中随时间变化的场量是电场和磁场，真空传播无需机械介质。

- 纵波：扰动方向与传播方向平行，例如流体中的声波。
- 横波：扰动方向与传播方向垂直，例如绳上的横向扰动、真空中的传播平面电磁波。

周期波在固定位置随时间重复，在固定时刻又随空间位置重复，这就是时空双重周期性。孤立脉冲则可以只有一次起伏。能量输运还取决于波的组合：行波可以持续向一个方向输送能量，驻波虽在局部振动，平均净能流却可为零。

### 1.2 从波形平移写出波函数

设 $t=0$ 时波形为 $f(x)$，以恒定正速率 $v$ 沿 $+x$ 方向保持形状传播。原先位于 $x_0$ 的波形特征，到 $t$ 时位于 $x=x_0+vt$，故 $x_0=x-vt$，于是

$$
\boxed{\psi(x,t)=f(x-vt)}.
$$

沿 $-x$ 传播则为 $g(x+vt)$，这里 $v>0$。一般解可同时包含两方向：

$$
\psi(x,t)=f(x-vt)+g(x+vt).
$$

例如，初始波形 $f(x)=1/(10x^2+1)$ 传播后为

$$
\psi(x,t)=\frac1{10(x-vt)^2+1},
$$

峰值从原点移动到 $x=vt$，宽度保持不变。若用延迟时间作自变量，令 $F(s)=f(-vs)$，同一波也可写成 $F(t-x/v)$；函数 $F$ 的定义已随自变量一起改变。

传播方向可以通过跟踪同一个波形特征来判断：令自变量为常数，$x-vt=C\Rightarrow dx/dt=v>0$，可见特征点向 $+x$ 移动。

### 1.3 逐步导出一维波动方程

令 $\xi=x-vt$，$\psi=f(\xi)$。链式法则给出

$$
\frac{\partial\xi}{\partial x}=1,\qquad \frac{\partial\xi}{\partial t}=-v.
$$

因此

$$
\partial_x\psi=f'(\xi),\qquad \partial_x^2\psi=f''(\xi),
$$

$$
\partial_t\psi=-vf'(\xi),\qquad \partial_t^2\psi=v^2f''(\xi).
$$

消去 $f''$，得

$$
\boxed{\partial_x^2\psi-\frac1{v^2}\partial_t^2\psi=0}.
$$

左行波 $g(x+vt)$ 满足相同的二阶方程。线性性保证左右行波之和也满足它，因此这个方程允许双向传播。一阶式 $\partial_t\psi=-v\partial_x\psi$ 则选择了其中向右刚性平移的一支。

这一形式适用于波速恒定、线性且色散和耗散可忽略的系统。确定双向波的演化时，需要同时给定初始波形和初始变化率，与方程对时间为二阶相对应。

## 2. 简谐波：参数、相位与传播方向

来源：B 第 3至13 页；T2 §2.2.1至2.2.2，式（2.10）至（2.31）；T3 §3.2.3，式（3.35）。

正向一维简谐波写作

$$
\psi(x,t)=A\cos(kx-\omega t+\phi_0).
$$

|符号|定义|单位/关系|
|---|---|---|
|$A$|振动的峰值振幅|与场量同单位|
|$T$|固定位置重复一次所需时间|s|
|$\nu$|每秒振动次数|Hz，$\nu=1/T$|
|$\omega$|角频率|rad/s，$\omega=2\pi\nu$|
|$\lambda$|同一时刻沿传播方向的空间周期|m|
|$f_s$|普通空间频率；教材记为 $f$，又称波数|m$^{-1}$，$f_s=1/\lambda$，即每米的完整周期数|
|$k$|空间角频率、角波数；教材称传播数|rad/m，$k=2\pi/\lambda=2\pi f_s$|
|$\phi$|总相位|$\phi=kx-\omega t+\phi_0$|
|$\phi_0$|所选时空原点处的初相位|只在明确原点与约定后有意义|

普通空间频率 $f_s$ 计每单位长度内的完整周期数，传播数 $k$ 计每单位长度的相位变化量，两者相差 $2\pi$。T2 式（2.20）把前者称为波数，电动力学也常把 $k=2\pi/\lambda$ 简称波数，使用时应看定义。指数中的相位必须无量纲，因而传播相位写作 $k(x-vt)$ 或 $kx-\omega t$，其中 $\omega=kv$；$kx-vt$ 的两项量纲不一致。

### 2.1 由双重周期性统一各参数

固定时间，沿传播方向平移一个最小正周期 $\lambda$，相位增加 $2\pi$，故 $k\lambda=2\pi$。固定位置，经过一个最小正周期 $T$，相位变化量的绝对值为 $\omega T=2\pi$。将 $\omega=kv$ 代入，得到 $vT=\lambda$。于是同一波可写为

$$
\psi=A\cos[k(x-vt)+\phi_0]
=A\cos(kx-\omega t+\phi_0)
$$

$$
=A\cos\!\left[2\pi\!\left(\frac{x}{\lambda}-\frac{t}{T}\right)+\phi_0\right]
=A\cos[2\pi(f_sx-\nu t)+\phi_0].
$$

正弦与余弦形式相差固定初相位，T2 式（2.11）、（2.21）至（2.24）采用前者。上面各式分别用波速、角频率、周期和普通频率表达同一相位，其参数关系为

$$
\boxed{T=\frac1\nu=\frac{2\pi}{\omega}=\frac{\lambda}{v}=\frac{2\pi}{vk}},\qquad
\boxed{k=2\pi f_s,\quad\omega=2\pi\nu}.
$$

在静止、线性且不随时间变化的介质界面，单色波的频率保持不变，介质改变的是 $v$、$\lambda$、$k$。振幅则由振源与传播条件共同决定，随传播距离、吸收和界面透反射而变化。

### 2.2 用相位的变化率定义相速度

同相位点满足 $kx-\omega t+\phi_0=C$，微分得 $k\,dx-\omega\,dt=0$，所以

$$
\boxed{v_p=\frac{\omega}{k}=\lambda\nu}.
$$

两个位置或时刻的相位差为

$$
\Delta\phi=\mathbf k\cdot\Delta\mathbf r-\omega\Delta t.
$$

同一时刻、沿传播方向相距 $\lambda$，相位增加 $2\pi$；同一地点经过 $T$，本章约定下相位减少 $2\pi$。这两个符号均不影响波形周期。

对 $\phi=kx-\omega t+\phi_0$，有

$$
\left(\frac{\partial\phi}{\partial t}\right)_x=-\omega,\qquad
\left(\frac{\partial\phi}{\partial x}\right)_t=k.
$$

固定位置时相位以 $-\omega$ 的速率变化，其大小为 T2 式（2.28）的 $\omega$。跟踪同一个相位面，则 $d\phi=0$；由相位的全微分得到式（2.30）：

$$
\boxed{\left.\frac{dx}{dt}\right|_\phi
=-\frac{(\partial\phi/\partial t)_x}{(\partial\phi/\partial x)_t}}.
$$

代入得到 $+\omega/k$；相位为 $kx+\omega t+\phi_0$ 时得到 $-\omega/k$。两者速率均为 $\omega/k$，正负号标明同相位点的运动方向。理想简谐波的振幅 $A$ 处处相同，因此确定移动位置需要指定相位，例如选择某一个波峰。

初相位增加 $\Delta\phi_0$ 时，固定时刻的波形平移 $\Delta x=-\Delta\phi_0/k$；固定位置的时间曲线延迟 $\Delta t=\Delta\phi_0/\omega$。相位同时编码位移和变化方向：由于 $\cos\phi=\cos(-\phi)$，同一瞬时位移可以处在一个周期的不同阶段，结合速度才能区分。

真空及理想无色散介质中的传播平面波，其相速度与能量传播速度一致。对色散波包，还需考察包络的群速度 $v_g=d\omega/dk$；相速度 $\omega/k$ 单独描述等相面的运动，不能据此确定一般信号的传播速度。

## 3. 复数表示与相量：为什么能用，何时要取实部

来源：B 第 2至8 页；T2 §2.2.3至2.2.4，式（2.32）至（2.41）；Q 第 1 页习题 1至4、第 2 页思考 1至3、7。

### 3.1 复数的基本工具

$$
z=x+iy=re^{i\theta}=r(\cos\theta+i\sin\theta),\qquad i^2=-1,
$$

$$
z^*=x-iy=re^{-i\theta},\qquad |z|=\sqrt{zz^*}=\sqrt{x^2+y^2},
$$

$$
\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}2,\qquad
\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}.
$$

乘以 $e^{i\alpha}$ 会使复平面向量转过 $\alpha$；模表示长度，相角表示朝向。$e^{i\pi}=-1$，$e^{i\pi/2}=i$ 是常用的四分之一周期与半周期变换。

共轭保留复数的模并反转相角，故 $z^*=r(\cos\theta-i\sin\theta)$；四分之一周旋转满足 $e^{\pm i\pi/2}=\pm i$。

### 3.2 从实波到复波

$$
\widetilde\psi=\widetilde A e^{i(kx-\omega t)},\quad \widetilde A=Ae^{i\phi_0},\quad
\psi=\operatorname{Re}\widetilde\psi.
$$

实系数线性方程对实部和虚部分别成立。因此可以先对复场求导、相加，再取实部得到物理解。对单频平面波，求导化为代数乘法：

$$
\partial_t\longrightarrow-i\omega,\qquad \nabla\longrightarrow i\mathbf k.
$$

虚部提供相差四分之一周期的正交分量，与实部一起记录振幅和相位。实际电场由约定的实部给出。

例：课后题记号换算。 若

$$
U(x,t)=A\cos[\omega(t-x/v)+\varphi_0],
$$

则直接沿课题的 $e^{+i\omega t}$ 约定可写 $Ae^{i[\omega(t-x/v)+\varphi_0]}$；在本资料统一约定下，利用余弦的偶性，应写

$$
\widetilde U=Ae^{i(kx-\omega t-\varphi_0)},\qquad k=\omega/v.
$$

两者互为共轭，实部相同。类似地，题给 $\widetilde U=5e^{i(\omega t+\pi/3)}$ 时，实际振动是 $5\cos(\omega t+\pi/3)$；统一改写为 $\operatorname{Re}\{5e^{-i\pi/3}e^{-i\omega t}\}$ 仍是同一振动。

### 3.3 旋转相量和静止复振幅的区别

固定位置处，复数 $\widetilde A e^{i\mathbf k\cdot\mathbf r}e^{-i\omega t}$ 在复平面上旋转。向量长度给出振幅，与实轴的夹角给出相位，实轴投影给出余弦场。负时间因子对应角速度 $-\omega$ 的顺时针转动，正时间因子 $e^{+i\omega t}$ 对应逆时针转动。

提出公共时间因子 $e^{-i\omega t}$，得到静止相量 $\widetilde\Psi(\mathbf r)=\widetilde A e^{i\mathbf k\cdot\mathbf r}$。同频波可以在这幅静止相量图中相加；异频波的相对夹角随时间变化，需保留各自的时间因子再求和。

月相、四季可类比周期过程所处的阶段及阶段之间的差值。光波相位还依赖空间位置，是一个取模 $2\pi$ 的连续变量；月面的明暗比例并不对应波的振幅或能量。

<a id="_3-4-二次物理量不能直接把复数相乘后取实部"></a>

### 3.4 二次物理量的时间平均

一般而言 $\operatorname{Re}(ab)\ne(\operatorname{Re}a)(\operatorname{Re}b)$。对同频标量

$$
a(t)=\operatorname{Re}(a_0e^{-i\omega t}),\qquad b(t)=\operatorname{Re}(b_0e^{-i\omega t}),
$$

展开

$$
a(t)b(t)=\frac14\left[a_0b_0e^{-2i\omega t}+a_0b_0^*+a_0^*b_0+a_0^*b_0^*e^{2i\omega t}\right].
$$

取一个完整周期或足够长时间平均，首尾项消失，故

$$
\boxed{\langle ab\rangle=\frac12\operatorname{Re}(a_0b_0^*)}.
$$

系数 $1/2$ 来自峰值振幅的周期平均。采用均方根相量时，这个系数已包含在振幅定义中。

## 4. 平面波：等相位面、波矢与三维方程

来源：B 第 9至13、27 页；T2 §2.3.1，式（2.42）至（2.56）；T3 §3.2.3，式（3.24）至（3.35）；Q 第 1 页习题 5、7，第 2 页思考 4。

### 4.1 从平面几何理解波前

法向为 $\mathbf k$、过 $\mathbf r_0$ 的平面满足

$$
\mathbf k\cdot(\mathbf r-\mathbf r_0)=0.
$$

单色平面波

$$
\widetilde\psi(\mathbf r,t)=\widetilde A e^{i(\mathbf k\cdot\mathbf r-\omega t)}
$$

在某一时刻的等相位面满足 $\mathbf k\cdot\mathbf r=\text{常数}$，因此是互相平行的平面；$\mathbf k$ 垂直于波前。沿 $\hat{\mathbf k}$ 移动 $\lambda$，相位增加 $k\lambda=2\pi$。

若 $\hat{\mathbf k}=(\alpha,\beta,\gamma)$，则

$$
\mathbf k=k(\alpha,\beta,\gamma),\qquad \alpha^2+\beta^2+\gamma^2=1,
$$

$$
\widetilde\psi=\widetilde A e^{i[k(\alpha x+\beta y+\gamma z)-\omega t]}.
$$

这里 $\alpha,\beta,\gamma$ 分别是传播方向与三个坐标轴夹角的余弦，三者共同确定波矢方向。

例如，斜向平面波

$$
\psi=A\cos\!\left[k(z\cos\theta-y\sin\theta)-\omega t\right]
$$

对应 $\mathbf k=k(0,-\sin\theta,\cos\theta)$，其传播方向同时具有负 $y$ 分量和正 $z$ 分量。

### 4.2 相速度取波前法线方向

沿波前法线取坐标 $s=\hat{\mathbf k}\cdot\mathbf r$，相位为 $ks-\omega t+\phi_0$。保持相位不变得到 $ds/dt=\omega/k$，即波面的法向速度。沿坐标轴追踪波前与轴的交点时，得到的则是 $\omega/k_x$。斜面交点可以移动得很快，能量仍沿波的传播方向输运。

### 4.3 三维波动方程与色散关系

均匀各向同性系统中

$$
\boxed{\nabla^2\psi-\frac1{v^2}\partial_t^2\psi=0},\qquad
\nabla^2=\partial_x^2+\partial_y^2+\partial_z^2.
$$

把平面波代入：$\nabla^2\widetilde\psi=-k^2\widetilde\psi$，$\partial_t^2\widetilde\psi=-\omega^2\widetilde\psi$，所以非零解要求

$$
\boxed{k^2=\omega^2/v^2}.
$$

理想平面波横向无限延伸、振幅处处相同，适合描述有限区域内近似平直的波前。实验中，把小光源放在准直透镜焦点附近，可在有限口径和距离内获得这种波。远离点源的一小块球面波也可局部近似为平面波。实际光束有有限能量、口径及衍射，理想平面波则通常具有无限总能量。

### 4.4 空间频率向量与任意方向上的条纹间隔

同一波前沿不同方向取截线，会得到不同的空间重复距离。T3 §3.2.3 用空间频率向量描述这种几何关系：

$$
\boxed{\mathbf f_s=\frac{\mathbf k}{2\pi}=\frac{\hat{\mathbf k}}{\lambda}},\qquad
|\mathbf f_s|=\frac1\lambda.
$$

各方向分量为 $f_{s,x}=\alpha/\lambda$、$f_{s,y}=\beta/\lambda$、$f_{s,z}=\gamma/\lambda$，对应式（3.29）至（3.33）。教材把方向角记为 $\alpha$ 等，故其方向余弦写成 $\cos\alpha$；本章的 $\alpha,\beta,\gamma$ 直接表示余弦值。

沿单位方向 $\hat{\mathbf n}$ 取直线 $\mathbf r(s)=\mathbf r_0+s\hat{\mathbf n}$，它与波矢夹角为 $\vartheta$。固定时间，沿线相位为

$$
\phi(s)=\phi(0)+(\mathbf k\cdot\hat{\mathbf n})s
=\phi(0)+\frac{2\pi\cos\vartheta}{\lambda}s.
$$

沿这条线看到一次完整重复，要求 $|\Delta\phi|=2\pi$，故最小正空间周期为

$$
\boxed{d_{\hat n}=\frac{\lambda}{|\cos\vartheta|}
=\frac1{|\mathbf f_s\cdot\hat{\mathbf n}|}}.
$$

取相位增量的绝对值，得到非负的重复长度；带符号坐标间隔则可写为式（3.31）至（3.32）的 $d=\lambda/\cos\vartheta$。当 $\cos\vartheta=0$，沿线相位恒定，有限最小周期不存在，常记 $d\to\infty$。截线周期与向量投影是两个几何量：$d_x=\lambda/|\alpha|$，长度向量 $\lambda\hat{\mathbf k}$ 的 $x$ 投影为 $\lambda\alpha$。

算例：斜波的法向波长不等于坐标截线周期。 真空波长 $\lambda_0=600\ \mathrm{nm}$，传播单位方向为 $(3/5,0,4/5)$，则

$$
\mathbf f_s=(1.00\times10^6,0,1.3333\times10^6)\ \mathrm{m^{-1}},
$$

$$
d_x=1000\ \mathrm{nm},\qquad d_z=750\ \mathrm{nm},\qquad d_y\to\infty.
$$

沿传播法线量得的波长为 $600\ \mathrm{nm}$。波面与 $x$ 轴的交点速度为 $c/(3/5)\simeq5.00\times10^8\ \mathrm{m/s}$，而光的能量沿 $\hat{\mathbf k}$ 以 $c$ 传播。前者描述几何交点的位置变化，后者描述实际能量输运。

## 5. 球面波与柱面波：几何扩散如何决定振幅

来源：B 第 14至15 页；T2 §2.3.2至2.3.3，式（2.57）至（2.61）；Q 第 1 页习题 6、8，第 2 页思考 5。

波向外传播时，能量分布到越来越大的面积上，振幅随之减小。球面波与柱面波可用标量模型突出这种几何扩散；实际电磁源的矢量场还带有方向图。

### 5.1 球面对称波：把三维方程化成一维

取尺寸远小于波长的局域源，并假定它向各方向辐射相同的标量波，便得到球对称点源模型。点源近似约束的是尺寸，球对称还要求各向同性。

球坐标中

$$
x=r\sin\theta\cos\varphi,\quad y=r\sin\theta\sin\varphi,\quad z=r\cos\theta.
$$

完整标量拉普拉斯算符为

$$
\nabla^2=\frac1{r^2}\partial_r(r^2\partial_r)
+\frac1{r^2\sin\theta}\partial_\theta(\sin\theta\partial_\theta)
+\frac1{r^2\sin^2\theta}\partial_\varphi^2.
$$

球面对称时 $\psi=\psi(r,t)$，角向导数消失，因此

$$
\nabla^2\psi=\partial_r^2\psi+\frac2r\partial_r\psi
=\frac1r\partial_r^2(r\psi).
$$

设 $u=r\psi$，波动方程变成

$$
\partial_r^2u-\frac1{v^2}\partial_t^2u=0.
$$

由一维传播形式得

$$
\psi(r,t)=\frac{f(r-vt)+g(r+vt)}r,\qquad r>0.
$$

出射和会聚的单色波分别为

$$
\boxed{\widetilde\psi_{\rm out}=\frac{\widetilde A}{r}e^{i(kr-\omega t)}},\qquad
\boxed{\widetilde\psi_{\rm in}=\frac{\widetilde A}{r}e^{i(-kr-\omega t)}}.
$$

提出时间因子后，复振幅分别为 $\widetilde\Psi_{\rm out}=\widetilde A e^{ikr}/r$ 与 $\widetilde\Psi_{\rm in}=\widetilde A e^{-ikr}/r$。会聚波的恒相位条件 $-kr-\omega t=C$ 给出 $dr/dt=-\omega/k$，因此波面向原点靠拢。这个源外模型在 $r=0$ 处有奇性；源内部或实际焦点附近还需考虑有限源尺寸和衍射。

教材式（2.58）的 $k(r\mp vt)$ 展开为 $kr\mp\omega t$。系数 $\widetilde A$ 的单位为场量单位乘长度，决定 $1/r$ 振幅；辐射功率的单位为 W，光强 $I$ 的单位为 W/m²，分别通过能流计算。

能量检验：无吸收、稳态、各向同性时，通过任意同心球的功率相同：

$$
P=4\pi r^2I(r)=\text{常数}\Rightarrow I\propto r^{-2}\Rightarrow A(r)\propto r^{-1}.
$$

球面面积增加使单位面积分到的能量减少，全部球面上的总功率保持不变。

### 5.2 柱面波：远场振幅为什么是 $1/\sqrt{\rho}$

线源横截面远小于波长、沿轴向激发近似均匀时，可在端部影响可忽略的区域内采用柱对称模型。有限线源的长度和观察位置共同决定这一近似的有效范围。

为避免与球半径混淆，用 $\rho$ 表示到轴线的距离。柱坐标为 $x=\rho\cos\theta$、$y=\rho\sin\theta$，且

$$
\nabla^2=\frac1\rho\partial_\rho(\rho\partial_\rho)+\frac1{\rho^2}\partial_\theta^2+\partial_z^2.
$$

若场沿轴向均匀、与方位角无关，便有

$$
\partial_\rho^2\psi+\frac1\rho\partial_\rho\psi-\frac1{v^2}\partial_t^2\psi=0.
$$

单位轴长的辐射功率经过周长 $2\pi\rho$ 分散，故远场

$$
\frac PL=2\pi\rho I(\rho)=\text{常数}\Rightarrow I\propto\rho^{-1}\Rightarrow A\propto\rho^{-1/2}.
$$

常用出射近似形式

$$
\widetilde\psi\simeq\frac{\widetilde C}{\sqrt\rho}e^{i(k\rho-\omega t)},\qquad k\rho\gg1.
$$

将远场形式 $F=\rho^{-1/2}e^{ik\rho}$ 代回柱对称方程，可以直接检验近似的精度：

$$
F''+\rho^{-1}F'+k^2F=\frac{F}{4\rho^2}.
$$

相对主项 $k^2F$，残差为 $1/[4(k\rho)^2]$，在 $k\rho\gg1$ 时可以忽略。这给出了 T2 §2.3.3 式（2.61）远场近似的定量条件。严格的单色出射解正比于 $H_0^{(1)}(k\rho)e^{-i\omega t}$；Hankel 函数的远场形式为 $e^{i(k\rho-\pi/4)}/\sqrt\rho$，常数相位可并入 $\widetilde C$。

|几何模型|能流分散面积/单位长度周长|强度规律|振幅规律|
|---|---|---|---|
|理想平面波|不随传播距离增加|$I$ 恒定|$A$ 恒定|
|球面波|$4\pi r^2$|$I\propto1/r^2$|$A\propto1/r$|
|柱面波远场|$2\pi\rho$|$I\propto1/\rho$|$A\propto1/\sqrt\rho$|

## 6. 波的叠加：先加场，再求平方量

来源：B 第 16至18 页；T3 §3.4，式（3.46）至（3.47）；Q 第 1 页习题 4、9，第 2 页习题 10、思考 6至7。

### 6.1 叠加来自线性方程

令 $L=\nabla^2-v^{-2}\partial_t^2$。若 $L\psi_1=L\psi_2=0$，由微分的线性性，

$$
L(c_1\psi_1+c_2\psi_2)=c_1L\psi_1+c_2L\psi_2=0.
$$

这就是线性叠加原理。组成波须属于同一物理系统，初始条件和边界条件也应相容；非齐次条件可随对应的源一同叠加，或先分离特解。扰动相加以后，能量和光强由合场的二次量计算，其中会出现交叉项。

普通弱光下，介质响应常可近似为线性。强场时，极化中的 $\mathbf P=\varepsilon_0(\chi^{(1)}\mathbf E+\chi^{(2)}:\mathbf E\mathbf E+\cdots)$ 等非线性项可能显著，导致倍频和波间耦合。此时需要联立求解合场与介质响应，原来两个独立传播解的和通常已不满足新方程。

### 6.2 同频同方向振动的相量推导

设公共空间和时间相位为 $\Theta$：

$$
\psi_1=A_1\cos(\Theta+\phi_1),\qquad \psi_2=A_2\cos(\Theta+\phi_2).
$$

相量相加：

$$
\widetilde A=A_1e^{i\phi_1}+A_2e^{i\phi_2}=Ae^{i\phi}.
$$

乘以共轭求模平方：

$$
A^2=\widetilde A\widetilde A^*=A_1^2+A_2^2+2A_1A_2\cos(\phi_2-\phi_1).
$$

于是

$$
\boxed{A=\sqrt{A_1^2+A_2^2+2A_1A_2\cos\delta}},\qquad \delta=\phi_2-\phi_1.
$$

合初相位可由

$$
\phi=\operatorname{atan2}(A_1\sin\phi_1+A_2\sin\phi_2,\ A_1\cos\phi_1+A_2\cos\phi_2)
$$

确定。这里的 $\operatorname{atan2}$ 同时使用实部和虚部来确定象限；合振幅为零时，合相位没有确定意义。

- 同相 $\delta=0$：$A=A_1+A_2$。
- 反相 $\delta=\pi$：$A=|A_1-A_2|$；只有 $A_1=A_2$ 才完全抵消。
- 正交相量 $\delta=\pi/2$：$A=\sqrt{A_1^2+A_2^2}$；若两振幅均为 $A_0$，合振幅为 $\sqrt2A_0$。

课后题 $A_1=2$、$A_2=3$ 的同相合振幅为 $5$，反相合振幅为 $1$；课件中 $1.0$ 与 $0.8$ 反相，剩余合振幅为 $0.2$。

合振幅描述整个简谐振动的最大值。教材图 3.3 中某点 $E_1=-E_2$，合场在该点的瞬时值为零，整个振动的振幅仍由复幅和决定。叠加也适用于线性相关的解；只有建立独立解基底时才要求线性无关。

### 6.3 为什么研究简谐波可以帮助理解一般波形

来源：T3 §3.4。对满足可积条件或可在广义函数意义下处理的初始波形，Fourier 分解给出

$$
f(\xi)=\frac1{2\pi}\int_{-\infty}^{\infty}\widehat f(q)e^{iq\xi}\,dq,
\qquad \widehat f(q)=\int_{-\infty}^{\infty}f(\xi)e^{-iq\xi}\,d\xi.
$$

代入 $\xi=x-vt$，便有

$$
\psi(x,t)=\frac1{2\pi}\int_{-\infty}^{\infty}\widehat f(q)e^{iq(x-vt)}\,dq.
$$

积分变量 $q$ 可正可负，表示有符号的 Fourier 角空间频率；$k=|\mathbf k|$ 则表示非负的波矢模。每个分量都满足同一波动方程，因此可以求出各分量的传播后再相加。周期波形对应离散 Fourier 级数，局域波形通常对应连续谱。

严格单色波只有一个时间频率，有限持续时间的波列则通常有频宽。还需区分时间频谱与空间角谱：有限横向口径的单频光束，可以由同频、不同方向的平面波叠加得到，变化的是传播方向分布。T2 §2.2.1 的准单色波指时间频谱集中在一个窄范围内的波。

有限波列的定量例子。 在固定观察点，取持续 $\tau$ 的矩形包络复信号 $g(t)=G_0e^{-i\omega_0t}$（$|t|<\tau/2$），其余时间为零。按 Fourier 定义

$$
\widehat g(\omega)=\int_{-\tau/2}^{\tau/2}G_0e^{i(\omega-\omega_0)t}\,dt
=G_0\tau\,\operatorname{sinc}\!\left[\frac{(\omega-\omega_0)\tau}{2}\right].
$$

这里 $\operatorname{sinc}x=\sin x/x$，第一零点满足 $|\nu-\nu_0|=1/\tau$，或 $|\omega-\omega_0|=2\pi/\tau$。取 $\tau=1.0\ \mathrm{ns}$、$\nu_0=5.0\times10^{14}\ \mathrm{Hz}$，第一零点距中心 $1.0\ \mathrm{GHz}$，相对频率尺度为 $2.0\times10^{-6}$，适合采用准单色近似。这个宽度以中心到第一零点的距离定义；半高全宽是另一种度量，且谱形会随实际脉冲包络改变。

## 7. 麦克斯韦方程如何推出光的波动方程

来源：B 第 21至26 页；T3 §3.1.1至3.1.2，式（3.1）至（3.15）；与电动力学笔记《介质中的麦克斯韦方程组》《平面电磁波》结合。

### 7.1 一般方程及符号

$$
\boxed{\nabla\cdot\mathbf D=\rho_f,\quad \nabla\cdot\mathbf B=0,\quad
\nabla\times\mathbf E=-\partial_t\mathbf B,\quad
\nabla\times\mathbf H=\mathbf J_f+\partial_t\mathbf D}.
$$

$\rho_f,\mathbf J_f$ 是自由电荷与自由电流；$\mathbf D$ 包含电极化响应，$\mathbf H$ 由磁化后的本构关系联系到 $\mathbf B$。对静止曲面与回路，积分式分别为

$$
\oint_{\partial V}\mathbf D\cdot d\mathbf a=Q_f,\qquad
\oint_{\partial V}\mathbf B\cdot d\mathbf a=0,
$$

$$
\oint_{\partial\Sigma}\mathbf E\cdot d\mathbf l=-\frac d{dt}\int_\Sigma\mathbf B\cdot d\mathbf a,
$$

$$
\oint_{\partial\Sigma}\mathbf H\cdot d\mathbf l=I_f+\frac d{dt}\int_\Sigma\mathbf D\cdot d\mathbf a.
$$

高斯公式和斯托克斯公式把积分式转成微分式，环路方向与曲面法向按右手规则配对。位移电流项 $\partial_t\mathbf D$ 使变化电场在无传导电流的真空中仍与磁场耦合，支持波的传播。

散度方程描述场的源汇：$\nabla\cdot\mathbf B=0$ 表示没有磁单极源，$\nabla\cdot\mathbf D=\rho_f$ 则联系自由电荷。旋度方程描述另一组关系，电流可以产生磁场，变化磁场可以联系感应电场。因此“磁场无源”指其散度为零，与磁场的产生机制是不同层次的说明。

<a id="_7-2-先列出能做化简的条件"></a>

### 7.2 无源理想介质中的场方程

真空无源区满足 $\rho_f=0$、$\mathbf J_f=0$，本构关系为 $\mathbf D=\varepsilon_0\mathbf E$、$\mathbf B=\mu_0\mathbf H$。把范围扩展到均匀、各向同性、线性、无损且无色散的理想介质，写成 $\mathbf D=\varepsilon\mathbf E$、$\mathbf B=\mu\mathbf H$，其中 $\varepsilon,\mu$ 为正实常数。无源场方程随之化为

$$
\nabla\cdot\mathbf E=0,\quad \nabla\cdot\mathbf H=0,\quad
\nabla\times\mathbf E=-\mu\partial_t\mathbf H,\quad
\nabla\times\mathbf H=\varepsilon\partial_t\mathbf E.
$$

无源条件去掉自由电荷与自由电流，介质的极化和磁化仍包含在本构参数中。取 $\varepsilon=\varepsilon_0,\mu=\mu_0$，才得到真空特例。

### 7.3 电场方程的逐步推导

第一步，对法拉第定律取旋度：

$$
\nabla\times(\nabla\times\mathbf E)=-\mu\partial_t(\nabla\times\mathbf H).
$$

第二步，左边用矢量恒等式

$$
\nabla\times(\nabla\times\mathbf E)=\nabla(\nabla\cdot\mathbf E)-\nabla^2\mathbf E=-\nabla^2\mathbf E.
$$

第三步，右边代入安培与麦克斯韦定律，得

$$
-\nabla^2\mathbf E=-\mu\varepsilon\partial_t^2\mathbf E.
$$

故

$$
\boxed{\nabla^2\mathbf E-\mu\varepsilon\partial_t^2\mathbf E=0},\qquad
\boxed{v=\frac1{\sqrt{\mu\varepsilon}}}.
$$

对 $\nabla\times\mathbf H$ 再取旋度同理得

$$
\boxed{\nabla^2\mathbf H-\mu\varepsilon\partial_t^2\mathbf H=0}.
$$

真空中

$$
\boxed{c=\frac1{\sqrt{\varepsilon_0\mu_0}}\simeq2.998\times10^8\ \mathrm{m/s}}.
$$

每个笛卡尔分量，例如 $E_x$，都满足标量波动方程。完整电磁解还须满足原来的四条 Maxwell 方程，其中散度式约束横向分量，旋度式联系电场与磁场。下一节将把平面波回代，求出这些附加关系。

把平面波代入即得 $k^2=\mu\varepsilon\omega^2$。在普通透明、非磁介质的模型下

$$
n=\frac cv=\sqrt{\varepsilon_r\mu_r}\simeq\sqrt{\varepsilon_r},\qquad k=\frac{n\omega}{c}.
$$

非磁近似给出 $\mu_r\simeq1$。存在色散、吸收或各向异性时，本构参数的频率依赖、复数性质或张量性质需一并计入场方程。

## 8. 平面光波的横波性、场间关系与偏振

来源：B 第 27至31 页；T3 §3.2.1至3.2.5，式（3.16）至（3.38）。 本节都针对无源、均匀、各向同性、无损的传播平面波；若无特别说明，$\varepsilon,\mu$ 为正实常数。

### 8.1 散度方程给出横波性

设 $\widetilde{\mathbf E}=\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，$\mathbf E_0$ 可为复向量。代入散度式：

$$
\nabla\cdot\widetilde{\mathbf E}=i\mathbf k\cdot\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}=0.
$$

非零指数不影响等式，故

$$
\boxed{\mathbf k\cdot\mathbf E_0=0},\qquad \boxed{\mathbf k\cdot\mathbf B_0=0}.
$$

电、磁扰动都位于垂直 $\mathbf k$ 的平面内，形成横波。各向异性介质中，高斯定律给出 $\mathbf k\cdot\mathbf D=0$；由于 $\mathbf D$ 与 $\mathbf E$ 方向可以不同，$\mathbf E$ 可能带有沿波矢的分量。

### 8.2 旋度方程给出右手关系、阻抗与同步性

用 $\nabla\to i\mathbf k$、$\partial_t\to-i\omega$ 代入法拉第定律：

$$
i\mathbf k\times\mathbf E_0=i\omega\mathbf B_0,
$$

即

$$
\boxed{\mathbf B_0=\frac{\mathbf k\times\mathbf E_0}{\omega}=\frac1v\hat{\mathbf k}\times\mathbf E_0}.
$$

再利用 $\mathbf B_0=\mu\mathbf H_0$，得

$$
\boxed{\mathbf H_0=\frac1Z\hat{\mathbf k}\times\mathbf E_0},\qquad
\boxed{Z=\sqrt{\mu/\varepsilon}},\qquad E_0=ZH_0=vB_0.
$$

真空中 $E_0=cB_0$、$Z_0=\sqrt{\mu_0/\varepsilon_0}\simeq376.73\ \Omega$。

实数阻抗使这组关系没有额外相位延迟。线偏振理想平面波的电场和磁场同相振动，瞬时满足 $\mathbf E\perp\mathbf H$，且 $\mathbf E\times\mathbf H$ 沿 $\mathbf k$。例如沿 $+z$ 传播时，若某时刻 $\mathbf E$ 沿 $+x$，则 $\mathbf B$ 沿 $+y$；传播反向时，相应磁场方向也翻转。

折射率 $n$ 取决于 $\varepsilon\mu$，决定相位传播；阻抗 $Z$ 取决于 $\mu/\varepsilon$，决定场幅比例。两介质可以折射率相同而阻抗不同，界面振幅还需结合阻抗与边界条件确定。

### 8.3 为什么把电场叫光矢量

粒子受洛伦兹力 $\mathbf F=q(\mathbf E+\mathbf u\times\mathbf B)$。真空平面波有 $E=cB$，所以非相对论粒子满足

$$
\frac{|q\mathbf u\times\mathbf B|}{|q\mathbf E|}\le\frac uc\ll1.
$$

许多光与低速电子的相互作用由电场力主导，所以通常用电场表示光的振动方向，称其为光矢量。式中的 $\mathbf u$ 是受力粒子的速度，决定磁力相对于电力的量级。

两项合力的大小满足 $|\mathbf F|\le |q|E+|q|uB$，具体结果还取决于方向。电场与磁场的 SI 单位不同，对同一粒子的电、磁力才是可以直接比较的量。

### 8.4 横波允许偏振自由度

取传播沿 $z$，电场可有两个横向分量：

$$
E_x=A_x\cos(kz-\omega t+\phi_x),\qquad E_y=A_y\cos(kz-\omega t+\phi_y).
$$

固定位置观察电场端点轨迹：

- $\phi_y-\phi_x=0$ 或 $\pi$（或只有一个分量）时是直线，为线偏振；电矢量及 $\mathbf k$ 组成振动面。
- 两分量等幅且相差 $\pm\pi/2$ 时为圆；一般固定振幅与相差组合为椭圆。

横波的电矢量始终处在横截面内，可以沿固定直线振动，也可以在其中转动。平面波则按波前形状定义，允许线、圆和椭圆偏振。例如沿 $z$ 传播的 $\mathbf E_0=E_a(\hat{\mathbf x}+i\hat{\mathbf y})$，其实部有两个相差四分之一周期的分量，固定点电矢量转圆，波前仍为平面。实固定方向向量乘一个余弦的写法专门描述线偏振。

## 9. 能流、光强与干涉的可观测条件

来源：B 第 32至37 页；T3 §3.3至3.5，式（3.39）至（3.50）；与电动力学《电磁场能量守恒与坡印廷定理》《平面波的横波性与能流》结合。

### 9.1 坡印廷矢量为什么代表能量传播

理想无色散介质的瞬时电磁能量密度

$$
u=\frac12\varepsilon\mathbf E^2+\frac12\mu\mathbf H^2.
$$

对单一出射的理想传播平面波，$\mathbf H=Z^{-1}\hat{\mathbf k}\times\mathbf E$，所以瞬时就有

$$
u_H=\frac12\mu H^2=\frac12\varepsilon E^2=u_E,\qquad u=\varepsilon E^2.
$$

教材式（3.39）至（3.41）给出的这一均分关系在瞬时就成立，前提是单一理想传播平面波。驻波等叠加场中，电、磁能量则会在不同位置和时刻互相转换。

能流也可从一个小体积理解：在很短的 $\Delta t$ 内穿过垂直截面 $\mathcal A$ 的光，占据长度约 $v\Delta t$ 的一段光柱。若该处近似均匀，$\Delta U\simeq u\mathcal A v\Delta t$，令时间间隔趋于零，得到

$$
S=\lim_{\Delta t\to0}\frac{\Delta U}{\mathcal A\Delta t}=uv=EH,
$$

真空中为教材式（3.42）的 $S=cu$。要描述一般场的能流方向和能量交换，还可从局部守恒推导矢量形式。

从恒等式 $\nabla\cdot(\mathbf E\times\mathbf H)=\mathbf H\cdot(\nabla\times\mathbf E)-\mathbf E\cdot(\nabla\times\mathbf H)$，代入麦氏方程，得

$$
\nabla\cdot(\mathbf E\times\mathbf H)=-\mu\mathbf H\cdot\partial_t\mathbf H-\varepsilon\mathbf E\cdot\partial_t\mathbf E-\mathbf J_f\cdot\mathbf E.
$$

前两项合并成 $-\partial_tu$，所以

$$
\boxed{\partial_tu+\nabla\cdot\mathbf S=-\mathbf J_f\cdot\mathbf E},\qquad
\boxed{\mathbf S=\mathbf E\times\mathbf H}.
$$

右侧的 $-\mathbf J_f\cdot\mathbf E$ 表示场向自由电流传递能量的速率。无源、无耗散时，它化为场能量的局部守恒。坡印廷矢量 $\mathbf S$ 的单位为 W/m²，方向给出能量输运方向。普通理想平面波的能流沿波矢方向；各向异性介质中，光线所沿的能流方向可与波法线不同。

### 9.2 从瞬时能流推导平均光强

对线偏振，令 $\mathbf E=\hat{\mathbf e}E_0\cos\Theta$，$\mathbf H=(\hat{\mathbf k}\times\hat{\mathbf e})H_0\cos\Theta$，于是

$$
\mathbf S=\hat{\mathbf k}E_0H_0\cos^2\Theta.
$$

周期平均 $\langle\cos^2\Theta\rangle=1/2$，得到

$$
\boxed{I=|\langle\mathbf S\rangle|=\frac12E_0H_0=\frac{E_0^2}{2Z}=\frac12\sqrt{\frac\varepsilon\mu}\,E_0^2}.
$$

真空中

$$
\boxed{I=\frac12\varepsilon_0cE_0^2=\frac{cB_0^2}{2\mu_0}}.
$$

一般同频复场使用

$$
\boxed{\langle\mathbf S\rangle=\frac12\operatorname{Re}(\mathbf E_0\times\mathbf H_0^*)}.
$$

椭圆偏振仍满足 $I=|\mathbf E_0|^2/(2Z)$，其中 $|\mathbf E_0|^2=|E_{0x}|^2+|E_{0y}|^2$ 是分量复幅的模平方和，按它计算即可得到平均能流。

平均电、磁能密度相等：

$$
\bar u_E=\frac14\varepsilon E_0^2,\qquad \bar u_H=\frac14\mu H_0^2=\bar u_E,
$$

故 $\bar u=\varepsilon E_0^2/2$，并有

$$
\boxed{\langle\mathbf S\rangle=v\bar u\,\hat{\mathbf k}}.
$$

辐射功率是 $\Phi=\int_\Sigma\langle\mathbf S\rangle\cdot d\mathbf a$，单位 W。若均匀平面波穿过面积 $\mathcal A$，其法向与传播方向夹角为 $\theta$，则 $\Phi=I\mathcal A\cos\theta$。入射到该表面的辐照度为 $\Phi/\mathcal A=I\cos\theta$。

曲面积分给出选定法向后的有向净通量。计算接收面的入射功率时取入射贡献的正值，单束光的辐照度为 $I_{\rm irr}=I|\hat{\mathbf k}\cdot\hat{\mathbf n}|$。从表面向外发出的功率除以面积，称辐射出射度；它与入射辐照度都用 W/m²，但分别统计出射和入射功率。多方向辐射需先对相应方向求和或积分，热辐射出射度在正文 02 中记为 $M$（T3 §3.3.2）。

波动光学常把平均能流密度 $I$ 简称光强。光度学还按人眼响应加权，其中照度用 lx，发光强度用 cd；与本章能量量度的换算需要光谱及相应权重。

### 9.3 两束光的干涉项从何而来

先考虑同频、同一介质、共线传播，或可忽略夹角对能流系数影响的近轴两束光。设偏振单位向量分别为实向量 $\hat{\mathbf e}_1,\hat{\mathbf e}_2$，点 $P$ 的复电振幅为

$$
\mathbf E_{01}=A_1\hat{\mathbf e}_1e^{i\phi_1},\qquad \mathbf E_{02}=A_2\hat{\mathbf e}_2e^{i\phi_2}.
$$

总场先相加，再平方：

$$
I=\frac1{2Z}|\mathbf E_{01}+\mathbf E_{02}|^2
$$

$$
=\frac1{2Z}\left(A_1^2+A_2^2+2A_1A_2(\hat{\mathbf e}_1\cdot\hat{\mathbf e}_2)\cos\delta\right),\qquad \delta=\phi_2-\phi_1.
$$

若偏振夹角为 $\alpha$，$I_j=A_j^2/(2Z)$，则

$$
\boxed{I=I_1+I_2+2\sqrt{I_1I_2}\cos\alpha\cos\delta}.
$$

交叉项的符号决定加强还是减弱。实场平方展开给出 $2\mathbf E_1\cdot\mathbf E_2$，复幅平均对应 $2\operatorname{Re}(\mathbf E_{01}\cdot\mathbf E_{02}^*)$，均保留内积的正负。SI 制中，瞬时场平方乘 $1/Z$，峰值复幅的平均平方乘 $1/(2Z)$，由此同时得到正确量纲与干涉符号。

平行偏振的 $\cos\alpha=1$，交叉项完整保留；正交偏振的内积为零，该检测方式下交叉项消失。即使如此，两束波仍可有确定的相位关系，通过同一检偏方向投影后能够恢复干涉。偏振重叠与统计相干性分别决定干涉项的不同因子。

大夹角光束的能流几何应从 $\mathbf S=(\mathbf E_1+\mathbf E_2)\times(\mathbf H_1+\mathbf H_2)$ 计算，再向探测面法向投影。上面的标量强度式采用共线或近轴条件。

### 9.4 稳定干涉需要的三个条件

稳定条纹要求交叉项在探测平均后保留。可分别考察偏振、频率与相位关联：

1. 偏振投影有非零重叠；正交振动的叉项为零。
2. 在探测曝光时间内，频差造成的相位漂移不能把交叉项平均掉；严格静止的单色干涉图样要求同频。
3. 相位差在观察时间内有稳定或可预测关联；若快速随机均匀变化，$\langle\cos\delta\rangle=0$，只剩 $I_1+I_2$。

独立光源即使中心频率相近，随机相位仍可能使长曝光交叉项消失。在相干场中，某点 $\delta=\pi/2$ 也会使该点的交叉项为零；相干性取决于场之间的关联，不能由一个位置的强度读数单独判定。

### 9.5 为什么不同频率有时仍能看到拍频

两频率接近的波叠加时，交叉项同时含和频与差频。光学频率的快速振荡被探测器平均掉以后，较慢的差频 $\Delta\omega=\omega_2-\omega_1$ 仍可能保留，形成 $\cos(\Delta\phi-\Delta\omega t)$ 的拍频信号。

从实场 $E_1=A_1\cos(\omega_1t+\beta_1)$、$E_2=A_2\cos(\omega_2t+\beta_2)$ 出发，积化和差精确给出

$$
2E_1E_2=A_1A_2\big\{\cos[(\omega_1+\omega_2)t+\beta_1+\beta_2]
+\cos[(\omega_1-\omega_2)t+\beta_1-\beta_2]\big\}.
$$

$\beta_j$ 是正时间余弦写法的相位，与负时间形式对应的相位互为相反数。积化和差后，和频、差频项的系数均为 $A_1A_2$。前者在光学探测的时间平均中消失，后者则需结合曝光时间判断。

以曝光时间 $\tau$、中心时刻 $t_0$ 平均：

$$
\frac1\tau\int_{t_0-\tau/2}^{t_0+\tau/2}\cos(\Delta\phi-\Delta\omega t)\,dt
$$

$$
=\operatorname{sinc}\!\left(\frac{\Delta\omega\tau}{2}\right)\cos(\Delta\phi-\Delta\omega t_0),\qquad \operatorname{sinc}x=\frac{\sin x}{x}.
$$

当 $|\Delta\omega|\tau\gg1$ 时，曝光平均覆盖许多个差频周期，交叉项趋于零。频差小、曝光短时，探测器可以记录拍频或移动条纹。异频波长期平均后没有稳定交叉项，描述的是这一时间尺度下的观测结果。

相位差与路程差的衔接：同一频率、两路径的相位差可写

$$
\delta=k_0\Delta\mathcal L+\Delta\phi_{\rm source}+\Delta\phi_{\rm interface},\qquad k_0=\frac{2\pi}{\lambda_0},\quad \mathcal L=\int n\,ds.
$$

其中 $\Delta\phi_{\rm interface}$ 来自各路径上的界面作用，反射附加相位由具体界面条件决定；光程差、源初相位和界面相位共同决定条纹位置。

## 10. 光的本性：波动描述与光子描述怎样接上

来源：B 第 38至44 页；T3 §3.6 的光学史分节。

### 10.1 三次认识推进分别解决了什么问题

早期争论集中于光如何传播。惠更斯用波前作图解释传播，牛顿用机械微粒描述光的运动。格里马迪的衍射观察、薄膜色彩、杨在 1801 年的干涉实验，以及菲涅耳的衍射理论，逐渐确立了波动叠加的证据。泊松从菲涅耳理论推出圆盘阴影中心亮斑，阿拉果用实验验证了这个预测。偏振现象进一步揭示光的横波自由度；早期将光视作机械波、纵波或依赖以太的设想，仍需解释波动所对应的物理量。

电磁理论给出了这种物理量。麦克斯韦在 1873 年《电磁学通论》中建立的场方程把波速与电磁常数联系起来，计算值与测得光速相近；赫兹 1887 年的实验验证了电磁波性质。光的振动由电场和磁场描述，光学由此纳入电磁学。Maxwell 和 Lorentz 时期仍保留过以太观念，相对论与相关实验才使现代电磁传播摆脱对机械以太的依赖。其中迈克尔逊 1881 年的尝试与迈克尔逊、莫雷 1887 年的联合实验是两次不同实验。

量子理论继续解释光与物质的能量交换。普朗克在 1900 年引入能量交换量子化，爱因斯坦在 1905 年以光量子解释光电效应，康普顿散射则把光子的能量和动量一起纳入守恒。经典场理论继续描述适用条件下的传播、干涉和衍射；量子理论给出离散能量交换的规律。历史上所说的机械“波”和机械“微粒”，因而分别发展为电磁场与光子的现代概念。

### 10.2 用折射速度预测检验波动说：一个几何推导

惠更斯构造给出波前在界面两侧的几何关系，对应 T3 §3.6 的反射、折射思考题。取静止平界面，两侧相速度为 $v_1,v_2$，入射角 $i$、折射角 $r$ 均相对法线测量，考虑存在传播折射光的情况。

在同一个入射波前上选 A、B 两点，使 A 先到界面；经过 $\Delta t$，从 B 出发的波到达界面上的 C。于是 $BC=v_1\Delta t$。同期，A 在介质 2 中发出的子波半径为 $AD=v_2\Delta t$；由 C 向该子波作切线 CD，CD 为新波前，AD 垂直 CD。两个直角三角形给出

$$
\sin i=\frac{BC}{AC}=\frac{v_1\Delta t}{AC},\qquad
\sin r=\frac{AD}{AC}=\frac{v_2\Delta t}{AC}.
$$

因此

$$
\boxed{\frac{\sin i}{\sin r}=\frac{v_1}{v_2}=\frac{n_2}{n_1}},\qquad
\boxed{n_1\sin i=n_2\sin r}.
$$

反射波在原介质中传播，子波速度与入射波相同，相同几何给出反射角等于入射角。这一构造确定方向和波前，反射、透射的振幅及偏振比例还需使用电磁边界条件。

经典机械微粒模型给出不同的速度预测。若界面只沿法向施力、切向动量守恒，且粒子质量不变，则 $v_1\sin i=v_2\sin r$，即 $\sin i/\sin r=v_2/v_1$。为拟合同一折射角，该模型要求光密介质中微粒更快；波动模型要求其更慢。傅科等测出光在水中的速度低于空气中的速度，从而支持了波动解释。光速测量因此能够区分两种产生相同几何折射角的物理模型。

### 10.3 波动量与光子量的统一联系

光的波动描述以频率、波矢和相位组织传播规律，光子描述以能量、动量和角动量组织量子交换。单光子吸收、发射和计数等现象需要量子理论；在适当条件下，大量传播与干涉现象可由经典电磁场计算。

真空中的关键连接式为

$$
\boxed{\omega=2\pi\nu,\quad k=2\pi/\lambda_0,\quad c=\lambda_0\nu},
$$

$$
\boxed{E_\gamma=h\nu=\hbar\omega},\qquad
\boxed{p_\gamma=\frac{E_\gamma}{c}=\frac h{\lambda_0}=\hbar k},\qquad \hbar=\frac h{2\pi}.
$$

普朗克常数把两组量联系起来，对应 B 第 44 页的关系图：普通频率乘 $h$，角频率乘 $\hbar$。这里的 $p=E/c$ 是真空光子动量关系，介质中的动量还涉及物质响应。光子属于玻色子，也可具有自旋与轨道角动量。

## 11. 四道综合自测与详解

用下面四题检查复数约定、传播几何、能量和干涉条件能否连贯运用。每题后附计算过程与原题对应。

### 自测 1：复数约定、方向与初相位

已知实际波

$$
U(x,t)=4\cos(10\pi t-2\pi x+\pi/3),
$$

其中 $x$ 以 m、$t$ 以 s 计。按本章约定写出复数波函数，求 $\nu,\lambda,v_p$ 和传播方向，并求 $U(0,0)$。若把初相位增大 $\pi/2$，固定时刻波形如何移动？

解：用余弦偶性先整理为

$$
U=4\cos(2\pi x-10\pi t-\pi/3),\qquad
\widetilde U=4e^{-i\pi/3}e^{i(2\pi x-10\pi t)}.
$$

因此 $k=2\pi\ \mathrm{rad/m}$，$\omega=10\pi\ \mathrm{rad/s}$，$\nu=5\ \mathrm{Hz}$，$\lambda=1\ \mathrm m$，$v_p=5\ \mathrm{m/s}$，沿 $+x$ 传播。代入得 $U(0,0)=4\cos(-\pi/3)=2$。

如果增大的是统一约定下的初相位 $\phi_0$，则 $\Delta x=-\Delta\phi_0/k=-1/4\ \mathrm m$，波形向左移 0.25 m。如果增大的是题干原式中的 $+\pi/3$ 那个相位，统一约定下反而减少 $\pi/2$，波形向右移 0.25 m。答题需明确所改变的相位属于哪个表达式。

固定位置的复向量以 $-10\pi$ rad/s 顺时针转，实部投影给出实际振动。对应 Q 习题 1至3 与思考 1至2。

### 自测 2：斜向平面电磁波、磁场和能流

真空中设

$$
\widetilde{\mathbf E}=100\hat{\mathbf x}\exp\!\left\{i\left[k\left(-\frac35y+\frac45z\right)-\omega t\right]\right\}\ \mathrm{V/m},\qquad \omega=ck.
$$

求波矢、等相位面、复磁场、平均光强及平均能流方向。若 $\lambda_0=600\ \mathrm{nm}$，求频率。

解：读出

$$
\hat{\mathbf k}=(0,-3/5,4/5),\qquad \mathbf k=k\hat{\mathbf k},\qquad k=2\pi/\lambda_0.
$$

固定时刻等相位面满足 $-3y/5+4z/5=\text{常数}$。$\mathbf k\cdot\hat{\mathbf x}=0$，满足横波要求。

由叉乘计算磁场方向：

$$
\hat{\mathbf k}\times\hat{\mathbf x}=\frac45\hat{\mathbf y}+\frac35\hat{\mathbf z}.
$$

令公共指数为 $e^{i\Theta}$，有

$$
\widetilde{\mathbf B}=\frac{100}{c}\left(\frac45\hat{\mathbf y}+\frac35\hat{\mathbf z}\right)e^{i\Theta}\ \mathrm T,
$$

$$
\widetilde{\mathbf H}=\frac{100}{Z_0}\left(\frac45\hat{\mathbf y}+\frac35\hat{\mathbf z}\right)e^{i\Theta}\ \mathrm{A/m}.
$$

平均光强

$$
I=\frac{100^2}{2Z_0}\simeq13.27\ \mathrm{W/m^2},\qquad
\langle\mathbf S\rangle=13.27\left(-\frac35\hat{\mathbf y}+\frac45\hat{\mathbf z}\right)\ \mathrm{W/m^2}.
$$

频率为 $\nu=c/\lambda_0\simeq5.00\times10^{14}\ \mathrm{Hz}$。题中的 $100$ 是峰值，周期平均带来系数 $1/2$。对应 Q 习题 5、7，B 第 28至33 页。

### 自测 3：球面波和柱面波的几何衰减

采用各向同性标量辐射模型，观测点处于电磁远区，局部近似线偏振平面波，所求电场为等效局部场峰值。一个理想点源在真空中发射总功率 $P=4\pi\ \mathrm W$，无吸收。求 $r=1\ \mathrm m$ 和 $r=2\ \mathrm m$ 的强度及电场峰值，并写出会聚球面波的相位形式。另有柱面波，$\rho$ 从 1 m 增至 4 m 时，强度与振幅分别变为原来的多少？

解：由球面功率守恒

$$
I(r)=\frac P{4\pi r^2}=\frac1{r^2}\ \mathrm{W/m^2}.
$$

所以 $I(1)=1\ \mathrm{W/m^2}$，$I(2)=0.25\ \mathrm{W/m^2}$。由 $I=E_0^2/(2Z_0)$ 得

$$
E_0(1)=\sqrt{2Z_0}\simeq27.45\ \mathrm{V/m},\qquad E_0(2)\simeq13.72\ \mathrm{V/m}.
$$

强度变为 $1/4$、振幅变为 $1/2$，两球面上的总功率相同。会聚形式可写

$$
\widetilde\psi_{\rm in}=\frac{\widetilde A}{r}e^{i(-kr-\omega t)},
$$

恒相位推出 $dr/dt=-\omega/k<0$，方向朝原点。

柱面波远场有 $I\propto1/\rho$，$A\propto1/\sqrt\rho$，所以距离增至四倍时强度为原来的 $1/4$、振幅为原来的 $1/2$。该柱面简谐形式还需满足 $k\rho\gg1$。对应 Q 习题 6、8 与思考 5。

<a id="自测-4-合振幅与干涉条件不能混为一谈"></a>

### 自测 4：合振幅、偏振与拍频

（a）同频同方向两振动振幅分别为 2、3，求相位差 $0$、$\pi$、$\pi/2$ 时合振幅。

（b）两束平行偏振、稳定同频光各有 $I_0$，求相位差 $\pi/2$ 和 $\pi$ 时强度。若改为正交偏振，强度如何？

（c）两束平行偏振光的频差为 1 kHz，探测器曝光 $\tau=1\ \mathrm{ms}$。理想匀幅情况下，这段曝光内拍频交叉项的平均系数是多少？是否能据此说两束光永远没有干涉？

解：（a）使用场振幅相量公式：

$$
A(0)=5,\qquad A(\pi)=1,\qquad A(\pi/2)=\sqrt{13}.
$$

只有等幅且反相才完全抵消。如果两相量都为 $A_0$ 且相差 $\pi/2$，则是 $\sqrt2A_0$，对应 Q 习题 4 的几何直角三角形。

（b）$I=2I_0(1+\cos\delta)$，故 $I(\pi/2)=2I_0$、$I(\pi)=0$。第一种情况下该点的干涉项恰好为零，仍然可以是完全相干的光。正交偏振使方向内积为零，因此在不加检偏器时 $I=2I_0$，与相位差无关。

（c）$\Delta\omega=2\pi\times10^3\ \mathrm{rad/s}$，故

$$
\frac{\Delta\omega\tau}{2}=\pi,\qquad \operatorname{sinc}(\pi)=0.
$$

曝光恰好覆盖一个拍频周期，平均交叉项为零。缩短曝光并使用有足够带宽的探测器，仍可记录差频变化；这里消失的是该次曝光的平均交叉项。异频相量之间的夹角随时间变化，合场需保留各自的时间因子。对应 Q 习题 9至10、思考 6至7，B 第 36 页。

## 12. 复习时应能独立完成的推导

遮住正文，尝试独立完成以下推导，并说明所用条件：

- 由 $f(x-vt)$ 的链式求导得到一维波动方程，并用等相位点判断传播方向。
- 在 $e^{-i\omega t}$ 约定下写出复振幅、相位换算与算符替换。
- 由 $\mathbf k\cdot\mathbf r=\text{常数}$ 解释平面波，并把斜向相位读成波矢分量。
- 区分普通空间频率 $f_s$ 与传播数 $k$，从沿任意方向的相位差推出 $d=\lambda/|\cos\vartheta|$，不把截线周期当成波长投影。
- 用 $u=r\psi$ 推出球面波 $1/r$；用能量几何扩散解释球、柱振幅规律及柱面远场条件。
- 从线性微分方程和复数模平方分别推出叠加原理与合振幅公式。
- 说明一般波形的简谐分解、有限持续时间的频宽与准单色近似，并区分时间频谱和空间角谱。
- 从旋度的旋度推导电磁波动方程，再回代散度式和法拉第式求横波关系与 $\mathbf B$。
- 从坡印廷矢量平均推出 $I=E_0^2/(2Z)$，并识别峰值、均方根与复场二次量。
- 从电场内积解释干涉项、偏振重叠、相位稳定和有限曝光条件。

## 13. 与现有电动力学资料互相参照

以下电动力学笔记可与对应推导一起阅读，在 Obsidian 中按链接打开：

- [平面电磁波](optics-electrodynamics.html)：对应本章 §4、§7，从麦氏方程到色散关系；沿用同一负时间因子。
- [平面波的横波性与能流](optics-electrodynamics.html)：对应 §8至9，回代约束、波阻抗、复坡印廷矢量和能量均分。
- [介质中的麦克斯韦方程组](optics-electrodynamics.html)：对应 §7，区分自由源、极化与四个场量。
- [电磁场能量守恒与坡印廷定理](optics-electrodynamics.html)：对应 §9，积分守恒与局部能流。
- [电磁波的偏振](optics-electrodynamics.html)：对应 §8，进一步复习线、圆、椭圆偏振的矢量表示。

## 来源文件

- [T2：第二章 波动](optics-sources.html)：§2.1 一维波函数与波动方程；§2.2.1至2.2.2 参数、相位与相速度；§2.2.3至2.2.4 复表示与相矢量；§2.3.1至2.3.3 三种波面。
- [T3：第三章 光的基本性质](optics-sources.html)：§3.1 Maxwell 与波动方程；§3.2 平面光波及空间频率几何；§3.3 能量与辐射通量；§3.4 线性叠加；§3.5 干涉；§3.6 光的本性。

- [A：光学202609-波动.pdf](optics-sources.html)：5至18 页为本章一维波动的直接来源；1至3 页为课程框架回顾。
- [B：光学20260921_波动.pdf](optics-sources.html)：2至18 页为复数表示、重要波形与叠加；21至37 页为电磁理论、性质、能流与干涉；38至44 页为光的本性。
- [Q：光学第二章习题与思考题_(1).pdf](optics-exercises.html)：1至2 页全部 10 道习题和 7 道思考题的知识覆盖见各节与自测对应。

课件页码、教材式号与订正记录见 [课件覆盖与来源](optics-sources.html)。

教材公式与课件页码见[资料来源与公式订正](optics-sources.html)。
