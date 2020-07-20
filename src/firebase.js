import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAl0cFll728tUYaUoqR_-vP4bOsUy4h5I0",
  authDomain: "todo-app-cp-483cb.firebaseapp.com",
  databaseURL: "https://todo-app-cp-483cb.firebaseio.com",
  projectId: "todo-app-cp-483cb",
  storageBucket: "todo-app-cp-483cb.appspot.com",
  messagingSenderId: "196138141793",
  appId: "1:196138141793:web:dc97b777593fa67c0f0220",
  measurementId: "G-TSF3DWDMR5",
});

const db = firebaseApp.firestore();

export default db;