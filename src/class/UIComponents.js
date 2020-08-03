import { Dialog, Toast } from 'vant'
// UI默认配置

let Components = [
    Dialog,
    Toast
]

export function UseComponents(Vue) {
    Components.forEach(ui => {
        Vue.use(ui)
    })
}
