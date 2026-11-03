import test from 'node:test';
import assert from 'node:assert/strict';
import { compileNote, portableDetails, readNote } from './geodesy-publish.mjs';

test('Obsidian note retains formulas, explicit legacy anchors and portable links', () => {
  const input = '---\ntitle: "坐标"\nslug: geodesy-example\nchapter: 5\norder: 1\nsources: [S10]\n---\n# 坐标\n\n## 检核 {#legacy}\n\n$$\nX=a\\cos B\n$$\n\n[反算](geodesy-inverse.md#inverse)\n\n![图](../assets/figures/lab-inverse.svg)';
  const parsed = readNote(input);
  assert.equal(parsed.data.slug, 'geodesy-example');
  assert.deepEqual(parsed.data.sources, ['S10']);
  const out = compileNote(input, { slugs: new Set(['geodesy-example', 'geodesy-inverse']) });
  assert.match(out, /X=a\\cos B/);
  assert.match(out, /\{#legacy\}/);
  assert.match(out, /geodesy-inverse\.html#inverse/);
  assert.match(out, /\/geodesy\/figures\/lab-inverse.svg/);
});

test('folded derivations have matching local callout and searchable website details', () => {
  const note = portableDetails('<details><summary>进一步推导</summary>\n\n## 证明 {#proof}\n\n$$\na=b\n$$\n\n</details>');
  assert.match(note, /> \[!info\]- 进一步推导/);
  assert.doesNotMatch(note, /<details>/);
  const out = compileNote('---\nslug: geodesy-proof\n---\n'+note);
  assert.match(out, /<details><summary>进一步推导<\/summary>/);
  assert.match(out, /## 证明 \{#proof\}/);
  assert.match(out, /\n\$\$\na=b\n\$\$/);
});

test('private local source links are descriptive text in public output', () => {
  const out = compileNote('---\nslug: geodesy-local\n---\n[原始资料](../../../../大地测量/课件/讲义.pdf)');
  assert.doesNotMatch(out, /href|\]\(.*\.pdf\)/);
  assert.match(out, /原始资料.*本地原件/);
});

test('interactive directive uses static poster and preserves learning-mark identity', () => {
  const out = compileNote('---\nslug: geodesy-figure\n---\n<!-- geodesy-interactive: blh-xyz | 坐标转换 | lab-blh-xyz.svg -->\n\n<!-- learning-mark: ge-old-key -->');
  assert.match(out, /<AnatomyFigure/);
  assert.match(out, /\/geodesy\/interactive\/blh-xyz.html/);
  assert.match(out, /poster="\/geodesy\/figures\/lab-blh-xyz.svg"/);
  assert.match(out, /section="ge-old-key"/);
});

test('source figure replacement preserves all following proofs and examples with CRLF input', () => {
  const input = '---\r\nslug: geodesy-source-test\r\n---\r\n# Before\r\n\r\n<!-- source-figure: {"src":"/geodesy/figures/test.svg","alt":"截面","source":"讲义","page":"2"} -->\r\n![截面](../assets/figures/test.svg)\r\n\r\n讲义，文件页2。\r\n<!-- /source-figure -->\r\n\r\n## 保留证明\r\n\r\n$$\r\na=b\r\n$$\r\n\r\n## 完整例题\r\n\r\n<!-- learning-mark: preserved -->';
  const out = compileNote(input);
  assert.match(out, /<SourceFigure/);
  assert.match(out, /## 保留证明/);
  assert.match(out, /## 完整例题/);
  assert.match(out, /section="preserved"/);
});

test('native Obsidian heading links publish to preserved legacy website anchors', () => {
  const input = '---\nslug: geodesy-math\n---\n<!-- geodesy-anchor: first-fundamental-form -->\n## 第一基本形式\n\n[度量](geodesy-math.md#%E7%AC%AC%E4%B8%80%E5%9F%BA%E6%9C%AC%E5%BD%A2%E5%BC%8F)';
  const out = compileNote(input, {slugs: new Set(['geodesy-math']), anchors: {'geodesy-math': {'第一基本形式': 'first-fundamental-form'}}});
  assert.match(out, /## 第一基本形式 \{#first-fundamental-form\}/);
  assert.match(out, /geodesy-math.html#first-fundamental-form/);
});

test('local per-source coverage maps publish under the course asset directory', () => {
  const out = compileNote('---\nslug: geodesy-map\n---\n[逐页映射](../orbit-source-map.json)\n[坐标映射](../coordinate-source-map.json)');
  assert.match(out, /\]\(\/geodesy\/orbit-source-map.json\)/);
  assert.match(out, /\]\(\/geodesy\/coordinate-source-map.json\)/);
});

test('website enhances a local static diagram without displaying a duplicate image', () => {
  const source = '---\nslug: geodesy-lab\n---\n![法线图](../assets/figures/lab-inverse.svg)\n\n<!-- geodesy-interactive: inverse | 法线反解 | lab-inverse.svg -->';
  const out = compileNote(source);
  assert.doesNotMatch(out, /!\[法线图\]/);
  assert.match(out, /<AnatomyFigure.*:height="1100"/);
  assert.match(out, /poster="\/geodesy\/figures\/lab-inverse.svg"/);
});
