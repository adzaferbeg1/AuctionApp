import axios from "axios";

class CategoryService {

    getAllCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/category/all");
            const categories = [];
            for (let i = 0; i < Object.keys(response.data).length; i++) categories[i] = response.data[i].title;
            return categories;

        } catch (err) {
        }
    }

}

export default new CategoryService();