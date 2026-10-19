---
title: InSAR 前三讲期末关键总结
---

# InSAR 前三讲期末关键总结

复习对象是同一山坡两次观测的复数回波：先形成可靠 SLC，再判几何与统计条件。本页覆盖微波基础、SAR 成像、图像解译三讲；DEM、形变与时间序列的完整解算尚未整理，不能从书名推定考试范围。[回课程总览](course-insar.html)。

## 关键关系与边界

| 问题 | 关系 | 必须带上的条件 |
| --- | --- | --- |
| 复数像元 | $s=Ae^{i\phi}$，强度 $I=\lvert s\rvert^2=A^2$ | 幅度、强度、相位不是同一量；相位需要复数产品 |
| 往返传播 | $\phi=-4\pi R/\lambda+\phi_{\rm scat}$ | $R$ 为单程斜距；散射相位还会随目标改变 |
| 本站干涉约定 | $s_1s_2^*$ 的传播项为 $\Delta\phi=+4\pi(R_2-R_1)/\lambda$ | 差分顺序改变会变号；相位通常只观测到模 $2\pi$ |
| 有损介质 | $\alpha=\frac{2\pi}{\lambda}\sqrt{\frac{\sqrt{\varepsilon'^2+\varepsilon''^2}-\varepsilon'}2}$ | 非磁性均匀介质；幅度 $e^{-\alpha\ell}$、单程功率 $e^{-2\alpha\ell}$ |
| 穿透深度 | $d_A=1/\alpha$，$d_P=1/(2\alpha)$ | 必须说明幅度/功率与单程/双程；埋深 $z$ 对应程长 $\ell=z/\cos\theta_t$ |
| 脉冲压缩 | $p(t)=\operatorname{rect}(t/T)e^{i\pi Kt^2}$，$B=\lvert K\rvert T$，$\delta R\approx c/(2B)$ | 矩形包络 LFM；有限时带积的精确相关与无限 sinc 近似不同 |
| 简化方位历程 | $R(\eta)=\sqrt{R_0^2+v^2\eta^2}$，$f_D=-2R'(\eta)/\lambda$ | 直线匀速、静止点目标；聚焦既要延迟对齐也要相位补偿 |
| 坡面几何 | $\omega=\theta-\alpha$，$\theta_{local}=\lvert\omega\rvert$，$dR/ds=\sin\omega$ | 二维迎坡剖面；$\omega$ 可带符号，物理入射角不能为负 |
| 坡面反序与阴影 | 迎坡 $\alpha>\theta$ 反序；背坡 $\beta>90°-\theta$ 自阴影 | 完整遮挡还需射线可见性；叠掩与阴影不能靠亮度阈值互相替代 |
| 相干估计 | $\hat\gamma=\frac{\sum s_1s_2^*}{\sqrt{\sum\lvert s_1\rvert^2\sum\lvert s_2\rvert^2}}$ | 有限窗口、归一化复相关；$N=1$ 的非零样本恒得模1，不能据此判断质量 |

公式连续推导：[第一讲](insar-microwave.html) · [第二讲](insar-imaging.html) · [第三讲](insar-interpretation.html)。

## 三条计算与判读路线

**相位—路径差。** 明确 $s_1s_2^*$ 与正方向 → 写双程因子 → 算未包裹相位 → 再包裹到选定主值区间。$\lambda=55.5$ mm、$R_2-R_1=1$ mm 时，$\Delta\phi\approx0.226421$ rad（约12.973°）。一个完整周期对应单程距离变化 $\lambda/2$；仅靠包裹相位不能恢复周期数。

**分辨率。** 距离向先分斜距和平地投影：$\delta R\approx c/(2B)$，平地地距分辨率约 $\delta R/\sin\theta$；$B=20$ MHz 时斜距约7.495 m。方位向检查实孔径与合成孔径、运动模型和聚焦条件。产品像元间距与可分辨目标距离分别定义。

**坡面解译。** 先画雷达视线与坡向 → 求有符号 $\omega$ → 判斜距顺序及可见性 → 才解释散射强弱。$\theta=35°$、$\alpha=20°$ 时 $\omega=15°$，斜距方向压缩系数约0.258819；若前坡增至45°，$\omega=-10°$，顺序反转。阴影是未获直接照射的区域，不是“回波很弱的任何暗区”。

## 统计、产品与最易混用的结论

散斑由复振幅相干叠加后取模平方产生，不能先把每个散射体强度相加。理想独立 $M$ 视、均值为 $\mu$ 的强度方差为 $\mu^2/M$；平滑降低颗粒感也会牺牲空间信息，相关视数不能直接当作独立视数。高相干说明窗口内有稳定的复数联系，不排除地形、大气、轨道或处理误差相位。

SLC 保存复数信息；检测后的幅度或强度影像不能直接替代 SLC 做干涉。两景进入相干比较前要确认配准、共同有效区域和一致的处理定义。[公式索引](insar-review.html)用于逐项回查；[课件逐页对应与来源](insar-sources.html#ppt-coverage)用于核对课堂范围和原图，不把教材补充当成已讲授内容。
