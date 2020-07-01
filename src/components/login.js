import React from 'react';
import { View, Button, StatusBar } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { androidClientId } from '../../credentials';
import { request } from '../utils/request';
import { apiUrl, endpoint } from '../constants/urls';

const googleLogin = async () => {
    try {
        const result = await Google.logInAsync({
            androidClientId: androidClientId,
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success' && result.user) {
            return {
                status: true,
                result: result.user
            }
        }
        else {
            return {
                status: false,
                error: 'cancelled'
            }
        }
    } catch (e) {
        return {
            status: false,
            error: e
        }
    }
}
const getUserIdFromLoginId = async (body) => {
    try{
        let response = await request.post(apiUrl + endpoint.getUserIdFromLoginId, {}, body)
        if(response.status){
            console.log('End Response', response);
        }
    }
    
}
export default function Login(props) {
    const onLoginPress = () => {
        googleLogin().then(resp => {
            if (resp.status) {
                getUserIdFromLoginId(resp.result);
                return;
                props.setIsAuthenticated(resp.status);
                props.updateUserInfo(resp.result);         
            }
                
        });
    }
    return (
        <View>
            <StatusBar />
            <Button title="Login using Google" onPress={onLoginPress} />
        </View>
    )
}
