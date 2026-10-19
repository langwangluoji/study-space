---
title: 第一章 遥感概述 · Introduction to Remote Sensing
description: 从能量路径、平台与传感器、分类维度和观测限制理解遥感，提供完整中英文讲解。
prev:
  text: 遥感原理与基础 · Course overview
  link: /course-remote-sensing
next:
  text: 第二章 电磁辐射基础 · Electromagnetic radiation
  link: /remote-sensing-ch2
---

# 第一章 遥感概述 · Introduction to Remote Sensing

<!-- earth-reading-task -->
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

先固定田块，不改变材料。关掉外部照明后，哪些通道还应接收到信号？用这个预测分清反射、热发射与主动探测，再为同一次观测补齐平台、传感器、波段和时间。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Keep the field and its material fixed. If external illumination is removed, which channels should still receive a signal? Use that prediction to separate reflection, thermal emission and active probing, then describe the platform, sensor, band and time of the same observation.

</div>
<!-- /earth-reading-task -->

<RsLanguage />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

本章围绕一个问题展开：<strong>不接触目标，为什么能够获得有关目标的信息？</strong> 学完后，应能解释遥感信息链，区分平台、传感器和探测器，并从平台、能量来源和波段三个维度描述一次观测。遥感的价值在于把物理测量与实际问题连接起来；影像不是目标性质的直接清单。

资料说明：本地《遥感汇总.pdf》从第二章开始，尚缺独立的第一章原始课件。本章依据《2451561_Chatper1_summary.docx》Lecture 1（XML段落4–61）组织概述，并用第二、三章课件补充。该DOCX没有可追溯参考文献表，也未嵌入其所称的Lecture 1截图，因此这里是有来源边界的学习重编，不能视为原始第一章逐页复原。正文逐节对照老师推荐的Campbell等第六版与CCRS教程；讲义图和补充的教材原图分别标明出处、图号或文件页，并配中英文读图说明。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

This chapter asks: <strong>How can we learn about a target without touching it?</strong> By the end, you should be able to explain the remote sensing information chain, distinguish a platform from a sensor and a detector, and describe an observation by platform, energy source and wavelength region. Remote sensing connects physical measurements with practical questions; an image is not a direct inventory of target properties.

Source boundary: the local *遥感汇总.pdf* compilation starts with Chapter 2; a separate original Chapter 1 slide deck is missing. This chapter uses Lecture 1 in *2451561_Chatper1_summary.docx* (XML paragraphs 4–61), supplemented by Chapters 2 and 3. The DOCX has no traceable bibliography and does not contain the Lecture 1 screenshots it claims to use. This is therefore a sourced teaching reconstruction, rather than a page-by-page reproduction of the missing lecture. Every section is cross-checked against the instructor-recommended Campbell et al. sixth edition and the CCRS tutorial. Lecture figures and supplementary textbook originals identify their respective sources, figure numbers or file pages, with bilingual reading notes.

</div>

## 1.1 遥感定义与信息链 · Definition and information chain {#rs1-information-chain}

<!-- textbook-figures-rs1-information-chain:start -->

<RsFigure id="book-ccrs-information-chain" />

<!-- textbook-figures-rs1-information-chain:end -->


<RsFigure id="workflow" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>遥感（remote sensing）</strong>是在不与研究目标直接接触的情况下，通过记录并分析目标产生、反射或散射的信号，获取目标及其环境信息的过程。本课程重点讨论以电磁辐射为媒介的对地观测。定义中的“不接触”指测量设备与目标之间的关系，不要求设备一定在卫星上，也不要求距离达到某个固定数值。田间仪器在叶片上方测量反射光，可以属于近距离感知（proximal sensing）；近距离不等于接触式测量。

Campbell等第六版为本书采用“俯视陆地与水体的电磁影像”这一较窄定义，明确不是普适定义；CCRS教程则也讨论非成像传感器。因此<strong>遥感不等于卫星影像，影像也不等于全部遥感数据</strong>。测距、点式辐射计或沿轨剖面同样可提供不接触目标的观测。本站先用广义定义解释机制，再按课程范围聚焦电磁对地观测。

原图上部画出地球、大气、遥感系统及星上转换与定标，下部依次为地面预处理、视觉或数字信息提取、信息分发与使用；辅助资料从下方接入处理环节。它说明获取观测与提取信息是不同部分，而没有把所有能量来源或地面验证单独画出。结合这幅系统图，一次遥感可进一步解释为五个相互关联的环节。首先，太阳、目标自身或仪器提供能量；其次，能量经过大气，并与目标发生反射、吸收、透射或发射；传感器随后把接收到的辐射转成电信号并记录；数据经定标、定位和必要校正形成可比较的产品；最后，分析者结合物理模型、样本与问题背景完成<strong>影像解译（image interpretation）</strong>。这些环节并不总是严格排成一条单向流水线，例如地面验证可能促使我们重新检查校正与模型；验证是这里补充的解释，并非已添加到讲义原图。

CCRS教材把同一过程拆成七个便于逐项检查的环节；下表把它与讲义原图及本站的五阶段说明对齐。七个名称不是另一套互斥流程，而是把“获取”和“使用”进一步展开。辅助数据、地面验证和误差评估可在处理中反复进入，因此实际工作常有反馈回路。

<!-- rs-concept-table-rs1-workflow -->

| 环节 | English term | 本环节回答的问题与输出 |
| --- | --- | --- |
| 能量源或照明 | Energy source or illumination | 探测能量来自太阳、目标热发射还是仪器主动发射？ |
| 辐射与大气 | Radiation and the atmosphere | 能量沿源—目标和目标—传感器路径怎样被吸收、散射或增加路径辐射？ |
| 与目标相互作用 | Interaction with the target | 目标怎样反射、吸收、透射、发射或散射能量？ |
| 传感器记录 | Recording by the sensor | 哪个波段、方向、时刻和响应范围被转换成观测数据？ |
| 传输、接收与处理 | Transmission, reception and processing | 怎样由遥测记录得到定标、定位并可比较的影像或数据产品？ |
| 解译与分析 | Interpretation and analysis | 怎样结合模型、辅助数据与验证，把观测反演为信息产品？ |
| 应用 | Application | 信息怎样支持制图、监测、评估或决策，适用范围是什么？ |

这里必须区分<strong>数据（data）</strong>与<strong>信息（information）</strong>。某个像元记录的数字、辐亮度或反射率是观测数据；“这片区域是水体”“植被可能缺水”是经过解释得到的信息。水体分类可以综合光谱、形状、位置和时间变化，而不能把单个暗像元直接判为水。云影、山影和深色屋顶也可能很暗，同一水体又可能因悬浮物、太阳耀斑和水深而呈现不同亮度。遥感反演通常是从结果推原因，多个原因可能产生相似结果，需要额外约束。

以植被监测为例，传感器并不直接测出“健康”。它测量选定波段的信号，随后经过校正与模型推断叶面积、叶绿素或其他指标。只有在模型适用条件和验证精度得到说明时，这些指标才具有可靠的解释。<strong>测到什么、推断什么、凭什么推断</strong>，是后面每一章都要保留的三个问题。

[教材对照阅读](/remote-sensing-sources#rs-book-rs1-information-chain)：Campbell等第六版 PDF 43–44页（印刷 4–5页），1.2 Definitions; Table 1.1；CCRS教程 PDF 5–6页（印刷 5–6页），1.1 What is Remote Sensing?。比较教材采用的定义范围；遥感是否一定成像，是否一定来自卫星？

来源：DOCX段落9–24；《第2章.pdf》文件第3–4页；系统组成参照《第3章.pdf》文件第3页；CCRS *Fundamentals of Remote Sensing*文件第5–6页；赵英时等《遥感应用分析原理与方法（第二版）》文件第17–20页；Campbell、Wynne与Thomas *Introduction to Remote Sensing*第六版文件第42–44页用于核对定义边界。各PDF文件页均从1开始计数。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

<strong>Remote sensing (遥感)</strong> obtains information about a target and its environment by recording and analysing signals emitted, reflected or scattered by the target without direct physical contact. This course focuses on Earth observation using electromagnetic radiation. “Without contact” describes the relationship between the measuring equipment and the target. It neither requires a satellite nor specifies a minimum distance. An instrument measuring reflected light above leaves in a field can perform <strong>proximal sensing</strong>; proximity does not imply a contact measurement.

Campbell et al. adopt the narrower scope of electromagnetic images of land and water from an overhead perspective, explicitly without claiming a universal definition; the CCRS tutorial also includes non-imaging sensors. Thus <strong>remote sensing is broader than satellite imagery, and images are only one form of remotely sensed data</strong>. Ranging, point radiometers and along-track profiles can also observe without contact. This site uses the broader definition to explain mechanisms, then focuses on electromagnetic Earth observation for this course.

The upper part of the original figure shows Earth, the atmosphere, the remote sensing system and onboard conversion/calibration. The lower part shows ground preprocessing, visual or digital information extraction, and distribution/use of information; ancillary data enter from below. It separates observation acquisition from information extraction without drawing every energy source or field validation explicitly. Building on this system figure, the process can be explained as five connected stages. The Sun, the target itself or an instrument first supplies energy. The energy travels through the atmosphere and interacts with the target through reflection, absorption, transmission or emission. A sensor converts received radiation into an electrical signal and records it. Calibration, positioning and relevant corrections then produce comparable data products. Finally, an analyst performs <strong>image interpretation (影像解译)</strong> using physical models, samples and knowledge of the problem. These stages are not always a strictly one-way pipeline: field validation can reveal a need to reconsider a correction or model. Validation is part of this explanation; it has not been added to the original figure.

The CCRS textbook separates the same process into seven checkpoints. The table aligns them with the lecture figure and this site's five-stage explanation. They are not a competing workflow; they unfold acquisition and use in more detail. Ancillary data, field validation and error assessment can re-enter processing, so practical work often contains feedback loops.

<!-- rs-concept-table-rs1-workflow -->

| 环节 | English term | Question and output |
| --- | --- | --- |
| 能量源或照明 | Energy source or illumination | Does probing energy come from the Sun, target emission or active transmission? |
| 辐射与大气 | Radiation and the atmosphere | How do the source–target and target–sensor paths absorb, scatter or add path radiance? |
| 与目标相互作用 | Interaction with the target | How does the target reflect, absorb, transmit, emit or scatter energy? |
| 传感器记录 | Recording by the sensor | Which bands, directions, times and response ranges become observations? |
| 传输、接收与处理 | Transmission, reception and processing | How do telemetry records become calibrated, located and comparable image/data products? |
| 解译与分析 | Interpretation and analysis | How do models, ancillary data and validation turn observations into information products? |
| 应用 | Application | How does information support mapping, monitoring, assessment or decisions, and within what limits? |

Distinguish <strong>data</strong> from <strong>information</strong>. A pixel's digital value, radiance or reflectance is observational data; “this area is water” or “the vegetation may be water stressed” is an interpretation. Water classification can use spectra, shape, location and changes over time. A single dark pixel is insufficient, because cloud shadows, mountain shadows and dark roofs can also be dark. Water itself varies with suspended material, sun glint and depth. Remote sensing retrieval commonly works backwards from effects to causes. Several causes may produce similar effects, so additional constraints are needed.

For vegetation monitoring, a sensor does not directly measure “health”. It measures signals in selected bands, after which corrections and models estimate leaf area, chlorophyll or other indicators. Such indicators become reliable interpretations only when model applicability and validation accuracy are stated. The recurring questions are <strong>what was measured, what was inferred, and what supports that inference</strong>.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs1-information-chain): Campbell et al., sixth edition, PDF pp. 43–44 (printed pp. 4–5), 1.2 Definitions; Table 1.1; CCRS tutorial, PDF pp. 5–6 (printed pp. 5–6), 1.1 What is Remote Sensing?. Compare the scopes of the definitions: must remote sensing form images or use satellites?

Sources: DOCX paragraphs 9–24; *第2章.pdf*, file pages 3–4; observing-system structure in *第3章.pdf*, file page 3; CCRS *Fundamentals of Remote Sensing*, file pages 5–6; Zhao et al., *Principles and Methods of Remote Sensing Application Analysis*, second edition, file pages 17–20; and Campbell, Wynne and Thomas, *Introduction to Remote Sensing*, sixth edition, file pages 42–44, for the scope of the definition. PDF file pages throughout this course are counted from 1.

</div>

## 1.2 平台、传感器与探测器 · Platform, sensor and detector {#rs1-platform-sensor}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>遥感平台（platform）</strong>是承载观测设备的载体；<strong>传感器（sensor）</strong>是完成辐射测量并产生观测数据的系统；<strong>探测器（detector）</strong>是其中把入射辐射转成可记录信号的元件。三者位于不同层级。卫星可以提供轨道、姿态控制、供电、通信和热控，搭载的传感器负责具体观测，传感器内的探测器负责信号转换。同一卫星可搭载多个传感器，同一传感器也可能包含多个探测器或线阵列。

例如，描述一次观测时，“卫星”回答设备由什么承载，“多光谱成像仪”回答用什么测量，“探测器阵列”回答内部如何把光转成信号。卫星名字本身不能完整说明数据能力，还必须知道载荷、波段、工作模式和产品。把传感器说成“平台”，会掩盖为什么同一个航天器既能获取不同波段，也能执行不同任务。

平台按位置和运行环境可分为地基、航空和航天。地基设备易与现场测量配合，适合连续监测局部目标及验证卫星产品，但视域和代表性有限；飞机、无人机等航空平台可灵活安排高度、航线和时间，适合精细区域测绘，却受续航、天气、飞行条件与观测几何限制；航天平台覆盖范围较大，适合长期一致观测，但何时看见某处、观察角度怎样变化，受轨道与成像调度共同约束。

平台高度会影响地面覆盖与投影尺度，但不能单凭“飞得更低”保证影像更清晰。还要考虑光学系统、探测器角视场、采样、运动和噪声。同样，稳定的轨道不自动意味着稳定的朝向：<strong>位置说明在哪里，姿态说明朝向哪里</strong>。[第三章](/remote-sensing-ch3)展开平台与轨道，[第四章](/remote-sensing-ch4)展开探测器与成像机制。

[教材对照阅读](/remote-sensing-sources#rs-book-rs1-platform-sensor)：Campbell等第六版 PDF 93–94页（印刷 54–55页），3.1 Introduction; 3.2 Platforms；CCRS教程 PDF 34–35页（印刷 34–35页），2.1 On the Ground, In the Air, In Space。按平台、传感器、探测器三个层级描述同一次观测。

来源：DOCX段落25–36；《第3章.pdf》文件第3–8页；传感器内部结构参照《第4章.pdf》文件第3–4页。


<!-- rs-concept-table-rs1-platform-sensor -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 平台 | Platform | 承载与提供位置、姿态和供电；例：Landsat8。 |
| 传感器 | Sensor | 测量辐射的系统；例：OLI/TIRS，不能与卫星名混用。 |
| 探测器 | Detector | 传感器内部将辐射转为可记录信号的元件。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>platform (遥感平台)</strong> carries observing equipment; a <strong>sensor (传感器)</strong> is the measurement system that produces observations; a <strong>detector (探测器)</strong> is a component that converts incoming radiation into a recordable signal. They occupy different levels of the system. A satellite can provide orbit, attitude control, power, communications and thermal control. Its sensors make particular measurements, and their detectors perform signal conversion. One spacecraft can carry several sensors, and a sensor can contain many detectors or detector arrays.

In an observation description, “satellite” answers what carries the equipment; “multispectral imager” answers what performs the measurement; “detector array” explains how light is converted into signals inside it. A satellite name alone does not specify data capabilities: the payload, bands, operating mode and product are also needed. Calling a sensor a platform obscures why one spacecraft can observe several wavelength regions and serve different tasks.

Platforms can be ground-based, airborne or spaceborne. Ground-based equipment is readily paired with field measurements and is useful for continuous local monitoring and satellite-product validation, but its field of view and representativeness are limited. Aircraft and unmanned aerial vehicles allow flexible height, flight path and timing for detailed regional mapping, subject to endurance, weather, flight conditions and viewing geometry. Spaceborne systems offer broad coverage and consistent long-term observations. Their orbit and acquisition scheduling jointly constrain when and at what angle a location can be observed.

Height affects coverage and ground projection, but “flying lower” alone does not guarantee a sharper image. Optics, detector angular field of view, sampling, motion and noise also matter. Likewise, a stable orbit does not imply a fixed pointing direction: <strong>position describes where the platform is; attitude describes where it points</strong>. [Chapter 3](/remote-sensing-ch3) develops platforms and orbits, while [Chapter 4](/remote-sensing-ch4) explains detectors and imaging.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs1-platform-sensor): Campbell et al., sixth edition, PDF pp. 93–94 (printed pp. 54–55), 3.1 Introduction; 3.2 Platforms; CCRS tutorial, PDF pp. 34–35 (printed pp. 34–35), 2.1 On the Ground, In the Air, In Space. Describe one observation at the platform, sensor and detector levels.

Sources: DOCX paragraphs 25–36; *第3章.pdf*, file pages 3–8; sensor components in *第4章.pdf*, file pages 3–4.


<!-- rs-concept-table-rs1-platform-sensor -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 平台 | Platform | Carries equipment and supplies position, attitude and power; e.g. Landsat 8. |
| 传感器 | Sensor | Radiation-measuring system, e.g. OLI/TIRS; different from the satellite name. |
| 探测器 | Detector | Internal component converting radiation into a recordable signal. |

</div>

## 1.3 不同分类维度与三种能量路径 · Classification dimensions and three energy paths {#rs1-energy-paths}

<!-- anatomy-R1 -->
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

先做一个可检验的判断：关掉太阳照明后，哪一路读数还应存在？观察光从哪个真实部件出发。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Turn off the external lamp first. Predict which measurement survives, then follow where its energy originates.

</div>

<AnatomyFigure src="/anatomy/earth-observation/remote-sensing.html?mode=energy" title="这次测量的能量从哪里来？" title-en="An energy budget for the same field" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

分类现在来自能量路径，而不是卫星名字。下一章追踪进入接收镜头的量，到底是功率、辐照度还是辐亮度。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A source classification follows the actual energy path. It does not follow a satellite name or guarantee weather independence.

</div>
<!-- /anatomy-R1 -->

<RsFigure id="energy-balance" />

<RsFigure id="solar-source" />

<RsFigure id="active-source" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>主动遥感（active remote sensing）</strong>由系统发射用于探测的能量，再测量目标返回的信号；<strong>被动遥感（passive remote sensing）</strong>接收自然存在的辐射。主动与被动按探测能量的来源区分，不按有没有电源区分：被动仪器本身也需要供电，不按白天与夜间区分：被动热红外仪器可以在夜间接收地物热发射。

这三幅原图各说明一个侧面：第21页的I、R、T、A分别标入射、反射、透射与吸收，说明能量遇到叶片后的分配；第24页比较太阳黑体近似与经过大气后的太阳辐射，说明自然照明来源；第25页画出仪器发射及目标向多个方向散射，说明人工探测能量与返回信号。结合原图及热发射概念，需要区分三条观测路径，原图没有把三条完整路径集中画在一起。第一条是<strong>太阳→目标→传感器</strong>：可见光与近红外观测常以反射太阳光为主，因而有明显的照明条件限制。第二条是<strong>目标自身→传感器</strong>：热红外和被动微波观测利用自然热发射，温度、发射率及大气共同影响信号。第三条是<strong>仪器发射→目标→返回仪器</strong>：雷达或激光雷达利用自己提供的探测能量，可获取后向散射或传播时间等观测。这里的“返回”不是所有方向反射能量的总和，而是进入接收系统的部分。

平台类型、主动/被动、波段和是否成像是独立的分类维度。例如，一次观测可以同时是“航天平台、主动、微波、成像”；另一次可以是“航空平台、被动、热红外、成像”。不能把“卫星”“主动”“微波”排成彼此排斥的一列。微波包含主动雷达和被动辐射计；光学也包含主动激光系统。摄影、扫描和雷达成像又是在讨论成像机制，详细区别留到第四章。

原笔记将主动系统概括为“全天候”，需补充条件。主动发射确实减少对太阳照明的依赖，但能否穿过云、雨或雾，取决于波长、介质和系统性能。激光雷达常受云雾阻挡；微波雷达对某些云况较不敏感，却不是在所有频率、降雨强度和任务条件下都不受天气影响。<strong>能量来源不能替代天气适用性判断。</strong>

[教材对照阅读](/remote-sensing-sources#rs-book-rs1-energy-paths)：Campbell等第六版 PDF 88–89页（印刷 49–50页），2.7 Summary; Figures 2.20–2.22；CCRS教程 PDF 19页（印刷 19页），1.6 Passive vs. Active Sensing。沿三种能量路径辨认源、目标与传感器，再判断昼夜与天气条件。

来源：DOCX段落53–60；《第2章.pdf》文件第24–25页；《遥感原理与应用笔记.pdf》文件第1页（主动/被动及近距离感知表述已按上述条件规范）。


<!-- rs-concept-table-rs1-energy-paths -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 主动遥感 | Active sensing | 系统发射探测能量并接收回波；雷达/激光雷达；不一概全天候。 |
| 被动反射观测 | Passive reflective sensing | 接收反射太阳辐射；受太阳照明和大气影响。 |
| 被动热辐射观测 | Passive thermal sensing | 接收目标热发射；TIR/被动微波可夜间工作，仍受系统和路径影响。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

<strong>Active remote sensing (主动遥感)</strong> transmits probing energy and measures the signal returned from a target. <strong>Passive remote sensing (被动遥感)</strong> receives naturally available radiation. The distinction concerns the source of probing energy, not whether an instrument needs electricity: passive instruments also need power. It is also independent of day or night: a passive thermal infrared instrument can receive terrestrial thermal emission at night.

The three original figures show different aspects. On page 21, I, R, T and A denote incident, reflected, transmitted and absorbed radiation at a leaf. Page 24 compares a solar blackbody approximation with solar radiation after atmospheric passage, illustrating natural illumination. Page 25 shows instrument transmission and scattering in multiple directions, illustrating artificial probing energy and the returning signal. Combining these figures with thermal emission gives three observation paths; the original figures do not draw all three complete paths together. The first is <strong>Sun → target → sensor</strong>. Visible and near-infrared observations commonly rely on reflected sunlight and therefore depend on illumination. The second is <strong>target itself → sensor</strong>. Thermal infrared and passive microwave observations use natural thermal emission, affected by temperature, emissivity and the atmosphere. The third is <strong>instrument transmission → target → instrument reception</strong>. Radar and lidar supply their own probing energy and measure quantities such as backscatter or travel time. The returning signal is the part that reaches the receiving system, rather than all energy reflected into every direction.

Platform, active/passive operation, wavelength region and imaging/non-imaging operation are independent classification dimensions. One observation can be “spaceborne, active, microwave and imaging”; another can be “airborne, passive, thermal infrared and imaging”. Satellite, active and microwave must not be placed in a list of mutually exclusive categories. Microwave systems include active radars and passive radiometers; optical systems can include active lasers. Photography, scanning and radar imaging describe imaging mechanisms, developed in Chapter 4.

The notes describe active systems broadly as “all-weather”; that needs qualification. Active transmission reduces dependence on sunlight, but penetration through cloud, rain or fog depends on wavelength, the medium and system performance. Lidar is often obstructed by cloud or fog. Microwave radar is less sensitive to some cloud conditions, but is not unaffected by weather at every frequency, rain intensity or operating condition. <strong>Energy-source classification cannot substitute for an assessment of weather suitability.</strong>

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs1-energy-paths): Campbell et al., sixth edition, PDF pp. 88–89 (printed pp. 49–50), 2.7 Summary; Figures 2.20–2.22; CCRS tutorial, PDF pp. 19 (printed pp. 19), 1.6 Passive vs. Active Sensing. Follow the three energy paths to identify source, target and sensor, then assess day/night and weather conditions.

Sources: DOCX paragraphs 53–60; *第2章.pdf*, file pages 24–25; *遥感原理与应用笔记.pdf*, file page 1, with the active/passive and proximal-sensing statements qualified as above.


<!-- rs-concept-table-rs1-energy-paths -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 主动遥感 | Active sensing | Supplies probing energy and receives returns; radar/lidar; not universally all-weather. |
| 被动反射观测 | Passive reflective sensing | Receives reflected sunlight; affected by illumination and atmosphere. |
| 被动热辐射观测 | Passive thermal sensing | Receives thermal emission; TIR/passive microwave can work at night, with system/path constraints. |

</div>

## 1.4 波段为什么服务于不同任务 · Why wavelength regions serve different tasks {#rs1-bands-applications}

<RsFigure id="spectrum" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>电磁波谱（electromagnetic spectrum）</strong>按波长或频率排列电磁辐射。“波段（band）”可指一段波谱区域，也可指仪器实际接收的有限区间，阅读时必须说明是哪一种。本章先把波段与任务连接起来，[第二章](/remote-sensing-ch2#rs2-spectrum)再定义单位与物理规律。上图表示波段的大致位置，不是某台仪器的精确光谱响应曲线；边界是课程中的常用约定。

可见光让我们利用地物反射与颜色差异观察陆地、水和云；近红外（near infrared, NIR）常帮助区分植被、水体与其他地表；短波红外（shortwave infrared, SWIR）对含水量及某些材料吸收特征有用。这些用途来自地物与波长有关的响应，但响应还随背景和几何改变。植被在近红外较亮，一般是在反射太阳光，不能据此断言它比水更热。

热红外（thermal infrared, TIR）主要用于观察热发射，可支持火灾检测、地表温度和热环境研究。然而传感器接收的热信号同时受温度、发射率、反射下行辐射及大气影响。影像中更亮不必等于实际温度更高，显示色带也不是目标真实颜色。笔记中的“800–1400 nm热红外窗口”有单位与数量级问题：它等于0.8–1.4 μm，不能当作通常讨论的8–14 μm热红外窗口。

微波（microwave）波长比热红外长。主动雷达可利用后向散射对粗糙度、结构与介电性质的响应，支持洪水、海面、地形与形变相关研究；被动微波则测量自然微波辐射，可用于土壤水分等任务。具体可观测性仍取决于频率、极化、空间尺度与模型。不能因为一个波段对水分敏感，就认为它只测量水分。

任务选择可以从问题倒推。海岸线变化需要可比较的空间定位，并注意潮位与水体状态；植被变化需要合适的光谱信息与季节参照；火灾需要热异常及足够及时的观测。一个任务常组合多个波段、多个日期，甚至不同传感器。<strong>空间细节、光谱区分、辐射灵敏度和观测频率</strong>是互相配合的能力，第四章会给出四类分辨率的精确定义。

[教材对照阅读](/remote-sensing-sources#rs-book-rs1-bands-applications)：Campbell等第六版 PDF 67–70页（印刷 28–31页），2.3 Major Divisions of the Electromagnetic Spectrum；CCRS教程 PDF 9–11, 17–18页（印刷 9–11, 17–18页），1.3 The Electromagnetic Spectrum; 1.5 Radiation–Target Interactions。从任务倒推波段；检查教材范围的单位和命名约定。

来源：DOCX段落37–52；《第2章.pdf》文件第17–20、37–45、65–99页；笔记文件第1页的热红外单位已勘误。


<!-- rs-concept-table-rs1-bands-applications -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 可见光/近红外 | VIS/NIR | 常见地表太阳反射观测；植被近红外亮不表示更热。 |
| 热红外 | TIR | 常用窗口约3–5和8–14 μm；与温度、发射率及路径有关。 |
| 微波 | Microwave | 既有主动雷达也有被动辐射计；波段不决定能量来源分类。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The <strong>electromagnetic spectrum (电磁波谱)</strong> orders radiation by wavelength or frequency. A <strong>band</strong> may mean a broad spectral region or an instrument's actual finite reception interval; the intended meaning must be stated. Here we connect wavelength regions with tasks; [Chapter 2](/remote-sensing-ch2#rs2-spectrum) develops units and physical laws. The diagram shows approximate spectral positions, not the exact response function of a particular instrument. Its boundaries follow common course conventions.

Visible observations use differences in reflection and colour to study land, water and clouds. <strong>Near infrared (NIR)</strong> commonly helps distinguish vegetation, water and other surfaces. <strong>Shortwave infrared (SWIR)</strong> is useful for moisture-related and material absorption features. These applications depend on wavelength-dependent target responses, but background and viewing geometry also change the response. Vegetation that is bright in NIR is generally reflecting sunlight; that brightness does not show that it is hotter than water.

<strong>Thermal infrared (TIR)</strong> primarily observes thermal emission and supports fire detection, land-surface temperature retrieval and thermal-environment studies. Received thermal signals depend jointly on temperature, emissivity, reflected downwelling radiation and atmospheric effects. A brighter displayed pixel does not necessarily have a higher actual temperature, and a display colour scale is not the target's true colour. The notes' “800–1400 nm thermal infrared window” contains a unit and scale error: that interval is 0.8–1.4 μm, not the commonly discussed 8–14 μm thermal infrared window.

<strong>Microwave</strong> wavelengths are longer than thermal infrared wavelengths. Active radar uses backscatter responses to roughness, structure and dielectric properties for applications involving flooding, the sea surface, terrain and deformation. Passive microwave systems measure natural microwave emission and can support applications such as soil-moisture estimation. Observability still depends on frequency, polarization, spatial scale and the model. Sensitivity to moisture does not mean that a band measures only moisture.

Choose measurements by working backwards from the question. Coastline-change analysis needs comparable positioning and attention to tides and water conditions; vegetation-change analysis needs suitable spectral information and seasonal references; fire detection needs thermal anomalies and timely observations. A task often combines bands, dates and even sensors. <strong>Spatial detail, spectral discrimination, radiometric sensitivity and observation frequency</strong> work together. Chapter 4 defines these four resolution dimensions precisely.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs1-bands-applications): Campbell et al., sixth edition, PDF pp. 67–70 (printed pp. 28–31), 2.3 Major Divisions of the Electromagnetic Spectrum; CCRS tutorial, PDF pp. 9–11, 17–18 (printed pp. 9–11, 17–18), 1.3 The Electromagnetic Spectrum; 1.5 Radiation–Target Interactions. Work backwards from a task to its bands, checking units and naming conventions.

Sources: DOCX paragraphs 37–52; *第2章.pdf*, file pages 17–20, 37–45 and 65–99; the thermal-infrared units on notes file page 1 are corrected here.


<!-- rs-concept-table-rs1-bands-applications -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 可见光/近红外 | VIS/NIR | Often solar-reflective surface observations; bright NIR vegetation does not imply higher temperature. |
| 热红外 | TIR | Common windows around 3–5 and 8–14 μm; depends on temperature, emissivity and path. |
| 微波 | Microwave | Includes radar and passive radiometers; wavelength does not determine active/passive class. |

</div>

## 1.5 观测限制与可信解释 · Observation limits and defensible interpretation {#rs1-observation-limits}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

遥感能大范围、重复地观测，却不能消除物理限制。对于反射太阳光的被动观测，夜间缺少相应照明，云可能阻断地表信号，薄雾与大气散射还可能改变影像；热红外虽可夜间观测，云与大气吸收仍有影响；微波的适用条件又与频率、降雨和地表性质有关。因此，“卫星经过了”“传感器成像了”和“得到可用于该问题的有效观测”是三个不同判断。

另一个限制来自尺度。一个地面采样位置可能覆盖多种材料，测得信号反映它们在实际响应范围内的综合贡献；但不能反过来断言每个像元必然都是混合像元。较细的格网也不自动提供较细的真实信息，将影像插值放大只增加显示或输出样本，并不会恢复原先未被测到的细节。分辨率和观测几何需要在传感器与产品层级分别说明。

时间比较还要控制可比性。两个日期的植被反射差异，可能来自生长变化，也可能来自太阳角度、观测方向、大气、土壤背景或传感器差异。海岸线位置不同可能包含潮位影响。可信的结论应说明使用哪些数据、进行了哪些校正、哪些因素仍不确定，以及地面资料是否支持解释。地面验证本身也有尺度与时间匹配问题，不能因有少量现场点就推断全区准确。

| 证据层级 | English term | 本层可支持什么，仍需什么 |
| --- | --- | --- |
| 仪器观测 | Measurement | 波段信号、位置与时刻；需定标和质量标识。 |
| 属性反演 | Retrieval | 反射率、温度或其他物理属性；需模型、条件与不确定度。 |
| 主题解释 | Interpretation | 类别、过程或变化判断；需独立验证与时空背景。 |
| 应用决策 | Decision support | 任务所需结论；需说明误差对实际决策的影响。 |

读影像时，可用一个连续顺序组织解释：先确认平台、传感器、时间与产品；再识别测量量和波段；然后检查大气、几何与尺度；最后结合任务所需证据作出结论。这正是前四章的学习路线：第二章回答辐射如何携带信息，第三章回答从何处与何时观测，第四章回答仪器怎样采样、成像与记录。术语可在[双语术语页](/remote-sensing-glossary)查阅，原资料范围和勘误在[来源索引](/remote-sensing-sources)集中记录。

[教材对照阅读](/remote-sensing-sources#rs-book-rs1-observation-limits)：Campbell等第六版 PDF 76–77, 86–87页（印刷 37–38, 47–48页），2.5 Effects of Scattering; 2.6 Spectral Properties of Objects；CCRS教程 PDF 39–44页（印刷 39–44页），2.3–2.6 Spatial, Spectral, Radiometric and Temporal Resolution。检查尺度、信号与观测频率，区分获取数据和形成可信结论。

来源：DOCX段落9–24、37–60的流程与用途重编；观测条件参照《第2章.pdf》文件第46–64页；尺度与分辨率参照笔记文件第4–7页。以上限制是对课程定义的综合解释，并非将第一章缺失课件补称为已核实原文。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Remote sensing enables broad and repeated observations without removing physical limits. Passive reflected-sunlight observations lack the relevant illumination at night. Clouds may block surface signals, while haze and atmospheric scattering can modify imagery. Thermal infrared can operate at night but is still affected by cloud and atmospheric absorption. Microwave suitability depends on frequency, rainfall and surface properties. Thus <strong>a satellite passing overhead, a sensor acquiring data, and an observation being useful for a particular question</strong> are different events.

Scale imposes another limit. One ground sample can cover several materials, and its measurement combines their contributions within the actual spatial response. This does not imply that every pixel must be mixed. A finer output grid does not automatically provide finer real information: interpolation adds display or output samples without recovering details that were never measured. Resolution and viewing geometry must be described at both the instrument and product levels.

Comparisons over time also require comparability. A vegetation-reflectance change between two dates may reflect growth, but it can also reflect solar angle, viewing direction, atmosphere, soil background or sensor differences. A coastline-position change can include tidal effects. A defensible conclusion identifies the data and corrections, remaining uncertainties, and supporting field evidence. Field validation itself has spatial- and temporal-matching limits; a few field points do not establish accuracy across an entire region.

| Evidence level | 中文术语 | What it supports and what is still needed |
| --- | --- | --- |
| Measurement | 仪器观测 | Band signals, position and time; requires calibration and quality flags. |
| Retrieval | 属性反演 | Reflectance, temperature or other physical properties; requires a model, conditions and uncertainty. |
| Interpretation | 主题解释 | Classes, processes or changes; requires independent validation and spatial/temporal context. |
| Decision support | 应用决策 | Task-specific conclusions; requires assessment of how errors affect decisions. |

Organise interpretation in a connected sequence: identify the platform, sensor, date and product; determine the measured quantity and bands; inspect atmospheric, geometric and scale effects; then draw a conclusion using evidence relevant to the task. This sequence also defines the first four chapters: Chapter 2 explains how radiation carries information, Chapter 3 explains where and when observations occur, and Chapter 4 explains how instruments sample, image and record it. The [bilingual glossary](/remote-sensing-glossary) provides terminology, while the [source index](/remote-sensing-sources) records material coverage and corrections.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs1-observation-limits): Campbell et al., sixth edition, PDF pp. 76–77, 86–87 (printed pp. 37–38, 47–48), 2.5 Effects of Scattering; 2.6 Spectral Properties of Objects; CCRS tutorial, PDF pp. 39–44 (printed pp. 39–44), 2.3–2.6 Spatial, Spectral, Radiometric and Temporal Resolution. Check scale, signal and observation frequency; distinguish acquiring data from establishing a defensible conclusion.

Sources: the workflow and applications in DOCX paragraphs 9–24 and 37–60 are reorganised here; observation conditions in *第2章.pdf*, file pages 46–64; scale and resolution in notes file pages 4–7. These limits synthesize the course definitions; they are not claimed to reproduce a verified missing Chapter 1 slide deck.

</div>
