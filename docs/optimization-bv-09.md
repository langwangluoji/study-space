---
pageClass: optimization-lecture
title: BV 第9章 Unconstrained minimization
description: 按原书顺序理解下降方法、梯度法、不同范数的最速下降、牛顿法、自协调与数值实现。
---

# 第9章 Unconstrained minimization · 无约束最小化

[← 第8章 Geometric problems](./optimization-bv-08) · [双书目录](./optimization-sources) · [第10章 Equality constrained minimization →](./optimization-bv-10)

第6至8章说明哪些模型值得求解，现在开始研究如何求解。Boyd 本章集中讨论光滑凸目标：先决定一个能下降的方向，再确定多大的步子可信。随着从梯度到 Hessian 的信息增加，每步计算更复杂，但我们也能更准确地理解局部几何。阅读时尤其要留意书中的 assumptions；收敛定理不是脱离条件的算法广告。

## 9.1 Unconstrained minimization problems · 目标与假设

基本问题是 $\min_{x\in\operatorname{dom}f}f(x)$，其中 $f$ 凸、二阶连续可微，定义域开。这里“无约束”表示没有显式等式或不等式，并不等于定义域就是整个 $\mathbb R^n$。例如 $-\sum_i\log x_i$ 要求 $x_i>0$，任何迭代都必须留在定义域内。

原书先假定最优解存在，并选择定义域中的起点 $x^{(0)}$，要求初始次水平集 $S=\{x:f(x)\le f(x^{(0)})\}$ 闭。很多经典分析还假定在 $S$ 上存在正数 $m,M$ 使

$$
mI\preceq\nabla^2f(x)\preceq MI.
$$

下界是强凸性，上界控制曲率，$M/m$ 描述这一范围内的尺度差异。凸性使 $\nabla f(x^*)=0$ 成为最优的充要条件，强凸性进一步排除平坦的多解方向。若只知道目标凸，不能自动得到下面的线性速率，也不能自动得到解存在。

这些条件还说明怎样理解“小梯度”：强凸模型中，$f(x)-p^*\le\|\nabla f(x)\|_2^2/(2m)$。但 $m$ 经常未知，所以梯度阈值只是可观察的数值停止依据，未必直接给出指定的目标误差证书。实际算法应分别记录停止准则、实际残差和达到上限的情况。

## 9.2 Descent methods · 方向与步长

将一步写成 $x^+=x+t\Delta x$。向量 $\Delta x$ 是 search direction，标量 $t>0$ 是 step size；除非方向长度为1，$t$ 并不是点实际移动的距离。若 $g=\nabla f(x)$ 且 $g^T\Delta x<0$，该方向的一阶变化为负，足够小且不越出定义域的一步就会下降。

exact line search 沿这个方向精确最小化 $f(x+t\Delta x)$；它未必便宜，也未必值得每步都求得极精确。Backtracking line search 从一个试探步长出发，反复乘 $\beta\in(0,1)$，直到满足

$$
f(x+t\Delta x)\le f(x)+\alpha t\,g^T\Delta x,
\qquad0<\alpha<1/2.
$$

右侧是当前目标加上一部分线性预测下降，称为 sufficient decrease / Armijo condition。它要求实际下降至少达到当前步长下线性预测下降的一定比例。这个要求也随步长缩小，因此足够小的正步通常都能通过，Armijo条件本身不能排除任意小步。回溯的算法机制是从给定试探步长开始、按固定比例缩减，并接受第一个合格步，而不是在全部合格步中人为挑一个极小值；进一步的步长下界与收敛进展还依赖函数和方向条件。还必须先确保试探点属于定义域；对数、逆矩阵等目标不能先在域外求值，再期待普通数值比较替你处理。

原书的 $\alpha$ 是 Armijo 常数、$t$ 是步长；交互实验用 $\alpha$ 标记用户选择的初始步长，并固定 Armijo 系数为 $1/4$。读图与读原文时，先对应字母所代表的角色。

## 9.3 Gradient descent method · 梯度下降

负梯度 $\Delta x=-g$ 使方向导数 $-\|g\|_2^2<0$。一阶信息便宜，因此梯度法易于实现；困难在于同一个步长需要同时照顾不同曲率的方向。在上述强凸且有曲率上界的条件下，合适线搜索给线性收敛，即目标误差按几何因子缩小。因子会随 $M/m$ 变坏，狭长次水平集常使迭代来回摆动。

对二次函数 $f(x)=x^TQx/2$、$Q\succ0$，固定步长更新为 $(I-tQ)x$。在 Hessian 特征方向上，误差分别乘以 $1-t\lambda_i(Q)$；全部方向收敛要求

$$
0<t<\frac{2}{\lambda_{\max}(Q)}.
$$

这解释了为什么负梯度方向正确，却不能保证任意大步都会下降。靠近上界时，高曲率方向可能反复换符号；超过上界则被放大。对一般光滑目标，要用梯度 Lipschitz 或局部曲率等条件重新建立适用范围，不能把一个二次函数的阈值当成所有函数的固定公式。

<OptimizationLab kind="gradient" />

实验由严格凸二维二次型展示曲率、步长与实际迭代。它的 Newton 一步收敛只反映该目标恰好是二次函数；它不能证明一般非线性目标也只需一步。深度网络的全批或随机梯度同样使用导数方向，但整体目标通常非凸，随机梯度还包含抽样误差；本章的凸强凸收敛证明不能直接迁移过去。

## 9.4 Steepest descent method · “最速”依赖长度定义

给“单位步”换一种范数，最速方向就会改变。原书先定义 normalized steepest descent direction：

$$
\Delta x_{\rm nsd}\in\arg\min_{\|v\|\le1}g^Tv.
$$

最小值为 $-\|g\|_*$，这里 $\|\cdot\|_*$ 是 dual norm。原书再将方向乘 $\|g\|_*$，得到未归一化的步向量，使 $g^T\Delta x_{\rm sd}=-\|g\|_*^2$。单位球的形状决定什么叫同样长度，因此“最速”不是脱离度量的一支固定箭头。

欧氏范数给 $\Delta x=-g$；二次范数 $\|v\|_P=(v^TPv)^{1/2}$、$P\succ0$ 给 $\Delta x=-P^{-1}g$。这个方向等价于先对坐标做变换，再在新坐标用普通梯度法。这是 preconditioning 的几何基础：让不同变量的尺度更协调，而不是增加了新的最优性条件。

$\ell_1$ 单位球则允许选择梯度绝对值最大的坐标 $i$，取归一化方向 $-\operatorname{sign}(g_i)e_i$。相应未归一化步为 $-g_ie_i$，每次只更新一个坐标；这是原书介绍的一种 coordinate descent。它与轮流遍历每个坐标的循环坐标下降并非同一个选坐标规则。等大的最大分量可能使最速方向不唯一。

## 9.5 Newton’s method · 用二次模型决定方向

将目标在当前点展开为 $f(x)+g^Tv+v^THv/2$，$H=\nabla^2f(x)$。当 $H\succ0$ 时，最小化局部二次模型得到

$$
H\Delta x_{\rm nt}=-g,\qquad
g^T\Delta x_{\rm nt}=-g^TH^{-1}g<0\quad(g\ne0).
$$

牛顿法因此是用 Hessian 度量的最速下降；每一步度量随点变化。应把公式中的 $H^{-1}g$ 理解为解线性系统，而不是显式求逆。二次模型只在附近可信，所以原书采用 damped Newton：方向先算好，再做回溯。一般函数从远处出发时，直接固定全步并没有同样保证。

Newton decrement 为 $\lambda(x)=(g^TH^{-1}g)^{1/2}$，满足 $\lambda^2=\Delta x^TH\Delta x$。它衡量二次模型中的步长，$\lambda^2/2$ 等于模型预测的目标改善，因此可用于停止。但对一般光滑函数，这个模型估计不是无条件的真实误差上界；下一节会给自协调情形的严格界。

经典局部 quadratic convergence 需要 Hessian 在解处非奇异、附近变化受到控制，例如 Hessian Lipschitz，且起点已足够近。原书在强凸次水平集与 Hessian Lipschitz 条件下分析阻尼阶段和最终全步阶段。近解时误差满足类似 $\|e_{k+1}\|\le C\|e_k\|^2$，正确数字可能快速增加；远处阶段与每步线性代数成本仍可能占据大部分时间。

牛顿步在可逆仿射坐标变换下具有 affine invariance，意义是变换前后的数学迭代相互对应。它不表示计算机求解不受病态线性系统与浮点误差影响，也不表示一般非凸 Hessian 自动正定。非凸情况下修改 Hessian、信赖域或拟牛顿的处理，可继续读 NW 的相应章节。

<OptimizationReading terms="descent direction · Newton decrement · affine invariance" english="The Newton decrement measures the predicted improvement of the local quadratic model; a rigorous bound on the true error requires additional assumptions." chinese="牛顿减量衡量局部二次模型预计能改善多少；若要把它当成真实误差的严格界，还必须补上相应条件。" task="对照9.5.1与9.6.3，找出 model estimate 何时变成 provable bound。不要把一般算法的停止阈值直接读成证明。" />

## 9.6 Self-concordance · 用局部曲率控制曲率变化

传统 Newton 分析涉及坐标相关且常未知的 $m,M,L$。Self-concordance 提供另一种控制方式：一维凸函数在定义域内满足 $|f'''(x)|\le2[f''(x)]^{3/2}$；多维版本要求每条直线上的限制都满足它，等价写成

$$
|D^3f(x)[v,v,v]|\le2\big(v^T\nabla^2f(x)v\big)^{3/2}.
$$

它比较的是第三阶变化与当前第二阶曲率，度量随函数本身而变，因此具有仿射不变性。$-\log x$、凸二次函数和 $-\log\det X$ 都是重要例子。自协调在相加、仿射复合和不小于1的缩放下保持；任意凸光滑函数却未必自协调，任意小缩放也不能照搬相同常数。

本节的 Newton 分析还要求合适的定义域与闭次水平集、下有界、严格凸的自协调情形，并确保 Newton 系统可以求解。自协调这个词本身不代替所有可解性条件。若 $\lambda(x)<1$，原书给出误差界

$$
f(x)-p^*\le-\lambda(x)-\log(1-\lambda(x)).
$$

当 $\lambda\le0.68$ 时，右侧不超过 $\lambda^2$。于是此时停止于 $\lambda^2\le\varepsilon$ 才有相应的真实目标误差保证，且容差也要与上述范围相符。注意原书一般 Newton 算法用 $\lambda^2/2$ 的模型估计；不能省掉这里的因子与条件。自协调也让内点法的每次中心化能得到不依赖未知全局曲率常数的分析，所以这节直接为第11章铺路。

§9.6.4进一步给出两个阶段，而不仅是一个停止界。在前述严格凸、自协调、闭初始次水平集及下有界条件下，存在只依赖回溯参数的 $\eta,\gamma>0$，其中 $\eta\le1/4$：若 $\lambda(x)>\eta$，一次迭代使目标至少下降 $\gamma$；进入 $\lambda(x)\le\eta$ 后接受全步，且 $2\lambda(x^+)\le[2\lambda(x)]^2$。因此阻尼阶段的步数受初始目标差除以 $\gamma$ 控制，局部阶段达到高精度只需对 $1/\varepsilon$ 的双对数级步数。该结论仍针对指定回溯与函数类，计的是Newton迭代，不包含每步线性方程求解成本。

## 9.7 Implementation · 从公式到计算

原书先讨论线搜索的预计算。若 $f(x)=\phi(Ax+b)$，同一方向上有 $A(x+t\Delta x)+b=(Ax+b)+tA\Delta x$，先缓存两个向量，能避免每次试探步都重复矩阵乘法。是否值得缓存取决于函数结构与线搜索次数，而不是仅看公式是否短。

Newton 的主要成本是 Hessian 和线性系统。稠密正定 Hessian 可用 Cholesky；稀疏、带状、块结构或对角加低秩结构可大幅降低成本。大规模模型未必适合显式保存完整 Hessian，可能需要矩阵向量乘积或其他迭代求解方式。参数尺度、线性系统残差、定义域检查和有限精度会影响结果，少量迭代次数不能单独证明算法更便宜。

本章建立了光滑无约束算法的完整路径：下降方向回答往哪里走，线搜索回答模型在多大范围可信，停止量回答得到的点有多接近所要求的最优性。下一章保留 Newton 思想，同时要求步向量不破坏等式约束。

## 原书定位与覆盖范围

| 节号与原文标题 | 印刷页 / PDF物理页 |
|---|---|
| 9.1 Unconstrained minimization problems | 457 / 471 |
| 9.2 Descent methods | 463 / 477 |
| 9.3 Gradient descent method | 466 / 480 |
| 9.4 Steepest descent method | 475 / 489 |
| 9.5 Newton’s method | 484 / 498 |
| 9.6 Self-concordance | 496 / 510 |
| 9.7 Implementation | 508 / 522 |

本页讲述七节核心算法、假设和推理，未复制完整复杂度证明、数值图例及所有自协调函数例子。特别核对了9.1的次水平集假设、9.4的范数定义和9.6.3印刷502页 / PDF516页的 Newton 减量误差界。
