/**
 * 递归获取所有层级的第一个节点
 * @param {*} tree
 * @returns 所有层级的第一个节点所组成的数组
 */
function firstNodes (tree) {
  if (!tree.length) return []
  const res = []
  function forFn (arr) {
    res.push(arr[0])
    if (arr[0].children && arr[0].children.length) {
      forFn(arr[0].children)
    }
  }
  forFn(tree)
  return res
}
