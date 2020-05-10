//示例1
let ulDom = document.querySelector('ul')
ulDom.onclick = function (e) {
  if (e.srcElement.nodeName.toLowerCase() === 'li') {
    console.log('点击li元素')
  }
}

//示例2
/**
 * @function delegate的简单实现
 * @param parentDom dom对象
 * @param childDoms 数组
 * @param eventType 事件类型
 * @param callback 回调函数
 */
const delegate = function (parentDom, childDoms, eventType, callback) {
  const isChildOf = (childDom, parentDom) => {
    let parentNode
    if (childDom && parentDom) {
      parentNode = childDom.parentNode
      while (parentNode) {
        if (parentDom === parentNode) {
          return true
        }
        parentNode = parentNode.parentNode
      }
    }
    return false
  }
  parentDom.addEventListener(eventType, function (e) {
    for (let i = 0; i < childDoms.length; i++) {
      let parent = childDoms[i]
      if (parent === e.srcElement || isChildOf(e.srcElement, parent)) {
        if (typeof callback === 'function') {
          callback()
        }
      }
    }
  }, false)
}
