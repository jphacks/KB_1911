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

Amplify.configure(awsconfig);

API.configure(config);             // Configure Amplify
PubSub.configure(config);

class App extends Component {
    componentDidMount() {
        UserStore.init();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/room/:roomId' component={Chat}/>
                    <Route path='/' component={Rooms}/>
                </Switch>
            </Router>
        );
    }
}

export default withAuthenticator(App);
