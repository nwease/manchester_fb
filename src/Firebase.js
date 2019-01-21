import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBTx5zzncHrCWe88uY2BohOvvOBAg85YJw",
    authDomain: "manchester-football.firebaseapp.com",
    databaseURL: "https://manchester-football.firebaseio.com",
    projectId: "manchester-football",
    storageBucket: "manchester-football.appspot.com",
    messagingSenderId: "96098829866"
};

firebase.initializeApp(config);

