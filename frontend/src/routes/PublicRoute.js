import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService'

// handle the public routes
const PublicRoute = ({ component: Component, path: Path, ...rest }) => {
  return (
    <Route
      path={Path}
      render={() => !AuthenticationService.validateToken() ? <Component {...rest} /> : <Redirect push to={"/"} />}
    />
  )
}

export default PublicRoute;
