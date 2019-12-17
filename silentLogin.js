let url = {
  memberbyopenid: '',
  getwechatsessionkey: ''
}
import ls from './localStorage'
import request from './request'

function wxLogin() {
  //微信登录
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

function getMemberInfo(data) {
  //获取member信息
  return new Promise((resolve, reject) => {
    request(url.memberbyopenid, data, res => {
      if (res.code == -1) {
        reject()
      } else {
        if (res.code == 0) {
          ls.set(ls.isMember, 1)
          ls.set(ls.token, res.data.token)
          ls.set(ls.mobile, res.data.mobile)
          ls.set(ls.memberid, res.data.memberid)
        } else if (res.code == 120006) {
          //未注册
          ls.set(ls.isMember, -1)
        } else {
        }
        resolve(res)
      }
    }, 'post', {}, false, false, false, '')
  })
}

function getWechatSessionkey(data) {
  //获取sessionkey
  return new Promise((resolve, reject) => {
    request(url.getwechatsessionkey, data, res => {
      if (res.code == -1) {
        reject()
      } else {
        if (res.code == 0) {
          ls.set(ls.openid, res.data.openid)
        } else {

        }
        resolve(res)
      }
    }, 'post', {}, false, false, false, '加载中...')
  })
}

function silentLogin(successCallback, failCallback) {
  // 登录
  // 1,微信登录
  // 2,获取sessionkey
  // 3,获取member信息
  wxLogin().then(res => {
    if (res.code) {
      getWechatSessionkey({appid: ls.get(ls.appid).appid, jscode: res.code}).then(ret => {
        if (ret.code == 0) {
          getMemberInfo({appid: ls.get(ls.appid), openid: ret.data.openid}).then(reg => {
            if (reg.code == 0) {
              if (typeof successCallback === 'function') {
                successCallback()
              }
            } else {
              if (typeof failCallback === 'function') {
                failCallback()
              }
            }
          }).catch(err => {
          })
        } else {
          if (typeof failCallback === 'function') {
            failCallback()
          }
        }
      }).catch(err => {
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: res.errMsg,
        showCancel: false
      })
    }
  }).catch(err => {
    wx.showModal({
      title: '温馨提示',
      content: err,
      showCancel: false
    })
  })
}

export default silentLogin
