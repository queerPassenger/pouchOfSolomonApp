import React from 'react';

export const appContextSchema = {
    loader: 0,
    tabs: [
        {
            key: 'view',
            name: 'VIEW',
            selected: false
        },
        {
            key: 'analyse',
            name: 'ANALYSE',
            selected: false
        }
    ],
    selectedTab: '',
    transactionTypeList: [],
    amountTypeList: [],

    showLoader: () => {},
    hideLoader: (boolean) => {},
    updateTabs: list => { },
    updateSelectedTab: string => {},
    updateTransactionTypeList: list => {},
    updateAmountTypeList: list => {}
};
export const getAppContextSchema = () => { return { ...appContextSchema } };
export const AppContext = React.createContext(getAppContextSchema());