import React, { createContext } from 'react';

export interface UserContextType {
    userId: string,
    updateUserId: (param: string) => void,
    googleUserInfo: any,
    updateGoogleUserInfo: (param: any) => void
}
const userContextSchema: UserContextType = {
    userId: '',
    updateUserId: userId => { },
    googleUserInfo: {},
    updateGoogleUserInfo: googleUserInfo => { }
};
export const getUserContextSchema = (): UserContextType => {
    return { ...userContextSchema }
};
const UserContext = createContext<UserContextType>(getUserContextSchema());
export default UserContext;