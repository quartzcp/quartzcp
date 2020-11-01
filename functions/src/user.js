const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

/**
 * Initialise user and profile documents for new users.
 */
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

    // Create the new documents for the user.
    const userData = {
      id: user.uid,
      email: user.email,
    };
    const userRef = db.collection('users').doc(user.uid);
    const profileData = {
      id: user.uid,
      name: null,
      photoURL: null,
    };
    const profileRef = userRef.collection('profiles').doc(user.uid);

    await Promise.allSettled([
      // Create the user document.
      userRef.create(userData),
      // Create the profile document.
      db.runTransaction((transaction) =>
        transaction.get(profileRef).then((doc) => {
          if (doc.exists) {
            /*
             * If a profile document already exists, add any missing default
             * values (overridden by fields in the existing document data).
             */
            return transaction.update(profileRef, {
              ...profileData,
              ...doc.data(),
            });
          } else {
            // If no document exists, create it.
            return transaction.create(profileRef, profileData);
          }
        }),
      ),
    ]);
  });
