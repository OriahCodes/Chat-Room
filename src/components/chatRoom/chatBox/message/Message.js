import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { deleteMessageAction } from '../../../../actions/actions'
import './message.css'

export default function Message(props) {
    const { message } = props
    //store
    const currentUser = useSelector(state => state.currentUser)
    //actions
    const dispatch = useDispatch()
    const deleteMessage = (messageInfo) => dispatch(deleteMessageAction(messageInfo))

    function onDeleteMessage() {
        deleteMessage(message)
    }

    //styling
    const currentNickname = message.userID === currentUser.userID ? "Me" : message.nickname
    const messageContainerStyle = {
        textAlign: currentNickname === "Me" ? "right" : "left",
    }
    const messageStyle = {
        backgroundColor: currentNickname === "Me" ? "#caffc0e0" : "#d8eaece0",
    }
    const contentStyle = {
        color: (message.messageStatus === "deleted") || (message.messageStatus === "deleting") ? 'gray' : 'balck',
    }

    let formattedTime
    if (message.timestamp.seconds) { //firebase format
        formattedTime = moment(message.timestamp.toDate()).fromNow()
        if (formattedTime.includes("minute") || formattedTime.includes("second") || formattedTime.includes("hour")) {
            formattedTime = moment(message.timestamp.toDate()).format('LT')
        }
    }
    else { //Date format
        formattedTime = moment(message.timestamp).fromNow()
        if (formattedTime.includes("minute") || formattedTime.includes("second") || formattedTime.includes("hour")) {
            formattedTime = moment(message.timestamp).format('LT')
        }
    }

    return (
        message ?
            <div className="message-container" style={messageContainerStyle}>
                <span className="message" style={messageStyle}>
                    {(message.userID === currentUser.userID)
                        && (message.messageStatus === 'sending' || message.messageStatus === 'sent') ?
                        <span className="delete-message" onClick={onDeleteMessage}>x</span> : null
                    }

                    {currentNickname !== "Me" ?
                        <span className="nickname" style={{ color: `${message.themeColor}` }}>{currentNickname}</span>
                        : null
                    }

                    <span className="content" style={contentStyle}> {message.content}</span>

                    <span className="timestamp">{formattedTime}</span>

                    <span className="status-icon">
                        {currentNickname === "Me" ?
                            message.messageStatus === 'sending' || message.messageStatus === 'deleting' ?
                                <i className="far fa-clock"></i> :
                                message.messageStatus === 'sent' ?
                                    <i className="fas fa-check"></i> : null
                            : null}
                        {message.messageStatus === 'deleted' ?
                            <i className="fas fa-ban"></i> : null}
                    </span>
                </span>
            </div> : <></>
    )
}