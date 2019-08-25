const parse=(obj,str)=>{
  if(!obj) return obj
  let segs=str.split('.')
  let res
  for(let i=0;i<segs.length;i++){
    const seg=segs[i]
    const index = seg.indexOf('[')
    if(index===-1){
      res=res ? res[seg] : obj[seg]
    }else{
      if(index===0){
        res = res ? res[seg[index + 1]] : obj[seg[index + 1]]
      }else{
        const prop = seg[index - 1]
        res=res ? res[seg[index-1]]:obj[seg[index-1]]
        res=res[seg[index+1]]
      }
    }
  }
}