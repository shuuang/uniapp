import Vue from 'vue'
import App from './App'
// import axios from "@/js_sdk/gangdiedao-uni-axios";
// import axios from 'axios'
import store from "@/store";

Vue.config.productionTip = false

// axios.default.baseURL="http://localhost:3000/"
// Vue.prototype.$axios = axios

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
