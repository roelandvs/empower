import dotenv from 'dotenv';

let allAPIData = [];
createAPIUrl();

function createAPIUrl(dataset) {
	// console.log('het proces is gestart');
	dataset.forEach((entry, i) => {
		setTimeout(() => {
			const gemeenteNaam = entry.gemeente;
			const APIUrl = 'https://api.opencagedata.com/geocode/v1/json?q=' + gemeenteNaam + '&key=' + process.env.API_KEY;
			fetchAPI(APIUrl, gemeenteNaam);
		}, i * 2000)
	})
};

function fetchAPI(url, gemeenteNaam) {
	const APIAnswer = fetch(url);
	const gemeente = gemeenteNaam;
	APIAnswer.then(answer => {
		turnToJSON(answer, gemeente);
	});
};

function turnToJSON(answer, gemeente) {
	const answerJSON = answer.json();
	const gemeentes = gemeente;
	answerJSON.then(answer => {
		// console.log('antwoord:', answer)
		let gemeenteInfo = answer.results[0]

		allAPIData.push({
			gemeenteInfo,
			gemeenteNaam: gemeentes
		});

		if (allAPIData.length == 10) {
			console.log('10 items:', allAPIData);
		}else if (allAPIData.length == 100) {
			console.log('100 items:', allAPIData);
		} else if (allAPIData.length >= 331) {
			console.log(allAPIData);
		}
	})
};