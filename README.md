# Study Space · 多领域学习空间

面向自学、课程复习与资料查阅的中文学习空间。当前收录机器学习前三讲及可选实践；后续按领域扩展课程、数学推导、学习笔记和参考资料，避免把所有内容混在一个长页面中。

[在线阅读](https://langwangluoji.github.io/study-space/) · [机器学习课程](https://langwangluoji.github.io/study-space/course-ml.html) · [资料中心](https://langwangluoji.github.io/study-space/resources.html)

`study-space` 是本站专用的 GitHub Pages 项目路径，不是另行注册的独立域名。个人主页根地址可留给未来其他用途。

## 内容梗概与阅读路径

| 章节 | 内容重点 | 源文件 |
| --- | --- | --- |
| 第一讲：线性回归与最小二乘 | 回归模型、最小二乘、最大似然与最小二乘的联系、先验与正则化 | [第一讲](public/lecture-1.html) |
| 第二讲：线性分类与感知机 | 判别函数、感知机、概率分类、sigmoid、softmax与交叉熵 | [第二讲](public/lecture-2.html) |
| 第三讲：非线性回归与多层感知机 | 非线性表达、网络结构、激活函数、链式求导与反向传播 | [第三讲](public/lecture-3.html) |
| CIFAR-10可选实践 | 数据划分、MLP训练、评估与代码对照 | [实践](public/cifar10-practice.html) |

建议依次阅读前三讲，关注“问题 → 假设 → 推导 → 解释”的联系。已学过的数学背景按需回顾；实践用于连接数学和代码，不是阅读理论的前提。

## 使用详情

- 从课程总览进入讲义，通过章节目录定位知识点；主页搜索可跨讲查找概念。
- 交互图中的滑块和曲线用于观察参数变化；公式由随站发布的MathJax渲染，无需安装LaTeX。
- 主题与部分学习状态保存在当前浏览器，不是跨设备同步账号。
- PDF内嵌阅读失败时，请新标签打开或下载；手机浏览器可能直接下载文件。
- PPT在线预览是静态PDF；动画与演示效果需要下载原PPTX后打开。
- Python与Notebook下载后在自己的Anaconda `pytorch` 环境运行；网站不提供服务器端Python或GPU执行。
- 教材章节定位和官方链接见 [来源说明](public/sources.md)。

## 文件结构

```text
.github/workflows/pages.yml  自动部署
public/
  index.html                主页
  course-ml.html            课程总览
  lecture-1/2/3.html        各讲正文
  cifar10-practice.html     可选实践
  resources.html           资料中心
  book-*.html              教材阅读页
  slides-lecture-*.html     课件阅读页
  assets/                  样式、交互、插图及公式渲染
  books/                   教材PDF
  slides/                  课件PDF与PPTX
  downloads/               Python与Notebook
```

## 维护与更新

小修改：在GitHub打开文件 → 点击编辑 → 提交到 `main` → 在 **Actions → Publish course website** 查看部署是否成功。建议写清修改内容。

较大修改：在本地编辑并预览、检查公式和链接后提交：

```bash
git clone https://github.com/langwangluoji/study-space.git
cd study-space
git pull --ff-only
# 修改、检查public中的内容后
git add public
git commit -m "docs: revise lecture explanations"
git push origin main
```

这是静态HTML网站，无需npm构建。新增章节时还需要更新课程总览、导航、课程目录与搜索索引；上传新HTML不会自动生成这些入口。更换教材文件后检查阅读页中的文件路径。部署失败先查看Actions日志，不要删除旧网站。

勘误可通过本仓库Issues提交，请注明讲次、知识点、具体问题与参考来源。数学推导、排版和代码运行分别核验，网页能打开不等于内容已经全部验收。

网站发布目录为 `public`，使用 GitHub Actions 发布 GitHub Pages。
在仓库 Settings → Pages → Build and deployment 中选择 GitHub Actions。

PRML、MML 与前三讲课件提供站内 PDF 预览和下载。李宏毅教程保留原维护项目完整版下载入口；不将大于100 MiB的原教材提交到 Git 仓库。

本仓库不包含本机桌面打开服务、私密配置或内部验收报告。
资料版权归原作者和教师所有，公开分发须遵循其许可；未对第三方教材附加开源许可。仓库公开不等于全部内容具有开源授权，目前没有统一开源许可证。以后若为原创代码或讲义添加许可，应单独说明范围并排除第三方资料。

GitHub Pages 为静态网站，不执行服务器端 Python。大陆跨网络可达性需上线后实测。
