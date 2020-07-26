import React, { createContext } from 'react';

export interface Tab {
    key: string,
    name: string,
    selected: boolean
}
export interface AppContextType {
    loader: number,
    tabs: Array<Tab>,
    selectedTab: string,
    transactionTypes: Array<any>,
    transactionTypeList: Array<any>,
    amountTypeList: Array<any>,
    showLoader: () => void,
    hideLoader: (param?: boolean) => void,
    updateTabs: (param: Array<Tab>) => void,
    updateSelectedTab: (param: any) => void,
    updateTransactionTypes: (param: Array<any>) => void,
    updateTransactionTypeList: (param: Array<any>) => void,
    updateAmountTypeList: (param: Array<any>) => void,
}
const appContextSchema: AppContextType = {
    loader: 0,
    tabs: [
        {
            key: 'transaction',
            name: 'TRANSACTION',
            selected: false
        },
        {
            key: 'analyse',
            name: 'ANALYSE',
            selected: false
        }
    ],
    selectedTab: '',
    transactionTypes: [],
    transactionTypeList: [],
    amountTypeList: [],

    showLoader: () => { },
    hideLoader: (boolean) => { },
    updateTabs: list => { },
    updateSelectedTab: string => { },
    updateTransactionTypes: list => { },
    updateTransactionTypeList: list => { },
    updateAmountTypeList: list => { }
};
export const getAppContextSchema = (): AppContextType => {
    return { ...appContextSchema }
};
const AppContext = createContext(getAppContextSchema());
export default AppContext;