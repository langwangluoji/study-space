import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {scene} from './earth-observation/scene.mjs';
import {defaults} from './earth-observation/catalog.mjs';
const rows=[];
for(const [mode,changes] of [['frame',{angle:90}],['latitude',{B:-80}],['latitude',{B:45,f:.2}],['curvature',{B:-80,A:90}],['metric',{B:-80,h:3000}],['terrain',{alpha:70,beta:75}],['phase',{dr:30}],['energy',{incident:10}],['aperture',{x:50}]]){
 const p={...defaults(mode),...changes};scene(mode,defaults(mode));const cached=scene(mode,p),fresh=scene(mode,p,{cache:false});
 const keys=s=>Object.fromEntries(s.R.items.map(v=>[v.name,v.key]));assert.deepEqual(keys(cached),keys(fresh),mode+' exact runtime keys');assert.equal(cached.svg,fresh.svg,mode+' identical rendered SVG');rows.push({mode,changes,parts:cached.parts,keysIdentical:true,svgIdentical:true});
}
writeFileSync('reports/anatomy-earth/cache-equivalence.json',JSON.stringify(rows,null,2));console.log('9 changed-pose cached/uncached key and full SVG equivalence checks passed');
