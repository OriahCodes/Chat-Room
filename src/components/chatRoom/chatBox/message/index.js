import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components

export default function Message(props) {
    const currentUser = useSelector(state => state.currentUser)

    const { message } = props
    return (
        message ?
            <div className="message">
                {message.userID === currentUser.userID ?
                    <span className="nickname" style={{color: `${message.themeColor}`}}> Me :</span> :
                    <span className="nickname" style={{color: `${message.themeColor}`}}>{message.nickname} :</span>
                }
                <span className="contant"> {message.content}</span>
                <span className="nickname" style={{color: `green`}}>-{message.messageStatus}- </span>
            </div> : <></>
    )
}