---
title: "8.1 同频率同振动方向两列光波的合成"
outline: [2, 3]
prev: {"text": "7.7 各向异性均匀介质中的光传播", "link": "/optics-ch07-s07.html"}
next: {"text": "8.2 同频同向正交振动光波的合成", "link": "/optics-ch08-s02.html"}
---

<a id="ppt-6-28"></a>
<a id="ppt-6-43"></a>

# 8.1 同频率同振动方向两列光波的合成

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

<a id="ppt-6-29"></a>
<a id="ppt-6-30"></a>
<a id="ppt-6-31"></a>

## 8.1.1 同频同振动方向传播方向相同的两束光的合成

来源：第 29—31 页。

学习问题：相同频率的两个电场相加，为什么相位差能控制合振幅？

在同一观察点，把两个同频、同传播方向、同振动方向的场写成

$$
E_1=A_1\cos(\omega t-\varphi_1),\qquad
E_2=A_2\cos(\omega t-\varphi_2).
$$

$A_1,A_2$ 是峰值振幅，$\varphi_1,\varphi_2$ 含有该点的空间相位，$\omega$ 为共同角频率。相位关系固定时，合场仍可写成 $E=A\cos(\omega t-\varphi)$，其中

$$
A^2=A_1^2+A_2^2+2A_1A_2\cos\delta,
\qquad\delta=\varphi_2-\varphi_1,
$$

$$
A\cos\varphi=A_1\cos\varphi_1+A_2\cos\varphi_2,
\qquad
A\sin\varphi=A_1\sin\varphi_1+A_2\sin\varphi_2.
$$

#### 详细推导：同频合成的余弦系数比较

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

这个结果可直接从余弦展开得到。令

$$
X=A_1\cos\varphi_1+A_2\cos\varphi_2,\qquad
Y=A_1\sin\varphi_1+A_2\sin\varphi_2,
$$

则

$$
E=X\cos\omega t+Y\sin\omega t
=A\cos(\omega t-\varphi).
$$

比较系数即得 $X=A\cos\varphi$、$Y=A\sin\varphi$，从而

$$
A^2=X^2+Y^2
=A_1^2+A_2^2+2A_1A_2
(\cos\varphi_1\cos\varphi_2+\sin\varphi_1\sin\varphi_2).
$$

括号内为 $\cos(\varphi_2-\varphi_1)$，这就得到合振幅。这里必须保持余弦展开的顺序：$\cos(\omega t-\varphi)=\cos\omega t\cos\varphi+\sin\omega t\sin\varphi$。

</details>



求合相位时可取后一式除以前一式得到 $\tan\varphi$，但要用这两条关系判断象限。若 $A=0$，没有确定的合相位。记振幅时联想相量三角形：同相时 $A=A_1+A_2$；反相时 $A=|A_1-A_2|$；其余情况由夹角 $\delta$ 决定。

PPT 的代数法、复振幅法和相量图法给出同一结果。用负时间因子时，复振幅相加为

$$
\widetilde A=A_1e^{i\varphi_1}+A_2e^{i\varphi_2},
\qquad E=\operatorname{Re}[\widetilde A e^{-i\omega t}],
\qquad A^2=\widetilde A\widetilde A^*.
$$

相量图中箭头长度表示振幅、夹角表示相位差，合箭头由首尾相接或平行四边形得到。多束同频光也先加复振幅，再取模平方；不能直接把各束强度当作总强度。

例如 $A_1=3,A_2=4,\varphi_1=0,\varphi_2=\pi/2$ 时，$X=3,Y=4$，因此 $A=5$、$\varphi=\arctan(4/3)$ 且在第一象限。两束波相位相差四分之一周期，合振幅由直角相量三角形得到，而不是 $3+4$。


自检：等振幅同相与反相分别给多大合振幅？若相位差在探测时间内随机变化，交叉项如何处理？

#### 自检答案：相位与强度相加

<details class="optics-derivation">
<summary>展开答案与解释</summary>

分别为 $2A_0$ 与 0；随机相位使平均余弦交叉项为零，时间平均强度才成为各束强度之和。求瞬时合场仍先作电场矢量相加。

</details>



<a id="ppt-6-32"></a>
<a id="ppt-6-33"></a>
<a id="ppt-6-34"></a>

## 8.1.2 驻波：同频率、同振动方向传播方向相反的两列光波的叠加

来源：第 32—34 页。

学习问题：两列行波都在运动，合场中的波节为什么可以固定？

同频、同振动方向、振幅相同、沿同一直线反向传播，并保持固定相位关系的两列波，可形成完全驻波。按 PPT 的相位定义，

$$
E_1=E_0\cos(kz+\omega t),\qquad
E_2=E_0\cos(kz-\omega t+\delta),
$$

$$
E=2E_0\cos\!\left(kz+\frac\delta2\right)
\cos\!\left(\omega t-\frac\delta2\right).
$$

#### 详细推导：驻波的空间因子与时间因子分离

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

推导只用和差化积：

$$
\cos a+\cos b=2\cos\frac{a+b}{2}\cos\frac{a-b}{2}.
$$

令 $a=kz+\omega t$、$b=kz-\omega t+\delta$，则平均相位为 $kz+\delta/2$，半差为 $\omega t-\delta/2$，于是合场分成只依赖位置的因子与只依赖时间的因子。

</details>



$k=2\pi/\lambda$，$\lambda$ 是介质内波长，$\delta$ 是两列波表达式中的固定相位常量。空间因子与时间因子分开，因而各位置只作振动，波节、波腹不沿空间移动；这就是“驻”。

波节的振幅始终为零，波腹的振幅最大：

$$
\text{波节： }kz+\frac\delta2=\left(m+\frac12\right)\pi,
\qquad
\text{波腹： }kz+\frac\delta2=m\pi,
\qquad m\in\mathbb Z.
$$

波节位置可显式写成

$$
z_m^{(\rm node)}=\frac{(m+1/2)\pi-\delta/2}{k},\qquad
z_m^{(\rm antinode)}=\frac{m\pi-\delta/2}{k}.
$$

相邻波节间距、相邻波腹间距都是 $\lambda/2$；相邻波节与波腹间距为 $\lambda/4$。记距离时在一个波长内数两个波节区间。改变 $\delta$ 会平移整组节点；若两入射振幅不相等，最小振幅一般不为零，便不是这里有完全零振幅波节的理想驻波。


![绳驻波照片中的固定交点和鼓起区](/optics/figures/propagation-ii-rope-standing-wave.png)

图 11-4　原课件 P34：多时刻绳形叠成驻波照片，两端固定，内部各条曲线共同交会处为波节，鼓起区中心为波腹。

读图：对照位置因子 $|2E_0\cos(kz+\delta/2)|$：所有时刻共同为零的位置对应余弦零点；某一瞬间整条曲线经过平衡位置，并不使所有位置都变为波节。光驻波采用相同空间结构。

第 34 页用绳的驻波照片帮助读图：照片中交叉位置是固定波节，鼓起区域是波腹附近。它演示驻波结构，不是光波在日常尺度上的直接照片。

短例：介质内波长为 $400\,\mathrm{nm}$、$\delta=0$，波腹在 $z=m(200\,\mathrm{nm})$，波节在 $z=100\,\mathrm{nm}+m(200\,\mathrm{nm})$。若只把 $\delta$ 改为 $\pi$，节点图样整体平移 $\lambda/4$。


自检：某时刻合场处处为零，所有位置都是波节吗？振幅不同的反向同频波还能出现完全零波节吗？

#### 自检答案：固定节点与瞬时过零

<details class="optics-derivation">
<summary>展开答案与解释</summary>

波节要求该位置在所有时刻振幅为零；整场瞬时过零不满足这个定义。振幅不等时局部最小振幅为两振幅之差的绝对值，一般形成有行波成分的部分驻波。

</details>



## 本节课件定位

光学20261026光的传播II.pdf P28、光学20261026光的传播II.pdf P29、光学20261026光的传播II.pdf P30、光学20261026光的传播II.pdf P31、光学20261026光的传播II.pdf P32、光学20261026光的传播II.pdf P33、光学20261026光的传播II.pdf P34、光学20261026光的传播II.pdf P43。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
