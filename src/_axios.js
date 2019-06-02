import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
	headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
})

instance.interceptors.request.use(function(config){
	// 对post请求的数据进行转换
	if(config.method === 'post'){
		config.data = qs.stringify(config.data)
	}
	return config
},function(error){
	return Promise.reject(error);
});

export default instance


