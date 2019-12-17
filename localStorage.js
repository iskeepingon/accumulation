let localStorage = {
  data: function () {
    return {
      timeDiff: '',
      token: '',
      wechatVersion: '',
      deviceVersion: '',
      openid: '',
      appid: '',
      version: '',
      isMember: ''
    }
  }(),
  isExistKey(key) {
    if (typeof this.data[key] === 'undefined') {
      console.log('请在localStorage中声明key')
      return false
    }
    return true
  },
  set(key, value) {
    if (!this.isExistKey(key)) {
      return
    }
    try {
      wx.setStorageSync(key, value)
    } catch (e) {
    }
  },
  get(key) {
    if (!this.isExistKey(key)) {
      return
    }
    try {
      return wx.getStorageSync(key)
    } catch (e) {
    }
  },
  remove(key) {
    if (!this.isExistKey(key)) {
      return
    }
    try {
      wx.removeStorageSync(key)
    } catch (e) {
    }
  },
  clear() {
    try {
      wx.clearStorageSync()
    } catch (e) {
    }
  }
}
export default localStorage
