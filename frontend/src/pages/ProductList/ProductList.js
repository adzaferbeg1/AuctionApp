import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { BiPlus, BiMinus } from "react-icons/bi";

import CategoryService from "../../services/CategoryService";
import ItemService from "../../services/ItemService";
import { GridView, ListView, LabelNavbar } from "../../shared/common";
import { purpleColor } from "../../shared/styles/PageStyles";

import "./ProductList.scss";

const ProductList = (props) => {
	const [categoryId, setCategoryId] = useState(props.location.state.categoryId);
	const [allCategories, setAllCategories] = useState([]);
	const [allSubcategories, setAllSubcategories] = useState([]);
	const [gridView, setGridView] = useState(true);
	const [chosenItems, setChosenItems] = useState([]);
	const [minPrice, setMinPrice] = useState();
	const [maxPrice, setMaxPrice] = useState();
	const [avgPrice, setAvgPrice] = useState();
	const [showSubcategories, setShowSubcategories] = useState(false);
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
		const newToOld = await ItemService.getNewToOldSort(categoryId);
		setChosenItems(newToOld);
	};

	const timeLeftSorting = async () => {
		const timeLeft = await ItemService.getTimeLeftSort(categoryId);
		setChosenItems(timeLeft);
	};

	const findSubcategoryItems = async (subcategoryId) => {
		const subcategoryItems = await ItemService.getSubcategoryItems(
			subcategoryId
		);
		setChosenItems(subcategoryItems);
	};

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const allCategories = await CategoryService.getAllCategories();
				setAllCategories(allCategories);
				const allSubcategories = await CategoryService.getAllSubcategories();
				setAllSubcategories(allSubcategories);
				const chosenItems = await ItemService.getDefaultSort(categoryId);
				setChosenItems(chosenItems);
				const minPrice = await ItemService.getMinPrice(categoryId);
				setMinPrice(minPrice);
				const maxPrice = await ItemService.getMaxPrice(categoryId);
				setMaxPrice(maxPrice);
				const avgPrice = await ItemService.getAvgPrice(categoryId);
				setAvgPrice(avgPrice);
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
					<div className="list-of-cats">
						<h6 style={purpleColor}>PRODUCT CATEGORIES</h6>
						{allCategories.length !== 0
							? allCategories.map((category) => (
									<>
										<p
											onClick={() => {
												setCategoryId(category.id);
											}}
										>
											{category.title}{" "}
											{showSubcategories ? (
												<BiMinus
													onClick={() => {
														setShowSubcategories(false);
													}}
												/>
											) : (
												<BiPlus
													onClick={() => {
														setShowSubcategories(true);
													}}
												/>
											)}
										</p>
										{allSubcategories.length !== 0
											? allSubcategories.map((subcategory) =>
													subcategory.supercategory === category.id &&
													showSubcategories ? (
														<p
															className="subcategory"
															onClick={() => {
																findSubcategoryItems(subcategory.id);
															}}
														>
															{subcategory.title}
														</p>
													) : null
											  )
											: null}
									</>
							  ))
							: null}
					</div>
					<div className="price-card">
						<div className="price-card-title">FILTER BY PRICE</div>
						<p>
							${minPrice}-${maxPrice}
						</p>
						<p>The average price is ${avgPrice}</p>
					</div>
				</div>
				<div className="col-md-8">
					<div className="items-view">
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
			</div>
		</>
	);
};

export default ProductList;
