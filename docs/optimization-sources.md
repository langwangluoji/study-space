---
title: 双书目录、来源与页码
prev: false
next: false
---

# 双书目录、来源与页码

本课程核验了“最优化”文件夹里的两本书。以下目录来自本地PDF，页码从1开始计数；正文、图与算例为本站原创导读，融入的领域示例明确区分教材内容与补充知识。

## 版本与原书阅读

- **BV**：Stephen Boyd 与 Lieven Vandenberghe，Convex Optimization，Cambridge University Press，2004首版、2009第7次含修订印刷。714 PDF页；ISBN 978-0-521-83378-3。[作者教材主页](https://stanford.edu/~boyd/cvxbook/) · [作者提供的PDF](https://stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)。线上副本印次或页序可能不同，先核对版本。
- **NW**：Jorge Nocedal 与 Stephen J. Wright，Numerical Optimization，第二版，Springer，2006。686 PDF页；ISBN 978-0-387-30303-1。[作者教材主页](https://users.iems.northwestern.edu/~nocedal/book.html) · [出版社页面](https://link.springer.com/book/10.1007/978-0-387-40065-5)。

本地原文件名为“Convex Optimization》Stephen Boyd.pdf”和“Numerical  optimization.pdf”。本地选择器可用你已有的文件配合阅读；本站不将完整NW扫描版作为公开下载。

<OptimizationLocalReader />

## Boyd 全书目录

| 章节 | 原文标题 | 印刷起始页 | PDF物理起始页 | 自学建议 |
|---|---|---:|---:|---|
| 1 | Introduction | 1 | 15 | 首读1.1–1.3、1.6，建立问题语言 |
| 2 | Convex sets | 21 | 35 | 首读2.1–2.3；锥、分离定理后补 |
| 3 | Convex functions | 67 | 81 | 首读3.1–3.2；共轭3.3第二轮 |
| 4 | Convex optimization problems | 127 | 141 | 首读4.1–4.4；SOCP/SDP选学 |
| 5 | Duality | 215 | 229 | 首读5.1、5.2、5.5、5.6 |
| 6 | Approximation and fitting | 291 | 305 | 6.1、6.3结合测量/机器学习项目 |
| 7 | Statistical estimation | 351 | 365 | 有概率基础后读7.1；实验设计选学 |
| 8 | Geometric problems | 397 | 411 | 8.1投影、8.6分类适合作为应用 |
| 9 | Unconstrained minimization | 457 | 471 | 9.1–9.5核心；9.6自协调第二轮 |
| 10 | Equality constrained minimization | 521 | 535 | 理解KKT线性系统后读10.1–10.3 |
| 11 | Interior-point methods | 561 | 575 | 11.1–11.4与11.7；复杂度后补 |
| A | Mathematical background | 633 | 647 | 随用随补，不要求开头全部学完 |
| B | Problems involving two quadratic functions | 653 | 667 | 专题进阶 |
| C | Numerical linear algebra background | 661 | 675 | 牛顿法前补Cholesky、线性方程求解 |

## Nocedal & Wright 全书目录

|章|English title / 内容|印刷起页|PDF物理起页|建议|
|---|---|---:|---:|---|
|1|Introduction 引言、问题分类|1|23|入门|
|2|Fundamentals of Unconstrained Optimization 无约束基础|10|32|核心|
|3|Line Search Methods 线搜索|30|52|核心|
|4|Trust-Region Methods 信赖域|66|88|核心|
|5|Conjugate Gradient Methods 共轭梯度|101|123|核心|
|6|Quasi-Newton Methods 拟牛顿|135|157|核心|
|7|Large-Scale Unconstrained Optimization 大规模算法|164|186|进阶|
|8|Calculating Derivatives 导数计算|193|215|核心实践|
|9|Derivative-Free Optimization 无导数优化|220|242|选修|
|10|Least-Squares Problems 最小二乘|245|267|测绘/遥感优先|
|11|Nonlinear Equations 非线性方程|270|292|进阶|
|12|Theory of Constrained Optimization 约束理论|304|326|核心|
|13|Linear Programming: The Simplex Method 单纯形|355|377|选修|
|14|Linear Programming: Interior-Point Methods LP内点|392|414|进阶|
|15|Fundamentals of Algorithms for Nonlinear Constrained Optimization|421|443|核心桥梁|
|16|Quadratic Programming 二次规划|448|470|核心|
|17|Penalty and Augmented Lagrangian Methods|497|519|进阶|
|18|Sequential Quadratic Programming SQP|529|551|进阶|
|19|Interior-Point Methods for Nonlinear Programming|563|585|进阶|
|A|Background Material 基础附录|598|620|随用随查|
|B|A Regularization Procedure 正则化过程|635|657|选修|

## 双书符号对照 {#notation}

网站统一写不等式 $g_i(x)\le0$ 与等式 $h_j(x)=0$，$L=f+\sum_i\lambda_i g_i+\sum_j\nu_jh_j$，$\lambda_i\ge0$。NW常用 $c_i(x)\ge0$ 且 $L=f-\sum_i\lambda_i c_i$；设 $g_i=-c_i$即可转换，**不等式乘子仍非负**。若保留等式函数而把L中的减号改加号，相应等式乘子反号。

BV常用 $t$ 为步长、$\alpha$ 为Armijo常数；NW常用 $\alpha_k$ 为步长、$c_1$ 为Armijo常数。相同字母不一定代表同一个量。

## 站内内容与原著定位

| 页面 | 原著主题 | 核验方式 |
| --- | --- | --- |
| [BV第1–5章](optimization-bv-01.html) | 原书理论部分：引言、集合、函数、问题、对偶 | 按真实小节顺序，条件与定义域对照 |
| [BV第6–8章](optimization-bv-06.html) | 原书应用部分：拟合、统计、几何 | 保留原书应用组织，五领域的联系融入相应概念 |
| [BV第9–11章](optimization-bv-09.html) | 原书算法部分：无约束、等式约束、内点法 | 方向、线代、中心路径及收敛假设核对 |
| [NW第1–9章](optimization-nw-01.html) | 原书无约束基础与一般算法 | 小节标题、算法条件和二轮修正逐项记录 |
| [NW第10–11章](optimization-nw-10.html) | 最小二乘与非线性方程 | 残差/Hessian结构、局部性与求根区别 |
| [NW第12–19章](optimization-nw-12.html) | 约束理论、LP、QP、罚、SQP、内点 | 保留原章顺序，乘子符号、可行/驻点/曲率分开核验 |
| [数学随查](optimization-prerequisites.html) | BV附录A/C，NW附录A | 作为正文用到时的辅助，不作前置测评 |

讲义覆盖两书30个主章及主要编号小节，按原书顺序组织。较长证明、全部练习、历史参考文献及软件实现细节不逐项展开；这类范围在逐节源校验记录中标为“说明/概览”，不会当作完整证明已经覆盖。

## 原文对照、自评与双端修订

客户端从本地PDF读取原章与小节，建立标题、印刷/PDF页码、讲义位置、解释深度与条件的对应记录。完稿后再次核对，实际修正了对偶例子结构、信赖域接受条件、BFGS/L-BFGS和无导数收敛假设等内容。网页端负责对实际讲义提出数学、易读性和衔接问题；修改由客户端复算、核原文并落实。

校验范围与修订记录：[BV 1–5源对照](/optimization/audit/bv-01-05.json) · [BV 6–11源对照](/optimization/audit/bv-06-11.json) · [NW 1–9源对照](/optimization/audit/nw-01-09.json) · [NW 10–19源对照](/optimization/audit/nw-10-19.json)。记录中的深度和限制比单一“通过”标签更能说明已整理到哪里。

完整稿审阅与实际修改复审后，补正了Wolfe坡度范围、QP全步和方向子问题条件、盒约束梯度投影、延迟布局边界、精确罚正则性等问题。[最终修订记录](/optimization/audit/final-review.txt) · [教材版本及35篇讲义校验值](/optimization/audit/source-manifest.json) · [BV附录源对照](/optimization/audit/bv-appendix.json)。这些记录说明核验范围，不代表逐公式、全部证明与习题已经验完。

## 连续算例与互动装置的来源范围

本次增补在30个主章、5个附录的相关小节中加入实际演算，保留原章目录与原有论述。BV2–5与NW2–4共享二次目标 $q=\frac12[(x-2)^2+4(y-1)^2]$；其它章节按自身主题给出拟合、CG、QP、SQP、障碍等不同算例。这些数值例子与双轴伺服校准台均为本站原创，未声称来自教材实验。

校准台显示控制器指定的位置与数学载荷，执行算法步；机械缓动不是梯度下降的自然动力学。图只解释明示模型，不能替代一般证明。KKT图采用约束 $x+y\le c$，其梯度$(1,1)$不是单位法向，所以普通测力表显示$\lambda\sqrt2$，与乘子$\lambda$分列。正则、投影、障碍等模式在图下注明各自目标与条件，不能混用。

[详细讲义入口](/course-optimization) · [英文阅读方法](/optimization-reading) · [期末公式与题型路线](/review-optimization)。旧版35篇校验值对应当时的内容，新增演算后的文件已变化，不能用旧哈希宣称当前全文未变。

## 怎样核对页码

BV正文印刷页 $p$ 对应PDF物理页 $p+14$；NW第二版对应 $p+22$。规则已用正文首页、目录和核心页核对，不用于封面与罗马页。NW线搜索印刷33 / PDF55的公式页也经过渲染查看。网页端审阅核对公开教材与作者资料，客户端负责本地版本与页码，不能把公开副本页序套过来。

未逐项比对作者全部勘误条目。遇到原书与本站冲突，先核版本、符号和作者勘误，再反馈；不要默认网站重写必然比原书准确。参见 [BV作者主页勘误](https://stanford.edu/~boyd/cvxbook/) 与 [NW第二版勘误](https://users.iems.northwestern.edu/~nocedal/book/errata2.pdf)。

## 应用主题的补充来源

- [Boyd EE364a](https://www.stanford.edu/class/ee364a/)：凸优化课程与教材资源。
- [MIT Underactuated / LQR](https://underactuated.mit.edu/lqr.html)：线性二次控制的进一步学习入口。
- [GTSAM 文档](https://gtsam.org/docs/)：因子图与状态估计的软件文档；实现需确认噪声、流形与残差约定。
- [Solà: Quaternion kinematics for the error-state Kalman filter](https://arxiv.org/abs/1711.02508)：姿态与误差状态补充阅读。
- [Adam原论文](https://arxiv.org/abs/1412.6980) 与 [AdamW原论文](https://arxiv.org/abs/1711.05101)：现代深度学习优化补充。

补充资源不决定先修范围；遇到基础概念可以随时查阅附录。网站按两本教材各自的原章顺序讲述，领域联系融入相关知识点，不按周分配任务。
