import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../actions'
//components

export default function LoadingStatus() {
    const beingSent = useSelector(state => state.beingSent)
    const dispatch = useDispatch()

    return (
        <div className="loading-status">
            {beingSent.length > 0 ?
                <h4>Loading...({beingSent.length})</h4> :
                null
            }
        </div>
    )
}