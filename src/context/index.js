import React, { useState } from 'react';
import { UserContext } from './userContext';

export default function Context(props) {
    const [userId, updateUserId] = useState('');
    const [googleUserInfo, updateGoogleUserInfo] = useState({});
    return (
        <UserContext.Provider value={{
            userId,
            updateUserId,
            googleUserInfo,
            updateGoogleUserInfo
        }}>
            {props.children}
        </UserContext.Provider>
    )
}