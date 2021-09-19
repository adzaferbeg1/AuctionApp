import axios from "axios";
import { decode } from "jsonwebtoken";
import { SetAuthorisationHeader } from "config/AppConfig";

class AuthenticationService {
	signin = (email, password) => {
		return axios
			.post("auth/sign-in", { email, password })
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				return response.data;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	signOut() {
		localStorage.removeItem("user");
	}

	register = async (name, surname, username, email, password) => {
		return axios.post("auth/sign-up", {
			name,
			surname,
			username,
			email,
			password,
		});
	};

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	validateToken = () => {
		if (this.getCurrentUser() !== null) {
			try {
				const token = this.getCurrentUser().token;

				if (token === null) return false;
				const exp = decode(token, { complete: true }).payload.exp;
				return Date.now() < exp * 1000;
			} catch (nullError) {
				console.error(nullError);
				return false;
			}
		} else {
			return false;
		}
	};

	findUserByEmail = async (email) => {
		try {
			const response = await axios.get("auth/user-email?email=" + email);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	updateInformation = async (name,
		surname,
		birthDate,
		phoneNo,
		email,
		address,
		sex,
		id
	) => {
		const auth = SetAuthorisationHeader();
		return axios.post(
			"auth/update-information",
			{
				name,
				surname,
				birthDate,
				phoneNo,
				email,
				address,
				sex,
				id,
			},
			auth
		);
	};

	deactivateAccount = async (id) => {
		try {
			const auth = SetAuthorisationHeader();
			await axios.get("auth/delete-user?id=" + id, auth);
		} catch (err) {
			console.error(err);
		}
	};

	findUserBids = async (id) => {
		try {
			const auth = SetAuthorisationHeader();
			const response = await axios.get("auth/user-bids?id=" + id, auth);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getUserAddress = async (id) => {
		try {
			const auth = SetAuthorisationHeader();
			const response = await axios.get("auth/user-address?id=" + id, auth);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	resetPassword = async (email) => {
		return axios
			.post("auth/reset-password?email=" + email)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	saveNewPassword = async (token, password, email) => {
		return axios
			.post(
				"auth/save-new-password",
				{
					password: password,
					email: email,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};
}

export default new AuthenticationService();
