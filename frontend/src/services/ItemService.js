import axios from "axios";

class ItemService {
	getLastChance = async () => {
		try {
			const response = await axios.get("item/lastchance");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getNewArrival = async () => {
		try {
			const response = await axios.get("item/newarrival");
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
		return axios.post("/item/placebid", {
			itemId,
			bid,
		});
	};

	getItemById = async (id) => {
		try {
			const response = await axios.get("item/singleitem?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getLowPriceSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sortpricelow?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getHighPriceSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sortpricehigh?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getDefaultSort = async (categoryId) => {
		try {
			const response = await axios.get("item/sortdefault?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getTimeLeftSort = async (categoryId) => {
		try {
			const response = await axios.get("item/timeleft?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getNewToOldSort = async (categoryId) => {
		try {
			const response = await axios.get("item/newtoold?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getMinPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/minprice?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getMaxPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/maxprice?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAvgPrice = async (categoryId) => {
		try {
			const response = await axios.get("item/avgprice?id=" + categoryId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getSubcategoryItems = async (subcategoryId) => {
		try {
			const response = await axios.get(
				"item/subcategoryitems?id=" + subcategoryId
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getActiveSellerItems = async (sellerId) => {
		try {
			const response = await axios.get("item/activeitems?id=" + sellerId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getSoldSellerItems = async (sellerId) => {
		try {
			const response = await axios.get("item/solditems?id=" + sellerId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	addItemForSale = (
		categoryId,
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
			.post("item/additem", {
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
