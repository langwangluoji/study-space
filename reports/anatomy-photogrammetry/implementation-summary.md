# 摄影测量实施与验收记录

全部改动位于implementation树；只读repo基线未改，未push、merge或关机。

## 已实施

- en1–8以“用两张照片量出点位与精度”贯穿；en05增加五阶段工作单及输入/未知/输出桥接，保留原有完整推导、数例与来源。18个旧正文入口取消并行前后章导航，保留正文、锚点和对应主讲回链。54个原文件的全部显式锚点集合均保留。
- 新建review-photogrammetry.md，精炼公式条件、单位、易错点、题型步骤与质量判断，回链详细讲义和原复习纸。
- 6项原发现已修：旧共线/双像的坐标符号；coverage不再读未提交research；新增chapter2登记并修“没有课件”断言；后交/Schur程序可公开下载复算；PPT41与146页误标；尺度单位的条件。
- 新第2章104页逐页来源定位；明确区分提纲、主题对应、实际融合与未重制习题。具体接入FC→PPA数例、高度夸大条件和片数边界。潘第三版核版权/目录及投影差、立体与习题选页，保持与王书不同的章节体系，不声称390页整书已逐页重写。
- 1个共享67部件相机测量台HTML，10个query mode、10处正文嵌入。真实实体由同一模型给出位置/读数；默认230mm方幅、10μm教学采样，36mm为出片/无重叠反例。B改变时保持同一P并自动更新p。保留原PhotogrammetryLab与PhotoMath，不另改其正确坐标约定。

## 验收

|证据|结果|
|---|---|
|geometry-audit.json|18组实际形状、支持、接触与固定绘制次序采样，全部0失败；含默认、滑轨/航高/地形边界、±12°及中间姿态、后交初值、尺度1/8及组合边界|
|model-verification.json|80项PASS：对照原PhotoMath、可视场/像元范围、同点视差、姿态模型与几何摄影中心一致、六参数恢复、比例尺、精度、双线性例|
|browser-verification.json|10mode×2主题，共20动作场景PASS；真实Anatomy线端检查每场0；桌面/390px、键盘、减弱运动、读数/状态已检查；正常播放h/p同步，离屏visible=false且frame=0|
|scripts/check-photo-coverage.mjs|2468项PASS，41英文核心节、28王书节、369PPT页锚点与数学渲染|
|scripts/check-photogrammetry.mjs|144项PASS、23页、8个本机阅读器、原4数学模型|
|公开verify-lecture-math.py|27项PASS；六外方位/前交/Schur完整程序也已运行并给出公开输出|
|scripts/verify-photo-order-math.py|23项PASS|
|implementation-manifest.json|54原文件显式锚点全部保留；新public产物扫描未见绝对本机路径|

已实际打开桌面/手机两主题接触表，另看关键动作单图及4×相机连接、滑轨、测标细节。视觉复查发现浅色caption落在深色浏览器底色的问题，已修body背景与版心；之后重跑20场验证全部通过。4×图反映同一几何，仅版心CSS后来改进，几何未改。

这些是18组代表姿态及20个动作场景，不将其夸称所有连续参数/每帧已穷举。相对/绝对定向视图重点显示模型尺度自由度；完整五/七参数条件仍在正文。后交确实求六参数，台面主要显示摄影中心运动，小角改正用数值呈现。

## 数量与提交范围

登记来源与本机阅读器6→8；PPT逐页行265→369；新精炼复习页1；新交互嵌入10，实际共用HTML文件1、67功能部件。原始教材/PPT完整PDF新增公开文件数为0。既有SourceFigure原图资产未扩增。

implementation-manifest.json列出36个修改的摄影测量文件和19个必要新增文件。根代理另负责全站resources.config.json增加2资源（目录总数61→63）、导航、共享AnatomyFigure注册与最终构建；这些不重复计入本代理清单。可保留本目录JSON和自制图截图作证据，原PDF渲染页与一次性迁移脚本已经移到implementation外的results，不是发布/构建依赖。

构建：`node scripts/anatomy/build-photogrammetry.mjs`。网页源、模型、几何、可复算脚本都在仓库内部；README说明复现命令。最终全站集成构建由根代理统一完成。
