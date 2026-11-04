---
title: "椭球上的局部方向"
prev: {"text":"旋转椭球与三种纬度","link":"/geodesy-ellipsoid-coordinates"}
next: {"text":"曲线曲率与子午曲率半径","link":"/geodesy-curvature"}
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-local-directions.md; edit the Obsidian source. -->

# 椭球上的局部方向

从经纬度求导得到东、北、上三个单位方向，再把空间坐标差投影到测站标尺。需要点积、叉积和上一页的椭球参数表达。


<!-- earth-reading-task -->
P的位置已经有了。现在让它只增加一个很小纬度、再只增加一个很小经度，观察位移朝向和长度。本页交付的是P自己的局部标尺；最后才沿法线把P抬到实际测站高度。
<!-- /earth-reading-task -->

上一专题给出了点的位置。现在固定经度改变纬度，或者固定纬度改变经度，观察点朝哪个方向移动，就能从同一参数化得到南北、东西和法向。局部方向既支撑后续曲率计算，也说明椭球高应该沿什么方向增加。

推导对应椭球讲义文件页 18–24，数学工具见[一般曲面与第一基本形式](geodesy-math.html#first-fundamental-form)和向量公式表。先在 $|B|<\pi/2$ 讨论，经度在极点的参数退化随后说明。

## 先构造方向，再使用方向余弦 {#local-basis-construction}

令全球地轴单位向量为 $\mathbf k=(0,0,1)^T$。大地纬度直接规定上向 $\mathbf e_U=(\cos B\cos L,\cos B\sin L,\sin B)^T$。非极点处，$\mathbf k\times\mathbf e_U$ 沿纬圈切线，指向经度增加的一侧，归一化即得东向：

$$
\mathbf e_E=\frac{\mathbf k\times\mathbf e_U}{\|\mathbf k\times\mathbf e_U\|}
=(-\sin L,\cos L,0)^T.
$$

再取 $\mathbf e_N=\mathbf e_U\times\mathbf e_E$，使东叉北等于上。这样先由几何建立三个单位方向，下面的偏导证明再给出同样的方向及其长度标尺。极点处叉积为零，应先选参考经线，不能直接除以零向量的模。

<SourceFigure src="/geodesy/figures/local-basis.svg" alt="从法线构造东、北、上三个单位方向" source="本站绘制" page="示意图" original>

蓝箭头沿椭球法线，橙箭头沿纬圈，绿箭头由叉乘确定。先看三根单位方向，再把它们与下面偏导中的括号向量比较；偏导前的系数负责长度。本站按坐标雅可比的归一化列绘制。

</SourceFigure>

## 求偏导得到两个切向量 {#local-tangents}
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

## 从局部方向得到长度规则 {#local-metric}
已经证明 $\mathbf r_B=M\mathbf e_N$、$\mathbf r_L=N\cos B\mathbf e_E$，且两个单位切向正交。代入前面定义的第一基本形式，便有

$$
E=M^2,\qquad F=0,\qquad G=N^2\cos^2B,
\qquad ds^2=M^2dB^2+N^2\cos^2B\,dL^2.
$$

这时M和N仍是从坐标求导产生的长度系数。接下来的曲率推导将说明，它们为什么恰好也是两个法截线的曲率半径。在此之前，已有的长度规则已经能把纬度、经度的参数变化换成真正的切向长度。

## 沿法线增加椭球高 {#ellipsoid-height}
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

![椭球坐标转换](/geodesy/figures/lab-blh-xyz.svg)

先看子午面上的法线与地心向径，再看赤道面的经度投影；增加 h 时点沿同一法线移动。本站按正算模型绘制。

<GeodesyLab mode="ellipsoid" />

演示使用 WGS84 几何参数 $a=6378137$ m、$1/f=298.257223563$。讲义的 1980 年坐标系参数不同，正式计算应选任务规定的椭球与框架。交互中的地心纬度由实际空间坐标求得，所以高度不为零时也不会误用椭球面纬度关系。

这里的直角坐标原点是所采用的椭球中心。只有椭球与地心地固框架相容定义时，才能直接按相应 ECEF 坐标理解；椭球法线也不能自动代替真实铅垂方向。

<LearningMark section="ge-local" />

## 跟算与理解检查

### 完整例题：赤道测站的局部坐标

测站位于 $B=0,L=0$，其东、北、上方向分别是地心坐标系的 $+Y,+Z,+X$。给定目标减测站的坐标差 $\Delta\mathbf r=(10,20,30)^T$ m，得到

$$
(E,N,U)^T=(20,30,10)^T\,\mathrm m.
$$

矩阵投影与按轴读数一致。三维距离为 $\sqrt{20^2+30^2+10^2}=37.416574$ m，与原坐标差的模相同。局部水平距离为 $\sqrt{20^2+30^2}=36.055513$ m；两者对应不同几何长度。

**自测1：若把目标的地心位置 XYZ 直接乘 ENU 矩阵，会得到目标相对测站的位置吗？**

<details><summary>展开解析</summary>

先用目标减测站，构造坐标差，再旋转；旋转本身只改变方向基，不完成原点平移。

</details>

**自测2：在 B=0、L=0 处，沿上向增加1 m，XYZ怎样变？**

<details><summary>展开解析</summary>

X 增加1 m，Y、Z不变，因为该处椭球外法线沿 +X。

</details>
