import fs from 'node:fs';
const figures=JSON.parse(fs.readFileSync('public/remote-sensing/textbook-figures/manifest.json','utf8')).figures;
for(let chapter=1;chapter<=4;chapter++){
  const path='docs/remote-sensing-ch'+chapter+'.md';
  let src=fs.readFileSync(path,'utf8');
  const anchors=[...new Set(figures.filter(f=>f.target_anchor.startsWith('rs'+chapter+'-')).map(f=>f.target_anchor))];
  for(const anchor of anchors){
    const marker='textbook-figures-'+anchor;
    src=src.replace(new RegExp('<!-- '+marker+':start -->[\\s\\S]*?<!-- '+marker+':end -->\\s*','g'),'');
    const heading=src.match(new RegExp('^## [^\\n]*\\{#'+anchor+'\\}[^\\n]*','m'))?.[0];
    if(!heading)throw Error('Figure placement anchor missing: '+anchor);
    const block=['<!-- '+marker+':start -->',...figures.filter(f=>f.target_anchor===anchor).map(f=>'<RsFigure id="'+f.id+'" />'),'<!-- '+marker+':end -->'].join('\n\n');
    src=src.replace(heading,heading+'\n\n'+block+'\n');
  }
  fs.writeFileSync(path,src);
}
console.log('Integrated '+figures.length+' original textbook figures in four chapters.');
