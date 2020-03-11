
import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction, loginAction, setCurrentUserAction,setCurrentUserAndLoginAction} from './actions/actions'
import firebase from 'firebase'
import { db } from './config'
//components
import ChatRoom from './components/chatRoom/ChatRoom';
import Login from './components/login/Login';

export default function App() {
  //store 
  const currentUser = useSelector(state => state.currentUser)
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  //actions
  const dispatch = useDispatch()
  const logOut = () => dispatch(logoutAction())
  const setCurrentUser = userInfo => dispatch(setCurrentUserAction(userInfo))
  const setCurrentUserAndLogin = userInfo => dispatch(setCurrentUserAndLoginAction(userInfo))
  const logIn = () => dispatch(loginAction())

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { //gets here if user just refreshed, or if welcome
        setCurrentUser({userID: user.uid})
        manageAnonymousUser(user.uid)
      }
      else {
        logOut()
        console.log("User logged out")
        firebase.auth().signInAnonymously()
      }
    })
  }, [])

  function manageAnonymousUser (userID){
    db.doc(`/users/${userID}`).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) { //if user exists in db
          console.log("user Exists!")
          addExistingUser(docSnapshot.data())
        }
        else { //if user just entered site
          console.log("user just entered site")
        }
      })
  }

  function onLoginAttempt() {
          console.log("this is a new user")
          addNewUser(currentUser.userID)
  }

  function addNewUser(userID) { //add new user to db and login
    db.doc(`/users/${userID}`).set({
      nickname: currentUser.nickname,
      themeColor: currentUser.themeColor,
      userID
    }).then(()=>{
      logIn(userID) //change to login
    })
  }

  function addExistingUser(userInfo) {
    setCurrentUserAndLogin(userInfo)
  }

  console.log(currentUser)
  return (
    <div className="app">
      {isLoggedIn ?
        <ChatRoom /> :
        <Login onLoginAttempt={onLoginAttempt} />
      }
    </div>
  )
}

