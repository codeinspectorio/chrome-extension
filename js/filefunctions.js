/**
 * addFileInfoToPage takes infomation from the fetchData and displys in DOM
 * @param {object} info the data for the particular kind of error that we display
 * @param {string} type type of error: violations, duplicates, complex functions
 * @param {string} filename current filename, so for example that duplicates that occur on other files are not rendered here
 */
function addFileInfoToPage(info, type, filename) {
  var tableRows = document.getElementsByTagName("tr");

  //based on type, add a div Badge(Collapsible) and its respective content
  if (type === "fileViolations") {
    for (var i = 0; i < info.length; i++) {
      tableRows[info[i].line - 1].setAttribute(
        "style",
        "background-color: #FFDCE0"
      );
      var div = document.createElement("button");
      div.className = "collapsible";
      if (info[i].severity === 4) {
        div.setAttribute("style", "background-color: #DC3545;"); // assign color based on severity of violation
      }
      if (info[i].severity === 3) {
        div.setAttribute("style", "background-color: #FFC107;");
      }
      if (info[i].severity === 2) {
        div.setAttribute("style", "background-color: #A9A9A9;");
      }
      if (info[i].severity === 1) {
        div.setAttribute("style", "background-color: #17A2B8;");
      }
      div.innerText = info[i].category.replace("_", " ") + " Violation";
      tableRows[info[i].line - 1].appendChild(div);
      // create the dropdown content
      var content = document.createElement("div");
      content.className = "badgeDropdownContent"; // This is for the styling of the div which can be found in file.css
      content.innerHTML = "<p>" + info[i].description + "</p>";
      tableRows[info[i].line - 1].appendChild(content);
    }
  } else if (type === "fileDuplicates") {
    for (var i = 0; i < info.length; i++) {
      for (var j = 0; j < info[i].occurrences.length; j++) {
        if (
          info[i].occurrences[j].line < tableRows.length &&
          info[i].occurrences[j].filename === filename
        ) {
          for (var k = 0; k < info[i].lineCount; k++) {
            tableRows[info[i].occurrences[j].line - 1 + k].setAttribute(
              //highlight duplicated lines
              "style",
              "background-color:#FFFBDD"
            );
          }

          //create collapsible badge
          var div = document.createElement("button");
          div.className = "collapsible";
          div.innerText = "Duplicate";
          div.setAttribute("style", "background-color:#6C757D");
          tableRows[info[i].occurrences[j].line - 1].appendChild(div);
          // create dropdown content
          var content = document.createElement("div");
          content.className = "badgeDropdownContent";
          if (info[i].occurrences.length > 5) {
            // cannot display more than 5 occurences redirect user to Code Inspector
            content.innerHTML =
              "<p>Line Count:" +
              info[i].lineCount +
              "\n" +
              "Too many occurrences please visit Code Inspector website for full list</p>";
          } else {
            // Otherwise display all occurences
            content.innerHTML =
              "<p>Line Count:" +
              info[i].lineCount +
              "</p><p>Other Occurrences:</p>";
            for (var items = 0; items < info[i].occurrences.length; items++) {
              if (
                info[i].occurrences[items].line != info[i].occurrences[j].line // display all occurences that are not the current line
              ) {
                var div = document.createElement("p");
                div.innerText =
                  "Line: " +
                  info[i].occurrences[items].line +
                  "\n" +
                  "Filename: " +
                  info[i].occurrences[items].filename;
                content.appendChild(div);
              }
            }
          }
          tableRows[info[i].occurrences[j].line - 1].appendChild(content);
        }
      }
    }
  } else if (type === "fileComplexFunctions") {
    for (var i = 0; i < info.length; i++) {
      if (info[i].filename === filename) {
        if (info[i].complexity > 25) {
          // greater than 25 implies a complex function
          for (var k = 0; k < info[i].length; k++) {
            tableRows[info[i].lineStart - 1 + k].setAttribute(
              // highlight the all lines of the complex function
              "style",
              "background-color: #add8e6;"
            );
          }

          var div = document.createElement("button");
          div.className = "collapsible";
          div.setAttribute("style", "background-color: #0000ff;");
          div.innerText = "Complexity Warning";
          tableRows[info[i].lineStart - 1].appendChild(div);

          var content = document.createElement("div");
          content.className = "badgeDropdownContent";
          content.innerHTML =
            "<p> The function complexity is greater than 25. \n Complexity: " +
            info[i].complexity +
            "</p>";
          tableRows[info[i].lineStart - 1].appendChild(content);
        }
        if (info[i].length > 50) {
          // function length cuttoff at 50 as this is max lines that can fit on an average screen
          for (var k = 0; k < info[i].length; k++) {
            tableRows[info[i].lineStart - 1 + k].setAttribute(
              "style",
              "background-color: #add8e6;"
            );
          }
          var div = document.createElement("button");
          div.className = "collapsible";
          div.setAttribute("style", "background-color: #0000ff;");
          div.innerText = "Readability Warning";
          tableRows[info[i].lineStart - 1].appendChild(div);

          var content = document.createElement("div");
          content.className = "badgeDropdownContent";
          content.innerHTML =
            "<p> The function is longer than 50 lines. \n Function length: " +
            info[i].length +
            " lines.</p>";
          tableRows[info[i].lineStart - 1].appendChild(content);
        }
      }
    }
  }
  return true;
}
/**
 * fetchData calls chrome's send message to background script to get data for the file.
 * Then calls addFileInfoToPage on each element in the response array from the background script
 */
function fetchData() {
  var link = window.location.href;
  /**
   * If the element we are supposed to add a new span already has the error badge,
   * do not go further and just return true.
   */
  if (
    document.getElementsByClassName("collapsible").length > 0 &&
    document.getElementsByClassName("badgeDropdownContent").length > 0
  ) {
    return true;
  }
  // sendMessage to background.js which calls fileFetch. fileFetch returns an array contains the type of error and the error details
  chrome.runtime.sendMessage({ key: "fileURL", url: link }, function(response) {
    //example github file link: https://github.com/username/project/blob/masterOrRevisionID/filename.py
    var filename = link.substring(link.indexOf("blob") + 5, link.length); // example would be masterOrRevisionID/filename.py
    filename = filename.substring(filename.indexOf("/") + 1, filename.length); // example would be filename.py
    if (response === null) return true;
    else if (response === "fetchFailed" || response === "timeout")
      displayError(response);
    else
      for (var i = 0; i < response.length; i++) {
        addFileInfoToPage(response[i].response, response[i].error, filename);
      }

    setCollapse(); // call set collapse at the end of adding all badges to ensure all badges will be able to have collapsible ability
  });
}
/**
 * setCollapse takes the badges inserted into the DOM from addFileInfoToPage and gives them collapsible ability
 * This is done by adding a onClick listener and changing display from block to none or none to block
 */
function setCollapse() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling; // on click identifies the div after button which happens to have the className as content

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
  return true; // for testing purposes to make sure the function ran through without syntax error etc.
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
    .slideDown(400)
    .delay(5000)
    .slideUp(400, function() {
      var slidedown = document.getElementsByClassName("fetchFailedAlert")[0];
      slidedown.parentNode.removeChild(slidedown);
    });
}
