import fs from 'node:fs';
import config from '../traffic.config.json' with {type:'json'};
import {validateHistory} from './traffic-core.mjs';
const file=process.argv[2];if(!file)throw Error('History JSON path required');
const history=validateHistory(JSON.parse(fs.readFileSync(file,'utf8')),config);
if(!history.activation){
  const {TRAFFIC_ACTIVATION_AT:confirmedAt,TRAFFIC_ACTIVATION_SHA:commit,TRAFFIC_ACTIVATION_RUN:runUrl}=process.env;
  if(!Number.isFinite(Date.parse(confirmedAt))||!/^[a-f\d]{40}$/.test(commit??'')||!/^https:\/\/github\.com\/langwangluoji\/study-space\/actions\/runs\/\d+$/.test(runUrl??''))throw Error('Verified deployment metadata required');
  history.activation={confirmedAt,commit,runUrl};
  fs.writeFileSync(file,JSON.stringify(history,null,2)+'\n');
  console.log('First successful publication confirmation recorded.');
}else console.log('Existing activation record retained.');
