import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
Vue.prototype.SunloginControl = window.SunloginControl
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')