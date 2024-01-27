import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
// Your web app's Firebase configuration
let firebaseConfig = {

  apiKey: "AIzaSyDsMHNtqL_uf88CJ7bylC4iYW0bL2ao8vY",
  authDomain: "heygrupos-616c1.firebaseapp.com",
  projectId: "heygrupos-616c1",
  storageBucket: "heygrupos-616c1.appspot.com",
  messagingSenderId: "138507331992",
  appId: "1:138507331992:web:9cfdbb4505f182c743e3ed"
};


// Inicializa conexão se não existir conexão ativa
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;