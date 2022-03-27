import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDvGlse6UaB4EexFJUkEJ0xBZjx95YblVs",
    authDomain: "shop24h-project.firebaseapp.com",
    projectId: "shop24h-project",
    storageBucket: "shop24h-project.appspot.com",
    messagingSenderId: "930751370248",
    appId: "1:930751370248:web:10ee878a63af4d66a8edbd",
    measurementId: "G-1NV6N6P1JF"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
