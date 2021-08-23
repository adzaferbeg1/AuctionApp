import axios from "axios";

class CategoryService {
	getAllCategories = async () => {
		try {
			const response = await axios.get("category/all");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAllSubcategories = async () => {
		try {
			const response = await axios.get("category/subcategories");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getCategoryByTitle = async (title) => {
		try {
			const response = await axios.get("category/title?title=" + title);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new CategoryService();
