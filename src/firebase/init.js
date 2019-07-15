
import firebase from 'firebase'
import firestore from 'firebase/firestore'


  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyDdoQeDHjJfAxqFlvhlTkqQRRVxEEVsP4A",
    authDomain: "wizards-potions.firebaseapp.com",
    databaseURL: "https://wizards-potions.firebaseio.com",
    projectId: "wizards-potions",
    storageBucket: "wizards-potions.appspot.com",
    messagingSenderId: "857635746812",
    appId: "1:857635746812:web:96b3cb387b0d34f9"
  };

const firebaseApp = firebase.initializeApp(config);


// export firestore database
export default firebaseApp.firestore()