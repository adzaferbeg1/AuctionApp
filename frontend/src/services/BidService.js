import axios from "axios";

class BidService {
	placeBid = async (itemId, bidderId, bid) => {
		return axios.post("/bid/place-bid", {
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
			const response = await axios.get("bid/bids-no?id=" + id);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getAllClosedBids = async () => {
		try {
			const response = await axios.get("bid/highest-bids");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	getHighestBidderForItem = async (itemId) => {
		try {
			const response = await axios.get("bid/highest-bidder?item_id=" + itemId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new BidService();
