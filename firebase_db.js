// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore, setDoc, doc } from 'firebase/firestore';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAALHCZ71xxfQDuwfU39ICA0OeqSWCXfnU",
  authDomain: "mtaa-zadanie2-webrtc.firebaseapp.com",
  projectId: "mtaa-zadanie2-webrtc",
  storageBucket: "mtaa-zadanie2-webrtc.appspot.com",
  messagingSenderId: "346627769754",
  appId: "1:346627769754:web:12cd6cead0ffe887036623",
  measurementId: "G-486F8QZDPN"
};

// Initialize Firebase
firebase.initializeApp();
const app = firebase.app();
export const db = firestore();
