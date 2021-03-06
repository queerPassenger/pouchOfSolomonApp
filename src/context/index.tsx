import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import UserContext from './userContext';
import AppContext, { getAppContextSchema, Tab as TabType, ToastrType } from './appContext';
import logger from '../utils/logger';
import { request } from '../utils/request';
import { getTransactionTypeColor } from '../utils/color';
import { URL, API_PATH } from '../constants';

interface ContextProps {
    userId: string,
    children: ReactNode,
    googleUserInfo: any,
    userActions: any
}
const Context: React.FC<ContextProps> = (props): ReactElement => {
    const [userId, updateUserId] = useState<string>(props.userId);
    const [googleUserInfo, updateGoogleUserInfo] = useState<any>(props.googleUserInfo);
    const [userActions, updateUserActions] = useState<any>(props.userActions);
    const [loader, updateLoader] = useState<number>(0);
    const [tabs, updateTabs] = useState<Array<TabType>>([]);
    const [selectedTab, updateSelectedTab] = useState<string>('');
    const [transactionTypes, updateTransactionTypes] = useState<Array<any>>([]);
    const [transactionTypeList, updateTransactionTypeList] = useState<Array<any>>([]);
    const [amountTypeList, updateAmountTypeList] = useState<Array<any>>([]);
    const [toastr, updateToastr] = useState<Array<ToastrType>>([]);

    const loadAppContext = async (): Promise<void> => {
        showLoader();
        updateTabsContext(getAppContextSchema().tabs);
        await getTransactionType();
        await getAmounType();
        hideLoader();
    }
    const updateTabsContext = (updatedTabs: Array<TabType>): void => {
        let selectedTab = updatedTabs.filter(x => x.selected)[0];
        if (selectedTab && selectedTab.key) {
            updateTabs(updatedTabs)
            updateSelectedTab(selectedTab.key);
        }
        else {
            if (updatedTabs.length > 0) {
                updateTabs(updatedTabs.map((x, ind) => {
                    x.selected = ind === 0;
                    return x;
                }));
                updateSelectedTab(updatedTabs[0].key);
            }
        }
    }
    const getTransactionType = async (): Promise<void> => {
        try {
            let response = await request.get(URL.API_URL + API_PATH.GET_TRANSACTION_TYPE.replace('{id}', userId), {});
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    let responseData: Array<any> = response.data.data;
                    updateTransactionTypeList(modifyTransactionTypeList(responseData));
                    updateTransactionTypes(Array.from(new Set(responseData.map(x => x.transactionClassification))));
                }
            }
        }
        catch (err) {
            logger.warn('Error getTransactionType' + err.toString());
        }
    }
    const modifyTransactionTypeList = (transactionTypes: Array<any>) => transactionTypes.map(x => ({
        ...x,
        color: getTransactionTypeColor(x.transactionClassification)
    })).sort((next: any, current: any) => next.transactionTypeId < current.transactionTypeId ? -1: 1)

    const getAmounType = async (): Promise<void> => {
        try {
            let response = await request.get(URL.API_URL + API_PATH.GET_AMOUNT_TYPE.replace('{id}', userId), {});
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    updateAmountTypeList(response.data.data);
                }
            }
        }
        catch (err) {
            logger.warn('Error getAmounType' + err.toString());
        }
    }
    const onTabSelect = (key: string) => {
        updateTabsContext(tabs.map(x => {
            x.selected = x.key === key;
            return x;
        }));
    }
    const showLoader = (): void => {
        updateLoader(loader => loader + 1);
    }
    const hideLoader = (all = false): void => {
        if (all)
            updateLoader(0);
        else
            updateLoader(loader => loader - 1);
    }
    return (
        <UserContext.Provider value={{
            userId,
            updateUserId,
            googleUserInfo,
            updateGoogleUserInfo
        }}>
            <AppContext.Provider value={{
                loader,
                tabs,
                selectedTab,
                transactionTypes,
                transactionTypeList,
                amountTypeList,
                userActions,
                toastr,
                showLoader,
                hideLoader,
                updateTabs,
                updateSelectedTab: onTabSelect,
                updateTransactionTypes,
                updateTransactionTypeList,
                updateAmountTypeList,
                loadAppContext,
                updateUserActions,
                updateToastr
            }}>
                {props.children}
            </AppContext.Provider>
        </UserContext.Provider>
    )
}
export default Context;