/***
 * @function 模拟new关键字的功能
 * @param constructor
 */
function _new(constructor, ...arg) {
  let obj = Object.create(constructor.prototype)
  let res = constructor.apply(obj, arg)
  return res instanceof Object ? res : obj
}

function A(name = '贺林') {
  this.name = name
}

A.prototype = {
  getName: function () {
    return this.name
  }
}

let a = _new(A, '模拟new')
let a1 = new A('原生的new')

console.log(a.getName())
console.log(a1.getName())
