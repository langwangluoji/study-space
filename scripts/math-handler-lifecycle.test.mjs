import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createMarkdownRenderer} from 'vitepress';
import {releaseMathHandlers} from './math-handler-lifecycle.mjs';
const require=createRequire(import.meta.url);
const mathRequire=createRequire(require.resolve('markdown-it-mathjax3'));
const {mathjax}=mathRequire('mathjax-full/js/mathjax.js');

test('formula rendering preserves SVG and releases transient MathJax handlers',async()=>{
  const md=await createMarkdownRenderer(process.cwd(),{math:true});
  const expected=md.render('$E=mc^2$\n\n$$R+T=1$$');
  const baseline=[...mathjax.handlers].map(x=>x.item);
  releaseMathHandlers(md);
  assert.equal(md.render('$E=mc^2$\n\n$$R+T=1$$'),expected);
  for(let i=0;i<100;i++)md.render('$E_'+i+'=mc^2$');
  assert.equal([...mathjax.handlers].length,baseline.length);
  for(const [i,{item}] of [...mathjax.handlers].entries())assert.equal(item,baseline[i]);
  for(const handler of baseline)mathjax.handlers.unregister(handler);
});
