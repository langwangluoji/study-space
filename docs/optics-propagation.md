---
title: "光的传播与介质响应"
outline: [2, 3]
---


# 光的传播与介质响应

光进入介质后，电场驱动带电粒子运动，粒子的极化又改变光的传播。介质的复响应决定复折射率与能量交换，复折射率的实部控制相位积累，虚部控制传播衰减；响应随频率变化产生色散，随位置变化则使光线弯曲。本章从 Maxwell 方程和受迫振子出发，推导折射率、吸收定律以及光程和光路。来源为《光学20261019_光的传播_I.pdf》，文中页码均指该 PDF 的文件页码。

<a id="_1-符号、条件与知识地图"></a>

## 1. 场的表示与介质性质

物理场取复场的实部，采用负时间因子：

$$
\mathbf E_{\rm real}(\mathbf r,t)=\operatorname{Re}\!\left[\widetilde{\mathbf E}(\mathbf r)e^{-i\omega t}\right],\qquad
\widetilde{\mathbf E}=\mathbf E_0e^{i\mathbf k\cdot\mathbf r}.
$$

标量 $E_0$ 为峰值振幅，因此时间平均二次量含 $1/2$。$e>0$ 是元电荷，电子电荷为 $-e$。相对介电常数、相对磁导率分别记为 $\varepsilon_r,\mu_r$，绝对参数为 $\varepsilon_0\varepsilon_r,\mu_0\mu_r$；课件直接写 $\varepsilon,\mu$ 时，按相应本构关系辨认。

| 量 | 记号与单位 | 应记住的区别 |
|---|---|---|
| 真空波长、真空波数 | $\lambda_0=2\pi c/\omega$，$k_0=\omega/c$ | 色散公式中的波长默认是真空波长 |
| 介质波长、相速度 | $\lambda_m=\lambda_0/n$，$v_p=c/n$ | 介质改变波长，静止介质界面不改变频率 |
| 复折射率 | $\widetilde n=n+i\kappa$，无量纲 | 课件用 $\eta$ 表示消光系数；此处用 $\kappa$ |
| 强度吸收系数 | $\alpha$，$\mathrm{m^{-1}}$ | $I\propto e^{-\alpha z}$，场振幅的衰减常数为其一半 |
| 光程 | $\mathcal L=\int n\,ds$，m | 几何长度 $s$、光程 $\mathcal L$、相位 $k_0\mathcal L$ 是三个量 |

线性描述响应与场的比例关系，各向同性描述同一位置的方向对称性，均匀描述空间各处参数相同。这些性质分别约束不同变量：各向同性介质可以随位置变化，其折射率也可以依赖频率。课件 P5 的传播模型同时使用了均匀假设。

<a id="_2-均匀各向同性线性介质-从-maxwell-方程到光强"></a>

## 2. 均匀介质中的波速与光强

来源：课件 P3至6。

### 2.1 本构关系与波动方程

先考虑无自由电荷、无自由电流、均匀、线性、各向同性、无耗散且响应可视作瞬时的介质：

$$
\mathbf P=\varepsilon_0\chi_e\mathbf E,\qquad
\mathbf D=\varepsilon_0(1+\chi_e)\mathbf E
=\varepsilon_0\varepsilon_r\mathbf E,
\qquad \mathbf B=\mu_0\mu_r\mathbf H.
$$

四条 Maxwell 方程为

$$
\nabla\cdot\mathbf D=0,\quad \nabla\cdot\mathbf B=0,\quad
\nabla\times\mathbf E=-\frac{\partial\mathbf B}{\partial t},\quad
\nabla\times\mathbf H=\frac{\partial\mathbf D}{\partial t}.
$$

由于 $\varepsilon_r$ 是空间常数，$\nabla\cdot\mathbf E=0$。对法拉第定律再取旋度：

$$
\begin{aligned}
\nabla\times(\nabla\times\mathbf E)
&=-\mu_0\mu_r\frac{\partial}{\partial t}(\nabla\times\mathbf H)\\
&=-\mu_0\mu_r\varepsilon_0\varepsilon_r\frac{\partial^2\mathbf E}{\partial t^2}.
\end{aligned}
$$

使用恒等式 $\nabla\times\nabla\times\mathbf E=\nabla(\nabla\cdot\mathbf E)-\nabla^2\mathbf E$，得到

$$
\boxed{\nabla^2\mathbf E-\frac{1}{v_p^2}\frac{\partial^2\mathbf E}{\partial t^2}=0},\qquad
v_p=\frac{1}{\sqrt{\varepsilon_0\varepsilon_r\mu_0\mu_r}}.
$$

$\mathbf H$ 满足同形方程。与真空速度 $c=1/\sqrt{\varepsilon_0\mu_0}$ 比较：

$$
\boxed{n=\frac c{v_p}=\sqrt{\varepsilon_r\mu_r}\simeq\sqrt{\varepsilon_r}}.
$$

近似 $\mu_r\simeq1$ 适用于普通光学介质。若存在色散，$\varepsilon_r(\omega)$ 在频域中分别作用于各频率分量；完整时域响应包含介质对先前电场的影响。

<a id="_2-2-单色解、横波性与频率不变"></a>

### 2.2 单色波的相位与场方向

取 $\mathbf E=\mathbf E_0 e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，代入得

$$
k^2=\varepsilon_r\mu_r\frac{\omega^2}{c^2},\qquad
\boxed{\mathbf k\cdot\mathbf E_0=0},\qquad
\boxed{\mathbf B_0=\frac{\mathbf k\times\mathbf E_0}{\omega}}.
$$

散度方程给出横向约束，法拉第定律给出电、磁场的耦合关系，它们共同约束波动方程的物理解。这里的均匀、各向同性、无耗传播平面波满足 $\mathbf E,\mathbf H,\mathbf k$ 两两垂直，并构成右手关系。

沿 $+z$ 传播时

$$
\mathbf E_{\rm real}(z,t)=\mathbf E_0\cos(nk_0z-\omega t+\phi_0),\qquad
\lambda_m=\frac{\lambda_0}{n}.
$$

等相位条件 $nk_0z-\omega t=\text{常数}$ 给出 $dz/dt=\omega/(nk_0)=c/n$。静止、时间不变界面的边界条件须在任意 $t$ 成立，因此入射、反射、透射波具有同一 $\omega$。介质改变相速度与波长。

### 2.3 辐照度与峰值场振幅

波阻抗为

$$
Z=\sqrt{\frac{\mu_0\mu_r}{\varepsilon_0\varepsilon_r}},\qquad
\mathbf H_0=\frac1Z\widehat{\mathbf k}\times\mathbf E_0.
$$

时均坡印廷矢量是

$$
\langle\mathbf S\rangle=\frac12\operatorname{Re}\!\left(\widetilde{\mathbf E}\times\widetilde{\mathbf H}^{\,*}\right).
$$

在无耗、均匀介质中，对垂直光线的单位面积，强度为

$$
\boxed{I=\frac{E_0^2}{2Z}
=\frac12\varepsilon_0 c\frac n{\mu_r}E_0^2
\simeq\frac12n\varepsilon_0cE_0^2}.
$$

同一介质中可用 $I\propto E_0^2$ 比较空间分布；比较不同非磁介质时，强度系数还含折射率 $n$。接收面倾斜时，再乘光线与接收面法线夹角的余弦，得到该面积上的法向通量。

波阻抗将这一结果与电动力学的 $I=E_0^2/(2Z)$ 联系起来。$n$ 决定相位传播，$Z$ 决定 $E/H$ 和能流；普通非磁介质满足 $Z=Z_0/n$，两者才可由一个材料参数相互换算。

<a id="_3-lorentz-振子-把宏观折射率追溯到电子运动"></a>

## 3. 束缚电子的运动与介质响应

来源：课件 P7至18。

<a id="_3-1-模型、运动方程与适用条件"></a>

### 3.1 受迫阻尼振子模型

把束缚电子看成在平衡位置附近做受迫阻尼振动的谐振子。正电中心近似不动，电子位移为 $\mathbf r$，弹性系数为 $f$，阻尼系数为 $g$：

$$
m\ddot{\mathbf r}=-e\mathbf E-f\mathbf r-g\dot{\mathbf r}.
$$

令 $\omega_0^2=f/m$、$\gamma=g/m$，得

$$
\boxed{\ddot{\mathbf r}+\gamma\dot{\mathbf r}+\omega_0^2\mathbf r=-\frac e m\mathbf E}.
$$

该模型要求电子速度 $v_e\ll c$，振动范围远小于光场的空间变化尺度，通常满足 $|\mathbf k|r\ll1$；小振幅使回复力近似线性，粒子间复杂耦合和能量损失用有效参数概括。磁力与电力的比值约为 $v_eB/E\sim nv_e/c\ll1$，于是运动方程保留电场力。这里 $v_e$ 是电子速度。

<a id="_3-2-逐步导出复极化率"></a>

### 3.2 从位移响应求复极化率

束缚振子的固有频率是 $\omega_0$；受频率 $\omega$ 的光场驱动后，稳态响应以 $\omega$ 振动，幅度和相位由失谐与阻尼决定。取

$$
\mathbf E(t)=\widetilde{\mathbf E}e^{-i\omega t},\qquad
\mathbf r(t)=\widetilde{\mathbf r}e^{-i\omega t}.
$$

代入运动方程，利用 $\partial_t\to-i\omega$：

$$
(\omega_0^2-\omega^2-i\gamma\omega)\widetilde{\mathbf r}
=-\frac e m\widetilde{\mathbf E}.
$$

单个偶极矩 $\mathbf p=-e\mathbf r$，单位体积有 $N$ 个相同振子，因此

$$
\widetilde{\mathbf P}=-Ne\widetilde{\mathbf r}
=\frac{Ne^2/m}{\omega_0^2-\omega^2-i\gamma\omega}\widetilde{\mathbf E}.
$$

与 $\widetilde{\mathbf P}=\varepsilon_0\chi_e(\omega)\widetilde{\mathbf E}$ 比较，定义振子强度参数 $\Omega^2=Ne^2/(\varepsilon_0m)$，便有

$$
\boxed{\chi_e(\omega)=\frac{\Omega^2}{\omega_0^2-\omega^2-i\gamma\omega}}.
$$

令 $\Delta=\omega_0^2-\omega^2$，将分母有理化：

$$
\boxed{\chi'_e=\frac{\Omega^2\Delta}{\Delta^2+\gamma^2\omega^2}},\qquad
\boxed{\chi''_e=\frac{\Omega^2\gamma\omega}{\Delta^2+\gamma^2\omega^2}}.
$$

$\chi'_e$ 描述与电场同相的响应，$\chi''_e$ 描述相位滞后的响应；在本时间约定下，被动介质 $\omega>0,\gamma>0$ 时 $\chi''_e>0$。电子电荷的负号在偶极矩中再出现一次，所以极化率分子为正。

<a id="_3-3-为什么虚部代表吸收-直接算平均功率"></a>

### 3.3 极化电流的平均做功

极化电流为 $\widetilde{\mathbf J}_P=-i\omega\widetilde{\mathbf P}$。光场对介质做功的平均功率密度

$$
\begin{aligned}
q_{\rm abs}
&=\frac12\operatorname{Re}\!\left(\widetilde{\mathbf J}_P\cdot\widetilde{\mathbf E}^{\,*}\right)\\
&=\frac12\omega\varepsilon_0\chi''_e|\widetilde{\mathbf E}|^2\ge0.
\end{aligned}
$$

从机械耗散也能得到相同平均功率：$Nm\gamma\langle\dot{\mathbf r}^{2}\rangle=Nm\gamma\omega^2|\widetilde{\mathbf r}|^2/2$。代入位移振幅，便与极化电流的做功结果相等。相位滞后与阻尼共同描述光能向介质转移；在无阻尼且远离共振时，模型的平均吸收为零，实响应仍可产生色散。

<a id="_3-4-从复介电常数得到复折射率"></a>

### 3.4 复折射率的实部与虚部

对 $\mu_r\simeq1$：

$$
\widetilde n^2=\varepsilon_r=1+\chi_e,
\qquad \widetilde n=n+i\kappa.
$$

比较实部、虚部：

$$
\boxed{n^2-\kappa^2=1+\chi'_e=\varepsilon'_r},\qquad
\boxed{2n\kappa=\chi''_e=\varepsilon''_r}.
$$

普通非磁被动介质的平方根分支由进入介质的衰减边界条件确定。对 $n\ge0,\kappa\ge0$，有

$$
n=\sqrt{\frac{|\varepsilon_r|+\varepsilon'_r}{2}},\qquad
\kappa=\sqrt{\frac{|\varepsilon_r|-\varepsilon'_r}{2}}.
$$

弱极化 $|\chi_e|\ll1$ 时才可用

$$
\widetilde n=\sqrt{1+\chi_e}\simeq1+\frac{\chi_e}{2},\qquad
\boxed{n\simeq1+\frac{\chi'_e}{2},\quad\kappa\simeq\frac{\chi''_e}{2}}.
$$

弱极化要求 $|\chi_e|\ll1$，约束实部和虚部的合成大小。透明玻璃虽可吸收很弱，$\chi'_e$ 仍可能接近 1；此时应保留完整实折射率。若吸收弱且 $n$ 已知，由 $2n\kappa=\varepsilon''_r$ 得 $\kappa\simeq\varepsilon''_r/(2n)$。

采用 $e^{+ik_0\widetilde nz-i\omega t}$ 时，$\widetilde n=n+i\kappa$ 的正虚部产生 $e^{-k_0\kappa z}$ 衰减。上面的实、虚部代数关系给出材料参数；单色场的空间分布则满足定态波动方程 $\nabla^2\widetilde{\mathbf E}+k^2\widetilde{\mathbf E}=0$，即电动力学中的亥姆霍兹方程。

<a id="_3-5-不同频段与多振子"></a>

### 3.5 共振两侧的响应与多振子模型

忽略阻尼并远离共振时

$$
\boxed{n^2\simeq1+\frac{\Omega^2}{\omega_0^2-\omega^2}}.
$$

这是单共振的 Sellmeier 型表达式（课件 P15）。

- $\omega\ll\omega_0$ 时，回复力主导，极化大致跟随电场，通常 $n>1$，并随 $\omega$ 增大。
- $\omega\approx\omega_0$ 时，受迫振幅和耗散增大，需保留阻尼；$\gamma=0$ 模型在共振点发散。
- $\omega\gg\omega_0$ 且 $\Omega^2/\omega^2\ll1$ 时，惯性主导，$n^2\simeq1-\Omega^2/\omega^2$，$n$ 从小于 1 的一侧趋近 1。在较低的共振高频侧还可能存在 $\varepsilon'_r<0$ 的区间，其场形态需按复折射率判断。

真实材料往往有多个共振：

$$
\boxed{\varepsilon_r(\omega)=1+\sum_j\frac{\Omega_j^2}{\omega_{0j}^2-\omega^2-i\gamma_j\omega}}.
$$

每个振子项对应一个共振及其强度、阻尼。经典模型以这些参数解释吸收和色散曲线；量子跃迁理论进一步把本征频率与强度联系到能级差、跃迁矩阵元和占据数，并可得到相似形式的响应函数。

<a id="_4-吸收-从复折射率到-lambert–beer-定律"></a>

## 4. 指数吸收与 Lambert-Beer 定律

来源：课件 P18至26。

<a id="_4-1-两条路线推导指数衰减"></a>

### 4.1 吸收系数与消光系数

先从薄层的能量损失出发。厚度 $dz$ 所吸收的强度与当前 $I$ 和厚度成正比：

$$
dI=-\alpha I\,dz\quad\Longrightarrow\quad
\int_{I(0)}^{I(L)}\frac{dI}{I}=-\alpha\int_0^Ldz.
$$

均匀介质给出 Bouguer-Lambert 定律：

$$
\boxed{I(L)=I(0)e^{-\alpha L}}.
$$

若 $\alpha=\alpha(z)$，推广为 $I(L)=I(0)\exp[-\int_0^L\alpha(z)dz]$。这里 $I(0)$ 指已进入介质内部的强度；若题目给外部入射强度，应另计界面反射。

同一衰减规律也可从复折射率得到。令 $\widetilde k=k_0(n+i\kappa)$，则

$$
\mathbf E(z,t)=\mathbf E_0e^{-k_0\kappa z}e^{i(k_0nz-\omega t)}.
$$

在同一均匀介质内 $I\propto|\widetilde{\mathbf E}|^2$，故

$$
I(z)=I(0)e^{-2k_0\kappa z},\qquad
\boxed{\alpha=2k_0\kappa=\frac{2\omega\kappa}{c}=\frac{4\pi\kappa}{\lambda_0}}.
$$

由于 $k_0=2\pi/\lambda_0$，吸收系数使用真空波长 $\lambda_0$。场振幅降至 $1/e$ 的长度为 $\ell_E=1/(k_0\kappa)=2/\alpha$，强度降至 $1/e$ 的长度为 $\ell_I=1/\alpha$；模平方使强度指数恰为振幅指数的两倍。

若 $\mu_r$ 为实常数，吸收平面波的精确强度前因子仍为

$$
I(z)=\frac12\operatorname{Re}\!\left(\frac1{Z^*}\right)|\widetilde E(z)|^2
=\frac{n}{2\mu_r Z_0}|\widetilde E(z)|^2.
$$

强度沿程的相对变化由场模平方给出，绝对值还需乘由阻抗决定的能流系数。

### 4.2 Beer 定律、透射率和吸光度

稀溶液中各吸收分子近似独立，吸收系数与浓度 $C$ 成正比：$\alpha=a_C C$，其中 $a_C$ 与所用浓度单位、波长和物质性质有关。于是

$$
\boxed{I(L)=I(0)e^{-a_CCL}},\qquad
T=\frac{I(L)}{I(0)}=e^{-a_CCL}.
$$

光度分析常用十进制吸光度（补充）：

$$
\mathcal A=-\log_{10}T=\frac{a_C}{\ln10}CL=\epsilon_{\rm mol}CL.
$$

自然指数系数 $a_C$ 与十进制摩尔消光系数 $\epsilon_{\rm mol}$ 相差 $\ln10$。Beer 关系要求吸收分子的状态与相互作用基本不随浓度变化；浓度较高时的分子相互作用、化学平衡、散射或强光饱和均可引起偏离。Lambert 模型中的线性响应表示 $\alpha$ 与入射强度无关，沿厚度的强度变化仍为指数形式。

<a id="_4-3-看懂现象类题-吸收种类、颜色和光谱"></a>

### 4.3 选择吸收、颜色与吸收光谱

| 课件概念 | 解释与判断依据 |
|---|---|
| 一般吸收（P23） | 在所讨论的有限波段内，各波长吸收近似相同，主要降低明暗；此定义限于所讨论波段 |
| 选择吸收（P23） | $\alpha(\lambda_0)$ 随波长显著变化，白光经过材料后光谱权重改变，出现颜色 |
| 体色（P24） | 选择吸收决定体内传播后剩下的光谱，例如绿色玻璃主要透过绿光；表面镜面反射仍可能接近白色 |
| 表面色（P24） | 表面选择反射使反射光具有特殊光谱，由表面反射谱决定其颜色 |
| 大气窗口（P24） | 大气在特定波段吸收较弱，是红外探测、导航、遥感选择工作波段的重要依据；窗口位置与成分、含水量等条件有关 |
| 吸收光谱（P25至26） | 连续光源穿过样品后，由光谱仪比较各波长强度；特定吸收线或吸收带提供物质鉴别信息 |

体色描述体内选择吸收主导的出射光。实际反射光还可含接近照明颜色的表面镜面分量，观察结果也依赖照明光谱、厚度和散射。透明程度由 $\alpha L$ 决定，所以同一材料薄片可能透明，厚块可能近乎不透光。

<a id="_5-色散-正常与反常怎样由同一响应产生"></a>

## 5. 频率响应与材料色散

来源：课件 P27至35。

<a id="_5-1-定义和导数符号"></a>

### 5.1 正常与反常色散的定义

材料色散是折射率依赖频率 $n=n(\omega)$，等价于依赖真空波长 $n=n(\lambda_0)$。相速度 $v_p=c/n$ 也随频率变化。

$$
\frac{d\omega}{d\lambda_0}=-\frac{2\pi c}{\lambda_0^2}<0,
\qquad
\frac{dn}{d\lambda_0}=\frac{dn}{d\omega}\frac{d\omega}{d\lambda_0}.
$$

因此

| 分类 | 真空波长判据 | 频率判据 | 常见位置 |
|---|---|---|---|
| 正常色散 | $dn/d\lambda_0<0$ | $dn/d\omega>0$ | 透明波段，常见于远离吸收峰处 |
| 反常色散 | $dn/d\lambda_0>0$ | $dn/d\omega<0$ | 吸收共振附近的部分区域 |

正常或反常色散由导数符号分类，折射率与 1 的大小比较则决定相速度与 $c$ 的关系。单个共振在吸收峰附近可产生反常色散；多共振材料应根据实际 $n(\omega)$ 的斜率划分各频段。

### 5.2 从 Lorentz 模型推导 Cauchy 公式

对一个远高于入射频率的共振，假设 $\omega\ll\omega_0$、阻尼可忽略，且采用弱极化近似：

$$
n\simeq1+\frac{\Omega^2}{2(\omega_0^2-\omega^2)}
=1+a\frac1{1-(\omega/\omega_0)^2},\quad
a=\frac{\Omega^2}{2\omega_0^2}.
$$

令 $x=(\omega/\omega_0)^2\ll1$，使用 $(1-x)^{-1}=1+x+x^2+\cdots$，再代入 $\omega=2\pi c/\lambda_0$：

$$
\begin{aligned}
n&\simeq1+a+a\frac{\omega^2}{\omega_0^2}+a\frac{\omega^4}{\omega_0^4}+\cdots\\
&=\boxed{A+\frac B{\lambda_0^2}+\frac C{\lambda_0^4}+\cdots}.
\end{aligned}
$$

Cauchy（科希）公式由远离共振时的频率展开得到。上述单振子、弱极化近似给出 $A=1+a$、$B=a(2\pi c/\omega_0)^2$、$C=a(2\pi c/\omega_0)^4$。一般材料对 $\sqrt{\varepsilon_r(\omega)}$ 作低频展开也可得到同类幂级数，其系数由实际材料响应确定。

较窄波段常只保留两项：

$$
n=A+\frac B{\lambda_0^2},\qquad
\boxed{\frac{dn}{d\lambda_0}=-\frac{2B}{\lambda_0^3}}.
$$

当 $B>0$，$dn/d\lambda_0<0$，属于正常色散。随波长增加，该负导数趋近 0，绝对值减小。紫光的 $n$ 较大，通常经棱镜偏折也较大；短波端 $|dn/d\lambda_0|$ 较大，等波长间隔在光谱上展开得更宽（课件 P29 至 30）。

<a id="_5-3-为什么共振附近出现反常色散"></a>

### 5.3 共振附近的反常色散

在弱极化近似中 $n-1\simeq\chi'_e/2$。若阻尼较小，在 $\omega=\omega_0$ 附近定义 $\delta=\omega-\omega_0$，有

$$
\omega_0^2-\omega^2\simeq-2\omega_0\delta,\qquad
\gamma\omega\simeq\gamma\omega_0.
$$

所以

$$
\chi'_e\simeq-\frac{2\Omega^2\delta}{\omega_0(4\delta^2+\gamma^2)},\qquad
\chi''_e\simeq\frac{\Omega^2\gamma}{\omega_0(4\delta^2+\gamma^2)}.
$$

$\chi''_e$ 是吸收峰，而 $\chi'_e$ 在峰两侧由正转负。在峰中心

$$
\left.\frac{dn}{d\omega}\right|_{\omega_0}
\simeq-\frac{\Omega^2}{\omega_0\gamma^2}<0,
$$

因此 $dn/d\lambda_0>0$，形成反常色散。以上近共振计算仍要求弱极化；响应较大时，须从完整复平方根求 $n$。吸收与色散来自同一复响应，因果性通过 Kramers-Kronig 关系约束二者，这是进一步的电动力学联系。

<a id="_5-4-实验观察怎样-画出-色散曲线"></a>

### 5.4 交叉棱镜显示色散曲线

牛顿交叉棱镜实验先把波长沿一个方向展开，再用第二棱镜沿近似垂直方向按其 $n(\lambda_0)$ 偏折，得到弯曲彩色光带（课件 P34）。第一方向提供非均匀波长坐标，第二方向反映折射率；光带形状由此显示材料的色散。

伍德实验借钠蒸汽观察吸收共振附近的异常偏折，并在另一方向将波长展开。曲线在共振附近改变，显示反常色散（P35）。强吸收带的透射光很弱，缩短样品光程可提高可测信号，P32 的薄石英片也利用了这一点。

<a id="_5-5-与电动力学的群速度联系-拓展"></a>

### 5.5 色散与波包群速度

对弱吸收、窄带且传播中波包形状变化不大的情形，$k=n(\omega)\omega/c$ 给出

$$
v_g=\frac{d\omega}{dk}
=\frac{c}{n+\omega\,dn/d\omega}
=\boxed{\frac{c}{n-\lambda_0\,dn/d\lambda_0}}.
$$

正常色散通常给出 $n_g=n-\lambda_0n'>n$，从而 $v_g<v_p$。强吸收或反常色散区的波包可能显著变形，此时群速度不再直接代表能量或信息传输速度；相速度及异常群速度的数值也需结合完整因果响应解释。波导还可因边界几何产生色散，即使填充材料的 $n$ 与频率无关，传播常数也可能依赖频率。

<a id="_6-非均匀介质-光程、费马原理与光线弯曲"></a>

## 6. 空间变化的介质与光路

来源：课件 P36至44。

<a id="_6-1-最大的变化是不能再令电场散度为零"></a>

### 6.1 介电常数梯度与波动方程

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

<a id="_6-2-光程为什么决定相位"></a>

### 6.2 光程与相位积累

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

无色散时，$t=\int ds/v_p=\mathcal L/c$。色散介质中的单频相位由 $\int n\,ds$ 决定，窄带脉冲的群延迟则使用 $\int n_g\,ds/c$。

<a id="_6-3-费马原理是平稳光程-不是总取最短路"></a>

### 6.3 光程的驻值与费马原理

固定起点 $P$、终点 $Q$，物理光路满足

$$
\boxed{\delta\mathcal L=\delta\int_P^Q n(\mathbf r)\,ds=0}.
$$

变分 $\delta$ 比较固定端点间相邻候选路径的光程。驻值可对应局部极小、极大或更一般的驻点；理想成像中，一族可通光路还可能具有相等光程，对应课件 P39 至 40 所说的“常数”。

均匀介质中 $n$ 为常数，$\mathcal L=n\int ds$。两点间的直线使几何长度取局部最小值，因而得到直线传播（P41）。几何光学要求介质变化尺度远大于波长；衍射显著或接近焦散时，应使用波动描述。

<a id="_6-4-从费马原理推到光线方程-推导补充"></a>

### 6.4 由变分求光线方程

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

<a id="_6-5-用同一判据解释海市蜃楼与沙漠幻影"></a>

### 6.5 折射率梯度与蜃景

在压强变化可忽略的局部近似中，气体 $n-1$ 与密度大致成正比，密度又随温度升高而减小。

- 寒冷海面附近的上蜃景（P42）：低处空气较冷、密度较大，$n$ 较大；高处 $n$ 较小，光线向下弯曲。观察者沿入眼光线的切线反向延长，可将远物看在较高位置。
- 炽热地面上方的下蜃景（P43）：近地空气更热、密度更低，$n$ 较小；上方 $n$ 较大，光线向上弯曲。天空或远物的光到达观察者后，沿入眼方向反向延长形成地面下方的虚像，产生“积水”感。
- 实验室中的光学弯折（P44）：人为制造折射率梯度，光线也会形成曲线路径，其曲率方向由 $\nabla n$ 的横向分量决定。

指数剖面 $n^2(h)=n_0^2+n_p^2e^{-ah}$ 在 $a>0$ 时给出 $dn/dh<0$，可描述折射率随高度增加而降低的剖面（P42）。参数值取决于所模拟的大气条件与单位。

<a id="_7-和已有电动力学复习笔记互相校准"></a>

## 7. 自由载流子、趋肤与倏逝

自由载流子、导电损耗与束缚电子极化可以放在同一频域框架中讨论。以下沿用 $e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，并与《平面波的横波性与能流》《亥姆霍兹方程》《色散与Drude模型》《导电介质中的电磁波》对应。

<a id="_7-1-束缚电子的-lorentz-模型如何退化为-drude-模型"></a>

### 7.1 Lorentz 模型的自由电子极限

把回复力去掉，即令 $\omega_0=0$：

$$
\varepsilon_r(\omega)=1+\frac{\Omega^2}{-\omega^2-i\gamma\omega}
=\boxed{1-\frac{\omega_p^2}{\omega(\omega+i\gamma)}},\qquad
\omega_p^2=\frac{Ne^2}{\varepsilon_0m}.
$$

这就是自由电子 Drude 模型，$\gamma=1/\tau_{\rm col}$ 是碰撞弛豫率。相应电导率

$$
\boxed{\sigma(\omega)=\frac{Ne^2}{m(\gamma-i\omega)}},\qquad
\boxed{\varepsilon_{r,\rm eff}=\varepsilon_{r,b}+\frac{i\sigma(\omega)}{\varepsilon_0\omega}}.
$$

由 $\nabla\times\mathbf H=\sigma\mathbf E-i\omega\varepsilon_0\varepsilon_{r,b}\mathbf E$ 可把自由电子电流合并进 $\varepsilon_{r,\rm eff}$；此后全部响应已由该介电函数表示。Drude 模型描述自由载流子，真实金属的束缚电子和带间跃迁需另加相应响应。

$\tau_{\rm col}=1/\gamma$ 是电子碰撞弛豫时间，$\tau_q=\varepsilon/\sigma_{\rm dc}$ 是导体体电荷弛豫时间。前者控制载流子的动量响应，后者描述体电荷恢复中性的时间尺度。

<a id="_7-2-光学吸收长度和电动力学趋肤深度差在哪里"></a>

### 7.2 振幅趋肤深度与强度吸收长度

电动力学常记复波数 $\widetilde k=\beta+ia$，则 $E\propto e^{-az}$；光学常记 $\widetilde n=n+i\kappa$，则 $a=k_0\kappa$。因此

$$
\boxed{\delta_E=\frac1a=\frac1{k_0\kappa}=\frac2\alpha},\qquad
\boxed{\ell_I=\frac1\alpha=\frac{\delta_E}{2}}.
$$

对电导率近似实常数、满足 $\sigma_{\rm dc}\gg\omega\varepsilon$ 的良导体，

$$
\widetilde k^2\simeq i\omega\mu\sigma_{\rm dc},\qquad
\widetilde k\simeq(1+i)\sqrt{\frac{\omega\mu\sigma_{\rm dc}}2},\qquad
\boxed{\delta_E=\sqrt{\frac2{\omega\mu\sigma_{\rm dc}}}}.
$$

近似直流电导率通常要求 $\omega\tau_{\rm col}\ll1$，再结合 $\sigma_{\rm dc}\gg\omega\varepsilon$ 得到上述趋肤公式。进入光频后，应先采用频率相关的 Drude 响应判断所处频段。

<a id="_7-3-指数衰减不总等于耗散"></a>

### 7.3 无耗倏逝场的空间衰减

无碰撞 Drude 介质 $\gamma=0$、$\omega<\omega_p$ 时，$\varepsilon_r=1-\omega_p^2/\omega^2<0$，选衰减分支得纯虚 $\widetilde n=i\kappa$。内部场沿深度指数衰减，但

$$
\varepsilon''_r=0,\qquad
q_{\rm abs}=\frac12\omega\varepsilon_0\varepsilon''_r|E|^2=0.
$$

这是无耗倏逝场：$\mathbf E$ 与 $\mathbf H$ 相差 $\pi/2$，单一半空间衰减解的法向平均能流为零。$\kappa>0$ 在此描述场的空间衰减，热耗散则由 $\varepsilon''_r$ 和平均做功判断。前面吸收定律所用的向前能流，在这一纯倏逝模型中为零。

<a id="_7-4-强色散介质中能量密度要带上介质运动"></a>

### 7.4 色散介质的场与粒子储能

无色散、无耗介质的平均场能为 $\overline u=\varepsilon E_0^2/4+\mu H_0^2/4$。色散介质还通过电子运动储存能量；在透明、弱损耗窄带近似下，总储能密度为

$$
\overline u=\frac14\frac{d(\omega\varepsilon')}{d\omega}|E_0|^2
+\frac14\frac{d(\omega\mu')}{d\omega}|H_0|^2.
$$

$\varepsilon',\mu'$ 是绝对参数。频率导数项包含介质响应的储能，可用于讨论群速度与能量速度；强耗散频段需要采用相应的能量交换描述。

<a id="_8-考前自测-5-道带步骤的题"></a>

## 8. 自测与详解

### 题 1：入射频率不变，哪些量改变？

真空波长 $\lambda_0=600\,\mathrm{nm}$ 的单色光进入无耗非磁介质，$n=1.50$。求频率、介质波长、相速度与相对介电常数。若已知介质内部峰值电场为 $100\,\mathrm{V/m}$，求强度。取 $c=3.00\times10^8\,\mathrm{m/s}$，$\varepsilon_0=8.85\times10^{-12}\,\mathrm{F/m}$。

解：频率由光源与时间不变边界决定，

$$
\nu=\frac c{\lambda_0}=5.00\times10^{14}\,\mathrm{Hz}.
$$

$$
\lambda_m=\frac{600}{1.50}=400\,\mathrm{nm},\qquad
v_p=\frac c n=2.00\times10^8\,\mathrm{m/s},\qquad
\varepsilon_r=n^2=2.25.
$$

$$
I=\frac12n\varepsilon_0cE_0^2
=\frac12(1.50)(8.85\times10^{-12})(3.00\times10^8)(100)^2
\approx19.9\,\mathrm{W/m^2}.
$$

题目给的是介质内部场，可直接求内部能流。$E_0$ 为峰值，$1/2$ 来自周期平均。

### 题 2：实部、虚部与耗散能否相互验证？

稀薄介质有单一 Lorentz 共振。某频率处 $\Delta=\omega_0^2-\omega^2=3a$、$\gamma\omega=a$，且 $\Omega^2=0.10a$，其中 $a>0$ 的单位为 $\mathrm{s^{-2}}$。求 $\chi_e$ 和一阶近似 $n,\kappa$，判断是否吸收、是否正好共振。

解：

$$
\chi_e=\frac{0.10a}{3a-ia}
=0.10\frac{3+i}{10}=0.03+0.01i.
$$

$|\chi_e|\approx0.0316\ll1$，故

$$
n\simeq1+0.03/2=1.015,\qquad \kappa\simeq0.01/2=0.005.
$$

$\chi''_e>0$ 表示存在正吸收功率；$\Delta>0$ 给出 $\omega<\omega_0$。一阶近似值代回完整关系得到 $2n\kappa\approx0.01015$，与 $\chi''_e=0.010$ 的差异为二阶近似误差。平均耗散为 $q_{\rm abs}=0.005\,\omega\varepsilon_0 E_0^2$。

### 题 3：由透射测量反推消光系数和浓度效应

某溶液在 $\lambda_0=500\,\mathrm{nm}$ 下，扣除界面反射后，厚度 $L=1.00\,\mathrm{mm}$ 的内部透射率为 $T=0.250$。求 $\alpha,\kappa$、场振幅比、强度 $1/e$ 长度；若浓度减半并保持 Beer 定律成立，同一厚度透射率为多少？

解：由 $T=e^{-\alpha L}$：

$$
\alpha=-\frac{\ln T}{L}=\frac{\ln4}{10^{-3}}
\approx1.386\times10^3\,\mathrm{m^{-1}}.
$$

$$
\kappa=\frac{\alpha\lambda_0}{4\pi}
\approx5.52\times10^{-5},\qquad
\frac{|E(L)|}{|E(0)|}=\sqrt T=0.500.
$$

$$
\ell_I=\alpha^{-1}\approx0.721\,\mathrm{mm},\qquad
\ell_E=2\ell_I\approx1.44\,\mathrm{mm}.
$$

浓度减半使 $\alpha$ 减半，$T_{\rm new}=e^{-\alpha L/2}=\sqrt{T}=0.500$。一般的浓度缩放通过指数改变透射率；这里由 $T=1/4$ 恰好得到数值上的两倍。

### 题 4：Cauchy 公式和群速度的单位检验

透明介质在某波段满足 $n=A+B/\lambda_0^2$，$A=1.50$，$B=0.00400\,\mu\mathrm m^2$。求 $\lambda_0=0.500\,\mu\mathrm m$ 时 $n$、$dn/d\lambda_0$、群折射率 $n_g$ 与群速度，判断正常还是反常色散。

解：按 $B$ 的单位，以微米代入波长：

$$
n=1.50+\frac{0.00400}{0.500^2}=1.516,
$$

$$
\frac{dn}{d\lambda_0}=-\frac{2B}{\lambda_0^3}
=-0.0640\,\mu\mathrm m^{-1}<0.
$$

所以为正常色散。群折射率

$$
n_g=n-\lambda_0\frac{dn}{d\lambda_0}
=1.516-0.500(-0.0640)=1.548,
$$

$$
v_g=\frac c{1.548}\approx1.94\times10^8\,\mathrm{m/s},
\qquad v_p=\frac c{1.516}\approx1.98\times10^8\,\mathrm{m/s}.
$$

$v_g<v_p$ 与正常色散一致。这一传播时间解释采用弱吸收、窄带且波包形变较小的条件。

### 题 5：同一费马原理，离散界面与连续梯度

（a）上半平面折射率 $n_1$、下半平面 $n_2$。起点 $P=(0,a)$、终点 $Q=(d,-b)$，光线在界面 $y=0$ 的 $X=(x,0)$ 处折射。由费马原理导出折射定律。

（b）若介质连续变化为 $n(z)=n_0+gz$，$g>0$，光线初始水平，且竖直偏移很小，求其近似轨迹。

解（a）：候选光程为

$$
\mathcal L(x)=n_1\sqrt{x^2+a^2}+n_2\sqrt{(d-x)^2+b^2}.
$$

令导数为零：

$$
\frac{d\mathcal L}{dx}
=n_1\frac{x}{\sqrt{x^2+a^2}}
-n_2\frac{d-x}{\sqrt{(d-x)^2+b^2}}=0.
$$

两个比值分别是以界面法线为基准的 $\sin\theta_1,\sin\theta_2$，因此

$$
\boxed{n_1\sin\theta_1=n_2\sin\theta_2}.
$$

解（b）：光线方程的竖直分量为 $d(nt_z)/ds=g$。小斜率、$|gz|\ll n_0$ 时 $s\simeq x$、$n\simeq n_0$、$t_z\simeq dz/dx$，故

$$
n_0\frac{d^2z}{dx^2}\simeq g.
$$

取 $z(0)=0,z'(0)=0$，得

$$
\boxed{z(x)\simeq\frac{g}{2n_0}x^2}.
$$

光线向 $z$ 增大、折射率更大的一侧弯曲，和沙漠地面上方由低处热空气到高处冷空气的弯曲方向一致。$g$ 的单位为 $\mathrm{m^{-1}}$，所以 $gx^2$ 是长度；当偏移或斜率变大时应回到完整光线方程。

<a id="_9-复习时应能独立完成的检查"></a>

## 9. 推导练习

- 从两条旋度方程推到波动方程，并说明在哪一步用了“均匀”。
- 从电子运动方程推到 $\chi_e$，说明 $-i\gamma\omega$ 与正的 $\chi''_e$。
- 从 $\widetilde n=n+i\kappa$ 推出场衰减、强度衰减和 $\alpha=4\pi\kappa/\lambda_0$。
- 解释正常/反常色散的导数符号，用级数展开推导 Cauchy 公式并列出条件。
- 从光程写出相位和费马变分，用 $d(n\mathbf t)/ds=\nabla n$ 判断光线弯曲。
- 区分 Lorentz 与 Drude、强度吸收长度与趋肤深度、材料色散与波导色散，以及耗散吸收与纯倏逝衰减。

## 10. 来源与交叉阅读

主课件为《光学20261019_光的传播_I.pdf》。P3至6 对应第 2 节，P7至18 对应第 3 节，P19至26 对应第 4 节，P27至35 对应第 5 节，P36至44 对应第 6 节。群速度、光线变分及第 7 节进一步联系电动力学；自测按这些概念编制。

已有电动力学笔记位置：`物理/电动力学/电动力学复习/电动力学复习/04-电磁波的传播/`。推荐按以下顺序对照阅读：

1. 《平面波的横波性与能流》：对应本章第 2 节与峰值振幅的 $1/2$ 因子。
2. 《亥姆霍兹方程》：对应本章单频波动方程与边界/几何导致的色散。
3. 《色散与Drude模型》：对应第 3 节 Lorentz 响应与第 7.1 节自由电子极限。
4. 《导电介质中的电磁波》：对应第 7.2至7.3 节的趋肤、复波数、倏逝场；跨笔记使用 $\alpha$ 时先确认它代表场衰减还是强度衰减。
