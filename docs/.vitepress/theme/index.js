import FolioHome from './FolioHome.vue';
import FolioCatalog from './FolioCatalog.vue';
import LessonClassroom from './LessonClassroom.vue';
import CourseMasthead from './CourseMasthead.vue';
import FolioReadingTools from './FolioReadingTools.vue';
import {courseForPath,isResourcePath,isCourseOverview} from './course-experience.js';
import AnatomyFigure from './AnatomyFigure.vue';
import ImageFeatureLab from './ImageFeatureLab.vue';
import PhotogrammetryReading from './PhotogrammetryReading.vue';
import PhotogrammetryLocalReader from './PhotogrammetryLocalReader.vue';
import PhotogrammetryLab from './PhotogrammetryLab.vue';
import DefaultTheme from 'vitepress/theme';
import { h, Fragment, onMounted, onUnmounted, watch, nextTick } from 'vue';
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
import SiteUpdates from './SiteUpdates.vue';
import SiteTraffic from './SiteTraffic.vue';
import {recordTrafficVisit} from './traffic.js';
import OptimizationLab from './OptimizationLab.vue';
import OptimizationReading from './OptimizationReading.vue';
import OptimizationNotebook from './OptimizationNotebook.vue';
import OptimizationLocalReader from './OptimizationLocalReader.vue';
import OptimizationFusion from './OptimizationFusion.vue';
import './style.css';
import './space.css';
import './rs.css';
import './activity.css';
import './optimization.css';
import './folio-global.css';
import './folio-catalog.css';
import './classroom.css';
import './folio-reading.css';
export default {
  extends:DefaultTheme,
  Layout(){const route=useRoute(),reading=courseForPath(route.path)&&!isResourcePath(route.path);return h(DefaultTheme.Layout,{class:{'folio-reading-layout':!!reading,'folio-course-overview':isCourseOverview(route.path),'folio-review':/\/review-[^/]+\.html$/.test(route.path)}},{'doc-before':()=>h(Fragment,null,[h(PageContext),h(CourseMasthead),h(FolioReadingTools)])})},
  enhanceApp({app}){app.component('FolioHome',FolioHome);app.component('FolioCatalog',FolioCatalog);app.component('LessonClassroom',LessonClassroom);app.component('AnatomyFigure',AnatomyFigure);app.component('ImageFeatureLab',ImageFeatureLab);app.component('PhotogrammetryReading',PhotogrammetryReading);app.component('PhotogrammetryLocalReader',PhotogrammetryLocalReader);app.component('PhotogrammetryLab',PhotogrammetryLab);app.component('OptimizationFusion',OptimizationFusion);app.component('OptimizationLocalReader',OptimizationLocalReader);app.component('OptimizationNotebook',OptimizationNotebook);app.component('OptimizationReading',OptimizationReading);app.component('OptimizationLab',OptimizationLab);app.component('LearningMark',LearningMark);app.component('ConceptViz',ConceptViz);app.component('PdfReader',PdfReader);app.component('MaterialReader',MaterialReader);app.component('GeodesyLab',GeodesyLab);app.component('SourceFigure',SourceFigure);app.component('RsLanguage',RsLanguage);app.component('RsFigure',RsFigure);app.component('ResourceLibrary',ResourceLibrary);app.component('CourseLibrary',CourseLibrary);app.component('ContinueReading',ContinueReading);app.component('LearningExtensions',LearningExtensions);app.component('CreatorIdentity',CreatorIdentity);app.component('SiteScope',SiteScope);app.component('Contributors',Contributors);app.component('SiteUpdates',SiteUpdates);app.component('SiteTraffic',SiteTraffic)},
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
    let stop,stopTraffic,previous,removeRsHooks;
    const after=async href=>{await previous?.(href);await reveal()};
    onMounted(()=>{removeRsHooks=installRsSearchHooks();previous=router.onAfterRouteChanged;router.onAfterRouteChanged=after;reveal();window.addEventListener('hashchange',reveal);stop=watch(()=>route.path,reveal);recordTrafficVisit(route.path);stopTraffic=watch(()=>route.path,recordTrafficVisit)});
    onUnmounted(()=>{removeRsHooks?.();window.removeEventListener('hashchange',reveal);stop?.();stopTraffic?.();if(router.onAfterRouteChanged===after)router.onAfterRouteChanged=previous});
  }
};
