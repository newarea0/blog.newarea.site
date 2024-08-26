/**
 * 排序二维数组，可用于权重排序，如 CSS 样式的权重计算。原理是计算差异数组并找到第一个非零值。
 * @param arr 待排序数组
 * @param direction 排序方向
 * @example
 * var arr = [
 *   [3, 5],
 *   [1, 2],
 *   [2, 4],
 *   [3, 3],
 *   [2, 5],
 *   [1, 1],
 *   [0, 9]
 * ]
 * sortTwoDimensionArr(arr) // [[0, 9], [1, 1], [1, 2], [2, 4], [2, 5], [3, 3], [3, 5]]
 */
export  function sortTwoDimensionArr(arr: number[][], direction: 'ascend' | 'descend' = 'ascend') {
  return arr.sort((arr1, arr2) => {
    const diff = arr1.map((el, index) => el - arr2[index])
    const temp = diff.find(el => el !== 0) as number
    return direction === 'ascend' ? temp : 0 - temp
  })
}