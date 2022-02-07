import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDyV6hMn0VB5nL8ALA1FqMU",
    authDomain: "ulu-twitter.firebaseapp.com",
    projectId: "ulu-twitter",
    storageBucket: "ulu-twitter.appspot.com",
    messagingSenderId: "975303638113",
    appId: "b:3fdef83cded0a0fbe20",
    measurementId: "G-XP0XR7ZD01"
};

export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
