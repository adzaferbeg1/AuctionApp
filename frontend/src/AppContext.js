import React, { createContext, useContext, useState } from "react";
import AuthenticationService from "./services/AuthenticationService";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const Provider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(
		AuthenticationService.validateToken()
	);

	return (
		<UserContext.Provider value={{ loggedIn, setLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};
