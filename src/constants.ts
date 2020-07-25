export enum APP_DEFAULT_COLORS {
    DARKCOLOR = '88184c',
    LIGHTCOLOR = 'ac527c',
    LIGHTESTCOLOR = '#fbe9f1'
}
export enum URL {
    API_URL = 'https://pouchofsolomonapi.herokuapp.com/'
}
export enum API_PATH {
    getUserIdFromLoginId = 'getUserId',
    getTransaction = 'getTransaction?id={id}',
    getTransactionTypeList = 'getTransactionTypeList?id={id}',
    getAmountTypeList = 'getAmountTypeList?id={id}'
}