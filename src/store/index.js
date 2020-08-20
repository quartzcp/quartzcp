import Vue from 'vue';
import Vuex from 'vuex';
import rootState from './state';

Vue.use(Vuex);

/** @type import('vuex').Store<typeof rootState> */
export default new Vuex.Store({
  state: rootState,
});
