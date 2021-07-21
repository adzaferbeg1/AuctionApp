import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

import { LabelNavbar } from '../shared/common';
import Authentication from '../services/AuthenticationService'
import { loginInput, loginButtonStyle } from '../shared/styles/PageStyles';

import '../shared/styles/RegisterLogin.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const loginButton = async (event) => {
    event.preventDefault();

    Authentication
      .signin(email, password)
      .then(
        () => {
          history.push('/myaccount');
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
        }
      );
  }

  return (
    <>

      <LabelNavbar label={"LOGIN"} />

      <Form className="register-form" onSubmit={loginButton} val>
        <h4 className="register-heading">LOGIN</h4>

        <Form.Group >
          <Form.Label className="reg-label">Enter Email</Form.Label>
          <Form.Control style={loginInput} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />

        </Form.Group>
        <Form.Group >
          <Form.Label className="reg-label">Password</Form.Label>
          <Form.Control style={loginInput} type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />

        </Form.Group>
        <Form.Check type="checkbox" label="Remember me" className="reg-label" style={{ marginBottom: "20px" }} defaultChecked />
        <Button style={loginButtonStyle} type="submit" variant="primary" size="lg" block>
          LOGIN
        </Button>

      </Form>
    </>
  );

}

export default Login;