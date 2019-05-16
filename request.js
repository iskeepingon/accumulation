import urls from './url'
import md5 from './md5'
import main from './main'

function randomWord(randomFlag, min, max) {
  // 生成随机字符串
  let str = ''
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let range = min
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

function queryToString(query, tags = ['', '']) {
  // 将普通对象转成字符串
  let tag0 = tags[0]
  let tag1 = tags[1]
  let str = ''
  let keys = Object.keys(query)
  keys.sort()
  keys.map((key) => {
    str += '' + tag0 + key + tag1 + query[key]
  })
  return str
}

function computeTimeStamp() {
  //计算时间戳
  //timeDiff是服务端时间减客户端时间的时间差
  let timeDiff = wx.getStorageSync('time_diff')
  let now = (new Date()).getTime()
  if (typeof timeDiff == 'undefined') {
    return now
  } else {
    return now + timeDiff
  }
}

function setTimeDiff(nowFromServer) {
  //设置timediff到本地存储
  let nowFromClient = (new Date()).getTime()
  let timeDiff = Math.abs(nowFromServer - nowFromClient)
  if (timeDiff > 60 * 1000) {
    wx.setStorageSync('time_diff', timeDiff)
  }
}

function updateUrl(url) {
  //重写url
  let _url = decodeURIComponent(url)
  _url = _url.replace(/최고/g, '')
  return _url
}

function createLink(linkData) {
  //生成link
  let link = queryToString(linkData, ['&', '='])
  return link
}

function createResponseData(linkData, nonce) {
  //生成responseData
  let keys = Object.keys(linkData)
  let responseData = ''
  if (keys.length > 0) {
    linkData.nonce = nonce
    responseData = queryToString(linkData, ['', ''])
  } else {
    responseData = responseData + 'nonce' + nonce
  }
  return responseData
}

function createSign(test, responseData, timestamp, data) {
  //创建sign
  let testArr = decodeURIComponent(urls.test).split('\n')
  let md5Data = (testArr[0] + testArr[1] + testArr[2]).slice(2) + responseData + timestamp
  if (Object.keys(data).length > 0) {
    md5Data += JSON.stringify(data)
  }
  return md5(md5Data)
}

function wxLogin() {
  //微信登录
  return new Promise((resolve, reject)=> {
    wx.login({
      success: res => {
        resolve(res)
      },
      fail: err=> {
        reject(err)
      }
    })
  })
}

function getMemberInfo(data, successCallback) {
  //获取member信息
  return new Promise((resolve, reject)=> {
    request(urls.memberbyopenid, data, res => {
      if (res.code == -1) {
        reject()
      } else {
        if (res.code == 0) {
          wx.setStorageSync('isMember', 1)
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('mobile', res.data.mobile)
          wx.setStorageSync('memberid', res.data.memberid)
          successCallback()
        } else if (res.code == 120006) {
          //未注册
          wx.setStorageSync('isMember', -1)
          main.link(urls.page_login, 1)
        } else {
        }
        resolve(res)
      }
    }, 'post', {}, false, false, false, '')
  })
}

function getWechatSessionkey(data) {
  //获取sessionkey
  return new Promise((resolve, reject)=> {
    request(urls.getwechatsessionkey, data, res => {
      if (res.code == -1) {
        reject()
      } else {
        if (res.code == 0) {
          wx.setStorageSync('openid', res.data.openid)
          wx.setStorageSync('sessionkey', res.data.sessionkey)
        } else {

        }
        resolve(res)
      }
    }, 'post', {}, false, false, false, '加载中...')
  })
}

function login(successCallback) {
  // 登录
  // 1,微信登录
  // 2,获取sessionkey
  // 3,获取member信息
  wxLogin().then(res=> {
    if (res.code) {
      let openid = wx.getStorageSync('openid')
      if (typeof openid == 'undefined' || openid == '') {
        getWechatSessionkey({appid: urls.appid, jscode: res.code}).then(ret=> {
          if (ret.code == 0) {
            getMemberInfo({appid: urls.appid, openid: ret.data.openid}, successCallback).then(reg=> {
            }).catch(err=> {
            })
          } else {
          }
        }).catch(err=> {
        })
      } else {
        getMemberInfo({appid: urls.appid, openid}, successCallback).then(req=> {
        }).catch(err=> {
        })
      }
    } else {
      wx.showModal({
        title: '温馨提示',
        content: res.errMsg,
        showCancel: false
      })
    }
  }).catch(err=> {
  })

}

function request({url, data, nextCallback, method = 'get', linkData = {}, tast = true, neterr = false, errtips = true, tasttexy = '', pageInitCallback}) {
  // 参数规则
  // url 请求地址，
  // data post请求用到的，
  // method 请求方式，
  // linkData url中的参数，
  // tast 加载进度条，
  // neterr 网络超时提示，
  // errtips 交互错误提示，
  // tasttexy 加载框提示文案 tast开启后tasttexy才能生效
  requestProxy(url, data, nextCallback, method, linkData, tast, neterr, errtips, tasttexy, pageInitCallback)
}

function requestProxy(url, data, nextCallback, method = 'get', linkData = {}, tast = true, neterr = false, errtips = true, tasttexy = '', pageInitCallback) {
  if (tast == true) {
    wx.showToast({
      title: tasttexy,
      icon: 'loading',
      mask: true,
      duration: 10000
    })
  }
  //时间戳
  let timestamp = computeTimeStamp()
  //随机字符串
  let nonce = randomWord(false, 20)
  //{name:'name'}转&name=name
  let link = createLink(linkData)
  let responseData = createResponseData(linkData, nonce)
  let sign = createSign(urls.test, responseData, timestamp, data)
  let _url = updateUrl(url)

  wx.request({
    url: _url + '?sign=' + sign + link + '&nonce=' + nonce,
    method: method,
    data: JSON.stringify(data),
    header: {
      'content-type': 'application/json',
      'MINIAPP-Authorization': wx.getStorageSync('token'),
      'X-ZZ-Timestamp': timestamp,
      'X-ZZ-Device-AppId': urls.appid,
      'v': '1.4.0',
      'X-ZZ-Wechat-Version': wx.getStorageSync('WechatVersion'),
      'X-ZZ-Open-Id': wx.getStorageSync('openid'),
      'X-ZZ-Device-Version': wx.getStorageSync('DeviceVersion')
    },
    success: (res) => {
      if (tast == true) {
        wx.hideToast()
      }
      if (res.data.code == 0) {
        nextCallback(res.data)
      } else if (res.data.code == 100031 || res.data.code == 100043 || res.code == 120006) {
        // 100031 当前登录失效
        // 100043 token为空
        // 120006 该账号未注册，请检查账号或立刻注册
        login(function () {
          if (typeof pageInitCallback == 'function') {
            pageInitCallback()
          }
        })
      } else if (res.data.code == 100058) {
        //您的系统时间不正确 存在时间差
        setTimeDiff(res.data.now)
        requestProxy(url, data, nextCallback, method, linkData, tast, neterr, errtips, tasttexy)
      } else {
        // 非正常返回提示
        // 260031 订单同步信息异常，稍后系统会自动修复，敬请谅解，谢谢
        // 260004 亲，订单传入总支付金额{0}与计算所得金额{1}不相等
        // 100061 您当前访问过快，请稍后再试
        // 160004
        // 120017 注册失败，请稍后重试
        // 100063
        if (errtips == true) {
          wx.showModal({
            title: '温馨提示',
            content: res.data.message,
            showCancel: false
          })
        }
        nextCallback(res.data)
      }
    },
    fail: (err) => {
      //请求失败
      if (tast == true) {
        wx.hideToast()
      }
      if (neterr == true) {
        wx.showToast({
          title: '您的网络好像不太给力，请稍后重试',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
      let data = {
        code: -1
      }
      nextCallback(data)
    }
  })
}

export default request
