---
prev: /geodesy-ellipsoid
next: /geodesy-ellipsoid-coordinates
---

# 曲线 曲面与坐标表达

如果一个点的位置随着参数连续变化，它就描出一条曲线；如果位置由两个独立参数决定，它就能描出一片曲面。求导描述参数变化时点朝哪个方向移动，所以切向量、法向量和长度计算都可以从参数化开始。

本专题的数学补充来自向量微积分公式表文件页 1–4、6–8，椭球讲义文件页 12、18–24、33–45。这里先讲一般工具，随后各专题再把它们应用到旋转椭球。

## 参数变化形成切向方向 {#g2-product}

设空间曲线为 $\mathbf r(t)=(x(t),y(t),z(t))^T$，在 $t_0$ 附近作一阶展开：

$$
\mathbf r(t_0+\Delta t)-\mathbf r(t_0)
=\mathbf r'(t_0)\Delta t+o(|\Delta t|).
$$

当 $\mathbf r'(t_0)\ne0$，微小位移的方向由导数决定，因此 $\mathbf r'$ 是切向量。速度的大小 $v=\|\mathbf r'\|$ 把参数变化换成长度变化，$ds=v\,dt$ 按参数递增方向理解，单位切向量为 $\mathbf T=\mathbf r'/v$。

直线 $\mathbf r(t)=\mathbf p+t\mathbf a$ 的切向量恒为 $\mathbf a$，说明方向不变。圆 $\mathbf r(t)=(R\cos t,R\sin t,0)$ 的导数为 $(-R\sin t,R\cos t,0)$，长度为 $R$，方向随参数转动。相同的 $\Delta t$ 对应约 $R\Delta t$ 的弧长，所以参数角度与长度并不是同一个量。

将切向量归一化时必须先检查导数非零。导数为零可能是参数选取造成的奇点，也可能来自曲线本身，需要换参数或单独分析，不能直接除以零。

## 两条切向量确定曲面法线 {#g2-jacobian}

正则曲面写作 $\mathbf x(u,v)$。固定 $v$ 改变 $u$，得到一条参数曲线，切向量为 $\mathbf x_u$；固定 $u$ 改变 $v$，另一条切向量为 $\mathbf x_v$。一阶位移是

$$
d\mathbf x=\mathbf x_u\,du+\mathbf x_v\,dv.
$$

因此两向量张成切平面。它们需要线性独立，也就是 $\mathbf x_u\times\mathbf x_v\ne0$，才能确定一张二维切平面。叉积同时垂直于二者，单位法线可取

$$
\boldsymbol\nu
=\frac{\mathbf x_u\times\mathbf x_v}
{\|\mathbf x_u\times\mathbf x_v\|}.
$$

交换叉积顺序会得到反向法线，因此“曲面的法向”还需要选择朝向。例如平面 $\mathbf x(u,v)=(u,v,0)$ 有 $\mathbf x_u=(1,0,0)$、$\mathbf x_v=(0,1,0)$，叉积为 $(0,0,1)$，正好是我们熟悉的垂直方向。

曲面也能由隐式方程 $F(X,Y,Z)=0$ 表达。沿面内切向位移，$dF=\nabla F\cdot d\mathbf x=0$；只要 $\nabla F\ne0$，梯度也给出法向。参数化与隐式方程描述同一曲面时，两种计算应得到平行的法线，这将成为椭球公式的重要检查。

## 方向 投影与坐标基 {#g2-curvature}

点积 $\mathbf a\cdot\mathbf b=\|\mathbf a\|\|\mathbf b\|\cos\theta$ 说明两个方向的夹角，单位向量 $\mathbf e$ 上的标量投影是 $\mathbf a\cdot\mathbf e$。叉积长度 $\|\mathbf a\times\mathbf b\|=\|\mathbf a\|\|\mathbf b\|\sin\theta$ 则对应两向量张成的平行四边形面积。

这两种运算分别连接着方向与面积。如果两个切向量正交，归一化后可以构成两个局部轴，再取法线作为第三个轴。一般曲面的参数曲线不一定正交，不能只把两个导数归一化就声称得到了正交基。

曲线也有自己的法线：当切向方向随弧长变化时，$\mathbf T'(s)$ 指向曲线的主法线。它与曲面法线通常不同。下面原课件说明了子午线这一特殊情形。

<SourceFigure src="/geodesy/figures/meridian-normal.png" alt="子午线的法线与椭球面的法线方向" source="1椭球面数学性质   课程讲义.pdf" page="12" printed="11" note="图中 M 是曲面上的点，R 是平行圈切向，不表示本文的曲率半径。" />

子午线的主法线在子午面内，垂直于子午切向；平行圈切向又垂直于整个子午面，所以也垂直于这根主法线。因此它垂直于切平面中的两个独立方向，确实沿曲面的法线。这里比较的是法线所在直线，内外朝向仍可相反。

有了这些工具，我们不必先背下椭球的切向和法向公式，而可以从椭球坐标表达逐一推出来。

<LearningMark section="ge-general" />
