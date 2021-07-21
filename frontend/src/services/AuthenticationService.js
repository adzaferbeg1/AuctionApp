import axios from "axios";
import { decode } from 'jsonwebtoken'


class AuthenticationService {
  signin = (email, password) => {
    return axios.post("http://localhost:8080/auth/signin", { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(err => {
        //console.log(err);
        throw err;
      });
  }

  signOut() {
    localStorage.removeItem("user");
  }

  register = async (name, surname, username, email, password) => {
    return axios.post("http://localhost:8080/auth/signup", {
      name,
      surname,
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  validateToken = () => {
    try {
      const token = this.getCurrentUser().token;

      if (token === null)
        return false;
      const exp = decode(token, { complete: true }).payload.exp;
      return Date.now() < exp * 1000;
    } catch (nullError) {
      return false;
    }

  }

  getUserById = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/auth/singleuser?id=" + id);
      return response.data;

    } catch (err) {
    }
  }
}

export default new AuthenticationService();