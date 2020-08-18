import React, { useState, ReactElement } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Asset } from 'expo-asset';
import logger from './utils/logger';
import AppImage from './components/appImage';
import GlobalContext from './context';
import Container from './components/container';
import { AppLoading } from 'expo';
import { ImagePropTypes } from 'react-native';

const cacheResourcesAsync = async (): Promise<void> => {
    const images: Array<any>  = [
        require('../assets/images/' + 'pos-splash.png'),
        require('../assets/images/' + 'googleLogo.png'),
        require('../assets/images/' + 'filter.png'),
        require('../assets/images/' + 'exitIcon.png'),
        require('../assets/images/' + 'helpIcon.png'),
        require('../assets/images/' + 'aboutIcon.png'),
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
    const onLogout = () => {
        updateMode('appImage');
        flushAsyncStoredItems(['app-userId', 'google-userInfo'], () => {
            updateUserId('');
            updateGoogleUserInfo({});
            updateMode('app');
        });
    }
    const flushAsyncStoredItems = async(keys: Array<string>, cb: () => void) => {
        AsyncStorage.multiRemove(keys, () => {
            cb && cb();
        });
    }
    if (mode === 'appLoading')
        return <AppLoading
            startAsync={cacheResourcesAsync}
            onFinish={assetsLoaded}
            onError={(e) => logger.warn(`AppLoading failed ${e}`)}
        />
    else if (mode === 'appImage')
        return <AppImage />
    else if(mode === 'app')
        return (
            <GlobalContext 
                userId={userId} 
                googleUserInfo={googleUserInfo}
            >
                <Container 
                    onLogout={onLogout}
                />
            </GlobalContext>
        )
    else
        return <></>
}
export default Index;