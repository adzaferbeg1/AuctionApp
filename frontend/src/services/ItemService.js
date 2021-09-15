import axios from "axios";

class ItemService {
	getLastChance = async () => {
		try {
			const response = await axios.get("item/last-chance");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getNewArrival = async () => {
		try {
			const response = await axios.get("item/new-arrival");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getFilteredByCategory = async (id) => {
		try {
			const response = await axios.get("item/category?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	placeBid = async (bid, itemId) => {
		return axios.post("/item/place-bid", {
			itemId,
			bid,
		});
	};

	getItemById = async (id) => {
		try {
			const response = await axios.get("item/single-item?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getLowPriceSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sort-price-low?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getHighPriceSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sort-price-high?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getDefaultSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sort-default?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getTimeLeftSort = async (categoryId) => {
		try {
			const response = await axios.get("item/time-left?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getNewToOldSort = async (categoryId) => {
		try {
			const response = await axios.get("item/new-to-old?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getMinPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/min-price?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getMaxPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/max-price?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAvgPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/avg-price?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getSubcategoryItems = async (subcategoryId) => {
		try {
			const response = await axios.get(
				"item/subcategory-items?id=" + subcategoryId
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getSearchBarItems = async (searchWord) => {
		try {
			const response = await axios.get("item/search?name=" + searchWord);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getActiveSellerItems = async (sellerId) => {
		try {
			const response = await axios.get("item/active-items?id=" + sellerId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getSoldSellerItems = async (sellerId) => {
		try {
			const response = await axios.get("item/sold-items?id=" + sellerId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	addItemForSale = (categoryId,
		currentPrice,
		description,
		endDate,
		imgUrl,
		name,
		sellerId,
		startDate,
		startPrice,
		subcategoryId
	) => {
		return axios
			.post("item/add-item", {
				categoryId,
				currentPrice,
				description,
				endDate,
				imgUrl,
				name,
				sellerId,
				startDate,
				startPrice,
				subcategoryId,
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};
}

export default new ItemService();
