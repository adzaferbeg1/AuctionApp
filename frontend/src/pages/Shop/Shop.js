/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../AppContext";
import Pagination from "../../components/Pagination";
import AuthenticationService from "../../services/AuthenticationService";
import BidService from "../../services/BidService";
import ItemService from "../../services/ItemService";
import { LabelNavbar } from "../../shared/common";
import RelatedItemView from "../../shared/common/RelatedItemView";
import { purpleColor, landingPageButton } from "../../shared/styles/PageStyles";
import { isAuctionClosed } from "../../utils/DateUtils";
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
	const { user } = useUserContext();
	const history = useHistory();
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);
	const [closedAuction, setClosedAuction] = useState();

	const alertSuccess = (display) => {
		document.getElementById("highest-bid").style.display = display;
	};

	const alertWarning = (display) => {
		document.getElementById("low-bid").style.display = display;
	};

	useEffect(() => {
		setSelectedItem(props.location.state.item);
		setClosedAuction(isAuctionClosed(props.location.state.item.endDate));
		setCurrentPrice(props.location.state.item.currentPrice);
		const loggedIn = AuthenticationService.validateToken();
		setUserLoggedIn(loggedIn);
	}, [props.location.state.item, itemId]);

	useEffect(() => {
		const fetchData = async () => {
			const numberOfBids = await BidService.getNoOfBids(itemId);
			setNoOfBids(numberOfBids);
			const relatedProducts = await ItemService.getFilteredByCategory(
				props.location.state.item.categoryId
			);
			if (relatedProducts !== undefined)
				setRelatedProducts(relatedProducts.filter((i) => i.id !== itemId));
		};
		fetchData();
	}, [itemId, props.location.state.item.categoryId]);

	const indexOfLastPage = currentPage * postsPerPage;
	const indexOfFirstPage = indexOfLastPage - postsPerPage;
	let currentBiddersPage = [];

	if (bidders !== undefined) {
		currentBiddersPage = bidders.slice(indexOfFirstPage, indexOfLastPage);
	}

	useEffect(() => {
		const fetchItems = async () => {
			const itemBidders = await BidService.getAllBidders(itemId);
			setBidders(itemBidders);
		};

		fetchItems();
		setIsLoading(false);
	}, [currentPrice, itemId]);

	const placeItemBid = async () => {
		if (selectedItem.currentPrice < bid ||
			(selectedItem.currentPrice === bid && noOfBids < 1))
			{
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

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const enableBidPlacing = () => {
		if (userLoggedIn && !closedAuction) {
			return false;
		} else {
			return true;
		}
	};

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
					{closedAuction ? (
						<h5 style={{ color: "#8367d8", textTransform: "uppercase" }}>
							Auction closed
						</h5>
					) : (
						<h5 style={purpleColor}>
							Start from - ${parseInt(currentPrice) + 1}
						</h5>
					)}
					<div className="bid-container">
						<input
							type="text"
							disabled={enableBidPlacing()}
							value={bid}
							onChange={(e) => setBid(e.target.value)}
							name="bid"
						></input>
						<button
							style={landingPageButton}
							disabled={enableBidPlacing()}
							onClick={placeItemBid}
						>
							PLACE BID <RiArrowRightSLine />{" "}
						</button>
					</div>
					<p>Enter ${parseInt(currentPrice) + 1} or more</p>
					<h6>Highest bid: ${currentPrice}</h6>
					<h6>No bids: {noOfBids}</h6>
					<h6>Time left: {selectedItem.endDate.substring(0, 9)}</h6>
					<h5 className="details-heading">Details</h5>
					<div className="thin-line"></div>
					<p className="item-desc">{selectedItem.description}</p>
				</div>
			</div>
			{user === undefined ||
			(user !== undefined && user.id !== selectedItem.sellerId) ? (
				<div className="related-products">
					<div className="title">Related products</div>
					<div className="grid-card">
						{relatedProducts.map((item, index) => {
							if (index < 3) {
								return (
									<RelatedItemView
										key={item.id + " related-grid"}
										name={item.name}
										startPrice={item.currentPrice}
										imgUrl={item.imgUrl}
										onClick={() =>
											history.push({
												pathname: "/shop",
												state: { item: item },
											})
										}
									/>
								);
							} else {
								return null;
							}
						})}
					</div>
				</div>
			) : null}
			{user !== undefined && user.id === selectedItem.sellerId ? (
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
								currentBiddersPage.map((bidder, index) => (
									<tr key={bidder.bid + index}>
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
					{bidders !== undefined ? (
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={bidders.length}
							paginate={paginate}
						/>
					) : null}
				</div>
			) : null}
		</div>
	);
}
