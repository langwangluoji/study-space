<!-- Review input snapshot: submitted for webpage review before the ROT-01, EST-FIG and GAUSS corrections. Final teaching text lives in knowledge/geodesy/lessons/. See geodesy-figures-verification.md for decisions. -->

# 已实施的大地测量课程：正文和配图复审材料

2026-11-04。以下是当前 Obsidian 正文完整文本，source-figure 块内 Markdown 图片与图注同源。静态图实物见随附4张拼图，每幅图按原始1000px宽度排列。

---

文件：geodesy-coordinate-forward.md

---
title: "正算：由大地经纬高求空间坐标"
slug: geodesy-coordinate-forward
chapter: 5
order: 1
sources: [S10]
---

# 正算：由大地经纬高求空间坐标

拿到测站的大地纬度 B、经度 L 和椭球高 h，怎样求出三维直角坐标？几何上只需做两件事：在椭球面上找到法线脚点，再沿这条法线走 h 米。本页对应 S10《4大地坐标与地心坐标之间转.pdf》第2–3页及第10页题1。


![同一点的BLH与XYZ](../assets/figures/lab-blh-xyz.svg)

<!-- geodesy-interactive: blh-xyz | 同一点的BLH与XYZ | lab-blh-xyz.svg -->

先看子午面上的法线与地心向径，再看赤道面的经度投影；增加 h 时点沿同一法线移动。本站按正算模型绘制。

[离线打开交互图](../assets/interactive/blh-xyz.html)

## 先把坐标的含义固定下来

空间直角系的 Z 轴沿椭球短轴，X 轴位于赤道面与起始子午面的交线上，Y 轴补成右手系。B 是椭球外法线与赤道面的夹角，L 从 X 轴所在子午面向东量取。h 从椭球面沿外法线计量。

这里的 h 是椭球高。水准测得的正常高需要结合高程异常才能换成椭球高。以椭球中心建立的直角系在与地心地固框架相容定义时才可直接称为相应的 ECEF；坐标计算同时需要明确采用的椭球和参考框架。

定义

$$
e^2=\frac{a^2-b^2}{a^2}=2f-f^2,\qquad
W=\sqrt{1-e^2\sin^2B},\qquad N=\frac aW.
$$

N 是卯酉圈曲率半径。全部三角函数以弧度为输入，长度使用同一单位。

<!-- source-figure: {"src": "/geodesy/figures/coordinate-meridian.svg", "alt": "法线脚点、椭球高与经度分解", "source": "本站绘制", "page": "示意图", "original": true} -->
![法线脚点、椭球高与经度分解](../assets/figures/coordinate-meridian.svg)

先在子午面找到脚点 S，再沿法线走 h，最后在赤道面按 L 分成 X、Y。CS 的长度为 N，地心到脚点的距离通常不等于 N。本站按正算模型绘制，扁率和高度放大。
<!-- /source-figure -->

## 法线脚点加上高度

先在子午面中令脚点的水平距离为 $p_0$、竖坐标为 $Z_0$。截面椭圆满足

$$
\frac{p_0^2}{a^2}+\frac{Z_0^2}{b^2}=1.
$$

外法线沿 $(p_0/a^2,Z_0/b^2)$，所以在非极点处

$$
\tan B=\frac{a^2Z_0}{b^2p_0},\qquad
Z_0=(1-e^2)p_0\tan B.
$$

将后一式代入椭圆方程，取 $p_0\geq0$，便得到 $p_0=a\cos B/W=N\cos B$，进而有 $Z_0=N(1-e^2)\sin B$。这个因子来自椭圆形状与法线方向的关系。极点直接取 $p_0=0,Z_0=\pm b$。

再用经度把 $p_0$ 分到 X、Y 轴，椭球面的脚点 P₀ 具有坐标

$$
\mathbf r_0=
\begin{pmatrix}
N\cos B\cos L\\N\cos B\sin L\\N(1-e^2)\sin B
\end{pmatrix}.
$$

沿外法线的单位向量为

$$
\mathbf e_U=
\begin{pmatrix}\cos B\cos L\\\cos B\sin L\\\sin B\end{pmatrix}.
$$

于是实际空间点是 $\mathbf r=\mathbf r_0+h\mathbf e_U$，展开得

$$
\boxed{
\begin{aligned}
X&=(N+h)\cos B\cos L,\\
Y&=(N+h)\cos B\sin L,\\
Z&=[N(1-e^2)+h]\sin B.
\end{aligned}}
$$

Z 中的 $1-e^2=b^2/a^2$ 来自椭球面形状；h 对三轴的贡献来自同一条单位法线。将高度简单加到地心距离上会采用不同的移动方向。

> [!info]- 完整推导：椭球面坐标为什么是这个形式？
> 将椭球写为
>
> $$
> F(X,Y,Z)=\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}-1=0.
> $$
>
> 梯度 $\nabla F=2(X/a^2,Y/a^2,Z/b^2)^T$ 沿外法线。令脚点的法线单位向量为 $\mathbf e_U$，存在正数 k，使
>
> $$
> X_0=ka^2\cos B\cos L,\quad
> Y_0=ka^2\cos B\sin L,\quad
> Z_0=kb^2\sin B.
> $$
>
> 代回椭球方程：
>
> $$
> k^2(a^2\cos^2B+b^2\sin^2B)=1.
> $$
>
> 利用 $b^2=a^2(1-e^2)$ 得 $k=1/(aW)$。故 $ka^2=a/W=N$，$kb^2=N(1-e^2)$，得到上面的脚点表达。这同时说明，B 来自法线而非地心向径；两者只在赤道、极点或球面情况下重合。


<!-- source-figure: {"src": "/geodesy/figures/source-blh-normal.png", "alt": "课件中的脚点与法线高度", "source": "S10 大地坐标与地心坐标之间转", "page": "3", "locator": "PDF 文件页 3"} -->
![课件中的脚点与法线高度](../assets/figures/source-blh-normal.png)

来源：S10，PDF 文件页3，截取右侧几何图。原课件用 H 表示本文的 h；P′ 对应脚点，P 对应空间点。沿 P′P 的高度分量分别是 $h\cos B$ 和 $h\sin B$，可与正算式逐项对应。
<!-- /source-figure -->

## 手算流程与讲义例题

采用克拉索夫斯基椭球 $a=6378245\ \mathrm m$、$f=1/298.3$，有 $e^2=0.006693421622966$。S10 第10页给出

$$
B=31^\circ28'16.2831'',\quad L=121^\circ31'50.4015'',\quad h=108.391\ \mathrm m.
$$

先将角度转为十进制度：$B=31.47118975^\circ$、$L=121.530667083333^\circ$，再乘 $\pi/180$ 转为弧度。代入得 $W=0.999087414681329$、$N=6384071.009477\ \mathrm m$。于是水平半径为 $(N+h)\cos B$，分别乘 $\cos L,\sin L$ 得 X、Y；竖直分量使用 $[N(1-e^2)+h]\sin B$，可得

$$
\boxed{\begin{aligned}
X&=-2847533.340846\ \mathrm m,\\
Y&= 4641174.204265\ \mathrm m,\\
Z&= 3310678.314420\ \mathrm m.
\end{aligned}}
$$

点位于北半球、东经第二象限，所以 $Z>0,X<0,Y>0$。这个符号检核在按计算器前就能完成。[下一页的反算](geodesy-coordinate-inverse.md)将用这些结果找回原来的经纬高。

## 三个边界检核

赤道与起始子午线交点：$B=L=h=0$，应得 $(a,0,0)$。北极：$B=90^\circ,h=0$，应得 $(0,0,b)$。球面：$e^2=0,N=a$，公式化为半径 $a+h$ 的球坐标公式。

这些检核分别检查轴向、高度方向与椭球扁率项。极点的 L 可以任意指定，所有经线在该点汇合。

## 自检

1. $B=0,L=90^\circ,h=20\ \mathrm m$ 时，三轴坐标是多少？
2. 若只令 h 增加 1 m，空间位移长度是多少？方向是什么？
3. 能否用 $Z=(N+h)\sin B$ 替代原公式？哪些条件下成立？

> [!info]- 展开答案与理由
> 1. $(0,a+20,0)$。在赤道 N=a，点沿 Y 轴。
> 2. $\Delta\mathbf r=\mathbf e_U\times1\ \mathrm m$，长度恰为 1 m，方向是脚点的椭球外法线。
> 3. 相差 $Ne^2\sin B$。球面 $e^2=0$ 或赤道 $\sin B=0$ 时成立；一般椭球纬度下需要保留扁率项。


继续：[XYZ 反算 BLH](geodesy-coordinate-inverse.md) · 返回[第五章](geodesy-coordinate-conversion.md)。


---

文件：geodesy-coordinate-inverse.md

---
title: "反算：由空间坐标找回经纬高"
slug: geodesy-coordinate-inverse
chapter: 5
order: 2
sources: [S10]
---

# 反算：由空间坐标找回经纬高

经度由 XY 平面中的方向直接确定；大地纬度还要找到椭球法线，所以含有随 B 改变的曲率半径 N。S10 第4页给出迭代解法，本页保留它的几何路线，并补齐象限、极点和高度计算的数值处理。


![从XYZ定位法线脚点](../assets/figures/lab-inverse.svg)

<!-- geodesy-interactive: inverse | 从XYZ定位法线脚点 | lab-inverse.svg -->

从 XY 投影先确定子午面，再在子午面寻找法线脚点；高度沿法线计量。交互的读数采用其面板所列椭球与迭代设置。本站绘制。

[离线打开交互图](../assets/interactive/inverse.html)

## 经度先用两个坐标一起判断象限

令 $p=\sqrt{X^2+Y^2}=\operatorname{hypot}(X,Y)$。由正算公式消去共同因子得

$$
\boxed{L=\operatorname{atan2}(Y,X).}
$$

atan2 的两个输入同时保留 X、Y 的符号。讲义中的 $\arctan(Y/X)$ 适合结合象限讨论使用；直接在程序中写单参数 arctan 会让相差 $180^\circ$ 的两点得到同一结果。$\arcsin(Y/p)$ 也需要补充象限。

经度可以存为 $(-180^\circ,180^\circ]$ 或 $[0^\circ,360^\circ)$；转换时只是周期归一化。X=Y=0 时处于极轴，经度没有唯一值。

## 纬度迭代从哪里来

正算公式给出 $p=(N+h)\cos B$ 与 $Z=[N(1-e^2)+h]\sin B$。用后式加上 $e^2N\sin B$，可得

$$
Z+e^2N\sin B=(N+h)\sin B=p\tan B.
$$

因此采用讲义的迭代形式

$$
\begin{aligned}
B_0&=\operatorname{atan2}(Z,p),\\
N_i&=\frac a{\sqrt{1-e^2\sin^2B_i}},\\
\boxed{B_{i+1}}&\boxed{=\operatorname{atan2}(Z+e^2N_i\sin B_i,p).}
\end{aligned}
$$

初值 $B_0$ 是地心纬度。每轮先按试算纬度计算 N，再更新法线条件；空间点本身保持固定。近地面常用椭球上收敛很快。实现时设置角差阈值和最大迭代次数，并在退出后做正算闭合检核。这里的算法面向地表及其附近的常规测量点，椭球深部法线坐标的多解情况需另作分析。

在子午面中，试算法线与地轴的交点是 $C_i=(0,-e^2N_i\sin B_i)$。从 $C_i$ 指向固定点 $P=(p,Z)$ 的方向角，正好就是下一次的 $B_{i+1}$。收敛时，这条连线与试算法线一致；中间迭代的连线还不一定是试算脚点的法线。

<!-- source-figure: {"src": "/geodesy/figures/inverse-steps.svg", "alt": "固定测站与法线条件的迭代更新", "source": "本站绘制", "page": "示意图", "original": true} -->
![固定测站与法线条件的迭代更新](../assets/figures/inverse-steps.svg)

固定测站与法线条件的迭代更新。来源：本站绘制，示意图。 三幅图中的 P 不动，改变的是 Cᵢ 与试算法线。蓝线 CᵢP 给出下一轮方向，虚线给出当前试算法线；末幅两者重合。图使用放大扁率的教学椭球，数值例题仍采用克拉索夫斯基椭球。
<!-- /source-figure -->

> [!info]- 可直接实现的伪代码与收敛判据
> ```text
> p = hypot(X, Y)
> if p == 0:
>     if Z == 0: 返回“地心无唯一法线经纬高”
>     B = sign(Z) * pi/2
>     L = 约定值，并标记经度未定义
>     h = abs(Z) - b
> else:
>     L = atan2(Y, X)
>     B = atan2(Z, p)
>     repeat 最多30次:
>         N = a / sqrt(1 - e2*sin(B)^2)
>         Bnew = atan2(Z + e2*N*sin(B), p)
>         delta = abs(Bnew - B)
>         B = Bnew
>         if delta < 1e-14 rad: break
>     W = sqrt(1-e2*sin(B)^2)
>     h = p*cos(B) + Z*sin(B) - a*W
> ```
>
> 收敛阈值 $10^{-14}$ rad 对应地球尺度约 $0.06\ \mu\mathrm m$ 的弧长；实际精度还受输入舍入和浮点计算影响。常规工程可按任务需要放宽阈值。若达到迭代上限仍未满足阈值，返回状态而不是把最后一次值当成已收敛结果。


## 高度计算为什么要照顾极区

讲义给出两种等价形式：

$$
h=\frac p{\cos B}-N
=\frac Z{\sin B}-N(1-e^2).
$$

第一式在极区除以很小的 $\cos B$；第二式在赤道附近除以很小的 $\sin B$。一种做法是按纬度选用分母较大的公式。另一个统一表达来自沿法线投影：

$$
\boxed{h=p\cos B+Z\sin B-aW.}
$$

这一步的几何含义可以直接写成 $\mathbf r\cdot\mathbf e_U=\mathbf r_0\cdot\mathbf e_U+h=aW+h$：先把空间位置沿单位法线投影，再减去脚点的同向投影。$aW$ 是投影长度，并非地心到脚点的距离。

> [!info]- 推导：不用除以 sin B 或 cos B 的高度式
> 将正算两式分别乘 $\cos B,\sin B$ 后相加：
>
> $$
> \begin{aligned}
> p\cos B+Z\sin B
> &=(N+h)\cos^2B+[N(1-e^2)+h]\sin^2B\\
> &=h+N(1-e^2\sin^2B)\\
> &=h+NW^2=h+aW.
> \end{aligned}
> $$
>
> 这一表达消除了极区的小分母。由于高度通常由两个数百万米的量相减得到，仍应保留足够的浮点精度；双精度适合常规地球坐标计算。


## 算例：闭合到原来的 BLH

输入[正算页](geodesy-coordinate-forward.md)的未截断 XYZ 和克拉索夫斯基椭球参数，先求 p 与 L，再反复更新 N 和 B：

| 迭代编号 i | $B_i$（度） |
|---|---:|
| 0（地心纬度） | 31.300116055659 |
| 1 | 31.470354512001 |
| 2 | 31.471185675774 |
| 3 | 31.471189730126 |
| 4 | 31.471189749903 |
| 5 | 31.471189750000 |

收敛后得

$$
B=31.47118975^\circ=31^\circ28'16.2831'',\quad
L=121.530667083333^\circ=121^\circ31'50.4015'',
$$

$$
h=108.390999999829\ \mathrm m.
$$

将反算所得 BLH 再正算，三维闭合差小于 $10^{-7}\ \mathrm m$。若使用页面显示的六位小数 XYZ，结果应在相应舍入精度内闭合。这个例子还检查了经度第二象限：单参数 arctan 会给出约 $-58.4693^\circ$，而 atan2 返回正确的 $121.5307^\circ$。

## 手算表与交互读数怎样对应

本页手算表和伪代码使用地心纬度初值、最多30次及 $10^{-14}$ rad 角差阈值。交互默认使用 WGS84，采用 $\operatorname{atan2}(Z,p(1-e^2))$ 加速初值、最多100次及 $2\times10^{-15}$ rad 阈值；因此它的迭代次数不应直接与上表比较。两者求解同一法线条件，使用相同椭球和输入后，最终坐标应在浮点与输入舍入精度内闭合。交互还明确限定归一化半径不小于0.99的教学域。

## 自检

1. X<0、Y>0 的点，经度通常位于哪个象限？为什么 $\arctan(Y/X)$ 会出错？
2. 北极点坐标 $(0,0,b+10)$ 的 B、h 是多少？L 怎么处理？
3. 能否直接令 $B=\operatorname{atan2}(Z,p)$ 后结束计算？

> [!info]- 展开答案
> 1. 经度在 $90^\circ$ 到 $180^\circ$ 之间。比值 Y/X 为负，单参数 arctan 的主值落在第四象限。
> 2. $B=90^\circ,h=10\ \mathrm m$；L 无唯一值，可按软件约定赋 0，同时保留“经度未定义”的状态。
> 3. 这个角是地心纬度。球面、赤道、极点等情况下与大地纬度重合，一般椭球点需要继续求法线方向。


继续：[坐标微分](geodesy-coordinate-differentials.md) · 返回[第五章](geodesy-coordinate-conversion.md)。


---

文件：geodesy-local-directions.md

---
title: "椭球上的局部方向"
slug: geodesy-local-directions
chapter: 2
order: 3
sources: ["S3","S2"]
---


# 椭球上的局部方向

从经纬度求导得到东、北、上三个单位方向，再把空间坐标差投影到测站标尺。需要点积、叉积和上一页的椭球参数表达。


<!-- earth-reading-task -->
P的位置已经有了。现在让它只增加一个很小纬度、再只增加一个很小经度，观察位移朝向和长度。本页交付的是P自己的局部标尺；最后才沿法线把P抬到实际测站高度。
<!-- /earth-reading-task -->

上一专题给出了点的位置。现在固定经度改变纬度，或者固定纬度改变经度，观察点朝哪个方向移动，就能从同一参数化得到南北、东西和法向。局部方向既支撑后续曲率计算，也说明椭球高应该沿什么方向增加。

推导对应椭球讲义文件页 18–24，数学工具见[一般曲面与第一基本形式](geodesy-math.md#%E5%8F%82%E6%95%B0%E5%B7%AE%E6%80%8E%E6%A0%B7%E5%8F%98%E6%88%90%E9%95%BF%E5%BA%A6)和向量公式表。先在 $|B|<\pi/2$ 讨论，经度在极点的参数退化随后说明。

<!-- geodesy-anchor: local-basis-construction -->
## 先构造方向，再使用方向余弦

令全球地轴单位向量为 $\mathbf k=(0,0,1)^T$。大地纬度直接规定上向 $\mathbf e_U=(\cos B\cos L,\cos B\sin L,\sin B)^T$。非极点处，$\mathbf k\times\mathbf e_U$ 沿纬圈切线，指向经度增加的一侧，归一化即得东向：

$$
\mathbf e_E=\frac{\mathbf k\times\mathbf e_U}{\|\mathbf k\times\mathbf e_U\|}
=(-\sin L,\cos L,0)^T.
$$

再取 $\mathbf e_N=\mathbf e_U\times\mathbf e_E$，使东叉北等于上。这样先由几何建立三个单位方向，下面的偏导证明再给出同样的方向及其长度标尺。极点处叉积为零，应先选参考经线，不能直接除以零向量的模。

<!-- source-figure: {"src": "/geodesy/figures/local-basis.svg", "alt": "从法线构造东、北、上三个单位方向", "source": "本站绘制", "page": "示意图", "original": true} -->
![从法线构造东、北、上三个单位方向](../assets/figures/local-basis.svg)

蓝箭头沿椭球法线，橙箭头沿纬圈，绿箭头由叉乘确定。先看三根单位方向，再把它们与下面偏导中的括号向量比较；偏导前的系数负责长度。本站按坐标雅可比的归一化列绘制。
<!-- /source-figure -->

<!-- geodesy-anchor: local-tangents -->
## 求偏导得到两个切向量
取 $\mathbf r(B,L)$ 与 $W,N$ 的定义。$N$ 随纬度变化，求导时不能当作常数：

$$
N_B=\frac{ae^2\sin B\cos B}{W^3}
=\frac{Ne^2\sin B\cos B}{W^2}.
$$

先看水平半径 $p=N\cos B$ 的导数。提出 $N\sin B$，再利用 $W^2=1-e^2\sin^2B$：

$$
\begin{aligned}
p_B&=N_B\cos B-N\sin B\\
&=N\sin B\left(\frac{e^2\cos^2B}{W^2}-1\right)\\
&=-\frac{N(1-e^2)}{W^2}\sin B.
\end{aligned}
$$

竖坐标的导数则为

$$
\begin{aligned}
Z_B&=(1-e^2)(N_B\sin B+N\cos B)\\
&=N(1-e^2)\cos B
\left(1+\frac{e^2\sin^2B}{W^2}\right)\\
&=\frac{N(1-e^2)}{W^2}\cos B.
\end{aligned}
$$

暂将共同长度系数记为 $M=N(1-e^2)/W^2=a(1-e^2)/W^3$，曲率专题将证明它也是子午曲率半径。于是

$$
\mathbf r_B=M
\begin{pmatrix}-\sin B\cos L\\-\sin B\sin L\\\cos B\end{pmatrix},
\qquad
\mathbf r_L=N\cos B
\begin{pmatrix}-\sin L\\\cos L\\0\end{pmatrix}.
$$

前者沿纬度增大的北向，后者沿经度增大的东向。两括号内向量的长度都是 1，点积为零，因此可分别记为 $\mathbf e_N,\mathbf e_E$，并确认经纬参数曲线正交。

## 叉积与梯度给出同一外法线

按东向叉北向得到

$$
\mathbf e_U=\mathbf e_E\times\mathbf e_N
=(\cos B\cos L,\cos B\sin L,\sin B)^T.
$$

这个向量指向外侧，因为与位置向量的点积为
$N(\cos^2B+(1-e^2)\sin^2B)=NW^2>0$。注意参数顺序是 $(B,L)$，所以 $\mathbf r_B\times\mathbf r_L$ 指向内侧，若需要外法线应取 $\mathbf r_L\times\mathbf r_B$。

还可以从隐式方程独立检查。设 $F=(X^2+Y^2)/a^2+Z^2/b^2-1$，将参数化代入梯度：

$$
\nabla F
=2(X/a^2,Y/a^2,Z/b^2)^T
=\frac{2N}{a^2}\mathbf e_U.
$$

比例系数为正，故梯度归一化与叉积确实得到同一外法线。东、北、上三个单位向量构成右手基，直角坐标差转局部坐标的矩阵以它们的转置作为行：

$$
\begin{pmatrix}\Delta E\\\Delta N\\\Delta U\end{pmatrix}
=
\begin{pmatrix}
-\sin L&\cos L&0\\
-\sin B\cos L&-\sin B\sin L&\cos B\\
\cos B\cos L&\cos B\sin L&\sin B
\end{pmatrix}
\Delta\mathbf r.
$$

其中 $\Delta\mathbf r$ 是目标位置减测站位置，不能把未经平移的地心位置直接当局部位置。$\Delta N$ 是北向分量，此处的字母 N 与曲率半径通过上下文区分。

在赤道且 $L=0$，东向对应 Y，北向对应 Z，上向对应 X。极点处 $\mathbf r_L=0$，经纬参数图不再正则；曲面仍光滑，但局部东、北方向需要另选经线或坐标图，而不是用零向量归一化。

<!-- geodesy-anchor: local-metric -->
## 从局部方向得到长度规则
已经证明 $\mathbf r_B=M\mathbf e_N$、$\mathbf r_L=N\cos B\mathbf e_E$，且两个单位切向正交。代入前面定义的第一基本形式，便有

$$
E=M^2,\qquad F=0,\qquad G=N^2\cos^2B,
\qquad ds^2=M^2dB^2+N^2\cos^2B\,dL^2.
$$

这时M和N仍是从坐标求导产生的长度系数。接下来的曲率推导将说明，它们为什么恰好也是两个法截线的曲率半径。在此之前，已有的长度规则已经能把纬度、经度的参数变化换成真正的切向长度。

<!-- geodesy-anchor: ellipsoid-height -->
## 沿法线增加椭球高
椭球高 $h$ 沿参考椭球的外法线计量。这里的 $B,L$ 先确定椭球面脚点 $\mathbf r(B,L)$，$\mathbf e_U(B,L)$ 是该脚点的单位外法线；空间点定义为

$$
\mathbf r_h=\mathbf r(B,L)+h\mathbf e_U(B,L).
$$

因此高度改变时保持的是同一条椭球法线，而不是沿地心向径移动。把两个表达相加就得到

$$
\begin{aligned}
X&=(N+h)\cos B\cos L,\\
Y&=(N+h)\cos B\sin L,\\
Z&=[N(1-e^2)+h]\sin B.
\end{aligned}
$$

赤道、首子午线、$h=0$ 对应 $(a,0,0)$。高度增长时，赤道点沿 X 移动，极点沿 Z 移动。这样的边界关系能检查角度单位、符号和高度方向。

![椭球坐标转换](../assets/figures/lab-blh-xyz.svg)

先看子午面上的法线与地心向径，再看赤道面的经度投影；增加 h 时点沿同一法线移动。本站按正算模型绘制。

<!-- legacy-lab: ellipsoid -->

演示使用 WGS84 几何参数 $a=6378137$ m、$1/f=298.257223563$。讲义的 1980 年坐标系参数不同，正式计算应选任务规定的椭球与框架。交互中的地心纬度由实际空间坐标求得，所以高度不为零时也不会误用椭球面纬度关系。

这里的直角坐标原点是所采用的椭球中心。只有椭球与地心地固框架相容定义时，才能直接按相应 ECEF 坐标理解；椭球法线也不能自动代替真实铅垂方向。

<!-- learning-mark: ge-local -->

## 跟算与理解检查

### 完整例题：赤道测站的局部坐标

测站位于 $B=0,L=0$，其东、北、上方向分别是地心坐标系的 $+Y,+Z,+X$。给定目标减测站的坐标差 $\Delta\mathbf r=(10,20,30)^T$ m，得到

$$
(E,N,U)^T=(20,30,10)^T\,\mathrm m.
$$

矩阵投影与按轴读数一致。三维距离为 $\sqrt{20^2+30^2+10^2}=37.416574$ m，与原坐标差的模相同。局部水平距离为 $\sqrt{20^2+30^2}=36.055513$ m；两者对应不同几何长度。

**自测1：若把目标的地心位置 XYZ 直接乘 ENU 矩阵，会得到目标相对测站的位置吗？**

> [!info]- 展开解析
> 先用目标减测站，构造坐标差，再旋转；旋转本身只改变方向基，不完成原点平移。

**自测2：在 B=0、L=0 处，沿上向增加1 m，XYZ怎样变？**

> [!info]- 展开解析
> X 增加1 m，Y、Z不变，因为该处椭球外法线沿 +X。


---

文件：geodesy-coordinate-differentials.md

---
title: "坐标微分：方向基与长度标尺"
slug: geodesy-coordinate-differentials
chapter: 5
order: 3
sources: [S10]
---

# 坐标微分：方向基与长度标尺

纬度增加 $0.2''$、经度增加 $0.3''$、高度增加 5 m，会让 XYZ 各改变多少？完整正算相减能得到精确差值，微分公式则直接说明每一种变化产生的位移方向和长度。本页对应 S10 第5–6页及第10页题2–3。

<!-- source-figure: {"src": "/geodesy/figures/differential-scales.svg", "alt": "纬度、经度与高度的三个长度标尺", "source": "本站绘制", "page": "示意图", "original": true} -->
![纬度、经度与高度的三个长度标尺](../assets/figures/differential-scales.svg)

纬度、经度与高度的三个长度标尺。来源：本站绘制，示意图。 左图的 M 从局部曲率中心量起，h 沿法线增加，所以北向标尺为 M+h；右图从地轴量纬圈半径，得到 $(N+h)\cos B$。两种角都用弧度。图为局部几何示意，等 h 曲面一般不是另一张旋转椭球。
<!-- /source-figure -->

先把三种变化分开。只改高度时，位置沿上向移动 $dh$；只改纬度时，椭球脚点产生 $M\,dB$ 的北向位移，而抬高的法线随 B 转动又贡献 $h\,dB$；只改经度时，点沿半径 $(N+h)\cos B$ 的纬圈移动。三个独立变化相加，才组成完整微分。

单位方向的几何构造见[局部方向](geodesy-local-directions.md#先构造方向，再使用方向余弦)。下面将它们写成分量，便于直接计算。

## 把微分看成三个方向的位移相加

在 B、L 处定义北、东、上单位向量

$$
\mathbf e_N=\begin{pmatrix}-\sin B\cos L\\-\sin B\sin L\\\cos B\end{pmatrix},\quad
\mathbf e_E=\begin{pmatrix}-\sin L\\\cos L\\0\end{pmatrix},\quad
\mathbf e_U=\begin{pmatrix}\cos B\cos L\\\cos B\sin L\\\sin B\end{pmatrix}.
$$

它们彼此正交，长度均为 1。$M=a(1-e^2)/W^3$、$N=a/W$ 分别为子午圈与卯酉圈曲率半径。坐标微分为

$$
\boxed{d\mathbf r=(M+h)\mathbf e_N\,dB
 +(N+h)\cos B\,\mathbf e_E\,dL
 +\mathbf e_U\,dh.}
$$

纬度的单位变化对应北向长度 $M+h$，经度的单位变化对应东向长度 $(N+h)\cos B$，高度变化本身就是上向长度。角微分 dB、dL 必须用弧度。

## 雅可比分解为“方向 × 标尺”

记 $\mathbf q=(B,L,h)^T$，将三个单位方向按北、东、上排成列矩阵

$$
A=[\mathbf e_N\ \mathbf e_E\ \mathbf e_U],\qquad
D=\operatorname{diag}(M+h,(N+h)\cos B,1).
$$

则

$$
\boxed{d\mathbf r=J_{\mathbf r\mathbf q}\,d\mathbf q,\qquad
J_{\mathbf r\mathbf q}=AD.}
$$

课件将对角标尺记为 J，将完整雅可比写成 AJ；这里用 D 表示标尺，使“雅可比”与“对角阵”的含义清楚。A 满足 $A^TA=I$，但列顺序 NEU 是左手顺序，$\det A=-1$。正交性足以给出逆矩阵 $A^{-1}=A^T$；行列式的符号在下一章旋转向量中会用到。

由于 $D^{-1}$ 容易计算，反向微分立即得到

$$
\boxed{\begin{aligned}
dB&=\frac{-\sin B\cos L\,dX-\sin B\sin L\,dY+\cos B\,dZ}{M+h},\\
dL&=\frac{-\sin L\,dX+\cos L\,dY}{(N+h)\cos B},\\
dh&=\cos B\cos L\,dX+\cos B\sin L\,dY+\sin B\,dZ.
\end{aligned}}
$$

几何上，先将 dXYZ 投影到北、东、上，再分别除以每弧度对应的长度。极点 $\cos B=0$，经度参数退化，应改用局部直角分量或另选坐标图。

> [!info]- 完整求导：为什么偏导恰好沿北、东、上？
> 从 $\mathbf r=\mathbf r_0+h\mathbf e_U$ 出发。先求
>
> $$
> N_B=\frac{Ne^2\sin B\cos B}{W^2},\qquad
> M=\frac{N(1-e^2)}{W^2}.
> $$
>
> 于是
>
> $$
> \begin{aligned}
> \frac{d(N\cos B)}{dB}
> &=N_B\cos B-N\sin B=-M\sin B,\\
> \frac{d[N(1-e^2)\sin B]}{dB}
> &=(1-e^2)(N_B\sin B+N\cos B)=M\cos B.
> \end{aligned}
> $$
>
> 这给出 $\partial_B\mathbf r_0=M\mathbf e_N$。另有
>
> $$
> \partial_B\mathbf e_U=\mathbf e_N,\qquad
> \partial_L\mathbf r_0=N\cos B\,\mathbf e_E,\qquad
> \partial_L\mathbf e_U=\cos B\,\mathbf e_E.
> $$
>
> 固定 h 求偏导：
>
> $$
> \partial_B\mathbf r=(M+h)\mathbf e_N,\quad
> \partial_L\mathbf r=(N+h)\cos B\,\mathbf e_E,\quad
> \partial_h\mathbf r=\mathbf e_U.
> $$
>
> 三列并排即为雅可比。其第一、二列单位是 m/rad，第三列是 m/m，乘上对应微分后统一为米。


## 讲义例题：角秒变化如何成为三维位移

沿用[正算页](geodesy-coordinate-forward.md)的克拉索夫斯基椭球和测站，取

$$
\Delta B=0.2'',\quad\Delta L=0.3'',\quad\Delta h=5\ \mathrm m.
$$

先用 $1''=\pi/648000\ \mathrm{rad}$ 转角度。在例点有 $M=6352929.620348$ m、$N=6384071.009477$ m，故三种变化先形成局部北、东、上位移，约为 $(6.16007949,7.91955424,5)$ m。再分别乘三个单位方向并相加，由雅可比得到

$$
\boxed{\Delta\mathbf r_{\rm lin}=
(-7.298644290,\ -3.247850160,\ 7.864297773)^T\ \mathrm m.}
$$

把变化后的 BLH 重新正算再相减，则得

$$
\Delta\mathbf r_{\rm exact}=
(-7.298639914,\ -3.247860206,\ 7.864300373)^T\ \mathrm m.
$$

精确差值减一阶结果，三分量约为 $(0.00438,-0.01005,0.00260)$ mm。这些差来自微分中省去的二阶项。对本例的角秒和米级变化，一阶结果已把变化量表达得很精细；更大位移可直接完整正反算。

## 与站心基线的区别：U 不恒等于有限高度差

将本章测站作为起点，沿固定起点 NEU 基加入 $(400,300,500)$ m，所得 XYZ 基线是 $(-369.515374244,28.607181484,602.195995806)^T$ m。用同一椭球精确反算终点，椭球高由108.391 m变为约608.410639528 m，即

$$
U=500\ \mathrm m,\qquad \Delta h=500.019639528\ \mathrm m.
$$

约19.64 mm的差异来自有限位移后的法线和参考面几何。站心基线在固定正交基中的投影是精确的，$dh=\mathbf e_U^Td\mathbf r$ 则是一阶微分关系。两者使用相同方向，但描述的量不同。

## 球近似与长度微元

S10 第10页题3令 $e^2=0,a=R$，于是 M=N=R：

$$
d\mathbf r=(R+h)\mathbf e_N dB
+(R+h)\cos B\,\mathbf e_E dL+\mathbf e_U dh.
$$

正交性使长度平方直接相加：

$$
ds^2=(M+h)^2dB^2+(N+h)^2\cos^2B\,dL^2+dh^2.
$$

h=0 时就是椭球面的第一基本形式。它解释了相同经度差在高纬度对应较短的东西向距离。

## 自检

1. 为什么同为 $1''$，纬度变化和经度变化对应的长度通常不同？
2. 若局部位移恰为上向 2 m，dB、dL、dh 分别是多少？
3. 将角秒值 0.2、0.3 直接代入雅可比，会出现什么量级的错误？

> [!info]- 展开答案
> 1. 每弧度长度分别为 M+h 与 $(N+h)\cos B$，既受曲率半径影响，也受经线向极点汇聚影响。
> 2. 一阶关系为 $(0,0,2\ \mathrm m)$；同一条法线上的有限高度变化也满足 B、L 不变。
> 3. 角秒需要除以约 206264.806 才是弧度。直接代入会把两个角变化产生的位移放大约 206265 倍。


继续：[椭球参数变化](geodesy-ellipsoid-parameter-change.md) · 返回[第五章](geodesy-coordinate-conversion.md)。


---

文件：geodesy-ellipsoid-parameter-change.md

---
title: "椭球参数改变时，同一点的经纬高怎样变化"
slug: geodesy-ellipsoid-parameter-change
chapter: 5
order: 4
sources: [S10]
---

# 椭球参数改变时，同一点的经纬高怎样变化

把参考椭球放大 1 m，测站仍固定在原来的空间位置，它的椭球高就要重新计量；椭球扁率改变，法线方向也会跟着变化。本页对应 S10 第7–9页，研究原点和轴向保持不变、只改变椭球元素的情况。

<!-- source-figure: {"src": "/geodesy/figures/ellipsoid-change.svg", "alt": "固定空间点在两套参考椭球上的经纬高", "source": "本站绘制", "page": "示意图", "original": true} -->
![固定空间点在两套参考椭球上的经纬高](../assets/figures/ellipsoid-change.svg)

两图的轴、比例和 P 坐标一致，参考椭球改变后，脚点和法线重新确定。h 沿各自法线计量；不能只把两条高度线平行平移。本站用正反算构造，参数差异已放大。
<!-- /source-figure -->

可以先想象保持 B、L、h 数值不变而改变椭球：正算出的空间位置将改变 $K\,d\boldsymbol\theta$。若要求测站的实际 XYZ 不动，经纬高必须再调整，使 $AD\,d\mathbf g=-K\,d\boldsymbol\theta$。这里 $\mathbf g=(B,L,h)^T$、$\boldsymbol\theta=(a,e^2)^T$；负号表示两种贡献相互抵消。

## 用全微分分清两类变化

将正算关系写为 $\mathbf r=\mathbf r(B,L,h;a,q)$，其中 $q=e^2$。它的全微分是

$$
d\mathbf r=AD\,d\mathbf q_g+K\begin{pmatrix}da\\dq\end{pmatrix},\qquad
\mathbf q_g=(B,L,h)^T.
$$

AD 是[上一页的坐标雅可比](geodesy-coordinate-differentials.md)；K 的两列分别是固定 BLH 时对 a 与 q 的偏导。于是

$$
\boxed{d\mathbf q_g=D^{-1}A^T d\mathbf r
-D^{-1}A^T K\begin{pmatrix}da\\dq\end{pmatrix}.}
$$

第一项来自空间直角坐标变化，第二项来自参考椭球大小、形状的变化。只有空间点在同一原点和同一轴向下固定，才令 $d\mathbf r=0$。

## 固定位置时的结果

仍令 $W=\sqrt{1-q\sin^2B}$、$N=a/W$。固定 XYZ 后得到

$$
\boxed{\begin{aligned}
dB={}&\frac{q\sin B\cos B}{W(M+h)}\,da
+\frac{N\sin B\cos B(2-q\sin^2B)}{2W^2(M+h)}\,dq,\\
dL={}&0,\\
dh={}&-W\,da+\frac{N\sin^2B}{2}\,dq.
\end{aligned}}
$$

椭球仍绕同一 Z 轴旋转，且空间点的 X、Y 未变，因此经度保持不变。a 增大意味着参考面向外扩张，固定点的高度通常随之减小；q 增大使椭球在高纬度更扁，纬度与高度的变化由上式定量给出。

> [!info]- 完整推导：参数偏导矩阵与投影
> 固定 B、L、h 时
>
> $$
> N_a=\frac Na=\frac1W,\qquad
> N_q=\frac{N\sin^2B}{2W^2}.
> $$
>
> 逐项微分正算公式得
>
> $$
> K=\begin{pmatrix}
> N\cos B\cos L/a&N\sin^2B\cos B\cos L/(2W^2)\\
> N\cos B\sin L/a&N\sin^2B\cos B\sin L/(2W^2)\\
> N(1-q)\sin B/a&-N(\cos^2B+W^2)\sin B/(2W^2)
> \end{pmatrix}.
> $$
>
> 最后一个元素从 $Z=[N(1-q)+h]\sin B$ 求导得到：
>
> $$
> Z_q=[(1-q)N_q-N]\sin B
> =-\frac{N(\cos^2B+W^2)\sin B}{2W^2}.
> $$
>
> S10 第7页该元素末尾印作 $\cos B$，这里按直接求导改为 $\sin B$；第9页的简化结果与上述正确偏导相符。赤道 $B=0$ 时，固定 BLH 的 Z 始终为零，也能独立检出这个局部笔误。
>
> 将 K 的两列投影到北、东、上方向：
>
> $$
> \begin{aligned}
> \mathbf e_N^TK_a&=-q\sin B\cos B/W,&\mathbf e_U^TK_a&=W,\\
> \mathbf e_N^TK_q&=-N\sin B\cos B(2-q\sin^2B)/(2W^2),&
> \mathbf e_U^TK_q&=-N\sin^2B/2.
> \end{aligned}
> $$
>
> 两列的东向投影均为零。令 $0=AD\,d\mathbf q_g+K(da,dq)^T$，左乘 $-D^{-1}A^T$，逐行便得到本页框内公式。


## 算例：椭球放大并稍改扁率

固定[本章例点](geodesy-coordinate-forward.md)的 XYZ，令

$$
da=1\ \mathrm m,\qquad dq=10^{-8}.
$$

在原椭球参数和原 BLH 处代入一阶公式，得

$$
\boxed{dB=0.001020628645'',\quad dL=0,\quad dh=-0.990387303678\ \mathrm m.}
$$

用新参数 $a+1,q+10^{-8}$ 对固定 XYZ 重新反算，得到

$$
\Delta B=0.001020628766'',\quad \Delta L=0,\quad
\Delta h=-0.990387302995\ \mathrm m.
$$

一阶式与完整反算一致到本例显示精度。若改用扁率 f 为参数，须先用 $dq=2(1-f)df$ 换算，而不是把 df 直接放入 dq 的位置。

## 检核赤道与极点

在赤道 $\sin B=0,W=1$，有 $dB=dL=0,dh=-da$；改变 q 不改变赤道半径 a。在极点，上式的 $dB$ 为零，而

$$
dh=-\sqrt{1-q}\,da+\frac{a}{2\sqrt{1-q}}\,dq=-db.
$$

这正是固定极轴点到新极半径 b 的距离变化。极点的 L 仍属于未定义参数，$dL=0$ 是沿用同一经度约定的记号。

## 自检

1. 球面只把半径增大 2 m，固定空间点的高度如何变化？
2. 若两个椭球还具有不同原点，能否直接令 dXYZ=0？
3. 为什么更换椭球形状时经度保持不变，而纬度可能变化？

> [!info]- 展开答案
> 1. $dh=-2\ \mathrm m$，经纬方向保持原值；这里 dq=0。
> 2. 需要先把同一空间点在两套框架中的坐标关系写清。原点平移会产生 dXYZ 项，再与椭球参数项一起代入全微分。
> 3. 经度取决于 XY 方向和子午面；同轴旋转椭球的子午面相同。大地纬度取决于该椭球的法线，形状改变会改变法线方向。


继续：[第六章：空间坐标系转换](geodesy-frame-transformations.md) · 返回[第五章](geodesy-coordinate-conversion.md)。


---

文件：geodesy-frame-rotation.md

---
title: "坐标旋转：方向余弦、顺序与小角近似"
slug: geodesy-frame-rotation
chapter: 6
order: 1
sources: [S4, S11]
---

# 坐标旋转：方向余弦、顺序与小角近似

旋转公式的符号由两个问题决定：旋转的是向量还是坐标轴？输出是哪套基底下的分量？把这两件事写清，公式就能用一个90°算例检验。本页对应 S11 第2–11页，以及旋转 DOCX 中的基向量证明和内嵌图页10–18。

<!-- source-figure: {"src": "/geodesy/figures/rotation-comparison.svg", "alt": "固定向量转坐标轴与固定坐标轴转向量", "source": "本站绘制", "page": "示意图", "original": true} -->
![固定向量转坐标轴与固定坐标轴转向量](../assets/figures/rotation-comparison.svg)

左图的红向量不动，新轴转过正角后，向量在新 y′ 轴上的投影为负；右图保持轴不动，向量转后 y 分量为正。将角设为90°即可检查矩阵正负号。本站按明确的主动、被动约定绘制。
<!-- /source-figure -->

## 从同一向量的两种表达出发

令 $E_P=[\mathbf p_1\ \mathbf p_2\ \mathbf p_3]$、$E_Q=[\mathbf q_1\ \mathbf q_2\ \mathbf q_3]$ 为两组正交单位轴在同一公共空间中的列矩阵。同一个向量满足

$$
\mathbf v=E_P\mathbf v_P=E_Q\mathbf v_Q.
$$

左乘 $E_P^T$：

$$
\boxed{\mathbf v_P=C_{P\leftarrow Q}\mathbf v_Q,\qquad C_{P\leftarrow Q}=E_P^TE_Q.}
$$

$C_{ij}=\mathbf p_i\cdot\mathbf q_j$ 是两根轴夹角的余弦，故称方向余弦矩阵；第 j 列是 Q 的第 j 根轴在 P 中的分量。两组都是右手基时有

$$
C^TC=I,\quad C^{-1}=C^T,\quad\det C=+1.
$$

原 DOCX 中“轴的变换”和“分量的变换”互为转置，正是同一条向量等式的两个写法。后续一律使用列向量，矩阵箭头从输入基底指向输出基底。

## 与讲义一致的被动基本矩阵

把旧坐标架命名为 Q，按右手规则转动坐标轴得到新坐标架 P。固定向量从旧分量换到新分量，即 $\mathbf v_P=R\mathbf v_Q$，所以此时 $R=C_{P\leftarrow Q}$。这补齐了前面方向余弦矩阵与下面基本旋转之间的对应。

坐标轴按右手规则转过正角 $\varepsilon$，固定向量的分量使用被动矩阵

$$
R_x(\varepsilon)=\begin{pmatrix}1&0&0\\0&\cos\varepsilon&\sin\varepsilon\\0&-\sin\varepsilon&\cos\varepsilon\end{pmatrix},
$$

$$
R_y(\varepsilon)=\begin{pmatrix}\cos\varepsilon&0&-\sin\varepsilon\\0&1&0\\\sin\varepsilon&0&\cos\varepsilon\end{pmatrix},\qquad
R_z(\varepsilon)=\begin{pmatrix}\cos\varepsilon&\sin\varepsilon&0\\-\sin\varepsilon&\cos\varepsilon&0\\0&0&1\end{pmatrix}.
$$

固定轴而主动转向量时，相同正角使用这些矩阵的转置。符号判断可以直接代入 $\varepsilon=90^\circ$：轴绕 z 正转90°，原来沿 x 的固定向量分量变为 $(0,-1,0)^T$；主动转向量则变为 $(0,1,0)^T$。

## 顺序为什么影响结果

若依次从 C 系换到 B 系，再换到 A 系，有 $C_{A\leftarrow C}=C_{A\leftarrow B}C_{B\leftarrow C}$，最右侧先作用。带上输入、输出下标后，中间坐标架会自然衔接。固定轴与随动轴的有限欧拉分解各有自己的角定义；下面保留课件两条完整路线。

> [!info]- 对照课件：Z–X–Z、X–Y–Z 与同名轴夹角
> S11 第3–5页采用交线轴组织 Z–X–Z 欧拉分解，第6–8页给出 X–Y–Z 的逐步旋转。它们都通过三个角描述一个一般空间姿态，但各步角度的定义不同。第4页的交线分解具体写为
>
> $$
> R=R_z(-\varepsilon_{z2})R_x(\varepsilon_x)R_z(\varepsilon_{z1}).
> $$
>
> 相应同名轴夹角满足
>
> $$
> \begin{aligned}
> \cos\alpha&=\cos\varepsilon_{z1}\cos\varepsilon_{z2}
> +\sin\varepsilon_{z1}\sin\varepsilon_{z2}\cos\varepsilon_x,\\
> \cos\beta&=\sin\varepsilon_{z1}\sin\varepsilon_{z2}
> +\cos\varepsilon_{z1}\cos\varepsilon_{z2}\cos\varepsilon_x,\\
> \cos\gamma&=\cos\varepsilon_x.
> \end{aligned}
> $$
>
> 对于依次施加的列向量分量转换
>
> $$
> \mathbf v_3=R_3R_2R_1\mathbf v_0,
> $$
>
> 最右侧 $R_1$ 先作用。还需说明每一步围绕固定轴还是已经转动的轴；改变这一约定后，即使轴字母相同，连乘解释也会变化。
>
> 例如采用 $R=R_z(\varepsilon_z)R_y(\varepsilon_y)R_x(\varepsilon_x)$ 时，三对同名轴夹角 $\alpha,\beta,\gamma$ 的余弦等于 R 的三个对角元素：
>
> $$
> \begin{aligned}
> \cos\alpha&=\cos\varepsilon_y\cos\varepsilon_z,\\
> \cos\beta&=\cos\varepsilon_x\cos\varepsilon_z+
> \sin\varepsilon_x\sin\varepsilon_y\sin\varepsilon_z,\\
> \cos\gamma&=\cos\varepsilon_x\cos\varepsilon_y.
> \end{aligned}
> $$
>
> 所以“某轴与新同名轴的夹角”通常不是某一个欧拉角。对于讲义的另一种 Z–X–Z 分解，倾斜的两根 Z 轴夹角对应中间 X 旋转的绝对大小，两根 X 或 Y 轴的夹角则还依赖两次 Z 旋转。

> [!info]- 完整展开：X–Y–Z 连乘与小角近似
> 用 $c_i=\cos\varepsilon_i,s_i=\sin\varepsilon_i$，相乘可得
>
> $$
> R=\begin{pmatrix}
> c_zc_y&c_zs_ys_x+s_zc_x&-c_zs_yc_x+s_zs_x\\
> -s_zc_y&-s_zs_ys_x+c_zc_x&s_zs_yc_x+c_zs_x\\
> s_y&-c_ys_x&c_yc_x
> \end{pmatrix}.
> $$
>
> 当各角以弧度计且足够小时，$\sin\varepsilon\approx\varepsilon,\cos\varepsilon\approx1$，略去所有角度乘积：
>
> $$
> \boxed{R\approx I-[\boldsymbol\varepsilon]_\times
> =\begin{pmatrix}1&\varepsilon_z&-\varepsilon_y\\-\varepsilon_z&1&\varepsilon_x\\\varepsilon_y&-\varepsilon_x&1\end{pmatrix},}
> $$
>
> 其中 $[\mathbf a]_\times\mathbf b=\mathbf a\times\mathbf b$。一阶项可以交换顺序，因为顺序差异从二阶项开始出现。近似矩阵的 $R^TR=I+O(\varepsilon^2)$，所以严格求逆时应使用精确旋转的转置，或明确采用一阶逆 $I+[\boldsymbol\varepsilon]_\times$。


<!-- source-figure: {"src": "/geodesy/figures/source-euler-zxz.png", "alt": "课件的交线轴 Z–X–Z 路线", "source": "S11 三维直角坐标系之间转换", "page": "3", "locator": "PDF 文件页 3"} -->
![课件的交线轴 Z–X–Z 路线](../assets/figures/source-euler-zxz.png)

来源：S11，PDF 文件页3，截取旋转几何图。原图中的各级撇号表示中间坐标架；依次跟踪坐标轴，最后与折叠区的连乘顺序核对。图中的同名轴夹角通常不等于某一个欧拉角。
<!-- /source-figure -->

<!-- source-figure: {"src": "/geodesy/figures/source-euler-xyz.png", "alt": "课件的 X–Y–Z 路线", "source": "S11 三维直角坐标系之间转换", "page": "6", "locator": "PDF 文件页 6"} -->
![课件的 X–Y–Z 路线](../assets/figures/source-euler-xyz.png)

来源：S11，PDF 文件页6，截取旋转几何图。每一步的角必须连同旋转轴和中间坐标架一起识别；换成另一种分解后不能直接照搬同一组三个角。
<!-- /source-figure -->

## 算例：顺序与近似各影响多少

取 $\mathbf v=(1,0,0)^T$，先按被动约定绕 z 转90°再绕 x 转90°，得

$$
R_x(90^\circ)R_z(90^\circ)\mathbf v=(0,0,1)^T.
$$

反过来：$R_z(90^\circ)R_x(90^\circ)\mathbf v=(0,-1,0)^T$。两个结果都保持长度，却指向不同方向。

再以本章地球尺度例点为输入，取 $(\varepsilon_x,\varepsilon_y,\varepsilon_z)=(1'',2'',3'')$。精确的 $R_zR_yR_x$ 与一阶 $I-[\boldsymbol\varepsilon]_\times$ 变换结果的三维差约为 0.911 mm。角虽小，仍需结合坐标长度与允许误差判断近似是否合适。

## 大角度旋转的六个约束

S11 第10–11页将9个矩阵元素视为未知数。三个行向量各为单位长，给出3个约束；任意两行正交，再给出3个约束，因此一般旋转只有3个独立参数。求解时还要保证 $\det R=+1$，以选取旋转而非镜像反射。数值实现可用欧拉角、四元数或正交矩阵约束参数化，按具体任务选择。

## 自检

1. 若 $\mathbf v_P=C_{P\leftarrow Q}\mathbf v_Q$，反向转换矩阵是什么？
2. 为什么大角度旋转通常不能交换顺序，小角一阶却看起来可以？
3. 某矩阵满足 $C^TC=I$、$\det C=-1$，能否称为两个右手系之间的纯旋转？

> [!info]- 展开答案
> 1. $C_{Q\leftarrow P}=C_{P\leftarrow Q}^T$。
> 2. 连乘顺序改变交叉乘积项。小角一阶舍去了这些二阶及更高项，故在该近似阶次下顺序相同。
> 3. 它包含手性改变。两个右手基之间的纯旋转应有行列式 +1。


继续：[局部地平与站心极坐标](geodesy-local-polar.md) · 返回[第六章](geodesy-frame-transformations.md)。


---

文件：geodesy-local-polar.md

---
title: "站心坐标：从空间基线到方位角与高度角"
slug: geodesy-local-polar
chapter: 6
order: 2
sources: [S11]
---

# 站心坐标：从空间基线到方位角与高度角

卫星坐标描述它在全球框架中的位置，测站需要的是“从我这里朝哪个方向看”。两者之间先相减构造视线，再投影到测站自己的东、北、上。本页对应 S11 第12–21页。


![从空间基线到测站水平与竖直分量](../assets/figures/lab-local-polar.svg)

<!-- geodesy-interactive: local-polar | 从空间基线到测站水平与竖直分量 | lab-local-polar.svg -->

水平图从北向东量方位角，竖直图把空间距离分成水平和上向；两图描述同一条视线。先核对 Nloc、E 顺序，再读角度。本站绘制。

[离线打开交互图](../assets/interactive/local-polar.html)

<!-- source-figure: {"src": "/geodesy/figures/local-basis.svg", "alt": "站心单位方向从哪里来", "source": "本站绘制", "page": "示意图", "original": true} -->
![站心单位方向从哪里来](../assets/figures/local-basis.svg)

先取上向为法线，以 $\mathbf k\times\mathbf e_U$ 确定东向，再以 $\mathbf e_U\times\mathbf e_E$ 确定北向。三根轴的长度均为1；目标距离由后面的基线给出。本站绘制。
<!-- /source-figure -->

## 从位置差到局部投影

测站为 $\mathbf r_0$，目标为 $\mathbf r_1$，先取

$$
\Delta\mathbf r=\mathbf r_1-\mathbf r_0.
$$

两点坐标使用同一框架和相容历元。上向由大地纬度定义；令 $\mathbf k=(0,0,1)^T$，非极点处东向为 $\mathbf e_E=(\mathbf k\times\mathbf e_U)/\|\mathbf k\times\mathbf e_U\|$，北向为 $\mathbf e_N=\mathbf e_U\times\mathbf e_E$。这是[局部方向页](geodesy-local-directions.md#先构造方向，再使用方向余弦)的同一几何构造，代入测站的 $B_0,L_0$ 后得到

$$
\mathbf e_E=\begin{pmatrix}-\sin L_0\\\cos L_0\\0\end{pmatrix},\quad
\mathbf e_N=\begin{pmatrix}-\sin B_0\cos L_0\\-\sin B_0\sin L_0\\\cos B_0\end{pmatrix},\quad
\mathbf e_U=\begin{pmatrix}\cos B_0\cos L_0\\\cos B_0\sin L_0\\\sin B_0\end{pmatrix}.
$$

将它们作为列排成 $Q_{ENU}=[\mathbf e_E\ \mathbf e_N\ \mathbf e_U]$。因为 $\mathbf e_E\times\mathbf e_N=\mathbf e_U$，这是右手基，$\det Q_{ENU}=+1$。

$$
\boxed{\begin{pmatrix}E\\N_{\rm loc}\\U\end{pmatrix}
=Q_{ENU}^T\Delta\mathbf r,\qquad
\mathbf r_1=\mathbf r_0+Q_{ENU}\begin{pmatrix}E\\N_{\rm loc}\\U\end{pmatrix}.}
$$

$N_{\rm loc}$ 表示北向长度，与曲率半径 N 区分。逐个计算 $E=\mathbf e_E\cdot\Delta\mathbf r$、$N_{\rm loc}=\mathbf e_N\cdot\Delta\mathbf r$、$U=\mathbf e_U\cdot\Delta\mathbf r$，恰好组成 $Q_{ENU}^T$ 的三行；反向则按三根单位轴组合出同一条基线。极点需要先指定参考经线，东、北随该约定确定。

## 课件使用的 NEU 顺序

S11 第12页定义 $x=$北、$y=$东、$z=$上，因此课件的站心系是 NEU 顺序。记

$$
Q_{NEU}=[\mathbf e_N\ \mathbf e_E\ \mathbf e_U]
=\begin{pmatrix}
-\sin B_0\cos L_0&-\sin L_0&\cos B_0\cos L_0\\
-\sin B_0\sin L_0&\cos L_0&\cos B_0\sin L_0\\
\cos B_0&0&\sin B_0
\end{pmatrix}.
$$

则课件的正反变换为

$$
\boxed{\mathbf r_1=\mathbf r_0+Q_{NEU}(x,y,z)^T,\qquad
(x,y,z)^T=Q_{NEU}^T(\mathbf r_1-\mathbf r_0).}
$$

NEU 满足正交性但为左手顺序，$\det Q_{NEU}=-1$。第12–13页先反转 z 轴再旋转，正是因为从左手顺序到右手 XYZ 需要先改变手性。矩阵转换本身完全可用；进行叉积和旋转向量计算时还要保留这个符号。

> [!info]- 按课件分解：反射与两次轴旋转
> 使用[上一页的被动旋转矩阵](geodesy-frame-rotation.md)，有
>
> $$
> Q_{NEU}=R_z(-L_0)R_y(90^\circ+B_0)
> \operatorname{diag}(1,1,-1).
> $$
>
> 最右侧先把上向反成下向，再绕 y 轴转 $90^\circ+B_0$，最后绕 z 轴转 $-L_0$。相乘可得上面的 $Q_{NEU}$。这给出原材料所要求的“经过哪几步旋转和平移”：先做方向变换，最后加上测站位置 $\mathbf r_0$。
>
> 更直接的推导是将目标差向量写为 $\Delta\mathbf r=x\mathbf e_N+y\mathbf e_E+z\mathbf e_U$，分别点乘三个单位向量。它与旋转分解得到相同矩阵，且容易检查行、列各自的含义。


<!-- source-figure: {"src": "/geodesy/figures/source-station-neu.png", "alt": "课件采用北、东、上的站心轴", "source": "S11 三维直角坐标系之间转换", "page": "12", "locator": "PDF 文件页 12"} -->
![课件采用北、东、上的站心轴](../assets/figures/source-station-neu.png)

来源：S11，PDF 文件页12，截取坐标轴图。图中 x 为北、y 为东、z 为上，对应本文的 $(N_{\rm loc},E,U)$；与 ENU 比较时先交换前两项，不能把轴顺序混入旋转正号。
<!-- /source-figure -->

## 极坐标：距离、方位角、天顶距

先显式换成课件顺序：$x=N_{\rm loc},y=E,z=U$。定义空间距离 D、从北顺时针向东量取的方位角 A、从上向量起的天顶距 $z_d$。这里用 $z_d$ 区分天顶距与直角分量 z，也与全球 Z 轴区分。课件第16–17页给出

$$
\boxed{x=D\sin z_d\cos A,\quad y=D\sin z_d\sin A,\quad z=D\cos z_d.}
$$

反算时用

$$
\boxed{\begin{aligned}
D_h&=\operatorname{hypot}(x,y),\qquad D=\operatorname{hypot}(D_h,z),\\
A&=\operatorname{atan2}(y,x)\pmod{2\pi},\\
z_d&=\operatorname{atan2}(D_h,z),\\
\alpha&=\operatorname{atan2}(z,D_h)=\frac\pi2-z_d.
\end{aligned}}
$$

$\alpha$ 是高度角。atan2 同时照顾象限：目标在地平线下时 $\alpha<0,z_d>90^\circ$。目标恰在正上或正下方，$D_h=0$，方位角无唯一值；目标与测站重合时，D=0，所有方向角均无定义。

课件还给出 $D=x\sin z_d\cos A+y\sin z_d\sin A+z\cos z_d$，它是视线与自身单位方向的点积；已知角度时可用，直接由坐标求距离则用范数更简洁。

<!-- source-figure: {"src": "/geodesy/figures/source-station-polar.png", "alt": "斜距、方位角与天顶距的几何关系", "source": "S11 三维直角坐标系之间转换", "page": "16", "locator": "PDF 文件页 16"} -->
![斜距、方位角与天顶距的几何关系](../assets/figures/source-station-polar.png)

来源：S11，PDF 文件页16，截取右侧极坐标图。原图大写 Z 表示天顶距，对应本文的 $z_d$；z 轴表示上向。先把斜距投到水平面，再从北向东量 A，便能读出正算式中的 sin 与 cos。
<!-- /source-figure -->

## 算例：基线与卫星方向的同一套计算

取第五章的测站经纬度。某目标的 NEU 分量为 $(x,y,z)=(400,300,500)\ \mathrm m$。由矩阵正变换可得

$$
\Delta\mathbf r=(-369.515374244,\ 28.607181484,\ 602.195995806)^T\ \mathrm m.
$$

假设只拿到这条 XYZ 基线，先用 $Q_{NEU}^T$ 投影，可恢复 $(400,300,500)$。随后

$$
D_h=500\ \mathrm m,\quad D=707.106781187\ \mathrm m,
$$

$$
\boxed{A=36.869897646^\circ,\quad z_d=45^\circ,\quad\alpha=45^\circ.}
$$

基线方位角与卫星方位角的计算路线相同。对于较长地面弦线，这里得到的是起点局部地平面中空间基线投影的方位角；若任务要求椭球面大地线的方位角，还要采用相应的大地线解算。

> [!info]- 进阶：左手 NEU 基中，叉乘矩阵的小旋转参数怎样换基？
> ## 旋转向量为什么比普通向量多一个符号
>
>
> S11 第18页讨论全球小旋转 $\boldsymbol\varepsilon$ 与局部小旋转 $\boldsymbol\omega$。在右手 ENU 中，旋转向量按普通方向变换：
>
> $$
> \boldsymbol\varepsilon=Q_{ENU}\boldsymbol\omega_{ENU}.
> $$
>
> 旋转向量是轴向量（伪向量）。若局部采用左手 NEU，且仍按统一的代数叉乘矩阵定义旋转参数，便有
>
> $$
> \boxed{\boldsymbol\varepsilon=-Q_{NEU}\boldsymbol\omega_{NEU}.}
> $$
>
> 这正是课件第18页矩阵的符号。若只是在记录同一物理旋转轴沿北、东、上的普通投影，则分量随轴顺序交换即可；此处的负号对应课件小旋转生成矩阵参数的定义，两种记号须明确区分。
>
>
> ### 生成矩阵与数值检核
> 对于任意正交阵 Q，有
>
> $$
> Q[\boldsymbol\omega]_\times Q^T
> =\det(Q)[Q\boldsymbol\omega]_\times.
> $$
>
> 将局部小旋转 $I-[\boldsymbol\omega]_\times$ 转到全球坐标：
>
> $$
> Q(I-[\boldsymbol\omega]_\times)Q^T
> =I-[\det(Q)Q\boldsymbol\omega]_\times.
> $$
>
> 与 $I-[\boldsymbol\varepsilon]_\times$ 比较可得结论。NEU 的行列式为 -1，展开 $-Q_{NEU}$ 就是原课件矩阵。
>
> 在本页测站取 NEU 代数旋转参数 $(1'',2'',3'')^T$，由此得到全球参数
>
> $$
> \boldsymbol\varepsilon=(2.769790807'',\ -0.690040330'',\ -2.419112074'')^T.
> $$
>
> 把两边分别放入上面的叉乘矩阵恒等式，可独立检核符号。
>
>
> 课件第19页将局部倾斜与垂线偏差联系：其约定下 $\omega_x=-\eta,\omega_y=\xi$，$\omega_z$ 为方位起始方向的旋转。实际仪器以重力垂线定竖直，本页的上向以椭球法线定义，二者之间的转换需要垂线偏差改正。法线、地心径向和实际垂线各有明确用途。

## 自检

1. 为什么先减测站位置，再乘局部矩阵？直接乘目标的地心坐标会得到什么？
2. 目标的 $(x,y,z)=(-100,100,0)$ m 时，A 与高度角是多少？
3. 将 NEU 普通位置向量投影到 XYZ，要用 Q 还是 −Q？旋转生成参数呢？

> [!info]- 展开答案
> 1. 局部坐标原点在测站。直接乘全球位置只改变分量基底，仍表达从全球原点出发的向量。
> 2. $A=135^\circ,\alpha=0^\circ$，位于东南方向的地平面。
> 3. 位置向量用 $Q_{NEU}$；按本页叉乘生成矩阵定义的旋转伪向量用 $-Q_{NEU}$。若使用右手 ENU，两者均按相应 Q 正常转换。


继续：[Bursa–Wolf 七参数](geodesy-seven-parameters.md) · 返回[第六章](geodesy-frame-transformations.md)。


---

文件：geodesy-seven-parameters.md

---
title: "Bursa–Wolf：平移、旋转与尺度的七参数模型"
slug: geodesy-seven-parameters
chapter: 6
order: 3
sources: [S11]
---

# Bursa–Wolf：平移、旋转与尺度的七参数模型

两个空间框架可能具有不同原点、不同轴向和不同长度尺度。Bursa–Wolf 模型用3个平移、3个旋转和1个尺度，把同一点的两套坐标连接起来。本页对应 S11 第22–24页，采用与课件一致的被动旋转符号。

<!-- source-figure: {"src": "/geodesy/figures/seven-parameter-vectors.svg", "alt": "七参数转换的原点与相对向量", "source": "本站绘制", "page": "示意图", "original": true} -->
![七参数转换的原点与相对向量](../assets/figures/seven-parameter-vectors.svg)

橙色 t 从目标原点指向源原点；绿色边已旋转、缩放到目标系表达，与 t 相加才得到蓝色目标位置向量。三条边用同一目标基底闭合，不能直接把不同基底下的分量相加。本站绘制。
<!-- /source-figure -->

## 先写清输入与输出

以 $\mathbf r_s=(X_s,Y_s,Z_s)^T$ 表示源系坐标，$\mathbf r_t$ 表示目标系坐标：

$$
\boxed{\mathbf r_t=\mathbf t+(1+\mu)R\mathbf r_s.}
$$

$\mathbf t=(t_x,t_y,t_z)^T$ 的单位是米，表示源系数值原点在目标坐标表达中的位置；$\mu$ 是无量纲相对尺度差，R 是从源分量到目标分量的旋转矩阵。正式参数必须附带源框架、目标框架、参考历元与旋转约定。

旋转有两种常见符号约定：本页与 S11 的小角阵为 $I-[\boldsymbol\varepsilon]_\times$；若另一资料使用 $I+[\boldsymbol\varepsilon]_\times$，其旋转数值的符号相反。两者在参数元数据明确时表达同一个变换。

## 从精确式到一阶式

先以小角代替 R，保留尺度与旋转的乘积：

$$
\mathbf r_t\approx\mathbf t+(1+\mu)(I-[\boldsymbol\varepsilon]_\times)\mathbf r_s.
$$

再略去 $\mu\varepsilon$，得到 S11 第23页的线性模型

$$
\boxed{\mathbf r_t-\mathbf r_s=\mathbf t+C(\mathbf r_s)\boldsymbol\varepsilon+\mu\mathbf r_s,}
$$

其中

$$
C(\mathbf r_s)=[\mathbf r_s]_\times
=\begin{pmatrix}0&-Z_s&Y_s\\Z_s&0&-X_s\\-Y_s&X_s&0\end{pmatrix}.
$$

因为 $-[\boldsymbol\varepsilon]_\times\mathbf r_s
=\mathbf r_s\times\boldsymbol\varepsilon$，课件的参数系数矩阵自然出现这个符号。逐分量为

$$
\begin{aligned}
\Delta X&=t_x-Z_s\varepsilon_y+Y_s\varepsilon_z+\mu X_s,\\
\Delta Y&=t_y+Z_s\varepsilon_x-X_s\varepsilon_z+\mu Y_s,\\
\Delta Z&=t_z-Y_s\varepsilon_x+X_s\varepsilon_y+\mu Z_s.
\end{aligned}
$$

用弧秒存放的旋转先乘 $\pi/648000$；用 ppm 存放的尺度先乘 $10^{-6}$。例如1 ppm 在6000 km的地心距离上对应约6 m，1″旋转对应约29 m的横向变化。

> [!info]- 反向转换与误差项的阶次
> 当 $R^TR=I$ 且 $1+\mu\ne0$ 时，完整相似变换的逆为
>
> $$
> \boxed{\mathbf r_s=\frac1{1+\mu}R^T(\mathbf r_t-\mathbf t).}
> $$
>
> 若要写成 $\mathbf r_s=\mathbf t_{\rm inv}+s_{\rm inv}R_{\rm inv}\mathbf r_t$，应取
>
> $$
> s_{\rm inv}=(1+\mu)^{-1},\quad
> R_{\rm inv}=R^T,\quad
> \mathbf t_{\rm inv}=-s_{\rm inv}R^T\mathbf t.
> $$
>
> 若实际使用的是截断阵 $I-[\boldsymbol\varepsilon]_\times$，它并不严格正交，转置只给出相应的一阶逆。完整计算可使用精确旋转，或对实际线性矩阵求逆。
>
> 将三个参数组分别变号，还隐含舍去 $\mu\mathbf t$、$[\boldsymbol\varepsilon]_\times\mathbf t$ 等交叉项。例如被动绕 z 转 $1''$、$\mathbf t=(1000,0,0)^T$ m、$\mu=0$，精确逆平移约为 $(-1000,-0.004848,0)^T$ m，直接取 $-\mathbf t$ 会漏掉约4.848 mm。完整转换使用上面的逆式。
>
> 小角近似舍去的坐标项约为 $O(\|\mathbf r\|\|\boldsymbol\varepsilon\|^2)$；线性化又舍去 $O(\|\mathbf r\||\mu|\|\boldsymbol\varepsilon\|)$。采用精确 R 时仍需明确旋转轴与顺序；七参数只是参数数量，并未自动确定欧拉角约定。


## 算例：每一个参数怎样作用到坐标

取第五章例点

$$
\mathbf r_s=(-2847533.340846,4641174.204265,3310678.314420)^T\ \mathrm m,
$$

设 $\mathbf t=(1,-2,3)^T$ m，$\boldsymbol\varepsilon=(0.1'',-0.2'',0.3'')^T$，$\mu=2$ ppm。先把角秒与 ppm 转为无量纲弧度和尺度，再代入一阶式：

$$
\boxed{\Delta\mathbf r=(5.265371852,\ 13.028979912,\ 10.132298120)^T\ \mathrm m.}
$$

因此目标坐标约为

$$
\mathbf r_t=(-2847528.075474,\ 4641187.233245,\ 3310688.446718)^T\ \mathrm m.
$$

尺度项使每个坐标分量乘以 $2\times10^{-6}$，旋转项把位置向量转到另一套轴向，平移项最后按三个固定方向相加。这是合成教学参数算例，用来检核公式与单位。

## 基线为什么看不到三个平移参数

把模型分别用于两点后相减：

$$
\boxed{\Delta\mathbf r_t=(1+\mu)R\Delta\mathbf r_s.}
$$

其中 $\Delta\mathbf r$ 指同一系内终点减起点的基线。平移完全相消；一阶式为

$$
\Delta\mathbf r_t-\Delta\mathbf r_s
=C(\Delta\mathbf r_s)\boldsymbol\varepsilon+\mu\Delta\mathbf r_s.
$$

因此纯基线资料可以约束旋转和尺度，却无法确定全球原点平移。这个结论也适用于下页以参考点为中心的模型。

## 自检

1. 如果两套坐标只差 $(10,20,30)$ m 的平移，一条基线的 XYZ 分量会改变吗？
2. 参数表给出 $\mu=3$ ppm，应代入3还是 $3\times10^{-6}$？
3. 另一软件采用“位置向量”小角正号约定，怎样使用本页的旋转参数？

> [!info]- 展开答案
> 1. 不变，终点和起点的平移相消。
> 2. 代入 $3\times10^{-6}$；3会表示相对尺度差300%。
> 3. 保持变换方向相同，三个旋转参数变号；还需核对角单位、尺度单位、历元与平移的定义。


继续：[参考点与范士模型](geodesy-pivot-models.md) · 返回[第六章](geodesy-frame-transformations.md)。


---

文件：geodesy-pivot-models.md

---
title: "参考点转换与范士模型：中心和旋转轴各管什么"
slug: geodesy-pivot-models
chapter: 6
order: 4
sources: [S11]
---

# 参考点转换与范士模型：中心和旋转轴各管什么

区域控制网的同名点聚集在地球表面一块区域。把旋转与尺度作用在“相对该区域参考点的短向量”上，参数就更贴近局部网的几何。进一步沿参考点的北、东、上轴表示旋转，可把倾斜与方位旋转直接联系起来。本页对应 S11 第25–30页。


![在参考点附近旋转、缩放和平移](../assets/figures/lab-transform-pivot.svg)

<!-- geodesy-interactive: transform-pivot | 在参考点附近旋转、缩放和平移 | lab-transform-pivot.svg -->

先减参考点，再旋转缩放相对向量，最后加回目标参考点。图采用主动正角，与课件被动参数应按正文对应。本站绘制。

[离线打开交互图](../assets/interactive/transform-pivot.html)

## 参考点模型先减、再转、再放回

设源系参考点为 $\mathbf p_s$，目标系中该物理参考点为 $\mathbf p_t$，则

$$
\boxed{\mathbf r_t=\mathbf p_t+(1+\mu)R(\mathbf r_s-\mathbf p_s).}
$$

每一项都有明确基底：$\mathbf r_s-\mathbf p_s$ 是源系中的参考点到待转换点向量；乘 R 后成为目标系分量；最后加目标系参考点的位置。

Molodensky–Badekas 常写成

$$
\boxed{\mathbf r_t=\mathbf p+(\mathbf t_p)+(1+\mu)R(\mathbf r_s-\mathbf p).}
$$

这里 p 是源系参考点的坐标数值，目标表达中复制同一组数值作辅助位置，$\mathbf p+\mathbf t_p=\mathbf p_t$。$\mathbf t_p$ 是参考点两套坐标数值的差，通常不等于两套坐标系原点间的平移。S11 第26页补充图正是用辅助点区分这两个含义。课件将此类模型简称为“Molodensky模型”，这里采用能明确指出参考点三维相似变换的名称。

<!-- source-figure: {"src": "/geodesy/figures/source-pivot-two-frames.png", "alt": "课件中的源参考点、目标参考点与相对向量", "source": "S11 三维直角坐标系之间转换", "page": "26", "locator": "PDF 文件页 26（插入补充图）"} -->
![课件中的源参考点、目标参考点与相对向量](../assets/figures/source-pivot-two-frames.png)

来源：S11，PDF 文件页26，截取二维关系图。左右两幅分别使用源、目标坐标，先在左图相减，再旋转缩放，最后在右图加目标参考点。原图 t 表示参考点两套坐标的数值差，本文记为 $\mathbf t_p$；它通常不是 Bursa–Wolf 的原点平移。
<!-- /source-figure -->

## 与 Bursa–Wolf 的关系

把参考点模型展开：

$$
\mathbf r_t=\underbrace{[\mathbf p_t-(1+\mu)R\mathbf p_s]}_{\mathbf t_{BW}}
+(1+\mu)R\mathbf r_s.
$$

因此

$$
\boxed{\mathbf t_{BW}=\mathbf p_t-(1+\mu)R\mathbf p_s
=\mathbf t_p+\mathbf p-(1+\mu)R\mathbf p.}
$$

代入 $\mathbf r_s=\mathbf p_s$，参考点式立即给出 $\mathbf r_t=\mathbf p_t$；这是画图和写程序时最直接的检核。固定参考点后，两种模型可以表达相同的相似变换，差别在参数的组织与平移的含义。参考点常取公共点的重心，使旋转、尺度使用较小的中心化坐标，改善平移与其他参数之间的相关性。

> [!info]- 推导一阶式与同名点参数方程
> 令 $\mathbf d_i=\mathbf r_{s,i}-\mathbf p$。用本章被动小角约定，省去高阶项：
>
> $$
> \begin{aligned}
> \mathbf r_{t,i}
> &\approx\mathbf p+\mathbf t_p+\mathbf d_i
> +C(\mathbf d_i)\boldsymbol\varepsilon+\mu\mathbf d_i\\
> &=\mathbf r_{s,i}+\mathbf t_p
> +C(\mathbf d_i)\boldsymbol\varepsilon+\mu\mathbf d_i.
> \end{aligned}
> $$
>
> 于是参数方程与 Bursa–Wolf 相同，只把旋转和尺度系数中的 $\mathbf r_{s,i}$ 换为中心化向量 $\mathbf d_i$。求解后平移参数是 $\mathbf t_p$，应按上式换回 $\mathbf t_{BW}$ 才能使用全球原点模型。
>
> 将两点方程相减，$\mathbf t_p$ 与参考点均相消，故两模型得到相同的基线变换。


## 算例一：原材料二维补充图

S11 第26页给出源参考点 $\mathbf p_s=(3,2)^T$、待转换点 $\mathbf r_s=(6,3)^T$，目标参考点 $\mathbf p_t=(2,4)^T$。图采用二维主动逆时针25°、尺度1.15，与本章三维被动参数的约定需分别识别。

源相对向量为 $(3,1)^T$，因此

$$
\mathbf r_t=\begin{pmatrix}2\\4\end{pmatrix}
+1.15\begin{pmatrix}\cos25^\circ&-\sin25^\circ\\\sin25^\circ&\cos25^\circ\end{pmatrix}
\begin{pmatrix}3\\1\end{pmatrix}
\approx\begin{pmatrix}4.641\\6.500\end{pmatrix}.
$$

此例 $\mathbf t_p=(-1,2)^T$ 是参考点坐标数值差；全球相似变换的原点平移需计算 $\mathbf p_t-1.15R\mathbf p_s$。图中的虚线 t 表示前者。

## 算例二：三维两种写法闭合

取第五章例点作为源参考点 p，设 $\mathbf t_p=(1,-2,3)^T$ m，$\mu=2$ ppm，$\boldsymbol\varepsilon=(0.1'',-0.2'',0.3'')^T$，待转换点为 $\mathbf r_s=\mathbf p+(1000,2000,3000)^T$ m。采用 $R\approx I-[\boldsymbol\varepsilon]_\times$ 并保留尺度乘积，得

$$
\mathbf r_t=(-2846532.333028,\ 4643172.208265,\ 3313681.318480)^T\ \mathrm m.
$$

换成 Bursa–Wolf 时，同一个 R、尺度对应的平移为

$$
\mathbf t_{BW}=(-3.265391772,-17.028991405,-4.132299142)^T\ \mathrm m.
$$

把它代入原点模型可得到相同的目标坐标。这也说明，模型名称改变后直接复制三个平移数值，会改变变换本身。

> [!info]- 进阶：范士 Veis 如何用参考点局部轴表达小旋转
> ## 范士 Veis：用参考点的局部轴表达旋转
>
>
> 范士模型沿用参考点变换中心，把全球旋转参数换成参考点局部地平轴的参数。若用右手 ENU，令参考点的方向矩阵为 $Q_{ENU,p}$，则
>
> $$
> \boldsymbol\varepsilon=Q_{ENU,p}\boldsymbol\omega_{ENU}.
> $$
>
> 一阶模型变为
>
> $$
> \boxed{\mathbf r_t-\mathbf r_s
> =\mathbf t_p+\mu\mathbf d
> +C(\mathbf d)Q_{ENU,p}\boldsymbol\omega_{ENU}.}
> $$
>
> 原课件使用左手 NEU 的代数旋转参数，按[局部旋转向量规则](geodesy-local-polar.md)有 $\boldsymbol\varepsilon=-Q_{NEU,p}\boldsymbol\omega_{NEU}$，所以课件第30页的旋转系数是 $C(\mathbf d)(-Q_{NEU,p})$。局部两轴参数描述倾斜，上轴参数描述方位起始方向的旋转。选择局部轴使旋转具有直观的区域意义。
>
> 范士模型改变的是旋转参数的基底表达，参考点模型改变的是旋转和尺度作用的中心。它们在参数正确定义后都可表达相应的三维相似变换。
>
> 这里变换的是小旋转生成元的参数，不能把任意有限欧拉角三元组直接乘 Q。局部 Q 使用源参考点在源椭球上的经纬度构造，与本页源相对向量的基底相容。

## 自检

1. 待转换点恰好就是参考点时，旋转与尺度项如何作用？
2. $\mathbf t_p$ 与 $\mathbf t_{BW}$ 在什么条件下相等？
3. 范士模型把三个全球旋转换成局部旋转，会增加独立参数数量吗？

> [!info]- 展开答案
> 1. $\mathbf r_s-\mathbf p_s=0$，输出恰为 $\mathbf p_t$，旋转与尺度不改变零相对向量。
> 2. 当 $\mathbf p-(1+\mu)R\mathbf p=0$ 时相等，例如无旋转无尺度差，或参考点取源原点。一般区域参考点不满足此条件。
> 3. 不会，局部与全球三个旋转参数通过固定正交基底一一对应，仍是3个独立旋转参数。


继续：[参数估计与大地坐标微分](geodesy-parameter-estimation.md) · 返回[第六章](geodesy-frame-transformations.md)。


---

文件：geodesy-parameter-estimation.md

---
title: "从同名点估计七参数，再传播到大地坐标"
slug: geodesy-parameter-estimation
chapter: 6
order: 5
sources: [S10, S11]
---

# 从同名点估计七参数，再传播到大地坐标

已知七参数时，转换一个点只需代入；参数未知时，要用若干个同名点的两套坐标共同估计。求得的参数再通过第五章的雅可比传播到经纬高。本页对应 S11 第23、29、31–33页，其中最小二乘的求解与数值检核为教学展开。

<!-- source-figure: {"src": "/geodesy/figures/parameter-estimation-flow.svg", "alt": "同名点几何、参数方程与大地坐标传播", "source": "本站绘制", "page": "示意图", "original": true} -->
![同名点几何、参数方程与大地坐标传播](../assets/figures/parameter-estimation-flow.svg)

左上先观察同名点是否覆盖区域，再看右上每个点如何贡献三条方程；下方把参数求解与经纬高改正连接起来。点数足够后仍需检查三维几何和矩阵秩，不能仅凭平面示意图判断可解。本站绘制。
<!-- /source-figure -->

## 一点三条方程，组成七列设计矩阵

对第 i 个同名点，记已知坐标差为 $\mathbf l_i=\mathbf r_{t,i}-\mathbf r_{s,i}$，未知参数按

$$
\boldsymbol\beta=(t_x,t_y,t_z,\varepsilon_x,\varepsilon_y,\varepsilon_z,\mu)^T
$$

排列。一阶模型给出 $\mathbf l_i\approx A_i\boldsymbol\beta$，其中

$$
\boxed{A_i=\begin{pmatrix}
1&0&0&0&-Z_i&Y_i&X_i\\
0&1&0&Z_i&0&-X_i&Y_i\\
0&0&1&-Y_i&X_i&0&Z_i
\end{pmatrix}.}
$$

将所有点逐行堆叠成 $\mathbf l,A$。三个平移系数为单位阵，旋转系数为位置向量的叉乘矩阵，尺度系数为位置向量本身。参考点模型则把旋转、尺度列中的坐标换成相对参考点的坐标差，平移列保持单位阵。

一般需要至少3个不共线的三维同名点，并检查 $\operatorname{rank}A=7$。点数多于最低要求时，可通过冗余观测检验拟合质量。若所有点共线，绕该直线的旋转与平移组合会出现不可分辨的自由度；只靠增加同一直线上的点数无法消除它。

## 最小二乘怎样使用观测精度

令残差 $\mathbf v=A\widehat{\boldsymbol\beta}-\mathbf l$，权阵 P 表示坐标差的相对精度。加权最小二乘使

$$
\boxed{\mathbf v^TP\mathbf v\to\min.}
$$

理论正规方程为

$$
A^TPA\,\widehat{\boldsymbol\beta}=A^TP\mathbf l.
$$

实际计算用加权 QR 或 SVD 求解线性最小二乘，减少显式形成正规矩阵对条件数的放大。权阵来自坐标差的协方差；源、目标坐标均有误差时，应依据精度关系传播协方差，必要时采用两套坐标共同含误差的模型。

> [!info]- 单位缩放、参数协方差与独立检核
> 若未知参数以 m、角秒、ppm 混合记录，令
>
> $$
> S=\operatorname{diag}(1,1,1,\rho,\rho,\rho,10^{-6}),\qquad
> \rho=\pi/648000.
> $$
>
> 将 $\boldsymbol\beta=S\boldsymbol\gamma$ 代回得到 $AS\boldsymbol\gamma=\mathbf l$，$\boldsymbol\gamma$ 的数值就按“米、角秒、ppm”求解。这样既与参数表单位一致，也有利于平衡矩阵各列量级。检查条件数应说明列的缩放方式。
>
> 当 P 是相对权阵且观测模型成立时，自由度 $f_r=3n-7$，单位权方差估计为
>
> $$
> \widehat\sigma_0^2=\frac{\mathbf v^TP\mathbf v}{3n-7},\qquad
> \operatorname{Cov}(\widehat{\boldsymbol\beta})
> =\widehat\sigma_0^2(A^TPA)^{-1}.
> $$
>
> 若输入的是已知绝对协方差的逆，则参数协方差直接为 $(A^TPA)^{-1}$，无需再机械乘上经验方差。未知点的转换精度还应传播输入点坐标的不确定度。
>
> 残差用于检查拟合；空间上独立的检核点用于评价转换在其他位置的表现。区域同名点的几何分布会决定参数相关性与外推稳定性，公共点宜覆盖实际应用区域。


## 算例：四个点恢复七个教学参数

构造源点 $(0,0,0)$、$(1000,0,0)$、$(0,1000,0)$、$(0,0,1000)$ m；这是为清楚展示列系数而取的教学几何。用参数 $\mathbf t=(1,-2,3)$ m、$\boldsymbol\varepsilon=(0.1'',-0.2'',0.3'')$、$\mu=2$ ppm 生成一阶观测差：

| 源点 XYZ（m） | ΔX（m） | ΔY（m） | ΔZ（m） |
|---|---:|---:|---:|
| (0,0,0) | 1.00000000 | −2.00000000 | 3.00000000 |
| (1000,0,0) | 1.00200000 | −2.00145444 | 2.99903037 |
| (0,1000,0) | 1.00145444 | −1.99800000 | 2.99951519 |
| (0,0,1000) | 1.00096963 | −1.99951519 | 3.00200000 |

组装12×7矩阵，采用上述单位缩放，以未舍入观测和等权 SVD 求解，得到秩7，恢复

$$
\boxed{\widehat{\boldsymbol\gamma}=(1,-2,3,0.1,-0.2,0.3,2)^T,}
$$

最大绝对残差约 $2.3\times10^{-15}$ m。这验证了参数列、符号和单位的实现；使用上表的八位小数重算会产生相应的舍入残差。合成无噪声例子的零残差用于公式检核，真实控制点还要用其精度、残差与独立检核点评价转换质量。

## 参数变化如何传到 BLH

S11 第31–32页将框架变化和椭球参数变化合并。记 $q=e^2$，$\mathbf g=(B,L,h)^T$，第五章已有

$$
d\mathbf g=D^{-1}Q_{NEU}^T
\left[d\mathbf r-K\begin{pmatrix}da\\dq\end{pmatrix}\right].
$$

一阶框架转换产生的坐标变化为

$$
d\mathbf r=\mathbf t+C(\mathbf r)\boldsymbol\varepsilon+\mu\mathbf r.
$$

所以

$$
\boxed{d\mathbf g=D^{-1}Q_{NEU}^T
\left[\mathbf t+C(\mathbf r)\boldsymbol\varepsilon+\mu\mathbf r
-K\begin{pmatrix}da\\dq\end{pmatrix}\right].}
$$

这就是课件的大地坐标微分公式：先合成空间位置差并扣除参考椭球参数贡献，再投影到局部方向，最后除以角度标尺。$K$ 和 $D$ 见[椭球参数变化](geodesy-ellipsoid-parameter-change.md)及[坐标微分](geodesy-coordinate-differentials.md)。

> [!info]- 逐分量形式与计算顺序
> 先求 $\mathbf u=\mathbf t+C(\mathbf r)\boldsymbol\varepsilon+\mu\mathbf r$，记 $u_N=\mathbf e_N^T\mathbf u$、$u_E=\mathbf e_E^T\mathbf u$、$u_U=\mathbf e_U^T\mathbf u$，则
>
> $$
> \begin{aligned}
> dB={}&\frac{u_N}{M+h}
> +\frac{q\sin B\cos B}{W(M+h)}da
> +\frac{N\sin B\cos B(2-q\sin^2B)}{2W^2(M+h)}dq,\\
> dL={}&\frac{u_E}{(N+h)\cos B},\\
> dh={}&u_U-Wda+\frac{N\sin^2B}{2}dq.
> \end{aligned}
> $$
>
> 若源、目标使用同一个椭球，令 da=dq=0；若原点与轴向不变而只换椭球，令 $\mathbf u=0$。所有系数均在源点及源椭球参数处计算，结果为一阶增量。
>
> 对于较大变化或更高精度任务，完整计算路线为：源 BLH 正算为源 XYZ → 精确框架变换 → 按目标椭球反算目标 BLH。微分公式可用于敏感性解释、小改正及结果检核。


## 算例：七参数带来的经纬高变化

用第五章例点和上面的教学七参数，保持椭球相同。先前求得 $d\mathbf r=(5.265371852,13.028979912,10.132298120)^T$ m，代入逆雅可比：

$$
\boxed{dB\approx0.13901201'',\quad dL\approx-0.42811359'',\quad dh\approx12.41306936\ \mathrm m.}
$$

把 $\mathbf r+d\mathbf r$ 完整反算，再与原 BLH 相减，可得约 $\Delta B=0.13901154''$、$\Delta L=-0.42811293''$、$\Delta h=12.41308081$ m。差异为坐标参数化中的二阶效应；两种路线使用的是同一组一阶框架坐标差。

## 自检

1. 一组同名点数量足够，是否就一定能稳定求得七参数？
2. 设计矩阵的旋转列为什么含 XYZ，而平移列是0或1？
3. 把 dXYZ 直接当成 dBLH，会混淆哪些量？

> [!info]- 展开答案
> 1. 还要检查矩阵秩、点位分布、观测精度和参数相关性。共线或范围过窄的几何会造成不可解或较弱约束。
> 2. 平移对每个点产生相同的轴向增量；旋转引起的位移与点到旋转中心的杠杆向量有关，因此系数包含坐标。
> 3. XYZ 是沿全球直角轴的长度；B、L 是角，h 是沿椭球法线的长度。需要投影并除以相应曲率标尺；更换椭球时还须加入参数项。


返回[第六章](geodesy-frame-transformations.md) · 回读[第五章](geodesy-coordinate-conversion.md)。


---

文件：geodesy-gauss-solution.md

---
title: "大地主题正算与反算"
slug: geodesy-gauss-solution
chapter: 4
order: 4
sources: ["S8","S9"]
---


# 大地主题正算与反算

用同一组输入走完正算和反算，逐步辨认引数更新、象限处理和误差回验。需要上一页的三次公式；所有内部角度使用弧度。


<!-- earth-reading-task -->
把S8的同一组数据一直用到结束：B1=40°00′08.3421″、L1=115°46′27.0953″、A12=75°41′29.762″、S=24909.814m。原题未指定椭球，本页演示明确用WGS84。先估中间引数、更新终点，再检查迭代残差和独立位置差；两种误差必须分开读。
<!-- /earth-reading-task -->

<!-- source-figure: {"src": "/geodesy/figures/gauss-flow.svg", "alt": "高斯平均引数正算与反算流程", "source": "本站绘制", "page": "示意图", "original": true} -->
![高斯平均引数正算与反算流程](../assets/figures/gauss-flow.svg)

来源依据：S9，PDF 文件页28–29及本页完整三次式，本站重绘。左侧正算更新未知中间引数；右侧反算先从已知端点形成北东分量，再用 atan2 和模长。正反算闭合检查程序一致性，独立算法对比检查级数截断误差。
<!-- /source-figure -->

## 三组高斯平均引数公式

沿用上页定义：$B_m=(B_1+B_2)/2$，$L_m=(L_1+L_2)/2$，$A_m=(A_{12}+A_2^+)/2$，各角先在连续分支上展开。令 $t=\tan B_m$、$u=e'^2\cos^2B_m$、$V^2=1+u$、$N=N(B_m)$。注意 $N_m=N(B_m)$，不是 $(N_1+N_2)/2$；后者差异会影响三次项。为减轻长式阅读，把三组无量纲系数单独列出：

$$
\begin{aligned}
C_B={}&\sin^2A_m(2+3t^2+2u)\\
&+3u\cos^2A_m(-1+t^2-u-4t^2u),\\
C_L={}&t^2\sin^2A_m-\cos^2A_m(1+u-9t^2u),\\
C_A={}&\sin^2A_m(2+t^2+2u)\\
&+\cos^2A_m(2+7u+9t^2u+5u^2).
\end{aligned}
$$

于是原讲义 S8 文件页23的正算式等价于

$$
\boxed{\Delta B=\frac{SV^2\cos A_m}{N}\left(1+\frac{S^2C_B}{24N^2}\right),}
$$
$$
\boxed{\Delta L=\frac{S\sin A_m}{N\cos B_m}\left(1+\frac{S^2C_L}{24N^2}\right),}
$$
$$
\boxed{\Delta A=\frac{St\sin A_m}{N}\left(1+\frac{S^2C_A}{24N^2}\right).}
$$

公式保留到端点差的三次项。课件称“四次方精度”，来自对称展开中四次差值项抵消、下一项为五次；这是阶次描述，不是一个适用于所有纬度、距离、方向的误差上限。

## 正算：为什么需要迭代

已知起点、$A_{12}$ 和 $S$ 时，$B_m,A_m$ 尚含未知终点。先用起点一阶导数估计

$$
B_m^{(0)}=B_1+\frac{S\cos A_{12}}{2M_1},\qquad
A_m^{(0)}=A_{12}+\frac{S\tan B_1\sin A_{12}}{2N_1}.
$$

然后依次计算 $N,t,u,V^2$ 与三组差值，再更新

$$
B_m^{(k+1)}=B_1+\frac{\Delta B^{(k)}}2,\qquad
A_m^{(k+1)}=A_{12}+\frac{\Delta A^{(k)}}2.
$$

重复至纬度和方位角引数变化均小于选择的容限。S8 文件页24给出 $0.0001''$，换成弧度约 $4.8481\times10^{-10}$；实现还应设迭代次数上限并报告不收敛。获得引数后重算三组差值，最后

$$
B_2=B_1+\Delta B,\quad L_2=L_1+\Delta L,\quad
A_{21}=(A_{12}+\Delta A+\pi)\bmod2\pi.
$$

经度输出可以归一到 $[-\pi,\pi)$，但差值和平均值使用展开后的经度。收敛容限控制的是迭代残差；大地线近似误差和坐标输入误差仍需另验。

## 反算：先得到北东分量，再求角和距离

已知端点，先得到 $\Delta B,\Delta L,B_m$，其中短线跨180°经线时使用局部连续的经度差。定义一阶分量

$$
X_0=\frac{N\Delta B}{1+u},\qquad Y_0=N\cos B_m\Delta L.
$$

把 $X=S\cos A_m$、$Y=S\sin A_m$ 代入正算式，解出其三次改正；右侧小量项可以用 $X_0,Y_0$ 代替 $X,Y$，差异只影响更高次项。得到不再截断椭球辅助量的三次反解：

$$
\begin{aligned}
X={}&X_0-\frac{X_0}{24N^2}\big[Y_0^2(2+3t^2+2u)\\
&\hspace{27mm}+3uX_0^2(-1+t^2-u-4t^2u)\big],\\
Y={}&Y_0-\frac{Y_0}{24N^2}\big[t^2Y_0^2-X_0^2(1+u-9t^2u)\big].
\end{aligned}
$$

这样求出 $A_m=\operatorname{atan2}(Y,X)$、$S=\sqrt{X^2+Y^2}$。`atan2`同时使用分量的正负确定象限；只用 $\arctan(Y/X)$ 会失去象限且在 $X=0$ 时不能相除。用分量模长也避免了原讲义 $S=Y/\sin A_m$ 在纯子午线时的零除。

将 $S,A_m$ 代回正算第三式，求 $\Delta A$，再得

$$
A_{12}=(A_m-\Delta A/2)\bmod2\pi,\qquad
A_{21}=(A_m+\Delta A/2+\pi)\bmod2\pi.
$$

当两端重合时 $S=0$，方位角无定义，应明确返回此状态。近极点、近对跖点或长距离问题超出这套局部级数的可靠范围，应用完整椭球大地线算法。

> [!info]- 原课件反算多项式与辅助量截断的对应
> S8 文件页25先用一阶 $S\cos A_m,S\sin A_m$ 代入小量项，页26进一步整理为以下多项式。记 $b=\Delta B,l=\Delta L$：
>
> $$
> X\simeq\frac{Nb}{1+u}
> -\frac{N\cos^2B_m}{24}(2+3t^2-3t^2u)bl^2
> -\frac N8(t^2u-u)b^3,
> $$
> $$
> Y\simeq N\cos B_m\,l
> +\frac{N\cos B_m}{24}(1-u-9t^2u)b^2l
> -\frac{N\cos B_m\sin^2B_m}{24}l^3.
> $$
>
> 它们还在三次项的系数中省略了 $u^2$ 及更高项；第一项的 $1/(1+u)$ 保留原样。例如完整反解中的混合项系数
>
> $$
> \frac{2+3t^2+2u}{1+u}=2+3t^2-3t^2u+O(u^2),
> $$
> $$
> \frac{1+u-9t^2u}{(1+u)^2}=1-u-9t^2u+O(u^2).
> $$
>
> 剩下的 $b^3$ 项同样展开到 $u$ 的一次。由 $\cos^2B_m\,t^2=\sin^2B_m$ 可得到末尾 $l^3$ 项。这解释了原件两页之间的进一步简化，不应把课件最终式误标为“完全保留偏心率的三次反解”。本页计算演示使用上面的完整三次反解，原课件最终式也保留供核对。


<!-- geodesy-anchor: gauss-example -->
## 计算演示与精度回验
程序与数值结果见[独立核验记录](../data/new-lectures-verification.json)。采用WGS84几何参数，仅演示方法，不推定原讲义算例属于这个椭球。对实际项目需使用指定参考椭球和框架。

> [!info]- 使用原讲义末页数据走完一次正算、反算和边长归算
> S8 文件页28的大地主题数据为 $B_1=40^\circ00'08.3421''$、$L_1=115^\circ46'27.0953''$、$A_{12}=75^\circ41'29.762''$、$S=24909.814\,\mathrm m$。按“度+分/60+秒/3600”转换后再转弧度，执行本页正算，再用所得端点反算。结果和与GeographicLib的差值记录在[数值表](../data/new-lectures-verification.json)的 `lecture_example` 中。原页未在该处明确椭球，本演示明确选WGS84，不能冒充唯一原题答案。
>
> 同页边长数据是 $D=28678.456\,\mathrm m$、$B_1=38^\circ22.3'$、$A_{12}=56^\circ38.6'$、$B_2=38^\circ30.6'$、$A_{21}=236^\circ45.6'$、$H_1=4130.46\,\mathrm m$、$H_2=3950.67\,\mathrm m$。原题采用小数角分记号，例如“$22'.3$”表示 $22.3'$，即 $22'18''$；输入按“度+小数角分/60”转换。先求两端方向半径，再按上一页的斜距归算公式算 $d$，用平均方向半径完成弦弧转换。记录分别列出一阶工程式、局部曲率圆式及二者差异；这里曲率圆公式的“精确”仅相对于该局部模型，不能作为严格椭球归算精度。
>
> 原习题的要求与数据完整保留在[原PDF](https://langwangluoji.github.io/study-space/geodesy-source-s8.html)；本页的简短自测用于检查公式条件与结果解释。


### 数值结果

所有结果采用WGS84；原题未指定椭球，不能直接用本表替代其他椭球的答案。

终点纬度 **40.0574161638°**，经度 **116.0570868074°**，反方位角 **255.8735542790°**。迭代5次；反算距离 **24909.814000m**；与完整算法的终点位置差约 **0.000058mm**。

斜距算例：局部模型弦长 **28659.737323m**，曲率圆弧长 **28659.761432m**；一阶工程式 **28659.749978m**，二者差 **-11.454mm**。该差主要反映一阶高度截断等近似，曲率圆弧长也不是严格的椭球归算真值。

以下是六个纬度、八个方位角（包含南北东西、四象限和跨180°经线）的抽样最大误差，**不是全域误差上限**。

|距离|纬度范围|正算终点位置差|反算距离差|
|---|---|---|---|
|1km|绝对纬度≤60°|0.0000mm|0.0000mm|
|1km|绝对纬度≤80°|0.0000mm|0.0000mm|
|25km|绝对纬度≤60°|0.0003mm|0.0001mm|
|25km|绝对纬度≤80°|0.0290mm|0.0024mm|
|100km|绝对纬度≤60°|0.3554mm|0.0518mm|
|100km|绝对纬度≤80°|33.8606mm|2.4068mm|
|200km|绝对纬度≤60°|12.1922mm|1.6849mm|
|200km|绝对纬度≤80°|1344.5056mm|88.9510mm|

极区和较长线的误差会显著增长；按任务精度选择完整算法。迭代容限只能约束迭代变化，不能消除这些截断误差。


验算分三层：先用符号计算检查三次系数与微分方程是否相同；再用直接数值积分检查单位速度及克莱劳守恒；最后与完整椭球大地线算法比较有限距离的位置与方向。正反算互相接近只能说明同一套公式内部一致，不能单独证明没有共同的截断误差。

核验覆盖球面极限、赤道、南北半球、子午/东西/斜向、四个象限、跨180°经线，以及随距离增大的误差。越靠近极点，$\tan B$ 和 $1/\cos B$ 越大，不能仅凭“距离小于200km”保证精度。若实际精度要求更严，应根据独立误差结果改用完整算法。

[原文定位：S8 文件页23–28](https://langwangluoji.github.io/study-space/geodesy-source-s8.html)。

网页为串联原讲义补写了中间推导、符号约定与边界说明；完整原文和批注仍以所列文件页为准。

<!-- learning-mark: ge-gauss-solution -->

## 跟算与理解检查

### 完整例题：正反算分别交付什么

按原讲义数据输入 $B_1=40°00′08.3421″$、$L_1=115°46′27.0953″$、$A_{12}=75°41′29.762″$、$S=24909.814$ m。原题未标明椭球，本例明确取WGS84。先以“度+分/60+秒/3600”转为十进制度，再转弧度，按本页三次公式迭代，得到

$$
B_2=40.05741616375947°,
\quad L_2=116.05708680741117°,
\quad A_{21}=255.87355427897768°.
$$

以这两个端点作本页三次反算，恢复 $S=24909.813999981$ m、$A_{12}=75.691600555660°$。正反算一致检查公式内部关系；独立GeographicLib比较的本例终点差约 $5.82\times10^{-8}$ m。这个误差属于该输入与实现，精度范围仍结合正文的多距离、多纬度比较判断。

**自测1：迭代引数变化很小，说明最终大地线一定足够准确吗？**

> [!info]- 展开解析
> 引数变化说明所选截断公式的迭代稳定；还需检查截断误差，正文用独立积分和GeographicLib比较。

**自测2：反算两点重合时，距离与方位角分别是什么？**

> [!info]- 展开解析
> 距离为0，方位角无定义；应显式报告这一状态。


<!-- geodesy-anchor: gauss-pseudocode -->
## 从公式到伪代码
新版S9文件页28—29把正反算排成步骤。下面沿用本页的完整三次系数，`increments(Bm, Am, S)` 就是本页开头的三组增量公式，`Geo(B)` 依次返回 $N,M,t,u=e'^2\cos^2B,V^2$。这两个辅助函数的数学表达已在正文给出。所有角度为弧度，长度与长半轴同单位。

### 正算：更新均值，再重算终点

```text
输入 a, f, B1, L1, A12, S
(N1, M1, ...) ← Geo(B1)
Bm ← B1 + S cos(A12)/(2 M1)
Am ← A12 + S tan(B1) sin(A12)/(2 N1)
εB ← (0.0001/3600)π/180
εA ← (0.001/3600)π/180
converged ← false
重复 k = 1 ... 20：
    (ΔB, ΔL, ΔA) ← increments(Bm, Am, S)
    newB ← B1 + ΔB/2
    newA ← A12 + ΔA/2
    done ← |newB−Bm| ≤ εB 且 |newA−Am| ≤ εA
    (Bm, Am) ← (newB, newA)
    若 done：converged ← true；退出循环
若未 converged：报告未收敛
(ΔB, ΔL, ΔA) ← increments(Bm, Am, S)
输出 B2 = B1 + ΔB
     L2 = wrapπ(L1 + ΔL)
     A21 = wrap2π(A12 + ΔA + π)
```

先把两个均值同时更新，再判断是否继续；最后按最终均值重算一次增量。`wrapπ` 将角度归入 $[-\pi,\pi)$，`wrap2π` 归入 $[0,2\pi)$。这些操作用于输出归一化或短线经差，均值迭代保留连续角度分支。

### 反算：一次三次反解，再恢复方位角

```text
输入 a, f, B1, L1, B2, L2
Bm ← (B1+B2)/2
ΔB ← B2−B1； ΔL ← wrapπ(L2−L1)
若 ΔB = 0 且 ΔL = 0：输出 S=0，方位角无定义；结束
(N, M, t, u, V²) ← Geo(Bm)
X0 ← M ΔB； Y0 ← N cos(Bm) ΔL
X ← X0 − X0[Y0²(2+3t²+2u)+3u X0²(−1+t²−u−4t²u)]/(24N²)
Y ← Y0 − Y0[t²Y0²−X0²(1+u−9t²u)]/(24N²)
Am ← atan2(Y, X)； S ← hypot(X, Y)
(忽略的纬差, 忽略的经差, ΔA) ← increments(Bm, Am, S)
输出 A12 = wrap2π(Am−ΔA/2)
     S
     A21 = wrap2π(Am+ΔA/2+π)
```

S9第29页采用原课件进一步省略辅助量高次项的反算多项式，对应本页“原课件反算多项式”折叠框；上面的伪代码采用完整三次反解。两种表达的截断层次在正文逐项对应。回验时按所选版本记录误差，保留原资料的算法约定。


---

文件：geodesy-orbit-gravity.md

---
title: 地球形状与引力场：从点质量到球谐展开
slug: geodesy-orbit-gravity
chapter: 7
order: 1
sources: [S6]
---

# 地球形状与引力场：从点质量到球谐展开

地球的几何形状帮助我们定义位置，质量分布决定卫星所受的引力。球体、旋转椭球和三轴椭球分别保留不同层次的结构；球谐展开则让这些结构进入同一个可计算的引力位表达式。对应 S6 文件页 4–17。

先备知识是向量、梯度和积分。梯度 $\nabla U$ 指向标量场 $U$ 增长最快的方向，其分量为对三个直角坐标的偏导数。

## 三个“地球表面”各有用途

真实地表包含地形起伏。参考椭球是便于计算经纬度、曲率和弧长的光滑几何面；旋转椭球的长、短半轴记为 $a,b$，扁率为 $f=(a-b)/a$。大地水准面是选定的重力等位面，接近平均海面并延伸至陆地下方，用于建立物理高程参考。S6 第 5 页的两组图强调这三个面彼此不同。

重力和引力也有不同含义。引力来自质量吸引；在随地球匀速旋转的近似中，地面感受到的重力还包括离心作用。若采用本页的正号位约定，重力位写为

$$
W=U+\frac12\omega^2(x^2+y^2),\qquad \mathbf g=\nabla W.
$$

$\omega$ 是地球自转角速度，单位 $\mathrm{rad\,s^{-1}}$；$x,y$ 是相对自转轴的赤道面坐标。这个式子解释了为何大地水准面应取重力等位面。第 6 页重力异常图描绘相对于所选正常场的差异，颜色起伏并非真实地形的等比例表示。

## 从力到势能，再到引力位

取地心为原点，$\mathbf r$ 从地心指向质量为 $m$ 的质点，$r=\|\mathbf r\|$，$\mu=GM$。点质量模型给出

$$
\mathbf F=-\frac{GMm}{r^3}\mathbf r,
\qquad V=-\frac{GMm}{r},
\qquad U=-\frac Vm=\frac{GM}{r}.
$$

$G$ 是万有引力常数，$M$ 是地球总质量，$V$ 是以无穷远为零点的势能，单位为焦耳；$U$ 是 S6 第 8 页采用的正号引力位，单位为 $\mathrm{m^2\,s^{-2}}$。因此

$$
\mathbf a=\frac{\mathbf F}{m}=\nabla U
=-\frac{\mu}{r^3}\mathbf r.
$$

物理教材也常写单位质量势能 $\Phi=V/m=-\mu/r$，对应 $\mathbf a=-\nabla\Phi$。两种符号约定得到相同的向心加速度。检查公式时把“位的符号”和“梯度前的符号”成对检查。

把地球分成微小质量元 $dm=\rho(\mathbf r')\,d^3r'$，叠加后得到

$$
U(\mathbf r)=G\iiint_{\mathrm{Earth}}
\frac{\rho(\mathbf r')}{\|\mathbf r-\mathbf r'\|}\,d^3r'.
$$

$\mathbf r'$ 为质量元的位置，分母是质量元到计算点的距离。球对称质量分布在球外严格等效于位于球心的质点，因此匀质球有 $U=\mu/r$；更一般的球对称分层也具有这一球外性质。真实地球的密度分布需要观测与模型描述，积分式便进一步改写成便于估计参数的展开。S6 第 10 页的“无法得到解析表达式”针对真实地球的实际质量分布；上一积分式本身就是一般性的理论表达。

<!-- source-figure: {"src": "/geodesy/figures/spherical-harmonics.svg", "alt": "带谐、扇谐和田谐的空间分区", "source": "本站绘制", "page": "示意图", "original": true} -->
![带谐、扇谐和田谐的空间分区](../assets/figures/spherical-harmonics.svg)

来源依据：S6 第12–14页，本站按二阶实球谐函数重绘。观察蓝、棕两色怎样沿纬向和经向分区：m=0 为带谐，m=n 为扇谐，0<m<n 为田谐。颜色仅表示基函数正负，不是地形或实际重力异常；原课件中的分类文字按正文定义核对。
<!-- /source-figure -->

## 球谐展开怎样记录质量分布

S6 第 11 页先用 $e^x$ 的幂级数演示“增加项数改善逼近”：

$$
e^x=\sum_{k=0}^{\infty}\frac{x^k}{k!}
=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots.
$$

例如 $x=1$，取前三项得到2.5，前五项得到2.70833，而 $e\approx2.71828$。不同项负责补充不同结构，截断后的误差也随使用位置变化。第 12–14 页把基函数展开的思路用于球谐函数。质量之外的空间满足拉普拉斯方程 $\nabla^2U=0$；以地心为展开原点，在包围全部质量的球之外，可以写成

$$
U(r,\varphi,\lambda)=\frac{\mu}{r}\left[
1+\sum_{n=2}^{\infty}\left(\frac ar\right)^n
\sum_{m=0}^{n}P_{nm}(\sin\varphi)
\left(C_{nm}\cos m\lambda+S_{nm}\sin m\lambda\right)
\right].
$$

这里 $r$ 是地心距离，$\varphi$ 为地心纬度，$\lambda$ 为经度，$a$ 为模型参考半径；$n$ 为次数（degree，也称度），$m$ 为阶数（order），满足 $0\le m\le n$。$P_{nm}$ 是缔合勒让德函数，$C_{nm},S_{nm}$ 为无量纲球谐系数。S6 用 $A_{n,m},B_{n,m}$ 记这两组系数，本页改用常见的 $C,S$ 便于辨认。

零度项给出总质量效应；以质心为原点时一度项为零，所以这里从 $n=2$ 开始。$n$ 越高通常对应越细的空间结构，且在远处受到 $(a/r)^n$ 更强的衰减。实际模型取有限的最大度阶，使用时必须使系数和勒让德函数的归一化方式相配。

| 类型 | 条件 | 在球面上的图像 |
| --- | --- | --- |
| 带谐项 | $m=0$ | 与经度无关，沿纬度形成带状变化 |
| 田谐项 | $0<m<n$ | 同时随经纬度变化，形成块状正负区域 |
| 扇谐项 | $m=n$ | 经向分成扇区；属于经度相关项的特殊情况 |

S6 第 13 页用不同球谐形状帮助认识低阶分量，模型中的正负起伏是基函数贡献的示意，不是地球被拉成那些形状。第 14 页所列 SAO-Ⅲ、WGS-84、EGM2008 表示不同模型或模型体系。讲义以“2159×2159”概括 EGM2008 主体阶次；现代资料补充：[ICGEM长期重力场模型目录](https://icgem.gfz.de/tom_longtime)与发布的EGM2008文件头将最高度列为2190。因此读取完整模型时，以文件头及实际系数范围为准，同时检查完全归一化和潮汐系统等约定。

## 简化模型保留了哪些项

球形模型保留 $\mu/r$，给出中心引力。几何半径用于界定球面位置，力的数值还需要 $\mu$；单有半径不能决定引力大小。

轴对称且赤道对称的质量模型与经度无关，保留偶数度的带谐项。以未归一化勒让德多项式记号写成

$$
U=\frac{\mu}{r}\left[1-\sum_{n=2,4,\ldots}
J_n\left(\frac ar\right)^nP_n(\sin\varphi)\right].
$$

$J_n$ 为带谐系数；在此未归一化约定下 $C_{n0}=-J_n$。主要扁率效应常用 $J_2$ 表示，其中 $P_2(x)=(3x^2-1)/2$。椭球几何和引力系数之间还需要质量分布假设，几何扁率本身并不能确定全部 $J_n$。

三轴模型允许经度相关项进入，最低阶的重要项包括描述赤道方向差异的二度二阶扇谐项。S6 第 17 页以二度截断表达三轴近似，并提到“通约卫星问题”：当卫星轨道周期与地球自转存在简单整数比时，经度相关引力项可能产生重复累积的效应。这里的作用是解释为何有时需要保留经度相关的非带谐项，二度截断属于模型选择，并非三轴质量体完整引力场的恒等式。

## 完整算例：高度对引力与高阶项有多大影响

给定教学常数 $\mu=3.986004418\times10^{14}\ \mathrm{m^3\,s^{-2}}$、$a=6378137\ \mathrm m$，取球形地球上空 $h=400000\ \mathrm m$ 的点。地心距离为

$$
r=a+h=6778137\ \mathrm m.
$$

点质量模型给出

$$
U=\frac\mu r\approx5.88068\times10^7\ \mathrm{m^2\,s^{-2}},
\qquad \|\mathbf a\|=\frac\mu{r^2}\approx8.67595\ \mathrm{m\,s^{-2}}.
$$

若位于赤道 $x$ 轴正向，则 $\mathbf a=(-8.67595,0,0)\ \mathrm{m\,s^{-2}}$。这里计算的是引力加速度，未加入离心项。

再给定 $J_2=1.08263\times10^{-3}$，只比较位函数的二度修正。在赤道 $\varphi=0$，$P_2(0)=-1/2$，所以相对于 $\mu/r$ 的位修正为

$$
\frac{\Delta U_2}{\mu/r}=
\frac12J_2\left(\frac ar\right)^2\approx4.79311\times10^{-4}.
$$

赤道的二度位修正约为 $0.04793\%$。这是一项位的相对修正，求加速度时还须对完整位函数求梯度，数值百分比随之改变。

## 自检

> [!info]- 1. 若U=+μ/r，为什么加速度仍然指向地心？
> 因为 $dU/dr=-\mu/r^2$，梯度沿径向负方向。写成向量就是 $\nabla U=-\mu\mathbf r/r^3$。


> [!info]- 2. 某项含cos(2λ)，它可能是带谐项吗？
> 它的阶为 $m=2$，随经度变化，属于非带谐项；若同时 $n=2$，则为扇谐项。


> [!info]- 3. 在r=2a处，同一四度项和二度项的径向衰减因子分别是多少？
> 相对于括号内对应表面因子，四度为 $(a/r)^4=1/16$，二度为 $1/4$。此外整个位函数还有共同的 $\mu/r$ 因子。


继续学习：[天球上的方向与视运动](geodesy-orbit-celestial-sphere.md)。返回[辅助专题目录](geodesy-orbit-supplement.md)。


---

文件：geodesy-orbit-earth-motion.md

---
title: 自转、公转、岁差、章动与极移
slug: geodesy-orbit-earth-motion
chapter: 7
order: 3
sources: [S6]
---

# 自转、公转、岁差、章动与极移

地球一边自转和公转，转轴相对天体背景的方向与相对地壳的位置也在变化。区分这些运动，最有效的方法是先指定观察参考：看天球上的轴向变化，还是看地球表面的极点变化。本页对应 S6 文件页 19、33–41，先读[天球的点与圈](geodesy-orbit-celestial-sphere.md)。

<!-- source-figure: {"src": "/geodesy/figures/earth-motion-reference.svg", "alt": "相对天球与相对地壳观察地轴", "source": "本站绘制", "page": "示意图", "original": true} -->
![相对天球与相对地壳观察地轴](../assets/figures/earth-motion-reference.svg)

左图将长期轴迹与叠加摆动分开，右图把观察参考换成地壳。两图都放大幅度，只用于区分岁差、章动和极移的观察参考，不作为实际轴迹预报。本站绘制。
<!-- /source-figure -->

## 先分清自转与公转

地球自转是地球绕自身轴的转动，造成天体周日视运动。公转是地球绕太阳的轨道运动，造成太阳相对恒星背景的周年位置变化。S6 第 19 页并列展示这两种运动。

一恒星日约为 $23^\mathrm h56^\mathrm m4^\mathrm s$，一平太阳日按小时记为24小时。两者不同，是因为一天内地球沿公转轨道前进了一小段；为让太阳再次经过同一子午圈，地球还要多转约一度。这里的约数用于理解几何关系，太阳时与恒星时的严格定义见[时间系统](geodesy-orbit-time-systems.md)。

<!-- source-figure: {"src": "/geodesy/figures/source-earth-spin.png", "alt": "地球自转方向", "source": "S6 轨道力学基础", "page": "19", "locator": "幻灯片 19"} -->
![地球自转方向](../assets/figures/source-earth-spin.png)

来源：S6，幻灯片19的内嵌原图。自转使天体出现周日视运动；图中23时56分4秒是恒星日的近似长度，平太阳日为24小时。将自转一圈与太阳再次过同一子午圈区分开。
<!-- /source-figure -->

<!-- source-figure: {"src": "/geodesy/figures/source-earth-orbit.png", "alt": "地球公转与太阳周年位置", "source": "S6 轨道力学基础", "page": "19", "locator": "幻灯片 19"} -->
![地球公转与太阳周年位置](../assets/figures/source-earth-orbit.png)

来源：S6，幻灯片19的内嵌原图。先识别太阳、近远日点和公转轨道，再对照正文的周年运动；轨道偏心与星体尺寸为示意比例。
<!-- /source-figure -->

## 太阳和月球为什么能改变轴的方向

赤道隆起使地球不是球对称刚体。太阳和月球对赤道隆起施加引力矩，使转动角动量的方向随时间变化，类似陀螺的进动。用最基本的角动量方程表示为

$$
\frac{d\mathbf L}{dt}=\boldsymbol\tau,
$$

$\mathbf L$ 是角动量，单位 $\mathrm{kg\,m^2\,s^{-1}}$；$\boldsymbol\tau$ 是力矩，单位 $\mathrm{N\,m}$。当力矩具有垂直于角动量的分量时，轴的指向发生转动。S6 第 34–35 页的日月作用和陀螺图用于说明这一点。

天球上缓慢、长期的轴向变化归入岁差，叠加其上的较短周期变化归入章动。精密理论还包括行星作用及黄道平面的长期变化；“北黄极固定”的示意图是便于观察轴迹的近似。

## 平天极、真天极与讲义的周期

S6 第 36–38 页用平天极表示去掉章动后的平滑轴向，用真天极表示加入章动后的轴向；对应地得到平/真赤道、平/真春分点。它们是随历元定义的几何对象，后面的坐标转换会逐项使用。

| 现象 | S6给出的教学近似 | 这些数值怎样使用 |
| --- | --- | --- |
| 岁差 | 周期约25800年，春分点每年西退约 $50.37''$ | 认识万年尺度的长期变化 |
| 章动 | 主要周期约18.6年，图中长半径约 $9.2''$ | 认识叠加在岁差上的周期摆动 |

这里的 $9.2''$ 描述天极轨迹示意中的角尺度，不能把它直接当作所有章动角分量的振幅。章动是多频率现象，18.6年主要与月球轨道交点运动有关；实际改正使用完整模型而非单一椭圆。岁差率也随定义、历元和模型变化。

<!-- source-figure: {"src": "/geodesy/figures/source-precession.png", "alt": "课件中的平天极岁差轨迹", "source": "S6 轨道力学基础", "page": "37", "locator": "幻灯片 37"} -->
![课件中的平天极岁差轨迹](../assets/figures/source-precession.png)

来源：S6，幻灯片37的内嵌原图。K 为北黄极，蓝圈表示北黄极近似固定时的平天极轨迹，ε 为黄赤交角。圈上的运动对应相对天球的长期轴向变化，不能把它当作地表极点轨迹。
<!-- /source-figure -->

## 极移看的是地球表面

把观察参考换成随地壳转动的地球框架，地球极的位置随时间移动，这种现象称极移。S6 第 39–40 页给出极点轨迹和不同时段的观测曲线。轨迹图上的微小角度对应地表的米级位移，绘图会放大角尺度。

极移含年周期成分与约14个月的自由摆动，即钱德勒摆动。S6 第 41 页用“1年、$0.1''$”和“432天、$0.2''$”表示典型量级。真实地球的弹性、海洋及大气等共同影响周期和振幅；钱德勒自由模态会衰减，也会被质量运动和角动量交换重新激发。把“内部/外部因素”理解为讲义对自由与受迫成分的分类，有助于衔接真实地球的耦合行为。

岁差、章动与极移可以用同一根轴来想象，但它们分别记录该轴相对天球与相对地球的变化。现代定义补充：IERS使用天球中间极（CIP）及约定的频率划分组织天极运动和极移，CIP是精密转换中的约定中间极，不能在每个细节上等同于瞬时角速度轴。定义与转换关系见[IERS Conventions第5章](https://iers-conventions.obspm.fr/content/chapter5/icc5.pdf)。

<!-- source-figure: {"src": "/geodesy/figures/source-polar-motion-2001-2005.png", "alt": "2001–2005年的历史极移轨迹", "source": "S6 轨道力学基础", "page": "40", "locator": "幻灯片 40"} -->
![2001–2005年的历史极移轨迹](../assets/figures/source-polar-motion-2001-2005.png)

来源：S6，幻灯片40的内嵌原图，保留原坐标轴和年份。图中两轴坐标单位为米，颜色区分2001–2005年；先看年际轨迹，再与正文角秒换米的量级比较。这是历史观测图。
<!-- /source-figure -->

## 完整算例：0.2角秒在地表有多远

取球形近似半径 $R=6371000\ \mathrm m$，给定极移角量级 $p=0.2''$。由于

$$
1''=\frac{\pi}{180\times3600}\ \mathrm{rad},
\qquad p\approx9.69627\times10^{-7}\ \mathrm{rad},
$$

极点附近相应弧长近似为

$$
s=Rp\approx6.1775\ \mathrm m.
$$

若年周期角振幅取 $0.1''$，则地表量级约为 $3.0887\ \mathrm m$。这里把一个角幅度换成球面弧长，用来认识轨迹的尺寸；某个测站坐标受到多大分量影响，还取决于测站位置和极移方向。

再按讲义 $50.37''/\mathrm{年}$ 的固定岁差率估算20年：

$$
\Delta\psi\approx20\times50.37''=1007.4''=0.279833^\circ.
$$

这个值表现的是参考方向累积变化的角量级。它不是任意恒星赤经或任意测站经度的共同改变量；完整坐标改正要通过旋转矩阵计算。

## 自检

> [!info]- 1. 一条图线表示地极在随地壳框架中的x、y坐标变化，它描绘哪种运动？
> 极移。若图线是在天球上围绕黄极附近绘制长期轴向轨迹，才是在展示岁差和章动。


> [!info]- 2. 为什么不能用18.6年一个正弦函数代替所有章动？
> 18.6年是主要周期之一。日月引力和地球响应产生多种周期项，完整模型还分别描述不同角分量及其相位。


> [!info]- 3. 若极移角量级为0.3角秒，用上述半径估算地表弧长。
> $s=6371000\times0.3\pi/(180\times3600)\approx9.2662\ \mathrm m$。


继续学习：[时间系统与时刻换算](geodesy-orbit-time-systems.md)。返回[辅助专题目录](geodesy-orbit-supplement.md)。
