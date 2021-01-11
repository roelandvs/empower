let sidebar = document.querySelector(".sidebar");

function buildSidebar(gemeente) {
	let shapeClass = document.querySelector(".sidebar-gemeente");
	let sidebarTitle = document.querySelector(".sidebar-left h2");
	let gemeenteNaam = document.getElementsByClassName("gemeente-titel");
	let shapeValues = gemeente.getAttribute('d');
	let xCoordinate = gemeente.getBBox().x;
	let yCoordinate = gemeente.getBBox().y;

	//makes title of sidebar the gemeente
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	shapeClass.setAttribute('d', shapeValues);
	sidebar.style.left = '0';

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
	sidebar.style.left = '-300px';
	console.log('ja');
}


document.getElementById("sidebar-away").addEventListener("click", moveSidebar);