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
const appImage = {
    'appImage-container': {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'appImage-logo': {
        width: 150,
        height: 200
    },
    'appImage-appName': {
        fontSize: 40,
        fontFamily: 'Roboto'
    }
}
const login = {
    'login-container': {
        flexDirection: 'column',
        flex: 1,        
        justifyContent: 'center'
    },
    'login-btn-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        marginHorizontal: 50,
        elevation: 3
    },
    'login-glogo': {
        width: 50,
        height: 45,
        borderRadius: 0
    },
    'login-gtext': {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: 'gray',
        paddingTop: 7,
        paddingLeft: 20
    }
}
export const styles = StyleSheet.create({
    ...appHeader,
    ...statusBar,
    ...appImage,
    ...login
});
