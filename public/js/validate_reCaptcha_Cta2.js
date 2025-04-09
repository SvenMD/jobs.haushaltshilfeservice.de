"use strict";


  const errorParagraph = document.querySelector("#errorReCaptcha").firstElementChild;
  console.log(errorParagraph);
  const divReCaptcha = document.querySelector("#recaptcha");
  console.log(divReCaptcha);

  // Get the form element
  var form = document.getElementById('form-cta-subscribe-2');

  // Add an event listener to the form's submit event
  form.addEventListener('submit', function(event) {
    // Check if the reCAPTCHA widget has been completed
    if (!grecaptcha.getResponse()) {
      // Prevent the form from being submitted
      event.preventDefault();

      // Display an error message
      divReCaptcha.classList.add("captcha-error");
      errorParagraph.textContent = "Bitte führen Sie diese Abfrage durch";
    } else {
      divReCaptcha.classList.remove("captcha-error");
      errorParagraph.textContent = "";
    }
  });
