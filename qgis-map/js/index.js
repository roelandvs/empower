let gemeenteNaam = document.getElementsByClassName("gemeente-titel");

function myFunction() {
	let sidebarTitle = document.querySelector(".sidebar-left h2");
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
	// console.log(gemeenteNaam[0].innerText);
};