import { auth } from '@/plugins/firebase';

/** @type import('vuex').ActionTree */
export default {
  /**
   * Sign into Quartz CP using an email address and password.
   *
   * @param context {vuex.ActionContext}
   * @param payload {{ email: String, password: String }} The email address and
   *  password used to authenticate.
   * @returns {Promise<void>} Promise resolves when completed.
   */
  signIn: async (context, payload) => {
    const { email, password } = payload;
    // Attempt to sign in with Firebase Auth.
    await auth.signInWithEmailAndPassword(email, password);
  },
  /**
   * Register a new Quartz CP user using a name, email address and password.
   *
   * @param context {vuex.ActionContext}
   * @param payload {{ name: String, email: String, password: String }} The
   *  name, email address and password of the new user.
   * @returns {Promise<void>} Promise resolves when completed.
   */
  register: async (context, payload) => {
    const { commit, dispatch } = context;
    const { name, email, password } = payload;

    // Attempt to register a new account with Firebase Auth.
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await commit('setFirebaseUser', user);
    await dispatch('updateProfile', { name });
  },
  /**
   * Update the user's profile document.
   *
   * @param context {vuex.ActionContext}
   * @param payload {{ name?: String | null, photoURL?: String | null }}
   * @returns {Promise<void>} Promise resolves when completed.
   */
  updateProfile: async (context, payload) => {
    const { name, photoURL } = payload;

    // TODO: implementation
    console.error('auth/updateProfile: not implemented');
  },
};
