import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUserAction } from '../../actions/actions'
import './login.css'

const themeColors = ["#F27781", "#18298C", "#04BF8A", "#F2CF1D", "#F29F05"]
const messagesList = [
    "Please submit a username",
    "Put in an actual name, will ya",
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
            props.onLoginAttempt(nickname, themeColor)

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
        <div id="login-container">

            <div id="login-title-container">
                <i className="far fa-comments"></i>
                <div className="app-title">Messango</div>
                <div className="app-title-description">Online Chat Room Without Registration</div>
            </div>

            <div id="user-info-container">
                <div id="submit-name">
                    <div>Enter your name</div>
                    <input className="input" type="text" onChange={handleNickname} value={nickname} ></input>
                </div>

                <div id="choose-theme">
                    <div>Choose theme color</div>
                    {themeColors.map(theme => {
                        return (
                            <span className="theme-option" key={theme}>
                                <input type="radio" name="theme-choice" value={theme} onChange={handleTheme} />
                                <span className="theme-color" style={{ backgroundColor: `${theme}` }}></span>
                            </span>
                        )
                    })}
                </div>
            </div>


            <div className="button" id="join-chat-button" onClick={onLoginAttempt}> JOIN CHAT</div>

            {errorMessages.map(messageInd => {
                return (
                    <div>{messagesList[messageInd]}</div>
                )
            })}
        </div>
    )
}