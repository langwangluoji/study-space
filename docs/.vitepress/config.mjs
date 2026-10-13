import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const courses=JSON.parse(fs.readFileSync(new URL('../../course.config.json',import.meta.url),'utf8'));
const geodesy=JSON.parse(fs.readFileSync(new URL('../../geodesy.config.json',import.meta.url),'utf8'));
const remoteSensing=JSON.parse(fs.readFileSync(new URL('../../remote-sensing.config.json',import.meta.url),'utf8'));
const rsSidebar=[{text:'遥感原理与基础 / Remote Sensing',items:[{text:'课程总览 / Overview',link:'/course-remote-sensing'}]},...remoteSensing.chapters.map(c=>({text:c.title,link:'/'+c.slug})),{text:'术语与来源 / Reference',items:[{text:'双语术语与概念对照',link:'/remote-sensing-glossary'},{text:'来源、配图与勘误',link:'/remote-sensing-sources'}]}];
const geodesySidebar=[{text:'大地测量',items:[{text:'课程总览',link:'/course-geodesy'}]},...geodesy.map(c=>({text:c.title,link:'/'+c.slug,collapsed:false,items:c.topics.map(t=>({text:t.title,link:'/'+t.slug}))})),{text:'辅助资料',collapsed:true,items:[{text:'坐标旋转说明',link:'/geodesy-rotation'},{text:'资料来源与图像索引',link:'/geodesy-sources'},{text:'课程维护方案',link:'/geodesy-plan'}]}];
const chapterItems=c=>c.parts?.length?c.parts.map(p=>({text:p.title,link:'/'+c.slug+'.html#'+p.id,collapsed:true,items:p.sections.map(id=>{const s=c.sections.find(s=>s.id===id);return {text:s.title,link:'/'+c.slug+'.html#'+id}})})):c.sections.map(s=>({text:s.title,link:'/'+c.slug+'.html#'+s.id}));
process.env.VITE_EXTRA_EXTENSIONS='py,ipynb,pptx';
const segmenter=new Intl.Segmenter('zh-CN',{granularity:'word'});
function renderSearch(src,env,md){
  // Build-only tokens improve Chinese substring retrieval; published prose is untouched.
  return md.render(src,env).replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/g,(_,open,body,close)=>{
    const plain=body.replace(/<mjx-container[\s\S]*?<\/mjx-container>/g,' ').replace(/<[^>]+>/g,' ');
    const words=[...segmenter.segment(plain)].filter(s=>s.isWordLike&&/[\u3400-\u9fff]/.test(s.segment)).map(s=>s.segment);
    return open+body+'<span aria-hidden="true"> '+[...new Set(words)].join(' ')+' </span>'+close;
  });
}
export default defineConfig({
  title:'课程知识库', description:'课程讲义、数学笔记与实践资料', lang:'zh-CN',
  base:'/study-space/', cleanUrls:false,
  vite:{publicDir:fileURLToPath(new URL('../../public',import.meta.url)),define:{'import.meta.env.VITE_EXTRA_EXTENSIONS':JSON.stringify('py,ipynb,pptx')}},
  srcExclude:['_fragments/**'], ignoreDeadLinks:false, lastUpdated:true,
  head:[['link',{rel:'icon',href:'/study-space/assets/favicon.svg'}],['script',{},`try{if(!localStorage.getItem('vitepress-theme-appearance')){var t=localStorage.getItem('ml-course-theme');if(t==='dark'||t==='light')localStorage.setItem('vitepress-theme-appearance',t)}}catch(e){}`]],
  markdown:{math:true},
  themeConfig:{
    logo:'/assets/favicon.svg', siteTitle:'课程知识库', outline:{level:[2,3],label:'本页大纲'},
    sidebarMenuLabel:'课程目录', outlineTitle:'本页大纲', darkModeSwitchLabel:'主题',returnToTopLabel:'回到顶部',
    docFooter:{prev:'上一页',next:'下一页'},lastUpdated:{text:'最近更新'},
    nav:[{text:'知识库',link:'/'},{text:'机器学习',link:'/course-ml'},{text:'大地测量',link:'/course-geodesy',activeMatch:'/(course-geodesy|geodesy-)'},{text:'遥感',link:'/course-remote-sensing',activeMatch:'/(course-remote-sensing|remote-sensing-)'},{text:'资料中心',link:'/resources'}],
    sidebar:{'/course-remote-sensing':rsSidebar,'/remote-sensing-':rsSidebar,'/course-geodesy':geodesySidebar,'/geodesy-':geodesySidebar,'/':[{text:'机器学习',items:[{text:'课程总览',link:'/course-ml'}]},...courses.map(c=>({text:c.title,collapsed:true,items:[{text:'连续阅读整讲',link:'/'+c.slug},...chapterItems(c)]})),{text:'资料与维护',collapsed:true,items:[{text:'资料中心',link:'/resources'},{text:'教材',link:'/textbooks'},{text:'来源说明',link:'/read-sources'},{text:'维护指南',link:'/read-README'},{text:'核验记录',link:'/verification'}]}]},
    search:{provider:'local',options:{_render:renderSearch,detailedView:false,locales:{root:{translations:{button:{buttonText:'搜索笔记',buttonAriaLabel:'搜索课程笔记'},modal:{displayDetails:'显示上下文',resetButtonTitle:'清除搜索',backButtonTitle:'返回',noResultsText:'没有找到相关笔记',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}}}},
    footer:{message:'以教师课件和原教材为内容依据；正文与可选算例分层阅读。',copyright:'课程知识库'}
  }
});
