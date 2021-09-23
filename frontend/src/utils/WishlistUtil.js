import WishlistService from "services/WishlistService";

export const addItemToWishlist = async (loggedIn, user, item) => {
	if (loggedIn) {
		const response = await WishlistService.addItem(user, item);
		if (response !== undefined) {
			if (response.status === 200) {
				alert("Item added to Wishlist");
			}
		} else {
			alert("Item already wishlisted");
		}
	} else {
		alert("You need to be logged in first");
	}
};
