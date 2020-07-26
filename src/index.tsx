import React, { useState, ReactElement } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Asset } from 'expo-asset';
import logger from './utils/logger';
import AppImage from './components/appImage';
import GlobalContext from './context';
import Container from './components/container';
import { AppLoading } from 'expo';

const cacheResourcesAsync = async (): Promise<void> => {
    const images: Array<any>  = [
        require('../assets/images/' + 'crowncrop.png'),
        require('../assets/images/' + 'googleLogo.png'),
        require('../assets/images/' + 'pos-logo-small.png'),
        require('../assets/images/' + 'pos-logo-medium.png'),
        require('../assets/images/' + 'pos-logo-large.png'),
        require('../assets/images/' + 'filter.png'),
        require('../assets/images/' + 'add.png'),
        require('../assets/images/' + 'edit.png'),
        require('../assets/images/' + 'vertical-dots.png'),
        require('../assets/images/' + 'clock.png'),
        require('../assets/images/' + 'calendar.png'),
    ];
    const cacheImages: Array<Promise<void>> = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });
    await Promise.all([...cacheImages]);
}
const Index: React.FC = (): ReactElement => {
    const [mode, updateMode]= useState<string>('appLoading');
    const [userId, updateUserId] = useState<string>('');
    const assetsLoaded = (): void => {
        updateMode('appImage');
        setTimeout(async (): Promise<any> => {
            try{
                let resp = await AsyncStorage.getItem('app-userId');
                updateUserId(resp? resp: '');            
            }
            catch(err){
                logger.info('Failed to load app user details')
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
            onError={(e) => logger.warn(`AppLoading failed ${e}`)}
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
export default Index;