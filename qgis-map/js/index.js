let initiativeSidebar = document.querySelector(".sidebar");
let buttonContainer = document.querySelector(".energy-buttons");
let yearContainer = document.querySelector(".year-selector");
let yearMenuItems = document.querySelectorAll(".year-selector > p");

function buildSidebar(gemeente) {
	if (gemeente.ondragend) {
		// console.log(gemeente.isDragging)
	} else {
		let shapeClass = document.querySelector(".sidebar-gemeente");
		let sidebarTitle = document.querySelector(".sidebar-left h2");
		let gemeenteNaam = document.getElementsByClassName("gemeente-titel");

		let inwonersTekst = document.getElementById("population");
		let oppervlakteTekst = document.getElementById("surface");
		let bevDichtheidTekst = document.getElementById("density");
		let woningenTekst = document.getElementById("houses");
		let elektTekst = document.getElementById("electricity");
		let gasTekst = document.getElementById("gas");
		let bedrijvenTekst = document.getElementById("businesses");
		let autosTekst = document.getElementById("cars");
		let shapeValues = gemeente.getAttribute('d');
		let xCoordinate = gemeente.getBBox().x;
		let yCoordinate = gemeente.getBBox().y;

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
	}
};

function moveSidebar() {
	initiativeSidebar.style.left = '-300px';
	buttonContainer.style.left = '0';
	yearContainer.style.left = '0';
};

function changeYear(jaarItem) {
	let jaar = jaarItem.innerText;
	let svgGroup = document.getElementsByTagName("g")[0];

	// removes active class from all years
	yearMenuItems.forEach(item => {
		if (item.classList.contains('active-year')) {
			item.classList.remove('active-year')
		}
	});

	// adds active year class to correct year
	jaarItem.classList.add('active-year');

	//updates year
	propertyValue = 'complete_dataset_groenPercentage/' + jaar;

	//calls function that takes propertyValue as argument, so that the year gets updated
	datasetArray.map(entry => {
		style_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0_0(entry)
	})

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

function makeZonnestroom() {
	let svgGroup = document.getElementsByTagName("g")[0];
	
	datasetArray.map(entry => {
		zonneStroom(entry)
	});

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
            style: zonneStroom,
        });
    map.addLayer(layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0);
}

document.getElementById("sun").addEventListener("click", makeZonnestroom);
document.getElementById("sidebar-away").addEventListener("click", moveSidebar);