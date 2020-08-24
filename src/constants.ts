import Constants from 'expo-constants';

export enum APP {
    APP_NAME= Constants.manifest.extra.APP_NAME,
    APP_VERSION = Constants.manifest.extra.VERSION,
    APP_OWNER = Constants.manifest.extra.APP_OWNER,
    ICON_CREDITS = Constants.manifest.extra.ICON_CREDITS,
    LOGO_CREDITS = Constants.manifest.extra.LOGO_CREDITS,
    EMAIL_SUPPORT = Constants.manifest.extra.EMAIL_SUPPORT
};
export enum GOOGLE {
    ANDROID_CLIENT_ID = Constants.manifest.extra.ANDROID_CLIENT_ID,
    ANDROID_STANDALONE_APP_CLIENT_ID = Constants.manifest.extra.ANDROID_STANDALONE_APP_CLIENT_ID
}
export enum APP_DEFAULT_COLORS {
    DARK_COLOR = '#88184c',
    LIGHT_COLOR = '#ac527c',
    LIGHTEST_COLOR = '#fbe9f1'
};
export enum URL {
    API_URL = Constants.manifest.extra.API_URL
};
export enum API_PATH {
    GET_USERID_FROM_LOGINID = 'getUserId',
    GET_TRANSACTION = 'getTransaction?id={id}',
    GET_TRANSACTION_TYPE = 'getTransactionTypeList?id={id}',
    GET_AMOUNT_TYPE = 'getAmountTypeList?id={id}',
    DELETE_TRANSACTION = 'deleteTransaction?id={id}',
    ADD_TRANSACTION = 'recordTransaction?id={id}',
    UPDATE_TRANSACTION = 'updateTransaction?id={id}'
};
export enum ALERT_TITLE {
    WARNING =  'Warning',
    SUCCESS = 'Eureka',
    FAILURE = 'Oops'
};
export enum ALERT_MSG {
    FAILED_REQUEST = 'Failed to process the request. Please try again after some time',
    SUCCESS_DELETE_TRANSACTION = 'The selected item(s) got deleted successfully',
    CONFIRMATION_DELETE_TRANSACTION = 'Are you sure want to delete these items',
    UNMET_PREREQ_DELETE_TRANSACTION = 'Please select atleast one item before deleting',
    UNMET_ADD_TRANSACTION = 'Please fill all the fields before adding',
    SUCCESS_ADD_TRANSACTION = 'Added successfully',
    UNMET_PREREQ_UPDATE_TRANSACTION = 'Please select one item at a time to update',    
    UNMET_UPDATE_TRANSACTION = 'Please fill all the fields before updating',
    SUCCESS_UPDATE_TRANSACTION = 'Updated successfully',
    CONFIRMATION_LOGOUT = 'Are you sure want to logout',
};
export enum ALERT_BUTTON {
    YES = 'Yes',
    NO = 'No',
    OK = 'Ok',
    CANCEL = 'Cancel'
};