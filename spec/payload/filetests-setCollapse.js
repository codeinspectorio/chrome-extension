const jsdom = require("jsdom");
const { JSDOM } = jsdom;
export var mockHTML_fileSetCollapse = new JSDOM(`<!DOCTYPE html>
      <html>
        <head>
          <style>
            .collapsible {
              cursor: pointer;
              display: block;
              margin: 0 0 0 auto;
              outline: none;
              text-align: center;
              color: white;
              font-size: 0.8em;
              font-weight: bold;
              padding-right: 0.6em;
              padding-left: 0.6em;
              border-radius: 10rem;
              border: none;
            }
            .collapseContain {
              float: right;
            }
  
            .active {
              width: 100%;
            }
            .collapsible:hover {
              border: 1px solid black;
            }
            .content {
              padding: 0 18px;
              display: none;
              overflow: hidden;
              background-color: #f1f1f1;
              border-radius: 0.6rem;
            }
          </style>
        </head>
        <body>
          <button class="collapsible" style="background-color: #0000ff;">
            Complexity Warning
          </button>
          <div class="content">
            <p>
              The function is longer than 50 lines. \n Function length: " +
              info[i].length + " lines.
            </p>
          </div>
        </body>
      </html>
      `);
