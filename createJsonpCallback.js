/**
 * 创建全局jsonp callback
 * @param nameStr 例：’T.dynamicMzChannel.init‘
 * @param callback
 */
export function createJsonpCallback (nameStr, callback) {
  if (!nameStr) {
    throw new Error('请传jsonpCallback')
  }
  const nameArr = nameStr.split('.')
  let i = 0
  let w = window
  while (i < nameArr.length) {
    if (nameArr.length - 1 === i) {
      if (w[nameArr[i]]) {
        throw new Error('jsonpCallback重复定义')
      } else {
        w[nameArr[i]] = callback
      }
    } else {
      if (w[nameArr[i]]) {
      } else {
        w[nameArr[i]] = {}
      }
    }
    w = w[nameArr[i]]
    i++
  }
}
