import Vue from 'vue';
import Vuex from 'vuex';
import Common from './common';
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Common
  }
})

export default store