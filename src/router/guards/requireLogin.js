import store from '@/store';

/**
 * Prevent navigation to this route unless the user is signed in.
 *
 * If the user isn't signed in they will be redirected to the login route
 * and upon successful login navigated back to the original route.
 */
const requireLogin = (to, from, next) => {
  const { loggedIn } = store.getters;

  /*
   * If the 'loggedIn' property is null then Firebase Auth has not yet been
   * initialised so the auth state cannot be determined. Check again in 50ms.
   */
  if (loggedIn === null) {
    setTimeout(() => requireLogin(to, from, next), 50);
    return;
  }

  // If the user is not logged in navigate to the login route.
  if (!loggedIn) {
    // Pass the target route path as the redirectUrl for successful login.
    next({
      name: 'auth-login',
      query: { redirectUrl: to.fullPath },
    });
    return;
  }

  next();
};

export default requireLogin;
