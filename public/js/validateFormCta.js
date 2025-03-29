"use strict";

// *** Form CTA Subscribe 1 *** //
var csNotifications2 = $(".cs-notifications-cta"); // Das ist der Div für die rote Rückmeldung oberhalb des Froms

function formCTASubscribe2() {
	$("#form-cta-subscribe-2").validate({
		// .vlidate prüft auf rules und gibt fügt Nichteinhalten die Klasse error hinzu
		// rules

		rules: {
			cs2Anrede: {
				required: true,
			},
			cs2Name: {
				required: true,
				minlength: 3,
			},
			cs2PLZ: {
				required: true,
				number: true,
			},
			cs2Email: {
				required: true,
				email: true,
			},
			cs2RR: {
				required: true,
				cs2PhoneNum: {
					depends: function (element) {
						return $("#cs2RR").is(
							"Ja, ich gestatte die telefonische Kontaktaufnahme"
						);
					},
				},
			},
			cs2BwGrund: {
				required: true,
				minlength: 15,
			},
			cs2Start: {
				required: true,
				cs2StartDate: {
					depends: function (element) {
						return $("#cs2StartDate").is("Später");
					},
				},
			},
			cs2Fz: {
				required: true,
			},
			cs2Datenschutz: {
				required: true,
			},
		},
	});

	// Festlegen der Error-Message
	var errorMsgData = csNotifications2.data("error-msg"),
		errorMsgDefault = "Bitte ergänzen Sie die fehlenden Angaben",
		errorMsg = errorMsgData ? errorMsgData : errorMsgDefault;

	/* 
	Beispiel zum verstehen von isDefaultPrevented()
	$("#form-cta-subscribe-2").on("click", function (event) {
		alert(event.isDefaultPrevented()); // false
		event.preventDefault();
		alert(event.isDefaultPrevented()); // true
	}); */

	// Submit event
	$("#form-cta-subscribe-2").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			// an dieser Stelle wird geprüft. ob preventDefault() schon aufgerufen wurde -> also ob bereits ein Klick auf Submit erfogte , Wenn ja -> wird dieser Content in den Message-Container eingefühgt
			var errorContent =
				'<i class="cs-error-icon fas fa-times"></i>' + errorMsg;
			cs2SubmitMSG(false, errorContent);
			cs2Error();
		} else {
			// ansonsten wird cs2SubmitForm() ausgeführt
			event.preventDefault();
			cs2SubmitForm();
		}
	});
}

// Absenden des RR-Forms mithilfe von Ajax
function cs2SubmitForm() {
	var cta_0 = $("#cs2formname").val(),
		cta_1 = $("#cs2Anrede").val(),
		cta_2 = $("#cs2Name").val(),
		cta_3 = $("#cs2PLZ").val(),
		cta_4 = $("#cs2Email").val(),
		cta_5 = $("#cs2RR").val(),
		cta_6 = $("#cs2PhoneNum").val(),
		cta_7 = $("#cs2BwGrund").val(),
		cta_8 = $("#cs2Start").val(),
		cta_9 = $("#cs2StartDate").val(),
		cta_10 = $("#cs2Fz").val(),
		cta_11 = $("#cs2BirthYear").val(),
		cta_12 = $("#cs2Nation").val(),
		cta_13 = $("#cs2language").val(),
		cta_14 = $("#cs2Fs").val(),
		cta_15 = $("#cs2StdAz").val(),
		cta_16 = $("#cs2lohnangabe").val(),
		cta_17 = $("#cs2Monatsbrutto").val(),
		cta_18 = $("#cs2Stundenlohnangabe").val(),
		cta_19 = $("#cs2Videocall").val(),
		ds = $("#cs2Datenschutz").val();
	$.ajax({
		type: "POST",
		url: "./php/sendMailCs2.php",
		data:
			"cs2formname=" +
			cta_0 +
			"&cs2Anrede=" +
			cta_1 +
			"&cs2Name=" +
			cta_2 +
			"&cs2PLZ=" +
			cta_3 +
			"&cs2Email=" +
			cta_4 +
			"&cs2RR=" +
			cta_5 +
			"&cs2PhoneNum=" +
			cta_6 +
			"&cs2BwGrund=" +
			cta_7 +
			"&cs2Start=" +
			cta_8 +
			"&cs2StartDate=" +
			cta_9 +
			"&cs2Fz=" +
			cta_10 +
			"&cs2BirthYear=" +
			cta_11 +
			"&cs2Nation=" +
			cta_12 +
			"&cs2language=" +
			cta_13 +
			"&cs2Fs=" +
			cta_14 +
			"&cs2StdAz=" +
			cta_15 +
			"&cs2lohnangabe=" +
			cta_16 +
			"&cs2Monatsbrutto=" +
			cta_17 +
			"&cs2Stundenlohnangabe=" +
			cta_18 +
			"&cs2Videocall=" +
			cta_19 +
			"&cs2Datenschutz=" +
			ds,
		success: function (s) {
			// hier wird die Rückgabe des PHP-Scripts verarbeitet und bei Rückgabe von success wird cs2Success() ausgeführt
			"success" == s ? cs2Success() : (cs2Error(), cs2SubmitMSG(!1, s));
		},
	});
}
function cs2Success() {
	var s = csNotifications2.data("success-msg"),
		i = s || "Vielen Dank, Ihre Bewerbung wurde übermittelt :)";
	// Hinzugefügt um die Succsess-Meldung sichtbar zu machen
	$("html, body").animate(
		{
			scrollTop: $("#cta-anker").offset().top,
		},
		500
	);

	$("#form-cta-subscribe-2")[0].reset(),
		cs2SubmitMSG(!0, '<i class="cs-success-icon fas fa-check"></i>' + i),
		$(".cs-notifications-content-2").addClass("sent"),
		csNotifications2.css("opacity", 0),
		csNotifications2
			.slideDown(300)
			.animate({ opacity: 1 }, 300)
			.delay(5e3)
			.slideUp(400),
		$("#form-cta-subscribe-2").hasClass("redirected") &&
			setTimeout(function () {
				window.location.href = "page-thank-you.html";
			}, 3e3);
}
function cs2Error() {
	csNotifications2.css("opacity", 0),
		csNotifications2.slideDown(300).animate({ opacity: 1 }, 300),
		$(".cs-notifications-content-2").removeClass("sent");
}
function cs2SubmitMSG(s, i) {
	var c;
	(c = "shake animated"), // hinzufügen der Klassen shake und animated
		csNotifications2
			.delay(300)
			.addClass(c)
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					$(this).removeClass("shake bounce animated");
				}
			),
		csNotifications2.children(".cs-notifications-content-2").html(i);
}
