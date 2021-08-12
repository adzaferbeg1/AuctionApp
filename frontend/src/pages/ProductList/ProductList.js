import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import CategoryService from "../../services/CategoryService";
import ItemService from "../../services/ItemService";
import { LabelNavbar } from "../../shared/common";
import { GridView } from "../../shared/common";
import { ListView } from "../../shared/common";
import { purpleColor } from "../../shared/styles/PageStyles";
import "./ProductList.scss";

const ProductList = (props) => {
	const [categoryId, setCategoryId] = useState(props.location.state.categoryId);
	const [fromLandingPage, setFromLandingPage] = useState(
		props.location.state.fromLandingPage
	);
	const [itemsFromLanding, setItemsFromLanding] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	const [allFilteredItems, setAllFilteredItems] = useState([]);
	const [gridView, setGridView] = useState(true);
	const history = useHistory();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const allCat = await CategoryService.getAllCategories();
				setAllCategories(allCat);
				const itemsChosenFromLanding = await ItemService.getFilteredByCategory(
					categoryId
				);
				setItemsFromLanding(itemsChosenFromLanding);
				const filteredItems = [];
				allCat.map(async (category) => {
					const filtered = await ItemService.getFilteredByCategory(category.id);
					filteredItems[category.id - 1] = filtered;
				});
				setAllFilteredItems(filteredItems);
			} catch (e) {
				console.error(e);
			}
		};

		fetchItems();
	}, [categoryId]);

	return (
		<>
			<LabelNavbar label={"ITEMS"} />
			<div className="grid-list-btn">
				<button
					autoFocus
					onClick={() => {
						setGridView(true);
					}}
				>
					{" "}
					<BsFillGrid3X3GapFill /> Grid
				</button>
				<button
					onClick={() => {
						setGridView(false);
					}}
				>
					{" "}
					<FaThList /> List
				</button>
			</div>
			<div className="product-container">
				<div className="col-sm-4">
					<h6 style={purpleColor}>PRODUCT CATEGORIES</h6>
					{allCategories.length !== 0
						? allCategories.map((category) => (
								<p
									onClick={() => {
										setCategoryId(category.id);
										setFromLandingPage(false);
									}}
								>
									{category.title}
								</p>
						  ))
						: null}
				</div>
				<div className="col-md-8">
					{gridView
						? allFilteredItems.length !== 0 && !fromLandingPage
							? allFilteredItems[categoryId - 1].map((item) => (
									<GridView
										id={item.id}
										name={item.name}
										startPrice={item.currentPrice}
										imgUrl={item.imgUrl}
									/>
							  ))
							: itemsFromLanding.map((item) => (
									<GridView
										id={item.id}
										name={item.name}
										imgUrl={item.imgUrl}
										startPrice={item.currentPrice}
										onClick={() =>
											history.push({
												pathname: "/shop",
												state: { item: item },
											})
										}
									/>
							  ))
						: allFilteredItems.length !== 0 && !fromLandingPage
						? allFilteredItems[categoryId - 1].map((item) => (
								<ListView
									id={item.id}
									name={item.name}
									description={item.description}
									startPrice={item.currentPrice}
									imgUrl={item.imgUrl}
								/>
						  ))
						: itemsFromLanding.map((item) => (
								<ListView
									id={item.id}
									name={item.name}
									description={item.description}
									imgUrl={item.imgUrl}
									startPrice={item.currentPrice}
									onClick={() =>
										history.push({
											pathname: "/shop",
											state: { item: item },
										})
									}
								/>
						  ))}
				</div>
			</div>
		</>
	);
};

export default ProductList;
