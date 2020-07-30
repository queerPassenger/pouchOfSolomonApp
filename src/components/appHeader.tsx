import React, { ReactElement, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { APP_LABELS } from '../constants';
import { styles } from '../style';
import UserContext from '../context/userContext';

const AppHeader: React.FC = (): ReactElement => {
    const context = {
        ...useContext(UserContext),
    }
    return (
        <View style={styles[`${AppHeader.displayName}-container`]}>
            <Text style={styles[`${AppHeader.displayName}-appName`]}>
                {APP_LABELS.APP_NAME}
            </Text>
            <Image
                style={styles[`${AppHeader.displayName}-userImg`]}
                source={{
                uri: context.googleUserInfo.user && context.googleUserInfo.user.photoUrl
                }}
            />                
        </View>
    )
}
AppHeader.displayName = 'appHeader';
export default AppHeader;