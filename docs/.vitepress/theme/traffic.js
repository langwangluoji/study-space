import {reactive} from 'vue';
import config from '../../../traffic.config.json';
import {dayKey,counterUrl,counterValues,pagePath} from '../../../scripts/traffic-core.mjs';
export const traffic=reactive({live:null,state:'loading',error:null});
let sequence=0,accepted=0,visitQueue=Promise.resolve(),lastPath=null;
export async function readDay(date,method='GET') {
  const headers={'x-bsz-referer':counterUrl(config,date)};
  if(method==='POST')try{const token=localStorage.getItem('study-space-counter-identity');if(token)headers.Authorization=token}catch{}
  const response=await fetch(config.endpoint,{method,headers,credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw Error('Counter HTTP '+response.status);
  const values=counterValues(await response.json());
  if(method==='POST')try{const token=response.headers.get('set-bsz-identity');if(token)localStorage.setItem('study-space-counter-identity',token)}catch{}
  return {date,...values,observedAt:new Date().toISOString(),complete:date<dayKey()};
}
export async function refreshLive(method='GET',date=dayKey()) {
  const id=++sequence;
  if(date<config.startDate||!config.enabled){traffic.state='inactive';return}
  try{
    const values=await readDay(date,method);
    if(id>=accepted&&traffic.live?.date===date&&(values.pv<traffic.live.pv||values.uv<traffic.live.uv))throw Error('Counter decreased; last trustworthy value retained');
    if(id>=accepted&&date===dayKey()){accepted=id;traffic.live=values;traffic.state='ready';traffic.error=null}
  }catch(error){if(id>=accepted){accepted=id;traffic.state='unavailable';traffic.error=error.message}}
}
export function recordTrafficVisit(path) {
  if(!config.enabled||typeof window==='undefined'||window.location.origin!==config.origin||navigator.webdriver||document.visibilityState==='prerender')return;
  const normalized=pagePath(path,config);if(!normalized||normalized===lastPath)return;lastPath=normalized;
  // No automatic POST retry: a timeout may already have counted the visit.
  const date=dayKey();
  // Reuse the first anonymous identity before a subsequent SPA visit is sent.
  visitQueue=visitQueue.then(()=>refreshLive('POST',date));
}
