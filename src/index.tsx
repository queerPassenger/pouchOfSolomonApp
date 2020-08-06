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
        require('../assets/images/' + 'pos-splash.png'),
        require('../assets/images/' + 'googleLogo.png'),
        require('../assets/images/' + 'filter.png')
    ];
    const cacheImages: Array<Promise<void>> = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });
    await Promise.all([...cacheImages]);
}
const Index: React.FC = (): ReactElement => {
    const [mode, updateMode]= useState<string>('appLoading');
    const [userId, updateUserId] = useState<string>('');
    const [googleUserInfo, updateGoogleUserInfo] = useState<any>({});
    const assetsLoaded = (): void => {
        updateMode('appImage');
        setTimeout(loadStoredItems, 3000) 
    }
    const loadStoredItems = async (): Promise<void> => {
        try{
            let asyncStoredItems = {
                userId: await AsyncStorage.getItem('app-userId'),
                googleUserInfo: await AsyncStorage.getItem('google-userInfo')
            }
            updateUserId(asyncStoredItems.userId ? asyncStoredItems.userId : '');
            updateGoogleUserInfo(asyncStoredItems.googleUserInfo ? JSON.parse(asyncStoredItems.googleUserInfo): {});
        }
        catch(err){
            logger.info('Failed to load app user details')
        }   
        finally{
            updateMode('app');
        }  
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
            <GlobalContext 
                userId={userId} 
                googleUserInfo={googleUserInfo}
            >
                <Container mode={userId && googleUserInfo.user ? 'application': 'login'}/>
            </GlobalContext>
        )
}
export default Index;