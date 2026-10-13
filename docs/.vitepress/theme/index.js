import DefaultTheme from 'vitepress/theme';
import { h, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vitepress';
import LearningMark from './LearningMark.vue';
import ConceptViz from './ConceptViz.vue';
import PdfReader from './PdfReader.vue';
import GeodesyLab from './GeodesyLab.vue';
import SourceFigure from './SourceFigure.vue';
import RsLanguage from './RsLanguage.vue';
import RsFigure from './RsFigure.vue';
import {installRsSearchHooks,revealRsTarget} from './remoteSensingLanguage.js';
import './style.css';
import './rs.css';
export default {
  extends:DefaultTheme,
  Layout(){return h(DefaultTheme.Layout)},
  enhanceApp({app}){app.component('LearningMark',LearningMark);app.component('ConceptViz',ConceptViz);app.component('PdfReader',PdfReader);app.component('GeodesyLab',GeodesyLab);app.component('SourceFigure',SourceFigure);app.component('RsLanguage',RsLanguage);app.component('RsFigure',RsFigure)},
  setup(){
    const route=useRoute(),router=useRouter();
    const reveal=async()=>{
      await nextTick();
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
