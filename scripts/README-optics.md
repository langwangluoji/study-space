# 光学内容维护

正文的编辑源是本地 `光学期中复习` Obsidian 仓库。五个学习章使用 Markdown 标题组织概念、条件、公式、例题及推导；网站与下载包由同一份正文导出。

```powershell
python scripts/sync-optics.py --vault "光学期中复习的绝对目录"
python scripts/package-optics.py
npm run build
python scripts/test_optics_content.py
python scripts/verify_optics.py
node scripts/check-optics-learning.cjs
```

`sync-optics.py` 更新五个学习章、总入口、学习导读和来源页；复习版和原有公式/习题参考页沿用已发布内容。修改这些参考页时同步维护本地对应笔记。

详细推导或答案在本地使用以下标记，标记内保留原生 Markdown：

```markdown
<!-- optics-detail:start -->
#### 详细推导：往返增益

逐步解释与可编辑公式。

<!-- optics-detail:end -->
```

网站导出时把正文转换为原生 `details`；标题与命名锚点保持在折叠区外。离线包恢复标准 Markdown 标题，并将网页片段链接转换为 Obsidian 标题链接。标记区不嵌套。

插图放在笔记仓库的 `assets/ppt` 下，来源清单为同目录的 `figures.json`。每项保存 `file`、`sourcePdf`、`pdfPage`、`cropPixels`、`learningPage`；新增裁图另保存渲染尺寸 `renderSize`。导出计算实际字节数和 SHA256，并保留来源字段。原 PDF 文件不进入下载包。

`optics-learning-source-map.json` 记录六课件的257个逐页去向及真实学习标题；`optics-legacy-anchors.json` 保留384个历史锚点。不要使用早期一次性迁移脚本覆盖新正文。重复导出与打包应得到相同字节。

浏览器检查覆盖390、1024、1440像素的深浅模式、数学排版、图片、展开操作、来源跳转和历史链接。本地可用 `PLAYWRIGHT_CHANNEL=msedge` 使用已安装的 Edge；CI 使用 Playwright Chromium。
