import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBpX4rP1xXqHH6VFyRjkR-4T4g68By1woE",
    authDomain: "manchester-football-d3dfe.firebaseapp.com",
    databaseURL: "https://manchester-football-d3dfe.firebaseio.com",
    projectId: "manchester-football-d3dfe",
    storageBucket: "manchester-football-d3dfe.appspot.com",
    messagingSenderId: "1060898295836"
};


firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebaseDB,
    firebasePlayers
}

