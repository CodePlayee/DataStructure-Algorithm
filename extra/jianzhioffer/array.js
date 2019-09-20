//1.数组中重复的数字
function duplicate(numbers, duplication) {
  // write code here
  //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
  //函数返回true/false
  for(let i=0,len=numbers.length;i<len;i++){
    const nextIndex=numbers.indexOf(numbers[i],i+1)
    if(nextIndex!==-1){
      duplication[0]=numbers[i]
      return true
    }
  }
  return false
}

//2.构建乘积数组
function multiply(array) {
  const len=array.length
  const B=new Array(len).fill(1)
  let multi=1
  for(let i=0;i<len;i++){
    B[i]=multi
    multi*=array[i]
  }
  multi=1
  for(let i=len-1;i>=0;i--){
    B[i]*=multi
    multi*=array[i]
  }
  return B
}

//3.二维数组中的查找
//方法一：顺序查找（暴力法，毫无技巧可言）
function Find(target, array) {
  // write code here
  const rowLength=array.length
  const colLength=array[0].length
  for(let i=0;i<rowLength;i++){
    if(array[i][0]<=target && array[i][colLength-1]>=target){
      for(let j=0;j<colLength;j++){
        if(array[i][j]===target){
          return true
        }
      }
    }else if(array[i][0]>target){
      return false
    }
  }
  return false
}

//方法二
// 矩阵中的数字是有序的，在左下角，向上递减，向右递增
// 故从左下角（leftBottom）开始查找，
//当 target 比 leftBottom 大时，向右查找；
//当 target 比 leftBottom 小时，向上查找
//时间复杂度为 O(n)
function Find(target, array) {
  const rowCount = array.length
  const colCount=array[0].length
  let rowIndex =rowCount-1
  let colIndex = 0
  for(;rowIndex>=0 && colIndex<colCount;){
    const leftBottom = array[rowIndex][colIndex]
    if(leftBottom>target){
      rowIndex--
      continue
    }else if(leftBottom<target){
      colIndex++
      continue
    }else{
      return true
    }
  }
  return false
}

//4.旋转数组的最小数字
function minNumberInRotateArray(rotateArray) {
  // write code here
  const len=rotateArray.length
  if(len===0) return 0
  let min =Infinity
  for(let i=0;i<len-1;i++){
    if(rotateArray[i]>rotateArray[i+1]){
      return rotateArray[i+1]
    }else{
      if(rotateArray[i]<min){
        min=rotateArray[i]
      }
    }
  }
  min=min<rotateArray[len-1] ? min : rotateArray[len-1]
  return min
}