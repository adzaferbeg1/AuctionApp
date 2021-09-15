import axios from "axios";

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
			await axios.get("notification/set-seen?id=" + id);
		} catch (err) {
			console.error(err);
		}
	};

	getNotificationsForUser = async (userId) => {
		try {
			const response = await axios.get(
				"notification/user-notifications?id=" + userId
			);
			return response.data;
		} catch (err) {
			console.error(err);
		}
	};
}

export default new NotificationService();
