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

// BiliBili test(the following 3)
//1.复数字符串乘法
const complex=(str1,str2)=>{
  const arr1=[],arr2=[];
  str1.replace('i','').split('+').forEach(element => {
    arr1.push(parseInt(element))
  });

  str2.replace('i','').split('+').forEach(element => {
    arr2.push(parseInt(element))
  });

  return arr1[0]*arr2[0]-arr1[1]*arr2[1]+'+'+
   arr1[0]*arr2[1]+arr1[1]*arr2[0]+'i';
}

//2.日期判断
const getWhichDay=(str)=>{
  const arr=str.split('-')
  const year=parseInt(arr[0])
  const month=parseInt(arr[1])
  const day=parseInt(arr[2])

  const monthDays=[31,28,31,30,31,30,31,31,30,31,30,31]
  let whichDay=0
  for(let i=0;i<month;i++){
    whichDay+=monthDays[i]
  }
  if(year%400===0 || (year%4===0 && year%100!==0)){
    whichDay++
  }
  return whichDay
}

//3.按群组逆序链表
const reverseLinkListByGroup=(arr,n)=>{
  const len=arr.length
  let res=[]
  if(len<n){
    arr.forEach(item=>res.push(item+'->')) 
    res.pop()
    return res.join('')
  }
  const segCount=Math.floor(len/n)
  for(let i=0;i<segCount;i++){
    for(let j=(i+1)*n-1; j>=i*n; j--){
      res.push(arr[j])
    }
  }
  
  res=[...res,...arr.slice(segCount*n)]

  let resStr=''
  for(let j=0;j<res.length-1;j++){
    resStr+=res[j]+'->'
  }
  resStr+=res[len-1]
  return resStr
}


//yuanfudao test online
//1.逆时针按圈输出矩阵
const logMatrixCounterClockly=(n,m,arr)=>{
  let startX=0,startY=0,endX=m-1,endY=n-1
  const res=[]

  while(startX<=endX && startY<=endY){
    //up to bottom
    if(startY<=endY){
      for(let i=startY;i<=endY;i++){
        res.push(arr[i][startX])
      }
    }
    //left to right
    if(startX<endX){
      for(let i=startX+1;i<=endX;i++){
        res.push(arr[endY][i])
      }
    }
    //bottom to up
    if(startX<endX && startY<endY){
      for(let i=endY-1;i>=startY;i--){
        res.push(arr[i][endX])
      }
    }
    //right to left
    if(startX<endX-1 && startY<endY){
      for(let i=endX-1;i>=startX+1;i--){
        res.push(arr[startY][i])
      }
    }
    startX++
    startY++
    endX--
    endY--
  }
  return res
}

// Tencent
//1.顺时针按圈输出矩阵
const logMatrixRing=(n,arr)=>{
  let startX=0,startY=0,endX=n-1,endY=n-1
  const res=[]
  if(n===0) return res

  while(startX<=endX && startY<=endY){
    for(let i=startX;i<=endX;i++){
      res.push(arr[startY][i])
    }
  
    for(let i=startY+1;i<=endY;i++){
      res.push(arr[i][endX])
    }
   
    if(startX!==endX){
      for(let i=endX-1;i>=startX;i--){
        res.push(arr[endY][i])
      }
    }
    //bottom to up
    if(startY!==endY){
      for(let i=endY-1;i>startY;i--){
        res.push(arr[i][startX])
      }
    }
   
    startX++
    startY++
    endX--
    endY--
  }
  return res
}

// 2.
const validateTime=(year,month,day)=>{
  let year2=year, month2=month, day2=day
  const isSpecial=year=>{
    if((year%4===0 && year%100) || (year%400===0 && year%3200)
     || year%172800===0){
      return true
    }
    return false
  } 
  
  const special=isSpecial(year)
  const monthDays=special ? [31,29,31,30,31,30,31,31,30,31,30,31]:[
    31,28,31,30,31,30,31,31,30,31,30,31
  ]
  //monthDays[1]=special ? 29 : 28

  if(month===12 && day>31){
    month2=1
    day2-=31
    year2++
  }else if(special && month===2 && day>29){
    month2=3
    day2-=28
  }else if(day>monthDays[month+1]){
    day2-=monthDays[month+1]
    month2++
  }

  day2=day2<10 ? '0'+day2 :day2
  month2=month2<10 ? '0'+month2 : month2
  return [year2,month2,day2].join('-')

}

// NetEase online test 09/21
const map=new Map()
const func=(a,b,p,q)=>{
  if(a+p>=b) return 1
  const str=[a,b,p,q].join('-')
  if(map.has(str)) return map.get(str)
  const res= Math.min(
    func(a+p,b,p,q)+1,
    func(a,b,p*q,q)+1
  )
  map.set(str,res)
  return res
}