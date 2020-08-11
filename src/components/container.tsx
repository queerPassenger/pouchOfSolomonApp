import React, { Component, useState, useContext, Fragment, ReactElement } from 'react';
import UserContext from '../context/userContext';
import AppContext from '../context/appContext';
import Application from './application';
import Login from './login';
import Loader from './loader';
import { GoogleResponse } from '../utils/google';
import Settings from './settings';

type modeType = ('login' | 'application' | 'settings');
interface ContainerProps {
    mode: modeType
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
            case 'settings':
                return Settings;
            default:
                return Login;

        }
    }
    const navigate = (mode: modeType) => {
        updateMode(mode);
    }
    const render = () => {
        const Component = getComponent();
        return (
            <Fragment>
                <Component
                    context={context}
                    showLoader={context.showLoader}
                    handleLogin={handleLogin}
                    navigateToSettings={() => navigate('settings')}
                    navigateToApplications={() => navigate('application')}
                />
                {context.loader > 0 && <Loader />}
            </Fragment>

        )
    }
    return render();
}
Container.displayName = 'container';
export default Container;