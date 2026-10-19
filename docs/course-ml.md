# 机器学习与遥感图像分析 · 阅读路径

<div class="course-quicklinks"><a href="/study-space/review-ml.html">期末复习路线 →</a><a href="/study-space/resources.html#ml">教材、课件与代码 ↗</a></div>

重新学习时，可先沿[阅读路线](study-guide.html)建立本章与前后知识的联系，再进入具体专题。必要推导在正文展开；附加证明用于追踪尚未理解的步骤。


四讲均保留整讲长页。各讲按连续思路分段组织，右侧大纲帮助把握主线；左侧课程目录展开分组后，可以直接跳到具体知识点。手机端分别打开“课程目录”和“本页大纲”。

## 先修知识

需要向量与矩阵乘法、标量求导、条件概率和期望。遇到设计矩阵、外积、协方差与批量梯度时，正文会写开符号矩阵，并解释每个求和索引。

<div class="course-cards">
<div class="course-card">

## 第一讲 · 回归与可靠预测

从模型、残差、平均损失开始，理解正规方程与投影，再学习似然、贝叶斯、优化和泛化。

[连续阅读第一讲](lecture-1.html#a1)

</div><div class="course-card">

## 第二讲 · 线性分类与概率

先区分分数、距离与概率，再比较最小二乘分类、Fisher/LDA、感知机、Logistic 和 Softmax。

[连续阅读第二讲](lecture-2.html#b1)

</div><div class="course-card">

## 第三讲 · 网络与反向传播

先用 XOR 看见线性模型的限制，再建立节点、连接与矩阵布局，再学习激活、初始化、反向递推与梯度核验。

[连续阅读第三讲](lecture-3.html#c1)

</div><div class="course-card">

## 第四讲 · 多层感知机与手工图像特征

从基函数连接五类手工图像特征，算清 HOG 的 324 维输入，再完成 HOG + MLP 分类。

[连续阅读第四讲](lecture-4.html#d0) · [原课件与参考代码](resources.html?course=ml&q=第四讲)

</div><div class="course-card">

## 实践 · CIFAR-10 MLP

按 P0–P15 的顺序运行。脚本与 Notebook 是代码依据，在线阅读版本由它们自动生成。

[进入实践](cifar10-practice.html#p0)

</div></div>

## 怎样阅读

正文先解释问题、符号和推导，接着给出结论与条件。贯穿算例与关键计算在正文直接展开；附加框保留延伸证明、练习和完整参考代码，可在第二遍阅读时打开。数字算例帮助核验，不替代一般结论。

搜索支持 `Ctrl+K`（Mac 为 `⌘+K`），同时检索正文与附加内容。按知识点标记已读或掌握，记录保存在当前浏览器；四讲的标记集中在各讲末“学习记录”中，旧版学习记录会继续读取。

## 资料与运行

[教材与课件](resources.html#ml) · [Notebook 阅读版](read-notebook.html) · [完整训练脚本](read-downloads-cifar10_mlp_tutorial.html) · [数学核验](verification.html) · [维护指南](read-README.html)
