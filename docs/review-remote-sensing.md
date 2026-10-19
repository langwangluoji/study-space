---
title: 遥感期末关键总结 · Exam essentials
---

# 遥感期末关键总结 / Remote-sensing exam essentials

<RsLanguage />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

同一田块在第二天影像变暗：先核对光源、辐射与大气，再核对平台时刻、观测角和采样，才解释地表变化。本页覆盖本站已整理的前四章，不把原资料第5–9章算作已完成正文；考试范围以教师要求为准。[回课程路线](course-remote-sensing.html)。

## 公式、单位、条件

| 量或任务 | 关键关系 | 容易出错之处 |
| --- | --- | --- |
| 波长与频率 | $c=\lambda\nu$ | 真空近似；微米、毫米先换 SI |
| 能量分配 | $\rho+\tau+\alpha=1$ | 同一波长、同一条件；反射率不等于相机 DN |
| 辐照度、出射度 | $E=d\Phi/dA,\ M=d\Phi_{\rm out}/dA$，单位 W/m² | 入射与出射不同；不能与 W/(m²·sr) 的辐亮度混用 |
| 辐亮度 | $d\Phi=L\cos\theta\,dA\,d\Omega$ | 面法线夹角、投影面积；Lambert 面 $M=\pi L$ |
| Planck 定律 | $B_\lambda=2hc^2/[\lambda^5(e^{hc/(\lambda kT)}-1)]$ | SI 的 $\lambda$ 用 m；每 m 转每 μm 须乘 $10^{-6}$ |
| 热辐射积分与峰值 | $M_b=\sigma T^4$；$\lambda_{\max}T\approx2898$ μm·K | 波长谱峰值；不能与频率谱峰值直接互换 |
| 灰体自发射 | $L_\lambda=\varepsilon_\lambda B_\lambda(T)$ | 此式未含反射下行辐射或大气；$T_B$ 由反演 Planck 得到，不等于 $\varepsilon T$ |
| 圆轨道 | $v=\sqrt{\mu/(R+H)}$；$T=2\pi\sqrt{(R+H)^3/\mu}$ | 周期不等于重访；太阳同步需要轨道面进动条件 |
| 瞬时视场 | $\beta\approx d/f$；$g=2H\tan(\beta/2)$ | 近天底平面几何；$g$ 为足迹，不自动等于产品 GSD |
| 沿轨采样 | $\Delta x=v_g\Delta t$ | 地面速度；采样间隔、积分时间、驻留时间分别定义 |

## 题型路线

**辐射量题：** 先看给的是总通量、单位面积量还是单位立体角量 → 写单位 → 写投影余弦与积分边界。Lambert 假设下半球积分为 $\pi$，不是 $2\pi$。[详细推导](remote-sensing-ch2.html)。

**亮温题：** 统一波长单位 → 算谱辐亮度 → 加入题设发射率及大气项 → 反演传感器等效黑体温度。仅自发射时，300 K、10 μm 的黑体 $B_\lambda\approx9.924$ W/(m²·sr·μm)；$\varepsilon=0.9$ 时 $T_B\approx293.601$ K，不是270 K。

**轨道与成像题：** 先画平台运动和地球自转 → 分清周期、覆盖、重访及观测机会 → 再分沿轨和跨轨采样。700 km 圆轨道周期约98.6236 min，并不代表任意田块每98.6236 min被有效观测一次。[轨道](remote-sensing-ch3.html) · [扫描与成像](remote-sensing-ch4.html)。

## 比较题抓住“观测了什么”

摆扫用扫描镜逐线跨轨扫描，推扫用线阵同时覆盖跨轨；两者均受平台运动与辐射积分条件约束。空间、光谱、时间和辐射分辨率分别描述不同维度，像元变小不自动提高全部质量。主动/被动按能量来源分，光学/微波按波段分，二者不是同一分类轴。热红外不是“反射太阳热量”的统称。真实地物光谱受波长、方向、湿度、结构与大气共同影响，一张暗图不足以唯一确定作物状态。[术语对照](remote-sensing-glossary.html) · [原资料与范围](remote-sensing-sources.html)。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

When the same field looks darker on a second date, check illumination, radiation and atmosphere, then acquisition time, geometry and sampling before attributing the difference to the surface. These notes cover the four completed chapters; source materials for Chapters 5–9 are not completed lessons. The instructor defines the examination scope. [Course route](course-remote-sensing.html).

## Equations, units and assumptions

| Quantity or task | Key relation | Essential condition |
| --- | --- | --- |
| Wavelength and frequency | $c=\lambda\nu$ | Vacuum approximation; convert μm and mm to SI |
| Energy balance | $\rho+\tau+\alpha=1$ | Same wavelength and conditions; reflectance is not camera DN |
| Irradiance and exitance | $E=d\Phi/dA,\ M=d\Phi_{\rm out}/dA$, W/m² | Incoming versus outgoing; neither is radiance in W/(m²·sr) |
| Radiance | $d\Phi=L\cos\theta\,dA\,d\Omega$ | Angle to the surface normal and projected area; Lambertian $M=\pi L$ |
| Planck law | $B_\lambda=2hc^2/[\lambda^5(e^{hc/(\lambda kT)}-1)]$ | SI wavelength in m; multiply per-metre output by $10^{-6}$ for per-μm |
| Integrated emission and peak | $M_b=\sigma T^4$; $\lambda_{\max}T\approx2898$ μm·K | Wavelength-spectrum peak is not obtained by directly converting the frequency-spectrum peak |
| Greybody emission | $L_\lambda=\varepsilon_\lambda B_\lambda(T)$ | Excludes reflected downwelling radiance and atmosphere; invert Planck for $T_B$, not $\varepsilon T$ |
| Circular orbit | $v=\sqrt{\mu/(R+H)}$; $T=2\pi\sqrt{(R+H)^3/\mu}$ | Orbit period differs from revisit; sun synchronization requires orbital-plane precession |
| Instantaneous field of view | $\beta\approx d/f$; $g=2H\tan(\beta/2)$ | Near-nadir planar geometry; footprint is not automatically product GSD |
| Along-track sampling | $\Delta x=v_g\Delta t$ | Use ground speed; distinguish sampling interval, integration time and dwell time |

## Routes through typical questions

**Radiometry:** identify flux, an area-normalized quantity or a solid-angle-normalized quantity → write units → apply projected area and integration limits. The Lambertian hemisphere integral gives $\pi$, not $2\pi$. [Derivation](remote-sensing-ch2.html).

**Brightness temperature:** convert wavelength units → calculate spectral radiance → include the specified emissivity and atmospheric terms → invert for the equivalent blackbody temperature. At 300 K and 10 μm, $B_\lambda\approx9.924$ W/(m²·sr·μm); for emission only and $\varepsilon=0.9$, $T_B\approx293.601$ K, not 270 K.

**Orbit and imaging:** draw platform motion and Earth rotation → distinguish period, coverage, revisit and opportunities → separate along-track and across-track sampling. A 700 km circular orbit has a period of about 98.6236 min; this does not imply a valid observation of every field each orbit. [Orbits](remote-sensing-ch3.html) · [Imaging](remote-sensing-ch4.html).

## Comparisons: identify what is observed

Whiskbroom systems scan across track with a mirror; pushbroom line arrays acquire an across-track line simultaneously. Both depend on platform motion and radiometric integration. Spatial, spectral, temporal and radiometric resolution describe different dimensions; smaller pixels do not automatically improve every quality measure. Active/passive classifies the energy source, while optical/microwave classifies wavelength. Thermal infrared does not simply mean reflected solar heat. Surface spectra depend on wavelength, direction, moisture, structure and atmosphere, so a dark image does not uniquely establish crop condition. [Glossary](remote-sensing-glossary.html) · [Sources and scope](remote-sensing-sources.html).

</div>
