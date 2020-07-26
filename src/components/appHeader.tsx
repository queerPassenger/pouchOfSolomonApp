import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { APP_LABELS } from '../constants';
import { styles } from '../style';

const AppHeader: React.FC = (): ReactElement => {
    return (
        <View style={styles[`${AppHeader.displayName}-container`]}>
            <Text style={styles[`${AppHeader.displayName}-appName`]}>
                {APP_LABELS.APP_NAME}
            </Text>
        </View>
    )
}
AppHeader.displayName = 'appHeader';
export default AppHeader;