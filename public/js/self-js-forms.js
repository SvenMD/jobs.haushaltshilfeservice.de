//* Paceholder -> Select-Fields
// Die folgende Funktion wird direkt beim Seitenaufruf ausgeführt um die "Placeholder der Select-Felder" anzupassen
let setColorStart = function () {
	//Einlesen aller option-Elemente
	let placeholderOptions = document.querySelectorAll("select option");
	// Alle eingelesenen Option-Element in einem Array um diesem mit den folgenden Scheifen auswerten zu können
	let placeholderArray = Array.from(placeholderOptions);
	/* ANMERKUNG -> Es hätte wohl auch funktioniert, wenn die Schleifen direkt über placeholderOption hätte laufen lassen, 
	anstatt den zusätzliche Weg über ein Array */
	// Durchlaufen des Arrays (placeholderArray) und für alle mit Index 0 -> also die "Placeholder-Einträge" dem Parent-Select-Field die Class "placeholder" zuzuweisen
	for (let i = 0; i < placeholderArray.length; i++) {
		if (placeholderArray[i].index === 0) {
			placeholderArray[i].parentElement.classList.add("placeholder");
		}
	}

	// Durchlaufen des Arrays (placeholderArray) und für alle mit Index != 0 -> also die "Zulässigen Einträge" dem Parent-Select-Field die Class "not-placeholder" zuzuweisen
	for (let i = 0; i < placeholderArray.length; i++) {
		if (placeholderArray[i].index != 0) {
			//console.log(placeholderArray[i].text);
			placeholderArray[i].classList.add("not-placeholder");
		}
	}
};
setColorStart();

// Die folgende Funktion wird onChange des jeweiligen Selct-Fields ausgeführt und setzte zum einen die Farbe des "Placeholder und verbirgt oder zeigt die nächsten, damit verbundenen Optionen in Verbindung mit shwoNextOtions()"
let setColorAndNextFields = function (elem) {
	let itemId = elem.id;
	// console.log("ID AUS SET COLOR: " + itemId);
	let selectedField = document.getElementById(itemId);
	// console.log("Das selectierte Element ist: " + selectedField);
	let itemOptionsIndex = selectedField.options.selectedIndex;
	// console.log(itemOptionsIndex);

	if (itemOptionsIndex === 0) {
		selectedField.classList.add("placeholder");
	} else {
		selectedField.classList.remove("placeholder");
	}
	if (
		itemId === "cs2lohnangabe" ||
		itemId === "cs2Start" ||
		itemId === "cs2RR"
	) {
		// console.log("JA");
		// console.log(itemId);
		shwoNextOtions(itemId);
	}
	if (itemId === "cs2Fz") {
		hinweisFuehrungszeugnis(itemId);
	}
};

// Anpassen der angezeigten Optionen bei einigen Selectfelder
// Infos: https://stackoverflow.com/questions/41361238/how-to-target-element-by-data-attribute-using-javascript
const shwoNextOtions = function (elem) {
	let selectField = document.getElementById(elem);
	// console.log("AUS FUNKTON -> KLICK AUF ->" + selectField);
	let itemOptionsIndex = selectField.options.selectedIndex;
	// console.log(itemOptionsIndex);
	let itemOptionsLength = selectField.options.length;
	// console.log(itemOptionsLength);

	if (selectField.id === "cs2lohnangabe") {
		let questionOne = document.body.querySelector('.form-group[data-next="1"]');
		// console.log(questionOne);
		let questionTwo = document.body.querySelector('.form-group[data-next="2"]');
		// console.log(questionTwo);

		if (itemOptionsIndex == itemOptionsLength - 1) {
			questionOne.classList.add("hidden");
			questionTwo.classList.remove("hidden");
			document.getElementById("cs2Stundenlohnangabe").focus();
		} else if (itemOptionsIndex == itemOptionsLength - 2) {
			questionOne.classList.remove("hidden");
			questionTwo.classList.add("hidden");
			document.getElementById("cs2Monatsbrutto").focus();
		} else {
			questionOne.classList.add("hidden");
			questionTwo.classList.add("hidden");
		}
	}
	if (selectField.id === "cs2Start") {
		let questionOne = document.body.querySelector('.form-group[data-next="0"]');
		let dateDetail = document.getElementById("cs2StartDate");
		// console.log(questionOne);

		if (itemOptionsIndex == itemOptionsLength - 1) {
			questionOne.classList.remove("hidden");
			dateDetail.required = true;
			document.getElementById("cs2StartDate").focus();
		} else if (itemOptionsIndex == itemOptionsLength - 2) {
			questionOne.classList.add("hidden");
			dateDetail.required = false;
		} else {
			questionOne.classList.add("hidden");
			dateDetail.required = false;
		}
	}

	if (selectField.id === "cs2RR") {
		let questionOne = document.body.querySelector(
			'.form-group[data-next="tel"]'
		);
		let telNumber = document.getElementById("cs2PhoneNum");
		// console.log(questionOne);

		if (itemOptionsIndex == itemOptionsLength - 2) {
			questionOne.classList.remove("hidden");
			telNumber.required = true;
			document.getElementById("cs2PhoneNum").focus();
		} else if (itemOptionsIndex == itemOptionsLength - 1) {
			questionOne.classList.add("hidden");
			telNumber.required = false;
		} else {
			questionOne.classList.add("hidden");
			telNumber.required = false;
		}
	}
};

// Einblenden und verstecken der Info-Alerts
let showMore = function (elem) {
	// Selectieren des Buttons
	let clickedItem = document.getElementById(elem.id);
	// console.log("Button: " + clickedItem);
	// Ermitteln des Datset-Attributes für die Selection des Divs by ID
	let elemData = clickedItem.getAttribute("data-alert");
	// console.log("Dataset= " + elemData);
	// Selection des Divs der angezeigt werden soll
	let divToShow = document.getElementById(elemData);
	// console.log("DIV = " + divToShow);
	// Div anzeigen wenn hidden in Klasse enthalten ist
	if (divToShow.classList.contains("hidden")) {
		divToShow.classList.remove("hidden");
		// Text auf Button ändern
		clickedItem.innerText = "Infos ausblenden";
	} else {
		// Div ausblenden wenn hidden nicht in Klasse enthalten ist
		divToShow.classList.add("hidden");
		// Text auf Button ändern
		clickedItem.innerText = "Weitere Infos anzeigen";
	}
};

//Einblenden das Warnhinweise fehlendes Führungszeugnis
let hinweisFuehrungszeugnis = function (elem) {
	let selectField = document.getElementById(elem);
	// console.log("AUS FUNKTON -> KLICK AUF ->" + selectField);
	let itemOptionsIndex = selectField.options.selectedIndex;
	// console.log("test 1 - " + itemOptionsIndex);
	let itemOptionsLength = selectField.options.length;
	// console.log("test 2 - " + itemOptionsLength);
	if (itemOptionsIndex == itemOptionsLength - 1) {
		document
			.getElementById("alert-fuehrungszeugnis")
			.classList.remove("hidden");
	} else {
		document.getElementById("alert-fuehrungszeugnis").classList.add("hidden");
	}
};

hinweisFuehrungszeugnis("cs2Fz");
