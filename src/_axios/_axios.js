import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
})

// 拦截post请求，格式化数据
instance.interceptors.request.use(
  config => {
    if(config.method === 'post')
      config.data = qs.stringify(config.data);
    return config
  },
  error => Promise.reject(error)
)

export default instance