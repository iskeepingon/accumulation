//如果动作频繁,一直到没有动作了,就执行
function debounce(callback, time) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, arguments)
    }, time)
  }
}

// window.addEventListener('scroll', debounce(function () {
//   let date = new Date()
//   console.log('时:' + date.getHours() + ' 分:' + date.getMinutes() + ' 秒:' + date.getSeconds())
// }, 1000))

console.log(c)
if(true) { 
console.log(c)
let b = 2
function c() {
console.log(3)
}
let e = 5
console.log(this.b)
console.log(this.c)
console.log(this.e)
}
console.log(this.c)