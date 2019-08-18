// the definition of binary tree node(链式存储法)
function Node(val){
  this.val=val
  this.left=null
  this.right=null
}

//前序遍历(递归)
function preOrder(r){
  if(!r) return
  console.log(r.val)
  preOrder(r.left)
  preOrder(r.right)
}

//按层遍历(输出不区分层)
function traverseByLevel(root){
  const activeNodes=[]
  activeNodes.push(root)
  let res=''
  while(activeNodes.length>0){
    const node=activeNodes.shift()
    res+=node.val+'=>'
    if(node.left){
      activeNodes.push(node.left)
    }
    if(node.right){
      activeNodes.push(node.right)
    }
  }
  console.log(res)
}

//按层遍历（输出分层）
function traverseByLevel2(root){
  let curLevel=[root]
  let nextLevel=[]
  const res = [[root]]

  while(true){
    if(curLevel.length===0){
      if (nextLevel.length === 0) {
        break
      } else {
        res.push(nextLevel.slice()) //注意res中保存的应该是独立副本
        curLevel=nextLevel
        nextLevel=[]
      }
    }
  
    const node=curLevel.shift()
    if(node.left){
      nextLevel.push(node.left)
    }
    if(node.right){
      nextLevel.push(node.right)
    }
  }
  return res
}

//二叉查找树（BST）
class BST{
  constructor(root){
    this.root=root
  }

  find(val){
    let node=this.root
    while(node){
      if (node.val === val) {
        return node
      } else if (node.val < val){
          node=node.right
      }else{
          node=node.left
      } 
    }
    return null
  }

  insert(newNode){
    let node=this.root
    if(!node){
      this.root=newNode
      return
    }
    while(node){
      if (newNode.val > node.val) {
        if (node.right === null) {
          node.right = newNode
          return
        } else {
          node=node.right
        }
      }else{
        if(node.left===null){
          node.left=newNode
          return
        }else{
          node=node.left
        }
      }
    }
  }

  //删除一个结点（原创）
  remove(val){
    let cur = this.root
    let parent=null
    let direc=null
    let targetNode=null
    while(cur){
      if(cur.val===val){
        targetNode=cur
        //待删除结点为叶子结点
        if(!cur.left && !cur.right){
          if(parent && direc){
            parent[direc]=null
            return cur.val
          }  
        }
        //待删除结点仅有一个子结点
        else if (cur.left && !cur.right){
          if(parent && direc){
            parent[direc]=cur.left
            return cur.val
          }
        }
        else if(!cur.left && cur.right){
          if(parent && direc){
            parent[direc]=cur.right
            return cur.val
          }
        }
        //待删除的结点有两个子结点，找到其右子树最小结点
        else{
          cur=cur.right
          while(cur.left){
            cur=cur.left
          }
          this.remove(cur.val) //这里并不高效
          const removedVal=targetNode.val
          targetNode.val = cur.val //注意仅是交换所存储的数据，而非整体替换，否则会改变targetNode的子结点
          return removedVal
        }
      }else if(cur.val>val){
        parent=cur
        cur=cur.left
        direc='left'
      }else{
        parent=cur
        cur=cur.right
        direc='right'
      }
    }
    return null
  }

  //删除一个结点（更简洁高效）
  remove2(val){
    let p=this.root //待删除的结点
    let pp=null // p's parent
    while(p!=null && p.val!==val){
      pp=p
      if(val>p.val) p=p.right
      else p=p.left
    }
    if(!p) return //没找到待删除的结点
    //待删除的结点有两个子节点
    if(p.left && p.right){
      let minP=p.right //p的右子树中的最小结点
      let minPP=p //minP's parent
      while(minP.left){
        minPP=minP
        minP=minP.left
      }
      p.val=minP.val //将minP的数据替换到 p 中
      p=minP //下面就是删除原 P 结点的右子树最小结点了
      pp=minPP
    }
    //删除结点是叶子结点或仅有一个子节点
    let child=null
    if(p.left) child=p.left
    else if(p.right) child=p.right

    if(pp=null) this.root=child //删除的是根结点
    else if(pp.left===p) pp.left=child
    else pp.right=child
  }

  //求树的高度（深度、层数）
  //方法一：深度优先的递归
  getHeight(node){
    if(!node) return 0
    if(!node.left && !node.right){
      return 0
    }else{
      return Math.max(this.getHeight(node.left),this.getHeight(node.right))+1
    }
  }

  //方法二：层次遍历(求出层数，再利用 高度=层数-1)
  getHeight2(){
    let level=0
    const levelNodes=[this.root] //结点队列
    let curLevelNodesCount=levelNodes.length //当前层的结点数量
    let i=0 //当前层已出队列的结点数量
    while (curLevelNodesCount>0){
      let node=levelNodes.shift()
      i++
      if(node.left) levelNodes.push(node.left)
      if(node.right) levelNodes.push(node.right)
      //某一层的结点已经全部出队列
      if(i===curLevelNodesCount){
        level++
        curLevelNodesCount=levelNodes.length
        i=0
      } 
    }
    const height=level-1
    return height>=0? height:0
  }

  //找爹(父节点)
  getParent(targetNode){
    const targetVal = targetNode.val
    let nodes=[this.root]
    while(nodes.length>0){
      let node=nodes.shift()
      if(node.left){
        if(node.left.val===targetVal){
          return node
        }else{
          nodes.push(node.left)
        }
      }
      if(node.right){
        if(node.right.val===targetVal){
          return node
        }else{
          nodes.push(node.right)
        }
      }
    }
    return null
  }

  //查找前驱结点(前驱结点是值比目标结点小的集合中，值最大的那个)
  getFormerNode(node){
    // 1.如存在左子树，则前驱结点为左子树最大结点
    if(node.left){
      let cur=node.left
      while(cur.right){
        cur=cur.right
      }
      return cur
    }
    // 2.不存在左子树,分为两种情况
    else{
      // 2.1 node是其父节点的右孩子，此时node的前驱结点就是其父节点
      // 2.2 node是其父节点的左孩子，则往上查找一个有右子树的祖先节点,
      //并且这个祖先节点的右子树中一定能找到当前节点.
      let curNode=node
      let ancestor = this.getParent(curNode)
      while (ancestor && ancestor.left && ancestor.left.val===curNode.val){
        curNode=ancestor
        ancestor = this.getParent(curNode)
      }
       return ancestor
    }
  }

  //查找后继结点（后继结点是值比目标结点大的结点结合中，值最小的那个）
  getLaterNode(node){
    // 1.node有右子树，则后继结点为右子树最小结点
    if(node.right){
      let cur=node.right
      while(cur.left){
        cur=cur.left
      }
      return cur
    }
    // 2.node无右子树，若node为父节点的左孩子，则node的后继结点就是其父节点
    //若node为父节点的右孩子，则向上查找最近的有左子树的祖先结点，且该祖先结点的左子树中有 node
    else{
      let curNode=node
      let parent=this.getParent(curNode)
      while (parent && parent.right && parent.right.val===curNode.val){
        curNode=parent
        parent=this.getParent(curNode)
      }
      return parent //parent 要么为null，要么 parent.left.val=curNode.val
    }
  }

}