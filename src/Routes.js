import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './Components/RouteAuth/privateRoutes';
import PublicRoute from './Components/RouteAuth/publicRoutes';
import Home from './Components/home';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import Matches from './Components/admin/matches';

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute {...props} path='/admin_matches' exact component={Matches} />
                <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
                <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
                <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;
