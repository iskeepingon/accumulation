function _delay(second = 1000) {
  // 延迟second
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, second)
  })
}

function _recursion(promise, resolve, reject, count, total) {
  //异步递归逻辑
  _delay().then(() => {
    promise().then((res) => {
      resolve(res)
    }).catch((err) => {
      if (count > total) {
        reject(err)
        return
      }
      _recursion(promise, resolve, reject, count + 1, total)
    })
  })
}

function requestTry(promise, total) {
  // 重试某个异步操作多少次
  // 最少一次
  // 最多time次
  return new Promise((resolve, reject) => {
    let count = 1
    promise().then((res) => {
      resolve(res)
    }).catch((err) => {
      if (count > total) {
        reject(err)
        return
      }
      _recursion(promise, resolve, reject, count + 2, total)
    })
  })
}

function p() {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * 10)
    setTimeout(() => {
      if (random > 5) {
        resolve({code: 0, msg: '成功'})
      } else {
        reject({code: 1, msg: '失败'})
      }
    }, 1000)
  })
}

requestTry(p, 5)
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  console.log(err)
})
