---
pageClass: optimization-lecture
---

# 第2章 Convex sets · 凸集

第1章把约束理解为允许的选择。本章进一步问：如果两种选择都允许，它们之间的混合是否也允许？从线段到锥、矩阵不等式和分离超平面，教材逐步构造描述可行集的语言。它们会在第4章建模和第5章对偶中重新出现。

本页按§2.1–§2.6顺序导读。公式和解释为原创整理；英文阅读句为本站原创。正文PDF物理页 = 印刷页 + 14。[上一章](/optimization-bv-01) · [课程目录](/course-optimization)

## 2.1 Affine and convex sets · 仿射集与凸集

两点 $x,y$ 的组合 $\theta x+(1-\theta)y$ 在 $\theta\in[0,1]$ 时扫过线段，在 $\theta\in\mathbb R$ 时扫过直线。仿射集 **affine set** 要包含任意两点之间的整条直线，凸集 **convex set** 只要求整条线段。

仿射组合系数和为1，允许负数；凸组合在此基础上要求非负。$\{x:Ax=b\}$ 是仿射集，非空时可以写成零空间加一个偏移。仿射集不必经过原点，不能直接等同线性子空间。集合的仿射包 **affine hull** 是包含它的最小仿射集；凸包 **convex hull** 由全部有限凸组合组成。

普通内部依赖环境空间。平面里的一条线在 $\mathbb R^2$ 中内部为空，在自己的仿射包中却有内部；这就是 **relative interior（相对内部）**。第5章Slater条件使用它，避免把“低维但合法”的定义域误判为空。

锥 **cone** 对非负缩放封闭。凸锥进一步对非负线性组合封闭：

$$
x,y\in K,\ \alpha,\beta\geq0\quad\Longrightarrow\quad\alpha x+\beta y\in K.
$$

凸组合的系数和为1，锥组合不要求这个限制。不是所有锥都凸，也不是所有凸集都是锥。

## 2.2 Some important examples · 常见集合

超平面 $a^Tx=b$ 划分空间，半空间 $a^Tx\leq b$ 只保留一侧；这里 $a\neq0$。欧氏球与一般范数球是凸集。正定矩阵决定的椭球可写为

$$
\mathcal E=\{x:(x-x_c)^TP^{-1}(x-x_c)\leq1\},\qquad P\succ0.
$$

矩阵的特征方向与特征值分别决定椭球方向和尺度。导航或惯性测量中常用协方差椭球表示不确定性，但把它解释为具体概率区域还需要分布等额外假设；仅有协方差不是全部分布信息。

**polyhedron（多面体）**是有限个半空间与超平面的交，形式为 $Gx\leq h,Ax=b$；它不必有界，也可能为空。单纯形是仿射独立点的凸包，概率向量集合 $\{x:x\geq0,\mathbf1^Tx=1\}$ 是常见例子。

二阶锥为 $\{(x,t):\|x\|_2\leq t\}$；半正定锥为 $\mathbb S_+^n=\{X:v^TXv\geq0\ \forall v\}$。后者凸，因为每个固定 $v$ 的条件都是关于矩阵元素的线性不等式。矩阵半正定不是逐元素非负，这一差别对控制中的矩阵条件至关重要。

## 2.3 Operations that preserve convexity · 保持凸性的集合操作

证明实际可行集凸，通常不必从任意两点重新展开。任意凸集的交仍凸；仿射映射的像与逆像保持凸性。求和和非负缩放也能构造新凸集。凸集的并一般不保持凸，删除一块区域也可能破坏凸性。

透视映射 **perspective mapping** 为

$$
P(x,t)=x/t,\qquad t>0.
$$

它把线段映到线段，但通常改变线段的参数权重。像与逆像保持凸性的结论需要保留正分母定义域。线性分式映射

$$
f(x)=\frac{Ax+b}{c^Tx+d},\qquad c^Tx+d>0
$$

由仿射映射和透视映射构成，因而也有相应保持性质。这种几何解释可以帮助理解归一化坐标；若允许分母跨过0，不能继续原样使用定理。

## 2.4 Generalized inequalities · 广义不等式

向量和矩阵未必有自然的全排序。教材选择 **proper cone（正常锥）**定义偏序：锥需凸、闭、具有非空内部，并且尖锐，即不包含非零的整条直线。四个条件共同保证所需的顺序结构。

$$
x\preceq_K y\iff y-x\in K,\qquad
x\prec_Ky\iff y-x\in\operatorname{int}K.
$$

当 $K=\mathbb R_+^n$，这是逐分量比较；当 $K=\mathbb S_+^n$，$X\preceq Y$ 表示 $Y-X$ 半正定。两向量或两矩阵可能无法比较，因此它是 **partial order（偏序）**。

**minimum element（最小元素）**不大于集合中所有其他元素；**minimal element（极小元素）**只要求不存在一个不同且不大于它的元素。例如资源向量可能存在很多互不支配的极小点，却没有同时低于所有方案的最小点。第4章的Pareto最优正建立在这一区分上。

<OptimizationReading english="A partial order allows some pairs of vectors to remain incomparable." chinese="偏序允许某些向量对无法相互比较。" task="本站原创英文：用 (1,2) 和 (2,1) 解释 incomparable，再区分 minimum 与 minimal。" />

## 2.5 Separating and supporting hyperplanes · 分离与支撑超平面

非空、不相交的凸集 $C,D$ 可以用非零法向 $a$ 的超平面弱分离：

$$
a^Tx\leq b\quad(x\in C),\qquad a^Ty\geq b\quad(y\in D).
$$

弱分离允许等号。两个凸集不相交并不自动保证严格分离，甚至闭集也不能无条件保证；一个点在闭凸集外时，则可严格分离。集合闭性等条件是定理的一部分，不能因为图上看起来有缝隙就忽略它们。

若 $x_0$ 是非空凸集的边界点，存在 $a\neq0$ 使 $a^Tx\leq a^Tx_0$ 对集合内所有点成立，相应超平面支撑该集合。它提供一个全局几何界；在光滑边界附近可类比切平面，在角点处也可以存在支撑平面。机器学习的线性分隔与间隔直觉借用了这种几何，但分类数据能否严格分隔仍需要实际验证。

## 2.6 Dual cones and generalized inequalities · 对偶锥

给锥 $K$，定义

$$
K^*=\{y:y^Tx\geq0\ \text{对所有 }x\in K\}.
$$

对偶锥由所有在 $K$ 上给出非负内积的线性评价方向组成。对每个固定 $x\in K$，$y^Tx\ge0$ 都是关于 $y$ 的闭半空间，$K^*$ 是这些半空间的交，因此总是闭凸锥，即使 $K$ 不闭或不凸。若 $K$ 是正常锥，$K^*$ 也正常。更一般地，$K^{**}=\operatorname{cl}(\operatorname{conv}K)$；只有 $K$ 本身闭且凸时才恢复 $K^{**}=K$。取对偶会丢掉原集合中的非凸凹陷和未封闭边界，这解释了为什么不能随意省略这些条件。

非负正交象限与二阶锥自对偶。半正定锥在矩阵内积 $\operatorname{tr}(XY)$ 下也自对偶。线性子空间的对偶锥是其正交补，这与“对所有缩放都非负”同时迫使内积为零有关。

对正常锥，可用所有对偶评价检验顺序：$x\preceq_Ky$ 等价于 $\lambda^Tx\leq\lambda^Ty$ 对所有 $\lambda\in K^*$ 成立。严格顺序 $x\prec_Ky$ 则要求 $\lambda^Tx<\lambda^Ty$ 对所有**非零** $\lambda\in K^*$ 成立；必须排除零向量，否则严格不等式永远不可能满足。

最小元素的评价性质、极小点的支撑评价，以及资源分配中的非负价格解释，随后把偏序与标量目标联系起来。这里要区分两个方向：用内部对偶权重 $\lambda\in\operatorname{int}K^*$ 最小化线性评价，得到的最优元素一定极小；从极小元素反推支撑权重，通常还要使用集合的凸性，并可能只能得到边界权重。这正是第4章标量化的条件来源。

**原书定位**：§2.1印刷21/PDF35；§2.2印刷27/PDF41；§2.3印刷35/PDF49；§2.4印刷43/PDF57；§2.5印刷46–51/PDF60–65；§2.6印刷51–58/PDF65–72。文献与练习从印刷59、60/PDF73、74开始。

集合描述允许的输入，[第3章 Convex functions](/optimization-bv-03)接着研究怎样评价输入，以及函数变换如何保留凸性。
