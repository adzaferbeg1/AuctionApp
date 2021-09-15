import axios from "axios";
import { decode } from "jsonwebtoken";

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
		return axios.post("auth/update-information", {
			name,
			surname,
			birthDate,
			phoneNo,
			email,
			address,
			sex,
			id,
		});
	};

	deactivateAccount = async (id) => {
		try {
			await axios.get("auth/delete-user?id=" + id);
		} catch (err) {
			console.error(err);
		}
	};

	findUserBids = async (id) => {
		try {
			const response = await axios.get("auth/user-bids?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getUserAddress = async (id) => {
		try {
			const response = await axios.get("auth/user-address?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new AuthenticationService();
