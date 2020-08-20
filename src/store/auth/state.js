export default {
  /**
   * Whether or not a user is logged in.
   *
   * This value will be {null} if we have not yet determined the auth state,
   * such as when the app is first loaded and Firebase Auth has not been
   * initialised.
   *
   * @type {boolean|null}
   */
  loggedIn: null,
  /**
   * Firebase Auth user record.
   *
   * @type {firebase.User|null}
   */
  firebaseUser: null,
  /**
   * User document relating to the currently authenticated user.
   *
   * @type {Object|null}
   */
  user: null,
};
