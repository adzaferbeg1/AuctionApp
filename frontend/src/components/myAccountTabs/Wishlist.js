import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import WishlistService from "services/WishlistService";
import { isAuctionClosed } from "utils/DateUtils";
import "./MyAccountTabs.scss";

export default function Wishlist({ user }) {
	const history = useHistory();
	const [wishlistItems, setWishlistItems] = useState([]);

	useEffect(() => {
		const fecthData = async () => {
			const wishlistItems = await WishlistService.getWishlistItems(user.id);
			setWishlistItems(wishlistItems);
		};
		fecthData();
	}, [user.id]);

	const bidOnItem = (item) => {
		history.push({
			pathname: "/shop",
			state: { item: item },
		});
	};

	const removeItemFromWishlist = async (item) => {
		const updatedList = wishlistItems.filter((o) => o.item !== item);
		setWishlistItems(updatedList);
		await WishlistService.removeItemFromWishlist(user, item);
	};

	return (
		<div className="wishlist">
			<Table variant="gray-transparent" responsive>
				<thead>
					<tr className="product-table-header">
						<th>Item</th>
						<th colSpan="2">Name</th>
						<th>Time Left</th>
						<th>Highest Bid</th>
						<th>Status</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{wishlistItems.length !== 0 ? (
						wishlistItems.map((wishlist) => (
							<tr key={wishlist.person.id + " - " + wishlist.item.id}>
								<td colSpan="2">
									<img
										alt={wishlist.item.name}
										src={wishlist.item.imgUrl}
									></img>
								</td>
								<td>
									{wishlist.item.name} <br /> <p>#{wishlist.item.id} </p>
								</td>
								<td>{wishlist.item.endDate.substr(0, 9)}</td>
								<td
									style={
										isAuctionClosed(wishlist.item.endDate)
											? { color: "black" }
											: { color: "green" }
									}
								>
									${wishlist.item.currentPrice}
								</td>
								<td>
									{isAuctionClosed(wishlist.item.endDate) ? (
										<p className="status-cell" style={{ color: "red" }}>
											CLOSED
										</p>
									) : (
										<p className="status-cell" style={{ color: "green" }}>
											OPEN
										</p>
									)}
								</td>
								<td className="btn-col">
									<button
										onClick={() => bidOnItem(wishlist.item)}
										disabled={isAuctionClosed(wishlist.item.endDate)}
									>
										Bid
									</button>
								</td>
								<td className="trash-icon-col">
									<FaTrashAlt
										onClick={() => removeItemFromWishlist(wishlist.item)}
									/>
								</td>
							</tr>
						))
					) : (
						<tr key={"missing-bids"}>
							<td colSpan="3">You have no items in Wishlist</td>
							<td></td>
							<td></td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}
