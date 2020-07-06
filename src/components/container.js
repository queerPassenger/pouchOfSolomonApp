import React, { Component, useState } from 'react';
import { UserContext } from '../context/userContext';
import Application from './application';
import Login from './login';
import Loader from './loader';

export default function Container(props) {
    const [mode, updateMode] = useState('login');
    const handleLogin = (context, status, userId, googleUserInfo) => {
        if (status) {
            context.updateUserId(userId);
            context.updateGoogleUserInfo(googleUserInfo);
            updateMode('application');
        }
        else {
            updateMode('login');
        }
    }
    const updateLoader = (flag, mode) => {
        updateMode(flag? 'loader': mode);
    }
    const getComponent = () => {
        switch (mode) {
            case 'login':
                return Login;
            case 'application':
                return Application;
            case 'loader':
                return Loader;
            default:
                return Login;

        }
    }
    const Component = getComponent();
    return (
        <UserContext.Consumer>
            {userContext => (
                <Component
                    context={userContext}
                    updateLoader={updateLoader}
                    handleLogin={handleLogin}
                />
            )}
        </UserContext.Consumer>
    )
}