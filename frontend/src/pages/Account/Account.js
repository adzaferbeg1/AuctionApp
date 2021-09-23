import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BsFillPersonFill, BsListUl, BsGearFill } from "react-icons/bs";
import { ImHammer2 } from "react-icons/im";
import { LabelNavbar } from "shared/common";
import {
	Profile,
	Seller,
	Settings,
	Bids,
	Wishlist,
} from "components/myAccountTabs/index";
import { useUserContext } from "AppContext";
import { FaBell, FaCircle, FaGift } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { finishPayment } from "utils/PaymentUtil";
import NotificationService from "services/NotificationService";
import "./Account.scss";
import ItemService from "services/ItemService";

export default function Account() {
	const [showProfile, setShowProfile] = useState(true);
	const [showSeller, setShowSeller] = useState(false);
	const [showBids, setShowBids] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [showWishlist, setShowWishlist] = useState(false);
	const { user } = useUserContext();
	const activeButton = { backgroundColor: "#8367d8", color: "white" };
	const inactiveButton = { backgroundColor: "#f0efef", color: "black" };
	const [showNotifications, setShowNotifications] = useState(false);
	const [userNotifications, setUserNotifications] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const userNotifications =
				await NotificationService.getNotificationsForUser(user.id);
			setUserNotifications(userNotifications.filter((n) => n.seen === false));
		};
		fetchData();
	}, [user]);

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
			} else if (showWishlist) {
				return <Wishlist user={user} />;
			}
		}
	};

	const clickedNotification = async (e, notify) => {
		e.stopPropagation();
		await NotificationService.updateSeenStatus(notify.id);
		if (notify.message.includes("You have been outbid")) {
			const item = await ItemService.getItemById(notify.itemId);
			history.push({
				pathname: "/shop",
				state: { item: item },
			});
		} else {
			finishPayment(notify.itemId, history);
		}
	};

	return (
		<>
			<LabelNavbar label={"MY ACCOUNT"} />
			<div className="my-account">
				<div className="account-main-nav">
					<div className="button-menu">
						<button
							id="btn-profile"
							onClick={() => {
								setShowProfile(true);
								setShowSeller(false);
								setShowBids(false);
								setShowSettings(false);
								setShowWishlist(false);
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
								setShowWishlist(false);
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
								setShowWishlist(false);
							}}
							style={showBids ? activeButton : inactiveButton}
						>
							<ImHammer2 /> Bids
						</button>
						<button
							id="btn-wishlist"
							onClick={() => {
								setShowProfile(false);
								setShowSeller(false);
								setShowBids(false);
								setShowSettings(false);
								setShowWishlist(true);
							}}
							style={showWishlist ? activeButton : inactiveButton}
						>
							<FaGift /> Wishlist
						</button>
						<button
							id="btn-setting"
							onClick={() => {
								setShowProfile(false);
								setShowSeller(false);
								setShowBids(false);
								setShowSettings(true);
								setShowWishlist(false);
							}}
							style={showSettings ? activeButton : inactiveButton}
						>
							<BsGearFill /> Settings
						</button>
					</div>

					<div
						className="notification"
						onClick={() => setShowNotifications(true)}
					>
						<FaBell /> {userNotifications.length !== 0 ? <FaCircle /> : null}
					</div>
					{showNotifications ? (
						<div className="notification-menu">
							<IoCloseOutline onClick={() => setShowNotifications(false)} />
							{userNotifications.length !== 0
								? userNotifications.map((notify) => (
										<p
											id={"notify" + notify.id}
											onClick={(e) => clickedNotification(e, notify)}
										>
											{notify.message}
										</p>
								  ))
								: null}
							<p>Nothing new here</p>
						</div>
					) : null}
				</div>
				<div className="page-content">{renderComponents()}</div>
			</div>
		</>
	);
}
