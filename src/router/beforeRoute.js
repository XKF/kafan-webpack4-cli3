import router from '@/router'

export default function vuexRouterInterceptor () {
    return (store) => {
        router.beforeEach(async (to, from, next) => {

            let nextAction = () => {
                // 改变TDK
                 // 调整document.title   
                try {
                    let title = to.meta.title
                    if(title){
                        document.title = title
                    }
                } catch(e) {}    
                next()
            }

            let login = async () => {
                // 判断是否检验过checkLogin
                store.state.User.isLogin == null && (await store.dispatch('GetUserParams'))
                // console.log(store.state.User.userParams)
                // 是否需要登录才能进去
                if(to.meta.isAuth && !store.state.User.isLogin) {
                    // 跳登录逻辑
                    //About jumpLogin code...
                } else {
                    nextAction()
                }
            }

            // 有些页面需要内嵌APP才能进          
            if(process.env.WEB_ENV != 'local' && to.meta.isApp) {
                // UA判断是否可进
                if (true/*APP的UA判断*/) {
                    await login()
                } else {
                    // code...
                }
            } else {
                await login()
            }
        })
    }
}