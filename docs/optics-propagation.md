---
title: "光的传播与介质响应"
outline: [2, 3]
---


# 光的传播与介质响应

本章依照课件第七章的五条主线整理：宏观 Maxwell 方程给出传播规律；微观受迫振子解释介质响应；复折射率同时描述相位和吸收；响应随频率变化形成色散；响应随空间变化使光线弯曲。课件范围为《光学20261019_光的传播_I.pdf》PDF 第 1–44 页；文中页码均为 PDF 页码。

## 1. 符号、条件与知识地图

全章统一使用

$$
\mathbf E_{\rm real}(\mathbf r,t)=\operatorname{Re}\!\left[\widetilde{\mathbf E}(\mathbf r)e^{-i\omega t}\right],\qquad
\widetilde{\mathbf E}=\mathbf E_0e^{i\mathbf k\cdot\mathbf r}.
$$

$E_0$ 是峰值振幅，时间平均二次量带 $1/2$。电荷量 $e>0$，电子电荷为 $-e$。使用 $\varepsilon_r,\mu_r$ 表示相对介电常数、相对磁导率，绝对量为 $\varepsilon_0\varepsilon_r,\mu_0\mu_r$。课件把相对量直接写成 $\varepsilon,\mu$，本笔记加下标避免与电动力学中的绝对量混淆。

| 量 | 记号与单位 | 应记住的区别 |
|---|---|---|
| 真空波长、真空波数 | $\lambda_0=2\pi c/\omega$，$k_0=\omega/c$ | 色散公式中的波长默认是真空波长 |
| 介质波长、相速度 | $\lambda_m=\lambda_0/n$，$v_p=c/n$ | 介质改变波长，静止介质界面不改变频率 |
| 复折射率 | $\widetilde n=n+i\kappa$，无量纲 | 课件用 $\eta$ 表示消光系数；此处用 $\kappa$ |
| 强度吸收系数 | $\alpha$，$\mathrm{m^{-1}}$ | $I\propto e^{-\alpha z}$，不是场振幅的衰减常数 |
| 光程 | $\mathcal L=\int n\,ds$，m | 几何长度 $s$、光程 $\mathcal L$、相位 $k_0\mathcal L$ 是三个量 |

> **概念先分开。**“线性”指响应与场成正比；“各向同性”指同一位置的响应不依赖方向；“均匀”指响应不依赖位置。“各向同性”不推出“均匀”，也不表示折射率不随频率变化。课件 P5 对各向同性介质的说明包含了该节同时采用的均匀假设。

## 2. 均匀各向同性线性介质：从 Maxwell 方程到光强

来源：课件 P3–6。

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

最后一步使用普通光学介质 $\mu_r\simeq1$。对于色散介质，$\varepsilon_r(\omega)$ 只在频域中与对应频率分量相乘，不能把这个频率相关量当成适用于任意时变场的瞬时时域常数。

### 2.2 单色解、横波性与频率不变

取 $\mathbf E=\mathbf E_0 e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，代入得

$$
k^2=\varepsilon_r\mu_r\frac{\omega^2}{c^2},\qquad
\boxed{\mathbf k\cdot\mathbf E_0=0},\qquad
\boxed{\mathbf B_0=\frac{\mathbf k\times\mathbf E_0}{\omega}}.
$$

后两式须由 Maxwell 的散度、旋度方程取得；仅解波动方程还不能保证得到物理允许的横向场。均匀无耗介质中 $\mathbf E,\mathbf H,\mathbf k$ 两两垂直，并构成右手关系。

沿 $+z$ 传播时

$$
\mathbf E_{\rm real}(z,t)=\mathbf E_0\cos(nk_0z-\omega t+\phi_0),\qquad
\lambda_m=\frac{\lambda_0}{n}.
$$

同一相位满足 $nk_0z-\omega t=\text{常数}$，所以 $dz/dt=\omega/(nk_0)=c/n$。静止、时间不变的介质界面要求边界条件对任意 $t$ 成立，入射、反射、透射波具有同一 $\omega$；并非因折射率变大而频率变低。

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

因此同一介质内可简写 $I\propto E_0^2$；比较不同非磁介质时必须保留 $n$。若讨论斜放表面的接收通量，还须乘光线与该表面法线夹角的余弦，不能把这两个面积定义混用。

**电动力学联系：**这正是《平面波的横波性与能流》的 $I=E_0^2/(2Z)$；光学中的 $n$ 控制相位，电动力学中的 $Z$ 控制 $E/H$ 和能流。普通非磁介质使 $Z=Z_0/n$，两个参数才可由一个 $n$ 联系起来。

## 3. Lorentz 振子：把宏观折射率追溯到电子运动

来源：课件 P7–18。

### 3.1 模型、运动方程与适用条件

把束缚电子看成在平衡位置附近做受迫阻尼振动的谐振子。正电中心近似不动，电子位移为 $\mathbf r$，弹性系数为 $f$，阻尼系数为 $g$：

$$
m\ddot{\mathbf r}=-e\mathbf E-f\mathbf r-g\dot{\mathbf r}.
$$

令 $\omega_0^2=f/m$、$\gamma=g/m$，得

$$
\boxed{\ddot{\mathbf r}+\gamma\dot{\mathbf r}+\omega_0^2\mathbf r=-\frac e m\mathbf E}.
$$

模型假设：电子速度 $v_e\ll c$；电子振动范围远小于光场空间变化尺度（通常 $|\mathbf k|r\ll1$）；振幅足够小使回复力近似线性；忽略原子间复杂耦合并用阻尼概括能量损失。光波中磁力与电力之比约为 $v_eB/E\sim nv_e/c\ll1$，因此只保留电场力。这里 $v_e$ 是电子速度，不是光的相速度。

### 3.2 逐步导出复极化率

驱动频率为 $\omega$，稳态电子也以该频率振动，而非以自由振动频率 $\omega_0$ 振动。取

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

### 3.3 为什么虚部代表吸收：直接算平均功率

极化电流为 $\widetilde{\mathbf J}_P=-i\omega\widetilde{\mathbf P}$。光场对介质做功的平均功率密度

$$
\begin{aligned}
q_{\rm abs}
&=\frac12\operatorname{Re}\!\left(\widetilde{\mathbf J}_P\cdot\widetilde{\mathbf E}^{\,*}\right)\\
&=\frac12\omega\varepsilon_0\chi''_e|\widetilde{\mathbf E}|^2\ge0.
\end{aligned}
$$

也可从阻尼力求出每单位体积耗散率：$Nm\gamma\langle\dot{\mathbf r}^{2}\rangle=Nm\gamma\omega^2|\widetilde{\mathbf r}|^2/2$，代入上节位移即可得到同一结果。这把“相位差”“阻尼”“光能转化为热”等说法连成一个定量结论。无阻尼且远离共振时没有平均吸收，但仍可有很强的色散。

### 3.4 从复介电常数得到复折射率

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

普通非磁、被动介质选择使进入介质的波不发散的平方根分支。对 $n\ge0,\kappa\ge0$，可显式写成

$$
n=\sqrt{\frac{|\varepsilon_r|+\varepsilon'_r}{2}},\qquad
\kappa=\sqrt{\frac{|\varepsilon_r|-\varepsilon'_r}{2}}.
$$

弱极化 $|\chi_e|\ll1$ 时才可用

$$
\widetilde n=\sqrt{1+\chi_e}\simeq1+\frac{\chi_e}{2},\qquad
\boxed{n\simeq1+\frac{\chi'_e}{2},\quad\kappa\simeq\frac{\chi''_e}{2}}.
$$

不能仅凭“吸收弱”就用 $n\simeq1+\chi'_e/2$；例如透明玻璃可以吸收很弱，但 $\chi'_e$ 并不远小于 1。弱吸收且 $n$ 已知时更一般的关系是 $\kappa\simeq\varepsilon''_r/(2n)$。

> **课件符号核验（P10、P14、P21）。**原页中部分空间指数写成 $e^{-ik_0\widetilde nz}$，又同时取 $\widetilde n=n+i\eta$ 并写出衰减，代数符号不自洽。本资料统一成 $e^{+ik_0\widetilde nz-i\omega t}$，于是正虚部自然产生 $e^{-k_0\kappa z}$。P14 把 $n,\eta$ 的两个代数关系称作“亥姆霍兹方程”，应与电动力学中的定态波动方程 $\nabla^2\widetilde{\mathbf E}+k^2\widetilde{\mathbf E}=0$ 区分。

### 3.5 不同频段与多振子

忽略阻尼并远离共振时

$$
\boxed{n^2\simeq1+\frac{\Omega^2}{\omega_0^2-\omega^2}}.
$$

这是单共振的 Sellmeier 型表达式（课件 P15）。

- $\omega\ll\omega_0$：回复力主导，极化大致跟随电场，通常 $n>1$，且 $n$ 随 $\omega$ 增大。
- $\omega\approx\omega_0$：受迫振幅和耗散很大，必须保留阻尼；$\gamma=0$ 的发散说明无损稳态近似在共振处失效。
- $\omega\gg\omega_0$ 且高到 $\Omega^2/\omega^2\ll1$：惯性主导，$n^2\simeq1-\Omega^2/\omega^2$，$n$ 从小于 1 的一侧趋近 1。不能由“$\omega>\omega_0$”就断言一定存在实数 $n<1$ 的无耗传播区，中间可能有 $\varepsilon'_r<0$ 的区间。

真实材料往往有多个共振：

$$
\boxed{\varepsilon_r(\omega)=1+\sum_j\frac{\Omega_j^2}{\omega_{0j}^2-\omega^2-i\gamma_j\omega}}.
$$

经典模型能解释吸收与色散的形状，不能自行预言所有本征频率和振子强度。量子跃迁理论可给出相似形式的响应函数，但参数含义来自能级、跃迁矩阵元与占据数，而不是机械小弹簧。

## 4. 吸收：从复折射率到 Lambert–Beer 定律

来源：课件 P18–26。

### 4.1 两条路线推导指数衰减

**宏观薄层路线。**厚度 $dz$ 的介质所吸收的强度与当前强度 $I$ 和厚度成正比：

$$
dI=-\alpha I\,dz\quad\Longrightarrow\quad
\int_{I(0)}^{I(L)}\frac{dI}{I}=-\alpha\int_0^Ldz.
$$

均匀介质给出 Bouguer–Lambert 定律：

$$
\boxed{I(L)=I(0)e^{-\alpha L}}.
$$

若 $\alpha=\alpha(z)$，推广为 $I(L)=I(0)\exp[-\int_0^L\alpha(z)dz]$。这里 $I(0)$ 指已进入介质内部的强度；若题目给外部入射强度，应另计界面反射。

**电磁波路线。**令 $\widetilde k=k_0(n+i\kappa)$，则

$$
\mathbf E(z,t)=\mathbf E_0e^{-k_0\kappa z}e^{i(k_0nz-\omega t)}.
$$

在同一均匀介质内 $I\propto|\widetilde{\mathbf E}|^2$，故

$$
I(z)=I(0)e^{-2k_0\kappa z},\qquad
\boxed{\alpha=2k_0\kappa=\frac{2\omega\kappa}{c}=\frac{4\pi\kappa}{\lambda_0}}.
$$

指数中使用 $\lambda_0$，不是 $\lambda_m$。因此场振幅衰减到 $1/e$ 的长度为 $\ell_E=1/(k_0\kappa)=2/\alpha$；强度衰减到 $1/e$ 的长度为 $\ell_I=1/\alpha$。

若 $\mu_r$ 为实常数，吸收平面波的精确强度前因子仍为

$$
I(z)=\frac12\operatorname{Re}\!\left(\frac1{Z^*}\right)|\widetilde E(z)|^2
=\frac{n}{2\mu_r Z_0}|\widetilde E(z)|^2.
$$

这说明指数衰减可由场模平方取得，但绝对强度不能一般直接写成 $|E|^2$。

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

$a_C$ 的自然指数系数与十进制摩尔消光系数 $\epsilon_{\rm mol}$ 差一个 $\ln10$，不要混用。Beer 线性关系要求吸收分子的状态与相互作用基本不随浓度改变；高浓度下分子作用、化学平衡变化、散射或强光饱和均可使它偏离。Lambert 定律的线性指 $\alpha$ 不依赖入射强度，绝不表示 $I$ 随厚度线性下降。

### 4.3 看懂现象类题：吸收种类、颜色和光谱

| 课件概念 | 解释与判断依据 |
|---|---|
| 一般吸收（P23） | 在所讨论的有限波段内，各波长吸收近似相同，主要降低明暗；不表示在全部电磁谱上都无选择性 |
| 选择吸收（P23） | $\alpha(\lambda_0)$ 随波长显著变化，白光经过材料后光谱权重改变，出现颜色 |
| 体色（P24） | 选择吸收决定体内传播后剩下的光谱，例如绿色玻璃主要透过绿光；表面镜面反射仍可能接近白色 |
| 表面色（P24） | 表面选择反射使反射光具有特殊光谱，不能仅由透射谱判断其颜色 |
| 大气窗口（P24） | 大气在特定波段吸收较弱，是红外探测、导航、遥感选择工作波段的重要依据；窗口位置与成分、含水量等条件有关 |
| 吸收光谱（P25–26） | 连续光源穿过样品后，由光谱仪比较各波长强度；特定吸收线或吸收带提供物质鉴别信息 |

课件对体色“透射光和反射光颜色一样”的概括应理解为体内选择吸收主导的出射光；物体表面镜面反射、照明光谱、厚度与散射都会影响实际观察，不能用作所有表面和所有材料的严格定理。物体透明程度由 $\alpha L$ 共同决定，所以同一材料薄片可能透明、厚块可能近乎不透光。

## 5. 色散：正常与反常怎样由同一响应产生

来源：课件 P27–35。

### 5.1 定义和导数符号

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

不要把 $n<1$ 等同于反常色散；反常是导数的符号，不是 $n$ 与 1 的大小关系。课件吸收带与反常色散的叙述描述单个典型共振的主要特征；真实多共振材料中应按实际导数划分，不能认为每一处可测吸收都必然反常。

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

这是 Cauchy（科希）经验公式的物理来源；此处单振子近似给出 $A=1+a$、$B=a(2\pi c/\omega_0)^2$、$C=a(2\pi c/\omega_0)^4$。更一般的材料可对 $\sqrt{\varepsilon_r(\omega)}$ 作低频展开，也得到类似幂级数，但系数不应照搬这一弱极化结果。

较窄波段常只保留两项：

$$
n=A+\frac B{\lambda_0^2},\qquad
\boxed{\frac{dn}{d\lambda_0}=-\frac{2B}{\lambda_0^3}}.
$$

当 $B>0$，这是正常色散；随波长增加，导数从负值趋向 0，**导数数值增大，导数绝对值减小**。课件 P29–30 中“色散率降低”的文字应按色散强弱、即绝对值变小理解。紫光 $n$ 较大、一般棱镜偏折较大；短波端 $|dn/d\lambda_0|$ 较大，等波长间隔的展开也较宽。

### 5.3 为什么共振附近出现反常色散

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

故 $dn/d\lambda_0>0$，形成反常色散。此推导同时要求在所考虑频段仍满足弱极化；若共振响应太大，应直接由完整复平方根求 $n$。吸收和色散是同一复响应的两个方面；因果性进一步通过 Kramers–Kronig 关系约束二者（电动力学拓展，课件未要求推导）。

### 5.4 实验观察怎样“画出”色散曲线

课件 P34 的牛顿交叉棱镜法：第一棱镜把波长沿一个方向展开；第二棱镜在近似垂直方向按其自身 $n(\lambda_0)$ 再偏折，得到弯曲彩色光带。第一方向相当于非均匀的波长坐标，第二方向反映折射率，因此光带形状可直观展示色散，不能直接把屏幕横坐标当成等间隔波长轴。

P35 的伍德实验用钠蒸汽观察吸收共振附近的异常偏折，再借棱镜的另一方向展开不同波长；共振附近曲线突然改变显示反常色散。强吸收带中透过光很弱，往往须缩短样品光程，这也是课件 P32 薄石英片说明的重点。

### 5.5 与电动力学的群速度联系（拓展）

对弱吸收、窄带且传播中波包形状变化不大的情形，$k=n(\omega)\omega/c$ 给出

$$
v_g=\frac{d\omega}{dk}
=\frac{c}{n+\omega\,dn/d\omega}
=\boxed{\frac{c}{n-\lambda_0\,dn/d\lambda_0}}.
$$

正常色散通常使群折射率 $n_g=n-\lambda_0n'>n$，从而 $v_g<v_p$。在强吸收、反常色散区，波包会明显变形，群速度不能直接当作信息或能量传输速度；$v_p>c$ 或某些异常群速度均不表示信息超光速。电动力学中的波导也有色散，但可能来自边界几何，即使填充介质的 $n$ 不随频率变化仍会存在，须与本节“材料色散”区分。

## 6. 非均匀介质：光程、费马原理与光线弯曲

来源：课件 P36–44。

### 6.1 最大的变化是不能再令电场散度为零

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

梯度项使场分量发生耦合，不能把均匀介质的标量波动方程不加说明地直接套到全部分量上。若 $\mu_r$ 也随位置变化，还需加 $\nabla\ln\mu_r\times(\nabla\times\mathbf E)$ 项；最稳妥的频域形式为

$$
\boxed{\nabla\times\!\left[\mu_r^{-1}(\mathbf r)\nabla\times\widetilde{\mathbf E}\right]
-k_0^2\varepsilon_r(\mathbf r)\widetilde{\mathbf E}=0}.
$$

这也是电动力学中处理复杂本构的共同起点。课件 P37 的电场公式暗用了恒定 $\mu_r$；其磁场“同理”一式不宜作为一般非均匀介质公式记忆，例如 $\mu_r$ 恒定而 $\varepsilon_r$ 变化时，磁场方程仍含介电常数梯度项。

### 6.2 光程为什么决定相位

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

若替换等长空气路径为厚度 $d$、折射率 $n$ 的平板，新增光程为 $(n-1)d$，不是 $nd$。两束光的相位差取决于光程差 $\Delta\mathcal L$，这是后续干涉问题的直接入口。

对无色散传播，$t=\int ds/v_p=\mathcal L/c$；但在色散介质中，单频相位光程 $\int n\,ds$ 和脉冲群延迟 $\int n_g\,ds/c$ 不同，不能一律用相位光程推断脉冲到达时间。

### 6.3 费马原理是平稳光程，不是总取最短路

固定起点 $P$、终点 $Q$，物理光路满足

$$
\boxed{\delta\mathcal L=\delta\int_P^Q n(\mathbf r)\,ds=0}.
$$

“$\delta$”比较的是端点相同的相邻候选路径。平稳包括局部极小、极大或更一般驻值；成像时一族可通光路还可能具有相同光程。课件 P39–40 的“常数”主要提示理想成像中的等光程关系，不能把所有驻值情形都要求为全局最小。

在均匀介质中 $n$ 为常数，$\mathcal L=n\int ds$。连接两点的直线是局部最短几何路径，故有直线传播（P41）。几何光学应用还要求介质变化尺度远大于波长，并避开必须考虑衍射、焦散等波动细节的区域。

### 6.4 从费马原理推到光线方程（推导补充）

用任意参数 $u$ 描述路径 $\mathbf r(u)$：

$$
\mathcal L=\int n(\mathbf r)|\dot{\mathbf r}|\,du.
$$

对拉格朗日量 $F=n|\dot{\mathbf r}|$ 应用 Euler–Lagrange 方程：

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

这是连续分层介质的 Snell 不变量。对突变界面也可从光程对交点位置求驻值，得到 $n_1\sin\theta_1=n_2\sin\theta_2$；这是费马原理与电动力学边界条件所得折射定律相互一致之处。

### 6.5 用同一判据解释海市蜃楼与沙漠幻影

在压强变化可忽略的局部近似中，气体 $n-1$ 与密度大致成正比，密度又随温度升高而减小。

- **寒冷海面附近的上蜃景（P42）：**低处空气较冷、密度较大，$n$ 较大；高处 $n$ 较小，光线向下弯曲。观察者沿入眼光线的切线反向延长，可能把远物看在较高位置。
- **炽热地面上方的下蜃景（P43）：**贴近地面的空气更热、密度更低，$n$ 较小；上方 $n$ 较大，光线向上弯曲。天空或远物的光绕向观察者，反向延长后像在地面下方，产生“积水”错觉。
- **实验室光学弯折（P44）：**制造连续折射率梯度，也能观察曲线路径；判断时先确定 $n$ 的梯度方向，再分析曲率，不必假设存在一块实际镜面。

课件 P42 展示的指数型 $n^2(h)=n_0^2+n_p^2e^{-ah}$ 是某种剖面模型；判断方向只需 $dn/dh<0$。其参数大小须结合具体大气条件和单位，不能当成空气普适常数背诵。

## 7. 和已有电动力学复习笔记互相校准

本节对应已阅读的《平面波的横波性与能流》《亥姆霍兹方程》《色散与Drude模型》《导电介质中的电磁波》。两套资料使用相同 $e^{i(\mathbf k\cdot\mathbf r-\omega t)}$ 约定。

### 7.1 束缚电子的 Lorentz 模型如何退化为 Drude 模型

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

最后一式由 $\nabla\times\mathbf H=\sigma\mathbf E-i\omega\varepsilon_0\varepsilon_{r,b}\mathbf E$ 直接取得。若已把自由电子的全部响应并入 $\varepsilon_{r,\rm eff}$，就不能再把同一 $\sigma\mathbf E$ 加一遍，否则重复计数。真实金属还存在束缚电子/能带间跃迁，Drude 只刻画自由载流子部分，不是所有金属在全部光频的完整模型。

**符号提醒：**碰撞时间 $\tau_{\rm col}=1/\gamma$ 与电动力学导体体电荷弛豫时间 $\tau_q=\varepsilon/\sigma_{\rm dc}$ 是两个不同量，不能因为都写 $\tau$ 就互换。

### 7.2 光学吸收长度和电动力学趋肤深度差在哪里

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

这是从同一复介电响应得到的趋肤效应。它的适用条件还包括可用近似直流电导率，即通常 $\omega\tau_{\rm col}\ll1$；进入光频时应先用频率相关的 Drude 响应判断，不能单凭“金属电导率大”就无条件套该平方根公式。

### 7.3 指数衰减不总等于耗散

无碰撞 Drude 介质 $\gamma=0$、$\omega<\omega_p$ 时，$\varepsilon_r=1-\omega_p^2/\omega^2<0$，选衰减分支得纯虚 $\widetilde n=i\kappa$。内部场沿深度指数衰减，但

$$
\varepsilon''_r=0,\qquad
q_{\rm abs}=\frac12\omega\varepsilon_0\varepsilon''_r|E|^2=0.
$$

这是倏逝场，$\mathbf E$ 与 $\mathbf H$ 相差 $\pi/2$，单一半空间衰减解的法向平均能流为零。由此可见，“$\kappa>0$ 表示场衰减”普遍成立，但“有场衰减就有热吸收”不普遍成立。前面由强度衰减求 $\alpha$ 的通常吸收情形要求存在向前输运的能流；纯倏逝场不能照搬入射透射行波的直觉。

### 7.4 强色散介质中能量密度要带上介质运动

无色散、无耗介质可以用 $\overline u=\varepsilon E_0^2/4+\mu H_0^2/4$；强色散时，电子振动也储存能量，直接把频率相关、甚至负实部的 $\varepsilon(\omega)$ 代进去会得到错误结果。在透明、弱损耗窄带近似下，总储能密度采用

$$
\overline u=\frac14\frac{d(\omega\varepsilon')}{d\omega}|E_0|^2
+\frac14\frac{d(\omega\mu')}{d\omega}|H_0|^2.
$$

此处 $\varepsilon',\mu'$ 是绝对参数。该式属于电动力学拓展，用来解释群速度、能量速度和模型中的电子机械储能；不宜无条件用于强耗散频段。

## 8. 考前自测：5 道带步骤的题

### 题 1：入射频率不变，哪些量改变？

真空波长 $\lambda_0=600\,\mathrm{nm}$ 的单色光进入无耗非磁介质，$n=1.50$。求频率、介质波长、相速度与相对介电常数。若已知介质内部峰值电场为 $100\,\mathrm{V/m}$，求强度。取 $c=3.00\times10^8\,\mathrm{m/s}$，$\varepsilon_0=8.85\times10^{-12}\,\mathrm{F/m}$。

**解：**频率由光源与时间不变边界决定，

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

注意此题直接给介质内部场，无需另猜界面透射系数；若把 $E_0$ 当均方根值会多错一个 $1/2$。

### 题 2：实部、虚部与耗散能否相互验证？

稀薄介质有单一 Lorentz 共振。某频率处 $\Delta=\omega_0^2-\omega^2=3a$、$\gamma\omega=a$，且 $\Omega^2=0.10a$，其中 $a>0$ 的单位为 $\mathrm{s^{-2}}$。求 $\chi_e$ 和一阶近似 $n,\kappa$，判断是否吸收、是否正好共振。

**解：**

$$
\chi_e=\frac{0.10a}{3a-ia}
=0.10\frac{3+i}{10}=0.03+0.01i.
$$

$|\chi_e|\approx0.0316\ll1$，故

$$
n\simeq1+0.03/2=1.015,\qquad \kappa\simeq0.01/2=0.005.
$$

$\chi''_e>0$，有正的吸收功率；$\Delta>0$ 表示 $\omega<\omega_0$，并非共振。代回 $2n\kappa\approx0.01015$ 与 $\chi''_e=0.010$ 仅差二阶近似误差，不能要求一阶 $n,\kappa$ 严格满足完整平方关系。平均耗散为 $q_{\rm abs}=0.005\,\omega\varepsilon_0 E_0^2$。

### 题 3：由透射测量反推消光系数和浓度效应

某溶液在 $\lambda_0=500\,\mathrm{nm}$ 下，扣除界面反射后，厚度 $L=1.00\,\mathrm{mm}$ 的内部透射率为 $T=0.250$。求 $\alpha,\kappa$、场振幅比、强度 $1/e$ 长度；若浓度减半并保持 Beer 定律成立，同一厚度透射率为多少？

**解：**由 $T=e^{-\alpha L}$：

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

浓度减半使 $\alpha$ 减半，故 $T_{\rm new}=e^{-\alpha L/2}=\sqrt{T}=0.500$。透射率不会因浓度减半就简单变成原来的两倍；本题碰巧两倍，是初始 $T=1/4$ 的数值巧合。

### 题 4：Cauchy 公式和群速度的单位检验

透明介质在某波段满足 $n=A+B/\lambda_0^2$，$A=1.50$，$B=0.00400\,\mu\mathrm m^2$。求 $\lambda_0=0.500\,\mu\mathrm m$ 时 $n$、$dn/d\lambda_0$、群折射率 $n_g$ 与群速度，判断正常还是反常色散。

**解：**必须用与 $B$ 一致的微米单位：

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

$v_g<v_p$ 与正常色散一致。这里用到了弱吸收窄带波包条件，不能把相同公式解释成任意强吸收脉冲的传播时间。

### 题 5：同一费马原理，离散界面与连续梯度

（a）上半平面折射率 $n_1$、下半平面 $n_2$。起点 $P=(0,a)$、终点 $Q=(d,-b)$，光线在界面 $y=0$ 的 $X=(x,0)$ 处折射。由费马原理导出折射定律。

（b）若介质连续变化为 $n(z)=n_0+gz$，$g>0$，光线初始水平，且竖直偏移很小，求其近似轨迹。

**解（a）：**候选光程为

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

**解（b）：**光线方程的竖直分量为 $d(nt_z)/ds=g$。小斜率、$|gz|\ll n_0$ 时 $s\simeq x$、$n\simeq n_0$、$t_z\simeq dz/dx$，故

$$
n_0\frac{d^2z}{dx^2}\simeq g.
$$

取 $z(0)=0,z'(0)=0$，得

$$
\boxed{z(x)\simeq\frac{g}{2n_0}x^2}.
$$

光线向 $z$ 增大、折射率更大的一侧弯曲，和沙漠地面上方由低处热空气到高处冷空气的弯曲方向一致。$g$ 的单位为 $\mathrm{m^{-1}}$，所以 $gx^2$ 是长度；当偏移或斜率变大时应回到完整光线方程。

## 9. 复习时应能独立完成的检查

- 从两条旋度方程推到波动方程，并说明在哪一步用了“均匀”。
- 从电子运动方程推到 $\chi_e$，正确写出 $-i\gamma\omega$ 和正的 $\chi''_e$。
- 从 $\widetilde n=n+i\kappa$ 一行推出场衰减、强度衰减和 $\alpha=4\pi\kappa/\lambda_0$。
- 解释正常/反常色散的导数符号，用级数展开推导 Cauchy 公式并列出条件。
- 从光程写出相位和费马变分，用 $d(n\mathbf t)/ds=\nabla n$ 判断光线弯曲。
- 区分 Lorentz 与 Drude、强度吸收长度与趋肤深度、材料色散与波导色散，以及耗散吸收与纯倏逝衰减。

## 10. 来源与交叉阅读

主课件：《光学20261019_光的传播_I.pdf》，P3–6 对应第 2 节，P7–18 对应第 3 节，P19–26 对应第 4 节，P27–35 对应第 5 节，P36–44 对应第 6 节；第 7 节和第 5.5、6.4 节明确标为跨学科推导或补充，自测为按课件概念自编。

已有电动力学笔记位置：`物理/电动力学/电动力学复习/电动力学复习/04-电磁波的传播/`。推荐按以下顺序对照阅读：

1. 《平面波的横波性与能流》：对应本章第 2 节与峰值振幅的 $1/2$ 因子。
2. 《亥姆霍兹方程》：对应本章单频波动方程与边界/几何导致的色散。
3. 《色散与Drude模型》：对应第 3 节 Lorentz 响应与第 7.1 节自由电子极限。
4. 《导电介质中的电磁波》：对应第 7.2–7.3 节的趋肤、复波数、倏逝场；跨笔记使用 $\alpha$ 时先确认它代表场衰减还是强度衰减。
