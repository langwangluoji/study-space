# 资料来源与使用边界

更新日期：2026-10-11

## 本地课程材料（内容基线）

- 教师课件（最高优先级内容基线）：[本地路径不公开]；网页交互和教材推导只负责解释、展开与核对。
- 原综合讲义：`机器学习第1-3讲_理论与CIFAR10实践综合版.html`。读取时 SHA-256 为 `97D1B8DF147F05BA0012300B5F42C690605077F9C7AF572A1232A3312E04F600`。新版保留其三讲范围、核心推导和 P0—P15 实践链，但重写了教学顺序与表达。
- 本地参考教材：Deisenroth, Faisal, Ong, *Mathematics for Machine Learning*，用于线性代数、概率和优化的交叉核对。
- 实践脚本唯一维护源：`downloads/cifar10_mlp_tutorial.py`；`practice/` 保留原导入兼容入口。
- 逐步 Notebook 维护源：`downloads/CIFAR10_MLP_逐步练习.ipynb`；在线阅读页在构建时由它生成。
- 已有 quick run 摘要及诊断图复制到 `verified-results/`。其中 0.3035 是特定的 8000/2000/2000、1 epoch 快速运行结果，只用于证明该代码流曾运行，不代表完整训练性能。

## 第一讲：回归、似然、贝叶斯与模型控制

- Dive into Deep Learning, [Linear Regression](https://d2l.ai/chapter_linear-regression/linear-regression.html)：线性模型、平方损失、正规方程，以及独立同方差高斯噪声下“最小均方误差 = 最大似然”的推导。
- Dive into Deep Learning, [Maximum Likelihood](https://d2l.ai/chapter_appendix-mathematics-for-deep-learning/maximum-likelihood.html)：似然、贝叶斯规则、先验和最大似然的关系。
- Dive into Deep Learning, [Weight Decay](https://d2l.ai/chapter_linear-regression/weight-decay.html)：先展示过拟合问题，再引入复杂度惩罚；并讨论先验与惩罚项的对应。
- Stanford CS229, [Course notes](https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf)：线性回归、概率解释、逻辑回归与生成式分类的复核来源。

## 第二讲：分类概率与交叉熵

- Dive into Deep Learning, [Softmax Regression](https://d2l.ai/chapter_linear-classification/softmax-regression.html)：从分类概率和最大似然得到交叉熵；softmax 与交叉熵的梯度为预测减目标。
- scikit-learn, [Linear and Quadratic Discriminant Analysis](https://scikit-learn.org/stable/modules/lda_qda.html)：LDA 的共享协方差假设与线性决策边界。
- PyTorch, [CrossEntropyLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)：输入应为未归一化 logits；实现等价于 LogSoftmax 与 NLLLoss 的组合。

## 第三讲：MLP、优化与反向传播

- Dive into Deep Learning, [Multilayer Perceptrons](https://d2l.ai/chapter_multilayer-perceptrons/mlp.html)：线性模型限制、隐藏层与激活函数。
- Dive into Deep Learning, [Forward Propagation, Backward Propagation, and Computational Graphs](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html)：前向缓存、计算图与反向传播。
- Stanford CS229, [Backpropagation notes](https://cs229.stanford.edu/notes_archive/cs229-notes-all/cs229-notes-backprop.pdf)：分量形式和向量形式的反向传播复核。
- Dive into Deep Learning, [Gradient Descent](https://d2l.ai/chapter_optimization/gd.html)：Taylor 展开、梯度下降和学习率。

## CIFAR-10 与 PyTorch 实践

- PyTorch Tutorials, [Training a Classifier](https://docs.pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html)：CIFAR-10 下载、DataLoader、分类训练与评估的官方流程。
- Torchvision, [CIFAR10 dataset](https://docs.pytorch.org/vision/stable/generated/torchvision.datasets.CIFAR10.html)：数据集接口与参数。
- PyTorch, [DataLoader](https://docs.pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader)：批处理、打乱与多进程加载接口。
- PyTorch, [SGD](https://docs.pytorch.org/docs/stable/generated/torch.optim.SGD.html)：学习率、momentum 与 weight decay 的官方定义。

## 设计参考

- ECNU Urban Analytics course site：<https://dawn-ecnu.github.io/teachings/urban-analytics-ba-26/>。仅参考清晰分区、三栏阅读、进度和主题切换等信息架构；配色与教学组件为本项目重新设计。

## 解释原则

- 公式只在问题、直觉与假设已经出现后给出。
- “相等”必须注明条件。例如已知固定正方差、条件独立同方差Gaussian观测下，权重ML与最小二乘共享最优参数；联合估计方差时还须检查完全插值退化。平方风险的条件均值结论本身不需要Gaussian假设。
- 预期形状、理论结论与实际运行结果分开标注；未重新运行的实验不写成已验证成绩。

## Markdown 内容优化与架构迁移

三讲以本地 Bishop《Pattern Recognition and Machine Learning》第 3–5 章为推导基线，并交叉核对 MML、李宏毅教材和 D2L。保留原正文所列教材章节与版本；网页中的补充推导、矩阵展开和新样章算例由本站编写。核验方法和边界见[核验记录](verification.html)。

第一讲 A1–A5 与第三讲 C4 沿用已认可的样章。数字代入、完整手算、练习与互动图默认收起；必要条件仍在正文。新回归算例和 ReLU 回归网络取代旧算例，下载核验脚本与 C5 同步。

布局参考 [LinhoNotes](https://notes.linho.cc/) 与其 [项目说明](https://github.com/Linho1219/LinhoNotes) 的文档结构：分组课程侧栏、受控正文宽度、右侧大纲、移动端目录与本地搜索。本站保留“课程知识库”品牌、蓝色系和深浅主题，用 VitePress 1.6.4 的主题扩展实现。

Notebook、Python 和本来源文稿是对应阅读页的唯一来源，构建过程不执行 Notebook。教材 PDF、教师课件与历史结果保持原文件；已有 quick run 仅作历史记录，本次未重新训练 CIFAR-10。
