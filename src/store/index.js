import Vue from 'vue'
import Vuex from 'vuex'
import libs from '@dlophin/libs'
import vuexRouterInterceptor from '@/router/beforeRoute'

Vue.use(Vuex)

let modules = libs.requireContext(require.context('@/store', true, /\.js$/), 'js', ['index'])

export default new Vuex.Store({
    modules,
    plugins: [vuexRouterInterceptor()],
})
