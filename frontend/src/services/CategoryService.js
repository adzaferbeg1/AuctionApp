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
}

export default new CategoryService();
