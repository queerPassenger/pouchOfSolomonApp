import React, { ReactElement, useEffect, useContext } from 'react';
import { View, Text, Image, BackHandler, ScrollView, TouchableOpacity } from 'react-native';
import StatusBar from './statusBar';
import { styles } from '../style';
import UserContext from '../context/userContext';
import { showAlert } from '../utils/alert';
import { ALERT_TITLE, ALERT_MSG, ALERT_BUTTON } from '../constants';

interface SettingsProps {
    navigateToApplications: () => void,
    onLogout: () => void
}
const Settings: React.FC<SettingsProps> = (props): ReactElement => {
    const context = {
        ...useContext(UserContext)
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                props.navigateToApplications();
                return true;
            }
        );
        return () => backHandler.remove();
    }, []);
    const confirmLogout = (): void => {
        showAlert(
            ALERT_TITLE.WARNING,
            ALERT_MSG.CONFIRMATION_LOGOUT,
            [
                {
                    text: ALERT_BUTTON.NO
                },
                {
                    text: ALERT_BUTTON.YES,
                    onPress: props.onLogout
                }
            ]
        );
    }
    return (
        <View style={styles[`${Settings.displayName}-container`]}>
            <StatusBar />
            <View style={styles[`${Settings.displayName}-img-container`]}>
                <Image
                    style={styles[`${Settings.displayName}-img`]}
                    source={{
                        uri: context.googleUserInfo.user && context.googleUserInfo.user.photoUrl
                    }}
                />
            </View>
            <ScrollView>
                <View style={styles[`${Settings.displayName}-userDetails-wrapper`]}>
                    <View style={styles[`${Settings.displayName}-userDetails-super-container`]}>
                        <View style={styles[`${Settings.displayName}-userDetails-container`]}>
                            <Text style={styles[`${Settings.displayName}-userDetails-text`]}>
                                {context.googleUserInfo.user.name}
                            </Text>
                            <Text style={styles[`${Settings.displayName}-userDetails-label`]}>
                                NAME
                            </Text>
                        </View>
                    </View>
                    <View style={styles[`${Settings.displayName}-userDetails-super-container`]}>
                        <View style={styles[`${Settings.displayName}-userDetails-container`]}>
                            <Text style={styles[`${Settings.displayName}-userDetails-text`]}>
                                {context.googleUserInfo.user.email}
                            </Text>
                            <Text style={styles[`${Settings.displayName}-userDetails-label`]}>
                                EMAIL
                                </Text>
                        </View>
                    </View>
                </View>
                <View style={styles[`${Settings.displayName}-userActions-wrapper`]}>
                    <TouchableOpacity style={styles[`${Settings.displayName}-userAction`]}>
                        <Image source={require('../../assets/images/helpIcon.png')} style={styles[`${Settings.displayName}-userAction-img`]} />
                        <Text style={styles[`${Settings.displayName}-userAction-text`]}>
                            Contact us
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles[`${Settings.displayName}-userAction`]}>                    
                        <Image source={require('../../assets/images/aboutIcon.png')} style={styles[`${Settings.displayName}-userAction-img`]} />
                        <Text style={styles[`${Settings.displayName}-userAction-text`]}>
                            About
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles[`${Settings.displayName}-userAction`]} onPress={confirmLogout}>
                        <Image source={require('../../assets/images/exitIcon.png')} style={styles[`${Settings.displayName}-userAction-img`]} />
                        <Text style={styles[`${Settings.displayName}-userAction-text`]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
Settings.displayName = 'settings';
export default Settings;