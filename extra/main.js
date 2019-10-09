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

const log=console.log


// const promiseA= Promise.resolve('a')
// promiseA.then(res=>log(res)).then(res=>log(res))
// const promiseB = Promise.resolve('b')
// promiseB.then(res => log(res))
// promiseB.then(res => log(res))


function fn(){
  return ()=>{
    return ()=>{
      return ()=>{
        log(this.name)
      }
    }
  }
}

const f=fn.call({name:'foo'})
f.call({name:'bar'})()()
f().call({name:'baz'})()
f()().call({name:'qux'})

