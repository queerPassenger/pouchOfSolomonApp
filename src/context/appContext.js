import React from 'react';

export const appContextSchema = {
    tabSelected: '',
    updateTabSelected: tab => { }
};
export const getAppContextSchema = () => { return { ...appContextSchema } };
export const AppContext = React.createContext(getAppContextSchema());