import { combineReducers } from 'redux'
import db from '../config';
import {
    SET_CURRENT_USER,
    SET_USER_ID,
    LOGIN,
    LOGIN_ATTEMPT,
    LOGOUT,
    ADD_MESSAGE,
    SEND_MESSAGE_SUCCESS as SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE as SEND_MESSAGE_FAILURE,
    LOAD_MESSAGE,
    UPDATE_MESSAGE,
    SET_JUST_MOUNTED,
} from '../actions'

function currentUser(state = {}, { type, payload }) {
    switch (type) {
        case SET_CURRENT_USER:
            let newState = state
            Object.keys(payload).forEach(key => {
                newState[key] = payload[key]
            })
            return newState
        // case SET_USER_ID:
        //     let newState = state
        //     newState.userID = payload.userID
        //     return newState
        case LOGOUT:
            return {}
        default:
            return state
    }
}

function isLoggedIn(state = false, { type, payload }) {
    switch (type) {
        case LOGIN:
            return true
        case LOGOUT:
            return false
        default:
            return state
    }
}

function loginAttempt(state = false, { type, payload }) {
    switch (type) {
        case LOGIN_ATTEMPT:
            return true
        case LOGOUT:
            return false
        default:
            return state
    }
}

function messages(state = [], { type, payload }) {
    switch (type) {
        case ADD_MESSAGE:
            return state.concat([payload.messageInfo])
        case LOAD_MESSAGE:
            return state.concat([payload.messageInfo])
        case UPDATE_MESSAGE:
            let newState = [...state]
            newState.map(message => {
                if (message.messageID === payload.messageInfo.messageID) {
                    return payload.messageInfo
                }
            })
            return newState
        case LOGOUT:
            return []
        default:
            return state
    }
}

function beingSent(state = [], { type, payload }) {
    switch (type) {
        case ADD_MESSAGE:
            return state.concat([payload.messageInfo.messageID])
        case SEND_MESSAGE_SUCCESS:
        case SEND_MESSAGE_FAILURE:
            let newState = state.filter(mID => mID !== payload.messageID)
            return newState
        default:
            return state
    }
}

function displayError(state = false, { type, payload }) {
    switch (type) {
        case SEND_MESSAGE_FAILURE:
            return 'There was a propblem sending the message'
        default:
            return state
    }
}

function justMounted(state = true, { type, payload }) {
    switch (type) {
        case SET_JUST_MOUNTED:
            return payload
        default:
            return state
    }
}

const allReducers = combineReducers({
    currentUser,
    loginAttempt,
    isLoggedIn,
    messages,
    beingSent,
    displayError,
    justMounted
})

export default allReducers