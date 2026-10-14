---
pageClass: optimization-lecture
title: BV 第7章 Statistical estimation
description: 按原书顺序讲述参数估计、MAP、非参数分布、检测器、概率界和实验设计。
---

# 第7章 Statistical estimation · 统计估计

[← 第6章 Approximation and fitting](./optimization-bv-06) · [双书目录](./optimization-sources) · [第8章 Geometric problems →](./optimization-bv-08)

第6章把拟合写成一个确定的优化问题，本章进一步说明：如果数据有随机性，目标函数和约束从哪里来？同一平方残差，可以是几何距离，也可以是高斯噪声下的负对数似然。两种解释导出相同算法，却会影响我们如何解释权重、正则化和不确定性。

本章沿原书7.1至7.5展开。概率密度（density）在一点的值不是该点的概率；连续随机变量的单点概率通常为零。似然把观测固定、让参数变化，而概率分布则把参数固定、讨论可能的观测。先分清谁是变量，统计优化的式子会容易读很多。以下英文阅读句为本站原创。

## 7.1 Parametric distribution estimation · 参数化分布估计

设观测为 $y$，分布族的密度为 $p_\theta(y)$，待估参数为 $\theta$。最大似然（maximum likelihood, ML）选择能让已观测数据最可能的参数：

$$
\hat\theta_{\rm ML}=\arg\max_{\theta\in C}\log p_\theta(y).
$$

这里 $C$ 表达参数范围或已知信息。独立样本的联合密度相乘，取对数后相加；不独立时，不能机械写成逐样本和。若对数似然在凸集合 $C$ 上凹，则最大化它是凸优化。**最大似然并不天然是凸问题**，凸性取决于分布和参数化方式，最优点也未必存在。

第3章的 log-concavity 在这里有直接用途：在线性残差 $y_i-a_i^T\theta$ 下，若各噪声密度 $p_i$ 对残差变量对数凹，则 $\sum_i\log p_i(y_i-a_i^T\theta)$ 对参数凹；独立同分布是原书的基本例子，独立但不同的对数凹密度也有同样的求和结构。这里用的是仿射复合与凹函数求和。若观测函数依赖未知参数的方式非线性，即使噪声高斯，也不能由噪声对数凹直接推出参数优化凸。

在线性观测 $y=A\theta+v$ 中，若 $v\sim\mathcal N(0,R)$ 且已知 $R\succ0$，去掉与 $\theta$ 无关的常数，负对数似然为

$$
\frac12(y-A\theta)^TR^{-1}(y-A\theta).
$$

因此第6章的加权最小二乘有了概率含义：误差方向按协方差进行白化。若独立误差服从 Laplace 分布，会得到加权绝对值损失。将一般惩罚 $\phi$ 解释为噪声模型时，可写密度 $p(v)\propto e^{-\phi(v)}$，但前提是归一化积分有限；任意凸惩罚不一定自动定义合法密度。

原书接着以 Poisson、logistic 与高斯协方差估计说明如何识别凸性。Poisson 均值 $\mu_i=a_i^T\theta+b_i>0$ 时，负对数似然包含 $\mu_i-y_i\log\mu_i$，在该域上是凸函数。Logistic 二分类令 $s_i=a^Tu_i+b$、标签 $y_i\in\{0,1\}$，损失为

$$
\sum_i\left[\log(1+e^{s_i})-y_is_i\right].
$$

log-sum-exp 的凸性使该目标对 $a,b$ 凸。但完全可分数据下，不加限制的 ML 参数可能越走越大，有限最优参数未必存在；适当正则化或约束改变这一点。深度学习中若 $s_i$ 由可训练多层网络产生，则对网络参数的整体问题通常非凸，不能沿用固定线性特征下的结论。

协方差估计还有一个重要的变量变换。对零均值高斯样本，样本协方差为 $Y=N^{-1}\sum_ky_ky_k^T$。对协方差 $R$ 的似然未必凹；改用精度矩阵 $S=R^{-1}\succ0$ 后，得到

$$
\max_{S\succ0}\ \log\det S-\operatorname{tr}(SY).
$$

这是凹最大化。若 $Y\succ0$ 且没有额外限制，最优 $S=Y^{-1}$；若 $Y$ 奇异，无约束精度问题可上无界，不能把奇异 $Y$ 当作正定协方差模型中的正常内点解。对 $S$ 增加结构条件是否保持凸，要逐一核对。

### MAP：先验怎样进入目标

最大后验（maximum a posteriori, MAP）把参数本身视为随机量，给定先验 $p(\theta)$。Bayes 公式为 $p(\theta\mid y)\propto p(y\mid\theta)p(\theta)$，因而

$$
\hat\theta_{\rm MAP}=\arg\min_\theta\{-\log p(y\mid\theta)-\log p(\theta)\}.
$$

高斯先验 $\mathcal N(m,P)$、线性高斯测量模型给出

$$
\min_\theta\frac12(y-A\theta)^TR^{-1}(y-A\theta)
+\frac12(\theta-m)^TP^{-1}(\theta-m).
$$

假定 $P,R\succ0$，该目标严格凸；中心在零点、协方差为各向同性的先验就是 ridge 的一种统计来源。Laplace 先验对应 $\ell_1$ 惩罚。MAP 求的是后验密度的众数，不是后验均值；仅在高斯等特殊情形下二者一致，也不能用一个 MAP 点代替完整不确定性描述。

<OptimizationReading terms="likelihood · prior · posterior · MAP" english="The likelihood describes how observations depend on parameters, whereas the prior describes uncertainty about the parameters before observing the data." chinese="似然描述观测怎样依赖参数；先验描述在看到这次数据之前，对参数有哪些不确定性。MAP 把两者通过后验联系起来。" task="阅读7.1.2时，区分 p(y|x)、p(x) 和 p(x|y)。原书使用 x 表示参数，本站本节用 θ。" />

<OptimizationFusion />

这个一维实验是本站用来连接原书 MAP 与线性高斯 measurement update 的补充。组合惯导中的先验一般来自动态传播，测量可能依赖位置、速度、姿态与偏置；相关误差与非线性观测需要额外建模。不能把实验的标量公式不加条件地套进完整导航系统。

## 7.2 Nonparametric distribution estimation · 直接估计分布

这里的 nonparametric 并不表示“没有优化变量”。原书考虑已知有限支持点 $\alpha_1,\ldots,\alpha_n$，变量是各点概率 $p_i\ge0$，且 $\sum_ip_i=1$。这就是 probability simplex。

期望 $\mathbb E h(X)=\sum_ip_ih(\alpha_i)$ 对 $p$ 线性，所以已知均值、二阶矩或某个集合的概率，可以写成线性等式或不等式。给定这些信息，我们既可以估计一个分布，也可以求某个事件概率的最小与最大可能值。后者常是 LP，回答的是“现有信息容许的范围”，而非某个唯一真实分布。

最大熵（maximum entropy）选择满足条件的分布中 $-\sum_ip_i\log p_i$ 最大者；该目标凹，故为凸优化，采用 $0\log0=0$ 的连续延拓。最大熵避免在已知约束外额外制造结构，但不是证明真实分布就有最大熵。原书还讨论相对熵等估计原则；给定参考分布 $q_i>0$ 时，$\sum_ip_i\log(p_i/q_i)$ 为凸函数。

注意“矩已知”和“方差限制”的不同：方差 $\sum_i\alpha_i^2p_i-(\sum_i\alpha_ip_i)^2$ 对 $p$ 凹，因此方差下界给凸约束，任意上界通常不能直接按同一规则处理。连续分布离散化后还存在支持范围和网格误差，离散问题的保证是针对所采用模型的。

## 7.3 Optimal detector design and hypothesis testing · 检测器设计

令 $\theta=j$ 表示一种假设，$X=k$ 为观察结果。已知条件概率矩阵 $P_{kj}=\Pr(X=k\mid\theta=j)$；检测器矩阵 $T_{ik}=\Pr(\hat\theta=i\mid X=k)$ 的每列属于概率单纯形。则 $D=TP$，其中 $D_{ij}=\Pr(\hat\theta=i\mid\theta=j)$ 是混淆概率。

因为 $P$ 固定，$D$ 对 $T$ 线性。控制误报、漏报、平均损失，或最大化最差情况下正确检测率，都可得到 LP。确定性检测器要求每列恰为一个单位向量，是离散选择；允许随机化则形成凸集合。在某些多目标或最坏情况准则下，随机检测器确实可能优于所有确定性检测器。它不是额外加入测量噪声，而是允许观察结果对应一个决策概率。

原书还讨论多准则标量化、binary hypothesis testing 与鲁棒检测。二元检测中，可固定一个允许的误报上界，再最大化检出概率；这就是 Neyman–Pearson 权衡的一种有限模型表达。误报上界仍是对 $T$ 的线性约束。若条件分布本身只知道矩约束，最坏检测概率需要先对可容许分布求最小值，再利用对偶给出可处理的保证。这里固定的是观测模型或信息集合，优化的是决策规则；它与7.1中固定数据、估计连续分布参数的角色不同。

## 7.4 Chebyshev and Chernoff bounds · 为事件概率给界

概率界用于信息不足或直接积分困难的情形。Chebyshev 型方法从已知矩出发，寻找对事件指示函数的全局上界。若 $q(x)\ge\mathbf1_C(x)$ 对所有 $x$ 成立，就有 $\Pr(X\in C)\le\mathbb E q(X)$。选择可由已知矩计算期望的二次函数，便能把“最佳上界”转成优化；某些几何集合下可形成 SDP。

Chernoff bound 使用指数：对 $\lambda\ge0$，

$$
\Pr(X\ge u)\le\exp\!\left(\inf_{\lambda\ge0}
\{\log\mathbb E e^{\lambda X}-\lambda u\}\right).
$$

累积量生成函数（cumulant generating function）在其有限域上凸，所以右侧的指数内部是凸最小化。这里需要相应指数矩存在，不能对重尾分布无条件使用。概率界是保证方向正确但可能保守的估计；不能读成精确概率，也不能把有限次 Monte Carlo 的频率自动称为确定上界。

## 7.5 Experiment design · 让下一次测量更有信息

前面在数据给定后估计参数，这一节转而选择怎样采数据。假定 $y_i=a_i^Tx+w_i$、噪声独立、零均值高斯且单位方差，测量向量张成整个参数空间。最小二乘估计误差协方差是 $(\sum_ia_ia_i^T)^{-1}$。

在候选测量向量 $v_j$ 中分配频率 $\lambda_j\ge0$、$\sum_j\lambda_j=1$，总测量次数为 $m$，信息矩阵为 $M(\lambda)=\sum_j\lambda_jv_jv_j^T$，协方差为 $E=M^{-1}/m$。必须有 $M\succ0$，否则存在不能识别的方向。不同设计准则表达不同的“准确”：

| 准则 | 优化目标，忽略固定缩放 | 统计与几何含义 |
|---|---|---|
| D-optimal | $-\log\det M$ | 缩小置信椭球的体积 |
| A-optimal | $\operatorname{tr}(M^{-1})$ | 降低总均方估计误差 |
| E-optimal | $\lambda_{\max}(M^{-1})$ | 改善最不确定方向 |

这些目标在正定域上凸。E-optimal 也可通过最大化 $t$、约束 $M\succeq tI$ 写成 SDP。原书将设计与包围候选测量向量的椭球对偶联系起来，说明最优设计会集中到特定边界测量方向，而非必然平均采样。

连续频率是原来整数次数分配的 relaxation：实际次数须为整数。四舍五入后要修复总次数，并重新检查信息矩阵是否正定与性能是否可接受；松弛问题最优不意味着舍入方案仍精确最优。在传感器布设和标定中，测量的方向覆盖常比单纯增加同方向的重复观测更关键。

7.5.3进一步讨论资源限制与一次实验产生多项测量的扩展。若候选实验成本为 $c_j$，总次数为 $m$，预算可以写成 $mc^T\lambda\le B$。组合测量可用矩阵 $V_j$ 表示，信息贡献相应变为 $V_jV_j^T$；同时做多项测量可能比各自执行更省时间或费用。优化因此不仅决定方向，也决定如何组成实验。若把这些模型用于非单位或相关噪声，还需另行白化或使用完整协方差，不能把原书的单位独立噪声假设省略。

## 原书定位与覆盖范围

| 节号与原文标题 | 印刷页 / PDF物理页 |
|---|---|
| 7.1 Parametric distribution estimation | 351 / 365 |
| 7.2 Nonparametric distribution estimation | 359 / 373 |
| 7.3 Optimal detector design and hypothesis testing | 364 / 378 |
| 7.4 Chebyshev and Chernoff bounds | 374 / 388 |
| 7.5 Experiment design | 384 / 398 |

本页覆盖五节主要变量、模型、凸性条件与意义，未逐项推导检测器对偶、广义 Chebyshev SDP 或所有实验设计对偶。继续读原书时，可先回到7.1核对“哪个变量上的凹性”，再读7.5的椭球解释，衔接下一章几何问题。
