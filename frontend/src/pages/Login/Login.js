import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import LabelNavbar from '../../shared/common/navbar/LabelNavbar';
import '../Register/Register.css';
import Authentication from '../../services/AuthenticationService'

function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const inputStyle = {width: "450px", margin: "auto", boxShadow: "1px 3px #e3e3e3", backgroundColor: "#fafafa"}
    const buttonStyle = {width: "450px", margin: "auto", backgroundColor: "#8367d8", marginTop: "40px", marginBottom: "40px"}

    const loginButton = async (event) =>{
        event.preventDefault();

    Authentication
        .signin(email, password)
      .then(
        () => {
          history.push('/myaccount');
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
          //this.setState({error: "Can not signin successfully ! Please check email/password again"});
        }
    );
      }

    return (
        <>

        <LabelNavbar label={"LOGIN"} />

        <Form className="register-form" onSubmit={loginButton}>
  <h4 class="register-h4">LOGIN</h4>
  
    <Form.Group >
      <Form.Label className="reg-label">Enter Email</Form.Label>
      <Form.Control style={inputStyle}  type="email"  value={email} onChange={e => setEmail(e.target.value)} name="email"/>
      
    </Form.Group>
    <Form.Group >
      <Form.Label className="reg-label">Password</Form.Label>
      <Form.Control style={inputStyle}  type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"/>
      
    </Form.Group>
    <Form.Check type="checkbox" label="Remember me" className="reg-label" style={{marginBottom: "20px"}} />
    <Button style={buttonStyle} type="submit" id="log-button" variant="primary" size="lg" block>
      LOGIN
    </Button>
    
  </Form>
        </>
    );

}

export default Login;