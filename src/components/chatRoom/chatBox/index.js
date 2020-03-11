import React, { Component, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessageAction, setJustMountedAction, updateMessageAction } from '../../../actions'
//components
import Message from './message'
import { db } from '../../../config';
import { render } from '@testing-library/react';
import './chatBox.css'

export default function ChatBox(props) {
    //store
    const currentUser = useSelector(state => state.currentUser)
    const messages = useSelector(state => state.messages)
    const justMounted = useSelector(state => state.justMounted)
    //actions
    const dispatch = useDispatch()
    const loadMessage = (messageInfo) => dispatch(loadMessageAction(messageInfo))
    const setJustMounted= (boolean) => dispatch(setJustMountedAction(boolean))
    console.log(messages)

    useEffect(() => {
        addMessageListener()
    }, [])

    function addMessageListener() {
        console.log(messages)
        db.collection('messages').orderBy('timestamp')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges()
                changes.forEach(change => {
                    if (change.type === 'added') {
                        const messageInfo = change.doc.data()
                        // console.log(props.justMounted)
                        console.log(justMounted)
                        if (messageInfo.userID !== currentUser.userID){//(justMounted) { //ignore messages of current user that just arrived to db
                            loadMessage(messageInfo)
                        }
                    }
                })
                // props.setJustMounted()
                setJustMounted(false)
            })
    }


    // function updateMessageStatus(messageID, status) {
    //     const messageInfo = messages.filter(message => message.messageID === messageID)
    //     if (status === 'sent') {
    //         messageInfo.status = 'sent'
    //     }
    //     else if (status === 'deleted') {
    //         messageInfo.status = 'deleted'
    //         messageInfo.content = 'This message was deleted'
    //     }
    //     else if (status === 'deleting') {
    //         messageInfo.status = 'deleting'
    //         messageInfo.content = 'This message was deleted'
    //     }
    //     dispatch(updateMessageAction(messageID, messageInfo))
    // }

    // useEffect(()=>{
    //     console.log(displayError)
    // }, [displayError])

    return (
        <div className="chat-box">
            {messages.map(message => <Message key={message.messageID} message={message} />)}
        </div>
    )
}

