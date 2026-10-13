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

## 反射率、反照率、发射率与BRDF / Reflectance, albedo, emissivity and BRDF {#rs-glossary-surface}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

反射率（reflectance）、吸收率（absorptivity）和透射率（transmittance）是能量比例；匹配同一条件时三者和为1。反照率（albedo）需说明半球与光谱积分口径，也可为光谱量。发射率（emissivity）比较实际物体与同温黑体；基尔霍夫关系需匹配波长/方向等条件。双向反射分布函数（BRDF）是出射辐亮度对入射辐照度的比，单位sr⁻¹，不是无量纲反射率。

[回到正文](./remote-sensing-ch2.html)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Reflectance, absorptivity and transmittance are energy fractions that sum to one under matched conditions. Albedo requires a stated hemispherical and spectral integration convention and may be spectral. Emissivity compares emission with a blackbody at the same temperature; Kirchhoff relations require matched wavelength/directional conditions. BRDF is outgoing radiance per incident irradiance, in sr⁻¹.

[Read the explanation](./remote-sensing-ch2.html)

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

## FOV、IFOV、幅宽、GSD与空间分辨率 / FOV, IFOV, swath, GSD and spatial resolution {#rs-glossary-geometry}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

视场角（FOV）是整体角范围，瞬时视场角（IFOV）是单探元瞬时角范围；幅宽（swath width）是地面覆盖长度。地面采样间距（GSD）描述相邻样本的地面间隔；空间分辨率（spatial resolution）描述区分细节的能力。天底、平地、小角度下地面足迹约H·IFOV，仍不自动等于GSD或有效分辨率。

[回到正文](./remote-sensing-ch4.html#rs4-ifov)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

FOV is the total angular field and IFOV an instantaneous detector angular field; swath width is a ground length. GSD is sample spacing on the ground, whereas spatial resolution is the ability to distinguish spatial detail. The nadir/flat-ground/small-angle footprint approximation H·IFOV does not automatically equal GSD or effective resolution.

[Read the explanation](./remote-sensing-ch4.html#rs4-ifov)

</div>

## 四类分辨率与量化位深 / Four resolutions and quantization bit depth {#rs-glossary-resolution}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

空间（spatial）、光谱（spectral）、辐射（radiometric）、时间（temporal）分辨率对应空间细节、波长区分、辐射差异与时间采样。波段多不必光谱分辨率高，文件位数也不必反映探测器灵敏度。n位有2ⁿ个码值，但有效区分还受输入范围、噪声和定标影响。

[回到正文](./remote-sensing-ch4.html#rs4-resolutions)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Spatial, spectral, radiometric and temporal resolutions concern spatial detail, spectral separation, radiation differences and sampling in time. More bands do not necessarily mean finer spectral resolution, and file bit depth does not specify detector sensitivity. n bits provide 2ⁿ codes, while effective discrimination also depends on input range, noise and calibration.

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

## 摆扫、推扫与CCD / Whiskbroom, pushbroom and CCD {#rs-glossary-scan}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

摆扫（whiskbroom, across-track scanning）用扫描机构横跨地面逐点或多探元分段采集；推扫（pushbroom, along-track scanning）用横跨幅宽的线阵同时采集一行，平台运动提供沿轨维度。CCD是器件类型，不是推扫的同义词。

[回到正文](./remote-sensing-ch4.html#rs4-scanning)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Whiskbroom/across-track scanning uses a scanning mechanism to acquire points or detector segments across the ground. Pushbroom/along-track scanning records a cross-track detector line simultaneously; platform motion supplies the along-track dimension. CCD names a detector technology, not a synonym for pushbroom.

[Read the explanation](./remote-sensing-ch4.html#rs4-scanning)

</div>

## 后向散射、极化、RAR与SAR / Backscatter, polarization, RAR and SAR {#rs-glossary-radar}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

后向散射（backscatter）是返回传感器方向的散射；极化（polarization）描述电场方向，HH/VV/HV/VH注明发射/接收约定。真实孔径雷达（RAR）使用物理天线孔径，合成孔径雷达（SAR）利用运动中的相干回波处理形成等效孔径，不能当普通影像拼接。

[回到正文](./remote-sensing-ch4.html#rs4-radar)

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Backscatter returns toward the sensor. Polarization describes electric-field orientation, with transmit/receive conventions stated for HH/VV/HV/VH. Real aperture radar (RAR) uses a physical antenna aperture; SAR coherently processes echoes during platform motion to synthesise an effective aperture rather than stitching ordinary images.

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
