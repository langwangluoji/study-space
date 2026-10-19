---
pageClass: optimization-lecture
title: NW 第3章 Line Search Methods
---

# 第3章 Line Search Methods：把方向变成可靠的进展

[上一章](./optimization-nw-02) · [教材目录](./course-optimization) · [下一章](./optimization-nw-04)

第二章已经解释下降方向为什么有用，但局部下降不等于任意距离都下降。本章按原书 3.1-3.5 的顺序，从接受步长的条件走到收敛与具体实现。它的对象是固定的光滑无约束目标；每次更换 mini-batch 的随机目标不能直接继承这些经典保证。

原书范围是印刷 30-65 / PDF 52-87。记 $f_k=f(x_k)$、$g_k=\nabla f(x_k)$，迭代 $x_{k+1}=x_k+\alpha_kp_k$。以下默认 $g_k^Tp_k<0$，并沿方向定义一维函数 $\phi(\alpha)=f(x_k+\alpha p_k)$。

## 3.1 Step length：不要求一维最优，但要求合理

<!-- continuous-optimization-v1 -->
### 先把一次试步做完，再读收敛定理 {#positioning-linesearch}

沿上一章的自由目标，从 $z_0=(0,0)$、$g_0=(-2,-4)$ 出发，固定方向 $p_0=(2,4)$。只改变步长 $\alpha$：

$$
\phi(\alpha)=q(z_0+\alpha p_0)=4-20\alpha+34\alpha^2,\quad \phi'(\alpha)=-20+68\alpha.
$$

完整步 $\alpha=1$ 给代价18，不能接受。若Armijo常数 $c_1=.1$，充分下降要求

$$
4-20\alpha+34\alpha^2\le4-2\alpha\iff0<\alpha\le9/17.
$$

从1开始回溯减半：1失败，.5通过，新代价2.5。它不是沿线的最优点；精确线搜索令 $\phi'=0$，得到 $\alpha=5/17\approx.29412$。算法没必要每次都精确求这个一维最小值，但必须让被接受的一步有可解释的进展。

再加 $c_2=.9$：弱Wolfe曲率要求 $-20+68\alpha\ge-18$，即 $\alpha\ge1/34$。它排除太短的步，却允许正斜率；strong Wolfe的 $|\phi'|\le18$ 进一步给 $\alpha\le19/34$。真正接受区间必须再与Armijo区间相交，不能只看曲率一条。

<AnatomyFigure src="/anatomy/optimization/positioning.html?mode=line" title="同一方向上的试探、拒绝与回溯" />

现在再把这次计算抽象成下面的一般Wolfe规则。3.2解释为什么长期进展还需要方向与负梯度之间的角度条件；3.3谈局部速度；3.4–3.5处理方向修正与具体搜索实现。一个算例通过接受规则，不是对所有目标收敛的证明。


**Exact line search 精确线搜索**寻找射线上的最优步长。它可能需要很多次函数求值；一维求得极精确，也不意味着整体迭代最有效。**Inexact line search 非精确线搜索**只要求步长满足能支撑进展和理论的条件。这种“不必过度精确”的原则会在第7章再次出现。

### The Wolfe conditions：下降够多，也别停太早

Armijo 或 **sufficient decrease 充分下降**条件为

$$
f(x_k+\alpha p_k)\le f_k+c_1\alpha g_k^Tp_k,\qquad0<c_1<1.
$$

右侧是一条具有负斜率的直线。对于连续可微目标，真实函数在零附近的斜率是 $g_k^Tp_k$，比直线更负，因此足够小的正步长会满足不等式。条件将下降幅度与步长及初始坡度联系起来，比仅要求 $f_{k+1}<f_k$ 强。

但很短的步也容易满足它。Wolfe 增加 **curvature condition 曲率条件**：

$$
\nabla f(x_k+\alpha p_k)^Tp_k\ge c_2g_k^Tp_k,
\qquad0<c_1<c_2<1.
$$

初始坡度为负，弱 Wolfe 要求新坡度不再像起点那样负，从而排除过短的步。但它只给新坡度一个下界：新坡度也可以是很大的正数，不能据此断言其绝对值更接近零。**Strong Wolfe**将第二条写为

$$
|\nabla f(x_k+\alpha p_k)^Tp_k|\le c_2|g_k^Tp_k|.
$$

它还限制走过一维谷底后过大的正斜率。对连续可微函数、下降方向、沿射线有下界的目标，原书 Lemma 3.1 证明存在满足 Wolfe 和 strong Wolfe 的步长区间。若方向不下降或目标沿射线无下界，不能不检查就援引该结论。

### The Goldstein conditions：上下两条下降界

Goldstein 用函数值而不是新导数约束过短步长：

$$
f_k+(1-c)\alpha g_k^Tp_k\le f(x_k+\alpha p_k)
\le f_k+c\alpha g_k^Tp_k,\qquad0<c<\tfrac12.
$$

上界保证充分下降；下界避免停得过早。注意 $g_k^Tp_k<0$，所以两条直线的相对位置由负号决定。原书也指出下界可能排除一维最小点附近的某些理想步长，因此不同接受规则不是可任意互换的装饰。

### Sufficient decrease and backtracking：从长步逐步缩短

回溯先尝试 $\bar\alpha>0$，不满足 Armijo 就乘 $\beta\in(0,1)$，直到接受。它不依赖 Wolfe 曲率条件，却通过“上一候选太长、当前候选刚好接受”避免任意选择极小步。若缩减因子变化，应让它保持在严格位于 (0,1) 内的固定区间，而不是一次缩到几乎零。

一个简短例子是 $f(x)=x^2/2$，$x=2,p=-2,c_1=0.1$。Armijo 允许 $0<\alpha\le1.8$；从2开始、每次乘0.5，2失败，1成功。若 $c_2=0.9$，Wolfe 曲率另要求 $\alpha\ge0.1$。这说明“足够下降”和“不要过早停”分别在限制什么，无需把它们记成互不相关的公式。

## 3.2 Convergence：方向与步长必须共同负责

如果方向几乎垂直于负梯度，即使步长满足接受条件，也可能几乎不改善目标。定义夹角

$$
\cos\theta_k=\frac{-g_k^Tp_k}{\|g_k\|\,\|p_k\|}.
$$

原书 Zoutendijk 结果在目标于初始 level set 下有下界、相关邻域内连续可微且梯度 Lipschitz、方向下降、步长满足 Wolfe 等条件下给出

$$
\sum_{k=0}^{\infty}\cos^2\theta_k\,\|g_k\|^2<\infty.
$$

因此加权的梯度平方趋零。若再有一致角度界 $\cos\theta_k\ge\delta>0$，才能进一步得到 $\|g_k\|\to0$。最速下降的夹角是零，余弦为1，直接符合这个方向要求。一般牛顿或拟牛顿方向则需要矩阵性质控制角度；仅知道每次下降还不够。

这里的 **global convergence**主要表示不只限于解附近初点的驻点收敛分析。非凸情形梯度趋零不等于找到全局最优；甚至驻点也可能是鞍点。解释训练或导航估计的停止结果时，应保留这一区别。

<OptimizationReading english="Well-chosen step lengths cannot compensate for search directions that become nearly orthogonal to the negative gradient." chinese="即使步长选择得好，也不能补偿逐渐接近与负梯度正交的搜索方向。" task="结合 Zoutendijk 式，解释 cos²θ 为什么出现在梯度平方前面。此句为本站原创。" />

## 3.3 Rate of convergence：到解附近后为什么快慢不同

最速下降即使使用精确线搜索，在 SPD 二次型上也可能很慢。Hessian 特征值相差越大，等高线越狭长；条件数 $\kappa=\lambda_{\max}/\lambda_{\min}$ 出现在典型的目标误差收缩界中：

$$
f_{k+1}-f^*\le
\left(\frac{\kappa-1}{\kappa+1}\right)^2(f_k-f^*).
$$

这是该二次型、精确线搜索条件下的界，不是所有梯度训练的通用性能预测。当条件数大，界中的因子接近1；多次迭代也可能进展有限。变量尺度会影响这个困难，因此不能只靠调一个步长解决所有病态问题。

牛顿方向解 $\nabla^2f(x_k)p_k=-g_k$。若解处梯度零、Hessian 正定，Hessian 在邻域 Lipschitz，初点足够近，且使用单位步，则牛顿法局部二次收敛。线搜索如果先试单位步，并在靠近解时接受它，就能兼顾远处的谨慎与近处的速度。

拟牛顿用 $B_k$ 代替真实 Hessian。想获得超线性收敛，不一定要求所有矩阵元素都收敛到真实 Hessian；关键是沿实际步的近似误差足够小。原书把这一思想写成 Dennis-Moré 类型条件：

$$
\frac{\|(B_k-\nabla^2f(x^*))p_k\|}{\|p_k\|}\longrightarrow0.
$$

它是在已收敛到适当非退化极小点、满足相应光滑与线搜索条件的背景下使用的判据。沿有用方向学准曲率，往往比在整个空间精确恢复 Hessian 更经济。

## 3.4 Newton with Hessian modification：可逆还不够

远离极小点时，Hessian 可以不定，牛顿方向不一定下降。原书介绍四类修正思路：改变特征值、加单位矩阵倍数、modified Cholesky、modified symmetric indefinite factorization。它们的共同目标是生成适合线搜索的正定模型，同时尽量保留真实曲率。

直接特征值分解可以将负或过小特征值抬到正阈值，但代价较高。$B_k=\nabla^2f(x_k)+\tau_kI$ 更简单，$\tau_k$ 要足够使矩阵正定，又不能随意过大，否则方向会接近经过缩放的负梯度，曲率优势减弱。

Modified Cholesky 在分解过程中加入修正；对称不定分解则利用带1×1或2×2块的分解结构调整曲率。这里的正定化不仅为使方程可解，还要控制数值条件和下降方向。临近真实正定解时，理想修正会消失，避免破坏牛顿局部速度。

## 3.5 Step-length selection algorithms：真正的线搜索要有保护

原书最后从条件走向实现。**Interpolation 插值**利用已计算的函数值、导数拟合低次多项式，推测下一候选步；但拟合可能给出负步长、过大步长或接近区间端点的危险候选，所以要采用 safeguarding，把候选限制在合理子区间。

初始步长也依算法而变。牛顿和拟牛顿常先试1，保持接近解时的单位步优势；梯度与非线性 CG 可能根据前次下降及方向尺度推测起点。没有一个固定初始步长能在所有单位和问题上都理想。

满足 Wolfe 的完整算法通常先寻找夹住可接受步的区间，然后使用 **zoom** 在区间里缩小搜索。这比单纯不停缩短更适合同时满足下降与曲率条件，因为过短步可能通过 Armijo，却违反 Wolfe。实现时需要限制求值次数、处理非有限函数值，并保留未找到合格步的停止原因。

<OptimizationLab kind="gradient" />

观察实验时，可将学习率理解为步长的候选选择。它展示方向、曲率与步长的关系，不替代原书完整 Wolfe/zoom 实现；第4章将从另一种顺序组织局部模型与步长。

**来源定位：** 3.1 印刷 31-37 / PDF 53-59；3.2 印刷 37-40 / PDF 59-62；3.3 印刷 41-47 / PDF 63-69；3.4 印刷 48-55 / PDF 70-77；3.5 印刷 56-61 / PDF 78-83；参考与练习印刷 62-65 / PDF 84-87。本页解释核心定理条件和算法构造，未逐行复写分解算法证明。

[继续第4章](./optimization-nw-04)
