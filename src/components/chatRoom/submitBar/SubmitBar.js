import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageAction, sendMessagesAction } from '../../../actions/actions'
import { db } from '../../../config'
import './submitBar.css'
import firebase from 'firebase'
import uuid from 'uuid/v4';


export default function SubmitBar() {
    //state
    const [messageInput, setMessageInput] = useState('')

    //store
    const currentUser = useSelector(state => state.currentUser)
    // const messages = useSelector(state => state.messages)
    // const beingSent = useSelector(state => state.beingSent)

    //actions
    const dispatch = useDispatch()
    const addMessage = messageInfo => dispatch(addMessageAction(messageInfo))

    function handleInputChange(event) {
        setMessageInput(event.target.value)
    }

    function onSendMessage() {
        if (messageInput) {
            const messageInfo = createMessage()
            setMessageInput('')
            dispatch(sendMessagesAction(messageInfo))

            // addMessageAction(messageInfo)()
            //     // this.setState({ loading: true });
            //     messagesRef.child(id).push().set(createMessage())
            //         .then(() => {
            //             this.setState({ loading: false, message: '', errors: [] })
            //         })
            //         .catch(err => {
            //             // let errors = this.state.errors.concat(err);
            //             // this.setState({ loading: false, errors });
            //         })
            // } else {
            //     let errors = this.state.errors.concat({ message: 'Add a message' });
            //     this.setState({ errors });
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

