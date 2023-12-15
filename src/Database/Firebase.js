import firebase from "firebase/app";
import "firebase/database";

const firebaseCredentials = {
  apiKey: "AIzaSyDHUKUGCvRZu5dU8CvjKYYMYgifNwX0dFo",
  authDomain: "library-management-api.firebaseapp.com",
  databaseURL: "https://library-management-api-default-rtdb.firebaseio.com",
  projectId: "library-management-api",
  storageBucket: "library-management-api.appspot.com",
  messagingSenderId: "628666637720",
  appId: "1:628666637720:web:c22ad1fc412f40cf431fed",
};
const fireDB = firebase.initializeApp(firebaseCredentials);

export default fireDB.database().ref();
