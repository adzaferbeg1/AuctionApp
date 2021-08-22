import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Step, Stepper } from "react-form-stepper";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { LabelNavbar } from "../../shared/common";
import { useUserContext } from "../../AppContext";
import CategoryService from "../../services/CategoryService";
import ItemService from "../../services/ItemService";
import "./Sell.scss";

export default function Sell() {
	const { user } = useUserContext();
	const [activeCard, setActiveCard] = useState(0);
	const [allCategories, setAllCategories] = useState([]);
	const [allSubcategories, setAllSubcategories] = useState([]);
	const [filteredSubcategories, setFilteredSubcategories] = useState([]);
	const [itemName, setItemName] = useState();
	const [chosenCategory, setChosenCategory] = useState([]);
	const [chosenSubCategory, setChosenSubCategory] = useState([]);
	const [itemDescription, setItemDescription] = useState();
	const [userPhoneNo, setUserPhoneNo] = useState();
	const [userStreet, setUserStreet] = useState();
	const [userCity, setUserCity] = useState();
	const [userCountry, setUserCountry] = useState();
	const [userZipCode, setUserZipCode] = useState();
	const [startPrice, setStartPrice] = useState();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [imgUrl] = useState(
		"https://static.thenounproject.com/png/1554490-200.png"
	);
	const history = useHistory();

	const formatUserAddress = () => {
		if (user.address !== null) {
			const address = user.address.split("//");
			setUserStreet(address[0]);
			setUserCity(address[1]);
			setUserCountry(address[2]);
			setUserZipCode(address[3]);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const allCategories = await CategoryService.getAllCategories();
			setAllCategories(allCategories);
			const allSubcategories = await CategoryService.getAllSubcategories();
			setAllSubcategories(allSubcategories);
			setUserPhoneNo(user.phoneNumber);
			formatUserAddress();
		};
		fetchData();
	}, []);

	const selectCategory = async (categoryTitle) => {
		const category = await CategoryService.getCategoryByTitle(categoryTitle);
		setChosenCategory(category);
		const filteredSubcategories = allSubcategories.filter(
			(subcategory) => subcategory.supercategory === category.id
		);
		setFilteredSubcategories(filteredSubcategories);
	};

	const selectSubcategory = async (subcategoryTitle) => {
		const subcategory = await CategoryService.getCategoryByTitle(
			subcategoryTitle
		);
		setChosenSubCategory(subcategory);
	};

	const switchFirstCard = () => {
		if (
			itemName === undefined ||
			itemName === "" ||
			chosenCategory === undefined ||
			chosenSubCategory === undefined ||
			itemDescription === undefined
		) {
			alert("All fields must be filled");
		} else {
			setActiveCard(1);
		}
	};

	const switchSecondCard = () => {
		if (
			userStreet === undefined ||
			userCity === undefined ||
			userCountry === undefined ||
			userZipCode === undefined ||
			userPhoneNo === undefined
		) {
			alert("All fields must be filled");
		} else {
			setActiveCard(2);
		}
	};

	const addNewItem = async () => {
		if (
			startPrice === undefined ||
			startDate === undefined ||
			endDate === undefined
		) {
			alert("All fields must be filled");
		} else {
			const startTime = new Date(startDate).toISOString();
			const endTime = new Date(endDate).toISOString();
			try {
				await ItemService.addItemForSale(
					chosenCategory.id,
					startPrice,
					itemDescription,
					endTime,
					imgUrl,
					itemName,
					user.id,
					startTime,
					startPrice,
					chosenSubCategory.id
				);
				let addedItem = {
					sellerId: user.id,
					categoryId: chosenCategory.id,
					subcategoryId: chosenSubCategory.id,
					name: itemName,
					description: itemDescription,
					startPrice: startPrice,
					currentPrice: startPrice,
					startDate: startDate,
					endDate: endDate,
					imgUrl: imgUrl,
				};
				history.push({
					pathname: "/shop",
					state: { item: addedItem },
				});
			} catch {
				alert("Unable to post item");
			}
		}
	};

	const renderItems = () => {
		if (activeCard === 0) {
			return (
				<div className="add-item">
					<div className="add-nav">ADD ITEM</div>
					<div className="labels">
						<label>What do you sell?</label>
					</div>
					<input
						type="text"
						placeholder="e.g. Red Summer Dress"
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
					/>
					<div className="small-text">
						<label>2-5 words (60 characters)</label>
					</div>
					<div className="select-cat">
						<select
							onChange={(e) => selectCategory(e.target.value)}
							defaultValue={"Select Category"}
						>
							<option value="Select Category" disabled>
								Select Category
							</option>
							{allCategories.map((category) => (
								<option
									value={category.title}
									key={category.title + " sell-page"}
								>
									{category.title}
								</option>
							))}
						</select>
						<select
							onChange={(e) => selectSubcategory(e.target.value)}
							defaultValue={"Select SubCategory"}
						>
							<option value="Select SubCategory" disabled>
								Select SubCategory
							</option>
							{filteredSubcategories.map((category) => (
								<option
									value={category.title}
									key={category.title + " sell-page"}
								>
									{category.title}
								</option>
							))}
						</select>
					</div>
					<div className="labels">
						<label>Description</label>
					</div>
					<input
						type="text"
						className="description-container"
						value={itemDescription}
						onChange={(e) => setItemDescription(e.target.value)}
					></input>
					<div className="small-text">
						<label>100 words (700 characters)</label>
					</div>
					<div className="back-next-btn">
						<button style={{ visibility: "hidden" }}>
							<RiArrowLeftSLine /> BACK
						</button>
						<button onClick={switchFirstCard}>
							NEXT <RiArrowRightSLine />
						</button>
					</div>
				</div>
			);
		} else if (activeCard === 1) {
			return (
				<div className="add-item">
					<div className="add-nav">LOCATION AND SHIPPING</div>
					<div className="labels">
						<label>Address</label>
					</div>
					<input
						type="text"
						placeholder="e.g. 687 Berge Tunnel Apt. 278"
						value={userStreet}
						onChange={(e) => setUserStreet(e.target.value)}
					/>
					<div className="select-cat">
						<input
							type="text"
							placeholder="City"
							value={userCity}
							onChange={(e) => setUserCity(e.target.value)}
						></input>
						<input
							type="text"
							placeholder="Country"
							value={userCountry}
							onChange={(e) => setUserCountry(e.target.value)}
						></input>
					</div>
					<div className="labels">
						<label>Zip code</label>
					</div>
					<input
						type="text"
						placeholder="e.g. 123"
						value={userZipCode}
						onChange={(e) => setUserZipCode(e.target.value)}
					></input>
					<div className="labels">
						<label>Phone</label>
					</div>
					<input
						type="text"
						placeholder="e.g. 555-555-555"
						value={userPhoneNo}
						onChange={(e) => setUserPhoneNo(e.target.value)}
					></input>
					<div className="back-next-btn">
						<button onClick={() => setActiveCard(0)}>
							<RiArrowLeftSLine /> BACK
						</button>
						<button onClick={switchSecondCard}>
							NEXT <RiArrowRightSLine />
						</button>
					</div>
				</div>
			);
		} else
			return (
				<div className="add-item">
					<div className="add-nav">SET PRICES</div>
					<div className="labels">
						<label>Your Start Price</label>
					</div>
					<div className="input-group mb-2">
						<div class="input-group-prepend">
							<div className="input-group-text">$</div>
						</div>
						<input
							type="text"
							className="form-control"
							id="inlineFormInputGroup"
							placeholder="15"
							value={startPrice}
							onChange={(e) => setStartPrice(e.target.value)}
						/>
					</div>
					<div className="start-end-date-label">
						<div className="date-label">Start Date</div>
						<div className="date-label">End Date</div>
					</div>
					<div className="select-cat">
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						></input>
						<input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						></input>
					</div>
					<div className="note-price-card">
						<p>
							The auction will automatically close when the end time comes. The
							highest bid will win the auction.
						</p>
					</div>
					<div className="back-next-btn">
						<button onClick={() => setActiveCard(1)}>
							<RiArrowLeftSLine /> BACK
						</button>
						<button onClick={addNewItem}>
							DONE <RiArrowRightSLine />
						</button>
					</div>
				</div>
			);
	};
	return (
		<div className="sell-page">
			<LabelNavbar label={"ADD ITEM FOR SALE"} />
			<div className="content-below-nav">
				<div className="progress-container">
					<Stepper activeStep={activeCard}>
						<Step></Step>
						<Step></Step>
						<Step></Step>
					</Stepper>
				</div>
				{renderItems()}
			</div>
		</div>
	);
}
