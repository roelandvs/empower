import { datasetOne } from './datasets/energie-gebruik.js';
import { datasetTwo } from './datasets/buurtnaam.js';
// import { datasetTwo } from './datasets/buurtnaam2.js';
import { datasetThree } from './datasets/hernieuwbare_energie.js';
import { APIData } from './datasets/api-data.js';

let buurtCapaciteit = datasetOne;
let buurtInfo = datasetTwo;
let geoData = APIData;
let energieData = datasetThree;

Promise.resolve(buurtCapaciteit)
	.then(response => mergeDatasets(response, buurtInfo))
	.then(response => mergeGMCode(response, buurtInfo))
	.then(filterEntries)
	.then(mergeGemeentes)
	.then(mergeAPIData)
	.then(mergeEnergieData)
	.then(makeNumber)
	// .then(mergeProvincies)
	// .then(console.log);

Promise.resolve(energieData)
	.then(response => mergeStart(response, buurtInfo))
	.then(filterEnergieEntries)
	.then(makeNumber)
	.then(console.log)


function mergeDatasets(dataset1, dataset2) {
	let capaciteitDataset = dataset1;
	let infoDataset = dataset2;

	return capaciteitDataset.map(entry => {
		let buurtCodeMatch = infoDataset.find(item => item.gwb_code === entry.BU_CODE);

		if (buurtCodeMatch) {
			let mergedItem = {...entry, ...buurtCodeMatch};
			return mergedItem;
		}

	}).filter(entry => entry !== undefined)
};

function mergeGMCode(dataset1, dataset2) {
	return dataset1.map(entry => {
		let gemeenteNaamMatch = dataset2.find(item => item.gm_naam === entry.gm_naam);
		// console.log(gemeenteNaamMatch);

		if (gemeenteNaamMatch.gwb_code_10.startsWith('GM')) {
			let mergedItem = {...entry, ...gemeenteNaamMatch};
			return mergedItem;
		}
	}).filter(entry => entry !== undefined)
};

function filterEntries(dataset) {
	return dataset.map(entry => {
		let gasaansluiting;
		let KVAcapaciteit;

		if (entry['aant_g-aansl'] === undefined) {
			gasaansluiting = 0;
		} else {
			gasaansluiting = entry['aant_g-aansl'];
		}

		if (entry.capaciteit_buurt_kva === undefined) {
			KVAcapaciteit = 0;
		} else {
			KVAcapaciteit = entry.capaciteit_buurt_kva;
		}

		let cleanObject = {
			buurtCode: entry.BU_CODE,
			gemeenteCode: entry.gwb_code,
			regio: entry.regio,
			gemeente: entry.gm_naam,
			inwoners: +entry.a_inw,
			capaciteitKVA: +KVAcapaciteit,
			gasaansluitingen: +gasaansluiting,
		};

		return cleanObject;
	});
};

function mergeGemeentes(dataset) {
	return dataset.reduce((acc, cur) => {
	    const findMatchIndex = acc.findIndex(item => item.gemeente === cur.gemeente);

	    if(findMatchIndex !== -1) {
	    	acc[findMatchIndex].inwoners += cur.inwoners;
  			acc[findMatchIndex].capaciteitKVA += cur.capaciteitKVA;
  			acc[findMatchIndex].gasaansluitingen += cur.gasaansluitingen;
	  	} else {
	  		let newGemeente = {
	  			regio: cur.regio,
		        gemeente: cur.gemeente,
		        gemeenteCode: cur.gemeenteCode,
		        inwoners: cur.inwoners,
		        capaciteitKVA: cur.capaciteitKVA,
		        gasaansluitingen: cur.gasaansluitingen
	    	}

	    	acc.push(newGemeente);
	  	}

	  	return acc;
	}, []);
};

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
		        // inwoners: entry.inwoners,
		        // capaciteitKVA: entry.capaciteitKVA,
		        // gasaansluitingen: entry.gasaansluitingen,
		        // provincie: entry.provincie,
		        // mercator: entry.mercator,
		        // lngLat: entry.lngLat,
		        // percentageGroeneEnergie: {
		        // 	"2010": gemeenteMatch[2010], 
		        // 	"2011": gemeenteMatch[2011],
		        // 	"2012": gemeenteMatch[2012],
		        // 	"2013": gemeenteMatch[2013],
		        // 	"2014": gemeenteMatch[2014],
		        // 	"2015": gemeenteMatch[2015],
		        // 	"2016": gemeenteMatch[2016],
		        // 	"2017": gemeenteMatch[2017],
		        	groenPercentage2018: gemeenteMatch[2018],
		        // }
			};

			return newObject;
		}
	})
};

function makeNumber(dataset) {
	return dataset.map(entry => {
		let jaarWaarde = '0';

		if (entry.groenPercentage2018.includes(',')) {
			jaarWaarde = entry.groenPercentage2018.replace(',', '.');
		}

		entry.groenPercentage2018 = +jaarWaarde;
		return entry;
	})
};

function mergeStart(dataset1, dataset2) {
	return dataset1.map(entry => {
		let gemeenteNaamMatch = dataset2.find(item => item.gm_naam === entry.Gemeente);

		if (gemeenteNaamMatch.gwb_code.startsWith('GM')) {
			let mergedItem = {...entry, ...gemeenteNaamMatch};
			return mergedItem;
		}
	}).filter(entry => entry !== undefined)
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

