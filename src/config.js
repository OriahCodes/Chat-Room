import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCFEnwG6OX64CfFgLQsqClKWj_ixLTwlUE",
  authDomain: "di-chat-room.firebaseapp.com",
  databaseURL: "https://di-chat-room.firebaseio.com",
  projectId: "di-chat-room",
  storageBucket: "di-chat-room.appspot.com",
  messagingSenderId: "334529270209",
  appId: "1:334529270209:web:3a5e81123d65a363889f40",
  measurementId: "G-3LCF5HW0TW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()  

