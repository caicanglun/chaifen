import Vue from 'vue'
import App from './App'
import setClipboardData from "@/common/ican-H5Api/ican-H5Api.js"
import request from "./http.js"
import store from './store/store';
Vue.prototype.$http = request
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
