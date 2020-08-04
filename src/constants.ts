export enum APP_LABELS {
    APP_NAME= 'Pouch of Solomon'
};
export enum APP_DEFAULT_COLORS {
    DARK_COLOR = '#88184c',
    LIGHT_COLOR = '#ac527c',
    LIGHTEST_COLOR = '#fbe9f1'
};
export enum URL {
    API_URL = 'https://pouchofsolomonapi.herokuapp.com/'
};
export enum API_PATH {
    GET_USERID_FROM_LOGINID = 'getUserId',
    GET_TRANSACTION = 'getTransaction?id={id}',
    GET_TRANSACTION_TYPE = 'getTransactionTypeList?id={id}',
    GET_AMOUNT_TYPE = 'getAmountTypeList?id={id}',
    DELETE_TRANSACTION = 'deleteTransaction?id={id}',
    ADD_TRANSACTION = 'recordTransaction?id={id}'
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
    SUCCESS_ADD_TRANSACTION = 'Added successfully'
};
export enum ALERT_BUTTON {
    YES = 'Yes',
    NO = 'No',
    OK = 'Ok',
    CANCEL = 'Cancel'
};