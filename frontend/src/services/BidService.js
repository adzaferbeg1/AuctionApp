import axios from "axios";

class BidService {
	placeBid = async (itemId, bidderId, bid) => {
		return axios.post("/bid/placebid", {
			itemId,
			bidderId,
			bid,
		});
	};

	getAllBidders = async (id) => {
		try {
			const response = await axios.get("bid/bidders?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getNoOfBids = async (id) => {
		try {
			const response = await axios.get("bid/bidsno?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new BidService();
