import React, { useState, useEffect } from 'react';

//Firebase
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

//Components
import Button from './components/Button';
import Channel from './components/Channel';

firebase.initializeApp({
  apiKey: "AIzaSyCwK3MJjjfKBM-hqM-GJ8fLE09o3E3x3a0",
  authDomain: "react-firechat-705e1.firebaseapp.com",
  projectId: "react-firechat-705e1",
  storageBucket: "react-firechat-705e1.appspot.com",
  messagingSenderId: "212428059891",
  appId: "1:212428059891:web:b02082cd5a46a90621b386",
  measurementId: "G-Y58KGZZDXR"
})

const auth = firebase.auth()
const db = firebase.firestore()

function App() {
  
  const[user, setUser] = useState(() => auth.currentUser)
  const[initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        setUser(user)
      }
      else{
        setUser(null)
      }
      if(initializing){
        setInitializing(false)
      }
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()
    try{
      await auth.signInWithPopup(provider)
    }catch (error) {
      console.error(error)  
    }
  }

  const signOut = async() => {
    try{
      await firebase.auth().signOut()
    } catch(error){
      console.log(error.message)
    }
  }

  if(initializing) return "Loading..."
  
  return (
    <div>
      {
        user ? (
          <>
            <Button onclick = {signOut}>Sign Out</Button>
            <Channel user = {user} db = {db} />
          </>
          ) : (
            <Button onclick={signInWithGoogle}>Sign in with Google</Button>
          )
      } 
    </div>
  );
}

export default App;
