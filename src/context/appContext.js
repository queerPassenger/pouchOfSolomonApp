import React from 'react';

export const appContextSchema = {
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

    showLoader: () => {},
    hideLoader: (boolean) => {},
    updateTabs: list => { },
    updateSelectedTab: string => {},
    updateTransactionTypes: list => {},
    updateTransactionTypeList: list => {},
    updateAmountTypeList: list => {}
};
export const getAppContextSchema = () => { return { ...appContextSchema } };
export const AppContext = React.createContext(getAppContextSchema());