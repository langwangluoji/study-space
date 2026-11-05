---
title: "7.4 光的介质色散"
outline: [2, 3]
prev: {"text": "7.3 光的吸收", "link": "/optics-ch07-s03.html"}
next: {"text": "7.5 各向同性非均匀介质中的光传播", "link": "/optics-ch07-s05.html"}
---

# 7.4 光的介质色散

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 频率响应与材料色散

来源：课件 P27至35。

读色散曲线时先辨横轴：同一段曲线，用频率作横轴和用真空波长作横轴，斜率符号为何相反？由这一步再理解正常与反常色散。

<a id="ppt-5-27"></a>

### 7.4.1 光的介质色散现象

材料色散是折射率依赖频率 $n=n(\omega)$，等价于依赖真空波长 $n=n(\lambda_0)$。相速度 $v_p=c/n$ 也随频率变化。

<a id="ppt-5-28"></a>
<a id="ppt-5-29"></a>

### 7.4.2 介质色散函数、介质色散率、介质色散曲线

把折射率写成波长或频率的函数，得到介质色散函数；它的图像是色散曲线，对波长的导数给出介质色散率。以下先换算两种横轴的导数，再按曲线的局部斜率区分正常与反常色散。

$$
\frac{d\omega}{d\lambda_0}=-\frac{2\pi c}{\lambda_0^2}<0,
\qquad
\frac{dn}{d\lambda_0}=\frac{dn}{d\omega}\frac{d\omega}{d\lambda_0}.
$$

因此

| 分类 | 真空波长判据 | 频率判据 | 常见位置 |
|---|---|---|---|
| 正常色散 | $dn/d\lambda_0<0$ | $dn/d\omega>0$ | 透明波段，常见于远离吸收峰处 |
| 反常色散 | $dn/d\lambda_0>0$ | $dn/d\omega<0$ | 吸收共振附近的部分区域 |

正常或反常色散由导数符号分类，折射率与 1 的大小比较则决定相速度与 $c$ 的关系。单个共振在吸收峰附近可产生反常色散；多共振材料应根据实际 $n(\omega)$ 的斜率划分各频段。


![几种透明材料折射率随波长下降的正常色散曲线](/optics/figures/propagation-i-normal-dispersion-curves.png)

图 4-5　原课件 P29：纵轴为折射率 $n$，横轴为真空波长，单位 Å（$1\,\text{Å}=0.1\,\mathrm{nm}$）；黄色条标示可见光范围。

读图：沿同一材料曲线由左向右看，$n$ 降低，故 $dn/d\lambda_0<0$。短波端曲线更陡，说明导数绝对值更大；长波端趋平对应负导数趋近零。

<a id="ppt-5-30"></a>
<a id="ppt-5-31"></a>

### 7.4.3 从 Lorentz 模型推导 Cauchy 公式

对一个远高于入射频率的共振，假设 $\omega\ll\omega_0$、阻尼可忽略，且采用弱极化近似：

$$
n\simeq1+\frac{\Omega^2}{2(\omega_0^2-\omega^2)}
=1+a\frac1{1-(\omega/\omega_0)^2},\quad
a=\frac{\Omega^2}{2\omega_0^2}.
$$

#### 详细推导：远离共振的几何级数展开

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

令 $x=(\omega/\omega_0)^2\ll1$，使用 $(1-x)^{-1}=1+x+x^2+\cdots$，再代入 $\omega=2\pi c/\lambda_0$：

$$
\begin{aligned}
n&\simeq1+a+a\frac{\omega^2}{\omega_0^2}+a\frac{\omega^4}{\omega_0^4}+\cdots\\
&=\boxed{A+\frac B{\lambda_0^2}+\frac C{\lambda_0^4}+\cdots}.
\end{aligned}
$$

</details>



Cauchy（科希）公式由远离共振时的频率展开得到。上述单振子、弱极化近似给出 $A=1+a$、$B=a(2\pi c/\omega_0)^2$、$C=a(2\pi c/\omega_0)^4$。一般材料对 $\sqrt{\varepsilon_r(\omega)}$ 作低频展开也可得到同类幂级数，其系数由实际材料响应确定。

较窄波段常只保留两项：

$$
n=A+\frac B{\lambda_0^2},\qquad
\boxed{\frac{dn}{d\lambda_0}=-\frac{2B}{\lambda_0^3}}.
$$

当 $B>0$，$dn/d\lambda_0<0$，属于正常色散。随波长增加，该负导数趋近 0，绝对值减小。紫光的 $n$ 较大，通常经棱镜偏折也较大；短波端 $|dn/d\lambda_0|$ 较大，等波长间隔在光谱上展开得更宽（课件 P29 至 30）。

本节的核心形式是 $n=A+B/\lambda_0^2+C/\lambda_0^4+\cdots$，它在远离吸收带的适用波段内描述透明材料；系数的单位随所选波长单位变化。

<a id="ppt-5-32"></a>
<a id="ppt-5-33"></a>

### 7.4.4 共振附近的反常色散

#### 详细推导：共振附近吸收峰与折射率斜率

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

在弱极化近似中 $n-1\simeq\chi'_e/2$。若阻尼较小，在 $\omega=\omega_0$ 附近定义 $\delta=\omega-\omega_0$，有

$$
\omega_0^2-\omega^2\simeq-2\omega_0\delta,\qquad
\gamma\omega\simeq\gamma\omega_0.
$$

所以

$$
\chi'_e\simeq-\frac{2\Omega^2\delta}{\omega_0(4\delta^2+\gamma^2)},\qquad
\chi''_e\simeq\frac{\Omega^2\gamma}{\omega_0(4\delta^2+\gamma^2)}.
$$

$\chi''_e$ 是吸收峰，而 $\chi'_e$ 在峰两侧由正转负。在峰中心

$$
\left.\frac{dn}{d\omega}\right|_{\omega_0}
\simeq-\frac{\Omega^2}{\omega_0\gamma^2}<0,
$$

</details>



因此 $dn/d\lambda_0>0$，形成反常色散。以上近共振计算仍要求弱极化；响应较大时，须从完整复平方根求 $n$。吸收与色散来自同一复响应，教材/ED补充：因果性通过 Kramers–Kronig 关系约束二者；本 PPT 未展开这组积分关系。


![吸收带及其两侧折射率曲线斜率变化](/optics/figures/propagation-i-anomalous-dispersion-band.png)

图 4-6　原课件 P33：右图阴影为吸收带，横轴为波长；折射率曲线在带内急变，外侧恢复正常色散趋势。

读图：区分代表吸收的谱特征与代表折射率的曲线。正常/反常由折射率的局部斜率判断；阴影吸收带提示需要检查复折射率及近共振近似，不把整条曲线划成同一种色散。

<a id="ppt-5-34"></a>

### 7.4.5 交叉棱镜显示色散曲线

牛顿交叉棱镜实验先把波长沿一个方向展开，再用第二棱镜沿近似垂直方向按其 $n(\lambda_0)$ 偏折，得到弯曲彩色光带（课件 P34）。第一方向提供非均匀波长坐标，第二方向反映折射率；光带形状由此显示材料的色散。

![Newton 交叉棱镜装置](/optics/figures/propagation-i-newton-cross-prisms.png)

图 4-7　原课件 P34：两个棱镜的色散方向相互垂直，一方向分辨波长，另一方向显示待测材料的偏折。狭缝与透镜形成清楚的彩色光带；需要含多个波长的入射光，水平波长间隔并不均匀。


<a id="ppt-5-35"></a>

### 7.4.6 反常色散的观察：伍德实验

伍德实验将连续背景光送过受热的钠蒸汽管，蒸汽密度不均匀使其产生相当于棱镜的偏折；后续玻璃棱镜在交叉方向分辨波长。屏上在钠强吸收线附近出现急剧弯折，强吸收位置可明显变暗或中断，显示反常色散（P35）。条件是有连续背景光、合适的蒸汽密度梯度，并能分辨吸收线附近波段；反常色散区须按曲线斜率判断，不能推广到整段可见光。P32 的另一实验是测石英红外吸收带内的折射率：强吸收使透射很弱，必须采用薄石英片。

### 色散与波包群速度

#### 详细推导：跨课件衔接与教材/ED补充：群速度、群折射率及波导色散

<details class="optics-derivation">
<summary>展开逐步推导与说明</summary>

群速度定义与 $d\omega/dk$ 的关系对应后续《光学20261026光的传播II》P48—52，详见第 11 章；本节再补充用真空波长表示的群折射率以及电动力学解释。

对弱吸收、窄带且传播中波包形状变化不大的情形，$k=n(\omega)\omega/c$ 给出

$$
v_g=\frac{d\omega}{dk}
=\frac{c}{n+\omega\,dn/d\omega}
=\boxed{\frac{c}{n-\lambda_0\,dn/d\lambda_0}}.
$$

正常色散通常给出 $n_g=n-\lambda_0n'>n$，从而 $v_g<v_p$。强吸收或反常色散区的波包可能显著变形，此时群速度不再直接代表能量或信息传输速度；相速度及异常群速度的数值也需结合完整因果响应解释。波导还可因边界几何产生色散，即使填充材料的 $n$ 与频率无关，传播常数也可能依赖频率。

</details>



短例：$n=1.50+0.00400/\lambda_0^2$，波长用 $\mu\mathrm m$。在 $0.500\,\mu\mathrm m$ 处，$n=1.516$、$dn/d\lambda_0=-0.0640\,\mu\mathrm m^{-1}$；红端波长增大时 $n$ 降低。计算前先给 $B$ 标上 $\mu\mathrm m^2$，再求导。


自检：两点的折射率都大于 1，能据此判正常色散吗？图 4-5 长波端的负斜率“趋零”，其数值还是绝对值在减小？

#### 自检答案：色散斜率与单位

<details class="optics-derivation">
<summary>展开答案与解释</summary>

正常/反常看导数，需比较邻近频率或波长，$n>1$ 本身不够。负斜率趋零时数值增大而绝对值减小；用 $-2B/\lambda_0^3$ 直接核对。

</details>



## 本节课件定位

光学20261019_光的传播_I.pdf P27、光学20261019_光的传播_I.pdf P28、光学20261019_光的传播_I.pdf P29、光学20261019_光的传播_I.pdf P30、光学20261019_光的传播_I.pdf P31、光学20261019_光的传播_I.pdf P32、光学20261019_光的传播_I.pdf P33、光学20261019_光的传播_I.pdf P34、光学20261019_光的传播_I.pdf P35。


## 离线阅读

[下载光学Obsidian知识库](/optics/光学期中复习_Obsidian.zip)。包内保留第1—9章文件夹、独立小节、复习与来源插图。
