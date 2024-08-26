/**
 * 从已知对象数组中取出符合条件项所在的对象
 * @param {array} arr
 * @param {string} param
 * @returns {Object}
 */
function getItem(arr, param) {
  let obj = null
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].name === param) {
        obj = arr[i]
      } else if (arr[i].children && arr[i].children.length > 0) {
        obj = getItem(arr[i].children, param)
      }
      if (obj !== null) {
        break
      }
    }
  }
  return obj
}
