// *** Form CTA Subscribe 1 *** //
var csNotifications = $(".cs-notifications"); // Das ist der Div für die rote Rückmeldung oberhalb des Froms

function formCTASubscribe1() {
	$("#form-cta-subscribe-1").validate({
		// .vlidate prüft auf rules und gibt fügt Nichteinhalten die Klasse error hinzu
		// rules
		rules: {
			cs1Name: {
				required: true,
				minlength: 3,
			},
			cs1Email: {
				required: true,
				email: true,
			},
			cs1PhoneNum: {
				required: true,
				number: true,
				/* minlength: 12,
				maxlength: 12, */
			},
			cs1datenschutzbestaetigung: {
				required: true,
			},
		},
	});

	// Festlegen der Error-Message
	var errorMsgData = csNotifications.data("error-msg"),
		errorMsgDefault = "Bitte ergänzen Sie die fehlenden Angaben",
		errorMsg = errorMsgData ? errorMsgData : errorMsgDefault;

	/* 
	Beispiel zum verstehen von isDefaultPrevented()
	$("#form-cta-subscribe-1").on("click", function (event) {
		alert(event.isDefaultPrevented()); // false
		event.preventDefault();
		alert(event.isDefaultPrevented()); // true
	}); */

	// Submit event
	$("#form-cta-subscribe-1").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			// an dieser Stelle wird geprüft. ob preventDefault() schon aufgerufen wurde -> also ob bereits ein Klick auf Submit erfogte , Wenn ja -> wird dieser Content in den Message-Container eingefühgt
			var errorContent =
				'<i class="cs-error-icon fas fa-times"></i>' + errorMsg;
			cs1SubmitMSG(false, errorContent);
			cs1Error();
		} else {
			// ansonsten wird cs1SubmitForm() ausgeführt
			event.preventDefault();
			cs1SubmitForm();
		}
	});
}

// Absenden des RR-Forms mithilfe von Ajax
function cs1SubmitForm() {
	var s = $("#cs1Name").val(),
		i = $("#cs1Email").val(),
		c = $("#cs1PhoneNum").val(),
		f = $("#cs1formname").val(),
		d = $("#cs1datenschutzbestaetigung").val();
	$.ajax({
		type: "POST",
		url: "./php/sendMailCs1.php",
		data:
			"cs1formname=" +
			f +
			"&cs1Name=" +
			s +
			"&cs1Email=" +
			i +
			"&cs1PhoneNum=" +
			c +
			"&cs1datenschutzbestaetigung=" +
			d,
		success: function (s) {
			// hier wird die Rückgabe des PHP-Scripts verarbeitet und bei Rückgabe von success wird cs1Success() ausgeführt
			"success" == s ? cs1Success() : (cs1Error(), cs1SubmitMSG(!1, s));
		},
	});
}
function cs1Success() {
	var s = csNotifications.data("success-msg"),
		i = s || "Ihre Rückrufbitte wurde übermittelt";
	$("#form-cta-subscribe-1")[0].reset(),
		cs1SubmitMSG(!0, '<i class="cs-success-icon fas fa-check"></i>' + i),
		$(".cs-notifications-content").addClass("sent"),
		csNotifications.css("opacity", 0),
		csNotifications
			.slideDown(300)
			.animate({ opacity: 1 }, 300)
			.delay(5e3)
			.slideUp(400),
		$("#form-cta-subscribe-1").hasClass("redirected") &&
			setTimeout(function () {
				window.location.href = "page-thank-you.html";
			}, 3e3);
}
function cs1Error() {
	csNotifications.css("opacity", 0),
		csNotifications.slideDown(300).animate({ opacity: 1 }, 300),
		$(".cs-notifications-content").removeClass("sent");
}
function cs1SubmitMSG(s, i) {
	var c;
	(c = "shake animated"), // hinzufügen der Klassen shake und animated
		csNotifications
			.delay(300)
			.addClass(c)
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					$(this).removeClass("shake bounce animated");
				}
			),
		csNotifications.children(".cs-notifications-content").html(i);
}
