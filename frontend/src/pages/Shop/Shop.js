/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import AuthenticationService from "../../services/AuthenticationService";
import BidService from "../../services/BidService";
import ItemService from "../../services/ItemService";
import { LabelNavbar } from "../../shared/common";
import { purpleColor, landingPageButton } from "../../shared/styles/PageStyles";
import "./Shop.scss";

export default function Shop(props) {
	const [itemId] = useState(props.location.state.item.id);
	const [selectedItem, setSelectedItem] = useState([]);
	const [currentPrice, setCurrentPrice] = useState();
	const [userLoggedIn, setUserLoggedIn] = useState();
	const [bid, setBid] = useState("");
	const [bidders, setBidders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [noOfBids, setNoOfBids] = useState(0);

	const alertSuccess = (display) => {
		document.getElementById("highest-bid").style.display = display;
	};

	const alertWarning = (display) => {
		document.getElementById("low-bid").style.display = display;
	};

	useEffect(() => {
		setSelectedItem(props.location.state.item);
		setCurrentPrice(props.location.state.item.currentPrice);
		var loggedIn = AuthenticationService.validateToken();
		setUserLoggedIn(loggedIn);
		var todaysDate = new Date(Date.now()).toISOString();
	}, [props.location.state.item, itemId]);

	useEffect(() => {
		const fetchData = async () => {
			var numberOfBids = await BidService.getNoOfBids(itemId);
			setNoOfBids(numberOfBids);
		};
		fetchData();
	}, [itemId]);

	useEffect(() => {
		const fetchItems = async () => {
			var itemBidders = await BidService.getAllBidders(itemId);
			setBidders(itemBidders);
		};

		fetchItems();
		setIsLoading(false);
	}, [currentPrice, itemId]);

	const placeItemBid = async (e) => {
		if (
			selectedItem.currentPrice < bid ||
			(selectedItem.currentPrice === bid && noOfBids < 1)
		) {
			alertSuccess("flex");
			alertWarning("none");
			setCurrentPrice(bid);
			await BidService.placeBid(
				selectedItem.id,
				AuthenticationService.getCurrentUser().personId,
				bid
			);
			await ItemService.placeBid(bid, selectedItem.id);
			const updatedItem = await ItemService.getItemById(selectedItem.id);
			setSelectedItem(updatedItem);
			setCurrentPrice(updatedItem.currentPrice);
			setNoOfBids(noOfBids + 1);
		} else {
			alertSuccess("none");
			alertWarning("flex");
		}
	};

	window.onload = async () => {
		const updatedItem = await ItemService.getItemById(selectedItem.id);
		setSelectedItem(updatedItem);
		setCurrentPrice(updatedItem.currentPrice);
	};

	if (isLoading) {
		return null;
	}

	return (
		<div className="shop-page">
			<LabelNavbar label={"SINGLE PRODUCT"} />
			<nav className="navbar" id="low-bid">
				<span className="navbar-brand mb-0 h1">
					There are higher bids than yours! Give it another try!
				</span>
			</nav>
			<nav className="navbar" id="highest-bid">
				<span className="navbar-brand mb-0 h1">
					Congrats! You are the highest bidder!
				</span>
			</nav>
			<div className="item-container">
				<div>
					<img src={selectedItem.imgUrl} alt="item-img"></img>
				</div>
				<div className="item-info">
					<h1>{selectedItem.name}</h1>
					<h5 style={purpleColor}>Start from - ${currentPrice}</h5>
					<div className="bid-container">
						<input
							type="text"
							disabled={!userLoggedIn}
							value={bid}
							onChange={(e) => setBid(e.target.value)}
							name="bid"
						></input>
						<button
							style={landingPageButton}
							disabled={!userLoggedIn}
							onClick={placeItemBid}
						>
							PLACE BID <RiArrowRightSLine />{" "}
						</button>
					</div>
					<p>Enter ${currentPrice} or more</p>
					<h6>Highest bid: ${currentPrice}</h6>
					<h6>No bids: {noOfBids}</h6>
					<h6>Time left: {selectedItem.endDate.substring(0, 9)}</h6>
					<h5 className="details-heading">Details</h5>
					<div className="thin-line"></div>
					<p className="item-desc">{selectedItem.description}</p>
				</div>
			</div>
			<div className="bidder-container">
				<Table variant="gray-transparent" responsive>
					<thead>
						<tr className="product-table-header">
							<th colSpan="2">Bidder</th>
							<th>Date</th>
							<th>Bid</th>
						</tr>
					</thead>
					<tbody>
						{bidders !== undefined ? (
							bidders.map((bidder) => (
								<tr key={bidder.bid}>
									<td colSpan="2">
										{bidder.name} {bidder.surname}
									</td>
									<td>{bidder.date.substring(0, 10)}</td>
									<td>${bidder.bid}</td>
								</tr>
							))
						) : (
							<tr key={"no-bids"}>
								<td colSpan="2">No bids to show</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
