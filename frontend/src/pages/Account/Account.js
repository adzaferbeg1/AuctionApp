import React, { useEffect, useState } from "react";
import { BsFillPersonFill, BsListUl, BsGearFill } from "react-icons/bs";
import { ImHammer2 } from "react-icons/im";
import { LabelNavbar } from "../../shared/common";
import {
	Profile,
	Seller,
	Settings,
	Bids,
} from "../../components/myAccountTabs/index";
import "./Account.scss";
import { useUserContext } from "../../AppContext";

export default function Account() {
	const [showProfile, setShowProfile] = useState(true);
	const [showSeller, setShowSeller] = useState(false);
	const [showBids, setShowBids] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const { user } = useUserContext();
	const activeButton = { backgroundColor: "#8367d8", color: "white" };
	const inactiveButton = { backgroundColor: "#f0efef", color: "black" };

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
				<div className="page-content">
					{showProfile && user.length !== 0 ? <Profile user={user} /> : null}
					{showSeller && user.length !== 0 ? <Seller user={user} /> : null}
					{showBids && user.length !== 0 ? <Bids user={user} /> : null}
					{showSettings && user.length !== 0 ? <Settings user={user} /> : null}
				</div>
			</div>
		</>
	);
}
