import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import ItemService from "../../services/ItemService";
import "./MyAccountTabs.scss";

const Bids = ({ user }) => {
	const [userBids, setUserBids] = useState([]);
	const history = useHistory();
	const greenText = { color: "rgb(9, 170, 9)" };
	const blueText = { color: "blue" };
	const grayText = { color: "gray" };

	useEffect(() => {
		const fecthData = async () => {
			const userBids = await AuthenticationService.findUserBids(user.id);
			setUserBids(userBids);
			console.log(userBids[0]);
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
					{userBids.length !== 0 ? (
						userBids.map((bid, index) => (
							<tr key={index + ": userBid: " + bid[0]}>
								<td colSpan="2">
									<img alt={bid[2]} src={bid[0]}></img>
								</td>
								<td>
									{bid[2]} <br /> <p>#{bid[1]} </p>
								</td>
								<td>Time left</td>
								<td style={bid[4] === bid[6] ? greenText : grayText}>
									${bid[4]}
								</td>
								<td>{bid[5]}</td>
								<td style={bid[4] === bid[6] ? greenText : blueText}>
									${bid[6]}
								</td>
								<td>
									<button onClick={() => shopItem(bid[1])}>VIEW</button>
								</td>
							</tr>
						))
					) : (
						<tr key={"missing-bids"}>
							<td colSpan="2">You have not placed any bids</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default Bids;
