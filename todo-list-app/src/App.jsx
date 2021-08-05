import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/App.scss'
import SignUpScene from "./scenes/Signup"
import LoginScene from "./scenes/Login"
import DashboardScene from "./scenes/Dashboard"

import store from './core/store'

/* define all routes */
export default () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginScene} />
                    <Route path="/signup" exact component={SignUpScene} />
                    <Route path="/dashboard" exact component={DashboardScene}/>
                </Switch>
            </Router>
        </Provider>
    )
}
