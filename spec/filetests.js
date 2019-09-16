import { setCollapse, addFileInfoToPage } from "../js/filefunctions-test";

import { describe } from "mocha";
import { mockHTML_fileSetCollapse } from "./payload/filetests-setCollapse";
import { mockHTML_addFileInfoToPage } from "./payload/filetests-addFileInfoToPage";

var chrome = require("sinon-chrome");
var assert = require("chai").assert;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("file.js setCollapse()", function() {
  before(function() {
    // mockHTML here is the badge + content with css to keep content closed depending on setCollapse()

    var mockHTML = mockHTML_fileSetCollapse;
    global.chrome = chrome;
    global.window = mockHTML.window;
    global.document = global.window.document;
  });

  it("set collapse should do mockHTML", function() {
    assert.equal(setCollapse(), true);
  });
  it("collapsible opens on click", function() {
    document.getElementsByClassName("collapsible")[0].click(); // getElementsByClassName returns an array we take the first collapsible in the array
    assert.equal(
      document.getElementsByClassName("collapsible active").length,
      1
    );
    assert.equal(
      document.getElementsByClassName("content")[0].style.display,
      "block"
    ); // content display can be seen not none
  });
  it("collapsible closes on second click", function() {
    document.getElementsByClassName("collapsible")[0].click();
    assert.equal(
      document.getElementsByClassName("content")[0].style.display,
      "none"
    );
  });
});

describe("file.js addFileInfoToPage()", function() {
  before(function() {
    // This mock HTML creates the table of lines of code in a file on github. Table contains a line number and code associated with a file
    var mockHTML = mockHTML_addFileInfoToPage;

    global.chrome = chrome;
    global.window = mockHTML.window;
    global.document = global.window.document;
  });

  it("Violations: runs addFileInfoToPage", function() {
    assert.equal(
      addFileInfoToPage(
        [
          {
            line: 48,
            description: "Violations Test 1",
            severity: 3,
            category: "Test1"
          },
          {
            line: 20,
            description: "Violations Test 2",
            severity: 4,
            category: "Test2"
          }
        ],
        "fileViolations",
        "directory/file.js"
      ),
      true
    ); // Add two violations, severities should be different colors as well as placement
  });
  it("Violations: add badge to DOM", function() {
    // checks if the badge was placed by checking if the name is present, also checks if the background color was set due to violation severity
    assert.equal(
      //getElementsByTageName("tr") refers to the line number while button is the button that should be added.
      document.getElementsByTagName("tr")[47].getElementsByTagName("button")[0]
        .innerText,
      "Test1 Violation"
    );
    assert.equal(
      document.getElementsByTagName("tr")[47].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(255, 193, 7)"
    );

    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("button")[0]
        .innerText,
      "Test2 Violation"
    );
    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(220, 53, 69)"
    );
  });
  it("Violations: add content for badge to DOM", function() {
    assert.equal(
      document.getElementsByTagName("tr")[47].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Violations Test 1</p>"
    );
    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Violations Test 2</p>"
    );
  });
  it("Violations: highlight lines red", function() {
    assert.equal(
      document.getElementsByTagName("tr")[19].style.backgroundColor,
      "rgb(255, 220, 224)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[47].style.backgroundColor,
      "rgb(255, 220, 224)"
    );
  });
  it("Duplicates: runs addFileInfoToPage", function() {
    // adds two instances of occurences. First should display with a dropdown of other occurences. It also highlights two times
    // second instance should only highlight three times and dropdown should tell user to visit code inspector. All occurences with line number greater than total lines and that are not present in current file should not be rendered
    assert.equal(
      addFileInfoToPage(
        [
          {
            lineCount: 3,
            occurrences: [
              {
                line: 2,
                filename: "directory/file.js"
              },
              {
                line: 10,
                filename: "directory/file.js"
              }
            ]
          },
          {
            lineCount: 4,
            occurrences: [
              {
                line: 20,
                filename: "directory/file.js"
              },
              {
                line: 25,
                filename: "directory/file.js"
              },
              {
                line: 30,
                filename: "directory/file.js"
              },
              {
                line: 288,
                filename: "directory/file.js"
              },
              {
                line: 20,
                filename: "directory/SomeOtherFile.cpp"
              },
              {
                line: 288,
                filename: "directory/SomeOtherFile.cpp"
              },
              {
                line: 70,
                filename: "directory/SomeOtherFile.cpp"
              }
            ]
          }
        ],
        "fileDuplicates",
        "directory/file.js"
      ),
      true
    );
  });
  it("Duplicates: add badge to DOM for duplicates in current file", function() {
    //check that the five duplicates should be rendered based on color and name
    assert.equal(
      document.getElementsByTagName("tr")[1].getElementsByTagName("button")[0]
        .innerText,
      "Duplicate"
    );
    assert.equal(
      document.getElementsByTagName("tr")[1].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(108, 117, 125)"
    );

    assert.equal(
      document.getElementsByTagName("tr")[9].getElementsByTagName("button")[0]
        .innerText,
      "Duplicate"
    );
    assert.equal(
      document.getElementsByTagName("tr")[9].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(108, 117, 125)"
    );

    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("button")[1] // here the backeted number before innerText is 1 as there is a violation button already rendered in this row. So this one should render after the violation
        .innerText,
      "Duplicate"
    );
    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("button")[1]
        .style.backgroundColor,
      "rgb(108, 117, 125)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[24].getElementsByTagName("button")[0]
        .innerText,
      "Duplicate"
    );
    assert.equal(
      document.getElementsByTagName("tr")[24].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(108, 117, 125)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[29].getElementsByTagName("button")[0]
        .innerText,
      "Duplicate"
    );
    assert.equal(
      document.getElementsByTagName("tr")[29].getElementsByTagName("button")[0]
        .style.backgroundColor,
      "rgb(108, 117, 125)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[19].getElementsByTagName("button")[2], // This is a duplicate in another file's line 20 it should not show up in this file's line 20
      undefined
    );
    assert.equal(
      document.getElementsByTagName("tr")[69].getElementsByTagName("button")[0], // duplicate in another file should not be rendered here
      undefined
    );
  });
  it("Duplicates: add content for badge to DOM", function() {
    assert.equal(
      document.getElementsByTagName("tr")[1].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Line Count:3</p><p>Other Occurrences:</p><p></p>"
    );
    assert.equal(
      document
        .getElementsByTagName("tr")[1]
        .getElementsByTagName("div")[0]
        .getElementsByTagName("p")[2].innerText,
      "Line: 10" + "\n" + "Filename: directory/file.js"
    );
    assert.equal(
      document.getElementsByTagName("tr")[9].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Line Count:3</p><p>Other Occurrences:</p><p></p>"
    );
    assert.equal(
      document
        .getElementsByTagName("tr")[9]
        .getElementsByTagName("div")[0]
        .getElementsByTagName("p")[2].innerText,
      "Line: 2" + "\n" + "Filename: directory/file.js"
    );
    assert.equal(
      // more than five occurences results in this message
      document.getElementsByTagName("tr")[19].getElementsByTagName("div")[1]
        .innerHTML,
      "<p>Line Count:4" +
        "\n" +
        "Too many occurrences please visit Code Inspector website for full list</p>"
    );
    assert.equal(
      document.getElementsByTagName("tr")[24].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Line Count:4" +
        "\n" +
        "Too many occurrences please visit Code Inspector website for full list</p>"
    );
    assert.equal(
      document.getElementsByTagName("tr")[29].getElementsByTagName("div")[0]
        .innerHTML,
      "<p>Line Count:4" +
        "\n" +
        "Too many occurrences please visit Code Inspector website for full list</p>"
    );
  });
  it("Duplicates: highlight lines yellow", function() {
    //highlights the entire duplicated text. this spot checks various lines that should be highlighted
    assert.equal(
      document.getElementsByTagName("tr")[27].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[2].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[19].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[20].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[21].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[22].style.backgroundColor,
      "rgb(255, 251, 221)"
    );
  });
  it("Complex Functions: runs addFileInfoToPage", function() {
    assert.equal(
      // testing complex 1 and testing complex 3 should be added to DOM based on specifications of complexity and file length
      addFileInfoToPage(
        [
          {
            functionName: "Testing Complex 1",
            complexity: 11,
            length: 55,
            filename: "directory/file.js",
            lineStart: 1
          },
          {
            functionName: "Testing Complex 2", // length and complexity values are too low
            complexity: 17,
            length: 2,
            filename: "directory/file.js",
            lineStart: 7
          },
          {
            functionName: "Testing Complex 3",
            complexity: 38,
            length: 5,
            filename: "directory/file.js",
            lineStart: 77
          },
          {
            functionName: "Testing Complex 4",
            complexity: 100,
            length: 2,
            filename: "directory/SomeOtherFile.cpp", //wrong filename
            lineStart: 80
          }
        ],
        "fileComplexFunctions",
        "directory/file.js"
      ),
      true
    );
  });
  it("Complex Functions: add badge to DOM", function() {
    assert.equal(
      document.getElementsByTagName("tr")[0].getElementsByTagName("button")[0]
        .innerText,
      "Readability Warning"
    );
    assert.equal(
      document.getElementsByTagName("tr")[76].getElementsByTagName("button")[0]
        .innerText,
      "Complexity Warning"
    );
    // This is for Testing Complex 2 and Testing Complex 4 found in addFileIntoToPage which are not rendered due to their values
    assert.equal(
      document.getElementsByTagName("tr")[79].getElementsByTagName("button")[0],
      undefined
    );
    assert.equal(
      document.getElementsByTagName("tr")[16].getElementsByTagName("button")[0],
      undefined
    );
  });
  it("Complex Functions: add content for badge to DOM", function() {
    assert.equal(
      document.getElementsByTagName("tr")[0].getElementsByTagName("div")[0]
        .innerHTML,
      "<p> The function is longer than 50 lines. " +
        "\n" +
        " Function length: 55 lines.</p>"
    );
    assert.equal(
      document.getElementsByTagName("tr")[76].getElementsByTagName("div")[0]
        .innerHTML,
      "<p> The function complexity is greater than 25. " +
        "\n" +
        " Complexity: 38</p>"
    );
  });
  it("Complex Functions: highlight lines blue", function() {
    // check to see that the entire function must be highlighted
    assert.equal(
      document.getElementsByTagName("tr")[0].style.backgroundColor,
      "rgb(173, 216, 230)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[54].style.backgroundColor,
      "rgb(173, 216, 230)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[32].style.backgroundColor,
      "rgb(173, 216, 230)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[76].style.backgroundColor,
      "rgb(173, 216, 230)"
    );
    assert.equal(
      document.getElementsByTagName("tr")[78].style.backgroundColor,
      "rgb(173, 216, 230)"
    );
  });
});
