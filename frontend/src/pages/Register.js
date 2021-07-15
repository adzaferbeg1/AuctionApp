import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Authentication from '../services/AuthenticationService'
import { LabelNavbar } from '../shared/common';
import { registerInput, registerLink, registerPlainText } from '../shared/styles/PageStyles';

import '../shared/styles/RegisterLogin.scss';


function Register() {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitButton = async (e) => {
    await Authentication.register(name, surname, name + surname, email, password);
    e.preventDefault();
  }




  return (
    <>
      <LabelNavbar label={"REGISTER"} />

      <Form className="register-form" onSubmit={submitButton}>
        <h4 className="register-heading">REGISTER</h4>
        <Form.Group >
          <Form.Label className="reg-label">First Name</Form.Label>
          <Form.Control style={registerInput} type="text" value={name} onChange={e => setName(e.target.value)} name="name" />

        </Form.Group>
        <Form.Group >
          <Form.Label className="reg-label">Last Name</Form.Label>
          <Form.Control style={registerInput} type="text" value={surname} onChange={e => setSurname(e.target.value)} name="surname" />

        </Form.Group>
        <Form.Group >
          <Form.Label className="reg-label">Enter Email</Form.Label>
          <Form.Control style={registerInput} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />

        </Form.Group>
        <Form.Group >
          <Form.Label className="reg-label">Password</Form.Label>
          <Form.Control style={registerInput} type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />

        </Form.Group>
        <Button type="submit" id="reg-button" variant="primary" size="lg" block>
          REGISTER
        </Button>
        <p style={registerPlainText}>Already have an account? <a href="/login" style={registerLink}>LogIn</a></p>

      </Form>
    </>
  );
}



export default Register;