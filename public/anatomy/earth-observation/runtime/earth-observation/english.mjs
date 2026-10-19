export const english={
 energy:{title:'An energy budget for the same field',labels:['Incident power / W','Reflectance ρ','Transmitted share of the remaining energy'],note:'Select ρ, then split the remainder between transmission and absorption: ρ+τ+α=1. The camera receives only a small portion in one direction. The three front columns show reflected, transmitted and absorbed power, from left to right; their height uses the same power scale.'},
 radiometry:{title:'Rotate the receiving aperture',labels:['Angle θ between normal and viewing direction / °','Radiance L / W m⁻² sr⁻¹'],note:'dA=0.01 m² and dΩ=0.001 sr. dΦ=L cosθ dA dΩ; Lambertian hemispherical exitance M=πL. Radiance and exitance have different units.'},
 thermal:{title:'A thermal source and brightness temperature',labels:['Temperature T / K','Wavelength λ / μm','Emissivity ε'],note:'Surface emission only; reflected downwelling radiation and atmospheric effects are excluded. Spectral radiance is per μm. Brightness temperature follows the inverse Planck law.'},
 reflectance:{title:'Illumination and viewing directions',labels:['Solar zenith angle / °','Viewing zenith angle / °','Lambertian reflectance ρ'],note:'Ideal Lambertian sample: L=ρE₀cosθs/π, with E₀=1000 W/m². Viewing angle changes aperture flux but does not change L for this ideal surface. Real BRDF can be directional.'},
 orbit:{title:'An orbit and an observation opportunity',labels:['Orbital height / km','Orbital phase / °'],note:'Circular two-body orbit. The satellite moves around the globe; its height stroke is exaggerated for visibility. Period does not equal local revisit time, and the model does not implement J₂ sun synchronization.'},
 scanner:{title:'Along-track sampling and instantaneous field of view',labels:['Height H / km','Detector width d / mm','Focal length f / mm','Sampling interval Δt / s'],note:'β≈d/f; instantaneous ground footprint is 2H tan(β/2), while along-track sample spacing is vgΔt. Footprint differs from product GSD; sampling interval differs from integration time and dwell time.'},
 terrain:{title:'The same slope in slant-range coordinates',labels:['Incidence angle θ / °','Foreslope α / °','Backslope β / °'],note:'Two-dimensional section: ω=θ−α, physical local incidence=|ω|, and dR/ds=sinω. Foreslope reversal and backslope self-shadow are geometric tests. Complete occlusion requires ray visibility. A flat selected slope collapses the teaching wedge to the reference plane.'}
};
const words=[['迎坡正常','normal foreslope order'],['迎坡反序','foreslope reversal'],['无背坡自阴影','no backslope self-shadow'],['背坡自阴影','backslope self-shadow'],['孔径通量','aperture flux'],['相对接收通量','relative aperture flux'],['轨道速度','orbital speed'],['沿轨间隔','along-track spacing'],['反射','reflected'],['透射','transmitted'],['吸收','absorbed'],['周期','period'],['足迹','footprint']];
export function englishReadout(text){for(const [a,b]of words)text=text.replaceAll(a,b);return text;}
export const plotLabels={
 frame:['显示窗：转角扫描的正弦分量（归一化）','Display: normalized sine component versus a turn-angle sweep'],
 latitude:['显示窗：B、u、Φ 三个角度，以90°归一化','Display: B, u and Φ, normalized by 90°'],
 curvature:['显示窗：A 从0°到180°，曲率半径在 M 与 N 间归一化','Display: A from 0° to 180°; radius normalized between M and N'],
 metric:['显示窗：东西与南北系数之比','Display: ratio of east–west to north–south scale'],
 geodesic:['显示窗：沿程纬度增量，5°对应满量程','Display: latitude change along the route; full scale is 5°'],
 reduction:['显示窗：两端高度（200 m 满量程）；水平、竖直机械比例不同','Display: endpoint heights, full scale 200 m; horizontal and vertical mechanical scales differ'],
 midpoint:['显示窗：对称纬度区间内的 cos B','Display: cos B across the symmetric latitude interval'],
 energy:['显示窗：反射、透射、吸收比例；前三根柱高按功率同比例','Display: reflected, transmitted and absorbed fractions; front column heights share one power scale'],
 radiometry:['显示窗：θ 从0°到85°的 cosθ','Display: cosθ as θ runs from 0° to 85°'],
 thermal:['显示窗：3–20 μm 发射谱，25 W/(m²·sr·μm) 满量程','Display: emitted spectrum from 3–20 μm; full scale 25 W/(m²·sr·μm)'],
 reflectance:['显示窗：理想 Lambert 辐亮度不随观测角变，320 W/(m²·sr) 满量程','Display: constant Lambertian radiance versus viewing angle; full scale 320 W/(m²·sr)'],
 orbit:['显示窗：300–1000 km 的周期，120 min 满量程；高度行程为教学放大','Display: period for heights 300–1000 km; full scale 120 min; height stroke is exaggerated'],
 scanner:['显示窗：瞬时足迹与沿轨间隔各自归一化，仅用于分清两种量','Display: separately normalized footprint and sample spacing, for distinguishing the quantities'],
 phase:['显示窗：两周期的实部信号；相位盘显示包裹角','Display: real signal over two cycles; dial shows wrapped angle'],
 penetration:['显示窗：0–0.5 m 垂直埋深的双程功率；前三层块表示均匀介质','Display: two-way power over 0–0.5 m vertical depth; front blocks represent a uniform medium'],
 chirp:['显示窗：延迟 −T 到 T 的归一化匹配滤波相关','Display: normalized matched-filter correlation for delays −T to T'],
 aperture:['显示窗：沿轨 −50 到50 m 的传播相位实部','Display: real propagation-phase component over along-track positions −50 to 50 m'],
 terrain:['显示窗：迎坡角0–70°的 dR/ds，负值表示反序','Display: dR/ds for foreslopes 0–70°; negative values indicate reversal'],
 speckle:['显示窗：64像元强度；深色主题越亮/浅色主题越深表示强度越大','Display: 64 intensities; stronger return is brighter in dark theme and darker in light theme'],
 coherence:['显示窗：各样本交叉乘积的实部（缩放6倍）','Display: real cross-product per sample, scaled by six']
};
