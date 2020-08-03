/**
 * dev 开发模式
 * testing 测服模式
 * jenkins 正服模式
 */
var ENV = process.env.VUE_APP_WEB_ENV;

const _publicPath = ENV == 'jenkins'
                        // 填正服资源路径
                        ? ''
                        : ENV == 'testing'
                            // 填测服资源路径
                            ? ''
                            // 不用填
                            : '/';

const Config = {
    // 资源domain
    publicPath : _publicPath,

    // 是否开启serviceWorkerCache 缓存
    useServiceWorkerCache : false,

    // api 接口域名地址
    host : ENV == 'jenkins'
                    // 填正服域名
                    ? ''
                    : ENV == 'testing'
                        // 填测服域名
                        ? ''
                        // 不用填 开发模式用proxy代理
                        : '',
    
    //登录注册域名
    userHost : ENV == 'jenkins'
                    // 填正服域名
                    ? ''
                    : ENV == 'testing'
                        // 填测服域名
                        ? ''
                        // 不用填 开发模式用proxy代理
                        : '',
    
    // 下载安装域名
    installHost : ENV == 'jenkins'
                        // 填正服域名
                        ? ''
                        : ENV == 'testing'
                            // 填测服域名
                            ? ''
                            // 不用填 开发模式用proxy代理
                            : '',

    // Gzip压缩
    productionGzip : false,

    // sentry配置
    useSentry : false,

    sentry : {
        dsn: '',
        options: {
            release: `${process.env.PROJECT_NAME}-${process.env.WEB_ENV}/${process.env.PRODUCT_ENV}@${process.env.PROJECT_VERSION}`,
            // 环境筛选过滤器
            environment:`${process.env.PRODUCT_ENV}-${process.env.WEB_ENV}`,
            dataCallback(data) {
                if(/Only secure origins are allowed/.test(data.message)) data.level = 'warning'
                return data
            },
            // 白名单 以下链接下的报错才上报
            whitelistUrls: [
                `${_publicPath}`
            ],
            ignoreErrors: [
                /SecurityError\: DOM Exception 18$/
            ]
        }
    },

    // fis配置
    fis : {
        // 测服receiver
        testing: [
            {
                receiver: '',
                path: ''
            }
        ],
        // 灰度receiver,
        gray: [
            {
                receiver: '',
                path: ''
            }
        ],
        // 正服receiver
        jenkins: [
            {
                receiver:'',
                path: ''
            }
        ],
    }   
}

module.exports = Config;
