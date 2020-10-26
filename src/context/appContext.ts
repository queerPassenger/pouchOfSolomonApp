import React, { createContext } from 'react';

export interface Tab {
    key: string,
    name: string,
    selected: boolean
}
export interface ToastrType {
    id: number,
    msg: string,
    color: string,
    backgroundColor: string
}
export interface AppContextType {
    loader: number,
    tabs: Array<Tab>,
    selectedTab: string,
    transactionTypes: Array<any>,
    transactionTypeList: Array<any>,
    amountTypeList: Array<any>,
    userActions: any,
    toastr: Array<ToastrType>,
    showLoader: () => void,
    hideLoader: (param?: boolean) => void,
    updateTabs: (param: Array<Tab>) => void,
    updateSelectedTab: (param: any) => void,
    updateTransactionTypes: (param: Array<any>) => void,
    updateTransactionTypeList: (param: Array<any>) => void,
    updateAmountTypeList: (param: Array<any>) => void,
    loadAppContext: () => Promise<any>,
    updateUserActions: (param: any) => void,
    updateToastr: (param: any) => void
}
const appContextSchema: AppContextType = {
    loader: 0,
    tabs: [
        {
            key: 'transaction',
            name: 'TRANSACTION',
            selected: false
        },
        // {
        //     key: 'analyse',
        //     name: 'ANALYSE',
        //     selected: false
        // }
    ],
    selectedTab: '',
    transactionTypes: [],
    transactionTypeList: [],
    amountTypeList: [],
    userActions: {
        transaction: {
            filter: {
                fromDate: new Date(new Date().getFullYear(), 0, 1),
                toDate: new Date(),
                types: [],
                subTypes: []
            },
            add: {
                type: '',
                subTypeId: 0,
                amountTypeId: 0
            }
        }
    },
    toastr: [],
    showLoader: () => { },
    hideLoader: (boolean) => { },
    updateTabs: list => { },
    updateSelectedTab: string => { },
    updateTransactionTypes: list => { },
    updateTransactionTypeList: list => { },
    updateAmountTypeList: list => { },
    loadAppContext: () => new Promise(resolve => resolve()),
    updateUserActions: (param) => {} ,
    updateToastr: (param) => []
};
export const getAppContextSchema = (): AppContextType => {
    return { ...appContextSchema }
};
const AppContext = createContext(getAppContextSchema());
export default AppContext;