import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageAction } from '../../../../actions/actions'
//components

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

    return (
        message ?
            <div className="message">

                {(message.userID === currentUser.userID)  
                && (message.messageStatus === 'sending' || message.messageStatus === 'sent')?
                    <span className="delete-message" onClick={onDeleteMessage}>X</span> : null
                }

                {message.userID === currentUser.userID ?
                    <span className="nickname" style={{ color: `${message.themeColor}` }}> Me :</span> :
                    <span className="nickname" style={{ color: `${message.themeColor}` }}>{message.nickname} :</span>
                }

                <span className="content"> {message.content}</span>

                {message.messageStatus === 'sending' || message.messageStatus === 'deleting' ?
                    <i className="far fa-clock"></i> :
                    message.messageStatus === 'sent' ?
                        <i className="fas fa-check"></i> : null}
                    {message.messageStatus === 'deleted' ?
                        <i className="fas fa-ban"></i> : null
                }
                {/* <span className="message-status" style={{color: `green`}}>-{message.messageStatus}- </span> */}
            </div> : <></>
    )
}