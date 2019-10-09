function TreeNode(x) {
  this.val = x;
  this.left = null;
  this.right = null;
} 
//1.重建二叉树
function reConstructBinaryTree(pre, vin) {
  // write code here
  const len=pre.length
  if(len===0) return null
  const root = new TreeNode(pre[0])
  if(len===1) return root
  const rootIdx=vin.indexOf(pre[0])
  root.left = reConstructBinaryTree(pre.slice(1,rootIdx+1),vin.slice(0,rootIdx))
  root.right = reConstructBinaryTree(pre.slice(rootIdx+1),vin.slice(rootIdx+1))
  return root
}


//2.二叉树的下一个结点(找出中序遍历顺序的下一个结点)
function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;//注意这个next指向父节点
}
function GetNext(pNode) {
  // write code here
  if(!pNode) return null
  //右子树存在时，则其中序遍历下一个结点为右子树的左叶子结点
  if(pNode.right){
    let cur=pNode.right
    while(cur.left){
      cur=cur.left
    }
    return cur
  }
  //右子树不存在时，分为两种情况
  if(pNode.next){
     //（1）该结点是父节点的左孩子
    if(pNode===pNode.next.left){
      return pNode.next
    }
    //(2)该结点是父节点的右孩子，则往上查找，直到该结点所在的子树是父级结点的左孩子
    else{
      let curParent=pNode.next
      let curGrandParent=pNode.next.next
      while (curGrandParent){
        if(curParent===curGrandParent.left){
          return curGrandParent
        }
        curParent=curGrandParent
        curGrandParent=curGrandParent.next
      }
      return null
    }
  }
}

//3.对称的二叉树
//https://www.nowcoder.com/questionTerminal/ff05d44dfdb04e1d83bdbdab320efbcb?f=discussion
//方法一：递归
function isSymmetrical(pRoot) {
  const helper=(left,right)=>{
    if(left===null && right===null) return true
    if(left===null || right===null) return false
    return left.val===right.val
      && helper(left.left,right.right)
      && helper(left.right,right.left)
  }
  if(!pRoot) return true
  return helper(pRoot.left,pRoot.right)
}

//方法二:非递归
function isSymmetrical2(pRoot){
  if(!pRoot) return true
  const queue=new Array()
  queue.push(pRoot.left)
  queue.push(pRoot.right)
  while(queue.length>0){
    const left=queue.shift()
    const right=queue.shift()
    if(left===null && right===null) continue
    if(left===null || right===null) return false
    if(left.val!==right.val) return false
    //成对插入
    queue.push(left.left)
    queue.push(right.right)
    queue.push(left.right)
    queue.push(right.left)
  }
  return true
}


//4.按之字形顺序打印二叉树
function PrintByZigzag(pRoot) {
  if(!pRoot) return []
  let curLevel=[pRoot]
  const res=[]
  let index=1
  while(curLevel.length>0){
    res.push(curLevel.map(item=>item.val))
    const nextLevel=[]
    while(curLevel.length>0){
      const node=curLevel.pop()
      if(index%2===0){
        if (node.left) nextLevel.push(node.left)
        if (node.right) nextLevel.push(node.right)
      }else{
        if (node.right) nextLevel.push(node.right)
        if (node.left) nextLevel.push(node.left) 
      }
    }
    curLevel=nextLevel
    index++
  }
  return res
}


//5.把二叉树打印成多行
//方法一（非递归）
function PrintByLevel(pRoot) {
  if(!pRoot) return []
  const res=[]
  let curLevel=[pRoot]
  while(curLevel.length>0){
    const temp=[]
    const nextLevel=[]
    for(let node of curLevel){
      temp.push(node.val)
      if(node.left) nextLevel.push(node.left)
      if(node.right) nextLevel.push(node.right)
    }
    curLevel=nextLevel
    res.push(temp)
  }
  return res
}
//方法二（递归，巧妙）
//https://www.nowcoder.com/questionTerminal/445c44d982d04483b04a54f298796288?f=discussion
function PrintByLevel2(pRoot){
  const level=(root,depth,res)=>{
    if(!root) return 
    if(depth>res.length){
      res.push([])
    }
    res[depth-1].push(root.val)
    level(root.left,depth+1,res)
    level(root.right,depth+1,res)
  }
  const res=[]
  level(pRoot,1,res)
  return res
}


//6.序列化二叉树（先序遍历）
function Serialize(pRoot) {
  if(!pRoot) return '#!'
  let res=pRoot.val+'!'
  res+=Serialize(pRoot.left)
  res+=Serialize(pRoot.right)
  return res
}

//由于序列化后的字符串中，空结点也有相应的表示（#）
//所以可通过 index 依序还原得到各个结点
//这里的反序列化基于先序遍历
function Deserialize(s) {
  let index=-1
  const chars = s.split('!')
  chars.pop()
  const charsLen=chars.length
  const helper = chars=>{
    index++
    if(index>=charsLen) return 
    let node=null
    if(chars[index]!=='#'){
      node=new TreeNode(chars[index])
      node.left = helper(chars)
      node.right = helper(chars)
    }
    return node
  }
  return helper(chars)
}

const n1=new TreeNode(1)
const n2=new TreeNode(2)
const n3=new TreeNode(3)
const n4=new TreeNode(4)
const n5=new TreeNode(5)
const n6=new TreeNode(6)
const n7=new TreeNode(7)
const n8=new TreeNode(8)
const n9=new TreeNode(9)
n1.left=n2
n1.right=n3
// n2.left=n4
// n2.right=n5
// n3.left=n6
// n3.right=n7
// n5.left=n8
// n6.left=n9

//console.log(PrintByZigzag(n1))
const str = Serialize(n1)
//console.log(str)
//console.log(Deserialize(str))




