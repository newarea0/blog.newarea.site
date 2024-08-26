/**
 * 获取最后一层级的第一个节点
 * @param {*} tree 树形数组
 * @returns 最后一层级的第一个节点
 */
function firstLeaf (tree) {
  if (!tree[0].children || !tree[0].children.length) return tree[0]
  else return firstLeaf(tree[0].children)
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
      }
    ]
  }
]

console.log(firstLeaf(input))

const output = { name: 'huangshi' }
