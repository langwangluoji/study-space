---
title: 大地测量期末关键总结
---

# 大地测量期末关键总结

沿山坡测站 P 到目标 Q 的任务复习：先定参考，再求位置与方向，归算观测，最后正反算并回验。本页压缩条件和题型；完整证明见[课程总览](course-geodesy.html)。课堂考试范围仍以教师要求为准。

## 一页公式与条件

| 问题 | 必须会写的关系 | 条件与检查 |
| --- | --- | --- |
| 坐标换基 | $\mathbf v_P=E_P^TE_Q\mathbf v_Q$ | 正交单位基；同一向量、同一原点；被动换基与主动旋转方向不同 |
| 椭球参数 | $b=a(1-f),\ e^2=f(2-f)$ | 不混用第一、第二偏心率 |
| 大地坐标到直角坐标 | $X=(N+h)\cos B\cos L,\ Y=(N+h)\cos B\sin L,\ Z=[N(1-e^2)+h]\sin B$ | $h$ 是椭球高；经度用 atan2 恢复象限 |
| 三种纬度 | $\tan u=(b/a)\tan B,\ \tan\Phi=(b^2/a^2)\tan B$ | 两条关系对椭球面 $h=0$；空间点改用 $\Phi_h=\operatorname{atan2}(Z,\sqrt{X^2+Y^2})$ |
| 主曲率半径 | $N=a(1-e^2\sin^2B)^{-1/2}$；$M=a(1-e^2)(1-e^2\sin^2B)^{-3/2}$ | $N$ 不是平行圈半径；后者是 $N\cos B$ |
| 方向曲率 | $1/R_A=\cos^2A/M+\sin^2A/N$ | $A$ 从北起算；$A=0$ 得 $M$，$90°$ 得 $N$ |
| 椭球面度量 | $ds^2=M^2dB^2+N^2\cos^2B\,dL^2$；$d\Sigma=MN\cos B\,dB\,dL$ | 微分角用弧度；固定高度面长度系数改成 $M+h,(N+h)\cos B$ |
| 大地线方程 | $dB/ds=\cos A/M$；$dL/ds=\sin A/(N\cos B)$；$dA/ds=\sin A\tan B/N$ | 前进方位角沿程变化；近极区经度坐标有奇异性 |
| 克莱劳关系 | $N\cos B\sin A=C$ | 旋转曲面大地线守恒量；不是所有地表曲线都成立 |
| 球面角超 | $E=\alpha+\beta+\gamma-\pi$，$F=R^2E$ | 球面三角形，角超用弧度；球面不是椭球面的精确替代 |
| 高程区别 | $h=H+\zeta$（正常高），$h=H^{\rm ortho}+N_g$（正高） | $\zeta$ 是高程异常；$N_g$ 为大地水准面差距，避免与卯酉半径 $N$ 混名 |

推导入口：[坐标与纬度](geodesy-ellipsoid-coordinates.html) · [局部基](geodesy-local-directions.html) · [曲率](geodesy-normal-curvature.html) · [度量](geodesy-metric.html) · [大地线方程](geodesy-geodesic-equations.html)。

## 三条常见计算路线

**坐标与局部长度。** 写明椭球和高程类型 → 算 $M,N$ → 把角度换成弧度 → 分别用南北、东西系数。WGS84 在 $B=45°$、$h=0$ 时，$u\approx44.9037878494°$、$\Phi\approx44.8075767840°$；三者都对应同一测站。

**斜距归算。** 在[球面短边模型](geodesy-observation-reduction.html#earth-reduction-example)中，先取 $q=\sqrt{D^2-(H_2-H_1)^2}$，再取 $d=q/\sqrt{(1+H_1/R)(1+H_2/R)}$，最后 $S=2R\arcsin[d/(2R)]$。$D=1000$ m、$H_1=H_2=100$ m、$R=6371000$ m 时，$q=1000$ m、$d\approx999.984304$ m、弦转弧约 $1.027\,\mu$m。高程归算与弦弧改正不能相互替代。

**高斯正反算。** 先统一终点方位角约定 → 用两端关系初始化 → 求中点引数并迭代 → 用 atan2 处理象限 → 正算回代检查终点。[推导](geodesy-gauss-derivation.html)中的实际中点值 $q_m$ 与端点算术平均 $q_M$ 相差 $O(S^2)$，进入距离项后可造成更高阶改正。迭代残差很小只说明方程迭代收敛，不能证明截断模型的真实端点误差很小。高纬、长距离须用独立椭球解回验；不背“所有情况毫米级”的结论。

## 最后自查

参考椭球不等于物理大地水准面；椭球法线不等于重力铅垂线；法截弧不自动就是大地线；局部最短不保证任意长段全局唯一最短。坐标变换须先区分旋转、平移、尺度与框架历元。回原文核对[参考与重力](geodesy-intro-gravity.html)、[法截弧](geodesy-geodesic-geometry.html)、[高斯正反算](geodesy-gauss-solution.html)，原件位置见[来源](geodesy-sources.html)。
