---
title: "2.3 几种重要的波动"
outline: [2, 3]
prev: {"text": "2.2 简谐波、复数表示与相量", "link": "/optics-ch02-s02.html"}
next: {"text": "2.4 波的叠加原理", "link": "/optics-ch02-s04.html"}
---

<a id="ppt-2-10"></a>
<a id="ppt-2-11"></a>
<a id="ppt-2-12"></a>
<a id="ppt-2-13"></a>
<a id="ppt-2-14"></a>

# 2.3 几种重要的波动

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 平面波：等相位面、波矢与三维方程

先问：平面波的“平面”指什么？它指固定时刻的等相位面。把振动方向、传播方向和波前形状分别认清，就能从三维相位式读出空间图像。

PPT主线：W2 第9—13、27页。教材与习题补充：T2 §2.3.1，式（2.42）至（2.56）；T3 §3.2.3，式（3.24）至（3.35）；Q 第 1 页习题 5、7，第 2 页思考 4。

<a id="ppt-2-9"></a>

### 2.3.1 从平面几何理解波前

PPT对应：W2 第9—10、12—13、27页。

![波矢垂直等相位平面的三维几何](/optics/figures/waves-selfstudy-w2-p09-wavefront.png)

图1-3｜W2《光学20260921_波动.pdf》，PDF第9页，局部截取。三条蓝色坐标轴是 $x,y,z$，斜四边形表示一个平面波前；红箭头 $\mathbf k$ 沿该平面的法线，$P$ 与 $P_0$ 都在面内。连接两点的位移与 $\mathbf k$ 点积为零，正对应 $\mathbf k\cdot(\mathbf r-\mathbf r_0)=0$；沿面移动保持相位，沿法线移动改变相位。图中的 $\alpha,\beta,\gamma$ 是方向角，本章正文相同字母用作方向余弦。

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

对应 $\mathbf k=k(0,-\sin\theta,\cos\theta)$，在 $0<\theta<\pi/2$ 时，其传播方向同时具有负 $y$ 分量和正 $z$ 分量。W2 第12页的图箭头与印出的相位式可能不一致；本节按完整印式读出波矢，不据箭头自行改号。

读式例题｜若 $\phi=k(3x/5+4z/5)-\omega t$，则 $\hat{\mathbf k}=(3/5,0,4/5)$，固定时刻的波前满足 $3x+4z=C$。取面内位移 $(4d,0,-3d)$，点积为零，确认沿这条方向相位不变。两波前之间的最短间距沿法线量取；同一波前与某坐标轴的交点运动属于几何追踪。

### 相速度取波前法线方向

PPT对应：W2 第11页。沿坐标轴的波面交点速度是 T3 §3.2.3 的几何补充。

沿波前法线取坐标 $s=\hat{\mathbf k}\cdot\mathbf r$，相位为 $ks-\omega t+\phi_0$。保持相位不变得到 $ds/dt=\omega/k$，即波面的法向速度。沿坐标轴追踪波前与轴的交点时，得到的则是 $\omega/k_x$。斜面交点可以移动得很快，能量仍沿波的传播方向输运。

### 三维波动方程与色散关系

PPT对应：W2 第13页；代入平面波检验与有限光束条件为必要计算衔接。

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

自检：$A\cos(kz-\omega t)$ 沿 $x$ 方向振动，可以称为平面波吗？沿 $x$ 移动能否读到一个有限的空间周期？

#### 自检答案：波前形状与偏振分别判断

<details class="optics-derivation">
<summary>展开答案与解释</summary>

可以。相位只依赖 $z$，等相位面是 $z=\text{常数}$ 的平面；电场沿 $x$ 振动描述偏振方向。固定时刻沿 $x$ 移动时相位完全不变，因此没有沿该方向的有限重复间距，波长沿 $z$ 即波前法线量取。

</details>



#### 详细推导：教材补充：空间频率向量、截线周期与几何交点速度
### 空间频率向量与任意方向上的条纹间隔

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

教材补充：T3 §3.2.3。W2 第9—13页讨论波矢与波前，未给出本小节的空间频率向量和截线周期推导。

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

</details>



## 球面波与柱面波：几何扩散如何决定振幅

同样的总辐射功率，离源更远为什么光更弱？先看能量经过的面积怎样增大，再用 $I\propto A^2$ 把强度变化换成振幅变化。几何扩散与介质吸收分别对应不同的物理机制。

PPT主线：W2 第14—15页。教材与习题补充：T2 §2.3.2至2.3.3，式（2.57）至（2.61）；Q 第 1 页习题 6、8，第 2 页思考 5。

波向外传播时，能量分布到越来越大的面积上，振幅随之减小。球面波与柱面波可用标量模型突出这种几何扩散；实际电磁源的矢量场还带有方向图。

### 2.3.2 球面对称波：把三维方程化成一维

PPT对应：W2 第14页。球坐标、球对称径向方程与 1/r 波形按课件展开；源条件、会聚解和功率检验由 T2 §2.3.2 补充。

取尺寸远小于波长的局域源，并假定它向各方向辐射相同的标量波，便得到球对称点源模型。点源近似约束的是尺寸，球对称还要求各向同性。

![PPT中的球坐标与球对称几何](/optics/figures/wave-w2-p14-spherical-coordinates.png)

图源：《光学20260921_波动.pdf》，PDF第14页，局部截取。球坐标的径向距离、极角与方位角。球对称模型只依赖 r，图中两个角向坐标用于理解为什么相应角导数消失。

#### 详细推导：球对称方程如何化为一维传播

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

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

</details>



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

<a id="ppt-2-15"></a>

### 2.3.3 柱面波：远场振幅为什么是 $1/\sqrt{\rho}$

![柱面波所用的径向、方位角与轴向坐标](/optics/figures/nov05-cylindrical-coordinates-p15.png)

《光学20260921_波动.pdf》PDF第15页（局部）。竖直轴为 z，红箭头为径向 r，圆周角 θ 在横截面内量取；圆柱表面给出 r 相同的点集。理想无限线源形成柱对称波，振幅随传播距离展开。原页写出的 A/√r 乘简谐相位是远区 kr≫1 的渐近形式，精确柱面解使用贝塞尔或汉克尔函数；这里仅截取坐标图。


PPT对应：W2 第15页。柱坐标及 1/√ρ 形式来自课件；线源适用范围、能量检验与严格解的区别为 T2 §2.3.3 补充。

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

#### 详细推导：教材补充：柱面远场残差与Hankel严格解

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

将远场形式 $F=\rho^{-1/2}e^{ik\rho}$ 代回柱对称方程，可以直接检验近似的精度：

$$
F''+\rho^{-1}F'+k^2F=\frac{F}{4\rho^2}.
$$

相对主项 $k^2F$，残差为 $1/[4(k\rho)^2]$，在 $k\rho\gg1$ 时可以忽略。这给出了 T2 §2.3.3 式（2.61）远场近似的定量条件。严格的单色出射解正比于 $H_0^{(1)}(k\rho)e^{-i\omega t}$；Hankel 函数的远场形式为 $e^{i(k\rho-\pi/4)}/\sqrt\rho$，常数相位可并入 $\widetilde C$。

</details>



|几何模型|能流分散面积/单位长度周长|强度规律|振幅规律|
|---|---|---|---|
|理想平面波|不随传播距离增加|$I$ 恒定|$A$ 恒定|
|球面波|$4\pi r^2$|$I\propto1/r^2$|$A\propto1/r$|
|柱面波远场|$2\pi\rho$|$I\propto1/\rho$|$A\propto1/\sqrt\rho$|

短例题｜在均匀无吸收介质中，球面波从 $r$ 传播到 $2r$，球面积变为4倍，故强度为原来的 $1/4$，振幅为 $1/2$。柱面远场从 $\rho$ 到 $2\rho$，强度为 $1/2$，振幅为 $1/\sqrt2$。比较时保持源功率、介质和辐射方向一致。

自检：测得振幅减半，能否单凭这一点判断能量损耗了一半？球面模型的 $1/r$ 能否直接代到 $r=0$？

#### 自检答案：单位面积能量与总能量

<details class="optics-derivation">
<summary>展开答案与解释</summary>

振幅减半使同介质下的强度变为四分之一；若是球面几何扩散，总功率仍可守恒。$1/r$ 是源外模型，定义域为 $r>0$，在源内部应改用具体有限源模型。柱面远场近似还须满足 $k\rho\gg1$。

</details>



## 本节课件定位

光学20260921_波动.pdf P9、光学20260921_波动.pdf P10、光学20260921_波动.pdf P11、光学20260921_波动.pdf P12、光学20260921_波动.pdf P13、光学20260921_波动.pdf P14、光学20260921_波动.pdf P15。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
