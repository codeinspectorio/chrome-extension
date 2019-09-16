function styleBadge(color) {
  //provides the styles for the badges when we render the badges using setAttribute("style", [styles])
  var badgeStyle =
    "border-radius: 10rem; color: white; font-size: 0.8em; font-weight: bold; padding-right: .6em;padding-left: .6em; border-radius: 10rem;";
  if (color === "red") {
    return "background-color: #dc3545; " + badgeStyle;
  }
  if (color === "yellow") {
    return "background-color: #ffc107; " + badgeStyle;
  }
  if (color === "blue") {
    return "background-color: #17a2b8; ; " + badgeStyle;
  }
}
function addInfoToPage( // chrome.runtime.sendMessage asks background.js to fetch for all the Violations Duplicates Complex Functions in the current directory
  // info here is the Violations, Duplicates, Complex of a given file
  info,
  totalViolations,
  totalDuplicates,
  totalComplex,
  length
) {
  const CRITICAL_PERCENTAGE_THRESHOLD = 1.8; // currently constant is placed here as content script is executing too many times. once loading issue is fixed this can be moved to the first line in the file

  var tds = document.getElementsByClassName("content");
  for (var j = 0; j < tds.length; j++) {
    var spans = tds[j].getElementsByTagName("a");
    var name = "";

    if (spans.length != 0) {
      name = spans[0].textContent; // name of file in directory

      if (name.includes("/")) {
        // for example with an empty folder ex. src/files treat it as src so it can match with fetch results
        name = name.substring(0, name.indexOf("/"));
      }
    }
    if (spans.length != 0 && name === info.name) {
      /**
       * If the element we are supposed to add a new span already has the error badge,
       * do not go further and just return true.
       */
      if (tds[j].getElementsByClassName("errorBadge").length > 0) {
        return true;
      }

      // if name is equal to the given file in info then render its violations duplicates complex
      name = ""; // clear Name value for next iteration of loop
      var div = document.createElement("span");
      div.className = "errorBadge";
      if (info.violations != 0) {
        if (
          info.violations >
          CRITICAL_PERCENTAGE_THRESHOLD * (totalViolations / length)
        )
          // if 80% more violations than normal distribution display badge as red
          div.setAttribute("style", styleBadge("red"));
        else if (info.violations > totalViolations / length)
          // if greater than normal distribution display badge as yellow
          div.setAttribute("style", styleBadge("yellow"));
        // normal or less than normal distribution of violations display as blue
        else div.setAttribute("style", styleBadge("blue"));
        div.innerText = "Violations " + info.violations;
        tds[j].appendChild(div);
        tds[j].appendChild(document.createElement("br"));
      }
      if (info.duplicates != 0) {
        div = document.createElement("span");
        div.className = "errorBadge";
        // same coloring scheme as violations
        if (
          info.duplicates >
          CRITICAL_PERCENTAGE_THRESHOLD * (totalDuplicates / length)
        )
          div.setAttribute("style", styleBadge("red"));
        else if (info.duplicates > totalDuplicates / length)
          div.setAttribute("style", styleBadge("yellow"));
        else div.setAttribute("style", styleBadge("blue"));
        div.innerText = "Duplicates " + info.duplicates;
        tds[j].appendChild(div);
        tds[j].appendChild(document.createElement("br"));
      }
      if (info.complexFunctions != 0) {
        //same coloring scheme as violations
        div = document.createElement("span");
        div.className = "errorBadge";
        if (
          info.complexFunctions >
          CRITICAL_PERCENTAGE_THRESHOLD * (totalComplex / length)
        )
          div.setAttribute("style", styleBadge("red"));
        else if (info.complexFunctions > totalComplex / length)
          div.setAttribute("style", styleBadge("yellow"));
        else div.setAttribute("style", styleBadge("blue"));
        div.innerText = "Complex Functions " + info.complexFunctions;
        tds[j].appendChild(div);
      }
    }
  }
  return true;
}

function runTab(object) {
  chrome.runtime.sendMessage(
    { key: "repoURL", url: window.location.href },
    function(response) {
      if (response === "fetchFailed" || response === "timeout") {
        displayError(response);
        return true;
      } else {
        // send fetch request and count total amount of violations, duplicates, complex at the given level
        // response returns violations, duplicates etc for every file in the given directory
        var totalViolations = 0;
        var totalDuplicates = 0;
        var totalComplex = 0;
        for (var i = 0; i < response.length; i++) {
          totalViolations += response[i].violations;
          totalDuplicates += response[i].duplicates;
          totalComplex += response[i].complexFunctions;
        }
        for (var i = 0; i < response.length; i++) {
          addInfoToPage(
            // display the errors and color based on even distribution
            response[i], // response for a given file. This is the number of violations, duplicates complex for that file
            totalViolations, // totals are the total amount of violations etc. in the given directory used in addInfoToPage to highlight by color which files contain a greater amount of errors compared to the standard distribution
            totalDuplicates,
            totalComplex,
            response.length
          );
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
    div.innerText = "Fetch to Code Inspector failed";
  else if (response === "timeout") div.innerText = "Code Inspector Timed Out";
  div.className = "fetchFailedAlert";
  document
    .getElementsByClassName("position-relative js-header-wrapper ")[0]
    .appendChild(div);
  $(".fetchFailedAlert")
    .slideDown("slow")
    .delay(5000)
    .slideUp(400, function() {
      var slidedown = document.getElementsByClassName("fetchFailedAlert")[0];
      if (slidedown !== undefined) slidedown.parentNode.removeChild(slidedown);
    });
}
