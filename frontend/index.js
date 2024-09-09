import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'index.css';
import App from 'App';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Dashboard from 'pages/Dashboard';
import JobsPage from 'pages/JobsPage';
import InternshipsPage from 'pages/InternshipsPage';
import OrganizationsPage from 'pages/OrganizationsPage';
import ScholarshipsPage from 'pages/ScholarshipsPage';
import Profile from 'pages/Profile';
import { AuthProvider, userAuth } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

const Root = () => {
    <AuthProvider>
        <Switch>
            {/*Public routes*/}
            <Route path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/*Private routes*/}
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/jobs" component={JobsPage} />
            <PrivateRoute path="/internships" component={InternshipsPage} />
            <PrivateRoute path="/organizations" component={OrganizationsPage} />
            <PrivateRoute path="/scholarships" component={ScholarshipsPage} />
            <PrivateRoute path="/profile" component={Profile} />

            {/*Redirect to login page if no route matches*/}
            <Redirect to="/" />
        </Switch>
    </AuthProvider>
}