//示例1
let ulDom = document.querySelector('ul')
ulDom.onclick = function (e) {
  if (e.srcElement.nodeName.toLowerCase() === 'li') {
    console.log('点击li元素')
  }
}

//示例2
/**
 * @function 仿jquery中的delegate的简单实现
 * @param parentDom 对象
 * @param childDoms 数组
 * @param eventType 事件类型
 * @param callback 回调函数
 */
const delegate = function (parentDom, childDoms, eventType, callback) {
  parentDom.addEventListener(eventType, function (e) {
    childDoms.map(item => {
      if (e.srcElement === item) {
        if (typeof callback === 'function') {
          callback()
        }
      }
    })

  }, false)
}
