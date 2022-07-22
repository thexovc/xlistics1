import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyB2_CNeLbCPXUOu2LqwVPu69MAntmZLm3o",

  authDomain: "xlistics-6b46a.firebaseapp.com",

  projectId: "xlistics-6b46a",

  storageBucket: "xlistics-6b46a.appspot.com",

  messagingSenderId: "1074504456304",

  appId: "1:1074504456304:web:75ccec8b42d93ca4673cb5"

};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;

export const authentication = getAuth(app)