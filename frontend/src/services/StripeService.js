import axios from "axios";

class StripeService {
	processCardPayment = async (amount, id) => {
		console.log(amount, id);
		try {
			const response = await axios.post("checkout/card-payment", {
				amount: amount,
				id: id,
			});
			return response;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new StripeService();
