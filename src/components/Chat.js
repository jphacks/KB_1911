import React from 'react'
import API, {graphqlOperation} from '@aws-amplify/api'
import {createMessage} from '../graphql/mutations'
import {useEffect, useReducer} from 'react' // using hooks
import {listMessages} from '../graphql/queries'
import {onCreateMessage} from '../graphql/subscriptions'
import UserStore from "../UserStore";
import {FormControl, Row, Container, Col, ListGroup, InputGroup} from 'react-bootstrap'

const initialState = {messages: []};
const reducer = (state, action) => {
    switch (action.type) {
        case 'QUERY':
            return {...state, messages: action.messages};
        case 'SUBSCRIPTION':
            return {...state, messages: [...state.messages, action.message]};
        default:
            return state
    }
};

const inputStyle = {
    bottom: 0,
    position: 'fixed',

}

async function createNewMessage() {
    console.log(UserStore.username);
    const message = {user: UserStore.username, content: "Content"};
    await API.graphql(graphqlOperation(createMessage, {input: message}))
}

function Rooms() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getData();
        const subscription = API.graphql(graphqlOperation(onCreateMessage, {user: UserStore.username})).subscribe({
            next: (eventData) => {
                const message = eventData.value.data.onCreateMessage;
                dispatch({type: 'SUBSCRIPTION', message})
            }
        });
        return () => subscription.unsubscribe()
    }, []);

    async function getData() {
        const messageData = await API.graphql(graphqlOperation(listMessages));
        dispatch({type: 'QUERY', messages: messageData.data.listMessages.items});
    }

    return (
        <div>
            <Container className="scrollbar">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <ListGroup style={{width: '50rem'}} className="mt-4">
                            {state.messages.map(
                                (message, i) =>
                                    <ListGroup.Item key={message.id}>
                                        <p>@{message.user}</p>
                                        {message.content}
                                    </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
                <InputGroup style={inputStyle} className="mb-3">
                    <FormControl placeholder="message"/>
                </InputGroup>
            </Container>
        </div>
        // <div>
        //     <div className="App">
        //         <button onClick={createNewMessage}>Add Message</button>
        //     </div>
        //     <div>{state.messages.map((message, i) => <p key={message.id}>{message.user} : {message.content}</p>)}</div>
        //     <div>{state.messages.map((message, i) => console.log(message))}</div>
        // </div>
    );
}

export default Rooms;
