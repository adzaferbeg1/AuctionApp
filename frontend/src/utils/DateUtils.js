import { decode } from "jsonwebtoken";

export const findMonth = (month) => {
	switch (month) {
		case "01":
			return "January";
		case "02":
			return "February";
		case "03":
			return "March";
		case "04":
			return "April";
		case "05":
			return "May";
		case "06":
			return "June";
		case "07":
			return "July";
		case "08":
			return "August";
		case "09":
			return "September";
		case "10":
			return "October";
		case "11":
			return "November";
		case "12":
			return "December";
		default:
			return "January";
	}
};

export const isAuctionClosed = (endDate) => {
	const itemDate = new Date(endDate);
	return Date.now() >= itemDate;
};

export const isTokenValid = (token) => {
	const exp = decode(token, { complete: true }).payload.exp;
	return Date.now() < exp * 1000;
};
