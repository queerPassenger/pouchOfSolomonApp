import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../style';
import { APP_NAME } from '../constants/label';

export default function AppImage(){
    const componentName = 'appImage';
    return(
        <View style={styles[`${componentName}-container`]}>
            <Image source = {require('../assets/images/crowncrop.png')} style={styles[`${componentName}-logo`]}/>
        </View>        
    )
}