import RSA from './lib/wx_rsa'

const Util = function () {
  this.version = '1.0'
}

Util.prototype = {
  getImageInfoByImg(imgUrl) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        reject()
      }
      img.src = imgUrl
    })
  },
  isEmpty(field) {
    //判断值是否为空
    if (typeof field == 'undefined' || ('' + field).trim() == '') {
      return true
    }
    return false
  },
  isNumber(field) {
    //判断值是否为数字
    if (typeof field === 'number') {
      return true
    } else {
      return false
    }
  },
  isPhone(phone) {
    // 手机号校验
    let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
    return reg.test(phone)
  },
  isCreditNo(creditNo) {
    // 身份证号码校验
    let creditNoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
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
  toFixed(num, decimal = 2) {
    // 数字保留num 保留decimal位小数 并进行四舍五入
    function _round(num, decimal) {
      if (isNaN(num) || num == 0) {
        return 0
      }
      const p1 = Math.pow(10, decimal + 1)
      const p2 = Math.pow(10, decimal)
      return Math.round(num * p1 / 10) / p2
    }

    if (num == 0) {
      return new Number(0).toFixed(decimal)
    }
    return _round(num, decimal).toFixed(decimal)
  },
  createYMDHMS(timestamp = new Date().getTime()) {
    let o = new Date(timestamp)
    let year = o.getFullYear()
    let month = o.getMonth() + 1
    let date = o.getDate()
    let hour = o.getHours()
    let minute = o.getMinutes()
    let second = o.getSeconds()
    return {year, month, date, hour, minute, second}
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
  },
  isValidIP(ip) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
  },
  bZero(digit) {
    if (digit < 10) {
      return '0' + digit
    } else {
      return digit
    }
  },
  getLocation(nextCallback, type = 'gcj02') {
    wx.getLocation({
      type: type,
      altitude: true,
      success: res => {
        let data = {
          code: 'getLocation:ok',
          latitude: res.latitude,
          longitude: res.longitude
        }
        nextCallback(data)
      },
      fail: err => {
        let data = {
          code: 'getLocation:fail'
        }
        nextCallback(data)
      }
    })
  },
  getTime(timestamp) {
    let second = timestamp / 1000 // 秒数

    let day = Math.floor(second / 3600 / 24) // 天数位
    let dayStr = this.bZero(day.toString())

    let hr = Math.floor((second - day * 3600 * 24) / 3600) // 小时位
    let hrStr = this.bZero(hr.toString())

    let min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60) // 分钟位
    let minStr = this.bZero(min.toString())

    let sec = second - day * 3600 * 24 - hr * 3600 - min * 60 // 秒位
    let secStr = sec.toString()
    secStr = this.bZero(parseInt(secStr))

    return {
      second: secStr,
      minute: minStr,
      hour: hrStr,
      day: dayStr
    }
  },
  chooseUploadImage() {
    //选择图片并且上传图片
    function _chooseImage() {
      //图片选择
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
          sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
          success: res => {
            let tempFilesSize = res.tempFiles[0].size
            if (tempFilesSize <= 5000000) {
              resolve(res)
            } else {
              reject()
            }
          },
          fail: err => {
            reject(err)
          }
        })
      })
    }

    function _uploadImage(res) {
      //文件上传
      return new Promise((resolve, reject) => {
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
          mask: true,
          duration: 15000
        })
        wx.uploadFile({
          url: '',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data',
            'X-ZZ-Device-AppId': '',
            'MINIAPP-Authorization': '',
            'v': ''
          },
          success(ret) {
            wx.hideToast()
            resolve(ret)
          },
          fail(err) {
            wx.hideToast()
            reject(err)
          }
        })
      })
    }

    return new Promise((resolve, reject) => {
      _chooseImage().then(res => {
        _uploadImage(res).then(ret => {
          resolve(ret)
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  downloadFile(imgSrc = '') {
    //下载单张图片
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: imgSrc,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  downloadFiles(imgArr = []) {
    //下载多张图片
    let _downloadFile = (imgArr, result, i, resolve, reject) => {
      this.downloadFile(imgArr[i]).then(res => {
        result.push(res)
        if (result.length == imgArr.length) {
          resolve(result)
        } else {
          _downloadFile(imgArr, result, i + 1, resolve, reject)
        }
      }).catch(err => {
        reject(err)
      })
    }
    let result = []
    return new Promise((resolve, reject) => {
      let i = 0
      _downloadFile(imgArr, result, i, resolve, reject)
    })
  },
  getImageInfo(imgSrc = '') {
    //获取单张图片信息
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: imgSrc,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  getImagesInfo(imgArr = []) {
    //获取多张图片信息
    let _getImageInfo = (imgArr, result, i, resolve, reject) => {
      this.getImageInfo(imgArr[i]).then(res => {
        result.push(res)
        if (result.length == imgArr.length) {
          resolve(result)
        } else {
          _getImageInfo(imgArr, result, i + 1, resolve, reject)
        }
      }).catch(err => {
        reject(err)
      })
    }
    let result = []
    return new Promise((resolve, reject) => {
      let i = 0
      _getImageInfo(imgArr, result, i, resolve, reject)
    })
  },
  saveImageToPhotosAlbum(res) {
    //保存单张图片到相册
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          resolve(data)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  },
  saveImagesToPhotosAlbum(images = []) {
    //保存多张图片到相册
    let _downloadFile = (images, i, resolve, reject) => {
      this.downloadFile(images[i]).then((res) => {
        this.saveImageToPhotosAlbum(res).then((ret) => {
          if (i == images.length - 1) {
            resolve(ret)
          } else {
            _downloadFile(images, i + 1, resolve, reject)
          }
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    }
    return new Promise((resolve, reject) => {
      let i = 0
      _downloadFile(images, i, resolve, reject)
    })
  },
  createTempFilePath(canvasId) {
    //生成图片的临时路径
    wx.showToast({
      icon: 'loading',
      mask: true,
      duration: 10000
    })
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: canvasId,
        success: (res) => {
          wx.hideToast()
          resolve(res.tempFilePath)
        },
        fail: (err) => {
          wx.hideToast()
          reject(err)
        }
      })
    })
  },
  setClipboardData(text = '') {
    //保存text到剪切板
    return new Promise((resolve, reject) => {
      wx.setClipboardData({
        data: text,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  compressImage(img, quality) {
    //图片压缩
    return new Promise((resolve, reject) => {
      wx.compressImage({
        src: img,
        quality: quality,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  mergeObject(des, source) {
    let res = {}
    let desKeys = Object.keys(des)
    let sourceKey = Object.keys(source)
    let mergeKeys = []
    let set = new Set(desKeys)
    for (let i = 0; i < sourceKey.length; i++) {
      set.add(sourceKey[i])
    }
    console.log(set)

    return res
  },
  getScrollbarWidth() {
    let odiv = document.createElement('div'),//创建一个div
      styles = {
        position: 'absolute',
        top: 0,
        left: '9999px',
        width: '100px',
        height: '100px',
        overflowY: 'scroll'//让他有滚动条
      }, i, scrollbarWidth
    for (i in styles) odiv.style[i] = styles[i]
    document.body.appendChild(odiv)//把div添加到body中
    scrollbarWidth = odiv.offsetWidth - odiv.clientWidth//相减
    odiv.remove()//移除创建的div
    return scrollbarWidth//返回滚动条宽度
  }
}
