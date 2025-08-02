import { Donation, Home, Ocr_Prediction } from "./Components/comps.js"

const navbar = document.querySelector(".navbar");

navbar.querySelectorAll(".links").forEach((link) => {
	Home()

	link.addEventListener("click", (e_link) => {
		router(e_link.target.textContent)
		navbar.querySelectorAll(".links").forEach((e_link_others) => {
			e_link_others.querySelectorAll("li").forEach(li => li.classList.remove("active"))
		})
		if (e_link.target.nodeName == "LI") {

			console.log("tag name", e_link.target.nodeName)
			e_link.target.classList.add("active")
		}


	})
})

function router(location) {
	console.log(location)
	switch (location) {
		case "Bye Me Coffee":
			Donation();
			break;
		case "Home":
			Home();
			break;
		case "Try Extracting Texts":
			Ocr_Prediction();
			break;
		default:
			break;

	}

}
