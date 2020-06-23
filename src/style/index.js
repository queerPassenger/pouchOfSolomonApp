import { StyleSheet } from 'react-native';

export const common = {
    appColorDark: '#88184c',
    appColorLight: '#e4c3d2'
};
const statusBar = {
    'statusBar-container': {
        flex: 1
    }
};
const appHeader = {
    'appHeader-container': {
        backgroundColor: common.appColorDark,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20 
    },
    'appHeader-appName': {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Roboto'
    }
};
export const styles = StyleSheet.create({
    ...appHeader,
    ...statusBar
});
