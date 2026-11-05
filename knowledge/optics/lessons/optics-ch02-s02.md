# 2.2 简谐波、复数表示与相量

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 本章的复数约定

对应 W2 第2—4页、第27—29页。负时间因子用于统一本章推导；它与课件正时间形式的换算属于必要的符号衔接。

物理场取复数场的实部：

$$
\psi(\mathbf r,t)=\operatorname{Re}\!\left\{\widetilde A\,e^{i(\mathbf k\cdot\mathbf r-\omega t)}\right\},\qquad \widetilde A=Ae^{i\phi_0}.
$$

$A$ 以及标量或线偏振波的 $E_0$、$H_0$ 表示峰值振幅。一般复向量同时包含分量的振幅和相位，其模平方是各分量复幅模平方之和，与实矢量瞬时模的最大值平方通常不同。波数的模 $k=|\mathbf k|\ge0$，方向由 $\mathbf k$ 给出；$\nu$ 表示频率，$v$ 表示波速。

W2 第 3 页、T2 式（2.40）至（2.41）和 T3 式（3.17）至（3.18）使用正时间因子。将 $e^{i(\omega t-kx+\varepsilon)}$ 换成本章形式，同一实波的初相位为 $\phi_0=-\varepsilon$。完整复表示随之共轭，包括偏振向量各分量的相位；微分算符的符号也同步改变。



## 简谐波：参数、相位与传播方向

本节要解决：给出一个余弦式，怎样同时读出它“多久振一次”“多远重复一次”和“向哪边传播”？先把总相位当作周期进度，再用固定位置与固定时刻两种观察方式分别读取时间、空间参数。

PPT主线：W2 第3—13页的相位、传播数与相速度。参数定义与完整推导补充：T2 §2.2.1至2.2.2，式（2.10）至（2.31）；T3 §3.2.3，式（3.35）。

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

### 2.2.1 由双重周期性统一各参数

PPT对应：W2 第3、10—11页的简谐形式和传播数。周期、普通空间频率及全部等价形式由 T2 §2.2.1—2.2.2 补充展开。

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

### 2.2.2 用相位的变化率定义相速度

PPT对应：W2 第5、11页；相位导数与初相位平移由 T2 §2.2.2 补充，群速度仅作 P2 第48—51页的跨课件衔接。

同相位点满足 $kx-\omega t+\phi_0=C$，微分得 $k\,dx-\omega\,dt=0$，所以

$$
\boxed{v_p=\frac{\omega}{k}=\lambda\nu}.
$$

两个位置或时刻的相位差为

$$
\Delta\phi=\mathbf k\cdot\Delta\mathbf r-\omega\Delta t.
$$

同一时刻、沿传播方向相距 $\lambda$，相位增加 $2\pi$；同一地点经过 $T$，本章约定下相位减少 $2\pi$。这两个符号均不影响波形周期。

![不同初相位对应的空间波形与相量方向](/optics/figures/waves-selfstudy-w2-p05-phase.png)

图1-2｜W2《光学20260921_波动.pdf》，PDF第5页，局部截取。观察每幅曲线在竖直坐标轴处的值，以及旁边红色相量相对实轴的转角：初相位每增加 $\pi/2$，同一空间曲线便平移四分之一波长。原页采用正弦及正时间因子，旁边箭头表示其相量约定；换成本章负时间余弦约定时应连同初相位一起换算。这里比较的是各初相位下的空间快照，不是不同波的振幅变化。

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

真空及理想无色散介质中的传播平面波，其相速度与能量传播速度一致。跨课件衔接（P2 第48—51页）：对色散波包，还需考察包络的群速度 $v_g=d\omega/dk$；相速度 $\omega/k$ 单独描述等相面的运动，不能据此确定一般信号的传播速度。

短例题｜$\psi=2\cos(4\pi x-20\pi t+\pi/3)$，$x,t$ 分别用 m、s。直接识别 $k=4\pi\ \mathrm{rad/m}$、$\omega=20\pi\ \mathrm{rad/s}$，得到 $\lambda=0.50\ \mathrm m$、$\nu=10\ \mathrm{Hz}$、$v_p=5.0\ \mathrm{m/s}$，方向为 $+x$。固定时刻沿 $+x$ 走 $0.125\ \mathrm m$，相位增加 $\pi/2$。

自检：频率相同的光进入折射率更大的静止介质，$\nu,\lambda,k$ 分别怎样变化？同一瞬时场值相等是否就代表相位相同？

#### 自检答案：频率与相位的含义



界面静止、线性且参数不随时间变化时，频率 $\nu$ 保持；相速度减小，$\lambda=v/\nu$ 减小，$k=2\pi/\lambda$ 增大。余弦的相同场值可对应 $\phi$ 与 $-\phi$ 两个阶段，还要结合变化方向判断是否同相。






## 复数表示与相量：为什么能用，何时要取实部

为什么要引入虚数？同频波的振幅与相位可以装进一个复数，微分、叠加便转为代数运算。实际场仍由实部给出；遇到光强这样的平方量，则按本节的共轭平均关系计算。

PPT主线：W2 第2—8页。教材与习题补充：T2 §2.2.3至2.2.4，式（2.32）至（2.41）；Q 第 1 页习题 1至4、第 2 页思考 1至3、7。

### 2.2.3 复数的基本工具

PPT对应：W2 第2—3页，第8页回顾；共轭、模和欧拉式在此逐项解释。

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

### 从实波到复波

PPT对应：W2 第3—4页；微分算符替换属于后续电磁推导衔接，例题来自 Q。

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

### 2.2.4 旋转相量和静止复振幅的区别

PPT对应：W2 第4—7页，第8页回顾。静止复振幅是把课件旋转相量提出公共时间因子后的写法。

固定位置处，复数 $\widetilde A e^{i\mathbf k\cdot\mathbf r}e^{-i\omega t}$ 在复平面上旋转。向量长度给出振幅，与实轴的夹角给出相位，实轴投影给出余弦场。负时间因子对应角速度 $-\omega$ 的顺时针转动，正时间因子 $e^{+i\omega t}$ 对应逆时针转动。

提出公共时间因子 $e^{-i\omega t}$，得到静止相量 $\widetilde\Psi(\mathbf r)=\widetilde A e^{i\mathbf k\cdot\mathbf r}$。同频波可以在这幅静止相量图中相加；异频波的相对夹角随时间变化，需保留各自的时间因子再求和。

![PPT中的复平面旋转相量及投影](/optics/figures/wave-w2-p04-phasor.png)

图源：《光学20260921_波动.pdf》，PDF第4页，局部截取。旋转相量的长度、相角和实虚轴投影。原图使用正时间因子，箭头逆时针旋转；本章负时间约定对应共轭旋转，实场按前述换算相同。

月相、四季可类比周期过程所处的阶段及阶段之间的差值。光波相位还依赖空间位置，是一个取模 $2\pi$ 的连续变量；月面的明暗比例并不对应波的振幅或能量。

相量小练习｜两个同频、同一方向的场在所选位置的复振幅为 $3$ 和 $4i$。它们相加为 $3+4i$，合振幅是 $5$，相位是 $\arctan(4/3)\approx53.13^\circ$。几何上是长为3和4的垂直相量相加；相量夹角 $\pi/2$ 描述时间相位差，两个场的实际振动方向仍可相同。

### 二次物理量的时间平均

教材/电动力学补充：为 W2 第33—34页平均能流作准备；以下共轭平均恒等式不在 W2 第2—8页中逐式给出。

一般而言 $\operatorname{Re}(ab)\ne(\operatorname{Re}a)(\operatorname{Re}b)$。对同频标量

$$
a(t)=\operatorname{Re}(a_0e^{-i\omega t}),\qquad b(t)=\operatorname{Re}(b_0e^{-i\omega t}),
$$

#### 详细推导：平均乘积中为何保留共轭项



展开

$$
a(t)b(t)=\frac14\left[a_0b_0e^{-2i\omega t}+a_0b_0^*+a_0^*b_0+a_0^*b_0^*e^{2i\omega t}\right].
$$






取一个完整周期或足够长时间平均，首尾项消失，故

$$
\boxed{\langle ab\rangle=\frac12\operatorname{Re}(a_0b_0^*)}.
$$

系数 $1/2$ 来自峰值振幅的周期平均。采用均方根相量时，这个系数已包含在振幅定义中。

平均量自检：若 $a=2\cos\omega t$、$b=3\cos(\omega t+\pi/3)$，先求各自平均再相乘，与先相乘再平均是否相同？

#### 自检答案：线性运算与二次量



各自周期平均均为零，乘积平均却是 $\langle ab\rangle=(2\times3/2)\cos(\pi/3)=1.5$。复数运算保留相位，计算此类二次量时要使用共轭与 $1/2$ 因子。






## 本节课件定位

光学20260921_波动.pdf P1、光学20260921_波动.pdf P2、光学20260921_波动.pdf P3、光学20260921_波动.pdf P4、光学20260921_波动.pdf P5、光学20260921_波动.pdf P6、光学20260921_波动.pdf P7、光学20260921_波动.pdf P8。
