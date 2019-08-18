//基于数组实现的顺序栈
class Stack{
  constructor(n){
    this.items=new Array(n)
    this.n=n //栈的容量
    this.count=0 //当前栈中元素的个数
  }
  //push
  push(item){
    if(this.count>=this.n){
      return false
    }
    this.items[this.count]=item
    this.count++
    return true
  }
  //pop
  pop(){
    if(this.count===0) return null
    const popedItem=this.items.pop()
    this.count--
    return popedItem
  }
  //log all the elements in the stack
  log(){
    console.log(this.items.reduce((prev,cur)=>prev+'=>'+cur))
  }
}

//基于链表实现的链式栈
function Node(val){
  this.val=val
  this.next=null
}
class Stack2{
  constructor(n){
    this.items=null
    this.n=n
    this.count=0
  }
  push(node){
    if(this.count>=this.n) return false
    if(this.count===0) {
      this.items=node   
    }
    else{
      let cur=this.items
      while(cur.next){
        cur=cur.next
      }
      cur.next=node
    }
    this.count++
    return true
  }

  pop(){
    if(this.count===0) return false
    let node=this.items
    let prev=null
    while(node.next){
      prev=node
      node=node.next
    }
    if(prev) {
      prev.next=null
    }
    else{
      this.items=null
    }
    this.count--
    return node
  }

  log(){
    let node=this.items
    let res=''
    while(node){
      res+='=>'+node.val
      node=node.next
    }
    console.log(res)
  }
}


// exercise Leetcode 155
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// push(x)-- Push element x onto stack.
// pop()-- Removes the element on top of the stack.
// top()-- Get the top element.
// getMin()-- Retrieve the minimum element in the stack.
// The idea is to store the gap between the min value and the current value
const MinStack = function () {
  this.items=[]
  this.min=null
}

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  if(this.items.length===0){
    this.items.push(0)
    this.min=x
  }
  else{
    this.items.push(x-this.min) //Could be negative if min value needs to change
    if(x<this.min) this.min=x
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if(this.items.length===0) return 
  const item=this.items.pop()
  if(item<0) this.min=this.min-item
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const top= this.items[this.items.length-1]
  if(top>0){
    return top+this.min
  }
  else{
    return this.min
  }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */