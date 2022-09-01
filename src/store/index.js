import { createStore } from 'vuex'

export default createStore({
  state: {
    storeDataLoaded: false,
    config: null,
  },
  getters: {
  },
  mutations: {
    updateConfig(state, data){
      state.config = data
      state.storeDataLoaded = true
    }
  },
  actions: {
  },
  modules: {
  }
})
