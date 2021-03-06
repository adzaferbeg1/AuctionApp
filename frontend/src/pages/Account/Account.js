import React, { useState } from "react";
import { BsFillPersonFill, BsListUl, BsGearFill } from "react-icons/bs";
import { ImHammer2 } from "react-icons/im";
import { LabelNavbar } from "../../shared/common";
import {
	Profile,
	Seller,
	Settings,
	Bids,
} from "../../components/myAccountTabs/index";
import { useUserContext } from "../../AppContext";
import "./Account.scss";

export default function Account() {
	const [showProfile, setShowProfile] = useState(true);
	const [showSeller, setShowSeller] = useState(false);
	const [showBids, setShowBids] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const { user } = useUserContext();
	const activeButton = { backgroundColor: "#8367d8", color: "white" };
	const inactiveButton = { backgroundColor: "#f0efef", color: "black" };

	const renderComponents = () => {
		if (user !== undefined) {
			if (showProfile) {
				return <Profile user={user} />;
			} else if (showSeller) {
				return <Seller user={user} />;
			} else if (showBids) {
				return <Bids user={user} />;
			} else if (showSettings) {
				return <Settings user={user} />;
			}
		}
	};

	return (
		<>
			<LabelNavbar label={"MY ACCOUNT"} />
			<div className="my-account">
				<div className="button-menu">
					<button
						id="btn-profile"
						onClick={() => {
							setShowProfile(true);
							setShowSeller(false);
							setShowBids(false);
							setShowSettings(false);
						}}
						style={showProfile ? activeButton : inactiveButton}
					>
						<BsFillPersonFill /> Profile
					</button>
					<button
						id="btn-seller"
						onClick={() => {
							setShowProfile(false);
							setShowSeller(true);
							setShowBids(false);
							setShowSettings(false);
						}}
						style={showSeller ? activeButton : inactiveButton}
					>
						<BsListUl /> Seller
					</button>
					<button
						id="btn-bids"
						onClick={() => {
							setShowProfile(false);
							setShowSeller(false);
							setShowBids(true);
							setShowSettings(false);
						}}
						style={showBids ? activeButton : inactiveButton}
					>
						<ImHammer2 /> Bids
					</button>
					<button
						id="btn-setting"
						onClick={() => {
							setShowProfile(false);
							setShowSeller(false);
							setShowBids(false);
							setShowSettings(true);
						}}
						style={showSettings ? activeButton : inactiveButton}
					>
						<BsGearFill /> Settings
					</button>
				</div>
				<div className="page-content">{renderComponents()}</div>
			</div>
		</>
	);
}
