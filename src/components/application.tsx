import React, { ReactElement } from 'react';
import { View } from 'react-native'
import StatusBar from './statusBar';
import AppHeader from './appHeader';
import AppTab from './appTab';
import AppTabView from './appTabView';
import { styles } from '../style';

interface ApplicationProps {
    navigateToSettings: () => void
}
const Application: React.FC<ApplicationProps> = (props): ReactElement => {
    return (
        <View style={styles[`${Application.displayName}-container`]}>
            <StatusBar />
            <AppHeader navigateToSettings={props.navigateToSettings} />
            <AppTab />
            <AppTabView />
        </View>
    )
}
Application.displayName = 'application';
export default Application;