import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB00R3gU3CCpr4ruNfLMAu_YYiDCwP-aAo',
  authDomain: 'todo-app-cp-c7388.firebaseapp.com',
  databaseURL: 'https://todo-app-cp-c7388.firebaseio.com',
  projectId: 'todo-app-cp-c7388',
  storageBucket: 'todo-app-cp-c7388.appspot.com',
  messagingSenderId: '350110210105',
  appId: '1:350110210105:web:cd846bbf0851450f6e55e8',
  measurementId: 'G-7LHSB3KE6E',
})
const db = firebaseApp.firestore()

export default db
