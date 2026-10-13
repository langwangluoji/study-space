---
title: 第二章 遥感电磁辐射基础 · Electromagnetic Radiation Fundamentals
description: 电磁波、辐射量、黑体定律、亮温、大气与地物光谱的完整双语解释，注明单位、条件和原资料勘误。
prev:
  text: 第一章 遥感概述 · Introduction
  link: /remote-sensing-ch1
next:
  text: 第三章 平台与轨道 · Platforms and orbits
  link: /remote-sensing-ch3
---

# 第二章 遥感电磁辐射基础 · Electromagnetic Radiation Fundamentals for Remote Sensing

<RsLanguage />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

传感器收到的是辐射，学习者想知道的却是材料、温度或环境状态。两者如何连接？本章先定义波与测量量，再说明辐射产生、传播和地物响应，最后把这些过程连接成解释框架。主来源是《第2章.pdf》99个文件页，与《遥感汇总.pdf》文件第1–99页对应；英文班补充来源为DOCX Lecture 2（XML段落62–388）和《遥感原理与应用笔记.pdf》文件第1–3页。

所有公式使用绝对温度K。波长未特别说明时按SI单位m代入；按μm展示的谱量必须同步转换数值。讲义原图与明确标注来源的教材原图用于解释关系；旧图、定性图与缺少测量条件的曲线不能当作材料的精确测量谱。课件中的错字、单位错误和省略条件在相关概念旁说明。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A sensor receives radiation, but a learner wants to understand materials, temperature or environmental conditions. How are they connected? This chapter first defines waves and measurement quantities, then develops radiation production, propagation and target response, and finally connects these processes into an interpretation framework. The main source is the 99-file-page *第2章.pdf*, corresponding to file pages 1–99 of *遥感汇总.pdf*. English-class supplements are DOCX Lecture 2 (XML paragraphs 62–388) and *遥感原理与应用笔记.pdf*, file pages 1–3.

Temperatures in the equations are absolute temperatures in kelvins. Unless stated otherwise, wavelengths entered into SI equations are in metres. Spectral quantities displayed per micrometre require a corresponding numerical conversion. Original lecture and explicitly sourced textbook figures explain relationships; historical or qualitative curves without stated measurement conditions are not precise measured spectra. Source typos, unit errors and omitted conditions are explained beside the relevant concepts.

</div>

## 2.1 电磁波与波动属性 · Electromagnetic waves and wave behaviour {#rs2-wave-properties}


<RsFigure id="wave" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>电磁辐射（electromagnetic radiation）</strong>以电场和磁场相互关联的变化传播能量。对于均匀介质中的理想平面横波，电场、磁场与传播方向彼此垂直。<strong>波长</strong>$\lambda$是相邻同相位位置之间的距离，单位m；<strong>频率</strong>$\nu$是单位时间内完成的周期数，单位Hz，即s$^{-1}$；周期为$1/\nu$。真空中有

$$c=\lambda\nu,\qquad c=299\,792\,458\ \mathrm{m\,s^{-1}}.$$

介质中应使用传播相速度$v$，即$v=\lambda\nu$；跨介质传播时频率保持相应边界条件所要求的一致，波长可因折射率改变。常用真空波长描述遥感波谱，不能把真空光速不加说明地当作所有介质中的传播速度。波长短意味着频率高，却不等于某像元记录的总辐射更强。

还要区分<strong>振幅（amplitude）</strong>与<strong>相位（phase）</strong>：振幅描述电磁场振荡的幅度，相位描述周期中的位置。对同一介质中的相干平面波，时间平均能流密度与场振幅的平方有关；场振幅本身不以W m$^{-2}$表示。教材的示意波峰高度可用来理解振幅，不能把它直接当作光谱辐照度。

光的量子描述把能量交换写成光子形式。单个光子的能量记为$q_{\mathrm{ph}}$，避免与稍后表示辐照度的$E$混淆：

$$q_{\mathrm{ph}}=h\nu=\frac{hc}{\lambda},\qquad h=6.62607015\times10^{-34}\ \mathrm{J\,s}.$$

短波长光子的能量较大，辐射通量还取决于单位时间到达的光子数；因此“每个光子更有能量”不能推出“仪器收到的功率更大”。波动与光子描述用于解释不同现象，不能视为两种互斥的辐射。

<strong>叠加（superposition）</strong>是线性介质中场的相加，不是直接把所有强度相加。具有稳定相位关系的波可发生<strong>干涉（interference）</strong>，增强或减弱取决于相位差；缺乏相干性时，长时间平均通常抹去稳定条纹。SAR利用相干处理，InSAR进一步利用不同观测的相位差，详见[第四章](/remote-sensing-ch4)。<strong>衍射（diffraction）</strong>是波在有限孔径或障碍附近的传播展开，限制光学系统能分开的细节；较小像元不能消除衍射限制。

<strong>偏振（polarization）</strong>描述电场振动的方向与轨迹。线偏振、圆偏振与椭圆偏振属于偏振状态；雷达中的HH、VV、HV、VH分别说明发射和接收通道的极化组合，不是波长分类。<strong>多普勒效应（Doppler effect）</strong>指相对运动引起接收频率变化，可为运动测量和SAR方位处理提供信息。其大小依速度在视线方向的分量与传播几何而变，不能只凭目标是否运动判断相同频移。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-wave-properties)：Campbell等第六版 PDF 64–66, 70–71, 85–86页（印刷 25–27, 31–32, 46–47页），2.2 The Electromagnetic Spectrum; 2.4 Radiation Laws; 2.6 Polarization；CCRS教程 PDF 7–8页（印刷 7–8页），1.2 Electromagnetic Radiation。比较波长、频率、振幅与相位；哪个属性描述光子能量，哪个影响相干干涉？

来源：《第2章.pdf》文件第5–16页；DOCX Lecture 2波动与光子部分。这里统一使用$\nu$表示频率，部分资料用$f$，两者可表示同一物理量。


<!-- rs-concept-table-rs2-wave-properties -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 波长 λ | Wavelength | 同相位空间间隔，m；真空 c=λν。 |
| 频率 ν | Frequency | 每秒周期数，Hz；不是辐射强度。 |
| 振幅 / 相位 | Amplitude / phase | 场振荡幅度 / 周期位置；场振幅不是瓦数，稳定相位关系决定干涉。 |
| 干涉/衍射/偏振 | Interference/diffraction/polarization | 相位叠加、有限孔径传播、电场方向分别描述不同波动属性。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

<strong>Electromagnetic radiation (电磁辐射)</strong> transports energy through coupled variations of electric and magnetic fields. For an ideal transverse plane wave in a homogeneous medium, the electric field, magnetic field and propagation direction are mutually perpendicular. <strong>Wavelength</strong> $\lambda$ is the distance between neighbouring points with the same phase, in metres. <strong>Frequency</strong> $\nu$ is the number of cycles per second, in hertz or s$^{-1}$; the period is $1/\nu$. In vacuum,

$$c=\lambda\nu,\qquad c=299\,792\,458\ \mathrm{m\,s^{-1}}.$$

In a medium, use the phase velocity $v$, so that $v=\lambda\nu$. Frequency remains consistent with the boundary conditions across a stationary interface, while wavelength can change with refractive index. Remote sensing spectra are commonly described using vacuum wavelength. The vacuum speed of light must not be silently applied to every medium. A shorter wavelength means a higher frequency, not necessarily more total radiation in a pixel measurement.

Also distinguish <strong>amplitude (振幅)</strong> from <strong>phase (相位)</strong>: amplitude describes the magnitude of field oscillation, while phase identifies a position within the cycle. For a coherent plane wave in the same medium, time-averaged energy flux density is related to squared field amplitude; field amplitude itself is not measured in W m$^{-2}$. The textbook wave height illustrates amplitude, rather than directly specifying spectral irradiance.

The quantum description expresses energy exchange in photons. We write the energy of one photon as $q_{\mathrm{ph}}$ to avoid conflict with irradiance $E$, introduced below:

$$q_{\mathrm{ph}}=h\nu=\frac{hc}{\lambda},\qquad h=6.62607015\times10^{-34}\ \mathrm{J\,s}.$$

A shorter-wavelength photon carries more energy, but radiant flux also depends on the number of arriving photons per unit time. More energy per photon therefore does not imply more received power. Wave and photon descriptions explain different phenomena; they are not mutually exclusive types of radiation.

<strong>Superposition</strong> adds fields in a linear medium, rather than simply adding every intensity. Waves with a stable phase relationship can produce <strong>interference</strong>, with reinforcement or cancellation depending on phase difference. Without coherence, long-time averaging usually removes stable fringes. SAR uses coherent processing, and InSAR uses phase differences between observations, as developed in [Chapter 4](/remote-sensing-ch4). <strong>Diffraction</strong> describes spreading around finite apertures and obstacles and limits the detail that optical systems can resolve. Smaller pixels cannot remove a diffraction limit.

<strong>Polarization (偏振)</strong> describes the direction and trajectory of electric-field oscillation. Linear, circular and elliptical polarization are states of polarization. Radar HH, VV, HV and VH specify transmitted and received polarization combinations; they are not wavelength classes. The <strong>Doppler effect</strong> is a received-frequency change due to relative motion, useful in motion measurement and SAR azimuth processing. Its magnitude depends on the line-of-sight velocity component and propagation geometry. Moving targets do not all produce the same shift.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-wave-properties): Campbell et al., sixth edition, PDF pp. 64–66, 70–71, 85–86 (printed pp. 25–27, 31–32, 46–47), 2.2 The Electromagnetic Spectrum; 2.4 Radiation Laws; 2.6 Polarization; CCRS tutorial, PDF pp. 7–8 (printed pp. 7–8), 1.2 Electromagnetic Radiation. Compare wavelength, frequency, amplitude and phase: which describes photon energy, and which governs coherent interference?

Sources: *第2章.pdf*, file pages 5–16; the wave and photon material in DOCX Lecture 2. Frequency is consistently written $\nu$ here; some sources use $f$ for the same quantity.


<!-- rs-concept-table-rs2-wave-properties -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 波长 λ | Wavelength | Spatial separation of equal phase, m; c=λν in vacuum. |
| 频率 ν | Frequency | Cycles per second, Hz; not radiation intensity. |
| 振幅 / 相位 | Amplitude / phase | Field oscillation magnitude / cycle position; field amplitude is not wattage, and stable phase relationships govern interference. |
| 干涉/衍射/偏振 | Interference/diffraction/polarization | Phase superposition, finite-aperture propagation and electric-field orientation are distinct properties. |

</div>

## 2.2 波谱、单位与仪器波段 · Spectrum, units and instrument bands {#rs2-spectrum}

<RsFigure id="spectrum" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

把不同波长连续排列，就是<strong>电磁波谱</strong>。遥感常用nm、μm、mm和cm表示不同区间，先做单位换算再判断物理意义：$1\ \mathrm{\mu m}=10^{-6}\ \mathrm{m}=1000\ \mathrm{nm}$，$1\ \mathrm{mm}=1000\ \mathrm{\mu m}$。下表使用便于本课程讨论的近似范围；不同学科、仪器和教材的命名边界可能不同，不应把约定边界当成物理过程突然改变的界面。

| 常用区域 | 本章采用的近似区间 | 典型观测联系 |
| --- | --- | --- |
| 可见光 visible | 0.4–0.7 μm | 反射太阳光、颜色和大气散射 |
| 近红外 near infrared, NIR | 0.7–1.3 μm | 植被结构与水体对比 |
| 短波红外 shortwave infrared, SWIR | 1.3–3 μm | 水分和材料吸收特征 |
| 中波红外 midwave infrared, MWIR | 3–5 μm | 热目标；日间可能混有太阳反射 |
| 长波/热红外常用窗口 | 8–14 μm | 地表热发射；窗口并非处处等透射 |
| 微波 microwave | 约1 mm–1 m | 雷达后向散射和自然微波辐射 |

表中8–14 μm是常见地表热遥感窗口表述，不是全部红外或全部热辐射的定义。热物体也可在其他波长发射，热红外仪器常在该范围内选取更窄的实际波段，避开特定吸收。笔记中的800–1400 nm应理解为0.8–1.4 μm，不能替代8–14 μm；课件维恩常数的mm/μm错误也说明单位必须与数字一起检查。

| 概念 | English term | 决定因素与可比较条件 |
| --- | --- | --- |
| 波谱区域 | Spectral region | 波长命名约定；不同教材边界可不同。 |
| 大气窗口 | Atmospheric window | 给定路径与大气状态下相对高透射；不是仪器规格。 |
| 仪器波段 | Instrument band | 实际光谱响应函数；相同区域名称不保证相同测量。 |

Campbell第六版PDF第68、70页的微波范围正文有μm与m/mm混写；本章采用约1 mm–1 m的入门范围，并以实际仪器频率或波长为准。其表2.3与其他教程使用的命名界限不同，不能据此把近红外与短波红外边界理解成物理突变。

再区分三个问题：<strong>波谱区域</strong>给波长区间命名，<strong>大气窗口</strong>描述特定路径上大气透射较好的区间，<strong>仪器波段</strong>由仪器响应函数决定。三者并不等同。仪器的“中心波长”只是摘要信息，实际测量往往按光谱响应$R_i(\lambda)$对一个区间内的辐亮度加权。例如可定义归一化的波段平均辐亮度

$$\overline{L}_i=\frac{\int R_i(\lambda)L_\lambda\,\mathrm{d}\lambda}{\int R_i(\lambda)\,\mathrm{d}\lambda}.$$

此式约定响应的定义和积分单位一致，所得平均量沿用$L_\lambda$的光谱单位；它不同于对波长积分后的总辐亮度。真实产品还需遵循相应仪器与定标元数据。两个仪器即使都称“近红外”，响应曲线不同，也可能对同一目标给出不同观测。光谱分辨率则涉及能区分多细的光谱结构，不能只数波段个数。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-spectrum)：Campbell等第六版 PDF 66–70页（印刷 27–31页），2.2 The Electromagnetic Spectrum; 2.3 Major Divisions; Tables 2.1–2.3；CCRS教程 PDF 9–11, 41–42页（印刷 9–11, 41–42页），1.3 The Electromagnetic Spectrum; 2.4 Spectral Resolution。区分命名区间、透射窗口与仪器响应；注意教材正文的微波单位勘误。

来源：《第2章.pdf》文件第17–25、61–64页；笔记文件第1页。仪器响应积分为帮助连接光谱量与测量的教学补充。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The <strong>electromagnetic spectrum</strong> arranges wavelengths continuously. Remote sensing uses nm, μm, mm and cm in different regions. Convert units before interpreting a number: $1\ \mathrm{\mu m}=10^{-6}\ \mathrm{m}=1000\ \mathrm{nm}$ and $1\ \mathrm{mm}=1000\ \mathrm{\mu m}$. The table uses approximate ranges convenient for this course. Naming boundaries differ across disciplines, instruments and textbooks; a convention is not a boundary where the underlying physics suddenly changes.

| Common region | Approximate range used here | Typical observation connection |
| --- | --- | --- |
| Visible | 0.4–0.7 μm | Reflected sunlight, colour and atmospheric scattering |
| Near infrared, NIR | 0.7–1.3 μm | Vegetation structure and water contrast |
| Shortwave infrared, SWIR | 1.3–3 μm | Moisture and material absorption features |
| Midwave infrared, MWIR | 3–5 μm | Hot targets; reflected sunlight may contribute by day |
| Common longwave/thermal infrared window | 8–14 μm | Surface thermal emission; transmission varies within the window |
| Microwave | Approximately 1 mm–1 m | Radar backscatter and natural microwave emission |

The 8–14 μm interval is a common surface thermal-observation window, not a definition of all infrared or all thermal radiation. Warm objects emit at other wavelengths too. Thermal instruments often select narrower bands within this interval to avoid particular absorption. The notes' 800–1400 nm interval is 0.8–1.4 μm, not 8–14 μm. The slides' mm/μm error in Wien's constant likewise shows why units and numbers must be checked together.

| Concept | 中文术语 | Determining factors and comparison conditions |
| --- | --- | --- |
| Spectral region | 波谱区域 | A wavelength naming convention; boundaries can differ between textbooks. |
| Atmospheric window | 大气窗口 | Relatively high transmission for an atmosphere and path; not an instrument specification. |
| Instrument band | 仪器波段 | The actual spectral response function; the same region name does not ensure the same measurement. |

The microwave-range prose on PDF pages 68 and 70 of Campbell's sixth edition mixes μm with m/mm. This chapter uses approximately 1 mm–1 m for introductory discussion and checks actual instrument frequency or wavelength. Its Table 2.3 also uses naming boundaries different from other tutorials; NIR/SWIR boundaries are conventions, not abrupt physical transitions.

Distinguish three concepts. A <strong>spectral region</strong> names wavelengths; an <strong>atmospheric window</strong> describes relatively high atmospheric transmission for a specified path; an <strong>instrument band</strong> is defined by the instrument's response function. They are not interchangeable. A centre wavelength is only a summary. An instrument usually weights radiance over an interval using its spectral response $R_i(\lambda)$. A normalized band-average radiance can be defined as

$$\overline{L}_i=\frac{\int R_i(\lambda)L_\lambda\,\mathrm{d}\lambda}{\int R_i(\lambda)\,\mathrm{d}\lambda}.$$

The response convention and integration units must be consistent. This average retains the spectral units of $L_\lambda$ and differs from wavelength-integrated radiance. Actual products also follow instrument-specific calibration and metadata conventions. Two sensors both described as “NIR” can measure a target differently if their response functions differ. Spectral resolution concerns the fineness of distinguishable spectral structure, not simply the number of bands.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-spectrum): Campbell et al., sixth edition, PDF pp. 66–70 (printed pp. 27–31), 2.2 The Electromagnetic Spectrum; 2.3 Major Divisions; Tables 2.1–2.3; CCRS tutorial, PDF pp. 9–11, 41–42 (printed pp. 9–11, 41–42), 1.3 The Electromagnetic Spectrum; 2.4 Spectral Resolution. Separate named regions, transmission windows and instrument response; check the microwave-unit correction.

Sources: *第2章.pdf*, file pages 17–25 and 61–64; notes file page 1. The instrument-response integral is a teaching supplement connecting spectral quantities with measurements.

</div>

## 2.3 辐射量、立体角与量纲 · Radiometric quantities, solid angle and units {#rs2-radiometry}



<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

描述“收到多少辐射”之前，先问是总能量、单位时间能量、单位面积功率，还是某个方向上的功率。<strong>辐射能（radiant energy）</strong>$Q$的单位是J；<strong>辐射通量（radiant flux）</strong>$\Phi=\mathrm{d}Q/\mathrm{d}t$的单位是W。若只给瓦数而不说明面积与方向，不足以比较两个目标进入传感器的信号。

<strong>辐照度（irradiance）</strong>$E$是表面接收的单位面积辐射通量；<strong>辐射出射度（radiant exitance）</strong>$M$是表面向外离开的单位面积辐射通量，二者单位都是W m$^{-2}$。在表面方向不同的情况下，这里面积指实际接收或发出表面的面积，投影因素要在方向积分中处理。同样的单位不意味着同样的物理含义：接收到的太阳辐照度与表面热出射度分别位于能量路径的不同位置。

<strong>立体角（solid angle）</strong>$\Omega$描述从一点看去某束方向在球面上张开的范围，单位sr。球半径为$r$，垂直径向的球面小面积为$\mathrm{d}A_\perp$时，$\mathrm{d}\Omega=\mathrm{d}A_\perp/r^2$；完整球面为$4\pi$ sr，半球为$2\pi$ sr。单位sr在SI量纲上无量纲，但在辐射量单位中应保留，才能提醒我们这个量是按方向范围计的。

<strong>辐射强度（radiant intensity）</strong>$I=\mathrm{d}\Phi/\mathrm{d}\Omega$的单位为W sr$^{-1}$。<strong>辐亮度（radiance）</strong>$L$进一步限定发出/通过面积和方向：

$$L=\frac{\mathrm{d}^{2}\Phi}{\mathrm{d}A\cos\theta\,\mathrm{d}\Omega},\qquad [L]=\mathrm{W\,m^{-2}\,sr^{-1}}.$$

$\theta$为传播方向与面法线夹角，$\mathrm{d}A\cos\theta$为投影面积。式中的面片、法线与方向锥共同决定测量几何；下表列出各量的单位与约束。辐亮度不是“看起来亮”这种视觉描述，也不是不含立体角的辐照度。本站统一称“辐亮度”，教材中的“辐射亮度”是同义别名；照度、亮度等光度学量还涉及人眼敏感度加权，本章不混用。

| 量 | 符号 | 单位 | 核心限定 |
| --- | --- | --- | --- |
| 辐射能 | $Q$ | J | 累计能量 |
| 辐射通量 | $\Phi$ | W | 每单位时间 |
| 辐照度 / 出射度 | $E$ / $M$ | W m$^{-2}$ | 接收 / 离开单位面积 |
| 辐射强度 | $I$ | W sr$^{-1}$ | 每单位立体角 |
| 辐亮度 | $L$ | W m$^{-2}$ sr$^{-1}$ | 投影面积与方向 |
| 光谱辐亮度 | $L_\lambda$ | W m$^{-2}$ sr$^{-1}$ m$^{-1}$ | 另按每米波长计 |

光谱量表示单位光谱间隔内的量，不是在符号后添下标而保持单位不变。$L_\lambda$按每米表示时，$L=\int L_\lambda\,\mathrm{d}\lambda$；若改按每μm，数值为每米数值的$10^{-6}$倍。频率谱$L_\nu$也不能直接把横轴标签从波长换成频率：需满足$L_\lambda|\mathrm{d}\lambda|=L_\nu|\mathrm{d}\nu|$，即$L_\nu=L_\lambda\lambda^2/c$。这也是按波长与按频率绘出的谱峰不能简单互换的原因。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-radiometry)：Campbell等第六版 PDF 71页（印刷 32页），2.4 Radiation Laws: radiant flux, irradiance and radiant exitance。用单位区分通量、辐照度与出射度；方向与光谱密度的推导在本节展开。

来源：DOCX段落178–209和笔记文件第1–2页。此节是英文班辐射度量学的系统补充，不宣称中文课件已完整列出全部量。


<!-- rs-concept-table-rs2-radiometry -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 辐射能 Q | Radiant energy | 累计能量，J。 |
| 辐射通量 Φ | Radiant flux | 单位时间能量，W。 |
| 辐照度 E | Irradiance | 表面接收通量/面积，W m⁻²。 |
| 辐射出射度 M | Radiant exitance | 表面发出通量/面积，W m⁻²。 |
| 辐亮度 L（辐射亮度） | Radiance | 每投影面积、每立体角方向通量，W m⁻² sr⁻¹。 |
| 谱辐亮度 Lλ | Spectral radiance | 再按波长密度计；每m与每μm数值相差10⁶。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Before asking “how much radiation was received”, specify whether you mean total energy, energy per time, power per area or directional power. <strong>Radiant energy</strong> $Q$ is measured in joules. <strong>Radiant flux</strong> $\Phi=\mathrm{d}Q/\mathrm{d}t$ is measured in watts. A wattage without area and direction is insufficient to compare target signals entering a sensor.

<strong>Irradiance (辐照度)</strong> $E$ is incident radiant flux per unit surface area. <strong>Radiant exitance (辐射出射度)</strong> $M$ is outward radiant flux per unit surface area. Both have units W m$^{-2}$. The area refers to the actual receiving or emitting surface, with projection handled in directional integration. Equal units do not imply equal meanings: received solar irradiance and emitted terrestrial thermal exitance occupy different places in the energy path.

<strong>Solid angle</strong> $\Omega$ describes the angular extent of a bundle of directions viewed from a point, in steradians. For a sphere of radius $r$ and a small spherical area $\mathrm{d}A_\perp$ perpendicular to the radial direction, $\mathrm{d}\Omega=\mathrm{d}A_\perp/r^2$. A full sphere subtends $4\pi$ sr and a hemisphere $2\pi$ sr. The steradian is dimensionless in SI dimensional analysis, but retaining sr in radiometric units makes the directional normalization explicit.

<strong>Radiant intensity</strong> $I=\mathrm{d}\Phi/\mathrm{d}\Omega$ has units W sr$^{-1}$. <strong>Radiance (辐亮度)</strong> $L$ additionally specifies area and direction:

$$L=\frac{\mathrm{d}^{2}\Phi}{\mathrm{d}A\cos\theta\,\mathrm{d}\Omega},\qquad [L]=\mathrm{W\,m^{-2}\,sr^{-1}}.$$

Here $\theta$ is the angle between propagation direction and surface normal; $\mathrm{d}A\cos\theta$ is projected area. The equation's surface patch, normal and directional cone jointly define the geometry; the table below lists the units and constraints. Radiance is not visual “brightness” and is not irradiance without a solid-angle factor. The preferred Chinese term here is 辐亮度; 辐射亮度 is an alias. Photometric quantities such as illuminance and luminance include human visual sensitivity weighting and are not substituted for radiometric quantities in this chapter.

| Quantity | Symbol | Unit | Defining constraint |
| --- | --- | --- | --- |
| Radiant energy | $Q$ | J | Accumulated energy |
| Radiant flux | $\Phi$ | W | Per unit time |
| Irradiance / radiant exitance | $E$ / $M$ | W m$^{-2}$ | Incident / outgoing, per area |
| Radiant intensity | $I$ | W sr$^{-1}$ | Per solid angle |
| Radiance | $L$ | W m$^{-2}$ sr$^{-1}$ | Projected area and direction |
| Spectral radiance | $L_\lambda$ | W m$^{-2}$ sr$^{-1}$ m$^{-1}$ | Additionally per metre of wavelength |

A spectral quantity is per unit spectral interval; adding a subscript does not leave the unit unchanged. With $L_\lambda$ defined per metre, $L=\int L_\lambda\,\mathrm{d}\lambda$. Its numerical value per micrometre is $10^{-6}$ times the per-metre value. A frequency spectrum $L_\nu$ also requires more than relabelling the wavelength axis: $L_\lambda|\mathrm{d}\lambda|=L_\nu|\mathrm{d}\nu|$, giving $L_\nu=L_\lambda\lambda^2/c$. This is why wavelength- and frequency-based peak locations cannot be interchanged by a simple reciprocal substitution.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-radiometry): Campbell et al., sixth edition, PDF pp. 71 (printed pp. 32), 2.4 Radiation Laws: radiant flux, irradiance and radiant exitance. Use units to distinguish flux, irradiance and exitance; this section develops directional and spectral-density definitions further.

Sources: DOCX paragraphs 178–209 and notes file pages 1–2. This section systematizes English-class radiometry; it does not claim that the Chinese slides already list every quantity in full.


<!-- rs-concept-table-rs2-radiometry -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 辐射能 Q | Radiant energy | Accumulated energy, J. |
| 辐射通量 Φ | Radiant flux | Energy per unit time, W. |
| 辐照度 E | Irradiance | Incident flux per surface area, W m⁻². |
| 辐射出射度 M | Radiant exitance | Outgoing flux per surface area, W m⁻². |
| 辐亮度 L（辐射亮度） | Radiance | Directional flux per projected area/solid angle, W m⁻² sr⁻¹. |
| 谱辐亮度 Lλ | Spectral radiance | Adds wavelength-density units; per-metre/per-micrometre values differ by 10⁶. |

</div>

## 2.4 黑体与辐射定律 · Blackbodies and radiation laws {#rs2-blackbody-laws}

<RsFigure id="blackbody" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>黑体（blackbody）</strong>是在相应理想条件下完全吸收入射电磁辐射的对象，也是给定温度下热辐射的参考模型。“黑”不是说它在任何温度都呈黑色；高温黑体会发出可见光。热平衡黑体的辐射由温度决定，<strong>普朗克定律（Planck's law）</strong>给出其按波长表示的光谱辐亮度：

$$B_\lambda(T)=\frac{2hc^2}{\lambda^5}\frac{1}{\exp\!\left(hc/(\lambda k_B T)\right)-1},$$

其中$k_B=1.380649\times10^{-23}$ J K$^{-1}$，$\lambda$用m，$T$用K，$B_\lambda$单位为W m$^{-2}$ sr$^{-1}$ m$^{-1}$。它是方向性的<strong>谱辐亮度</strong>，不是所有波长、所有方向的总功率。讲义第31页原图比较500–900 K曲线，横轴为波长μm，纵轴标的是<strong>谱出射度$M_\lambda$</strong>，没有给出完整单位与数值尺度，因此不能直接把图上纵坐标当成这里的$B_\lambda$。两者对黑体相差$\pi$因子，同温曲线的形状与峰位置相同。原图适合定性读出温度升高、峰向短波移动及同波长谱值增加；定量值应按定义明确的公式计算，不能从这张缺单位的旧图读出SI辐亮度。

黑体辐亮度对半球内方向一致。向半球积分要乘投影因子，因此谱出射度为

$$M_\lambda=\int_{\mathrm{hemisphere}}B_\lambda\cos\theta\,\mathrm{d}\Omega=\pi B_\lambda.$$

半球立体角是$2\pi$ sr却得到$\pi$，原因是$\cos\theta$不能省略。再对全部波长积分，得到<strong>斯特藩-玻尔兹曼定律（Stefan-Boltzmann law）</strong>：

$$M=\int_0^\infty M_\lambda\,\mathrm{d}\lambda=\sigma T^4,\qquad \sigma\approx5.670374419\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}.$$

这里$M$为总出射度，单位W m$^{-2}$；原稿把谱下标与总量混用时应按此区分。英文人名是<strong>Stefan</strong>，不是Stephen。该定律表达表面发出的总热辐射，不是任意仪器有限波段的接收功率，也不是扣除环境入射之后的净辐射。

<strong>维恩位移定律（Wien's displacement law）</strong>对按波长表示的$B_\lambda$或$M_\lambda$峰值给出

$$\lambda_{\max}T=b,\qquad b\approx2.897771955\times10^{-3}\ \mathrm{m\,K}=2898\ \mathrm{\mu m\,K}.$$

课件文件第28页的“2898 mm K”应改为<strong>2898 μm K</strong>，等价于2.898 mm K。谱按频率表示时峰值对应另一种极值，不能对其峰频直接用$c/\nu_{\max}$套用本式。黑体辐射分布很宽，峰值所在波段不意味着其他波长没有辐射。

在$x=hc/(\lambda k_BT)\ll1$，即长波、低频相对于该温度的条件下，用$\exp(x)-1\approx x$得到<strong>瑞利-金斯近似（Rayleigh-Jeans approximation）</strong>：

$$B_\lambda\approx\frac{2ck_BT}{\lambda^4},\qquad B_\nu\approx\frac{2k_BT\nu^2}{c^2}.$$

两式属于不同谱变量，单位也相应不同；不能把$\lambda^{-2}$不加单位地作为$B_\lambda$。在约300 K、10 μm时$x$约4.8，远不满足此近似；在足够长的微波波长才更适用。用适用条件选择定律，远比记住一个“长波公式”可靠。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-blackbody-laws)：Campbell等第六版 PDF 71–72页（印刷 32–33页），2.4 Radiation Laws; Equations 2.2–2.5; Figure 2.5。先判定光谱量或全谱量，再核对单位、温度与近似条件。

来源：《第2章.pdf》文件第26–31页，配图来自第31页；DOCX Lecture 2与笔记文件第2页。$\pi$积分、SI谱单位及近似条件在此展开说明。


<!-- rs-concept-table-rs2-blackbody-laws -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 普朗克定律 | Planck law | 给出指定T的完整黑体谱；先分清Bλ与Mλ=πBλ。 |
| 斯特藩-玻尔兹曼定律 | Stefan-Boltzmann law | 全谱黑体出射度 M=σT⁴，不是单波段辐亮度。 |
| 维恩位移定律 | Wien displacement law | 按波长谱峰 λmax T≈2898 μm K；频率谱峰不能简单倒换。 |
| 瑞利-金斯近似 | Rayleigh-Jeans approximation | hc/(λkBT)≪1的长波低频极限；常温10 μm不满足。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>blackbody (黑体)</strong> ideally absorbs all incident electromagnetic radiation under the relevant ideal conditions and provides a reference for thermal emission at a specified temperature. “Black” does not mean visually black at every temperature: a hot blackbody emits visible light. Equilibrium blackbody radiation depends on temperature. <strong>Planck's law</strong> gives its wavelength-based spectral radiance:

$$B_\lambda(T)=\frac{2hc^2}{\lambda^5}\frac{1}{\exp\!\left(hc/(\lambda k_B T)\right)-1},$$

where $k_B=1.380649\times10^{-23}$ J K$^{-1}$, $\lambda$ is in metres, $T$ is in kelvins, and $B_\lambda$ has units W m$^{-2}$ sr$^{-1}$ m$^{-1}$. It is <strong>spectral radiance</strong>, not total power over every wavelength and direction. The original figure on lecture page 31 compares 500–900 K curves, with wavelength in μm horizontally and <strong>spectral exitance $M_\lambda$</strong> vertically. Its full vertical units and numerical scale are missing, so its plotted ordinate must not be treated directly as $B_\lambda$. For a blackbody these quantities differ by a factor of $\pi$ and have the same curve shape and peak location at a given temperature. Use the original qualitatively to identify increased spectral values and a shorter-wavelength peak at higher temperature. Obtain numerical values from the explicitly defined equations, rather than reading SI radiance from this legacy figure with incomplete units.

Blackbody radiance is direction-independent within the outgoing hemisphere. Hemispheric integration includes projected area, so spectral exitance is

$$M_\lambda=\int_{\mathrm{hemisphere}}B_\lambda\cos\theta\,\mathrm{d}\Omega=\pi B_\lambda.$$

The hemisphere subtends $2\pi$ sr, yet the result is $\pi$, because the $\cos\theta$ factor must be retained. Integration over all wavelengths then gives the <strong>Stefan-Boltzmann law</strong>:

$$M=\int_0^\infty M_\lambda\,\mathrm{d}\lambda=\sigma T^4,\qquad \sigma\approx5.670374419\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}.$$

Here $M$ is total exitance in W m$^{-2}$. This distinction corrects source expressions that mix spectral subscripts with integrated quantities. The name is <strong>Stefan</strong>, not Stephen. The law describes total emitted thermal radiation, not the power received by an arbitrary finite-band instrument, and not net radiation after subtracting environmental incidence.

<strong>Wien's displacement law</strong> describes the peak of the wavelength-based $B_\lambda$ or $M_\lambda$ spectrum:

$$\lambda_{\max}T=b,\qquad b\approx2.897771955\times10^{-3}\ \mathrm{m\,K}=2898\ \mathrm{\mu m\,K}.$$

The slides' file page 28 prints “2898 mm K”; the correct value is <strong>2898 μm K</strong>, equivalently 2.898 mm K. A frequency-based spectrum has a different extremum. Applying $c/\nu_{\max}$ to its peak frequency does not reproduce this wavelength peak. Blackbody emission is broad: a peak region does not imply zero radiation elsewhere.

For $x=hc/(\lambda k_BT)\ll1$, a long-wavelength or low-frequency condition relative to temperature, $\exp(x)-1\approx x$ gives the <strong>Rayleigh-Jeans approximation</strong>:

$$B_\lambda\approx\frac{2ck_BT}{\lambda^4},\qquad B_\nu\approx\frac{2k_BT\nu^2}{c^2}.$$

The equations refer to different spectral variables and have corresponding different units. A $\lambda^{-2}$ expression without a defined unit must not be used for $B_\lambda$. At about 300 K and 10 μm, $x$ is about 4.8, far outside this approximation. Sufficiently long microwave wavelengths are more suitable. Choosing a law by its applicability conditions is more reliable than memorising a “longwave formula”.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-blackbody-laws): Campbell et al., sixth edition, PDF pp. 71–72 (printed pp. 32–33), 2.4 Radiation Laws; Equations 2.2–2.5; Figure 2.5. Identify spectral versus wavelength-integrated quantities, then check units, temperature and approximation conditions.

Sources: *第2章.pdf*, file pages 26–31, with the figure from page 31; DOCX Lecture 2 and notes file page 2. The $\pi$ integral, SI spectral units and approximation conditions are developed explicitly here.


<!-- rs-concept-table-rs2-blackbody-laws -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 普朗克定律 | Planck law | Full blackbody spectrum at T; distinguish Bλ from Mλ=πBλ. |
| 斯特藩-玻尔兹曼定律 | Stefan-Boltzmann law | Total blackbody exitance M=σT⁴, not single-band radiance. |
| 维恩位移定律 | Wien displacement law | Wavelength-density peak λmax T≈2898 μm K; frequency peaks cannot be inverted directly. |
| 瑞利-金斯近似 | Rayleigh-Jeans approximation | Long-wavelength/low-frequency limit hc/(λkBT)≪1; room-temperature 10 μm does not satisfy it. |

</div>

## 2.5 实际物体、发射率与亮温 · Real surfaces, emissivity and brightness temperature {#rs2-emissivity-brightness-temperature}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

真实表面通常不是黑体。<strong>发射率（emissivity）</strong>$\varepsilon_\lambda$是实际表面热发射与同温黑体参考的比值，必须匹配波长和方向定义。例如方向谱发射率满足$L_{\lambda,\mathrm{emit}}=\varepsilon_\lambda B_\lambda(T)$。它可随材料、表面状态、波长、方向和温度改变，不能只从材料名字给出一个永久常数。<strong>灰体（graybody）</strong>是在指定范围内发射率近似不随波长改变的理想化模型；采用半球总发射率时可写$M=\varepsilon\sigma T^4$，但不能把某个方向、某个波长的发射率无条件代入总量公式。

对同一入射束或匹配定义的入射分布，能量守恒给出<strong>反射率</strong>$\rho$、<strong>吸收率</strong>$\alpha$和<strong>透射率</strong>$\tau$的关系$\rho+\alpha+\tau=1$，三者都是无量纲。对于不透明体，$\tau=0$。<strong>基尔霍夫定律（Kirchhoff's law）</strong>在热平衡、通常的互易材料条件下，把相同波长、相应匹配方向与偏振条件下的发射率与吸收率联系起来：$\varepsilon_\lambda=\alpha_\lambda$。不能跨波长套用，也不能直接写$\varepsilon=\rho$。只有进一步满足不透明及相应光谱/角度定义匹配时，才有$\varepsilon_\lambda=1-\rho_\lambda$；这并不允许用可见光反射率推断热红外发射率。

<strong>灰体（graybody）</strong>在讨论的光谱范围内具有近似不随波长变化、且小于1的发射率；<strong>选择性辐射体（selective radiator）</strong>的发射率随波长变化。真实物体不是仅因发射率小于1就一定是灰体，灰体是限定范围的模型。Campbell第10章图10.6可对照这一区别。

表面温度还受热传导、热容量、热惯量、蒸发和能量收支影响。发射率描述辐射比例，热惯量描述热响应能力，两者不是同一个物性，不能照抄原资料中的简单单调联系。

<strong>亮度温度（brightness temperature，简称亮温）</strong>$T_B$是用同一辐射定义下的等效黑体表示测得辐亮度时所需的温度。对于已知单色辐亮度$L_\lambda$，由$B_\lambda(T_B)=L_\lambda$反解：

$$T_B=\frac{hc}{\lambda k_B}\left[\ln\!\left(1+\frac{2hc^2}{\lambda^5L_\lambda}\right)\right]^{-1}.$$

单位必须与普朗克式一致。有限仪器波段的产品通常采用波段响应及专用定标常数，而不是随意把中心波长代入上式。若只接收单一温度表面的发射、忽略大气与反射背景且$0<\varepsilon_\lambda<1$，相应$T_B<T$。但真实观测包含其他项，不能把“亮温总小于真实温度”写成普适规律。

例如，对不透明、近似朗伯表面及简化单层路径，可示意写成

$$L_{\lambda,\mathrm{sensor}}\approx t_\lambda\left[\varepsilon_\lambda B_\lambda(T_s)+(1-\varepsilon_\lambda)L_{\lambda,\downarrow}\right]+L_{\lambda,\uparrow}.$$

$t_\lambda$是路径透射率，$T_s$为地表温度，$L_{\lambda,\uparrow}$是上行路径辐射；$L_{\lambda,\downarrow}$在此表示入射半球下行辐射经朗伯反射所需的等效量，等于下行辐照度除以$\pi$。各项都是谱辐亮度，这个简化式不包含复杂多次散射。真实温度反演需考虑发射率、大气与背景，不是把显示颜色直接转成温度。

仅在瑞利-金斯区间，忽略反射背景和大气、采用相同频率或相同匹配波段定义时，辐亮度近似与温度成正比，才有$T_B\approx\varepsilon T$。约300 K地表的10 μm热红外不满足该近似；本站不沿用原稿无条件的$T_B=\varepsilon T$。

一个公式演算能看清区别：设单色观测为10 μm，表面300 K，发射率0.9，并刻意忽略背景与大气。普朗克式给出的黑体谱辐亮度约为9.924 W m$^{-2}$ sr$^{-1}$ μm$^{-1}$，实际发射为其0.9倍；逆普朗克得到亮温约293.6 K，而直接相乘会得到270 K。这个例子不是地表温度产品，而是验证热红外不能套用瑞利-金斯线性关系。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-emissivity-brightness-temperature)：Campbell等第六版 PDF 299–303页（印刷 260–264页），10.6 Thermal Properties of Objects; 10.7 Land Surface Temperature; Figure 10.6；CCRS教程 PDF 50–51页（印刷 50–51页），2.9 Thermal Imaging。对比灰体与选择性辐射体，并说明亮温为何不直接等于地表真实温度。

来源：《第2章.pdf》文件第31–36页；热成像参照《第4章.pdf》文件第23–29页；DOCX Lecture 2实际物体部分。原稿第32、35页的热物性和亮温简化在此限定。


<!-- rs-concept-table-rs2-emissivity-brightness-temperature -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 发射率 ε | Emissivity | 与同温黑体相比的辐射比例，无量纲；说明谱/角条件。 |
| 真实温度 Ts | Physical surface temperature | 热力学温度，K；受物体状态决定。 |
| 亮温 TB | Brightness temperature | 相同辐射对应的等效黑体温度，K；不自动等于Ts。 |
| 热惯量 | Thermal inertia | 热物性，不应与发射率简单一一对应。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Real surfaces are usually not blackbodies. <strong>Emissivity (发射率)</strong> $\varepsilon_\lambda$ is the ratio of actual thermal emission to the same-temperature blackbody reference, with matching wavelength and directional definitions. For example, directional spectral emissivity gives $L_{\lambda,\mathrm{emit}}=\varepsilon_\lambda B_\lambda(T)$. It can vary with material, surface state, wavelength, direction and temperature; a material name does not provide a permanent universal constant. A <strong>graybody</strong> approximates wavelength-independent emissivity over a specified range. With hemispheric total emissivity, $M=\varepsilon\sigma T^4$ is possible, but a single directional or spectral emissivity cannot be inserted unconditionally into this integrated equation.

For one incident beam, or an incident distribution with matching definitions, energy conservation gives $\rho+\alpha+\tau=1$ for <strong>reflectance</strong>, <strong>absorptivity</strong> and <strong>transmittance</strong>, all dimensionless. An opaque body has $\tau=0$. <strong>Kirchhoff's law</strong> relates emissivity and absorptivity in thermal equilibrium for conventional reciprocal materials, at the same wavelength and appropriately matched direction and polarization: $\varepsilon_\lambda=\alpha_\lambda$. It must not be applied across wavelengths, and it does not state $\varepsilon=\rho$. Only with additional opacity and matching spectral/angular definitions does $\varepsilon_\lambda=1-\rho_\lambda$ follow. Visible reflectance therefore cannot simply determine thermal-infrared emissivity.

A <strong>graybody (灰体)</strong> has approximately wavelength-independent emissivity below 1 over the spectral range being modelled; a <strong>selective radiator (选择性辐射体)</strong> has wavelength-dependent emissivity. Emissivity below 1 alone does not make every real object a graybody: the graybody is a range-limited model. Compare Figure 10.6 in Campbell's Chapter 10.

Surface temperature also depends on heat conduction, heat capacity, thermal inertia, evaporation and energy balance. Emissivity describes a radiation ratio; thermal inertia describes thermal response. They are different physical properties, without the universal simple monotonic relationship implied by parts of the source.

<strong>Brightness temperature (亮度温度 or 亮温)</strong> $T_B$ is the temperature an equivalent blackbody needs to reproduce measured radiance under the same radiation definition. For monochromatic radiance $L_\lambda$, inversion of $B_\lambda(T_B)=L_\lambda$ gives

$$T_B=\frac{hc}{\lambda k_B}\left[\ln\!\left(1+\frac{2hc^2}{\lambda^5L_\lambda}\right)\right]^{-1}.$$

Units must match Planck's law. Finite-band products usually use the instrument response and dedicated calibration constants, rather than an arbitrary substitution of the centre wavelength. If only emission from a single-temperature surface is observed, with atmosphere and reflected background neglected and $0<\varepsilon_\lambda<1$, then the corresponding $T_B<T$. Real observations include other terms, so “brightness temperature is always below actual temperature” is not universal.

For example, an opaque approximately Lambertian surface and a simplified atmospheric path can be represented schematically as

$$L_{\lambda,\mathrm{sensor}}\approx t_\lambda\left[\varepsilon_\lambda B_\lambda(T_s)+(1-\varepsilon_\lambda)L_{\lambda,\downarrow}\right]+L_{\lambda,\uparrow}.$$

Here $t_\lambda$ is path transmittance, $T_s$ is surface temperature, and $L_{\lambda,\uparrow}$ is upwelling path radiance. In this expression, $L_{\lambda,\downarrow}$ is the effective downwelling quantity for hemispheric illumination reflected by a Lambertian surface: downwelling irradiance divided by $\pi$. All terms have spectral-radiance units. The simplified expression omits complex multiple scattering. Retrieving actual temperature requires emissivity, atmosphere and background information; display colours do not directly yield temperature.

Only in the Rayleigh-Jeans regime, with atmosphere and reflected background neglected and matching frequency or band definitions, is radiance approximately proportional to temperature, giving $T_B\approx\varepsilon T$. Thermal infrared at 10 μm for a roughly 300 K surface does not satisfy this approximation. The source's unconditional $T_B=\varepsilon T$ is therefore not used.

A calculation makes the distinction concrete. Assume monochromatic observation at 10 μm of a 300 K surface with emissivity 0.9, deliberately neglecting background and atmosphere. Planck's law gives blackbody spectral radiance of about 9.924 W m$^{-2}$ sr$^{-1}$ μm$^{-1}$; actual emission is 0.9 times this value. Inverse Planck gives a brightness temperature of about 293.6 K, whereas direct multiplication would give 270 K. This is a formula demonstration, not a surface-temperature product: it verifies why the linear Rayleigh-Jeans relation does not apply in this thermal-infrared example.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-emissivity-brightness-temperature): Campbell et al., sixth edition, PDF pp. 299–303 (printed pp. 260–264), 10.6 Thermal Properties of Objects; 10.7 Land Surface Temperature; Figure 10.6; CCRS tutorial, PDF pp. 50–51 (printed pp. 50–51), 2.9 Thermal Imaging. Compare graybodies and selective radiators, and explain why brightness temperature need not equal physical surface temperature.

Sources: *第2章.pdf*, file pages 31–36; thermal imaging in *第4章.pdf*, file pages 23–29; real-surface material in DOCX Lecture 2. The source's thermal-property and brightness-temperature simplifications on pages 32 and 35 are qualified here.


<!-- rs-concept-table-rs2-emissivity-brightness-temperature -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 发射率 ε | Emissivity | Emission ratio to a same-temperature blackbody; dimensionless, with spectral/angular convention. |
| 真实温度 Ts | Physical surface temperature | Thermodynamic temperature, K, characterising the surface state. |
| 亮温 TB | Brightness temperature | Equivalent blackbody temperature for the radiance, K; not automatically Ts. |
| 热惯量 | Thermal inertia | A thermal property, not a simple one-to-one proxy for emissivity. |

</div>

## 2.6 太阳辐射与地球辐射 · Solar and terrestrial radiation {#rs2-solar-terrestrial}

<RsFigure id="energy-balance" />

<RsFigure id="solar-source" />

<RsFigure id="active-source" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

太阳与地球都能热发射，但温度相差很大，因此辐射分布不同。把太阳近似为约5800 K的黑体，用维恩定律得到谱峰约0.50 μm；把地表近似为300 K，得到约9.66 μm。课件使用约6000 K讨论太阳是教学近似，不是每个太阳波长都严格符合黑体；地表温度和发射率也随地点、时刻与波长改变。

这个数量级比较解释了常见能量分工。可见、近红外和许多短波红外地表观测通常以太阳照明的反射为主；约300 K地表的热发射在常用长波热红外较重要。中波红外尤其在日间可能同时包含反射太阳光和热发射，高温火点还会使短波方向的热发射显著增强。因此不能简单按“红外”两个字把所有红外信号都当作温度信号，也不能只按一个固定分界假定反射或发射永远为零。

太阳在其表面发出的辐射还必须经过几何传播才形成地球位置的辐照度。对远场点源近似，单位面积功率随距离平方反比改变；太阳出射度不能直接当成地表辐照度。太阳光抵达某地后，地面所收的直接辐照度还随太阳天顶角与路径透射变化，大气散射又产生漫射照明。斜坡与水平面接收的直接辐射不同，阴影区也可由天空漫射和邻近反射照亮。

先按原图实际内容读：第21页展示叶片对入射能量的反射、吸收与透射；第24页太阳辐射图比较黑体近似、大气层外与地面曲线，直观显示传播路径改变光谱；第25页是人工发射与散射的例子，不能当作地球热发射图。地球热发射路径由本节温度和普朗克关系解释，不在上述三图中单独绘出。由这些过程可知，反射路径的地表信号在到达目标前已经过一次大气影响，离开目标后又经历目标—传感器路径；热发射路径则由目标向外发出，另有环境下行辐射被反射进入传感器的可能。两类信号在传感器端都会混入大气贡献。因此区分<strong>地表量</strong>与<strong>大气层顶/传感器观测量</strong>是必要的：完成辐射定标通常只把编码值联系到物理辐射，不自动完成地表反射率或地表温度反演。

应用上，夜间热影像仍可观测不同地物的热状态，却不能仅凭夜间亮暗推断材料；白天近红外植被较亮也不表明叶片温度高。解释之前应先识别能量来源，再选择反射或热发射模型，必要时采用混合模型。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-solar-terrestrial)：Campbell等第六版 PDF 81–82, 88–89页（印刷 42–43, 49–50页），2.5 Overview of Energy Interactions; 2.7 Summary; Figures 2.13, 2.20–2.22；CCRS教程 PDF 14–15, 19页（印刷 14–15, 19页），1.4 Interactions with the Atmosphere; 1.6 Passive vs. Active Sensing。连接太阳与地球谱峰和三种能量路径；全球平均收支不等于局部瞬时辐照度。

来源：《第2章.pdf》文件第37–45页；DOCX Lecture 2太阳/地球辐射部分。5800 K与300 K用于量级示例，非某次卫星观测的测量值。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Both the Sun and Earth emit thermally, but their very different temperatures produce different spectra. Approximating the Sun as a 5800 K blackbody gives a Wien wavelength peak near 0.50 μm. Approximating a surface as 300 K gives about 9.66 μm. The slides' roughly 6000 K solar value is a teaching approximation, not a claim that every solar wavelength exactly follows a blackbody. Surface temperature and emissivity also vary with location, time and wavelength.

This order-of-magnitude comparison explains common energy-source roles. Visible, NIR and many SWIR surface observations usually rely on reflected solar illumination. Thermal emission from roughly 300 K surfaces is important in common longwave thermal-infrared bands. MWIR observations can include both reflected sunlight and thermal emission, particularly by day, while hot fires increase short-wavelength thermal emission substantially. “Infrared” therefore does not mean that every signal is a temperature signal, and no single fixed boundary makes either reflection or emission identically zero.

Radiation leaving the solar surface must undergo geometric propagation before it becomes irradiance near Earth. Under a far-field point-source approximation, power per area varies inversely with squared distance; solar-surface exitance cannot be treated as terrestrial irradiance. Direct irradiance received locally also depends on solar zenith angle and atmospheric transmission, while atmospheric scattering produces diffuse illumination. Sloping and horizontal surfaces receive different direct illumination. Shadows can still be illuminated by diffuse sky radiation and neighbouring reflection.

Read the actual content of each original figure first. Page 21 shows reflection, absorption and transmission of incident energy at a leaf. The solar plot on page 24 compares a blackbody approximation with radiation outside the atmosphere and at the ground, illustrating spectral changes along a propagation path. Page 25 shows artificial transmission and scattering; it is not a terrestrial thermal-emission figure. Earth's thermal-emission path is explained here through temperature and Planck's law, rather than drawn separately in those three figures. These processes show that a reflected surface signal experiences atmospheric effects before reaching the target and again along the target-to-sensor path. The thermal path starts with target emission, but reflected environmental downwelling radiation may also enter the sensor. Both acquire atmospheric contributions. Distinguish <strong>surface quantities</strong> from <strong>top-of-atmosphere or at-sensor quantities</strong>: radiometric calibration links encoded values to physical radiation, but does not automatically retrieve surface reflectance or temperature.

Night-time thermal imagery can observe different thermal states, yet night-time brightness alone cannot identify material. Daytime vegetation brightness in NIR also does not indicate hot leaves. Identify the energy source first, then choose a reflection model, thermal-emission model or a mixed model when necessary.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-solar-terrestrial): Campbell et al., sixth edition, PDF pp. 81–82, 88–89 (printed pp. 42–43, 49–50), 2.5 Overview of Energy Interactions; 2.7 Summary; Figures 2.13, 2.20–2.22; CCRS tutorial, PDF pp. 14–15, 19 (printed pp. 14–15, 19), 1.4 Interactions with the Atmosphere; 1.6 Passive vs. Active Sensing. Connect solar/terrestrial peaks with the three energy paths; a global-average budget is not local instantaneous irradiance.

Sources: *第2章.pdf*, file pages 37–45; the solar and terrestrial material in DOCX Lecture 2. The 5800 K and 300 K values illustrate scale; they are not measurements from a particular satellite acquisition.

</div>

## 2.7 大气吸收、散射与窗口 · Atmospheric absorption, scattering and windows {#rs2-atmosphere}

<!-- textbook-figures-rs2-atmosphere:start -->

<RsFigure id="book-campbell-atmospheric-paths" />

<!-- textbook-figures-rs2-atmosphere:end -->


<RsFigure id="windows" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

大气不是完全透明的空隙。<strong>吸收（absorption）</strong>把辐射能量转给介质，可能进入分子转动、振动或其他能级；<strong>散射（scattering）</strong>改变传播方向，并不等同于辐射能量全部消失。折射则与传播速度和折射率结构有关，可改变路径方向。吸收与从原方向散射出去共同导致直达光束的消光，在热波段大气还会自身发射。

以粒子半径$r$和波长$\lambda$构成尺寸参数$x=2\pi r/\lambda$，可以理解三类入门模型。<strong>瑞利散射（Rayleigh scattering）</strong>适用于尺寸远小于波长的粒子，理想条件下散射截面有明显的$\lambda^{-4}$依赖，短波通常更强。<strong>米氏散射（Mie scattering）</strong>理论处理理想球形粒子的散射，遥感入门常用它讨论粒径与波长相近的气溶胶效应；角分布和谱依赖受尺寸、折射率及粒径分布共同决定，不能普遍写成$\lambda^{-2}$。当粒子远大于可见波长时，常用<strong>非选择性散射（nonselective scattering）</strong>解释可见各波长近似都被散射的现象，例如许多水滴组成的云呈白色；“非选择性”也是一定区间内的近似，不保证从可见到所有微波都无波长差异。

<strong>大气窗口（atmospheric window）</strong>是给定大气状态和路径下透射相对较高的光谱区间。水汽、二氧化碳、臭氧和其他成分产生不同吸收特征；路径越长、有关吸收体越多，窗口内也可能有明显衰减。图中的高低区域展示这种选择性，不意味着窗口透射为100%。8–14 μm范围内仍有例如臭氧相关吸收，实际载荷常避开或细分吸收区。

原图上半部纵轴明确标透射率Transmission（%），彩色高透射区与灰色Absorbed区域对照；下半部是太阳与地球辐射能量分布，不是另一条透射率曲线。横轴横跨多个数量级，标注单位从μm变到mm和m，不能把等长横向距离当作相等波长增量，也不要由颜色推断它就是某传感器波段。

在均匀或可沿路径积分的简化消光模型中，直达光束透射率可写

$$t_\lambda=\exp(-\delta_\lambda),\qquad \delta_\lambda=\int_{\mathrm{path}}\kappa_{\mathrm{ext},\lambda}(s)\,\mathrm{d}s,$$

$\delta_\lambda$为无量纲光学厚度，$\kappa_{\mathrm{ext},\lambda}$单位m$^{-1}$。式中描述直达部分，不把散射进入视线的辐射一并等价成透射。一个初步的传感器端关系是$L_{\lambda,\mathrm{sensor}}\approx t_\lambda L_{\lambda,\mathrm{surface}}+L_{\lambda,\mathrm{path}}$；路径辐射可包含散射或发射贡献，而复杂地表—大气耦合、多次散射还需要更完整模型。

| 辐射贡献 | English term | 路径与含义 |
| --- | --- | --- |
| 直接照明 | Direct illumination | 太阳辐射未被散射即到达目标；随后可被地表反射。 |
| 漫射照明 | Diffuse illumination | 先经大气散射再照到地表；阴影中仍可存在。 |
| 路径辐射 | Path radiance | 大气直接向视线散射或发射的贡献；不等于地表反射。 |
| 邻近效应 | Adjacency effect | 邻近地表辐射经大气散射等进入观测；可混合空间信息。 |

气态<strong>水汽（water vapour）</strong>的分子吸收，与液态<strong>水滴（water droplets）</strong>的粒子散射要分开。教程中“红外较少受散射”的概括表示特定粒径与波长下影响较弱，不代表散射为零，也不代表吸收与云遮挡消失。

地表遥感通常希望选窗口减小干扰，但<strong>大气遥感可能主动选择吸收带</strong>来测量气体、云或温度剖面。窗口不是所有遥感的必要条件。薄雾使暗水体可见信号增加，就是路径散射改变对比度的例子。大气校正要估计相关状态和模型，不能保证凭一种固定处理就适用于所有日期、地形与波段。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-atmosphere)：Campbell等第六版 PDF 73–80页（印刷 34–41页），2.5 Interactions with the Atmosphere; Figures 2.6–2.12; Table 2.4；CCRS教程 PDF 12–15页（印刷 12–15页），1.4 Interactions with the Atmosphere。追踪直接、漫射与路径辐射，区分水汽吸收与水滴散射。

来源：《第2章.pdf》文件第46–64页；笔记文件第3页。原稿第53页的米氏幂律已限定；消光积分为解释窗口和路径的教学补充。


<!-- rs-concept-table-rs2-atmosphere -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 吸收 | Absorption | 辐射能被介质吸收；气体有光谱选择性。 |
| 瑞利散射 | Rayleigh scattering | 粒径远小于波长；适当条件下强度随λ⁻⁴。 |
| 米氏散射 | Mie scattering | 粒径与波长可比；不存在通用λ⁻²规则。 |
| 非选择性散射 | Nonselective scattering | 入门上描述可见区大粒子散射近似不强依赖波长。 |
| 大气窗口 | Atmospheric window | 相对高透射区间，非100%透明；随路径/大气变化。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The atmosphere is not an entirely transparent gap. <strong>Absorption</strong> transfers radiant energy to a medium, potentially exciting molecular rotational, vibrational or other energy states. <strong>Scattering</strong> redirects radiation and is not equivalent to destroying all its energy. Refraction relates to propagation speed and refractive-index structure and can change ray paths. Absorption and out-scattering together extinguish a direct beam; the atmosphere also emits in thermal regions.

The size parameter $x=2\pi r/\lambda$, using particle radius $r$, helps explain three introductory models. <strong>Rayleigh scattering</strong> applies to particles much smaller than the wavelength and has a strong $\lambda^{-4}$ cross-section dependence under ideal conditions, favouring shorter wavelengths. <strong>Mie theory</strong> treats scattering by ideal spherical particles; introductory remote sensing commonly uses it to discuss aerosols comparable in size to wavelength. Angular and spectral behaviour depends jointly on size, refractive index and particle-size distribution, so it does not universally follow $\lambda^{-2}$. For particles much larger than visible wavelengths, <strong>nonselective scattering</strong> approximates similar scattering across visible colours, as in many droplet clouds appearing white. “Nonselective” is an interval-dependent approximation, not a guarantee of wavelength independence from visible light through every microwave region.

An <strong>atmospheric window (大气窗口)</strong> is a region of relatively high transmission for a particular atmospheric state and path. Water vapour, carbon dioxide, ozone and other constituents have different absorption features. A longer path or greater absorber amount can cause substantial attenuation even inside a window. The diagram's high and low transmission regions illustrate selectivity; a window does not mean 100% transmission. The 8–14 μm interval still contains absorption such as ozone features, which instruments may avoid or resolve with narrower bands.

The original figure's upper panel labels transmission in percent and contrasts coloured high-transmission regions with grey “Absorbed” regions. The lower panel shows solar and terrestrial radiation energy distributions, not another transmission curve. The horizontal axis spans several orders of magnitude and changes labelled units from μm to mm and m. Equal horizontal distances do not mean equal wavelength increments, and the colours do not identify a particular sensor's bands.

For a simplified extinction model that is uniform or integrated along a path, direct-beam transmission is

$$t_\lambda=\exp(-\delta_\lambda),\qquad \delta_\lambda=\int_{\mathrm{path}}\kappa_{\mathrm{ext},\lambda}(s)\,\mathrm{d}s,$$

where $\delta_\lambda$ is dimensionless optical depth and $\kappa_{\mathrm{ext},\lambda}$ has units m$^{-1}$. This describes the direct component, not radiation scattered into the line of sight. A preliminary at-sensor relationship is $L_{\lambda,\mathrm{sensor}}\approx t_\lambda L_{\lambda,\mathrm{surface}}+L_{\lambda,\mathrm{path}}$. Path radiance may include scattering or emission, while multiple scattering and coupled atmosphere-surface interactions need a fuller model.

| Radiation contribution | 中文术语 | Path and meaning |
| --- | --- | --- |
| Direct illumination | 直接照明 | Solar radiation reaches the target without scattering, then may be reflected. |
| Diffuse illumination | 漫射照明 | Radiation first scattered by the atmosphere illuminates the surface, including shadows. |
| Path radiance | 路径辐射 | Radiation scattered or emitted by the atmosphere into the viewing direction; distinct from surface reflection. |
| Adjacency effect | 邻近效应 | Radiation from neighbouring surfaces enters an observation through atmospheric scattering or related transport, mixing spatial information. |

Distinguish molecular absorption by gaseous <strong>water vapour (水汽)</strong> from particle scattering by liquid <strong>water droplets (水滴)</strong>. Tutorial summaries about less scattering in infrared mean weaker effects for particular sizes and wavelengths, rather than zero scattering or the disappearance of absorption and cloud obstruction.

Surface remote sensing often selects windows to reduce interference, but <strong>atmospheric remote sensing may deliberately select absorption bands</strong> to measure gases, clouds or temperature profiles. A window is not necessary for every remote sensing task. Haze increasing visible signals over dark water illustrates how path scattering changes contrast. Atmospheric correction estimates relevant states and processes; no single fixed procedure is guaranteed to suit every date, terrain and band.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-atmosphere): Campbell et al., sixth edition, PDF pp. 73–80 (printed pp. 34–41), 2.5 Interactions with the Atmosphere; Figures 2.6–2.12; Table 2.4; CCRS tutorial, PDF pp. 12–15 (printed pp. 12–15), 1.4 Interactions with the Atmosphere. Trace direct, diffuse and path contributions; distinguish water-vapour absorption from droplet scattering.

Sources: *第2章.pdf*, file pages 46–64; notes file page 3. The slides' Mie power-law statement on file page 53 is qualified. The extinction integral supplements the explanation of windows and paths.


<!-- rs-concept-table-rs2-atmosphere -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 吸收 | Absorption | Radiation energy absorbed by the medium; gases are spectrally selective. |
| 瑞利散射 | Rayleigh scattering | Particles much smaller than wavelength; λ⁻⁴ dependence under applicable conditions. |
| 米氏散射 | Mie scattering | Comparable particle/wavelength scales; no universal λ⁻² rule. |
| 非选择性散射 | Nonselective scattering | Introductory description of large-particle scattering with relatively weak visible-wavelength dependence. |
| 大气窗口 | Atmospheric window | Relatively high transmission, not perfect transparency; depends on atmosphere/path. |

</div>

## 2.8 反射几何、朗伯表面与BRDF · Reflection geometry, Lambertian surfaces and BRDF {#rs2-reflectance-brdf}

<!-- textbook-figures-rs2-reflectance-brdf:start -->

<RsFigure id="book-campbell-brdf" />

<!-- textbook-figures-rs2-reflectance-brdf:end -->



<RsFigure id="reflection" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

在同一入射波长和照明条件下，以入射总通量为分母，完整统计全部反射、透射方向及偏振分量时，入射辐射的吸收率$\alpha_\lambda$、反射率$\rho_\lambda$与透射率$\tau_\lambda$满足$\alpha_\lambda+\rho_\lambda+\tau_\lambda=1$；对不透明介质可令$\tau_\lambda\approx0$。上式的反射率和透射率统计全部出射通量，某一观察方向的BRF不能直接代入。这是入射能量的分配，物体自身热发射不能作为第四项直接并入此比例。吸收后产生的荧光是另一种光谱贡献，不能把包含荧光和热发射的总出射光谱直接称为反射光谱。

光照到地物后，离开的辐射不一定向各方向平均分配。<strong>镜面反射（specular reflection）</strong>把能量集中在与入射方向相关的镜面方向，平静水面可能出现耀斑；<strong>漫反射（diffuse reflection）</strong>向较广方向分配反射能量。真实表面常兼有方向性成分，粗糙与平滑也相对于波长而言。水面在某方向很亮，不意味着它在所有方向都有很高的反射率。

讲义原图左侧用道路与较集中的出射箭头说明镜面反射，右侧用树冠及向多个方向的箭头说明漫反射。它比较方向分布，不是两类材料的定量反射率测试；右侧树冠也不因此成为严格的朗伯表面。

<strong>朗伯表面（Lambertian surface）</strong>是理想漫反射模型，给定照明下出射辐亮度不随观察方向改变。它不是每个方向的辐射强度都相等：固定面片的辐射强度含投影面积因子，按$\cos\theta$变化。课件第69页有关“四方均匀”的简写应按辐亮度与强度区别理解。朗伯面若反射率为$\rho_\lambda$，接收辐照度为$E_{\lambda,i}$，则$L_{\lambda,r}=\rho_\lambda E_{\lambda,i}/\pi$。$\pi$来自半球投影积分，不是经验校正系数。

要描述方向差异，使用<strong>双向反射分布函数（bidirectional reflectance distribution function, BRDF）</strong>：

$$f_r(\lambda;\theta_i,\phi_i;\theta_r,\phi_r)=\frac{\mathrm{d}L_{\lambda,r}(\theta_r,\phi_r)}{\mathrm{d}E_{\lambda,i}(\theta_i,\phi_i)}.$$

下标$i$表示入射方向，$r$表示反射观测方向；$\theta$为天顶角，$\phi$为方位角，均相对于局部表面坐标。$f_r$单位为sr$^{-1}$，<strong>不是无量纲反射率</strong>。对指定单方向入射，在整个出射半球积分可得到相应方向—半球反射率：

$$\rho_{\mathrm{dh},\lambda}=\int_{\mathrm{hemisphere}} f_r\cos\theta_r\,\mathrm{d}\Omega_r.$$

理想朗伯面有$f_r=\rho_\lambda/\pi$。这里清楚区分方向分布与积分比例；并不是看到“反射”两个字就可以互换单位。

<strong>反射率（reflectance）</strong>一般是指定波长及入射、出射角度范围下的反射/入射能量比例；<strong>反照率（albedo）</strong>在地表能量收支中通常指一定光谱范围和实际照明条件下向上半球总反射与总入射的比值。反照率、某一观测方向的反射率产品与BRDF不同，还需说明是否为光谱、宽带、方向—半球或其他积分约定。很多遥感产品输出的是特定几何下的反射率估计或反射因子，使用时应查产品定义，而不假定其就是宽带反照率。

<strong>双向反射因子（bidirectional reflectance factor, BRF）</strong>把目标在同一照明和观测几何下的辐亮度，与理想完全反射朗伯参考面的辐亮度相比，是无量纲量。定向聚集使某些几何下的BRF可大于1，这不意味着半球总反射能量超过入射能量。BRF不是BRDF去掉单位后的简称；对理想双向定义，数值上有BRF=π·BRDF，但实际产品还取决于照明、视场和积分约定。

这解释了为什么同一地物不同观测角度会“变亮”：太阳、冠层与视线的相对位置改变阴影和可见散射结构。将不同日期或不同侧视角的影像比较时，BRDF效应可能与真实变化混合。地形坡面又改变局部入射与观测角，不能只使用整幅影像同一个太阳角描述所有面片。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-reflectance-brdf)：Campbell等第六版 PDF 82–84, 86页（印刷 43–45, 47页），2.6 Interactions with Surfaces: Reflection, BRDF, Reflectance; Figures 2.14–2.16；CCRS教程 PDF 16–17页（印刷 16–17页），1.5 Radiation–Target Interactions。用方向与单位区分辐亮度、强度、反射率、BRDF和BRF。

来源：《第2章.pdf》文件第65–75页及反射几何相关内容；DOCX Lecture 2 BRDF部分；赵英时等教材文件第46–48页补充BRF区分；Campbell等第六版文件第76–89页核对路径辐射、表面相互作用、BRDF与三种观测能量路径。角度积分与术语范围为本节教学展开。


<!-- rs-concept-table-rs2-reflectance-brdf -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 镜面反射 | Specular reflection | 能量集中在与入射相关的镜面方向。 |
| 漫反射 | Diffuse reflection | 向较广方向散射，不必严格朗伯。 |
| 朗伯表面 | Lambertian surface | 理想方向分布，L与观察方向无关；M=πL。 |
| 反射率/反照率 | Reflectance/albedo | 说明波长与方向积分范围；反照率也可为光谱量。 |
| BRDF | Bidirectional reflectance distribution function | 出射辐亮度/入射辐照度，sr⁻¹；不是无量纲反射率。 |
| BRF | Bidirectional reflectance factor | 与同几何下理想朗伯参考面的辐亮度之比，通常无量纲；不等于BRDF。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

For the same incident wavelength and illumination, using incident total flux as the denominator and including all reflected/transmitted directions and polarisation components, absorptance $\alpha_\lambda$, reflectance $\rho_\lambda$ and transmittance $\tau_\lambda$ satisfy $\alpha_\lambda+\rho_\lambda+\tau_\lambda=1$; an opaque medium has $\tau_\lambda\approx0$. The reflected and transmitted fractions include all outgoing flux; a viewing-direction BRF cannot be substituted. This partitions incident energy; the object's own thermal emission is not simply a fourth term. Fluorescence following absorption is a separate spectral contribution, so a total outgoing spectrum containing fluorescence and thermal emission is not simply a reflected spectrum.

Radiation leaving an illuminated surface is not necessarily distributed evenly across directions. <strong>Specular reflection</strong> concentrates energy around the mirror direction associated with the incident beam, producing effects such as glint on calm water. <strong>Diffuse reflection</strong> distributes reflected energy more broadly. Real surfaces commonly combine directional components; smoothness and roughness are also relative to wavelength. Water appearing bright in one viewing direction does not mean it has high reflectance in every direction.

The original figure uses a road and relatively concentrated outgoing arrows on the left for specular reflection, and a tree canopy with arrows in many directions on the right for diffuse reflection. It compares directional distributions rather than quantitatively testing two material reflectances. The illustrated canopy is not thereby an exact Lambertian surface.

A <strong>Lambertian surface (朗伯表面)</strong> is an ideal diffuse model whose outgoing radiance is independent of viewing direction under a given illumination. Its radiant intensity is not equal in every direction: a fixed surface patch retains the projected-area factor and varies as $\cos\theta$. The shorthand about uniformity on slides file page 69 must be interpreted using this radiance/intensity distinction. For Lambertian reflectance $\rho_\lambda$ and incident irradiance $E_{\lambda,i}$, $L_{\lambda,r}=\rho_\lambda E_{\lambda,i}/\pi$. The $\pi$ comes from projected hemispheric integration, not an empirical correction coefficient.

Directional variation is described by the <strong>bidirectional reflectance distribution function (BRDF, 双向反射分布函数)</strong>:

$$f_r(\lambda;\theta_i,\phi_i;\theta_r,\phi_r)=\frac{\mathrm{d}L_{\lambda,r}(\theta_r,\phi_r)}{\mathrm{d}E_{\lambda,i}(\theta_i,\phi_i)}.$$

Subscripts $i$ and $r$ denote incident and reflected/viewing directions. Zenith angle $\theta$ and azimuth $\phi$ are referenced to the local surface coordinates. $f_r$ has units sr$^{-1}$ and is <strong>not dimensionless reflectance</strong>. For a specified incident direction, integration over the outgoing hemisphere gives the corresponding directional-hemispherical reflectance:

$$\rho_{\mathrm{dh},\lambda}=\int_{\mathrm{hemisphere}} f_r\cos\theta_r\,\mathrm{d}\Omega_r.$$

A Lambertian surface has $f_r=\rho_\lambda/\pi$. This distinguishes a directional distribution from an integrated fraction; the shared word “reflection” does not make their units interchangeable.

<strong>Reflectance</strong> generally denotes the reflected-to-incident energy ratio under specified wavelength and angular ranges. In surface energy budgets, <strong>albedo</strong> commonly denotes total upward hemispheric reflection relative to total incident radiation over a spectral range and illumination condition. Albedo, a directional reflectance product and BRDF differ. One must specify spectral versus broadband treatment, directional-hemispherical integration or another convention. Many remote sensing products provide a reflectance estimate or reflectance factor at a particular geometry; consult the product definition rather than assuming it is broadband albedo.

The <strong>bidirectional reflectance factor (BRF, 双向反射因子)</strong> compares target radiance with that of an ideal perfectly reflecting Lambertian reference under the same illumination and viewing geometry. It is dimensionless. Directional concentration can make BRF exceed 1 in some geometries without total hemispheric reflected energy exceeding incident energy. BRF is not a unit-free synonym for BRDF; under the ideal bidirectional definition BRF is numerically related to BRDF by BRF=π·BRDF, while real products still depend on their illumination, field-of-view and integration conventions.

This explains why one target can appear brighter from another direction: changing the Sun-canopy-view geometry changes shadows and visible scattering structures. BRDF effects can be mixed with real changes when comparing dates or side-looking angles. Sloping terrain also changes local illumination and viewing angles, so one image-wide solar angle cannot describe every surface patch completely.

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-reflectance-brdf): Campbell et al., sixth edition, PDF pp. 82–84, 86 (printed pp. 43–45, 47), 2.6 Interactions with Surfaces: Reflection, BRDF, Reflectance; Figures 2.14–2.16; CCRS tutorial, PDF pp. 16–17 (printed pp. 16–17), 1.5 Radiation–Target Interactions. Use direction and units to distinguish radiance, intensity, reflectance, BRDF and BRF.

Sources: *第2章.pdf*, file pages 65–75 and associated reflection-geometry material; the BRDF section in DOCX Lecture 2; Zhao et al., file pages 46–48, for the BRF distinction; and Campbell et al., sixth edition, file pages 76–89, for path radiance, surface interaction, BRDF and the three observing-energy paths. Angular integration and terminology scope are developed here for teaching.


<!-- rs-concept-table-rs2-reflectance-brdf -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 镜面反射 | Specular reflection | Energy concentrated near the specular direction. |
| 漫反射 | Diffuse reflection | Reflection over a wider range of directions; not necessarily Lambertian. |
| 朗伯表面 | Lambertian surface | Ideal direction-independent radiance L; M=πL. |
| 反射率/反照率 | Reflectance/albedo | State spectral/angular integration conventions; albedo may be spectral. |
| BRDF | Bidirectional reflectance distribution function | Outgoing radiance per incident irradiance, sr⁻¹; not dimensionless reflectance. |
| BRF | Bidirectional reflectance factor | Radiance relative to an ideal Lambertian reference under matched geometry; normally dimensionless and different from BRDF. |

</div>

## 2.9 地物光谱与概念综合 · Surface spectra and integrated interpretation {#rs2-spectral-signatures}

<!-- textbook-figures-rs2-spectral-signatures:start -->

<RsFigure id="book-campbell-surface-spectra" />

<!-- textbook-figures-rs2-spectral-signatures:end -->


<RsFigure id="vegetation" />

<RsFigure id="water-spectrum" />

<RsFigure id="soil-spectrum" />

<RsFigure id="rock-spectrum" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>地物光谱特征（spectral signature）</strong>描述目标响应随波长的变化模式。上面的讲义原图分别展示植被、水体、干燥土壤与岩矿案例；横轴是波长，纵轴按各原图标注读取。这些曲线不是每一种实际地物都必须符合的模板，不能脱离测量条件从图中反推精确含量。原课件的相关谱图适合作为真实材料或课堂案例的来源对照，应用时仍需辨明材料状态、测量条件和坐标。

更稳妥的说法是<strong>光谱响应模式（spectral response pattern）</strong>：它强调曲线是在特定波段响应、尺度、状态、环境、大气与观测几何下得到的一组相对定量观测，而不是对某类地物永久不变、唯一对应的“指纹”。还要区分测量层级：实验室的<strong>材料光谱（material spectrum）</strong>描述受控样品；<strong>端元或组分光谱（endmember/component spectrum）</strong>描述混合模型中的代表成分；<strong>像元光谱（pixel spectrum）</strong>还包含空间混合、点扩散、背景、大气与几何影响。三者可以相互支持，但不能直接等同。

<!-- rs-concept-table-rs2-spectral-levels -->

| 概念 | English term | 适用范围与常见误读 |
| --- | --- | --- |
| 光谱特征/光谱标志 | Spectral signature | 教学中的辨识性称呼；不保证对类别唯一或跨条件不变。 |
| 光谱响应模式 | Spectral response pattern | 明确波段、状态、尺度、环境和几何条件的一组观测。 |
| 材料光谱 | Material spectrum | 受控样品响应；不能直接代替冠层、地块或城市像元。 |
| 端元/组分光谱 | Endmember/component spectrum | 混合模型中的代表成分；端元选择依模型与场景。 |
| 像元光谱 | Pixel spectrum | 传感器实际样本，可能含多组分、背景、大气和空间响应。 |

| 讲义原图 | 实际图例与坐标 | 读图重点与边界 |
| --- | --- | --- |
| 第79页植被 | 桦树、松树、枞树；横轴波长μm，纵轴标光谱反射率 | 比较约红区至近红外的上升和树种曲线差异；纵轴缺明确比例单位时不补造精确反射率。 |
| 第83页水体 | 星湖湖水；横轴400–800 nm，纵轴反射率% | 是特定湖水案例，不能据此读取SWIR响应或推广到全部水体。 |
| 第91页土壤 | 粉砂、砂、腐泥；横轴波长μm，纵轴反射率% | 比较材料曲线与形状，不将原图指定条件推广到任意含水量。 |
| 第89页岩石 | 石灰岩、长石砂岩、页岩、安山岩、玄武岩；纵轴反射率% | 横轴0.8与1.2之间刻度印为1.6，存在疑似笔误；保留原图，只作曲线趋势与类别对照，不据此读取精确吸收位置。 |

教材还讨论荧光，需与反射和热发射分开：

| 机制 | English term | 能量与解释边界 |
| --- | --- | --- |
| 反射 | Reflection | 通常在近似相同波长重新分配入射辐射；光谱与几何共同影响信号。 |
| 荧光 | Fluorescence | 吸收激发能后产生较短时间尺度的发光，常在不同波长；叶绿素荧光需与反射背景分离。 |
| 热发射 | Thermal emission | 与温度和发射率有关；不要求目标此刻被太阳照亮。 |

<strong>太阳诱导叶绿素荧光（solar-induced chlorophyll fluorescence, SIF）</strong>是太阳激发后产生的弱发光；它与红边的反射曲线形状不同。荧光可支持光合活动研究，但一次荧光或近红外观测仍不能单独诊断某一种胁迫。

植被的可见区响应与色素吸收相关，红光常有明显吸收，绿色区域相对较高；近红外反射与叶片内部结构及冠层多次散射有关，常从红区向近红外快速上升，称为<strong>红边（red edge）</strong>；短波红外中的水吸收影响含水量相关响应。叶片光谱不能直接等同于冠层像元光谱：叶面积、叶片方向、阴影、土壤背景、物候和观测几何都参与其中。红边位置或植被指数可为分析提供线索，却不是单独诊断某一种病害的充分证据。

清洁深水在近红外、短波红外通常吸收强，因此这些波段常用于水体区分。但水体可见响应随悬浮颗粒、藻类、溶解物和底部贡献而改变，太阳耀斑与大气路径也可增强信号。“水一定黑”只是一种过度概括，深水、浅水、浑水不能用同一固定曲线解释。

土壤光谱受矿物、含水量、有机质、颗粒与表面粗糙度影响；湿润土壤在许多条件下反射降低，但具体响应不是仅由水分控制。岩石与矿物可有与分子或晶体结构有关的吸收特征，风化、粒径、混合和植被覆盖可能遮蔽这些特征。波段太宽时，窄吸收会被平均掉，这说明识别材料不仅需要空间细节，还需要适合的光谱采样与足够信噪比。

两个常用说法需要结合条件：<strong>同物异谱</strong>指同类地物因状态、背景、光照或几何差异出现不同光谱；<strong>异物同谱</strong>指不同地物在给定有限波段、噪声和尺度下产生相近观测。它们不表示物理机制无法研究，而是说明分类必须处理多因素和有限观测。多日期、更多合适波段、空间纹理与现场验证可增加约束，但也要检查它们是否可比较。

最后把本章各节连接起来。传感器波段信号是光谱响应加权后的结果，地表辐射由太阳反射与自身发射等组成，大气又改变传播与增加路径贡献，观测几何影响方向响应。因此某像元变化的合理解释应依次问：测量的是辐亮度还是反射率？使用哪种波段响应？能量主要从哪里来？大气和角度是否已处理？目标状态还是背景发生变化？单位、条件和证据一旦明确，后面的[平台与轨道](/remote-sensing-ch3)以及[扫描和成像](/remote-sensing-ch4)才有共同的物理基础。

[教材对照阅读](/remote-sensing-sources#rs-book-rs2-spectral-signatures)：Campbell等第六版 PDF 85–87页（印刷 46–48页），2.6 Fluorescence; Spectral Properties of Objects; Figure 2.19；CCRS教程 PDF 17–18页（印刷 17–18页），1.5 Radiation–Target Interactions: leaves, water, spectral response。对照荧光与反射；解释同类目标的光谱为何会随时间、空间和观测条件变化。

来源：《第2章.pdf》文件第76–99页，插入原图分别来自第79、83、91、89页；DOCX段落485–498提供植被等跨讲次补充；赵英时等教材文件第68–69页补充响应模式与光谱层级；Campbell等第六版文件第86–87页用于核对光谱响应随空间、时间和观测条件变化的边界。本站保留讲义曲线及其原始标注，不宣称图上所有测量条件已知；原资料与勘误的完整索引见[来源页](/remote-sensing-sources)。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>spectral signature (地物光谱特征)</strong> describes how a target response varies with wavelength. The original lecture figures above separately show vegetation, water, dry-soil and rock examples. Their horizontal axes show wavelength; read each figure's own vertical label. These curves are not mandatory templates for every real target and cannot yield precise concentrations without measurement conditions. They provide material or classroom-case comparisons, while material state, measurement conditions and axes still need to be identified.

The more cautious term <strong>spectral response pattern</strong> stresses that a curve is a set of relative quantitative observations under particular band responses, scale, state, environment, atmosphere and viewing geometry, rather than a permanent one-to-one fingerprint for a class. Measurement levels also differ. A laboratory <strong>material spectrum</strong> describes a controlled sample; an <strong>endmember or component spectrum</strong> represents a component in a mixture model; a <strong>pixel spectrum</strong> additionally contains spatial mixing, point spreading, background, atmosphere and geometry. The levels can support one another but are not interchangeable.

<!-- rs-concept-table-rs2-spectral-levels -->

| 概念 | English term | Scope and common misreading |
| --- | --- | --- |
| 光谱特征/光谱标志 | Spectral signature | A useful teaching label, without guaranteed class uniqueness or invariance across conditions. |
| 光谱响应模式 | Spectral response pattern | Observations with the bands, state, scale, environment and geometry stated. |
| 材料光谱 | Material spectrum | Controlled-sample response; not automatically a canopy, field or urban-pixel spectrum. |
| 端元/组分光谱 | Endmember/component spectrum | A representative mixture-model component; its choice depends on model and scene. |
| 像元光谱 | Pixel spectrum | An instrument sample that may include mixtures, background, atmosphere and spatial response. |

| Original lecture figure | Actual legend and coordinates | Interpretation and limits |
| --- | --- | --- |
| Page 79: vegetation | Birch, pine and fir; wavelength in μm horizontally, spectral reflectance vertically | Compare the red-to-NIR rise and species differences. Do not invent precise reflectance values when a fractional/percentage unit is not explicitly stated. |
| Page 83: water | Xinghu lake water; 400–800 nm horizontally, reflectance % vertically | A particular lake-water example; it does not display SWIR response or represent every water body. |
| Page 91: soil | Silt, sand and muck (腐泥); wavelength in μm, reflectance % | Compare material curves and shapes without extending the specified source conditions to every moisture state. |
| Page 89: rocks | Limestone, arkosic sandstone, shale, andesite and basalt; reflectance % vertically | The horizontal tick between 0.8 and 1.2 is printed as 1.6, an apparent typo. Retain the original and compare trends/classes qualitatively; do not derive exact absorption positions from that scale. |

The textbook also introduces fluorescence, which differs from reflection and thermal emission:

| Mechanism | 中文术语 | Energy and interpretation limits |
| --- | --- | --- |
| Reflection | 反射 | Redistributes incident radiation, usually at approximately the same wavelength; spectra and geometry affect the signal. |
| Fluorescence | 荧光 | Short-timescale luminescence following absorption of excitation energy, commonly at another wavelength; chlorophyll fluorescence must be separated from reflected background. |
| Thermal emission | 热发射 | Depends on temperature and emissivity; does not require current sunlight. |

<strong>Solar-induced chlorophyll fluorescence (SIF, 太阳诱导叶绿素荧光)</strong> is weak luminescence following solar excitation, distinct from the reflected-spectrum shape of the red edge. It supports study of photosynthetic activity, but one fluorescence or NIR observation does not independently diagnose a particular stress.

Vegetation's visible response is associated with pigment absorption. Red light commonly has strong absorption, with relatively higher response in green. NIR reflection depends on internal leaf structure and multiple scattering in the canopy. The steep transition from red to NIR is called the <strong>red edge</strong>. SWIR water absorption influences moisture-related responses. A leaf spectrum is not automatically a canopy-pixel spectrum: leaf area, orientation, shadow, soil background, phenology and viewing geometry all contribute. A red-edge position or vegetation index can provide evidence, but is not sufficient by itself to diagnose one particular disease.

Clean deep water commonly absorbs strongly in NIR and SWIR, supporting water discrimination in those bands. Its visible response changes with suspended particles, algae, dissolved material and bottom contributions. Sun glint and atmospheric paths can increase the signal. “Water is always black” is an overgeneralisation; deep, shallow and turbid water cannot all be explained by one fixed curve.

Soil spectra depend on minerals, moisture, organic matter, particles and surface roughness. Wetting reduces reflectance under many conditions, but moisture is not the only controlling factor. Rocks and minerals can have absorption features associated with molecular or crystal structures. Weathering, particle size, mixtures and vegetation cover can obscure them. Broad instrument bands average over narrow absorption features. Material recognition therefore needs suitable spectral sampling and adequate signal-to-noise ratio as well as spatial detail.

Two common expressions require context. <strong>Different spectra for the same material (同物异谱)</strong> describes variation caused by state, background, illumination or geometry. <strong>Similar spectra for different materials (异物同谱)</strong> describes similar observations within a finite band set, noise level and spatial scale. These ideas do not make physical mechanisms unknowable; they show why classification must handle multiple influences and limited observations. Multiple dates, additional suitable bands, spatial texture and field validation can add constraints, but their comparability also needs checking.

Connect the chapter's concepts at the end. A sensor band weights radiation by spectral response. Surface radiation combines reflected sunlight, thermal emission and other relevant contributions; the atmosphere modifies propagation and adds path radiance; geometry controls directional response. A defensible explanation of a changing pixel asks in sequence: is the quantity radiance or reflectance? Which band response was used? What supplies most of the energy? Have atmosphere and angle been handled? Did the target state or its background change? Clear units, conditions and evidence establish the common physical foundation for [platforms and orbits](/remote-sensing-ch3) and [scanning and imaging](/remote-sensing-ch4).

[Textbook comparison and reading](/remote-sensing-sources#rs-book-rs2-spectral-signatures): Campbell et al., sixth edition, PDF pp. 85–87 (printed pp. 46–48), 2.6 Fluorescence; Spectral Properties of Objects; Figure 2.19; CCRS tutorial, PDF pp. 17–18 (printed pp. 17–18), 1.5 Radiation–Target Interactions: leaves, water, spectral response. Compare fluorescence and reflection; explain why spectra of one target class vary with time, space and observing conditions.

Sources: *第2章.pdf*, file pages 76–99, with the inserted originals from pages 79, 83, 91 and 89; DOCX paragraphs 485–498 supplement vegetation across lecture boundaries; Zhao et al., file pages 68–69, supplement response patterns and spectral levels; and Campbell et al., sixth edition, file pages 86–87, qualify how spectra vary with space, time and observing conditions. The site retains lecture curves and original labels without claiming that every measurement condition is known. See the [source page](/remote-sensing-sources) for the complete material and corrections index.

</div>
