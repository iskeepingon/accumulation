const Util = function () {
  this.version = '1.0'
}

Util.prototype = {
  isEmpty: function (field) {
    //判断值是否为空
    if (typeof field == 'undefined' || ('' + field).trim() == '') {
      return true
    }
    return false
  },
  isNumber: function (field) {
    //判断值是否为数字
    let fieldV = parseFloat(field)
    if (typeof field !== 'undefined' && isNaN(fieldV) === false && field == fieldV) {
      return true
    }
    return false
  }
}
