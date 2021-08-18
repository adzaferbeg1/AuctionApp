import React from "react";
import { LabelNavbar } from "../../shared/common";
import "./MyAccountTabs.scss";

const Settings = () => {
	return (
		<div className="settings-tab">
			<div className="deactivate">
				<LabelNavbar label={"ACCOUNT"} />
				<div className="content-below-nav">
					<p>Do you want to deactivate account?</p>
					<button>DEACTIVATE</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
