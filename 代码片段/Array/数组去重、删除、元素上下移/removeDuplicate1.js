/**
 * @param {*} array
 */
const removeDuplicate1 = (array) => {
  let obj = {}
  return array.reduce((newArr, item) => {
    if (!obj[item.key]) {
      newArr.push(item)
      obj[item.key] = true
    }
    return newArr
  }, [])
}

var input = [
  { key: '01', value: '乐乐' },
  { key: '02', value: '博博' },
  { key: '03', value: '淘淘' },
  { key: '04', value: '哈哈' },
  { key: '01', value: '乐乐' }
]

console.log(removeDuplicate1(input))
