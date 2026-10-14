// VitePress 1.6.4 leaves a throttled outline scroll callback queued after the
// aside is unmounted. Moving from a lesson to an aside:false page can then
// dereference a cleared marker ref. Keep the upstream behavior while mounted.
export function outlineLifecycleGuard(){
  return {
    name:'study-space-outline-lifecycle',
    enforce:'pre',
    transform(source,id){
      const file=id.replaceAll('\\','/').split('?')[0];
      if(!file.includes('/vitepress/')||!file.endsWith('/theme-default/composables/outline.js'))return null;
      const entry='function activateLink(hash) {';
      if(!source.includes(entry))throw Error('VitePress outline changed; review the lifecycle guard before building.');
      return {code:source.replace(entry,entry+'\n        if (!container.value || !marker.value) return;'),map:null};
    }
  };
}
