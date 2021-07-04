import React from 'react';
import {Form, Button} from 'react-bootstrap';
import './Register.css';

function Register(){
    return(
        <>
        <nav class="navbar navbar-light bg-light">
  <span class="navbar-brand mb-0 h1" id="about-brand">REGISTER</span>
</nav>

<Form id="register-form">
<h4 class="register-h4">REGISTER</h4>
<Form.Group controlId="register-group">
    <Form.Label id="reg-label">First Name</Form.Label>
    <Form.Control type="text" id="reg-input"/>
  </Form.Group>
  <Form.Group controlId="register-group">
    <Form.Label id="reg-label">Last Name</Form.Label>
    <Form.Control type="text" id="reg-input" />
  </Form.Group>
  <Form.Group controlId="register-group">
    <Form.Label id="reg-label">Enter Email</Form.Label>
    <Form.Control type="email" id="reg-input"/>
  </Form.Group>
  <Form.Group controlId="register-group">
    <Form.Label id="reg-label">Password</Form.Label>
    <Form.Control type="password" id="reg-input"/>
  </Form.Group>
  <Button id="reg-button" variant="primary" size="lg" block>
    REGISTER
  </Button>
  <p style={{marginTop:"20px"}}>Already have an account? <a href="#" style={{color:"#8367d8", fontWeight:"bold"}}>LogIn</a></p>
</Form>
        </>
    );
}

export default Register;