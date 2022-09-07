import { createStore } from 'vuex';
import moment from 'moment';

export default createStore({
  state: {
    storeDataLoaded: false,
    config: null,
  },
  getters: {
    formattedConfig(state){
      return {
        ...state.config,
        birthday: state.config?.birthday ? moment(state.config?.birthday).format('MMMM Do YYYY') : null,
        regularizedAt: state.config?.regularizedAt ? moment(state.config?.regularizedAt).format('MMMM Do YYYY') : null,
        graduatedAt: state.config?.graduatedAt ? moment(state.config?.graduatedAt).format('MMMM Do YYYY') : null,
      }
    }
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
