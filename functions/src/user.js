const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

exports.createProfile = functions.region('europe-west3').auth
  .user()
  .onCreate(async (user) => {
    if (user.customClaims['server'] === true) {
      /*
       * This user account will be used by a server, so we don't need to create
       * user or profile documents.
       */
      return;
    }

    // Create user and profile documents.
    const userRef = db.collection('users').doc(user.uid);
    const profileRef = userRef.collection('profiles').doc(user.uid);
    await Promise.all([userRef.set({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    }), profileRef.set({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
    })]);
  });
