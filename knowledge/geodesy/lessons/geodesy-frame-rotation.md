---
title: "坐标旋转：方向余弦、顺序与小角近似"
slug: geodesy-frame-rotation
chapter: 6
order: 1
sources: [S4, S11]
---

# 坐标旋转：方向余弦、顺序与小角近似

旋转公式的符号由两个问题决定：旋转的是向量还是坐标轴？输出是哪套基底下的分量？把这两件事写清，公式就能用一个90°算例检验。本页对应 S11 第2–11页，以及旋转 DOCX 中的基向量证明和内嵌图页10–18。

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

S11 第3–5页采用交线轴组织 Z–X–Z 欧拉分解，第6–8页给出 X–Y–Z 的逐步旋转。它们都通过三个角描述一个一般空间姿态，但各步角度的定义不同。第4页的交线分解具体写为

$$
R=R_z(-\varepsilon_{z2})R_x(\varepsilon_x)R_z(\varepsilon_{z1}).
$$

相应同名轴夹角满足

$$
\begin{aligned}
\cos\alpha&=\cos\varepsilon_{z1}\cos\varepsilon_{z2}
+\sin\varepsilon_{z1}\sin\varepsilon_{z2}\cos\varepsilon_x,\\
\cos\beta&=\sin\varepsilon_{z1}\sin\varepsilon_{z2}
+\cos\varepsilon_{z1}\cos\varepsilon_{z2}\cos\varepsilon_x,\\
\cos\gamma&=\cos\varepsilon_x.
\end{aligned}
$$

对于依次施加的列向量分量转换

$$
\mathbf v_3=R_3R_2R_1\mathbf v_0,
$$

最右侧 $R_1$ 先作用。还需说明每一步围绕固定轴还是已经转动的轴；改变这一约定后，即使轴字母相同，连乘解释也会变化。

例如采用 $R=R_z(\varepsilon_z)R_y(\varepsilon_y)R_x(\varepsilon_x)$ 时，三对同名轴夹角 $\alpha,\beta,\gamma$ 的余弦等于 R 的三个对角元素：

$$
\begin{aligned}
\cos\alpha&=\cos\varepsilon_y\cos\varepsilon_z,\\
\cos\beta&=\cos\varepsilon_x\cos\varepsilon_z+
\sin\varepsilon_x\sin\varepsilon_y\sin\varepsilon_z,\\
\cos\gamma&=\cos\varepsilon_x\cos\varepsilon_y.
\end{aligned}
$$

所以“某轴与新同名轴的夹角”通常不是某一个欧拉角。对于讲义的另一种 Z–X–Z 分解，倾斜的两根 Z 轴夹角对应中间 X 旋转的绝对大小，两根 X 或 Y 轴的夹角则还依赖两次 Z 旋转。

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
