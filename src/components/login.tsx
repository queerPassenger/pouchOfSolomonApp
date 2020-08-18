import React, { ReactElement } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import googleLogin, { LoginResponse, GoogleResponse } from '../utils/google';
import { styles } from '../style';
import logger from '../utils/logger';

interface LoginProps {
    showLoader: () => void,
    hideLoader: () => void,
    handleLogin: (status: boolean, userId: string | null, googleUserInfo: GoogleResponse | null) => void
}

export const Login: React.FC<LoginProps> = (props): ReactElement => {
    const onLoginPress = async (type = 'google'): Promise<void> => {
        props.showLoader();
        try {
            switch (type) {
                case 'google':
                    const response: LoginResponse = await googleLogin();
                    if (response.status && response.userId && response.googleUserInfo)
                        props.handleLogin(response.status, response.userId, response.googleUserInfo);
                    else
                        props.handleLogin(false, null, null);
                    break;
                default:
                    break;
            }
        }
        catch (err) {
            logger.warn('Error onLoginPress' + err.toString());
            props.handleLogin(false, null, null);
        }
        finally{
            props.hideLoader();        
        }
    }
    return (
        <View style={styles[`${Login.displayName}-container`]}>
            <StatusBar />
            <TouchableOpacity onPress={() => onLoginPress('google')} >
                <View style={styles[`${Login.displayName}-btn-container`]}>
                    <Image source={require('../../assets/images/googleLogo.png')} style={styles[`${Login.displayName}-glogo`]} />
                    <Text style={styles[`${Login.displayName}-gtext`]}>Sign with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
Login.displayName = 'login';
export default Login;