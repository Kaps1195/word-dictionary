const fetchInput = require('./utils/inputs');

const main = async () => {
	try {
        console.log('\t');
		console.log('Welcome to our Dictionary CLI Game!');

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