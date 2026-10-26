---
title: "光学与电动力学关联"
outline: [2, 3]
---

<a id="教材补充-测量与介质辐射"></a>

# 光学与电动力学关联

Maxwell 方程描述光的产生和传播，坡印廷矢量给出能量输运，介质的极化响应决定折射率、吸收和色散。光学沿着这些方程进一步研究相位、偏振、光源统计和测量。原子能级、光子能量等量子规律则为物质与场的交换过程提供输入。

<a id="_1-用一条主线组织两门课"></a>

## 1. 场、光源与介质的对应关系

| 光学问题 | 电动力学对象 | 关键桥梁 | 本资料位置 |
| --- | --- | --- | --- |
| 光为什么可以在真空传播 | 无源Maxwell方程 | 变化的电场和磁场耦合成波，传播速度由 $\varepsilon_0\mu_0$ 决定 | 第01章第7节 |
| 光强为什么与振幅平方有关 | Poynting能流 | 探测器在许多光周期上平均二次量 | 第01章能流与叠加 |
| 为什么相干源比独立源更集中 | 场叠加和相关函数 | 能流的交叉项是否在平均后保留 | 第01与03章 |
| 带电粒子怎样发光 | 推迟势和远区辐射 | 加速度产生 $1/r$ 辐射场，辐射功率来自能流积分 | 第02章 |
| 介质为什么改变光速、吸收和色散 | 极化与频域本构 | 微观振子产生 $\chi(\omega)$，再决定 $\widetilde n(\omega)$ | 第04章 |
| 激光为什么需要泵浦 | 非平衡布居和受激辐射 | 能级及跃迁系数是量子输入；场传播与腔反馈仍用Maxwell描述 | 第03章 |
| 光线为什么弯曲 | 短波极限的相位函数 | 波动方程的eikonal近似导出Fermat与光线方程 | 第04章 |

配合波的传播与能量，阅读《平面电磁波》《平面波的横波性与能流》《电磁场能量守恒与坡印廷定理》；配合光源，阅读《推迟势》《电偶极辐射》；配合介质响应，阅读《色散与Drude模型》《导电介质中的电磁波》《截止频率与色散》。

## 2. 从Maxwell方程到光强中的二分之一

在均匀、无源、线性、各向同性、无损非色散介质中，取单频平面波：

$$
\mathbf E=\operatorname{Re}(\mathbf E_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}),\qquad
\mathbf H=\operatorname{Re}(\mathbf H_0e^{i(\mathbf k\cdot\mathbf r-\omega t)}).
$$

由 $\nabla\times\mathbf E=-\mu\partial_t\mathbf H$ 得

$$
\mathbf k\times\mathbf E_0=\omega\mu\mathbf H_0.
$$

又由 $\mathbf k\cdot\mathbf E_0=0$ 和 $k^2=\omega^2\varepsilon\mu$，定义波阻抗 $Z=\sqrt{\mu/\varepsilon}$，可写成

$$
\mathbf H_0=\frac1Z\widehat{\mathbf k}\times\mathbf E_0.
$$

能流取两实场的叉乘。用 $\langle\cos^2\omega t\rangle=1/2$ 做周期平均，或使用含共轭的复数平均公式，得到

$$
\langle\mathbf S\rangle=\frac12\operatorname{Re}(\mathbf E_0\times\mathbf H_0^*)
=\frac{|\mathbf E_0|^2}{2Z}\widehat{\mathbf k}.
$$

取透明介质的非磁近似 $\mu_r\simeq1$，则 $Z=Z_0/n$，$I=n\varepsilon_0c|\mathbf E_0|^2/2$。这里 $|\mathbf E_0|^2=\mathbf E_0\cdot\mathbf E_0^*$，同样适用于椭圆偏振。光强由场幅与阻抗共同决定：同一介质内可用 $I\propto |E_0|^2$ 比较比例，跨介质比较则需保留折射率因子 $n$。

非色散介质平均场能密度为

$$
\langle u\rangle=\frac14(\varepsilon|E_0|^2+\mu|H_0|^2)
=\frac12\varepsilon|E_0|^2,
\qquad \frac{I}{\langle u\rangle}=\frac1{\sqrt{\varepsilon\mu}}.
$$

因而无损、无色散平面波的能量传播速度等于相速度。色散介质中，场还向物质的响应自由度储存能量。对透明、弱吸收窄带波，包含这部分储能的常用平均能量密度为

$$
\langle u\rangle=\frac14\left[\frac{d(\omega\varepsilon')}{d\omega}|E_0|^2+
\frac{d(\omega\mu')}{d\omega}|H_0|^2\right].
$$

这里使用介电函数和磁导率的实部及其频率导数；强吸收频段需要结合具体耗散模型定义储能。

### 从场的能流到辐射度学读数

探测器接收的是通过其有效面积的功率。对方向明确、在探测面积上近似均匀的光，选择与入射能流成锐角的接收面法线，夹角记为 $\theta$，有

$$
\Phi=\int_A\langle\mathbf S\rangle\cdot\widehat{\mathbf n}\,dA
\simeq IA\cos\theta,\qquad E_e=I\cos\theta.
$$

这里 $I$ 是垂直光束截面的平均能流密度。多方向非相干辐射按辐亮度叠加，$E_e=\int_{\rm 入射半球}L_e(\Omega)\cos\theta\,d\Omega$。整个半球的 $L_e$ 恒定时，带投影的角积分等于 $\pi$，故 $E_e=\pi L_e$；窄束的功率则按自身角分布积分。相干场需先相加，再由合场计算含交叉项的能流。这些面积和角度定义对应教材第4章的辐射量。

## 3. 相干性是场的相关性

设两束波在同一位置的偏振单位矢量分别为 $\mathbf e_1,\mathbf e_2$，慢变复幅为 $a_1(t),a_2(t)$。在相同阻抗、共线或近轴且探测几何相同的条件下，强度满足

$$
I\propto\langle|a_1\mathbf e_1+a_2\mathbf e_2|^2\rangle
=\langle|a_1|^2\rangle+\langle|a_2|^2\rangle+
2\operatorname{Re}[\langle a_1a_2^*\rangle\mathbf e_1\cdot\mathbf e_2^*].
$$

交叉项由统计关联与偏振内积共同决定。若两复幅相互独立，且至少一个复幅均值为零，便有 $\langle a_1a_2^*\rangle=0$；独立光源的相位均匀分布且与幅度独立时，满足零均值条件。正交偏振则使内积为零，描述检测方向上的投影重叠为零。两者都可使观测不到干涉，正交偏振本身却仍允许确定的相位关联。

同幅、同偏振且相位锁定的 $N$ 个源，在同相观察方向上给出 $E\propto N$、$I\propto N^2$；独立均匀随机相位源的平均强度为 $I\propto N$。相干增强带有方向性，全空间的辐射功率还要对方向图积分，并计入相位匹配与供能条件。

两不同频率波的交叉项随 $\Delta\omega$ 振荡。有限积分时间 $T$ 对复拍频的平均含有因子

$$
\frac1T\int_{t_0}^{t_0+T}e^{-i\Delta\omega t}dt
=e^{-i\Delta\omega(t_0+T/2)}
\frac{\sin(\Delta\omega T/2)}{\Delta\omega T/2}.
$$

当积分覆盖许多差频周期时，该因子趋于零；较快探测可保留拍频。相同两束异频光，因探测时间尺度不同，会呈现不同的平均交叉项。

## 4. Lorentz与Drude来自同一个受迫运动方程

用 $N_e$ 表示电子数密度，$e>0$ 为元电荷。束缚电子满足

$$
m\ddot x+m\gamma\dot x+m\omega_0^2x=-eE_0e^{-i\omega t}.
$$

代入稳态试解 $x=x_0e^{-i\omega t}$：

$$
x_0=-\frac{eE_0/m}{\omega_0^2-\omega^2-i\gamma\omega},\qquad
P_0=-N_eex_0=\varepsilon_0\chi E_0.
$$

所以

$$
\chi(\omega)=\frac{\omega_p^2}{\omega_0^2-\omega^2-i\gamma\omega},\qquad
\omega_p^2=\frac{N_ee^2}{m\varepsilon_0}.
$$

这是Lorentz模型。将回复力设为零，即 $\omega_0=0$，得到Drude：

$$
\varepsilon_r(\omega)=1-\frac{\omega_p^2}{\omega(\omega+i\gamma)}.
$$

另从自由电子速度求电流，有

$$
\sigma(\omega)=\frac{N_ee^2}{m(\gamma-i\omega)},\qquad
\varepsilon_{\rm eff}=\varepsilon_0+\frac{i\sigma}{\omega}.
$$

后一式由 $\nabla\times\mathbf H=(\sigma-i\omega\varepsilon_0)\mathbf E=-i\omega\varepsilon_{\rm eff}\mathbf E$ 得到。频域中，传导电流可以并入等效介电响应；这样定义 $\varepsilon_{\rm eff}$ 后，同一电子的传导电流已经计入一次。

《色散与Drude模型》可与这里逐式对照。换用 $e^{+i\omega t}$ 时，响应函数的虚部符号随完整复表示一起反转，实物理响应相同。Drude 以自由载流子为近似，真实金属在可见和紫外频段还可能有显著带间跃迁，需要加入相应响应项。

## 5. 吸收、趋肤与倏逝的共同形式和区别

均匀吸收介质中的单向平面波，取 $\widetilde k=k_r+ik_i$、$k_i>0$，场幅随 $e^{-k_iz}$ 衰减，强度随 $e^{-2k_iz}$ 衰减。因此强度吸收系数 $\alpha=2k_i$，振幅趋肤深度 $\delta=1/k_i$，同一衰减波模型下有 $\alpha=2/\delta$。对应的强度穿透深度为 $1/\alpha$，是振幅趋肤深度的一半。

在均匀被动、非磁介质中，平均电损耗功率密度为

$$
\langle q\rangle=\frac12\omega\varepsilon_0\varepsilon_r''|E_0|^2,
$$

用电导率表示，同一电损耗为 $\operatorname{Re}\sigma|E_0|^2/2$。坡印廷定理把能流的减少与材料吸收的功率联系起来。

无损波导在截止以下也有纯虚的纵向波数和指数倏逝场，此时体积热耗散为零，单支纯衰减模的纵向平均能流也为零。两个倏逝分量的组合及有限厚度结构中的隧穿，需要用边界条件确定能流。吸收与倏逝虽有相似的指数外形，前者存在耗散功率，后者可由传播约束产生。

### 匀速电荷为何在介质中仍可能辐射

无界真空中的永恒匀速电荷没有辐射项。介质中的运动电荷还会激发极化响应；粒子速度超过该频率的相速度 $v_p=c/n_r(\omega)$ 时，可以产生切伦科夫辐射。对均匀、各向同性、近无损介质和足够长的直轨迹，沿轨迹相隔 $v\Delta t$ 的两次激发在远方向相长，要求

$$
\Delta t-\frac{n_r v\Delta t\cos\theta}{c}=0
\quad\Longrightarrow\quad
\cos\theta=\frac{c}{n_r v}=\frac1{\beta n_r}.
$$

当 $\beta n_r>1$ 时存在非零实数锥角，阈值处锥角收为零。粒子速度仍可小于真空光速，辐射能量来自其动能，电荷与极化介质共同产生辐射场。教材第4、5章的这一例子说明了介质响应的作用；强吸收、有限轨迹和边界辐射还需考虑相应修正。

## 6. 从波动到光线的短波近似

静止、透明、缓变的各向同性介质中，标量Helmholtz近似为

$$
\nabla^2\psi+k_0^2n^2(\mathbf r)\psi=0.
$$

令 $\psi=A(\mathbf r)e^{ik_0S(\mathbf r)}$，展开拉普拉斯：

$$
\nabla^2\psi=e^{ik_0S}\left[\nabla^2A+2ik_0\nabla A\cdot\nabla S+
ik_0A\nabla^2S-k_0^2A|\nabla S|^2\right].
$$

当振幅、折射率的变化尺度远大于波长，最高阶 $k_0^2$ 项先给出

$$
|\nabla S|^2=n^2.
$$

得到的程函方程把折射率与相位梯度联系起来。相位梯度垂直波前，光线沿该方向；对固定两端点作变分 $\delta\int n\,ds=0$，得到

$$
\frac{d}{ds}(n\widehat{\mathbf t})=\nabla n.
$$

沿射线法向取分量，有 $n\,d\widehat{\mathbf t}/ds=\nabla_\perp n$，因此光线向折射率较高的一侧弯曲。Fermat 原理要求光程取驻值，可以是极小、极大或鞍点。焦散附近、孔径尺度接近波长或衍射显著时，短波近似失效，需保留波动结构。

## 7. 经典电动力学能说明什么

给定电流及本构关系后，经典理论能够求辐射场、能流、角分布和相干叠加，振子模型也能解释吸收、色散及共振。原子离散能级与黑体谱中的单模式能量分布则需要量子规律，连续经典轨道和经典能量均分不能独立给出这些结果。

Planck 分布中的 $h\nu$、原子能级和 Einstein 跃迁系数提供了量子输入。半经典激光理论以量子能级描述物质，以经典 Maxwell 方程描述传播场。自由电子激光通过相对论电子束在周期磁场中的辐射、能量交换与群聚实现相干放大，使用的是电子束动力学机制。

## 8. 自检

1. 为何峰值复振幅的能流含 $1/2$，有效值写法却没有？从实场乘积说明。
2. 若 $e^{-i\omega t}$ 改为 $e^{+i\omega t}$，如何让同一被动材料仍为空间衰减？必须一起改变哪些复数关系？
3. 一道题给出了电导率和已经包含Drude电子的介电函数，为什么不能直接把两者都代入同一个损耗方程？
4. 为什么随机相位和正交偏振都能去掉强度交叉项，但不能说是同一个原因？
5. 为什么静止介质改变波长而不改变频率？用边界上任意时刻的相位一致性解释。

第1题对应本章第2节，第2、3题对应第4节，第4题对应第3节，第5题对应第04章。作答时写出场方程、平均步骤或界面相位关系，再说明结论成立的条件。
