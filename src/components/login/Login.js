import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUserAction } from '../../actions/actions'
import './login.css'

const themeColors = ["#F27781", "#18298C", "#04BF8A", "#F2CF1D", "#F29F05"]
const messagesList = [
    "Please submit a username",
    "Put in an actuall name, will ya",
    "Please choose a theme color to make stuff neat"
]

export default function Login(props) {
    const [themeColor, setThemeColor] = useState("")
    const [nickname, setNickname] = useState("")
    const [errorMessages, setErrorMessages] = useState([])

    const dispatch = useDispatch()
    const setCurrentUser = userInfo => dispatch(setCurrentUserAction(userInfo))

    function onLoginAttempt() {
        const testValidity = validateInput()
        if (testValidity === true) {
            setCurrentUser({
                nickname,
                themeColor,
            })
            props.onLoginAttempt(nickname,themeColor)

            setThemeColor("")
            setNickname("")
            setErrorMessages([])
        }
        else {
            setErrorMessages(testValidity)
        }
    }

    function validateInput() {
        const legitNickname = nickname.length >= 2 ? true : false
        const legitTheme = themeColor !== "" ? true : false

        if (legitNickname && legitTheme) {
            return true
        }
        else {
            const messages = []
            if (!legitTheme) { messages.push(2) }
            if (!legitNickname) {
                if (nickname.length === 0) { messages.push(0) }
                else { messages.push(1) }
            }
            return messages
        }
    }

    function handleNickname(event) { setNickname(event.target.value) }
    function handleTheme(event) { setThemeColor(event.target.value) }

    return (
        <div className="login-container">

            <h1> Welcome to ORCHAT!</h1>

            <div>Submit your nickname:</div>
            <div><input type="text" onChange={handleNickname} value={nickname}></input></div>

            <div>Choose theme:</div>
            <div className="choose-theme">
                {themeColors.map(theme => {
                    return (
                        <div key={theme}>
                            <input type="radio" name="theme-choice" value={theme} onChange={handleTheme} />
                            <span className="theme-color" style={{ backgroundColor: `${theme}` }}></span>
                        </div>
                    )
                })}
            </div>

            <button onClick={onLoginAttempt}> Join Chat</button>
            {errorMessages.map(messageInd => {
                return (
                    <div>{messagesList[messageInd]}</div>
                )
            })}
        </div>
    )
}