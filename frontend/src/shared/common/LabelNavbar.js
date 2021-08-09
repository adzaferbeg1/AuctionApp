import React from "react";

const LabelNavbar = ({ label }) => {
	return (
		<>
			<nav className="navbar navbar-light bg-light">
				<span className="navbar-brand mb-0 h1" id="common-nav-brand">
					{label}
				</span>
			</nav>
		</>
	);
};

export default LabelNavbar;
