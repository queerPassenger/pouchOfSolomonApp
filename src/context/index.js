import React, { useState, useEffect } from 'react';
import { UserContext } from './userContext';
import { AppContext, getAppContextSchema } from './appContext';

export default function Context(props) {
    const [userId, updateUserId] = useState('');
    const [googleUserInfo, updateGoogleUserInfo] = useState({});
    const [tabs, updateTabs] = useState([]);
    const [selectedTab, updateSelectedTab] = useState('')
    useEffect(() => {
        updateTabsContext(getAppContextSchema().tabs);
    }, []);
    const onTabSelect = (key) => {
        updateTabsContext(tabs.map(x => {
            x.selected = x.key === key;
            return x;
        }));
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
    return (
        <UserContext.Provider value={{
            userId,
            updateUserId,
            googleUserInfo,
            updateGoogleUserInfo
        }}>
            <AppContext.Provider value={{
                tabs,
                selectedTab,
                updateTabs,
                updateSelectedTab: onTabSelect
            }}>
                {props.children}
            </AppContext.Provider>
        </UserContext.Provider>
    )
}