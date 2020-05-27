/**
 * @desc 函数防抖
 * @param {Function} func 函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Boolean} immediate true 表示立即执行，false 表示非立即执行
 */
function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        typeof func === 'function' && func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        typeof func === 'function' && func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流
 * @param {Function} func 函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Boolean} type true 表示时间戳版，false 表示定时器版
 */
function throttle(func, wait, type) {
  let previous
  let timeout
  if (type) {
    previous = 0
  } else {
    timeout
  }
  return function () {
    let context = this
    let args = arguments
    if (type) {
      let now = Date.now()
      if (now - previous > wait) {
        typeof func === 'function' && func.apply(context, args)
        previous = now
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          typeof func === 'function' && func.apply(context, args)
        }, wait)
      }
    }
  }
}

let debounceCallback = debounce(function () {
  console.log('debounceCallback')
}, 1000, false)

for (let i = 0; i < 10000000; i++) {
  debounceCallback()
}

let throttleCallback = throttle(function () {
  console.log('throttleCallback')
}, 1000, false)

for (let i = 0; i < 10000000; i++) {
  throttleCallback()
}