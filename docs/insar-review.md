---
title: InSAR 前三章 · 主线与公式索引
prev: {text: 第三章 · SAR 图像特征及解译, link: /insar-interpretation}
next: false
---

# 把前三章连成一条知识链

<!-- earth-reading-task -->
先用三个动作恢复主线：移动反射靶理解双程相位；沿轨对齐同一目标形成SLC；检查山坡是否可见、两次复数是否稳定。下面的公式表是这三次操作的索引。更短的[期末关键总结](review-insar.html)集中保留条件、易错点与作答顺序。
<!-- /earth-reading-task -->

先恢复“发射—散射—接收—聚焦—解释”的过程，再回到各个公式。公式中的量不是同一种观测：回波延迟约束距离，带宽决定距离分辨能力，复数相位用于相干聚焦与干涉，强度解释还需要辐射校准和散射条件。

## 核心关系及适用条件 {#formulas}

| 关系 | 怎样理解 | 必须同时记住 | 正文 |
| --- | --- | --- | --- |
| $c=f\lambda$ | 时间振荡与空间周期联系起来 | 这里是自由空间近似；介质中用相应相速度 | [波与介质](insar-microwave.html) |
| $R=c\Delta t/2$ | 延迟包括去程和回程 | 单站单程斜距；大气等路径影响需另处理 | [侧视与测距](insar-imaging.html) |
| $s=Ae^{i\phi},\ I=A^2$ | 幅度与相位构成复像元 | 强度用功率量，不能把幅度与强度的 dB 混用 | [复数回波](insar-microwave.html) |
| $\phi=-4\pi R/\lambda+\phi_{\mathrm{scat}}$ | 双程传播形成相位 | 相位只在模 $2\pi$ 下被观测；散射相位也参与 | [相位为何敏感](insar-microwave.html) |
| $\delta R\approx c\tau/2$ | 未压缩短脉冲分开相邻延迟 | 用于简单未压缩脉冲；$\tau$ 是时宽 | [距离分辨率](insar-imaging.html) |
| $\delta R\approx c/(2B)$ | 压缩后主瓣宽度由有效带宽控制 | 理想近似；加窗和具体分辨率定义改变常数 | [脉冲压缩](insar-imaging.html) |
| $\delta g\approx\delta R/\sin\theta$ | 把斜距分辨能力投到平地 | 局部平地、非天底近似；真实坡面需局部几何 | [地距投影](insar-imaging.html) |
| $\delta a_{\mathrm{RAR}}\approx R\lambda/L_a$ | 真实天线角宽随孔径缩小 | 量级关系；波束宽度定义可改变系数 | [真实孔径](insar-imaging.html) |
| $\delta a_{\mathrm{SAR}}\approx L_a/2$ | 理想条带式 SAR 相干聚焦的结果 | 正侧视、充分采样与聚焦；不泛化到所有工作模式 | [合成孔径](insar-imaging.html) |
| $P_{\mathrm{dB}}=10\log_{10}P$ | 用对数量表达强度比 | $P$ 为无量纲功率比；幅度比使用 $20\log_{10}$ | [辐射与明暗](insar-interpretation.html) |
| $\mathrm{ENL}=\mu_I^2/\sigma_I^2$ | 均值相对波动的经验尺度 | 在均匀区域、强度数据上估计；纹理和相关性会干扰 | [相干斑](insar-interpretation.html) |

符号索引：$L_a$ 是物理天线沿飞行方向的长度；$B$ 是有效信号带宽，单位 Hz；$\tau$ 与 $\Delta t$ 单位为 s；$\delta R,\delta g,\delta a$ 单位为 m。$\mu_I,\sigma_I^2$ 分别为强度均值与方差。不要用像元间距替代分辨率。

## 把课堂中间环节补回公式链 {#ppt-formula-chain}

课件不只给出最后的分辨率和干涉公式，也讲传播、天线、系统参数和图像几何。下面按“传播到目标—形成观测范围—组织回波—读图”的顺序恢复这些中间环节。公式的图、定义与推导在对应正文，不以这一张表代替理解。

| 课堂关系 | 对应对象与条件 | 回到正文 |
| --- | --- | --- |
| $E=h_{\mathrm P}f,\ p=h_{\mathrm P}/\lambda$ | 自由空间光子的能量、动量；$h_{\mathrm P}$ 为普朗克常数，与地形高度 $h$ 不同 | [波与光子的描述](insar-microwave.html#microwave-wave-particle) |
| $d_A=1/\alpha,\ d_P=1/(2\alpha)$ | 均匀介质单程幅度、功率分别降至 $1/e$ 的深度；两者相差二倍，不能混用 | [介电性质与穿透推导](insar-microwave.html#microwave-penetration-depth) |
| $\sigma(\Omega)=4\pi(dP_s/d\Omega)/S_{\mathrm{inc}}$ | 给定散射方向的截面，入射量是功率密度；后向方向再接到单站雷达方程 | [方向散射截面](insar-microwave.html#microwave-scattering-cross-section) |
| $\beta_v\approx\lambda/W_a,\ \beta_h\approx\lambda/L_a$ | 天线宽控制距离平面的波束角，天线长控制方位波束角；量级式，角度使用弧度 | [波束与幅宽](insar-imaging.html#i2-antenna-swath) |
| $W_g\approx R\beta_v/\cos\theta$ | 窄波束、平地、同一波束口径的几何幅宽；不能替代卫星模式的名义幅宽 | [ERS 课堂算例](insar-imaging.html#i2-antenna-swath) |
| $P_A=k_{\mathrm B}T_A B$ | 理想匹配条件、Rayleigh–Jeans 近似下的天线可用噪声功率；天线温度是方向图对亮温的加权量 | [亮温与天线温度](insar-imaging.html#i2-radiometer) |
| $\mathrm{PRI}=1/\mathrm{PRF}$ | 沿轨采样与接收时间窗要同时满足；只比较两个上下界不能保证脉冲时序可用 | [PRF 与接收窗](insar-imaging.html#i2-prf-window) |
| $L_r=L\sin\omega,\ F_p=100(1-\sin\omega)\%$ | $L$ 为坡面真实长度，$L_r$ 为局部斜距投影；正常顺序的照明坡面才可解释为压缩百分比 | [前坡与后坡](insar-interpretation.html#insar-interpretation-front-back-table) |
| $S_s=R_F-R_T=hR_F/H,\ h=S_s\cos\theta_F$ | 二维平地直线射线模型；$R_F$ 指阴影远端，$S_s$ 是缺失斜距区间，不是地面阴影长度 | [阴影几何](insar-interpretation.html#insar-interpretation-shadow-height) |

课件的云层经验衰减式保留原页及趋势解释。其波长单位和有效频段没有充分来源支持时，不把系数当作可直接代入的工程模型。卫星表也保留课件年份、模式与参数口径：像元间距、空间分辨率、幅宽和重复周期需要分别比较。

## 易混概念放回同一个对象 {#distinctions}

| 比较 | 区别 | 实际影响 |
| --- | --- | --- |
| 主动微波／被动微波 | 自己发射并接收回波／测量自然辐射 | 夜间能力不能作为二者唯一分类依据 |
| 波长／带宽 | 载波空间周期／信号占用频率范围 | 更短波长不自动得到更细距离分辨率 |
| 亮温／天线温度 | 按辐射亮度定义的等效温度／天线方向图对亮温的加权量 | 一条 $kTB$ 式不能直接把接收功率等同某个地物的真实温度 |
| 波束覆盖幅宽／系统名义幅宽 | 从波束几何估计的覆盖／特定模式处理与获取能力 | 必须统一波束宽度定义和模式，才能比较课堂几何值与产品表 |
| 幅度穿透深度／功率穿透深度 | $e^{-\alpha z}$／$e^{-2\alpha z}$ 的 $1/e$ 深度 | 相同介质下前者为后者二倍；雷达双程损耗还要另算 |
| 距离向／方位向 | 按回波延迟定位／按沿轨相位历程聚焦 | 两向的分辨机理和公式不同 |
| 分辨率／像元间距 | 能分开多近的目标／图像采样格网间隔 | 更密像元不等于新增信息 |
| 振幅／强度／相位 | 复向量长度／长度平方／复向量角度 | 相位丢失后不能从灰度恢复干涉 |
| 极化／工作模式 | 电场方向与发收通道／获取时天线与波束组织 | HH、HV 与 Stripmap、IW 不是同类标签 |
| 收缩／叠掩／阴影 | 投影压短／距离次序逆转并混合／无直接照射 | 正射校正不能凭空恢复混合或缺失回波 |
| 相干斑／去相干 | 一次相干成像中的颗粒统计／两观测间复信号失稳 | 图像看起来更平滑不代表干涉更可靠 |
| SLC／GRD | 保留复数相位与斜距几何／检测、多视、地距产品 | 常规干涉应选合适 SLC，不能由 GRD 恢复原始相位 |

## 从相位走向后续 InSAR {#bridge}

若两景共注册后的复数观测为 $s_1$ 与 $s_2$，定义干涉量 $I_{12}=s_1s_2^*$，其中星号表示复共轭。其相位为 $\phi_1-\phi_2$。在稳定散射和统一传播约定下，路径项为

$$
\Delta\phi_{12}=\frac{4\pi}{\lambda}(R_2-R_1).
$$

这条关系还不是“相位直接变成垂直位移”。轨道几何、地形、大气和散射变化都会进入实际相位，观测通常也是缠绕值。只有隔离并解缠形变相位项 $\Delta\phi_{\mathrm{def}}$ 后，若把 $d_{\mathrm{LOS}}$ 定义为**远离雷达为正**的位移投影、其小位移贡献满足 $R_2-R_1\approx d_{\mathrm{LOS}}$，才有 $d_{\mathrm{LOS}}\approx\lambda\Delta\phi_{\mathrm{def}}/(4\pi)$。结果还须说明参考点和参考时刻。一次 $2\pi$ 相位变化对应 $\lambda/2$ 的路径变化，不能把总干涉相位直接代入位移关系。

[第三章的配图与推导](insar-interpretation.html)说明差分次序、相干性和不能恢复的信息。后续完整讲义还需要引入基线、平地与地形相位、解缠、大气和时间序列模型。

## 复习顺序 {#review-route}

先在第一章解释“为什么同一地物会因频段、极化与入射条件变化而明暗不同”；再在第二章画出距离和方位方向，复算脉冲压缩的带宽例子；最后在第三章对一个坡面区分几何压缩、亮度变化和缺失回波。回到教师公布的考试范围核对，本站不替代考试通知。

[返回课程总览](course-insar.html) · [查资料页码与修订](insar-sources.html)
