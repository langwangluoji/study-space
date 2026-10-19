---
title: 最优化 · 按教材章节读懂两本书
prev: false
next: { text: Boyd第1章 引言, link: /optimization-bv-01 }
---

# 最优化 · 按教材章节读懂两本书

从问题开始理解数学，再沿原书的章节逐步推进。本讲义保留两本教材各自的完整章节顺序：Boyd & Vandenberghe侧重凸结构、建模与最优性证书；Nocedal & Wright第二版侧重数值算法、线性代数与一般非线性约束。

<div class="course-quicklinks"><a href="/study-space/optimization-bv-01.html">直接开始 Boyd 第1章 →</a><a href="/study-space/optimization-nw-01.html">直接开始 Numerical 第1章 →</a><a href="/study-space/optimization-sources.html">原书与页码 →</a></div>

## 一次定位任务，读通七个问题 {#positioning-route}

原书顺序保留在下方。第一次阅读也可沿同一张双轴校准台推进：变量、数据与候选位置始终衔接，每一步留下下一章真正要回答的问题。

|要回答的问题|详细讲义|本步带走什么|
|---|---|---|
|哪些位置允许？|[BV2：可行集](/optimization-bv-02#positioning-feasible)|半空间与凸组合|
|位置的代价怎样弯曲？|[BV3：能量与曲率](/optimization-bv-03#positioning-energy)|同一目标q及Hessian|
|它是哪一种可解模型？|[BV4：写成QP](/optimization-bv-04#positioning-qp)|候选(1.2,.8)与代价.4|
|候选真是全局最好吗？|[BV5：KKT与下界](/optimization-bv-05#positioning-kkt)|乘子、反力尺度与零间隙|
|去掉挡板怎样移动？|[NW2：自由目标](/optimization-nw-02#positioning-unconstrained)|梯度与曲率各自作用|
|沿方向走多远？|[NW3：一次完整线搜索](/optimization-nw-03#positioning-linesearch)|试步、拒绝、回溯与Wolfe|
|范围内方向也可改变吗？|[NW4：信赖域](/optimization-nw-04#positioning-trust)|Cauchy步与真实/预测下降|

[期末复习：公式、条件、易错点与题型路线](/review-optimization)用于考前回忆；各章正文保留完整推导、来源与进阶细节。动画中的机械缓动仅呈现模型，不替代算法迭代或一般证明。

## Convex Optimization · Boyd & Vandenberghe

第1章建立问题语言；第2–5章是理论部分，从集合、函数、模型走向对偶；第6–8章在拟合、统计与几何中使用这些工具；第9–11章解释求解方法。附录数学在正文随用随讲，不作为前置评估。

- [第1章 · Introduction · 引言](optimization-bv-01.html)
- [第2章 · Convex sets · 凸集](optimization-bv-02.html)
- [第3章 · Convex functions · 凸函数](optimization-bv-03.html)
- [第4章 · Convex optimization problems · 凸优化问题](optimization-bv-04.html)
- [第5章 · Duality · 对偶](optimization-bv-05.html)
- [第6章 · Approximation and fitting · 逼近与拟合](optimization-bv-06.html)
- [第7章 · Statistical estimation · 统计估计](optimization-bv-07.html)
- [第8章 · Geometric problems · 几何问题](optimization-bv-08.html)
- [第9章 · Unconstrained minimization · 无约束极小化](optimization-bv-09.html)
- [第10章 · Equality constrained minimization · 等式约束极小化](optimization-bv-10.html)
- [第11章 · Interior-point methods · 内点法](optimization-bv-11.html)

原书附录：[A 数学背景](optimization-bv-a.html) · [B 两个二次函数](optimization-bv-b.html) · [C 数值线性代数](optimization-bv-c.html)。

## Numerical Optimization · Nocedal & Wright

第1–11章从无约束基础、搜索与曲率走向大规模、导数、最小二乘和方程；第12章建立约束理论；第13–19章按原书顺序展开LP、QP、罚函数、SQP与内点法。凸理论与一般非凸算法的保证会分别说明。

- [第1章 · Introduction · 引言](optimization-nw-01.html)
- [第2章 · Fundamentals of Unconstrained Optimization · 无约束基础](optimization-nw-02.html)
- [第3章 · Line Search Methods · 线搜索](optimization-nw-03.html)
- [第4章 · Trust-Region Methods · 信赖域](optimization-nw-04.html)
- [第5章 · Conjugate Gradient Methods · 共轭梯度](optimization-nw-05.html)
- [第6章 · Quasi-Newton Methods · 拟牛顿](optimization-nw-06.html)
- [第7章 · Large-Scale Unconstrained Optimization · 大规模优化](optimization-nw-07.html)
- [第8章 · Calculating Derivatives · 导数计算](optimization-nw-08.html)
- [第9章 · Derivative-Free Optimization · 无导数优化](optimization-nw-09.html)
- [第10章 · Least-Squares Problems · 最小二乘](optimization-nw-10.html)
- [第11章 · Nonlinear Equations · 非线性方程](optimization-nw-11.html)
- [第12章 · Theory of Constrained Optimization · 约束理论](optimization-nw-12.html)
- [第13章 · Linear Programming: The Simplex Method · LP单纯形法](optimization-nw-13.html)
- [第14章 · Linear Programming: Interior-Point Methods · LP内点法](optimization-nw-14.html)
- [第15章 · Fundamentals of Algorithms for Nonlinear Constrained Optimization · 约束算法基础](optimization-nw-15.html)
- [第16章 · Quadratic Programming · 二次规划](optimization-nw-16.html)
- [第17章 · Penalty and Augmented Lagrangian Methods · 罚与增广拉格朗日](optimization-nw-17.html)
- [第18章 · Sequential Quadratic Programming · SQP](optimization-nw-18.html)
- [第19章 · Interior-Point Methods for Nonlinear Programming · 非线性内点法](optimization-nw-19.html)

原书附录：[A 基础材料](optimization-nw-a.html) · [B 正则化过程](optimization-nw-b.html)。

## 讲义怎样帮助阅读

正文以中文解释对象、公式意义和推导依据，保留英文术语；原创短英文句帮助逐渐读懂原著的量词、条件与结论。需要时展开中文提示。小节按原著顺序组织，跨章过渡说明为什么要引入下一种工具。

机器学习、深度学习、控制、组合导航和惯性导航在相关知识处作为模型与解释融入，不另设应用章节。手算只用于澄清关键机制，交互帮助观察参数改变；原著完整证明、练习和历史参考文献仍请结合PDF阅读。

这是覆盖两书全部主章及主节的详细导读，并非逐句翻译。理论条件、源小节与数值例子分别校验；覆盖深度与限制记录在[原书及校验说明](optimization-sources.html)。阅读节奏由你决定，没有周次计划或前置测评。
