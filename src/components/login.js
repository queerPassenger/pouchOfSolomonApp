import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StatusBar from './statusBar';

export default class Login extends Component {
    render() {
        return(
            <View>
                <StatusBar />
                <Text>
                    Login Page
                </Text>
            </View>
        )
    }
}


