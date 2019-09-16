import {
  timeout,
  validKeysFetch,
  treeFetch,
  repoTabFetch,
  fileFetchHelper
} from "../js/backgroundfunctions-test";

import { describe } from "mocha";

var chrome = require("sinon-chrome");
var assert = require("chai").assert;

const fetchMock = require("fetch-mock");
describe("background.js timeout", function() {
  it("Timeout not called becuase promise resolves", function(done) {
    var promise = new Promise(res => setTimeout(() => res(200), 10));
    timeout(500, promise)
      .then(response => {
        assert(response);
        done();
      })
      .catch(error => {
        assert(error === null);
        done();
      });
  });
  it("Timeout called becuase promise does not resolve in time", function(done) {
    var promise = new Promise(res => setTimeout(() => res(200), 600));
    timeout(500, promise)
      .then(response => {
        assert(response === null);
        done();
      })
      .catch(error => {
        {
          assert(error);
          done();
        }
      });
  });
});
describe("background.js validKeysFetch", function() {
  /**
   * validKeysFetch calls a callback sendResponse based on the fetch result
   * If the fetch result is valid and does not contain an errors array it returns no error
   * If the fetch result is valid but contains errors, it should throw and error and call sendResponse on the error message
   * Errors that happen in the process of fetching such as network issue are caught and sendResponse should be called appropriately
   */

  afterEach(fetchMock.reset);
  /**
   * @param done is as validKeysFetch is an async function so the test waits until done before executing the next test
   * validKeys fetch has a callback function.
   * @function callback is used to moniter and analyze what is passed to validKeysFetch's callback function which will be chrome's sendResponse
   */
  it("Happy Path No Error", function(done) {
    function callback(response) {
      assert(fetchMock.called());
      assert(response, "noError");
      done();
    }
    var data = { access: "access", secret: "secret" };
    fetchMock.post("https://api.code-inspector.com/graphql", {
      hello: "world" // any valid response from the fetch triggers a "noError"
    });
    const api = "https://api.code-inspector.com/graphql";
    validKeysFetch(data, api, callback);
  });
  /**
   * When user is not logged, the error presents itself in the response, not as an error that is thrown.
   * This is as the API can be accessed, but no real data is returned as keys are invalid
   */
  it("Happy Path User Not Logged error", function(done) {
    function callback(response) {
      assert(fetchMock.called());
      assert(response, "invalidCred");
      done();
    }
    var data = { access: "wrong access key", secret: "wrong secret key" };
    fetchMock.post("https://api.code-inspector.com/graphql", {
      data: null,
      errors: [
        { message: "user not logged", path: Array(1), locations: Array(1) }
      ]
    });
    const api = "https://api.code-inspector.com/graphql";
    validKeysFetch(data, api, callback);
  });

  it("Sad Path Network Error", function(done) {
    function callback(response) {
      assert(fetchMock.called());
      assert(response, "network");
      done();
    }
    var data = { access: "access", secret: "secret" };
    const api = "https://api.code-inspector.com/graphql";
    fetchMock.post("https://api.code-inspector.com/graphql", 300);
    validKeysFetch(data, api, callback);
  });
  it("Sad Path Timeout", function(done) {
    function callback(response) {
      assert(fetchMock.called());
      assert(response, "timeout");
      done();
    }
    var data = { access: "access", secret: "secret" };
    const api = "https://api.code-inspector.com/graphql";
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      new Promise(res => setTimeout(() => res(200), 6000))
    );
    validKeysFetch(data, api, callback);
  });
});
describe("background.js treeFetch", function() {
  /**
   * treeFetch gets passed a url and calls a callback sendResponse based on the fetch result
   * The url gives treeFetch info about whether it is master/revision branch, directory etc.
   * The first fetch determines if such a repository exists
   *      if not the callback is called with null
   * The second fetch fetchs the directory's errors and returns them calling the callback with the result
   * If error occurs here the fetch is terminated
   */
  beforeEach(function() {
    global.chrome = chrome;
    //set stubs for chrome.storage.sync.get
    chrome.storage.sync.get
      .withArgs(["AccessKey"])
      .yields({ AccessKey: "accesskey" });
    chrome.storage.sync.get
      .withArgs(["SecretKey"])
      .yields({ SecretKey: "secretkey" });
    fetchMock.config.overwriteRoutes = false;
  });
  afterEach(fetchMock.reset);
  afterEach(function() {
    chrome.storage.sync.get.flush(); // reset stub
  });
  it("Happy Path Master Branch", function(done) {
    function callback(response) {
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\"){id lastAnalysis{revision id tree(prefix: \\"directory\\"){isFile name violations duplicates complexFunctions}}}}"}'
        }
      );

      assert.deepEqual(response, [
        {
          isFile: true,
          name: "StudentWorld.h",
          violations: 9,
          duplicates: 0,
          complexFunctions: 0
        },
        {
          isFile: true,
          name: "SoundFX.h",
          violations: 1,
          duplicates: 0,
          complexFunctions: 0
        },
        {
          isFile: true,
          name: "SpriteManager.h",
          violations: 3,
          duplicates: 0,
          complexFunctions: 0
        },
        {
          isFile: true,
          name: "main.cpp",
          violations: 0,
          duplicates: 0,
          complexFunctions: 0
        },
        {
          isFile: true,
          name: "GameWorld.cpp",
          violations: 0,
          duplicates: 0,
          complexFunctions: 0
        }
      ]);
      done();
    }
    var data = {
      url: "https://github.com/username/project/tree/master/directory"
    };
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            id: 177,
            lastAnalysis: {
              revision: "47dede74bfb4569f3331160ac6a6d9741cc63819",
              id: 25558,
              tree: [
                {
                  isFile: true,
                  name: "StudentWorld.h",
                  violations: 9,
                  duplicates: 0,
                  complexFunctions: 0
                },
                {
                  isFile: true,
                  name: "SoundFX.h",
                  violations: 1,
                  duplicates: 0,
                  complexFunctions: 0
                },
                {
                  isFile: true,
                  name: "SpriteManager.h",
                  violations: 3,
                  duplicates: 0,
                  complexFunctions: 0
                },
                {
                  isFile: true,
                  name: "main.cpp",
                  violations: 0,
                  duplicates: 0,
                  complexFunctions: 0
                },
                {
                  isFile: true,
                  name: "GameWorld.cpp",
                  violations: 0,
                  duplicates: 0,
                  complexFunctions: 0
                }
              ]
            }
          }
        }
      },
      { overwriteRoutes: false }
    );
    const api = "https://api.code-inspector.com/graphql";
    treeFetch(data, api, callback);
  });
  it("Happy Path Revision Branch", function(done) {
    function callback(response) {
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for revision
          body:
            '{"query": "query {project(name: \\"project\\") {analyses(howmany: 1 skip: 0 revision: \\"123456RevisionID789\\") {tree (prefix: \\"directory\\"){name violations duplicates complexFunctions}}}}"}'
        }
      );

      assert.deepEqual(response, [
        {
          name: "file.h",
          violations: 9,
          duplicates: 0,
          complexFunctions: 0
        },
        {
          name: "anotherFile.h",
          violations: 82,
          duplicates: 0,
          complexFunctions: 0
        }
      ]);
      done();
    }

    var data = {
      url:
        "https://github.com/username/project/tree/123456RevisionID789/directory"
    };
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            analyses: [
              {
                tree: [
                  {
                    name: "file.h",
                    violations: 9,
                    duplicates: 0,
                    complexFunctions: 0
                  },
                  {
                    name: "anotherFile.h",
                    violations: 82,
                    duplicates: 0,
                    complexFunctions: 0
                  }
                ]
              }
            ]
          }
        }
      },
      { overwriteRoutes: false }
    );

    const api = "https://api.code-inspector.com/graphql";
    treeFetch(data, api, callback);
  });
  it("Happy Path Project does not exist on Code Inspector", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 1);

      assert.deepEqual(fetchMock.lastCall()[1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "accesskey",
          "X-Secret-Key": "secretkey"
        },
        body:
          '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
      });
      assert.deepEqual(response, { data: null });
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            analyses: [
              {
                tree: [
                  {
                    name: "file.h",
                    violations: 9,
                    duplicates: 0,
                    complexFunctions: 0
                  },
                  {
                    name: "anotherFile.h",
                    violations: 82,
                    duplicates: 0,
                    complexFunctions: 0
                  }
                ]
              }
            ]
          }
        }
      },
      { overwriteRoutes: false }
    );
    var data = {
      url:
        "https://github.com/username/someProjectNotOnCodeInspector/tree/master/directory"
    };
    const api = "https://api.code-inspector.com/graphql";
    treeFetch(data, api, callback);
  });
  it("Sad Path First fetch fails", function(done) {
    function callback(response) {
      assert(fetchMock.called());
      assert.equal(response, "fetchFailed");
      done();
    }
    var data = {
      url:
        "https://github.com/username/someProjectNotOnCodeInspector/tree/master/directory"
    };
    fetchMock.post("https://api.code-inspector.com/graphql", 300, {
      repeat: 1
    });

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            analyses: [
              {
                tree: [
                  {
                    name: "file.h",
                    violations: 9,
                    duplicates: 0,
                    complexFunctions: 0
                  },
                  {
                    name: "anotherFile.h",
                    violations: 82,
                    duplicates: 0,
                    complexFunctions: 0
                  }
                ]
              }
            ]
          }
        }
      },
      { overwriteRoutes: false }
    );

    const api = "https://api.code-inspector.com/graphql";
    treeFetch(data, api, callback);
  });
  it("Sad Path Second fetch fails", function(done) {
    function callback(response) {
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\"){id lastAnalysis{revision id tree(prefix: \\"directory\\"){isFile name violations duplicates complexFunctions}}}}"}'
        }
      );

      assert.equal(response, "timeout");
      done();
    }
    var data = {
      url: "https://github.com/username/project/tree/master/directory"
    };
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );
    fetchMock.post(
      //Second Fetch fails due to timeout
      "https://api.code-inspector.com/graphql",
      new Promise(res => setTimeout(() => res(200), 5100)),
      { overwriteRoutes: false }
    );
    const api = "https://api.code-inspector.com/graphql";
    treeFetch(data, api, callback);
  });
});
describe("background.js repoTabFetch", function() {
  /**
   * repoTabFetch gets passed a repository name calls a callback sendResponse based on the fetch result
   * it returns the amount of a violations, duplicates and complex function based on if the repository exists
   */
  beforeEach(function() {
    global.chrome = chrome;

    chrome.storage.sync.get
      .withArgs(["AccessKey"])
      .yields({ AccessKey: "accesskey" });
    chrome.storage.sync.get
      .withArgs(["SecretKey"])
      .yields({ SecretKey: "secretkey" });
    fetchMock.config.overwriteRoutes = false;
  });
  afterEach(fetchMock.reset);
  afterEach(function() {
    chrome.storage.sync.get.flush();
  });
  it("Happy Path Master Branch", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 1);
      assert.deepEqual(fetchMock.calls()[0][1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "accesskey",
          "X-Secret-Key": "secretkey"
        },
        body:
          '{"query": "query {projects(skip:0, howmany: 100){name lastAnalysis{summary{violations duplicates complexFunctions}}repository{url}}}"}'
        // fetch project name and if it exists return summary else return null
      });
      assert.deepEqual(response, [
        {
          name: "Project1",
          lastAnalysis: {
            summary: {
              violations: 120,
              duplicates: 3,
              complexFunctions: 4
            }
          },
          repository: {
            url: "https://github.com/user/Project1.git"
          }
        },
        {
          name: "Project2",
          lastAnalysis: {
            summary: {
              violations: 87,
              duplicates: 0,
              complexFunctions: 0
            }
          },
          repository: {
            url: "https://github.com/user/Project2.git"
          }
        },
        {
          name: "Project3",
          lastAnalysis: {
            summary: {
              violations: 2563,
              duplicates: 2,
              complexFunctions: 0
            }
          },
          repository: {
            url: "https://github.com/user/Project3.git"
          }
        },
        {
          name: "Project4",
          lastAnalysis: {
            summary: {
              violations: 24,
              duplicates: 4,
              complexFunctions: 2
            }
          },
          repository: {
            url: "https://gitlab.com/tdfinder/Project4.git"
          }
        }
      ]);
      done();
    }
    fetchMock.post("https://api.code-inspector.com/graphql", {
      data: {
        projects: [
          {
            name: "Project1",
            lastAnalysis: {
              summary: {
                violations: 120,
                duplicates: 3,
                complexFunctions: 4
              }
            },
            repository: {
              url: "https://github.com/user/Project1.git"
            }
          },
          {
            name: "Project2",
            lastAnalysis: {
              summary: {
                violations: 87,
                duplicates: 0,
                complexFunctions: 0
              }
            },
            repository: {
              url: "https://github.com/user/Project2.git"
            }
          },
          {
            name: "Project3",
            lastAnalysis: {
              summary: {
                violations: 2563,
                duplicates: 2,
                complexFunctions: 0
              }
            },
            repository: {
              url: "https://github.com/user/Project3.git"
            }
          },
          {
            name: "Project4",
            lastAnalysis: {
              summary: {
                violations: 24,
                duplicates: 4,
                complexFunctions: 2
              }
            },
            repository: {
              url: "https://gitlab.com/tdfinder/Project4.git"
            }
          }
        ]
      }
    });
    const api = "https://api.code-inspector.com/graphql";
    repoTabFetch(api, callback);
  });
  it("Happy Path Projects do not exist on Code Inspector", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 1);
      assert.deepEqual(fetchMock.calls()[0][1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "accesskey",
          "X-Secret-Key": "secretkey"
        },
        body:
          '{"query": "query {projects(skip:0, howmany: 100){name lastAnalysis{summary{violations duplicates complexFunctions}}repository{url}}}"}'
        // fetch project name and if it exists return summary else return null
      });
      assert.equal(response, null);
      done();
    }

    fetchMock.post("https://api.code-inspector.com/graphql", {
      data: {
        projects: []
      }
    });
    const api = "https://api.code-inspector.com/graphql";
    repoTabFetch(api, callback);
  });
  it("Sad Path fetch fails", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 1);
      assert.deepEqual(fetchMock.calls()[0][1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "accesskey",
          "X-Secret-Key": "secretkey"
        },
        body:
          '{"query": "query {projects(skip:0, howmany: 100){name lastAnalysis{summary{violations duplicates complexFunctions}}repository{url}}}"}'
        // fetch project name and if it exists return summary else return null
      });
      assert.equal(response, "fetchFailed");
      done();
    }

    fetchMock.post("https://api.code-inspector.com/graphql", 300);

    const api = "https://api.code-inspector.com/graphql";
    repoTabFetch(api, callback);
  });
});

describe("background.js fileFetch", function() {
  /**
   * fileFetch is passed what kind of error needs to be fetched along with the file's url
   * it then calls a callback sendResponse based on the fetch result
   * The first fetch determines if such a repository exists
   *      if not the callback is called with null
   * The second fetch fetchs the directory's errors and returns them calling the callback with the result
   *      If error occurs here the fetch is and returns fetchFailed
   */
  beforeEach(function() {
    global.chrome = chrome;

    chrome.storage.sync.get
      .withArgs(["AccessKey"])
      .yields({ AccessKey: "accesskey" });
    chrome.storage.sync.get
      .withArgs(["SecretKey"])
      .yields({ SecretKey: "secretkey" });
    fetchMock.config.overwriteRoutes = false;
  });
  afterEach(fetchMock.reset);
  afterEach(function() {
    chrome.storage.sync.get.flush();
  });
  it("Happy Path Master Branch", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 6);
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {name lastAnalysis{complexFunctions(howmany: 100, skip:0, path: \\"directory/file.js\\"){functionName complexity length filename lineStart}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[2][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[3][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {id lastAnalysis {duplicates(howmany:100, skip:0, prefix: \\"directory/file.js\\") {code lineCount occurrences(howmany:6, skip:0){line filename}}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[4][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[5][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {id lastAnalysis {violations(howmany:100, skip:0, path: \\"directory/file.js\\") {line description severity category}}}}"}'
        }
      );
      assert.deepEqual(response, [
        {
          error: "fileComplexFunctions",
          response: [
            {
              functionName: "function1",
              complexity: 11,
              length: 90,
              filename: "directory/file.js",
              lineStart: 38
            },
            {
              functionName: "function2",
              complexity: 17,
              length: 69,
              filename: "directory/file.js",
              lineStart: 143
            }
          ]
        },
        {
          error: "fileDuplicates",
          response: [
            {
              code: "helloWorld",
              lineCount: 12,
              occurrences: [
                { line: 292, filename: "directory/file.js" },
                { line: 252, filename: "directory/file.js" }
              ]
            },
            {
              code: "MoreCode",
              lineCount: 16,
              occurrences: [
                { line: 312, filename: "directory/file.js" },
                { line: 288, filename: "directory/file.js" }
              ]
            }
          ]
        },
        {
          error: "fileViolations",
          response: [
            {
              line: 53,
              description:
                "The function 'doSomething' overrides a function in a base class but is not marked with a 'override' specifier.",
              severity: 4,
              category: "Unknown"
            },
            {
              line: 54,
              description:
                "The function 'blocksMovement' overrides a function in a base class but is not marked with a 'override' specifier.",
              severity: 4,
              category: "Unknown"
            },
            {
              line: 55,
              description:
                "The function 'blocksFlame' overrides a function in a base class but is not marked with a 'override' specifier.",
              severity: 4,
              category: "Unknown"
            }
          ]
        }
      ]);
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            name: "project",
            lastAnalysis: {
              complexFunctions: [
                {
                  functionName: "function1",
                  complexity: 11,
                  length: 90,
                  filename: "directory/file.js",
                  lineStart: 38
                },
                {
                  functionName: "function2",
                  complexity: 17,
                  length: 69,
                  filename: "directory/file.js",
                  lineStart: 143
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            id: 177,
            lastAnalysis: {
              duplicates: [
                {
                  code: "helloWorld",
                  lineCount: 12,
                  occurrences: [
                    {
                      line: 292,
                      filename: "directory/file.js"
                    },
                    {
                      line: 252,
                      filename: "directory/file.js"
                    }
                  ]
                },
                {
                  code: "MoreCode",
                  lineCount: 16,
                  occurrences: [
                    {
                      line: 312,
                      filename: "directory/file.js"
                    },
                    {
                      line: 288,
                      filename: "directory/file.js"
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            id: 177,
            lastAnalysis: {
              violations: [
                {
                  line: 53,
                  description:
                    "The function 'doSomething' overrides a function in a base class but is not marked with a 'override' specifier.",
                  severity: 4,
                  category: "Unknown"
                },
                {
                  line: 54,
                  description:
                    "The function 'blocksMovement' overrides a function in a base class but is not marked with a 'override' specifier.",
                  severity: 4,
                  category: "Unknown"
                },
                {
                  line: 55,
                  description:
                    "The function 'blocksFlame' overrides a function in a base class but is not marked with a 'override' specifier.",
                  severity: 4,
                  category: "Unknown"
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    var data = {
      url: "https://github.com/username/project/tree/master/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";
    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });
  it("Happy Path Revision Branch", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 6);
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {name analyses(howmany:1, skip: 0, revision: \\"123456RevisionID789\\"){complexFunctions(howmany: 100, skip:0, path: \\"directory/file.js\\"){functionName complexity length filename lineStart}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[2][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[3][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {analyses(howmany: 1 skip: 0 revision: \\"123456RevisionID789\\") {duplicates(howmany: 100, skip: 0, prefix: \\"directory/file.js\\") {code lineCount occurrences(howmany: 6, skip: 0) {line filename }}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[4][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[5][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {analyses(howmany: 1 skip: 0 revision: \\"123456RevisionID789\\") {violations(howmany:100, skip: 0, path: \\"directory/file.js\\"){line description severity category}}}}"}'
        }
      );
      assert.deepEqual(response, [
        {
          error: "fileComplexFunctions",
          response: [
            {
              functionName: "function1",
              complexity: 11,
              length: 90,
              filename: "directory/file.js",
              lineStart: 38
            },
            {
              functionName: "function2",
              complexity: 17,
              length: 69,
              filename: "directory/file.js",
              lineStart: 143
            }
          ]
        },
        {
          error: "fileDuplicates",
          response: [
            {
              code: "Hello World",
              lineCount: 12,
              occurrences: [
                { line: 292, filename: "directory/file.js" },
                { line: 252, filename: "directory/file.js" }
              ]
            },
            {
              code: "More Code",
              lineCount: 16,
              occurrences: [
                { line: 312, filename: "directory/file.js" },
                { line: 288, filename: "directory/file.js" }
              ]
            }
          ]
        },
        {
          error: "fileViolations",
          response: [
            {
              line: 17,
              description:
                "Function parameter 'assetPath' should be passed by const reference.",
              severity: 3,
              category: "Performance"
            },
            {
              line: 351,
              description:
                "Variable 'newDistance' is assigned a value that is never used.",
              severity: 4,
              category: "Code_Style"
            },
            {
              line: 377,
              description:
                "Variable 'newDistance' is assigned a value that is never used.",
              severity: 4,
              category: "Code_Style"
            }
          ]
        }
      ]);
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            name: "project",
            analyses: [
              {
                complexFunctions: [
                  {
                    functionName: "function1",
                    complexity: 11,
                    length: 90,
                    filename: "directory/file.js",
                    lineStart: 38
                  },
                  {
                    functionName: "function2",
                    complexity: 17,
                    length: 69,
                    filename: "directory/file.js",
                    lineStart: 143
                  }
                ]
              }
            ]
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            analyses: [
              {
                duplicates: [
                  {
                    code: "Hello World",
                    lineCount: 12,
                    occurrences: [
                      {
                        line: 292,
                        filename: "directory/file.js"
                      },
                      {
                        line: 252,
                        filename: "directory/file.js"
                      }
                    ]
                  },
                  {
                    code: "More Code",
                    lineCount: 16,
                    occurrences: [
                      {
                        line: 312,
                        filename: "directory/file.js"
                      },
                      {
                        line: 288,
                        filename: "directory/file.js"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            analyses: [
              {
                violations: [
                  {
                    line: 17,
                    description:
                      "Function parameter 'assetPath' should be passed by const reference.",
                    severity: 3,
                    category: "Performance"
                  },
                  {
                    line: 351,
                    description:
                      "Variable 'newDistance' is assigned a value that is never used.",
                    severity: 4,
                    category: "Code_Style"
                  },
                  {
                    line: 377,
                    description:
                      "Variable 'newDistance' is assigned a value that is never used.",
                    severity: 4,
                    category: "Code_Style"
                  }
                ]
              }
            ]
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    var data = {
      url:
        "https://github.com/username/project/blob/123456RevisionID789/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";
    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });
  it("Sad Path Repositories Fetch Fails", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 1);
      assert.equal(response, "fetchFailed");
      done();
    }

    fetchMock.post("https://api.code-inspector.com/graphql", 300, {
      repeat: 1
    });

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            name: "project",
            analyses: [
              {
                complexFunctions: [
                  {
                    functionName: "function1",
                    complexity: 11,
                    length: 90,
                    filename: "directory/file.js",
                    lineStart: 38
                  },
                  {
                    functionName: "function2",
                    complexity: 17,
                    length: 69,
                    filename: "directory/file.js",
                    lineStart: 143
                  }
                ]
              }
            ]
          }
        }
      },
      { overwriteRoutes: false }
    );
    var data = {
      url:
        "https://github.com/username/project/blob/123456RevisionID789/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";

    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });
  it("Sad Path Complex Functions Fetch Fails", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 2);
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {name lastAnalysis{complexFunctions(howmany: 100, skip:0, path: \\"directory/file.js\\"){functionName complexity length filename lineStart}}}}"}'
        }
      );

      assert.deepEqual(response, "fetchFailed");
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      300,
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    var data = {
      url: "https://github.com/username/project/tree/master/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";
    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });
  it("Sad Path Duplicates Fetch Fails", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 4);
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {name lastAnalysis{complexFunctions(howmany: 100, skip:0, path: \\"directory/file.js\\"){functionName complexity length filename lineStart}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[2][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[3][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {id lastAnalysis {duplicates(howmany:100, skip:0, prefix: \\"directory/file.js\\") {code lineCount occurrences(howmany:6, skip:0){line filename}}}}}"}'
        }
      );

      assert.deepEqual(response, "fetchFailed");
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            name: "project",
            lastAnalysis: {
              complexFunctions: [
                {
                  functionName: "function1",
                  complexity: 11,
                  length: 90,
                  filename: "directory/file.js",
                  lineStart: 38
                },
                {
                  functionName: "function2",
                  complexity: 17,
                  length: 69,
                  filename: "directory/file.js",
                  lineStart: 143
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      300,
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    var data = {
      url: "https://github.com/username/project/tree/master/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";
    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });

  it("Sad Path Violations Fetch Fails", function(done) {
    function callback(response) {
      assert.equal(fetchMock.calls().length, 6);
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[0][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[1][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {name lastAnalysis{complexFunctions(howmany: 100, skip:0, path: \\"directory/file.js\\"){functionName complexity length filename lineStart}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[2][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[3][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {id lastAnalysis {duplicates(howmany:100, skip:0, prefix: \\"directory/file.js\\") {code lineCount occurrences(howmany:6, skip:0){line filename}}}}}"}'
        }
      );
      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[4][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          body:
            '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
        }
      );

      assert.deepEqual(
        fetchMock.calls("https://api.code-inspector.com/graphql")[5][1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": "accesskey",
            "X-Secret-Key": "secretkey"
          },
          // body for master
          body:
            '{"query": "query {project(name: \\"project\\") {id lastAnalysis {violations(howmany:100, skip:0, path: \\"directory/file.js\\") {line description severity category}}}}"}'
        }
      );
      assert.deepEqual(response, "timeout");
      done();
    }

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            name: "project",
            lastAnalysis: {
              complexFunctions: [
                {
                  functionName: "function1",
                  complexity: 11,
                  length: 90,
                  filename: "directory/file.js",
                  lineStart: 38
                },
                {
                  functionName: "function2",
                  complexity: 17,
                  length: 69,
                  filename: "directory/file.js",
                  lineStart: 143
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          project: {
            id: 177,
            lastAnalysis: {
              duplicates: [
                {
                  code: "helloWorld",
                  lineCount: 12,
                  occurrences: [
                    {
                      line: 292,
                      filename: "directory/file.js"
                    },
                    {
                      line: 252,
                      filename: "directory/file.js"
                    }
                  ]
                },
                {
                  code: "MoreCode",
                  lineCount: 16,
                  occurrences: [
                    {
                      line: 312,
                      filename: "directory/file.js"
                    },
                    {
                      line: 288,
                      filename: "directory/file.js"
                    }
                  ]
                }
              ]
            }
          }
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      {
        data: {
          projects: [
            {
              repository: {
                name: "project",
                url: "https://github.com/username/project.git"
              }
            },
            {
              repository: {
                name: "iAwake",
                url: "https://github.com/username/iAwake.git"
              }
            },
            {
              repository: {
                name: "flask",
                url: "https://github.com/username/flask.git"
              }
            },
            {
              repository: {
                name: "extension",
                url: "https://gitlab.com/tdfinder/chrome-plugin-devel.git"
              }
            }
          ]
        }
      },
      { repeat: 1 },
      { overwriteRoutes: false }
    );

    fetchMock.post(
      "https://api.code-inspector.com/graphql",
      new Promise(res => setTimeout(() => res(200), 6000)),
      { repeat: 1 },
      { overwriteRoutes: false }
    );
    var data = {
      url: "https://github.com/username/project/tree/master/directory/file.js",
      kind: "fileComplexFunctions",
      skip: 0
    };
    const api = "https://api.code-inspector.com/graphql";
    var returnResponse = [];
    fileFetchHelper(data, api, returnResponse, callback);
  });
});
