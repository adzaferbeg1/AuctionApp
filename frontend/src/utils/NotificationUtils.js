import BidService from "../services/BidService";
import { isAuctionClosed } from "./DateUtils";
import NotificationService from "../services/NotificationService";

export const generateNotifications = async (allItems, allNotifications) => {
	let closedAuctionNotifications = [];
	if (allNotifications.length !== 0) {
		closedAuctionNotifications = allNotifications.filter(
			(notify) =>
				notify.message ===
				"Congratulations! You are the highest bidder. Finish your payment here"
		);

		closedAuctionNotifications = closedAuctionNotifications.map(
			(element) => element.itemId
		);
	}
	for (let i = 0; i < allItems.length; i++) {
		if (isAuctionClosed(allItems[i].endDate) &&
			!closedAuctionNotifications.includes(allItems[i].id)
		) {
			const highestBid = await BidService.getHighestBidderForItem(allItems[i].id);
			await NotificationService.postNotification(allItems[i].id,
				highestBid.bidderId,
				"Congratulations! You are the highest bidder. Finish your payment here",
				false
			);
		}
	}
};

export const notifyHighestBidder = async (bidderId, itemId, itemName) => {
	const highestBidder = await BidService.getHighestBidderForItem(itemId);
	if (highestBidder.bidderId !== bidderId) {
		await NotificationService.postNotification(itemId,
			highestBidder.bidderId,
			"You have been outbid on item " + itemName + " #" + itemId,
			false
		);
	} else {
		return;
	}
};
