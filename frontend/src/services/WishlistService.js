import axios from "axios";
import { SetAuthorisationHeader } from "config/AppConfig";

class WishlistService {
	getWishlistItems = async (personId) => {
		try {
			const response = await axios.get(
				"wishlist/get-items?person-id=" + personId
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	removeItemFromWishlist = async (person, item) => {
		try {
			const response = await axios.post("wishlist/remove-item", {
				person,
				item,
			});
			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	addItem = async (person, item) => {
		try {
			const response = await axios.post("wishlist/add", {
				person,
				item,
			});
			return response;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new WishlistService();
