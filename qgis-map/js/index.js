let gemeenteNaam = document.getElementsByClassName("gemeente-titel");
let sidebar = document.getElementsByClassName("sidebar-left");
let sidebarTitle = document.querySelector(".sidebar-left h2");

function buildSidebar(gemeente) {
	let shapeClass = document.querySelector(".sidebar-gemeente");
	let xCoordinate = gemeente.getBBox().x;
	let yCoordinate = gemeente.getBBox().y;
	let shapeValues = gemeente.getAttribute('d');

	console.log('x', xCoordinate);
	console.log('y', yCoordinate);

	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	shapeClass.setAttribute('d', shapeValues);

	if (yCoordinate < 0) {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px," + (yCoordinate * -1 - 3) + "px)";
	} else {
		shapeClass.style.transform = "translate(" + "-" + (xCoordinate - 3) + "px, -" + (yCoordinate - 3) + "px)";
	}
};