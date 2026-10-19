---
title: 大地测量课程总览
prev: false
next: {"text": "第一章 大地测量绪论", "link": "/geodesy-intro"}
---

# 大地测量

<!-- earth-reading-task -->
一次山坡测量贯穿这门课：在测站P架设仪器，已知参考坐标和高程，观测目标Q的方向与斜距，最后求Q的可比较坐标。

四章依次交付四件事：**参考是什么 → 同一测站怎样表达 → 在曲面上沿哪条路 → 怎样把观测推进成坐标**。先沿这条路读；球面三角、额外证明与完整原资料用于解决相应问题，不必一次读完所有来源。

[期末关键总结与题型](review-geodesy.html)保留公式条件和最容易混用的量，第一次学习仍以本页的详细推导为主。
<!-- /earth-reading-task -->

<div class="course-quicklinks"><a href="/study-space/review-guide.html#geodesy">期末复习路线 →</a><a href="/study-space/resources.html#geodesy">原资料与来源索引 ↗</a></div>

重新学习时，可先沿[阅读路线](study-guide.html)建立本章与前后知识的联系，再进入具体专题。必要推导在正文展开；附加证明用于追踪尚未理解的步骤。


地面上的一个点可以用经纬度表达，也可以用三个直角坐标表达，但这些数值只有放进明确的地球模型和参考框架，才能表示可比较的位置。大地测量研究的正是这些表达、观测与地球真实形状之间的关系。

课程以绪论、椭球面数学性质、大地线与大地坐标计算为四个主章。绪论说明研究对象、位置表达和观测方法；椭球章从一般曲线和曲面的工具出发，逐步推导旋转椭球上的坐标、方向、曲率、弧长与面积。新讲义进一步联系路径、观测归算和正反算；四份辅助资料用于补充解释和核对。

## 第一章 大地测量绪论

[研究对象与参考模型](geodesy-intro-models.html)建立真实地球、参考椭球和物理参考面的区别；[位置表达与坐标框架](geodesy-intro-frames.html)解释坐标系、参考框架和变换方向；[空间观测](geodesy-intro-observations.html)从站星向量推导距离与距离变化率；[地球形状与重力场](geodesy-intro-gravity.html)联系大地水准面、正常椭球和平均海面。

[进入第一章](geodesy-intro.html)

## 第二章 椭球面数学性质

| 专题 | 数学递进 |
| --- | --- |
| [曲线 曲面与坐标表达](geodesy-math.html) | 参数化、切向、法向、坐标基与最小度量 |
| [旋转椭球与三种纬度](geodesy-ellipsoid-coordinates.html) | 椭球参数、坐标表达与纬度关系 |
| [椭球上的局部方向](geodesy-local-directions.html) | 偏导、单位向量、局部正交基 |
| [曲线曲率与子午曲率半径](geodesy-curvature.html) | 弧长定义、一般曲率、子午曲率 |
| [法曲率与方向曲率](geodesy-normal-curvature.html) | Meusnier 定理、Euler 公式、方向平均 |
| [曲面度量 弧长与面积](geodesy-metric.html) | 度量应用、长度正反算与面积积分 |

一般工具先用平面、圆等简单几何对象解释，再应用到椭球。关键证明在正文连续展开，公式之间说明下一步的依据。课件几何图紧邻推导，点击可放大。[进入第二章](geodesy-ellipsoid.html)

## 第三章 大地线（测地线）

[法截弧与大地线](geodesy-geodesic-geometry.html)说明两端截面、局部最短、曲率与挠率；[克莱劳定理与微分方程](geodesy-geodesic-equations.html)从椭球梯度推守恒量，再得到经纬度与前进方位角的变化。[进入第三章](geodesy-geodesics.html)

## 第四章 椭球面上大地坐标的计算

[观测归算](geodesy-observation-reduction.html)先统一方向、高度与长度；[球面三角形](geodesy-spherical-triangles.html)联系面积与角超；[高斯推导](geodesy-gauss-derivation.html)解释中点展开和平均引数；[正反算](geodesy-gauss-solution.html)给出完整公式、迭代、象限和误差回验。[进入第四章](geodesy-computation.html)

## 阅读约定

默认读者掌握基础微积分和线性代数，曲率与曲面概念仍从定义讲起。角度参与微分、积分和三角函数计算时使用弧度，交互输入以度显示。正文中的 $M,N$ 表示曲率半径，图中同名点由图注区分。

当前版本专注连贯讲解，不设置习题或自测。小算例展示纬度差、方向长度和反算误差；法截线第二种证明默认折叠。学习标记保存在当前浏览器。原讲义与配图位置见[来源索引](geodesy-sources.html)，坐标旋转补充见[辅助说明](geodesy-rotation.html)。
