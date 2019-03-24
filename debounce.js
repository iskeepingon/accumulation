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

window.addEventListener('scroll', debounce(function () {
  let date = new Date()
  console.log('时:' + date.getHours() + ' 分:' + date.getMinutes() + ' 秒:' + date.getSeconds())
}, 1000))
