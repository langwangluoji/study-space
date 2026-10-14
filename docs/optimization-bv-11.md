---
pageClass: optimization-lecture
title: BV 第11章 Interior-point methods
description: 从对数障碍与中心路径到Phase I、自协调复杂度、锥约束和原始对偶内点法。
---

# 第11章 Interior-point methods · 内点法

[← 第10章 Equality constrained minimization](./optimization-bv-10) · [双书目录](./optimization-sources) · [返回最优化阅读入口](./optimization-reading)

第9章用局部二次模型求解无约束问题，第10章把同一模型限制在仿射可行方向中。本章再加入不等式：一种做法用障碍函数把边界变成定义域屏障，另一种直接对修改后的 KKT 方程应用 Newton。两条路径都依赖前章的块线性系统，但得到步向量与判断误差的方式不同。

## 11.1 Inequality constrained minimization problems · 起点与条件

考虑

$$
\min_x f_0(x),\qquad f_i(x)\le0\ (i=1,\ldots,m),\qquad Ax=b.
$$

本章的基本分析假定目标和各不等式函数凸、二阶连续可微，$A$ 满行秩，最优解存在，且有满足等式的严格可行点：$f_i(x)<0$。严格可行性给出 Slater 条件，使 KKT 成为最优的必要充分条件。对数障碍还需要定义域内的初始点；可行集合可能非空却没有严格内部，此时不能直接套用基本障碍法。

KKT 包括原始可行性、非负乘子 $\lambda_i\ge0$、驻点 $\nabla f_0+\sum_i\lambda_i\nabla f_i+A^T\nu=0$，以及互补 $\lambda_if_i=0$。最优点可能在边界。内点方法的目的不是让迭代永远远离边界，而是在有限步保持内部，并用一系列内部问题逼近最优性。

某些非光滑凸目标可以通过 epigraph 改写成光滑约束模型，如 $\max_i(a_i^Tx+b_i)$ 改为辅助变量的线性目标。但不是任何非光滑函数都可以不加说明地放进本章公式；SOCP/SDP 更适合后面的锥障碍扩展。

## 11.2 Logarithmic barrier function and central path · 对数障碍

定义 slack $s_i(x)=-f_i(x)>0$，障碍为

$$
\phi(x)=-\sum_{i=1}^m\log s_i(x).
$$

任何 $s_i$ 趋于零时，障碍趋于正无穷，因此它把不等式边界变成不可跨越的定义域屏障。对子问题 $\min_{Ax=b}\{f_0(x)+\phi(x)/t\}$，$t>0$ 越大，障碍权重越小。等价地最小化 $tf_0+\phi$，这个缩放方便原书的后续分析。

因为 $f_i$ 凸、$-\log$ 在正数上凸且递减，复合后障碍仍凸。其导数可以写成

$$
\nabla\phi=\sum_i\frac{\nabla f_i}{-f_i},\qquad
\nabla^2\phi=\sum_i\frac{\nabla f_i\nabla f_i^T}{f_i^2}
+\sum_i\frac{\nabla^2f_i}{-f_i}.
$$

靠近边界时，分母变小，曲率很大。这解释了为什么不能一开始就取极大的 $t$，期待普通 Newton 很轻松地求出原始最优点。模型中的不等式表示、缩放和数值范围也会影响计算。

若每个子问题都存在唯一解，记为 $x^*(t)$，它们形成 central path。此存在唯一性是额外需要检查的条件，不能只从“目标凸”推出。中心点满足 $Ax^*(t)=b$、$f_i(x^*(t))<0$，以及 $t\nabla f_0+\nabla\phi+A^T\hat\nu=0$。令

$$
\lambda_i^*(t)=\frac{1}{t[-f_i(x^*(t))]},\qquad
\nu^*(t)=\hat\nu/t,
$$

就得到原始问题的驻点方程与非负乘子，同时将精确互补改成 $\lambda_i^*s_i=1/t$。它们是 modified KKT conditions：还没有精确满足原问题的互补条件，但每项偏差受同一参数控制。

中心点与这些乘子组成可行原始–对偶对，因而

$$
f_0(x^*(t))-g(\lambda^*(t),\nu^*(t))=\frac mt,
\qquad0\le f_0(x^*(t))-p^*\le\frac mt.
$$

这是中心路径近似质量的证书。$m/t$ 是对偶间隙，不必等于真实的原始目标误差。并且证明使用精确中心点：任意一个内部点配上 $1/(ts_i)$，若驻点残差未消除，就不能直接宣称它拥有同样严格的误差界。

<OptimizationLab kind="barrier" />

实验中用 $\mu=1/t$ 表示障碍权重，所以减小 $\mu$ 等价于增大教材的 $t$。只有一个不等式，修改后的互补量为 $\lambda(c-x)=\mu$。它用解析公式求障碍子问题的精确解，不演示一般求解器的中心化 Newton 迭代。内点趋近边界时仍严格可行，边界上的原始最优点与内部子问题解不能混为一谈。

## 11.3 The barrier method · 中心化与路径跟随

Barrier method 用两个层次的迭代。固定 $t$ 后，用等式约束 Newton 近似求解 $tf_0+\phi$，这叫 centering；然后增大 $t$，以上一次的中心点作为新的 warm start。原书用 $\mu>1$ 表示 $t$ 的乘法更新因子，它与实验中 $\mu=1/t$ 的符号约定不同。本页把乘法因子记为 $\eta>1$，即 $t\leftarrow\eta t$。

温启动使算法逐渐跟随中心路径，而不是每次从远处重新优化。$\eta$ 接近1，中心变化小、内层步数可能少，但外层次数多；$\eta$ 大则反过来。算法性能取决于总 Newton 步数和每步成本，不能只比较外层次数。

精确中心化时，终止条件可以用 $m/t\le\varepsilon$。实际实现中只近似中心化，原书明确指出由中心公式构造的乘子可能还不精确对偶可行；需要检查残差或做相应修正，再谈误差证书。避免把某次内层停止的 $\lambda_{\rm nt}^2/2$、外层的 $m/t$ 与真实原始误差混成一个指标。

中心化每一步仍求第10章形式的 KKT 系统，Hessian 为 $t\nabla^2f_0+\nabla^2\phi$。回溯必须保持全部 $f_i(x)<0$ 和目标定义域，并满足适当下降。对于线性不等式，可用 slack 给试探步长的安全上界；对非线性不等式还要实际检验新的点。

## 11.4 Feasibility and phase I methods · 先找到内部

如果严格可行起点未知，可先求一个辅助 Phase I 问题。原书的基本形式是

$$
\min_{x,s}s,\qquad f_i(x)\le s,\qquad Ax=b.
$$

假定已有目标共同定义域内且满足等式的 $x^{(0)}$，取足够大的 $s$ 就能让辅助不等式严格成立。Phase I 将“满足原约束”变成最小化最大违反量，找到任意可行的 $s<0$ 就给出原系统的严格可行点，无需把辅助问题求得很精确。

若可证明 Phase I 最优值大于零，则原约束不可行；正式判断通常使用正的对偶下界，而非某一次迭代尚未达到零。如果最优值为零且达到，原系统可行但没有严格可行点。若下确界为零却未达到，则仅凭这个数还不能推断可行；原书的零值讨论带有达到的条件。有限精度下更应报告容差范围和是否有证书，而不是把近零残差直接称为“严格可行”。

原书还讨论最小化违反量之和 $\sum_is_i$、$f_i(x)\le s_i$、$s_i\ge0$ 的变体。这有时能识别哪些约束冲突，但零目标不要求严格负余量，不能作为障碍法起点的完整充分条件。不可行起点 Newton 可以在某些模型中帮助找可行点，然而失败或停滞通常不提供不可行证书；当问题接近可行与不可行边界时，Phase I 更便于可靠判断。

## 11.5 Complexity analysis via self-concordance · 复杂度的实际条件

原书在这里假设 $tf_0+\phi$ 对所需 $t$ 是闭的 self-concordant 函数，同时原始问题次水平集有界，并采用前面指定的中心化与线搜索条件。这些假设保证子问题具有相应可解性及 Newton 分析。一般凸二阶可微目标不自动满足自协调；方法在实践中有效与这组最坏情况界已被证明，是不同层次的结论。

LP、凸二次问题及相应二次约束有标准的自协调障碍结构；某些其他问题需等价改写才能进入该分析。原书举例说明，单独的熵项未必满足同样条件，加入合适的非负变量障碍可以得到可分析的形式。重写模型有时帮助建立证明，却也增加变量和约束，不能只从证明漂亮就断言实际更快。

理论关键是：从 $x^*(t)$ 温启动求 $x^*(\eta t)$ 时，目标初始差距可由 $m(\eta-1-\log\eta)$ 上界控制，它不随 $t$ 增大而失控。因此在特定假设下，每次中心化的 Newton 步数可以统一控制。选择理论更新因子 $\eta=1+1/\sqrt m$ 可得到量级为

$$
O\!\left(\sqrt m\log\frac{m}{t_0\varepsilon}\right)
$$

的路径跟随 Newton 步数界（另计初始化/首次中心化及固定的内层精度相关成本）。这里计的是 Newton 步数，不是每步浮点操作数；稠密与稀疏线性系统的成本可能相差很大。这个保守理论因子也不是原书推荐在所有工程实现中照搬的参数。

11.5.4–11.5.6还把复杂度扩展到可行性与完整 Phase I/II。可行性分析需给出可行集合的范围等额外数据，并考虑问题距离可行/不可行边界多近；近边界的容差判断不能按普通目标误差解释。上面的路径跟随量级主要描述已具备合适起点后的 Phase II，不能把初始化和可行性判定所花的成本一并省略。

## 11.6 Problems with generalized inequalities · 锥障碍

对一般 proper cone $K$，标量 slack 被锥内部的向量或矩阵余量代替，负对数被 generalized logarithm 对应的障碍代替。正正交锥用 $-\sum_i\log x_i$；二阶锥内部 $u>\|v\|_2$ 可用 $-\log(u^2-\|v\|_2^2)$；半正定锥内部 $X\succ0$ 用 $-\log\det X$。

矩阵障碍在某个特征值趋于零时发散，因此保持的是正定性，不是所有元素逐项为正。对偶乘子属于对偶锥 $K^*$，互补则用适当内积表达；例如矩阵内积是 $\operatorname{tr}(XY)$。这些都是第2章广义不等式的算法版本。

广义障碍具有 degree / barrier parameter；原来 $m/t$ 的间隙形式被总障碍次数除以 $t$ 取代。一个 $p\times p$ PSD 块的 $-\log\det$ 参数为 $p$，标准二阶锥障碍参数为2，不能把矩阵元素数直接当成标量不等式数量。原书在相应假设下扩展中心路径、障碍法与复杂度，具体锥表示仍需明确。

## 11.7 Primal-dual interior-point methods · 同时更新变量与乘子

原始–对偶方法不将全部乘子先消去，而直接对修改后的 KKT 方程应用 Newton。定义 $F(x)=(f_1(x),\ldots,f_m(x))$，其 Jacobian 的第 $i$ 行是 $\nabla f_i^T$。对固定 $t$，残差为

$$
r_t=\begin{bmatrix}
\nabla f_0+DF^T\lambda+A^T\nu\\
-\operatorname{diag}(\lambda)F-\mathbf1/t\\
Ax-b
\end{bmatrix}
=\begin{bmatrix}r_{\rm dual}\\r_{\rm cent}\\r_{\rm pri}\end{bmatrix}.
$$

中间一块是中心性残差，控制各乘子与 slack 的乘积。Newton 方程同时给出 $\Delta x,\Delta\lambda,\Delta\nu$；其第一行曲率使用拉格朗日 Hessian $\nabla^2f_0+\sum_i\lambda_i\nabla^2f_i$，第二行将原始方向与乘子方向耦合。消去乘子增量后，仍可得到第10章结构的较小 KKT 系统。

算法有限次迭代中可能不满足等式或驻点条件，但基本版本仍保持 $F(x)<0$、$\lambda>0$，并用 residual 范数回溯。这就是为什么“primal-dual infeasible iterates”不表示任意跨出不等式定义域。不同于障碍法分内外两层，它在一个循环中更新变量、乘子和中心化目标。

原书定义 surrogate duality gap $\hat\eta=-F(x)^T\lambda>0$。当原始可行性和对偶驻点同时满足时，它才成为真实对偶间隙；在残差尚大时，它只是替代量。停止须同时检查 $\|r_{\rm pri}\|$、$\|r_{\rm dual}\|$ 与 $\hat\eta$，不能因为互补乘积小就宣布最优。原书在这一节介绍基本算法，但没有给它完整收敛分析，所以本页也不把上一节障碍法复杂度直接归到所有原始–对偶算法上。

<OptimizationReading terms="central path · complementarity · surrogate duality gap" english="A small surrogate gap is meaningful together with small feasibility and stationarity residuals; by itself, it is not a certificate of optimality." chinese="替代间隙必须与小的可行性、驻点残差一起判断；单独很小并不是最优性的证书。" task="对照11.2.2的精确中心点与11.7.2的一般迭代点，说明两者为什么使用不同的间隙名称。" />

## 11.8 Implementation · 每一步的计算核心

障碍与原始–对偶系统都需要求解结构化线性方程。原书分别讨论标准 LP、带线性不等式的问题等实现。标准形式 LP 的障碍 Hessian 为 $\operatorname{diag}(x_i^{-2})$，对角结构使块消元便宜；当变量逼近零，尺度差异仍可能很大，需要稳定的分解与精度检查。

可分目标加少数约束常产生对角加低秩结构；局部变量相关的约束产生稀疏 Hessian；控制与状态估计的时序连接也可能提供块带结构。利用结构既包括保存稀疏矩阵，也包括合适的消元顺序，避免过多填充。计时、线性系统残差、可行性与最终证书，比分别数外层迭代或 Newton 步更能评价一次实际求解。

11.8.2的 $\ell_1$ 近似把绝对值写成线性上界，约束间的重复矩阵结构可用于消元；11.8.3的 SDP 则要利用矩阵 slack 的正定分解来计算 $\log\det$ 的导数，而不逐元素取对数。SDP的输入矩阵稀疏并不保证最终Hessian稀疏，矩阵逆与内积可能产生稠密耦合；共同块对角结构则可按块处理。11.8.4的网络速率模型具有固定路径和链路形成的稀疏关联。这些例子说明同一 KKT 框架可对应不同的算术瓶颈。本页只解释结构来源，未给完整求解器实现。

第11章把理论、建模和线性代数连接成完整算法：凸模型让 KKT 给出全局证书，障碍与中心化提供可求解的中间问题，数值分解决定能否高效可靠地实现。到这里可以再读 NW 的约束算法，比较一般非凸问题中哪些结论仍成立、哪些只给局部最优性。

## 原书定位与覆盖范围

| 节号与原文标题 | 印刷页 / PDF物理页 |
|---|---|
| 11.1 Inequality constrained minimization problems | 561 / 575 |
| 11.2 Logarithmic barrier function and central path | 562 / 576 |
| 11.3 The barrier method | 568 / 582 |
| 11.4 Feasibility and phase I methods | 579 / 593 |
| 11.5 Complexity analysis via self-concordance | 585 / 599 |
| 11.6 Problems with generalized inequalities | 596 / 610 |
| 11.7 Primal-dual interior-point methods | 609 / 623 |
| 11.8 Implementation | 615 / 629 |

本页覆盖八节主线，未完整复现复杂度证明、所有广义障碍构造、原始–对偶线性化块矩阵及实现长例。重要边界已按原书核对：精确中心化的 $m/t$、Phase I 零下确界的达到条件、自协调复杂度假设，以及11.7只介绍算法、不提供完整分析的范围。
