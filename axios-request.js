/**
 * http封装请求
 */
import axios from 'axios'

// 超时时间
axios.defaults.timeout = 3000
// http请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
let erorrMap = {
  'CMN00000': '成功',
  'CMN00001': '输入参数为空',
  'CMN00002': '输入参数校验失败'
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
  return axios.request(
    Object.assign({
        method: 'post',
        data: {},
        params: {}
      },
      config
    )
  )
}

export default request

request({
  params: {},
  data: {},
  method: 'post'
}).then((res) => {
  if (res.data.code === 'CMN00000') {
  }
}).catch((err) => {
  // 处理异常，
  // 可处理到200之外的异常，
  // http响应拦截器中代码异常，
  // then代码中的异常
})
