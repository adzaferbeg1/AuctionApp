import axios from "axios";

class CardService {
	getCardInfoForUser = async (userId) => {
		try {
			const response = await axios.get("card/userinformation?id=" + userId);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new CardService();
