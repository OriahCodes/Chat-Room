import React from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase'
import './chatRoom.css'
//components
import ChatBox from './chatBox/ChatBox'
import LoadingStatus from './loadingStatus/LoadingStatus'
import SubmitBar from './submitBar/SubmitBar'

export default function ChatRoom() {
    //store
    const currentUser = useSelector(state => state.currentUser)

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

        </div>
    )
}