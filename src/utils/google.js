import * as Google from 'expo-google-app-auth';
import { androidClientId } from '../../credentials';
import { request } from '../utils/request';
import { apiUrl, endpoint } from '../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
    androidClientId: androidClientId,
    scopes: ['profile', 'email'],
};

const googleLogin = async () => {
    try {
        const result = await Google.logInAsync(config);
        if (result.type === 'success' && result.user) {
            return {
                status: true,
                result: result
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
const getUserIdFromLogin = async (body) => {
    try {
        let response = await request.post(apiUrl + endpoint.getUserIdFromLoginId, {}, body)
        if (response.status && response.type === 'json' && response.data) {
            return response.data.msg;
        }
    }
    catch (err) {
        console.warn('Error getUserIdFromLogin', err)
        return false
    }
}
export const login = async () => {
    try {
        const response = await googleLogin();
        if (response.status) {
            const userId = await getUserIdFromLogin(response.result.user);
            if (userId) {
                AsyncStorage.setItem('app-userId', userId);
                AsyncStorage.setItem('google-userInfo', JSON.stringify(response.result));
                return {
                    status: true,
                    userId,
                    googleUserInfo: response.result
                };
            }
            else
                return {
                    status: false
                }
        }
    }
    catch (err) {
        console.warn('Error login', err)
        return {
            status: false
        };
    }
}