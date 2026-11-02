import space from '../../../study-space.config.json';
export const courseNames={ml:'机器学习',geodesy:'大地测量',insar:'InSAR','remote-sensing':'遥感基础',optimization:'最优化',photogrammetry:'摄影测量',optics:'光学'};
export function courseForPath(path=''){
 const slug=path.replace(/^\/study-space\//,'').replace(/\.html$/,'').split('#')[0];
 if(/^(lecture-\d|cifar10-practice|course-ml|review-ml)/.test(slug))return space.courses.find(c=>c.id==='ml');
 if(/^(course-geodesy|review-geodesy|geodesy-(?!source|plan))/.test(slug))return space.courses.find(c=>c.id==='geodesy');
 return space.courses.find(c=>slug==='course-'+c.id||slug==='review-'+c.id||(!['ml','geodesy'].includes(c.id)&&slug.startsWith(c.id+'-')));
}
export function reviewFor(course){return course?'/review-'+course.id+'.html':'/review-guide.html'}
export function isCourseOverview(path=''){return /\/course-[^/]+(?:\.html)?$/.test(path)}
export function isResourcePath(path=''){return /\/(?:resources|extensions|textbooks|book-|slides-|material-|read-|geodesy-source|remote-sensing-(?:sources|glossary)|insar-sources|optimization-sources|optics-sources|photogrammetry-(?:sources|material))/.test(path)}
