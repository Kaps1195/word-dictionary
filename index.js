const fetchInput = require('./utils/inputs');
const Dictionary = require('./models/Dictionary');

const main = async () => {
	try {
        console.log('\t');
		console.log('Welcome to our Dictionary CLI Game!');

		const DictionaryInstance = new Dictionary();
		
		// Display word of the day first
		console.log('\t');
		console.log(`Today's word of the day is > `);
		const randomWordOptions = {
			endpoint: 'https://wordsapiv1.p.rapidapi.com/words/',
			params: {random: 'true'},
			key: 'Random Word'
		};
		
		const randomWord = await DictionaryInstance.fetch(randomWordOptions);
		console.info(randomWord);


		let userWantsToContinue = true;
		while(userWantsToContinue) {
			const userWord = await fetchInput.wordInput();
			const word = userWord.word;

			// Check the validity of the word
			const validWordOptions = {
				endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
				key: 'Validity of the word'
			};
			const validWord = await DictionaryInstance.fetch(validWordOptions);

			// Provide a shuffled version of the word as a hint if the word entered is invalid
			if(!validWord) {
				const wordArray = word.slice(0).split('');
				function shuffleArray(array) {
					for (let i = array.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[array[i], array[j]] = [array[j], array[i]];
					}
				}
				shuffleArray(wordArray);
				console.log(`Hint > `, wordArray.join(''));
			}

			console.log('\t');
			console.log('\t');
			console.log('Please enter your choice(number) > ');
			console.log('1) Synonyms');
			console.log('2) Antonyms');
			console.log('3) Definition');
			console.log('4) Examples');
			console.log('5) Complete Word Information');
			console.log('6) Exit');
	
			const userNumber = await fetchInput.numberInput();
			const number = userNumber.number;
			
			// Common Declarations
			let options;
			let playAgain;
	
			switch (number) {
				case '1':
					options = {
						endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`,
						key: 'Synonyms'
					};
					
					const synonyms = await DictionaryInstance.fetch(options);
					console.info(synonyms);
					break;
				case '2':
					options = {
						endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/antonyms`,
						key: 'Antonyms'
					};
					
					const antonyms = await DictionaryInstance.fetch(options);
					console.info(antonyms);
					break;
				case '3':
					options = {
						endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
						key: 'Definition'
					};
						
					const definition = await DictionaryInstance.fetch(options);
					console.info(definition);
					break;
				case '4':
					options = {
						endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`,
						key: 'Examples'
					};
						
					const examples = await DictionaryInstance.fetch(options);
					console.info(examples);
					break;
				case '5':
					options = {	
						endpoint: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
						key: 'Word Information'
					};
						
					const wordInformation = await DictionaryInstance.fetch(options);
					console.info(wordInformation);
					break;					
				case '6':
					console.error("\n\n", " Exiting...");
					process.exit(0);
				default:
					break;
			}

			console.log('\t');
			playAgain = await fetchInput.playAgainInput();
			const playAgainWord = playAgain.word; 
			if(playAgainWord === 'n') userWantsToContinue = false;
		}

		console.log('\t');
		console.log('Thank you for playing! Have a nice day!');
		process.exit(0);
    } catch (error) {
		console.error("\n\n", error, " Exiting...");
		process.exit(1);
	}
}

main();