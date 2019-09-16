/**
 * @fileoverview
 * options.js serves to handle inputing the users keys
 * When the page is first called, we determine if keys have already been submitted, if so we display a message
 * Otherwise we present the user with the input form
 * On submission of the form we also check the keys and report success or errors
 */

/**
 * upon load we send firstMessage to see if we already have the keys
 * Then we set up the form and read the form values upon submit
 */
window.onload = function() {
  var form = document.querySelector(".needs-validation");
  firstMessage();
  form.addEventListener("submit", function(event) {
    var AccessKey = document.getElementById("AccessKey"); // Get values from form and assign them to respective Keys
    var SecretKey = document.getElementById("SecretKey");
    var AccessValue = AccessKey.value;
    var SecretValue = SecretKey.value;
    if (!form.checkValidity()) {
      // prevents submission based on not having enough characters in each box.
      event.preventDefault();
      event.stopPropagation();
    } else {
      testFetch(AccessValue, SecretValue); // fetch to see if keys are valid
      event.preventDefault();
    }
    form.classList.add("was-validated");
  });
};
