import ItemService from "services/ItemService";

export const finishPayment = async (itemId, history) => {
	const item = await ItemService.getItemById(itemId);
	history.push({
		pathname: "/payment",
		state: { item: item },
	});
};
