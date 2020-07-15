import { StyleSheet } from 'react-native';

export const common = {
    appColorDark: '#88184c',
    appColorDarkRgb: 'rgb(136,24,76)',
    appColorLight: '#ac527c',
    appColorLightRgb: 'rgb(172,82,124)',
    appColorLightest: '#fbe9f1',
    appColorLightestRgb: 'rgb(251,233,241)',
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
const transactionPage = {
    'transactionPage-container': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    'transactionPage-list-container': {
        display: 'flex',
        flex: 9,
        flexDirection: 'column',
        elevation: 0.5,
        borderColor: '#cecdd2',
    },
    'transactionPage-footer-container': {
        flexDirection: 'row',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    'transactionPage-norecords-container': {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'transactionPage-norecords-container-text': {
        fontWeight: 'bold',
        fontSize: 20,
        color: common.appColorDark
    },
    'transactionPage-list-item-container': {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,        
        padding: 10,
        height: 80,
        borderBottomColor: '#cecdd2',
        borderBottomWidth: 0.25,
        borderRadius: 5,
        borderStyle: 'solid',       
        backgroundColor: 'green'
    },
    'transactionPage-list-item-sub-container1': {
        flex: 1,
        flexDirection: 'column'
    },
    'transactionPage-list-item-sub-container2': {
        display: 'flex',
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 10
    },
    'transactionPage-list-item-sub-container3': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    'transactionPage-list-item-sub-container1-emptyContainer':{
        height: 7,
        marginBottom: 10,
        backgroundColor: 'lightgray'
    },
    'transactionPage-list-item-sub-container2-text1': {
        fontWeight: 'bold',
        fontSize: 14,
        color: common.appColorDark,
        color: 'white',
    },
    'transactionPage-list-item-sub-container2-text2': {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container2-text3': {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container2-text4': {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container3-text1': {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        textAlign: 'right',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container3-text2': {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        textAlign: 'right'
    },
    'transactionPage-list-item-sub-container3-text3': {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        textAlign: 'right',
        fontStyle: 'italic'
    },
    'transactionPage-footer-container-sub-container': {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3E3E3'

    },
    'transactionPage-footer-container-sub-container-image': {
        width: 30,
        height: 30
    }

}
const modalComponent = {
    'modalComponent-container': {
        flex:1,
        justifyContent:'center',
        padding: 10
    },
    'modalComponent-sub-container': {
        backgroundColor: common.appColorLightest,
        borderRadius: 3  
    },
    'modalComponent-header-container': {
        flexDirection: 'row',
        height: 30,
    },
    'modalComponent-body-container': {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 10
    }
}
export const styles = StyleSheet.create({
    ...application,
    ...appHeader,
    ...appImage,
    ...login,
    ...loader,
    ...appTab,
    ...appTabView,
    ...transactionPage,
    ...modalComponent
});