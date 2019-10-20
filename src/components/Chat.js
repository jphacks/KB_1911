import React, {useState} from 'react'
import API, {graphqlOperation} from '@aws-amplify/api'
import {createMessage} from '../graphql/mutations'
import {useEffect, useReducer} from 'react' // using hooks
import {listMessages} from '../graphql/queries'
import {onCreateMessage} from '../graphql/subscriptions'
import UserStore from "../UserStore";
import {FormControl, Button, Row, Container, Col, ListGroup, InputGroup} from 'react-bootstrap'

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
    margin: "0 8%",
    width: "50em",
    bottom: 0,
    // left: 10,
    position: "absolute"

}
const containerStyle = {
    height: "80vh",
    overflow: "scroll",
    overflowX: "auto",
}


function Rooms() {

    const [content, setContent] = useState('');
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

    async function createNewMessage() {
        console.log(content);
        const message = {user: UserStore.username, content: content};
        console.log(message)
        await API.graphql(graphqlOperation(createMessage, {input: message}))
    }

    async function getData() {
        const messageData = await API.graphql(graphqlOperation(listMessages));
        dispatch({type: 'QUERY', messages: messageData.data.listMessages.items});
    }

    return (
        <div>
            <Container style={containerStyle} className="scrollbar">
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

                {/*<div style={inputStyle} className="mb-3">*/}
                {/*    <input onChange={event => setContent(event.target.value)}/>*/}
                {/*    <Button onClick={createNewMessage}>Send</Button>*/}
                {/*</div>*/}
            </Container>
            <InputGroup style={inputStyle} className="mb-3">
                <FormControl onChange={event => setContent(event.target.value)}></FormControl>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={createNewMessage}>Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>

    );
}

export default Rooms;
