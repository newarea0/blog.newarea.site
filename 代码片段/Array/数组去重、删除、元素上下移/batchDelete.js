/**
 * 对象数组批量删除
 * @param {array} source 源数组，每项数据都有唯一标识，如id
 * @param {array} deleteList 要删除的项组成的数组
 */
const batchDelete = (source, deleteList) => {
  const temp = [...source]
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < deleteList.length; j++) {
      if (temp[i]['id'] === deleteList[j]['id']) {
        temp.splice(i, 1)
        i--
      }
    }
  }
  return temp
}

var arr12 = [
  { id: 1, key: '01', value: '乐乐' },
  { id: 2, key: '02', value: '博博' },
  { id: 3, key: '03', value: '淘淘' },
  { id: 4, key: '04', value: '哈哈' },
  { id: 5, key: '01', value: '乐乐' }
]
var deleteList = [
  { id: 3, key: '03', value: '淘淘' },
  { id: 4, key: '04', value: '哈哈' },
]

console.log(batchDelete(arr12, deleteList))

const output = [
  { 'id': 1, 'key': '01', 'value': '乐乐' },
  { 'id': 2, 'key': '02', 'value': '博博' },
  { 'id': 5, 'key': '01', 'value': '乐乐' }
]


