import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const mathRequire=createRequire(require.resolve('markdown-it-mathjax3'));
const {mathjax}=mathRequire('mathjax-full/js/mathjax.js');

// markdown-it-mathjax3 registers a fresh HTML handler for every formula.
// Its rendered SVG is self-contained; release only that call's handlers so a
// long course build does not retain every temporary adaptor and document.
export function releaseMathHandlers(md) {
  for(const name of ['math_inline','math_block']){
    const render=md.renderer.rules[name];
    md.renderer.rules[name]=function(...args){
      const existing=new Set([...mathjax.handlers].map(x=>x.item));
      try{return render.apply(this,args)}
      finally{
        for(const {item} of [...mathjax.handlers]){
          if(!existing.has(item))mathjax.handlers.unregister(item);
        }
      }
    };
  }
}
