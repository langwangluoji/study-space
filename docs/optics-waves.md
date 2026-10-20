---
title: "波动与光的电磁理论"
outline: [2, 3]
---


# 波动与光的电磁理论

> 本章按“波形如何传播 → 如何用复数计算 → 波前几何 → 线性叠加 → 麦克斯韦方程 → 横波与能量 → 干涉与光的本性”整理。来源缩写：**A**＝《光学202609-波动.pdf》（18 页）；**B**＝《光学20260921_波动.pdf》（44 页）；**Q**＝《光学第二章习题与思考题_(1).pdf》（2 页）。文中页码是 PDF 物理页码，从 1 开始。讲解顺序是复习组织方式，不代表教师划定的考试重点。

> **阅读提示**
> 物理场取复数场的实部：
>

$$
\psi(\mathbf r,t)=\operatorname{Re}\!\left\{\widetilde A\,e^{i(\mathbf k\cdot\mathbf r-\omega t)}\right\},\qquad \widetilde A=Ae^{i\phi_0}.
$$

> $A$ 及标量或线偏振情形的 $E_0$、$H_0$ 均表示**实振幅的峰值**，不是均方根值。一般复向量还编码分量间的相位；其模平方是分量复幅模平方之和，不必等于实矢量瞬时模的最大值平方。$k=|\mathbf k|\ge0$，传播方向放在向量 $\mathbf k$ 中。$\nu$ 为频率，$v$ 为波速，二者不要混淆。
> B 第 3 页使用 $e^{i(\omega t-kx+\varepsilon)}$；改成本章约定后同一实波对应 $\phi_0=-\varepsilon$。改变约定要同时变相位与微分算符符号。

## 1. 振动、波动与任意波形传播

**来源：A 第 1–18 页。** A 第 1–3 页回顾光学研究产生、传播、探测、相互作用与应用；几何、波动、矢量、量子光学对应不同层次的描述。本章从波动语言进入矢量电磁理论。

### 1.1 三个概念与两个方向

振动是某物理量在平衡状态附近随时间变化；波动是扰动或振动状态在空间的传播；波场是描述该扰动分布的空间区域及其场量。机械波中，质点通常在平衡位置附近振动，质点的位移速度不等于波的传播速度。光是电磁场传播，不需要把真空想象成有机械质点的弹性介质。

- **纵波**：扰动方向与传播方向平行，例如流体中的声波。
- **横波**：扰动方向与传播方向垂直，例如绳上的横向扰动、真空中的传播平面电磁波。

课件强调时空双重周期性，这是周期波、特别是简谐波的重要性质。**任意孤立脉冲也属于波，却不必在时间和空间上周期重复。** 波可以传输能量；驻波局部有振动，但平均净能流可为零，不能把“每种波在每处都有单向净能量输运”当作普遍定义。

### 1.2 从波形平移写出波函数

设 $t=0$ 时波形为 $f(x)$，以恒定正速率 $v$ 沿 $+x$ 方向保持形状传播。原先位于 $x_0$ 的波形特征，到 $t$ 时位于 $x=x_0+vt$，故 $x_0=x-vt$，于是

$$
\boxed{\psi(x,t)=f(x-vt)}.
$$

沿 $-x$ 传播则为 $g(x+vt)$，这里 $v>0$。一般解可同时包含两方向：

$$
\psi(x,t)=f(x-vt)+g(x+vt).
$$

课件的示例 $f(x)=1/(10x^2+1)$ 对应

$$
\psi(x,t)=\frac1{10(x-vt)^2+1},
$$

峰值位于 $x=vt$，宽度保持不变。另一种同义写法是 $F(t-x/v)$，其中 **$F$ 与 $f$ 是不同定义的函数**：令 $F(s)=f(-vs)$ 即可，不可只把自变量改掉而默认函数形式相同。

**判断方向最稳妥的方法**：令相位或波形的自变量为常数，再求特征点的位置随时间如何变化。例如 $x-vt=C\Rightarrow dx/dt=v>0$。

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

对 $g(x+vt)$ 也成立，且由于方程线性，两者之和仍成立。注意：一阶式 $\partial_t\psi=-v\partial_x\psi$ 只描述单向向右的刚性平移，**不能代替同时允许双向波的一般二阶波动方程**。

适用条件包括介质或系统在线性近似下具有恒定波速、波形传播没有显著色散或耗散。给定一个初始波形仍不足以确定双向波，二阶时间方程还需要初始变化率等条件。

## 2. 简谐波：参数、相位与传播方向

**来源：B 第 3–13 页；本节对 $T,\nu,\omega,\lambda,k$ 的集中定义是衔接补充。** 当前两份课件之间没有提供 2.2.1、2.2.2 的独立页面，不能把缺页假装成已读内容。

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
|$k$|角波数|rad/m，$k=2\pi/\lambda$|
|$\phi$|总相位|$\phi=kx-\omega t+\phi_0$|
|$\phi_0$|所选时空原点处的初相位|只在明确原点与约定后有意义|

同相位点满足 $kx-\omega t+\phi_0=C$，微分得 $k\,dx-\omega\,dt=0$，所以

$$
\boxed{v_p=\frac{\omega}{k}=\lambda\nu}.
$$

两个位置或时刻的相位差为

$$
\Delta\phi=\mathbf k\cdot\Delta\mathbf r-\omega\Delta t.
$$

同一时刻、沿传播方向相距 $\lambda$，相位增加 $2\pi$；同一地点经过 $T$，本章约定下相位减少 $2\pi$。这两个符号均不影响波形周期。

改变初相位 $\Delta\phi_0$，只改变相位参照和相对状态：一维固定时刻的波形平移 $\Delta x=-\Delta\phi_0/k$；固定位置的时间曲线延迟 $\Delta t=\Delta\phi_0/\omega$。相位并不等于瞬时位移：$\cos\phi=\cos(-\phi)$，同一位移可能对应不同的变化方向，必须结合相位或速度判断状态。

> **阅读提示**
> 相速度是等相位面的推进速度。对于本章真空波和理想无色散介质，它与能量传播速度一致。若联系电动力学中的色散波包，群速度为 $v_g=d\omega/dk$，不应普遍把 $\omega/k$ 当成信号或能量速度。这里不把群速度作为课件新增考点。

## 3. 复数表示与相量：为什么能用，何时要取实部

**来源：B 第 2–8 页；Q 第 1 页习题 1–4、第 2 页思考 1–3、7。**

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

### 3.2 从实波到复波

$$
\widetilde\psi=\widetilde A e^{i(kx-\omega t)},\quad \widetilde A=Ae^{i\phi_0},\quad
\psi=\operatorname{Re}\widetilde\psi.
$$

线性方程的系数若为实数，则 $\widetilde\psi$ 满足方程意味着其实部与虚部分别满足同一方程；求导和相加可在复数形式下完成，最后取所约定的实部即可。好处是把三角恒等变换化为代数：

$$
\partial_t\longrightarrow-i\omega,\qquad \nabla\longrightarrow i\mathbf k.
$$

虚部是与实部相差四分之一周期的另一正交分量，帮助编码幅度与相位。它不代表额外的“虚数电场”；但说它在数学上“没有任何意义”也不准确。

**例：课后题记号换算。** 若

$$
U(x,t)=A\cos[\omega(t-x/v)+\varphi_0],
$$

则直接沿课题的 $e^{+i\omega t}$ 约定可写 $Ae^{i[\omega(t-x/v)+\varphi_0]}$；在本资料统一约定下，利用余弦的偶性，应写

$$
\widetilde U=Ae^{i(kx-\omega t-\varphi_0)},\qquad k=\omega/v.
$$

两者互为共轭，实部相同。类似地，题给 $\widetilde U=5e^{i(\omega t+\pi/3)}$ 时，实际振动是 $5\cos(\omega t+\pi/3)$；统一改写为 $\operatorname{Re}\{5e^{-i\pi/3}e^{-i\omega t}\}$ 仍是同一振动。

### 3.3 旋转相量和静止复振幅的区别

固定位置上，$\widetilde A e^{i\mathbf k\cdot\mathbf r}e^{-i\omega t}$ 是复平面中的旋转向量：模为振幅，与实轴的夹角为相位，投影为实际余弦场。本章使用负时间因子，所以随时间以角速度 $-\omega$ **顺时针**转动；课件用 $e^{+i\omega t}$ 时为逆时针。

若把公共时间因子 $e^{-i\omega t}$ 提出，剩下的 $\widetilde\Psi(\mathbf r)=\widetilde A e^{i\mathbf k\cdot\mathbf r}$ 就是通常计算用的静止相量。**同频波才可以共同提出同一时间因子**，然后把静止相量相加。不同频率也可在每个时刻作复数求和，但相量之间的夹角会随时间变化，不能当成固定夹角的单频合成。

月相、四季等类比有助于理解“周期过程中的位置”和“相差一段周期”；局限是光波相位是连续数学变量，取模 $2\pi$，且有空间依赖，不能把月面明暗比例直接当成波的振幅或能量。

### 3.4 二次物理量不能直接把复数相乘后取实部

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

这个 $1/2$ 来自峰值振幅与余弦平方平均；如果改用均方根相量则没有该 $1/2$。本资料始终采用峰值约定。

## 4. 平面波：等相位面、波矢与三维方程

**来源：B 第 9–13、27 页；Q 第 1 页习题 5、7，第 2 页思考 4。**

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

这里 $\alpha,\beta,\gamma$ 是方向余弦，分别等于传播方向与三个坐标轴夹角的余弦，不是夹角本身。

课件的斜向例子

$$
\psi=A\cos\!\left[k(z\cos\theta-y\sin\theta)-\omega t\right]
$$

对应 $\mathbf k=k(0,-\sin\theta,\cos\theta)$。因此有 $y$ 方向的负分量，不能只看 $z$ 项便称其沿 $+z$ 传播。

### 4.2 相速度取波前法线方向

令 $s=\hat{\mathbf k}\cdot\mathbf r$，相位为 $ks-\omega t+\phi_0$。令其不变，得 $ds/dt=\omega/k$。若沿某坐标轴追踪波前与轴的交点，得到的 $\omega/k_x$ 是**交点速度**，不必等于真实沿法线的相速度，甚至可很大；这不代表信息超光速传播。

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

理想平面波横向无限宽、振幅处处相同，总能量通常无穷大，是局部近似模型。实验中可用位于透镜焦点附近的小光源和准直透镜，在有限口径、有限距离内得到近似平面波；距点源很远的小区域，球面波也近似平面波。真实光束仍有有限口径与衍射。

## 5. 球面波与柱面波：几何扩散如何决定振幅

**来源：B 第 14–15 页，已对原图核验；Q 第 1 页习题 6、8，第 2 页思考 5。** 下述波函数是标量模型；真实电磁辐射还可能具有方向图，不能把严格各向同性的标量球面波直接等同于任意真实天线的完整矢量场。

### 5.1 球面对称波：把三维方程化成一维

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

把时间因子去掉，其复振幅为 $\widetilde\Psi_{\rm out}=\widetilde A e^{ikr}/r$ 与 $\widetilde\Psi_{\rm in}=\widetilde A e^{-ikr}/r$。判断会聚方向：$-kr-\omega t=C$ 导致 $dr/dt=-\omega/k$。原点处的 $1/r$ 奇性意味着该表达式不描述有限尺寸源内部或聚焦点附近的全部真实细节。

**能量检验**：无吸收、稳态、各向同性时，通过任意同心球的功率相同：

$$
P=4\pi r^2I(r)=\text{常数}\Rightarrow I\propto r^{-2}\Rightarrow A(r)\propto r^{-1}.
$$

振幅减少来自能量分布到更大面积，不等于介质吸收。

### 5.2 柱面波：远场振幅为什么是 $1/\sqrt{\rho}$

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

> **阅读提示**
> B 第 15 页直接写 $A/\sqrt\rho$ 乘简谐相位。它是柱面波的**远场渐近形式**，不是在所有 $\rho$ 上精确满足柱对称波动方程的解。可检验：令 $F=\rho^{-1/2}e^{ik\rho}$，有
>

$$
F''+\rho^{-1}F'+k^2F=\frac{F}{4\rho^2}.
$$

> 与主项 $k^2F$ 相比，相对残差是 $1/[4(k\rho)^2]$。当 $k\rho\gg1$ 才可忽略。严格单色出射解正比于 $H_0^{(1)}(k\rho)e^{-i\omega t}$，其远场有 $e^{i(k\rho-\pi/4)}/\sqrt\rho$ 的形式，常数相位可并入 $\widetilde C$。Hankel 函数只用于解释近似，不要求额外记忆其特殊函数理论。

|几何模型|能流分散面积/单位长度周长|强度规律|振幅规律|
|---|---|---|---|
|理想平面波|不随传播距离增加|$I$ 恒定|$A$ 恒定|
|球面波|$4\pi r^2$|$I\propto1/r^2$|$A\propto1/r$|
|柱面波远场|$2\pi\rho$|$I\propto1/\rho$|$A\propto1/\sqrt\rho$|

## 6. 波的叠加：先加场，再求平方量

**来源：B 第 16–18 页；Q 第 1 页习题 4、9，第 2 页习题 10、思考 6–7。**

### 6.1 叠加来自线性方程

令 $L=\nabla^2-v^{-2}\partial_t^2$。若 $L\psi_1=L\psi_2=0$，由微分的线性性，

$$
L(c_1\psi_1+c_2\psi_2)=c_1L\psi_1+c_2L\psi_2=0.
$$

这就是线性叠加原理。还应满足同一物理系统和相容的初始/边界条件；若边界条件非齐次，应相应叠加其源或先分离特解。波相遇时扰动可以相加，但**能量和光强是场的二次量，通常不能直接相加**。

在普通弱光下，介质常可近似线性；强场时极化可能出现 $\mathbf P=\varepsilon_0(\chi^{(1)}\mathbf E+\chi^{(2)}:\mathbf E\mathbf E+\cdots)$，介质反馈不再线性，可能产生倍频等效应。此时不能直接把原来的两个解相加当成新解。此处用于回答课后关于非线性光学的思考，不展开非线性推导。

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

确定，不能只用普通反正切而忽略象限。若合振幅为零，则合相位没有确定意义。

- 同相 $\delta=0$：$A=A_1+A_2$。
- 反相 $\delta=\pi$：$A=|A_1-A_2|$；只有 $A_1=A_2$ 才完全抵消。
- 正交相量 $\delta=\pi/2$：$A=\sqrt{A_1^2+A_2^2}$；若两振幅均为 $A_0$，合振幅为 $\sqrt2A_0$。

课后题 $A_1=2$、$A_2=3$ 给出同相合振幅 $5$、反相合振幅 $1$。课件 $1.0$ 与 $0.8$ 反相时合振幅为 $0.2$，不是严格为零。

## 7. 麦克斯韦方程如何推出光的波动方程

**来源：B 第 21–26 页；与电动力学笔记《介质中的麦克斯韦方程组》《平面电磁波》结合。**

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

高斯公式和斯托克斯公式将积分形式转为微分形式，环路和法向应按右手规则取一致方向。**位移电流项** $\partial_t\mathbf D$ 使无传导电流的真空中，变化电场仍能与磁场耦合支持传播。

### 7.2 先列出能做化简的条件

课件主要讨论真空无源区：$\rho_f=0$、$\mathbf J_f=0$，$\mathbf D=\varepsilon_0\mathbf E$、$\mathbf B=\mu_0\mathbf H$。

为与电动力学结合，先在均匀、各向同性、线性、无损且无色散的理想介质中写成 $\mathbf D=\varepsilon\mathbf E$、$\mathbf B=\mu\mathbf H$，其中 $\varepsilon,\mu$ 是正实常数。此时

$$
\nabla\cdot\mathbf E=0,\quad \nabla\cdot\mathbf H=0,\quad
\nabla\times\mathbf E=-\mu\partial_t\mathbf H,\quad
\nabla\times\mathbf H=\varepsilon\partial_t\mathbf E.
$$

**“没有自由电荷与自由电流”不等于“没有物质”**，无源介质仍可有极化和磁化；只有再指定 $\varepsilon=\varepsilon_0,\mu=\mu_0$ 才是真空。

### 7.3 电场方程的逐步推导

第一步，对法拉第定律取旋度：

$$
\nabla\times(\nabla\times\mathbf E)=-\mu\partial_t(\nabla\times\mathbf H).
$$

第二步，左边用矢量恒等式

$$
\nabla\times(\nabla\times\mathbf E)=\nabla(\nabla\cdot\mathbf E)-\nabla^2\mathbf E=-\nabla^2\mathbf E.
$$

第三步，右边代入安培–麦克斯韦定律，得

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

每个笛卡尔分量，例如 $E_x$，都满足标量波动方程。但这只说明必要条件：还须回代原始四条麦氏方程，才能排除不满足横向约束与场间耦合关系的伪解。

把平面波代入即得 $k^2=\mu\varepsilon\omega^2$。在普通透明、非磁介质的模型下

$$
n=\frac cv=\sqrt{\varepsilon_r\mu_r}\simeq\sqrt{\varepsilon_r},\qquad k=\frac{n\omega}{c}.
$$

其中 $\mu_r\simeq1$ 是额外近似。色散、吸收、各向异性介质要返回更一般的本构关系；本章不把这些近似无条件推广。

## 8. 平面光波的横波性、场间关系与偏振

**来源：B 第 27–31 页。** 本节都针对无源、均匀、各向同性、无损的传播平面波；若无特别说明，$\varepsilon,\mu$ 为正实常数。

### 8.1 散度方程给出横波性

设 $\widetilde{\mathbf E}=\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，$\mathbf E_0$ 可为复向量。代入散度式：

$$
\nabla\cdot\widetilde{\mathbf E}=i\mathbf k\cdot\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}=0.
$$

非零指数不影响等式，故

$$
\boxed{\mathbf k\cdot\mathbf E_0=0},\qquad \boxed{\mathbf k\cdot\mathbf B_0=0}.
$$

电、磁扰动都在垂直 $\mathbf k$ 的平面内，所以是横波。各向异性时从高斯定律得到的是 $\mathbf k\cdot\mathbf D=0$，不保证 $\mathbf k\cdot\mathbf E=0$；不要越过本构条件直接下结论。

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

因为关系中没有额外复相位，线偏振理想平面波的电、磁振动同相，并有 $\mathbf E\perp\mathbf H$、$\mathbf E\times\mathbf H$ 沿 $\mathbf k$。瞬时场在每一时刻都满足相应叉乘关系。沿 $+z$ 传播、$\mathbf E$ 沿 $+x$ 的某时刻，$\mathbf B$ 应沿 $+y$；反向传播时磁场方向随之翻转。

记忆联系：$n$ 由 $\varepsilon\mu$ 决定，描述相位传播；$Z$ 由 $\mu/\varepsilon$ 决定，描述场幅比例。折射率相同并不自动意味着波阻抗也相同；界面振幅计算需要场的边界条件与阻抗。

### 8.3 为什么把电场叫光矢量

粒子受洛伦兹力 $\mathbf F=q(\mathbf E+\mathbf u\times\mathbf B)$。真空平面波有 $E=cB$，所以非相对论粒子满足

$$
\frac{|q\mathbf u\times\mathbf B|}{|q\mathbf E|}\le\frac uc\ll1.
$$

因此许多光与原子中低速电子的相互作用主要由电场项决定，常用电场描述光的振动方向，称它为光矢量。$\mathbf u$ 是粒子速度，不能拿波速 $c$ 代进去；磁场并未因此不存在。

### 8.4 横波允许偏振自由度

取传播沿 $z$，电场可有两个横向分量：

$$
E_x=A_x\cos(kz-\omega t+\phi_x),\qquad E_y=A_y\cos(kz-\omega t+\phi_y).
$$

固定位置观察电场端点轨迹：

- $\phi_y-\phi_x=0$ 或 $\pi$（或只有一个分量）时是直线，为线偏振；电矢量及 $\mathbf k$ 组成振动面。
- 两分量等幅且相差 $\pm\pi/2$ 时为圆；一般固定幅度与相差组合为椭圆。圆、椭圆用于说明“偏振态”概念，课件该页主要讲线偏振。

电磁波“横向”指始终在横截面内，不代表电矢量的方向必定固定。**课件第 31 页“方向始终不变”是线偏振的特征，不能推广到所有简谐平面光波。**

## 9. 能流、光强与干涉的可观测条件

**来源：B 第 32–37 页；与电动力学《电磁场能量守恒与坡印廷定理》《平面波的横波性与能流》结合。**

### 9.1 坡印廷矢量为什么代表能量传播

理想无色散介质的瞬时电磁能量密度

$$
u=\frac12\varepsilon\mathbf E^2+\frac12\mu\mathbf H^2.
$$

从恒等式 $\nabla\cdot(\mathbf E\times\mathbf H)=\mathbf H\cdot(\nabla\times\mathbf E)-\mathbf E\cdot(\nabla\times\mathbf H)$，代入麦氏方程，得

$$
\nabla\cdot(\mathbf E\times\mathbf H)=-\mu\mathbf H\cdot\partial_t\mathbf H-\varepsilon\mathbf E\cdot\partial_t\mathbf E-\mathbf J_f\cdot\mathbf E.
$$

前两项合并成 $-\partial_tu$，所以

$$
\boxed{\partial_tu+\nabla\cdot\mathbf S=-\mathbf J_f\cdot\mathbf E},\qquad
\boxed{\mathbf S=\mathbf E\times\mathbf H}.
$$

右侧是场对物质做功导致的能量损失；无源无耗散时为局部守恒。$\mathbf S$ 单位 W/m²。对本章普通理想平面波，能流沿波矢方向，光线可表示能量传播路径。各向异性介质中能流与波法线可能不同向。

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

对一般椭圆偏振 $|\mathbf E_0|^2=|E_{0x}|^2+|E_{0y}|^2$，同样有 $I=|\mathbf E_0|^2/(2Z)$；这里的复向量范数不应误认为电场矢量长度的瞬时峰值。

平均电、磁能密度相等：

$$
\bar u_E=\frac14\varepsilon E_0^2,\qquad \bar u_H=\frac14\mu H_0^2=\bar u_E,
$$

故 $\bar u=\varepsilon E_0^2/2$，并有

$$
\boxed{\langle\mathbf S\rangle=v\bar u\,\hat{\mathbf k}}.
$$

辐射功率是 $\Phi=\int_\Sigma\langle\mathbf S\rangle\cdot d\mathbf a$，单位 W。若均匀平面波穿过面积 $\mathcal A$，其法向与传播方向夹角为 $\theta$，则 $\Phi=I\mathcal A\cos\theta$。入射到该表面的辐照度为 $\Phi/\mathcal A=I\cos\theta$。

> **阅读提示**
> 本课程波动公式中的 $I$ 指辐射能流密度，单位 W/m²，通常简称光强。严格光度学中的照度单位为 lx、发光强度单位为 cd，还包含人眼响应权重；它们不能与本章 $I$ 无条件互换。

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

偏振平行时 $\cos\alpha=1$，得到课件的标量公式；偏振正交时内积为零，不出现这个检测方式下的干涉项。**正交偏振波仍可以具有确定相位关系**，所以不能把“正交而不显干涉”直接等同于两波在统计上毫无相干性；通过共同检偏方向投影后，干涉可恢复。

两波不同向且夹角很大时，应回到 $\mathbf S=(\mathbf E_1+\mathbf E_2)\times(\mathbf H_1+\mathbf H_2)$ 并指定探测面的法向，不应把上式当成任意几何下的精确矢量能流表达式。

### 9.4 稳定干涉需要的三个条件

课件用“同频、存在平行振动分量、相位差恒定”概括稳定条纹条件。准确理解为：

1. 偏振投影有非零重叠；正交振动的叉项为零。
2. 在探测曝光时间内，频差造成的相位漂移不能把交叉项平均掉；严格静止的单色干涉图样要求同频。
3. 相位差在观察时间内有稳定或可预测关联；若快速随机均匀变化，$\langle\cos\delta\rangle=0$，只剩 $I_1+I_2$。

“同频”本身并不保证干涉；独立光源即使中心频率相近，随机相位也可能使长曝光交叉项消失。同样，某点刚好 $\delta=\pi/2$ 使 $\cos\delta=0$，不代表整组光场就不相干。

### 9.5 为什么不同频率有时仍能看到拍频

**课件第 36 页的时间平均条件补充。** 对 $\Delta\omega=\omega_2-\omega_1$，慢交叉项形如 $\cos(\Delta\phi-\Delta\omega t)$；已经平均掉光学频率本身，但若探测器足够快，差频仍可保留。

以曝光时间 $\tau$、中心时刻 $t_0$ 平均：

$$
\frac1\tau\int_{t_0-\tau/2}^{t_0+\tau/2}\cos(\Delta\phi-\Delta\omega t)\,dt
$$

$$
=\operatorname{sinc}\!\left(\frac{\Delta\omega\tau}{2}\right)\cos(\Delta\phi-\Delta\omega t_0),\qquad \operatorname{sinc}x=\frac{\sin x}{x}.
$$

当 $|\Delta\omega|\tau\gg1$ 时交叉项趋于零；若频差小且曝光短，可看到随时间变化的拍频或移动条纹。因此“不同频率必然在任何观测下都没有交叉项”不成立；课件结论应放在长期平均、静止干涉图样语境理解。

**相位差与路程差的衔接**：同一频率、两路径的相位差可写

$$
\delta=k_0\Delta\mathcal L+\Delta\phi_{\rm source}+\Delta\phi_{\rm interface},\qquad k_0=\frac{2\pi}{\lambda_0},\quad \mathcal L=\int n\,ds.
$$

本式把本章相位语言连接到后续传播与界面问题；界面反射附加相位须根据相应条件计算，不能无条件加 $\pi$。

## 10. 光的本性：波动描述与光子描述怎样接上

**来源：B 第 38–44 页；第 44 页原图已核验。**

|课件历史链|其在本章的作用|
|---|---|
|惠更斯：波动学说与波前作图；牛顿：微粒说|引出历史上对光的传播机理的争论|
|杨 1801 年双缝、菲涅耳的波动理论|干涉衍射证据支持波动描述；早期纵波和以太假说是历史观点|
|麦克斯韦 1873 年《电磁学通论》、赫兹 1887 年实验|把光与电磁波统一，波速与真空电磁常数相连|
|普朗克 1900 年能量交换量子化、爱因斯坦 1905 年光量子|经典连续场的能量描述需要量子补充|
|康普顿效应、光子能量与动量|光与物质交换能量动量时显示量子特征|

现代认识不把光简单类比为小弹丸沿经典轨道运动，也不需要机械以太来传播。传播、相位与干涉可用经典电磁波很好地描述；涉及单光子吸收、发射和计数等现象时要使用量子理论。仅靠波粒二象性的口号不能推出具体实验结果。

真空中的关键连接式为

$$
\boxed{\omega=2\pi\nu,\quad k=2\pi/\lambda_0,\quad c=\lambda_0\nu},
$$

$$
\boxed{E_\gamma=h\nu=\hbar\omega},\qquad
\boxed{p_\gamma=\frac{E_\gamma}{c}=\frac h{\lambda_0}=\hbar k},\qquad \hbar=\frac h{2\pi}.
$$

这是 B 第 44 页图中“光速/频率/波长”与“能量/动量/角动量”经普朗克常数联系的数学表达。**不要把 $h\omega$ 当成光子能量，应是 $\hbar\omega$；真空 $p=E/c$ 也不要直接搬到介质动量问题。** 课件提到光子是玻色子并可有自旋与轨道角动量，本章只保留概念，后续相关章节再讨论产生与测量机制。

## 11. 四道综合自测与详解

以下题目按当前课件与 Q 的题型自行编制，用于查漏补缺，不表示教师命题范围。

### 自测 1：复数约定、方向与初相位

已知实际波

$$
U(x,t)=4\cos(10\pi t-2\pi x+\pi/3),
$$

其中 $x$ 以 m、$t$ 以 s 计。按本章约定写出复数波函数，求 $\nu,\lambda,v_p$ 和传播方向，并求 $U(0,0)$。若把初相位增大 $\pi/2$，固定时刻波形如何移动？

**解**：用余弦偶性先整理为

$$
U=4\cos(2\pi x-10\pi t-\pi/3),\qquad
\widetilde U=4e^{-i\pi/3}e^{i(2\pi x-10\pi t)}.
$$

因此 $k=2\pi\ \mathrm{rad/m}$，$\omega=10\pi\ \mathrm{rad/s}$，$\nu=5\ \mathrm{Hz}$，$\lambda=1\ \mathrm m$，$v_p=5\ \mathrm{m/s}$，沿 $+x$ 传播。代入得 $U(0,0)=4\cos(-\pi/3)=2$。

如果增大的是**统一约定下的初相位** $\phi_0$，则 $\Delta x=-\Delta\phi_0/k=-1/4\ \mathrm m$，波形向左移 0.25 m。如果增大的是题干原式中的 $+\pi/3$ 那个相位，统一约定下反而减少 $\pi/2$，波形向右移 0.25 m。答题需明确所改变的相位属于哪个表达式。

固定位置的复向量以 $-10\pi$ rad/s 顺时针转；实部投影才是实际振动。此题对应 Q 习题 1–3 与思考 1–2。

### 自测 2：斜向平面电磁波、磁场和能流

真空中设

$$
\widetilde{\mathbf E}=100\hat{\mathbf x}\exp\!\left\{i\left[k\left(-\frac35y+\frac45z\right)-\omega t\right]\right\}\ \mathrm{V/m},\qquad \omega=ck.
$$

求波矢、等相位面、复磁场、平均光强及平均能流方向。若 $\lambda_0=600\ \mathrm{nm}$，求频率。

**解**：读出

$$
\hat{\mathbf k}=(0,-3/5,4/5),\qquad \mathbf k=k\hat{\mathbf k},\qquad k=2\pi/\lambda_0.
$$

固定时刻等相位面满足 $-3y/5+4z/5=\text{常数}$。$\mathbf k\cdot\hat{\mathbf x}=0$，满足横波要求。

用叉乘，不凭图猜方向：

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

频率 $\nu=c/\lambda_0\simeq5.00\times10^{14}\ \mathrm{Hz}$。这里 $100$ 是峰值，若漏掉 $1/2$，强度会算成两倍。对应 Q 习题 5、7，并整合 B 第 28–33 页。

### 自测 3：球面波和柱面波的几何衰减

采用各向同性标量辐射模型，观测点处于电磁远区，局部近似线偏振平面波，所求电场为等效局部场峰值。一个理想点源在真空中发射总功率 $P=4\pi\ \mathrm W$，无吸收。求 $r=1\ \mathrm m$ 和 $r=2\ \mathrm m$ 的强度及电场峰值，并写出会聚球面波的相位形式。另有柱面波，$\rho$ 从 1 m 增至 4 m 时，强度与振幅分别变为原来的多少？

**解**：由球面功率守恒

$$
I(r)=\frac P{4\pi r^2}=\frac1{r^2}\ \mathrm{W/m^2}.
$$

所以 $I(1)=1\ \mathrm{W/m^2}$，$I(2)=0.25\ \mathrm{W/m^2}$。由 $I=E_0^2/(2Z_0)$ 得

$$
E_0(1)=\sqrt{2Z_0}\simeq27.45\ \mathrm{V/m},\qquad E_0(2)\simeq13.72\ \mathrm{V/m}.
$$

强度变为 $1/4$，振幅变为 $1/2$；能量并未因几何扩散消失。会聚形式可写

$$
\widetilde\psi_{\rm in}=\frac{\widetilde A}{r}e^{i(-kr-\omega t)},
$$

恒相位推出 $dr/dt=-\omega/k<0$，方向朝原点。

柱面波远场有 $I\propto1/\rho$，$A\propto1/\sqrt\rho$，所以距离增至四倍时强度为原来的 $1/4$、振幅为原来的 $1/2$。该柱面简谐形式还需满足 $k\rho\gg1$。对应 Q 习题 6、8 与思考 5。

### 自测 4：合振幅与干涉条件不能混为一谈

（a）同频同方向两振动振幅分别为 2、3，求相位差 $0$、$\pi$、$\pi/2$ 时合振幅。

（b）两束平行偏振、稳定同频光各有 $I_0$，求相位差 $\pi/2$ 和 $\pi$ 时强度。若改为正交偏振，强度如何？

（c）两束平行偏振光的频差为 1 kHz，探测器曝光 $\tau=1\ \mathrm{ms}$。理想匀幅情况下，这段曝光内拍频交叉项的平均系数是多少？是否能据此说两束光永远没有干涉？

**解**：（a）使用场振幅相量公式：

$$
A(0)=5,\qquad A(\pi)=1,\qquad A(\pi/2)=\sqrt{13}.
$$

只有等幅且反相才完全抵消。如果两相量都为 $A_0$ 且相差 $\pi/2$，则是 $\sqrt2A_0$，对应 Q 习题 4 的几何直角三角形。

（b）$I=2I_0(1+\cos\delta)$，故 $I(\pi/2)=2I_0$、$I(\pi)=0$。第一种情况下该点的干涉项恰好为零，仍然可以是完全相干的光。正交偏振使方向内积为零，因此在不加检偏器时 $I=2I_0$，与相位差无关。

（c）$\Delta\omega=2\pi\times10^3\ \mathrm{rad/s}$，故

$$
\frac{\Delta\omega\tau}{2}=\pi,\qquad \operatorname{sinc}(\pi)=0.
$$

曝光恰好覆盖一个拍频周期，平均交叉项为零。更短曝光、适当带宽的快速探测器仍能观测差频变化，不能把一次曝光平均为零解释为任何时间尺度下都没有相位关联。不同频率也不能用夹角固定的静止相量合成为单一简谐波。对应 Q 习题 9–10、思考 6–7，并补足 B 第 36 页条件。

## 12. 复习时应能独立完成的推导

这一列表是学习检查，不是考试预测：

- 由 $f(x-vt)$ 的链式求导得到一维波动方程，并用等相位点判断传播方向。
- 在 $e^{-i\omega t}$ 约定下写出复振幅、相位换算与算符替换。
- 由 $\mathbf k\cdot\mathbf r=\text{常数}$ 解释平面波，并把斜向相位读成波矢分量。
- 用 $u=r\psi$ 推出球面波 $1/r$；用能量几何扩散解释球、柱振幅规律及柱面远场条件。
- 从线性微分方程和复数模平方分别推出叠加原理与合振幅公式。
- 从旋度的旋度推导电磁波动方程，再回代散度式和法拉第式求横波关系与 $\mathbf B$。
- 从坡印廷矢量平均推出 $I=E_0^2/(2Z)$，并识别峰值、均方根与复场二次量。
- 从电场内积解释干涉项、偏振重叠、相位稳定和有限曝光条件。

## 13. 与现有电动力学资料互相参照

下列为现有电动力学笔记的对应主题。网站链接进入本资料的电动力学关联说明；本地 Obsidian 版保留原笔记链接。

- [平面电磁波](optics-electrodynamics.html)：对应本章 §4、§7，从麦氏方程到色散关系；沿用同一负时间因子。
- [平面波的横波性与能流](optics-electrodynamics.html)：对应 §8–9，回代约束、波阻抗、复坡印廷矢量和能量均分。
- [介质中的麦克斯韦方程组](optics-electrodynamics.html)：对应 §7，区分自由源、极化与四个场量。
- [电磁场能量守恒与坡印廷定理](optics-electrodynamics.html)：对应 §9，积分守恒与局部能流。
- [电磁波的偏振](optics-electrodynamics.html)：对应 §8，进一步复习线、圆、椭圆偏振的矢量表示。

## 来源文件

- [A：光学202609-波动.pdf](optics-sources.html)：5–18 页为本章一维波动的直接来源；1–3 页为课程框架回顾。
- [B：光学20260921_波动.pdf](optics-sources.html)：2–18 页为复数表示、重要波形与叠加；21–37 页为电磁理论、性质、能流与干涉；38–44 页为光的本性。
- [Q：光学第二章习题与思考题_(1).pdf](<optics-exercises.html>)：1–2 页全部 10 道习题和 7 道思考题的知识覆盖见各节与自测对应。

课件覆盖和版本差异见 [课件覆盖与来源](optics-sources.html)。复习材料中的补充条件旨在避免把理想近似记成普遍定律；实际考试范围以教师另行说明为准。
