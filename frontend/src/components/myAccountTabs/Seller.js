import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { HiOutlineShoppingBag, HiChevronRight, HiPlus } from "react-icons/hi";
import ItemService from "services/ItemService";

const Seller = ({ user }) => {
	const [activeBtn, setActiveBtn] = useState(true);
	const [activeItems, setActiveItems] = useState([]);
	const [soldItems, setSoldItems] = useState([]);
	const [renderedItems, setRenderedItems] = useState([]);
	const activeButton = { backgroundColor: "#8367d8", color: "white" };
	const inactiveButton = { backgroundColor: "#f0efef", color: "black" };
	const greenText = { color: "rgb(9, 170, 9)" };
	const blueText = { color: "blue" };
	const grayText = { color: "gray" };
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const activeItems = await ItemService.getActiveSellerItems(user.id);
			setActiveItems(activeItems);
			const soldItems = await ItemService.getSoldSellerItems(user.id);
			setSoldItems(soldItems);
			if (activeBtn) setRenderedItems(activeItems);
			else setRenderedItems(soldItems);
		};

		fetchData();
	}, [activeBtn, user.id]);

	const shopItem = async (itemId) => {
		const item = await ItemService.getItemById(itemId);
		history.push({
			pathname: "/shop",
			state: { item: item },
		});
	};

	const renderItems = () => {
		if (renderedItems.length !== 0) {
			return (
				<Table variant="gray-transparent" responsive>
					<thead>
						<tr className="product-table-header">
							<th>Item</th>
							<th colSpan="2">Name</th>
							<th>Time Left</th>
							<th>Your Price</th>
							<th>Highest Bid</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{renderedItems.map((item, index) => (
							<tr key={index + ": userItem: " + item.id}>
								<td colSpan="2">
									<img alt={item.name} src={item.imgUrl}></img>
								</td>
								<td>
									{item.name} <br /> <p>#{item.id} </p>
								</td>
								<td>{item.endDate.substr(0, 9)}</td>
								<td
									style={
										item.startPrice === item.currentPrice ? greenText : grayText
									}
								>
									${item.startPrice}
								</td>
								<td
									style={
										item.startPrice === item.currentPrice ? greenText : blueText
									}
								>
									${item.currentPrice}
								</td>
								<td>
									<button onClick={() => shopItem(item.id)}>View</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			);
		} else if (renderedItems.length === 0) {
			return (
				<div className="start-selling">
					<div className="sell-nav">SELL</div>
					<div className="sell-content">
						<HiOutlineShoppingBag />
						<p>You do not have any scheduled items for sale</p>
						<button onClick={() => history.push("/sell")}>
							START SELLING <HiChevronRight />
						</button>
					</div>
				</div>
			);
		}
	};

	return (
		<div className="sellers">
			<div className="switch-btn">
				<div className="right-tab">
					<button
						style={activeBtn ? activeButton : inactiveButton}
						onClick={() => {
							setActiveBtn(true);
							setRenderedItems(activeItems);
						}}
					>
						Active
					</button>
					<button
						style={!activeBtn ? activeButton : inactiveButton}
						onClick={() => {
							setActiveBtn(false);
							setRenderedItems(soldItems);
						}}
					>
						Sold
					</button>
				</div>
				<div className="left-tab">
					<button className="add-btn" onClick={() => history.push("/sell")}>
						<HiPlus /> Add item
					</button>
				</div>
			</div>
			{renderItems()}
		</div>
	);
};

export default Seller;
