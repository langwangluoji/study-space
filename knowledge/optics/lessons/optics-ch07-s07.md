# 7.7 各向异性均匀介质中的光传播

<span class="optics-key">学习重点</span> 先读本节的概念、模型条件与课件图，再按需展开推导。

## 7.7.1 各向异性均匀介质与介电张量

![自然原子组成晶格和人工结构单元构成超材料的对照](/optics/figures/nov05-lattice-metamaterial-p26.png)

《光学20261026光的传播II.pdf》PDF第26页（局部）。右上由自然原子指向晶格，右下由人工亚波长结构单元指向周期材料；两组箭头对照自然微结构与可设计的有效响应。左图以ε、μ的正负划分传播与倏逝情形，双负区与负折射率材料相联系。该四象限图基于有效、近似各向同性材料模型，实际超材料还需检查结构尺度、色散和损耗。


![各向异性介质的介电张量及主轴系中单轴双轴形式](/optics/figures/nov05-dielectric-tensor-p23.png)

《光学20261026光的传播II.pdf》PDF第23页（局部）。先看一般三阶矩阵中D的每个分量可由E的三个分量共同决定，再看主轴系中的对角矩阵；三个主值不同时对应双轴模型，两个主值相同时对应单轴模型。原页D=[ε]E采用绝对介电张量记号，若使用相对张量应写D=ε₀[εr]E。原页把双轴晶体“正负”直接按三个任意轴标签的主值排序，不能据此定义光学正负；光学符号须按主折射率和光轴几何判定，单轴则比较ne与no。


来源：第 23—27 页。

学习问题：一个材料空间上处处相同，是否意味着对所有电场方向响应相同？

各向异性均匀线性介质的响应与电场方向有关，与位置无关。电位移不再由一个标量系数乘电场描述，而要用介电张量：

$$
\mathbf D=\boldsymbol\varepsilon\mathbf E,
\qquad
\boldsymbol\varepsilon=
\begin{pmatrix}
\varepsilon_{xx}&\varepsilon_{xy}&\varepsilon_{xz}\\
\varepsilon_{yx}&\varepsilon_{yy}&\varepsilon_{yz}\\
\varepsilon_{zx}&\varepsilon_{zy}&\varepsilon_{zz}
\end{pmatrix}.
$$

这里 $\boldsymbol\varepsilon$ 是绝对介电张量；若采用相对介电张量，则右侧另乘 $\varepsilon_0$。矩阵的一行说明一个 $D$ 分量可由多个 $E$ 分量共同决定，因此 $\mathbf D$ 一般不与 $\mathbf E$ 平行。

例如矩阵第一行的含义是

$$
D_x=\varepsilon_{xx}E_x+\varepsilon_{xy}E_y+\varepsilon_{xz}E_z.
$$

在介电主轴坐标下，PPT 将它写成对角形式：

$$
\boldsymbol\varepsilon=
\operatorname{diag}(\varepsilon_x,\varepsilon_y,\varepsilon_z).
$$

三个主值各不相同，对应课件所列的双轴晶体；若其中两个相同，例如 $\varepsilon_x=\varepsilon_y\ne\varepsilon_z$，对应单轴晶体；三者相同则退回各向同性。记忆时看“有几个独立主值”，不把均匀误解为各方向相同。

晶体正负性不能单凭给三个坐标轴重新排序来判断，PPT 所列 $\varepsilon_x<\varepsilon_y<\varepsilon_z$ 或反向不等式不宜作为双轴晶体正负性的通用定义。以下采用张量主值定义来区分各向同性、单轴和双轴介质。

PPT 的材料总结可压成一张判断表：

|介质|位置依赖|方向依赖|本构特征|
|---|---|---|---|
|各向同性均匀|无|无|固定标量介电参数|
|各向同性非均匀|有|无|标量参数随位置变化|
|各向异性均匀|无|有|固定介电张量|

自然材料的光学性质来自其原子结构；人工超材料通过设计单元结构改变等效电磁响应。第 27 页用 $\varepsilon\,\mu$ 的符号象限示意普通透明介质、衰逝波区域和负折射率材料，并展示异常折射、隐身的设计示例。识图时记住：两参数同为正是通常透明介质的象限；一正一负的理想模型对应衰逝；两者同为负的象限展示负折射率及波矢与能流反向。课件在这里介绍材料调控的可能性，未给具体器件的工作频段与设计公式。

短例：主轴坐标中若 $\boldsymbol\varepsilon=\operatorname{diag}(2\varepsilon_0,2\varepsilon_0,3\varepsilon_0)$，介质均匀而各向异性，且有两个相等主值，对应单轴情形。坐标旋转可使矩阵出现非对角元，物理材料类型保持一致。


## 7.7.2 各向异性均匀介质的光传播

即使外加电场只有 $x$ 分量，只要 $\varepsilon_{yx}$ 或 $\varepsilon_{zx}$ 不为零，也能产生 $y$ 或 $z$ 方向的电位移响应。各向异性改变的是本构关系，Maxwell 方程本身仍成立；求场时需要把张量和场分量一起代入，而非给各方向共用一个标量折射率。

无自由电荷的平面波满足 $\mathbf k\cdot\mathbf D=0$；由于张量本构关系下 $\mathbf D$ 与 $\mathbf E$ 一般不平行，这个条件并不直接变成 $\mathbf k\cdot\mathbf E=0$。课件第24页把无源Maxwell方程与介电张量联立，传播方向与偏振必须在这组方程中共同确定。

自检：对角矩阵意味着各向同性吗？各向异性平面波必有 $\mathbf k\cdot\mathbf E=0$ 吗？

#### 自检答案：张量与横向条件



还要看三个主值是否相等。无自由电荷保证 $\mathbf k\cdot\mathbf D=0$；张量本构下 $\mathbf D$ 一般不平行于 $\mathbf E$，所以 $\mathbf E$ 不必完全横向。






## 本节课件定位

光学20261026光的传播II.pdf P23、光学20261026光的传播II.pdf P24、光学20261026光的传播II.pdf P25、光学20261026光的传播II.pdf P26、光学20261026光的传播II.pdf P27。
