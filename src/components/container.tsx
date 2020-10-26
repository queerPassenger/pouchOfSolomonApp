import React, { Component, useState, useEffect, useContext, Fragment, ReactElement } from 'react';
import UserContext from '../context/userContext';
import AppContext from '../context/appContext';
import Application from './application';
import Login from './login';
import Loader from './loader';
import { GoogleResponse } from '../utils/google';
import Settings from './settings';
import Toastr from './toastr';

type modeType = ('login' | 'application' | 'settings');
interface ContainerProps {
    onLogout: () => void
}
const Container: React.FC<ContainerProps> = (props): ReactElement  => {
    const [mode, updateMode] = useState('');
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    useEffect(() => {
        context.userId && loadAppContextData();
    }, [context.userId]);

    const handleLogin = (status: string, userId: string | null, googleUserInfo: GoogleResponse | null): void => {
        if (status && userId) {
            context.updateUserId(userId);
            context.updateGoogleUserInfo(googleUserInfo);                      
        }
        else {
            updateMode('login');
        }
    }
    const loadAppContextData = async (): Promise<any> => {
        await context.loadAppContext();
        updateMode('application');  
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
                    hideLoader={context.hideLoader}
                    handleLogin={handleLogin}
                    navigateToSettings={() => navigate('settings')}
                    navigateToApplications={() => navigate('application')}
                    onLogout={props.onLogout}
                />
                {context.loader > 0 && <Loader />}
                <Toastr />
            </Fragment>

        )
    }
    return render();
}
Container.displayName = 'container';
export default Container;