---
title: 英文原著阅读工具箱
prev: false
next: { text: 原书目录与定位, link: /optimization-sources }
---

# 英文原著阅读工具箱

目标是读懂作者在什么条件下推出什么结论。中文用于建立意义，英文保留术语与逻辑。网站的英文卡是**原创教学句**，不是原著引文；真正的阅读训练要回到[对应书页](optimization-sources.html)。数学懂了但读得慢，可以继续用中文支架；阅读速度不会决定数学掌握程度。

## 逐步减少提示，而非按日期升级

| 层级 | 做什么 | 可以减少提示的证据 |
| --- | --- | --- |
| 认词 | 中文解释中识别英文变量、目标、约束词 | 能区分 variable / data / objective / constraint |
| 拆句 | 在原创短句中标对象、假设、量词、结论 | 两次独立提取假设与逻辑方向 |
| 段落导读 | 到原著指定页读一小段，再写中文摘要 | 能写“本段解决什么、用了什么、得到什么” |
| English first | 先读英文，按需展开翻译 | 能补一处推导、解释一个条件的作用 |
| 交叉阅读 | 比较 BV/NW 对同一主题的符号与范围 | 能指出凸保证与一般非凸结论的差别 |

英文卡提供“中文优先 / 中英并读 / English first”；偏好保存于本浏览器。它改变短句辅助，不把整页中文强行隐藏。每次只读一个定理或算法段，暂时允许不认识所有修饰语。

## 把同一份算例带回原著

先沿[七问连续路线](/course-optimization)算一遍 $q(x,y)=\frac12[(x-2)^2+4(y-1)^2]$。读BV2时辨认半空间与凸组合，BV3检查曲率，BV4把模型写成QP，BV5用KKT与对偶作证；再撤掉挡板，读NW2–4的下降、线搜索与信赖域。每一步都保留同一个目标，变化的是可行域或算法。

原著不一定采用本站这组数值。台面、动画和新增逐步算例是本站原创教学辅助，不能当作作者的物理实验或原文引述。请在摘要里分开写“本书结论”和“此例计算”；一般定理的条件仍以本章正文与原著为准。考前只需取回公式与条件时，可查[期末复习](/review-optimization)。

## 先读这些逻辑词

| English | 读法 | 容易误读的地方 |
| --- | --- | --- |
| let / suppose / assume | 规定对象 / 假设 | 这不是已经证明的结论 |
| provided that | 在……条件下 | 条件不能删掉 |
| for all / for any | 对任意 | 验证几个点不能证明全称命题 |
| there exists | 存在至少一个 | 不保证唯一，也不保证你已算出来 |
| if … then | 如果……那么 | 箭头不能自动反转 |
| only if | 只有……才 | 后面的条件是必要条件 |
| if and only if / iff | 当且仅当 | 两个方向都需要依据 |
| necessary / sufficient | 必要 / 充分 | 必须满足，与足以推出不同 |
| at most one | 至多一个 | 允许一个也没有 |
| attained | 达到 | 下确界可能不达到 |
| bounded below | 有下界 | 不保证有 minimizer |
| locally / globally | 局部 / 全域 | 算法 global convergence 常指从广泛初值趋向驻点，不等同全局最优 |

<OptimizationReading english="A strictly convex objective has at most one minimizer over a convex feasible set." chinese="在凸可行集上，严格凸目标至多有一个最优点。" task="圈出 at most 与 over a convex feasible set。分别删掉它们，会误得出什么？用 exp(x) 与两个离散可行点举反例。" terms="strictly convex · minimizer · feasible set" />

## 术语对照：保留准确区别

| 术语 | 中文与含义 |
| --- | --- |
| objective / loss / cost | 目标 / 损失 / 代价；不同领域的称呼 |
| feasible / active | 满足约束 / 约束恰好取等号 |
| minimizer / minimum / infimum | 最优点 / 达到的最小值 / 下确界 |
| convex / strictly convex / strongly convex | 凸 / 严格凸 / 强凸；强凸有统一正曲率下界 |
| gradient / Jacobian / Hessian | 标量函数一阶导向量 / 向量函数导数矩阵 / 标量函数二阶导矩阵 |
| residual / innovation | 模型减观测的残差 / 测量相对预测的创新；先检查符号定义 |
| regularization / damping | 目标中的正则化 / 算法步的阻尼；作用可能相似但模型含义不同 |
| descent direction / step length | 往哪里走 / 走多远 |
| stationarity / optimality | 驻点条件 / 最优性；前者不自动等于后者 |
| duality gap / complementarity | 原始可行值与对偶可行下界之差 / 乘子与约束余量的关系 |
| observability / identifiability | 动态系统状态能否由观测辨识 / 参数能否由数据区分 |
| smoothing / filtering | 利用跨时刻数据联合估计 / 递推吸收当前观测 |

## 用一页原著完成一个阅读闭环

读 BV 3.1.3（印刷 69 / PDF 83）时，不先逐词翻译。写下：对象是可微函数；域是凸域；作者怎样把一阶近似变成全域下界？然后复算 $f(x)=x^2$ 在 $x=1$ 的切线。

读 [NW 第3章](optimization-nw-03.html)的3.1（印刷 32–35 / PDF 54–57）时，比较 sufficient decrease 和 curvature condition。找出 $c_1,c_2$ 的范围，说明为什么仅回溯减半不等于完整 Wolfe 搜索。

读 [BV 第4章](optimization-bv-04.html)的4.2.1（印刷 137 / PDF 151）时，辨认 at most one point；用 $e^x$ 解释作者为什么没有写“一定存在唯一解”。读 [NW 第12章](optimization-nw-12.html)时，先用[符号对照](optimization-sources.html#notation)转换不等式与 Lagrangian 的符号，再读 KKT。

<details><summary>练习：A local minimizer must be stationary, but a stationary point need not be a minimizer. 该句缺什么范围？</summary>

作为完整数学断言，要补“可微无约束问题的定义域内点”。边界约束最优点的目标梯度可以非零；不可微问题不能直接用普通梯度。must 表示必要，need not 表示不必，而不是“必定不是”。

</details>

## 保存你的摘要

建议只写四行：**Problem / Assumptions / Key step / Limitation**。先用中英混合，再逐渐用英文完整句。不要为了英文流畅删掉 convex、interior、positive definite 等改变结论的条件。

<OptimizationNotebook />
