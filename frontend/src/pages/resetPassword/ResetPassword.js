import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import AuthenticationService from "services/AuthenticationService";
import { LabelNavbar } from "shared/common";
import "./ResetPassword.scss";

export default function ResetPassword() {
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);

	const resetPassword = async () => {
		try {
			const response = await AuthenticationService.resetPassword(email);
			if (response.status === 200) {
				setValidEmail(true);
			}
		} catch (error) {
			alert("Wrong email address");
		}
	};

	return (
		<>
			<LabelNavbar label={"FORGOT PASSWORD"} />
			<div className="forgot-pass">
				<div className="forgot-pass-label">Forgot password</div>
				<div className="forgot-pass-content">
					{!validEmail ? (
						<>
							<p style={{ color: "gray" }}>
								Lost your password? Please enter your email address. You will
								recieve a link to create a new password via email.
							</p>
							<label>Enter Email</label>
							<input
								type="text"
								placeholder="Insert your email address"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<button onClick={resetPassword}>Submit</button>
						</>
					) : (
						<>
							<p style={{ color: "gray" }}>
								Please check your email. Confirmation link has been sent to{" "}
								{email}
							</p>
							<button onClick={() => setValidEmail(false)}>
								<IoIosArrowBack /> Use another email
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
}
