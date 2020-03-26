//示例一
var Counter = (function () {
  var privateCounter = 0

  return {
    increment: function () {
      privateCounter += 1
    },
    decrement: function () {
      privateCounter += -1
    },
    value: function () {
      return privateCounter
    }
  }
})()

console.log(Counter.value()) // 0
Counter.increment()
Counter.increment()
console.log(Counter.value()) // 2
Counter.decrement()
console.log(Counter.value()) // 1

//示例二
let liDomList = document.querySelectorAll('li')
for (var i = 0; i < liDomList.length; i++) {
  (function (i) {
    liDomList[i].onclick = function () {
      console.log(i)
    }
  })(i)
}

//使用

//闭包实现只读，只写，可读可写

var property = (function (opts) {
  var property = '闭包'
  var hasSet = opts.hasSet || false
  var hasGet = opts.hasGet || false
  var res = {}
  if (hasGet) {
    res.get = function () {
      return property
    }
  }
  if (hasSet) {
    res.set = function (v) {
      property = v
    }
  }
  return res
})({hasSet: true, hasGet: true})

console.log(property.get())
property.set('闭包DEMO')
console.log(property.get())
