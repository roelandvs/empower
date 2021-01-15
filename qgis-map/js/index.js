const initiativeSidebar = document.querySelector(".sidebar");
const buttonContainer = document.querySelector(".energy-buttons");
const yearContainer = document.querySelector(".year-selector");
const yearMenuItems = document.querySelectorAll(".year-selector > p");
const energyItems = document.querySelectorAll(".energy-buttons > div > div");
const gemeentes = Array.from(document.getElementsByClassName("empower"));

function buildSidebar(gemeente) {
	const shapeClass = document.querySelector(".sidebar-gemeente");
	const sidebarTitle = document.querySelector(".sidebar-left h2");
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
	initiativeSidebar.style.left = '0';

	//places the gemeente svg/path on point 0,0
	if (yCoordinate < 0) {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px," + (yCoordinate * -1) + "px)";
	} else if (xCoordinate < 0) {
		shapeClass.style.transform = "translate(" + (xCoordinate * -1) + "px, -" + yCoordinate + "px)";
	} else {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px, -" + yCoordinate + "px)";
	}
};

function moveSidebar() {
	initiativeSidebar.style.left = '-300px';
	buttonContainer.style.left = '0';
	yearContainer.style.left = '0';
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

function switchZonneEnergie() {
	propertyValue = 'zonneStroomTj/';
	popupEnergyType = 'Zonnestroom:';
    energySymbol = ' TJ';
	generateNewPath();
};

function switchGroenPercentage() {
	propertyValue = 'groenPercentage/';
	popupEnergyType = 'Groene energie:';
    energySymbol = '%';
	generateNewPath();
};

function switchWindEnergie() {
	propertyValue = 'windStroomTj/';
	popupEnergyType = 'Windstroom:';
    energySymbol = ' TJ';
	generateNewPath();
};

function switchBiogasEnergie() {
	propertyValue = 'biogasStroomTj/';
	popupEnergyType = 'Biogasstroom:';
    energySymbol = ' TJ';
	generateNewPath();
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

document.getElementById("sun").addEventListener("click", switchZonneEnergie);
document.getElementById("percentage").addEventListener("click", switchGroenPercentage);
document.getElementById("wind").addEventListener("click", switchWindEnergie);
document.getElementById("biogas").addEventListener("click", switchBiogasEnergie);
document.getElementById("sidebar-away").addEventListener("click", moveSidebar);