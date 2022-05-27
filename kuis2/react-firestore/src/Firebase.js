import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDyXd6LGJWbv4mfcP42ekS1-ZhET33R_AQ",
  authDomain: "minggu10-659d7.firebaseapp.com",
  projectId: "minggu10-659d7",
  storageBucket: "minggu10-659d7.appspot.com",
  messagingSenderId: "1037187140772",
  appId: "1:1037187140772:web:e2be866caef14de8b0ea31",
  measurementId: "G-9ZMEGTBVZD"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;

const auth = getAuth();
export function register(email, password){
  return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email, password){
  return signInWithEmailAndPassword(auth, email, password);
}
