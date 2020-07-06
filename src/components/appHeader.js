import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { APP_NAME } from '../constants/label';
import { styles } from '../style';

export default class AppHeader extends Component{
    componentName = 'appHeader';
    render(){
        return(
            <View style={styles[`${this.componentName}-container`]}>
                <Text style={styles[`${this.componentName}-appName`]}>
                    {APP_NAME}
                </Text>
            </View>
        )
    }
}