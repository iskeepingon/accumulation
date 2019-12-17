/**
 * http配置
 */
import axios from 'axios'

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
let erorrMap = {
  'CMN00000': '成功',
  'CMN00001': '输入参数为空',
  'CMN00002': '输入参数校验失败',
  'CMN00003': '业务逻辑错误',
  'CMN00004': '请求数据不存在',
  'CMN00005': '必须先登录',
  'CMN99998': '系统调用错误',
  'CMN99999': '系统内部错误',
  'ONL00010': '输入参数校验失败',
  'USE00000': '您已在对方的好友列表中',
  'MAR00000': '下单成功，正在支付中',
  'MAR00001': '商品库存不够',
  'MAR00002': '购买数量超限',
  'MAR00003': '价格错误',
  'MAR00004': '当前能量不足以兑换哦',
  'MAR00005': '商品已下架',
  'MAR00006': '购买失败',
  'MAR00007': '此商品需实名购买，请先实名',
  'MAR00008': '当前无可用道具，请至商店兑换',
  'MAR00009': '当前有使用中道具',
  'MAR00010': '系统维护，请稍后重试'
}
// http响应拦截器
axios.interceptors.response.use(res => {
  let code = res.data.code
  if (code === 'CMN00000') {
  } else {
    if (erorrMap[code]) {
      //erorrMap[code]
    } else {
      //'未知错误'
    }
  }
  return res
}, async (error) => {
  if (error.response.status === 401) {
    //'请先登录'
  } else if (error.response.status === 500) {
    //'服务器异常'
  } else if (error.response.status === 504) {
    //'网络超时'
  }
  return Promise.reject(error)
})

let request = (config) => {
  let token = window.localStorage.getItem('token')
  axios.defaults.headers.common['token'] = token || ''
  return axios.request({
    url: config.url,
    method: config.method || 'post',
    data: config.data || {}
  })
}

export default request
