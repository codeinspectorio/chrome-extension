/**
 * testFetch sends potential keys to background script. Depending on the response we either accept or neny these keys and display proper response
 * @param {string} AccessValue
 * @param {string} SecretValue
 */
function testFetch(AccessValue, SecretValue) {
  chrome.runtime.sendMessage(
    { access: AccessValue, secret: SecretValue, key: "keys" },
    function(response) {
      var div = document.getElementById("enterAlert");
      if (response === "noError") {
        // If fetch is successful, display success message otherwise display message
        chrome.storage.sync.set(
          // on success add these values to chrome storage API so it can be accessed anywhere in the extension
          { AccessKey: AccessValue, SecretKey: SecretValue },
          function() {
            div.setAttribute("class", "alert alert-success"); // Success message banner
            div.innerHTML = "Form Successfully submitted";
          }
        );
      }
      // display error message based on error
      else if (response === "invalidCred") {
        div.setAttribute("class", "alert alert-danger");
        div.innerHTML = "Invalid Keys please try again";
      } else if (response === "network") {
        div.setAttribute("class", "alert alert-danger");
        div.innerHTML = "Network Issue";
      } else if (response === "timeout") {
        div.setAttribute("class", "alert alert-danger");
        div.innerHTML = "Timeout";
      } else {
        div.setAttribute("class", "alert alert-danger");
        div.innerHTML = "Error";
      }
    }
  );
}
/**
 * firstMessage is executed when the page is first loaded to let the user know whether or not the right keys already have been added
 */
function firstMessage() {
  var AccessKey = "";
  var SecretKey = "";
  document.getElementById("form").style.display = "none";
  chrome.storage.sync.get(["AccessKey"], function(result) {
    AccessKey = result.AccessKey;

    chrome.storage.sync.get(["SecretKey"], function(result) {
      SecretKey = result.SecretKey;
      chrome.runtime.sendMessage(
        {
          access: AccessKey,
          secret: SecretKey,
          key: "keys"
        },
        function(response) {
          var div = document.createElement("enterAlert");
          div.id = "enterAlert";
          div.className = "alert alert-info";

          if (response === "noError") {
            // If fetch is successful, display success message otherwise display message
            div.setAttribute("class", "alert alert-success"); // Success message banner while adding button for the dropdown
            div.innerHTML =
              'Keys already have been submitted.<br> If you would like to add a new pair of keys click <button class = "collapsible">here</button>';
          } else {
            // any type of error it asks you to input keys
            div.setAttribute("class", "alert alert-info"); // display welcome message and where to find keys
            div.innerHTML =
              ' Please enter keys which can be found <a href="https://www.code-inspector.com/user/profile" target="_blank" class="alert-link">here</a> under API key.';
            document.getElementById("form").style.display = "block";
          }
          document.getElementsByClassName("row pt-5")[0].appendChild(div); // add the banner to the page above the form
          setCollapse(); // call the collapsible to make sure the button in success case collapses the form
        }
      );
    });
  });
}
/**
 * If the current keys work, the page hides the form to submit new keys
 * setCollapse expands form to enter new keys.
 */
function setCollapse() {
  const dropdownButton = document.getElementsByClassName("collapsible");

  if (dropdownButton[0] != undefined) {
    // if the collapsible exists on the current page. This happens when we reach the keys have already been submitted page with the dropdown button present
    dropdownButton[0].style.margin = "0 0 0 auto";
    dropdownButton[0].style.outline = "none";
    dropdownButton[0].style.borderRadius = "10rem";

    dropdownButton[0].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = document.getElementById("form"); // on click identifies the div after button which happens to have the className as content

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  return true; // for testing purposes to make sure the function ran through without syntax error etc.
}
