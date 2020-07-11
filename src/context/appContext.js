import React from 'react';

export const appContextSchema = {
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
    updateTabs: tabs => { },
    updateSelectedTab: tabKey => {},
    transactionTypeList: [],
    amountTypeList: [],
};
export const getAppContextSchema = () => { return { ...appContextSchema } };
export const AppContext = React.createContext(getAppContextSchema());