import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthenticationService from "services/AuthenticationService";
import { LabelNavbar } from "shared/common";
import PageNotFound from "shared/common/pageNotFound/PageNotFound";
import { isTokenValid } from "utils/DateUtils";
import "./ResetPassword.scss";

export default function VerifyPassword() {
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();
	const [validToken, setValidToken] = useState(false);
	const [token, setToken] = useState();
	const [email, setEmail] = useState();
	const history = useHistory();

	useEffect(() => {
		const url = window.location.href;
		const params = new URLSearchParams(url.substr(url.indexOf("?") + 1));
		const token = params.get("token");
		if (isTokenValid(token)) {
			setToken(token);
			setValidToken(true);
			const email = params.get("email");
			setEmail(email);
		}
	}, []);

	const saveNewPassword = async () => {
		if (password === repeatPassword) {
			await AuthenticationService.saveNewPassword(token, password, email);
			history.push("/login");
		} else {
			alert("Password must match");
		}
	};

	return (
		<>
			{validToken ? (
				<>
					<LabelNavbar label={"FORGOT PASSWORD"} />
					<div className="forgot-pass">
						<div className="forgot-pass-label">New Password</div>
						<div className="forgot-pass-content">
							<p style={{ color: "#8367d8" }}>
								Please enter your new password below
							</p>
							<label>Enter Password</label>
							<input
								type="password"
								placeholder="Insert your new password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<label>Repeat Password</label>
							<input
								type="password"
								placeholder="Repeat your new password"
								value={repeatPassword}
								onChange={(e) => {
									setRepeatPassword(e.target.value);
								}}
							/>
							<button onClick={saveNewPassword}>Confirm</button>
						</div>
					</div>
				</>
			) : (
				<PageNotFound />
			)}
		</>
	);
}
