import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "***.firebaseapp.com",
  databaseURL: "https://***.firebaseio.com",
  projectId: "***",
  storageBucket: "***.appspot.com",
  messagingSenderId: "***",
  appId: "***",
  measurementId: "***"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
