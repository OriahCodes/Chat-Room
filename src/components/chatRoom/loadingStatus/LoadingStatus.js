import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../actions/actions'
import './loading.css'

export default function LoadingStatus() {
    const beingSent = useSelector(state => state.beingSent)
    const beingDeleted = useSelector(state => state.beingDeleted)
    const dispatch = useDispatch()

    return (
        <div id="loading-status">
            {beingSent.length > 0 ?
                <h4>Sending...({beingSent.length})</h4> :
                null
            }
            {beingDeleted.length > 0 ?
                <h4>Deleting...({beingDeleted.length})</h4> :
                null
            }
            {beingDeleted.length > 0 || beingSent.length > 0 ?
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div> : null
            }
        </div>
    )
}