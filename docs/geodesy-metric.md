---
prev: /geodesy-normal-curvature
next: false
---

# 曲面度量 弧长与面积

参数差本身不等于距离。一个经度差在赤道和高纬度对应的长度不同，而一个纬度差也会受子午曲率半径影响。第一基本形式把这些变化统一成一个局部长度规则，面积则由同样的切向量求出。

本专题依据椭球讲义文件页 51–56。弧长级数给出可检查的有限阶展开，精确积分与数值反算作为核验依据；不把局部近似当成任意长距离的完整算法。

## 一般曲面的局部长度规则 {#first-fundamental-form}

由 $d\mathbf x=\mathbf x_u\,du+\mathbf x_v\,dv$ 与点积，直接得到

$$
ds^2=d\mathbf x\cdot d\mathbf x
=E\,du^2+2F\,du\,dv+G\,dv^2,
$$

其中 $E=\mathbf x_u\cdot\mathbf x_u$、
$F=\mathbf x_u\cdot\mathbf x_v$、
$G=\mathbf x_v\cdot\mathbf x_v$。这就是第一基本形式。对平面 $\mathbf x(u,v)=(u,v,0)$，E=G=1、F=0，退化为平面勾股关系。

沿面上一条参数曲线 $u(t),v(t)$，弧长为
$\int\sqrt{E(u')^2+2Fu'v'+G(v')^2}\,dt$。一般曲面参数轴可能不正交，所以交叉项不能省略。

微小参数矩形对应由两个切向位移张成的平行四边形，面积为
$\|\mathbf x_u\times\mathbf x_v\|\,du\,dv$。叉积恒等式给出

$$
\|\mathbf x_u\times\mathbf x_v\|^2
=\|\mathbf x_u\|^2\|\mathbf x_v\|^2
-(\mathbf x_u\cdot\mathbf x_v)^2
=EG-F^2,
$$

所以 $dS=\sqrt{EG-F^2}\,du\,dv$。正则性要求 $EG-F^2>0$，与独立切向量的条件一致。

## 椭球经纬参数下的度量

代入 $\mathbf r_B=M\mathbf e_N$、
$\mathbf r_L=N\cos B\,\mathbf e_E$，由于单位切向正交，

$$
E=M^2,\quad F=0,\quad G=N^2\cos^2B.
$$

因此

$$
\boxed{ds^2=M^2dB^2+N^2\cos^2B\,dL^2},
\qquad
\boxed{dS=MN\cos B\,dB\,dL}.
$$

<SourceFigure src="/geodesy/figures/area-element.png" alt="经纬格网微元的两边与面积" source="1椭球面数学性质   课程讲义.pdf" page="56" printed="43" />

图中两边分别是 $M\,dB$ 与 $N\cos B\,dL$。这说明小区域可以近似把经纬网看成正交矩形，但长距离需要沿途积分变化的系数。极点经纬参数退化，面元表达按极限积分仍有意义，却不能将该处的两条参数向量当成独立基。

## 子午弧长的积分与级数

固定经度时 $dL=0$，有向子午弧长为

$$
S(B_1,B_2)=\int_{B_1}^{B_2}M(B)\,dB
=a(1-e^2)\int_{B_1}^{B_2}
(1-e^2\sin^2B)^{-3/2}\,dB.
$$

若需要无向长度取绝对值。定义从赤道起算的有向弧长 $s(B)=S(0,B)$，则 $S(B_1,B_2)=s(B_2)-s(B_1)$。

令 $q=e^2$。用二项式展开
$(1-x)^{-3/2}=1+\frac32x+\frac{15}8x^2+\frac{35}{16}x^3+O(x^4)$，再代 $x=q\sin^2B$。为逐项积分，使用

$$
\begin{aligned}
\sin^2B&=(1-\cos2B)/2,\\
\sin^4B&=(3-4\cos2B+\cos4B)/8,\\
\sin^6B&=(10-15\cos2B+6\cos4B-\cos6B)/32.
\end{aligned}
$$

它们来自 $\sin^2B=(1-\cos2B)/2$ 的平方、立方与积化和差。积分 $\cos(2kB)$ 时得到 $\sin(2kB)/(2k)$，于是

$$
s(B)=a(1-q)
\left[A_0B-A_2\sin2B+A_4\sin4B-A_6\sin6B\right]
+O(aq^4),
$$

其中

$$
\begin{aligned}
A_0&=1+\frac34q+\frac{45}{64}q^2+\frac{175}{256}q^3,\\
A_2&=\frac38q+\frac{15}{32}q^2+\frac{525}{1024}q^3,\\
A_4&=\frac{15}{256}q^2+\frac{105}{1024}q^3,\\
A_6&=\frac{35}{3072}q^3.
\end{aligned}
$$

这是到 $e^6$ 的展开，并非原讲义高阶系数表的全部内容。$O(aq^4)$ 表示固定有界纬度区间上的截断量级，不等同于毫米精度保证。要达到给定误差，应增加阶数或使用带误差控制的数值积分，再检查结果。

对较小纬差，取中纬度 $B_m=(B_1+B_2)/2$、
$\Delta B=B_2-B_1$。把 $M(B_m+x)$ 作 Taylor 展开，在对称区间积分时奇次项消失：

$$
S=M(B_m)\Delta B+
\frac{M''(B_m)}{24}(\Delta B)^3+O((\Delta B)^5).
$$

这解释了讲义中用中点值加三次修正项的近似公式，而不是只背下系数 $1/24$。该近似的误差依赖纬差与高阶导数，不能只凭一个距离阈值作无条件保证。

## 子午弧长反算怎样收敛

若已知从赤道起的有向弧长 $s_*$，求 B 等价于解 $F(B)=s(B)-s_*=0$。由微积分基本定理，$F'(B)=M(B)>0$，所以在 $[-\pi/2,\pi/2]$ 的有效弧长范围内解唯一。

在迭代点 $B_k$ 附近用切线近似 F，令下一点的近似值为零：

$$
0\approx F(B_k)+M(B_k)(B_{k+1}-B_k),
$$

得到 Newton 迭代

$$
\boxed{B_{k+1}=B_k+\frac{s_*-s(B_k)}{M(B_k)}}.
$$

初值可取 $B_0=s_*/a$。实际实现先检查弧长不超过极点弧长，用正负极点作区间；若 Newton 步越出区间，就使用二分步，并更新包含根的区间。停止时检查弧长残差及纬度变化，并设置迭代次数上限。

正算积分与导数必须相容。如果正算用截断级数，却把残差收敛到极小值，只能说明该近似函数被解得很准，不能说明其对应精确积分也有同样精度。本站核验用数值积分正算回验反算。

## 平行圈弧长与经纬格网面积

固定纬度时 $dB=0$，$N\cos B$ 不随经度变化，因此沿选定平行圈路径的长度为

$$
S_{\parallel}=N\cos B\,|L_2-L_1|.
$$

经差必须与选定路径一致，例如跨越 $\pm180^\circ$ 时需先展开角度。每度经差对应 $N\cos B\,\pi/180$，而每度纬差的局部导数为 $M\pi/180$。后一项不是整整一度区间的精确子午积分。

将面积元在 $B_1\le B\le B_2$、展开后的 $L_1\le L\le L_2$ 上积分，得到

$$
S_D=a^2(1-e^2)(L_2-L_1)
\int_{B_1}^{B_2}
\frac{\cos B}{(1-e^2\sin^2B)^2}\,dB.
$$

令 $z=\sin B$、$dz=\cos B\,dB$，积分成为 $\int dz/(1-e^2z^2)^2$。通过对有理项与反双曲正切求导可以验证，当 $0<e<1$ 时原函数是

$$
I(z)=\frac{z}{2(1-e^2z^2)}
+\frac{\operatorname{artanh}(ez)}{2e}.
$$

因此区域面积为
$a^2(1-e^2)(L_2-L_1)[I(\sin B_2)-I(\sin B_1)]$。也可把 $(1-qz^2)^{-2}$ 展为 $1+2qz^2+3q^2z^4+4q^3z^6+\cdots$，积分后得到讲义中的
$z+\frac{2q}{3}z^3+\frac{3q^2}{5}z^5+\frac{4q^3}{7}z^7+\cdots$。

取全经度与南北极，精确表达给出旋转扁椭球面积

$$
S_{\mathrm{all}}=
2\pi a^2\left[1+\frac{1-e^2}{e}\operatorname{artanh}e\right].
$$

球面极限 $\operatorname{artanh}e/e\to1$，于是总面积趋于 $4\pi a^2$。WGS84 几何参数下总面积约为 $5.100656\times10^{14}\ \mathrm{m^2}$，即约 $5.100656$ 亿平方公里，与讲义给出的数量级一致。面积元、区域积分和球面极限至此都由同一组切向量连接起来。

<LearningMark section="ge-metric" />
