---
title: "大地测量课程维护说明"
prev: false
next: false
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-plan.md; edit the Obsidian source. -->

# 大地测量课程维护说明

课程正文以 knowledge/geodesy/lessons 中的Markdown为唯一编辑来源。网站页面由生成器转换，课程目录按章节与顺序元数据生成。修改正文时在Obsidian或文本编辑器中编辑知识库，再重新生成网站。

## 写作和符号

以本科生正在解决的问题组织段落，先画几何关系、再定义符号、再推公式。核心条件保留在正文，长代数使用折叠说明。椭球高统一记 h；引用原题的 H 时说明对应关系。东、北、上采用右手ENU，课件NEU另行说明手性。公式示例与交互面板明确椭球、角度单位和变换方向。

## 来源和核验

新增资料先更新来源页段与SHA-256记录，再写对应讲解与算例。数学核验使用 scripts/verify_geodesy.py、scripts/verify_geodesic_computation.py、scripts/verify_geodesy_coordinates.py 和 scripts/geodesy/model.test.mjs。发布转换由 scripts/geodesy-publish.test.mjs 检查公式、链接、折叠推导及学习标记。最后进行构建与浏览器检查。

## 本地阅读

知识库使用普通Markdown、LaTeX、相对图片和Obsidian可折叠说明框。新交互图另存为内联脚本HTML，可由本地链接在浏览器打开。原始PPT、PDF、DOCX继续保留在课程资料目录，不复制进公开发布包。
