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
import AdminPlayers from "./Components/admin/players";
import EditPlayers from "./Components/admin/players/EditPlayers";
import TheTeam from "./Components/theTeam";
import TheMatches from "./Components/theMatches";
import NotFound from "./Components/ui/not_found";

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute {...props} path='/admin_players/add_players/' exact component={EditPlayers} />
                <PrivateRoute {...props} path='/admin_players/add_players/:id' exact component={EditPlayers} />
                <PrivateRoute {...props} path='/admin_players' exact component={AdminPlayers} />
                <PrivateRoute {...props} path='/admin_matches/edit_match/' exact component={EditMatch} />
                <PrivateRoute {...props} path='/admin_matches/edit_match/:id' exact component={EditMatch} />
                <PrivateRoute {...props} path='/admin_matches' exact component={matches} />
                <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
                <PublicRoute {...props} restricted={false} path='/the_matches' exact component={TheMatches} />
                <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
                <PublicRoute {...props} restricted={false} path='/the_team' exact component={TheTeam} />
                <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
                <PublicRoute {...props} restricted={false} component={NotFound} />
            </Switch>
        </Layout>
    );
};

export default Routes;
