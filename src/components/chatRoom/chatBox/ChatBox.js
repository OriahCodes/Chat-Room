import React, { Component, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessageAction, updateMessageAction } from '../../../actions/actions'
// import ScrollToBottom from 'react-scroll-to-bottom';
import { animateScroll } from "react-scroll";

//components
import Message from './message/Message'
import { db } from '../../../config';
import './chatBox.css'

export default function ChatBox() {
    //store
    const currentUser = useSelector(state => state.currentUser)
    const messages = useSelector(state => state.messages)
    //actions
    const dispatch = useDispatch()
    const loadMessage = (messageInfo) => dispatch(loadMessageAction(messageInfo))

    useEffect(() => {
        addMessageListener()
    }, [])

    function addMessageListener() {
        db.collection('messages').orderBy('timestamp')
            .onSnapshot({ includeMetadataChanges: true }, snapshot => {
                snapshot.forEach(doc => {
                    let messageInfo = doc.data()
                    if (!doc.metadata.fromCache) { //disabling firebase offline capabilities for demonstration purposes
                        if (!messages.has(messageInfo.messageID)) {
                            loadMessage(messageInfo)
                        }
                    }
                })
                // let changes = snapshot.docChanges()

                // var source = snapshot.metadata.fromCache ? "local cache" : "server";
                // console.log("Data came from " + source);
                // if (source === "server") { //disabling firebase offline capabilities for demonstration purposes
                //     changes.forEach(change => {
                //         if (change.type === 'added') {
                //             const messageInfo = change.doc.data()
                //             if (messages.has(messageInfo.messageID)) {
                //                 // updateMessageStatus()
                //             }
                //             else {
                //                 debugger
                //                 loadMessage(messageInfo)
                //             }
                //         }
                //     })
                // }
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

    useEffect(() => {
        scrollToBottom()
    })

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "chat-box"
        });
    }

    return (
        <div id="chat-box">
            {/* <ScrollToBottom className="scroll-to-bottom"> */}
            {[...messages.keys()].map(messageID => <Message key={messageID} message={messages.get(messageID)} />)}
            {/* </ScrollToBottom> */}
        </div>
    )
}

