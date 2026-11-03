---
title: "第二章 椭球面数学性质"
slug: geodesy-ellipsoid
chapter: 2
order: 0
sources: ["S3","S2"]
---


# 第二章 椭球面数学性质

<!-- earth-reading-task -->
现在选定参考椭球，要把同一P变成能计算的对象：先得到位置XYZ，再得到东、北、上的方向和沿经纬线的长度系数。每个专题都使用这个P；一般曲面的工具在需要时接回椭球，不另设一套学习目标。
<!-- /earth-reading-task -->

旋转椭球既是一张可以参数化的曲面，也是一种有明确几何意义的地球模型。先建立描述一般曲线和曲面的工具，再利用旋转对称性，把这些工具变成可计算的坐标、方向、曲率与度量公式。

## 曲线与曲面的表达

[第一个专题](geodesy-math.md)说明参数变化如何形成切向量，以及独立切向量如何确定法线；从点积建立后续曲率归一化所需的第一基本形式。向量知识在推导需要时说明。

<!-- geodesy-anchor: g3-latitude -->
## 三种纬度与空间坐标
[第二个专题](geodesy-ellipsoid-coordinates.md)从椭圆旋转得到椭球，建立三种参数化并推导纬度关系。

<!-- geodesy-anchor: g3-ecef -->
## 局部方向与椭球高
[第三个专题](geodesy-local-directions.md)求偏导得到切向与外法线，沿法线加入椭球高，随后提供交互计算。

<!-- geodesy-anchor: g3-metric -->
## 曲率 弧长与面积
[第四个专题](geodesy-curvature.md)推导曲率和子午曲率半径；[第五个专题](geodesy-normal-curvature.md)证明法曲率定理并推导卯酉及方向曲率；[第六个专题](geodesy-metric.md)统一长度与面积计算。

主要依据椭球 PDF 文件页 3–56，插入的补充推导页也参与核对。文件页 57 的习题暂不编入，58–60 页的坐标变换与法截线展开已完整整理为[默认折叠的独立证明](geodesy-normal-curvature.md#%E4%BB%8E%E5%B1%80%E9%83%A8%E6%88%AA%E9%9D%A2%E6%96%B9%E7%A8%8B%E6%A0%B8%E5%AF%B9Euler%E5%85%AC%E5%BC%8F)。
