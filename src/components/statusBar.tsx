import React, { Component, ReactElement } from 'react'
import {
    View, StatusBar
} from 'react-native';
import { APP_DEFAULT_COLORS } from '../constants';

const StatusBarComponent: React.FC = (): ReactElement => {
    return (
        <View >
            <StatusBar
                backgroundColor={APP_DEFAULT_COLORS.APP_COLOR}
                barStyle="dark-content"
                hidden={false}
                translucent={false}
            />
        </View>
    )
}
StatusBarComponent.displayName = 'statusBarComponent';
export default StatusBarComponent;