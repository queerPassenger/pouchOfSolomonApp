import React, { ReactElement, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { APP } from '../constants';
import { styles } from '../style';
import UserContext from '../context/userContext';

interface AppHeaderProps {
    navigateToSettings: () => void
}
const AppHeader: React.FC<AppHeaderProps> = (props): ReactElement => {
    const context = {
        ...useContext(UserContext),
    }
    return (
        <View style={styles[`${AppHeader.displayName}-container`]}>
            <Text style={styles[`${AppHeader.displayName}-appName`]}>
                {APP.APP_NAME}
            </Text>
            <TouchableOpacity onPress={props.navigateToSettings}>
                <Image
                    style={styles[`${AppHeader.displayName}-userImg`]}
                    source={{
                        uri: context.googleUserInfo.user && context.googleUserInfo.user.photoUrl
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
AppHeader.displayName = 'appHeader';
export default AppHeader;