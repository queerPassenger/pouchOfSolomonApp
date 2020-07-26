import * as Google from 'expo-google-app-auth';
import { PASSCODES } from '../../passcodes';
import { request } from '../utils/request';
import { URL, API_PATH } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import logger from './logger';

export interface LoginResponse {
    status: boolean,
    userId?: string,
    googleUserInfo?: GoogleResponse
};
interface GoogleUser {
    id?: string;
    name?: string;
    givenName?: string;
    familyName?: string;
    photoUrl?: string;
    email?: string;
};
export interface GoogleResponse {
    type: "success";
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
    user: GoogleUser;
}
interface GoogleLoginResponse {
    status: boolean,
    error: string,
    data: GoogleResponse | null
};
const config = {
    androidClientId: PASSCODES.ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
};

const googleLogin = async (): Promise<GoogleLoginResponse> => {
    try {
        const result = await Google.logInAsync(config);
        if (result.type === 'success' && result.user) {
            return {
                status: true,
                error: '',
                data: result
            }
        }
        else {
            return {
                status: false,
                error: 'cancelled',
                data: null
            }
        }
    } catch (e) {
        logger.warn('Error googleLogin' + e.toString());
        return {
            status: false,
            error: e.toString(),
            data: null
        }
    }
}
const getUserIdFromLogin = async (body: GoogleUser): Promise<string> => {
    try {
        let response = await request.post(URL.API_URL + API_PATH.GET_USERID_FROM_LOGINID, body, {})
        if (response.status && response.type === 'json' && response.data) {
            return response.data.msg;
        }
        return '';
    }
    catch (err) {
        logger.warn('Error getUserIdFromLogin' + err.toString);
        return '';
    }
}
const login = async (): Promise<LoginResponse> => {
    try {
        const response: GoogleLoginResponse = await googleLogin();
        if (response.status && response.data && response.data.user) {
            const userId = await getUserIdFromLogin(response.data.user);
            if (userId !== '') {
                AsyncStorage.setItem('app-userId', userId);
                AsyncStorage.setItem('google-userInfo', JSON.stringify(response.data));
                return {
                    status: true,
                    userId,
                    googleUserInfo: response.data
                };
            }
        }
        return {
            status: false
        }
    }
    catch (err) {
        logger.warn('Error login' + err.toString());
        return {
            status: false
        };
    }
}
export default login;