import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessageAction } from '../../../actions/actions'
import { animateScroll } from "react-scroll";
import './chatBox.css'

//components
import Message from './message/Message'
import { db } from '../../../config';
import Loader2 from '../../spinners/spinner2/Spinner2'

export default function ChatBox() {
    //store
    const messages = useSelector(state => state.messages)
    //actions
    const dispatch = useDispatch()
    const loadMessage = (messageInfo) => dispatch(loadMessageAction(messageInfo))

    useEffect(() => {
        addMessageListener()
    }, [])

    function addMessageListener() {
        db.collection('messages').orderBy('timestamp')
            .onSnapshot({ includeMetadataChanges: true }, snapshot => { //realtime listener
                for (let doc of snapshot.docs) {
                    let messageInfo = doc.data()
                    if (!doc.metadata.fromCache) { //disabling firebase offline capabilities for demonstration purposes
                        if (!messages.has(messageInfo.messageID)) {
                            loadMessage(messageInfo)
                        }
                    }
                }
            })
    }

    useEffect(() => {
        scrollToBottom()
    })

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "chat-box"
        });
    }

    return (
        <div id="chat-box-container">
            <div id="chat-box">
                {messages.size === 0 ?
                    <Loader2/>:
                    [...messages.keys()].map(messageID => <Message key={messageID} message={messages.get(messageID)} />)
                }
            </div>
        </div>
    )
}

