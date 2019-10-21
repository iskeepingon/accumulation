/**
 * @param tdata 数据结构是多棵树的数据
 * @param data 树节点数据
 * @returns {Array|*|undefined} 树节点数据的所有的父节点数组
 */
let getParents = (tdata, data) => {
  let parents
  for (let i = 0; i < tdata.length; i++) {
    parents = []
    parents[0] = tdata[i]
    if (data.categoryid == tdata[i].categoryid) {
      return parents
    } else {
      let parents1 = _getParents(tdata[i], data, parents, 1)
      if (parents1) {
        return parents1
      }
    }
  }
}
let _getParents = (item, data, parents, count) => {
  if (item.children && item.children.length > 0) {
    for (let j = 0; j < item.children.length; j++) {
      parents[count] = item.children[j]
      if (data.categoryid == item.children[j].categoryid) {
        return parents
      } else {
        let parents1 = _getParents(item.children[j], data, parents, count + 1)
        if (parents1) {
          return parents1
        }
      }
    }
  }
}

export default getParents
