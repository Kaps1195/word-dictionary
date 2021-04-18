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


        const userWord = await fetchInput.wordInput();
        const word = userWord.word;

        const userNumber = await fetchInput.numberInput();
        const number = userNumber.number;

    } catch (error) {
		console.error("\n\n", error, " Exiting...");
		process.exit(1);
	}
}

main();