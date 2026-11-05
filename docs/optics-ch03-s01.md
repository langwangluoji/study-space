---
title: "3.1 光的波动性与电磁理论"
outline: [2, 3]
prev: {"text": "2.4 波的叠加原理", "link": "/optics-ch02-s04.html"}
next: {"text": "3.2 光的本性与波粒二象性", "link": "/optics-ch03-s02.html"}
---

<a id="ppt-2-19"></a>
<a id="ppt-2-34"></a>
<a id="ppt-2-35"></a>
<a id="ppt-2-36"></a>
<a id="ppt-2-37"></a>

# 3.1 光的波动性与电磁理论

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 麦克斯韦方程如何推出光的波动方程

本节的问题是：电磁场为什么能自行传播，波速又由谁决定？先保留完整的源与本构关系，再在无源理想介质条件下得到常系数波动方程。读推导时重点追踪两处条件：散度为零，以及介质参数可从导数中提出。

PPT主线：W2 第20—26页。教材与电动力学推导补充：T3 §3.1.1至3.1.2，式（3.1）至（3.15）；与电动力学笔记《介质中的麦克斯韦方程组》《平面电磁波》结合。

W2 第20页先提出五个问题：光波遵守什么规律、满足什么方程、有什么性质、用哪些参数描述、怎样传递能量。§7回答场方程，§8回答横波与场间关系，§9回答能量和叠加观测；相位、频率与传播数已在§2—4定义。

<a id="ppt-2-20"></a>
<a id="ppt-2-21"></a>
<a id="ppt-2-22"></a>
<a id="ppt-2-23"></a>

### 3.1.1 一般方程及符号

PPT对应：W2 第21—22页；四式的积分、微分形式及源量一并说明。

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

### 无源理想介质中的场方程

PPT对应：W2 第23—24页只取无自由源的真空。以下先写这个特例，再明确标识推广到理想介质时增加的条件。

真空无源区满足 $\rho_f=0$、$\mathbf J_f=0$，本构关系为 $\mathbf D=\varepsilon_0\mathbf E$、$\mathbf B=\mu_0\mathbf H$。

教材/电动力学推广：把范围扩展到均匀、各向同性、线性、无损且无色散的理想介质，写成 $\mathbf D=\varepsilon\mathbf E$、$\mathbf B=\mu\mathbf H$，其中 $\varepsilon,\mu$ 为正实常数。无源场方程随之化为

$$
\nabla\cdot\mathbf E=0,\quad \nabla\cdot\mathbf H=0,\quad
\nabla\times\mathbf E=-\mu\partial_t\mathbf H,\quad
\nabla\times\mathbf H=\varepsilon\partial_t\mathbf E.
$$

无源条件去掉自由电荷与自由电流，介质的极化和磁化仍包含在本构参数中。取 $\varepsilon=\varepsilon_0,\mu=\mu_0$，才得到真空特例。

<a id="ppt-2-24"></a>
<a id="ppt-2-25"></a>
<a id="ppt-2-26"></a>

### 3.1.2 电场方程的逐步推导

PPT对应：W2 第25—26页。按真空参数取值即为课件推导；保留一般常数 ε、μ 是上一小节标明的教材推广。

#### 详细推导：对旋度再取旋度消去磁场

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

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

</details>



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

教材补充：把平面波代入即得 $k^2=\mu\varepsilon\omega^2$。在普通透明、非磁介质的模型下

$$
n=\frac cv=\sqrt{\varepsilon_r\mu_r}\simeq\sqrt{\varepsilon_r},\qquad k=\frac{n\omega}{c}.
$$

非磁近似给出 $\mu_r\simeq1$。存在色散、吸收或各向异性时，本构参数的频率依赖、复数性质或张量性质需一并计入场方程。

短例题｜理想非磁介质取 $\varepsilon_r=4,\mu_r=1$，则 $v=c/2$、$n=2$。若真空波长为 $600\ \mathrm{nm}$，进入该静止介质后频率仍为 $c/(600\ \mathrm{nm})\approx5.00\times10^{14}\ \mathrm{Hz}$，介质波长为 $300\ \mathrm{nm}$。

条件自检：从 $\nabla\cdot\mathbf D=0$ 写成 $\nabla\cdot\mathbf E=0$，用到了什么？

#### 自检答案：本构关系中的条件

<details class="optics-derivation">
<summary>展开答案与解释</summary>

这里用到 $\mathbf D=\varepsilon\mathbf E$，且 $\varepsilon$ 是空间均匀的非零标量。若 $\varepsilon$ 随位置变化，散度还包含参数梯度项；各向异性介质中则用张量本构关系。把这些条件留在方程旁，才能判断常系数波动方程适用的范围。

</details>



## 平面光波的横波性、场间关系与偏振

给出传播方向和电场后，怎样确定磁场？散度方程先规定电磁场处在横截面，旋度方程再给出方向与幅度。用“$\hat{\mathbf k}$ 叉乘电场得到磁场”能同时记住这两层关系。

PPT主线：W2 第27—31页。教材补充：T3 §3.2.1至3.2.5，式（3.16）至（3.38）。 本节都针对无源、均匀、各向同性、无损的传播平面波；若无特别说明，$\varepsilon,\mu$ 为正实常数。

<a id="ppt-2-27"></a>
<a id="ppt-2-28"></a>
<a id="ppt-2-29"></a>
<a id="ppt-2-30"></a>
<a id="ppt-2-31"></a>

### 3.1.3 散度方程给出横波性

PPT对应：W2 第27—28页；各向异性介质的例外是 P2 第23—24页及电动力学的跨课件衔接。

设 $\widetilde{\mathbf E}=\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，$\mathbf E_0$ 可为复向量。代入散度式：

$$
\nabla\cdot\widetilde{\mathbf E}=i\mathbf k\cdot\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}=0.
$$

非零指数不影响等式，故

$$
\boxed{\mathbf k\cdot\mathbf E_0=0},\qquad \boxed{\mathbf k\cdot\mathbf B_0=0}.
$$

电、磁扰动都位于垂直 $\mathbf k$ 的平面内，形成横波。各向异性介质中，高斯定律给出 $\mathbf k\cdot\mathbf D=0$；由于 $\mathbf D$ 与 $\mathbf E$ 方向可以不同，$\mathbf E$ 可能带有沿波矢的分量。

### 旋度方程给出右手关系、阻抗与同步性

![真空平面电磁波的电场磁场波矢正交方向及同相振荡](/optics/figures/nov05-electromagnetic-transverse-p29.png)

《光学20260921_波动.pdf》PDF第29页（局部）。先用左侧三轴识别电场 E、磁场 H 和波矢 k，再在右侧波形中对照电、磁场的峰谷位置。真空行波满足 E⊥H、E⊥k、H⊥k，E×H 指向能流传播方向；同一位置的两场同相，并有 E₀=cB₀。此处为单一真空平面行波，各向异性介质或叠加场须重新检查这些关系。


PPT对应：W2 第29页的叉乘、场幅及同相关系。引入波阻抗 Z、推广到普通理想介质属于 T3 与电动力学补充。

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

方向与单位例题｜真空中波沿 $+z$ 传播，某时刻 $\mathbf E=300\hat{\mathbf x}\ \mathrm{V/m}$，则 $\mathbf B=(300/c)\hat{\mathbf y}\ \mathrm T\approx1.00\hat{\mathbf y}\ \mathrm{\mu T}$。先由 $\hat{\mathbf z}\times\hat{\mathbf x}=\hat{\mathbf y}$ 定方向，再由 $E=cB$ 求大小；$\mathbf E\times\mathbf B$ 指向 $+z$，可作第二次方向核对。

### 为什么把电场叫光矢量

PPT对应：W2 第30页；把电磁力之比写成不等式是对课件低速条件的明确化。

粒子受洛伦兹力 $\mathbf F=q(\mathbf E+\mathbf u\times\mathbf B)$。真空平面波有 $E=cB$，所以非相对论粒子满足

$$
\frac{|q\mathbf u\times\mathbf B|}{|q\mathbf E|}\le\frac uc\ll1.
$$

许多光与低速电子的相互作用由电场力主导，所以通常用电场表示光的振动方向，称其为光矢量。式中的 $\mathbf u$ 是受力粒子的速度，决定磁力相对于电力的量级。

两项合力的大小满足 $|\mathbf F|\le |q|E+|q|uB$，具体结果还取决于方向。电场与磁场的 SI 单位不同，对同一粒子的电、磁力才是可以直接比较的量。

### 横波允许偏振自由度

PPT对应：W2 第31页只给线偏振与振动面。圆、椭圆偏振以及两横向分量合成来自 P2 第35—37页；本节先作衔接，完整分类见传播II学习小节。

取传播沿 $z$，电场可有两个横向分量：

$$
E_x=A_x\cos(kz-\omega t+\phi_x),\qquad E_y=A_y\cos(kz-\omega t+\phi_y).
$$

固定位置观察电场端点轨迹：

- $\phi_y-\phi_x=0$ 或 $\pi$（或只有一个分量）时是直线，为线偏振；电矢量及 $\mathbf k$ 组成振动面。
- 两分量等幅且相差 $\pm\pi/2$ 时为圆；一般固定振幅与相差组合为椭圆。

横波的电矢量始终处在横截面内，可以沿固定直线振动，也可以在其中转动。平面波则按波前形状定义，允许线、圆和椭圆偏振。例如沿 $z$ 传播的 $\mathbf E_0=E_a(\hat{\mathbf x}+i\hat{\mathbf y})$，其实部有两个相差四分之一周期的分量，固定点电矢量转圆，波前仍为平面。实固定方向向量乘一个余弦的写法专门描述线偏振。

概念自检：沿 $z$ 传播的圆偏振光有不断转动的电矢量，它还满足横波性吗？$\mathbf E$、$\mathbf H$ 同相是否意味着它们同方向？

#### 自检答案：横截面与时间同步

<details class="optics-derivation">
<summary>展开答案与解释</summary>

圆偏振的电矢量始终在 $xy$ 横截面内，因此仍是横波。“同相”描述对应振动分量的时间同步，方向关系由叉乘给出；理想传播平面波中瞬时 $\mathbf E\perp\mathbf H$。

</details>



## 能流、光强与干涉的可观测条件

光探测器记录的量怎样由快速振动的电磁场产生？先从瞬时能流 $\mathbf S$ 取时间平均得到 $I$，再把合场代入。接着逐项检查交叉项能否在探测的时间和空间平均后保留。

PPT主线：W2 第32—37页。教材与电动力学推导补充：T3 §3.3至3.5，式（3.39）至（3.50）；与电动力学《电磁场能量守恒与坡印廷定理》《平面波的横波性与能流》结合。

<a id="ppt-2-32"></a>
<a id="ppt-2-33"></a>

### 3.1.4 坡印廷矢量为什么代表能量传播

PPT对应：W2 第32页给出 S＝E×H 与光线的能流意义；能量密度及局部守恒推导在下方标为教材/电动力学补充。

PPT主式为 $\mathbf S=\mathbf E\times\mathbf H$，单位 W/m²；方向给出能量传播方向。对真空传播平面波，能流与波矢同向。

#### 详细推导：教材/电动力学补充：能量密度、能量均分与坡印廷定理的完整推导

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

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

</details>



### 从瞬时能流推导平均光强

PPT对应：W2 第33页。峰值平均带来的 1/2 与辐射通量单位在主线中展开；一般复场和能量密度关系为补充。

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

#### 详细推导：教材/电动力学补充：复场平均能流与平均能量密度

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

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

</details>



辐射功率是 $\Phi=\int_\Sigma\langle\mathbf S\rangle\cdot d\mathbf a$，单位 W。若均匀平面波穿过面积 $\mathcal A$，其法向与传播方向夹角为 $\theta$，则 $\Phi=I\mathcal A\cos\theta$。入射到该表面的辐照度为 $\Phi/\mathcal A=I\cos\theta$。

曲面积分给出选定法向后的有向净通量。计算接收面的入射功率时取入射贡献的正值，单束光的辐照度为 $I_{\rm irr}=I|\hat{\mathbf k}\cdot\hat{\mathbf n}|$。从表面向外发出的功率除以面积，称辐射出射度；它与入射辐照度都用 W/m²，但分别统计出射和入射功率。多方向辐射需先对相应方向求和或积分，热辐射出射度与正文 02 的谱出射度、总出射度相衔接（T3 §3.3.2），使用时以各节的明确定义为准。

波动光学常把平均能流密度 $I$ 简称光强。光度学还按人眼响应加权，其中照度用 lx，发光强度用 cd；与本章能量量度的换算需要光谱及相应权重。

短例题｜真空线偏振平面波的峰值电场 $E_0=100\ \mathrm{V/m}$，平均光强为 $I=E_0^2/(2Z_0)\approx13.27\ \mathrm{W/m^2}$。若均匀照射面积 $1.0\ \mathrm{cm^2}$ 的垂直接收面，接收功率约为 $1.327\ \mathrm{mW}$。振幅翻倍时光强变为4倍；接收面倾斜时还须乘投影因子。

### 3.1.5 两束光的干涉项从何而来

PPT对应：W2 第34—35页。偏振内积、近轴条件和大夹角的能流处理是对课件标量公式的计算条件说明。

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

![两路光到达观察点后形成场平方交叉项](/optics/figures/waves-selfstudy-w2-p34-interference.png)

图1-4｜W2《光学20260921_波动.pdf》，PDF第34页，局部截取。右上 $S_1,S_2$ 到 $P$ 的两条线表示两路场在同一观察点相加；红式中的第三项随 $\varphi_2-\varphi_1$ 改变，蓝式把场幅平方换成光强。读图时比较第三项与前两项的量纲，并把偏振相同、同频和探测平均条件一并带入。交叉项在某个 $P$ 点为零可由 $\delta=\pi/2$ 引起，统计相干性须由场的相位关联判断。

短例题｜等强、平行偏振且相位稳定的两束光各有 $I_0$，相差0、$\pi/2$、$\pi$ 时分别得到 $4I_0$、$2I_0$、0。若保持相位关联而把偏振改成正交，直接平方探测得到 $2I_0$；共同检偏后的结果须对投影后的场重新计算。

![PPT中的正交电场合成矢量图](/optics/figures/wave-w2-p35-orthogonal-fields.png)

图源：《光学20260921_波动.pdf》，PDF第35页，局部截取。正交电场的矢量相加。图中勾股关系表示直接平方没有内积交叉项；它不单独判定两束光是否有统计相位关联。

平行偏振的 $\cos\alpha=1$，交叉项完整保留；正交偏振的内积为零，该检测方式下交叉项消失。即使如此，两束波仍可有确定的相位关系，通过同一检偏方向投影后能够恢复干涉。偏振重叠与统计相干性分别决定干涉项的不同因子。

大夹角光束的能流几何应从 $\mathbf S=(\mathbf E_1+\mathbf E_2)\times(\mathbf H_1+\mathbf H_2)$ 计算，再向探测面法向投影。上面的标量强度式采用共线或近轴条件。

### 稳定干涉需要的三个条件

PPT对应：W2 第35—37页，依次核对振动方向、频率与相位稳定。

稳定条纹要求交叉项在探测平均后保留。可分别考察偏振、频率与相位关联：

1. 偏振投影有非零重叠；正交振动的叉项为零。
2. 在探测曝光时间内，频差造成的相位漂移不能把交叉项平均掉；严格静止的单色干涉图样要求同频。
3. 相位差在观察时间内有稳定或可预测关联；若快速随机均匀变化，$\langle\cos\delta\rangle=0$，只剩 $I_1+I_2$。

独立光源即使中心频率相近，随机相位仍可能使长曝光交叉项消失。在相干场中，某点 $\delta=\pi/2$ 也会使该点的交叉项为零；相干性取决于场之间的关联，不能由一个位置的强度读数单独判定。

![稳定相位差与随机相位差对应的平均干涉项](/optics/figures/waves-selfstudy-w2-p37-phase-stability.png)

图1-5｜W2《光学20260921_波动.pdf》，PDF第37页，局部截取。比较下方“固定不变”和“随机变化”两行：前者保留含 $\cos\delta$ 的项，后者对应平均交叉项消失。这里“随机变化”取曝光内充分采样、使 $\langle\cos\delta\rangle=0$ 的情形；缓慢漂移或部分相干时，平均交叉项仍可能保留一部分。原页把照度与光强并列，本文计算按平均电磁能流密度定义 $I$，单位为 W/m²。

观测自检：①两束同频、平行偏振光是否必有稳定条纹？②一个点测得 $I=I_1+I_2$，能否判断两束光非相干？

#### 自检答案：从读数回到交叉项的因素

<details class="optics-derivation">
<summary>展开答案与解释</summary>

①还要有稳定相位关联，并使探测区域能够分辨条纹。②单点相位差恰为 $\pi/2$、偏振正交、快速随机相位平均等都会给出这一读数，应逐项核对偏振重叠与时空平均。即使时间相干，过大的像元覆盖多条明暗纹也可能使空间平均后的对比度降低。

</details>



### 为什么不同频率有时仍能看到拍频

跨课件衔接：P2 第44—52页明确讲光拍；W2 第36页只讲异频交叉项的长时间平均。曝光 sinc 因子为教材/探测计算补充；末尾光程关系衔接 P2 第5页。

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

时间尺度例题｜两频率差为 $1.0\ \mathrm{kHz}$，拍频周期为 $1.0\ \mathrm{ms}$。矩形曝光 $\tau=0.10\ \mathrm{ms}$ 时，交叉项保留因子为 $\operatorname{sinc}(\pi\times0.1)\approx0.984$；曝光恰为 $1.0\ \mathrm{ms}$ 时，覆盖一个完整差频周期，该理想模型的平均因子为0。能否记录拍频，由频差、相位关联与探测时间共同决定。

## 本节课件定位

光学20260921_波动.pdf P19、光学20260921_波动.pdf P20、光学20260921_波动.pdf P21、光学20260921_波动.pdf P22、光学20260921_波动.pdf P23、光学20260921_波动.pdf P24、光学20260921_波动.pdf P25、光学20260921_波动.pdf P26、光学20260921_波动.pdf P27、光学20260921_波动.pdf P28、光学20260921_波动.pdf P29、光学20260921_波动.pdf P30、光学20260921_波动.pdf P31、光学20260921_波动.pdf P32、光学20260921_波动.pdf P33、光学20260921_波动.pdf P34、光学20260921_波动.pdf P35、光学20260921_波动.pdf P36、光学20260921_波动.pdf P37。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
