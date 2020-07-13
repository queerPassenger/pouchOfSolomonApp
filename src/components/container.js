import React, { Component, useState, useContext, Fragment } from 'react';
import { UserContext } from '../context/userContext';
import { AppContext } from '../context/appContext';
import Application from './application';
import Login from './login';
import Loader from './loader';

export default function Container(props) {
    const [mode, updateMode] = useState(props.mode);
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    const handleLogin = (status, userId, googleUserInfo) => {
        if (status) {
            context.updateUserId(userId);
            context.updateGoogleUserInfo(googleUserInfo);
            updateMode('application');
            context.hideLoader();
        }
        else {
            updateMode('login');
        }
    }
    const getComponent = () => {
        switch (mode) {
            case 'login':
                return Login;
            case 'application':
                return Application;
            default:
                return Login;

        }
    }
    const render = () => {
        const Component = getComponent();
        return (
            <Fragment>
                <Component
                    context={context}
                    showLoader={context.showLoader}
                    handleLogin={handleLogin}
                />
                {context.loader > 0 && <Loader />}
            </Fragment>

        )
    }
    return render();
}