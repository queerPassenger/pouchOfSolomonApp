import React, { Component } from 'react';
import { View, Text } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';

export default class Application extends Component {
    render() {
        return (
            <View>
                <StatusBar />
                <AppHeader />         
            </View>
        )
    }
}


