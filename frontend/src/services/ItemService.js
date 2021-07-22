import axios from "axios";

class ItemService {

    getLastChance = async () => {
        try {
            const response = await axios.get("item/lastchance");
            return response.data;

        } catch (err) {
        }
    }

    getNewArrival = async () => {
        try {
            const response = await axios.get("item/newarrival");
            return response.data;

        } catch (err) {
        }
    }

    getFilteredByCategory = async (id) => {
        try {
            const response = await axios.get("item/category?id=" + id);
            return response.data;

        } catch (err) {
        }
    }

    placeBid = async (bid, itemId) => {
        return axios.post("/item/placebid", {
            itemId,
            bid
        });
    }

    getItemById = async (id) => {
        try {
            const response = await axios.get("item/singleitem?id=" + id);
            return response.data;

        } catch (err) {
        }
    }

}

export default new ItemService();