/**
* 将二维数组垂直方向元素转换为水平方向
* @param arr 二维数组（内部数组长度一致）
* @returns {*[]} 二位数组
* @example
* let a = [
*  [1, 2, 3, 4],
*  ['a', 'b', 'c', 'd'],
*  ['A', 'B', 'C', 'D']
* ]
* return
* [
*   [1, 'a', 'A'],
*   [2, 'b', 'B'],
*   [3, 'c', 'C'],
*   [4, 'd', 'D']
* ]
* arrTransform(a)
*/
function arrTransform(arr) {
  let o = {}
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (!o[j]) o[j] = [arr[i][j]]
      else o[j].push(arr[i][j])
    }
  }
  return Object.keys(o).map(key => o[key])
 }

let input = [
  [1, 2, 3, 4],
  ['a', 'b', 'c', 'd'],
  ['A', 'B', 'C', 'D']
]

console.log(arrTransform(input))

const output = [
  [1, 'a', 'A'],
  [2, 'b', 'B'],
  [3, 'c', 'C'],
  [4, 'd', 'D']
]
