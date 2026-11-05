---
title: "7.1 各向同性线性介质中的传播方程"
outline: [2, 3]
prev: {"text": "6.5 自由电子激光", "link": "/optics-ch06-s05.html"}
next: {"text": "7.2 光与介质相互作用的经典理论", "link": "/optics-ch07-s02.html"}
---

<a id="ppt-5-1"></a>
<a id="ppt-5-2"></a>

# 7.1 各向同性线性介质中的传播方程

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 场的表示与介质性质

先想：复场里的“实部”和“模平方”分别用来求什么？

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


短例：固定在 $z=0$，令 $\widetilde E=2i\,\mathrm{V/m}$，则物理场为 $E(t)=2\sin\omega t\,\mathrm{V/m}$；复振幅的模为 2，瞬时场在 $t=0$ 却为零。实部随时间给波形，模给峰值大小。

自检：在同一介质中把峰值电场加倍，强度如何变？把复场直接取实部能否得到时均强度？

#### 自检答案：场与强度

<details class="optics-derivation">
<summary>展开答案与解释</summary>

强度变为原来的 4 倍。实部给瞬时物理场；时均强度要由能流作周期平均，峰值场的平方通常带 $1/2$。

</details>



## 均匀介质中的波速与光强

来源：课件 P3至6。

本节的问题是：光进入透明介质后，频率、波长、相速度各由什么决定？先看波速和横向条件，再看能流系数。

<a id="ppt-5-3"></a>
<a id="ppt-5-4"></a>
<a id="ppt-5-5"></a>

### 7.1.1 本构关系与波动方程

![从相对介电常数和磁导率到相速度与折射率的公式流程](/optics/figures/nov05-medium-speed-index-p05.png)

《光学20261019_光的传播_I.pdf》PDF第5页（局部）。沿上排由介电常数ε、磁导率μ读出相速度v，再与真空光速c比较，得到 n=c/v=√(εμ)。箭头说明同一组电磁材料参数决定传播速度；常见光学非磁介质μ≈1时可化为n≈√ε。图中ε、μ是相对量，讨论的是均匀各向同性、低损耗情形的相速度，色散存在时须标出所讨论频率。 下部 I∝nE₀² 的关系含有介质因子；蓝框中的 I=E₀² 仅可理解为同一介质内省略常系数的归一化写法，SI制辐照度使用 I=(1/2)nε₀cE₀²（非磁、低损耗介质）。


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

#### 详细推导：由 Maxwell 旋度方程得到二次旋度

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

由于 $\varepsilon_r$ 是空间常数，$\nabla\cdot\mathbf E=0$。对法拉第定律再取旋度：

$$
\begin{aligned}
\nabla\times(\nabla\times\mathbf E)
&=-\mu_0\mu_r\frac{\partial}{\partial t}(\nabla\times\mathbf H)\\
&=-\mu_0\mu_r\varepsilon_0\varepsilon_r\frac{\partial^2\mathbf E}{\partial t^2}.
\end{aligned}
$$

</details>



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

<a id="ppt-5-6"></a>

### 7.1.2 单色波的相位与场方向

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

### 辐照度与峰值场振幅

辐照度与场振幅的结论来自 P5；下面先用电动力学的波阻抗补足其能流系数。波阻抗为

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

短例：$\lambda_0=600\,\mathrm{nm}$、$n=1.50$ 时，介质波长为 $400\,\mathrm{nm}$，相速度为 $2.00\times10^8\,\mathrm{m/s}$，频率仍为 $5.00\times10^{14}\,\mathrm{Hz}$。记住界面两侧“同一个时间节拍”，介质通过缩短空间周期改变波速。


自检：用 $I\propto E_0^2$ 比较两种不同折射率介质内的绝对强度，需要补什么？为什么各向同性条件出现在横波结论里？

#### 自检答案：波速与能流条件

<details class="optics-derivation">
<summary>展开答案与解释</summary>

非磁无耗介质还需乘 $n\varepsilon_0c/2$。一般各向异性介质满足 $\mathbf k\cdot\mathbf D=0$，$\mathbf D$ 与 $\mathbf E$ 可不平行；这里的标量本构才使 $\mathbf E$ 也横向。

</details>



## 本节课件定位

光学20261019_光的传播_I.pdf P1、光学20261019_光的传播_I.pdf P2、光学20261019_光的传播_I.pdf P3、光学20261019_光的传播_I.pdf P4、光学20261019_光的传播_I.pdf P5、光学20261019_光的传播_I.pdf P6。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
