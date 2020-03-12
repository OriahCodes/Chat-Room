import { combineReducers } from 'redux'
import db from '../config';
import {
    APP_NOT_LOADING,
    APP_LOADING,
    SET_CURRENT_USER,
    LOGIN,
    LOGIN_ATTEMPT,
    LOGOUT,
    ADD_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE,
    LOAD_MESSAGE,
    UPDATE_MESSAGE,
} from '../actions/actions'

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

function messages(state = new Map(), { type, payload }) {
    switch (type) {
        case ADD_MESSAGE:
        case LOAD_MESSAGE:
        case UPDATE_MESSAGE:
            let newState = new Map(state)
            newState.set(payload.messageInfo.messageID, payload.messageInfo)
            return newState
        case LOGOUT:
            return new Map()
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

function beingDeleted(state = [], { type, payload }) {
    switch (type) {
        case UPDATE_MESSAGE:
            return state.concat([payload.messageInfo.messageID])
        case DELETE_MESSAGE_SUCCESS:
        case DELETE_MESSAGE_FAILURE:
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

function isAppLoading(state = true, { type, payload }) {
    switch (type) {
        case APP_LOADING:
            return true
        case APP_NOT_LOADING:
            return false
        default:
            return state
    }
}


const allReducers = combineReducers({
    isAppLoading,
    currentUser,
    loginAttempt,
    isLoggedIn,
    messages,
    beingSent,
    displayError,
    beingDeleted
})

export default allReducers