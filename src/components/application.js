import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';
import AppTab from './appTab';
import AppTabView from './appTabView';
import { styles } from '../style';
import { request } from '../utils/request';
import { apiUrl, endpoint } from '../constants/urls';
import { AppContext } from '../context/appContext';
import { UserContext } from '../context/userContext';

export default function Application(props) {
    const componentName = 'application';
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    useEffect(() => {
        getTransactionTypeList();
       // getAmountTypeList();
    }, []);
    const getTransactionTypeList = async () => {
        try {
            let response = await request.get(apiUrl + endpoint.getTransactionTypeList.replace('{id}', context.userId), {})
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    console.log('TransactionTypeList', response.data.data);
                }
                return response;
            }
        }
        catch (err) {
            console.warn('Error getTransactionTypeList', err)
            return false
        }
    }
    return (
        <View style={styles[`${componentName}-container`]}>
            <StatusBar />
            <AppHeader />
            <AppTab />
            <AppTabView />
        </View>
    )
}