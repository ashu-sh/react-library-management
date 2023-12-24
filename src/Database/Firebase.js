import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";

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

export const auth = getAuth(fireDB);

export default fireDB.database().ref();
