# 资料来源与使用边界

更新日期：2026-10-10

## 本地课程材料（内容基线）

- 教师课件（最高优先级内容基线）：[本地路径不公开]；网页交互和教材推导只负责解释、展开与核对。
- 原综合讲义：`机器学习第1-3讲_理论与CIFAR10实践综合版.html`。读取时 SHA-256 为 `97D1B8DF147F05BA0012300B5F42C690605077F9C7AF572A1232A3312E04F600`。新版保留其三讲范围、核心推导和 P0—P15 实践链，但重写了教学顺序与表达。
- 本地参考教材：Deisenroth, Faisal, Ong, *Mathematics for Machine Learning*，用于线性代数、概率和优化的交叉核对。
- 原实践脚本：`practice/cifar10_mlp_tutorial.py`；本交付包在 `downloads/` 中保留副本。
- 原逐步 Notebook：`notebooks/CIFAR10_MLP_逐步练习.ipynb`；本交付包在 `downloads/` 中保留副本。
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

## 本次教材化重写

主要参考本地 Bishop《Pattern Recognition and Machine Learning》第3–5章，并与 MML、李宏毅教材及 D2L 核对。逐知识点出处与真实PDF页码见 [教材来源表](editorial-audit/source-map.md) 和三份章节审查记录。教材不同章的页偏移不同，未机械套用全书偏移。原公式迁移账本保存198个原显示式；26节均有人工迁移审查。

重写以教材概念与完整推导为主，取消逐节滑块，只保留投影、后验、偏差方差、计算图四幅说明图。独立数值核对代码为 `downloads/rewrite_reference_checks.py`。既有quick run为历史记录，本次未重新训练CIFAR-10。
