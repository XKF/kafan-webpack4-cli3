import '@/class/sentry'
import 'lib-flexible/flexible'
import Vue from 'vue'

import App from './App.vue'

import store from '@/store';
import router from '@/router'

import libs from '@dlophin/libs'
import { server } from '@/api/interceptor'
import * as api from '@/api'
import CODE from '@/api/code'
import PF from '@/utils/platform'

import { UseComponents } from '@/class/UIComponents'

//注册ui
UseComponents(Vue)

Vue.prototype.$libs = libs
Vue.prototype.$http = server
Vue.prototype.$api = api
Vue.prototype.$CODE = CODE
Vue.prototype.$PF = PF

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  
  render(h) {
    return h(App)
  }
}).$mount('#app')
