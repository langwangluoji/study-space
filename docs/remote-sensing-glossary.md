---
title: 双语术语与概念对照
prev:
  text: 第四章 传感器与成像
  link: /remote-sensing-ch4
next:
  text: 来源、配图与勘误
  link: /remote-sensing-sources
---

# 双语术语与概念对照

Bilingual Terminology and Concept Contrasts

<RsLanguage />

同一术语保留中文首选名、标准英文与必要缩写。 / Chinese preferred names, standard English terms and common abbreviations are kept together.

## 观测数据、数据产品与信息产品 / Observations, data products and information products {#rs-glossary-workflow}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

观测数据（observational data）是传感器记录及其定标表达；影像/数据产品（image/data product）是经处理、定位和质量说明后可使用的数据；信息产品（information product）来自解译、反演或分类并面向应用。数据不自动等于信息，辅助数据与验证可形成反馈。

[回到正文](./remote-sensing-ch1.html#rs1-information-chain)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Observational data are sensor records and their calibrated expressions. Image/data products are processed, located and quality-described datasets. Information products result from interpretation, retrieval or classification for an application. Data do not automatically equal information; ancillary data and validation can create feedback.

[Read the explanation](./remote-sensing-ch1.html#rs1-information-chain)

</div>

## 平台、传感器与探测器 / Platform, sensor and detector {#rs-glossary-system}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

平台（platform）承载设备；传感器（sensor）收集并测量辐射；探测器（detector）是其中把辐射转换为信号的元件。卫星名字不能代替载荷型号。

[回到正文](./remote-sensing-ch3.html#rs3-platforms)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A platform carries the equipment, a sensor measures radiation, and a detector is a signal-converting component within that sensor. A satellite name does not specify its instrument.

[Read the explanation](./remote-sensing-ch3.html#rs3-platforms)

</div>

## 主动、被动与波段分类 / Active/passive and spectral classifications {#rs-glossary-energy}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

主动遥感（active remote sensing）发射探测能量，被动遥感（passive remote sensing）接收自然反射或发射辐射；光学和微波按波段分类。主动不保证全天候，被动热红外可以夜间工作。近距离感知（proximal sensing）不必接触目标。

[回到正文](./remote-sensing-ch1.html)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Active remote sensing supplies probing energy; passive sensing receives naturally reflected or emitted radiation. Optical/microwave describes a spectral category. Active does not guarantee all-weather operation; passive thermal infrared can work at night. Proximal sensing need not involve contact.

[Read the explanation](./remote-sensing-ch1.html)

</div>

## 辐射能、通量、辐照度、出射度与辐亮度 / Energy, flux, irradiance, exitance and radiance {#rs-glossary-radiometry}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

辐射能（radiant energy, Q）是能量，单位J；辐射通量（radiant flux, Φ）是功率，单位W。辐照度（irradiance, E）和辐射出射度（radiant exitance, M）分别按接收/发出面积计功率，单位W m⁻²。辐亮度或辐射亮度（radiance, L）按投影面积与立体角计，单位W m⁻² sr⁻¹。光谱量（spectral quantities）还要除波长单位，不混用每米与每微米。

[回到正文](./remote-sensing-ch2.html)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Radiant energy Q is measured in J and radiant flux Φ in W. Irradiance E and radiant exitance M are incident and outgoing flux per unit area, in W m⁻². Radiance L is flux per projected area and solid angle, in W m⁻² sr⁻¹. Spectral quantities add a wavelength-density unit; per-metre and per-micrometre values are different.

[Read the explanation](./remote-sensing-ch2.html)

</div>

## 反射率、反照率、BRDF与BRF / Reflectance, albedo, BRDF and BRF {#rs-glossary-surface}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

反射率（reflectance）和反照率（albedo）是需说明光谱及方向积分口径的比值。双向反射分布函数（BRDF）是出射辐亮度对入射辐照度的比，单位sr⁻¹；双向反射因子（BRF）与同几何下理想朗伯参考面比较，为无量纲量。BRF不是BRDF的无单位简称。

[回到正文](./remote-sensing-ch2.html#rs2-reflectance-brdf)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Reflectance and albedo are ratios that require spectral and angular integration conventions. BRDF is outgoing radiance per incident irradiance, in sr⁻¹. BRF compares radiance with an ideal Lambertian reference under matched geometry and is dimensionless. BRF is not a unit-free synonym for BRDF.

[Read the explanation](./remote-sensing-ch2.html#rs2-reflectance-brdf)

</div>

## 光谱标志、响应模式与像元光谱 / Spectral signatures, response patterns and pixel spectra {#rs-glossary-spectral-levels}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

光谱标志（spectral signature）是教学中的辨识性称呼；光谱响应模式（spectral response pattern）强调波段、状态、尺度、环境和几何条件。材料光谱、端元/组分光谱与像元光谱处于不同测量或建模层级，不能直接等同。

[回到正文](./remote-sensing-ch2.html#rs2-spectral-signatures)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Spectral signature is a useful identification label, while spectral response pattern stresses bands, state, scale, environment and geometry. Material, endmember/component and pixel spectra occupy different measurement or modelling levels and are not interchangeable.

[Read the explanation](./remote-sensing-ch2.html#rs2-spectral-signatures)

</div>

## 黑体、灰体、朗伯表面与亮温 / Blackbody, graybody, Lambertian surface and brightness temperature {#rs-glossary-thermal}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

黑体（blackbody）完全吸收入射辐射；灰体（graybody）在约定范围采用不随波长变化的发射率。朗伯表面（Lambertian surface）描述方向分布，不等于发射率为1。亮度温度或亮温（brightness temperature）是产生相同谱辐亮度的等效黑体温度；实际地表温度还需考虑发射率、反射背景和大气。

[回到正文](./remote-sensing-ch4.html#rs4-thermal)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A blackbody completely absorbs incident radiation. A graybody assumes wavelength-independent emissivity over a stated range. A Lambertian surface specifies angular behaviour, not unit emissivity. Brightness temperature is an equivalent blackbody temperature for the measured spectral radiance; surface temperature also requires emissivity, reflected background and atmospheric effects.

[Read the explanation](./remote-sensing-ch4.html#rs4-thermal)

</div>

## 同步、静止与太阳同步轨道 / Geosynchronous, geostationary and sun-synchronous orbits {#rs-glossary-orbit}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

地球同步（geosynchronous）约束恒星日周期；地球静止（geostationary）是赤道圆形顺行的同步特殊情况。太阳同步（sun-synchronous）用轨道面进动保持同类过境平均地方太阳时近似一致，不等于每天成像同一地点，也不保证太阳高度角全年相同。

[回到正文](./remote-sensing-ch3.html#rs3-orbits)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Geosynchronous specifies a sidereal-day orbital period. Geostationary is its circular prograde equatorial special case. Sun-synchronous uses nodal precession to maintain approximately consistent mean local solar time for comparable passes; it does not mean daily imaging of the same place or constant solar elevation throughout the year.

[Read the explanation](./remote-sensing-ch3.html#rs3-orbits)

</div>

## 轨道周期、重复周期、重访与有效观测 / Orbital period, repeat cycle, revisit and usable observations {#rs-glossary-timing}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

轨道周期（orbital period）是绕地一圈的时间；地面轨迹重复周期（ground-track repeat cycle）指轨迹格局重复；重访间隔（revisit interval）是再次获得某目标观测机会的间隔。有效观测还受云、任务安排和质量约束，一圈不必重访。

[回到正文](./remote-sensing-ch3.html#rs3-timing)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The orbital period is one revolution. A ground-track repeat cycle describes repetition of the track pattern. A revisit interval concerns opportunities to observe a target again. Usable observations also depend on cloud, scheduling and quality, so one revolution need not be one revisit.

[Read the explanation](./remote-sensing-ch3.html#rs3-timing)

</div>

## IFOV、GSD、GRD、像元、PSF/MTF与空间分辨率 / IFOV, GSD, GRD, pixels, PSF/MTF and spatial resolution {#rs-glossary-geometry}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

IFOV是单探元瞬时角范围；地面足迹是其投影响应范围；GSD是相邻样本间距；GRD按规定目标、对比度、噪声与判据描述可分辨地面尺度，区别于SAR的Ground Range Detected产品；产品像元大小是交付格网尺寸。PSF/MTF描述空间响应和对比度传递。检测到小目标不等于分辨其内部细节，重采样也不新增观测细节。

[回到正文](./remote-sensing-ch4.html#rs4-ifov)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

IFOV is a detector angular field; footprint is its projected response extent; GSD is adjacent-sample spacing; GRD is ground resolving scale under specified target, contrast, noise and criteria, distinct from a SAR Ground Range Detected product; product pixel size is a delivered grid dimension. PSF/MTF describe spatial response and contrast transfer. Detecting a small target does not resolve its internal detail, and resampling adds no new observation.

[Read the explanation](./remote-sensing-ch4.html#rs4-ifov)

</div>

## 四类分辨率、SRF、SNR与角度采样 / Four resolutions, SRF, SNR and angular sampling {#rs-glossary-resolution}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

空间、光谱、辐射、时间分辨率分别对应空间细节、波长区分、辐射差异与时间采样。SRF/FWHM描述通道响应与带宽，动态范围、SNR和定标限制有效辐射区分；角度采样说明照明与观察方向。波段数、文件位数和像元数都不能单独代表实际分辨能力。

[回到正文](./remote-sensing-ch4.html#rs4-resolutions)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Spatial, spectral, radiometric and temporal resolutions concern spatial detail, wavelength discrimination, radiation differences and time sampling. SRF/FWHM describe channel response and bandwidth; dynamic range, SNR and calibration limit effective radiometric discrimination; angular sampling states illumination/view directions. Band, bit and pixel counts do not alone specify actual resolving ability.

[Read the explanation](./remote-sensing-ch4.html#rs4-resolutions)

</div>

## DN、辐亮度、大气顶与地表反射率 / DN, radiance, TOA and surface reflectance {#rs-glossary-dn}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

数字量化值（digital number, DN）是产品中的编码，需看元数据的缩放/定标约定。辐亮度是物理量；大气顶反射率（TOA reflectance）和地表反射率（surface reflectance）不是同一产品。热红外应转辐亮度/亮温等，不沿用太阳反射波段的反射率解释。

[回到正文](./remote-sensing-ch4.html#rs4-thermal)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A digital number (DN) is a product code whose scaling/calibration is specified in metadata. Radiance is a physical quantity. Top-of-atmosphere (TOA) and surface reflectance are different products. Thermal infrared follows a radiance/brightness-temperature interpretation rather than the solar-reflectance chain.

[Read the explanation](./remote-sensing-ch4.html#rs4-thermal)

</div>

## 全色、多光谱、高光谱与颜色显示 / Panchromatic, multispectral, hyperspectral and display colour {#rs-glossary-bands}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

全色（panchromatic）通常为单宽波段；多光谱（multispectral）是多个选择波段；高光谱（hyperspectral）强调大量窄而近连续的光谱采样。真彩色/假彩色（true/false colour）是波段映射到RGB显示通道，近红外显示为红色不说明叶片真的红。

[回到正文](./remote-sensing-ch4.html#rs4-colour)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Panchromatic generally uses one broad band; multispectral uses selected bands; hyperspectral emphasises many narrow, nearly contiguous samples. True/false colour concerns mapping bands to RGB display channels. Rendering near infrared as red does not mean that leaves are physically red.

[Read the explanation](./remote-sensing-ch4.html#rs4-colour)

</div>

## 摆扫、推扫、驻留/积分时间与CCD / Whiskbroom, pushbroom, dwell/integration time and CCD {#rs-glossary-scan}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

摆扫用扫描机构依次采集横轨位置；推扫用横跨幅宽的线阵同时积分一行，平台运动提供沿轨维度。驻留时间（dwell time）是地面单元处于探元视场中的可观测时段；积分时间（integration time）是实际累积响应的时长，受驻留、读出、SNR和运动模糊约束，二者不必相等。CCD是器件类型，不是推扫同义词。

[回到正文](./remote-sensing-ch4.html#rs4-scanning)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Whiskbroom samples cross-track positions sequentially; pushbroom integrates a cross-track line while platform motion supplies along-track sampling. Dwell time is the interval a ground cell stays in the detector field; integration time is the actual accumulation interval, constrained by dwell, readout, SNR and motion blur. They need not be equal. CCD is a detector technology, not a synonym for pushbroom.

[Read the explanation](./remote-sensing-ch4.html#rs4-scanning)

</div>

## 雷达散射、极化、RAR与SAR / Radar scattering, polarization, RAR and SAR {#rs-glossary-radar}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

后向散射受相对粗糙度、局部入射角、介电性质、含水量、波长、极化和结构共同控制。表面散射、体散射与双反射是不同机制。RAR使用物理天线孔径；SAR相干处理运动中的回波形成等效孔径，不能当普通影像拼接。

[回到正文](./remote-sensing-ch4.html#rs4-radar)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Backscatter is jointly controlled by relative roughness, local incidence angle, dielectric properties, moisture, wavelength, polarisation and structure. Surface, volume and double-bounce scattering are distinct mechanisms. RAR uses a physical aperture; SAR coherently focuses motion-dependent echoes rather than stitching ordinary images.

[Read the explanation](./remote-sensing-ch4.html#rs4-radar)

</div>

## 相干斑、多视、滤波与定标 / Speckle, multilooking, filtering and calibration {#rs-glossary-speckle}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

相干斑（speckle）来自分辨单元内相干回波的随机干涉，不等同普通加性噪声或真实纹理。多视与空间滤波可降低起伏，但常牺牲空间细节或边缘；辐射定标建立物理尺度，不能替代去斑。

[回到正文](./remote-sensing-ch4.html#rs4-radar)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Speckle comes from random interference among coherent returns within a resolution cell, not ordinary additive noise or true texture. Multilooking and spatial filtering reduce fluctuation but commonly sacrifice spatial detail or edges. Radiometric calibration establishes a physical scale and does not replace despeckling.

[Read the explanation](./remote-sensing-ch4.html#rs4-radar)

</div>

## 斜距、地距、透视收缩、叠掩与阴影 / Slant range, ground range, foreshortening, layover and shadow {#rs-glossary-terrain}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

斜距（slant range）沿雷达视线，地距（ground range）沿规定地表方向。透视收缩（foreshortening，课堂别名“前倾”）压缩坡面距离；叠掩（layover，旧称“覆盖”）包含山顶/山脚回波排序反转；阴影（radar shadow）缺少直接照射。阴影不只是低反射率。

[回到正文](./remote-sensing-ch4.html#rs4-terrain)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Slant range follows the radar line of sight; ground range follows a stated surface direction. Foreshortening compresses a slope in range. Layover involves reversed range ordering of summit and foot. Radar shadow lacks direct illumination and is not merely low reflectivity.

[Read the explanation](./remote-sensing-ch4.html#rs4-terrain)

</div>

## 幅度、相位、干涉与相干性 / Amplitude, phase, interferometry and coherence {#rs-glossary-insar}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

复SAR影像有幅度与相位。干涉合成孔径雷达（InSAR）比较观测的干涉相位，相干性（coherence）描述两次复观测的统计一致程度。差分InSAR的相位除形变还可能含地形、轨道、大气与噪声；形变关系必须说明视线方向与正负约定。

[回到正文](./remote-sensing-ch4.html#rs4-insar)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Complex SAR imagery contains amplitude and phase. InSAR compares interferometric phase; coherence measures the statistical consistency of complex observations. Differential phase may contain terrain, orbit, atmospheric and noise effects as well as deformation. A displacement relation requires line-of-sight and sign conventions.

[Read the explanation](./remote-sensing-ch4.html#rs4-insar)

</div>
