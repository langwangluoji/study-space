---
prev: /geodesy-intro-frames
next: /geodesy-intro-gravity
---

# 空间观测怎样约束位置

一颗卫星和一个地面站的位置都在同一框架、同一观测时刻表达时，它们的差就是由测站指向卫星的向量。距离、方向和距离变化率，都是这个向量的不同属性。原绪论文件页 6–20 用多种仪器说明空间观测，本专题先建立共同的几何关系，再解释典型观测。

<SourceFigure src="/geodesy/figures/station-satellite.png" alt="测站与卫星的地心位置向量" source="大地测量 绪论(1).pdf" page="6" printed="22" />

## 站星向量与距离变化率

图中 $O$ 为公共原点，$P$ 为测站，$S$ 为卫星，位置分别为 $\mathbf r_P(t)$ 和 $\mathbf r_S(t)$。按从 P 到 S 的方向定义

$$
\boldsymbol\rho=\mathbf r_S-\mathbf r_P,\qquad
\rho=\|\boldsymbol\rho\|,\qquad
\mathbf e=\boldsymbol\rho/\rho,\quad \rho>0.
$$

距离是标量 $\rho$，站星向量是 $\boldsymbol\rho$，两者不能混写。对 $\rho^2=\boldsymbol\rho\cdot\boldsymbol\rho$ 求导，点积的乘法法则给出

$$
2\rho\dot\rho
=2\boldsymbol\rho\cdot\dot{\boldsymbol\rho}.
$$

再用 $\dot{\boldsymbol\rho}=\dot{\mathbf r}_S-\dot{\mathbf r}_P$，得到

$$
\dot\rho
=\mathbf e\cdot(\dot{\mathbf r}_S-\dot{\mathbf r}_P).
$$

因此，距离变化率测到的是相对速度在视线方向上的投影。例如相对速度与视线垂直时，瞬时距离变化率为零，但相对速度本身不为零。卫星多普勒观测与这一径向变化有关；真正由频率得到距离变化率，还要约定信号、钟差与传播模型。

若只比较两个时刻，测得的是 $\Delta\rho=\rho(t_2)-\rho(t_1)$，平均变化率为 $\Delta\rho/(t_2-t_1)$。它仅在时间间隔趋于零且运动光滑时趋近瞬时导数。

## 往返时间与同步到达时间

卫星激光测距记录光从测站发射、经卫星反射再返回的时间。忽略路径不对称和传播改正，往返距离是 $2\rho$，所以 $c\tau=2\rho$，即 $\rho=c\tau/2$。实际卫星在传播期间运动，仪器延迟与大气也影响观测，因此这个式子解释的是基本原理。

VLBI 使用远方射电源近似平面波在两个测站的到达时间差。设 $\mathbf s$ 是指向射电源的单位向量，波沿 $-\mathbf s$ 传播，两站基线为 $\mathbf b=\mathbf r_2-\mathbf r_1$，并约定 $\tau=t_2-t_1$。沿传播方向的基线投影决定时差，于是

$$
c\tau=(-\mathbf s)\cdot\mathbf b,\qquad
\tau=-\frac{\mathbf b\cdot\mathbf s}{c}.
$$

<SourceFigure src="/geodesy/figures/vlbi.png" alt="平面电磁波到达两座射电望远镜的时差" source="大地测量 绪论(1).pdf" page="11" printed="27" />

负号来自刚才定义的传播方向和到达时间差顺序，改换约定时符号也会改变。已知射电源方向，多个方向的时差观测便能约束基线，而不是单纯得到两个站之间的距离。精密 VLBI 还需要钟差、大气和相对论等模型。

## 卫星测高与其他空间观测

测高仪用往返传播时间确定卫星到海面的距离，轨道位置则提供卫星相对于参考椭球的高度。在天底观测、沿同一局部法线并忽略曲率及各项改正的示意模型中，海面椭球高满足

$$
h_{\mathrm{sea}}\approx h_{\mathrm{sat}}-R_{\mathrm{alt}}.
$$

<SourceFigure src="/geodesy/figures/altimetry.png" alt="卫星轨道高度与海面测距的关系" source="大地测量 绪论(1).pdf" page="13" printed="29" note="红色文字是原课件批注；本文用 R_alt 表示测距，避免与高程符号混淆。" />

原图的 $h'$ 对应卫星高度，$H$ 对应测距。离天底、海况和传播改正等因素使实际解算比简单相减更复杂。由此也可以看出：轨道高度误差会进入海面高度结果，测高仪的距离精度不能单独代表海面成果精度。

GNSS 的伪距和载波相位也包含站星距离，但还同时包含接收机与卫星钟差、传播延迟及其他未知量，载波相位另有整周模糊度。卫星重力任务则通过轨道、星间距离变化或梯度等观测约束重力场；SAR 干涉可用相位差约束地表视线向形变。这些方法的共同点是建立“观测量—几何或物理模型—未知参数”的关系，差别在于各自观测的物理量与误差模型。

<LearningMark section="gi-observations" />
