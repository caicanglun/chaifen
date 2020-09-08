import Vue from 'vue'
import App from './App'
import setClipboardData from "@/common/ican-H5Api/ican-H5Api.js"
import request from "./http.js"
import store from './store/store';
import VueI18n from 'vue-i18n'  
import messages from './common/lang.js'

Vue.use(VueI18n) 
Vue.prototype.$http = request
Vue.config.productionTip = false
const i18n = new VueI18n({ 
  // locale : 'zh-CN', //语言标识
  locale : uni.getStorageSync('locale')||'zh-CN', //语言标识
  messages
})  
Vue.prototype._i18n = i18n 
Vue.prototype.$i18nMsg = function(){
    return i18n.messages[i18n.locale]
}
App.mpType = 'app'

const app = new Vue({
	i18n, 
	store,
    ...App
})
app.$mount()
