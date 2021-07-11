import React, { useState }  from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Register.css';
import Authentication from '../../services/AuthenticationService'
import LabelNavbar from '../../shared/common/navbar/LabelNavbar';


function Register(){

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputStyle = {width: "450px", margin: "auto", boxShadow: "1px 3px #e3e3e3", backgroundColor: "#fafafa"}


const submitButton = async (e) =>{
  await Authentication.register(name,surname,name+surname,email,password);
  e.preventDefault();
}

  


  return(
    <>
          <LabelNavbar label={"REGISTER"} />
  
  <Form className="register-form" onSubmit={submitButton}>
  <h4 class="register-h4">REGISTER</h4>
  <Form.Group >
      <Form.Label className="reg-label">First Name</Form.Label>
      <Form.Control style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)} name="name" />
      
    </Form.Group>
    <Form.Group >
      <Form.Label className="reg-label">Last Name</Form.Label>
      <Form.Control style={inputStyle} type="text"  value={surname} onChange={e => setSurname(e.target.value)} name="surname"/>
     
    </Form.Group>
    <Form.Group >
      <Form.Label className="reg-label">Enter Email</Form.Label>
      <Form.Control style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email"/>
      
    </Form.Group>
    <Form.Group >
      <Form.Label className="reg-label">Password</Form.Label>
      <Form.Control style={inputStyle} type="password"  value={password} onChange={e => setPassword(e.target.value)} name="password"/>
      
    </Form.Group>
    <Button type="submit" id="reg-button" variant="primary" size="lg" block>
      REGISTER
    </Button>
    <p style={{marginTop:"20px"}}>Already have an account? <a href="/login" style={{color:"#8367d8", fontWeight:"bold"}}>LogIn</a></p>
    
  </Form>
  </>
  );
}
    


export default Register;