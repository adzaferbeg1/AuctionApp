import axios from "axios";
import { SetAuthorisationHeader } from "config/AppConfig";

class CardService {
	getCardInfoForUser = async (userId) => {
		try {
			const auth = SetAuthorisationHeader();
			const response = await axios.get(
				"card/user-information?id=" + userId,
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new CardService();
