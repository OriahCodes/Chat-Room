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
                <Spinner3/> : null
            }
        </div>
    )
}