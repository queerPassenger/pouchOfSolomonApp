import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { styles, common } from '../style';

export default function Loader(props){
    const componentName = 'loader';
    return(
        <View style={styles[`${componentName}-container`]}>
            <ActivityIndicator size='large' color={'blue'}/>
        </View>
    )
}