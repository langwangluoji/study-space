---
prev: {"text": "曲线 曲面与坐标表达", "link": "/geodesy-math"}
next: {"text": "椭球上的局部方向", "link": "/geodesy-local-directions"}
---

# 旋转椭球与三种纬度

把椭圆绕短轴旋转，每个固定高度的点就形成一个平行圈。旋转角决定经度，但描述子午椭圆上的点还可以选用不同角度。归化纬度、大地纬度和地心纬度正是三种不同几何定义，本专题将分别建立坐标表达，再推导它们之间的关系。

对应椭球讲义文件页 5–17、25–31。先在椭球面上讨论，即高度 $h=0$；有高度的坐标在下一专题沿法线扩展。

## 从椭圆旋转得到椭球

设 $a\ge b>0$。起始子午面上的椭圆满足 $p^2/a^2+Z^2/b^2=1$，其中 $p$ 是到旋转轴的距离。绕 Z 轴转过经度 $L$ 后，$X=p\cos L,Y=p\sin L$，所以 $p^2=X^2+Y^2$，得到

$$
\frac{X^2+Y^2}{a^2}+\frac{Z^2}{b^2}=1.
$$

固定 $L$ 得到子午线，固定 $Z$ 得到平行圈。扁率 $f=(a-b)/a$ 意味着 $b=a(1-f)$，由此

$$
e^2=\frac{a^2-b^2}{a^2}
=1-(1-f)^2=2f-f^2,\qquad
e'^2=\frac{a^2-b^2}{b^2}
=\frac{e^2}{1-e^2}.
$$

反过来 $e^2=e'^2/(1+e'^2)$，$b=a\sqrt{1-e^2}$。线性偏心距 $\mathcal E=\sqrt{a^2-b^2}=ae$ 有长度单位，而偏心率 $e$ 无量纲。$a=b$ 时 $f=e=0$，椭球成为球面，这是所有后续表达都应满足的极限。

椭球方程只含坐标平方，所以关于三个坐标面反射后形状不变，并绕 Z 轴旋转对称。方程还给出 $X^2+Y^2\le a^2$、$Z^2\le b^2$，因此曲面有界。梯度 $2(X/a^2,Y/a^2,Z/b^2)$ 只有在原点才可能为零，而原点不在椭球面上，故曲面处处光滑正则。极点的经纬参数退化不意味着曲面不正则。后续将得到高斯曲率 $K=(1/M)(1/N)>0$。依据高斯曲率在局部等距变换下不变的定理，它不能无伸缩地展到K=0的平面；这是对内蕴定理的引用，本章不展开该定理的完整证明。

## 三种角度怎样定义 {#latitude-relations}

先只考虑椭球面上的点，即 **$h=0$**。取某一固定经度的子午面，三维旋转椭球与这个平面的交线是一个椭圆。设这个椭圆上的同一点为 $P$，它到旋转轴的距离记为 $p\ge 0$，沿旋转轴方向的坐标记为 $Z$。子午椭圆满足

$$
\frac{p^2}{a^2}+\frac{Z^2}{b^2}=1,
\qquad a\ge b>0,
$$

其中 $a$ 是长半轴，$b$ 是短半轴。下面的归化纬度 $u$、大地纬度 $B$ 和地心纬度 $\Phi$ 都描述这个**同一个点 $P$**，区别只在于用来量角的几何对象不同。统一取

$$
u,B,\Phi\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right].
$$

### 归化纬度：来自辅助圆

<SourceFigure src="/geodesy/figures/reduced-latitude.png" alt="椭圆与辅助圆定义归化纬度" source="1椭球面数学性质   课程讲义.pdf" page="13" printed="12" />

原图用 $M$ 表示本文的椭球面点 $P$，用 $M′$ 表示辅助圆点 $P′$。图中的 $X$ 方向对应本子午面内的水平距离 $p$；竖直线表示两点具有相同的水平坐标。

归化纬度 $u$ 不是直接由地心向径或椭球法线定义的，而是借助一个半径为 $a$ 的辅助圆。

设辅助圆上的对应点为 $P'$，用角度 $u$ 参数化为

$$
p'=a\cos u,\qquad Z'=a\sin u.
$$

保持横坐标不变，把纵坐标按照比例 $b/a$ 压缩，即

$$
p=p'=a\cos u,
$$

$$
Z=\frac ba Z'=b\sin u.
$$

于是辅助圆上的 $P'$ 被映射到子午椭圆上的 $P$。因此归化纬度的坐标定义为

$$
\boxed{
p=a\cos u,\qquad Z=b\sin u
}
$$

而且

$$
\frac{p^2}{a^2}+\frac{Z^2}{b^2}
=
\cos^2u+\sin^2u
=1,
$$

说明这样得到的点确实位于椭圆上。

所以，**归化纬度 $u$ 可以理解为辅助圆上对应点 $P'$ 的半径与赤道方向之间的夹角**。它不是椭球上 $OP$ 的方向角，这一点需要和地心纬度区分。

绕 $Z$ 轴旋转到经度 $L$ 后，

$$
X=p\cos L,\qquad Y=p\sin L,
$$

从而椭球面的三维参数表达为

$$
\boxed{
\mathbf r(u,L)=
\begin{pmatrix}
a\cos u\cos L\\
a\cos u\sin L\\
b\sin u
\end{pmatrix}.
}
$$

### 大地纬度：来自椭球外法线

<SourceFigure src="/geodesy/figures/geodetic-latitude.png" alt="子午椭圆的切线与大地纬度" source="1椭球面数学性质   课程讲义.pdf" page="14" printed="13" />

原图的 $M_0$ 对应本文点 $P$，$K_0M_0$ 所在线给出法线方向，$M_0T$ 是切线。$K_0$ 不是地心 $O$，所以图中的法线角 $B$ 不应读成向径 $OP$ 的角度。

以下使用梯度。若这个概念已经生疏，可以先记住：梯度由各方向的偏导数组成；沿一个方向移动时，函数变化率等于梯度与该方向的内积。下面用链式法则说明它为什么给出法线。

仍然观察同一点 $P$。过 $P$ 作子午椭圆的**外法线**。大地纬度 $B$ 定义为这条外法线与赤道面之间的**有符号角**，取值范围为

$$
-\frac{\pi}{2}\le B\le\frac{\pi}{2}.
$$

这里规定赤道面上 $B=0$；从赤道面向北半球（$Z>0$）转动时 $B>0$，向南半球（$Z<0$）转动时 $B<0$。因此这里的“纬度”不是通常几何意义下恒为非负的两直线夹角，而是带有南北方向符号的定向角。

在非极点 $p>0$ 处，外法线在子午面内的水平分量为正，因此它的方向可以用上述有符号角 $B$ 唯一表示，其竖直分量与水平分量之比为

$$
\tan B.
$$

这里采用**梯度法**作为主线，而不把切线斜率法作为主要证明。原因是梯度直接给出椭球面的法线方向，不需要先求切线再利用垂直关系，而且在赤道附近也不需要处理 $dZ/dp$ 中出现的除零问题。对于已经掌握多元微积分的读者，这条路线更直接，也更容易推广到三维曲面。

在子午面内定义

$$
F(p,Z)=\frac{p^2}{a^2}+\frac{Z^2}{b^2}-1.
$$

为什么梯度给出法线方向？设椭圆上经过 $P$ 的一条光滑参数曲线写成

$$
\gamma(t)=(p(t),Z(t)),
$$

并且始终满足

$$
F(p(t),Z(t))=0.
$$

对上式关于 $t$ 求导，由链式法则得到

$$
\frac{\partial F}{\partial p}\frac{dp}{dt}
+
\frac{\partial F}{\partial Z}\frac{dZ}{dt}
=0.
$$

写成向量内积就是

$$
\nabla F\cdot\gamma'(t)=0.
$$

其中 $\gamma'(t)$ 是椭圆在该点的切向量，因此 $\nabla F$ 与切向量垂直，也就是椭圆的一个法向量。

对于

$$
F(p,Z)=\frac{p^2}{a^2}+\frac{Z^2}{b^2}-1,
$$

椭球内部满足 $F<0$，外部满足 $F>0$。梯度指向函数值增长最快的方向，因此

$$
\nabla F=
\left(
\frac{2p}{a^2},
\frac{2Z}{b^2}
\right)
$$

从椭球内部指向外部，正好给出我们需要的**外法线方向**。

对于非极点，即 $p>0$，法线与 $p$ 轴的夹角就是 $B$，所以法线方向的“竖直分量与水平分量之比”为

$$
\tan B
=
\frac{2Z/b^2}{2p/a^2}
=
\frac{a^2Z}{b^2p}.
$$

因此

$$
Z=\frac{b^2}{a^2}p\tan B.
$$

定义第一偏心率平方

$$
e^2=\frac{a^2-b^2}{a^2},
$$

于是

$$
\frac{b^2}{a^2}=1-e^2,
$$

所以

$$
\boxed{
Z=(1-e^2)p\tan B.
}
$$

现在把它代回椭圆方程：

$$
\frac{p^2}{a^2}
+
\frac{\left[(1-e^2)p\tan B\right]^2}{b^2}
=1.
$$

由于

$$
b^2=a^2(1-e^2),
$$

第二项可以化为

$$
\frac{(1-e^2)^2p^2\tan^2B}
{a^2(1-e^2)}
=
\frac{(1-e^2)p^2\tan^2B}{a^2}.
$$

因此

$$
\frac{p^2}{a^2}
\left[
1+(1-e^2)\tan^2B
\right]
=1.
$$

在

$$
-\frac{\pi}{2}<B<\frac{\pi}{2}
$$

内有 $\cos B>0$，于是

$$
1+(1-e^2)\tan^2B
=
\frac{\cos^2B+(1-e^2)\sin^2B}{\cos^2B}
=
\frac{1-e^2\sin^2B}{\cos^2B}.
$$

因此

$$
\frac{p^2}{a^2}
\frac{1-e^2\sin^2B}{\cos^2B}
=1,
$$

解得

$$
p=
\frac{a\cos B}
{\sqrt{1-e^2\sin^2B}}.
$$

为简化后续表达，定义

$$
W=\sqrt{1-e^2\sin^2B},
\qquad
N=\frac{a}{W}.
$$

于是

$$
\boxed{p=N\cos B}.
$$

再代回

$$
Z=(1-e^2)p\tan B,
$$

得到

$$
Z
=
(1-e^2)N\cos B
\frac{\sin B}{\cos B}
=
N(1-e^2)\sin B.
$$

所以

$$
\boxed{
p=N\cos B,\qquad
Z=N(1-e^2)\sin B.
}
$$

这里的 $N$ 此时首先只是由坐标推导自然引入的辅助长度；后续讨论法曲率时，再赋予它卯酉曲率半径的几何意义。

旋转到经度 $L$ 后，

$$
\boxed{
\mathbf r(B,L)=
\begin{pmatrix}
N\cos B\cos L\\
N\cos B\sin L\\
N(1-e^2)\sin B
\end{pmatrix}.
}
$$

上面的正切推导针对非极点。赤道 $B=0$ 时直接得到

$$
p=a,\qquad Z=0.
$$

极点 $B=\pm\pi/2$ 时，

$$
p=0,\qquad Z=\pm b.
$$

因此最终坐标公式可以通过连续性延伸到赤道和两极。极点处点本身是良好定义的，但经度 $L$ 不唯一。

原稿使用的切线斜率法也是正确的：隐式求导可以得到切线斜率，而切线与法线垂直，因此再由法线角 $B$ 建立关系。不过它需要额外说明为什么切线斜率是 $-\cot B$，并且在特殊位置需要单独讨论斜率。因此这里把它保留为几何理解，而不再重复一套完整证明。

### 地心纬度：来自地心向径

<SourceFigure src="/geodesy/figures/geocentric-latitude.png" alt="地心向径与地心纬度" source="1椭球面数学性质   课程讲义.pdf" page="25" printed="24" />

原图的 $M_0$ 对应本文点 $P$，$OM_0$ 是地心向径；这里的角 $\Phi$ 从赤道方向量起，与前图的法线角 $B$ 使用不同的量角对象。

第三次观察同一个点 $P$。这次连接椭球中心 $O$ 与 $P$，得到地心向径 $\overrightarrow{OP}$。**地心向径与赤道面之间的有符号角**定义为地心纬度 $\Phi$，北为正、南为负。

设

$$
\rho=|OP|>0
$$

为点 $P$ 到椭球中心的距离，那么在子午面内

$$
\boxed{
p=\rho\cos\Phi,\qquad
Z=\rho\sin\Phi.
}
$$

因此，对于非极点 $p>0$，

$$
\tan\Phi=\frac{Z}{p}.
$$

将 $p=\rho\cos\Phi$ 和 $Z=\rho\sin\Phi$ 代入椭圆方程，有

$$
\frac{\rho^2\cos^2\Phi}{a^2}
+
\frac{\rho^2\sin^2\Phi}{b^2}
=1.
$$

提出 $\rho^2$：

$$
\rho^2
\left(
\frac{\cos^2\Phi}{a^2}
+
\frac{\sin^2\Phi}{b^2}
\right)
=1.
$$

再利用

$$
b^2=a^2(1-e^2),
$$

将分母通分，可以把上式写成

$$
\rho^2\frac{(1-e^2)\cos^2\Phi+\sin^2\Phi}{a^2(1-e^2)}=1.
$$

分子利用 $\sin^2\Phi+\cos^2\Phi=1$ 化为 $1-e^2\cos^2\Phi$，所以

$$
\rho^2=\frac{a^2(1-e^2)}{1-e^2\cos^2\Phi}.
$$

因为 $\rho>0$，取正平方根得到

$$
\boxed{
\rho
=
a\sqrt{
\frac{1-e^2}
{1-e^2\cos^2\Phi}
}.
}
$$

因此三维坐标也可以写成

$$
\boxed{
\mathbf r(\Phi,L)
=
\rho
\begin{pmatrix}
\cos\Phi\cos L\\
\cos\Phi\sin L\\
\sin\Phi
\end{pmatrix}.
}
$$

现在三个角的区别可以统一起来：对于椭球面上的**同一点 $P$**，地心纬度 $\Phi$ 看的是地心向径 $OP$，大地纬度 $B$ 看的是点 $P$ 处的椭球外法线，而归化纬度 $u$ 看的是辅助圆上对应点 $P'$ 的半径方向。三个角都以赤道方向作为参考，但量角所依附的几何对象不同，因此在一般旋转椭球上数值并不相同。

---

## 从坐标表达得到纬度关系

现在三个纬度已经分别有了坐标表达。下一步不再重新研究几何图形，而是利用一个事实：**既然 $u$、$B$、$\Phi$ 描述的是同一个椭球面点，那么它们给出的 $p$ 和 $Z$ 必须相同。**

先比较归化纬度 $u$ 与大地纬度 $B$。

由归化纬度的定义，

$$
p=a\cos u,\qquad
Z=b\sin u.
$$

由大地纬度的坐标表达，

$$
p=N\cos B,\qquad
Z=N(1-e^2)\sin B.
$$

同一点的两个 $p$ 相等，因此

$$
a\cos u=N\cos B.
$$

又因为

$$
N=\frac{a}{W},
\qquad
W=\sqrt{1-e^2\sin^2B},
$$

所以

$$
a\cos u=\frac{a}{W}\cos B,
$$

约去 $a$ 后得到

$$
\boxed{
\cos u=\frac{\cos B}{W}.
}
$$

再比较 $Z$：

$$
b\sin u=N(1-e^2)\sin B.
$$

由于

$$
b=a\sqrt{1-e^2},
\qquad
N=\frac aW,
$$

因此

$$
a\sqrt{1-e^2}\sin u
=
\frac aW(1-e^2)\sin B.
$$

约去 $a\sqrt{1-e^2}$，得到

$$
\boxed{
\sin u
=
\frac{\sqrt{1-e^2}\sin B}{W}.
}
$$

对于非极点，取两式之比：

$$
\tan u
=
\frac{\sin u}{\cos u}
=
\frac{
\sqrt{1-e^2}\sin B/W
}{
\cos B/W
},
$$

于是

$$
\boxed{
\tan u=\sqrt{1-e^2}\tan B
=\frac ba\tan B.
}
$$

接下来比较地心纬度 $\Phi$ 和大地纬度 $B$。对于非极点，

$$
\tan\Phi=\frac Zp.
$$

而大地纬度坐标满足

$$
p=N\cos B,
\qquad
Z=N(1-e^2)\sin B.
$$

因此

$$
\tan\Phi
=
\frac{N(1-e^2)\sin B}
{N\cos B}.
$$

约去 $N$，得到最重要的地心纬度关系

$$
\boxed{
\tan\Phi=(1-e^2)\tan B.
}
$$

同样，由归化纬度坐标

$$
p=a\cos u,\qquad Z=b\sin u
$$

还可以直接得到

$$
\tan\Phi
=
\frac Zp
=
\frac{b\sin u}{a\cos u}
=
\frac ba\tan u.
$$

所以三者可以统一写成

$$
\boxed{
\tan\Phi
=
\frac ba\tan u
=
\frac{b^2}{a^2}\tan B
}
$$

或者等价地写成

$$
\boxed{
\tan u=\frac ba\tan B,
\qquad
\tan\Phi=\frac{b^2}{a^2}\tan B.
}
$$

由于

$$
0<\frac{b^2}{a^2}<\frac ba<1
$$

对严格扁椭球 $a>b$ 成立，所以在北半球内部

$$
0<B<\frac{\pi}{2}
$$

时有

$$
\boxed{
0<\Phi<u<B<\frac{\pi}{2}.
}
$$

南半球则由关于赤道的对称性得到相应的负角关系；如果比较绝对值，仍有

$$
|\Phi|<|u|<|B|.
$$

在赤道处，

$$
B=u=\Phi=0.
$$

在两极，三种纬度都取

$$
B=u=\Phi=\pm\frac{\pi}{2},
$$

但此时不应直接使用含 $\tan(\pm\pi/2)$ 的公式，而应理解为坐标公式的连续极限。在球面极限 $a=b$、即 $e=0$ 时，

$$
\frac ba=1,
$$

所以对所有点都有

$$
u=B=\Phi.
$$

实际计算时，与其直接计算 $\arctan(k\tan B)$，更稳妥的形式是

$$
\boxed{
u=
\operatorname{atan2}
\left(
\sqrt{1-e^2}\sin B,\,
\cos B
\right),
}
$$

以及

$$
\boxed{
\Phi=
\operatorname{atan2}
\left(
(1-e^2)\sin B,\,
\cos B
\right).
}
$$

这样可以正确保留南、北半球的象限信息，并且避免显式计算极点附近非常大的 $\tan B$。

### WGS84 数值例子：$B=45^\circ,\ h=0$

取 WGS84 椭球参数

$$
a=6378137\ {\rm m},
\qquad
f=\frac{1}{298.257223563}.
$$

第一偏心率平方由

$$
e^2=2f-f^2
$$

得到

$$
e^2\approx0.0066943799901413165.
$$

给定大地纬度

$$
B=45^\circ.
$$

三角函数计算通常使用弧度，因此首先转换：

$$
B
=
45^\circ\times\frac{\pi}{180^\circ}
=
\frac{\pi}{4}
\approx0.7853981634\ {\rm rad}.
$$

归化纬度满足

$$
u=
\operatorname{atan2}
\left(
\sqrt{1-e^2}\sin B,\cos B
\right).
$$

对于 $B=45^\circ=\pi/4$，有

$$
\sin B=\cos B=\frac{\sqrt2}{2}.
$$

计算时保留机器浮点精度的 $e^2$、$B$ 和反三角函数结果，在最终展示时才舍入。由此得到

$$
\boxed{
u\approx44.9037878494^\circ
}.
$$

同理，

$$
\Phi=
\operatorname{atan2}
\left(
(1-e^2)\sin B,\cos B
\right),
$$

使用同样的内部计算精度，在最终输出时得到

$$
\boxed{
\Phi\approx44.8075767840^\circ
}.
$$

这里角度制结果是直接由未舍入的内部弧度计算结果转换得到的；不应先把弧度截断到有限小数位，再用该截断值生成更多位数的角度制结果。

因此

$$
B-u
\approx
45^\circ-44.9037878494^\circ
=
0.0962121506^\circ.
$$

利用

$$
1^\circ=60',
$$

得到

$$
B-u\approx
0.0962121506\times60'
\approx
\boxed{5.772729'}.
$$

同理，

$$
B-\Phi
\approx
45^\circ-44.8075767840^\circ
=
0.1924232160^\circ,
$$

所以

$$
B-\Phi
\approx
0.1924232160\times60'
\approx
\boxed{11.545393'}.
$$

这个例子说明：即使描述的是同一个椭球面点，“纬度”也不是天然唯一的概念，必须首先说明采用的是大地纬度、归化纬度还是地心纬度。

最后必须强调，上面的三种纬度关系是在

$$
\boxed{h=0}
$$

条件下推导的，也就是点位于参考椭球面上。

对于普通近地空间点，若大地高 $h$ 沿参考椭球外法线量取，并且

$$
N+h>0,
$$

则在**非极点** $\cos B\ne0$ 处，其子午面坐标为

$$
p=(N+h)\cos B,
$$

$$
Z=\bigl[N(1-e^2)+h\bigr]\sin B.
$$

因此该空间点的地心纬度 $\Phi_h$ 满足

$$
\tan\Phi_h
=
\frac Zp
=
\frac{N(1-e^2)+h}{N+h}\tan B.
$$

这说明一般情况下

$$
\tan\Phi_h\ne(1-e^2)\tan B.
$$

所以椭球面上的纬度关系不能直接套用于 $h\ne0$ 的空间点。更一般地，应由实际直角坐标计算

$$
\boxed{
\Phi_h=
\operatorname{atan2}
\left(
Z,\sqrt{X^2+Y^2}
\right).
}
$$

极点处 $p=0$，上述含 $\tan B$ 的比值形式不适用，应直接使用坐标或连续极限，此时地心纬度为 $\Phi_h=\pm\pi/2$。

此外，本节的归化纬度 $u$ 是**参考椭球面上对应点的参数**。当 $h\ne0$ 时，如果仍提到 $u$，它指的是沿该点的大地法线回到参考椭球所得椭球面点的归化纬度，而不是把空间点本身直接代入

$$
p=a\cos u,\qquad Z=b\sin u.
$$

因此三种纬度之间前面建立的关系仍应理解为参考椭球面上的关系。

<LearningMark section="ge-latitudes" />
