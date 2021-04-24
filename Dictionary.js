const axios = require('axios');
require('dotenv').config();
const DictionaryIndex = require('./models/DictionaryIndex.json');
const DictionaryWords = require('./models/Dictionary.json');
const { PerformanceObserver, performance } = require('perf_hooks');

function Dictionary() {

	this.displayAllWords = () => {
		console.table(DictionaryWords, ["word","definition"]);
		console.table(DictionaryWords, ["word","synoynms"]);
		console.table(DictionaryWords, ["word","antonyms"]);
		console.log('\t');
		console.info('-------------------------------- Word Examples! --------------------------------');
		DictionaryWords.map((item) => {
			const { word, examples } = item;
			console.log('\t');
			console.info(word, examples);
		});
	}

	this.fetchRandomWordProperty = (index, properties) => {
		const randomPropertyIndex = Math.floor(Math.random() * (properties.length));
		const randomProperty = properties[randomPropertyIndex];
		let word = DictionaryWords.filter(word => word.id === index ? word : false);
		word = word[0];
		// console.log(word);
		// console.log(DictionaryIndex.length, DictionaryWords.length)
		// console.log({index, word, i: DictionaryIndex[index]})
		const randomProp = {};

		// Take a random value from the synonyms array
		if(randomProperty === 'synoynms') {
			randomProp.property = randomProperty;
			const randomIndex = Math.floor(Math.random() * (word.synoynms.length));
			randomProp.value = word[randomProperty][randomIndex];
		}
		// Take a random value from the antonyms array
		else if(randomProperty === 'antonyms') {
			randomProp.property = randomProperty;
			const randomIndex = Math.floor(Math.random() * (word.antonyms.length));
			randomProp.value = word[randomProperty][randomIndex];
		} else {
			randomProp.property = randomProperty;
			randomProp.value = word.definition;
		}
		return randomProp;
	};

	this.fetchRandomWord = () => {
		const randomIndex = Math.floor(Math.random() * (DictionaryIndex.length));
		const randomWord = DictionaryWords[randomIndex];
		return randomWord;
	}

	this.showJumbledWordHint = (word) => {
		word = word.split('');
		for (let i = word.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[word[i], word[j]] = [word[j], word[i]];
		}

		return {
			jumbledWord: word.join('')
		};
	}

	this.showSynonymHint = (wordIndex) => {
		let word = DictionaryWords.filter(word => word.id === wordIndex ? word : false);
		word = word[0];
		let { synoynms } = word;
		// synoynms = synoynms.slice(1);
		const randomSynoymIndex = Math.floor(Math.random() * (synoynms.length));
		return {
			synoynms: synoynms[randomSynoymIndex]
		};
	}

	this.showAntoynmHint = (wordIndex) => {
		let word = DictionaryWords.filter(word => word.id === wordIndex ? word : false);
		word = word[0];
		let { antonyms } = word;
		// antonyms = antonyms.slice(1);
		const randomAntonymsIndex = Math.floor(Math.random() * (antonyms.length));
		return {
			antonyms: antonyms[randomAntonymsIndex]
		};
	}

	this.checkValidWord = (word) => {
		const found = DictionaryIndex.includes(word);
		return found ? true : false;
	};

	this.fetchWordIndex = (word) => {
		const wordIndex = DictionaryIndex.indexOf(word);
		return wordIndex;
	};

	this.fetchWordInformation = (wordIndex) => {
		const wordInformation = DictionaryWords[wordIndex];
		return wordInformation;
	};

	this.binarySearch = (searchWord) => {
		// const algorithmStartTime = performance.now();

		const words = DictionaryIndex;
		let startIndex = 0;
		let stopIndex  = words.length - 1;
		let middle = Math.floor((stopIndex + startIndex) / 2);
	
		while(words[middle] != searchWord && startIndex < stopIndex) {
			
			// Search on the left subtree
			if (searchWord < words[middle]) {
				stopIndex = middle - 1;
			}
			// Search on the right subtree 
			else if (searchWord > words[middle]) {
				startIndex = middle + 1;
			}
	  
			// Recalculating middle before iterating again
			middle = Math.floor((stopIndex + startIndex) / 2);
		}
		
		// const algorithmEndTime = performance.now();
		// console.log("Call to binarySearch took " + (algorithmEndTime - algorithmStartTime) + " milliseconds.");

		// Ensuring that the right searchWord is returned
		return (words[middle] != searchWord) ? false : middle;
	};

	this.verifyAnswer = (index, guessWord) => {
		let findWord = DictionaryWords.filter(word => word.id === index ? word : false);
		let actualWordInfo = findWord[0];
		const { word, synoynms } = actualWordInfo;
		return word === guessWord || synoynms.includes(guessWord);
	}

	this.displayAnswer = (index) => {
		let finalAnswer = DictionaryWords.filter(word => word.id === index ? word : false);
		return finalAnswer[0];
	}

}

module.exports = Dictionary;