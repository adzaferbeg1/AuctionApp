import CategoryService from "services/CategoryService";

/**
 * @jest-environment node
 */

it("Load all categories from db", async function () {
	const response = await CategoryService.getAllCategories();
	expect(response).not.toEqual([]);
});
