// 结点
function Node(val){
  this.val=val;
  this.next=null;
}

//single link list
function SingleLinkList(head){
  this.head=head;
  head? this.count=1 : this.count=0
}

//末尾追加结点
SingleLinkList.prototype.appendNode=function(newNode){
  if(!newNode) return this
  let node=this.head
  if(!node){
    this.head =newNode
    this.count++
    return
  }
  while(node.next){
    node=node.next
  }
  node.next=newNode
  this.count++
}

//insert at index i
SingleLinkList.prototype.insertByIndex=function(index,nodeToInsert){
  let i=0;
  let prevNode=null
  let node=this.head
  while(node && i!==index){
    prevNode=node
    node=node.next
    i++
  }
  if(node){
    if(prevNode){
      prevNode.next=nodeToInsert
      nodeToInsert.next=node
    }
    else{
      nodeToInsert.next = node
      this.head=nodeToInsert
    }
  }
  else if(i===index){
    prevNode.next = nodeToInsert
  }
  else{
    return -1
  }
  this.count++
  return index
}

//remove at index i
SingleLinkList.prototype.removeByIndex=function(index){
  let i=0
  let prevNode=null
  let node=this.head
  while(node){
    if(i===index){
      if(prevNode){
        prevNode.next=node.next
      }
      else{
        this.head=node.next
      }
      node.next = null
      this.count--
      return node
    }
    i++
    prevNode=node
    node=node.next
  }
  return -1
}

//删除链表倒数第n个结点
//方法一：借助已有功能，先倒转，再顺序删除，最后逆转链表，但不高效
SingleLinkList.prototype.removeByLastIndex=function(index){
  if(index>this.count){
    return -1
  }
  const reversedList=this.reverse()
  reversedList.removeByIndex(index-1)
  return reversedList.reverse()
}
//方法二：借助链表结点总数减去逆序删除序号，直接进行顺序删除
SingleLinkList.prototype.removeByLastIndex2=function(index){
  const removeIndex=this.count-index
  if(removeIndex<0) return
  this.removeByIndex(removeIndex)
  return this
}

//reverse the list
SingleLinkList.prototype.reverse=function(){
  let node=this.head
  let prevNode=null
  while(node){
    const nextNode=node.next
    node.next=prevNode
    prevNode=node
    node=nextNode
  }
  this.head=prevNode
  return this
}

//环的检测
SingleLinkList.prototype.isRing=function(){
  let fast=this.head
  let slow=this.head
  while(fast && fast.next){
    fast=fast.next.next
    slow=slow.next
    if(fast===slow){
      return true
    }
  }
  return false
}

//log all node val of the single link list
SingleLinkList.prototype.logAll=function(){
  let node=this.head
  let res='All nodes val:'
  while(node){
    res+='=>'+node.val
    node=node.next
    if(node===this.head){
      break
    }
  }
  console.log(res)
}

//根据传入的简单值数组，快速创建一个链表
function createListFromArr(arr){
  const list=new SingleLinkList(new Node(arr[0]))
  for(let i=1,len=arr.length;i<len;i++){
    list.appendNode(new Node(arr[i]))
  }
  return list
}

//search for the index of the given node
SingleLinkList.prototype.indexOfNode=function(tNode){
  let node=this.head
  let i=0
  while(node && node.val!==tNode.val){
    node=node.next
    i++
  }
  return node ? i : -1
}

// LRU cache
function LRU(storage,list,node){
  const index = list.indexOfNode(node)
  if(list.count<storage){
    if(index===-1){
      list.insertByIndex(0,node)
    }
    else{
      list.removeByIndex(index)
      list.insertByIndex(0,node)
    }
  }
  else{
    if(index===-1){
      list.removeByIndex(storage-1)
      list.insertByIndex(0,node)
    }
    else{
      list.removeByIndex(index)
      list.insertByIndex(0,node)
    }
  }
  return list
}

// 回文字符串判断
function isHuiwenStr(list){
  let fast=list.head
  let slow=list.head
  let beforeSlow=null
  while(fast && fast.next){
    fast=fast.next.next
    const nextSlow=slow.next
    slow.next = beforeSlow
    beforeSlow=slow
    slow = nextSlow
  }
  let left
  let right
  if(fast){ // 0 1 2 3 4
    left=beforeSlow
    right=slow.next
  }
  else{ // 0 1 2 3
    left = beforeSlow
    right = slow
  }

  while (left && right) {
    if (left.val !== right.val) {
      return false
    }
    left = left.next
    right = right.next
  }
  if (!left && !right) {
    return true
  }
  return false 
}

//合并两个有序链表(此操作不改变原有两个有序链表)
function merge2sortedLists(list1,list2){
  let node1=list1.head
  let node2=list2.head
  let node
  const res=new SingleLinkList()

  while(node1 && node2){
    if (node1.val < node2.val){
      node=new Node(node1.val)
      node1=node1.next
    }
    else{
      node=new Node(node2.val)
      node2=node2.next
    }
    res.appendNode(node)
  } 
  res.appendNode(node1)
  res.appendNode(node2)
  return res
}

// leetcode 61
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head || k === 0) return head
  var node = head;
  var count = 0;
  var tail = null;
  while (node) {
    tail = node;
    node = node.next;
    count++;
  }
  if (k === count || k % count === 0) return head;
  var index = count - k % count;
  var loc = 0;
  node = head;
  var newTail = null;
  while (loc < index) {
    newTail = node;
    node = node.next;
    loc++;
  }
  newTail.next = null;
  tail.next = head;
  head = node;
  return head;
};

// leetcode 82
var deleteDuplicates = function (head) {
  if (head == null) return null;
  var FakeHead = new Node(0);
  FakeHead.next = head;
  var pre = FakeHead;
  var cur = head;
  while (cur) {
    while (cur.next && cur.val == cur.next.val) {
      cur = cur.next;
    }
    if (pre.next == cur) {
      pre = pre.next;
    }
    else {
      pre.next = cur.next;
    }
    cur = cur.next;
  }
  return FakeHead.next;
};

