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
      console.log(token);
      return Date.now() < exp * 1000;
    } catch (nullError) {
      return false;
    }

  }

  /*

   validateToken = async() => {
    const user = this.getCurrentUser();
  
    if(user != null) {
      console.log("TOKEEEEEEEEEEEEN ->"+user.token);
     try{
        
          const response = await axios.get("http://localhost:8080/auth/verify", {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
         
          
        if(response.status == 200) {
          localStorage.setItem('user', JSON.stringify(response.data)); 
         
          return true;
        }
     }catch(e){
          console.log("VRAĆAM FALSE JER SAM 401" + e);
          return false;
     }
    

    } 
    
    return false;
    

  }
  */
}

export default new AuthenticationService();