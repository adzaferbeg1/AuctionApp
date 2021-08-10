import axios from "axios";
import { decode } from "jsonwebtoken";

class AuthenticationService {
	signin = (email, password) => {
		return axios
			.post("auth/signin", { email, password })
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
	};

	register = async (name, surname, username, email, password) => {
		return axios.post("auth/signup", {
			name,
			surname,
			username,
			email,
			password,
		});
	};

	getCurrentUser() {
		return JSON.parse(localStorage.getItem("user"));
	};

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
}

export default new AuthenticationService();
