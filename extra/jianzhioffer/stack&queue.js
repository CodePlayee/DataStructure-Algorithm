//1.用两个栈实现队列
const inStack=[]
const outStack=[]

function push(node) {
  // write code here
  inStack.push(node)
}
function pop() {
  // write code here
  if(outStack.length===0){
    while(inStack.length>0){
      outStack.push(inStack.pop())
    } 
  }
  return outStack.pop()
}