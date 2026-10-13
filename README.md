# 课程知识库 · Markdown 维护指南

内容源由 Markdown、Notebook 和 Python 维护，VitePress **1.6.4** 构建，GitHub Pages 基础路径为 `/study-space/`。三讲与实践各保留一张连续阅读的长页。生成页面不手工修改。

## 环境与命令

需要 Node.js 20 或更新的 LTS、npm。首次克隆后运行：

```sh
npm ci
npm run dev
```

开发地址由命令行显示，访问带 `/study-space/` 的路径。以下命令用于交付前检查：

```sh
npm run build
npm run preview
python -m pip install -r requirements-checks.txt
npm run check:math
node scripts/check-ui.cjs
```

`build` 先检查课程配置与缺失片段，生成入口和来源阅读页，再构建并核对内部链接、42 个旧锚点和公式渲染。`check:math` 做 NumPy、中心差分与 PyTorch 自动微分核对，并运行不下载数据的合成 smoke。UI 检查需安装 Playwright 和 Chromium；可用 `PLAYWRIGHT_MODULE` 指向已有模块，`PLAYWRIGHT_CHANNEL=msedge` 使用本机 Edge。

使用已有 Anaconda 环境时先运行 `conda activate pytorch`，再执行 `npm run check:math`；命令使用当前环境的 Python。基础 Python 未安装 PyTorch 时会明确失败，不跳过自动微分核验。

## 内容在哪里编辑

大地测量以两个主章、十个专题组织，使用独立 geodesy.config.json；入口为 docs/course-geodesy.md。完整证明放正文，11 张课件配图保留来源页码并支持放大。运行 pip install -r requirements-geodesy.txt，再运行 python scripts/verify_geodesy.py。现有 UI 验证已覆盖专题、交互、配图与手机主题；原始文件保留本地，六份校验一致的副本接入资料库，PDF支持预览。来源与工作流署名见 docs/geodesy-sources.md。

| 内容 | 唯一维护源 |
| --- | --- |
| 讲次、编号、标题、顺序、源文件 | `course.config.json` |
| 单个知识点与实践说明 | `docs/_fragments/a1.md` 等 42 个片段 |
| 首页、课程路径、资料与核验说明 | `docs/*.md` 中非生成文件 |
| 实践参考代码 | `public/downloads/cifar10_mlp_tutorial.py` |
| Notebook 单元、讲解及练习 | `public/downloads/CIFAR10_MLP_逐步练习.ipynb` |
| 来源文稿 | `public/sources.md` |
| 数学复算 | `public/downloads/rewrite_reference_checks.py` 与 `scripts/verify_*.py` |

`docs/lecture-*.md`、`docs/cifar10-practice.md`、`docs/read-*.md` 和 `docs/_fragments/generated/` 由脚本生成并已忽略。整讲入口通过 Markdown include 组合片段；开发时编辑片段会自动刷新。新增知识点或调整课程配置后重新启动 `npm run dev`。

`public/` 仅维护静态文件，构建时复制到网站根路径；教材、课件、历史结果、下载与 `MISSION.md` 不改名。大地原资料副本位于 `public/geodesy/materials/`，公开清单只保留原文件名、大小和 SHA-256，不包含本地路径。不往其中添加手写 HTML 正文或搜索索引。

## 新增课程与知识点

### 学习空间入口与资源清单

首页、课程目录使用 `study-space.config.json`；站点公开目录 `public/course-catalog.json` 在构建时同步生成，覆盖机器学习与大地测量。课程记录包含稳定 `id`、标题、范围、入口 `entry`、起点 `start` 与来源 `source`。这些链接必须指向已提供的正文，不把未完成范围写成已完成。

资源中心使用 `resources.config.json`，每条包含唯一 `id`、所属 `course`、`type`、`title`、`author`、`description`、`preview`、`format`。可下载文件使用 `file`，可选 PDF 使用 `alternate`；外部下载使用 `external`，作者项目使用 `source`，版本发布页使用 `release`；尚未公开的原件只设 `localOnly: true`，不能同时提供下载字段。站内路径从 `/` 开始，构建自动加入 GitHub Pages 基础路径；原件放在 `public/`。生成器检查预览及下载文件、归属、重复 ID 和公开状态，并从实际文件获取大小，从已有 PDF 核对记录读取页数。不要手工修改生成的 `public/resources-catalog.json`。需要生成原件阅读页时设置 `reader: "pdf"` 或 `reader: "file"`，并提供 `file` 与唯一 `preview` 页面地址；生成页随清单更新，课程返回链接由所属课程清单取得。大地原件以 `materialId` 连接公开校验清单。

资料新增只需更新清单和实际文件，再运行 `npm run build`。章节修订保持旧锚点，更新来源与范围。新增第三门课程可先运行 `node scripts/add-course.mjs --slug remote-sensing --title 遥感基础` 创建课程入口、首章与来源模板；填入实际内容、修订状态与来源后再发布。新课程默认使用 `<slug>-` 章节前缀，导航自动按前缀匹配；需要更多章节时更新清单中的 `chapters`。这个命令不会读取或上传本地私人资料，不会生成经过核验的知识正文。

### 机器学习讲次与知识点

在 `course.config.json` 新增讲次或知识点记录，包含 `slug`、`title`、`sections`；每个 section 指定唯一 `id`、`title`、`source`。按配置顺序生成长页，左侧导航同步生成，搜索自动检索渲染后的正文。

没有阅读分组时，片段首行写 `## 标题 {#p1}`；三讲均使用 `### 标题 {#a1}`，片段内的小标题使用四级标题。首行标题与配置保持一致；二、三级标题进入右侧大纲。旧的 `a1–a15`、`b1–b6`、`c1–c5`、`p0–p15` 锚点不得删除或改名。片段不单独生成网页。

可在讲次配置中添加 `intro` 与 `parts`：每个 part 包含唯一 `id`、`title`、过渡文字 `intro` 和按原顺序排列的 `sections` 编号。分组必须恰好覆盖所有知识点，生成器会拒绝遗漏、重复或乱序。分组标题成为二级标题，侧栏按分组折叠；学习标记集中在讲末的附加框中，继续使用原存储键。知识点编号用于维护与定位，不必成为正文里的显眼编号。

写作时先提出当前问题，再解释新术语和符号，随后逐行推导；不要在一个等式中同时引入多个未知概念。长证明可以放进“进一步推导”附加框，但结论的假设、边界与适用条件必须在正文可见。首页维护全站课程与资料入口，单门课程的讲次目录放在课程页。

实践页通过 `practice-code.config.json` 选择脚本函数或类，构建时从源代码提取对照片段；不要手工复制第二份实现。代码阅读页同样自动从下载文件生成。Notebook 读取时按原单元顺序渲染，不执行 Notebook。

## 数学与附加框

行内公式使用 `$...$`；独立公式使用单独一行的 `$$` 开始和结束。矩阵保留 TeX 的 `&` 列分隔与 `\\` 行换行。不要将 TeX 写成 HTML 实体，也不要给代码块批量替换反斜线。

统一每样本平均损失、残差“预测减目标”，单样本网络用列向量，批量样本按行。符号先定义、维度先注明，求和时说清固定下标与遍历下标。必要假设、边界和损失尺度放正文。

数字算例、手算、练习及可选代码用下列附加框，标签后的空行不能省略：

```md
<details><summary>附加算例｜标题</summary>

### 算例标题 {#unique-example}

这里写可检索的补充内容和公式。

</details>
```

标题给出可定位锚点；从搜索结果或旧链接跳入框内时，主题会展开所有祖先附加框。互动图用 `<ConceptViz id="a6" />`，放在附加框里，由 Vue 生命周期管理尺寸和主题监听。

## 构建与发布

PR 仅构建与验证，不部署。只有 `main` 的 push 执行 GitHub Pages 部署，发布目录为 `docs/.vitepress/dist`。草稿 PR 不触发正式发布。预览使用 `npm run preview`，无需更改 Pages 设置。

主题只加载 VitePress 扩展变量，保留蓝色、深浅主题与衬线正文。旧的 `ml-course-theme` 会在首次迁移时读入；已读与掌握分别继续用 `ml-course-progress-v1`、`ml-course-mastery-v1`，不会清空旧记录。

## 原始资料与核验边界

教材与教师 PPT/PDF、已有 `verified-results/` 保持原样。本次迁移不重新训练 CIFAR-10。历史 quick run 仅证明当时的代码流程，不能作为完整实验性能。教师课件为课程范围依据，网页补足解释与核对；原课件勘误在正文注明，不修改课件文件。

复算记录见 [核验记录](verification.html)，教材版本与原路径见 [来源说明](read-sources.html)。
