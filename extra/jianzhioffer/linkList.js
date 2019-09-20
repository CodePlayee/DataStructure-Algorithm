//以下题号仅代表做题顺序，搜原题时直接输入题目名称
//1.链表中环的入口结点
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
// 快慢指针。快指针一次走两步，慢指针一次走一步，设链表起点到入口结点的长度是x1，
// 快慢指针第一次相遇时距离入口结点的长度是x2+k1*ringLen，此时慢指针走了x1 + x2+k1*ringLen，
// 快指针走了2x1 + 2x2+2k1*ringLen，
// 也就是说x1 + x2+k1*ringLen的长度正好是环的一圈大小的倍数，即 x1 + x2+k1*ringLen=k2*ringLen
// x1+x2=(k2-k1)*ringLen=k*ringLen
// 此时让一个指针从起点出发，一个指针从相遇结点出发，都是一次走一步，
// 当两个指针第一次相遇时恰好是在入口结点。
function EntryNodeOfLoop(pHead) {
  if(!pHead) return null
  let fast=pHead, slow=pHead
  let n=0
  while(fast && fast.next){
    fast=fast.next.next
    slow=slow.next
    n++
    if(fast===slow){
      break
    }
  }
  if(!fast || !fast.next){
    return null
  }
   
  let start=pHead
  while(slow!==start){
    slow=slow.next
    start=start.next
  }
  return slow
}

//2.删除链表中重复的结点
function deleteDuplication(pHead) {
   if(!pHead || !pHead.next) return pHead 
   const prevHead={next:pHead}
   let prev=prevHead
   let cur=prevHead.next
   while(cur){
     if(cur.next && cur.next.val===cur.val){
       while(cur.next && cur.next.val===cur.val){
         cur=cur.next
       }
       cur=cur.next
       prev.next=cur
     }else{
       prev=cur
       cur = cur.next
     }
   }
   return prevHead.next
}

//3.从尾到头打印链表
function printListFromTailToHead(head) {
  const res=[]
  let cur=head
  while(cur){
    res.unshift(cur.val)
    cur=cur.next
  }
  return res
}

//递归解法
function printListFromTailToHead2(head){
  const res=[]
  const helper=pHead=>{
    if (pHead) {
      helper(pHead.next)
      res.push(pHead.val)
    }
    return res
  }
  return helper(head)
}

