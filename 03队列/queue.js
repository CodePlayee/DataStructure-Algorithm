//数组实现的普通队列(可充分利用数组中设定容量的每个位置)
//注意js数组与其他语言中数组的区别
//tail指向的位置是下一个元素进栈所在的索引
class Queue{
  constructor(capacity){
    this.head=0
    this.tail=0
    this.capacity=capacity //队列容量
    this.items=new Array(capacity)
    //this.items.fill(0) 
  }

  enqueue(ele){
    if(this.tail>=this.capacity){
      if(this.head===0){ //队列完全满了
        return false
      }else{
        const head=this.head
        //队列到达末端且前面还有空位，则将队列中元素向前搬移
        for(let i=head;i<this.tail;i++){
          this.items[i-head]=this.items[i]
        }
        this.tail = this.tail - head
        this.head=0
      }
    }
    this.items[this.tail]=ele
    this.tail++
    return true
  }

  dequeue(){
    if(this.head===this.tail){
      return false
    }
    const ele = this.items[this.head]
    this.items[this.head]=null
    this.head++
    return ele
  }
  
  logAll(){
    let msg=''
    for(let i=this.head;i<this.tail;i++){
      if(i===this.tail-1){
        msg += this.items[i]
      }else{
        msg += this.items[i] + '=<' 
      }
    }
    console.log('elements in the queue:',msg)
  }
}

//数组实现的环形队列(tail指向的位置如果是数组唯一空位，将不可再进栈)
//tail 指向的位置实际上是没有存储数据的。所以，循环队列会浪费一个数组位置的存储空间。

极客时间版权所有: https://time.geekbang.org/column/article/41330

极客时间版权所有: https://time.geekbang.org/column/article/41330
//免去了数组搬移的开销

class RingQueue{
  constructor(capacity) {
    this.head = 0
    this.tail = 0
    this.capacity = capacity //队列容量
    this.items = new Array(capacity)
  }

  dequeue(){
    const head=this.head
    if(head===this.tail){
      return false
    }
    const ele=this.items[head]
    this.items[head]=null
    this.head=(head+1) % this.capacity
    return ele
  }

  enqueue(ele){
    const {head,tail,capacity}=this
    if( (tail+1) % capacity===head){
      return false
    }
    this.items[tail]=ele
    this.tail=(tail+1)%capacity
    return true
  }

  logAll(){
    const { head, tail, items,capacity } = this
    let msg=''
    if(head<tail){
      for (let i = head; i < tail; i++) {
        if (i === tail - 1){
          msg+=items[i]
        }else{
          msg+=items[i]+'<='
        }
      }
    }else{
      for(let i=head;i<capacity;i++){
        msg += items[i] + '<='        
      }
      for(let i=0;i<tail;i++){
        if (i === tail - 1) {
          msg += items[i]
        } else {
          msg += items[i] + '<='
        }
      }
    }
    console.log(msg)
  }

}
