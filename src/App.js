import React from 'react'

import API, {graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import {createMessage} from './graphql/mutations'

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import config from './aws-exports'
// other imports
import {useEffect, useReducer} from 'react' // using hooks
import {listMessages} from './graphql/queries'
// other imports
import {onCreateMessage} from './graphql/subscriptions'

Amplify.configure(awsconfig);

const initialState = {messages: []};
const reducer = (state, action) => {
    switch (action.type) {
        case 'QUERY':
            return {...state, messages: action.messages}
        case 'SUBSCRIPTION':
            return {...state, messages: [...state.messages, action.message]}
        default:
            return state
    }
}

API.configure(config)             // Configure Amplify
PubSub.configure(config);

async function createNewMessage() {
    const message = {owner: "Owner", content: "Content"}
    await API.graphql(graphqlOperation(createMessage, {input: message}))
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getData()
        const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: (eventData) => {
                const message = eventData.value.data.onCreateMessage;
                dispatch({type: 'SUBSCRIPTION', message})
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    async function getData() {
        const messageData = await API.graphql(graphqlOperation(listMessages))
        dispatch({type: 'QUERY', messages: messageData.data.listMessages.items});
    }

    return (
        <div>
            <div className="App">
                <button onClick={createNewMessage}>Add Message</button>
            </div>
            <div>{state.messages.map((message, i) => <p key={message.id}>{message.owner} : {message.content}</p>)}</div>
        </div>
    );
}

export default App;