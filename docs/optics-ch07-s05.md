---
title: "7.5 各向同性非均匀介质中的光传播"
outline: [2, 3]
prev: {"text": "7.4 光的介质色散", "link": "/optics-ch07-s04.html"}
next: {"text": "7.6 光的散射", "link": "/optics-ch07-s06.html"}
---

<a id="ppt-6-1"></a>
<a id="ppt-6-2"></a>

# 7.5 各向同性非均匀介质中的光传播

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 空间变化的介质与光路

来源：课件 P36至44。

为什么光线会弯，却仍符合一个简洁的光程原理？把“同样长的一段路”按 $n$ 加权，再看相邻候选路径的一阶变化。

<a id="ppt-5-36"></a>
<a id="ppt-6-3"></a>

### 7.5.1 介电常数梯度与波动方程

核心条件是：各向同性保证本构系数是标量，非均匀使它随位置变化。无自由电荷约束的是 $\nabla\cdot\mathbf D=0$；展开本构时出现的参数梯度使 $\mathbf E$ 可有非零散度。直接可用的关系是 $\nabla\cdot\mathbf E=-(\nabla\varepsilon_r/\varepsilon_r)\cdot\mathbf E$；均匀介质中梯度为零，就回到前面的横向约束。

#### 详细推导：空间本构梯度在波动方程中的位置

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

各向同性但非均匀时，本构为

$$
\mathbf D=\varepsilon_0\varepsilon_r(\mathbf r)\mathbf E.
$$

无自由电荷意味着

$$
0=\nabla\cdot\mathbf D
=\varepsilon_0\!\left[\varepsilon_r\nabla\cdot\mathbf E+(\nabla\varepsilon_r)\cdot\mathbf E\right],
$$

因此

$$
\boxed{\nabla\cdot\mathbf E=-\frac{\nabla\varepsilon_r}{\varepsilon_r}\cdot\mathbf E}.
$$

即使自由电荷为零，介电常数梯度仍可伴随极化束缚电荷，使 $\nabla\cdot\mathbf E\ne0$。在通常光学条件 $\mu_r$ 为空间常数时，重新取二次旋度得

$$
\boxed{\nabla^2\mathbf E+
\nabla\!\left[\left(\frac{\nabla\varepsilon_r}{\varepsilon_r}\right)\cdot\mathbf E\right]
=\varepsilon_0\varepsilon_r\mu_0\mu_r\frac{\partial^2\mathbf E}{\partial t^2}}.
$$

介电常数梯度使场分量发生耦合。若 $\mu_r$ 也随位置变化，电场方程左侧还含 $\nabla\ln\mu_r\times(\nabla\times\mathbf E)$ 项。一般情形可直接使用频域旋度形式：

$$
\boxed{\nabla\times\!\left[\mu_r^{-1}(\mathbf r)\nabla\times\widetilde{\mathbf E}\right]
-k_0^2\varepsilon_r(\mathbf r)\widetilde{\mathbf E}=0}.
$$

该旋度形式保留空间变化的本构参数。前面的展开式取 $\mu_r$ 恒定；磁场方程则由 Maxwell 方程另行推导，在 $\varepsilon_r$ 变化时也会出现相应梯度项（课件 P37）。

</details>



<a id="ppt-5-37"></a>
<a id="ppt-6-4"></a>

### 7.5.2 光程与相位积累

均匀透明介质中，几何长度 $L$ 引起相位增量

$$
\Delta\phi=nk_0L=k_0(nL).
$$

于是定义光程 $\mathcal L=nL$，它等于“在真空中积累相同相位所需的距离”。分段介质与平滑非均匀介质分别给出

$$
\boxed{\mathcal L=\sum_j n_jL_j},\qquad
\boxed{\mathcal L=\int_P^Q n(\mathbf r)\,ds},\qquad
\boxed{\Delta\phi=k_0\mathcal L=\frac{2\pi}{\lambda_0}\mathcal L}.
$$

以厚度 $d$、折射率 $n$ 的平板替换等长空气路径，新增光程为 $(n-1)d$。两束光因而获得由光程差 $\Delta\mathcal L$ 决定的相位差，可直接用于干涉计算。

无色散时，$t=\int ds/v_p=\mathcal L/c$。教材/ED补充：色散介质中的单频相位由 $\int n\,ds$ 决定，窄带脉冲的群延迟则使用 $\int n_g\,ds/c$，见 5.5 的折叠说明。

<a id="ppt-5-38"></a>
<a id="ppt-6-5"></a>

### 7.5.3 光程的驻值与费马原理

固定起点 $P$、终点 $Q$，物理光路满足

$$
\boxed{\delta\mathcal L=\delta\int_P^Q n(\mathbf r)\,ds=0}.
$$

变分 $\delta$ 比较固定端点间相邻候选路径的光程。驻值可对应局部极小、极大或更一般的驻点；理想成像中，一族可通光路还可能具有相等光程，对应课件 P39 至 40 所说的“常数”。

均匀介质中 $n$ 为常数，$\mathcal L=n\int ds$。两点间的直线使几何长度取局部最小值，因而得到直线传播（P41）。几何光学要求介质变化尺度远大于波长；衍射显著或接近焦散时，应使用波动描述。


![平面镜反射、椭圆反射面与透镜等光程示意](/optics/figures/propagation-i-fermat-path-examples.png)

图 4-8　原课件 P40：左图比较固定端点间的反射候选路；中图为椭圆两焦点之间的反射；右图为透镜成像的不同通光路径。

读图：沿每条折线或曲线从起点走到终点，再对照 $\int n\,ds$。左图用于比较邻近候选路径的驻值；中、右图说明成像可有多条实际路径等光程，费马原理描述的是光程平稳。

### 由变分求光线方程

#### 详细推导：教材/ED补充：Euler–Lagrange 方程、连续分层不变量与折射定律

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

用任意参数 $u$ 描述路径 $\mathbf r(u)$：

$$
\mathcal L=\int n(\mathbf r)|\dot{\mathbf r}|\,du.
$$

对拉格朗日量 $F=n|\dot{\mathbf r}|$ 应用 Euler-Lagrange 方程：

$$
\frac{d}{du}\left(n\frac{\dot{\mathbf r}}{|\dot{\mathbf r}|}\right)
=|\dot{\mathbf r}|\nabla n.
$$

以弧长 $s$ 为参数，令单位切向量 $\mathbf t=d\mathbf r/ds$，得

$$
\boxed{\frac d{ds}(n\mathbf t)=\nabla n},\qquad
\boxed{n\frac{d\mathbf t}{ds}=\nabla n-\mathbf t(\mathbf t\cdot\nabla n)}.
$$

右边是折射率梯度在垂直光线方向上的分量，所以光线向较高折射率一侧弯曲；只有垂直分量改变方向，沿光线方向的梯度改变 $n$ 而不直接改变方向。

若 $n=n(z)$，水平方向平移对称使 $n t_x$ 为常数。令 $\theta$ 为与竖直方向的夹角，则

$$
\boxed{n(z)\sin\theta(z)=\text{常数}}.
$$

这是连续分层介质的 Snell 不变量。对于折射率突变界面，对光程关于交点位置求驻值，可得到 $n_1\sin\theta_1=n_2\sin\theta_2$，与 Maxwell 边界条件给出的折射定律一致。

</details>



<a id="ppt-5-39"></a>
<a id="ppt-5-40"></a>
<a id="ppt-5-41"></a>
<a id="ppt-5-42"></a>
<a id="ppt-5-43"></a>
<a id="ppt-5-44"></a>
<a id="ppt-6-6"></a>
<a id="ppt-6-7"></a>
<a id="ppt-6-8"></a>
<a id="ppt-6-9"></a>
<a id="ppt-6-10"></a>
<a id="ppt-6-11"></a>

### 7.5.4 折射率梯度与蜃景

在压强变化可忽略的局部近似中，气体 $n-1$ 与密度大致成正比，密度又随温度升高而减小。

- 寒冷海面附近的上蜃景（P42）：低处空气较冷、密度较大，$n$ 较大；高处 $n$ 较小，光线向下弯曲。观察者沿入眼光线的切线反向延长，可将远物看在较高位置。
- 炽热地面上方的下蜃景（P43）：近地空气更热、密度更低，$n$ 较小；上方 $n$ 较大，光线向上弯曲。天空或远物的光到达观察者后，沿入眼方向反向延长形成地面下方的虚像，产生“积水”感。
- 实验室中的光学弯折（P44）：人为制造折射率梯度，光线也会形成曲线路径，其曲率方向由 $\nabla n$ 的横向分量决定。

![冷海面上方的折射率梯度与光路](/optics/figures/propagation-i-cold-sea-upper-mirage.png)

图 4-9　原课件 P42：近海面折射率高，向上降低，光线向高折射率的下方弯。上蜃景还需要逆温层及合适的近水平视线。

![热地面上方的折射率梯度与光路](/optics/figures/propagation-i-hot-ground-lower-mirage.png)

图 4-10　原课件 P43：贴地热空气折射率低，上方较高，光线向上弯。沿入眼光线反向延长，可得到地面以下的虚像。

指数剖面 $n^2(h)=n_0^2+n_p^2e^{-ah}$ 在 $a>0$ 时给出 $dn/dh<0$，可描述折射率随高度增加而降低的剖面（P42）。参数值取决于所模拟的大气条件与单位；P42 所列 $n_p=0.45836$ 代入后会给出不合理的近海空气折射率，本章保留模型趋势，不采用该数值作例题。

短例：在空气光路中插入 $d=1.00\,\mathrm{mm}$、$n=1.50$ 的平板，且几何端点不变，新增光程是 $(n-1)d=0.500\,\mathrm{mm}$。对 $\lambda_0=500\,\mathrm{nm}$，新增相位为 $2000\pi$，即 1000 个周期；先算光程差，再乘 $2\pi/\lambda_0$。


自检：上下蜃景的光线都弯向哪里？“路程较长”是否意味着“光程较长”？

#### 自检答案：梯度与光程

<details class="optics-derivation">
<summary>展开答案与解释</summary>

光线都向折射率较大一侧弯。光程还按 $n$ 加权，几何长度本身不能决定光程大小；固定端点间应比较整条 $\int n\,ds$。

</details>



## 非均匀介质：从光程判断光线怎样走

来源：第 3—11 页。

学习问题：同一几何距离通过不同材料，为什么相位积累不同？

各向同性非均匀线性介质在同一点没有方向差别，但极化率随位置改变：

$$
\mathbf P=\varepsilon_0\chi_e(\mathbf r)\mathbf E,\qquad
\mathbf D=\varepsilon_0\varepsilon_r(\mathbf r)\mathbf E,\qquad
n=n(\mathbf r).
$$

$\mathbf r$ 表示位置，$\chi_e$ 是极化率，$\varepsilon_r=1+\chi_e$ 是相对介电常数。无自由电荷时仍有 $\nabla\cdot\mathbf D=0$，却不能因而直接写 $\nabla\cdot\mathbf E=0$；空间变化的介质参数会给传播方程带来额外项。下面以光程处理光线路径；完整的本构梯度推导见《04 光的传播与介质响应》6.1。

光程是与介质内传播产生相同相位变化的等效真空长度：

$$
\mathcal L=nL=ct\quad\text{（均匀介质）},\qquad
\mathcal L=\int_P^Q n(\mathbf r)\,ds\quad\text{（非均匀介质）},
\qquad
\Delta\varphi=\frac{2\pi}{\lambda_0}\mathcal L.
$$

上式中的 $\mathcal L=ct$ 在将 $t$ 解释为传播时间时采用无色散或相应相位延迟条件；窄带脉冲在色散介质中的群延迟应使用群折射率。$L,ds$ 是几何长度，$t$ 是该条件下的传播时间，$\lambda_0$ 是真空波长，$P,Q$ 是起终点。折射率大的路段，同样长的距离积累更多相位，因而计入更多光程。

Fermat 原理为

$$
\delta\mathcal L=\delta\int_P^Q n(\mathbf r)\,ds=0.
$$

意思是实际光路使光程平稳，稍改路径时一阶变化为零。平稳可表现为极小、个别情况下的极大，或成像时的等光程，不能一概记作“路程最短”。均匀介质中 $n$ 为常数，两点间直线给出最短光程，所以光直线传播。PPT 的平面镜反射、椭圆反射面双焦点和透镜成像图，分别说明反射路径的平稳性以及多条实际光路等光程。

分层非均匀介质中的光线向折射率较大的一侧弯。两个自然现象可放在一起记：

|现象|温度与折射率条件|光路弯向与所见虚像|
|---|---|---|
|冷海面上方的上蜃景|近海面较冷、$n$ 较大；逆温层中向上温度升高、$n$ 降低|光线向下弯；入眼光线反向延长，远物像显得较高|
|热沙漠、热路面的下蜃景|近地面最热、$n$ 较小；上方较凉、$n$ 较大|光线向上弯；反向延长可得地面以下的虚像，看似水面|

两者都需要明显的折射率梯度和适当视线。PPT 用 $n^2(h)=n_0^2+n_p^2e^{-ah}$（$a>0$）表示冷海上方 $n$ 随高度 $h$ 降低的趋势；$n_0,n_p,a$ 是分层模型参数。实验室透明槽中的弯曲光迹和标尺像位置变化，也来自折射率梯度。记图时看曲线弯向哪一侧，不能把“向下弯”同“光线此刻向下传播”混为一谈。

短例：两段等长 $1\,\mathrm{cm}$ 的透明路径，折射率分别为 1 与 1.5，光程分别为 1 与 $1.5\,\mathrm{cm}$；几何距离相等而相位积累不同。比较光路时，先把各段 $nL$ 相加。


自检：均匀、各向同性和无色散分别约束哪个变量？蜃景图上光线弯向哪一侧？

#### 自检答案：空间性质与弯曲方向

<details class="optics-derivation">
<summary>展开答案与解释</summary>

均匀约束位置，各向同性约束方向，无色散约束频率依赖。蜃景的光线向折射率更高的一侧弯；观察者再按入眼切线反向延长判断像的位置。

</details>



## 本节课件定位

光学20261019_光的传播_I.pdf P36、光学20261019_光的传播_I.pdf P37、光学20261019_光的传播_I.pdf P38、光学20261019_光的传播_I.pdf P39、光学20261019_光的传播_I.pdf P40、光学20261019_光的传播_I.pdf P41、光学20261019_光的传播_I.pdf P42、光学20261019_光的传播_I.pdf P43、光学20261019_光的传播_I.pdf P44、光学20261026光的传播II.pdf P1、光学20261026光的传播II.pdf P2、光学20261026光的传播II.pdf P3、光学20261026光的传播II.pdf P4、光学20261026光的传播II.pdf P5、光学20261026光的传播II.pdf P6、光学20261026光的传播II.pdf P7、光学20261026光的传播II.pdf P8、光学20261026光的传播II.pdf P9、光学20261026光的传播II.pdf P10、光学20261026光的传播II.pdf P11。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
