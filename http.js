import request from './js_sdk/cooke-request/request/request.js'
// const ServerUrl = "http://192.168.11.125"
// const ServerUrl = "http://test.144f.com:8080/sl-web"
const ServerUrl = "http://app.etfspro.com:8080/sl-web"
//const ServerUrl = "http://app.ecfpros.com:8080/sl-web"

request.setConfig({
  baseUrl: ServerUrl, // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
  dataType: 'json', // 可删除，默认为json
  responseType: 'text', // 可删除，默认为text
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    // 'token': '',
	// 'MYTK': uni.getStorageSync('token'),
	// 'Authorization': uni.getStorageSync('token'),
    'content-type': 'application/json' 
  }
})
// 设置请求拦截器
request.interceptors.request(config => {
  // 配置参数和全局配置相同，此优先级最高，会覆盖在其他地方的相同配置参数

  // 追加请求头，推荐
  // config.header['content-type'] = 'application/json';
  // config.header.token = '';
     config.header.MYTK = uni.getStorageSync('token');
  
  // 'Authorization': uni.getStorageSync('token'),
  // 'content-type': 'application/json' 
  // 覆盖请求头
  // config.header = {
    // 'content-type': 'application/json',
    // 'token': 'token from interceptors'
  // }

  // return false; // 终止请求
  // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
  return config; // 返回修改后的配置，如未修改也需添加这行
})
request.interceptors.response(res => {
  // 接收请求，执行响应操作
  // 您的逻辑......
  
  // return false;    // 阻止返回,页面不会接收返回值
  // return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
  // return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获
    if (res.statusCode == '500'){
    	uni.showToast({
    		title: res.data.message,
    		icon: 'none',
    		duration: 1000
    	})
    	return false
    }
	if (res.data.status == 80){
		uni.redirectTo({
			url: '/pages/register/login'
		})
	}
	if (res.data.status == 1){
		uni.showToast({
			title: res.data.message,
			icon: 'none',
			duration: 2000
		})
		return false
	}
	if (res.data.status == 2){
		uni.showToast({
			title: res.data.message,
			icon: 'none',
			duration: 2000
		})
		return false
	}
	if (res.data.status == 0){
		return res; // 原样返回 
	}
	 
  
  
},err =>{
	console.log(err)
	uni.showToast({
		title: err.response.data.message
	});
	return Promise.reject(err)
})
export default request