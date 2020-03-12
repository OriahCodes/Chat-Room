import React, { Component, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector, setJustMountedAction } from 'react-redux';
import firebase from 'firebase'
import { logoutAction } from '../../actions/actions'
import { db } from '../../config';
import './chatRoom.css'
//components
import ChatBox from './chatBox/ChatBox'
import LoadingStatus from './loadingStatus/LoadingStatus'
import SubmitBar from './submitBar/SubmitBar'

export default function ChatRoom() {
    //store
    const currentUser = useSelector(state => state.currentUser)
    const displayError = useSelector(state => state.displayError)

    function onLogout() {
        firebase.auth().signOut()
    }

    return (
        <div id="chat-room">

            <span className="button" id="logout-button" onClick={onLogout}>Logout</span>

            <div id="chatRoom-title-container">
                <i className="far fa-comments"></i>
                <span>Messango</span>
            </div>

            <div className="welcome"> Hello {currentUser.nickname} , welcome !</div>

            <ChatBox />

            <SubmitBar />

            <LoadingStatus />

            {/* {}
            <div className="display-error"></div> */}

        </div>
    )
}