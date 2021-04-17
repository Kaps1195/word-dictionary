const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const inquirer = require('inquirer');

const wordInput = () => {
	return new Promise((resolve, reject) => {
		console.log('\t');
		inquirer.prompt([
			{
				type: 'input',
				name: 'word',
				message: 'Please enter your word',
			}
		])
		.then(answers => {
			resolve(answers);
		})
		.catch(error => {
			if(error.isTtyError) {
				reject(error);
			} else {
				reject(error);
			}
		});
	});
}

const numberInput = () => {
	return new Promise((resolve, reject) => {
		console.log('\t');
		inquirer.prompt([
			{
				type: 'input',
				name: 'number',
				message: 'Number',
			}
		])
		.then(answers => {
			resolve(answers);
		})
		.catch(error => {
			if(error.isTtyError) {
				reject(error);
			} else {
				reject(error);
			}
		});
	});
}


const main = async () => {
	try {
        console.log('\t');
		console.log('Welcome to our Dictionary CLI Game!');

        const userWord = await wordInput();
        const word = userWord.word;

        const userNumber = await numberInput();
        const number = userNumber.number;

    } catch (error) {
		console.error("\n\n", error, " Exiting...");
		process.exit(1);
	}
}

main();