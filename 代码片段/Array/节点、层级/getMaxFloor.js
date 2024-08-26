/**
 * 获取树形数组最深层级数
 * @param {array} treeArr 树形数组
 */
const getMaxFloor = (treeArr) => {
  let max = 0;
  const each = (arr, floor) => {
    arr.forEach(item => {
      item.floor = floor
      if (floor > max) max = floor
      if (item.children && item.children.length) each(item.children, floor + 1)
    })
  }
  each(treeArr, 1)
  return max
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

console.log(getMaxFloor(input)) // 4
