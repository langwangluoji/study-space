---
title: "站心坐标：从空间基线到方位角与高度角"
prev: {"text":"坐标旋转：方向余弦、顺序与小角近似","link":"/geodesy-frame-rotation"}
next: {"text":"Bursa–Wolf：平移、旋转与尺度的七参数模型","link":"/geodesy-seven-parameters"}
---

<!-- Generated from knowledge/geodesy/lessons/geodesy-local-polar.md; edit the Obsidian source. -->

# 站心坐标：从空间基线到方位角与高度角

卫星坐标描述它在全球框架中的位置，测站需要的是“从我这里朝哪个方向看”。两者之间先相减构造视线，再投影到测站自己的东、北、上。本页对应 S11 第12–21页。


<AnatomyFigure src="/geodesy/interactive/local-polar.html" title="从空间基线到测站水平与竖直分量" :height="1100" poster="/geodesy/figures/lab-local-polar.svg" />

[离线打开交互图](/geodesy/interactive/local-polar.html)

## 从位置差到局部投影

测站为 $\mathbf r_0$，目标为 $\mathbf r_1$，先取

$$
\Delta\mathbf r=\mathbf r_1-\mathbf r_0.
$$

两点坐标使用同一框架和相容历元。测站大地经纬度为 $B_0,L_0$，当地东、北、上三个方向分别为

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

$N_{\rm loc}$ 表示北向长度，与曲率半径 N 区分。矩阵每一行的点积就是对应方向上的投影。

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

<details><summary>按课件分解：反射与两次轴旋转</summary>

使用[上一页的被动旋转矩阵](geodesy-frame-rotation.html)，有

$$
Q_{NEU}=R_z(-L_0)R_y(90^\circ+B_0)
\operatorname{diag}(1,1,-1).
$$

最右侧先把上向反成下向，再绕 y 轴转 $90^\circ+B_0$，最后绕 z 轴转 $-L_0$。相乘可得上面的 $Q_{NEU}$。这给出原材料所要求的“经过哪几步旋转和平移”：先做方向变换，最后加上测站位置 $\mathbf r_0$。

更直接的推导是将目标差向量写为 $\Delta\mathbf r=x\mathbf e_N+y\mathbf e_E+z\mathbf e_U$，分别点乘三个单位向量。它与旋转分解得到相同矩阵，且容易检查行、列各自的含义。

</details>


## 极坐标：距离、方位角、天顶距

定义空间距离 D、从北顺时针向东量取的方位角 A、从上向量起的天顶距 $z_d$。这里用 $z_d$ 区分天顶距与直角分量 z，也与全球 Z 轴区分。课件第16–17页给出

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

## 旋转向量为什么比普通向量多一个符号

S11 第18页讨论全球小旋转 $\boldsymbol\varepsilon$ 与局部小旋转 $\boldsymbol\omega$。在右手 ENU 中，旋转向量按普通方向变换：

$$
\boldsymbol\varepsilon=Q_{ENU}\boldsymbol\omega_{ENU}.
$$

旋转向量是轴向量（伪向量）。若局部采用左手 NEU，且仍按统一的代数叉乘矩阵定义旋转参数，便有

$$
\boxed{\boldsymbol\varepsilon=-Q_{NEU}\boldsymbol\omega_{NEU}.}
$$

这正是课件第18页矩阵的符号。若只是在记录同一物理旋转轴沿北、东、上的普通投影，则分量随轴顺序交换即可；此处的负号对应课件小旋转生成矩阵参数的定义，两种记号须明确区分。

<details><summary>推导伪向量变换，并计算一个例子</summary>

对于任意正交阵 Q，有

$$
Q[\boldsymbol\omega]_\times Q^T
=\det(Q)[Q\boldsymbol\omega]_\times.
$$

将局部小旋转 $I-[\boldsymbol\omega]_\times$ 转到全球坐标：

$$
Q(I-[\boldsymbol\omega]_\times)Q^T
=I-[\det(Q)Q\boldsymbol\omega]_\times.
$$

与 $I-[\boldsymbol\varepsilon]_\times$ 比较可得结论。NEU 的行列式为 -1，展开 $-Q_{NEU}$ 就是原课件矩阵。

在本页测站取 NEU 代数旋转参数 $(1'',2'',3'')^T$，由此得到全球参数

$$
\boldsymbol\varepsilon=(2.769790807'',\ -0.690040330'',\ -2.419112074'')^T.
$$

把两边分别放入上面的叉乘矩阵恒等式，可独立检核符号。

</details>


课件第19页将局部倾斜与垂线偏差联系：其约定下 $\omega_x=-\eta,\omega_y=\xi$，$\omega_z$ 为方位起始方向的旋转。实际仪器以重力垂线定竖直，本页的上向以椭球法线定义，二者之间的转换需要垂线偏差改正。法线、地心径向和实际垂线各有明确用途。

## 自检

1. 为什么先减测站位置，再乘局部矩阵？直接乘目标的地心坐标会得到什么？
2. 目标的 $(x,y,z)=(-100,100,0)$ m 时，A 与高度角是多少？
3. 将 NEU 普通位置向量投影到 XYZ，要用 Q 还是 −Q？旋转生成参数呢？

<details><summary>展开答案</summary>

1. 局部坐标原点在测站。直接乘全球位置只改变分量基底，仍表达从全球原点出发的向量。
2. $A=135^\circ,\alpha=0^\circ$，位于东南方向的地平面。
3. 位置向量用 $Q_{NEU}$；按本页叉乘生成矩阵定义的旋转伪向量用 $-Q_{NEU}$。若使用右手 ENU，两者均按相应 Q 正常转换。

</details>


继续：[Bursa–Wolf 七参数](geodesy-seven-parameters.html) · 返回[第六章](geodesy-frame-transformations.html)。
