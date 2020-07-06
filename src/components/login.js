import React from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { login as googleLogin } from '../utils/google';
import { styles } from '../style';

export default function Login(props) {
    const componentName = 'login';
    const onLoginPress = async (type = 'google') => {
        props.updateLoader(true);            
        try {
            switch (type) {
                case 'google':
                    const response = await googleLogin();
                    if (response.status)        
                        props.handleLogin(props.context, response.status, response.userId, response.googleUserInfo);
                    else
                        props.handleLogin(props.context, false, null, null);
                    break;
                default:
                    break;
            }
        }
        catch (err) {
            console.warn('Failure', err);
            props.handleLogin(props.context, false, null, null);
        }

    }
    return (
        <View style={styles[`${componentName}-container`]}>
            <StatusBar />
            <TouchableOpacity onPress={() => onLoginPress('google')} >
                <View style={styles[`${componentName}-btn-container`]}>
                    <Image source={require('../assets/images/googleLogo.png')} style={styles[`${componentName}-glogo`]} />
                    <Text style={styles[`${componentName}-gtext`]}>Sign with Google</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}