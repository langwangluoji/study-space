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

椭球方程只含坐标平方，所以关于三个坐标面反射后形状不变，并绕 Z 轴旋转对称。方程还给出 $X^2+Y^2\le a^2$、$Z^2\le b^2$，因此曲面有界。梯度 $2(X/a^2,Y/a^2,Z/b^2)$ 只有在原点才可能为零，而原点不在椭球面上，故曲面处处光滑正则。极点的经纬参数退化不意味着曲面不正则。后续得到的两个非零主曲率也说明椭球面不能无变形地展成平面；这一不可展性涉及曲面内蕴曲率，完整的内蕴理论超出本章范围。

## 三种角度怎样定义 {#latitude-relations}

归化纬度 $u$ 用椭圆的标准参数化定义：

$$
p=a\cos u,\qquad Z=b\sin u.
$$

<SourceFigure src="/geodesy/figures/reduced-latitude.png" alt="椭圆与辅助圆定义归化纬度" source="1椭球面数学性质   课程讲义.pdf" page="13" printed="12" />

原图中的辅助圆半径为 $a$，圆上点 $M'$ 的角度是 $u$，把其竖坐标按 $b/a$ 缩放得到椭圆上的 M。代入椭圆方程，只剩 $\cos^2u+\sin^2u=1$，因此这个参数化自动落在椭球面上。三维表达是

$$
\mathbf r(u,L)
=(a\cos u\cos L,\ a\cos u\sin L,\ b\sin u)^T.
$$

大地纬度 $B$ 定义为外法线与赤道面的夹角。它没有直接指向地心，因此需要用法线条件反求坐标。

<SourceFigure src="/geodesy/figures/geodetic-latitude.png" alt="子午椭圆的切线与大地纬度" source="1椭球面数学性质   课程讲义.pdf" page="14" printed="13" />

在非赤道、非极点的子午面区间，对椭圆方程求导：

$$
\frac{2p}{a^2}+\frac{2Z}{b^2}\frac{dZ}{dp}=0
\quad\Rightarrow\quad
\frac{dZ}{dp}=-\frac{b^2p}{a^2Z}.
$$

切线与法线垂直，图中切线斜率是 $-\cot B$，所以
$b^2p/(a^2Z)=\cot B$，也就是 $Z=(1-e^2)p\tan B$。代回椭圆方程：

$$
\frac{p^2}{a^2}\bigl[1+(1-e^2)\tan^2B\bigr]=1.
$$

注意方括号可写成 $(1-e^2\sin^2B)/\cos^2B$。在 $-\pi/2<B<\pi/2$ 有 $\cos B>0$，于是设

$$
W=\sqrt{1-e^2\sin^2B},\qquad N=\frac aW,
$$

便得到 $p=N\cos B$、$Z=N(1-e^2)\sin B$，三维坐标为

$$
\mathbf r(B,L)=
\begin{pmatrix}
N\cos B\cos L\\N\cos B\sin L\\N(1-e^2)\sin B
\end{pmatrix}.
$$

这里 $N$ 先作为辅助长度出现；法曲率专题将证明它就是卯酉曲率半径。赤道和极点虽不适合上述斜率推导，最终坐标表达可以连续延伸到这些位置。

地心纬度 $\Phi$ 则由向径定义，$p=\rho\cos\Phi,Z=\rho\sin\Phi$，其中 $\rho>0$ 是到中心的距离。

<SourceFigure src="/geodesy/figures/geocentric-latitude.png" alt="地心向径与地心纬度" source="1椭球面数学性质   课程讲义.pdf" page="25" printed="24" />

将两坐标代入椭圆方程：

$$
\rho^2\left(\frac{\cos^2\Phi}{a^2}
+\frac{\sin^2\Phi}{b^2}\right)=1,
$$

利用 $b^2=a^2(1-e^2)$ 得

$$
\rho=a\sqrt{\frac{1-e^2}{1-e^2\cos^2\Phi}}.
$$

因此第三种参数化是
$(X,Y,Z)=\rho(\cos\Phi\cos L,\cos\Phi\sin L,\sin\Phi)$。同一条子午椭圆上，三种参数都能定位点，但角度的几何起点不同。

## 从坐标表达得到纬度关系

把前面的 $p,Z$ 相除，得到

$$
\tan\Phi=\frac Zp=(1-e^2)\tan B.
$$

另一方面，由归化参数 $Z/p=(b/a)\tan u$，与上述式子比较：

$$
\frac ba\tan u=(1-e^2)\tan B
=\frac{b^2}{a^2}\tan B,
$$

所以 $\tan u=(b/a)\tan B=\sqrt{1-e^2}\tan B$。在北半球且 $a>b$ 时，$0<\Phi<u<B<\pi/2$；赤道、极点或球面极限下它们相同。

计算时采用 atan2 更能保留象限，例如
$u=\operatorname{atan2}(\sqrt{1-e^2}\sin B,\cos B)$，
$\Phi=\operatorname{atan2}((1-e^2)\sin B,\cos B)$。极点处经度不唯一，不能把某个经度输出理解为点本身唯一确定的方向。

这些关系针对 $h=0$。空间点有高度时，地心纬度应由实际 $X,Y,Z$ 求 $\operatorname{atan2}(Z,\sqrt{X^2+Y^2})$，不能直接套用椭球面关系。

<LearningMark section="ge-latitudes" />
