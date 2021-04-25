const axios = require('axios');
require('dotenv').config();
const DictionaryIndex = require('../models/DictionaryIndex.json');
const DictionaryWords = require('../models/Dictionary.json');

const displayAllWords = () => {
	DictionaryWords.map((item) => {
		const { word, definition, synoynms, antonyms, examples } = item;
		console.log('\t');
		console.info('---------------------------------------------------------------------------------------------------------------------------------');
		console.info('Word -> ',word);
		console.info('Definition -> ',definition);
		console.info('Synoynms -> ',synoynms);
		console.info('Antonyms -> ',antonyms);
		console.info('Examples -> ',examples);
		console.info('---------------------------------------------------------------------------------------------------------------------------------');
		console.log('\t');
	});
}

const fetchRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * (DictionaryIndex.length));
	const randomWord = DictionaryWords[randomIndex];
	return randomWord;
}

const fetchRandomWordProperty = (index, properties) => {
	const randomPropertyIndex = Math.floor(Math.random() * (properties.length));
	const randomProperty = properties[randomPropertyIndex];
	let word = DictionaryWords.filter(word => word.id === index ? word : false);
	word = word[0];
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

const showJumbledWordHint = (word) => {
	word = word.split('');
	for (let i = word.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[word[i], word[j]] = [word[j], word[i]];
	}

	return {
		jumbledWord: word.join('')
	};
}

const showSynonymHint = (wordIndex) => {
	let word = DictionaryWords.filter(word => word.id === wordIndex ? word : false);
	word = word[0];
	let { synoynms } = word;
	// synoynms = synoynms.slice(1);
	const randomSynoymIndex = Math.floor(Math.random() * (synoynms.length));
	return {
		synoynms: synoynms[randomSynoymIndex]
	};
}

const showAntoynmHint = (wordIndex) => {
	let word = DictionaryWords.filter(word => word.id === wordIndex ? word : false);
	word = word[0];
	let { antonyms } = word;
	// antonyms = antonyms.slice(1);
	const randomAntonymsIndex = Math.floor(Math.random() * (antonyms.length));
	return {
		antonyms: antonyms[randomAntonymsIndex]
	};
}

const checkValidWord = (word) => {
	const found = DictionaryIndex.includes(word);
	return found ? true : false;
};

const verifyAnswer = (index, guessWord) => {
	let findWord = DictionaryWords.filter(word => word.id === index ? word : false);
	let actualWordInfo = findWord[0];
	const { word, synoynms } = actualWordInfo;
	return word === guessWord || synoynms.includes(guessWord);
}

const displayAnswer = (index) => {
	let finalAnswer = DictionaryWords.filter(word => word.id === index ? word : false);
	return finalAnswer[0];
}

module.exports = {
	displayAllWords,
	fetchRandomWordProperty,
	fetchRandomWord,
	showJumbledWordHint,
	showSynonymHint,
	showAntoynmHint,
	checkValidWord,
	verifyAnswer,
	displayAnswer
};