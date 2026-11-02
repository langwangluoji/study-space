# 首页与课程目录独立审阅

检查环境：2026-11-02，Microsoft Edge / Playwright，开发服务 http://127.0.0.1:4320/study-space/ 。

覆盖首页、课程目录，1440 / 390 / 320 px，light / dark，共 12 个组合。每组合均保存首屏与全页截图；首页另保存切换光学后的首屏。

## 初检问题（现已全部修复）

1. **课程目录 SVG 宽度被通用规则覆盖。** `.folio-page svg.folio-artwork { width:100% }` 的权重大于 `.folio-tile > .folio-artwork`。1440 px 目录最优化 SVG 实际宽 812 px、高 566.5 px，拉高首行并延后入口。建议将缩略图规则限定为 `.folio-page .folio-tile > svg.folio-artwork`，同时设置 width / max-width；保留首页大封面图。
2. **320 px 目录标题出现孤立尾行。** “展开一条知识线。”被排为“展开一条知识 / 线。”，建议缩小该断点字号，或使用更短的标题。
3. **课程“复习 / 来源”点击目标宽度不足 44 px。** 每页 14 个链接实际为 28×44 px。建议增加 `min-width:44px`，居中短链接文字，保留首入口左对齐。

## 已通过

- 各组合初始显示七门课程，DOM 和视觉顺序一致。
- 搜索“矩阵”均返回三门课程；无匹配输入展示提示，清空后恢复七门。
- 首页切换光学后标题、科学图形、学习入口和选中状态正确；标题获得焦点；开始学习指向 `/study-space/optics-learning.html`。
- 未捕获 JavaScript 页面错误。
- 12 个组合中，document.scrollWidth 均等于视口宽度；移动统计日历在自身容器横向滚动。
- 课程背景与文本色在两种主题下正确；可见正文文本的计算对比检查没有低于 4.5 的项。
- 本轮自有封面、选择、搜索、指南等其他点击目标高度达到 44 px。
- 学习入口在手机首屏可见。

## 证据

- `folio-catalog-audit.json`：布局、入口、搜索、选中状态、JavaScript 错误。
- `folio-contrast-touch-audit.json`：文本对比、44 px 点击目标、各课程 SVG 实测尺寸。
- `home-*-viewport.png` / `courses-*-viewport.png`：首屏截图。
- `home-*-full.png` / `courses-*-full.png`：全页截图。
- `home-*-selected.png`：光学封面切换截图。

初检阶段未改冻结生产代码。收到 root 明确授权后，仅修改 folio-catalog.css 与 courses.md，完成下述三项修复。

## 修复后复核

root 授权后已修复上述三项：目录直出图以高权重选择器限制为桌面 190 px / 手机 160 px；目录标题缩短为“从一门课，展开知识线。”；课程入口链接增加 44 px 最小宽度。

在同一开发服务对 12 个组合，仅针对三项修复重新验证，全部通过。目录七张图实测宽度均为 190 / 160 px；目录标题在所有视口均为两行；每页 21 个课程入口链接的宽高均达到 44 px；页面没有新增横向溢出。视觉复核包括 1440 dark 目录全页、320 light 目录首屏和 390 dark 首页全页。

最终证据为 folio-fix-verification.json；最终截图使用 *-fixed-viewport.png 与 *-fixed-full.png 命名。未带 fixed 的截图和前两份 JSON 保留初检状态，供追溯问题。