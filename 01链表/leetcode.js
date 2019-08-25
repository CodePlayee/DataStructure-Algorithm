// No.86 partition List
//Definition for singly - linked list.
 function ListNode(val) {
   this.val = val;
   this.next = null;
 }

 /*
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = function (head, x) {
  if(!head) return null
  let cur=head
  const smallFakeHead={}
  const bigFakeHead = {}
  let smaller = smallFakeHead
  let bigger = bigFakeHead
 
  while(cur){
    if(cur.val>=x){
      bigger.next=cur
      bigger=cur
    }else{
      smaller.next=cur
      smaller=cur
    }
    cur=cur.next
  }
  bigger.next=null
  smaller.next = bigFakeHead.next
  return smallFakeHead.next
};


//No.92 Reverse Linked List II
const  reverseBetween = function (head, m, n) {
  if(!head || m===n) return head
  let pos=1
  let cur=head 
  let left=prev={next:head}
 
  while(cur){
    if(pos===m){
      left=prev
      const next=cur.next
      cur.next=null
      prev=cur
      cur=next
    }else if(pos>m && pos<=n){
      const next=cur.next
      cur.next=prev
      prev=cur
      cur=next
    }else{
      if(pos===n+1){
        break
      }
      prev=cur
      cur=cur.next
    }
    pos++
  }

  left.next.next = cur
  if(left.next !==head){
    left.next = prev
  }else{
    head = prev
  }
 
  return head
}

//No.2 Add Two Numbers
const addTwoNumbers = function (l1, l2) {
  let node={}
  let result={next:node}
  if(!l1) return l2
  if(!l2) return l1
  let node1=l1.head, node2=l2.head
  let extra=0
  while(node1 && node2){
    const curSum=node1.val+node2.val+extra
    extra = Math.floor(curSum / 10)
    node.next = new ListNode(curSum % 10)
    node = node.next
    node1=node1.next
    node2=node2.next
  }
  while(node1){
    const curSum = node1.val + extra
    extra = Math.floor(curSum / 10)
    node.next=new ListNode(curSum%10)
    node=node.next
    node1=node1.next
  }
  while (node2) {
    const curSum = node2.val + extra
    extra = Math.floor(curSum / 10)
    node.next = new ListNode(curSum % 10)
    node = node.next
    node2 = node2.next
  }
  if(extra===1){
    node.next=new ListNode(1)
  }
  return result.next
};

//No.445 Add Two Numbers II
const addTwoNumbers2=(l1,l2)=>{
  let digits1=[],digits2=[]
  let node1=l1,node2=l2
  while(node1){
    digits1.push(Number(node1.val))
    node1=node1.next
  }
  while(node2){
    digits2.push(Number(node2.val))
    node2=node2.next
  }
  
  let sum=0
  let list =new ListNode(0)
  while(digits1.length || digits2.length){
    if(digits1.length) sum+=digits1.pop()
    if(digits2.length) sum+=digits2.pop()
    list.val=sum%10
    const extra = Math.floor(sum / 10)
    let head=new ListNode(extra)
    head.next=list
    list=head
    sum=extra
  }
  return list.val===0?list.next:list
}

//No.160 Intersection of Two Linked Lists
//(very smart to dismiss the difference in length of the lists)
const getIntersectionNode = function (headA, headB) {
  if(!headA || !headB) return null
  let a=headA, b=headB
  while(a!==b){
    a=a ? a.next : headB
    b=b ? b.next : headA
  }
  return a
}

//No.147 Insertion Sort List
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//after each insertion, node at the head of unsorted list is removed,
// and inserted at the proper position of sorted list,
// so the space complexity is O(1).
const insertionSortList = function (head) {
  if(!head || !head.next) return head
  const fakeHead = new ListNode(0) 
  let unsorted=head
  let prevSortedNode=fakeHead
  let nextUnsorted=null

  while(unsorted){
    nextUnsorted=unsorted.next
    //find the position to insert
    while (prevSortedNode.next && prevSortedNode.next.val<unsorted.val) {
      prevSortedNode = prevSortedNode.next
    }
    unsorted.next=prevSortedNode.next
    prevSortedNode.next=unsorted
    //reset prevSortedNode and unsorted
    prevSortedNode = fakeHead
    unsorted=nextUnsorted
  }
  return fakeHead.next
}

//No. 141 Linked List Cycle
const hasCycle=function(head){
  let fast=head,slow=head
  while(fast && fast.next){
    fast=fast.next.next
    slow=slow.next
    if(fast===slow){
      return true
    }
  }
  return false
}

//No. 142 Linked List Cycle II
const detectCycle=head=>{
  let fast=head,slow=head
  let hasCycle=false
  
  while(fast && fast.next){
    fast=fast.next.next
    slow=slow.next
    if(fast===slow){
      hasCycle=true
      break
    }
  }
  if(!hasCycle) return null
  slow=head
  while(fast!==slow){
    fast=fast.next
    slow=slow.next
  }
  return slow
}

//No. 203 Remove Linked List Elements
//(remove all the nodes who's val equal to the given val)
const removeElements = function (head, val) {
  if(!head || !val) return head
  let curNode=head
  let prev=null
  while(curNode){
    if(curNode.val===val){
      if(prev){
        prev.next=curNode.next
      }else{
        head=curNode.next
      }
    }else{
      prev = curNode
    }
    curNode = curNode.next
  }
  return head
}

//No.876 Middle of the Linked List
const middleNode = function (head) {
  if(!head) return head
  let fast=head,slow=head
  while(fast && fast.next){
    fast=fast.next.next
    slow=slow.next
  }
  return slow
}

//No.1019 Next greater node in the linked list
/**
 * @param {ListNode} head
 * @return {number[]}
 */
// one solution that is quite stupid
const nextLargerNodes = function (head) {
  let res=[]
  if(!head) return res
  let curNode=head
  let maxInRight=0
  while(curNode){
    let curVal = curNode.val
    if (curVal===maxInRight){
      maxInRight=0
      res.push(0)
    }else{
      let node = curNode.next
      while (node) {
        maxInRight=node.val>maxInRight ? node.val : maxInRight
        if (node.val > curVal) {
          res.push(node.val)
          maxInRight=0
          break
        } else {
          node = node.next
        }
      }
      if (!node) {
        res.push(0)
      }
    }
    curNode=curNode.next
  }
  return res
}

//(1) We remove elements from the stack until the top of the stack is larger than the current element.
//    We do not need those elements - the current value will be used instead for the remaining elements.
//(2)The top of the stack is now our next greater element.
//(3) We push the current element to the stack.
const nextLargerNodes2=head=>{
  //transform the linked lis to an array firstly
  const res=[]
  for(let node=head; node; node=node.next){
    res.push(node.val)
  }
  let stack=[]
  //process from right to left
  for(let i=res.length-1;i>=0;i--){
    const val = res[i]
    while(stack.length>0 && stack[stack.length-1]<=val){
      stack.pop()
    }
    res[i] = stack.length > 0 ? stack[stack.length-1] : 0
    stack.push(val)
  }
  return res
}


