import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppImage from './components/appImage';
import GlobalContext from './context';
import Container from './components/container';
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';

const cacheResourcesAsync = async () => {
    const images = [
        require('./assets/images/' + 'crowncrop.png'),
        require('./assets/images/' + 'googleLogo.png'),
        require('./assets/images/' + 'pos-logo-small.png'),
        require('./assets/images/' + 'pos-logo-medium.png'),
        require('./assets/images/' + 'pos-logo-large.png'),
        require('./assets/images/' + 'filter.png'),
        require('./assets/images/' + 'add.png'),
        require('./assets/images/' + 'edit.png'),
        require('./assets/images/' + 'vertical-dots.png'),
        require('./assets/images/' + 'clock.png'),
        require('./assets/images/' + 'calendar.png'),
    ];
    const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });
    await Font.loadAsync({
        dancingScript: require('./assets/fonts/DancingScript-VariableFont_wght.ttf'),
    });
    return Promise.all([...cacheImages]);
}
export default function Index() {
    const [mode, updateMode] = useState('appLoading');
    const [userId, updateUserId] = useState('');
    const assetsLoaded = () => {
        updateMode('appImage');
        setTimeout(async () => {
            try{
                let userId = await AsyncStorage.getItem('app-userId');
                updateUserId(userId);            
            }
            catch(err){
                console.log('Failed to load app user details')
            }   
            finally{
                updateMode('app');
            }  
        }, 3000) 
    }
    if (mode === 'appLoading')
        return <AppLoading
            startAsync={cacheResourcesAsync}
            onFinish={assetsLoaded}
            onErrimor={console.warn}
        />
    else if (mode === 'appImage')
        return <AppImage />
    else
        return (
            <GlobalContext userId={userId}>
                <Container mode={userId? 'application': 'login'}/>
            </GlobalContext>
        )
}