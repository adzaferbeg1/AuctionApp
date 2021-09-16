import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "services/AuthenticationService";

const PrivateRoute = ({ component: Component, path: Path, ...rest }) => {
	return (
		<Route
			path={Path}
			render={() =>
				AuthenticationService.validateToken() ? (
					<Component {...rest} />
				) : (
					<Redirect push to={"/login"} />
				)
			}
		/>
	);
};

export default PrivateRoute;
