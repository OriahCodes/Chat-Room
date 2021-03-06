import { db } from '../config';

export const APP_LOADING = 'APP_LOADING'
export const appIsLoadingAction = () => {
    return {
        type: APP_LOADING,
    }
}

export const APP_NOT_LOADING = 'APP_NOT_LOADING'
export const appNotLoadingAction = () => {
    return {
        type: APP_NOT_LOADING,
    }
}

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
        dispatch(appNotLoadingAction())
    }
}

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

function addMessageToDB(messageInfo) {
    return db.doc(`messages/${messageInfo.messageID}`).set({
        content: messageInfo.content,
        timestamp: messageInfo.timestamp,//firebase.firestore.FieldValue.serverTimestamp(),
        userID: messageInfo.userID,
        nickname: messageInfo.nickname,
        themeColor: messageInfo.themeColor,
        messageStatus: 'sent',
        messageID: messageInfo.messageID
    })
}

export const sendMessagesAction = (messageInfo) => {
    return (dispatch) => {
        dispatch(addMessageAction(messageInfo))
        addMessageToDB(messageInfo)
            .then(() => {
                console.log("message " + messageInfo.messageID + " was sent successfully!")
                dispatch(sendMessageSuccess(messageInfo.messageID))
            })
            // .catch((error) => {
            //     console.log(error)
            //     dispatch(sendMessageFailure(messageInfo.messageID))
            // })
    }
}

export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS'
export const deleteMessageSuccess = (messageID) => {
    return {
        type: DELETE_MESSAGE_SUCCESS,
        payload: {
            messageID
        }
    }
}

export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE'
export const deleteMessageFailure = (messageID) => {
    return {
        type: DELETE_MESSAGE_FAILURE,
        payload: {
            messageID
        }
    }
}

function deleteMessageContentFromDB(messageID) { //change message content and status to deleted
    return db.doc(`messages/${messageID}`).update({
        content: "Message deleted",
        messageStatus: 'deleted',
    })
}

export const deleteMessageAction = (messageInfo) => {
    messageInfo.content = "Message deleted"
    messageInfo.messageStatus = 'deleting'
    return (dispatch) => {
        dispatch(updateMessageAction(messageInfo))
        deleteMessageContentFromDB(messageInfo.messageID)
        .then(() => {
            console.log("message " + messageInfo.messageID + " was successfully deleted!")
            dispatch(deleteMessageSuccess(messageInfo.messageID))
        })
        // .catch((error) => {
        //     console.log(error)
        //     dispatch(deleteMessageFailure(messageInfo.messageID))
        // })
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

export const USER_IS_OFFLINE = 'USER_IS_OFFLINE'
export const userIsOfflineAction = () => {
    return {
        type: USER_IS_OFFLINE,
    }
}





