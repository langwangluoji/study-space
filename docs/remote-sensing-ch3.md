---
title: 第三章 遥感平台及运行特点
description: 完整双语学习资料：平台、轨道六参数、太阳同步、地面轨迹、重访与姿态，以及中外遥感任务案例。
prev:
  text: 第二章 电磁辐射基础 / Electromagnetic radiation
  link: /remote-sensing-ch2
next:
  text: 第四章 传感器与成像 / Sensors and imaging
  link: /remote-sensing-ch4
---

# 第三章 遥感平台及运行特点

Remote Sensing Platforms and Orbital Characteristics

<RsLanguage />

## 3.1 平台承担什么工作 / What a platform provides {#rs3-platforms}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

遥感平台（remote sensing platform）是承载观测设备的载体。传感器（sensor）接收或主动探测辐射，产生观测数据；探测器（detector）是传感器内部把辐射转成电信号等可记录响应的元件。因此，“Landsat 8”“OLI”“探测元件”分别处在平台、传感器和内部组件三个层级。同一卫星可以搭载多种传感器，同一种类型的传感器也可以安装在不同平台上。

平台为观测提供位置、朝向、供电、热环境、计时和数据传输条件。空间影像有几何位置，依赖的不只是镜头：还需要知道每个样本采集时卫星在哪里、光轴指向哪里。理解本章时始终分开三个问题：<strong>轨道决定怎样运动，位置说明此刻在哪里，姿态说明此刻朝向哪里。</strong>

地基平台包括支架、车辆和地面观测设施，适合光谱测量、现场实验和与卫星观测对照。航空平台包括飞机、无人机、飞艇等，可按任务安排飞行路线，常用于较小区域的精细调查。航天平台包括卫星、空间站等，可以持续建立大范围观测记录。课件给出的高度范围是典型示例，不是各类别在所有场景下的严格边界；“近距离感知”也不必接触目标。

平台越高，在相同角视场下通常覆盖越宽，但一个固定角足迹对应的地面范围也更大。它不是“越低一定越清晰”的充分条件：口径、探测器、波段、运动、噪声及处理都会影响成像。地基测量能帮助解释卫星信号，却可能只代表一小块地表；卫星像元可能包含植物、裸土和阴影。多平台联合观测的意义，是比较这些不同尺度下的测量。

来源：第3章课件文件页3–8（汇总102–107）；英文整理资料关于平台与传感器的段落25–36。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

A remote sensing platform (遥感平台) carries the observing equipment. A sensor measures radiation or actively probes a target and produces observations. A detector is the component inside a sensor that converts radiation into a recordable response, often an electrical signal. Landsat 8, OLI and an individual detector element therefore belong to three different levels: platform, sensor and internal component. One spacecraft can carry several sensors, and a type of sensor can be installed on different platforms.

The platform supplies position, pointing, power, a controlled thermal environment, timing and data transmission. Geolocating an image requires more than a lens: we need the spacecraft position and the viewing direction when each sample was acquired. Keep three questions separate throughout this chapter: <strong>the orbit describes the motion, position tells us where the spacecraft is, and attitude tells us how it is oriented.</strong>

Ground-based platforms include instrument stands, vehicles and fixed observing facilities. They support spectral measurements, field experiments and comparisons with satellite observations. Airborne platforms include aircraft, uncrewed aircraft and airships; their routes can be arranged for detailed surveys of particular areas. Spaceborne platforms include satellites and space stations and can build long records over large regions. The altitude ranges in the slides are typical examples rather than universal classification boundaries. Proximal sensing does not necessarily involve contact with a target.

For the same angular field of view, a higher platform usually covers a wider area, while a fixed angular footprint also becomes larger on the ground. Lower altitude alone does not guarantee a clearer image: aperture, detector design, wavelength, motion, noise and processing also matter. A field measurement can help explain a satellite signal but may represent only a small patch. A satellite pixel can contain plants, bare soil and shadows together. Combining platforms helps connect measurements made at these different scales.

Sources: Chapter 3, file pages 3–8 (compilation pages 102–107); English summary paragraphs 25–36.

</div>

## 3.2 怎样描述一条轨道 / Describing an orbit with six elements {#rs3-elements}


<RsFigure id="orbital-elements" />
<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

先采用理想的地心二体模型：地球与卫星之间只有中心引力，地球为椭球的影响、大气阻力、日月引力与推力暂不计入。束缚轨道是椭圆，地心位于一个焦点，而不在椭圆中心。近地点（perigee）离地心最近，远地点（apogee）最远；这里的距离是地心距离，不是离地高度。

六个经典轨道根数（classical orbital elements）依次回答大小形状、空间定向和沿轨位置。下表采用常用符号，避免课件字体识别将不同角度混在一起。

| 根数 | English | 含义与测量平面 |
| --- | --- | --- |
| 半长轴 $a$ | semi-major axis | 椭圆半长轴，长度量；决定轨道大小 |
| 偏心率 $e$ | eccentricity | 无量纲；束缚椭圆为 $0\le e<1$，$e=0$ 为圆 |
| 倾角 $i$ | inclination | 轨道面与赤道面的夹角，常取 $0^\circ$ 至 $180^\circ$ |
| 升交点赤经 $\Omega$ | right ascension of the ascending node, RAAN | 在赤道面内，从选定参考方向量到升交点方向 |
| 近地点幅角 $\omega$ | argument of perigee | 在轨道面内，沿运动方向从升交点量到近地点 |
| 真近点角 $\nu$ | true anomaly | 在轨道面内，从近地点量到卫星当前方向 |

升交点（ascending node）是卫星从南向北穿过赤道的位置，降交点（descending node）则从北向南。读六参数图时，先找到赤道面与轨道面的交线，再找升交点；在赤道面读 $\Omega$，在两个平面之间读 $i$，最后在轨道面读 $\omega$ 和 $\nu$。把这几个角都画成地面经纬度，会失去它们原来的参照面。

六根数须对应一个历元（epoch，即参数所属的时刻），并注明参考坐标系；第六个参数也可采用某历元的平近点角配合传播模型。真实轨道受摄动影响，不能把一次给定的六个数当作永远不变。圆轨道没有独特的近地点，因此 $\omega$ 与 $\nu$ 分别失去唯一意义；赤道轨道没有独特的升交点。实际计算可换用避免这些奇异情况的参数。

当 $a$、$e$ 已定义时，二体椭圆的近、远地点地心距离分别为 $r_p=a(1-e)$、$r_a=a(1+e)$。若要换成离地高度，仍需减去相应的地球表面半径；不能直接称 $a$ 为“轨道高度”。这一点会直接影响下一节周期公式是否用对。

来源：第3章课件文件页9–13（汇总108–112），并按标准符号规范近地点幅角与真近点角。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Begin with an ideal geocentric two-body model: only central gravitational attraction acts between Earth and the satellite. Effects of Earth's nonspherical gravity field, atmospheric drag, the Sun, the Moon and thrust are temporarily excluded. A bound orbit is an ellipse with Earth's centre at a focus, not at the ellipse centre. Perigee is the point closest to Earth's centre and apogee the farthest. These distances are geocentric distances, not heights above the surface.

The six classical orbital elements describe size and shape, orientation in space, and position along the orbit. The table uses standard notation to avoid confusing angles in the original slide typography.

| Element | 中文 | Meaning and reference plane |
| --- | --- | --- |
| Semi-major axis $a$ | 半长轴 | A length describing orbit size |
| Eccentricity $e$ | 偏心率 | Dimensionless; $0\le e<1$ for a bound ellipse, with $e=0$ for a circle |
| Inclination $i$ | 倾角 | Angle between the orbital and equatorial planes, conventionally from $0^\circ$ to $180^\circ$ |
| Right ascension of the ascending node $\Omega$ | 升交点赤经，RAAN | Angle in the equatorial plane from a stated reference direction to the ascending node |
| Argument of perigee $\omega$ | 近地点幅角 | Angle in the orbital plane, measured in the direction of motion from the ascending node to perigee |
| True anomaly $\nu$ | 真近点角 | Angle in the orbital plane from perigee to the satellite's current direction |

The ascending node is where the satellite crosses the equator from south to north; the descending node is the north-to-south crossing. To read an orbital-element diagram, first locate the intersection of the equatorial and orbital planes and then the ascending node. Read $\Omega$ in the equatorial plane, $i$ between the planes, and $\omega$ and $\nu$ in the orbital plane. These angles are not simply geographic longitude and latitude.

Elements must be associated with an epoch, the time to which the parameters apply, and a stated reference frame. The sixth element can alternatively be a mean anomaly at an epoch together with a propagation model. Perturbations change a real orbit, so one set of six values should not be treated as permanently fixed. A circular orbit has no unique perigee, making $\omega$ and $\nu$ individually ambiguous. An equatorial orbit has no unique ascending node. Practical calculations can use alternative elements to avoid these singular cases.

With $a$ and $e$ defined, the perigee and apogee geocentric distances in the two-body ellipse are $r_p=a(1-e)$ and $r_a=a(1+e)$. Converting them to altitude requires subtracting the relevant surface radius. The semi-major axis is not an altitude. This distinction is essential when using the period formula below.

Source: Chapter 3, file pages 9–13 (compilation pages 108–112), with standardised notation for argument of perigee and true anomaly.

</div>

## 3.3 同步的对象究竟是什么 / Geosynchronous, geostationary and sun-synchronous {#rs3-orbits}

<RsFigure id="orbits" />

<RsFigure id="geostationary" />

<RsFigure id="sun-sync" />

<RsFigure id="precession" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

“同步”必须问清与什么同步。地球同步轨道（geosynchronous orbit）的轨道周期与地球自转的恒星日相等，约为23小时56分。这里不是把民用24小时直接当作精确轨道周期。倾斜或偏心的同步轨道，在地面看来仍会南北或东西移动。

地球静止轨道（geostationary orbit）是地球同步的特殊情况，须同时满足<strong>圆轨道、赤道面、顺行、周期等于地球自转恒星日</strong>。卫星相对地面某一经度近似固定，适合连续观察同一大区域。它的优势是频繁获得云系演变等时间信息，但只能看见朝向卫星的地球一侧，高纬观测几何较差。静止并不表示传感器不用扫描；平台近似不动，仪器仍需逐步收集整个地球圆盘不同位置的辐射。

倾角描述轨道面的定向。顺行轨道通常有 $0^\circ<i<90^\circ$，逆行有 $90^\circ<i<180^\circ$，极轨约为 $90^\circ$。近极地（near-polar）允许偏离90°，并不保证星下点恰好穿过两极。理想球面下，星下点最高绝对纬度约为 $\min(i,180^\circ-i)$；因此不能笼统说倾角数值越大，覆盖面积就一直越大。幅宽能扩展到星下点轨迹以外，轨迹到不了的地方不一定完全无法观测。

太阳同步轨道（sun-synchronous orbit）使轨道面的进动与地球绕太阳的年运动相匹配，使同类过境的平均地方太阳时近似一致。常见地球观测设计采用近极地、略为逆行的轨道，利用地球非球形引力引起的交点进动来实现；不是每天由发动机把轨道强行旋转一圈。太阳同步与地球静止的定义不同，太阳同步卫星仍绕地球运动并经过不同地区。

读图时分两步。第一步看轨道面对赤道面的位置，判别赤道、倾斜和近极地；第二步比较不同日期的地球—太阳方向与轨道面，看进动如何保持同类过境太阳时。图中的圆弧是关系示意，轨道尺寸与地球通常没有按比例绘制，不能量图推算高度。太阳同步也不保证太阳高度角全年不变：季节、纬度和地形改变照明；升轨与降轨分别有自己的过境太阳时，不是所有过境都在同一个白昼时刻。

近圆形、近极地、太阳同步和重复地面轨迹分别解决高度稳定、大范围纬度覆盖、照明可比性和重复观测几何四个问题。它们可以组合，却不能互相推出。比较不同时相反射率时，近似一致的太阳时有帮助，仍需要考虑季节和大气条件。

来源：第3章课件文件页9–17、21–27；[NASA轨道说明](https://science.nasa.gov/earth/earth-observatory/catalog-of-earth-satellite-orbits/)用于核对同步定义与季节照明条件。课件“太阳光照角始终一致”在此作条件校订。


<!-- rs-concept-table-rs3-orbits -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 地球同步 | Geosynchronous | 周期等于恒星日；倾斜/偏心时不必固定于地面。 |
| 地球静止 | Geostationary | 赤道、圆形、顺行、恒星日周期同时满足。 |
| 极轨/近极轨 | Polar/near-polar | 描述轨道面倾角，近极不必通过两极。 |
| 太阳同步 | Sun-synchronous | 交点进动配合年运动，同类过境平均太阳时近似固定。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Always ask what is being synchronised. A geosynchronous orbit has a period equal to Earth's sidereal rotation period, about 23 hours 56 minutes. A civil 24-hour day is not the exact orbital period in this definition. An inclined or eccentric geosynchronous satellite still moves north–south or east–west as viewed from the ground.

A geostationary orbit is a special geosynchronous case. It must be <strong>circular, equatorial and prograde, with a period equal to Earth's sidereal rotation period</strong>. The satellite remains approximately above one longitude, supporting frequent observations of a large region, such as the evolution of weather systems. It sees only the side of Earth facing it and has unfavourable geometry at high latitudes. A stationary platform does not eliminate scanning: the instrument still needs to collect radiation from different locations across the visible Earth disk.

Inclination describes the orbital plane. Prograde orbits normally have $0^\circ<i<90^\circ$, retrograde orbits $90^\circ<i<180^\circ$, and a polar orbit approximately $90^\circ$. Near-polar does not mean that the subsatellite point must pass exactly over both poles. On an ideal sphere, its maximum absolute latitude is approximately $\min(i,180^\circ-i)$. Coverage therefore does not increase indefinitely as the numerical inclination increases. A sensor's swath extends beyond its subsatellite track, so a location beyond the track's latitude limit may still be observable.

A sun-synchronous orbit matches the precession of the orbital plane to Earth's annual motion around the Sun, keeping the mean local solar time of equivalent overpasses approximately constant. Many Earth-observation designs use near-polar, slightly retrograde orbits and exploit nodal precession caused by Earth's nonspherical gravity field. This does not require an engine to rotate the orbit around every day. Sun-synchronous and geostationary refer to different properties: a sun-synchronous satellite continues to orbit Earth and passes over different regions.

Read the diagram in two stages. First inspect the orbital plane relative to the equator to identify equatorial, inclined and near-polar geometry. Then compare the Earth–Sun direction and the orbital plane on different dates to see how precession preserves the solar time of equivalent overpasses. The arcs are conceptual; orbital size and Earth size are usually not to scale. Do not measure the drawing to infer altitude. Sun synchronism does not keep solar elevation constant throughout the year. Seasons, latitude and terrain still change illumination. Ascending and descending passes have their own solar times; not every pass occurs at the same daylight hour.

Near-circular, near-polar, sun-synchronous and repeating-ground-track are separate properties. They support approximately stable altitude, broad latitude coverage, comparable illumination and repeated viewing geometry respectively. They can be combined but do not imply each other. Similar solar time helps comparisons of reflectance through time, while seasonal and atmospheric differences still need consideration.

Sources: Chapter 3, file pages 9–17 and 21–27; [NASA's orbit guide](https://science.nasa.gov/earth/earth-observatory/catalog-of-earth-satellite-orbits/) checks synchronism definitions and seasonal illumination. The slide claim of an always-identical illumination angle is qualified here.


<!-- rs-concept-table-rs3-orbits -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 地球同步 | Geosynchronous | Period equals a sidereal day; inclination/eccentricity need not give stationarity. |
| 地球静止 | Geostationary | Equatorial, circular, prograde and sidereal-day period together. |
| 极轨/近极轨 | Polar/near-polar | Describes inclination; near-polar need not cross both poles. |
| 太阳同步 | Sun-synchronous | Nodal precession matches annual motion to keep comparable-pass mean solar time approximately fixed. |

</div>

## 3.4 开普勒关系怎样使用 / Using Kepler's laws and the period formula {#rs3-kepler}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

英文班笔记补充的开普勒三定律，在二体束缚运动中可表述为：轨道是椭圆，中心天体在焦点；地心—卫星连线在相等时间扫过相等面积；同一中心天体的轨道周期平方与半长轴立方成正比。第二定律意味着椭圆轨道上近地点更快、远地点更慢，并非所有卫星都匀速运动。

令 $T$ 为轨道周期（秒），$a$ 为轨道半长轴（米），$G$ 为万有引力常数，$M$ 为地球质量，$\mu=GM$ 为地球引力参数（单位 $\mathrm{m^3\,s^{-2}}$；忽略卫星质量）。二体椭圆的周期为

$$
T=2\pi\sqrt{\frac{a^3}{\mu}}.
$$

圆轨道才有 $a=R_E+H$，其中 $R_E$ 是此处采用的球形地球半径，$H$ 是相对地面的高度。令 $v$ 为圆轨道速度，才可写

$$
v=\sqrt{\frac{\mu}{R_E+H}}.
$$

把低轨的离地高度 $H$ 直接代入第一式中的 $a$，会严重低估周期；用椭圆近地点的高度代替整个椭圆半长轴也不成立。单位须统一，不能一半用千米一半用米。量纲检查可见 $a^3/\mu$ 的单位为秒平方，所以开根号得到时间。更高的圆轨道有更长周期和更小速度，这是两个式子在同一假设下的结果。

课件还比较卫星速度和星下点速度。若暂不计地球自转、采用圆轨道及球形地球，两者的角速度相同，而到地心的半径不同，星下点线速度可写成卫星线速度乘以 $R_E/(R_E+H)$。实际地固坐标中的地面轨迹还叠加地球自转，不能用这一简式计算任意卫星的真实地面速度。时间采样与沿轨像元衔接需要使用与具体观测几何一致的速度。

来源：第3章课件文件页19–20；英文班笔记文件页8–10；英文整理资料轨道补充段落543–574。以上为教学二体模型，不替代精密星历计算。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The English-class notes supplement the chapter with Kepler's three laws for bound two-body motion: the orbit is an ellipse with the central body at a focus; the line joining the central body and satellite sweeps equal areas in equal times; and squared period is proportional to cubed semi-major axis for the same central body. The second law means that a satellite on an elliptical orbit travels faster near perigee and slower near apogee. Orbital speed is not universally constant.

Let $T$ be period in seconds, $a$ semi-major axis in metres, $G$ the gravitational constant and $M$ Earth's mass. The Earth gravitational parameter is $\mu=GM$, in $\mathrm{m^3\,s^{-2}}$, with satellite mass neglected. For the two-body ellipse,

$$
T=2\pi\sqrt{\frac{a^3}{\mu}}.
$$

Only for a circular orbit is $a=R_E+H$, where $R_E$ is the adopted spherical Earth radius and $H$ is height above the surface. The circular orbital speed $v$ is then

$$
v=\sqrt{\frac{\mu}{R_E+H}}.
$$

Putting low-orbit altitude $H$ directly in place of $a$ severely underestimates the period. A perigee altitude is also not the semi-major axis of an ellipse. Use consistent units rather than mixing kilometres and metres. Dimensionally, $a^3/\mu$ has units of seconds squared, so its square root is a time. Under these assumptions a higher circular orbit has a longer period and a lower speed.

The slides also compare satellite speed and subsatellite-point speed. Neglecting Earth rotation and assuming a circular orbit over a spherical Earth, they share the same angular rate but have different geocentric radii. Subsatellite linear speed is then satellite speed multiplied by $R_E/(R_E+H)$. A ground track in Earth-fixed coordinates additionally involves Earth's rotation; this simplified ratio does not give the actual ground speed for every orbit. Along-track sampling and image-line spacing require a speed consistent with the actual observing geometry.

Sources: Chapter 3, file pages 19–20; English-class notes, file pages 8–10; English summary orbital supplement, paragraphs 543–574. These teaching equations do not replace precise ephemeris calculations.

</div>

## 3.5 一圈、重访与重复轨迹 / One orbit, revisit and a repeating ground track {#rs3-timing}

<RsFigure id="ground-track" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

星下点（subsatellite point）在本章球形地球示意中，是地心到卫星连线与地面的交点。它随时间连成地面轨迹（ground track）。在精确椭球定位中，应注明采用地心投影还是大地垂足的定义。星下点也不等于传感器正在看的地方：侧视仪器可以观测轨迹一侧。

地球在卫星绕行期间继续自转，因此下一圈通常落在另一条地面轨迹上。读地面轨迹图时先看标示的经纬度、升降轨箭头和圈次。地图上的弯曲线是三维运动投影到二维地图的结果，不代表卫星在太空中沿波浪形路径飞行；经度边界两侧的断线常是同一条轨迹跨过地图边界。轨迹线不是影像的宽度，线旁的带状区域才代表某个载荷的幅宽。

| 时间概念 | 它回答的问题 | 需要明确的条件 |
| --- | --- | --- |
| 轨道周期 orbital period | 卫星绕行一圈需要多久？ | 采用的周期类型与动力学模型 |
| 地面轨迹重复周期 ground-track repeat cycle | 轨迹图样何时回到近似相同地面位置？ | 地球自转、轨道进动、控制与容许误差 |
| 重访间隔 revisit interval | 某地点何时再次进入可观测范围？ | 纬度、幅宽、侧视范围、单星/星座、调度 |
| 有效观测间隔 usable-observation interval | 何时再次得到能用于本任务的数据？ | 云、质量筛选、太阳光、观测角和数据可用性 |

“可以重访”与“已经采集”也有区别。侧摆能让卫星更早看到某地区，但任务安排、存储和传输可能限制实际成像。较高纬度常有更多相邻轨道重叠，可观测机会与赤道地区不同；不能将一个地区的重访数值当作全球统一值。星座通过错开轨道和相位增加机会，但不消除天气和质量约束。

想象一个沿窄轨迹扫描的卫星绕地球一圈很快，但目标已随着地球转到了另一侧，这一圈就不保证再次覆盖目标。若扩大幅宽或转动视线，就可能在地面轨迹重复以前重访。因此同一任务的“轨道周期短”“重访间隔短”和“重复轨迹周期短”不是同一个结论。光学地表监测中，一次云覆盖的过境仍算几何机会，却可能不算有效观测。

课件把“覆盖周期（重访周期）”并列使用；网站按上表拆开。在选数据时记录来源实际说的是固定轨道重复、最大/平均重访，还是某星座的可调度时间。所谓时间分辨率也必须先说明这个口径，详见[第四章四类分辨率](/remote-sensing-ch4#rs4-resolutions)。

来源：第3章课件文件页14–20、27、41；英文班笔记文件页5。图为观测关系示意，不用于读出具体任务的精确重访数值。


<!-- rs-concept-table-rs3-timing -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 轨道周期 | Orbital period | 绕地一次，不等于同地成像一次。 |
| 轨迹重复周期 | Ground-track repeat cycle | 地面轨迹图样重复，需轨道/地球自转配合。 |
| 重访间隔 | Revisit interval | 再次获得目标观测机会，受幅宽、侧摆、纬度和星座影响。 |
| 有效观测 | Usable observation | 观测机会还须满足云、质量和任务安排。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

In this chapter's spherical-Earth diagram, the subsatellite point is where the line from Earth's centre to the satellite meets the surface. Its path through time is the ground track. Precise positioning on an ellipsoid should state whether a geocentric projection or geodetic normal-foot definition is used. The subsatellite point is not necessarily the point being observed: a side-looking instrument can view beside the track.

Earth keeps rotating while the satellite completes an orbit, so the next orbit usually produces another ground track. First read the map's latitude and longitude, ascending/descending arrows and orbit numbers. A curved line on a map is a projection of three-dimensional motion, not a wavy path through space. A break at opposite longitude boundaries often represents one continuous track crossing the map edge. The track line itself has no image width; a surrounding strip represents the swath of a particular instrument.

| Time concept | Question answered | Conditions to state |
| --- | --- | --- |
| Orbital period | How long does one revolution take? | Period convention and dynamical model |
| Ground-track repeat cycle | When does the track pattern return to approximately the same ground positions? | Earth rotation, precession, control and tolerance |
| Revisit interval | When does a location again enter the accessible observing area? | Latitude, swath, pointing, single satellite or constellation, scheduling |
| Usable-observation interval | When is another measurement suitable for the application? | Clouds, quality screening, sunlight, viewing geometry and data availability |

An accessible revisit is not the same as an acquired image. Off-nadir pointing can make a region accessible sooner, while scheduling, storage and downlink capacity can limit acquisition. At higher latitudes neighbouring swaths often overlap more, so observing opportunities differ from those at the equator. A revisit figure for one region is not automatically global. A constellation can increase opportunities by distributing orbital planes and phases, but weather and quality constraints remain.

Imagine a satellite returning quickly after one orbit, while Earth's rotation has moved the target away from its narrow observing strip. One revolution does not ensure another image of the target. A wider swath or a tilted viewing direction can permit a revisit before the ground track repeats. Thus short orbital period, short revisit interval and short repeat cycle are different claims. A cloudy overpass can be a geometric opportunity without yielding a usable optical observation of the surface.

The slides use “coverage period (revisit period)” together; this page separates the meanings. When choosing data, record whether a source describes fixed-track repetition, maximum or average revisit, or a constellation's scheduling opportunity. Temporal resolution also needs this definition; see [the four resolutions in Chapter 4](/remote-sensing-ch4#rs4-resolutions).

Sources: Chapter 3, file pages 14–20, 27 and 41; English-class notes, file page 5. The diagram illustrates observing relationships rather than precise revisit numbers for a mission.


<!-- rs-concept-table-rs3-timing -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 轨道周期 | Orbital period | One revolution, not one image of the same location. |
| 轨迹重复周期 | Ground-track repeat cycle | Ground-track pattern repetition, depending on orbital/rotation relationships. |
| 重访间隔 | Revisit interval | Next opportunity to observe a target; depends on swath, pointing, latitude and constellation. |
| 有效观测 | Usable observation | An opportunity that also meets cloud, quality and scheduling requirements. |

</div>

## 3.6 在哪里与朝向哪里 / Position, attitude and viewing geometry {#rs3-attitude}

<RsFigure id="attitude" />

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

定轨确定卫星的位置与速度，可利用星历、地面跟踪和星载GNSS等数据；定姿确定卫星坐标轴在参考系中的朝向，可利用星敏感器、陀螺、地平仪或具有足够基线的多天线GNSS。知道位置并不意味着知道姿态。位置误差和指向误差都能使影像地物落在错误位置。

为读图，采用一套示意坐标：$X$ 沿飞行方向，$Y$ 向横轨方向，$Z$ 指向天底，实际任务的坐标约定须以其文档为准。绕 $X$ 转动是滚转（roll，课件又称滚动），使视线横向移动；绕 $Y$ 是俯仰（pitch），使视线前看或后看；绕 $Z$ 是偏航（yaw，课件又称航偏），改变图像方向。转角正负号与旋转顺序也依赖坐标约定，不应只凭一个姿态角名称推算地面方向。

天底（nadir）是正下方方向；天底观测不等于已经完成正射校正。离天底角（off-nadir angle）在传感器处相对天底方向量取；入射角（incidence angle）在目标处相对当地表面法线量取。球面、地形坡度以及两处法线的不同，使这两个角一般不能直接互换。第四章雷达公式以地面法线为入射角参考，读图时尤其要先找角的顶点。

侧视或侧摆增加可达区域，也使视线穿过更长的大气路径，增大地面足迹的投影，并改变遮挡和方向性反射。离天底较远的图像未必与天底图像具有同样的地面采样尺度和质量。平台姿态变化还可能影响扫描线间距和几何稳定性；这些因素必须与第四章的IFOV和扫描过程一起理解。

立体观测（stereo observation）从不同位置或指向观察同一地物。地物高度会使其在不同影像中产生视差（parallax）；通过对应点、成像几何和定向信息可以估计三维结构。它可以是不同轨道的跨轨立体，也可以利用前视/后视相机或转向实现沿轨立体。侧摆只是获得不同视线的手段，不自动保证影像有足够重叠、可匹配纹理和精确定位。

读姿态图时，固定平台中心，分别跟随三个转动箭头看视线落点如何移动；再比较“整颗卫星朝向改变”和“扫描镜在传感器内部转动”。两者都能改变地面视线，却不是同一个运动。图中的倾斜程度用于突出关系，不代表某卫星的实际允许侧摆角。

来源：第3章课件文件页28–37、62、66；第4章推扫与立体观测部分。历史姿态仪精度在本页不泛化为现役任务性能。


<!-- rs-concept-table-rs3-attitude -->

| 中文术语 | English term | 定义、区别与条件 |
| --- | --- | --- |
| 定轨/定姿 | Orbit/attitude determination | 分别确定位置速度与机体朝向，不能互换。 |
| 滚转/俯仰/偏航 | Roll/pitch/yaw | 绕规定机体系轴旋转；正负号和顺序查任务约定。 |
| 离天底角 | Off-nadir angle | 角顶点在传感器，相对天底方向。 |
| 入射角 | Incidence angle | 角顶点在目标，相对当地法线，一般不等于离天底角。 |

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Orbit determination estimates satellite position and velocity from ephemerides, ground tracking and onboard GNSS, among other data. Attitude determination estimates the orientation of spacecraft axes in a reference frame using instruments such as star trackers, gyroscopes, horizon sensors or GNSS antennas separated by an adequate baseline. Position does not determine attitude. Position and pointing errors can both misplace features in an image.

For this illustration, let $X$ point along flight, $Y$ across track and $Z$ towards nadir. Actual mission coordinate conventions must come from mission documentation. Rotation about $X$ is roll (滚转, also 滚动 in the slides), moving the view across track. Rotation about $Y$ is pitch (俯仰), directing the view forwards or backwards. Rotation about $Z$ is yaw (偏航, also 航偏), changing image orientation. Signs and rotation order depend on the coordinate convention; an angle name alone is insufficient to calculate its ground effect.

Nadir is the downward direction. Nadir acquisition does not mean that an image has already been orthorectified. An off-nadir angle is measured at the sensor relative to its nadir direction. An incidence angle is measured at the target relative to the local surface normal. Earth curvature, terrain slope and the different normals mean these angles are not generally interchangeable. Chapter 4's radar equations refer incidence angle to the ground normal; first locate the angle's vertex when reading a diagram.

Side-looking or off-nadir pointing increases the accessible area, but can lengthen the atmospheric path, enlarge the projected ground footprint and change occlusion and directional reflectance. An off-nadir image need not have the same sampling scale or quality as a nadir image. Attitude variations can also change image-line spacing and geometric stability. These effects connect directly to IFOV and scanning in Chapter 4.

Stereo observation views the same feature from different positions or directions. Height produces different image positions, creating parallax. Corresponding features, imaging geometry and orientation information can then support three-dimensional reconstruction. Stereo can be across-track from different orbits, or along-track using forward/backward cameras or pointing. Off-nadir pointing provides different viewing directions but does not by itself guarantee adequate overlap, matchable texture or accurate geolocation.

To read the attitude diagram, keep the platform centre fixed and follow each rotation arrow to see how the viewing footprint changes. Then distinguish rotation of the entire spacecraft from movement of a scanning mirror inside a sensor. Both can redirect the view but are different motions. The exaggerated tilts illustrate relationships rather than a specific satellite's permitted pointing angles.

Sources: Chapter 3, file pages 28–37, 62 and 66; Chapter 4's pushbroom and stereo sections. Historical attitude-instrument accuracies are not presented as current mission performance.


<!-- rs-concept-table-rs3-attitude -->

| 中文术语 | English term | Definition, distinction and conditions |
| --- | --- | --- |
| 定轨/定姿 | Orbit/attitude determination | Determines position/velocity versus body orientation. |
| 滚转/俯仰/偏航 | Roll/pitch/yaw | Rotations about stated body axes; signs/order follow mission conventions. |
| 离天底角 | Off-nadir angle | At the sensor, relative to nadir. |
| 入射角 | Incidence angle | At the target, relative to the local normal; generally differs from off-nadir angle. |

</div>

## 3.7 用任务理解卫星系列 / Learning from international and Chinese missions {#rs3-missions}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

课件有大量中外卫星和载荷实例。学习时应先读任务问题，再看轨道和传感器组合；“高分辨率”“高光谱”“雷达”“小卫星”属于不同分类维度，一个小卫星也可能搭载雷达或高光谱载荷。不能把这些名字当成互斥的卫星类别。

<strong>Landsat系列</strong>说明长期陆地观测怎样依赖稳定的波段设计、校准和持续记录。早期课件展示RBV与MSS，后来有TM和ETM+，这些是不同历史型号。Landsat 7的载荷是ETM+；<strong>Landsat 8搭载OLI（Operational Land Imager，陆地成像仪）与TIRS（Thermal Infrared Sensor，热红外传感器）</strong>，不是ETM+。不要将系列早期轨道参数、某一波段的空间采样或某版本的产品格网，套用到整个系列。

<strong>SPOT早期HRV案例</strong>连接推扫、侧摆和立体观测。线阵列同时接收横轨一行的信号，平台向前运动形成后续行；改变指向可以获取来自不同方向的同一地区影像。课件中的SPOT 1–5状态表与产品分级是历史教学材料，不用于宣告2026年的在轨状态，也不把SPOT的Level名称解释成所有任务统一标准。

<strong>Terra与MODIS</strong>说明一个平台能同时搭载多个观测系统，以及宽覆盖对全球变化监测的价值。NASA资料确认MODIS有36个离散光谱波段，它属于多光谱观测；名称中有“spectroradiometer”或波段数量较多，不足以判定为高光谱。高光谱重点在较窄、近连续的光谱采样，详见第四章。MODIS的不同波段也不是全部具有同一空间采样尺度。

中国案例可按任务连接概念：<strong>风云（FY）</strong>的极轨与静止轨道观测分别强调大范围巡回和固定区域的连续天气监测；<strong>环境与灾害监测系列</strong>体现多星与不同波段协同；<strong>资源系列及中巴地球资源卫星CBERS</strong>体现陆地资源调查和多载荷的覆盖—细节组合；<strong>资源三号ZY-3</strong>的立体测绘用途强调多视线几何；<strong>高分（GF）系列</strong>包含不同观测设计，不能只凭“高分”两个字推出每颗卫星的波段、幅宽或重访。

阅读课件CBERS载荷表时，比较CCD、红外扫描仪与宽视场成像仪：它们位于同一平台，却可能拥有不同幅宽、波段和采样尺度。这个结构比记忆一张长参数表更有解释力。课件中的“资源二号”“CBERS-2”等名称须按具体任务核对，不能仅因都含“资源”就认为同一系列型号完全对应。

历史航空摄影、电子扫描、多光谱观测、推扫和相干雷达不是简单替代关系：它们解决不同问题，许多技术在不同任务中并行使用。这里保留历史载荷作为原理案例，不复刻原课件中的“目前仍在运行”、卫星数量和国家性能排名。查一个实际数据集时，应同时记录卫星编号、载荷、波段、采集日期、产品层级、观测角、原始采样与交付格网，并以该任务官方说明核对数值。

来源：第3章课件文件页38–113、114–168、169–186；[USGS Landsat 8](https://www.usgs.gov/landsat-missions/landsat-8)核对载荷名称；[NASA Terra MODIS](https://terra.nasa.gov/about/terra-instruments/modis)核对离散波段。中国任务在本节按课件历史案例讲解用途，不新增未核实的当前状态或精确参数。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

The slides contain many international and Chinese satellite examples. Begin with the observing problem and then examine the orbit–instrument combination. “High spatial resolution”, “hyperspectral”, “radar” and “small satellite” describe different classification dimensions. A small satellite can carry radar or hyperspectral instruments, so these names do not form mutually exclusive classes.

<strong>Landsat</strong> illustrates how long-term land observation depends on consistent spectral design, calibration and continued records. The slides show historical RBV and MSS instruments and later TM and ETM+; these refer to particular generations. Landsat 7 carries ETM+. <strong>Landsat 8 carries the Operational Land Imager (OLI) and Thermal Infrared Sensor (TIRS), rather than ETM+.</strong> Early-series orbit parameters, one band's sampling scale and a particular product grid should not be applied to the whole series.

<strong>Early SPOT HRV examples</strong> connect pushbroom imaging, off-nadir pointing and stereo observation. A linear array simultaneously receives signals along a cross-track line; forward platform motion supplies later lines. Changing the pointing direction allows the same area to be imaged from different views. The SPOT 1–5 status tables and product levels in the slides are historical teaching material, not statements of operational status in 2026 or a universal interpretation of product-level names.

<strong>Terra and MODIS</strong> illustrate multiple observing systems on one platform and the value of wide coverage for global monitoring. NASA documents 36 discrete MODIS spectral bands. MODIS is a multispectral instrument; the word “spectroradiometer” or a relatively large band count does not alone make an instrument hyperspectral. Hyperspectral sensing emphasises narrow, nearly contiguous spectral sampling, explained in Chapter 4. MODIS bands also do not all share one spatial sampling scale.

Chinese examples can be connected to their purposes. <strong>Fengyun (FY)</strong> polar and geostationary systems illustrate broad recurring coverage and frequent regional weather monitoring respectively. <strong>Environment and disaster-monitoring missions</strong> illustrate cooperation between satellites and spectral regions. <strong>Ziyuan resource missions and the China–Brazil Earth Resources Satellite programme (CBERS)</strong> demonstrate land-resource surveying and combinations of coverage and detail across instruments. <strong>Ziyuan-3 (ZY-3)</strong> connects stereo mapping to multiple viewing directions. <strong>Gaofen (GF)</strong> includes varied observing designs; its name alone does not determine every satellite's bands, swath or revisit.

When reading the historical CBERS payload table, compare the CCD camera, infrared scanner and wide-field imager. Instruments on one platform can have different swaths, bands and sampling scales. This structure explains more than memorising a long specification table. Names such as Ziyuan-2 and CBERS-2 need mission-specific checking; sharing the word “resource” does not make their model names interchangeable.

Historical aerial photography, electronic scanning, multispectral observation, pushbroom systems and coherent radar are not a simple replacement sequence. They address different needs and often coexist. This section retains historical instruments as mechanism examples without repeating old “currently operating” claims, satellite counts or national rankings. For an actual dataset, record spacecraft number, instrument, band, acquisition date, product level, viewing angle, original sampling and delivered grid, and check numerical specifications against that mission's official documentation.

Sources: Chapter 3, file pages 38–113, 114–168 and 169–186; [USGS Landsat 8](https://www.usgs.gov/landsat-missions/landsat-8) for instrument identity; [NASA Terra MODIS](https://terra.nasa.gov/about/terra-instruments/modis) for discrete bands. Chinese missions are discussed as historical course examples, without new unverified current-status or precise-parameter claims.

</div>

## 3.8 从学习任务到观测选择 / Choosing observations for a task {#rs3-design}



<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

任务选型从“要区分什么、覆盖哪里、变化多快、需要哪些物理信息”开始。田块边界调查需要足够的空间细节；作物季节变化需要光谱与稳定时序；暴雨云系发展需要密集时间观测；水体或矿物辨识可能需要合适的窄波段；地表形变需要相干雷达观测和对应的几何分析。没有一颗卫星在所有指标上同时最优。

四类分辨率分别对应空间细节、波长区分、辐射变化区分和时间采样。它们的“高”有不同方向：空间间隔更小通常表示更细采样，光谱带宽更窄表示更细波长区分，辐射能力要看噪声与定标，时间间隔更短表示更频繁。具体定义、波段数与位深的限制见[第四章](/remote-sensing-ch4#rs4-resolutions)。

更细的空间采样常增加数据量；更窄波段往往收集更少能量，对信噪比提出更高要求；更宽幅宽增加覆盖，但带边几何与仪器设计也需要考虑。侧摆可加快某地区重访，却改变观测角；多星可增加机会，却需要处理星间定标差异。这些是设计权衡，不是对所有传感器一成不变的经验公式。

例如，比较两个日期的耕地变化，不应只选像元最小的影像。先确认它们是否覆盖同一地区、观测季节是否合适、是否有足够光谱信息，再检查云、观测角、定标和几何配准。长期比较还需将变化与太阳照明、季节性生长和处理版本区分。本章给出平台与几何框架，第四章继续解释这些条件怎样在传感器内形成。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

Mission selection begins with what must be distinguished, where coverage is required, how fast the target changes, and what physical information is needed. Field-boundary surveys need spatial detail; seasonal crop monitoring needs spectral information and consistent time series; rapidly developing storm systems need frequent observations; water or mineral identification can need carefully chosen narrow bands; surface deformation requires coherent radar observations and their geometric interpretation. No satellite is optimal for all these requirements.

The four resolutions concern spatial detail, wavelength discrimination, radiometric discrimination and temporal sampling. “Higher” has different numerical implications: smaller ground intervals usually mean finer sampling; narrower bandwidth means finer wavelength discrimination; radiometric capability depends on noise and calibration; shorter time intervals mean more frequent observations. Definitions and the limitations of band count and bit depth are developed in [Chapter 4](/remote-sensing-ch4#rs4-resolutions).

Finer spatial sampling often increases data volume. Narrower bands usually collect less energy and place greater demands on signal-to-noise ratio. Wider swaths increase coverage but also raise edge-geometry and instrument-design considerations. Pointing can shorten revisit for a region while changing viewing angle. More satellites provide opportunities but require attention to inter-satellite calibration. These are design trade-offs, not universal equations that apply identically to every sensor.

For example, comparing farmland on two dates requires more than choosing the smallest pixels. Check common coverage, suitable seasons and spectral information, then clouds, viewing angles, calibration and geometric registration. Long-term analysis must distinguish target change from illumination, seasonal growth and processing-version differences. This chapter supplies the platform and geometry framework; Chapter 4 explains how sensor mechanisms create these observations.

</div>

## 3.9 来源与阅读路径 / Sources and reading route {#rs3-sources}

<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">

本章依据本地第3章课件186个文件页（《遥感汇总.pdf》文件页100–285），按概念依赖重新组织。开普勒关系补充来自英文班笔记文件页8–10与英文整理资料段落543–574。所有页码均为从1开始的文件页码，不是另造的印刷页码。

阅读路线是：平台与载荷 → 六参数 → 轨道类型 → 周期与地面轨迹 → 姿态与观测几何 → 任务选择。正文采用NASA与USGS官方资料校订同步条件、Landsat 8载荷与MODIS光谱分类；旧表中的当前运行状态、性能排名和未核实精确数值未作为现行事实复用。图是教学示意，尺寸比例与颜色不代表真实轨道产品。

继续阅读[第四章传感器与成像](/remote-sensing-ch4)，理解同一条轨道上摆扫、推扫和侧视雷达怎样得到不同影像。术语可在[双语术语表](/remote-sensing-glossary)检索；资料定位见[来源与勘误](/remote-sensing-sources)。

</div>

<div class="rs-lang" data-rs-lang="en" lang="en">

This chapter reorganises the 186 file pages of the local Chapter 3 slides, corresponding to compilation file pages 100–285, according to concept dependencies. Kepler relationships are supplemented from English-class notes pages 8–10 and English summary paragraphs 543–574. All PDF references are one-based physical file pages, not invented printed page numbers.

The reading route is platform and payload → six elements → orbit types → periods and ground tracks → attitude and viewing geometry → observation choice. NASA and USGS documentation correct synchronism conditions, Landsat 8 instrument identity and MODIS spectral classification. Old operational-status tables, national rankings and unverified exact parameters are not reused as current facts. Teaching diagrams do not represent measured orbital products or true scale.

Continue to [Chapter 4: sensors and imaging](/remote-sensing-ch4) to see how whiskbroom, pushbroom and side-looking radar systems produce different imagery from a platform. Search terms in the [bilingual glossary](/remote-sensing-glossary) and locate evidence in [sources and corrections](/remote-sensing-sources).

</div>
