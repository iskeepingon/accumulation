/**
 * @function 递归
 * @param item {any}
 * @return true or false {boolean}
 */
function isJsonRecursion(item) {
  if (typeof item === 'object') {
    const lowercase = Object.prototype.toString.call(item).toLowerCase()
    if (lowercase === '[object array]') {
      if (item.length === 0) {
        return false
      }
      for (let i = 0; i < item.length; i++) {
        let flag = isJsonRecursion(item[i])
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

/**
 * @function 判断obj是否为json对象
 * @param obj {any}
 * @returns {boolean}
 */
function isJSON(obj) {
  if (typeof obj === 'object') {
    const lowercase = Object.prototype.toString.call(obj).toLowerCase()
    if (lowercase === '[object array]') {
      for (let i = 0; i < obj.length; i++) {
        let flag = isJsonRecursion(obj[i])
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
