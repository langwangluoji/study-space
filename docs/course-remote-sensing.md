---
title: 遥感原理与基础
description: 前四章双语学习资料，结合轨道、扫描成像与辐射图解建立概念。
prev: false
next:
  text: 第一章 遥感概述
  link: /remote-sensing-ch1
---

# 遥感原理与基础

<!-- earth-reading-task -->
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

同一块田在两日影像中变暗，能否直接判断作物发生变化？这门课按一次观测的证据逐步排除其他原因：先找能量来源，再查辐射、平台时刻与角度，最后检查采样和产品。每章完成一个判断，具体推导与来源仍保留。

[期末关键总结与题型](review-remote-sensing.html)用于回查；首次学习按四章连续阅读。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The same field looks darker on a second date. Does that establish a crop change? Follow one observation and eliminate competing explanations: identify the energy source, examine radiation and viewing conditions, then inspect sampling and the product. Each chapter resolves one part of the decision; derivations and source boundaries remain available.

Use the [exam essentials and question routes](review-remote-sensing.html) for revision; follow the four detailed chapters on a first reading.

</div>
<!-- /earth-reading-task -->

Remote Sensing Principles and Fundamentals

<RsLanguage />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

传感器接收到的是辐射信号，我们希望知道的却是植被、温度、地形或变化。这套资料沿着“目标怎样改变辐射—平台如何安排观测—传感器怎样形成影像”的顺序，建立从观测到解释的联系。前四章对应课程主线，中英文讲解保留同样的定义、公式条件和图像解释。另有[15份原资料在线阅读与下载入口](./remote-sensing-sources.html#rs-sources-materials)，包含第2–9章课件、汇总、三本教材及补充资料；原件范围超出已整理的前四章。

基础要求为高中物理、基本三角关系与初等微积分。首次遇到术语时先理解它描述的是对象、过程、几何量还是物理量，再查看英文名和相近概念。可在每页选择中文、English或双语；配图支持放大，扫描和轨道原图配有分步骤读图说明。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A sensor records radiation, whereas we want information about vegetation, temperature, terrain or change. These notes connect observations to interpretation through the sequence <strong>target–radiation interaction → observing platform → image formation</strong>. The first four chapters preserve the same definitions, assumptions and figure explanations in Chinese and English. The [15 original materials are also available for online reading and download](./remote-sensing-sources.html#rs-sources-materials), including Chapter 2–9 lecture PDFs, the compilation, three textbooks and supplements; their scope extends beyond the four completed chapters.

The prerequisites are basic physics, trigonometry and elementary calculus. When encountering a term, first ask whether it describes an object, a process, geometry or a physical quantity. Select Chinese, English or bilingual reading on each page. Source figures can be enlarged; scanning and orbit figures have step-by-step reading explanations.

</div>

## 按章节建立理解 / Read the four chapters {#rs-course-chapters}

<div class="rs-course-links">
<a class="rs-course-link" href="./remote-sensing-ch1.html"><span>01 · Introduction</span><strong>遥感概述</strong><span>信息链、分类、平台与传感器<br>Workflow, classifications, platforms and sensors</span></a>
<a class="rs-course-link" href="./remote-sensing-ch2.html"><span>02 · Radiation</span><strong>电磁辐射基础</strong><span>辐射量、热辐射、大气与地物光谱<br>Radiometry, thermal radiation, atmosphere and spectra</span></a>
<a class="rs-course-link" href="./remote-sensing-ch3.html"><span>03 · Platforms &amp; orbits</span><strong>平台及运行特点</strong><span>轨道、地面轨迹、重访与观测几何<br>Orbits, ground tracks, revisit and viewing geometry</span></a>
<a class="rs-course-link" href="./remote-sensing-ch4.html"><span>04 · Sensors &amp; imaging</span><strong>传感器及成像原理</strong><span>摆扫、推扫、热红外、SAR与分辨率<br>Whiskbroom, pushbroom, thermal infrared, SAR and resolution</span></a>
</div>

<RsFigure id="workflow" />

## 怎样读图与查概念 / Figures and terminology {#rs-course-reading}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

读扫描图时，把平台前进方向与扫描方向分开；读轨道图时，把卫星绕地运动与地球自转分开；读光谱图时，先看横纵轴、单位和条件，再判断曲线差异。讲义原图与精选英文教材原图均注明来源、页码和适用条件；教材图保留原图号、英文标签与署名。原图的历史参数和旧译名按原语境解释。

前四章全部36个主知识节均有[逐节教材对照与阅读入口](/remote-sensing-sources#rs-sources-crosswalk)，以老师推荐的 *Introduction to Remote Sensing* 第六版核对主线，CCRS教程和赵英时教材补充理解。阅读时先理解正文，再用对应教材小节与原图检查概念、量纲和条件。

可用[双语术语与概念对照](./remote-sensing-glossary.html)比较相近概念，或用[来源、配图与勘误索引](./remote-sensing-sources.html)回查课件。第一章以现有概述整理稿补建；第二至第四章有完整中文课件范围，英文班Lecture编号另做映射。详情见来源页。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

In a scanning diagram, distinguish platform motion from the scan direction. In an orbit diagram, distinguish satellite motion from Earth rotation. In a spectral plot, read the axes, units and conditions before interpreting the curves. Original lecture figures and selected English textbook figures have sources, pages and assumptions. Textbook excerpts retain original figure numbers, English labels and credits. Historical specifications and older terminology are kept in their original context.

All 36 main sections in the four existing chapters have [section-by-section textbook reading links](/remote-sensing-sources#rs-sources-crosswalk). The instructor-recommended sixth edition of *Introduction to Remote Sensing* checks the main concepts; the CCRS tutorial and Zhao textbook supplement them. Read the lesson first, then use the matching textbook section and original figure to check concepts, units and conditions.

Use the [bilingual glossary](./remote-sensing-glossary.html) to compare related concepts and the [sources, figures and errata index](./remote-sensing-sources.html) to locate the original materials. Chapter 1 is reconstructed from the available introductory summary; Chapters 2–4 have full Chinese lecture coverage. English Lecture numbers are mapped separately on the source page.

</div>
