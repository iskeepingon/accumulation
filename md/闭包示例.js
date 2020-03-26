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
