// more., any, grandma, call, can, I, one, no, is, there,
//   and, today,, suddenly, away, passed, grandma, Mysufferings., heavy, your, of, think, crying, myself, help, can't,I,world,
// and, this, leaving, you, when, side, your,in, not, was, I, that, painful, so, feel, Igraduate., I'll,when,time,the,even,me,,remember,always,you,persons,
// but, many, forgot, you, things,, many, forgot, Yougrandson.'.,my,day,,that,for,wait,saying:'I'll,warmly,,smiled,money...',
//   you, of, lot, a, you, give, I'll,and,money,,of,bulks,make,I'll, year,
//     and, next, school, from, graduate, I'll,'Grandma,, said:, I, year,, the,in, Earlychildren., my, see, to, even, enough, long, long,, live, you'll,thought,,always,year,
// I, each, times, several, only, you,for, visited, I, years,, past, the, Forpities., the, all,for, up, make, to, nothing,do, can, I,
//   and, forever,, grandma, my, lost, I, true,, come, never, will, day, the, However, way.
// 2019 / 08 / 26, my,in, alone, never, I'm,heaven,,the,in,me,at,look,always,will,you,know,
// I, bless,, your,with, you,, remember, to, is, now,do, can, I, thing, only, The


//leetcode No.132 Pattern
// tips:
// s2: number in the stack
// s3: maximum in the poped out.
const find132pattern = function (nums) {
  if(!nums) return false
  const len=nums.length
  if(len<3) return false

  let s3=-Infinity
  let stack=[]
  for(let i=len-1;i>=0;i--){
    if(nums[i]<s3) return true
    while(stack.length>0 && nums[i]>stack[stack.length-1]){
      s3=stack.pop()
    }
    stack.push(nums[i])
  }
  return false
};

// leetcode 735
// iterate from left to right,
// only 4 scenarios will happen: (1)++ (2)-- (3)+- (4)-+
//and collision occurs only when +-. 
const asteroidCollision = function (asteroids) {
  const len=asteroids.length
  if(!len || len===1) return asteroids
  const stack=[]
  for(let i=0;i<len;i++){
    const cur = asteroids[i]
    if(cur>0){
      stack.push(cur)
    }else{
      while (stack.length > 0 && stack[stack.length - 1] > 0 && -cur > stack[stack.length - 1]){
        stack.pop()
      }
      if(stack.length===0 || stack[stack.length-1]<0){
        stack.push(cur)
      } else if (stack[stack.length - 1]===-cur){
        stack.pop()
      }
    }
  }
  return stack
};

//No.844 Backspace String Compare
const backString=(s,t)=>{
  for(let i=s.length-1,j=t.length-1;;i--,j--){
    for(let skip=0;i>=0 && (skip>0 || s[i]==='#');--i){
      skip+=s[i]==='#' ? 1:-1
    }
    for(let skip=0;j>=0 && (skip>0 || t[j]==='#');--j){
      skip+=t[j]==='#'? 1:-1
    }
    if(i<0 || j<0 || s[i]!==t[j]){
      return i===-1 && j===-1
    }
  }
}

//No.739 Daily Temperatures(need more time to digest)
const dailyTemperatures = function (T) {
  const stack=new Array(T.length)
  let top=-1
  const res=new Array(T.length).fill(0)
  for(let i=0;i<T.length;i++){
    while(top>-1 && T[i]>T[stack[top]]){
      const index=stack[top--]
      res[index]=i-index
    }
    stack[++top]=i
  }
  return res
}

//No.394 Decode String
//原创解法，多次遍历字符串，使用了递归，但是实际运行时间居然比下面的解法更少
const decodeString=str=>{
  const helper=str=>{
    if(str.indexOf('[')===-1) return str
    const len = str.length
    const stack = []
    for (let i = 0; i < len; i++) {
      if (str[i] !== ']') {
        stack.push(str[i])
      } else {
        let seg = []
        let pop = stack.pop()
        while (pop !== '[') {
          seg.push(pop)
          pop = stack.pop()
        }
        let digitsForK=[]
        let digit = parseInt(stack.pop())
        while(digit || digit===0){
          digitsForK.push(digit)
          digit = parseInt(stack.pop())
        }
        const k = parseInt(digitsForK.reverse().join(''))
        const repeatSeg = seg.reverse().join('').repeat(k)
        let strArr = str.split('')
        strArr.splice(i - seg.length - digitsForK.length - 1, seg.length + digitsForK.length+2,repeatSeg)  
        
        return helper(strArr.join(''))
      }
    }
  }
  return helper(str)
}
//理论上更好的解法，一次遍历即可，无需递归
const decodeString2=str=>{
  const intStack=[]
  const strStack=[]
  let curStr=''
  let k=0
  for(let i=0,len=str.length;i<len;i++){
    const char=str[i]
    const digit = parseInt(char)
    if(digit || digit===0){
      k=k*10+digit
    } else if (char==='['){
      intStack.push(k)
      strStack.push(curStr)
      curStr=''
      k=0
    }else if(char===']'){
      const tempStr=curStr
      curStr=strStack.pop()
      curStr+=tempStr.repeat(intStack.pop())
    }else{
      curStr+=char
    }
  }
  return curStr
}

//No.880 Decoded String at Index
const decodeAtIndex=(s,k)=>{
  let size=0 
  const N=s.length
  // the length of decoded string(size)
  for(let i=0;i<N;++i){
    const char=s[i]
    const digit=parseInt(char)
    if(digit){
      size*=digit
    }else{
      size++
    }
  }

  for(let i=N-1;i>=0;--i){
    const char=s[i]
    k%=size
    const digit=parseInt(char)
    if(k===0 && /[a-z]/.test(char)){
      return char
    }
    if(digit){
      size/=digit
    }else{
      size--
    }
  }
}


