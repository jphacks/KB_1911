import React, {Component} from 'react'
import {withAuthenticator} from 'aws-amplify-react';
import API from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Rooms from './components/Rooms';
import Chat from './components/Chat';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import config from './aws-exports'
import UserStore from "./UserStore";

import {Navbar, Nav} from "react-bootstrap";

Amplify.configure(awsconfig);

API.configure(config);             // Configure Amplify
PubSub.configure(config);

const nabStyle = {
    backgroundImage: "linear-gradient(to left,#cc2b5e,#753a88)",
    height: "5em",
}
const whiteColor = {
    color: "white",
}

class App extends Component {
    componentDidMount() {
        UserStore.init();
    }

    render() {
        return (
            <div>
                <Navbar expand="lg" style={nabStyle}>
                    <Navbar.Brand href="#home" style={whiteColor}>Open Chat</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/list" style={whiteColor}>List</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <Switch>
                        <Route path='/room/:roomId' component={Chat}/>
                        <Route path='/' component={Rooms}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default withAuthenticator(App);
