---
pageClass: optimization-lecture
---

# 附录B Problems involving two quadratic functions · 两个二次函数的问题

正文主要依赖凸性获得可靠结论，本附录展示一个边界清楚的例外：只有一个二次不等式约束时，即使目标与约束不凸，仍可能有精确的半正定对偶与证书。关键是“两项二次结构”和严格可行性，而不是泛化为“非凸问题也都满足Slater就可以解决”。

按原附录B.1–B.4讲述，公式解释为本站原创。正文PDF物理页 = 印刷页 + 14。[附录A](/optimization-bv-a) · [课程目录](/course-optimization) · [附录C](/optimization-bv-c)

## B.1 Single constraint quadratic optimization · 单个二次约束

记 $q_i(x)=x^TA_ix+2b_i^Tx+c_i$，$A_i$ 对称，但不要求半正定。问题为 $\min q_0(x)$、$q_1(x)\leq0$。一般不是凸优化，因此正文凸问题的强对偶定理不能直接使用。

拉格朗日函数仍是二次函数。对 $\lambda\geq0$，令 $H=A_0+\lambda A_1$、$d=b_0+\lambda b_1$，则

$$
g(\lambda)=c_0+\lambda c_1-d^TH^\dagger d
$$

仅在 $H\succeq0$ 且 $d\in\mathcal R(H)$ 时有限，其他情况为 $-\infty$。第一项条件排除负曲率方向，第二项排除零曲率方向上的非零线性下降；二者缺一不可。把 $H^\dagger$ 随意换成逆矩阵会遗漏合法的奇异情形。

对偶可以直接写成SDP：

$$
\max_{\lambda,\gamma}\gamma,\qquad \lambda\geq0,\quad
\begin{bmatrix}
A_0+\lambda A_1&b_0+\lambda b_1\\
(b_0+\lambda b_1)^T&c_0+\lambda c_1-\gamma
\end{bmatrix}\succeq0.
$$

若存在 $\hat x$ 使 $q_1(\hat x)<0$，原问题与这个对偶最优值相等。这是单约束二次结构的特殊定理，不能对多个不定二次约束照搬。最优值相等也不应无条件解释为原始最优点已达到。

原书随后引入 $X=xx^T$，把二次项改写为 $\operatorname{tr}(A_iX)$。将等式放宽为 $X\succeq xx^T$，即 $\begin{bmatrix}X&x\\x^T&1\end{bmatrix}\succeq0$，得到SDP松弛。若松弛最优解确实满足 $X=xx^T$，即可恢复原始最优点；一般情况下不要直接把松弛中的 $x$ 当原始可行最优解。严格可行条件下的精确值关系与点的恢复是两个问题。

## B.2 The S-procedure · 用矩阵证明二次蕴含

采用一致符号，想验证

$$
q_1(x)\leq0\quad\Longrightarrow\quad q_2(x)\leq0
\qquad\text{对所有 }x.
$$

若存在 $\lambda\geq0$ 使 $q_2(x)\leq\lambda q_1(x)$ 对全部 $x$ 成立，蕴含显然成立。对应矩阵条件为

$$
\begin{bmatrix}A_2&b_2\\b_2^T&c_2\end{bmatrix}
\preceq\lambda
\begin{bmatrix}A_1&b_1\\b_1^T&c_1\end{bmatrix}.
$$

S-procedure（也常称单约束S-lemma）的强结论是：**若存在 $q_1(\hat x)<0$ 的点，上面的非负乘子条件同时也是必要的。** 不需要两个二次函数都凸。严格可行针对作为前提的第一个约束，不能写成任意一个函数有负值就足够。

没有严格可行性时，矩阵证书仍充分，但必要性可失败。例如 $q_1(x)=x^2$、$q_2(x)=x$：前提只能在 $x=0$ 成立，因而蕴含成立；但不存在有限 $\lambda\geq0$ 使 $x\leq\lambda x^2$ 对所有 $x$ 成立，因为足够小的正 $x$ 会违反它。这个反例说明条件确实决定证书是否完整。

椭球包含是原书的具体用法。非空内部椭球的二次定义有严格可行点，因此可以把“所有椭球内的点也位于另一椭球”化为单个乘子加矩阵不等式。若同时要求多个二次前提，多个非负乘子给出的一般S-procedure通常只是充分证书，并非自动精确等价；等式前提、复变量版本等也需要各自定理。

## B.3 The field of values of two symmetric matrices

为什么“两项”如此特殊？原书证明：给任意对称 $A,B$ 和任意 $X\succeq0$，存在一个向量 $x$，使

$$
x^TAx=\operatorname{tr}(AX),\qquad
x^TBx=\operatorname{tr}(BX).
$$

这并不说 $X=xx^T$，只说两个指定的标量评价可同时保持。几何上，$\{(x^TAx,x^TBx):x\in\mathbb R^n\}$ 与PSD锥经线性映射的像相同，因此是凸锥。证明先将高秩情形归约到秩至多2，再在两个方向里构造系数。这是特殊的秩恢复结构，不能推广成任意数量二次评价都能同时由一个向量实现。

## B.4 Proofs of the strong duality results · 证明的连接线

原书先证明S-procedure，再证明B.1强对偶。严格可行意味着对应增广矩阵有负方向，支持使用第5章的矩阵择一定理；B.3随后把PSD矩阵证书还原为增广向量的两项二次评价。

增广向量最后一个坐标非零时可以除以该坐标，恢复原变量；坐标为零时不能直接归一化，证明借助严格可行点沿合适方向移动来处理。这一步解释为什么严格可行性参与实际构造，而不仅是声明里的附注。

最后，$\gamma$ 是原问题下界等价于 $q_1(x)\leq0\Rightarrow q_0(x)\geq\gamma$。将这个蕴含应用S-procedure，恰好得到B.1的SDP约束，从而把所有可达到的下界与对偶联系起来。理解证明主线后，再回原文跟踪各个符号，比把结论记成“非凸也有强对偶”更准确。

**原书定位**：B.1印刷653–654/PDF667–668；B.2印刷655/PDF669；B.3印刷656–657/PDF670–671；B.4印刷657–658/PDF671–672。未逐行复现秩2构造与长证明；本页明确的是单约束实二次函数范围。[附录C](/optimization-bv-c)接着解释如何稳定计算正文中反复出现的线性系统。
