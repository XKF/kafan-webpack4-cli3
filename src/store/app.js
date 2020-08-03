import TYPE from './type'

const state = {
    // 路由key
    routerKey: 0,
}

const getters = {

}

const mutations = {
    [TYPE.REFRESH_ROUTER]: function (state) {
        state.routerKey = +new Date()
    }
}

const actions = {
    /**
     * 刷新路由
     */
    RefreshRouter: function ({ commit, dispatch }) {
        commit(TYPE.REFRESH_ROUTER)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}