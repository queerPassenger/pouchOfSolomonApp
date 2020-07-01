import React, { useState, useEffect } from 'react';
import Application from './components/application';
import Login from './components/login';

export default function Index() {
    let [isAuthenticated, setIsAuthenticated] = useState(false);   
    let [userInfo, updateUserInfo] = useState({});
    return isAuthenticated ? 
        <Application userInfo={userInfo}/> 
    : 
        <Login 
            setIsAuthenticated = {(flag) => {console.log(flag);setIsAuthenticated(flag);}}
            updateUserInfo={updateUserInfo}
        />;
}