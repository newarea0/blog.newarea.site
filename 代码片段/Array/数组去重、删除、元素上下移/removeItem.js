/**
 * 移除数组array中所有的匹配的元素item,该方法的匹配过程使用的是恒等'==='
 * @method removeItem
 * @param { Array } array 要移除元素的目标数组
 * @param { * } item 将要被移除的元素
 * @example
 * let arr = [ 4, 5, 7, 1, 3, 4, 6 ];
 * removeItem( arr, 4 );
 * console.log( arr ) // [ 5, 7, 1, 3, 6 ]
 */
function removeItem(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      array.splice(i, 1)
      i--
    }
  }
}
