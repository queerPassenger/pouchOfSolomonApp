import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import Application from './application';
import Login from './login';

export default class Container extends Component {
    static contextType = UserContext;
    handleLogin = (status, userId, googleUserInfo) => {
        if (status) {
            this.context.updateUserId(userId);
            this.context.updateGoogleUserInfo(googleUserInfo);
        }
    }
    render() {
        if (this.context.userId !== '')
            return <Application
            />
        else
            return <Login
                handleLogin={this.handleLogin}
            />
    }
}