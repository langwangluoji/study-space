import fs from 'node:fs';
import {createMarkdownRenderer} from 'vitepress';
const md=await createMarkdownRenderer(process.cwd(),{math:true});
const files=['course-remote-sensing','remote-sensing-ch1','remote-sensing-ch2','remote-sensing-ch3','remote-sensing-ch4','remote-sensing-glossary','remote-sensing-sources'];
const report=[];
for(const slug of files){
 const src=fs.readFileSync('docs/'+slug+'.md','utf8');const tokens=md.parse(src,{});const errors=[];let formulas=0;
 function walk(list){for(const t of list){if(t.type==='math_inline'||t.type==='math_block'){formulas++;try{const html=md.renderer.render([t],md.options,{});if(/data-mjx-error|<merror/.test(html))errors.push({formula:t.content,error:'Math rendering error'})}catch(e){errors.push({formula:t.content,error:e.message})}}if(t.children)walk(t.children)}}walk(tokens);
 if(errors.length){console.log(JSON.stringify({slug,errors}));process.exitCode=1;continue}
 const html=md.render(src,{});const ids=[...html.matchAll(/id="(rs[^"]*)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw Error('Duplicate concept IDs: '+slug);
 const zh=(src.match(/data-rs-lang="zh"/g)||[]).length,en=(src.match(/data-rs-lang="en"/g)||[]).length;if(zh!==en)throw Error('Language blocks mismatch: '+slug);
 report.push({slug,formulas,concepts:ids.length,languagePairs:zh,bytes:Buffer.byteLength(src)});
}
if(!process.exitCode){fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/remote-sensing-content.json',JSON.stringify({status:'PASS',pages:report},null,2)+'\n');console.log(JSON.stringify(report))}
