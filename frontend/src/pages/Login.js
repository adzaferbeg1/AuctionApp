import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { LabelNavbar } from "../shared/common";
import Authentication from "../services/AuthenticationService";
import { loginInput, loginButtonStyle } from "../shared/styles/PageStyles";
import { useUserContext } from ".././AppContext";

import "../shared/styles/RegisterLogin.scss";

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const history = useHistory();
	const { setLoggedIn, setUser } = useUserContext();

	const loginButton = async (event) => {
		event.preventDefault();
		Authentication.signin(email, password).then(
			() => {
				findUserByEmail(email).then(
					() => {
						history.push("/myaccount");
					},
					(error) => {
						console.error(error);
					}
				);
			},
			(error) => {
				console.error(error);
				alert("Invalid email or password! Try again");
			}
		);
	};

	const findUserByEmail = async (email) => {
		const user = await Authentication.findUserByEmail(email);
		setUser(user);
		setLoggedIn(true);
	};

	return (
		<div className="reg-login">
			<LabelNavbar label={"LOGIN"} />

			<Form className="register-form" onSubmit={loginButton}>
				<h4 className="register-heading">LOGIN</h4>

				<Form.Group>
					<Form.Label className="reg-label">Enter Email</Form.Label>
					<Form.Control
						style={loginInput}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						name="email"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="reg-label">Password</Form.Label>
					<Form.Control
						style={loginInput}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						name="password"
					/>
				</Form.Group>
				<Form.Check
					type="checkbox"
					label="Remember me"
					className="reg-label"
					style={{ marginBottom: "20px" }}
					defaultChecked
				/>
				<Button
					style={loginButtonStyle}
					type="submit"
					variant="primary"
					size="lg"
					block
				>
					LOGIN
				</Button>
			</Form>
		</div>
	);
}
