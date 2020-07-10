import React, { Component } from 'react'
import {
    View, StatusBar
} from 'react-native';
import { styles, common } from '../style';

export default class StatusBarComponent extends Component {
    render() {
        return (
            <View >
                <StatusBar
                    backgroundColor={common.appColorLight}
                    barStyle="dark-content"
                    hidden={false}
                    translucent={false}
                />
            </View>
        )
    }
}