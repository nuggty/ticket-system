import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9xHpGwNcAY-3Wx6WJsUdXfnQ1jXFtwTo",
    authDomain: "ticket-system-6874e.firebaseapp.com",
    projectId: "ticket-system-6874e",
    storageBucket: "ticket-system-6874e.appspot.com",
    messagingSenderId: "732354852120",
    appId: "1:732354852120:web:ae6ab22c7d90a44aab9a6d",
    measurementId: "G-S8F1HMTK8H"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase