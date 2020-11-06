/** @format */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const testA = {
  apiKey: 'AIzaSyA0gWzEmvBZ6_KYX9qJ_U5J8O5lfGi7IRQ',
  authDomain: 'company-analysis-8ea03.firebaseapp.com',
  databaseURL: 'https://company-analysis-8ea03.firebaseio.com',
  projectId: 'company-analysis-8ea03',
};

const firebaseApp = firebase.initializeApp(testA);

export const firebaseAuth = firebaseApp.auth();
export const firebaseDatabase = firebaseApp.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
