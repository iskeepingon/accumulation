//在一定时间内只能执行一次
function throttle(callback, time) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(()=> {
        timer = undefined
        callback.apply(this, arguments)
      }, time || 1000)
    }
  }
}

window.addEventListener('scroll', throttle(function () {
  let date = new Date()
  console.log('时:' + date.getHours() + ' 分:' + date.getMinutes() + ' 秒:' + date.getSeconds())
}, 1000))
