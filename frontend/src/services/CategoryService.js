import axios from "axios";

class CategoryService {

    getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/category/all");
            return response.data;

        } catch (err) {
        }
    }

}

export default new CategoryService();
