import axios from "axios";

class BidService {

    placeBid = async (itemId, bidderId, bid) => {
        return axios.post("http://localhost:8080/bid/placebid", {
            itemId,
            bidderId,
            bid
        });
    }

    getAllBidders = async (id) => {
        try {
            const response = await axios.get("http://localhost:8080/bid/bidders?id=" + id);
            return response.data;

        } catch (err) {
        }
    }

}

export default new BidService();