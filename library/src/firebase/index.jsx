import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqPHXenR_XZ922RIFrTxjXGv3Lj0E9HY",
  authDomain: "library-app-b825a.firebaseapp.com",
  projectId: "library-app-b825a",
  storageBucket: "library-app-b825a.appspot.com",
  messagingSenderId: "564500347471",
  appId: "1:564500347471:web:695e21a753f59964d1883a",
  measurementId: "G-ME6HQW54WN"
};

const app = initializeApp(firebaseConfig);

let database = getFirestore(app)

export { database };