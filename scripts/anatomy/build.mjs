import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
for(const name of ['ml','optimization','earth-observation','photogrammetry']){
 const r=spawnSync(process.execPath,[`scripts/anatomy/build-${name}.mjs`],{stdio:'inherit'});
 if(r.status!==0)process.exit(r.status??1);
}
fs.copyFileSync('scripts/anatomy/LICENSE','public/anatomy/LICENSE');
