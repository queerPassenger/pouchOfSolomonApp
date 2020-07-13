import { StyleSheet } from 'react-native';

export const common = {
    appColorDark: '#88184c',
    appColorLight: '#ac527c',
    appColorLightest: '#fbe9f1'
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
        // fontFamily: 'Roboto',
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
        borderBottomWidth: 2,
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
const appTabView = {
    'appTabView-container': {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    }
}
const viewPage = {
    'viewPage-container': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    'viewPage-panel-container': {
        height: 100,
    },
    'viewPage-list-container': {
        display: 'flex',
        flexDirection: 'column',
        elevation: 0.5,
        borderColor: '#cecdd2',
    },
    'viewPage-list-item-container': {
        flex: 1,
        flexDirection: 'row',
        //marginVertical: 5,
        padding: 10,
        height: 100,
        borderBottomColor: '#cecdd2',
        borderBottomWidth: 0.25,
        borderStyle: 'solid'
    },
    'viewPage-list-item-sub-container1': {
        flex: 1,
    },
    'viewPage-list-item-sub-container2': {
        display: 'flex',
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 10
    },
    'viewPage-list-item-sub-container3': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    'viewPage-list-item-sub-container2-text1': {
        fontWeight: 'bold',
        fontSize: 16,
        color: common.appColorDark,
    },
    'viewPage-list-item-sub-container2-text2': {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'gray',
    },
    'viewPage-list-item-sub-container2-text3': {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'gray'
    },
    'viewPage-list-item-sub-container2-text4': {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'gray'
    },
    'viewPage-list-item-sub-container3-text1': {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'gray',
        textAlign: 'right',
        fontStyle: 'italic'
    },
    'viewPage-list-item-sub-container3-text2': {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'green',
        textAlign: 'right'
    },
    'viewPage-list-item-sub-container3-text3': {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
        fontStyle: 'italic'
    },
}
export const styles = StyleSheet.create({
    ...application,
    ...appHeader,
    ...appImage,
    ...login,
    ...loader,
    ...appTab,
    ...appTabView,
    ...viewPage
});