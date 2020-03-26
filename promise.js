function IPromise(callback) {
  this.data = undefined
  this.reason = undefined
  this.status = 'pending'
  this.successCallbacks = []
  this.failCallbacks = []

  let resolve = () => {
    this.status = 'fulfilled'
    setTimeout(() => {
      this.successCallbacks.forEach((successCallback) => {
        successCallback(this.data)
      })
    }, 0)
  }

  let reject = () => {
    this.status = 'rejected'
    setTimeout(() => {
      this.failCallbacks.forEach((failCallback) => {
        failCallback(this.reason)
      })
    }, 0)
  }

  if (typeof callback === 'function') {
    callback(resolve, reject)
  }
}

IPromise.prototype = {
  then(successCallback, failCallback) {
    return new IPromise((resolve, reject) => {

      function success(value) {
        let res
        if (typeof successCallback === 'function') {
          res = successCallback(value)
        } else {
          res = value
        }
        if (res && typeof res['then'] === 'function') {
          res.then(function (value) {
            resolve(value)
          })
        } else {
          resolve(res)
        }
      }

      function fail(reason) {
        reason = typeof failCallback === 'function' ? failCallback(reason) : reason
        reject(reason)
      }

      if (this.status === 'pending') {
        if (typeof successCallback === 'function') {
          this.successCallbacks.push(success)
        }
        if (typeof failCallback === 'function') {
          this.failCallbacks.push(fail)
        }
      } else if (this.status === 'fulfilled') {
        success(this.data)
      } else {
        fail(this.reason)
      }
    })
  }
}

let delay = () => {
  return new IPromise((resolve, reject) => {
    setTimeout(() => {
      let number = Math.floor(Math.random() * 10)
      console.log(number)
      if (number > 5) {
        resolve(number)
      } else {
        reject(number)
      }
    }, 1000)
  })
}

let p = delay().then((number) => {
  console.log('delay第一次调用 成功', number)
  // return delay()
}, (number) => {
  console.log('delay第一次调用 失败', number)
})
/*if (p && typeof p['then'] === 'function') {
  p.then((number) => {
    console.log('delay第二次调用 成功', number)
  }, (number) => {
    console.log('delay第二次调用 失败', number)
  })
}*/
