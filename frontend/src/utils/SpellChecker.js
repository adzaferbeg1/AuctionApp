import CategoryService from "../services/CategoryService";
import ItemService from "../services/ItemService";

export const spellCheckDistance1 = async (word) => {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	var dictionary = [];
	word = word.toLowerCase().split("");
	var results = [];

	const allCategories = await CategoryService.getAllCategories();
	for (var i = 0; i < allCategories.length; i++)
		dictionary.push(allCategories[i].title.toLowerCase());

	const allItems = await ItemService.getLastChance();
	for (var a = 0; a < allItems.length; a++) {
		var nameArray = allItems[a].name.split(" ");
		var descriptionArray = allItems[a].description.split(" ");
		for (var j = 0; j < nameArray.length; j++) {
			dictionary.push(nameArray[j].toLowerCase());
		}
		for (var k = 0; k < descriptionArray.length; k++) {
			dictionary.push(descriptionArray[k].toLowerCase());
		}
	}

	//Adding any one character (from the alphabet) anywhere in the word.
	for (var b = 0; b <= word.length; b++) {
		for (var c = 0; c < alphabet.length; c++) {
			var newWord = word.slice();
			newWord.splice(b, 0, alphabet[c]);
			results.push(newWord.join(""));
		}
	}

	//Removing any one character from the word.
	if (word.length > 1) {
		for (var d = 0; d < word.length; d++) {
			var newWord = word.slice();
			newWord.splice(d, 1);
			results.push(newWord.join(""));
		}
	}

	//Transposing (switching) the order of any two adjacent characters in a word.
	if (word.length > 1) {
		for (var h = 0; h < word.length - 1; h++) {
			var newWord = word.slice();
			var r = newWord.splice(h, 1);
			newWord.splice(h + 1, 0, r[0]);
			results.push(newWord.join(""));
		}
	}

	//Substituting any character in the word with another character.
	for (var g = 0; g < word.length; g++) {
		for (var l = 0; l < alphabet.length; l++) {
			var newWord = word.slice();
			newWord[g] = alphabet[l];
			results.push(newWord.join(""));
		}
	}

	for (var o = 0; o < results.length; o++)
		if (dictionary.includes(results[o])) return results[o];

	return "Sorry, could not identify word";
};
