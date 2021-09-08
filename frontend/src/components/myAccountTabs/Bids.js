import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import BidService from "../../services/BidService";
import ItemService from "../../services/ItemService";
import { isAuctionClosed } from "../../utils/DateUtils";
import "./MyAccountTabs.scss";

const Bids = ({ user }) => {
	const [userBids, setUserBids] = useState([]);
	const history = useHistory();
	const greenText = { color: "rgb(9, 170, 9)" };
	const blueText = { color: "blue" };
	const grayText = { color: "gray" };
	const [closedBids, setClosedBids] = useState();

	useEffect(() => {
		const fecthData = async () => {
			const userBids = await AuthenticationService.findUserBids(user.id);
			setUserBids(userBids);
			let closedBids = await BidService.getAllClosedBids(user.id);
			setClosedBids(closedBids.filter((bid) => bid[1] === user.id));
		};

		fecthData();
	}, [user.id]);

	const shopItem = async (itemId) => {
		const item = await ItemService.getItemById(itemId);
		history.push({
			pathname: "/shop",
			state: { item: item },
		});
	};

	const finishPayment = async (itemId) => {
		const item = await ItemService.getItemById(itemId);
		history.push({
			pathname: "/payment",
			state: { item: item },
		});
	};

	const displayPayButton = (itemId, highestBid, placedBid, endDate) => {
		if (closedBids !== undefined) {
			for (let i = 0; i < closedBids.length; i++) {
				if (closedBids[i][0] === itemId &&
					closedBids[i][2] === highestBid &&
					highestBid === placedBid &&
					isAuctionClosed(endDate)
				) {
					return (
						<button className="pay-btn" onClick={() => finishPayment(itemId)}>
							Pay
						</button>
					);
				}
			}
		}
	};

	return (
		<div className="bidders">
			<Table variant="gray-transparent" responsive>
				<thead>
					<tr className="product-table-header">
						<th>Item</th>
						<th colSpan="2">Name</th>
						<th>Time Left</th>
						<th>Your Price</th>
						<th>No. bids</th>
						<th>Highest Bid</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{userBids.length !== 0 && closedBids !== undefined ? (
						userBids.map((bid, index) => (
							<tr key={index + ": userBid: " + bid[0]}>
								<td colSpan="2">
									<img alt={bid[2]} src={bid[0]}></img>
								</td>
								<td>
									{bid[2]} <br /> <p>#{bid[1]} </p>
								</td>
								<td>{bid[3].substr(0, 9)}</td>
								<td style={bid[4] === bid[6] ? greenText : grayText}>
									${bid[4]}
								</td>
								<td>{bid[5]}</td>
								<td style={bid[4] === bid[6] ? greenText : blueText}>
									${bid[6]}
								</td>
								<td className="btn-col">
									<button onClick={() => shopItem(bid[1])}>View</button>
									{displayPayButton(bid[1], bid[6], bid[4], bid[3])}
								</td>
							</tr>
						))
					) : (
						<tr key={"missing-bids"}>
							<td colSpan="3">You have not placed any bids</td>
							<td></td>
							<td></td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default Bids;
