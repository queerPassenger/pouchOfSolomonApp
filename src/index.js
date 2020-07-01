import React, { useState, useEffect } from 'react';
import Application from './components/application';
import Login from './components/login';

export default function Index() {
    let [isAuthenticated, setIsAuthenticated] = useState(false);   
    return isAuthenticated ? 
        <Application /> 
    : 
        <Login 
            setIsAuthenticated = {setIsAuthenticated}
        />;
}