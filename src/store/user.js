import TYPE from './type'
import Raven from 'raven-js'
const { useSentry, userHost } = require('../../h5.conf')

const state = {
    isLogin: null,
    info: {},
    userInfoParams: {

    } // 用户登录信息
}

const getters = {

}

const mutations = {
    [TYPE.IS_LOGIN]: function (state, login) {
        state.isLogin = login
    },
    [TYPE.SET_USERINFO]: function(state, info) {
        state.info = Object.assign({}, state.info, info)
    },
    [TYPE.USER_PARAMS]: function(state, params) {
        state.userInfoParams = params
    }
}

const actions = {
    /* 获取登录态 */
    GetUserParams: async function({ state, commit, dispatch }) {
        
    },
    
    // 设置登录态
    SetLogin: function({ commit, dispatch }, login) {
        if (typeof login == 'boolean') {
            commit(TYPE.IS_LOGIN, login)
        }
    },
    
    // 设置用户的登录信息
    SetUserParams: function({ commit, dispatch }, params) {
        if (typeof params == 'object') {
            commit(TYPE.USER_PARAMS, params)
        }
    },

    //跳转登录
    jumpToLogin: function(){
        //code.....
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}