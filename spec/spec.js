/**
 * @fileoverview spec.js serves to test the extension.
 * @package
 * sinon-chrome is used to mock chrome's APIs
 * mocha is used as our testing framework
 * chai is our assertion library
 * jsdom is used to mock an html page that our javascript functions can be executed on and checked
 * fetchMock is used to mock and anaylze calls to the fetch API
 */

import { addInfoToPage } from "../js/treefunctions-test";
import { firstMessage, testFetch } from "../js/optionsfunctions-test";
import {
  addProjectInfoToPage,
  addBadgeStyle
} from "../js/repositoriesfunctions-test";
import { mockHTML_optionsFirstMessage } from "./payload/optionstests-firstMessage";
import { mockHTML_optionsTestFetch } from "./payload/optionstests-testFetch";
import { mockHTML_repositoriesAddProjectInfoToPage } from "./payload/repositoriestests-addProjectInfoToPage";
import { describe } from "mocha";

var chrome = require("sinon-chrome");
var assert = require("chai").assert;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("tree.js addInfoToPage()", function() {
  before(function() {
    // This mock HTML creates the table of lines of code in a file on github. Table contains a line number and code associated with a file
    var mockHTML = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
      <table class="files js-navigation-container js-active-navigation-container" data-pjax="">
      <tbody>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title=".github" id="01777e4a9846fea5f3fcc8fe40d44680-453a661df93e25dec040533336403876f37f651f" href="/user/flask/tree/master/.github">.github</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="Comment out helpful tips in issue_template.md" class="link-gray" href="/user/flask/commit/e4c7033a3447b8d1af67acf9e34269f2c5633fb9">Comment out helpful tips in issue_template.md</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-07T19:37:45Z" title="Jul 7, 2019, 12:37 PM PDT">last month</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="artwork" id="431a210e866f6a0b95ea506860e8e5cd-2134bb5df7e80cf742fdfa227e2423fda0804a9f" href="/user/flask/tree/master/artwork">artwork</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="standardize license and copyright" class="link-gray" href="/user/flask/commit/e666f7a69c737fef8236237671be4da5910e9113">standardize license and copyright</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-06-22T20:09:09Z" title="Jun 22, 2019, 1:09 PM PDT">2 months ago</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="docs" id="e3e2a9bfd88566b05001b02a3f51d286-33f1b6705b6d29991e88aa337ef8631e74d8d1f7" href="/user/flask/tree/master/docs">docs</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="Documentation: Use Python 3.5+" class="link-gray" href="/user/flask/commit/98a26cfb425aef527ce5ace06f3a8e7cac186a6a">Documentation: Use Python 3.5+</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-10T17:03:10Z" title="Jul 10, 2019, 10:03 AM PDT">last month</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="examples" id="bfebe34154a0dfd9fc7b447fc9ed74e9-b3dfbd1b0bf66a0de10b2407b86666676d27200c" href="/user/flask/tree/master/examples">examples</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="Merge branch '1.0.x'" class="link-gray" href="/user/flask/commit/b05a685a03a2a186cd7ffb45a6cb8a7a4fbc49de">Merge branch '1.0.x'</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-01T17:54:31Z" title="Jul 1, 2019, 10:54 AM PDT">2 months ago</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="This path skips through empty directories" id="453b2297b6973012944a4d42cf6910d3-4e9e6678d706c0a8933691c5809c4d3954184d21" href="/user/flask/tree/master/src/flask"><span class="simplified-path">src/</span>flask</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="pass sys.argv to flask cli" class="link-gray" href="/user/flask/commit/ded3d642a762823702848c5e5c4e041a676a10a1">pass sys.argv to flask cli</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-10T19:44:04Z" title="Jul 10, 2019, 12:44 PM PDT">last month</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="directory" class="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="tests" id="b61a6d542f9036550ba9c401c80f00ef-66d2f47bb670c73857aed1a70f8d856251afd0fa" href="/user/flask/tree/master/tests">tests</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="restore and deprecate json_available" class="link-gray" href="/user/flask/commit/1617202d91e46a4c2584656969f90aa5d5db7fed">restore and deprecate json_available</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-08T17:26:12Z" title="Jul 8, 2019, 10:26 AM PDT">last month</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="file" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="setup.cfg" id="380c6a8ebbbce17d55d50ef17d3cf906-dfac8b079fc676dc8d98782e6ca2a6a9edb082fb" href="/user/flask/blob/master/setup.cfg">setup.cfg</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="Merge branch '1.0.x'" class="link-gray" href="/user/flask/commit/1351d0a56580df36872b466eb245e7634c20dab5">Merge branch '1.0.x'</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-06-23T23:57:52Z" title="Jun 23, 2019, 4:57 PM PDT">2 months ago</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="file" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="setup.py" id="2eeaed663bd0d25b7e608891384b7298-8a0b8ad4c73d12d924733c83a90997468ba49382" href="/user/flask/blob/master/setup.py">setup.py</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="release version 1.1.1" class="link-gray" href="/user/flask/commit/ffc68840f821fb0a4c41a7b2b4eaad6d71f539b7">release version 1.1.1</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-07-08T17:58:12Z" title="Jul 8, 2019, 10:58 AM PDT">last month</time-ago></span>
            </td>
          </tr>
          <tr class="js-navigation-item">
            <td class="icon">
              <svg aria-label="file" class="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
              <img width="16" height="16" class="spinner" alt="" src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif">
            </td>
            <td class="content">
              <span class="css-truncate css-truncate-target"><a class="js-navigation-open" title="tox.ini" id="b91f3d5bd63fcd17221b267e851608e8-63dda527b5c153bccb77e52506f62efb9d6e0ee4" href="/user/flask/blob/master/tox.ini">tox.ini</a></span>
            </td>
            <td class="message">
              <span class="css-truncate css-truncate-target">
                    <a data-pjax="true" title="Merge branch '1.0.x'" class="link-gray" href="/user/flask/commit/29111a32594806cc217aba047de609dc913ef255">Merge branch '1.0.x'</a>
              </span>
            </td>
            <td class="age">
              <span class="css-truncate css-truncate-target"><time-ago datetime="2019-06-12T17:41:11Z" title="Jun 12, 2019, 10:41 AM PDT">2 months ago</time-ago></span>
            </td>
          </tr>
      </tbody>
    </table>
      </body>
    </html>

    `);
    global.chrome = chrome;
    global.window = mockHTML.window;
    global.document = global.window.document;
  });
  /**
   * addInfoToPage takes @params
   * function addInfoToPage( info,totalViolations,totalDuplicates, totalComplex,length)
   * info is the data for a particular file
   * totalViolations, totalDuplicates, totalComplex are the totals for all of the specific type of error for the given directory
   * length is how many files contain an error
   *
   * Totals and length are used together to color the error badges based upon percentage errors a given file has compared to a standard distribution of the specific error over the files
   */
  it("adds blue violations badge for setup.py", function() {
    assert.equal(
      addInfoToPage(
        {
          isFile: true,
          name: "setup.py",
          violations: 3,
          duplicates: 0,
          complexFunctions: 0
        },
        2563,
        4,
        0,
        5
      ),
      true
    );
    assert.equal(
      document
        .getElementsByClassName("content")[7]
        .getElementsByTagName("span")[1].innerText, // span is 1 here as 0 is the title of the file or directory
      "Violations 3"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[7]
        .getElementsByTagName("span")[1].style.backgroundColor,
      "rgb(23, 162, 184)"
    );
    assert.equal(
      // asserts that theres is only one badge displayed
      document
        .getElementsByClassName("content")[7]
        .getElementsByTagName("span")[2],
      undefined
    );
  });

  it("adds yellow violations badge for src/flask", function() {
    assert.equal(
      addInfoToPage(
        {
          isFile: false,
          name: "src",
          violations: 541,
          duplicates: 0,
          complexFunctions: 0
        },
        2563,
        4,
        0,
        5
      ),
      true
    );
    assert.equal(
      document
        .getElementsByClassName("content")[4]
        .getElementsByTagName("span")[2].innerText, // span here is 2 as src/flask contains another span inside it.
      "Violations 541"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[4]
        .getElementsByTagName("span")[2].style.backgroundColor,
      "rgb(255, 193, 7)"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[4]
        .getElementsByTagName("span")[3],
      undefined
    );
  });
  it("adds two red violations + duplicates badges for tests", function() {
    assert.equal(
      addInfoToPage(
        {
          isFile: false,
          name: "tests",
          violations: 1861,
          duplicates: 2,
          complexFunctions: 0
        },
        2563,
        4,
        0,
        5
      ),
      true
    );
    // tests folder is on the sixth line of the mocked github directory
    assert.equal(
      document
        .getElementsByClassName("content")[5]
        .getElementsByTagName("span")[1].innerText,
      "Violations 1861"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[5]
        .getElementsByTagName("span")[1].style.backgroundColor,
      "rgb(220, 53, 69)"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[5]
        .getElementsByTagName("span")[2].innerText,
      "Duplicates 2"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[5]
        .getElementsByTagName("span")[2].style.backgroundColor,
      "rgb(220, 53, 69)"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[5]
        .getElementsByTagName("span")[3],
      undefined
    );
  });
  it("adds one blue violations badge and another red duplicates badge for examples", function() {
    assert.equal(
      addInfoToPage(
        {
          isFile: false,
          name: "examples",
          violations: 102,
          duplicates: 2,
          complexFunctions: 0
        },
        2563,
        4,
        0,
        5
      ),
      true
    );
    // examples folder is on the fourth line in the mocked github directory
    assert.equal(
      document
        .getElementsByClassName("content")[3]
        .getElementsByTagName("span")[1].innerText,
      "Violations 102"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[3]
        .getElementsByTagName("span")[1].style.backgroundColor,
      "rgb(23, 162, 184)"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[3]
        .getElementsByTagName("span")[2].innerText,
      "Duplicates 2"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[3]
        .getElementsByTagName("span")[2].style.backgroundColor,
      "rgb(220, 53, 69)"
    );

    assert.equal(
      document
        .getElementsByClassName("content")[3]
        .getElementsByTagName("span")[3],
      undefined
    );
  });
  it("adds blue violations badge and red complex function badge for docs", function() {
    assert.equal(
      addInfoToPage(
        {
          isFile: false,
          name: "docs",
          violations: 56,
          duplicates: 0,
          complexFunctions: 1
        },
        2563,
        4,
        0,
        5
      ),
      true
    );
    //docs folder is on the third line of the mocked github directory
    assert.equal(
      document
        .getElementsByClassName("content")[2]
        .getElementsByTagName("span")[1].innerText,
      "Violations 56"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[2]
        .getElementsByTagName("span")[1].style.backgroundColor,
      "rgb(23, 162, 184)"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[2]
        .getElementsByTagName("span")[2].innerText,
      "Complex Functions 1"
    );
    assert.equal(
      document
        .getElementsByClassName("content")[2]
        .getElementsByTagName("span")[2].style.backgroundColor,
      "rgb(220, 53, 69)"
    );

    assert.equal(
      document
        .getElementsByClassName("content")[2]
        .getElementsByTagName("span")[3],
      undefined
    );
  });
  it("does not add anything on lines without errors", function() {
    assert.equal(
      document
        .getElementsByClassName("content")[0]
        .getElementsByTagName("span")[1],
      undefined
    );
    assert.equal(
      document
        .getElementsByClassName("content")[1]
        .getElementsByTagName("span")[1],
      undefined
    );
    assert.equal(
      document
        .getElementsByClassName("content")[6]
        .getElementsByTagName("span")[1],
      undefined
    );
    assert.equal(
      document
        .getElementsByClassName("content")[8]
        .getElementsByTagName("span")[1],
      undefined
    );
  });
});

describe("options.js firstMessage", function() {
  beforeEach(function() {
    var mockHTML = mockHTML_optionsFirstMessage;
    global.chrome = chrome;
    global.window = mockHTML.window;
    global.document = global.window.document;

    chrome.storage.sync.get
      .withArgs(["AccessKey"])
      .yields({ AccessKey: "accesskey" });
    chrome.storage.sync.get
      .withArgs(["SecretKey"])
      .yields({ SecretKey: "secretkey" });
  });
  afterEach(function() {
    chrome.flush();
  });
  it("should send Message with Access and Secret Values", function() {
    firstMessage();
    assert(
      chrome.runtime.sendMessage.calledWith({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
    );
  });
  it("should add success message for keys already added", function() {
    chrome.runtime.sendMessage
      .withArgs({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
      .yields("noError");
    firstMessage();
    var div = document.getElementsByClassName("alert alert-success")[0];

    assert(div.innerHTML.includes("Keys already have been submitted."));
    var oldDiv = document.getElementsByClassName("alert alert-success")[0];
    document.getElementsByClassName("row pt-5")[0].removeChild(oldDiv);
  });
  it("should add welcome message for no keys added", function() {
    chrome.runtime.sendMessage
      .withArgs({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
      .yields("ERROR");

    firstMessage();
    var div = document.getElementsByClassName("alert alert-info")[0];
    assert(div.innerHTML.includes("Please enter keys which can be found"));
    var oldDiv = document.getElementsByClassName("alert alert-info")[0];
    document.getElementsByClassName("row pt-5")[0].removeChild(oldDiv);
  });
});
describe("options.js testFetch", function() {
  beforeEach(function() {
    var mockHTML = mockHTML_optionsTestFetch;
    global.chrome = chrome;
    global.window = mockHTML.window;
    global.document = global.window.document;
  });
  it("should send Message with Access and Secret Values", function() {
    testFetch("accesskey", "secretkey");
    assert(
      chrome.runtime.sendMessage.calledWith({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
    );
  });
  afterEach(function() {
    chrome.flush();
  });
  it("should add success message on fetch success", function() {
    chrome.runtime.sendMessage
      .withArgs({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
      .yields("noError");
    chrome.storage.sync.set
      .withArgs({
        AccessKey: "accesskey",
        SecretKey: "secretkey"
      })
      .yields({});
    testFetch("accesskey", "secretkey");
    assert(
      chrome.storage.sync.set.calledWith({
        AccessKey: "accesskey",
        SecretKey: "secretkey"
      })
    );

    var div = document.getElementById("enterAlert");
    assert(document.getElementsByClassName("alert alert-success")[0]);
    assert.equal(div.innerHTML, "Form Successfully submitted");
  });
  it("should add failure message on fetch failed", function() {
    chrome.runtime.sendMessage
      .withArgs({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
      .yields("invalidCred");
    chrome.storage.sync.set
      .withArgs({
        AccessKey: "accesskey",
        SecretKey: "secretkey"
      })
      .yields({});
    testFetch("accesskey", "secretkey");
    assert(document.getElementsByClassName("alert alert-danger")[0]);
    assert.equal(chrome.storage.sync.set.callCount, 0);

    var div = document.getElementById("enterAlert");

    assert.equal(div.innerHTML, "Invalid Keys please try again");
  });
  it("should add failure message on improper response", function() {
    chrome.runtime.sendMessage
      .withArgs({
        access: "accesskey",
        secret: "secretkey",
        key: "keys"
      })
      .yields({ bad: "response" });
    chrome.storage.sync.set
      .withArgs({
        AccessKey: "accesskey",
        SecretKey: "secretkey"
      })
      .yields({});
    testFetch("accesskey", "secretkey");
    assert(document.getElementsByClassName("alert alert-danger")[0]);
    assert.equal(chrome.storage.sync.set.callCount, 0);

    var div = document.getElementById("enterAlert");

    assert.equal(div.innerHTML, "Error");
  });
});
describe("repositories.js addProjectInfoToPage", function() {
  beforeEach(function() {
    var mockHTML = mockHTML_repositoriesAddProjectInfoToPage;
    global.window = mockHTML.window;
    global.document = global.window.document;
  });
  it("should add 3 badges to ZombieDash", function() {
    addProjectInfoToPage({
      name: "ZombieDash",
      lastAnalysis: {
        summary: { violations: 120, duplicates: 3, complexFunctions: 4 }
      },
      repository: { url: "https://github.com/jamesszhou/ZombieDash.git" }
    });

    var headers = document.getElementsByTagName("h3");
    assert.equal(headers[0].children[1].innerHTML, "Violations 120");
    assert.equal(headers[0].children[2].innerHTML, "Duplicates 3");
    assert.equal(headers[0].children[3].innerHTML, "Complex Functions 4");
    assert.equal(headers[0].childElementCount, 4);
  });
  it("should add 1 badges to iAwake", function() {
    addProjectInfoToPage({
      name: "iAwake",
      lastAnalysis: {
        summary: { violations: 87, duplicates: 0, complexFunctions: 0 }
      },
      repository: { url: "https://github.com/jamesszhou/iAwake.git" }
    });

    var headers = document.getElementsByTagName("h3");
    assert.equal(headers[4].children[1].innerHTML, "Violations 87");
    assert.equal(headers[4].children.length, 2);
  });
  it("should add 2 badges to flask", function() {
    addProjectInfoToPage({
      name: "flask",
      lastAnalysis: {
        summary: { violations: 2563, duplicates: 2, complexFunctions: 0 }
      },
      repository: { url: "https://github.com/jamesszhou/flask.git" }
    });

    var headers = document.getElementsByTagName("h3");
    assert.equal(headers[1].children[1].innerHTML, "Violations 2563");
    assert.equal(headers[1].children[2].innerHTML, "Duplicates 2");
    assert.equal(headers[1].children.length, 3);
  });
});
