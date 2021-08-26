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
import { useSearchContext } from "../../AppContext";
import RangeSlider from "../../shared/common/rangeSlider/RangeSlider";
import "./ProductList.scss";

const ProductList = (props) => {
	const [categoryId, setCategoryId] = useState(props.location.state.categoryId);
	const [allCategories, setAllCategories] = useState([]);
	const [allSubcategories, setAllSubcategories] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const [gridView, setGridView] = useState(true);
	const [chosenItems, setChosenItems] = useState([]);
	const [minPrice, setMinPrice] = useState();
	const [maxPrice, setMaxPrice] = useState();
	const [sliderMinPrice, setSliderMinPrice] = useState();
	const [sliderMaxPrice, setSliderMaxPrice] = useState();
	const [avgPrice, setAvgPrice] = useState();
	const [showSubcategories, setShowSubcategories] = useState(false);
	const [categoryTag, setCategoryTag] = useState(
		props.location.state.categoryTag
	);
	const [showCategoryTag, setShowCategoryTag] = useState(true);
	const [supercategoryId, setSupercategoryId] = useState();
	const [searchBarItems, setSearchBarItems] = useState([]);
	const { searchWord, spellCheck, setFromSearchBar, fromSearchBar } =
		useSearchContext();
	const [didYouMean, setDidYouMean] = useState();
	const [loading, setLoading] = useState(true);
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

	const removeCategoryFilter = async () => {
		if (fromSearchBar) setFromSearchBar(false);
		setShowCategoryTag(false);
		setCategoryId("1");
		setShowSubcategories(false);
		hideOpenedSubcategories();
	};

	const showSubcategoryMenu = (categoryId, display) => {
		var clickedCategory = document.getElementsByClassName(
			"subcategory " + categoryId
		);
		for (var i = 0; i < clickedCategory.length; i += 1) {
			clickedCategory[i].style.display = display;
		}
	};

	const hideOpenedSubcategories = () => {
		var openCategory = document.getElementsByClassName("subcategory");
		for (var i = 0; i < openCategory.length; i += 1) {
			openCategory[i].style.display = "none";
		}
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
				setAllItems(chosenItems);
				const minPrice = await ItemService.getMinPrice(categoryId);
				setMinPrice(minPrice);
				setSliderMinPrice(minPrice);
				const maxPrice = await ItemService.getMaxPrice(categoryId);
				setMaxPrice(maxPrice);
				setSliderMaxPrice(maxPrice);
				const avgPrice = await ItemService.getAvgPrice(categoryId);
				setAvgPrice(avgPrice);
				const searchBarItems = await ItemService.getSearchBarItems(searchWord);
				setSearchBarItems(searchBarItems);
				var promise = Promise.resolve(spellCheck);
				promise.then(function (val) {
					setDidYouMean(val);
				});

				setLoading(false);
			} catch (e) {
				console.error(e);
			}
		};

		fetchItems();
	}, [categoryId, searchWord]);

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

	const renderItems = () => {
		if (loading) {
			return <h5 style={{ color: "gray" }}>Loading...</h5>;
		} else {
			if (fromSearchBar && searchBarItems !== undefined) {
				if (gridView) {
					return searchBarItems.map((item) => (
						<GridView
							key={item.name + "search"}
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
					));
				} else {
					return searchBarItems.map((item) => (
						<ListView
							key={item.name + "search-list"}
							id={item.id}
							name={item.name}
							startPrice={item.currentPrice}
							imgUrl={item.imgUrl}
							description={item.description}
							onClick={() =>
								history.push({
									pathname: "/shop",
									state: { item: item },
								})
							}
						/>
					));
				}
			} else if (!fromSearchBar && chosenItems !== undefined) {
				if (gridView) {
					return chosenItems.map((item) => (
						<GridView
							key={item.id + "grid"}
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
					));
				} else {
					return chosenItems.map((item) => (
						<ListView
							key={item.id + "grid"}
							id={item.id}
							name={item.name}
							startPrice={item.currentPrice}
							imgUrl={item.imgUrl}
							description={item.description}
							onClick={() =>
								history.push({
									pathname: "/shop",
									state: { item: item },
								})
							}
						/>
					));
				}
			}
		}
	};

	const setMinMaxPrice = (minValue, maxValue) => {
		setSliderMinPrice(minValue);
		setSliderMaxPrice(maxValue);
		let minMaxItems = allItems;
		setChosenItems(
			minMaxItems.filter(
				(item) => item.currentPrice >= minValue && item.currentPrice <= maxValue
			)
		);
	};

	return (
		<div className="product-list">
			{fromSearchBar && searchBarItems.length === 0 ? (
				<div className="did-you-mean">
					Did you mean?{" "}
					<div style={{ color: "#8367d8", marginLeft: "0.5em" }}>
						{didYouMean}
					</div>
				</div>
			) : null}
			<LabelNavbar label={"ITEMS"} />
			<div className="tags-container">
				{showCategoryTag ? (
					<FilterTag label={categoryTag} onClick={removeCategoryFilter} />
				) : null}
			</div>
			<div className="product-container">
				<div className="col-sm-4">
					<div className="list-of-cats">
						<h6 style={purpleColor}>PRODUCT CATEGORIES</h6>
						{allCategories !== undefined
							? allCategories.map((category) => (
									<>
										<p
											onClick={() => {
												setCategoryId(category.id);
												setCategoryTag(category.title);
												setShowCategoryTag(true);
												setFromSearchBar(false);
											}}
										>
											{category.title}{" "}
											{supercategoryId === category.id && showSubcategories ? (
												<BiMinus
													onClick={() => {
														showSubcategoryMenu(category.id, "none");
														setShowSubcategories(false);
														setSupercategoryId(category.id);
													}}
												/>
											) : (
												<BiPlus
													onClick={() => {
														hideOpenedSubcategories();
														setSupercategoryId(category.id);
														showSubcategoryMenu(category.id, "block");
														setShowSubcategories(true);
													}}
												/>
											)}
										</p>
										{allSubcategories !== undefined
											? allSubcategories.map((subcategory) =>
													subcategory.supercategory === category.id ? (
														<p
															className={"subcategory " + category.id}
															onClick={() => {
																findSubcategoryItems(subcategory.id);
																setCategoryTag(subcategory.title);
																setShowCategoryTag(true);
																setFromSearchBar(false);
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
						<div className="range-container">
							<RangeSlider
								minValue={minPrice}
								maxValue={maxPrice}
								setMinMaxPrice={setMinMaxPrice}
							/>
						</div>
						<p>
							${sliderMinPrice}-${sliderMaxPrice}
						</p>
						<p>The average price is ${avgPrice}</p>
					</div>
				</div>
				<div className="col-md-8">
					<div className="grid-list-btn">
						<select
							id="sorting-drop-menu"
							className="sorting-menu"
							onChange={async (e) => {
								await sortItems(e.target.value);
							}}
						>
							<option value="Default">Default sorting</option>
							<option value="Newest">Added: New to Old</option>
							<option value="Oldest">Time left</option>
							<option value="Low Price">Price: Low to High</option>
							<option value="High Price">Price: High to Low</option>
						</select>
						<div>
							<button
								autoFocus
								onClick={() => {
									setGridView(true);
								}}
								style={
									gridView
										? { backgroundColor: "#8367d8", color: "white" }
										: { backgroundColor: "white", color: "black" }
								}
							>
								{" "}
								<BsFillGrid3X3GapFill /> Grid
							</button>
							<button
								onClick={() => {
									setGridView(false);
								}}
								style={
									!gridView
										? { backgroundColor: "#8367d8", color: "white" }
										: { backgroundColor: "white", color: "black" }
								}
							>
								{" "}
								<FaThList /> List
							</button>
						</div>
					</div>
					<div className="items-view">{renderItems()}</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
