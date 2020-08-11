import React, { ReactElement, useEffect, useContext } from 'react';
import { View, Text, Image, BackHandler, ScrollView } from 'react-native';
import StatusBar from './statusBar';
import { styles } from '../style';
import UserContext from '../context/userContext';

interface SettingsProps {
    navigateToApplications: () => void
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
                    <View style={styles[`${Settings.displayName}-userAction`]}>
                        <Text> LOGOUT </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
Settings.displayName = 'settings';
export default Settings;