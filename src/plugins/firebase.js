import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import config from '@/config';

const app = firebase.initializeApp(config.firebase);

export const auth = app.auth();
export const db = app.firestore();
export const functions = app.functions('europe-west3');
export const rtdb = app.database();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint, FieldValue, FieldPath } = firebase.firestore;
export { Timestamp, GeoPoint, FieldValue, FieldPath };

const { ServerValue } = firebase.database;
export { ServerValue };
