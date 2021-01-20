import { datasetOne } from './datasets/energie-gebruik.js';
// import { datasetTwo } from './datasets/buurtnaam.js';
import { datasetTwo } from './datasets/buurt-gegevens.js';
import { datasetThree } from './datasets/energie-gegevens.js';
import { APIData } from './datasets/api-data.js';

let buurtCapaciteit = datasetOne;
let buurtInfo = datasetTwo;
let geoData = APIData;
let energieData = datasetThree;

// Promise.resolve(buurtCapaciteit)
// 	.then(response => mergeDatasets(response, buurtInfo))
// 	.then(addGemeenteName)
// 	.then(mergeGemeentes)
// 	.then(response => mergeGemeenteData(response, buurtInfo))
Promise.resolve(buurtInfo)
	.then(makeCleanObject)
	.then(response => mergeEneryData(response, energieData))
	.then(formatObject)
	.then(makePercentageANumber)
	.then(console.log);

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

function addGemeenteName(dataset) {
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
			buurtCode: entry.gwb_code_10,
			gemeenteNaam: entry.gm_naam,
			capaciteitKVA: +KVAcapaciteit,
			gasaansluitingen: +gasaansluiting,
		};

		return cleanObject;
	});
};

function mergeGemeentes(dataset) {
	return dataset.reduce((acc, cur) => {
	    const findMatchIndex = acc.findIndex(item => item.gemeenteNaam === cur.gemeenteNaam);

	    if(findMatchIndex !== -1) {
  			acc[findMatchIndex].capaciteitKVA += cur.capaciteitKVA;
  			acc[findMatchIndex].gasaansluitingen += cur.gasaansluitingen;
	  	} else {
	  		let newGemeente = {
		        gemeenteNaam: cur.gemeenteNaam,
		        // gemeenteCode: cur.gemeenteCode,
		        capaciteitKVA: cur.capaciteitKVA,
		        gasaansluitingen: cur.gasaansluitingen
	    	}

	    	acc.push(newGemeente);
	  	}
	  	return acc;
	}, []);
};

function mergeGemeenteData(dataset1, dataset2) {
	return dataset1.map(entry => {
		let gemeenteNaamMatch = dataset2.find(item => item.gm_naam === entry.gemeenteNaam);

		if (gemeenteNaamMatch.gwb_code_10.startsWith('GM')) {
			let mergedItem = {...entry, ...gemeenteNaamMatch};
			return mergedItem;
		}
	})
};

function makeCleanObject(dataset) {
	return dataset.map(entry => {
		let cleanObject = {
			gemeenteCode: entry.gwb_code,
			gemeenteNaam: entry.gm_naam,
			inwoners: entry.a_inw,
			huisHoudens: entry.a_hh,
			bevolkingsDichtheid: entry.bev_dich,
			aantalWoningen: entry.a_woning,
			percentageBewoond: entry.p_bewndw,
			gemElekVerbuikKwh: entry.g_ele,
			gemAardgasVerbruikM3: entry.g_gas,
			// aantalInkomstHebbers: entry.a_inkont,
			// gemInkomen: entry.g_ink_po,
			aantalBedrijfvestg: entry.a_bedv,
			totaalPersonenAuto: entry.a_pau,
			oppervlakteHa: entry.a_opp_ha,
			// capaciteitKVA: entry.capaciteitKVA,
			// gasaansluitingen: entry.gasaansluitingen,
		};

		return cleanObject;
	}).filter(entry => entry.gemeenteCode.startsWith('GM'))
};

function mergeEneryData(dataset1, dataset2) {
	return dataset1.map(entry => {
		let gemeenteNaamMatch = dataset2.find(item => item.gemeente === entry.gemeenteNaam);

		if (gemeenteNaamMatch) {
			let mergedItem = {...entry, ...gemeenteNaamMatch};
			return mergedItem;
		} else {
			return entry;
		}
	}).filter(entry => entry !== undefined)
};

function formatObject(dataset) {
	return dataset.map(entry => {
		let cleanObject = {
			gemeenteCode: entry.gemeenteCode,
			gemeenteNaam: entry.gemeenteNaam,
			inwoners: +entry.inwoners,
			huisHoudens: +entry.huisHoudens,
			bevolkingsDichtheid: +entry.bevolkingsDichtheid,
			aantalWoningen: +entry.aantalWoningen,
			percentageBewoond: +entry.percentageBewoond,
			gemElekVerbuikKwh: +entry.gemElekVerbuikKwh,
			gemAardgasVerbruikM3: +entry.gemAardgasVerbruikM3,
			aantalBedrijfvestg: +entry.aantalBedrijfvestg,
			totaalPersonenAuto: +entry.totaalPersonenAuto,
			oppervlakteHa: +entry.oppervlakteHa,
			zonneStroomTj: {
				"2015": +entry.z2015,
				"2016": +entry.z2016,
				"2017": +entry.z2017,
				"2018": +entry.z2018,
			},
			windStroomTj: {
				"2015": +entry.w2015,
				"2016": +entry.w2016,
				"2017": +entry.w2017,
				"2018": +entry.w2018,
			},
			biogasStroomTj: {
				"2015": +entry.b2015,
				"2016": +entry.b2016,
				"2017": +entry.b2017,
				"2018": +entry.b2018,
			},
			groenPercentage: {
				"2015": entry.h2015,
				"2016": entry.h2016,
				"2017": entry.h2017,
				"2018": entry.h2018,
			},
			totaalEnergieGebruik: {
				"2015": +entry.e2015,
				"2016": +entry.e2016,
				"2017": +entry.e2017,
				"2018": +entry.e2018,
			},
		};

		return cleanObject;
	})
};

function makePercentageANumber(dataset) {
	return dataset.map(entry => {
		for (let [key, value] of Object.entries(entry.groenPercentage)) {

			if (value == undefined) {
				entry.groenPercentage[2018] = 0;
			} else if (entry.groenPercentage[key].includes('%')) {
				entry.groenPercentage[key] = Number(value.replace('%', ''));
			} else {
				entry.groenPercentage[key] = 0;
			}

			if (key === "2018") {
				return entry
			}

		}
	})
};


