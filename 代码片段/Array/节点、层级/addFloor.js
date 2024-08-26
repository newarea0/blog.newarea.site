/**
 * 给每个节点添加floor属性，表示该节点所处层数
 * @param {*} treeArr 树形数组
 */
 const addFloor = (treeArr) => {
  const each = (arr, floor) => {
    arr.forEach(item => {
      item.floor = floor
      if (item.children && item.children.length) each(item.children, floor + 1)
    })
    return arr
  }
  return each(treeArr, 1)
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

console.log(addFloor(input))

const output = [
  {
    'name': '1',
    'children': [
      {
        'name': '11',
        'children': [
          {
            'name': '111',
            'children': [
              {
                'name': '1111',
                'floor': 4
              }
            ],
            'floor': 3
          }
        ],
        'floor': 2
      },
      {
        'name': '12',
        'floor': 2
      }
    ],
    'floor': 1
  },
  {
    'name': '2',
    'floor': 1
  }
]
