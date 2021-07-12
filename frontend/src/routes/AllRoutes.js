import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import About from '../pages/About/About';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Shop from '../pages/Shop/Shop';
import Home from '../pages/Home/Home';
import Account from '../pages/Account/Account';
import Register from '../pages/Register';
import Login from '../pages/Login';

const AllRoutes = () => {
    return (
        <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute path="/myaccount" component={Account} />

        </Switch>
    );

}

export default AllRoutes;