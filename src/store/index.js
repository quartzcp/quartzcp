import Vue from 'vue';
import Vuex from 'vuex';
import rootState from './state';
import auth from './auth';

Vue.use(Vuex);

/** @type import('vuex').Store<typeof rootState> */
export default new Vuex.Store({
  modules: {
    auth,
  },
  state: rootState,
});
