/**
 * 复制树形数组成相似的新树形数组
 * @param {array} tree
 */
export const copyTree = (tree) => {
  let tem = [] // 声明一个临时数组
  tree.forEach(item => { // 遍历输入数组arr的每一项（为对象）
    let obj = {  // 这里设置新的结构
      place: item.name,
      children: []
    }
    if (item.children && item.children.length) {
      obj.children = copyTree(item.children)
    }
    tem.push(obj)
  })
  return tem
}

var input = [
  {
    name: 'china',
    children: [
      {
        name: 'hubei',
        children: [
          {
            name: 'huangshi',
            children: []  //对象参数由name和children组成，children即使为空，也要写上
          }
        ]
      }
    ]
  },
  {
    name: 'japan',
    children: [
      {
        name: 'tokyo',
        children: []
      }
    ]
  }
]

console.log(copyTree(input))

const output = [
  {
    'place': 'china',
    'children': [
      {
        'place': 'hubei',
        'children': [
          {
            'place': 'huangshi',
            'children': []
          }
        ]
      }
    ]
  },
  {
    'place': 'japan',
    'children': [
      {
        'place': 'tokyo',
        'children': []
      }
    ]
  }
]
