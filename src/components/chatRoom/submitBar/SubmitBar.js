import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessagesAction } from '../../../actions/actions'
import './submitBar.css'
import uuid from 'uuid/v4';


export default function SubmitBar() {
    //state
    const [messageInput, setMessageInput] = useState('')
    //store
    const currentUser = useSelector(state => state.currentUser)
    //actions
    const dispatch = useDispatch()

    function handleInputChange(event) {
        setMessageInput(event.target.value)
    }

    function onSendMessage() {
        if (messageInput) {
            const messageInfo = createMessage()
            setMessageInput('')
            dispatch(sendMessagesAction(messageInfo))
        }
    }

    function createMessage() {
        const message = {
            content: messageInput,
            timestamp: new Date(),
            userID: currentUser.userID,
            nickname: currentUser.nickname,
            themeColor: currentUser.themeColor,
            messageStatus: 'sending',
            messageID: uuid()
        }
        return message;
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            onSendMessage()
        }
    }

    return (
        <div id="submit-bar">
            <input
                type="text"
                className="input"
                id="message-input"
                placeholder="Add a message"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={messageInput} />
            <div className="button" id="send-message-button" onClick={onSendMessage} >
                <i className="far fa-paper-plane"></i>
            </div>
        </div>
    )
}


