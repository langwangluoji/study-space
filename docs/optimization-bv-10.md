---
pageClass: optimization-lecture
title: BV 第10章 Equality constrained minimization
description: 等式约束的KKT系统、消元、可行与不可行起点牛顿法，以及块线性代数的条件。
---

# 第10章 Equality constrained minimization · 等式约束最小化

[← 第9章 Unconstrained minimization](./optimization-bv-09) · [双书目录](./optimization-sources) · [第11章 Interior-point methods →](./optimization-bv-11)

无约束 Newton 可以沿所有方向移动，等式约束则要求某些关系始终成立。资源总量、轨迹连接和线性系统动力学，都会让变量只能沿一个仿射子空间变化。本章没有另起一套思想，而是把第9章的局部二次模型限制在这个空间内；由此出现的 KKT 块矩阵，也将成为下一章内点法的主要计算对象。

## 10.1 Equality constrained minimization problems · 等式与最优性

考虑 $\min f(x)$、$Ax=b$，其中 $f$ 凸且二阶连续可微，$A\in\mathbb R^{p\times n}$ 满行秩、$p<n$，并假设最优解存在。满行秩表示等式之间没有冗余；若实际模型存在重复等式，应先分析一致性并提取独立行，而不是期待一个普通求解器替你忽略秩问题。

最优性条件为

$$
Ax^*=b,\qquad \nabla f(x^*)+A^T\nu^*=0.
$$

第一项是 primal feasibility，第二项是 stationarity，也被原书称为 dual feasibility equation。等式乘子 $\nu$ 没有非负限制，因为它可以表达两个方向的边际作用。梯度不必为零；它只需落在 $A$ 的行空间，使所有可行方向的方向导数为零。凸性使这组条件成为充分条件；由于定义域开且约束仿射，可行最优点处也具备必要性所需的结构。

### 10.1.1 二次目标与 KKT matrix

设 $f(x)=x^TPx/2+q^Tx+r$，$P\succeq0$。KKT 条件合成

$$
\begin{bmatrix}P&A^T\\A&0\end{bmatrix}
\begin{bmatrix}x^*\\\nu^*\end{bmatrix}
=\begin{bmatrix}-q\\b\end{bmatrix}.
$$

该矩阵非奇异时有唯一原始–对偶解。对满行秩 $A$、半正定 $P$，非奇异的准确条件是 $v^TPv>0$ 对所有非零 $v\in\operatorname{null}(A)$ 成立，即 $P$ 只需要在可行方向上正定；等价于 $\operatorname{null}(P)\cap\operatorname{null}(A)=\{0\}$。整个 $P$ 正定是更强的充分条件，不能当成必要条件。

例如 $\min(x_1^2/2)$、$x_2=1$ 的 Hessian 是 $\operatorname{diag}(1,0)$，虽不可逆，但可行方向只能改变 $x_1$，其曲率正，因此唯一最优点是 $(0,1)$，KKT 系统仍可解。这个例子说明“Newton 系统可解”与“完整 Hessian 可逆”在约束问题中不同。

若 KKT 矩阵奇异，但线性系统有解，每个解仍给出最优对；若系统无解，则在这一凸二次结构中要检查原问题不可行或下无界。奇异矩阵不自动等于模型不可行，也可能只是平坦方向或冗余条件造成的多解。

### 10.1.2 Eliminating equality constraints · 消元

取一个特解 $\hat x$ 满足 $A\hat x=b$，再取满列秩矩阵 $F$，其列空间恰为 $\operatorname{null}(A)$。全部可行点可以写成 $x=\hat x+Fz$，于是得到无约束问题

$$
\min_z\widetilde f(z)=f(\hat x+Fz),\quad
\nabla\widetilde f=F^T\nabla f,\quad
\nabla^2\widetilde f=F^T\nabla^2fF.
$$

这个 reduced Hessian 只度量可行方向。消元能减少变量，但零空间基可能变成稠密矩阵，破坏原模型的局部连接结构。比如多时刻控制变量和状态通过稀疏动力学等式相连，消去状态后，各时刻输入可能产生更密集的耦合。减少维数与降低实际计算量是两件事，要结合结构判断。

### 10.1.3 通过对偶求解

拉格朗日对偶函数可以写成 $g(\nu)=-b^T\nu-f^*(-A^T\nu)$。它始终凹，但即使 $f$ 二阶可微，$g$ 也未必二阶可微。若确实可用无约束方法最大化 $g$，求得乘子后还要恢复满足等式的原始点；最小化 $L(x,\nu^*)$ 不一定给出唯一点，也不能仅有乘子就省去原始可行检查。原书以等式约束解析中心展示易恢复的特例，接着转向直接处理 KKT 方程的 Newton 方法。

## 10.2 Newton’s method with equality constraints · 可行起点

从 $x\in\operatorname{dom}f$、$Ax=b$ 出发，将局部二次模型限制在可行方向 $A\Delta x=0$ 内。记 $H=\nabla^2f(x)$、$g=\nabla f(x)$，求解

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}\Delta x\\w\end{bmatrix}
=-\begin{bmatrix}g\\0\end{bmatrix}.
$$

第二行保证方向不破坏等式，所以任意步长都有 $A(x+t\Delta x)=b$。第一行是受约束二次模型的驻点条件。$w$ 是这个步模型的乘子；它不是在没有解释时就能与其他算法中的乘子增量互换。

在可行方向上 Hessian 正定、系统非奇异的情形下，有

$$
g^T\Delta x=-\Delta x^TH\Delta x=-\lambda(x)^2,
\qquad\lambda(x)=(\Delta x^TH\Delta x)^{1/2}.
$$

因此非零 Newton 步既可行又下降，$\lambda^2/2$ 是可行二次模型预测的改善。回溯时只需同时检查定义域和足够下降；等式可行性由方向保持。一般理论中 $\lambda^2/2$ 是模型估计，不自动等于真实误差。

与消元后的 Newton 比较，可以得到相同的原始步 $F\Delta z$。这说明直接解 KKT 和先进入零空间是同一局部二次问题的两种计算方式。原书据此将第9章的强凸与 self-concordance 分析迁移到约束空间：实际需要控制的是约化目标的曲率，或相应 KKT 逆矩阵，而不是强求整个空间每个方向都有曲率。全步和局部二次收敛仍需要对应条件，不能只由等式线性就保证。

## 10.3 Infeasible start Newton method · 从不满足等式的点出发

找到定义域内的点有时容易，找到同时满足 $Ax=b$ 的点却不容易。这一节允许 $Ax\ne b$，但仍要求 $x\in\operatorname{dom}f$。例如对数目标下仍要保证正变量；“infeasible start”只表示等式可能不满足，绝不是允许算法随意在目标定义域外运行。

把 $x$ 和 $\nu$ 都看作待更新变量，定义 residual：

$$
r_{\rm dual}=\nabla f(x)+A^T\nu,\qquad
r_{\rm pri}=Ax-b.
$$

对整组 KKT 方程做 Newton 线性化，得到

$$
\begin{bmatrix}H&A^T\\A&0\end{bmatrix}
\begin{bmatrix}\Delta x\\\Delta\nu\end{bmatrix}
=-\begin{bmatrix}r_{\rm dual}\\r_{\rm pri}\end{bmatrix}.
$$

相比可行起点，第二行多了纠正等式残差的项。若原书写右侧第一项为 $-g$、未知乘子为 $w$，对应的是 $w=\nu+\Delta\nu$，不是把现有乘子丢掉。明确增量与新乘子的关系，可以避免实现中的重复加法。

由第二行立即得到 $r_{\rm pri}^+=(1-t)r_{\rm pri}$：当接受全步 $t=1$ 时，新点满足等式；一旦可行，后续方向保持可行。步长小于1时，等式误差逐步缩小。这个结论是因为约束仿射；非线性等式只做一阶线性化时，全步不能一般地精确消除原始约束。

在不可行点，减小目标值并不代表朝约束最优点前进，甚至可能远离可行集。原书因此用整组 residual 的范数做线搜索，要求 $\|r(x+t\Delta x,\nu+t\Delta\nu)\|_2\le(1-\alpha t)\|r(x,\nu)\|_2$，并保持定义域。目标值可以暂时上升，因为算法在同时纠正可行性与驻点方程。停止时必须分别检查原始与对偶残差，而不是只看某一个。

<OptimizationReading terms="feasible direction · primal residual · dual residual" english="An infeasible-start Newton step corrects feasibility and stationarity together, so a decrease in the objective alone is not the right measure of progress." chinese="不可行起点牛顿步同时纠正可行性与驻点条件，所以只看目标值下降并不能正确衡量其进展。" task="对照10.2与10.3，识别KKT系统第二行右侧由0变成Ax−b之后，步向量承担了什么新任务。" />

原书对收敛分析仍有系统非奇异、残差水平集与导数控制等条件。若原模型根本不可行，残差当然无法趋于零；步长过小或残差停滞并不构成正式的不可行证书。需要第11章的 Phase I 或其他有证书的方法加以判断。

10.3.4将残差 Newton 的思想扩展到 convex-concave games：对 $u$ 凸、对 $v$ 凹的光滑收益函数，鞍点满足关于两组变量的梯度方程。线性化会同时包含各自的曲率与交叉导数；算法仍以残差进展为依据。这一扩展不意味着把原收益当作对所有变量一起最小化的凸目标。原书的10.3.5用解析中心与博弈数值例说明进展，详细曲线与参数仍需回到原页核对。

## 10.4 Implementation · KKT块系统怎样求解

KKT 矩阵通常是对称不定矩阵，其零的右下块不是计算错误。不能像正定 Hessian 一样直接对整个系统用普通 Cholesky；通用对称不定分解如带适当主元选择的 $LDL^T$ 是一种做法。若选择零空间消元，则应稳定构造特解与基，例如利用 QR，而不是凭重复代入任意放大尺度差异。

当 $H\succ0$ 时，可通过 block elimination 构造 Schur complement。对系统 $Hv+A^Tw=-g$、$Av=-h$，先求解与 $H$ 相关的线性系统，再解

$$
(AH^{-1}A^T)w=h-AH^{-1}g,\qquad
v=-H^{-1}(g+A^Tw).
$$

$A$ 满行秩使 $AH^{-1}A^T\succ0$，因此可以用 Cholesky 求这个较小系统。公式里仍不要求显式形成 $H^{-1}$；通过多右端线性求解计算即可。若 $H$ 对角、带状或有可重复利用的分解，而等式数相对少，该方法尤其有利。

若 $H$ 奇异但 KKT 非奇异，上述消元不能直接做。对半正定 $H$ 与满行秩 $A$，可以利用 $H+A^TQA\succ0$ 的结构（适当 $Q\succ0$），同时将第一行右侧改成 $-(g+A^TQh)$，得到等价系统。只加矩阵却不修正右端，会在 $h\ne0$ 时改变所求方程。另一条路径是在零空间里处理正定的 reduced Hessian。

原书的实现例子包括可分目标、曲线连接等稀疏结构。控制的时间链、导航中的连续状态连接，也常给稀疏块矩阵；保留这种结构可以比先把所有变量消成一个稠密问题更有效。最终仍需检查解线性系统的残差、尺度和秩，而不是仅信任“矩阵求解成功”的返回值。

本章完成了从优化目标到 KKT 方程、再到可行/不可行起点 Newton 的过渡。下一章把不等式约束转成严格内部的障碍项，或直接修正原始–对偶 KKT 方程，因此仍会反复求解这里的块系统。

## 原书定位与覆盖范围

| 节号与原文标题 | 印刷页 / PDF物理页 |
|---|---|
| 10.1 Equality constrained minimization problems | 521 / 535 |
| 10.2 Newton’s method with equality constraints | 525 / 539 |
| 10.3 Infeasible start Newton method | 531 / 545 |
| 10.4 Implementation | 542 / 556 |

本页覆盖四节，并展开10.1的二次问题/消元/对偶与10.4的线性代数条件；未重现全部复杂度证明和长数值例。重点核对了印刷522页 / PDF536页的KKT条件、532页 / PDF546页的残差定义，以及547页 / PDF561页的奇异Hessian消元修正。
