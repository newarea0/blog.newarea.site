/**
 * 将数组的某一元素上移或者下移
 * @param {string} type 操作类型，'up'表示上移，'down'表示下移
 * @param {array} array 要操作的数组
 * @param {number} index 要操作数组项的索引
 * @example
 * ```javascript
 * let arr = ['1', '2', '3', '4']
 * //output: false
 * console.log(upOrDown('up', arr, 0))
 *
 * //output: ['2', '1', '3', '4']
 * console.log(upOrDown('up', arr, 1))
 * ```
 */
 export const upOrDown = (type, array, index) => {
  if (type === 'up' && index === 0) {
    return false
  } else if (type === 'down' && index === (array.length - 1)) {
    return false
  }
  let changeItem = type === 'up' ? array[index-1] : array[index+1]
  if (type === 'up') {
    array.splice(index - 1, 1, array[index])
  } else {
    array.splice(index + 1, 1, array[index])
  }
  array.splice(index, 1, changeItem)
  return array
}
