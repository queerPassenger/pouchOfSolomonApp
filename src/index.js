import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppImage from './components/appImage';
import GlobalContext from './context';
import Container from './components/container';
import { AppLoading } from 'expo';

const cacheResourcesAsync = async () => {
    const images = [
        require('./assets/images/' + 'crowncrop.png'),
        require('./assets/images/' + 'googleLogo.png'),
        require('./assets/images/' + 'pos-logo-small.png'),
        require('./assets/images/' + 'pos-logo-medium.png'),
        require('./assets/images/' + 'pos-logo-large.png'),
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
    const assetsLoaded = () => {
        updateMode('appImage');
        setTimeout(() => updateMode('app'), 0);
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
            <GlobalContext>
                <Container />
            </GlobalContext>
        )
}