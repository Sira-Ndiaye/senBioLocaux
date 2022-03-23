import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7sJvDL4hkanZ8OPQOhInfWcqIsnaQ8SE",
  authDomain: "sb-l-218a4.firebaseapp.com",
  databaseURL: "https://sb-l-218a4.firebaseio.com",
  projectId: "sb-l-218a4",
  storageBucket: "sb-l-218a4.appspot.com",
  messagingSenderId: "225327984690",
  appId: "1:225327984690:web:82e9484ad4129dc8990c2b",
  measurementId: "G-RKH3YN3HBW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };