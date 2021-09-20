import axios from "axios";
import { SetAuthorisationHeader } from "config/AppConfig";

class NotificationService {
	postNotification = (itemId, userId, message, seen) => {
		return axios
			.post("notification/post-notification", { itemId, userId, message, seen })
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	};

	getAll = async () => {
		try {
			const response = await axios.get("notification/all-notifications");
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};

	updateSeenStatus = async (id) => {
		try {
			const auth = SetAuthorisationHeader();
			await axios.get("notification/set-seen?id=" + id, auth);
		} catch (err) {
			console.error(err);
		}
	};

	getNotificationsForUser = async (userId) => {
		try {
			const auth = SetAuthorisationHeader();
			const response = await axios.get(
				"notification/user-notifications?id=" + userId,
				auth
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new NotificationService();
