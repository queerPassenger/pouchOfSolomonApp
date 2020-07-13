import React, { useState, useEffect } from 'react';
import { UserContext } from './userContext';
import { AppContext, getAppContextSchema } from './appContext';
import { request } from '../utils/request';
import { apiUrl, endpoint } from '../constants/urls';

export default function Context(props) {
    const [userId, updateUserId] = useState(props.userId);
    const [googleUserInfo, updateGoogleUserInfo] = useState({});
    const [loader, updateLoader] = useState(0);    
    const [tabs, updateTabs] = useState([]);
    const [selectedTab, updateSelectedTab] = useState('');
    const [transactionTypeList, updateTransactionTypeList] = useState([]);
    const [amountTypeList, updateAmountTypeList] = useState([]);
    
    useEffect(() => {
        loadAppContext();        
    }, []);
    const loadAppContext = async () => {
        showLoader();
        updateTabsContext(getAppContextSchema().tabs);
        await getTransactionTypeList();
        await getAmountTypeList();
        hideLoader();
    }
    const updateTabsContext = (updatedTabs) => {
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
    const getTransactionTypeList = async () => {
        try {
            let response = await request.get(apiUrl + endpoint.getTransactionTypeList.replace('{id}', userId), {});
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    updateTransactionTypeList(response.data.data);
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            console.warn('Error getTransactionTypeList', err)
            return false
        }
    }
    const getAmountTypeList = async () => {
        try {
            let response = await request.get(apiUrl + endpoint.getAmountTypeList.replace('{id}', userId), {});
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    updateAmountTypeList(response.data.data);
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            console.warn('Error getAmountTypeList', err)
            return false
        }
    }
    const onTabSelect = (key) => {
        updateTabsContext(tabs.map(x => {
            x.selected = x.key === key;
            return x;
        }));
    }
    const showLoader = () => {
        updateLoader(loader => loader+1);
    }
    const hideLoader = (all = false) => {
        if(all)
            updateLoader(0);
        else
            updateLoader(loader => loader-1);
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
                transactionTypeList,
                amountTypeList,
                showLoader,
                hideLoader,
                updateTabs,
                updateSelectedTab: onTabSelect,
                updateTransactionTypeList,
                updateAmountTypeList
            }}>
                {props.children}
            </AppContext.Provider>
        </UserContext.Provider>
    )
}