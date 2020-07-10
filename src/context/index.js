import React, { useState } from 'react';
import { UserContext } from './userContext';
import { AppContext } from './appContext';

export default function Context(props) {
    const [userId, updateUserId] = useState('');
    const [googleUserInfo, updateGoogleUserInfo] = useState({});
    const [tabSelected, updateTabSelected] = useState('view');
    return (
        <UserContext.Provider value={{
            userId,
            updateUserId,
            googleUserInfo,
            updateGoogleUserInfo
        }}>
            <AppContext.Provider value={{
                tabSelected,
                updateTabSelected
            }}>
                {props.children}
            </AppContext.Provider>
        </UserContext.Provider>
    )
}