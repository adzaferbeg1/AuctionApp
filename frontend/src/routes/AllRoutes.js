import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import About from "../pages/about/About";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Shop from "../pages/Shop/Shop";
import Account from "../pages/account/Account";
import Register from "../pages/Register";
import Login from "../pages/Login";
import LandingPage from "../pages/landingPage/LandingPage";
import ProductList from "../pages/productList/ProductList";
import Sell from "../pages/sell/Sell";
import StripePayment from "../components/StripePayment";

const AllRoutes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route exact path="/about" component={About} />
			<Route exact path="/privacy" component={Privacy} />
			<Route exact path="/terms" component={Terms} />
			<Route exact path="/shop" component={Shop} />
			<Route exact path="/products" component={ProductList} />
			<PublicRoute exact path="/register" component={Register} />
			<PublicRoute exact path="/login" component={Login} />
			<PrivateRoute path="/myaccount" component={Account} />
			<PrivateRoute path="/sell" component={Sell} />
			<PrivateRoute path="/payment" component={StripePayment} />
		</Switch>
	);
};

export default AllRoutes;
