import React, { ReactElement } from 'react';
import { View } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';
import AppTab from './appTab';
import AppTabView from './appTabView';
import { styles } from '../style';

const Application: React.FC = (): ReactElement => {
    return(
        <View style={styles[`${Application.displayName}-container`]}>
            <StatusBar />
            <AppHeader />
            <AppTab />
            <AppTabView />
        </View>
    )
}
Application.displayName = 'application';
export default Application;