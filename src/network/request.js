import axios from 'axios'
import {baseURL} from "@/common/const";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
  })
  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })

  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  })

  //3.发送真正的网络请求
  return instance(config)
}
