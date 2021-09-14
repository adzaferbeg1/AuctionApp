import React, { createContext, useContext, useState } from "react";
import AuthenticationService from "./services/AuthenticationService";

export const UserContext = createContext({});
export const SearchContext = createContext({});
export const NotificationContext = createContext({});

export const useUserContext = () => useContext(UserContext);
export const useSearchContext = () => useContext(SearchContext);
export const useNotificationContext = () => useContext(NotificationContext);

export const Provider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(
		AuthenticationService.validateToken()
	);
	const [searchWord, setSearchWord] = useState("");
	const [fromSearchBar, setFromSearchBar] = useState(false);
	const [user, setUser] = useState();
	const [spellCheck, setSpellCheck] = useState("");
	const [awaitingPaymentItems, setAwaitingPaymentItems] = useState([]);
	const [allNotifications, setAllNotifications] = useState([]);

	return (
		<UserContext.Provider
			value={{
				loggedIn,
				setLoggedIn,
				user,
				setUser,
				awaitingPaymentItems,
				setAwaitingPaymentItems,
			}}
		>
			<NotificationContext.Provider
				value={{ allNotifications, setAllNotifications }}
			>
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
			</NotificationContext.Provider>
		</UserContext.Provider>
	);
};
