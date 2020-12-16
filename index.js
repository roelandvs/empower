import { datasetOne } from './datasets/energie-gebruik.js';
import { datasetTwo } from './datasets/buurtnaam.js';

let buurtCapaciteit = datasetOne;
let buurtInfo = datasetTwo;

mergeDatasets(buurtCapaciteit, buurtInfo);
	// .then(filterEntries)
	// .then(mergeGemeentes)

function mergeDatasets(dataset1, dataset2) {
	let capaciteitDataset = dataset1;
	let infoDataset = dataset2;

	// console.log(dataset1.length);

	//dit moet netter gechaint worden
	mergeGemeentes(
		filterEntries(
			capaciteitDataset.map(entry => {
				let buurtCodeMatch = infoDataset.find(item => item.gwb_code === entry.BU_CODE);

					if (buurtCodeMatch) {
						const mergedItem = {...entry, ...buurtCodeMatch};
						return mergedItem;
					}

			}).filter(entry => entry !== undefined)
		)
	);
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
	// console.log('buurten', dataset)
	console.log('gemeentes', 

		dataset.reduce((acc, cur) => {
			let gemeente = cur.gemeente;
		    let inwoners = cur.inwoners;
		    let capaciteitKVA = cur.capaciteitKVA;
		    let gasaansluitingen = cur.gasaansluitingen;
		    // console.log(gasaansluitingen);

		    const findMatchIndex = acc.findIndex(item => item.gemeente === gemeente);

		    if(findMatchIndex != -1) {
		    	acc[findMatchIndex].inwoners += inwoners;
      			acc[findMatchIndex].capaciteitKVA += capaciteitKVA;
      			acc[findMatchIndex].gasaansluitingen += gasaansluitingen;
		  	} else {
		  		let newGemeente = {
			        gemeente: gemeente,
			        inwoners: inwoners,
			        capaciteitKVA: capaciteitKVA,
			        gasaansluitingen: gasaansluitingen
		    	}

		    	acc.push(newGemeente);
		  	}

		  	return acc;
		}, [])

    );
};



