import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../actions/actions'
import './loadingStatus.css'
//components
import Spinner3 from '../../spinners/spinner3/Spinner3'

export default function LoadingStatus() {
    const beingSent = useSelector(state => state.beingSent)
    const beingDeleted = useSelector(state => state.beingDeleted)

    const dispatch = useDispatch()

    return (
        <div id="loading-status-container">
            <div className="loading-status">
                {beingSent.length > 0 ?
                    <div >Sending...({beingSent.length})</div> :
                    null
                }
                {beingDeleted.length > 0 ?
                    <div>Deleting...({beingDeleted.length})</div> :
                    null
                }
            </div>
            {beingDeleted.length > 0 || beingSent.length > 0 ?
                <Spinner3 /> : null
            }
        </div>
    )
}