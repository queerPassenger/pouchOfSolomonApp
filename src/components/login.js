import React from 'react';
import { View, Button, StatusBar } from 'react-native';
import { login as googleLogin } from '../utils/google';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login(props) {
    const onLoginPress = async (type = 'google') => {
        try{
            switch(type){
                case 'google':
                    if(await googleLogin()){
                        console.log('Success');
                    }
                    else    
                        console.log('failure');
                    break;
                default:
                    break;                
            }
        }
        catch(err){
            console.log('Failure', err);
        }
        
    }
    return (
        <View>
            <StatusBar />
            <Button title="Login using Google" onPress={() => onLoginPress('google')} />
        </View>
    )
}