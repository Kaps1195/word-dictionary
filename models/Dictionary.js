const axios = require('axios');
require('dotenv').config()

function Dictionary() {

	this.fetch = async (options) => new Promise((resolve, reject) => {
		console.info(`-------------------------- Fetching ${options.key} --------------------------`); 
		const requestOptions = {
			method: 'GET',
			url: options.endpoint,
			headers: {
				'x-rapidapi-key': process.env.RAPID_API_KEY,
				'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
			}
		};
		if('params' in options) requestOptions.params = options.params;

		axios.request(requestOptions)
		.then(function (response) {
			resolve(response.data)
		}).catch(function (error) {
			console.info(`It seems like you have entered a wrong word! `); 
			resolve(false);
		});
	});

}

module.exports = Dictionary;