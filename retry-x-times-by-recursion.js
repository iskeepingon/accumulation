//模拟http请求
let query = function () {
  let random = Math.floor(10 * Math.random())
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random > 4) {
        resolve({data: {msg: '你要的数据', state: 1}})
      } else {
        reject({data: {msg: '请求失败', state: 0}})
      }
    }, 1000)
  })
}

//延迟函数
let delay = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time || 0)
  })
}

//延迟1秒发模拟的http请求
let delayRequest = function () {
  return new Promise((resolve, reject) => {
    delay(1000).then(() => {
      query().then((msg) => {
        resolve(msg)
      }).catch((msg) => {
        reject(msg)
      })
    })
  })
}

//发模拟的http请求,可重试count次
let retry = function (count) {
  let recursion = function (resolve, reject, count, i) {
    delayRequest().then((msg) => {
      resolve(msg)
    }).catch((msg) => {
      if (i === count) {
        reject(msg)
      }
      recursion(resolve, reject, count, i + 1)
    })
  }
  return new Promise((resolve, reject) => {
    let i = 1
    recursion(resolve, reject, count, i)
  })
}

//调用模拟的http请求,可重试5次
retry(5).then(res => {
  //请求成功
  console.log(res)
}).catch(res => {
  //请求失败
  console.log(res)
})
