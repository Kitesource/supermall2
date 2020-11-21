import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  // mutations 唯一的目的就是修改state中的状态
  // mutations 中的每一个方法尽可能完成的事单一
  mutations,
  actions,
  modules: {
  },
  getters
})

//挂载Vue实例上
export default store
