const jsdom = require("jsdom");
const { JSDOM } = jsdom;
export var mockHTML_optionsFirstMessage = new JSDOM(`<!DOCTYPE html>
<html>
  <head>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
  </head>
  <body>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="https://www.code-inspector.com/">
        <img
          src="images/logo-original-30.png"
          class="d-inline-block align-top"
          alt=""
        />
      </a>
    </nav>

    <div class="container">
      <div class="row pt-5"></div>
      <div class="row" id="form">
        <form class="col-lg-6 needs-validation" novalidate autocomplete="off">
          <div class="form-group">
            <label for="AccessKey">Access Key: </label>
            <input
              type="text"
              name="AccessKey"
              id="AccessKey"
              class="form-control"
              required
              minlength="8"
            />
            <div class="invalid-feedback">
              Access Key should be at least 8 characters
            </div>
          </div>
          <div class="form-group">
            <label for="SecretKey">Secret Key: </label>
            <input
              type="text"
              name="SecretKey"
              id="SecretKey"
              class="form-control"
              required
              minlength="8"
            />
            <div class="invalid-feedback">
              Secret Key should be at least 8 characters
            </div>
          </div>
          <div class="form-group">
            <button type="submit" id="SubmitButton" class="btn btn-primary">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</html>

      `);
