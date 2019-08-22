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
const getIntersectionNode = function (headA, headB) {
  if(!headA || !headB) return null

  const helper=(hA,hB,gap,lenA)=>{ //hA>hB
    if(!hA.next || !hB.next) return null
    let nodeA=hA.next, nodeB=hB.next
    let pos=1
    let intersection=null
    while(pos<=gap){
      nodeA=nodeA.next
      pos++
    }
    while(pos<lenA && nodeA && nodeB){
      if(nodeA===nodeB){
        intersection ? null : intersection=nodeA
      }else{
        intersection=null
      }
      nodeA=nodeA.next
      nodeB=nodeB.next
      pos++
    }
    return intersection
  }
  
  let lenA=0, lenB=0
  let nodeA=headA, nodeB=headB
  while(nodeA){
    lenA++
    nodeA=nodeA.next
  }
  while(nodeB){
    lenB++
    nodeB=nodeB.next
  }
  const gap=lenA-lenB
  if(gap>=0){
    return helper(headA,headB,gap,lenA)
  }else{
    return helper(headB,headA,gap,lenB)
  }
  return null
}

//No.147 Insertion Sort List
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//to be imroved
const insertionSortList = function (head) {
  if(!head || !head.next) return head
  let unsorted=head.next
  let prevSortedNode=null
  let curSortedNode=head
  let sortedLen=1
  while(unsorted){
    let i=0
    while (curSortedNode && i<sortedLen) {
      //find the position where the unsorted node should be inserted
      if (curSortedNode.val >= unsorted.val){
        const nextUnsorted = unsorted.next
        sortedLen++
        if(prevSortedNode) prevSortedNode.next=unsorted
        unsorted.next = curSortedNode
        unsorted = nextUnsorted
        break
      }else{
        i++
        prevSortedNode=curSortedNode
        curSortedNode=curSortedNode.next
      }
    }
    //the current unsorted node should be inserted after the last position of the sorted list.
    if (i>=sortedLen) {
      const nextUnsorted = unsorted.next
      unsorted.next=null
      prevSortedNode.next = unsorted
      sortedLen++
      // update the unsorted node
      unsorted = nextUnsorted
    }
    // restore the prevSortedNode and curSortedNode
    prevSortedNode = null
    curSortedNode = head
  }

  unsorted =null
  prevSortedNode = null
  curSortedNode = head
  return head
}


