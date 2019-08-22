
function Node(val, prev, next, child){
  this.val=val;
  this.next=next;
  this.prev=prev;
  this.child=child;//normal node don't has the child necessarily.
}

//leetcode No.430: Flatten a Multilevel Doubly Linked List
/**
 * @param {Node} head
 * @return {Node}
 */
// ??????
const flatten = function (head) {
  const helper=(childHead,parentNode,parentNextNode)=>{
    if (!childHead) return null
    parentNode.next=childHead
    childHead.prev=parentNode
    let prevNode = parentNode
    let curNode = childHead
    while(curNode){
      if (!curNode.child) {
        prevNode = curNode
        curNode = curNode.next
      } else {
        const oldNextNode = curNode.next
        helper(curNode.child, curNode, curNode.next)
        curNode.child=null
        curNode = oldNextNode ? oldNextNode : null
      }
    }
    prevNode.next=parentNextNode
    parentNextNode ? parentNextNode.prev=prevNode : null
    return parentNode
  }
  
  const fakeHead={child:head}
  helper(head,fakeHead,null)
  return fakeHead.child
};

//???????
const flatten2=function(head){
  if(!head) return head
  let node=head
  while(node){
    if(!node.child){
      node=node.next
      continue
    }
    let temp=node.child
    //find the tail node of the child
    while(temp.next){
      temp=temp.next
    }
    temp.next=node.next
    if(node.next){node.next.prev=temp}
    node.next=node.child
    node.child.prev=node
    node.child=null
  }
  return head
}

//test for Leetcode 430
const bundleCreateNode = (arr) => {
  const result=new Array(arr.length)
  const head=new Node(arr[0])
  result[0]=head
  let curNode=head
  let prevNode=null
  for(let i=1;i<arr.length;i++){
    prevNode=curNode
    curNode=new Node(arr[i])
    prevNode.next=curNode
    curNode.prev=prevNode
    result[i]=curNode
  }
  return result
}
  
const testForFlatten=()=>{
  const list0 = bundleCreateNode([1, 2, 3, 4, 5, 6])
  const list1 = bundleCreateNode([7, 8, 9, 10])
  const list2 = bundleCreateNode([11, 12])

  list0[2].child = list1[0]
  list1[1].child = list2[0]
  console.log(list0)

  console.log(flatten(list0[0]))
}

