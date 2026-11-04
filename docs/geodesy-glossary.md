---
title: "大地测量术语与公式索引"
prev: false
next: false
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-glossary.md; edit the Obsidian source. -->

# 大地测量术语与公式索引

本页按“量代表什么、从哪里来、用于哪一步”回查。所有角度进入微积分与程序时采用弧度，显示单位另行说明。

| 术语或符号 | 几何或物理含义 | 回到讲解 |
|---|---|---|
| 参考椭球 a、f、e² | 长半轴、扁率与第一偏心率平方；$e^2=f(2-f)$ | [椭球参数](geodesy-ellipsoid-coordinates.html) |
| B、u、Φ | 椭球法线、辅助圆参数、地心向径定义的纬度 | [三种纬度](geodesy-ellipsoid-coordinates.html#latitude-relations) |
| h、H^O、H^N | 椭球高、正高、正常高，依附不同参考；原坐标讲义的 H 对应本课 h | [高度与重力](geodesy-intro-gravity.html) |
| M、N | 子午与卯酉方向的法曲率半径，单位m | [曲率](geodesy-curvature.html)、[方向曲率](geodesy-normal-curvature.html) |
| E、F、G | 第一基本形式系数，取决于选用的参数 | [数学准备](geodesy-math.html#first-fundamental-form) |
| E、N、U | 东、北、上坐标分量；此处N是长度分量 | [局部坐标](geodesy-local-polar.html) |
| A | 从北向东计的方位角；反方位角与终点前进方位角相差π | [正反算](geodesy-gauss-solution.html) |
| $r\sin A$ | 旋转曲面测地线的克莱劳常数，$r=N\cos B$ | [测地线方程](geodesy-geodesic-equations.html) |
| ε | 球面角超，弧度；$F_{area}=R^2\varepsilon$ | [球面三角形](geodesy-spherical-triangles.html) |
| $q_M,q_m$ | 弧长中点的坐标与端点坐标的均值 | [高斯推导](geodesy-gauss-derivation.html) |
| BLH↔XYZ | 同一椭球、同一原点轴系中的坐标表达转换 | [坐标反算](geodesy-coordinate-inverse.html) |
| Jacobian / 雅可比 | 输入微小变化到输出变化的线性映射 | [坐标微分](geodesy-coordinate-differentials.html) |
| 主动／被动旋转 | 固定轴转向量／固定向量转轴，矩阵互为转置 | [旋转](geodesy-frame-rotation.html) |
| Bursa–Wolf | 围绕坐标原点定义尺度和旋转的七参数模型 | [七参数](geodesy-seven-parameters.html) |
| Molodensky–Badekas | 在指定参考点附近定义旋转和尺度 | [参考点模型](geodesy-pivot-models.html) |
| Veis（范士）模型 | 相对于参考点局部坐标轴定义旋转 | [参考点模型](geodesy-pivot-models.html) |
| UT1、TAI、UTC、TT | 自转时间、原子时、协调世界时、地球时 | [时间系统](geodesy-orbit-time-systems.html) |

## 常用换算

$$
1°=\frac\pi{180}\ \mathrm{rad},\qquad
1''=\frac\pi{648000}\ \mathrm{rad},\qquad
\rho^{\prime\prime}=\frac{648000}\pi\simeq206264.806.
$$

地面斜距先归算成与求解模型对应的曲面长度，再进入大地主题计算；跨框架数据先统一框架、历元与单位，再计算基线。选择公式时把这些输入条件一同带入。
