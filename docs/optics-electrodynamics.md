---
title: "光学与电动力学关联"
outline: [2, 3]
---

# 光学与电动力学关联

光学中的场、光强、折射率和辐射并不是另一套孤立知识。电动力学提供宏观场方程，光学进一步描述频率、相位、光源统计及物质的响应。本章把相同方程中的物理对象对应起来，并说明经典理论在哪里需要量子输入。

## 1. 用一条主线组织两门课

| 光学问题 | 电动力学对象 | 关键桥梁 | 本资料位置 |
| --- | --- | --- | --- |
| 光为什么可以在真空传播 | 无源Maxwell方程 | 变化的电场和磁场耦合成波，传播速度由 $\varepsilon_0\mu_0$ 决定 | 第01章第7节 |
| 光强为什么与振幅平方有关 | Poynting能流 | 探测器在许多光周期上平均二次量 | 第01章能流与叠加 |
| 为什么相干源比独立源更集中 | 场叠加和相关函数 | 能流的交叉项是否在平均后保留 | 第01与03章 |
| 带电粒子怎样发光 | 推迟势和远区辐射 | 加速度产生 $1/r$ 辐射场，辐射功率来自能流积分 | 第02章 |
| 介质为什么改变光速、吸收和色散 | 极化与频域本构 | 微观振子产生 $\chi(\omega)$，再决定 $\widetilde n(\omega)$ | 第04章 |
| 激光为什么需要泵浦 | 非平衡布居和受激辐射 | 能级及跃迁系数是量子输入；场传播与腔反馈仍用Maxwell描述 | 第03章 |
| 光线为什么弯曲 | 短波极限的相位函数 | 波动方程的eikonal近似导出Fermat与光线方程 | 第04章 |

现有电动力学知识库中建议配合阅读的笔记为《平面电磁波》《平面波的横波性与能流》《电磁场能量守恒与坡印廷定理》《推迟势》《电偶极辐射》《色散与Drude模型》《导电介质中的电磁波》《截止频率与色散》。这些标题对应已有笔记，光学的详细推导在本资料四个主章中可连续阅读。

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

把两实场相乘，用 $\langle\cos^2\omega t\rangle=1/2$，或直接用复数平均公式：

$$
\langle\mathbf S\rangle=\frac12\operatorname{Re}(\mathbf E_0\times\mathbf H_0^*)
=\frac{|\mathbf E_0|^2}{2Z}\widehat{\mathbf k}.
$$

对于 $\mu_r\simeq1$ 的透明介质，$Z=Z_0/n$，所以 $I=n\varepsilon_0c|\mathbf E_0|^2/2$。这里 $|\mathbf E_0|^2=\mathbf E_0\cdot\mathbf E_0^*$，也适用于椭圆偏振的复振幅。比较不同介质中的场幅和强度时，必须保留 $n$；只有同一介质内比较比例时才可简写 $I\propto |E_0|^2$。

非色散介质平均场能密度为

$$
\langle u\rangle=\frac14(\varepsilon|E_0|^2+\mu|H_0|^2)
=\frac12\varepsilon|E_0|^2,
\qquad \frac{I}{\langle u\rangle}=\frac1{\sqrt{\varepsilon\mu}}.
$$

这解释了无损非色散平面波的能量传播速度与相速度相同。**色散介质不能把复数 $\varepsilon(\omega)$ 直接代入上述储能式。** 透明、弱吸收窄带条件下的总平均能量还包括介质响应，常用形式为

$$
\langle u\rangle=\frac14\left[\frac{d(\omega\varepsilon')}{d\omega}|E_0|^2+
\frac{d(\omega\mu')}{d\omega}|H_0|^2\right].
$$

这是关联补充，不能无条件推广到强吸收频段。

## 3. 相干性是场的相关性

设两束波在同一位置的偏振单位矢量分别为 $\mathbf e_1,\mathbf e_2$，慢变复幅为 $a_1(t),a_2(t)$。强度在相同阻抗中满足

$$
I\propto\langle|a_1\mathbf e_1+a_2\mathbf e_2|^2\rangle
=\langle|a_1|^2\rangle+\langle|a_2|^2\rangle+
2\operatorname{Re}[\langle a_1a_2^*\rangle\mathbf e_1\cdot\mathbf e_2^*].
$$

若两源的相位独立随机，平均后 $\langle a_1a_2^*\rangle=0$；若偏振正交，内积为零。这两种情况下交叉项都消失，但物理原因不同。不能把正交偏振直接称为统计不相干。

同幅、同偏振、相位锁定的 $N$ 个源，在同相观察方向有 $E\propto N$、$I\propto N^2$；独立随机相位源的平均强度则 $I\propto N$。$N^2$ 是指定方向及相位条件下的结果，还要考虑方向图、相位匹配和供能，不能解释成整个空间总能量无条件增大为 $N^2$ 倍。

两不同频率波的交叉项随 $\Delta\omega$ 振荡。有限积分时间 $T$ 对复拍频的平均含有因子

$$
\frac1T\int_{t_0}^{t_0+T}e^{-i\Delta\omega t}dt
=e^{-i\Delta\omega(t_0+T/2)}
\frac{\sin(\Delta\omega T/2)}{\Delta\omega T/2}.
$$

因此长期平均时通常消失，快速探测时可能观察拍频。“异频没有干涉”须附上探测时间尺度。

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

后一式来自 $\nabla\times\mathbf H=(\sigma-i\omega\varepsilon_0)\mathbf E=-i\omega\varepsilon_{\rm eff}\mathbf E$。它说明导电损耗与介电响应在频域可归并，但若已将电导率并入介电函数，就不能再加一遍同一电子的传导电流。

已有《色散与Drude模型》可以与本节逐式对照。响应函数也可在 $e^{+i\omega t}$ 约定下定义，届时复数虚部符号相应反转；“只能用某一种时间符号定义”并不是物理限制。Drude只包含自由载流子近似，不保证描述真实金属整个可见到紫外频段；带间跃迁等需要额外模型。

## 5. 吸收、趋肤与倏逝的共同形式和区别

先限于均匀吸收介质中的单向传播平面波。取 $\widetilde k=k_r+ik_i$、$k_i>0$，场随 $e^{-k_iz}$ 衰减，强度随 $e^{-2k_iz}$ 衰减。强度吸收系数 $\alpha=2k_i$，电磁学常用的振幅趋肤深度 $\delta=1/k_i$，故在同一衰减波模型下 $\alpha=2/\delta$。不能把强度穿透深度 $1/\alpha$ 与振幅趋肤深度混为一谈。

在均匀被动、非磁介质中，平均电损耗功率密度为

$$
\langle q\rangle=\frac12\omega\varepsilon_0\varepsilon_r''|E_0|^2,
$$

若将耗散写成电导率则为 $\operatorname{Re}\sigma|E_0|^2/2$。Poynting定理把减少的能流与材料得到的能量联系起来。

但在理想无损波导截止以下，纵向波数也可为纯虚数，存在指数倏逝场，却没有体积热耗散；单支纯衰减模的纵向平均能流为零。两个倏逝分量叠加、有限厚度结构中的隧穿等须另看边界条件。**空间衰减本身不能证明吸收。** 这正是光学消光与电动力学截止问题需要区别之处。

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

这就是程函方程。相位梯度垂直波前，光线沿该方向；对固定两端点变分 $\delta\int n\,ds=0$，得到

$$
\frac{d}{ds}(n\widehat{\mathbf t})=\nabla n.
$$

沿射线法向取分量，$n\,d\widehat{\mathbf t}/ds=\nabla_\perp n$，所以光线向折射率较高的一侧弯曲。Fermat说的是驻值，可能是极小、极大或鞍点，不应一概写“最短”。近焦散、孔径尺度接近波长、强衍射时，应回到波动描述。

## 7. 经典电动力学能说明什么

经典理论能推导给定电流的辐射场、能流、角分布和相干叠加，能用振子模型解释吸收、色散及共振；它不能从连续经典轨道独立导出原子离散能级，也不能通过经典能量均分正确得到黑体高频谱。

Planck分布中的 $h\nu$、原子能级以及Einstein跃迁系数需要量子输入。半经典激光理论通常对物质用量子能级、对传播场用经典Maxwell方程；自由电子激光则靠相对论电子束在周期磁场中辐射和群聚，不依赖同一种束缚原子能级反转。两者的“相干放大”不能简单视为相同微观机制。

## 8. 自检

1. 为何峰值复振幅的能流含 $1/2$，有效值写法却没有？从实场乘积说明。
2. 若 $e^{-i\omega t}$ 改为 $e^{+i\omega t}$，如何让同一被动材料仍为空间衰减？必须一起改变哪些复数关系？
3. 一道题给出了电导率和已经包含Drude电子的介电函数，为什么不能直接把两者都代入同一个损耗方程？
4. 为什么随机相位和正交偏振都能去掉强度交叉项，但不能说是同一个原因？
5. 为什么静止介质改变波长而不改变频率？用边界上任意时刻的相位一致性解释。

这些问题的完整依据分别见本章第2、4、3节及第04章。若只能复述结论，建议先回到相应的场方程或平均步骤。
