import axios from 'axios'
import { getToken } from './token'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
// 请求发送之前做拦截 插入一些自定义的配置 [参数处理]接受两个参数 成功/失败
request.interceptors.request.use((config) => {
  // get token from localStorage
  const token = getToken()

  // if token exist, include authotization in the header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // retuen updated config
  return config

}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
// 在响应返回到客户端之前做拦截 重点处理返回数据
request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { request }