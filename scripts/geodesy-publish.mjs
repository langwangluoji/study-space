import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Course metadata uses scalar fields and one-line arrays, not executable YAML.
export function readNote(source) {
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const data = {};
  if (match) for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([\w-]+):\s*(.*)$/);
    if (!item) continue;
    const [, key, value] = item;
    try { data[key] = JSON.parse(value); }
    catch { data[key] = value.startsWith('[') ? value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '')) : value.replace(/^['"]|['"]$/g, ''); }
  }
  return { data, body: match ? source.slice(match[0].length) : source };
}

export function portableDetails(source) {
  let previous;
  do {
    previous = source;
    source = source.replace(/<details[^>]*>\s*<summary>([^<]*)<\/summary>([\s\S]*?)<\/details>/g,
      (_, title, body) => '> [!info]- ' + title.trim() + '\n' + body.trim().split('\n').map(line => line ? '> ' + line : '>').join('\n') + '\n');
  } while (source !== previous);
  return source;
}

export function compileNote(source, { slugs = new Set(), anchors = {}, prev, next } = {}) {
  const { data, body } = readNote(source);
  let text = body.replace(/\r\n/g, '\n');
  // Obsidian callouts keep the same proofs readable and collapsible offline.
  text = text.replace(/^> \[!\w+\]([+-]?)\s*([^\n]*)\n((?:>[^\n]*(?:\n|$))*)/gm, (_, fold, title, quoted) => {
    const inner = quoted.split('\n').map(line => line.replace(/^> ?/, '')).join('\n');
    return fold ? `<details${fold === '+' ? ' open' : ''}><summary>${title}</summary>\n\n${inner}\n</details>\n` : `::: info ${title}\n${inner}\n:::\n`;
  });
  text = text.replace(/<!-- geodesy-anchor: ([\w-]+) -->\n(#{1,6} [^\n]+)/g, '$2 {#$1}');
  text = text.replace(/\]\((?:\.\.\/)?(?:lessons\/)?([\w-]+)\.md(#[^)]*)?\)/g,
    (all, slug, hash = '') => {
      if (!slugs.has(slug)) return all;
      const heading = hash ? decodeURIComponent(hash.slice(1)) : '';
      return `](${slug}.html${anchors[slug]?.[heading] ? '#' + anchors[slug][heading] : hash})`;
    });
  text = text.replace(/\]\(\.\.\/assets\/figures\/([^)]*)\)/g, '](/geodesy/figures/$1)');
  text = text.replace(/\]\(\.\.\/assets\/interactive\/([^)]*)\)/g, '](/geodesy/interactive/$1)');
  text = text.replace(/\]\(\.\.\/(coverage|course-sources|orbit-source-map|coordinate-source-map)\.json\)/g, '](/geodesy/$1.json)');
  text = text.replace(/\]\(\.\.\/data\/([^)]*)\)/g, '](/geodesy/data/$1)');
  // Keep the poster in Obsidian; enhance that same illustration on the website.
  text = text.replace(/!\[[^\]]*\]\(\/geodesy\/figures\/[^)]+\)\s*(?=<!-- (?:geodesy-interactive|anatomy-interactive):)/g, '');
  text = text.replace(/\[([^\]]+)\]\((?:\.\.\/){2,}[^)]*\.(?:pdf|pptx|docx)(?:#[^)]*)?\)/gi, '$1（本地原件，见知识库来源索引）');
  text = text.replace(/<!-- geodesy-interactive: ([\w-]+)\s*\|\s*([^|]+)\|\s*([^>]+) -->/g,
    (_, mode, title, poster) => `<AnatomyFigure src="/geodesy/interactive/${mode}.html" title="${title.trim()}" :height="1100" poster="/geodesy/figures/${poster.trim()}" />`);
  text = text.replace(/<!-- anatomy-interactive: ([^|]+)\|\s*([^|]+)\|\s*([^>]+) -->/g,
    (_, src, title, poster) => `<AnatomyFigure src="${src.trim()}" title="${title.trim()}" poster="/geodesy/figures/${poster.trim()}" />`);
  text = text.replace(/<!-- learning-mark: ([\w-]+) -->/g, '<LearningMark section="$1" />');
  text = text.replace(/<!-- legacy-lab: (ellipsoid|rotation) -->/g, '<GeodesyLab mode="$1" />');
  text = text.replace(/<!-- source-figure: (.+?) -->[\s\S]*?<!-- \/source-figure -->/g, (_, json) => {
    const figure = JSON.parse(json);
    const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
    return '<SourceFigure ' + Object.entries(figure).map(([key, value]) => value === true ? key : `${key}="${escape(value)}"`).join(' ') + ' />';
  });
  const title = data.title ?? text.match(/^# (.+)$/m)?.[1] ?? data.slug;
  return `---\ntitle: ${JSON.stringify(title)}\nprev: ${JSON.stringify(prev ?? false)}\nnext: ${JSON.stringify(next ?? false)}\n---\n\n<!-- Generated from knowledge/geodesy/lessons/${data.slug}.md; edit the Obsidian source. -->\n\n${text.trim()}\n`;
}

export function generateGeodesy(root = process.cwd()) {
  const vault = path.join(root, 'knowledge/geodesy');
  const notes = fs.readdirSync(path.join(vault, 'lessons')).filter(n => n.endsWith('.md')).map(name => {
    const source = fs.readFileSync(path.join(vault, 'lessons', name), 'utf8').replace(/\r\n/g, '\n');
    const { data } = readNote(source);
    if (!/^(?:geodesy-|course-geodesy$|review-geodesy$)/.test(data.slug ?? '')) throw Error('Invalid course slug: ' + name);
    return { source, ...data };
  });
  const slugs = new Set(notes.map(n => n.slug));
  const anchors = Object.fromEntries(notes.map(note => [note.slug, Object.fromEntries([...note.source.replace(/^> ?/gm, '').matchAll(/<!-- geodesy-anchor: ([\w-]+) -->\n#{1,6} ([^\n]+)/g)].map(m => [m[2].trim(), m[1]]))]));
  if (slugs.size !== notes.length) throw Error('Duplicate geodesy page slug');
  const chapters = [...new Set(notes.filter(n => n.chapter > 0).map(n => Number(n.chapter)))].sort((a,b) => a-b).map(number => {
    const group = notes.filter(n => Number(n.chapter) === number).sort((a,b) => Number(a.order)-Number(b.order));
    const landing = group.find(n => Number(n.order) === 0);
    if (!landing) throw Error('Missing chapter landing: ' + number);
    return { slug: landing.slug, title: landing.title, topics: group.filter(n => n !== landing).map(n => ({ slug: n.slug, title: n.title })) };
  });
  const reading = ['course-geodesy', ...chapters.flatMap(c => [c.slug, ...c.topics.map(t => t.slug)])];
  const link = slug => ({ text: notes.find(n => n.slug === slug).title, link: '/' + slug });
  for (const note of notes) {
    const at = reading.indexOf(note.slug);
    const options = { slugs, anchors, prev: at > 0 ? link(reading[at-1]) : false, next: at >= 0 && at < reading.length-1 ? link(reading[at+1]) : false };
    fs.writeFileSync(path.join(root, 'docs', note.slug + '.md'), compileNote(note.source, options));
  }
  fs.writeFileSync(path.join(root, 'geodesy.config.json'), JSON.stringify(chapters, null, 2) + '\n');
  const figures = path.join(vault, 'assets/figures');
  if (fs.existsSync(figures)) fs.cpSync(figures, path.join(root, 'public/geodesy/figures'), { recursive: true });
  const localInteractive = path.join(vault, 'assets/interactive');
  if (fs.existsSync(localInteractive)) fs.cpSync(localInteractive, path.join(root, 'public/geodesy/interactive'), { recursive: true });
  const data = path.join(vault, 'data');
  if (fs.existsSync(data)) fs.cpSync(data, path.join(root, 'public/geodesy/data'), { recursive: true });
  for (const name of ['coverage.json', 'course-sources.json', 'orbit-source-map.json', 'coordinate-source-map.json']) fs.copyFileSync(path.join(vault, name), path.join(root, 'public/geodesy', name));
  const report = { status: 'PASS', source: 'knowledge/geodesy/lessons', pages: notes.length, chapters: chapters.length, topics: chapters.reduce((s,c) => s+c.topics.length,0), slugs: [...slugs].sort() };
  fs.writeFileSync(path.join(root, 'reports/geodesy-publishing.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Geodesy: ${notes.length} same-source pages, ${chapters.length} chapters, ${report.topics} topics`);
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateGeodesy();
