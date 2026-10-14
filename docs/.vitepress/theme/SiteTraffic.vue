<script setup>
import {computed,ref,onMounted,onUnmounted,watch,nextTick} from 'vue';
import {withBase} from 'vitepress';
import config from '../../../traffic.config.json';
import {dayKey,datesBetween,calendarDays,trafficLevel,cumulativeTotal,validateHistory} from '../../../scripts/traffic-core.mjs';
import {traffic,refreshLive,readDay} from './traffic.js';
const today=ref(config.startDate),year=ref(Number(config.startDate.slice(0,4))),metric=ref('uv'),range=ref(30),selected=ref(config.startDate);
const history=ref(null),historyState=ref('loading'),busy=ref(false);
const calendarViewport=ref(null);
let timer;
const label=computed(()=>metric.value==='uv'?'去重访客':'页面访问');
const years=computed(()=>Array.from({length:Math.max(1,Number(today.value.slice(0,4))-Number(config.startDate.slice(0,4))+1)},(_,i)=>Number(config.startDate.slice(0,4))+i));
const storedToday=computed(()=>history.value?.days.find(d=>d.date===today.value));
const counterRegressed=computed(()=>traffic.live?.date===today.value&&storedToday.value&&(traffic.live.pv<storedToday.value.pv||traffic.live.uv<storedToday.value.uv));
const days=computed(()=>{const map=new Map((history.value?.days??[]).map(d=>[d.date,d]));if(traffic.live?.date===today.value&&!counterRegressed.value)map.set(today.value,traffic.live);return map});
const total=computed(()=>historyState.value==='ready'&&traffic.state==='ready'&&!counterRegressed.value?cumulativeTotal(history.value,today.value,traffic.live,config.startDate):null);
const todayUV=computed(()=>traffic.state==='ready'&&traffic.live?.date===today.value&&!counterRegressed.value?traffic.live.uv:null);
const cells=computed(()=>calendarDays(year.value));
const months=computed(()=>Array.from({length:12},(_,i)=>{const first=`${year.value}-${String(i+1).padStart(2,'0')}-01`;const offset=datesBetween(`${year.value}-01-01`,first).length-1;return {label:(i+1)+'月',left:30+Math.floor((new Date(`${year.value}-01-01T00:00:00Z`).getUTCDay()+offset)/7)*16}}));
const selectedDay=computed(()=>days.value.get(selected.value));
const trend=computed(()=>{const from=new Date(Date.parse(today.value+'T00:00:00Z')-(range.value-1)*86400000).toISOString().slice(0,10);return datesBetween(from<config.startDate?config.startDate:from,today.value).map(date=>({date,record:days.value.get(date)}))});
const chart=computed(()=>{
  const max=Math.max(2,Math.ceil(Math.max(0,...trend.value.map(d=>d.record?.[metric.value]??0))/2)*2);
  const points=trend.value.map((d,i)=>d.record?{date:d.date,value:d.record[metric.value],x:trend.value.length===1?350:48+i*604/Math.max(1,trend.value.length-1),y:170-d.record[metric.value]/max*138}:null);
  const segments=[];let current=[];for(const point of points){if(point)current.push(point);else if(current.length){segments.push(current);current=[]}}if(current.length)segments.push(current);
  return {max,points:points.filter(Boolean),segments:segments.map(s=>s.map(p=>p.x+','+p.y).join(' '))};
});
const number=n=>n===null||n===undefined?'—':n.toLocaleString('zh-CN');
const available=date=>date&&date>=config.startDate&&date<=today.value;
async function revealSelected(){await nextTick();const box=calendarViewport.value,cell=box?.querySelector(`[data-date="${selected.value}"]`);if(!cell)return;const bounds=box.getBoundingClientRect(),point=cell.getBoundingClientRect();if(point.left<bounds.left||point.right>bounds.right)box.scrollLeft+=point.left-bounds.left-box.clientWidth/2+point.width/2}
watch([selected,year],revealSelected);
const cellLabel=date=>!date?'':!available(date)?`${date}，未统计`:days.value.has(date)?`${date}，${days.value.get(date).uv} 位去重访客，${days.value.get(date).pv} 次页面访问`:`${date}，尚无完整记录`;
function select(date){if(available(date))selected.value=date}
function move(event,date){
  const offsets={ArrowLeft:-7,ArrowRight:7,ArrowUp:-1,ArrowDown:1};
  const active=cells.value.filter(available);let target;
  if(event.key==='Home')target=active[0];else if(event.key==='End')target=active.at(-1);else if(event.key in offsets)target=new Date(Date.parse(date+'T00:00:00Z')+offsets[event.key]*86400000).toISOString().slice(0,10);else return;
  event.preventDefault();if(!available(target)||!active.includes(target))return;selected.value=target;
  event.currentTarget.closest('.traffic-calendar').querySelector(`[data-date="${target}"]`)?.focus();
}
async function refresh(){
  if(busy.value)return;busy.value=true;today.value=dayKey();
  try{
    const response=await fetch(config.historyUrl,{credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw Error('History unavailable');
    const result=validateHistory(await response.json(),config);
    // Recover a small recent archival delay without publishing guessed totals.
    const missing=datesBetween(config.startDate,today.value).filter(d=>d<today.value&&!result.days.some(r=>r.date===d&&r.complete));
    if(missing.length<=3)for(const date of missing){try{const value=await readDay(date),previous=result.days.find(d=>d.date===date);if(previous&&(value.pv<previous.pv||value.uv<previous.uv))throw Error('Counter decreased');result.days=result.days.filter(d=>d.date!==date);result.days.push(value)}catch{}}
    history.value=result;historyState.value='ready';
  }catch{historyState.value='unavailable'}
  await refreshLive();busy.value=false;
}
onMounted(()=>{today.value=dayKey();year.value=Number(today.value.slice(0,4));selected.value=today.value;void revealSelected();void refresh();timer=setInterval(()=>{if(document.visibilityState==='visible')void refreshLive();today.value=dayKey()},60000)});
onUnmounted(()=>clearInterval(timer));
</script>
<template>
  <section id="site-traffic" class="hub-activity traffic-section" aria-labelledby="traffic-title">
    <div class="hub-section-heading"><div><p class="hub-eyebrow">FOOTPRINTS / 访问足迹</p><h2 id="traffic-title">每一次来访，都留下足迹。</h2></div><a :href="withBase('/site-guide.html#traffic')">统计口径 <span aria-hidden="true">↗</span></a></div>
    <div class="traffic-summary"><div><span>总访问次数</span><strong data-stat="total">{{number(total)}}</strong><small>启用后累计的页面浏览</small></div><div><span>今日浏览人数</span><strong data-stat="today">{{number(todayUV)}}</strong><small>按匿名标识去重估算</small></div><p>自 {{config.startDate}} 启用后记录 · 北京时间<small v-if="history?.activation">上线确认 {{new Date(history.activation.confirmedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})}}</small></p></div>
    <div class="traffic-status" role="status"><span v-if="busy">正在读取访问记录…</span><span v-else-if="counterRegressed">实时统计暂不可用（计数回退），已保留归档记录。</span><span v-else-if="traffic.state==='unavailable'">实时统计暂不可用，稍后可重新读取。</span><span v-else-if="historyState==='unavailable'">历史记录暂不可用，累计值等待完整记录。</span><span v-else-if="total===null">历史正在归档，累计值等待完整记录。</span><span v-else>今日数据实时读取 · 历史按小时归档<span v-if="history?.updatedAt"> · 最近归档 {{new Date(history.updatedAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})}}</span></span><button type="button" :disabled="busy" @click="refresh">{{busy?'读取中':'重新读取'}}</button></div>
    <div class="traffic-panel">
      <div class="traffic-panel-heading"><div><h3>一年的来访日历</h3><p>选择一天查看当日记录。</p></div><label>年份<select v-model.number="year" aria-label="访问历史年份" @change="selected=year===Number(today.slice(0,4))?today:year+'-12-31'"><option v-for="y in years" :key="y" :value="y">{{y}}</option></select></label></div>
      <div class="activity-tabs" role="group" aria-label="访问历史指标"><button :aria-pressed="metric==='uv'" @click="metric='uv'">去重访客</button><button :aria-pressed="metric==='pv'" @click="metric='pv'">页面访问</button></div>
      <div ref="calendarViewport" class="calendar-scroll" tabindex="0" aria-label="年度访问网格，可横向滚动"><div class="calendar-inner" :style="{width:(30+cells.length/7*16-3)+'px'}"><div class="calendar-months"><span v-for="m in months" :key="m.label" :style="{left:m.left+'px'}">{{m.label}}</span></div><div class="calendar-body"><div class="calendar-weekdays" aria-hidden="true"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><div class="traffic-calendar"><template v-for="(date,i) in cells" :key="date??'pad'+i"><button v-if="date" type="button" :data-date="date" :data-level="available(date)&&days.has(date)?trafficLevel(days.get(date)[metric]):'unknown'" :class="{selected:date===selected,untracked:!available(date)}" :disabled="!available(date)" :tabindex="date===selected?0:-1" :aria-label="cellLabel(date)" :aria-pressed="date===selected" :title="cellLabel(date)" @click="select(date)" @keydown="move($event,date)"></button><span v-else class="calendar-padding" aria-hidden="true"></span></template></div></div></div></div>
      <div class="calendar-legend"><span>未统计 / 待归档 <i data-level="unknown"></i></span><span>少 <i v-for="n in 5" :key="n" :data-level="n-1"></i> 多</span></div>
      <p class="traffic-day-detail" role="status"><strong>{{selected}}</strong><template v-if="!available(selected)"> · 尚未统计</template><template v-else-if="selectedDay"> · {{number(selectedDay.uv)}} 位去重访客 · {{number(selectedDay.pv)}} 次页面访问 <small v-if="!selectedDay.complete">（当日 / 未完成日终读取）</small><small v-if="selected===config.startDate"> · 启用当天仅含启用后的访问</small></template><template v-else> · 尚无完整记录</template></p>
    </div>
    <div class="traffic-panel">
      <div class="traffic-panel-heading"><div><h3>来访趋势</h3><p>每日{{label}} · 空缺日期不连线</p></div><label>时间范围<select v-model.number="range" aria-label="访问趋势时间范围"><option :value="7">近 7 天</option><option :value="30">近 30 天</option><option :value="90">近 90 天</option></select></label></div>
      <div v-if="chart.points.length" class="traffic-chart-scroll"><svg class="traffic-chart" viewBox="0 0 700 220" role="img" :aria-label="'近'+range+'天'+label+'趋势，准确数值见下方每日数据表'"><g v-for="n in [0,1,2]" :key="n"><line x1="48" x2="652" :y1="170-n*69" :y2="170-n*69" class="chart-grid"/><text x="38" :y="174-n*69" text-anchor="end">{{Math.ceil(chart.max*n/2)}}</text></g><polyline v-for="(points,i) in chart.segments" :key="i" :points="points" class="chart-line"/><circle v-for="p in chart.points" :key="p.date" :cx="p.x" :cy="p.y" r="4" class="chart-point"><title>{{p.date}} · {{p.value}} {{metric==='uv'?'位去重访客':'次页面访问'}}</title></circle><text x="48" y="204">{{trend[0]?.date}}</text><text x="652" y="204" text-anchor="end" v-if="trend.length>1">{{today}}</text></svg></div>
      <div v-else class="traffic-empty"><strong>历史从今天开始积累。</strong><p>读取到的真实记录会逐日出现在这里；启用之前不补数据。</p></div>
      <details class="traffic-data"><summary>查看每日数据表</summary><div class="traffic-table-scroll"><table><caption>近 {{range}} 天的每日访问记录（北京时间）；启用当天仅含启用后的访问</caption><thead><tr><th scope="col">日期</th><th scope="col">去重访客</th><th scope="col">页面访问</th><th scope="col">记录状态</th></tr></thead><tbody><tr v-for="d in trend" :key="d.date"><th scope="row">{{d.date}}</th><td>{{number(d.record?.uv)}}</td><td>{{number(d.record?.pv)}}</td><td>{{!d.record?'待归档':d.record.complete?'日终已归档':'当日 / 未结算'}}</td></tr></tbody></table></div></details>
    </div>
    <p class="activity-note">访客人数是匿名标识去重后的估算值；换网络、浏览器或清理记录可能影响去重。未加载脚本、离线或请求被拦截的访问可能未被计入。<a :href="withBase('/site-guide.html#traffic')">了解记录方式 →</a></p>
  </section>
</template>
