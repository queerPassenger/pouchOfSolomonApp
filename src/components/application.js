import React from 'react';
import { View } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';
import AppTab from './appTab';
import AppTabView from './appTabView';
import { styles } from '../style';

export default function Application(props) {
    const componentName = 'application';
    return (
        <View style={styles[`${componentName}-container`]}>
            <StatusBar />
            <AppHeader />
            <AppTab />
            <AppTabView />
        </View>
    )
}