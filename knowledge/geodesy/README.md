# 大地测量自学知识库

[开始学习](lessons/course-geodesy.md) · [复习](lessons/review-geodesy.md) · [术语与公式](lessons/geodesy-glossary.md) · [来源索引](lessons/geodesy-sources.md)

这是网站课程的唯一正文源。在 Obsidian 中选择“打开本地仓库”，选择本文件所在的 geodesy 文件夹。无需社区插件。公式、静态图、推导和自测均可离线阅读；assets/interactive 中的新交互图可在浏览器离线打开。

课程按六章与辅助篇编排。每页先读几何图和例题，再展开详细推导；在专题末尾完成简短自测。个人随记可放在“学习笔记”文件夹，不进入网站课程页面生成流程。正文修改保存在 lessons 中，再运行网站生成命令。

## 统一约定

| 符号 | 约定 |
|---|---|
| B、L、h | 大地纬度、经度、椭球高 |
| M、N | 子午、卯酉曲率半径 |
| E、N、U | 东、北、上坐标分量，右手系 |
| A | 从北向东计的方位角 |
| 内部角度 | 弧度；图形输入另注度 |
| 旋转 | 明确主动／被动、源系／目标系和乘法次序 |

原始资料位于本机 E:/Document/FILE_package/Class/大地测量；详细相对文件名及校验值见 course-sources.json。知识库包含加工后的课程内容和必要图解。

[打开网站](https://langwangluoji.github.io/study-space/course-geodesy.html)

## 配图与坐标转换学习路线

本轮增加11幅重绘图与10幅课件局部图。[配图来源表](data/figure-inventory.md)把图片、来源页和专题连接起来；[裁切记录](data/figure-source-crops.json)保留原图范围和校验值。

学习坐标转换时，可依次阅读“法线脚点与正算—反算法线条件—局部方向—微分标尺—站心投影—七参数与参考点模型”。正文讲清几何步骤，完整求导与课件旋转路线可展开。原讲义的 H 在几何坐标公式中对应本库的椭球高 h；归算页的正常高另记作 H^N。
