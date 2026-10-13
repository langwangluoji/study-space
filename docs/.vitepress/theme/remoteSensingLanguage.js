import {ref, nextTick} from 'vue';
export const rsLanguage=ref('zh');
export const rsSearchNotice=ref(false);
const key='remote-sensing-language-v1';
const valid=v=>['zh','en','both'].includes(v);
export function initRsLanguage(){
  if(typeof window==='undefined')return;
  try{const stored=localStorage.getItem(key);if(valid(stored))rsLanguage.value=stored}catch{}
  document.documentElement.dataset.rsLanguage=rsLanguage.value;
}
export function showRsLanguage(value,{persist=true,search=false}={}){
  if(!valid(value))return;
  rsLanguage.value=value;rsSearchNotice.value=search;
  if(typeof document!=='undefined')document.documentElement.dataset.rsLanguage=value;
  if(persist)try{localStorage.setItem(key,value)}catch{}
}
export async function revealRsTarget(target){
  const language=target?.closest('[data-rs-lang]')?.dataset.rsLang;
  if(language&&rsLanguage.value!=='both'&&rsLanguage.value!==language){showRsLanguage('both',{persist:false,search:true});await nextTick()}
}
export function installRsSearchHooks(){
  initRsLanguage();
  const activate=event=>{
    const box=event.target?.closest?.('.VPLocalSearchBox');
    if(!box)return;
    const result=event.target.closest?.('a');
    if(event.type==='click'&&result?.getAttribute('href')?.includes('remote-sensing'))showRsLanguage('both',{persist:false,search:true});
    if(event.type==='keydown'&&event.key==='Enter')showRsLanguage('both',{persist:false,search:true});
  };
  document.addEventListener('click',activate,true);document.addEventListener('keydown',activate,true);
  return ()=>{document.removeEventListener('click',activate,true);document.removeEventListener('keydown',activate,true)};
}
