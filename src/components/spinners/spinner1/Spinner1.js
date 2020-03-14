import React from 'react';
import { useSelector } from 'react-redux';
import './spinner1.css'

export default function Spinner1() {
    const errorMessage = useSelector(state => state.errorMessage)

    return (
        <div className="loading-app">
            <div className="spinner" id="loading-app-spinner">
                <div className="cube1"></div>
                <div className="cube2"></div>
            </div>
            {errorMessage ? <div id="error-message">{errorMessage}</div> : null}
        </div>

    );
}
