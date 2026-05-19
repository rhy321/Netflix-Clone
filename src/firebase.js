// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZtTHfpJ2QsDbqYTqxMSw-24il2e7sXaw",
  authDomain: "netflix-clone-645ee.firebaseapp.com",
  projectId: "netflix-clone-645ee",
  storageBucket: "netflix-clone-645ee.firebasestorage.app",
  messagingSenderId: "149070847408",
  appId: "1:149070847408:web:95d124028078ec9f41ca75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
  try{
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    const user = resp.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async()=>{
  signOut(auth);
}

export {auth, db, login, logout, signup}