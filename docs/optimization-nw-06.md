---
pageClass: optimization-lecture
title: NW 第6章 Quasi-Newton Methods
---

# 第6章 Quasi-Newton Methods：从梯度变化学习曲率

[上一章](./optimization-nw-05) · [教材目录](./course-optimization) · [下一章](./optimization-nw-07)

牛顿法用真实 Hessian 适应曲率，但计算与分解成本可能较大。本章从“一次移动能告诉我们多少曲率信息”出发，依次介绍 BFGS、SR1、Broyden 家族和收敛分析。暂时以中小规模问题为主；第7章再处理完整矩阵过大的问题。

对应印刷 135-163 / PDF 157-185。用 B 表示 Hessian 近似，用 $H=B^{-1}$ 表示逆 Hessian 近似；它们不是同一个矩阵，不应混用更新公式。

## 6.1 The BFGS method

<!-- continuous-optimization-v1 -->
### 一次测力变化，只补上一方向的信息 {#calibration-secant}

在 $q$ 中固定 $y=1$，把 $x$ 从0移到.5。维持静态所需的外力即 $q_x=x-2$，从−2变成−1.5，因此位移 $s=.5$、梯度差 $y=.5$；一维割线刚度是 $B_{new}=y/s=1$。这里 $y$ 是梯度差的符号，不再是台面的第二坐标，请随上下文区分。

若完整位移为 $s=(.5,0)$，则 $y=(.5,0)$。矩阵 $B=\operatorname{diag}(1,1)$ 与 $\operatorname{diag}(1,4)$ 都满足 $Bs=y$；一次沿x的观测并未识别第二方向刚度。于是割线方程只指定矩阵的一个作用，最小改变准则才负责选择余下自由度。

先用这个事实读DFP/BFGS；然后再比较SR1为何允许不定。$s^Ty>0$ 与Wolfe线搜索有明确联系，不是只要有两个梯度就能安全套更新。含随机mini-batch时梯度差还混入采样变化，需要重新审查曲率解释。

<AnatomyFigure src="/anatomy/optimization/positioning.html?mode=secant" title="割线刚度：量到哪一方向，知道哪一方向" />


### 从局部模型得到割线方程

当前二次模型 $m_k(p)=f_k+g_k^Tp+p^TB_kp/2$ 给方向 $B_kp_k=-g_k$。若 $B_k\succ0$，方向下降，配合线搜索生成下一点。移动与梯度变化为

$$
s_k=x_{k+1}-x_k,\qquad y_k=g_{k+1}-g_k.
$$

希望新模型能解释最近两点的梯度，就得到 **secant equation 割线方程**

$$
B_{k+1}s_k=y_k.
$$

其理由可以从梯度的 Taylor 关系理解：$y_k$ 等于沿该线段的平均 Hessian 作用于 $s_k$。因此一次观测告诉我们矩阵在一个方向上的作用，而不是矩阵的所有元素。高维对称矩阵通常有许多自由度，满足这一方程还不唯一，必须添加“尽量保留旧信息”的准则。

如果要求新 B 正定，则 $s_k^Ty_k=s_k^TB_{k+1}s_k>0$，称为 **curvature condition 曲率条件**。Wolfe 线搜索配合下降方向能够保证这一内积正；只用 Armijo 不保证它。强凸函数的真实平均曲率也给正内积，但对于非凸函数，需要额外策略。

### DFP 与 BFGS：在什么对象上作最小改变

原书先用带权矩阵范数的最小改变原则导出 DFP，再对逆 Hessian近似施加相应准则，得到 BFGS。权重并非随意的装饰，它使更新能尊重变量尺度变换；无权范数可能偏好某些单位下的变化。

DFP 的逆矩阵更新为

$$
H_{k+1}=H_k-\frac{H_ky_ky_k^TH_k}{y_k^TH_ky_k}
+\frac{s_ks_k^T}{y_k^Ts_k}.
$$

BFGS 的逆矩阵更新为

$$
H_{k+1}=(I-\rho_ks_ky_k^T)H_k(I-\rho_ky_ks_k^T)
+\rho_ks_ks_k^T,
\qquad\rho_k=\frac1{y_k^Ts_k}.
$$

两者都是有限秩修改，保留大部分旧信息并让最新方向满足割线要求。BFGS 使用 H 时，方向就是 $p_k=-H_kg_k$，主要成本为矩阵向量乘法和秩二更新，不必每轮做稠密分解。

### Properties and implementation：正定性与数值代价

当 $H_k\succ0$、$y_k^Ts_k>0$，BFGS 更新保持正定，因此下轮非零梯度有下降方向。写成乘积形式后，任意向量 z 的二次型是一个非负旧矩阵项加一个非负平方项；零的情况还能进一步排除，从而得到严格正。

如果改存 B，其更新为

$$
B_{k+1}=B_k-\frac{B_ks_ks_k^TB_k}{s_k^TB_ks_k}
+\frac{y_ky_k^T}{y_k^Ts_k}.
$$

每次重新稠密求解 $B_kp=-g_k$ 会失去逆矩阵实现的成本优势；可用相应分解更新减少代价。初始 $H_0$ 可以是单位矩阵或带尺度的单位矩阵，没有对所有问题最佳的通用初始化。

一个一维示意是 $f(x)=2x^2$：移动 $s=-1$，梯度变化 $y=-4$，得到新的逆曲率 $H=s/y=1/4$。高维中同样的信息只修正一条方向，不应期待一次更新恢复完整 Hessian。

实际计算还要防止 $y^Ts$ 很小导致除法不稳定。曲率条件失败的频率可能提示线搜索或梯度精度有问题；不能只把每次失败都跳过而认为算法仍然完整。固定目标的平滑机器学习训练可利用 BFGS；每步改变样本的梯度差混入随机变化后，已不纯粹代表同一函数的曲率。

## 6.2 The SR1 method：保留真实的负曲率

**Symmetric rank-one，SR1，对称秩一更新**设 $u_k=y_k-B_ks_k$，用

$$
B_{k+1}=B_k+\frac{u_ku_k^T}{u_k^Ts_k}.
$$

它用一次秩一修正满足割线方程，但分母可以为零，也不保证正定。这种不定性不一定是缺陷：若真实 Hessian 有负曲率，正定近似会主动抹去该信息，而 SR1 可以保留。信赖域能容纳不定模型，因此原书更偏好把 SR1 放入信赖域框架。

分母的问题需要精确区分。如果 $u=0$，旧 B 已满足割线，不必修改；若 $u\ne0$ 但 $u^Ts=0$，不存在这种形式的对称秩一更新满足要求。数值上采用跳过规则，只在

$$
|u_k^Ts_k|\ge r\|u_k\|\|s_k\|,\qquad0<r<1,
$$

且可安全计算时更新。r 常取较小值，这是相对尺度保护，而不是只检测分母是否恰好等于机器零。

原章随后讨论 SR1 的二次函数性质与近似效果。在特定非退化步和线性独立方向下，可逐步恢复真实曲率；这些结论依赖更新能够实施，不能省掉分母条件。即使 SR1 得到更真实的不定 B，也不能直接用它作为未经保护的线搜索牛顿矩阵。

## 6.3 The Broyden class：一个家族而不是两条孤立公式

原书将 BFGS 与 DFP 放在 Broyden 家族中。在 Hessian 近似的参数化下，可以写成

$$
B_{k+1}=(1-\varphi_k)B_{k+1}^{\mathrm{BFGS}}
+\varphi_kB_{k+1}^{\mathrm{DFP}}.
$$

当 $0\le\varphi_k\le1$，成为 restricted Broyden class，曲率条件下保持正定；因为两个端点都满足割线，线性组合也满足。不同更新对历史曲率的纠正方式不同，不能因为共享割线方程就认为性能一样。

原书对强凸二次型研究预条件后的特征值向1移动的性质，说明更新具有自我纠正能力。该谱结论对应特定二次目标、正定初始矩阵与参数区间；对一般非线性问题，Hessian 本身随位置改变，不能把它作为每一步谱都单调改善的保证。

## 6.4 Convergence analysis：为什么可能比梯度法快得多

### Global convergence of BFGS

原书 Assumption 6.1 先采用较强条件：函数二阶连续可微，初始 level set 凸，Hessian 在这个 level set 上一致满足 $mI\preceq\nabla^2f(x)\preceq MI$，其中 $0<m\le M$；BFGS 初始矩阵正定，线搜索满足 Wolfe。在这些条件下，可以证明迭代收敛到唯一极小点。这是原书给出的条件式结论，不能读成一般非凸 BFGS 的无条件全局收敛。

证明并不是简单假设 B 的条件数始终有界，而是结合 trace 与 determinant，研究更新矩阵怎样限制方向长期变坏，再连接第3章的 Zoutendijk 结果。阅读 trace 和 determinant 时，可分别理解为特征值之和与积，它们共同反映矩阵的尺度与退化程度。

### Superlinear convergence of BFGS

局部超线性分析更关注沿步方向是否学准曲率。还需要解处 Hessian 正定、局部 Hessian Lipschitz、迭代已经以足够好的方式靠近解以及相应线搜索最终单位步等条件；原书借助误差可求和条件和 Dennis-Moré 判据建立结论。

超线性大意是后一次误差与前一次误差之比趋零，比固定比例的线性收敛越来越快。它不要求每个矩阵元素都精确趋向真实 Hessian，却要求对实际步的作用足够准确。全矩阵超线性结论不能自动移植到每轮丢弃旧信息的 L-BFGS。

### Convergence of SR1

SR1 分析需要面对跳过更新与不定矩阵，通常结合信赖域框架研究模型质量、有效步和局部曲率学习。不能用 BFGS 的正定 Wolfe 论证代替 SR1 的论证。原章将两类方法并列，是为了展示“保持正定”与“反映真实曲率”的不同算法选择。

<OptimizationReading english="The secant equation constrains the action of a matrix along one step, rather than determining every matrix entry." chinese="割线方程约束矩阵沿一次移动的作用，却不能确定矩阵的每一个元素。" task="解释为什么还需要最小改变准则，以及超线性分析为什么关注步方向。此句为本站原创。" />

下一章将把这些方法放进大规模环境：矩阵能不能存、能不能分解、是否真的需要全部曲率，会变得比单次迭代次数更重要。

**来源定位：** 6.1 印刷 136-143 / PDF 158-165；6.2 印刷 144-148 / PDF 166-170；6.3 印刷 149-152 / PDF 171-174；6.4 印刷 153-160 / PDF 175-182；章末参考与练习印刷 161 起 / PDF 183 起。本页讲解更新的推导动机与条件，没有逐行复写加权范数极小问题和收敛证明。

[继续第7章](./optimization-nw-07)
