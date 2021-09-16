import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Authentication from "services/AuthenticationService";
import { LabelNavbar } from "shared/common";
import {
	registerInput,
	registerLink,
	registerPlainText,
} from "shared/styles/PageStyles";

import "shared/styles/RegisterLogin.scss";

export default function Register() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const submitButton = async (e) => {
		e.preventDefault();
		Authentication.register(
			name,
			surname,
			name + surname,
			email,
			password
		).then(
			() => {
				history.push("/login");
				alert("Registration successful");
			},
			(error) => {
				console.error(error);
				const invalidMessage = validateInput(name, surname, email, password);
				alert(invalidMessage);
			}
		);
	};

	const validateInput = (name, surname, email, password) => {
		if (name.length < 2 || surname.length < 2)
			return "Name or surname must contain 2 or more characters";
		if (email.length < 7) return "Invalid email form";
		if (password.length < 6) return "Password must be longer";
	};

	return (
		<div className="reg-login">
			<LabelNavbar label={"REGISTER"} />

			<Form className="register-form" onSubmit={submitButton}>
				<h4 className="register-heading">REGISTER</h4>
				<Form.Group>
					<Form.Label className="reg-label">First Name</Form.Label>
					<Form.Control
						style={registerInput}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						name="name"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="reg-label">Last Name</Form.Label>
					<Form.Control
						style={registerInput}
						type="text"
						value={surname}
						onChange={(e) => setSurname(e.target.value)}
						name="surname"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="reg-label">Enter Email</Form.Label>
					<Form.Control
						style={registerInput}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="reg-label">Password</Form.Label>
					<Form.Control
						style={registerInput}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						required
					/>
				</Form.Group>
				<Button type="submit" id="reg-button" variant="primary" size="lg" block>
					REGISTER
				</Button>
				<p style={registerPlainText}>
					Already have an account?{" "}
					<a href="/login" style={registerLink}>
						LogIn
					</a>
				</p>
			</Form>
		</div>
	);
}
