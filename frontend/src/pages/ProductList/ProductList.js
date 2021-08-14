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
	const [allCategories, setAllCategories] = useState([]);
	const [gridView, setGridView] = useState(true);
	const [chosenItems, setChosenItems] = useState([]);
	const history = useHistory();

	const lowPriceSorting = async () => {
		const lowPrice = await ItemService.getLowPriceSort(categoryId);
		setChosenItems(lowPrice);
	};

	const highPriceSorting = async () => {
		const highPrice = await ItemService.getHighPriceSort(categoryId);
		setChosenItems(highPrice);
	};

	const defaultSorting = async () => {
		const defaultSort = await ItemService.getDefaultSort(categoryId);
		setChosenItems(defaultSort);
	};

	const newToOldSorting = async () => {
		const defaultSort = await ItemService.getNewToOldSort(categoryId);
		setChosenItems(defaultSort);
	};

	const timeLeftSorting = async () => {
		const defaultSort = await ItemService.getTimeLeftSort(categoryId);
		setChosenItems(defaultSort);
	};

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const allCategories = await CategoryService.getAllCategories();
				setAllCategories(allCategories);
				const chosenItems = await ItemService.getFilteredByCategory(categoryId);
				setChosenItems(chosenItems);
			} catch (e) {
				console.error(e);
			}
		};

		fetchItems();
	}, [categoryId]);

	const sortItems = async (value) => {
		switch (value) {
			case "default":
				await defaultSorting();
				break;
			case "low":
				await lowPriceSorting();
				break;
			case "new":
				newToOldSorting();
				break;
			case "old":
				timeLeftSorting();
				break;
			case "high":
				await highPriceSorting();
				break;
			default:
				console.log(`Error`);
		}
	};

	return (
		<>
			<LabelNavbar label={"ITEMS"} />
			<div className="grid-list-btn">
				<select
					className="sorting-menu"
					onChange={async (e) => {
						await sortItems(e.target.value);
					}}
				>
					<option value="default">Default sorting</option>
					<option value="new">Added: New to Old</option>
					<option value="old">Time left</option>
					<option value="low">Price: Low to High</option>
					<option value="high">Price: High to Low</option>
				</select>
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
									}}
								>
									{category.title}
								</p>
						  ))
						: null}
				</div>
				<div className="col-md-8">
					{gridView
						? chosenItems.length !== 0
							? chosenItems.map((item) => (
									<GridView
										id={item.id}
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
							  ))
							: null
						: chosenItems.length !== 0
						? chosenItems.map((item) => (
								<ListView
									id={item.id}
									name={item.name}
									description={item.description}
									startPrice={item.currentPrice}
									imgUrl={item.imgUrl}
									onClick={() =>
										history.push({
											pathname: "/shop",
											state: { item: item },
										})
									}
								/>
						  ))
						: null}
				</div>
			</div>
		</>
	);
};

export default ProductList;
