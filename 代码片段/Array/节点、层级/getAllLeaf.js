/**
 * 获取所有叶子节点
 * @param {array} treeArr 树形数组
 */
function getAllLeaf (treeArr) {
  let result = []
  const each = (arr) => {
    arr.forEach(item => {
      if (!item.children) {
        result.push(item)
      } else {
        each(item.children)
      }
    })
  }
  each(treeArr)
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

console.log(getAllLeaf(input))

const output = [
  { 'name': '1111' },
  { 'name': '12' },
  { 'name': '2' }
]
