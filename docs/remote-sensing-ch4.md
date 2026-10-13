---
title: 第四章 遥感传感器及其成像原理
description: 用摆扫、推扫、视场、雷达几何及双语插图理解传感器如何形成遥感影像。
prev:
  text: 第三章 平台及运行特点
  link: /remote-sensing-ch3
next:
  text: 双语术语与概念对照
  link: /remote-sensing-glossary
---

# 第四章 遥感传感器及其成像原理

Remote Sensing Sensors and Imaging Principles

<RsLanguage />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

第三章解决了“在哪里、何时、朝哪里观测”。本章继续问：进入仪器的辐射怎样成为一个有行、列、波段和数值的影像？沿着收集、探测、采样、定标和成像这条链，区分扫描方式、数字格网与真正的可分辨能力。最后转向微波雷达，理解为什么它的亮暗、几何和相位不能照搬光学影像的解释。

本章对应第4章课件文件页1–130，汇总文件页286–415。历史MSS、TM/ETM+和SPOT用来解释机制，具体型号与产品版本保持区别。全部配图采用讲义原图，注明文件页码，并在图注补足简化条件和旧译名。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Chapter 3 established where, when and in which direction observations occur. This chapter asks how radiation entering an instrument becomes an image with rows, columns, bands and numerical values. Follow collection, detection, sampling, calibration and image formation to distinguish scanning, a digital grid and actual resolving ability. Microwave radar then shows why optical interpretations of brightness and geometry cannot simply be transferred to radar intensity and phase.

The scope is Chapter 4 lecture file pages 1–130, compiled pages 286–415. Historical MSS, TM/ETM+ and SPOT instruments illustrate mechanisms, with model and product-version differences retained. All illustrations use original lecture figures, with file pages, assumptions and older terminology explained in captions.

</div>

## 4.1 从辐射到记录值 / From radiation to recorded values {#rs4-components}

<RsFigure id="sensor-structure" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>传感器（sensor）</strong>是执行测量的系统，<strong>探测器（detector）</strong>是把辐射转成信号的元件。课件用收集器、探测器、处理器和输出器说明一般结构：透镜、反射镜或天线先把适当方向和波段的能量送到探测器；探测器输出电荷、电压或其他响应；电子系统积分、放大、数字化并组织记录。历史摄影也可以先把能量转成感光材料的化学变化。

因此，一个像元值既不是“地物本身”，也不是不经变换的辐射能。它受光学或天线响应、积分时间、探测器增益、噪声、量化和后续处理影响。<strong>定标（calibration）</strong>建立仪器响应与参考物理量的关系，<strong>几何定位（geolocation）</strong>建立样本与地面位置的关系；两者解决不同问题。

摄影、扫描、雷达和非成像仪器是结构与数据获取方式的概览。主动/被动另按探测能量来源分类，不能把这两组混成单一名单。非成像辐射计也可以输出测量数据；能测量辐射不意味着一定形成二维影像。来源：第4章文件页3–5。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>sensor</strong> is the measuring system; a <strong>detector</strong> converts radiation into a signal. The lecture distinguishes collector, detector, processor and output. Lenses, mirrors or antennas direct selected radiation to a detector; detection produces charge, voltage or another response; electronics integrate, amplify, digitise and organise the record. Historical photography can instead begin with a chemical change in a photosensitive material.

A pixel value is therefore neither the target itself nor unchanged radiant energy. Optical/antenna response, integration time, gain, noise, quantisation and processing all matter. <strong>Calibration</strong> relates instrument output to reference physical quantities; <strong>geolocation</strong> relates samples to ground positions. These solve different problems.

Photography, scanning, radar and non-imaging instruments describe structure/acquisition, whereas active/passive describes the source of probing energy. These are distinct classifications. A non-imaging radiometer can produce measurements without a two-dimensional image. Source: Chapter 4 file pages 3–5.

</div>

## 4.2 摄影与中心投影 / Photography and central projection {#rs4-photography}


<RsFigure id="photography" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>画幅式摄影机（frame camera）</strong>在一次曝光中取得二维画幅。理想中心投影模型把地面点、投影中心和像点连成一直线。对于垂直摄影、近似平坦地面，焦距为$f$、相对地面高度为$H$时，影像与地面的长度比约为$f/H$。这里描述投影比例，不能将它直接称为所有画幅影像的空间分辨率。

同一张照片中，地形高差、相机倾斜和镜头畸变会改变位置关系。高于参考平面的物体有地形位移；相机姿态改变使投影不再是简单统一比例。通过立体视差可以恢复几何信息，前提是匹配、相机模型、基线和定位条件足够可靠。<strong>正射校正（orthorectification）</strong>利用模型与高程修正几何，它不能创造原观测没有的细节。

摄影成像和扫描成像的关键区别是时间组织：画幅近似同时曝光，扫描把不同位置的样本在一段时间内逐步取得。两者都可能使用数字探测器；“数字相机”不等于某一种扫描方式。课件文件页6展示中心投影及真/假彩色，颜色映射另见4.6。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>frame camera</strong> acquires a two-dimensional frame in one exposure. Ideal central projection places the ground point, projection centre and image point on one line. For vertical photography over approximately flat ground, image-to-ground length scale is about $f/H$, where $f$ is focal length and $H$ is height above that ground. This is a projection scale, not a universal measure of spatial resolution.

Relief, tilt and lens distortion alter geometry within the frame. Elevated objects are displaced relative to a reference plane, and changing attitude invalidates a simple uniform scale. Stereo parallax can recover geometry when matching, camera models, baseline and positioning are adequate. <strong>Orthorectification</strong> uses geometry and elevation to correct position; it does not create unobserved detail.

Frame and scanning imaging differ in temporal organisation: a frame is approximately simultaneous, whereas scanning acquires different positions over an interval. Both may use digital detectors. A digital camera does not specify one scanning mechanism. Chapter 4 file page 6 illustrates projection and colour; colour mapping is explained in section 4.6.

</div>

## 4.3 摆扫与推扫怎样形成二维影像 / How whiskbroom and pushbroom form images {#rs4-scanning}

<RsFigure id="whiskbroom" />

<RsFigure id="pushbroom" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

先找到图中的<strong>沿轨（along-track）</strong>方向，它由平台前进提供；与它近似垂直、横跨幅宽的是<strong>横轨（across-track）</strong>方向。形成二维影像，需要在这两个方向上获得样本。不要把线阵排列方向与平台运动方向混为一谈。

<strong>摆扫（whiskbroom）</strong>通常用摆动或旋转扫描镜，让少量探测器的视线依次跨过地面。一次横扫取得一条或若干扫描线，平台继续前进后再取得下一组。对照MSS原图的各条扫描线，沿横轨逐点采样；扫描镜返回、定标和有效观测区间需具体看仪器设计。MSS的“主动扫描”表示扫描工作段，不是系统发射探测能量，MSS仍是被动光学仪器。

<strong>推扫（pushbroom）</strong>用一条横跨幅宽的探测器线阵，在一个积分区间同时记录一行。平台运动让相邻积分区间对应下一行，于是形成二维图。对照推扫原图中的线阵与地面条带，一行中的样本在同一积分区间获取。推扫不需要为横轨采样逐点摆动扫描镜，较长驻留时间有利于收集信号，但大量探元之间的响应差异需要定标，否则可能出现条带。

这是一组对等的几何机制，不是绝对的质量排名。摆扫可能用多探元、多线或双向采样；推扫系统也可采用不同器件，CCD（charge-coupled device，电荷耦合器件）仅是探测技术之一。平台在摆扫过程中持续运动，真实采样线可能倾斜；讲义图是成像机制示意，不能当作真实产品格网。

课件文件页7–22讲机械扫描，52–55讲线阵推扫，56–85以SPOT和立体观测展开。NASA的[Landsat扫描对比](https://svs.gsfc.nasa.gov/12754/)也说明早期摆扫与Landsat8线阵推扫的驻留时间和定标差异。


<!-- rs-concept-table-rs4-scanning -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 摆扫/横轨扫描 | Whiskbroom/across-track | 扫描机构依次指向横轨位置，平台运动提供沿轨；可有多个探元。 |
| 推扫/沿轨扫描 | Pushbroom/along-track | 横跨幅宽的线阵同时积分一行，平台前进获取下一行。 |
| CCD | Charge-coupled device | 一种探测器技术，不是推扫的同义词。 |
| 定标重点 | Calibration focus | 摆扫/推扫的时间与探元组织不同；推扫需一致探元响应。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Identify <strong>along-track</strong>, supplied by platform motion, and <strong>across-track</strong>, approximately perpendicular to it and spanning the swath. Two-dimensional imagery requires sampling in both directions. The direction of the detector line is different from the direction in which the platform travels.

<strong>Whiskbroom</strong> commonly uses an oscillating/rotating mirror to direct a small set of detectors successively across the ground. A sweep acquires one or several lines, and flight moves the system to the next group. In the original MSS scan-line figure, points are acquired successively across track. Return sweep, calibration and usable scan intervals depend on the instrument. An MSS “active scan” segment refers to mirror operation, not transmitted probing energy: MSS remains a passive optical sensor.

<strong>Pushbroom</strong> uses a cross-track linear array to record one line during the same integration interval. Platform motion places the next interval over the next line, forming an image. In the original pushbroom figure, detector-line samples are integrated together. No point-by-point across-track mirror sweep is required. Longer dwell time can collect more signal, but differing responses among many detectors require calibration to prevent stripes.

These mechanisms do not provide an unconditional quality ranking. Whiskbroom instruments may use several detectors, lines or scan directions; pushbroom can use different detector technologies. CCD, or <strong>charge-coupled device</strong>, is one technology, not a synonym for pushbroom. Continuous flight can slant real whiskbroom sample lines; the lecture schematics illustrate the mechanism rather than a raw product grid.

The lecture covers mechanical scanning on file pages 7–22, pushbroom on 52–55 and SPOT/stereo examples on 56–85. NASA's [Landsat comparison](https://svs.gsfc.nasa.gov/12754/) explains the dwell-time and calibration differences between earlier whiskbroom instruments and Landsat 8's arrays.


<!-- rs-concept-table-rs4-scanning -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 摆扫/横轨扫描 | Whiskbroom/across-track | Mechanism samples across track sequentially; flight supplies along track; several detectors may be used. |
| 推扫/沿轨扫描 | Pushbroom/along-track | A cross-track array integrates a line together; flight acquires successive lines. |
| CCD | Charge-coupled device | A detector technology, not a synonym for pushbroom. |
| 定标重点 | Calibration focus | Temporal/detector organisation differs; pushbroom needs consistent detector responses. |

</div>

<details><summary>课件对照：扫描行与线阵 / Lecture comparison: scan lines and array</summary>




</details>

## 4.4 视场、采样与可分辨能力 / Field of view, sampling and resolving ability {#rs4-ifov}

<RsFigure id="ifov" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>视场角（field of view, FOV）</strong>描述仪器的整体角范围，<strong>瞬时视场角（instantaneous field of view, IFOV）</strong>描述单探元某一时刻接收辐射的角范围。设探元尺寸为$d$、焦距为$f$，小角度时$\beta\approx d/f$，以弧度计。对平坦地面、天底对称观测，相对地面高度为$H$，该角范围投影成地面足迹宽度$g$：

$$
g=2H\tan(\beta/2)\approx H\beta.
$$

整体全视场角为$\Theta$时，同一平地模型的幅宽为$W=2H\tan(\Theta/2)$。这两个式子分别描述单探元足迹和总覆盖宽度，不能把IFOV、FOV和幅宽定义为同一个量。沿公式比较高度或角度变化时，足迹与幅宽怎样变化；数值使用同一长度单位，输入mrad先转换成rad。高轨、宽幅或离轴观测必须进一步考虑地球曲率和几何，原图中的符号须与这些定义对应。

<strong>地面采样间距（ground sampling distance, GSD）</strong>是相邻样本在地面的间隔，沿轨方向还受采样频率和平台地面速度影响。近似恒定速度$v_g$、采样时间间隔$\Delta t$时，沿轨间隔约$v_g\Delta t$。样本间距、探元响应足迹与光学点扩散并不自动相等。<strong>空间分辨率（spatial resolution）</strong>涉及可区分的细节，还受衍射、运动、噪声和处理影响。

一个像元可以包含多种地物，称<strong>混合像元（mixed pixel）</strong>。是否可近似为纯像元，取决于所选类别、空间尺度和响应范围，不能说所有像元必定以同样方式混合。将30m产品重采样成10m网格只改变输出采样与插值，不新增原始观测细节。课件文件页14–19的足迹关系只在上述条件下解释，不直接等同产品的全部分辨能力。


<!-- rs-concept-table-rs4-ifov -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| FOV | Field of view | 整体视场角，°或rad；全角/半角需说明。 |
| IFOV β | Instantaneous field of view | 单探元角范围，rad；小角β≈d/f。 |
| 足迹 g/幅宽 W | Footprint/swath | 地面长度；平地天底g=2Htan(β/2)、W=2Htan(Θ/2)。 |
| GSD | Ground sampling distance | 相邻采样的地面间隔，不自动等于足迹。 |
| 空间分辨率 | Spatial resolution | 可辨细节能力，还受光学、运动、噪声与处理影响。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

<strong>Field of view (FOV)</strong> describes the total angular field; <strong>instantaneous field of view (IFOV)</strong> describes one detector's angular extent at an instant. For detector size $d$ and focal length $f$, the small-angle approximation is $\beta\approx d/f$ in radians. For symmetric nadir viewing over flat ground at height $H$, the detector footprint width is

$$
g=2H\tan(\beta/2)\approx H\beta.
$$

For total full-angle FOV $\Theta$, the same flat-ground model gives $W=2H\tan(\Theta/2)$. One equation describes a detector footprint, the other the total swath; IFOV, FOV and swath are different quantities. Use the formulas to compare changes in height and angle. Convert mrad to rad and maintain consistent length units. High altitude, wide fields and off-nadir viewing require curvature and further geometry; read the original footprint symbols together with these definitions.

<strong>Ground sampling distance (GSD)</strong> is the ground spacing between adjacent samples. Along-track spacing also depends on sampling rate and ground speed: at approximately constant $v_g$ and interval $\Delta t$, it is about $v_g\Delta t$. Sample spacing, detector footprint and optical spreading need not coincide. <strong>Spatial resolution</strong> concerns distinguishable detail and also depends on diffraction, motion, noise and processing.

A <strong>mixed pixel</strong> includes several target classes. Whether a pixel is approximately pure depends on the classification scale, target distribution and spatial response, not a universal all-pixels rule. Resampling a 30 m product onto a 10 m grid changes interpolation/output sampling, without acquiring new detail. The footprint relations on lecture file pages 14–19 must be interpreted with these conditions.


<!-- rs-concept-table-rs4-ifov -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| FOV | Field of view | Total angular field, ° or rad; full/half-angle convention must be stated. |
| IFOV β | Instantaneous field of view | Instantaneous detector angular extent, rad; small-angle β≈d/f. |
| 足迹 g/幅宽 W | Footprint/swath | Ground lengths; flat/nadir g=2Htan(β/2), W=2Htan(Θ/2). |
| GSD | Ground sampling distance | Ground spacing of adjacent samples; not automatically the footprint. |
| 空间分辨率 | Spatial resolution | Resolving ability, also influenced by optics, motion, noise and processing. |

</div>



## 4.5 四类分辨率与仪器权衡 / Four resolutions and instrument trade-offs {#rs4-resolutions}



<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

空间分辨率回答“能区分多细的空间结构”；<strong>光谱分辨率（spectral resolution）</strong>回答“能区分多细的波长特征”；<strong>辐射分辨率（radiometric resolution）</strong>回答“能区分多细的辐射差异”；<strong>时间分辨率（temporal resolution）</strong>回答“同一目标的观测时间间隔有多短”。它们不能分别偷换成影像像元总数、波段总数、文件位数和绕地周期。

光谱能力需看波段宽度、中心间隔、响应形状及信噪比。宽波段可能跨过一条吸收特征而把它平均，窄带可保留细节，却通常收集更少辐射，需要足够积分与灵敏度。波段多不保证每个波段窄，<strong>高光谱（hyperspectral）</strong>还强调窄而近连续的光谱采样；课件文件页86–88展示成像光谱仪。

量化位深$b$最多提供$2^b$个码值。若输入范围固定，位数增加可减小量化步长，但噪声、增益、饱和、定标和实际有效位深决定这些级别能否可靠区分。8位有256个码值，12位有4096个码值；将8位码值装进16位文件并不会新增测量精度。推扫探元之间的响应不一致同样可能影响辐射比较。

时间分辨率按任务规定口径解释。侧摆与星座能增加观测机会，但云和调度仍限制有效观测；静止轨道能长期看到固定区域，图像更新还取决于扫描模式。更细空间、更窄光谱、更高信噪比、更宽覆盖和更勤观测通常需要权衡，并非四个滑条能无限同时提高。英文笔记文件页4–7是四类分辨率的补充来源。


<!-- rs-concept-table-rs4-resolutions -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 空间分辨率 | Spatial resolution | 空间细节；不等于输出像元数。 |
| 光谱分辨率 | Spectral resolution | 区分波长特征；带宽、间隔、响应与SNR有关。 |
| 辐射分辨率 | Radiometric resolution | 区分信号差异；量化位数不能独立代表灵敏度。 |
| 时间分辨率 | Temporal resolution | 同目标时间采样；区分机会、覆盖与可用观测。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Spatial resolution asks how fine a spatial structure can be distinguished. <strong>Spectral resolution</strong> concerns wavelength features; <strong>radiometric resolution</strong> concerns differences in radiation; <strong>temporal resolution</strong> concerns sampling of the same target in time. These are not equivalent to image pixel count, band count, file bit depth or orbital period.

Spectral capability depends on band width, centre spacing, response shape and signal-to-noise ratio. A broad band may average across an absorption feature, whereas a narrow band preserves spectral detail but usually collects less radiation and needs adequate integration/sensitivity. More bands do not guarantee narrow bands. <strong>Hyperspectral</strong> also implies narrow, nearly contiguous spectral sampling; imaging spectrometers appear on lecture file pages 86–88.

Bit depth $b$ provides at most $2^b$ codes. With a fixed input range, more bits reduce quantisation spacing, but noise, gain, saturation, calibration and effective bit depth determine which levels are distinguishable. Eight bits provide 256 codes and twelve bits 4096; placing eight-bit values in a sixteen-bit container does not increase measurement precision. Detector-response differences in pushbroom systems also affect comparisons.

Temporal resolution requires a task-specific convention. Pointing and constellations increase opportunities, but cloud and scheduling constrain usable observations. Geostationary visibility does not determine image-update cadence without a scanning mode. Finer spatial sampling, narrower bands, higher SNR, wider coverage and more frequent sampling require trade-offs. English notes file pages 4–7 supplement these definitions.


<!-- rs-concept-table-rs4-resolutions -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 空间分辨率 | Spatial resolution | Spatial detail, not output pixel count. |
| 光谱分辨率 | Spectral resolution | Wavelength-feature discrimination; band width, spacing, response and SNR matter. |
| 辐射分辨率 | Radiometric resolution | Signal-difference discrimination; bit depth alone is not sensitivity. |
| 时间分辨率 | Temporal resolution | Time sampling of the same target; distinguish opportunities, coverage and usable data. |

</div>

## 4.6 波段与颜色不是同一分类 / Spectral bands and display colour {#rs4-colour}


<RsFigure id="spectral-cube" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>全色（panchromatic）</strong>通常指一个较宽的光学波段，可给出较细空间信息，但不能据一个全色数值恢复完整的光谱。<strong>多光谱（multispectral）</strong>记录若干选择波段，<strong>高光谱（hyperspectral）</strong>强调许多窄而近连续的波段。带宽、响应与任务用途都要看，不以一个固定波段数阈值机械划分。

<strong>真彩色（true colour）</strong>把红、绿、蓝观测近似映射到显示的R、G、B通道；<strong>假彩色（false colour）</strong>采用其他组合。例如NIR→R、红→G、绿→B时，健康植被的强近红外反射可显示成红色。这是显示编码，不能说叶片真实为红色，也不是它更热。显示拉伸又会改变视觉亮暗，所以截图颜色不能直接作为反射率数值。

全色锐化（pan-sharpening）用高空间细节与多光谱信息融合，结果的光谱保真度依算法和输入条件，不等于新获得了高分辨率全波段观测。立体成像则利用多视角几何恢复高程，与颜色融合解决不同问题。来源：课件文件页6、21–22、51、78及86–88。


<!-- rs-concept-table-rs4-colour -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 全色 | Panchromatic | 一个较宽波段，不是RGB彩色。 |
| 多光谱/高光谱 | Multispectral/hyperspectral | 选择波段与窄而近连续采样的区别，不能仅看波段数。 |
| 真彩色/假彩色 | True/false colour | 波段→RGB显示映射，不改变目标真实颜色。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

<strong>Panchromatic</strong> generally records one broad optical band, often with fine spatial sampling, without recovering a full spectrum from one value. <strong>Multispectral</strong> records selected bands; <strong>hyperspectral</strong> emphasises many narrow, nearly contiguous bands. Classification depends on bandwidth, response and purpose, not one universal band-count threshold.

<strong>True colour</strong> approximately maps red, green and blue observations to display R/G/B. <strong>False colour</strong> uses other combinations: NIR→R, red→G and green→B can render strongly NIR-reflecting vegetation red. This is a display code, not physically red leaves or a temperature measurement. Display stretching changes apparent brightness, so screenshot colours are not direct reflectance values.

<strong>Pan-sharpening</strong> fuses spatial detail and multispectral information, with spectral fidelity depending on the algorithm and inputs; it does not constitute a new high-resolution measurement in every band. Stereo imaging instead recovers elevation from multi-view geometry. Sources: lecture file pages 6,21–22,51,78,86–88.


<!-- rs-concept-table-rs4-colour -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 全色 | Panchromatic | One relatively broad band, not an RGB colour image. |
| 多光谱/高光谱 | Multispectral/hyperspectral | Selected bands versus narrow nearly continuous sampling; band count alone is insufficient. |
| 真彩色/假彩色 | True/false colour | Band-to-RGB mapping, not physical target colour. |

</div>

## 4.7 热红外、DN与定标链 / Thermal infrared, DN and calibration {#rs4-thermal}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

热红外传感器主要观测与地物温度和发射率有关的热辐射，可在夜间被动工作。它记录的<strong>数字量化值（digital number, DN）</strong>需按产品元数据解释；DN可能已经定标并缩放，不能一概称为未经处理亮度。对采用线性缩放的产品，可用$L_\lambda=m_L\,DN+a_L$得到谱辐亮度，系数与单位必须取自该波段、该产品版本。

亮温是与观测辐射相应的等效黑体温度。实际产品可给出波段有效常数$K_1,K_2$：

$$
T_B=\frac{K_2}{\ln(K_1/L_\lambda+1)}.
$$

这是产品约定下的亮温转换，不是无条件的地表真实温度。简化的不透明朗伯地表、均匀视场模型可把传感器谱辐亮度写成

$$
L_{\rm sensor}=\tau\left[\varepsilon B_\lambda(T_s)+(1-\varepsilon)L_\downarrow\right]+L_\uparrow.
$$

其中$B_\lambda$是黑体谱辐亮度，$T_s$为地表温度，$\varepsilon$为匹配条件的谱发射率，$\tau$为路径透过率，$L_\downarrow$为等效入射背景项，$L_\uparrow$为上行路径辐射。忽略大气、背景和发射率，直接把亮温当$T_s$，会把不同因素混在一起。温度反演还需要波段响应、气氛、地表类型与验证信息。

太阳反射波段转换TOA反射率还涉及太阳几何；热红外不能照搬这个解释链。USGS[Level-1说明](https://www.usgs.gov/landsat-missions/using-usgs-landsat-level-1-data-product)区分反射波段DN→反射率与热波段辐亮度→亮温。不同产品的Level-1/2名称和缩放约定不可仅凭级别编号推定。课件文件页23–29、30–51提供热红外及TM/ETM+历史案例。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Thermal infrared sensors mainly observe emission related to temperature and emissivity and can operate passively at night. A <strong>digital number (DN)</strong> must be interpreted using product metadata: it may already be calibrated and scaled, rather than universally raw brightness. For products with a linear rescaling convention, $L_\lambda=m_L\,DN+a_L$ gives spectral radiance using the band-/version-specific coefficients and units.

Brightness temperature is an equivalent blackbody temperature. A product may specify effective band constants $K_1,K_2$:

$$
T_B=\frac{K_2}{\ln(K_1/L_\lambda+1)}.
$$

This product-dependent conversion does not directly establish surface temperature. For a simplified opaque Lambertian surface with a uniform field, a spectral observation model is

$$
L_{\rm sensor}=\tau\left[\varepsilon B_\lambda(T_s)+(1-\varepsilon)L_\downarrow\right]+L_\uparrow.
$$

Here $B_\lambda$ is blackbody spectral radiance, $T_s$ surface temperature, $\varepsilon$ matched spectral emissivity, $\tau$ path transmittance, $L_\downarrow$ an equivalent incident-background term and $L_\uparrow$ upwelling path radiance. Ignoring these effects and identifying brightness temperature with $T_s$ conflates different causes. Retrieval also requires band response, atmospheric/surface information and validation.

Solar-reflective TOA reflectance conversion additionally involves solar geometry; thermal bands follow a different chain. USGS [Level-1 guidance](https://www.usgs.gov/landsat-missions/using-usgs-landsat-level-1-data-product) separates reflective DN→reflectance from thermal radiance→brightness temperature. Processing-level numbers do not determine scaling conventions across missions. Lecture file pages 23–29 and 30–51 give thermal and historical TM/ETM+ examples.

</div>

## 4.8 微波、后向散射与极化 / Microwave, backscatter and polarization {#rs4-microwave}

<RsFigure id="backscatter" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

<strong>被动微波辐射计（passive microwave radiometer）</strong>接收自然微波热辐射。<strong>雷达（radar）</strong>主动发射射频信号并接收目标回波，它依据传播时间、幅度、频率或相位获得信息。二者不能因为都使用微波而当成同一机制。原课件文件页92把含太阳反射路径的通用被动图标为被动微波，正文以定义表解释被动热微波，选用第94页的主动雷达原图说明返回路径。

微波雷达通常具昼夜与穿云观测优势，但频段、降雨、湿度、系统模式和任务安排仍影响观测；激光雷达也属主动系统，却可受云雾明显阻挡。因此“主动”或“全天候”不能替代条件分析。微波波长较长也不表示能无条件穿透任何材料或看见地下任意深度。

<strong>后向散射（backscatter）</strong>是返回传感器方向的散射。光滑水面在某些侧视几何下将能量镜面反射到别处，雷达可能很暗；粗糙表面向多个方向散射，回波可能较强。粗糙度需相对波长和入射角判断，含水量通过介电性质影响响应。建筑物与地面可产生双程反射，亮点不简单等于更高反射率。

<strong>极化（polarization）</strong>描述电场方向。线极化HH、VV、HV、VH通常第一个字母为发射、第二个为接收，H/V相对于规定的观测基准，不是地图东西方向。交叉极化与同极化提供不同散射信息，不能无条件用某一极化唯一判定一种地物。来源：课件文件页89–97、124–125。


<!-- rs-concept-table-rs4-microwave -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 被动微波辐射计 | Passive microwave radiometer | 自然热微波发射→仪器；可用亮温表述，非直接真实温度。 |
| 主动雷达 | Active radar | 发射→地物散射→回波接收，全天时优势仍有天气/系统条件。 |
| 后向散射 | Backscatter | 返回传感器方向的散射，非全部反射能量。 |
| HH/VV/HV/VH | Polarization channels | 首字母发射、次字母接收，遵守观测坐标约定。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A <strong>passive microwave radiometer</strong> receives naturally emitted microwave radiation. <strong>Radar</strong> transmits radio-frequency energy and measures echoes through travel time, amplitude, frequency or phase. Sharing microwave wavelengths does not make the mechanisms identical. The generic solar-reflection diagram on lecture file page 92 is incorrectly labelled passive microwave; the definition table explains passive thermal microwave emission, and the original page 94 illustrates radar returns.

Microwave radar commonly provides day/night and cloud-penetrating advantages, but frequency, rain, moisture, operating mode and scheduling still matter. Lidar is also active yet can be strongly obstructed by cloud/fog. Active/all-weather labels do not remove conditions. Longer wavelengths do not imply unrestricted penetration of any material or arbitrary subsurface depth.

<strong>Backscatter</strong> returns toward the sensor. Smooth water can specularly reflect energy away and appear dark in side-looking geometry; rough surfaces scatter in several directions and may return more energy. Roughness is relative to wavelength and incidence angle, and moisture influences dielectric response. Buildings/ground may produce double-bounce returns; brightness is not a simple optical-reflectance scale.

<strong>Polarization</strong> describes the electric-field orientation. In the usual HH/VV/HV/VH convention, the first letter is transmit and the second receive. H/V refers to a stated observation basis, not map east/west. Cross-/co-polarised observations respond to different scattering mechanisms, without an unconditional one-polarisation/one-target rule. Sources: file pages 89–97,124–125.


<!-- rs-concept-table-rs4-microwave -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 被动微波辐射计 | Passive microwave radiometer | Receives natural microwave emission; brightness temperature is not directly physical temperature. |
| 主动雷达 | Active radar | Transmit→scatter→receive; day/night advantages retain weather/system conditions. |
| 后向散射 | Backscatter | Scattering toward the sensor, not all reflected energy. |
| HH/VV/HV/VH | Polarization channels | First letter transmit, second receive, under the observing convention. |

</div>

## 4.9 侧视雷达、距离向与合成孔径 / Side-looking geometry, range and synthetic aperture {#rs4-radar}


<RsFigure id="sar-aperture" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

雷达测得回波延迟$t$，理想直线路径中斜距$R=ct/2$；除以2因为信号往返传播。<strong>距离向（range）</strong>沿测距方向，<strong>方位向（azimuth）</strong>沿平台运动方向。不同距离目标可通过回波到达时间区分，同一距离但不同沿轨位置还需天线与相干成像处理区分。

对于未压缩的简单脉冲，脉冲时长$\tau_p$限制理想斜距分辨：$\delta R\approx c\tau_p/2$。脉冲压缩系统有效带宽为$B$时，常用理想近似$\delta R\approx c/(2B)$。这里$B$是雷达信号带宽，不是光学波段间隔。平地、入射角$\theta$从当地竖直量起时，地距分辨近似$\delta x\approx\delta R/\sin\theta$；近天底时该侧视近似不宜无限推广。

例如$B=20$MHz的理想教学信号给出斜距分辨约7.5m；在$\theta=30^\circ$的平地上地距分辨约15m。它说明同一距离脉冲经几何投影会产生不同地面尺度，并非真实载荷规格。距离分辨主要与信号带宽有关，不能通过“增大方位孔径”直接解决。

<strong>真实孔径雷达（real aperture radar, RAR）</strong>的天线长度$D$限制方位波束宽度，远场粗略有$\beta_a\sim\lambda/D$，于是方位足迹约$R\lambda/D$。平台运动中，一个目标被多次相干照射，<strong>合成孔径雷达（synthetic aperture radar, SAR）</strong>记录幅度与相位并按传播几何和多普勒历史聚焦，形成较长的等效孔径。它不是将普通照片拼接，也不是仅靠增加像素数量。

理想宽侧视stripmap、充分聚焦的近似方位分辨可写$\delta a\approx D/2$。这不是所有SAR模式的通式；spotlight、ScanSAR、TOPS、多视与加窗等会改变实际分辨和覆盖。平台轨道、运动补偿与相位稳定性都重要。课件文件页98–114涵盖RAR、SAR及方向分辨，正文简化式明确条件。


<!-- rs-concept-table-rs4-radar -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 斜距 R | Slant range | 双程延迟R=ct/2，m。 |
| 距离向分辨 | Range resolution | 未压缩cτp/2；理想压缩c/(2B)，要区分体制。 |
| 真实孔径 RAR | Real aperture radar | 物理天线约束方位波束，粗略方位足迹Rλ/D。 |
| 合成孔径 SAR | Synthetic aperture radar | 多次相干回波聚焦；D/2仅理想stripmap近似。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

For an ideal straight path, echo delay $t$ gives slant range $R=ct/2$; the factor two accounts for round-trip travel. <strong>Range</strong> is the ranging direction; <strong>azimuth</strong> follows platform motion. Different ranges are separated by echo timing, whereas targets at similar range but different along-track positions require antenna/angular and coherent imaging discrimination.

An uncompressed simple pulse of duration $\tau_p$ has ideal slant-range resolution $\delta R\approx c\tau_p/2$. For pulse compression with effective bandwidth $B$, the ideal approximation is $\delta R\approx c/(2B)$. This is radar signal bandwidth, not optical band spacing. Over flat ground, with incidence $\theta$ measured from the local vertical, ground-range resolution is approximately $\delta x\approx\delta R/\sin\theta$; this side-looking approximation should not be extended without limit toward nadir.

For an illustrative $B=20$ MHz signal, ideal slant resolution is about 7.5 m and flat-ground resolution at $\theta=30^\circ$ about 15 m. These are teaching numbers, not instrument specifications. They show that projection changes ground scale. Improving azimuth aperture does not directly solve range resolution, which mainly depends on signal bandwidth.

For <strong>real aperture radar (RAR)</strong>, antenna length $D$ gives a rough far-field azimuth beamwidth $\beta_a\sim\lambda/D$ and footprint $R\lambda/D$. During flight a target is illuminated coherently several times. <strong>Synthetic aperture radar (SAR)</strong> records amplitude/phase and focuses echoes using propagation geometry and Doppler history, synthesising a longer effective aperture. This is neither stitching ordinary photographs nor increasing pixel count.

An ideal broadside, focused stripmap approximation is $\delta a\approx D/2$, not a formula for every SAR mode. Spotlight, ScanSAR, TOPS, multilooking and windowing alter actual resolution/coverage. Orbit knowledge, motion compensation and phase stability matter. Lecture file pages 98–114 cover these aperture and direction mechanisms.


<!-- rs-concept-table-rs4-radar -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 斜距 R | Slant range | Two-way delay R=ct/2, m. |
| 距离向分辨 | Range resolution | Uncompressed cτp/2; ideal compressed c/(2B), with the waveform specified. |
| 真实孔径 RAR | Real aperture radar | Physical antenna limits azimuth beamwidth; rough footprint Rλ/D. |
| 合成孔径 SAR | Synthetic aperture radar | Focuses coherent echoes; D/2 is only an ideal stripmap approximation. |

</div>

<RsFigure id="radar-geometry" />

## 4.10 透视收缩、叠掩与阴影 / Foreshortening, layover and shadow {#rs4-terrain}

<RsFigure id="radar-terrain" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

雷达按回波传播时间安排距离位置，地形的高低和朝向会改变斜距排序。<strong>斜距（slant range）</strong>是雷达视线距离，<strong>地距（ground range）</strong>是规定地表方向上的距离；从斜距影像转地距影像需要几何模型，不是简单改横轴单位。

迎向雷达的坡面，其斜距差可能比同等地面尺度的平地小，于是出现<strong>透视收缩（foreshortening）</strong>。只发生压缩时，山脚到山顶的回波顺序仍保持。坡更陡、山顶更靠近雷达时，山顶回波先到，出现<strong>叠掩（layover）</strong>，距离顺序反转，不同位置的贡献重叠。并非全部迎坡都叠掩，也不能把它当作影像显示拉伸。

背坡若被山脊遮挡而没有直接照射，形成<strong>雷达阴影（radar shadow）</strong>。阴影与光滑水体的弱后向散射是不同原因，虽然两者都可能暗。几何校正能重新定位已测样本，不能从被遮挡区域恢复没有测到的信息；不同观测方向可能补充信息，但需要另一次观测。

原课件文件页117三图分别标注Foreshortening、Layover和Shadow，中文旧称“前倾、覆盖、阴影”。本课程首选“透视收缩、叠掩、雷达阴影”，保留旧译作查找入口。对照图中的$a,b$距离排序，比单纯记住三个名称更能分清机制。范围来源：文件页115–123。


<!-- rs-concept-table-rs4-terrain -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 透视收缩（前倾） | Foreshortening | 坡面在距离向压缩，尚未要求顶/脚排序反转。 |
| 叠掩（覆盖） | Layover | 山顶回波先于山脚，距离排序反转/重叠。 |
| 雷达阴影 | Radar shadow | 缺直接照射，不是普通低反射率；校正不能补未观测信息。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Radar places range samples using travel time; relief and orientation change slant-range ordering. <strong>Slant range</strong> is line-of-sight distance, whereas <strong>ground range</strong> is distance in a stated surface direction. Conversion requires a geometry model, not merely a new horizontal-axis unit.

On a radar-facing slope the slant-range interval can be smaller than for a comparable flat-ground extent, causing <strong>foreshortening</strong>. With compression alone, the foot-to-summit ordering is retained. On a steeper slope the summit may be closer and return first: <strong>layover</strong> reverses range ordering and superposes contributions. Not every facing slope produces layover; this is not display stretching.

A ridge can block illumination of a back slope, producing <strong>radar shadow</strong>. Shadow and weak backscatter from smooth water are different causes of darkness. Geometric correction relocates observed samples but cannot recover information that was never measured. Another viewing direction may provide observations, requiring another acquisition.

The three panels on lecture file page 117 explicitly label foreshortening, layover and shadow. The lessons use the preferred Chinese terms 透视收缩、叠掩、雷达阴影 and retain older lecture aliases. Inspect the range ordering of $a,b$ to understand the mechanisms. Scope: file pages 115–123.


<!-- rs-concept-table-rs4-terrain -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 透视收缩（前倾） | Foreshortening | Range compression without necessarily reversing summit/foot ordering. |
| 叠掩（覆盖） | Layover | Summit returns before foot, reversing/superposing range ordering. |
| 雷达阴影 | Radar shadow | No direct illumination, not merely low reflectivity; correction cannot restore unobserved data. |

</div>



## 4.11 幅相、相干性与InSAR / Amplitude, phase, coherence and InSAR {#rs4-insar}


<RsFigure id="insar" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

聚焦后的复SAR像元可表示$z=Ae^{i\phi}$。$A$是幅度，常用强度与$A^2$有关；$\phi$为相位，反映传播路径和散射等作用。相位是周期量，差$2\pi$的值在模意义下相同，所以相位色条不能直接当连续高程或位移尺。

<strong>干涉合成孔径雷达（interferometric SAR, InSAR）</strong>利用两次或两个天线的配准复观测形成干涉。若定义干涉积$z_1z_2^*$，相位为$\phi_1-\phi_2$；反过来乘积的符号也反转。<strong>相干性（coherence）</strong>描述局部统计上两复观测的相关程度，理想归一化值在0到1之间，不等于相位本身，也不是某次影像越亮就越相干。

地表散射变化、植被运动、几何基线和噪声都可能导致失相干。地形与基线贡献也会进入干涉相位；<strong>差分InSAR（DInSAR）</strong>需要估计或去除部分非形变项，剩余相位仍可能包含大气、轨道、地形残差和噪声。在已定义正负约定、去除这些影响且正确解缠等条件下，形变相位的量级关系为$|\Delta R|=\lambda|\Delta\phi|/(4\pi)$，因为雷达是双程传播。方向是雷达视线（line of sight, LOS），不直接等于垂直沉降或完整三维位移。

课件文件页126–130提供InSAR和差分干涉入门，本章只建立幅相、干涉、相干与LOS的概念区别；不把一张干涉彩图当作已验证形变产品。第二章中的干涉和第三章的观测几何为这里提供前提。


<!-- rs-concept-table-rs4-insar -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 幅度/强度 | Amplitude/intensity | A与A²相关量；不同于相位。 |
| 相位/干涉 | Phase/interferometry | 周期角；乘积顺序影响差相位正负号。 |
| 相干性 | Coherence | 两复观测的归一化统计一致性，理想0–1。 |
| LOS形变 | Line-of-sight displacement | 需解缠及去除其他贡献；不直接等于垂直或三维位移。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A focused complex SAR pixel can be written $z=Ae^{i\phi}$. $A$ is amplitude and intensity is related to $A^2$; $\phi$ reflects propagation and scattering effects. Phase is periodic: values separated by $2\pi$ are equivalent modulo a cycle. A phase colour scale is not directly a continuous elevation/displacement ruler.

<strong>Interferometric SAR (InSAR)</strong> combines registered complex acquisitions from different times or antennas. Defining the interferogram as $z_1z_2^*$ gives $\phi_1-\phi_2$; reversing the product reverses the sign. <strong>Coherence</strong> quantifies local statistical consistency of complex observations, ideally normalised between zero and one. It is neither phase nor a rule that brighter pixels are more coherent.

Changing scatterers, moving vegetation, baseline geometry and noise can cause decorrelation. Terrain/baseline terms also contribute to phase. <strong>Differential InSAR (DInSAR)</strong> estimates/removes some non-deformation components, but remaining phase may still contain atmosphere, orbit, terrain residuals and noise. Under defined sign conventions, adequate correction/unwrapping and other assumptions, deformation has the magnitude relation $|\Delta R|=\lambda|\Delta\phi|/(4\pi)$ because of two-way propagation. It concerns <strong>line of sight (LOS)</strong> displacement, not directly vertical subsidence or a full three-dimensional vector.

Lecture file pages 126–130 introduce InSAR and differential interferometry. This chapter distinguishes amplitude/phase, interferometry, coherence and LOS, without treating a coloured interferogram as a validated displacement product. Chapter 2's interference and Chapter 3's geometry supply prerequisites.


<!-- rs-concept-table-rs4-insar -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 幅度/强度 | Amplitude/intensity | A versus a quantity related to A²; distinct from phase. |
| 相位/干涉 | Phase/interferometry | Periodic angle; product order determines phase-difference sign. |
| 相干性 | Coherence | Normalised statistical consistency of complex observations, ideally 0–1. |
| LOS形变 | Line-of-sight displacement | Requires unwrapping/correction; not directly vertical or three-dimensional displacement. |

</div>

## 4.12 从任务反推传感器 / From a task to an instrument {#rs4-selection}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

如果要研究校园车辆，先明确需要区分车体还是只估计总占用面积，空间细节与遮挡成为关键；如果要看作物季节变化，波段、物候时序和一致定标更重要；若要追踪云下洪水，雷达可提供优势，但几何、风浪、植被和城市双反射会影响水体解释。没有一种传感器仅凭一个“分辨率”数字就完成所有任务。

中国卫星案例可按任务类型理解：GF-1/6的多光谱宽幅覆盖、GF-2/7的精细光学与立体测绘、GF-3的多极化SAR、GF-4的固定区域高频观测、GF-5的高光谱及大气环境观测。调研材料中的单星/星座、重访/覆盖/调度指标不能混用，本章不照录未独立核实的精确性能。光学nm级波段宽度也不能直接当成SAR的同名“光谱分辨率”。

把选型过程依次写成目标与物理量、所需空间/光谱/时间尺度、可用观测条件、平台与载荷、产品定标与几何、验证方法，就能把前三章和本章连接起来。[术语页](/remote-sensing-glossary)提供快速辨析，[来源页](/remote-sensing-sources)保留课件范围、配图与勘误。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

For campus vehicles, first decide whether individual vehicles or total occupied area must be estimated: spatial detail and occlusion become central. Seasonal crop change requires suitable bands, phenological timing and consistent calibration. Radar can help observe floods beneath clouds, but geometry, waves, vegetation and urban double-bounce affect water interpretation. One resolution number does not fulfil every task.

Chinese examples can be understood by purpose: GF-1/6 multispectral wide coverage, GF-2/7 detailed optical/stereo mapping, GF-3 multipolarisation SAR, GF-4 frequent observations of a fixed region, and GF-5 hyperspectral/atmospheric observations. Single-satellite/constellation and revisit/repeat/scheduling metrics in the survey must not be conflated. Unverified exact performance numbers are not copied. Optical bandwidth in nm is not directly a corresponding SAR spectral-resolution metric.

Connect the course through target/physical quantity → required spatial/spectral/temporal scale → observing conditions → platform/instrument → product calibration/geometry → validation. The [glossary](/remote-sensing-glossary) supplies comparisons and the [source page](/remote-sensing-sources) retains scope, figures and corrections.

</div>

## 4.13 来源与阅读路径 / Sources and reading route {#rs4-sources}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

正文覆盖第4章文件页2–6结构/摄影、7–22扫描、23–51热红外与历史仪器、52–88线阵/立体/光谱仪、89–97微波极化、98–114RAR/SAR、115–125雷达几何与色调、126–130InSAR。英文笔记4–7页的四类分辨率及11页观测几何按概念补充；历史产品表只作特定型号背景，没有更新成现行参数清单。

返回[第三章平台与轨道](/remote-sensing-ch3)复看位置、指向和时间条件；回到[第二章辐射](/remote-sensing-ch2)复看发射率、辐亮度和干涉。至此，辐射、几何、仪器和解释形成一条完整的学习路径。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Coverage: lecture file pages 2–6 structure/photography, 7–22 scanning, 23–51 thermal/historical instruments, 52–88 arrays/stereo/spectrometers, 89–97 microwave/polarization, 98–114 RAR/SAR, 115–125 radar geometry/tone, and 126–130 InSAR. English notes pages 4–7 supplement resolution and page 11 viewing geometry. Historical product tables provide model-specific context rather than updated specifications.

Return to [Chapter 3](/remote-sensing-ch3) for position, pointing and timing, and [Chapter 2](/remote-sensing-ch2) for emissivity, radiance and interference. Radiation, geometry, instruments and interpretation now form one connected reading path.

</div>
