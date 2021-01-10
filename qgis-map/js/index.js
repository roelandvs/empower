let gemeenteNaam = document.getElementsByClassName("gemeente-titel");
let sidebarTitle = document.querySelector(".sidebar-left h2");

function myFunction() {
	sidebarTitle.innerText = gemeenteNaam[0].innerText;
};