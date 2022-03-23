import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} 
from 'firebase/auth'; 
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLWVQ8wUQTyTpqs5h-1_KJrwiIWdCaON4",
    authDomain: "crwn-clothing-db-3e56b.firebaseapp.com",
    projectId: "crwn-clothing-db-3e56b",
    storageBucket: "crwn-clothing-db-3e56b.appspot.com",
    messagingSenderId: "383574645621",
    appId: "1:383574645621:web:3805f4a682b4e6db05113c"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
      if(!userAuth) return;
      const userDocRef = await doc(db, 'users', userAuth.uid);
      console.log(userDocRef);
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()){
          const {displayName, email} = userAuth;
          const createdAt = new Date();
          try {
              await setDoc(userDocRef,{
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation
              })
          } catch (error) {
              console.log("Error creating user" + error.message);
          }
      }
      return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async(email, password)=>{
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

// YmrQ9RR2OpJVGV26wr