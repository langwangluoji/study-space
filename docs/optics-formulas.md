---
title: "公式速查与易错辨析"
outline: [2, 3]
---

# 公式速查与易错辨析

查公式时同时看定义和条件。全资料采用 $e^{i(\mathbf k\cdot\mathbf r-\omega t)}$、SI单位和峰值复振幅；$\nu$ 为普通频率，$\omega=2\pi\nu$。复向量的模平方指 $\mathbf E_0\cdot\mathbf E_0^*$，不一定等于实电场矢量瞬时模的最大值平方。

## 1. 波动、场和叠加

| 所求量 | 公式 | 必须带走的条件 |
| --- | --- | --- |
| 一维行波 | $\psi=f(x-vt)+g(x+vt)$ | 恒定波速、线性无色散波动方程；两函数分别向右、向左 |
| 波动方程 | $\partial_x^2\psi=v^{-2}\partial_t^2\psi$ | 二阶时间方程需要两类初始数据 |
| 简谐参数 | $k=2\pi/\lambda$，$\omega=2\pi\nu$，$v_p=\omega/k=\lambda\nu$ | 波长和相速度属于同一介质 |
| 三维平面波 | $\psi=\operatorname{Re}[Ae^{i(\mathbf k\cdot\mathbf r-\omega t+\phi_0)}]$ | 波前为与实波矢垂直的平面 |
| 发散/会聚球面波 | $\widetilde\psi=Ae^{\pm ikr}/r$ | 负时间因子下正号发散；标量均匀介质模型，$r>0$ |
| 柱面波远场 | $\widetilde\psi\propto e^{ikr}/\sqrt r$ | $kr\gg1$，严格柱面解为Hankel函数 |
| 色散关系 | $k^2=\omega^2\varepsilon\mu$ | 均匀各向同性无源频域问题，注意传播支的选取 |
| 横波与磁场 | $\mathbf k\cdot\mathbf E_0=0$，$\mathbf B_0=\mathbf k\times\mathbf E_0/\omega$ | 前一式需均匀、各向同性、非零标量介电常数及无自由电荷 |
| 平均能流 | $\langle\mathbf S\rangle=\tfrac12\operatorname{Re}(\mathbf E_0\times\mathbf H_0^*)$ | 峰值复振幅；实际场必须先取实部或用此平均式 |
| 透明介质光强 | $I=E_0^2/(2Z)=n\varepsilon_0cE_0^2/2$ | 最后一式需 $\mu_r\simeq1$，这里 $E_0^2$ 是复向量模平方 |
| 同频同方向标量合振幅 | $A^2=A_1^2+A_2^2+2A_1A_2\cos\delta$ | 同频相量可静止相加；不同频率不能合成单一简谐波 |
| 干涉可见度 | $V=(I_{\max}-I_{\min})/(I_{\max}+I_{\min})$ | 同偏振完全相干时 $V=2\sqrt{I_1I_2}/(I_1+I_2)$ |

详细推导见第01章。球面波几何扩散使 $I\propto1/r^2$，不意味着材料吸收；柱面远场 $I\propto1/r$。

## 2. 辐射量与黑体

| 量 | 定义或公式 | 单位/条件 |
| --- | --- | --- |
| 辐射通量 | $\Phi=dQ/dt$ | W |
| 辐照度/出射度 | $E_e=d\Phi_{\rm in}/dA$，$M_e=d\Phi_{\rm out}/dA$ | $\mathrm{W\,m^{-2}}$；分别接收/发射 |
| 辐射强度 | $I_e=d\Phi/d\Omega$ | $\mathrm{W\,sr^{-1}}$，不同于波动光学 $I$ |
| 辐亮度 | $L_e=d^2\Phi/(dA\cos\theta\,d\Omega)$ | $\mathrm{W\,m^{-2}\,sr^{-1}}$ |
| 真空黑体能量谱 | $u_\nu=\frac{8\pi h\nu^3}{c^3}[e^{h\nu/(k_BT)}-1]^{-1}$ | 每Hz，$\mathrm{J\,m^{-3}\,Hz^{-1}}$，含两偏振 |
| 黑体谱辐亮度 | $B_\nu=cu_\nu/(4\pi)$ | $\mathrm{W\,m^{-2}\,sr^{-1}\,Hz^{-1}}$ |
| 黑体谱出射度 | $M_\nu=\pi B_\nu=cu_\nu/4$ | 各向同性腔场对应的半球出射 |
| 频率转波长 | $u_\lambda=u_\nu(c/\lambda_0)c/\lambda_0^2$ | 必须乘Jacobian；每微米谱密度数值等于每米数值的 $10^{-6}$；出射度谱同样变换 |
| 黑体每波长出射度 | $M_\lambda=2\pi hc^2/[\lambda_0^5(e^{hc/(\lambda_0k_BT)}-1)]$ | $\mathrm{W\,m^{-2}\,m^{-1}}$，每米波长间隔 |
| Stefan–Boltzmann | $M=\sigma_{\rm SB}T^4$ | 黑体总出射度；$\sigma_{\rm SB}=5.670374419\times10^{-8}\,\mathrm{W\,m^{-2}K^{-4}}$ |
| Wien位移 | $\lambda_{\max}T=2.897771955\times10^{-3}\,\mathrm{m\,K}$ | 对每波长谱取极大；频率谱峰不能直接用 $c/\nu_{\max}$ 替换 |
| Kirchhoff | $\epsilon_\lambda=a_\lambda$ | 热平衡/局部热平衡及对应方向偏振等条件，不能套给任意非平衡激光介质 |

### 偶极辐射与光子

真空小源电偶极远区、峰值偶极矩 $p_0$：

$$
\left\langle\frac{dP}{d\Omega}\right\rangle=
\frac{\omega^4p_0^2}{32\pi^2\varepsilon_0c^3}\sin^2\theta,
\qquad \langle P\rangle=\frac{\omega^4p_0^2}{12\pi\varepsilon_0c^3}.
$$

任意非相对论时变偶极的瞬时远区辐射功率为

$$
P(t)=\frac{|\ddot{\mathbf p}(t-r/c)|^2}{6\pi\varepsilon_0c^3}.
$$

对简谐偶极平均 $|\ddot p|^2$ 后才得到上一式。单电荷非相对论Larmor式令 $\ddot{\mathbf p}=q\mathbf a$；同步辐射的相对论情形须使用相应修正。

光子 $E=h\nu=hc/\lambda_0$、$p=h/\lambda_0$（真空）；便于计算的 $hc\simeq1239.841984\,\mathrm{eV\,nm}$。经典轨道的电荷辐射不能独立解释原子稳定性和离散能级。

## 3. 激光与相干辐射

| 关系 | 公式 | 条件与区别 |
| --- | --- | --- |
| 热平衡布居 | $N_2/N_1=(g_2/g_1)e^{-h\nu/(k_BT)}$ | $g_i$ 为简并度，正温热平衡不提供该两能级净增益 |
| Einstein关系 | $g_1B_{12}=g_2B_{21}$，$A_{21}/B_{21}=8\pi h\nu^3/c^3$ | 自由空间、各向同性非偏振总能量谱及一致的方向/偏振平均约定，$B$ 对每Hz能量谱密度定义 |
| 辐射寿命 | $1/\tau_{\rm rad}=\sum_jA_{2j}$ | 只有单一自发通道时 $\tau=1/A_{21}$ |
| 自然线宽 | $\Delta\nu_{\rm FWHM}=1/(2\pi\tau)$ | $\tau$ 为上能级布居寿命，下能级稳定，仅自然自发衰减，无非辐射流失或额外纯退相干 |
| 相干时间表述 | $\Delta\nu_{\rm FWHM}=1/(\pi T_2)$ | 指数相干衰减、Lorentz线型；不等同任意脉冲的时间带宽 |
| 反转条件 | $N_2/g_2>N_1/g_1$ | 等简并时才简化成 $N_2>N_1$ |
| 强度增益 | $dI/dz=(g-\alpha_i)I$ | $g$、$\alpha_i$ 均为强度每长度系数 |
| 简单线性腔阈值 | $g_{\rm th}=\alpha_i+(2L)^{-1}\ln[1/(R_1R_2)]$ | 增益充满均匀长度 $L$，$R_i$ 为功率反射率 |
| 纵模相位 | $2nL=q\lambda_0$ | 均匀线性腔，忽略镜面额外频率相位 |
| 相邻纵模间隔 | $\mathrm{FSR}\simeq c/(2n_gL)$ | $n_g=n+\omega dn/d\omega$；弱色散可取 $n_g\simeq n$ |
| Gaussian脉冲极限 | $\Delta t\Delta\nu\simeq0.441$ | 无啁啾变换极限，二者皆为强度FWHM |
| Gaussian光束发散 | $\theta\simeq\lambda_0/(\pi w_0)$ | 理想基模、真空、远场半角；$w_0$ 为 $1/e^2$ 强度腰半径 |
| 平面波荡器FEL共振 | $\lambda_s=\lambda_u(1+K^2/2+\gamma_e^2\theta^2)/(2s\gamma_e^2)$ | 超相对论、小角、平面波荡器模型；$s$ 是谐波序号 |

FEL中 $K=eB_u\lambda_u/(2\pi mc)$，$\gamma_e=(1-v^2/c^2)^{-1/2}$。谐波允许性与轴上/轴外观察及波荡器对称性有关；经典平面波荡器轴上主要为奇次谐波，不应扩展到任意结构与任意角度。

## 4. 介质响应、吸收和色散

$$
\chi(\omega)=\frac{\omega_p^2}{\omega_0^2-\omega^2-i\gamma\omega},\qquad
\widetilde n^{\,2}=\varepsilon_r\mu_r,
\qquad \widetilde n=n_r+i\kappa.
$$

单一束缚振子模型中 $\omega_p^2=N_ee^2/(m\varepsilon_0)$。弱极化时 $\widetilde n\simeq1+\chi/2$ 还需 $|\chi|\ll1$、$\mu_r\simeq1$；不能在强共振处照搬。

$$
E(z)\propto e^{-\omega\kappa z/c},\quad
I(z)=I(0)e^{-\alpha z},\quad
\alpha=\frac{2\omega\kappa}{c}=\frac{4\pi\kappa}{\lambda_0}.
$$

此处 $I(0)$ 为介质内部起始强度；若用外部入射强度，需另计界面反射等。均匀、稀薄、独立吸收粒子条件下，$\alpha=N\sigma_a$ 是Beer定律。若消光还含散射，则束流衰减系数应含散射贡献，不能全部解释为热吸收。

| 关系 | 公式 | 使用条件 |
| --- | --- | --- |
| Cauchy近似 | $n(\lambda_0)=A+B/\lambda_0^2+C/\lambda_0^4+\cdots$ | 透明、远离共振的适当频段；系数含所用波长单位 |
| 正常色散 | $dn/d\lambda_0<0$ | 对应 $dn/d\omega>0$ |
| 反常色散 | $dn/d\lambda_0>0$ | 不能据此把群速度当成信息前沿速度 |
| 群速度 | $v_g=(dk_r/d\omega)^{-1}=c/(n_r+\omega dn_r/d\omega)$ | 窄带波包、脉冲畸变可忽略等条件 |
| 光程与相位 | $\mathcal L=\int n\,ds$，$\phi=k_0\mathcal L$ | 几何光学、静止透明各向同性介质 |
| Fermat | $\delta\int n\,ds=0$ | 固定端点的驻值，未必全局最小 |
| 光线方程 | $d(n\widehat{\mathbf t})/ds=\nabla n$ | 平滑介质几何光学近似 |

## 5. 最容易混用的五组量

1. **$\varepsilon$ 与 $\varepsilon_r$：** 前者有单位，后者无量纲。课件有时省略下标，代入公式前需还原。
2. **真空波长与介质波长：** 透明介质的实折射率给 $\lambda_m=\lambda_0/n$，吸收介质的空间振荡波长用 $n_r$；光子能量用 $hc/\lambda_0$，也可写 $hv_p/\lambda_m$，不能写 $hc/\lambda_m$。
3. **振幅与强度衰减：** 若强度减半，振幅减为 $1/\sqrt2$；强度指数是振幅指数的两倍。
4. **布居寿命与相干寿命：** 理想条件 $T_2=2T_1$，有碰撞/纯退相干时关系改变，不能把所有 $\tau$ 看成同一时间。
5. **群速度、相速度与前沿速度：** $v_p$ 是相位的速度，$v_g$ 描述特定近似下包络的速度，信息因果性由完整响应和前沿约束。

遇到计算题先做量纲检查，再取 $\gamma\to0$、$N_e\to0$、$n\to1$ 或 $R_1R_2\to1$ 等适当极限，通常能发现遗漏的 $2$、$2\pi$、$n$ 或单位换算。
