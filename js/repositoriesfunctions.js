/**
 * addBadgeStyle styles the span like a bootstrap badge
 * @param {object} span this is the span we create with the with the information of the error
 */
function addBadgeStyle(span) {
  span.setAttribute(
    "style",
    "background-color: #17a2b8; border-radius: 10rem; color: white; font-size: 0.8em; font-weight: bold; padding-right: .6em;padding-left: .6em; border-radius: 10rem;"
  );
}
/**
 * addProjectInfoToPage displays the errors for the repository by searching for a repository name that matches the one in the response
 * It then adds in errors by error type
 * @param {object} response the summary of errors for a particular repository
 */
function addProjectInfoToPage(response) {
  var headers = document.getElementsByTagName("h3");
  for (var j = 0; j < headers.length; j++) {
    var els = headers[j].getElementsByTagName("a");
    for (var i = 0; i < els.length; i++) {
      var prop = els[i].getAttribute("itemprop");

      if (
        prop === "name codeRepository" &&
        els[i].innerHTML.includes(response.name) // check to see that the text is a repository and matches the one passed by response
      ) {
        //fetch returns number of violations, duplicates, complexfunctions for the specified repository
        //create the badges
        var span = document.createElement("span");

        if (response.lastAnalysis.summary.violations != 0) {
          addBadgeStyle(span);
          span.innerHTML =
            "Violations " + response.lastAnalysis.summary.violations;
          headers[j].appendChild(span);
        }
        if (response.lastAnalysis.summary.duplicates != 0) {
          span = document.createElement("span");
          addBadgeStyle(span);
          span.innerHTML =
            "Duplicates " + response.lastAnalysis.summary.duplicates;
          headers[j].appendChild(span);
        }
        if (response.lastAnalysis.summary.complexFunctions != 0) {
          span = document.createElement("span");
          addBadgeStyle(span);
          span.innerHTML =
            "Complex Functions " +
            response.lastAnalysis.summary.complexFunctions;
          headers[j].appendChild(span);
        }
      }
    }
  }
}
/**
 * fetchData gets summary of all repositories that exist in code inspector
 * Filter results by ones that are on github and display them in the page
 */

function fetchData() {
  chrome.runtime.sendMessage(
    { key: "reposTab", url: window.location.href },
    function(response) {
      if (response === "fetchFailed" || response === "timeout") {
        displayError(response);
        return true;
      } else {
        for (var i = 0; i < response.length; i++) {
          if (response[i].repository.url.includes("github.com"))
            addProjectInfoToPage(response[i]);
        }
      }
    }
  );
}
/**
 * displayError makes a slidedown alert appear and then disappear upon a failed or timeout response from our api
 * @param {string} response what kind of failure we have to display a different failed message
 */
function displayError(response) {
  var div = document.createElement("div");
  div.style =
    "color: rgb(114, 28, 36);background-color: rgb(248, 215, 218);padding: 0.75rem 1.25rem;margin-bottom: 1rem;border: 1px solid transparent;border-radius: 0.25rem;width: 90%;text-align: center;position: fixed;right: 5%;top: 0px;  z-index: 999; ";
  if (response === "fetchFailed")
    div.innerHTML = "Fetch to Code Inspector failed";
  else if (response === "timeout") div.innerHTML = "Code Inspector Timed Out";
  div.className = "fetchFailedAlert";
  document
    .getElementsByClassName("position-relative js-header-wrapper ")[0]
    .appendChild(div);
  $(".fetchFailedAlert")
    .slideDown("slow")
    .delay(5000)
    .slideUp(400, function() {
      var slidedown = document.getElementsByClassName("fetchFailedAlert")[0];
      slidedown.parentNode.removeChild(slidedown);
    });
}
