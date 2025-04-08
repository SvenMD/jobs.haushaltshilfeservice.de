"use strict";

// Einlesen aller Buttons mit der Klasse detail-button
const detailsOneButton = document.querySelectorAll(".detail-button");
//Alle Elemente in einen Array einlesen
const arrayButtons = Array.from(detailsOneButton);
// Einlesen des Elementes mit der Klasse details-area-1
const detailsAreaOne = document.querySelector(".details-area-1");
//Ermitteln der div.before-details um ihn nach dem aktivieren der Details stylen zu können
const divBeforeDetails = document.querySelectorAll(".before-details");
/* **** Durchlaufen des Arrays "arrayButtons und bei Click die Funktion setDisplay ausführen" *** */
//Ermitteln des "Schließen-Buttons"
const detailsOneCloserButton = document.querySelectorAll(".closer-1");

function removeHeadingDetails() {
	//ermiiteln der h3.details-heading-1 sofern vorhanden
	const headingDetailsOne = document.querySelector(".details-heading-1");
	//Wenn vorhanden löschen
	if (headingDetailsOne) {
		headingDetailsOne.parentNode.removeChild(headingDetailsOne);
	} /*  else {
		console.log("keine Ergebinsse");
	} */
}

function removeParagraphDetails() {
	// Ermitteln und entfernen des p.details-para-1 sofern vorhanden
	const paraDetailsOne = document.querySelector(".details-para-1");
	//Wenn vorhanden löschen
	if (paraDetailsOne) {
		paraDetailsOne.parentNode.removeChild(paraDetailsOne);
	} /* else {
		console.log("keine Ergebinsse");
	} */
}
//Entfernen evt. bestehender h3.details-heading-1
/* Alternative, getrennt Schreibweise ohne Arrow-Function wäre auch : */
/* arrayButtons.forEach(setClick);
function setClick(elem) {
	elem.addEventListener("click", setDisplay2);
} */

arrayButtons.forEach((elem) => {
	elem.addEventListener("click", setDisplay);
});

const detailsHidden = document.querySelectorAll(".details-hidden");
const detailsHiddenArray = Array.from(detailsHidden);

function setDisplay(e) {
	//Entfernen evt. bestehender h3.details-heading-1 & p.details-para-1
	// Entfernen der heading => muss in dieser Funktion aufgerufen werden, da sie von außen nicht erneute durchlaufen würde, sobald ein andere Beitrag geklickt wird
	removeHeadingDetails();
	// Ermitteln des p.details-para-1
	// Entfernen des Paragrafen => Auch hier muss der Aufruf in dieser Funktion erfolgen, da sie von außen nicht erneute durchlaufen würde, sobald ein andere Beitrag geklickt wird
	removeParagraphDetails();

	// Hier geht es weiter
	detailsHiddenArray.forEach((edetail) => {
		edetail.classList.remove("details-hidden");
	});
	/* const divBeforeDetails = document.querySelectorAll(".before-details"); */
	divBeforeDetails.forEach((div) => {
		div.classList.add("active");
	});
	// Ermitteln der Index des geklickten Buttons aus dem Array arrayButtons
	const clickIndex = arrayButtons.indexOf(e.currentTarget);
	// Ermitteln des aktiv geklickten Buttons
	const activButton = detailsOneButton[clickIndex];
	// Ermitteln des den Button umschließenden Div's und in const speichern
	const enclosingDiv = activButton.closest("div");
	// Ermitteln des den vorherigen Div umschließenden Div's und in const speichern
	const firstUpperEnclosingDiv = enclosingDiv.parentNode;
	// Erneutes ermitteln des den wiederum vorherigen Div umschließenden Div's und in const speichern
	const secondUpperEnclosingDiv = firstUpperEnclosingDiv.parentNode;
	// hinzufügen der Klasse "active-button" zu diesem äußeren Div
	secondUpperEnclosingDiv.classList.add("active-button");

	//Ermiiteln der details-1 h4
	//Ermiiteln der h4's
	const headerDetails = document.querySelectorAll(".details-1");
	//Ermiiteln des Tetes innerhalb der h4
	const headerDetailsText = headerDetails[clickIndex].innerText;
	/* Die fogende variante mit einer dynmisch erzeugte h3 habe ich vorerst verworfen, da ich diese dann immer wieder entfernen muss, damit sie sich nicht stapeln, sofern der User von einem Detail zum nächsten spricngt ohne die Details zu schließen. */
	/* const detailsHeading = document.createElement("h3");
	detailsHeading.textContent = headerDetailsText;
	detailsAreaOne.appendChild(detailsHeading); */

	//Hinzufügen einer H3 zum div.details-area-1

	const headingInsideDetails = document.createElement("h3");
	//Einfügen des Inhalts
	headingInsideDetails.textContent = headerDetailsText;
	//Hinzufügen der Klasse details-heading-1 zur neu erstellten h3
	headingInsideDetails.classList.add("details-heading-1");
	// Festlegen der const für den aktuellen Indexes des Containers aus  dem Array
	const closerDivOne = detailsOneCloserButton[0];

	// Eifügen der H3 in den Close-1 Div als erstes Element
	closerDivOne.insertBefore(headingInsideDetails, closerDivOne.firstChild);

	//Ermitteln der Paragrphen mit den Inhalten
	// => der P überschreibt momentan noch den erzeugen h2-Tag!

	// Ermitteln aller "Beschreibung / Details"-Paragraphen
	const truncatePara = document.querySelectorAll(".truncate");
	// Erstellen einer Array-Const aus allen "Beschreibungen / Details"-Paragraphen um dann den aktuell geklickte ermitteln und ausgeben zu können
	const truncateParas = Array.from(truncatePara);
	// Einlesen des iNhalts des aktuell geklickten Themas in eine Const
	const inhaltPara = truncateParas[clickIndex].innerHTML;

	//Erstellen eines neune Paragraphen innerhalb div.details-area-1
	const detailParagraph = document.createElement("p");
	// Inhalt hinzufügen
	detailParagraph.innerHTML = inhaltPara;
	// Hinzufügern der Klasse details-para-1
	detailParagraph.classList.add("details-para-1");
	// Hinzufügen des Paragrphen zum Div
	detailsAreaOne.appendChild(detailParagraph);

	//Ermitteln des p-Tgas innerhab der Deatils-Area um die Klasse truncate zu entfernen
	/* const detailParagraph = detailsAreaOne.querySelector("p"); */
	/* // Entfernen der Klasse truncate um den gesamten Inhalt anzuzeigen
	detailParagraph.classList.remove("truncate");
	// Hizufügen der Klasse details-para-1 um diesen hinmterher entfernen zu können */
	/* detailParagraph.classList.add("details-para-1"); */
	// Erstellen einer Const des des Ausgabe-Divs mit der ID #section-details-1
	const scrollToDetailsOne = document.querySelector("#section-details-1");
	// Scrollen um den Ausgabe-Div sichtbar in das Fenster zu setzen
	scrollToDetailsOne.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// *** Closer-Actions

//Sofern es mehrere gibt: Erstellen einer Const aus dem vorherigen Array
const arrayCloserButtons = Array.from(detailsOneCloserButton);
// Durchlaufen des Arrays und "aufschalten" eines Clickevents was bei eintreten die function setHidden anstößt
arrayCloserButtons.forEach((elem) => {
	elem.addEventListener("click", setHidden);
});

function setHidden(e) {
	//Entfernen evt. bestehender h3.details-heading-1 & p.details-para-1
	// Entfernen der heading
	removeHeadingDetails();
	// Entfernen des Paragrafen
	removeParagraphDetails();
	/* arrayCloserButtons.forEach((elem) => {
		elem.addEventListener("click", setHidden); */
	detailsHiddenArray.forEach((edetailclose) => {
		edetailclose.classList.add("details-hidden");
	});
	/* }); */

	// Entfernen der Klasse active und zurücksetzen des Stylings (padding-bottom)
	divBeforeDetails.forEach((div) => {
		div.classList.remove("active");
	});
	//ermitteln des "activen, geklickten divs indem sich der geklickte Button befindet um dann dorthin nach dem schließen scrollen zu können
	const closeTargetOne = document.querySelector(".active-button");
	//scrollen zum zuletzt geklickten Bereich (div)
	closeTargetOne.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* Appointment-Section */

const calendarButtons = document.querySelectorAll(
	"#tel-karin-guth, #video-sven-guth"
);

function goToCalender(clickedButton) {
	// Get the index of the clicked button within the calendarButtons NodeList
	const selectedIndex = Array.prototype.indexOf.call(
		calendarButtons,
		clickedButton.currentTarget
	);
	// Define redirect URLs based on selected index
	const redirectUrls = {
		0: "https://calendar.app.google/Y7KUcVcHTrb6P2px5", // URL for Karin
		1: "https://calendar.app.google/VaLPXCna9XMZ21QJ6", // URL for Sven
	};

	// definiren der geklickten URL
	const selectedUrl = redirectUrls[selectedIndex];

	// open new window with selcted url und remov the click-vent
	if (selectedUrl) {
		window.open(selectedUrl, "_blank");
		consentDiv.classList.add("hidden"); // Hide consent div after redirect
		// Remove event listener after use to prevent multiple clicks
		buttonConsent.removeEventListener("click", followConsent);
	} else {
		console.log("Keine URL gefunden");
	}
}

// Attach click event listeners to each calendar button
calendarButtons.forEach((button) => {
	button.addEventListener("click", goToCalender);
});

//add click-event to overlay-container
const closeConsentDivButton = document.querySelector("#close-consent");
closeConsentDivButton.addEventListener("click", closeConsentDiv);

// close the overlay-container by consent
function closeConsentDiv() {
	const consentDiv = document.querySelector(".consent-info");
	consentDiv.classList.add("hidden");
	//Ruf testweise die Funktion ClassShow auf => muss wiedr entfernt werden
	classShow();
}

// Erneutes setzen des Overlays

function observeElement(element, callback) {
	const options = {
		root: null, // Beobachten Sie den Viewport
		threshold: 1, // Auslösen, wenn das gesamte Element außerhalb des Viewports ist
		once: true, // Nur einmal aufrufen
	};

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) {
				callback(); // Event auslösen, wenn das Element vollständig unsichtbar ist
				observer.unobserve(element); // Beobachter nach dem Auslösen des Events stoppen
			}
		}
	}, options);

	observer.observe(element); // Das zu beobachtende Element angeben
}

const elementToObserve = document.querySelector("#section-clients-1");

// Überprüfung nach Click
function classShow() {
	const divElement = document.querySelector(".consent-info");
	const classList = divElement.classList;
	const hasSpecificClass = classList.contains("hidden");
	console.log(`Element has class "hidden": ${hasSpecificClass}`);
}

// Überprüfung vor Click
const divElement = document.querySelector(".consent-info");
const classList = divElement.classList;
const hasSpecificClass = classList.contains("hidden");

observeElement(elementToObserve, () => {
	// console.log("Element hat den Viewport vollständig verlassen!"); // Event-Handler-Funktion
});

// Buttonbreite der Action-Buttons in den Artikeln anpassen
let arrayFirstButtons = Array.from(document.querySelectorAll(".cta-button"));

let arraySecondButtons = Array.from(document.querySelectorAll(".rr-button"));

for (let i = 0; i < arrayFirstButtons.length; i++) {
	let widthArrayFirstCtaButtons = arrayFirstButtons[i].offsetWidth + "px";
	arraySecondButtons[i].style.width = widthArrayFirstCtaButtons;
}

//* More Infor for RR

const rrDialog = document.getElementById("dialogRRP");
const rrDialogContent = document.getElementById("dialogRrContent");
const rrDialogClose = document.getElementById("dialogRRClose");
// console.log(rrDialog);
function showRrDialog() {
	rrDialogContent.showModal();
}

function closeRrDialog() {
	rrDialogContent.close();
}
rrDialog.addEventListener("click", showRrDialog);
rrDialogClose.addEventListener("click", closeRrDialog);
rrDialogContent.addEventListener("click", (event) => {
	console.log(event.target);
	if (event.target === rrDialogContent) {
		rrDialogContent.close();
	}
});

//* copieMail RR
const mailSpan = document.querySelector("#copieMail");
const mailInput = document.querySelector("#cs1Email");

const changeContent = function () {
	if (mailInput.value) {
		mailSpan.textContent = `an ${mailInput.value} `;
	} else {
		mailSpan.textContent = "";
	}
};

mailInput.addEventListener("change", changeContent);


//* copieMail Bewerbung
const mailSpanBewerbung = document.querySelector("#copiemail-bewerbung");
const mailInputBewerbung = document.querySelector("#cs2Email");

const changeContentBewerbung = function () {
	if (mailInputBewerbung.value) {
		mailSpanBewerbung.textContent = ` an ${mailInputBewerbung.value} `;
	} else {
		mailSpanBewerbung.textContent = "";
	}
};

mailInputBewerbung.addEventListener("change", changeContentBewerbung);


//* Ampelstatus

let activeStatus = 1;

const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");
const red = document.querySelector(".red");

// console.log(red);

if (activeStatus === 1) {
	green.classList.add("active");
	yellow.classList.remove("active");
	red.classList.remove("active");
} else if (activeStatus === 2) {
	green.classList.remove("active");
	yellow.classList.add("active");
	red.classList.remove("active");
} else if (activeStatus === 3) {
	green.classList.remove("active");
	yellow.classList.remove("active");
	red.classList.add("active");
} else if (activeStatus === 4) {
	green.classList.add("active");
	yellow.classList.add("active");
	red.classList.remove("active");
} else {
	green.classList.add("active");
	yellow.classList.remove("active");
	red.classList.remove("active");
}
