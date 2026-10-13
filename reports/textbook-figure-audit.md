# 英文教材原图审计

本次提取11幅原图，用于前四章双语学习。用户已明确允许使用英文教材插图。教材PDF仍登记为本地参考资料。所有图片均由完整PDF页以Poppler `pdftoppm` 150 dpi渲染后裁切，未重绘、翻译覆盖或删除图号、标签和原署名。

## 执行阶段复审修订

本轮使用browser-collab网页Pro审阅实际文本，由客户端核对原图和教材原文后落实。图2.9的Iᴅ按PDF76–77正文及屋顶箭头定位为先到地表、再经大气漫散射进入传感器的路径，不直接等同天空漫射照明。图3.10补地心惯性系进动与太阳平均视运动匹配；图5.3补几何足迹和GRD分辨判据；图8.7补平台look/depression互余与look/incidence相等所需的平行竖直近似。最终双语图注以manifest为准；重提取脚本会保留已经审定的图注。网页模型意见不单独作为事实证据，必要的网页交接记录保留本地。

## 来源

- Campbell, J. B., Wynne, R. H., & Thomas, V. A. (2023). *Introduction to Remote Sensing, Sixth Edition*. Guilford Press. 本机675文件页；本次选页印刷页=PDF文件页−39。
- Canada Centre for Remote Sensing. *Fundamentals of Remote Sensing*. 本机258文件页。本次选页印刷页与PDF文件页相同。

原文件名、源PDF SHA-256、裁切像素坐标、成图尺寸、页码和原署名保存在 `public/remote-sensing/textbook-figures/manifest.json`。脚本为 `scripts/extract-textbook-figures.py`；`--render-only` 可重复生成完整页供目视审查。

## 图片与页面定位

| ID | 教材原图 / PDF页 / 印刷页 | 建议定位 | 教学增益与适用条件 |
|---|---|---|---|
| book-ccrs-information-chain | CCRS §1.1无编号图 / 5 / 5 | rs1-information-chain | A–G对应七环节，B出现两次帮助识别双程大气作用；图示为反射成像，热发射和非成像亦属于遥感。 |
| book-campbell-atmospheric-paths | Fig. 2.9 / 77 / 38 | rs2-atmosphere | 分开地表反射Iₛ、路径辐射Iₒ和地表信号经大气漫散射后的Iᴅ；适用于可见光邻近波段，避免把传感器亮度直接等同反射率。 |
| book-campbell-brdf | Fig. 2.16 / 84 / 45 | rs2-reflectance-brdf | 入射天顶角和观察方向影响反射；半球色标不是波长光谱，BRDF与BRF量纲仍依正文定义。 |
| book-campbell-surface-spectra | Fig. 2.19 / 87 / 48 | rs2-spectral-signatures | 对照植被、清静水体光谱与反射/吸收/透射；是示意曲线，不是跨情景固定的类别指纹。 |
| book-campbell-orbital-inclination | Fig. 3.9 / 102 / 63 | rs3-elements | 区分轨道平面倾角、当前纬度、姿态与侧摆角；原图署名NASA。 |
| book-campbell-orbit-families | Fig. 3.10 / 102 / 63 | rs3-orbits | LEO/MEO按高度，SSO按太阳同步条件，GEO图中指静止轨道；原图非比例，近极不自动等于太阳同步。 |
| book-campbell-ground-tracks | Fig. 3.11 / 104 / 65 | rs3-timing | NASA Landsat拼接条带连接轨迹与幅宽；多轨拼图不是单次过境，也不能据此计算重访。 |
| book-campbell-pushbroom-whiskbroom | Fig. 5.1 / 156 / 117 | rs4-scanning | 同时保留(a)线阵和(b)扫描镜，分开跨轨扫描与平台沿轨前进；联系驻留时间和探测器足迹。 |
| book-campbell-ifov | Fig. 5.3 / 157 / 118 | rs4-ifov | 显示视场锥体与地面足迹；补足IFOV角宽、GIFOV投影、GSD采样与GRD实际分辨尺度的边界。 |
| book-campbell-sar-geometry | Fig. 8.7 / 250 / 211 | rs4-radar | 联合斜距、距离向/方位向、视角/入射角/局部入射角/俯角与阴影；角度基准必须分别定位。 |
| book-ccrs-speckle | CCRS §3.6无编号A/B图 / 110 / 110 | rs4-radar | 均匀目标仍有相干亮暗波动，不能把相干斑误作类别变化；衔接多视、空间滤波与分辨率代价。 |

## 必须保留的解释边界

1. Campbell图5.3及附近正文把IFOV用于地面区域；网站用IFOV指角宽、GIFOV指地面投影尺度。图下注释已明确这种用语差异，避免改写原图造成误引。垂直、小角度近似下才使用GIFOV≈H×IFOV。
2. Campbell图8.7分别标出了Look angle和Depression angle，几何基准正确；p216附近正文“Look angle, the depression angle”混用两个术语。因此选图说明以图8.7和正文定义为准，没有照录错误句子。
3. Campbell图3.10不按比例绘制，且轨道类别混合不同维度；选图说明明确LEO/MEO、SSO和GEO的分类口径，避免将SSO误解成某个固定高度或认为所有近极轨道太阳同步。
4. Campbell图2.16说明的是方向变化，没有为BRDF/BRF提供完整单位或定义；公式和术语表才承担严谨定义。
5. 相干斑图片只取CCRS原比较图，保留A/B和©CCRS/CCT。未重复原页大段正文，也未以滤波后图替代原图。

## 多图阅读关系

- 第一章信息链A–G → 第二章大气三路径 → 地物光谱：明确“目标反射”和“传感器记录”不是同一层级。
- 第三章倾角 → 轨道类别 → Landsat轨迹条带：先定义空间几何，再理解覆盖与重访。
- 第四章推扫/摆扫 → IFOV足迹 → GSD/GRD、驻留时间：分开二维影像形成、瞬时观测和实际可分辨能力。
- 第四章SAR几何 → 相干斑：把观测方向造成的平均后向散射变化，与相干叠加造成的亮暗波动分别解释。

## 目视验证

已逐张查看10张完整页渲染，以及11张最终WebP裁图。未发现截断箭头、英文标签、原图号、原图注或署名。Campbell图5.3的原图注位于图的右侧，所以保留横向原版布局和留白，未重排。

11张WebP总计663,350字节（647.80 KiB），不含manifest和研究完整页。CCRS图像原本是低分辨率位图；保留原像素信息，没有放大重绘或虚构细节。Campbell图注含换行断词，照原版保留。
