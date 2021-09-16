import CategoryService from "services/CategoryService";
import ItemService from "services/ItemService";

export const spellCheckDistance1 = async (word) => {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const dictionary = [];
	word = word.toLowerCase().split("");
	const results = [];

	const allCategories = await CategoryService.getAllCategories();
	for (let i = 0; i < allCategories.length; i++) {
		dictionary.push(allCategories[i].title.toLowerCase());
	}

	const allItems = await ItemService.getLastChance();
	for (let a = 0; a < allItems.length; a++) {
		const nameArray = allItems[a].name.split(" ");
		const descriptionArray = allItems[a].description.split(" ");
		for (let j = 0; j < nameArray.length; j++) {
			dictionary.push(nameArray[j].toLowerCase());
		}
		for (let k = 0; k < descriptionArray.length; k++) {
			dictionary.push(descriptionArray[k].toLowerCase());
		}
	}

	// Adding any one character (from the alphabet) anywhere in the word.
	for (let b = 0; b <= word.length; b++) {
		for (let c = 0; c < alphabet.length; c++) {
			const newWord = word.slice();
			newWord.splice(b, 0, alphabet[c]);
			results.push(newWord.join(""));
		}
	}

	// Removing any one character from the word.
	if (word.length > 1) {
		for (let d = 0; d < word.length; d++) {
			const newWord = word.slice();
			newWord.splice(d, 1);
			results.push(newWord.join(""));
		}
	}

	// Transposing (switching) the order of any two adjacent characters in a word.
	if (word.length > 1) {
		for (let h = 0; h < word.length - 1; h++) {
			const newWord = word.slice();
			const r = newWord.splice(h, 1);
			newWord.splice(h + 1, 0, r[0]);
			results.push(newWord.join(""));
		}
	}

	// Substituting any character in the word with another character.
	for (let g = 0; g < word.length; g++) {
		for (let l = 0; l < alphabet.length; l++) {
			const newWord = word.slice();
			newWord[g] = alphabet[l];
			results.push(newWord.join(""));
		}
	}

	for (let o = 0; o < results.length; o++) {
		if (dictionary.includes(results[o])) {
			return results[o];
		}
	}

	return "Sorry, could not identify word";
};
