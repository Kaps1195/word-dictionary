const fetchInput = require('./utils/inputs');
const Dictionary = require('./Dictionary');

const main = async () => {
	try {
        console.log('\t');
		console.log('Welcome to our Dictionary CLI!');
        console.log('\t');

		const DictionaryInstance = new Dictionary();
		DictionaryInstance.displayAllWords();
	
		// Display word of the first
        console.log('\t');
        console.log('\t');
		console.log(`----------------------- Today's word of the day is -----------------------`);
		const wordOfTheDay = DictionaryInstance.fetchRandomWord();
		console.table([wordOfTheDay], ["word","definition"]);
		console.log(`----------------------- Today's word of the day is -----------------------`);

		// Ask user to display a given word's synoynms/antonyms/definition


		let playInput;

		while(true) {
			// Ask user to play the game
			console.log('\t');
			console.log('\t');
			let playInput = await fetchInput.playInput();
			const playInputWord = playInput.word; 
			if(playInputWord === 'n') process.exit(0);

			console.log('\t')
			console.log(`----------------------- Fetching a Random Word's information (could be a synonym/antonym/definition) -----------------------`);
			const randomWordForTheGame = DictionaryInstance.fetchRandomWord();
			
			if(wordOfTheDay === randomWordForTheGame) {
				console.log('Oops! This was unexpected! It seems the word of the day and random word for the game are the same!!');
				console.log(`We request you to restart the game`);
				process.exit(0);
			} else {
				// Proceed Further and display a Random property of the word
				const wordProperties = ["synoynms","antonyms","definition"];
				const { id } = randomWordForTheGame;
				// console.log({randomWordForTheGame});
				const actualWord = randomWordForTheGame.word;
				// console.log(id);
				const randomPropertyOfTheWord = DictionaryInstance.fetchRandomWordProperty(id, wordProperties);
				
				// Display Random Properties
				console.log(randomPropertyOfTheWord);

				// Take user input
				const userWordFirst = await fetchInput.wordInput();
				const { word } = userWordFirst;
				
				// Verify the answer
				const answer = DictionaryInstance.verifyAnswer(id, word);

				// First Attempt
				if(answer) {
					console.log(`Congrats! You guessed it right! ${word} is the right word`);
					console.log('\t');
					console.log('Thank you for playing! Have a nice day!');
					process.exit(0);
				}

				console.log('\t')
				console.log('Oops! You entered the wrong word!');
				
				// Let the user play n times
				let userWantsToContinue = true;
				while (userWantsToContinue) {

					console.log('\t');
					console.log('Would you like to > ');
					console.log('1) Try Again');
					console.log('2) See a hint');
					console.log('3) quit');

					const userNumber = await fetchInput.numberInput();
					const number = userNumber.number;

					switch (number) {
						case '1':
							// Take user input again
							const tryAgainInput = await fetchInput.wordInput();
							const tryAgainWord = tryAgainInput.word;

							// Verify the answer again
							const tryAgainAnswer = DictionaryInstance.verifyAnswer(id, tryAgainWord);

							if(!tryAgainAnswer) {
								console.log('Wrong Again');
							} else {
								console.log(`Congrats! You guessed it right! ${tryAgainWord} is the right word`);
								console.log('\t');
								console.log('Thank you for playing! Have a nice day!');
								userWantsToContinue = false;
							}
							break;
						case '2':
							// Shuffling hint functions and displaying random hints
							const randomHints = [
								DictionaryInstance.showJumbledWordHint(actualWord),
								DictionaryInstance.showSynonymHint(id),
								DictionaryInstance.showAntoynmHint(id)
							];
							// console.log(randomHints);
							const randomHintIndex = Math.floor(Math.random() * (randomHints.length));
							console.log('Hint -> ', randomHints[randomHintIndex]);

							// Take user input again
							const userHintInput = await fetchInput.wordInput();
							const userHInput = userHintInput.word;

							// Verify the answer again
							const userHintAnswer = DictionaryInstance.verifyAnswer(id, userHInput);
							if(!userHintAnswer) {
								console.log('Wrong Again');
							} else {
								console.log(`Congrats! You guessed it right! ${userHInput} is the right word`);
								console.log('\t');
								console.log('Thank you for playing! Have a nice day!');
								userWantsToContinue = false;
							}							
							break;
						case '3':
							const finalAnswer = DictionaryInstance.displayAnswer(id);
							console.log('The answer was -> ', finalAnswer);
							userWantsToContinue = false;
							break;
						default:
							process.exit(0);
					}

				}
			}

		}

		// Check validity of the word
		// const validWord = DictionaryInstance.checkValidWord('help');
		// if(validWord) {
		// 	console.log('Valid Word Entered!');
		// 	// const wordIndex1 = DictionaryInstance.fetchWordIndex('help');
		// 	const wordIndex = DictionaryInstance.binarySearch('help');

		// 	const wordInformation = DictionaryInstance.fetchWordInformation(wordIndex);
		// 	const { definition, synoynms, antonyms, examples } = wordInformation;
		// 	console.log('Definition : ', definition);
		// } else {
		// 	console.log('Invalid Word Entered!');
		// }
		
		// Display word of the day first
		// console.log('\t');
		// console.log(`Today's word of the day is > `);
		// const randomWord = DictionaryInstance.fetchRandomWord();
		// console.info(randomWord);


		// let userWantsToContinue = true;
		// while(userWantsToContinue) {
		// 	const userWord = await fetchInput.wordInput();
		// 	const word = userWord.word;

		// 	// Check the validity of the word
		// 	const validWordOptions = {
		// 		endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
		// 		key: 'Validity of the word'
		// 	};
		// 	const validWord = await DictionaryInstance.fetch(validWordOptions);

		// 	// Provide a shuffled version of the word as a hint if the word entered is invalid
		// 	if(!validWord) {
		// 		const wordArray = word.slice(0).split('');
		// 		function shuffleArray(array) {
		// 			for (let i = array.length - 1; i > 0; i--) {
		// 				const j = Math.floor(Math.random() * (i + 1));
		// 				[array[i], array[j]] = [array[j], array[i]];
		// 			}
		// 		}
		// 		shuffleArray(wordArray);
		// 		console.log(`Hint > `, wordArray.join(''));
		// 	}

		// 	console.log('\t');
		// 	console.log('\t');
		// 	console.log('Please enter your choice(number) > ');
		// 	console.log('1) Synonyms');
		// 	console.log('2) Antonyms');
		// 	console.log('3) Definition');
		// 	console.log('4) Examples');
		// 	console.log('5) Complete Word Information');
		// 	console.log('6) Exit');
	
		// 	const userNumber = await fetchInput.numberInput();
		// 	const number = userNumber.number;
			
		// 	// Common Declarations
		// 	let options;
		// 	let playAgain;
	
		// 	switch (number) {
		// 		case '1':
		// 			options = {
		// 				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
		// 				key: 'Synonyms'
		// 			};
					
		// 			const synonyms = await DictionaryInstance.fetch(options);
		// 			console.info(synonyms);
		// 			break;
		// 		case '2':
		// 			options = {
		// 				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/antonyms`,
		// 				key: 'Antonyms'
		// 			};
					
		// 			const antonyms = await DictionaryInstance.fetch(options);
		// 			console.info(antonyms);
		// 			break;
		// 		case '3':
		// 			options = {
		// 				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
		// 				key: 'Definition'
		// 			};
						
		// 			const definition = await DictionaryInstance.fetch(options);
		// 			console.info(definition);
		// 			break;
		// 		case '4':
		// 			options = {
		// 				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`,
		// 				key: 'Examples'
		// 			};
						
		// 			const examples = await DictionaryInstance.fetch(options);
		// 			console.info(examples);
		// 			break;
		// 		case '5':
		// 			options = {	
		// 				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
		// 				key: 'Word Information'
		// 			};
						
		// 			const wordInformation = await DictionaryInstance.fetch(options);
		// 			console.info(wordInformation);
		// 			break;					
		// 		case '6':
		// 			console.error("\n\n", " Exiting...");
		// 			process.exit(0);
		// 		default:
		// 			break;
		// 	}

		// 	console.log('\t');
		// 	playAgain = await fetchInput.playAgainInput();
		// 	const playAgainWord = playAgain.word; 
		// 	if(playAgainWord === 'n') userWantsToContinue = false;
		// }

		// console.log('\t');
		// console.log('Thank you for playing! Have a nice day!');
		// process.exit(0);
    } catch (error) {
		console.error("\n\n", error, " Exiting...");
		process.exit(1);
	}
}

main();