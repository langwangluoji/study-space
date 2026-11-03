# 大地测量课程与本地知识库：实施记录

日期：2026-11-03。基线：b123f462f4e2f0ac3e3e451add631dc0a68869c4。

## 交付

- 六个主章与轨道辅助篇，31个专题；48篇同源课程笔记。
- 每专题至少一个完整例题，共77个自测；完整推导与解析按需展开。
- 11份来源资料建档，285条逐页对应，包含84页轨道PPT的全部实际讲授内容。
- 六个新增交互图、七张原有交互图静态版本、两张轨道静态图；新交互HTML可离线运行。
- knowledge/geodesy为Obsidian正文源，网站生成内容位于docs；本地资料目录另存ZIP备份。

## 内容与符号核查

S10第7页椭球参数偏导的末因子以独立求导纠正为sin B；第六章明确NEU与ENU的手性和旋转伪向量约定。轨道辅助篇区分历史教学框架与现代术语，二度二阶项归为扇谐项。输入椭球、角度单位、旋转方向、近似阶次在相应章节说明。

## 核验依据

- scripts/geodesy-publish.test.mjs：8项转换回归。
- scripts/geodesy/model.test.mjs：11项纯数学模型检查。
- scripts/check-geodesy-content.mjs：本地链接、标题完整性、例题自测和来源覆盖。
- verify_geodesy.py、verify_geodesic_computation.py、verify_geodesy_coordinates.py、verify_geodesy_orbit.py：符号、积分、独立算法、坐标和时间算例。
- 构建结果255页，22601个站内链接与资源通过检查；旧大地课程33个显式锚点、17个学习标记身份保留。
- check-folio-ui.mjs：144项布局与阅读界面检查通过。
- 大地课程和通用网页回归的最终结果见对应JSON报告。

## 编辑与发布

在Obsidian中打开knowledge/geodesy，README.md是学习入口。编辑lessons内的正文，运行npm run generate，再构建。交互模型和绘图由scripts/geodesy维护，重建同时输出网站和本地HTML。生成器不需要读取本机原始PPT/PDF，干净CI可从Git中的知识库完成构建。

新增发布内容未包含完整PDF、PPTX或DOCX原件；scratch核对材料不纳入提交与发布。个人笔记与Obsidian工作区状态留在本地。
