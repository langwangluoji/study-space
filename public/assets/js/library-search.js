(function(root){
  function searchIndex(rows,query){
    const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if(!words.length)return [];
    return rows.map(row=>({row,score:words.reduce((n,w)=>n+(row.title.toLowerCase().includes(w)?3:0),0)}))
      .filter(({row})=>words.every(w=>(row.title+' '+row.text).toLowerCase().includes(w)))
      .sort((a,b)=>b.score-a.score).slice(0,20).map(x=>x.row);
  }
  if(typeof module!=='undefined')module.exports={searchIndex};
  if(!root.document)return;
  const input=document.querySelector('[data-global-search]');
  if(!input)return;
  const results=document.querySelector('[data-global-results]');
  const status=document.querySelector('[data-global-status]');
  input.addEventListener('input',()=>{
    const rows=searchIndex(root.LIBRARY_INDEX||[],input.value);
    results.replaceChildren();
    status.textContent=!input.value.trim()?'输入知识点或关键词，搜索全部章节。':rows.length?`找到 ${rows.length} 条结果（最多显示20条）`:'没有匹配结果，请换一个关键词。';
    rows.forEach(row=>{
      const li=document.createElement('li'),a=document.createElement('a'),meta=document.createElement('small');
      a.href=row.url;a.textContent=row.title;meta.textContent=row.course+' · '+row.chapter;
      li.append(a,meta);results.append(li);
    });
  });
})(typeof window!=='undefined'?window:globalThis);
