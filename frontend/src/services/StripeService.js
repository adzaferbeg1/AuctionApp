import axios from "axios";
import { SetAuthorisationHeader } from "config/AppConfig";

class StripeService {
	processCardPayment = async (amount, id) => {
		const auth = SetAuthorisationHeader();
		try {
			const response = await axios.post(
				"checkout/card-payment",
				{
					amount: amount,
					id: id,
				},
				auth
			);
			return response;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new StripeService();
