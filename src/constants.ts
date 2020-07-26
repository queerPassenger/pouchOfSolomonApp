export enum APP_LABELS {
    APP_NAME= 'Pouch of Solomon'
}
export enum APP_DEFAULT_COLORS {
    DARK_COLOR = '#88184c',
    LIGHT_COLOR = '#ac527c',
    LIGHTEST_COLOR = '#fbe9f1'
}
export enum URL {
    API_URL = 'https://pouchofsolomonapi.herokuapp.com/'
}
export enum API_PATH {
    GET_USERID_FROM_LOGINID = 'getUserId',
    GET_TRANSACTION = 'getTransaction?id={id}',
    GET_TRANSACTION_TYPE = 'getTransactionTypeList?id={id}',
    GET_AMOUNT_TYPE = 'getAmountTypeList?id={id}'
}