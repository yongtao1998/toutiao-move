import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth' // 别名配置

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token 信息的对象
    user: auth.getUser()
  },
  // 修改token
  mutations: {
    // 修改token
    updateUser (state, payload) {
      // 将 payload 中的token数据 给 state
      state.user = payload.user
      // 存入本地
      auth.setUser(payload.user)
    },
    // 删除token
    delUser (state) {
      // 清除 state中的token
      state.user = {}
      // 清除本地的token
      auth.delUser()
    }

  },
  actions: {
  },
  modules: {
  }
})
