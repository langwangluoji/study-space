# 资料中心

## 机器学习课程资料 {#ml}

[课程阅读路径](course-ml.html) · [三讲与实践的来源说明](read-sources.html) · [维护指南](read-README.html)

## 原教材

| 教材 | 在线阅读 | 原文件 |
| --- | --- | --- |
| Bishop · PRML | [第 3–5 章参考](book-prml.html) | [PDF](books/prml.pdf) |
| Deisenroth、Faisal、Ong · MML | [数学背景参考](book-mml.html) | [PDF](books/mml.pdf) |
| 李宏毅深度学习教程 | [版本与阅读入口](book-leedl.html) | [维护项目](https://github.com/datawhalechina/leedl-tutorial) |

教材和课件保留原作者署名，按本站原有资料入口提供；网页中的解释与勘误不修改原文件。

## 教师课件

| 讲次 | PDF 预览 | 原 PPTX |
| --- | --- | --- |
| 第一讲 · 线性回归与最小二乘 | [阅读](slides-lecture-1.html) | [下载](slides/lecture-1.pptx) |
| 第二讲 · 线性分类与感知机 | [阅读](slides-lecture-2.html) | [下载](slides/lecture-2.pptx) |
| 第三讲 · 非线性回归与多层感知机 | [阅读](slides-lecture-3.html) | [下载](slides/lecture-3.pptx) |

## 可运行代码

| 内容 | 自动生成的阅读版 | 下载源文件 |
| --- | --- | --- |
| CIFAR-10 实践脚本 | [阅读](read-downloads-cifar10_mlp_tutorial.html) | [Python](downloads/cifar10_mlp_tutorial.py) |
| P0–P15 逐步 Notebook | [阅读](read-notebook.html) | [Notebook](downloads/CIFAR10_MLP_逐步练习.ipynb) |
| 独立数学核验 | [阅读](read-downloads-rewrite_reference_checks.html) | [Python](downloads/rewrite_reference_checks.py) |

浏览器用于阅读，真实训练在 Python/PyTorch 环境运行。需安装 NumPy、PyTorch、torchvision 和 matplotlib；命令与预算见[实践 P0](cifar10-practice.html#p0)和[快速检查 P10](cifar10-practice.html#p10)。Notebook 从上到下执行并使用正确内核，运行标记 <a href="/study-space/MISSION.md">MISSION.md</a> 保持原路径。

## 核验与历史结果

[本次核验记录](verification.html)。此前已保存的 quick run 环境、摘要及图片保留在 `verified-results/`；本次不重新训练、不更新历史数值。

<details><summary>历史资料｜原环境与结果</summary>

### 旧实验资料入口

[训练曲线](/verified-results/history.png) · [混淆矩阵](/verified-results/confusion_matrix.png) · [误分类样本](/verified-results/misclassified_examples.png)

</details>
