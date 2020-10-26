import { StyleSheet } from 'react-native';
import { APP_DEFAULT_COLORS, APP } from '../constants';

const application = {
    'application-container': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
};
const appHeader = {
    'appHeader-container': {
        backgroundColor: APP_DEFAULT_COLORS.APP_COLOR,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    'appHeader-appName': {
        color: APP_DEFAULT_COLORS.PRIMIARY_TXT,
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
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
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
        color: APP_DEFAULT_COLORS.THIRD_TXT,
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
        backgroundColor: APP_DEFAULT_COLORS.APP_COLOR,
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
        borderBottomColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderBottomWidth: 2,
        borderStyle: 'solid'
    },

    'appTab-tab-text': {
        fontSize: 14,
        color: APP_DEFAULT_COLORS.PRIMIARY_TXT
    },
    'appTab-tab-text-selected': {
        fontSize: 14,
        fontWeight: 'bold',
        color: APP_DEFAULT_COLORS.PRIMIARY_TXT
    },
};
const appTabView = {
    'appTabView-container': {
        display: 'flex',
        flex: 1
    }
};
const transactionPage = {
    'transactionPage-container': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND
    },
    'transactionPage-list-container': {
        display: 'flex',
        flex: 9,
        flexDirection: 'column',
        elevation: 0.5
    },
    'transactionPage-footer-container': {
        flexDirection: 'row',
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
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
        color: APP_DEFAULT_COLORS.APP_COLOR
    },
    'transactionPage-list-item-container': {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 10,
        marginHorizontal: 20,
        height: 80,
        borderRadius: 5,
        borderStyle: 'solid',
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        elevation: 5
    },
    'transactionPage-list-item-sub-container': {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    'transactionPage-list-item-wrapper1': {
        height: 2,
        marginHorizontal: 5
    },
    'transactionPage-list-item-wrapper2': {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10
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
    'transactionPage-list-item-sub-container-emptyContainer': {
        height: 7,
        marginBottom: 10,
        backgroundColor: APP_DEFAULT_COLORS.APP_COLOR
    },
    'transactionPage-list-item-sub-container2-text1': {
        fontWeight: 'bold',
        fontSize: 14,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
    },
    'transactionPage-list-item-sub-container2-text2': {
        fontWeight: 'bold',
        fontSize: 12,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container2-text3': {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container2-text4': {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container3-text1': {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        textAlign: 'right',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container3-text2': {
        fontWeight: 'bold',
        fontSize: 16,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        textAlign: 'right'
    },
    'transactionPage-list-item-sub-container3-text3': {
        fontWeight: 'bold',
        fontSize: 10,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
        textAlign: 'right',
        fontStyle: 'italic'
    },
    'transactionPage-list-item-sub-container3-text4': {
        textAlign: 'right',
        fontSize: 14,
        color: APP_DEFAULT_COLORS.SECONDARY_TXT,
    },
    'transactionPage-total-open-container': {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    'transactionPage-total-open-header-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10
    },
    'transactionPage-total-open-header-text': {
        fontWeight: 'bold'
    },
    'transactionPage-total-open-header-close-container': {
        position: 'absolute',
        right: 0
    },
    'transactionPage-total-open-header-close-text': {
        fontSize: 20
    },
    'transactionPage-total-open-body-item-container': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    'transactionPage-total-open-body-item-sub-container': {
        padding: 5,
        borderRadius: 3
    },
    'transactionPage-total-open-body-item-sub-container-text': {
        fontWeight: 'bold'        
    },
    'transactionPage-total-close-container': {
        position: 'absolute',
        bottom: 10,
        left: '40%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '20%',
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 10,
        elevation: 3
    },
    'transactionPage-total-close-text': {
        textAlign: 'center',
        fontWeight: 'bold'
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
        justifyContent: 'center'
    },
    'modalComponent-sub-container': {
        flex: 1,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 3
    },
};
const filterTransaction = {
    'filterTransaction-container': {
        flexDirection: 'column',
        flex: 1
    },    
};
const pickerContainer = {
    'pickerContainer-container': {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.APP_COLOR,
        elevation: 3
    },
    'pickerContainer-simplePicker-picker-container': {
        flex: 1
    },
    'pickerContainer-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        color: APP_DEFAULT_COLORS.THIRD_TXT,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    },
    'pickerContainer-multipicker-container': {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 40,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.APP_COLOR,
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
        color: APP_DEFAULT_COLORS.THIRD_TXT
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
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.APP_COLOR,
        elevation: 3,
        paddingHorizontal: 8
    },
    'modalChildrenPage-body-part-sub-box-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        color: APP_DEFAULT_COLORS.THIRD_TXT,
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
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        borderRadius: 3,
        borderWidth: 0.25,
        borderColor: APP_DEFAULT_COLORS.APP_COLOR,
        elevation: 3,
        paddingHorizontal: 5
    },
    'textInputContainer-label': {
        position: 'absolute',
        bottom: 32,
        right: 10,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        color: APP_DEFAULT_COLORS.THIRD_TXT,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12
    },
};
const settings = {
    'settings-container': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    'settings-img-container': {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
    },
    'settings-img': {
        width: '50%',
        height: 200,
        borderRadius: 7
    },
    'settings-userDetails-wrapper': {
        flexDirection: 'column',
        elevation: 0.5,
        paddingVertical: 10
    },
    'settings-userDetails-super-container': {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    'settings-userDetails-container': {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 0.25,
        paddingTop: 15
    },
    'settings-userDetails-text': {
        paddingHorizontal: 10,
        fontSize: 15,
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'settings-userDetails-label': {
        position: 'absolute',
        bottom: 28,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        color: APP_DEFAULT_COLORS.THIRD_TXT,
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        paddingRight: 3
    },
    'settings-userActions-wrapper': {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 10
    },
    'settings-userAction': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        textAlign:'left'
    },
    'settings-userAction-img': {
        width: 14,
        height: 14,
        marginRight: 10,
        marginTop: 2
    },
    'settings-userAction-text': {
        fontSize: 18,
        color: APP_DEFAULT_COLORS.THIRD_TXT
    }
};
const settingsModalChildrenPage = {
    'settingsModalChildrenPage-container': {
        flexDirection: 'column',
        flex: 1
    },
    'settingsModalChildrenPage-header': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        elevation: 1,
        borderWidth: 0.02,
    },
    'settingsModalChildrenPage-header-part1': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        bottom: 2,
    },
    'settingsModalChildrenPage-header-part1-txt': {
        fontSize: 40
    },
    'settingsModalChildrenPage-header-part2': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 4,
        paddingTop: 14,
    },
    'settingsModalChildrenPage-header-part2-txt': {
        fontSize: 17
    },
    'settingsModalChildrenPage-header-part3': {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        bottom: 2,
    },
};
const about = {    
    'about-container': {
        flex: 1,
        flexDirection: 'column'
    },
    'about-sub-container': {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'about-appName': {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'about-appVersion': {
        fontSize: 14,
        fontWeight: 'bold',
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'about-logo': {
        width: 150,
        height: 200,
        marginVertical: 10
    },
    'about-appOwner': {
        fontSize: 16,
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'about-credits': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    'about-credit': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'about-credit-title': {
        fontSize: 12,
        fontWeight: 'bold',
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'about-credit-text': {
        fontSize: 12,
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },    
}
const contactUs = {
    'contactUs-container': {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    'contactUs-details-super-container': {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    'contactUs-details-container': {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 0.25,
        paddingTop: 15
    },
    'contactUs-details-text': {
        paddingHorizontal: 10,
        fontSize: 15,
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'contactUs-details-copy': {
        paddingHorizontal: 10,
        fontSize: 15,
        textAlign: 'right',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'gray',
        color: APP_DEFAULT_COLORS.THIRD_TXT
    },
    'contactUs-details-label': {
        position: 'absolute',
        bottom: 28,
        backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND,
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        paddingRight: 3
    },
}
const toastr = {
    'toastr-container' : {
        position: 'absolute',
        top: 20,
        right: 20
    },
    'toastr-content-container' : {
        padding: 7,
        borderRadius: 3,
        width: 250,
        margin: 2,
        elevation: 5
    }
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
    ...textInputContainer,
    ...settings,
    ...settingsModalChildrenPage,
    ...about,
    ...contactUs,
    ...toastr
});