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


