import React, { Component, Fragment } from 'react';
import Application from './components/application';
import Login from './components/login';

export default class Index extends Component {
    isAuthenticated = false;
    render() {        
        return this.isAuthenticated ? <Application /> : <Login />;
    }
}


