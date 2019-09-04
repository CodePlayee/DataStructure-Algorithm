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
const asteroidCollision = function (asteroids) {
  const len=asteroids.length
  if(!len || len===1) return asteroids
  const stack=[]
  for(let i=0;i<len;i++){
    const stackLen=stack.length
    if(stackLen===0){
      stack.push(asteroids[i])
      continue
    }
    if (stack.length>0){
      if (stack[stackLen-1]<0 && asteroids[i]>0){ // [...,-1],2
        stack.push(asteroids[i])
      }else if(stack[stackLen-1]*asteroids[i]<0){ // collision occurs
        const top=stack.pop()
        const compare = Math.abs(top) - Math.abs(asteroids[i])
        if(compare>0){
          stack.push(top)
        }else if(compare<0){
          //stack.push(asteroids[i])
          while(stack.length>0){
            const pop=stack.pop()
            if (asteroids[i]*pop<0){
              if(pop<0 && asteroids[i]>0){
                stack.push(pop)
                break
              }else if (Math.abs(asteroids[i]) - Math.abs(pop) < 0){
                stack.push(pop)
                break
              }
            }else{
              stack.push(asteroids[i])
              break
            }
          }
          if(stack.length===0){
            stack.push(asteroids[i])
          }
        }
      }else{ //符号相同
        stack.push(asteroids[i])
      }
    }
  }
  return stack
};

(function () {
  console.log(asteroidCollision([-2, -1, 1, 2]))
})()