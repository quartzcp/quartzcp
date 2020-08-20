export default {
  /**
   * Get the current user's unique id.
   *
   * @returns {string|null} Returns the user id, or undefined if not logged in.
   */
  userId: (state) => state.firebaseUser?.uid,
};
