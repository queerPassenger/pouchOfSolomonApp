import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../style';

export default function AppImage() {
    const componentName = 'appImage';
    return (
        <View style={styles[`${componentName}-container`]}>
            <Image source={require('../assets/images/pos-logo-large.png')} style={styles[`${componentName}-logo`]} />
        </View>
    )
}