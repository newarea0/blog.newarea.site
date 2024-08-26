/**
 * 对象数组去重
 * @param {array} array 对象数组
 */
const removeDuplicate = (array) => {
  let result = []
  let obj = {}
  array.forEach(item => {
      if (!obj[item.key]) {
        result.push(item)
        obj[item.key] = true
      }
  })
  return result
}

var input = [
  { key: '01', value: '乐乐' },
  { key: '02', value: '博博' },
  { key: '03', value: '淘淘' },
  { key: '04', value: '哈哈' },
  { key: '01', value: '乐乐' }
]

console.log(removeDuplicate(input))

const output = [
  { 'key': '01', 'value': '乐乐' },
  { 'key': '02', 'value': '博博' },
  { 'key': '03', 'value': '淘淘' },
  { 'key': '04', 'value': '哈哈' }
]
