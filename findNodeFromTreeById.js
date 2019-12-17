//从树中查找节点
let recursion = function (trees, id) {
  if (typeof trees == 'undefined') {

  } else {
    if (Array.isArray(trees)) {
      for (let i = 0; i < trees.length; i++) {
        console.log(JSON.stringify(trees[i]))
        if (trees[i].id == id) {
          return trees[i]
        } else {
          let node = recursion(trees[i].children, id)
          if (node) {
            return node
          }
        }
      }
    }
  }
}

let findNodeFromTreeById = function (tree, id) {
  if (tree.id == id) {
    return tree
  } else {
    let node = recursion(tree.children, id)
    if (node) {
      return node
    } else {
      return null
    }
  }
}

let tree = {
  'id': 1,
  'parentId': 0,
  'name': '根节点',
  'children': [
    {
      'id': 2, 'parentId': 1, 'name': '节点2',
      'children': [
        {'id': 5, 'parentId': 2, 'name': '节点5'},
        {'id': 6, 'parentId': 2, 'name': '节点6'},
        {'id': 7, 'parentId': 2, 'name': '节点7'}
      ]
    },
    {'id': 3, 'parentId': 1, 'name': '节点3'},
    {'id': 4, 'parentId': 1, 'name': '节点4'}
  ]
}

let node = findNodeFromTreeById(tree, 4)
console.log(node)
