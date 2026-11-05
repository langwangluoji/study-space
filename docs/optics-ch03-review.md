---
title: "第3章 考点与概念复习"
outline: [2, 3]
prev: false
next: false
---

# 第3章 考点与概念复习

<span class="optics-key">复习重点</span> 按概念定义、现象条件和公式直觉检查掌握程度；需要详细演算时回到对应学习小节。

- [3.1 光的波动性与电磁理论](optics-ch03-s01.html)
- [3.2 光的本性与波粒二象性](optics-ch03-s02.html)

<a id="_2-6-maxwell方程-光是电磁波"></a>
### Maxwell方程：光是电磁波

来源：W2 第20至27页。

Maxwell方程同时规定电磁场的空间分布和时间变化。四条方程可按名称、微分式及积分式一起辨认：

|名称|微分形式|物理含义|
|---|---|---|
|电场高斯定律|$\nabla\cdot\mathbf D=\rho_f$|闭合面电位移通量联系包围的自由电荷|
|磁场高斯定律|$\nabla\cdot\mathbf B=0$|穿出、穿入闭合面的磁通量相抵|
|法拉第定律|$\nabla\times\mathbf E=-\partial_t\mathbf B$|变化磁通联系感应电场|
|安培与Maxwell定律|$\nabla\times\mathbf H=\mathbf J_f+\partial_t\mathbf D$|传导电流与变化电位移共同联系磁场|

$$
\oint_{\partial V}\mathbf D\cdot d\mathbf a=Q_f,\qquad
\oint_{\partial V}\mathbf B\cdot d\mathbf a=0,
$$

$$
\oint_{\partial\Sigma}\mathbf E\cdot d\mathbf l=-\frac d{dt}\int_\Sigma\mathbf B\cdot d\mathbf a,
\qquad
\oint_{\partial\Sigma}\mathbf H\cdot d\mathbf l=I_f+\frac d{dt}\int_\Sigma\mathbf D\cdot d\mathbf a.
$$

$\rho_f,Q_f$ 为自由电荷密度和电荷量，$\mathbf J_f,I_f$ 为自由传导电流密度和电流；$\partial_t\mathbf D$ 是位移电流密度项。$\mathbf E,\mathbf D$ 分别为电场强度、电位移，$\mathbf B,\mathbf H$ 为磁感应强度、磁场强度。记方程可先配对“电通量与电荷”“磁通量闭合”，再记两条旋度式中法拉第定律的负号。

无自由电荷、无传导电流时，取 $\rho_f=0,\mathbf J_f=0$。真空中再使用 $\mathbf D=\varepsilon_0\mathbf E$、$\mathbf B=\mu_0\mathbf H$，得到光的波动方程：

$$
\boxed{\nabla^2\mathbf E-\frac1{c^2}\partial_t^2\mathbf E=0},\qquad
\boxed{\nabla^2\mathbf H-\frac1{c^2}\partial_t^2\mathbf H=0},
$$

$$
\boxed{c=\frac1{\sqrt{\varepsilon_0\mu_0}}}.
$$

$\varepsilon_0$ 是真空电容率，$\mu_0$ 是真空磁导率。各直角坐标分量满足同样的波动方程。PPT的推导要点是“旋度再取旋度，代入另一条旋度方程”；复习结论时把 $c^{-2}=\varepsilon_0\mu_0$ 与上一节的一般波速系数对应起来。



<a id="_2-7-横波、电磁场关系与线偏振"></a>
### 横波、电磁场关系与线偏振

来源：W2 第28至31页。

真空传播平面光波的电场、磁场都垂直于波矢，因此光是横波：

$$
\mathbf k\cdot\mathbf E=0,\qquad \mathbf k\cdot\mathbf H=0.
$$

电场与磁场还彼此正交、同相，三者构成右手关系：

$$
\mu_0\mathbf H=\frac1\omega\mathbf k\times\mathbf E,
\qquad \mathbf E\times\mathbf H\parallel\mathbf k,
\qquad E_0=cB_0.
$$

同相表示电、磁振动同时达到峰值、同时经过零点。判断方向用右手：若光沿 $+z$ 传播，某时刻电场沿 $+x$，磁场就沿 $+y$。$E_0,B_0$ 分别为峰值振幅，电场与磁场强度的峰值还满足 $\sqrt{\mu_0}H_0=\sqrt{\varepsilon_0}E_0$。$E=cB$ 中的两场单位不同，实际相互作用的大小应通过受力比较。

带电粒子受洛伦兹力

$$
\mathbf F=q(\mathbf E+\mathbf u\times\mathbf B).
$$

粒子速度 $u\ll c$ 时，结合 $E=cB$ 可知电场力通常占主导。因此用电场描述光的振动，称其为光矢量。这里的 $u$ 是粒子速度。

偏振态描述电场在垂直传播方向平面内的振动方式。PPT给出的线偏振光中，电场沿固定直线往复变化，也称平面偏振光；电场方向与波矢组成的平面叫振动面。记忆时分清两个面：横截面垂直 $\mathbf k$，振动面包含 $\mathbf E$ 和 $\mathbf k$。这里讨论的是PPT所写的固定振动方向光波。



<a id="_2-8-坡印廷矢量、光强与辐射功率"></a>
### 坡印廷矢量、光强与辐射功率

来源：W2 第32至33页。

光携带能量离开光源形成辐射场。坡印廷矢量给出瞬时能流密度：

$$
\boxed{\mathbf S=\mathbf E\times\mathbf H}.
$$

$\mathbf S$ 的单位为 W/m²，方向是能量传播方向；光线表示能量传播路径。对上一节的真空平面波，$\mathbf S$ 与 $\mathbf k$ 同向。

可观测的辐射通量密度是时间平均能流，PPT记作光强 $I$：

$$
\boxed{I=|\langle\mathbf S\rangle|=\frac12E_0H_0
=\frac12\varepsilon_0cE_0^2}.
$$

峰值振幅乘积前的 $1/2$ 来自简谐振动的周期平均，$\langle\cos^2\rangle=1/2$。PPT还写出均匀无损介质的系数形式 $I=\tfrac12\sqrt{\varepsilon/\mu}\,E_0^2$，这里用 $\varepsilon,\mu$ 表示绝对电容率、磁导率，真空取 $\varepsilon_0,\mu_0$。在同一介质中比较光强，只需记 $I\propto E_0^2$：振幅加倍，光强变为四倍。

辐射通量即辐射功率，是单位时间通过某面积的辐射能，单位 W。光强是单位面积上的平均功率，单位 W/m²。在均匀光垂直照射时，功率等于 $I$ 乘面积。



<a id="_2-9-干涉公式与稳定干涉的三个条件"></a>
### 干涉公式与稳定干涉的三个条件

来源：W2 第34至37页。

干涉指相遇光波的叠加使光强随相位差发生加强或减弱。对同频、同振动方向且按PPT两束光的探测几何处理的光波，

$$
\boxed{I=I_1+I_2+2\sqrt{I_1I_2}\cos\delta},
\qquad \delta=\phi_2-\phi_1.
$$

$I_1,I_2$ 是两束光单独存在时的光强，$\delta$ 是它们在观察点的相位差，最后一项为干涉项。记法可直接从场振幅相加理解：场振幅与 $\sqrt I$ 成正比，所以交叉项带 $2\sqrt{I_1I_2}$。

|观察结果|相位或平均条件|公式的含义|
|---|---|---|
|相长|$\delta=0$ 或相差整数个 $2\pi$|干涉项取最大正值，两波同相加强|
|相消最强|$\delta=\pi$ 或再加整数个 $2\pi$|干涉项取最负值，等光强时完全相消|
|非相干叠加|干涉项在探测平均后为零|$I=I_1+I_2$|

PPT给出的稳定干涉条件应一起记：

1. 振动方向有平行分量。两束光的振动完全正交时，直接叠加的交叉项为零。
2. 频率相同。同频使相位差不会因频差持续漂移；PPT以较长时间平均说明异频项消失。
3. 相位差保持恒定。即使频率相同，随机相位变化若使干涉项在观察时间内的平均值为零，条纹也会消失。

复习时按振动方向、频率、相位差逐项检查。第二条针对静止稳定条纹及PPT的时间平均条件；频差项是否被平均掉，与观察时间有关。某一点恰好 $\cos\delta=0$ 只表示该点交叉项为零，判断两束光相干性还要看相位关联能否稳定。正交振动分量没有直接干涉，也应与相位差随机的情形分开理解。



<a id="_2-10-光的本性与ppt列出的现象"></a>
### 光的本性与PPT列出的现象

来源：W2 第38至44页；W1 第1至3页为光学内容回顾。

光既可用波描述传播，又以量子化方式交换能量和动量。PPT最后的关系图把波动量“光速、频率、波长”与粒子量“能量、动量、角动量”连接起来，联系常数是 $h$。

$$
\boxed{c=\lambda_0\nu},\qquad
\boxed{E_\gamma=h\nu=\hbar\omega},\qquad
\boxed{p_\gamma=\frac{E_\gamma}{c}=\frac{h\nu}{c}},
\qquad \hbar=\frac{h}{2\pi}.
$$

$E_\gamma,p_\gamma$ 是真空光子的能量与线动量，$\lambda_0$ 为真空波长。记两种频率写法：“普通频率乘 $h$，角频率乘 $\hbar$”。PPT还列出光子的玻色子属性、自旋角动量和轨道角动量，此处按概念辨认。

|PPT中的现象或历史节点|对应认识|应抓住的判断|
|---|---|---|
|光的直线传播、反射、折射|牛顿微粒说能解释部分传播现象；惠更斯用波前作图解释反射、折射|这些现象贯穿早期波粒争论|
|1801年杨氏双缝干涉，菲涅耳的波动研究|支持光的波动性|干涉强弱取决于叠加相位|
|麦克斯韦的电磁理论、1873年《电磁学通论》|将光和电磁现象统一|光是一定频率范围的电磁波|
|1887年赫兹验证电磁波，并观测到光电效应|电磁波与光具有共同波动性质|电磁波实验与Maxwell理论相互印证|
|黑体辐射，1900年普朗克量子化假设|能量交换的量子性|$h\nu$ 是对应频率的能量量子|
|光电效应，1905年爱因斯坦光量子解释|光子的能量|用 $E_\gamma=h\nu$ 联系频率和交换能量|
|PPT列1922年康普顿研究X射线散射|光子的能量与线动量|同时关注能量和动量交换|

PPT第40页提到的“以太、纵波”是早期历史观点；本章平面电磁光波的现代结论是横波。复习波粒关系图时，可从问题所问的量入手：波形、相位、干涉对应波动描述；每次交换的能量和动量对应光子关系。

W1前两页还回顾光学的六类问题：光是什么、如何产生、如何传播调控、如何探测、如何与物质相互作用、如何应用；几何光学、波动光学、矢量光学和量子光学对应不同的描述层次。

<a id="ppt-radiation"></a>



## 概念题与思考题

1. 真空平面电磁波为什么是横波？

#### 参考答案：第1题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

无源散度方程给出k·E=0、k·B=0；旋度方程同时约束三者的方向与幅值关系。

</details>



2. 坡印廷矢量表示什么？

#### 参考答案：第2题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

S=E×H表示瞬时能流密度，时间平均量与探测到的平均功率联系。

</details>



3. 峰值复振幅计算平均光强时为何出现1/2？

#### 参考答案：第3题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

真实简谐场的二次量要作时间平均，cos²在一个周期上的平均值为1/2。

</details>



4. 稳定干涉需要哪些条件？

#### 参考答案：第4题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

需要可干涉的共同偏振分量、在探测平均时间内保留的频率与相位相关性，以及两束光在观察区重叠；不同频率的拍动还取决于探测带宽。

</details>



5. 思考：单点交叉项为零能否证明两光束非相干？

#### 参考答案：第5题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

不能。同频相干场也可能在某点相差π/2而使该点交叉项为零；相干性需判断相关性及相位变化。

</details>



6. 思考：光子的能量怎样与波动参数联系？

#### 参考答案：第6题

<details class="optics-derivation">
<summary>展开答案与解释</summary>

Eγ=hν=ℏω；波动频率参与能量交换的量子关系。判断具体实验仍需说明测量对象。

</details>





## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
