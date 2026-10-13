import ml from '../../../course.config.json';
import geodesy from '../../../geodesy.config.json';
import space from '../../../study-space.config.json';
const chapters=[...ml,...geodesy.flatMap(c=>[c,...c.topics]),...space.courses.filter(c=>!['ml','geodesy'].includes(c.id)).flatMap(c=>c.chapters??[])];
const titles=new Map(chapters.map(c=>['/study-space/'+c.slug+'.html',c.title]));
export function readingTitle(path){return typeof path==='string'?titles.get(path.split('#')[0]):undefined}
