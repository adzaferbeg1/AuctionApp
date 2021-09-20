import AuthenticationService from "services/AuthenticationService";

export const SetAuthorisationHeader = () => {
	const token = AuthenticationService.getCurrentUser().token;
	return { headers: { Authorization: `Bearer ${token}` } };
};
