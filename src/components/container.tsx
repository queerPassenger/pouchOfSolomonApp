import React, { Component, useState, useContext, Fragment, ReactElement } from 'react';
import UserContext from '../context/userContext';
import AppContext from '../context/appContext';
import Application from './application';
import Login from './login';
import Loader from './loader';
import { GoogleResponse } from '../utils/google';

interface ContainerProps {
    mode: ('login' | 'application')
}
const Container: React.FC<ContainerProps> = (props): ReactElement  => {
    const [mode, updateMode] = useState(props.mode);
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    const handleLogin = (status: string, userId: string | null, googleUserInfo: GoogleResponse | null): void => {
        if (status && userId) {
            context.updateUserId(userId);
            context.updateGoogleUserInfo(googleUserInfo);
            updateMode('application');
            context.hideLoader();
        }
        else {
            updateMode('login');
        }
    }
    const getComponent = (): React.FC<any> => {
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
Container.displayName = 'container';
export default Container;