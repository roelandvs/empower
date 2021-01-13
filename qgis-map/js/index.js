let initiativeSidebar = document.querySelector(".sidebar");
let menuSidebar = document.querySelector(".sidebar-menu");

function buildSidebar(gemeente) {
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

	//makes title of sidebar the gemeente
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	inwonersTekst.innerText = document.getElementById('population-s').innerText;
	oppervlakteTekst.innerText = document.getElementById('surface-s').innerText;
	bevDichtheidTekst.innerText = document.getElementById('density-s').innerText;
	woningenTekst.innerText = document.getElementById('houses-s').innerText;
	elektTekst.innerText = document.getElementById('electricity-s').innerText;
	gasTekst.innerText = document.getElementById('gas-s').innerText;
	bedrijvenTekst.innerText = document.getElementById('businesses-s').innerText;
	autosTekst.innerText = document.getElementById('cars-s').innerText;

	shapeClass.setAttribute('d', shapeValues);
	menuSidebar.style.left = '250px';
	initiativeSidebar.style.left = '0';

	//places the svg/path on point 0,0
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
	menuSidebar.style.left = '0';
	console.log(datasetArray)
};

function changeYear() {
	jaar = '2017';
	propertyValue = 'complete_dataset_groenPercentage/' + jaar;

	datasetArray.map(entry => {
		style_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0_0(entry)
	})

	map.createPane('pane_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0');
    var layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0 = new L.geoJson(json_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0, {
        // attribution: '',
        interactive: true,
        dataVar: 'json_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
        // layerName: 'layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
        // pane: 'pane_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0',
        onEachFeature: pop_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0,
        style: style_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0_0,
    });
    map.addLayer(layer_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0);
    setBounds();
};

document.getElementById("yo").addEventListener("click", changeYear);
document.getElementById("sidebar-away").addEventListener("click", moveSidebar);