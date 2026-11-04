---
title: "大地测量来源、页码与覆盖索引"
prev: false
next: false
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-sources.md; edit the Obsidian source. -->

# 大地测量来源、页码与覆盖索引

课程依据本地《大地测量》目录中的讲义和辅助资料重编。页码从PDF文件第1页或PPT第1张开始，印刷页码不同时分别注明。逐页的内容去向见[覆盖清单](/geodesy/coverage.json)，文件标识与校验值见[来源清单](/geodesy/course-sources.json)。

| 编号 | 原资料 | 课程用途 |
|---|---|---|
| S1 | 大地测量 绪论(1).pdf，29页 | 绪论与参考、观测、重力基础 |
| S2 | 向量微积分常用公式.pdf，8页 | 求导、点叉积、曲线曲面数学 |
| S3 | 1椭球面数学性质   课程讲义.pdf，60页 | 椭球、方向、曲率、弧长与面积 |
| S4 | 坐标分量旋转与坐标轴旋转的关系(1).docx | 基向量、方向余弦与主动／被动旋转 |
| S5 | 现代大地控制测量_12803034.pdf，294页 | 概念核对、投影及控制测量拓展 |
| S6 | 轨道力学基础（4学时）(1).pptx，84页 | 辅助篇全部实际讲授内容 |
| S7 | 2大地线 （测地线 ）.pdf，11页 | 相对法截弧、克莱劳与测地线方程 |
| S8 | 3椭球面上大地坐标的计算(1).pdf，28页 | 原版观测归算和高斯计算 |
| S9 | 3椭球面上大地坐标的计算--补充高斯正反算伪代码流程.pdf，30页 | 新增第28—29页正反算伪代码，与旧版分别记录 |
| S10 | 4大地坐标与地心坐标之间转.pdf，10页 | 第五章坐标正反算与微分 |
| S11 | 5三维直角坐标系之间转换.pdf，33页 | 第六章旋转、站心坐标、转换模型 |

## 怎样回到原资料

在本地知识库查阅来源清单即可定位原文件；原件继续保存在课程资料目录。网站的新课程页发布重新组织的讲解和必要配图。旧版课程的来源入口继续保留，以维持已有链接。

| 需要核对的内容 | 页面 |
|---|---|
| 原版绪论与椭球资料 | [S1](https://langwangluoji.github.io/study-space/geodesy-source-s1.html)、[S3](https://langwangluoji.github.io/study-space/geodesy-source-s3.html) |
| 大地线与原版计算讲义 | [S7](https://langwangluoji.github.io/study-space/geodesy-source-s7.html)、[S8](https://langwangluoji.github.io/study-space/geodesy-source-s8.html) |
| 新增坐标转换及原件勘误 | [第五章](geodesy-coordinate-conversion.html)、[第六章](geodesy-frame-transformations.html) |
| 新版高斯流程 | [正反算](geodesy-gauss-solution.html#gauss-pseudocode) |
| 轨道PPT全内容去向 | [辅助篇](geodesy-orbit-supplement.html) |

## 配图与补写推导

本轮补图的[配图来源清单（JSON）](/geodesy/data/figure-inventory.json)列出55个图像资源及其专题位置；[裁图记录](/geodesy/data/figure-source-crops.json)注明 PDF 文件页、幻灯片序号、裁切范围和图像校验值，[重绘记录](/geodesy/data/figure-redraws.json)注明使用的计算模型。本地知识库另有可直接阅读的 Markdown 来源表。

新增勘误：S11 文件页8的同名 Y 轴夹角公式，在本课明确的被动 $R_zR_yR_x$ 约定下，三重正弦交叉项应取负号；推导和30°检核见[旋转专题](geodesy-frame-rotation.html)。S10 文件页7的椭球参数偏导末因子更正继续保留在[椭球参数变化](geodesy-ellipsoid-parameter-change.html)中。

原讲义必要图像标明文件页和原页码；重绘图标明示意范围。三种纬度、法截弧、曲率和观测归算沿用已有可放大来源图。新图解使用与读数相同的计算模型，同时提供本地静态版本。

原讲义中的符号歧义、局部笔误及历史术语在相应章节就近说明；数学结论通过独立求导、坐标回代或数值比较复核。原封面和目录页在覆盖清单中标为结构页，原习题关联到相应例题或自测。知识覆盖不要求逐字重复原资料。
