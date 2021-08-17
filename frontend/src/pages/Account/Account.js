import React from "react";
import { BsFillPersonFill, BsListUl, BsGearFill } from "react-icons/bs";
import { ImHammer2 } from "react-icons/im";
import { LabelNavbar, Profile } from "../../shared/common";
import "./Account.scss";

export default function Account() {
	return (
		<>
			<LabelNavbar label={"MY ACCOUNT"} />
			<div className="my-account">
				<div className="button-menu">
					<button>
						<BsFillPersonFill /> Profile
					</button>
					<button>
						<BsListUl /> Seller
					</button>
					<button>
						<ImHammer2 /> Bids
					</button>
					<button>
						<BsGearFill /> Settings
					</button>
				</div>
				<div className="page-content">
					<Profile />
				</div>
			</div>
		</>
	);
}
