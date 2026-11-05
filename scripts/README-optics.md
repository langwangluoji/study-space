# 光学内容维护

正文的编辑源是本地 `光学期中复习` Obsidian 仓库。按 PPT 第1—9章建立文件夹，34个二级小节各为一篇笔记，三级节号保留为篇内标题。每章的总览与思考题、学习小节、本章复习分别维护；网站与下载包由同一份正文导出。

```powershell
python scripts/sync-optics.py --vault "光学期中复习的绝对目录"
python scripts/package-optics.py
npm run build
python scripts/test_optics_content.py
python scripts/test_optics_course.py
python scripts/verify_optics.py
python scripts/verify_optics_course.py
node scripts/check-optics-learning.cjs
```

`sync-optics.py` 读取本地 `课程目录.json`、`课件逐页对应.json`，调用 `optics_course.py` 更新九章学习与复习页、总入口、学习导读及来源页。可移植正文快照保存在 `knowledge/optics/lessons`，`course.json` 记录全部导出页与原课件哈希；在没有本地知识库的机器上，`package-optics.py` 可直接据此重建下载包。新小节应同时维护目录、逐页来源和插图来源，不能只新增网页。

旧五主题长文保留原地址；本地旧笔记存于 `参考与旧版`。首次迁移脚本位于本地 `tmp/chapters_20261105`，后续维护使用上面的同步命令，勿重跑迁移覆盖新正文。

详细推导或答案在本地使用以下标记，标记内保留原生 Markdown：

```markdown
<!-- optics-detail:start -->
#### 详细推导：往返增益

逐步解释与可编辑公式。

<!-- optics-detail:end -->
```

网站导出时把正文转换为原生 `details`；标题与命名锚点保持在折叠区外。离线包恢复标准 Markdown 标题，并将网页片段链接转换为 Obsidian 标题链接。标记区不嵌套。

插图放在笔记仓库的 `assets/ppt` 下，来源清单为同目录的 `figures.json`。每项保存 `file`、`sourcePdf`、`pdfPage`、`cropPixels`、`learningPage`；新增裁图另保存渲染尺寸 `renderSize`。导出计算实际字节数和 SHA256，并保留来源字段。原 PDF 文件不进入下载包。

`optics-course-sources.json` 记录7份课件332页的编号小节去向，`optics.config.json` 生成九章导航，`optics-figures.json` 保存118幅课件图的来源。`optics-learning-source-map.json` 保留旧五主题的257页映射以兼容历史文章；`optics-legacy-anchors.json` 保留384个历史锚点。重复导出与打包应得到相同字节。校验器另核查54道章末问题、源图哈希、离线内部链接及131组界面/偏振数值关系。

浏览器检查覆盖390、1024、1440像素的深浅模式、数学排版、图片、展开操作、来源跳转和历史链接。本地可用 `PLAYWRIGHT_CHANNEL=msedge` 使用已安装的 Edge；CI 使用 Playwright Chromium。
