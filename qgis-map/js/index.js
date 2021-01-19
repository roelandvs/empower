const initiativeSidebar = document.querySelector("aside");
const buttonContainer = document.querySelector(".energy-buttons");
const yearContainer = document.querySelector(".year-selector");
const yearMenuItems = document.querySelectorAll(".year-selector > p");
const energyItems = document.querySelectorAll(".energy-buttons > div > div");
let leafletMapPane;


function checkIfDragOne() {
	leafletMapPane = document.getElementsByClassName('leaflet-map-pane')[0].attributes[1].value;
}

//this function checks if the map is dragged or clicked
function checkIfDragTwo(gemeente) {
	if (leafletMapPane == document.getElementsByClassName('leaflet-map-pane')[0].attributes[1].value) {
		buildSidebarLeft(gemeente);
	};

	leafletMapPane = document.getElementsByClassName('leaflet-map-pane')[0].attributes[1].value;
}

function buildSidebarLeft(gemeente) {	
	const shapeClass = document.querySelector(".sidebar-gemeente");
	const sidebarTitle = document.querySelector("aside:nth-of-type(1) h2");
	const gemeenteNaam = document.getElementsByClassName("gemeente-titel");
	const inwonersTekst = document.getElementById("population");
	const oppervlakteTekst = document.getElementById("surface");
	const bevDichtheidTekst = document.getElementById("density");
	const woningenTekst = document.getElementById("houses");
	const elektTekst = document.getElementById("electricity");
	const gasTekst = document.getElementById("gas");
	const bedrijvenTekst = document.getElementById("businesses");
	const autosTekst = document.getElementById("cars");
	const shapeValues = gemeente.getAttribute('d');
	const xCoordinate = gemeente.getBBox().x;
	const yCoordinate = gemeente.getBBox().y;

	//fills all the text of the sidebar with info
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	inwonersTekst.innerText = document.getElementById('population-s').innerText;
	oppervlakteTekst.innerText = document.getElementById('surface-s').innerText;
	bevDichtheidTekst.innerText = document.getElementById('density-s').innerText;
	woningenTekst.innerText = document.getElementById('houses-s').innerText;
	elektTekst.innerText = document.getElementById('electricity-s').innerText;
	gasTekst.innerText = document.getElementById('gas-s').innerText;
	bedrijvenTekst.innerText = document.getElementById('businesses-s').innerText;
	autosTekst.innerText = document.getElementById('cars-s').innerText;

	//makes the gemeente shape in sidebar
	shapeClass.setAttribute('d', shapeValues);
	buttonContainer.style.left = '240px';
	yearContainer.style.left = '240px';
	document.querySelector('aside:nth-of-type(2)').style.right = '0px';
	initiativeSidebar.style.left = '0';

	//places the gemeente svg/path on point 0,0
	if (yCoordinate < 0) {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px," + (yCoordinate * -1) + "px)";
	} else if (xCoordinate < 0) {
		shapeClass.style.transform = "translate(" + (xCoordinate * -1) + "px, -" + yCoordinate + "px)";
	} else {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px, -" + yCoordinate + "px)";
	}

	buildSidebarRight();
	createGraph(gemeenteNaam[0].innerText);
};

function buildSidebarRight() {
	const sidebarTitle = document.querySelector("aside:nth-of-type(2) h2 span:nth-of-type(1)");
	const sidebarJaar = document.querySelector("aside:nth-of-type(2) h2 span:nth-of-type(2)");
	const gemeenteNaam = document.getElementsByClassName("gemeente-titel");
	const energyStats = document.querySelectorAll(".energy-container span");
	const totaalVerbruik = document.getElementById("totaal-verbruik");
	const zonneStats = document.getElementById('zonnestroom-' + currentYear).innerText;
	const windStats = document.getElementById('windstroom-' + currentYear).innerText;
	const biogasStats = document.getElementById('biogasstroom-' + currentYear).innerText;
	const totaalStats = document.getElementById('totaal-verbruik-' + currentYear).innerText;

	if (propertyValue === "groenPercentage/") {
		energyStats[0].innerText = zonneStats;
		energyStats[1].innerText = windStats.replace(/,|\./g, '');
		energyStats[2].innerText = biogasStats;

		if (+(totaalStats.replace(',', '')) - (+(windStats.replace(',', '')) + +biogasStats) + +zonneStats) {
			energyStats[3].innerText = +(totaalStats.replace(/,|\./g, '')) - (+(windStats.replace(/,|\./g, '')) + +(biogasStats.replace(/,|\./g, '')) + +zonneStats);
		} else {
			energyStats[3].innerText = '-';
		}
	} else {
	}

	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	totaalVerbruik.innerText = totaalStats.replace(/,|\./g, '') + ' TJ';
	sidebarJaar.innerText = '  ' + currentYear;
};

function createGraph(gemeenteNaam) {
	const currentGemeente = datasetArray.find(item => item.properties.Gemeentena === gemeenteNaam);
	const value2015 = currentGemeente.properties['complete_dataset_' + propertyValue + '2015'];
	const value2016 = currentGemeente.properties['complete_dataset_' + propertyValue + '2016'];
	const value2017 = currentGemeente.properties['complete_dataset_' + propertyValue + '2017'];
	const value2018 = currentGemeente.properties['complete_dataset_' + propertyValue + '2018'];
	const barPoints = document.querySelectorAll('#year-progression > div');
	const chartHeight = 90;
	let maxValue;

	if (propertyValue === "zonneStroomTj/") {
		maxValue = 200;
	}

	barPoints[0].style.marginBottom = (value2015 / maxValue) * chartHeight + 'px';
	barPoints[1].style.marginBottom = (value2016 / maxValue) * chartHeight + 'px';
	barPoints[2].style.marginBottom = (value2017 / maxValue) * chartHeight + 'px';
	barPoints[3].style.marginBottom = (value2018 / maxValue) * chartHeight + 'px';


	console.log(value2015)
};

function moveSidebar() {
	initiativeSidebar.style.left = '-300px';
	buttonContainer.style.left = '0';
	yearContainer.style.left = '0';
	document.querySelector('aside:nth-of-type(2)').style.right = '-350px';
};

function changeYear(jaarItem) {
	const jaar = jaarItem.innerText;

	// removes active class from all years
	yearMenuItems.forEach(item => {
		if (item.classList.contains('active-year')) {
			item.classList.remove('active-year')
		}
	});

	// adds active year class to correct year
	jaarItem.classList.add('active-year');
 
	//updates year
	currentYear = jaar;
	generateNewPath();
};

function colorEnergyButton(buttonItem) {
	energyItems.forEach(item => {
		if (item.classList.contains('active-energy')) {
			item.classList.remove('active-energy')
		}
	});

	// adds active energy class to correct button
	buttonItem.classList.add('active-energy');
};

function switchEnergy() {
	const legendaColor = document.querySelectorAll(".color-container > div .legenda-color");
	const legendaTitle = document.querySelector("#legenda > p");
	const legendaNumbers = document.querySelectorAll(".color-container > div p");

	if (propertyValue === "groenPercentage/") {
		legendaTitle.innerText = "Green energy percentage";
		legendaColor[1].style.backgroundColor = "#baf0c7";
		legendaColor[2].style.backgroundColor = "#6ae684";
		legendaColor[3].style.backgroundColor = "#3add56";
		legendaColor[4].style.backgroundColor = "#38d440";
		legendaColor[5].style.backgroundColor = "#30b035";
		legendaNumbers[1].innerText = "5%"
		legendaNumbers[2].innerText = "15%"
		legendaNumbers[3].innerText = "25%"
		legendaNumbers[4].innerText = "35%"
		legendaNumbers[5].innerText = ">45%"
	} else if (propertyValue === "windStroomTj/") {
		legendaTitle.innerText = "Consumption in TJ";
		legendaColor[1].style.backgroundColor = "#f3f9ff";
		legendaColor[2].style.backgroundColor = "#e0f1fe";
		legendaColor[3].style.backgroundColor = "#a7d8fc";
		legendaColor[4].style.backgroundColor = "#37a0f8";
		legendaColor[5].style.backgroundColor = "#1888f2";
		legendaNumbers[1].innerText = "10"
		legendaNumbers[2].innerText = "50"
		legendaNumbers[3].innerText = "250"
		legendaNumbers[4].innerText = "1250"
		legendaNumbers[5].innerText = "2500"
	} else if (propertyValue === "zonneStroomTj/") {
		legendaTitle.innerText = "Consumption in TJ";
		legendaColor[1].style.backgroundColor = "#f6f5e2";
		legendaColor[2].style.backgroundColor = "#f9ec84";
		legendaColor[3].style.backgroundColor = "#fce54e";
		legendaColor[4].style.backgroundColor = "#ffab2c";
		legendaColor[5].style.backgroundColor = "#ff9900";
		legendaNumbers[1].innerText = "10"
		legendaNumbers[2].innerText = "40"
		legendaNumbers[3].innerText = "80"
		legendaNumbers[4].innerText = "150"
		legendaNumbers[5].innerText = "200"
	} else if (propertyValue === "biogasStroomTj/") {
		legendaTitle.innerText = "Consumption in TJ";
		legendaColor[1].style.backgroundColor = "#FFF";
		legendaColor[2].style.backgroundColor = "#95a1c1";
		legendaColor[3].style.backgroundColor = "#46538f";
		legendaColor[4].style.backgroundColor = "#314083";
		legendaColor[5].style.backgroundColor = "#24337a";
		legendaNumbers[1].innerText = "0"
		legendaNumbers[2].innerText = "50"
		legendaNumbers[3].innerText = "100"
		legendaNumbers[4].innerText = "150"
		legendaNumbers[5].innerText = "200"
	}
};

function switchZonneEnergie() {
	propertyValue = 'zonneStroomTj/';
	popupEnergyType = 'Solar energy:';
    energySymbol = ' TJ';
	generateNewPath();
	switchEnergy();
};

function switchGroenPercentage() {
	propertyValue = 'groenPercentage/';
	popupEnergyType = 'Green energy:';
    energySymbol = '%';
	generateNewPath();
	switchEnergy();
};

function switchWindEnergie() {
	propertyValue = 'windStroomTj/';
	popupEnergyType = 'Wind energy:';
    energySymbol = ' TJ';
	generateNewPath();
	switchEnergy();
};

function switchBiogasEnergie() {
	propertyValue = 'biogasStroomTj/';
	popupEnergyType = 'Biogas power:';
    energySymbol = ' TJ';
	generateNewPath();
	switchEnergy();
};

function generateNewPath() {
	let svgGroup = document.getElementsByTagName("g")[0];

	//makes array with all datasets empty before all elements get pushed again
	datasetArray = [];

	//removes all paths before they get drawn again below
	for (let element of svgGroup.children) {
		element.remove();
	};

	//draws all gemeentes. This is copied from the leaflet code in index.html
    var layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0 = new L.geoJson(json_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0, {
            attribution: '',
            interactive: true,
            dataVar: 'json_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
            layerName: 'layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
            pane: 'pane_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
            onEachFeature: pop_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0,
            style: style_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0_0,
        });
    map.addLayer(layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0);
};

//doens't send 'this' to function unless inline onclick function
// for (let button of energyButtons) {
// 	button.addEventListener("click", colorEnergyButton(this));
// };
document.getElementById("sun").addEventListener("click", switchZonneEnergie);
document.getElementById("percentage").addEventListener("click", switchGroenPercentage);
document.getElementById("wind").addEventListener("click", switchWindEnergie);
document.getElementById("biogas").addEventListener("click", switchBiogasEnergie);
document.getElementById("sidebar-away").addEventListener("click", moveSidebar);

