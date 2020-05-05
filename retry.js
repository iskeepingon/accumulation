/**
 * @function 延迟函数
 * @param second {number} 延迟间隔
 * @returns {Promise<any>}
 * @private
 */
function _delay(second = 1000) {
  // 延迟second
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, second)
  })
}

/**
 * @function 递归
 * @param promise {Promise<any>}
 * @param resolve
 * @param reject
 * @param count {number} 第几次请求
 * @param totalCount {number} 请求次数
 * @private
 */
function _recursion(promise, resolve, reject, count, totalCount) {
  //异步递归逻辑
  _delay().then(() => {
    promise().then((res) => {
      resolve(res)
    }).catch((err) => {
      if (count >= totalCount) {
        reject(err)
        return
      }
      _recursion(promise, resolve, reject, count + 1, totalCount)
    })
  })
}

/**
 * @function 请求重试
 * @param promise {Promise<any>}
 * @param totalCount {number} 请求次数
 * @returns {Promise<any>}
 */
function requestTry(promise, totalCount) {
  return new Promise((resolve, reject) => {
    let count = 1
    promise().then((res) => {
      resolve(res)
    }).catch((err) => {
      if (count >= totalCount) {
        reject(err)
        return
      }
      _recursion(promise, resolve, reject, count + 2, totalCount)
    })
  })
}

/**
 * @function 模拟请求函数
 * @returns {Promise<any>}
 */
function query() {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * 10)
    console.log(1)
    setTimeout(() => {
      if (random > 5) {
        resolve({code: 0, msg: '成功'})
      } else {
        reject({code: 1, msg: '失败'})
      }
    }, 1000)
  })
}

/**
 * @function 发起一个请求，最多请求五次，如果五次还不成功，就结束
 */
requestTry(query, 5)
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  console.log(err)
})
