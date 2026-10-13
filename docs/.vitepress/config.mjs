import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const courses=JSON.parse(fs.readFileSync(new URL('../../course.config.json',import.meta.url),'utf8'));
const geodesy=JSON.parse(fs.readFileSync(new URL('../../geodesy.config.json',import.meta.url),'utf8'));
const space=JSON.parse(fs.readFileSync(new URL('../../study-space.config.json',import.meta.url),'utf8'));
const resources=JSON.parse(fs.readFileSync(new URL('../../resources.config.json',import.meta.url),'utf8'));
const geodesySidebar=[{text:'大地测量',items:[{text:'课程总览',link:'/course-geodesy'}]},...geodesy.map(c=>({text:c.title,link:'/'+c.slug,collapsed:false,items:c.topics.map(t=>({text:t.title,link:'/'+t.slug}))})),{text:'辅助资料',collapsed:true,items:[{text:'坐标旋转说明',link:'/geodesy-rotation'},{text:'资料来源与图像索引',link:'/geodesy-sources'},{text:'课程维护方案',link:'/geodesy-plan'}]}];
const chapterItems=c=>c.parts?.length?c.parts.map(p=>({text:p.title,link:'/'+c.slug+'.html#'+p.id,collapsed:true,items:p.sections.map(id=>{const s=c.sections.find(s=>s.id===id);return {text:s.title,link:'/'+c.slug+'.html#'+id}})})):c.sections.map(s=>({text:s.title,link:'/'+c.slug+'.html#'+s.id}));
const mlSidebar=[{text:'机器学习',items:[{text:'课程总览',link:'/course-ml'},{text:'复习路线',link:'/review-guide#ml'}]},...courses.map(c=>({text:c.title,collapsed:true,items:[{text:'连续阅读整讲',link:'/'+c.slug},...chapterItems(c)]})),{text:'课程资料',items:[{text:'教材与课件',link:'/resources#ml'},{text:'来源说明',link:'/read-sources'}]}];
const resourceSidebar=[{text:'资料中心',items:[{text:'全部资源',link:'/resources'},{text:'教材与延伸阅读',link:'/textbooks'}]},{text:'机器学习资料',collapsed:false,items:[{text:'PRML 教材',link:'/book-prml'},{text:'MML 数学基础',link:'/book-mml'},{text:'李宏毅深度学习教程',link:'/book-leedl'},{text:'第一讲课件',link:'/slides-lecture-1'},{text:'第二讲课件',link:'/slides-lecture-2'},{text:'第三讲课件',link:'/slides-lecture-3'},{text:'Notebook 阅读版',link:'/read-notebook'},{text:'实践脚本',link:'/read-downloads-cifar10_mlp_tutorial'},{text:'核验脚本',link:'/read-downloads-rewrite_reference_checks'},{text:'教材与知识点来源',link:'/read-sources'}]},{text:'大地测量资料',items:[{text:'原资料与配图索引',link:'/geodesy-sources'}]},{text:'遥感资料',items:[{text:'双语术语与概念对照',link:'/remote-sensing-glossary'},{text:'原资料、讲义图与勘误',link:'/remote-sensing-sources'}]}];
const spaceSidebar=[{text:'学习空间',items:[{text:'课程目录',link:'/courses'},{text:'自学路线',link:'/study-guide'},{text:'期末复习',link:'/review-guide'},{text:'资料中心',link:'/resources'}]},{text:'共建与维护',items:[{text:'知识库共建',link:'/contribute'},{text:'详细维护指南',link:'/read-README'},{text:'内容核验记录',link:'/verification'}]}];
const sidebar={'/':spaceSidebar,'/geodesy-':geodesySidebar,'/course-geodesy':geodesySidebar};
resourceSidebar[1].collapsed=true;resourceSidebar[2].collapsed=true;
for(const prefix of ['/course-ml','/lecture-','/cifar10-practice'])sidebar[prefix]=mlSidebar;
resourceSidebar.at(-1).items.push(...resources.filter(r=>r.course==='geodesy'&&r.reader).map(r=>({text:r.title,link:r.preview})));
for(const prefix of ['/resources','/textbooks','/book-','/slides-','/read-sources','/read-notebook','/read-downloads-','/geodesy-source'])sidebar[prefix]=resourceSidebar;
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
  vite:{publicDir:fileURLToPath(new URL('../../public',import.meta.url)),define:{'import.meta.env.VITE_EXTRA_EXTENSIONS':JSON.stringify('py,ipynb,pptx')}},
  srcExclude:['_fragments/**'], ignoreDeadLinks:false, lastUpdated:true,
  head:[['link',{rel:'icon',href:'/study-space/assets/favicon.svg'}],['script',{},`try{if(!localStorage.getItem('vitepress-theme-appearance')){var t=localStorage.getItem('ml-course-theme');if(t==='dark'||t==='light')localStorage.setItem('vitepress-theme-appearance',t)}}catch(e){}`]],
  markdown:{math:true},
  themeConfig:{
    logo:'/assets/favicon.svg', siteTitle:'Study Space', outline:{level:[2,3],label:'本页大纲'},
    sidebarMenuLabel:'页面导航', outlineTitle:'本页大纲', darkModeSwitchLabel:'主题',returnToTopLabel:'回到顶部',
    docFooter:{prev:'上一页',next:'下一页'},lastUpdated:{text:'最近更新'},
    nav:[{text:'首页',link:'/',activeMatch:'^/$'},{text:'课程',link:'/courses',activeMatch:'/(courses|course-ml|course-geodesy|course-remote-sensing|lecture-|cifar10-practice|geodesy-(?!source|plan)|remote-sensing-(?!sources))'},{text:'学习路线',link:'/study-guide'},{text:'期末复习',link:'/review-guide'},{text:'资料中心',link:'/resources',activeMatch:'/(resources|textbooks|book-|slides-|read-(?!README)|geodesy-source|remote-sensing-sources)'},{text:'共建',link:'/contribute'}],
    // VitePress prioritizes slash depth and otherwise preserves insertion order.
    // Put specific filename prefixes before the fallback and broad course prefix.
    sidebar:Object.fromEntries(Object.entries(sidebar).sort((a,b)=>b[0].length-a[0].length)),
    search:{provider:'local',options:{_render:renderSearch,detailedView:false,locales:{root:{translations:{button:{buttonText:'搜索笔记',buttonAriaLabel:'搜索课程笔记'},modal:{displayDetails:'显示上下文',resetButtonTitle:'清除搜索',backButtonTitle:'返回',noResultsText:'没有找到相关笔记',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}}}},
    footer:{message:'从资料建立理解，让知识持续生长。保留原作者署名与来源，按课程范围整理。',copyright:'Study Space · 学习空间'}
  }
});
