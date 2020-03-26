function mergeObject(des, sour) {
  let res = {}

  return res
}

/**
 * @function 处理null，undefined分别为{}或者''
 * @param json
 */
function solveNullOrUndefined(json) {
  if (typeof json === 'object') {
    if (isJson(json)) {
      let res

      return res
    } else {
      return {}
    }
  } else {
    return {}
  }
}

// console.log(isJsonRecursion([{}, '', {}]))

