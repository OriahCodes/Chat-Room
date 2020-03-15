
import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userIsOfflineAction, logoutAction, loginAction, setCurrentUserAction, setCurrentUserAndLoginAction, appIsLoadingAction, appNotLoadingAction } from './actions/actions'
import firebase from 'firebase'
import { db } from './config'
//components
import ChatRoom from './components/chatRoom/ChatRoom';
import Login from './components/login/Login';
import Spinner1 from './components/spinners/spinner1/Spinner1'

export default function App() {
  //store 
  const currentUser = useSelector(state => state.currentUser)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const isAppLoading = useSelector(state => state.isAppLoading)

  //actions
  const dispatch = useDispatch()
  const appIsLoading = () => dispatch(appIsLoadingAction())
  const appNotLoading = () => dispatch(appNotLoadingAction())
  const logOut = () => dispatch(logoutAction())
  const setCurrentUser = userInfo => dispatch(setCurrentUserAction(userInfo))
  const setCurrentUserAndLogin = userInfo => dispatch(setCurrentUserAndLoginAction(userInfo))
  const logIn = () => dispatch(loginAction())
  const userIsOffline = () => dispatch(userIsOfflineAction())

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) { //gets here if user just refreshed, or if welcome
        setCurrentUser({ userID: user.uid })
        manageAnonymousUser(user.uid)
      }
      else {
        appIsLoading()
        logOut()
        console.log("User logged out")
        firebase.auth().signInAnonymously()
      }
    })
  }, [])

  function manageAnonymousUser(userID) {
    db.doc(`/users/${userID}`).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) { //if user exists in db
          console.log("user Exists!")
          addExistingUser(docSnapshot.data())
        }
        else { //if user just entered site
          appNotLoading()
          console.log("user just entered site")
        }
      }).catch(error=>{
        if (error.message.includes("offline")){
          console.log("Error getting users docs: " +error.message)
          userIsOffline()
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
    }).then(() => {
      logIn(userID) 
    })
  }

  function addExistingUser(userInfo) {
    setCurrentUserAndLogin(userInfo)
  }

  return (
    <div className="app">

      {isAppLoading ?
        <Spinner1/> :

        isLoggedIn ?
          <ChatRoom /> :
          <Login onLoginAttempt={onLoginAttempt} />
      }
    </div>
  )
}

