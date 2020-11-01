const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();
const rtdb = admin.database();

/**
 * Create a new server.
 */
exports.create = functions.region('europe-west3').https
  .onCall(async (data, context) => {
    if (!context.auth) {
      // If not signed in, throw an error.
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Not authorised',
      );
    }

    const { uid: userId } = context.auth;

    // Deconstruct the request data.
    const { name, ip } = data;
  });

/**
 * Activate a server.
 */
exports.activate = functions.region('europe-west3').https
  .onRequest(async (req, res) => {

  });

/**
 * Process a server event.
 */
exports.processEvent = functions.region('europe-west3').database
  .ref('/{serverId}/{eventId}')
  .onCreate(async (snapshot, context) => {

  });

/**
 * Delete a server.
 */
exports.delete = functions.region('europe-west3').https
  .onCall(async (data, context) => {
    if (!context.auth) {
      // If not signed in, throw an error.
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Not authorised',
      );
    }

    const { uid: userId } = context.auth;
  });
