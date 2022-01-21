import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCIjO3MRekrnU0IiJB8qGCufjhWc-wspZY",
    authDomain: "blogging-web-989cc.firebaseapp.com",
    projectId: "blogging-web-989cc",
    storageBucket: "blogging-web-989cc.appspot.com",
    messagingSenderId: "563028544743",
    appId: "1:563028544743:web:e5261577252bdb7a76a642"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export const storage = getStorage();