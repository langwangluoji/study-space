---
prev: {"text": "位置表达与坐标框架", "link": "/geodesy-intro-frames"}
next: {"text": "椭球上的局部方向", "link": "/geodesy-local-directions"}
---

# 坐标轴与坐标分量旋转

这份辅助说明放在主章之外，专门解释方向余弦矩阵的变换方向。依据坐标旋转 DOCX 的基向量证明与附图，以及轨道课件第 66–70 页。主章已经从同一向量的两种表达推导矩阵，这里用一个正角检验符号。

## 基向量与方向余弦矩阵 {#g4-dcm}

将 P、Q 两组基在公共空间中排成列矩阵 $E_P,E_Q$，同一个向量满足 $\mathbf v=E_P\mathbf v_P=E_Q\mathbf v_Q$。左乘 $E_P^T$ 得

$$
\mathbf v_P=C_{P\leftarrow Q}\mathbf v_Q,\qquad
C_{P\leftarrow Q}=E_P^TE_Q.
$$

每个元素 $C_{ij}=\mathbf p_i\cdot\mathbf q_j$，第 j 列就是 Q 第 j 根轴在 P 中的坐标。右手正交基使 $C^TC=I,\det C=1$，所以逆变换是转置。连乘时
$C_{P\leftarrow R}=C_{P\leftarrow Q}C_{Q\leftarrow R}$，最右侧先作用。

## 一个正角对应两种几何问题 {#g4-active-passive}

固定坐标轴，将向量绕 z 轴按右手规则旋转 $\theta$，主动矩阵为

$$
R_z(\theta)=
\begin{pmatrix}
\cos\theta&-\sin\theta&0\\
\sin\theta&\cos\theta&0\\
0&0&1
\end{pmatrix}.
$$

若向量不动，而轴转过同一个正角，分量使用
$R_z(-\theta)=R_z(\theta)^T$。原文附图中的 $C_z$ 对应这一被动约定。不是公式互相矛盾，而是“旋转什么”的定义不同。

$\theta=90^\circ$ 时，主动旋转把 $(1,0,0)$ 变为 $(0,1,0)$；轴转动后，同一个固定向量的分量变为 $(0,-1,0)$。下面将两组数值画在公共数值轴上比较，被动图不意味着几何向量真的反向转动。

<GeodesyLab mode="rotation" />

## 地心坐标差到测站基 {#g4-enu}

测站东、北、上三个轴是椭球面的局部正交基。它们在地心直角系的分量排成转换矩阵的行，就能把坐标差投影到局部方向。完整求导和矩阵见[椭球上的局部方向](geodesy-local-directions.html)。

先减去测站坐标，再作旋转；椭球外法线给出的上向与真实铅垂上向通常不同。完整位置转换还可能包含原点平移和框架定义，不能仅用一个旋转矩阵代表所有转换。

<LearningMark section="ge-rotation" />
