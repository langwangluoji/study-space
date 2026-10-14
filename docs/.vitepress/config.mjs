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
const mlSidebar=[{text:mlTitle,items:[{text:'课程总览',link:'/course-ml'},{text:'复习路线',link:'/review-guide#ml'}]},...courses.map(c=>({text:c.title,collapsed:true,items:[{text:'连续阅读整讲',link:'/'+c.slug},...chapterItems(c)]})),{text:'课程资料',items:[{text:'教材与课件',link:'/resources#ml'},{text:'来源说明',link:'/read-sources'}]}];
// A course owns one resource group. Original files and curated readers share
// the same catalog, so later material additions cannot create a second library.
const resourceGroups={
  ml:[['课程课件',['课件']],['教材与参考书',['教材','参考教材']],['实践与代码',['代码']],['来源索引',['来源索引']]],
  geodesy:[['课程课件',['课件']],['辅助资料',['辅助资料']],['教材与参考书',['教材','参考教材']],['来源索引',['来源索引']]],
  insar:[['课程课件',['课件']],['教材与参考书',['教材','参考教材']],['整理讲义',['讲义']]],
  'remote-sensing':[['课件与汇总',['课件']],['课程笔记与调研',['课程笔记','调研资料']],['参考教材',['教材','参考教材']]]
};
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
for(const prefix of ['/course-ml','/lecture-','/cifar10-practice'])sidebar[prefix]=mlSidebar;
for(const prefix of ['/resources','/extensions','/textbooks','/book-','/slides-','/material-','/read-sources','/read-notebook','/read-downloads-','/geodesy-source','/insar-sources','/remote-sensing-sources','/remote-sensing-glossary'])sidebar[prefix]=resourceSidebar;
for(const c of space.courses.filter(c=>!['ml','geodesy'].includes(c.id))){
  const extra=c.id==='remote-sensing'?[{text:'双语术语与概念对照',link:'/remote-sensing-glossary'}]:[];
  const navigation=[{text:c.title,items:[{text:'课程总览',link:c.entry},...(c.chapters??[]).map(ch=>({text:ch.title,link:'/'+ch.slug})),...extra,{text:'资料来源',link:c.source}]}];
  sidebar['/course-'+c.id]=navigation;sidebar['/'+c.id+'-']=navigation;
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
    nav:[{text:'首页',link:'/',activeMatch:'^/$'},{text:'课程',link:'/courses',activeMatch:'/(courses|course-ml|course-geodesy|course-remote-sensing|course-insar|insar-|lecture-|cifar10-practice|geodesy-(?!source|plan)|remote-sensing-(?!sources|glossary))'},{text:'学习路线',link:'/study-guide'},{text:'期末复习',link:'/review-guide'},{text:'资料中心',link:'/resources',activeMatch:'/(resources|extensions|textbooks|book-|slides-|material-|read-(?!README)|geodesy-source|remote-sensing-(sources|glossary))'},{text:'共建',link:'/contribute'},{text:'制作者',link:'/about'}],
    // VitePress prioritizes slash depth and otherwise preserves insertion order.
    // Put specific filename prefixes before the fallback and broad course prefix.
    sidebar:Object.fromEntries(Object.entries(sidebar).sort((a,b)=>b[0].length-a[0].length)),
    search:{provider:'local',options:{_render:renderSearch,detailedView:false,locales:{root:{translations:{button:{buttonText:'搜索笔记',buttonAriaLabel:'搜索课程笔记'},modal:{displayDetails:'显示上下文',resetButtonTitle:'清除搜索',backButtonTitle:'返回',noResultsText:'没有找到相关笔记',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}}}},
    footer:{message:'从资料建立理解，让知识持续生长。<br><a href="/study-space/about.html">制作者与网站介绍</a> · <a href="/study-space/site-guide.html">使用说明</a> · <a href="/study-space/contribute.html">共同完善</a>',copyright:'Study Space · 学习空间'}
  }
});
