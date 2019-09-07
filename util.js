const Util = function () {
  this.version = '1.0'
}

Util.prototype = {
  isEmpty(field) {
    //判断值是否为空
    if (typeof field == 'undefined' || ('' + field).trim() == '') {
      return true
    }
    return false
  },
  isNumber(field) {
    //判断值是否为数字
    let fieldV = parseFloat(field)
    if (typeof field !== 'undefined' && isNaN(fieldV) === false && field == fieldV) {
      return true
    }
    return false
  },
  isPhone(phone) {
    // 手机号校验
    let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
    return reg.test(phone)
  },
  isCreditNo(creditNo) {
    // 身份证号码校验
    var creditNoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return creditNoReg.test(creditNo)
  },
  clone(jsonObj) {
    // 深度克隆
    try {
      return JSON.parse(JSON.stringify(jsonObj))
    } catch (e) {
      return {}
    }
  },
  toFixed(num, decimal) {
    // 数字保留num 保留decimal位小数 并进行四舍五入
    function _round(num, decimal) {
      if (isNaN(num)) {
        return 0
      }
      const p1 = Math.pow(10, decimal + 1)
      const p2 = Math.pow(10, decimal)
      return Math.round(num * p1 / 10) / p2
    }

    return _round(num, decimal).toFixed(decimal)
  },
  createYMD(timestamp) {
    // 根据时间戳获取年月日 如果没有时间戳 则获取当前的时间戳
    let date
    if (isNaN(timestamp)) {
      date = new Date()
    } else {
      date = new Date(timestamp)
    }
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    return [y, m, d].join('.')
  },
  requestTry(promise, totalCount) {
    /***
     * @param promise 返回值是Promise实例的函数
     * @param totalCount 异步操作或者异步请求重试总次数
     */
    // 重试某个异步操作多少次
    // 最少一次
    // 最多time次
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
          if (count > totalCount) {
            reject(err)
            return
          }
          _recursion(promise, resolve, reject, count + 1, totalCount)
        })
      })
    }

    return new Promise((resolve, reject) => {
      let count = 1
      promise().then((res) => {
        resolve(res)
      }).catch((err) => {
        if (count > totalCount) {
          reject(err)
          return
        }
        _recursion(promise, resolve, reject, count + 2, totalCount)
      })
    })
  },
  rsaEncrypt(content, publicKey) {
    // 对数据进行rsa加密
    let encStr
    try {
      let encryptRsa = new RSA.RSAKey()
      encryptRsa = RSA.KEYUTIL.getKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----')//这一行代码抛异常
      encStr = encryptRsa.encrypt(content)
      encStr = RSA.hex2b64(encStr)
    } catch (e) {
      encStr = ''
    }
    return encStr
  },
  createYMDHMS(timestamp) {
    // 根据时间戳获取年月日 如果没有时间戳 则获取当前的时间戳
    let dateObj
    if (isNaN(timestamp)) {
      dateObj = new Date()
    } else {
      dateObj = new Date(timestamp)
    }
    let year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    let date = dateObj.getDate()
    let hour = dateObj.getHours()
    let minute = dateObj.getMinutes()
    let second = dateObj.getSeconds()
    return {
      year,
      month,
      date,
      hour,
      minute,
      second
    }
  },
  isChinese(str) {
    //是否是中文
    let reg = /^[\u4e00-\u9fa5]+$/
    return reg.test(str)
  },
  dismantleWord(ctx, word, rate, w) {
    //ctx画布上下文
    //word文字字符串
    //rate设备宽度375,设计稿750,rate是2
    //w是文字字符串的宽度
    let wordArr = []
    let tmpWordArr = word.split('')
    let iArr = []
    let start0 = 0
    for (let i = 0; i < tmpWordArr.length; i++) {
      if (ctx.measureText(tmpWordArr.slice(start0, i).join('')).width > w / rate) {
        iArr.push(i - 1)
        start0 += i - 1
      }
    }
    let start = 0
    for (let j = 0; j < iArr.length; j++) {
      wordArr.push(tmpWordArr.slice(start, iArr[j]))
      start = iArr[j]
      if (j == iArr.length - 1 && start < tmpWordArr.length) {
        wordArr.push(tmpWordArr.slice(start))
      }
    }
    if (iArr.length == 0) {
      wordArr.push([word])
    }
    return wordArr
  }
}
