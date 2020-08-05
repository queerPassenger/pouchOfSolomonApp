import { StyleSheet } from 'react-native';
import { APP_DEFAULT_COLORS } from '../constants';

const application = {
    'application-container': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
};
const appHeader = {
    'appHeader-container': {
        backgroundColor: APP_DEFAULT_COLORS.DARK_COLOR,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    'appHeader-appName': {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    'appHeader-userImg': {
        width: 30,
        height: 30,
        borderRadius: 5
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
};
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
};
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
};
const appTab = {
    'appTab-container': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: APP_DEFAULT_COLORS.DARK_COLOR,
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
};
const appTabView = {
    'appTabView-container': {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    }
};
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
        color: APP_DEFAULT_COLORS.DARK_COLOR
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
    'transactionPage-list-item-sub-container1-emptyContainer': {
        height: 7,
        marginBottom: 10,
        backgroundColor: 'lightgray'
    },
    'transactionPage-list-item-sub-container2-text1': {
        fontWeight: 'bold',
        fontSize: 14,
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
    'transactionPage-list-item-sub-container3-text4': {
        textAlign: 'right',
        fontSize: 14,
        color: 'white'
    },
    'transactionPage-footer-container-sub-container': {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1
    },
    'transactionPage-footer-container-sub-container-image': {
        width: 23,
        height: 23,
        marginTop: 10
    }

};
const modalComponent = {
    'modalComponent-container': {
        flex: 1,
        justifyContent: 'center',
        //padding: 20
    },
    'modalComponent-sub-container': {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3
    },
};
const filterTransaction = {
    'filterTransaction-container': {
        flexDirection: 'column',
        flex: 1
    },
    'filterTransaction-action-container': {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        marginBottom: 10
    },
    'filterTransaction-btn-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3,
        width: 150,
        height: 40
    },
    'filterTransaction-btn-text': {
        color: 'black',
        fontWeight: 'bold',
    },
    'filterTransaction-date-super-container': {
        flexDirection: 'column',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    'filterTransaction-date-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    'filterTransaction-datetime-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3,
        width: '70%',
        height: 30
    },
    'filterTransaction-datetime-text': {
        color: 'black',
        fontWeight: 'bold',
    },
    'filterTransaction-text-label': {
        position: 'absolute',
        bottom: 22,
        right: 10,
        backgroundColor: 'white',
        color: 'gray',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    },
    'filterTransaction-datetime-image': {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    'filterTransaction-picker-wrapper': {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    }
};
const pickerContainer = {
    'pickerContainer-container': {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3
    },
    'pickerContainer-simplePicker-picker-container': {
        flex: 1
    },
    'pickerContainer-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: 'white',
        color: 'gray',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    },
    'pickerContainer-multipicker-container': {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3,
        paddingHorizontal: 8
    },
    'pickerContainer-multipicker-option-container': {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    'pickerContainer-multipicker-selected-text': {
        fontSize: 14
    },
    'pickerContainer-multipicker-option-text': {
        fontWeight: 'bold',
        fontSize: 16
    }
};
const modalChildrenPage = {
    'modalChildrenPage-container': {
        flexDirection: 'column',
        flex: 1
    },
    'modalChildrenPage-header': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        elevation: 1,
        borderWidth: 0.02
    },
    'modalChildrenPage-header-part1': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        bottom: 2
    },
    'modalChildrenPage-header-part1-txt': {
        fontSize: 40
    },
    'modalChildrenPage-header-part2': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6,
        paddingTop: 14
    },
    'modalChildrenPage-header-part2-txt': {
        fontSize: 17
    },
    'modalChildrenPage-header-part3': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    'modalChildrenPage-header-part3-txt': {
        fontSize: 30
    },
    'modalChildrenPage-header-part4': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    'modalChildrenPage-header-part4-txt': {
        fontSize: 25
    },
    'modalChildrenPage-body': {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    'modalChildrenPage-body-part1': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    'modalChildrenPage-body-part1-sub': {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        width: 150,
        elevation: 1,
        borderWidth: 0.2,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    'modalChildrenPage-body-part1-sub-txt': {
        fontSize: 16,
        textTransform: 'capitalize',
        color: 'gray'
    },
    'modalChildrenPage-body-part': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 50
    },
    'modalChildrenPage-body-part-sub-box': {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3,
        paddingHorizontal: 8
    },
    'modalChildrenPage-body-part-sub-box-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: 'white',
        color: 'gray',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    }
};
const textInputContainer = {
    'textInputContainer-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.DARK_COLOR,
        elevation: 3,
        paddingHorizontal: 5
    },
    'textInputContainer-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: 'white',
        color: 'gray',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    },
}
export const styles = StyleSheet.create<any>({
    ...application,
    ...appHeader,
    ...appImage,
    ...login,
    ...loader,
    ...appTab,
    ...appTabView,
    ...transactionPage,
    ...modalComponent,
    ...filterTransaction,
    ...pickerContainer,
    ...modalChildrenPage,
    ...textInputContainer
});