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

class Single {
  constructor(name) {
    if (typeof Single.instance === 'object') {
      return Single.instance
    }
    Single.instance = this
    this.name = name
    return this
  }
}

let s = new Single('a')
let sb = new Single('b')
console.log(s === sb)

// async await的使用：

let o = {
  request() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let num = Math.floor(Math.random() * 10)
        if (num > 5) {
          resolve({code: 0, data: num})
        } else {
          reject({code: -1})
        }
      }, 1000)
    })
  },
  async getData() {
    let res = await this.request()
    if (res.code == 0) {

    }
  },
  init() {
    this.getData().then(() => {
      console.log('ok')
    }).catch(() => {
      console.log('fail')
    })
  }
}

function Person(name) {
  this.name = name
  let flag = typeof this.getName != 'function'
  console.log(1, this.__proto__)
  if (flag) {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(2, this.name)
      }
    }
  }
  console.log(3, this.__proto__)
}

console.log('--------------------')

let p = new Person('sss')
console.log(Person.prototype)//Person {constructor: [Function: Person],getName: [Function: getName] }
console.log(p.__proto__)//Person {}
console.log(p.getName)//undefined
// let p1 = new Person('11')
// console.log(p1.getName)//[Function: getName]

