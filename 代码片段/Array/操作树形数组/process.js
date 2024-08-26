/**
 * 获取树状结构数据中的某一个属性值，并且带有祖先值
 * @param {array} arr 对象数组
 * @param {string} parent 祖先值
 */
const process = (arr, parent) => {
  if (!arr.length) return []
  let result = []
  arr.forEach(item => {
    result.push(parent + '/' + item.name)
    parent = parent + '/' + item.name
    if (item.children && item.children.length) {
      result = result.concat(process(item.children, parent))
    }
  })
  return result
}

let input = [
  {
    name: '1',
    children: [
      {
        name: '11',
        children: [
          {
            name: '111',
            children: [
              {
                name: '1111'
              }
            ]
          }
        ]
      },
      {
        name: '12'
      }
    ]
  },
  {
    name: '2'
  }
]

console.log(process(input, 'api'))

const output = [
  "api/1",
  "api/1/11",
  "api/1/11/111",
  "api/1/11/111/1111",
  "api/1/11/12",
  "api/1/2"
]
