import axios from "axios";

class ItemService {

    getLastChance = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/lastchance");
            return response.data;

        } catch (err) {
        }
    }

    getNewArrival = async () => {
        try {
            const response = await axios.get("http://localhost:8080/item/newarrival");
            return response.data;

        } catch (err) {
        }
    }

    getFilteredByCategory = async (id) => {
        try {
            const response = await axios.get("http://localhost:8080/item/category?id=" + id);
            return response.data;

        } catch (err) {
        }
    }

}

export default new ItemService();