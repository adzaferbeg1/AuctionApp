import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import { LabelNavbar } from "../../shared/common";
import { useUserContext } from "../../AppContext";
import "./MyAccountTabs.scss";

const Settings = ({ user }) => {
	const [userId, setUserId] = useState();
	const { setLoggedIn } = useUserContext();
	const history = useHistory();

	useEffect(() => {
		setUserId(user.id);
	}, []);

	const deactivateAccount = async () => {
		await AuthenticationService.deactivateAccount(userId);
		AuthenticationService.signOut();
		setLoggedIn(false);
		history.push("/register");
	};

	return (
		<div className="settings-tab">
			<div className="deactivate">
				<LabelNavbar label={"ACCOUNT"} />
				<div className="content-below-nav">
					<p>Do you want to deactivate account?</p>
					<button onClick={deactivateAccount}>DEACTIVATE</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
