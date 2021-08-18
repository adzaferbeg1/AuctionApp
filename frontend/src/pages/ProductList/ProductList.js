import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { BiPlus, BiMinus } from "react-icons/bi";

import CategoryService from "../../services/CategoryService";
import ItemService from "../../services/ItemService";
import {
	GridView,
	ListView,
	LabelNavbar,
	FilterTag,
} from "../../shared/common";
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
	const [sortTag, setSortTag] = useState("Default sorting");
	const [gridTag, setGridTag] = useState("Grid View");
	const [categoryTag, setCategoryTag] = useState(
		props.location.state.categoryTag
	);
	const [showSortTag, setShowSortTag] = useState(true);
	const [showGridTag, setShowGridTag] = useState(true);
	const [showCategoryTag, setShowCategoryTag] = useState(true);
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

	const removeSortFilter = async () => {
		setShowSortTag(false);
		document.getElementById("sorting-drop-menu").value = "Default";
		await defaultSorting();
	};

	const removeGridFilter = async () => {
		setShowGridTag(false);
		if (gridView) setGridView(false);
		else setGridView(true);
	};

	const removeCategoryFilter = async () => {
		setShowCategoryTag(false);
		setCategoryId("1");
		setShowSubcategories(false);
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
			case "Default":
				await defaultSorting();
				break;
			case "Low Price":
				await lowPriceSorting();
				break;
			case "Newest":
				newToOldSorting();
				break;
			case "Oldest":
				timeLeftSorting();
				break;
			case "High Price":
				await highPriceSorting();
				break;
			default:
				console.log(`Error`);
		}
	};

	return (
		<div className="product-list">
			<LabelNavbar label={"ITEMS"} />
			<div className="tags-container">
				{showSortTag ? (
					<FilterTag label={sortTag} onClick={removeSortFilter} />
				) : null}
				{showGridTag ? (
					<FilterTag label={gridTag} onClick={removeGridFilter} />
				) : null}
				{showCategoryTag ? (
					<FilterTag label={categoryTag} onClick={removeCategoryFilter} />
				) : null}
			</div>
			<div className="grid-list-btn">
				<select
					id="sorting-drop-menu"
					className="sorting-menu"
					onChange={async (e) => {
						await sortItems(e.target.value);
						setSortTag(e.target.value);
						setShowSortTag(true);
					}}
				>
					<option value="Default">Default sorting</option>
					<option value="Newest">Added: New to Old</option>
					<option value="Oldest">Time left</option>
					<option value="Low Price">Price: Low to High</option>
					<option value="High Price">Price: High to Low</option>
				</select>
				<button
					autoFocus
					onClick={() => {
						setGridView(true);
						setGridTag("Grid View");
						setShowGridTag(true);
					}}
				>
					{" "}
					<BsFillGrid3X3GapFill /> Grid
				</button>
				<button
					onClick={() => {
						setGridView(false);
						setGridTag("List View");
						setShowGridTag(true);
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
												setCategoryTag(category.title);
												setShowCategoryTag(true);
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
																setCategoryTag(subcategory.title);
																setShowCategoryTag(true);
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
		</div>
	);
};

export default ProductList;
