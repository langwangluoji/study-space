export function dayKey(now=new Date()) {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
export function validDate(value) {
  return typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value+'T00:00:00Z')) && new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
}
export function datesBetween(start,end) {
  if(!validDate(start)||!validDate(end)||start>end)return [];
  const days=[];
  for(let n=Date.parse(start+'T00:00:00Z'),limit=Date.parse(end+'T00:00:00Z');n<=limit;n+=86400000){
    if(days.length>=15000)throw Error('Date range too large');
    days.push(new Date(n).toISOString().slice(0,10));
  }
  return days;
}
export function counterUrl(config,date) {
  if(!validDate(date)||date<config.startDate)throw Error('Invalid counter date');
  return config.origin+config.counterPrefix+date;
}
export function counterValues(json) {
  const {page_pv:pv,page_uv:uv}=json?.data??{};
  if(json?.success!==true||![pv,uv].every(n=>Number.isSafeInteger(n)&&n>=0))throw Error('Invalid counter response');
  return {pv,uv};
}
export function validateHistory(history,config) {
  if(history?.version!==1||history.startDate!==config.startDate||history.timeZone!==config.timeZone||history.endpoint!==config.endpoint||!Array.isArray(history.days))throw Error('History source does not match');
  const seen=new Set();
  for(const d of history.days){
    if(!validDate(d.date)||d.date<config.startDate||seen.has(d.date)||![d.pv,d.uv].every(n=>Number.isSafeInteger(n)&&n>=0)||typeof d.complete!=='boolean'||!Number.isFinite(Date.parse(d.observedAt)))throw Error('Invalid history day');
    seen.add(d.date);
  }
  return history;
}
export function calendarDays(year) {
  const dates=datesBetween(`${year}-01-01`,`${year}-12-31`);
  const leading=new Date(`${year}-01-01T00:00:00Z`).getUTCDay();
  const cells=[...Array(leading).fill(null),...dates];
  while(cells.length%7)cells.push(null);
  return cells;
}
export function trafficLevel(value) { return value===0?0:value<5?1:value<15?2:value<50?3:4; }
export function pagePath(value,config) {
  try{const url=new URL(value,config.origin);return url.origin===config.origin&&url.pathname.startsWith(config.base)?url.pathname:null}catch{return null}
}
export function cumulativeTotal(history,today,live,startDate) {
  const map=new Map((history?.days??[]).map(d=>[d.date,d]));
  let total=0;
  for(const date of datesBetween(startDate,today)){
    const day=date===today?live:map.get(date);
    if(!day||day.date!==date||(date<today&&!day.complete))return null;
    total+=day.pv;
  }
  return total;
}
