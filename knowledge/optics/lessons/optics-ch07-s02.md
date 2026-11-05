# 7.2 光与介质相互作用的经典理论

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 束缚电子的运动与介质响应

来源：课件 P7至18。

要回答的是：入射光频率改变时，电子为什么有时跟得上、有时滞后，宏观折射率又怎样记录这件事？先分清驱动频率 $\omega$ 与固有频率 $\omega_0$。

### 7.2.1 受迫阻尼振子模型

把束缚电子看成在平衡位置附近做受迫阻尼振动的谐振子。正电中心近似不动，电子位移为 $\mathbf r$，弹性系数为 $f$，阻尼系数为 $g$：

$$
m\ddot{\mathbf r}=-e\mathbf E-f\mathbf r-g\dot{\mathbf r}.
$$

令 $\omega_0^2=f/m$、$\gamma=g/m$，得

$$
\boxed{\ddot{\mathbf r}+\gamma\dot{\mathbf r}+\omega_0^2\mathbf r=-\frac e m\mathbf E}.
$$

该模型要求电子速度 $v_e\ll c$，振动范围远小于光场的空间变化尺度，通常满足 $|\mathbf k|r\ll1$；小振幅使回复力近似线性，粒子间复杂耦合和能量损失用有效参数概括。磁力与电力的比值约为 $v_eB/E\sim nv_e/c\ll1$，于是运动方程保留电场力。这里 $v_e$ 是电子速度。


![固定正电中心附近受光驱动的束缚电子模型](/optics/figures/propagation-i-lorentz-electron-model.png)

图 4-1　原课件 P7：正电中心近似固定，电子在平衡位置附近振动；箭头表示电子位移，下面的入射箭头表示驱动光场。

读图：把图中的“电子位移”与 $\mathbf p=-e\mathbf r$ 对照。稳态振动频率跟随入射光，回复力则由 $\omega_0$ 控制；图示的辐射说明电子产生次波，净耗散还要由阻尼及平均做功判定。

### 7.2.2 从位移响应求复极化率

束缚振子的固有频率是 $\omega_0$；受频率 $\omega$ 的光场驱动后，稳态响应以 $\omega$ 振动，幅度和相位由失谐与阻尼决定。取

$$
\mathbf E(t)=\widetilde{\mathbf E}e^{-i\omega t},\qquad
\mathbf r(t)=\widetilde{\mathbf r}e^{-i\omega t}.
$$

#### 详细推导：从谐振子位移到单位体积偶极矩



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

### 极化电流的平均做功

#### 详细推导：教材/ED补充：用极化电流与机械阻尼核对能量耗散



极化电流为 $\widetilde{\mathbf J}_P=-i\omega\widetilde{\mathbf P}$。光场对介质做功的平均功率密度

$$
\begin{aligned}
q_{\rm abs}
&=\frac12\operatorname{Re}\!\left(\widetilde{\mathbf J}_P\cdot\widetilde{\mathbf E}^{\,*}\right)\\
&=\frac12\omega\varepsilon_0\chi''_e|\widetilde{\mathbf E}|^2\ge0.
\end{aligned}
$$

从机械耗散也能得到相同平均功率：$Nm\gamma\langle\dot{\mathbf r}^{2}\rangle=Nm\gamma\omega^2|\widetilde{\mathbf r}|^2/2$。代入位移振幅，便与极化电流的做功结果相等。相位滞后与阻尼共同描述光能向介质转移；在无阻尼且远离共振时，模型的平均吸收为零，实响应仍可产生色散。






### 7.2.3 复折射率的实部与虚部

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


![复折射率实部和虚部对应相位与衰减的课件公式](/optics/figures/propagation-i-index-phase-attenuation.png)

图 4-2　原课件 P14：上部将介电响应拆成实、虚部，下部比较场振幅与强度的指数。原页用 $\eta$ 表示本章的 $\kappa$。

读图：观察两个空间指数中衰减项的倍数：强度指数是场振幅的两倍。原页空间行波指数与复折射率符号有混用，本章统一采用 $e^{+ik_0\widetilde nz-i\omega t}$，以正文可编辑公式核算正向衰减。

### 共振两侧的响应与多振子模型

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

每个振子项对应一个共振及其强度、阻尼。经典模型以这些参数解释吸收和色散曲线；量子理论可得到形式相似的响应函数。教材补充中，本征频率与强度还可联系到能级差、跃迁矩阵元和占据数。

短例：若 $\chi_e=0.02+0.004i$，其模远小于 1，则 $n\simeq1.01$、$\kappa\simeq0.002$；此例可同时使用弱极化近似。若给出 $n=1.50$、吸收很弱，则只由“吸收弱”推出 $\kappa$ 小，实折射率仍取 1.50。


自检：驱动频率为 $2\omega_0$ 时，稳态电子以什么频率振动？透明玻璃能否一概使用 $n\simeq1+\chi_e^\prime/2$？

#### 自检答案：响应频率与近似



稳态以 $2\omega_0$ 振动，自由暂态随阻尼消失。弱吸收只限制虚部；一阶平方根展开要求整个 $|\chi_e|\ll1$，因此透明玻璃要另查弱极化条件。






## 自由载流子、趋肤与倏逝

本节为独立的教材/ED补充，不对应这份 PPT 的新增授课页。自由载流子、导电损耗与束缚电子极化可以放在同一频域框架中讨论。以下沿用 $e^{i(\mathbf k\cdot\mathbf r-\omega t)}$，并与《平面波的横波性与能流》《亥姆霍兹方程》《色散与Drude模型》《导电介质中的电磁波》对应。

本节带着一个拓展问题阅读：看到场沿深度指数减小，怎样进一步判断它是否真的在加热介质？Drude 模型提供自由载流子响应，平均做功则判定耗散。

### Lorentz 模型的自由电子极限

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

### 振幅趋肤深度与强度吸收长度

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

### 无耗倏逝场的空间衰减

无碰撞 Drude 介质 $\gamma=0$、$\omega<\omega_p$ 时，$\varepsilon_r=1-\omega_p^2/\omega^2<0$，选衰减分支得纯虚 $\widetilde n=i\kappa$。内部场沿深度指数衰减，但

$$
\varepsilon''_r=0,\qquad
q_{\rm abs}=\frac12\omega\varepsilon_0\varepsilon''_r|E|^2=0.
$$

这是无耗倏逝场：$\mathbf E$ 与 $\mathbf H$ 相差 $\pi/2$，单一半空间衰减解的法向平均能流为零。$\kappa>0$ 在此描述场的空间衰减，热耗散则由 $\varepsilon''_r$ 和平均做功判断。前面吸收定律所用的向前能流，在这一纯倏逝模型中为零。

### 色散介质的场与粒子储能

无色散、无耗介质的平均场能为 $\overline u=\varepsilon E_0^2/4+\mu H_0^2/4$。色散介质还通过电子运动储存能量；在透明、弱损耗窄带近似下，总储能密度为

$$
\overline u=\frac14\frac{d(\omega\varepsilon')}{d\omega}|E_0|^2
+\frac14\frac{d(\omega\mu')}{d\omega}|H_0|^2.
$$

$\varepsilon'\,\mu'$ 是绝对参数。频率导数项包含介质响应的储能，可用于讨论群速度与能量速度；强耗散频段需要采用相应的能量交换描述。

短例：某导体的场振幅在 $20\,\mathrm{nm}$ 内降为 $1/e$，则 $\delta_E=20\,\mathrm{nm}$、强度 $1/e$ 长度为 $10\,\mathrm{nm}$。若给出的却是无耗半空间倏逝解，还要查看 $\varepsilon_r''$ 与法向平均能流，才能讨论能量去向。


自检：无碰撞 Drude 模型在 $\omega<\omega_p$ 时场会衰减，为什么 $q_{\rm abs}=0$？良导体趋肤公式需要哪两类频率条件？

#### 自检答案：衰减与耗散



无碰撞时 $\varepsilon_r$ 为实数，空间衰减来自倏逝解，单一半空间解没有法向平均能流。所列趋肤式采用近似实直流电导率，需 $\omega\tau_{\rm col}\ll1$，并满足导电电流主导的 $\sigma_{\rm dc}\gg\omega\varepsilon$。






## 本节课件定位

光学20261019_光的传播_I.pdf P7、光学20261019_光的传播_I.pdf P8、光学20261019_光的传播_I.pdf P9、光学20261019_光的传播_I.pdf P10、光学20261019_光的传播_I.pdf P11、光学20261019_光的传播_I.pdf P12、光学20261019_光的传播_I.pdf P13、光学20261019_光的传播_I.pdf P14、光学20261019_光的传播_I.pdf P15、光学20261019_光的传播_I.pdf P16、光学20261019_光的传播_I.pdf P17。
