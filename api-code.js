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



//Here I placed some functions I don't currently need, but may need later again
function mergeAPIData(dataset) {
	return dataset.map(entry => {
		let gemeenteMatch = geoData.find(item => item.gemeenteNaam === entry.gemeente);

		if(gemeenteMatch) {
			let newObject = {
				gemeente: entry.gemeente,
				gemeenteCode: entry.gemeenteCode,
		        inwoners: entry.inwoners,
		        capaciteitKVA: entry.capaciteitKVA,
		        gasaansluitingen: entry.gasaansluitingen,
		        provincie: gemeenteMatch.gemeenteInfo.components.state,
		        mercator: gemeenteMatch.gemeenteInfo.annotations.Mercator,
		        lngLat: gemeenteMatch.gemeenteInfo.geometry,
			};

			return newObject;
		};
	})
	// .filter(entry => entry.provincie !== "Friesland")
	// .filter(entry => entry.provincie !== "Gelderland")
	// .filter(entry => entry.provincie !== "Utrecht")
	// .filter(entry => entry.provincie !== "Noord-Holland")
	// .filter(entry => entry.provincie !== "Zuid-Holland")
	// .filter(entry => entry.provincie !== "Groningen")
	// .filter(entry => entry.provincie !== "Drenthe")
	// .filter(entry => entry.provincie !== "Overijssel")
	// .filter(entry => entry.provincie !== "Flevoland")
	// .filter(entry => entry.provincie !== "Noord-Brabant")
	// .filter(entry => entry.provincie !== "Limburg")
	// .filter(entry => entry.provincie !== "Zeeland")
};

function mergeEnergieData(dataset) {
	return dataset.map(entry => {
		let gemeenteMatch = energieData.find(item => item.Gemeente === entry.gemeente);

		// console.log(gemeenteMatch);
		let groenPercentage;

		if(gemeenteMatch) {
			groenPercentage = gemeenteMatch[2018];

			let newObject = {
				gemeente: entry.gemeente,
				gemeenteCode: entry.gemeenteCode,
		        inwoners: entry.inwoners,
		        capaciteitKVA: entry.capaciteitKVA,
		        gasaansluitingen: entry.gasaansluitingen,
		        provincie: entry.provincie,
		        mercator: entry.mercator,
		        lngLat: entry.lngLat,
		        percentageGroeneEnergie: {
		        	"2010": gemeenteMatch[2010], 
		        	"2011": gemeenteMatch[2011],
		        	"2012": gemeenteMatch[2012],
		        	"2013": gemeenteMatch[2013],
		        	"2014": gemeenteMatch[2014],
		        	"2015": gemeenteMatch[2015],
		        	"2016": gemeenteMatch[2016],
		        	"2017": gemeenteMatch[2017],
		        	groenPercentage2018: gemeenteMatch[2018],
		        }
			};

			return newObject;
		}
	})
};

function filterEnergieEntries(dataset) {
	return dataset.map(entry => {
		let cleanObject = {
			gemeente: entry.Gemeente,
			gemeenteCode: entry.gwb_code_10,
			inwoners: entry.a_inw,
			groenPercentage2018: entry[2018],
		};

		return cleanObject;
	})
};

function makeNumber(dataset) {
	return dataset.map(entry => {
		let jaarWaarde = '0';

		if (entry.percentageGroeneEnergiegroenPercentage2018.includes(',')) {
			jaarWaarde = entry.groenPercentage2018.replace(',', '.');
		}

		entry.groenPercentage2018 = +jaarWaarde;
		return entry;
	})
};