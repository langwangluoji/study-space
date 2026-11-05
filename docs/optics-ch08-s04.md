---
title: "8.4 光拍与群速度"
outline: [2, 3]
prev: {"text": "8.3 光的偏振态", "link": "/optics-ch08-s03.html"}
next: {"text": "9.1 两种各向同性均匀介质交界面对光的调控", "link": "/optics-ch09-s01.html"}
---

<a id="ppt-6-52"></a>

# 8.4 光拍与群速度

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

<a id="ppt-6-44"></a>
<a id="ppt-6-45"></a>
<a id="ppt-6-46"></a>
<a id="ppt-6-47"></a>

## 8.4.1 同振幅同振动方向同一方向传播的频率差很小的两列光波的叠加

![两个略异频率的波逐渐错相后叠加出慢包络](/optics/figures/nov05-beat-two-frequencies-p44.png)

《光学20261026光的传播II.pdf》PDF第44页（局部）。先看上方红、黑两条分波：它们频率接近，沿横坐标逐渐从同相变为反相；再看下方蓝色合波，振幅随这一相对相位缓慢变化。载波振动快，包络变化慢；在固定位置且探测器能分辨差频时，强度亮峰的重复频率为|ν₁−ν₂|。蓝线画的是场，不可直接当作非负光强；强度包络见已保留的p47。


来源：第 44—47 页、第 52 页。

学习问题：两束光的频率都很高，探测器为什么还能看到较慢的明暗变化？

两束同振幅、同振动方向、同向传播且频率很接近的光叠加时，快的光振动外面出现缓慢起伏的包络。设

$$
E_1=E_0\cos(\omega_1t-k_1z),\qquad
E_2=E_0\cos(\omega_2t-k_2z),
$$

$$
\bar\omega=\frac{\omega_1+\omega_2}{2},\quad
\bar k=\frac{k_1+k_2}{2},\quad
\omega_m=\frac{\omega_1-\omega_2}{2},\quad
k_m=\frac{k_1-k_2}{2},
$$

$$
E=2E_0\cos(\omega_mt-k_mz)\cos(\bar\omega t-\bar kz).
$$

同样使用和差化积：两相位之和的一半为 $\bar\omega t-\bar kz$，两相位之差的一半为 $\omega_mt-k_mz$，故得到两个余弦相乘。与驻波的区别是：这里两波同向而频率略有差别，因而缓慢变化的包络可移动；驻波由反向同频波合成，空间节点固定。

带横线的量是平均值，下标 $m$ 表示差的一半。$|\omega_1-\omega_2|\ll\bar\omega$ 时，第一个余弦慢变，给出有符号的场包络；第二个余弦给出快振动。记忆这条积式就是“平均频率作快振动，半差频率作包络”。

在频差很小、两束光能流与电场平方的系数差异可忽略的近似下，设每束光单独的辐照度（光强）均为 $I_0$。对快光振动平均、保留慢包络变化，可得

$$
I(z,t)=4I_0\cos^2(\omega_mt-k_mz)
=2I_0\left[1+\cos\big((\omega_1-\omega_2)t-(k_1-k_2)z\big)\right].
$$

#### 详细推导：只平均快光振动而保留慢包络

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

把强度写作 $I=C\langle E^2\rangle_{\rm fast}$，其中 $C$ 是共同的能流或探测响应系数，单束有 $I_0=CE_0^2/2$。快振动周期远短于包络周期，故在快平均中把包络视为常量：

$$
\langle E^2\rangle_{\rm fast}
=4E_0^2\cos^2(\omega_mt-k_mz)
\left\langle\cos^2(\bar\omega t-\bar kz)\right\rangle_{\rm fast}
=2E_0^2\cos^2(\omega_mt-k_mz).
$$

</details>



再用 $2\cos^2u=1+\cos2u$，可见强度的角频率是 $2|\omega_m|=|\omega_1-\omega_2|$。


![光拍的快速电场、慢包络和非负强度曲线](/optics/figures/propagation-ii-beat-envelope-intensity.png)

图 11-8　原课件 P47：上方蓝线是快速合电场，绿线给慢包络边界；下方红线表示平均掉快振动后的强度，谷底落在零线上。

读图：把上图每个包络大小峰与下图一个亮峰对齐。场包络正负都能给亮峰，模平方后强度重复频率为 $|\nu_1-\nu_2|$；下图横轴可理解为固定位置的时间切片，各曲线共享同一横坐标。

$I$ 随时间在 0 与 $4I_0$ 间变化，这种明暗交替叫拍。固定位置的强度拍频为

$$
\nu_{\rm beat}=|\nu_1-\nu_2|=\frac{|\omega_1-\omega_2|}{2\pi}.
$$

不要把 $|\omega_m|/(2\pi)$ 当作强度拍频：有符号场包络变一次正负，平方后的光强就已重复，所以光强频率是它的两倍。

例如两光频相差 $2.0\,\mathrm{MHz}$，则强度每 $0.50\,\mu\mathrm{s}$ 重复一次；有符号场包络对应的普通频率为 $1.0\,\mathrm{MHz}$，周期为 $1.0\,\mu\mathrm{s}$。看见的亮峰按前一个时间间隔重复。

要实际分辨光拍，两束光需在观察时间内保持足够的相位关联，并有重叠的振动分量；探测器要能跟上差频变化。若把许多个拍周期也一起平均，看到的就只是 $2I_0$。PPT 以 Forrester 等人 1955 年的观测说明，光拍可把很小的光频差转换成较慢的强度变化，用于检测微小频差。


自检：两束等强光拍的最大强度为 $4I_0$，是否违反平均能流守恒？探测器时间响应太慢时读多少？

#### 自检答案：快平均与拍周期平均

<details class="optics-derivation">
<summary>展开答案与解释</summary>

对多个拍周期再平均，$\langle\cos^2\rangle=1/2$，均值仍为 $2I_0$。响应太慢会抹掉差频起伏，读到同样的平均强度。

</details>



<a id="ppt-6-48"></a>
<a id="ppt-6-49"></a>
<a id="ppt-6-50"></a>
<a id="ppt-6-51"></a>

## 8.4.2 群速度和相速度

来源：第 48—52 页。

学习问题：同一波形内，细波峰和宽包络各应跟踪哪个标记？

同一复合波里，可跟踪两类位置。快振动的等相位点移动给相速度，慢包络的等幅点移动给群速度：

$$
v_p=\frac{\bar\omega}{\bar k},\qquad
v_g=\frac{\omega_m}{k_m}
=\frac{\omega_1-\omega_2}{k_1-k_2}
=\frac{\Delta\omega}{\Delta k}
\longrightarrow\frac{d\omega}{dk}.
$$

#### 详细推导：沿相位标记求传播速度

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

具体来说，沿快振动的同一相位有

$$
\bar\omega t-\bar kz=C_p
\quad\Longrightarrow\quad
\bar\omega-\bar k\frac{dz}{dt}=0;
$$

沿同一包络相位有

$$
\omega_mt-k_mz=C_m
\quad\Longrightarrow\quad
\omega_m-k_m\frac{dz}{dt}=0.
$$

</details>



$C_p,C_m$ 分别是跟踪标记的常数。两式各自给出 $v_p$ 与 $v_g$。当两个频率无限接近时，色散曲线 $\omega(k)$ 上两点连线的斜率 $\Delta\omega/\Delta k$ 变为切线斜率 $d\omega/dk$，而 $\omega/k$ 是从原点连到该点的斜率；曲线不是直线时，两种斜率一般不同。

$\bar\omega,\bar k$ 沿用上节定义。对频率集中、差别很小的波包，以中心频率附近的导数表示群速度。PPT 图中，相速度看内部一条细波峰移了多远，群速度看包络中固定的峰或谷移了多远。两者可以不同，不能把包络最大值与某个快速波峰强行当成同一标记。

![两时刻的相位标记与包络标记](/optics/figures/propagation-ii-group-phase-displacement.png)

图 11-9　原课件 P50：上方为 $t_1$，下方为 $t_2$。两单色分量的相位标记分别移动 $v_1(t_2-t_1)$、$v_2(t_2-t_1)$；包络标记由 M 移至 N，距离为 $v_g(t_2-t_1)$。细波峰与包络不能共用一个速度来跟踪。

由 $\omega=kv_p$，课件还写成

$$
v_g=v_p+k\frac{dv_p}{dk}
=v_p-\lambda_n\frac{dv_p}{d\lambda_n},
\qquad\lambda_n=\frac{2\pi}{k}.
$$

#### 详细推导：把波数导数换成介质内波长导数

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

第一个等号是乘积求导。第二个等号使用 $k=2\pi/\lambda_n$，因而

$$
\frac{dk}{d\lambda_n}=-\frac{k}{\lambda_n},\qquad
k\frac{dv_p}{dk}
=k\frac{dv_p/d\lambda_n}{dk/d\lambda_n}
=-\lambda_n\frac{dv_p}{d\lambda_n}.
$$

</details>



这里 $\lambda_n$ 明确是介质内波长；前章 Cauchy 公式的自变量是真空波长 $\lambda_0$，不能把 $\lambda_0$ 原样代入这个导数式。记法是“群速等于相速，加上色散修正”，求导的自变量必须保持一致。

无色散时 $v_p$ 与频率无关，导数项为零，因而 $v_g=v_p$；真空中两者都等于 $c$。按 PPT 所讨论的平滑色散情形：若 $dv_p/d\lambda_n>0$，则 $v_g<v_p$，对应其正常色散例子；若 $dv_p/d\lambda_n<0$，则 $v_g>v_p$，对应其反常色散例子。先看导数的符号，再看公式里减去的项，就不容易把快慢关系背反。这里的群速度按包络移动定义，不应无条件等同于信息传递速度。


短例：透明、弱损耗窄带光的中心波长为 $\lambda_0=0.500\,\mu\mathrm m$，$n=1.516$、$dn/d\lambda_0=-0.0640\,\mu\mathrm m^{-1}$。用真空波长形式得 $n_g=n-\lambda_0dn/d\lambda_0=1.548$，故 $v_g\simeq1.94\times10^8\,\mathrm{m/s}$；相速度约为 $1.98\times10^8\,\mathrm{m/s}$。这一步使用 $v_g=c/n_g$，与上面的介质内波长微商式通过换元相联系。


自检：公式 $v_g=v_p-\lambda_n\,dv_p/d\lambda_n$ 的波长是什么？无色散材料中，为什么相速和群速相等？

#### 自检答案：群速度与波长变量

<details class="optics-derivation">
<summary>展开答案与解释</summary>

这里 $\lambda_n=2\pi/k$ 是介质内波长；Cauchy 公式里的 $\lambda_0$ 则是真空波长，应先换元或用 $c/(n-\lambda_0dn/d\lambda_0)$。无色散时 $\omega(k)$ 为过原点直线，割线斜率和切线斜率相同。

</details>



## 本节课件定位

光学20261026光的传播II.pdf P44、光学20261026光的传播II.pdf P45、光学20261026光的传播II.pdf P46、光学20261026光的传播II.pdf P47、光学20261026光的传播II.pdf P48、光学20261026光的传播II.pdf P49、光学20261026光的传播II.pdf P50、光学20261026光的传播II.pdf P51、光学20261026光的传播II.pdf P52。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
