/**
 * 自定义instanceof
 * @param object 实例
 * @param constructor 构造函数
 * @return 如果实例是由构造函数创建的则返回true
 */

let newInstanceof = function (object, constructor) {
  let rightProto = constructor.prototype
  object = object.__proto__
  while (true) {
    if (object === null) {
      return false
    }
    if (object === rightProto) {
      return true
    }
    object = object.__proto__
  }
}

let flag = newInstanceof({}, Object)
console.log(flag)
