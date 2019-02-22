import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './Components/RouteAuth/privateRoutes';
import PublicRoute from './Components/RouteAuth/publicRoutes';
import Home from './Components/home';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import matches from './Components/admin/matches';
import EditMatch from "./Components/admin/matches/EditMatch";

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute {...props} path='/admin_matches/edit_match/:id' exact component={EditMatch} />
                <PrivateRoute {...props} path='/admin_matches' exact component={matches} />
                <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
                <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
                <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;
