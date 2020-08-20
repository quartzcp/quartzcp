export default {
  /**
   * Update the firebaseUser property in the store.
   *
   * @param state {Object} The Vuex state object.
   * @param firebaseUser {firebase.User} The Firebase Auth user record.
   */
  setFirebaseUser: (state, firebaseUser) => {
    state.firebaseUser = firebaseUser;
    state.loggedIn = !!firebaseUser;
  },
};
