import React, { Component, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector, setJustMountedAction } from 'react-redux';
import firebase from 'firebase'
import { logoutAction } from '../../actions/actions'
//components
import ChatBox from './chatBox/ChatBox'
import LoadingStatus from './loadingStatus/LoadingStatus'
import SubmitBar from './submitBar/SubmitBar'
import { db } from '../../config';

export default function ChatRoom() {
    //store
    const currentUser = useSelector(state => state.currentUser)
    const displayError = useSelector(state => state.displayError)
        
    function onLogout() { 
        firebase.auth().signOut()
    }

    return (
        <div className="chatRoom">
            <div> Hello {currentUser.nickname}</div>
            <button className="logout" onClick={onLogout}>Log Out</button>

            <ChatBox />

            <SubmitBar />

            <LoadingStatus />

            {/* {}
            <div className="display-error"></div> */}

        </div>
    )
}