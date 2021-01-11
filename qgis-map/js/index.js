
function buildSidebar(gemeente) {
	let shapeClass = document.querySelector(".sidebar-gemeente");
	let sidebarTitle = document.querySelector(".sidebar-left h2");
	let gemeenteNaam = document.getElementsByClassName("gemeente-titel");
	let shapeValues = gemeente.getAttribute('d');
	let xCoordinate = gemeente.getBBox().x;
	let yCoordinate = gemeente.getBBox().y;

	//makes title of sidebar the gemeente
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	//adds the path shape to sidebar
	shapeClass.setAttribute('d', shapeValues);

	console.log('x', xCoordinate);
	console.log('y', yCoordinate);

	//places the svg/path on point 0,0
	if (yCoordinate < 0) {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px," + (yCoordinate * -1) + "px)";
	} else if (xCoordinate < 0) {
		shapeClass.style.transform = "translate(" + (xCoordinate * -1) + "px, -" + yCoordinate + "px)";
		console.log('yo');
	} else {
		shapeClass.style.transform = "translate(" + "-" + xCoordinate + "px, -" + yCoordinate + "px)";
	}

	// if (gemeente.getBoundingClientRect().width > 150) {
	// 	shapeClass.style.transform = shapeClass.style.transform + "scale(0.9)";
	// } 
	// else {
	// 	shapeClass.style.transform = "translate(" + "-" + (xCoordinate - xCoordinate * 0.19) + "px, -" + yCoordinate + "px)";
	// }
};