import ItemService from "../../services/ItemService";

/**
 * @jest-environment node
 */

it('Load all new arrival items', async function () {
    const response = await ItemService.getNewArrival();
    expect(response).not.toEqual([]);
});

it('Load all last chance items', async function () {
    const response = await ItemService.getLastChance();
    expect(response).not.toEqual([]);
});