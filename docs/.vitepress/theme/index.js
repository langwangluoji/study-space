import DefaultTheme from 'vitepress/theme';
import { h, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vitepress';
import LearningMark from './LearningMark.vue';
import ConceptViz from './ConceptViz.vue';
import PdfReader from './PdfReader.vue';
import './style.css';
export default {
  extends:DefaultTheme,
  Layout(){return h(DefaultTheme.Layout)},
  enhanceApp({app}){app.component('LearningMark',LearningMark);app.component('ConceptViz',ConceptViz);app.component('PdfReader',PdfReader)},
  setup(){
    const route=useRoute(),router=useRouter();
    const reveal=async()=>{
      await nextTick();
      let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
      const target=document.getElementById(id);
      if(!target)return;
      for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
      // Headers in folded extras remain addressable by native local search.
      requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    };
    let stop,previous;
    const after=async href=>{await previous?.(href);await reveal()};
    onMounted(()=>{previous=router.onAfterRouteChanged;router.onAfterRouteChanged=after;reveal();window.addEventListener('hashchange',reveal);stop=watch(()=>route.path,reveal)});
    onUnmounted(()=>{window.removeEventListener('hashchange',reveal);stop?.();if(router.onAfterRouteChanged===after)router.onAfterRouteChanged=previous});
  }
};
