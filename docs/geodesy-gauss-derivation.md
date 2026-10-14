---
title: 高斯平均引数的推导
prev: {"text":"球面角超与三角形解算","link":"/geodesy-spherical-triangles"}
next: {"text":"大地主题正算与反算","link":"/geodesy-gauss-solution"}
---

# 高斯平均引数的推导

## 正算与反算是同一条曲线的两种提问

**大地主题正算**已知起点 $(B_1,L_1)$、起点前进方位角 $A_{12}$ 和大地线长度 $S$，求终点 $(B_2,L_2)$ 与反方位角 $A_{21}$。**反算**已知两个端点，求 $S,A_{12},A_{21}$。两者都采用指定参考椭球；若输入仍是地面观测，应先完成上一专题的归算。

S8 文件页17把距离约分为短距离 $S\le120\,\mathrm{km}$、中距离 $120<S\le400\,\mathrm{km}$、长距离 $S>400\,\mathrm{km}$（端点归属在此采用不重叠约定），这是课程的传统方法分类。讲义实际推导的高斯平均引数公式给出约200km以内的教学适用范围，不能把分类中“中距离400km”直接当作该截断公式的精度保证。长距离贝塞尔公式仅被提及；完整解法可参考 [GeographicLib 大地线文档](https://geographiclib.sourceforge.io/html/python/geodesics.html)。

## 从起点展开：每一阶导数怎样获得

令 $A_2^+$ 为到终点后仍沿原曲线前进的切线方位角，反方位角为 $(A_2^++\pi)\bmod2\pi$。在连续展开的角分支上定义

$$
\Delta B=B_2-B_1,\qquad \Delta L=L_2-L_1,\qquad \Delta A=A_2^+-A_{12}.
$$

角度先展开成连续值，再求差或平均，不能把359°与1°直接平均成180°。对任一 $q\in\{B,L,A\}$，起点 Taylor 级数为

$$
\Delta q=S q'_1+\frac{S^2}{2}q''_1+\frac{S^3}{6}q'''_1+\cdots.
$$

大地线微分方程定义 $f_B=\cos A/M$、$f_L=\sin A/(N\cos B)$、$f_A=\tan B\sin A/N$，则 $q'=f_q$。这些函数不显含经度，因此沿程求导算子为

$$
\mathcal D=f_B\frac\partial{\partial B}+f_A\frac\partial{\partial A}.
$$

例如 $B''=\mathcal D f_B=(\partial_Bf_B)B'+(\partial_Af_B)A'$，再求一次得 $B'''=\mathcal D^2f_B$。这就是课件复合函数求导的系统表达；$L,A$ 的高阶导数同样获得，不必另引入猜测公式。

## 为什么弧长中点展开更简洁

令弧长中点位于 $s=0$，两端位于 $\pm S/2$，其坐标记为 $q_M$。分别展开两端：

$$
q_2=q_M+\frac S2q'_M+\frac{S^2}{8}q''_M+\frac{S^3}{48}q'''_M+\cdots,
$$
$$
q_1=q_M-\frac S2q'_M+\frac{S^2}{8}q''_M-\frac{S^3}{48}q'''_M+\cdots.
$$

相减时偶次项抵消，相加时奇次项抵消：

$$
\Delta q=S q'_M+\frac{S^3}{24}q'''_M+O(S^5),\qquad
q_m=\frac{q_1+q_2}2=q_M+\frac{S^2}{8}q''_M+O(S^4).
$$

因此**弧长中点的坐标 $q_M$ 通常不等于端点坐标的算术平均 $q_m$**。高斯“平均引数”使用后者，必须处理二者差异。$O(S^k)$ 的系数包含相应的曲率半径倒数；在固定、光滑、远离极点的坐标域里理解该阶次，不意味着以米代入后能直接读出误差。

<SourceFigure src="geodesy/figures/S8-gauss-midpoint.png" alt="以弧长中点对称展开两端" source="S8 大地坐标计算讲义" page="20" printed="16" note="图中M为曲线中点；公式中的下标M与曲率半径M不是同一含义。" />

## 把中点引数换成端点均值

对函数 $f_q(B,A)$ 在 $(B_m,A_m)$ 附近展开，利用刚得到的中点差：

$$
f_q(B_M,A_M)=f_q(B_m,A_m)
-\frac{S^2}{8}\left[\partial_Bf_q\,B''_m+\partial_Af_q\,A''_m\right]+O(S^4).
$$

代入端点差公式，得到三组高斯公式的共同来源：

$$
\Delta q=S f_{q,m}
+\frac{S^3}{24}\left[\mathcal D^2f_q
-3(\partial_Bf_q\,\mathcal Df_B+\partial_Af_q\,\mathcal Df_A)\right]_m+O(S^5).
$$

这里 $1/24$ 来自两端三次项之差，$-3/24=-1/8$ 来自中点到端点均值的改正。若漏掉后者，三次项就会变成另一套系数；这是只照抄微分方程最容易遗漏的一步。

为了整理代数，定义 $t=\tan B$、$u=e'^2\cos^2B$、$V^2=1+u=N/M$。有

$$
\frac{dt}{dB}=1+t^2,\quad \frac{du}{dB}=-2tu,\quad
\frac{dN}{dB}=\frac{Ntu}{1+u},
$$
$$
\partial_Bf_B=-\frac{3tu\cos A}{N},\qquad
\partial_Af_B=-\frac{(1+u)\sin A}{N}.
$$

这些关系完全来自定义，可复算三组系数。这里用 $u$ 替代课件的 $\eta_m^2$，用 $\Delta A$ 替代课件表示方位角差的 $a$，避免与椭球长半轴、三角形边长及垂线偏差混用。下一页给出整理后的完整公式和正反算步骤。

[原文定位：S8 文件页17–23](geodesy-source-s8.html)。

网页为串联原讲义补写了中间推导、符号约定与边界说明；完整原文和批注仍以所列文件页为准。

<LearningMark section="ge-gauss-derivation" />
