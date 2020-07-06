import React from 'react';

export const userContextSchema = {
    userId: '',
    updateUserId: userId => { },
    googleUserInfo: {},
    updateGoogleUserInfo: googleUserInfo => { }
};
export const getUserContextSchema = () => { return { ...userContextSchema } };
export const UserContext = React.createContext(getUserContextSchema());