import { Toast } from 'vant'


export function ToastLog(config) {
    Toast({
        message: config.message,
        duration: config.duration || 1500,
        position:'bottom'
    })
}