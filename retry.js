function _delay(second = 1000) {
  // 延迟second
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, second)
  })
}

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

function requestTry(promise, totalCount) {
  /***
   * @param promise 返回值是Promise实例的函数
   * @param totalCount 异步操作或者异步请求重试总次数
   */
  // 重试某个异步操作多少次
  // 最少一次
  // 最多time次
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

function p() {
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

requestTry(p, 1)
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  console.log(err)
})
