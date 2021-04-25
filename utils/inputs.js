const inquirer = require('inquirer');

const wordInput = () => {
	return new Promise((resolve, reject) => {
		console.log('\t');
		inquirer.prompt([
			{
				type: 'input',
				name: 'word',
				message: 'Please guess the word',
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

const playInput = () => {
	return new Promise((resolve, reject) => {
		console.log('\t');
		inquirer.prompt([
			{
				type: 'input',
				name: 'word',
				message: 'Would you like to play the Dictionary Game? (y/n)',
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

module.exports = {
    wordInput,
    numberInput,
	playInput
}