import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {outlineLifecycleGuard} from '../../scripts/outline-lifecycle.mjs';
const courses=JSON.parse(fs.readFileSync(new URL('../../course.config.json',import.meta.url),'utf8'));
const geodesy=JSON.parse(fs.readFileSync(new URL('../../geodesy.config.json',import.meta.url),'utf8'));
const space=JSON.parse(fs.readFileSync(new URL('../../study-space.config.json',import.meta.url),'utf8'));
const resources=JSON.parse(fs.readFileSync(new URL('../../resources.config.json',import.meta.url),'utf8'));
const geodesySidebar=[{text:'大地测量',items:[{text:'课程总览',link:'/course-geodesy'}]},...geodesy.map(c=>({text:c.title,link:'/'+c.slug,collapsed:false,items:c.topics.map(t=>({text:t.title,link:'/'+t.slug}))})),{text:'辅助资料',collapsed:true,items:[{text:'坐标旋转说明',link:'/geodesy-rotation'},{text:'资料来源与图像索引',link:'/geodesy-sources'},{text:'课程维护方案',link:'/geodesy-plan'}]}];
const chapterItems=c=>c.parts?.length?c.parts.map(p=>({text:p.title,link:'/'+c.slug+'.html#'+p.id,collapsed:true,items:p.sections.map(id=>{const s=c.sections.find(s=>s.id===id);return {text:s.title,link:'/'+c.slug+'.html#'+id}})})):c.sections.map(s=>({text:s.title,link:'/'+c.slug+'.html#'+s.id}));
const mlTitle=space.courses.find(c=>c.id==='ml').title;
const mlSidebar=[{text:mlTitle,items:[{text:'课程总览',link:'/course-ml'},{text:'期末关键页',link:'/review-ml'}]},...courses.map(c=>({text:c.title,collapsed:true,items:[{text:'连续阅读整讲',link:'/'+c.slug},...chapterItems(c)]})),{text:'课程资料',items:[{text:'教材与课件',link:'/resources#ml'},{text:'来源说明',link:'/read-sources'}]}];
// A course owns one resource group. Original files and curated readers share
// the same catalog, so later material additions cannot create a second library.
const resourceGroups={
  ml:[['课程课件',['课件']],['教材与参考书',['教材','参考教材']],['实践与代码',['代码']],['来源索引',['来源索引']]],
  geodesy:[['课程课件',['课件']],['辅助资料',['辅助资料']],['教材与参考书',['教材','参考教材']],['来源索引',['来源索引']]],
  insar:[['课程课件',['课件']],['教材与参考书',['教材','参考教材']],['整理讲义',['讲义']]],
  'remote-sensing':[['课件与汇总',['课件']],['课程笔记与调研',['课程笔记','调研资料']],['参考教材',['教材','参考教材']]]
};
resourceGroups.optimization=[['教材与导读',['教材','参考教材']],['可复现代码',['代码']]];
const resourceNames={ml:mlTitle+'资料',geodesy:'大地测量资料',insar:'InSAR 资料','remote-sensing':'遥感资料'};
const resourceSidebar=[{text:'资料中心',items:[{text:'全部资源',link:'/resources'},{text:'教材与延伸阅读',link:'/textbooks'}]},...space.courses.map(c=>{
  const entries=resources.filter(r=>r.course===c.id),used=new Set();
  const items=(resourceGroups[c.id]??[]).flatMap(([text,types])=>{
    const selected=entries.filter(r=>types.includes(r.type));
    selected.forEach(r=>used.add(r.id));
    return selected.length?[{text,collapsed:true,items:selected.map(r=>({text:r.title,link:r.preview}))}]:[];
  });
  const remaining=entries.filter(r=>!used.has(r.id));
  if(remaining.length)items.push({text:'其他资料',collapsed:true,items:remaining.map(r=>({text:r.title,link:r.preview}))});
  if(c.id==='remote-sensing')items.push({text:'双语术语与概念对照',link:'/remote-sensing-glossary'});
  if(!entries.some(r=>r.preview===c.source))items.push({text:c.id==='remote-sensing'?'原资料、讲义图与勘误':'来源与配图索引',link:c.source});
  return {text:resourceNames[c.id]??c.title+'资料',collapsed:true,items};
})];
const spaceSidebar=[{text:'学习空间',items:[{text:'课程目录',link:'/courses'},{text:'自学路线',link:'/study-guide'},{text:'期末复习',link:'/review-guide'},{text:'资料中心',link:'/resources'}]},{text:'共建与维护',items:[{text:'知识库共建',link:'/contribute'},{text:'详细维护指南',link:'/read-README'},{text:'内容核验记录',link:'/verification'}]}];
const sidebar={'/':spaceSidebar,'/geodesy-':geodesySidebar,'/course-geodesy':geodesySidebar};
resourceSidebar[0].items.push({text:'资料扩展与阅读建议',link:'/extensions'},{text:'下载与使用帮助',link:'/site-guide#downloads'});
spaceSidebar[0].items.push({text:'资料扩展',link:'/extensions'},{text:'使用说明',link:'/site-guide'});
spaceSidebar[1].items.unshift({text:'制作者主页',link:'/about'});
spaceSidebar[1].items.push({text:'内容更新记录',link:'/updates'});
for(const prefix of ['/course-ml','/lecture-','/cifar10-practice'])sidebar[prefix]=mlSidebar;
for(const prefix of ['/resources','/extensions','/textbooks','/book-','/slides-','/material-','/read-sources','/read-notebook','/read-downloads-','/geodesy-source','/insar-sources','/remote-sensing-sources','/remote-sensing-glossary'])sidebar[prefix]=resourceSidebar;
for(const c of space.courses.filter(c=>!['ml','geodesy'].includes(c.id))){
  const extra=c.id==='remote-sensing'?[{text:'双语术语与概念对照',link:'/remote-sensing-glossary'}]:[];
  const navigation=[{text:c.title,items:[{text:'课程总览',link:c.entry},...(c.chapters??[]).map(ch=>({text:ch.title,link:'/'+ch.slug})),...extra,{text:'资料来源',link:c.source}]}];
  sidebar['/course-'+c.id]=navigation;sidebar['/'+c.id+'-']=navigation;
}
const optimizationSidebar=[{text:'最优化 · 双教材',items:[{text:'完整目录',link:'/course-optimization'}]},{text:'Boyd · Convex Optimization',collapsed:false,items:[{"text":"第1章 · Introduction · 引言","link":"/optimization-bv-01"},{"text":"第2章 · Convex sets · 凸集","link":"/optimization-bv-02"},{"text":"第3章 · Convex functions · 凸函数","link":"/optimization-bv-03"},{"text":"第4章 · Convex optimization problems · 凸优化问题","link":"/optimization-bv-04"},{"text":"第5章 · Duality · 对偶","link":"/optimization-bv-05"},{"text":"第6章 · Approximation and fitting · 逼近与拟合","link":"/optimization-bv-06"},{"text":"第7章 · Statistical estimation · 统计估计","link":"/optimization-bv-07"},{"text":"第8章 · Geometric problems · 几何问题","link":"/optimization-bv-08"},{"text":"第9章 · Unconstrained minimization · 无约束极小化","link":"/optimization-bv-09"},{"text":"第10章 · Equality constrained minimization · 等式约束极小化","link":"/optimization-bv-10"},{"text":"第11章 · Interior-point methods · 内点法","link":"/optimization-bv-11"}]},{text:'Nocedal–Wright · Numerical Optimization',collapsed:true,items:[{"text":"第1章 · Introduction · 引言","link":"/optimization-nw-01"},{"text":"第2章 · Fundamentals of Unconstrained Optimization · 无约束基础","link":"/optimization-nw-02"},{"text":"第3章 · Line Search Methods · 线搜索","link":"/optimization-nw-03"},{"text":"第4章 · Trust-Region Methods · 信赖域","link":"/optimization-nw-04"},{"text":"第5章 · Conjugate Gradient Methods · 共轭梯度","link":"/optimization-nw-05"},{"text":"第6章 · Quasi-Newton Methods · 拟牛顿","link":"/optimization-nw-06"},{"text":"第7章 · Large-Scale Unconstrained Optimization · 大规模优化","link":"/optimization-nw-07"},{"text":"第8章 · Calculating Derivatives · 导数计算","link":"/optimization-nw-08"},{"text":"第9章 · Derivative-Free Optimization · 无导数优化","link":"/optimization-nw-09"},{"text":"第10章 · Least-Squares Problems · 最小二乘","link":"/optimization-nw-10"},{"text":"第11章 · Nonlinear Equations · 非线性方程","link":"/optimization-nw-11"},{"text":"第12章 · Theory of Constrained Optimization · 约束理论","link":"/optimization-nw-12"},{"text":"第13章 · Linear Programming: The Simplex Method · LP单纯形法","link":"/optimization-nw-13"},{"text":"第14章 · Linear Programming: Interior-Point Methods · LP内点法","link":"/optimization-nw-14"},{"text":"第15章 · Fundamentals of Algorithms for Nonlinear Constrained Optimization · 约束算法基础","link":"/optimization-nw-15"},{"text":"第16章 · Quadratic Programming · 二次规划","link":"/optimization-nw-16"},{"text":"第17章 · Penalty and Augmented Lagrangian Methods · 罚与增广拉格朗日","link":"/optimization-nw-17"},{"text":"第18章 · Sequential Quadratic Programming · SQP","link":"/optimization-nw-18"},{"text":"第19章 · Interior-Point Methods for Nonlinear Programming · 非线性内点法","link":"/optimization-nw-19"}]},{text:'阅读辅助',collapsed:true,items:[{text:'原书、页码与校验范围',link:'/optimization-sources'},{text:'英文阅读辅助',link:'/optimization-reading'},{text:'数学概念随用随查',link:'/optimization-prerequisites'}]}];
optimizationSidebar[1].items.push(...[{"text":"BV 附录A · 数学背景","link":"/optimization-bv-a"},{"text":"BV 附录B · 两个二次函数的问题","link":"/optimization-bv-b"},{"text":"BV 附录C · 数值线性代数","link":"/optimization-bv-c"}]);
optimizationSidebar[2].items.push(...[{"text":"NW 附录A · 基础材料","link":"/optimization-nw-a"},{"text":"NW 附录B · 正则化过程","link":"/optimization-nw-b"}]);
sidebar['/course-optimization']=optimizationSidebar;sidebar['/optimization-']=optimizationSidebar;
sidebar['/optimization-bv-']=[optimizationSidebar[0],optimizationSidebar[1],{text:'另一本教材',items:[{text:'Numerical Optimization 目录',link:'/course-optimization#numerical-optimization-·-nocedal-wright'}]},optimizationSidebar[3]];
sidebar['/optimization-nw-']=[optimizationSidebar[0],{...optimizationSidebar[2],collapsed:false},{text:'另一本教材',items:[{text:'Convex Optimization 目录',link:'/course-optimization#convex-optimization-·-boyd-vandenberghe'}]},optimizationSidebar[3]];
for(const c of space.courses){
 const courseNav=sidebar['/course-'+c.id];
 const items=courseNav?.[0]?.items;
 if(items&&!items.some(i=>i.link==='/review-'+c.id))items.push({text:c.id==='optics'?'复习关键页':'期末关键页',link:'/review-'+c.id});
 if(courseNav)sidebar['/review-'+c.id]=courseNav;
}
process.env.VITE_EXTRA_EXTENSIONS='py,ipynb,pptx';
const segmenter=new Intl.Segmenter('zh-CN',{granularity:'word'});
function renderSearch(src,env,md){
  // Build-only tokens improve Chinese substring retrieval; published prose is untouched.
  return md.render(src,env).replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/g,(_,open,body,close)=>{
    const plain=body.replace(/<mjx-container[\s\S]*?<\/mjx-container>/g,' ').replace(/<[^>]+>/g,' ');
    const tokens=[],run=[],flush=()=>{for(let i=0;i<run.length;i++)for(let n=1;n<=Math.min(4,run.length-i);n++)tokens.push(run.slice(i,i+n).join(''));run.length=0};
    for(const part of segmenter.segment(plain)){
      if(part.isWordLike&&/[\u3400-\u9fff]/.test(part.segment))run.push(part.segment);else flush();
    }
    flush();
    return open+body+'<span aria-hidden="true"> '+[...new Set(tokens)].join(' ')+' </span>'+close;
  });
}
export default defineConfig({
  title:'Study Space · 学习空间', description:'从多源资料到连贯知识：课程自学、期末复习、教材课件与资源下载。', lang:'zh-CN',
  base:'/study-space/', cleanUrls:false,
  vite:{publicDir:fileURLToPath(new URL('../../public',import.meta.url)),plugins:[outlineLifecycleGuard()],define:{'import.meta.env.VITE_EXTRA_EXTENSIONS':JSON.stringify('py,ipynb,pptx')}},
  srcExclude:['_fragments/**'], ignoreDeadLinks:false, lastUpdated:true,
  head:[['link',{rel:'icon',href:'/study-space/assets/favicon.svg'}],['script',{},`try{if(!localStorage.getItem('vitepress-theme-appearance')){var t=localStorage.getItem('ml-course-theme');if(t==='dark'||t==='light')localStorage.setItem('vitepress-theme-appearance',t)}}catch(e){}`]],
  markdown:{math:true},
  themeConfig:{
    logo:'/assets/favicon.svg', siteTitle:'Study Space', outline:{level:[2,3],label:'本页大纲'},
    sidebarMenuLabel:'页面导航', outlineTitle:'本页大纲', darkModeSwitchLabel:'主题',returnToTopLabel:'回到顶部',
    docFooter:{prev:'上一页',next:'下一页'},lastUpdated:{text:'最近更新'},
    nav:[{text:'首页',link:'/',activeMatch:'^/$'},{text:'课程',link:'/courses',activeMatch:'/(courses|course-ml|course-geodesy|course-remote-sensing|course-insar|course-optimization|optimization-|course-optics|optics-|insar-|lecture-|cifar10-practice|geodesy-(?!source|plan)|remote-sensing-(?!sources|glossary))'},{text:'学习路线',link:'/study-guide'},{text:'期末复习',link:'/review-guide'},{text:'资料中心',link:'/resources',activeMatch:'/(resources|extensions|textbooks|book-|slides-|material-|read-(?!README)|geodesy-source|remote-sensing-(sources|glossary))'},{text:'共建',link:'/contribute'},{text:'制作者',link:'/about'}],
    // VitePress prioritizes slash depth and otherwise preserves insertion order.
    // Put specific filename prefixes before the fallback and broad course prefix.
    sidebar:Object.fromEntries(Object.entries(sidebar).sort((a,b)=>b[0].length-a[0].length)),
    search:{provider:'local',options:{_render:renderSearch,detailedView:false,locales:{root:{translations:{button:{buttonText:'搜索笔记',buttonAriaLabel:'搜索课程笔记'},modal:{displayDetails:'显示上下文',resetButtonTitle:'清除搜索',backButtonTitle:'返回',noResultsText:'没有找到相关笔记',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}}}},
    footer:{message:'从资料建立理解，让知识持续生长。<br><a href="/study-space/about.html">制作者与网站介绍</a> · <a href="/study-space/updates.html">内容更新</a> · <a href="/study-space/site-guide.html">使用说明</a> · <a href="/study-space/contribute.html">共同完善</a>',copyright:'Study Space · 学习空间'}
  }
});
