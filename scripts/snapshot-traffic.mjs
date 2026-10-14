import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import config from '../traffic.config.json' with {type:'json'};
import {dayKey,datesBetween,counterUrl,counterValues,validateHistory} from './traffic-core.mjs';
export async function snapshot(history,{now=new Date(),fetcher=fetch}={}) {
  validateHistory(history,config);
  const today=dayKey(now),map=new Map(history.days.map(d=>[d.date,d])),errors=[];
  for(const date of datesBetween(config.startDate,today)){
    // Re-read the recent completed window to catch a delayed in-flight visit.
    const recent=Date.parse(today+'T00:00:00Z')-Date.parse(date+'T00:00:00Z')<=3*86400000;
    if(map.get(date)?.complete&&!recent)continue;
    try{
      const response=await fetcher(config.endpoint,{headers:{'x-bsz-referer':counterUrl(config,date)},signal:AbortSignal.timeout(15000)});
      if(!response.ok)throw Error('HTTP '+response.status);
      const values=counterValues(await response.json()),previous=map.get(date);
      if(previous&&(values.pv<previous.pv||values.uv<previous.uv))throw Error('Provider counts decreased; existing record retained');
      map.set(date,{date,...values,complete:date<today,observedAt:now.toISOString()});
    }catch(error){errors.push({date,message:error.message})}
  }
  return {...history,updatedAt:now.toISOString(),days:[...map.values()].sort((a,b)=>a.date.localeCompare(b.date)),errors};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const file=process.argv[2];if(!file)throw Error('Usage: node scripts/snapshot-traffic.mjs <history.json>');
  const history=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
  const result=await snapshot(history);fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');
  console.log(`Recorded ${result.days.length} days; ${result.errors.length} read failures.`);
  if(result.errors.length)process.exitCode=1;
}
