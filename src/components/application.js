import React from 'react';
import { UserContext } from '../context/userContext';
import { View, Text } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';
import AppTab from './appTab';
import AppTabView from './appTabView';

export default function Application(props) {
    return (
        <UserContext.Consumer>
            {userContext => (
                <View>
                    <StatusBar />
                    <AppHeader />
                    {/* <AppTab />
                    <AppTabView /> */}
                </View>
            )}
        </UserContext.Consumer>
    )
}