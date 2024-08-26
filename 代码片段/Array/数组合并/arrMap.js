/**
 * 处理数据格式
 * @param {array} oldArr
 */
const arrMap = (oldArr) => {
  const newArr = []
  oldArr.forEach(item => {
    const obj = {}
    for (let i in item) {
      if (i !== 'friends') {
        obj[i] = item[i]
      } else {
        item[i].forEach(subItem => {
          obj[subItem.name] = subItem
        })
      }
    }
    newArr.push(obj)
  })
  return newArr
}

let input = [
  {
    name: 'Jack',
    age: 20,
    friends: [
      {
        name: 'Marry',
        age: 22
      },
      {
        name: 'Harry',
        age: 24
      }
    ]
  }
]

console.log(arrMap(input))

const output = [
  {
    'name': 'Jack',
    'age': 20,
    'Marry': {
      'name': 'Marry',
      'age': 22
    },
    'Harry': {
      'name': 'Harry',
      'age': 24
    }
  }
]
