import md5 from './lib/md5'
import ls from './localStorage'
import util from './lib/util'
import silentLogin from './silentLogin'

let urls = {
  test: '%EC%B5%9C%EA%B3%A0l94JPYM08l%0AtlkDZ00TjK%0A68Tyavx2VqwL'
}

function computeTimeStamp() {
  //计算时间戳
  //timeDiff是服务端时间减客户端时间的时间差
  let timeDiff = ls.get(ls.timeDiff)
  let now = (new Date()).getTime()
  if (typeof timeDiff == 'undefined') {
    return now
  } else {
    return now + timeDiff
  }
}

function updateUrl(url) {
  //重写url
  let _url = decodeURIComponent(url)
  _url = _url.replace(/최고/g, '')
  return _url
}

function setTimeDiff(nowFromServer) {
  //设置timediff到本地存储
  let nowFromClient = (new Date()).getTime()
  let timeDiff = Math.abs(nowFromServer - nowFromClient)
  if (timeDiff > 60 * 1000) {
    ls.set(ls.timeDiff, timeDiff)
  }
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

function createLink(linkData) {
  //生成link
  let link = queryToString(linkData, ['&', '='])
  return link
}

function createResponseData(linkData, nonce) {
  let mlinkData = util.clone(linkData)
  let mnonce = util.clone(nonce)
  //生成responseData
  let responseData = ''
  let keys = Object.keys(mlinkData)
  if (keys.length > 0) {
    mlinkData.nonce = mnonce
    responseData = queryToString(mlinkData, ['', ''])
  } else {
    responseData = responseData + 'nonce' + mnonce
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

function request(
  {
    url,
    data,
    nextCallback,
    method = 'get',
    linkData = {},
    isShowLoading = true,
    neterr = false,
    errtips = true,
    loadingText = ''
  }
) {
  // 参数规则
  // url 请求地址，
  // data post请求用到的，
  // method 请求方式，
  // linkData url中的参数，
  // isShowLoading 加载进度条，
  // neterr 网络超时提示，
  // errtips 交互错误提示，
  // loadingText 加载框提示文案 isShowLoading开启后loadingText才能生效
  requestProxy(
    {
      url,
      data,
      nextCallback,
      method,
      linkData,
      isShowLoading,
      neterr,
      errtips,
      loadingText
    }
  )
}

function requestProxy(
  {
    url,
    data,
    nextCallback,
    method = 'get',
    linkData = {},
    isShowLoading = true,
    neterr = false,
    errtips = true,
    loadingText = ''
  }
) {
  if (isShowLoading == true) {
    wx.showToast({
      title: loadingText,
      icon: 'loading',
      mask: true,
      duration: 10000
    })
  }
  //时间戳
  let timestamp = computeTimeStamp()
  //随机字符串
  let nonce = util.randomWord(false, 20)
  //{name:'name'}转&name=name
  let link = createLink(linkData)
  let responseData = createResponseData(linkData, nonce)
  let sign = createSign(urls.test, responseData, timestamp, data)
  let _url = util.updateUrl(url)
  wx.request({
    url: _url + '?sign=' + sign + link + '&nonce=' + nonce,
    method: method,
    data: JSON.stringify(data),
    header: {
      'content-type': 'application/json',
      'MINIAPP-Authorization': ls.get(ls.token),
      'X-ZZ-Timestamp': timestamp,
      'X-ZZ-Device-AppId': ls.get(ls.appid),
      'v': ls.get(ls.version),
      'X-ZZ-Wechat-Version': ls.get(ls.wechatVersion),
      'X-ZZ-Open-Id': ls.get(ls.openid),
      'X-ZZ-Device-Version': ls.get(ls.deviceVersion)
    },
    success: (res) => {
      if (isShowLoading == true) {
        wx.hideToast()
      }
      if (res.data.code == 0) {
        nextCallback(res.data)
      } else if (res.data.code == 100031 || res.data.code == 100043) {
        // 100031 当前登录失效
        // 100043 token为空
        silentLogin(function () {
          requestProxy(
            {
              url,
              data,
              nextCallback,
              method,
              linkData,
              isShowLoading,
              neterr,
              errtips,
              loadingText
            }
          )
        })
      } else if (res.data.code == 100058) {
        //您的系统时间不正确 存在时间差
        setTimeDiff(res.data.now)
        requestProxy(
          {
            url,
            data,
            nextCallback,
            method,
            linkData,
            isShowLoading,
            neterr,
            errtips,
            loadingText
          }
        )
      } else {
        // 非正常返回提示
        // 260031 订单同步信息异常，稍后系统会自动修复，敬请谅解，谢谢
        // 260004 亲，订单传入总支付金额{0}与计算所得金额{1}不相等
        // 100061 您当前访问过快，请稍后再试
        // 160004
        // 120017 注册失败，请稍后重试
        // 100063
        // 120006 该账号未注册，请检查账号或立刻注册
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
      //弱网环境，返回-1 ，并提示
      if (isShowLoading == true) {
        wx.hideToast()
      }
      const title = '您的网络好像不太给力，请稍后重试'
      if (neterr == true) {
        wx.showToast({
          title: title,
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
      let data = {
        code: -1,
        message: title
      }
      nextCallback(data)
    }
  })
}

export default request
