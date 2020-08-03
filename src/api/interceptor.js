import axios from 'axios'
import Qs from 'qs'
import CODE from './code'
import { ToastLog } from '@/class/log'
import Raven from 'raven-js'
const { useSentry } = require('../../h5.conf')
import Store from '@/store'
// 不处理的code
let NoHandleCode = [
    CODE.Success
]

/* 拦截器*/
axios.interceptors.request.use(data => {
    if(data.method == 'post') {
        if(data.upfile){
            return data
        }
        data.data = Qs.stringify(data.data)
    }
    return data
}, error => {
    ToastLog({
        message: error.toString(),
    })
    return Promise.reject(error)
})


axios.interceptors.response.use(data => {// 响应成功关闭loading
    let response = data.data
    let { code, errcode, msg, errmsg } = response
    if((code && NoHandleCode.every(v => v != code)) || (errcode && NoHandleCode.every(v => v != errcode))) {
        ToastLog({
            message: msg || errmsg || '请稍后重试',
        })
    }
    return data
}, error => {
    if(!navigator.onLine) {
        ToastLog({
            message: '网络异常，稍后再试',
        });
    } else {
        ToastLog({
            message: error.toString(),
        })
        if(useSentry) {
            // 捕捉接口异常
            if(error.response.config){
                let { url } = error.response.config
        
                Raven.captureException(error, {
                    tags: {
                        responseUrl: url
                    },
                    extra: error.response.config
                })
            }
        }
    }
    return Promise.reject(error)
})


class Http {
    constructor(
        options
    ) {
        this.method = options.method
        this.url = options.url
        this.data = options.data
        this.config = options.config
        this.options = options || {}
        // this[this.method]()
    }

    response(response) {
        if(response.data.code === CODE.loginFail) {
            if(this.options.isCheckUser) Store.dispatch('logonFailDialog')
        }
        // 响应后的一些操作
        return response
    }

    async get() {
        let response = await axios.get(this.url, {
            params: this.data,
            ...this.config
        })

        return this.response(response)
    }

    async post() {
        let response = await axios.post(this.url, this.data, this.config)
        return this.response(response)
    }
}

export async function server(
    options
) {
    let data = options && options.data || {}
    // 判断是否需要校验登录
    if(options && options.isCheckUser && !Store.state.User.isLogin) {
        Store.dispatch('jumpToLogin')
        return { data: {code: null, data: null} }
    }
    // 不请求
    if(options && options.isAuth && !Store.state.User.isLogin) {
        return { data: {code: null, data: null} }
    }
    // 判断是否检验登录 合并用户信息
    if(options && options.isAuth) {
        let { App, User } = Store.state
        options.data = { ...options.data, ...User.info}
    }
    // options.data = { ...options.data, sid: Store.state.App.sid }
    let http = new Http(options)
    return (await http[options.method]())
}