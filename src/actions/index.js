import { db } from '../config';
import firebase from 'firebase'

export const LOGIN = 'LOGIN'
export const loginAction = () => {
    return {
        type: LOGIN,
    }
}

export const LOGOUT = 'LOGOUT'
export const logoutAction = (userInfo) => {
    return {
        type: LOGOUT,
    }
}

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const loginAttemptAction = () => {
    return {
        type: LOGIN_ATTEMPT,
    }
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUserAction = (userInfo) => {
    return {
        type: SET_CURRENT_USER,
        payload: userInfo
    }
}

export const setCurrentUserAndLoginAction = (userInfo) => {
    return (dispatch) => {
        dispatch(setCurrentUserAction(userInfo))
        dispatch(loginAction())
    }
}

export const SET_USER_ID = 'SET_USER_ID'
export const setUserIDAction = (userID) => {
    return {
        type: SET_USER_ID,
        payload: {
            userID
        }
    }
}


export const loginWithUserIDAction = (userID) => {
    return (dispatch) => {
        dispatch(setUserIDAction(userID))
        dispatch(loginAction())
    }
}

// export const setCurrentUserAndLoginAction = (userInfo) => {
//     debugger
//     return (dispatch) => {
//         dispatch(setCurrentUserAction(userInfo))
//         dispatch(loginAction())
//     }
// }

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const addMessageAction = (messageInfo) => {
    return {
        type: ADD_MESSAGE,
        payload: {
            messageInfo
        }
    }
}

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const sendMessageSuccess = (messageID) => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        payload: {
            messageID
        }
    }
}

export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE'
export const sendMessageFailure = (messageID) => {
    return {
        type: SEND_MESSAGE_FAILURE,
        payload: {
            messageID
        }
    }
}

export const sendMessagesAction = (messageInfo) => {
    return (dispatch) => {
        dispatch(addMessageAction(messageInfo))
        db.doc(`messages/${messageInfo.messageID}`).set({
            content: messageInfo.content,
            timestamp: messageInfo.timestamp,//firebase.firestore.FieldValue.serverTimestamp(),
            userID: messageInfo.userID,
            nickname: messageInfo.nickname,
            themeColor: messageInfo.themeColor,
            messageStatus: 'sent',
            messageID: messageInfo.messageID
        })
            .then(() => {
                console.log("message " + messageInfo.messageID + " was sent successfully!")
                dispatch(sendMessageSuccess(messageInfo.messageID))
                messageInfo.messageStatus = 'sent'
                dispatch(updateMessageAction(messageInfo))
            })
            .catch((error) => {
                console.log(error)
                dispatch(sendMessageFailure(messageInfo.messageID))
            })
    }
}

export const LOAD_MESSAGE = 'LOAD_MESSAGE'
export const loadMessageAction = (messageInfo) => {
    return {
        type: LOAD_MESSAGE,
        payload: {
            messageInfo
        }
    }
}

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const updateMessageAction = (messageInfo) => {
    return {
        type: UPDATE_MESSAGE,
        payload: {
            messageInfo,
        }
    }
}

export const SET_JUST_MOUNTED = 'SET_JUST_MOUNTED'
export const setJustMountedAction = (boolean) => {
    return {
        type: SET_JUST_MOUNTED,
        payload: boolean,
    }
}



