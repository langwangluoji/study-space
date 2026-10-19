---
title: 最优化期末复习 · 公式、条件与题型路线
outline: [2, 3]
---

# 最优化期末复习

本页用于考前回忆与解题定位，长证明和完整算例回到[详细讲义](/course-optimization)。先认变量、目标、约束、定义域，再选择定理或算法；不要因为题目来自机器学习或导航，就先认定它凸。

## 一份持续算例记住七件事

令 $q=\frac12[(x-2)^2+4(y-1)^2]$，约束 $x+y\le2$。

|对象|要记住的结果|最容易混的地方|
|---|---|---|
|自由解|$(2,1)$，代价0|它不满足当前挡板约束|
|梯度与曲率|$g=(x-2,4(y-1))$，$H=\operatorname{diag}(1,4)$|负梯度方向正确不代表任意步长下降|
|约束解|$(1.2,.8)$，$q^*=.4$|欧氏投影是$(1.5,.5)$，度量不同|
|KKT乘子|$\lambda=.8$，$g_{约束}=x+y-2$|真实法向反力为$.8\sqrt2$，不是.8|
|对偶下界|$d(\lambda)=\lambda-5\lambda^2/8$|对全域取inf，局部极小不能冒充下界|
|固定GD步长|$0<\eta<.5$|这里只是该固定SPD二次型的全部方向稳定界|
|原点线搜索|$p=(2,4)$，$\phi=4-20\alpha+34\alpha^2$，$\alpha_{exact}=5/17$|精确线搜索、Armijo、Wolfe是不同要求|

## 集合、函数与模型识别

|主题|公式/判断|条件与易错点|详细位置|
|---|---|---|---|
|凸集|两点全部凸组合留在集合|不能用有限采样证明全称命题；并集一般不凸|[BV2](/optimization-bv-02)|
|仿射集|$Ax=b$|非空时是特解加零空间；不一定过原点|[BV2](/optimization-bv-02)|
|凸函数一阶判据|$f(y)\ge f(x)+\nabla f(x)^T(y-x)$|可微、凸域；域条件不可丢|[BV3](/optimization-bv-03)|
|二阶判据|$\nabla^2 f\succeq0$|相应开凸域、二阶可微；严格凸不要求处处Hessian正定|[BV3](/optimization-bv-03)|
|最优存在/唯一|严格凸只保证若存在则唯一|闭、非空、紧或coercive等存在条件另查|[BV3](/optimization-bv-03)|
|复合|曲率与外层单调性共同判断|部分定义域需扩展值规则；不能只检查域内单调|[BV3 3.2](/optimization-bv-03)|
|共轭|$f^*(y)=\sup_x(y^Tx-f(x))$|总凸；双共轭恢复需适当闭凸等条件|[BV3 3.3](/optimization-bv-03)|
|准凸|次水平集凸|梯度零不保证最优，如$x^3$；可用阈值可行性二分|[BV3–4](/optimization-bv-04)|
|LP/QP|仿射目标与约束 / PSD二次目标与仿射约束|QP的PSD检查对象是对称Hessian|[BV4](/optimization-bv-04)|
|SOCP/SDP|范数锥约束 / 仿射矩阵PSD约束|矩阵半正定不是逐元素非负|[BV4](/optimization-bv-04)|
|GP|正变量，正项式不等式、单项式等式|对数换元；带负系数的任意多项式不能套|[BV4 4.5](/optimization-bv-04)|
|Pareto标量化|$\min\lambda^Tf(x)$|内部对偶锥权重保证所得点极小；边界权重可能忽略改进方向|[BV4 4.7](/optimization-bv-04)|

## 对偶、KKT与二阶条件

统一约定 $g_i(x)\le0,h(x)=0$，$L=f+\lambda^Tg+\nu^Th$，$\lambda\ge0$。NW原书常写$c_i\ge0$且减号；令$g_i=-c_i$，不等式乘子不反号，保留原等式函数时等式乘子需反号。

$$
g(x)\le0,\quad h(x)=0,\quad\lambda\ge0,\quad\nabla_xL=0,\quad\lambda_i g_i(x)=0.
$$

- 非凸：KKT必要性需适当约束资格；满足KKT通常只是候选。凸目标/凸不等式/仿射等式时，KKT充分性不另需Slater。
- Slater：适当相对内部的严格可行保证凸问题强对偶；有限值时可支持对偶达到，不自动保证原始最优达到。
- 非活动约束乘子为零；活动约束允许零乘子。等式乘子无符号限制。
- 二阶用 $\nabla^2_{xx}L$，在临界锥上检查。正乘子活动约束方向满足等式；零乘子活动约束仍可能允许单侧方向。严格正定临界曲率可给局部充分条件，不能写成一般非凸全局最优。
- 弱对偶不需凸性。原始可行值减对偶可行下界是证书；互补量小或surrogate gap小，缺可行/驻点条件时不够。

详细：[BV5](/optimization-bv-05) · [NW12](/optimization-nw-12)。S-lemma只对相应单个实二次约束且有严格可行等条件给必要充分证书，不能推广为任意非凸多约束强对偶：[BV附录B](/optimization-bv-b)。

## 无约束算法：每次分清方向、长度、接受与停止

|方法|核心公式/任务|必要核对|详细位置|
|---|---|---|---|
|GD|$p=-g$，$x^+=x+\alpha p$|非零梯度给局部下降，步长另选|[NW2–3](/optimization-nw-03)|
|Armijo|$f(x+\alpha p)\le f+c_1\alpha g^Tp$|下降方向、$0<c_1<1$；它本身不排除极短步|[NW3](/optimization-nw-03)|
|Wolfe|新方向导数$\ge c_2g^Tp$|$0<c_1<c_2<1$；弱式不限制过大的正斜率|[NW3](/optimization-nw-03)|
|strong Wolfe|$\lvert g_{new}^Tp\rvert\le c_2\lvert g^Tp\rvert$|与Armijo共同使用|[NW3](/optimization-nw-03)|
|Newton|$Hp=-g$|可逆不代表下降；正定/修正或信赖域；局部二次需相应光滑等条件|[BV9](/optimization-bv-09)|
|信赖域|$\min g^Tp+p^TBp/2,\|p\|\le\Delta$|预测下降为正才能算ρ；Cauchy下降与半径规则共同支撑收敛|[NW4](/optimization-nw-04)|
|子问题全局条件|$(B+\lambda I)p=-g$，$B+\lambda I\succeq0$，互补与可行|不定hard case不能只取任意线性方程解|[NW4 4.3](/optimization-nw-04)|
|线性CG|$r=Ax-b$，A-共轭方向|固定SPD、精确算术才有至多n步；预条件器需相应SPD|[NW5](/optimization-nw-05)|
|BFGS|$s=x^+-x,y=g^+-g$，$B^+s=y$|$s^Ty>0$与正定初始化；Wolfe能支持该曲率条件|[NW6](/optimization-nw-06)|
|SR1|$B^+=B+uu^T/(u^Ts)$，$u=y-Bs$|分母保护；不保持正定，常配信赖域|[NW6](/optimization-nw-06)|
|L-BFGS/Newton-CG|近期s/y对 / Hessian-vector|不形成完整矩阵；有限记忆不能照搬完整BFGS超线性保证|[NW7](/optimization-nw-07)|
|数值导数/AD|中心差分 / 对执行图用链式法则|h过小放大噪声；AD消除差分截断，不消除错误模型/浮点/折点|[NW8](/optimization-nw-08)|
|无导数|插值模型、pattern、Nelder-Mead等|点数足够不代表几何非退化；单纯形缩小不自动证明驻点|[NW9](/optimization-nw-09)|

“global convergence”常指从广泛初值获得驻点结论，不能翻成任意非凸问题找到全局最优。小梯度的误差证书需要曲率下界等条件；一般Newton减量的模型估计与自协调严格界也要分开。

## 拟合、估计与几何

|题目触发|该写什么|范围/易错点|
|---|---|---|
|线性最小二乘|$A^T(Ax-b)=0$|始终存在最优拟合向量；参数唯一需满列秩；QR/SVD优先于显式求逆|
|最小范数|$\min\|x\|,Ax=b$|和最小残差不是同一目标；L1不无条件恢复最稀疏解|
|ridge|$(A^TA+\lambda D^TD)x=A^Tb$|λ>0时唯一需$\ker A\cap\ker D=\{0\}$；平均数据损失会改变Nλ系数|
|线性高斯/MAP|残差精度加权+先验负对数|独立性、正定协方差、线性观测；MAP点不等于完整不确定性|
|实验设计|$M=\sum w_i v_iv_i^T$，D/A/E准则|先查M正定；重复盲方向不能创造可辨识性；频率舍入另核|
|投影|$(a-p)^T(z-p)\le0$|欧氏、非空闭凸保证唯一；任意范数不一定唯一|
|Gram/椭球/布局|PSD与迹/距离；logdet；矩形相对关系|指定低维需秩约束通常非凸；不重叠的多个位置关系是离散选择|

详细：[BV6](/optimization-bv-06) · [BV7](/optimization-bv-07) · [BV8](/optimization-bv-08)。

非线性最小二乘：$\nabla F=J^Tr$，$\nabla^2F=J^TJ+\sum r_i\nabla^2r_i$。GN省去第二项；LM用信赖域/阻尼保护步。小残差有利不等于Jacobian条件良好。求根则必须另看$r=0$，$J^Tr=0$不是同一件事：[NW10](/optimization-nw-10) · [NW11](/optimization-nw-11)。

## 约束算法与线性代数

|主题|计算路线|结束不能漏什么|
|---|---|---|
|等式QP/KKT|完整不定分解、Schur、nullspace|A秩与约化Hessian；整个KKT无需正定|
|LP单纯形|入基约化成本→比值→出基→更新分解|退化可零步循环；当前不可行不等于原问题不可行|
|QP活动集|工作集方向→阻挡步长；p=0检查乘子|半正定方向子问题另有非唯一/无界情况；负不等式乘子需处理|
|二次罚|$f+\rho\|h\|^2/2$|有限ρ通常不精确，大ρ还可能病态|
|增广拉格朗日|$f+\nu^Th+\rho\|h\|^2/2$，$\nu^+=\nu+\rho h$|子问题不自动凸；内层驻点、原始违背与乘子分别看|
|精确L1罚|$f+\rho(\|h\|_1+\|[g]_+\|_1)$|有限阈值与乘子/正则性或二阶充分条件相关；仅存在KKT不够|
|SQP|线性化约束+Lagrangian曲率QP→原模型接受|QP可行不代表真可行；相容性、SOC、merit/filter需配合|
|内点|扰动KKT、正性保护、逐层μ|驻点、原始可行、松弛等式、互补；近似中心不能直接报m/t严格误差|
|稀疏分解|保留结构、主元与填充|小线性残差不代表病态参数误差小；数值修正不创造观测信息|

详细：[BV10](/optimization-bv-10) · [BV11](/optimization-bv-11) · [NW13](/optimization-nw-13) · [NW14](/optimization-nw-14) · [NW15](/optimization-nw-15) · [NW16](/optimization-nw-16) · [NW17](/optimization-nw-17) · [NW18](/optimization-nw-18) · [NW19](/optimization-nw-19)。数学/分解回查：[BV A](/optimization-bv-a)、[BV C](/optimization-bv-c)、[NW A](/optimization-nw-a)、[NW B](/optimization-nw-b)。

## 做题时的最短路线

1. **判凸/建模题**：列域→查集合→查目标与每条约束→指出具体规则；需要换元就写出逆对应与边界。
2. **求约束最优题**：先找可行候选→写统一符号KKT→求乘子→逐项代回→用凸性或二阶条件说明能证明到哪一步。
3. **推导梯度/步方向题**：先固定求和/平均、行列维度与残差方向→逐坐标求导→写矩阵式→复查量纲/形状。
4. **线搜索/信赖域算题**：算当前g/B→明确方向或子问题→算试点真实值→验接受不等式或ρ→再更新点与参数。
5. **拟合/估计题**：写数据模型与噪声/权重条件→残差/Jacobian→解或近似步→核验残差、秩与不确定性范围。
6. **算法比较题**：比较需要的信息、保存什么、每步线代、可行性与停止依据；避免只写“收敛更快”。

最后检查答案中的“存在、唯一、局部、全局、达到、下界、严格”是否都有依据。考前用本页找回关键，遇到条件不确定时回详细讲义与[原书页码](/optimization-sources)。
