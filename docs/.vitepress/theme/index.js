import DefaultTheme from 'vitepress/theme';
import { h, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vitepress';
import LearningMark from './LearningMark.vue';
import ConceptViz from './ConceptViz.vue';
import PdfReader from './PdfReader.vue';
import MaterialReader from './MaterialReader.vue';
import GeodesyLab from './GeodesyLab.vue';
import SourceFigure from './SourceFigure.vue';
import RsLanguage from './RsLanguage.vue';
import RsFigure from './RsFigure.vue';
import {installRsSearchHooks,revealRsTarget} from './remoteSensingLanguage.js';
import ResourceLibrary from './ResourceLibrary.vue';
import CourseLibrary from './CourseLibrary.vue';
import ContinueReading from './ContinueReading.vue';
import PageContext from './PageContext.vue';
import LearningExtensions from './LearningExtensions.vue';
import CreatorIdentity from './CreatorIdentity.vue';
import SiteScope from './SiteScope.vue';
import Contributors from './Contributors.vue';
import {readingTitle} from './reading-targets.js';
import './style.css';
import './space.css';
import './rs.css';
export default {
  extends:DefaultTheme,
  Layout(){return h(DefaultTheme.Layout,null,{'doc-before':()=>h(PageContext)})},
  enhanceApp({app}){app.component('LearningMark',LearningMark);app.component('ConceptViz',ConceptViz);app.component('PdfReader',PdfReader);app.component('MaterialReader',MaterialReader);app.component('GeodesyLab',GeodesyLab);app.component('SourceFigure',SourceFigure);app.component('RsLanguage',RsLanguage);app.component('RsFigure',RsFigure);app.component('ResourceLibrary',ResourceLibrary);app.component('CourseLibrary',CourseLibrary);app.component('ContinueReading',ContinueReading);app.component('LearningExtensions',LearningExtensions);app.component('CreatorIdentity',CreatorIdentity);app.component('SiteScope',SiteScope);app.component('Contributors',Contributors)},
  setup(){
    const route=useRoute(),router=useRouter();
    const reveal=async()=>{
      await nextTick();
      const title=readingTitle(route.path);
      if(title)try{localStorage.setItem('study-space-last-reading-v1',JSON.stringify({path:route.path+location.hash,title}))}catch{}
      let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
      const target=document.getElementById(id);
      if(!target)return;
      await revealRsTarget(target);
      for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
      // Headers in folded extras remain addressable by native local search.
      requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    };
    let stop,previous,removeRsHooks;
    const after=async href=>{await previous?.(href);await reveal()};
    onMounted(()=>{removeRsHooks=installRsSearchHooks();previous=router.onAfterRouteChanged;router.onAfterRouteChanged=after;reveal();window.addEventListener('hashchange',reveal);stop=watch(()=>route.path,reveal)});
    onUnmounted(()=>{removeRsHooks?.();window.removeEventListener('hashchange',reveal);stop?.();if(router.onAfterRouteChanged===after)router.onAfterRouteChanged=previous});
  }
};
