import firebase from "firebase/app";
import "firebase/database";

const firebaseCredentials = {
  apiKey: "API_KEY",
  authDomain: "DOMAIN",
  databaseURL: "DATABASE_URL,
  projectId: "PROJECT_ID",
  storageBucket: "STORE_BRAKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
const fireDB = firebase.initializeApp(firebaseCredentials);

export default fireDB.database().ref();
