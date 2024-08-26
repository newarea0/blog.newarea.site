/**
 * 合并（相加）对象数组中同一类型的项
 * @param {array} array
 */
const getTotalList = (array) => {
  let result = []
  let obj = {}
  array.forEach(item => {
      if (!obj[item.accountId]) {
        result.push(item)
        obj[item.accountId] = true
      } else {
        result.forEach(rItem => {
          if (rItem.accountId === item.accountId) {
            rItem.amount = Number(rItem.amount) + Number(item.amount) // 原数组中的amount是字符串，直接相加是字符串拼接
          }
        })
      }
  })
  return result // 可以通过数组map方法处理后再返回想要的数据结构
}

var input = [
  { costItem: '护理费', amount: '90', accountId: 1 },
  { costItem: '床位费', amount: '100', accountId: 1 },
  { costItem: '餐饮费', amount: '80', accountId: 2 },
  { costItem: '电费', amount: '70', accountId: 3 },
  { costItem: '水费', amount: '80', accountId: 3 },
]

console.log(getTotalList(input))

const output = [
  { 'costItem': '护理费', 'amount': 190, 'accountId': 1 },
  { 'costItem': '餐饮费', 'amount': '80', 'accountId': 2 },
  { 'costItem': '电费', 'amount': 150, 'accountId': 3 }
]
