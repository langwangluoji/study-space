---
title: 期末复习路线
pageClass: supporting-page
prev: false
next: false
---

# 期末复习路线

先对照教师公布的考试范围，再用下面的路线串起知识。这里覆盖本站已有课程内容，不推定考试题型、重点分值或尚未整理的章节。需要补概念时，回到[自学路线](study-guide.html)；查原件时进入[资料中心](resources.html)。

<div class="course-quicklinks"><a href="#ml">机器学习</a><a href="#geodesy">大地测量</a><a href="#remote-sensing">遥感原理</a><a href="#insar">InSAR</a><a href="/study-space/extensions.html">卡住时补资料 →</a></div>

## 开始前，先整理三个位置

把教师要求的范围、对应正文链接和原课件页码放在一起。先恢复每章要解决的问题，再检查公式的对象、假设、单位和推导步骤；暂时说不清的地方标出位置，回读或查来源。这样可以减少在整本教材之间反复翻找。

复习表是已有内容的阅读索引。需要补充解释时使用[资料扩展](extensions.html)，需要原文件时使用[资料中心](resources.html)。

## 机器学习：串起模型、目标与求解 {#ml}

| 复习主线 | 回到正文 | 读完应能说明 |
| --- | --- | --- |
| 模型与数据 | [参数与预测](lecture-1.html#a1)、[设计矩阵](lecture-1.html#a2) | 样本、特征、参数各在矩阵哪一维；预测怎样算出来 |
| 损失与求解 | [平方误差](lecture-1.html#a3)、[正规方程](lecture-1.html#a4)、[数值计算](lecture-1.html#a5) | 为什么用这个目标；梯度怎样得到；何时解唯一 |
| 概率与泛化 | [第一讲后续主线](lecture-1.html#a8) | 似然、先验和后验的角色；验证数据怎样参与选择 |
| 分类与决策 | [第二讲](lecture-2.html#b1)、[Logistic](lecture-2.html#b5)、[Softmax](lecture-2.html#b6) | 评分、距离、概率与类别的区别；损失和标签怎样对应 |
| 网络与梯度 | [节点与布局](lecture-3.html#c1)、[反向传播](lecture-3.html#c4)、[梯度复算](lecture-3.html#c5) | 一次前向和反向怎样计算；形状、转置、平均因子为何出现 |
| 实践与评价 | [CIFAR-10 实践](cifar10-practice.html#p0) | 数据划分、更新流程和指标；快速检查与正式实验的边界 |

复算时先使用正文已有的最小算例，再核对矩阵式。容易混淆的是残差方向、每样本平均因子、单样本列向量与批量行布局，以及概率模型成立的前提。三讲末尾的“学习记录”可以标记已读和掌握情况，记录保存在当前浏览器。

## 大地测量：串起参考、表达与几何 {#geodesy}

| 复习主线 | 回到正文 | 读完应能说明 |
| --- | --- | --- |
| 参考模型 | [研究对象与参考模型](geodesy-intro-models.html)、[形状与重力场](geodesy-intro-gravity.html) | 椭球、大地水准面和正常场分别解决什么问题 |
| 坐标与观测 | [坐标框架](geodesy-intro-frames.html)、[空间观测](geodesy-intro-observations.html) | 坐标、历元和变换方向的意义；观测如何约束位置 |
| 曲面与纬度 | [数学工具](geodesy-math.html)、[三种纬度](geodesy-ellipsoid-coordinates.html) | 比较同一个点的三种角度；切向与法向怎样得到 |
| 局部方向 | [椭球上的局部方向](geodesy-local-directions.html) | 经度、纬度变化怎样联系东、北、外法线方向 |
| 曲率与方向 | [曲线与子午曲率](geodesy-curvature.html)、[法曲率](geodesy-normal-curvature.html) | 曲线主法线与曲面法线的区别；方向怎样改变曲率 |
| 长度与面积 | [度量、弧长与面积](geodesy-metric.html) | 从第一基本形式走到积分；截断误差和迭代残差的区别 |

公式核对时特别注意角度单位、椭球参数、三种纬度，以及曲率半径的方向约定。需要回到课件核对页码时使用[资料来源索引](geodesy-sources.html)。当前大地测量版本保持连贯讲解，不另设习题或自测。

## 遥感原理与基础：串起辐射、轨道与成像 {#remote-sensing}

| 复习主线 | 回到正文 | 读完应能说明 |
| --- | --- | --- |
| 遥感系统链 | [遥感定义与过程](remote-sensing-ch1.html) | 能量、目标、传感器和信息产品之间怎样连接 |
| 电磁波与辐射量 | [波谱](remote-sensing-ch2.html#rs2-spectrum)、[辐射量](remote-sensing-ch2.html#rs2-radiometry) | 波长与频率关系；通量、辐照度、出射度和辐亮度的对象与单位 |
| 热辐射与亮温 | [黑体定律](remote-sensing-ch2.html#rs2-blackbody-laws)、[发射率与亮温](remote-sensing-ch2.html#rs2-emissivity-brightness-temperature) | 普朗克、Stefan–Boltzmann和维恩定律各描述什么；亮温为何不等于物理温度 |
| 大气与地物光谱 | [大气作用](remote-sensing-ch2.html#rs2-atmosphere)、[地物光谱](remote-sensing-ch2.html#rs2-spectral-signatures) | 窗口、吸收带与仪器波段的区别；植被、水体、土壤和岩石曲线为何变化 |
| 轨道与姿态 | [轨道参数](remote-sensing-ch3.html)、[姿态](remote-sensing-ch3.html#rs3-attitude) | 静止和太阳同步各需哪些条件；周期、重访、地面轨迹与姿态的区别 |
| 扫描与分辨率 | [光机扫描](remote-sensing-ch4.html#rs4-scanning)、[视场与分辨率](remote-sensing-ch4.html#rs4-ifov) | 摆扫和推扫怎样形成影像；FOV、IFOV、幅宽、GSD和空间分辨率各指什么 |
| 微波、SAR与InSAR | [微波成像](remote-sensing-ch4.html#rs4-microwave)、[SAR](remote-sensing-ch4.html#rs4-radar)、[InSAR](remote-sensing-ch4.html#rs4-insar) | 主动与被动微波的能量路径；距离向、方位向、地形畸变和干涉相位的意义 |

复习讲义原图时先读图注中的适用条件和原文件页码。岩石光谱图的横轴有疑似刻度笔误，黑体图纵轴单位不完整，这两张图只作定性比较；涉及定量关系时回到正文公式和单位。

## 根据剩余时间安排阅读

- 时间充足：沿自学路线读正文，遇到疑问再展开证明，并复算已有例子。
- 已学过一遍：按上表恢复概念之间的联系，针对说不清的条件和步骤回读。
- 临近考试：先核对教师范围，定位对应公式的对象、假设与量纲，集中补易混处。

能复述结论只是第一步。至少应能解释关键等号、适用条件和变量含义，再用一个已有算例检查理解。

## InSAR：恢复信号、几何与解释的联系 {#insar}

| 复习主线 | 回到正文 | 读完应能说明 |
| --- | --- | --- |
| 微波与目标 | [微波遥感基础](insar-microwave.html) | 波长、极化、介质和局部入射条件如何联合影响回波；全天候的边界 |
| 两向成像 | [SAR 成像原理](insar-imaging.html) | 延迟为什么除以二；带宽为什么控制距离分辨率；运动相位怎样产生合成孔径 |
| 图像解译 | [图像特征及解译](insar-interpretation.html) | 分辨率与采样间距、收缩/叠掩/阴影、相干斑/去相干分别有什么区别 |
| 后续干涉联系 | [主线与公式索引](insar-review.html) | 传播相位的双程因子、差分正负、LOS与垂直位移，以及单对相位的其他成分 |

当前范围对应课堂前三讲。依据教师考试通知确定需要复习的章节，不把教材后续时间序列章节当作已完成范围。
