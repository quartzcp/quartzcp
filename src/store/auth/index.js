import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

/** @type {import('vuex').Store<typeof state>} */
export default {
  state,
  getters,
  mutations,
  actions,
};
