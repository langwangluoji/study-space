---
title: "8.2 同频同向正交振动光波的合成"
outline: [2, 3]
prev: {"text": "8.1 同频率同振动方向两列光波的合成", "link": "/optics-ch08-s01.html"}
next: {"text": "8.3 光的偏振态", "link": "/optics-ch08-s03.html"}
---

# 8.2 同频同向正交振动光波的合成

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

<a id="ppt-6-35"></a>
<a id="ppt-6-36"></a>
<a id="ppt-6-37"></a>

## 8.2.1 同频率同传播方向振动方向相互垂直的两列光波的叠加

![两正交分量相位差决定椭圆旋向及椭圆圆直线偏振的连续变化](/optics/figures/nov05-polarization-handedness-p37.png)

《光学20261026光的传播II.pdf》PDF第37页（局部）。上图按编号跟踪固定位置电矢量端点，再在下方一排轨迹中比较相位差变化：等振幅时相位差为0或π得到直线，为±π/2得到圆，其余一般为椭圆。原页例式Ex=E₀cos(ωt−kz)、Ey=E₀cos(ωt−kz−π/4)产生椭圆偏振，旁边“左旋光”应按椭圆旋向理解。左右旋名称依赖观察方向，本页注明迎着光看；自然光的方向统计圆图另见p39，两者的时间相位关系不同。


来源：第 35—37 页。

学习问题：同样是正交分量，什么条件决定它们能描出稳定偏振轨迹？

当两束光同频、同向传播，电场分别沿 $x,y$ 方向，并有恒定相位关系时，合电场在垂直传播方向的平面内描出确定轨迹。沿用 PPT 的实函数约定，令

$$
\theta=\omega t-kz,\qquad
E_x=A_x\cos\theta,\qquad
E_y=A_y\cos(\theta+\epsilon).
$$

$A_x,A_y$ 为两个非负峰值振幅，$\epsilon$ 是此处明确写在 $E_y$ 余弦中的相位常量。它的符号要与这一写法一起使用，不能脱离时间因子直接背左右旋。

消去 $\theta$ 后得到偏振轨迹：

$$
\left(\frac{E_x}{A_x}\right)^2+
\left(\frac{E_y}{A_y}\right)^2-
2\frac{E_xE_y}{A_xA_y}\cos\epsilon
=\sin^2\epsilon.
$$

#### 详细推导：消去时间参数得到偏振椭圆

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

为看清消元过程，设 $X=E_x/A_x=\cos\theta$、$Y=E_y/A_y$。将第二个余弦展开：

$$
Y=\cos\theta\cos\epsilon-\sin\theta\sin\epsilon,\qquad
Y-X\cos\epsilon=-\sin\theta\sin\epsilon.
$$

两边平方，并用 $\sin^2\theta=1-X^2$：

$$
(Y-X\cos\epsilon)^2=(1-X^2)\sin^2\epsilon.
$$

整理后为 $X^2+Y^2-2XY\cos\epsilon=\sin^2\epsilon$，即上面的轨迹式。这里没有把 $\sin\theta$ 固定取成正平方根，因此同时覆盖整个振动周期。

</details>



![椭圆偏振的横截面轨迹](/optics/figures/propagation-ii-polarization-ellipse.png)

图 11-5　原课件 P36：电场端点在 $E_x$—$E_y$ 平面上的椭圆轨迹，虚线为主轴方向，$\alpha$ 表示主轴与 $x$ 轴的夹角；图中的 $E_{0x},E_{0y}$ 对应本章 $A_x,A_y$。这是固定位置随时间的轨迹，不是光在空间中沿椭圆前进。

一般是椭圆；两种特殊相位给出容易识别的图形：

|条件|轨迹与偏振态|直观记法|
|---|---|---|
|$\epsilon=2m\pi$|$E_y=(A_y/A_x)E_x$，线偏振|两个分量同升同降，正斜率直线|
|$\epsilon=(2m+1)\pi$|$E_y=-(A_y/A_x)E_x$，线偏振|一个分量增大时另一个反向，负斜率直线|
|$\epsilon=(2m+1)\pi/2$，且 $A_x\ne A_y$|主轴沿 $x,y$ 的正椭圆偏振|两个分量相差四分之一周期|
|$\epsilon=(2m+1)\pi/2$，且 $A_x=A_y=E_0$|$E_x^2+E_y^2=E_0^2$，圆偏振|正交、等振幅、相差四分之一周期，三条件缺一不可|

$m$ 为整数。若某个分量为零，也直接退化为线偏振，此时不再使用含 $A_xA_y$ 分母的轨迹式。圆偏振的电场大小不变而方向不断转动；它与两个分量方向随机的自然光不同。

一般椭圆的主轴相对于 $x$ 轴倾角 $\alpha$ 满足

$$
\tan2\alpha=\frac{2A_xA_y\cos\epsilon}{A_x^2-A_y^2}.
$$

#### 详细推导：旋转坐标消去椭圆的交叉项

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

主轴角的结果来自坐标旋转。令

$$
E_x=u\cos\alpha-v\sin\alpha,\qquad
E_y=u\sin\alpha+v\cos\alpha.
$$

代入轨迹二次式，令 $uv$ 的交叉系数为零，便有

$$
\left(\frac1{A_y^2}-\frac1{A_x^2}\right)\sin2\alpha
-\frac{2\cos\epsilon}{A_xA_y}\cos2\alpha=0.
$$

整理得到上述 $\tan2\alpha$。分母为零时不能机械除法，应回到上一条未除以 $A_x^2-A_y^2$ 的关系判断主轴。

</details>



这个式子给主轴方向信息，选具体角度还要结合图形；圆的主轴方向没有唯一性。记忆时把相差四分之一周期时的 $\cos\epsilon=0$ 与“主轴沿坐标轴”联系起来。

PPT 第 37 页约定迎着光看，即观察者朝向光源。按上面的 $E_x,E_y$ 定义，例子 $\epsilon=-\pi/4$ 中 $E_y$ 落后 $E_x$；取 $z=0$，$t=0$ 时电场端点在右上方，随时间增加先向上移动，迎着光看呈逆时针，课件称为左旋。把相位改为相反号，旋向相反；若改从光源侧顺着传播方向看，看到的顺逆时针也会反转。最稳的判断法是固定位置，算两个相邻时刻的电场端点，再按规定观察方向判旋向。

短例：$A_x=A_y=E_0$、$\epsilon=\pi/2$，在 $z=0$ 取 $t=0$ 与很小的正时间，电场由 $(E_0,0)$ 朝负 $y$ 方向移动。迎着沿 $+z$ 传播的光看，按图中 $x$ 向右、$y$ 向上显示为顺时针；改变观察方向，所见顺逆时针相反。先列两个时刻，比单背相位符号更清楚。


自检：等振幅且正交就一定是圆偏振吗？椭圆轨迹能否独自告诉你左右旋？

#### 自检答案：圆偏振条件与旋向

<details class="optics-derivation">
<summary>展开答案与解释</summary>

还需同频同向、稳定相位差为奇数倍 $\pi/2$。同一几何椭圆可沿两种方向遍历；旋向还需时间演化与观察方向。

</details>



## 本节课件定位

光学20261026光的传播II.pdf P35、光学20261026光的传播II.pdf P36、光学20261026光的传播II.pdf P37。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
