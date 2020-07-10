import { StyleSheet } from 'react-native';

export const common = {
    appColorDark: '#88184c',
    appColorLight: '#ac527c'
};
const application = {
    'application-container': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
}
const appHeader = {
    'appHeader-container': {
        backgroundColor: common.appColorDark,
        paddingVertical: 15,
        paddingLeft: 20
    },
    'appHeader-appName': {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold'
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
const loader = {
    'loader-container': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
const appTab = {
    'appTab-container': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: common.appColorDark,
    },
    'appTab-tab-container': {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 10,
    },
    'appTab-tab-container-selected': {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },

    'appTab-tab-text': {
        fontSize: 14,
        color: 'white'
    },
    'appTab-tab-text-selected': {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
}
export const styles = StyleSheet.create({
    ...application,
    ...appHeader,
    ...appImage,
    ...login,
    ...loader,
    ...appTab
});