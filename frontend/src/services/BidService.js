import axios from "axios";

class BidService {

    placeBid = async (itemId, bidderId, bid) => {
        return axios.post("http://localhost:8080/bid/placebid", {
            itemId,
            bidderId,
            bid
        });
    }

}

export default new BidService();