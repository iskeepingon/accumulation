/**
 * @function 判断obj是否是[{},...]或者{}​
 * @param obj {any}
 * @returns {boolean}
 */
function isJSON(obj) {
  if (typeof obj === 'object') {
    const lowercase = Object.prototype.toString.call(obj).toLowerCase()
    if (lowercase === '[object array]') {
      for (let i = 0; i < obj.length; i++) {
        let flag = isJSON(obj[i])
        if (!flag) {
          return false
        }
      }
      return true
    } else if (lowercase === '[object object]') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

console.log(isJSON({}))
console.log(isJSON([{}]))
console.log(isJSON([{},'']))
