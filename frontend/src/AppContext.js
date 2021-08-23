import React, { createContext, useContext, useState } from "react";
import AuthenticationService from "./services/AuthenticationService";

export const UserContext = createContext({});
export const SearchContext = createContext({});

export const useUserContext = () => useContext(UserContext);
export const useSearchContext = () => useContext(SearchContext);

export const Provider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(
		AuthenticationService.validateToken()
	);
	const [searchWord, setSearchWord] = useState("");
	const [fromSearchBar, setFromSearchBar] = useState(false);
	const [spellCheck, setSpellCheck] = useState("");

	return (
		<UserContext.Provider value={{ loggedIn, setLoggedIn }}>
			<SearchContext.Provider
				value={{
					searchWord,
					setSearchWord,
					fromSearchBar,
					setFromSearchBar,
					spellCheck,
					setSpellCheck,
				}}
			>
				{children}
			</SearchContext.Provider>
		</UserContext.Provider>
	);
};
