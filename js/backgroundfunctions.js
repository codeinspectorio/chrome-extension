/**
 * timeout wrapper for our fetch calls
 * @param {number} ms time in milliseconds to reject promise as timeout
 * @param {promise} promise place fetch(api, opts) here
 */
function timeout(ms, promise) {
  // wrapper for fetch, throwing error on specified timeout
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

/**
 * validKeysFetch handles when the user adds their keys into the options page. We fetch with those keys to determine if the keys are valid
 * @param {object} request contains the keys that we want to check if they are valid
 * @param {string} api
 * @param {function} fn callback function, used to sendResponse back to file.js once returnResponse is filled with all the data about the particular file
 */
function validKeysFetch(request, api, fn) {
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": request.access,
      "X-Secret-Key": request.secret
    },
    body: '{"query": "query {projects(howmany: 10, skip:0){name}}"}'
  };
  timeout(5000, fetch(api, opts))
    .then(response => {
      if (response.ok) {
        // checks if response status is in range of 200-299

        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      if (response.errors) {
        // response can be ok, but can still contain errors with the query.
        throw new Error(response.errors[0].message);
      }
      fn("noError"); // no error, valid response. Otherwise based on error send appropriate message to display on options.html
    })

    .catch(error => {
      if (
        error
          .toString()
          .includes("SyntaxError: Unexpected end of JSON input") ||
        error.toString().includes("user not logged")
      ) {
        fn("invalidCred");
      } else if (
        error.toString().includes("Network response was not ok.") ||
        error.toString().includes("TypeError: Failed to fetch")
      ) {
        fn("network");
      } else if (error.toString().includes("timeout")) {
        fn("timeout");
      } else fn("error");
    });
}
/**
 * treeFetch handles when user navigates the repository of a particular project. It returns error counts for the particular directory
 * @param {*} request contains url of current directory
 * @param {*} api
 * @param {*} fn callback function, used to sendResponse back to tree.js once errors for particular directory have been fetched
 */
function treeFetch(request, api, fn) {
  var AccessKey = "";
  var SecretKey = "";

  chrome.storage.sync.get(["AccessKey"], function(result) {
    AccessKey = result.AccessKey;

    chrome.storage.sync.get(["SecretKey"], function(result) {
      SecretKey = result.SecretKey;

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": AccessKey,
          "X-Secret-Key": SecretKey
        },
        body:
          '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
      };

      timeout(5000, fetch(api, opts)) // fetch first to see if the given repository exists
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          var secondFetchData = {
            name: "",
            prefix: "",
            master: true,
            revision: ""
          };
          for (var i = 0; i < response.data.projects.length; i++) {
            // loop through data.
            //if the repository name matches, send back the number of violations and duplicates
            var repoURL = response.data.projects[i].repository.url;
            if (
              request.url.includes(repoURL.substring(0, repoURL.length - 4)) // if repo name contains given url
              // the -4 is as the api returns all urls back ending in ".git" -4 removes that
            ) {
              //example url: https://github.com/jamesszhou/ZombieDash/tree/master/ZombieDash
              secondFetchData.name = response.data.projects[i].repository.name;
              if (request.url === repoURL.substring(0, repoURL.length - 4)) {
                secondFetchData.prefix = null; // this is the homepage of the repository
              } else if (request.url.includes("master")) {
                // set the prefix for master branch
                var prefix = request.url.substring(
                  request.url.indexOf("tree") + 5,
                  request.url.length // example here would be master/ZombieDash
                );
                prefix = prefix.substring(
                  prefix.indexOf("/") + 1,
                  prefix.length //example prefix is set to ZombieDash
                );
                prefix = '\\"' + prefix + '\\"';

                secondFetchData.prefix = prefix;
              } else {
                secondFetchData.master = false; // this is a revision not master, find the prefix
                //example url: https://github.com/jamesszhou/ZombieDash/tree/1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5/ZombieDash
                var revision = request.url.substring(
                  request.url.indexOf("tree") + 5,
                  request.url.length
                ); // example revision here is 1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5/ZombieDash
                if (!revision.includes("/")) {
                  //homepage url: example -> https://github.com/jamesszhou/ZombieDash/tree/1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5
                  secondFetchData.prefix = null;
                  secondFetchData.revision = revision;
                } else {
                  secondFetchData.prefix = //example: set to ZombieDash
                    '\\"' +
                    revision.substring(
                      revision.indexOf("/") + 1,
                      revision.length
                    ) +
                    '\\"';
                  secondFetchData.revision = revision.substring(
                    //example: Set to 1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5
                    0,
                    revision.indexOf("/")
                  );
                }
              }
              return secondFetchData;
            }
          }
          throw new Error("no matching project found");
        })
        .then(data => {
          const opts2 = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Access-Key": AccessKey,
              "X-Secret-Key": SecretKey
            },
            // body for master
            body:
              '{"query": "query {project(name: \\"' +
              data.name +
              '\\"){id lastAnalysis{revision id tree(prefix: ' +
              data.prefix +
              '){isFile name violations duplicates complexFunctions}}}}"}'
          };
          if (!data.master) {
            // body for revision
            opts2.body =
              '{"query": "query {project(name: \\"' +
              data.name +
              '\\") {analyses(howmany: 1 skip: 0 revision: \\"' +
              data.revision +
              '\\") {tree (prefix: ' +
              data.prefix +
              '){name violations duplicates complexFunctions}}}}"}';
          }
          return timeout(5000, fetch(api, opts2));
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          if (response.data.project.analyses != undefined) {
            // revision branch
            fn(response.data.project.analyses[0].tree);
          } else fn(response.data.project.lastAnalysis.tree); // master branch
        })
        .catch(error => {
          if (error.toString().includes("no matching project found"))
            fn({ data: null });
          else {
            if (error.toString().includes("timeout")) fn("timeout");
            else fn("fetchFailed");
          }
        });
    });
  });
}
/**
 * repoTabFetch fetchs all the error summaries for repositories that exist in Code Inspector
 * @param {*} api
 * @param {*} fn callback function, used to sendResponse back to repositories.js once error summaries have been fetched
 * repositories.js then picks out the repositories that contain github.com urls to add to page
 */
function repoTabFetch(api, fn) {
  var AccessKey = "";
  var SecretKey = "";

  chrome.storage.sync.get(["AccessKey"], function(result) {
    AccessKey = result.AccessKey;

    chrome.storage.sync.get(["SecretKey"], function(result) {
      SecretKey = result.SecretKey;

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": AccessKey,
          "X-Secret-Key": SecretKey
        },
        body:
          '{"query": "query {projects(skip:0, howmany: 100){name lastAnalysis{summary{violations duplicates complexFunctions}}repository{url}}}"}'
        // fetch project name and if it exists return summary else return null
      };
      timeout(10000, fetch(api, opts)) // timeout here is ten seconds rather than five like other fetchs as getting all projects takes longer
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })

        .then(response => {
          if (
            response.data.projects.length === 0 ||
            response.data.projects === null
          )
            fn(null);
          else fn(response.data.projects);
        })
        .catch(error => {
          if (error.toString().includes("timeout")) fn("timeout");
          else fn("fetchFailed");
        });
    });
  });
}
/**
 * fileFetch is called to fetch all the errors and their descriptions in a particular file.
 * it supplys request with kind and skip values to match the recursive call in fileFetchHelper
 * @param {*} request contains the url of the particular file
 * @param {*} api
 * @param {*} fn callback function, used to sendResponse back to file.js once returnResponse is filled with all the data about the particular file
 */
function fileFetch(request, api, fn) {
  var returnResponse = [];
  request.kind = "fileComplexFunctions";
  request.skip = 0;
  fileFetchHelper(request, api, returnResponse, fn);
}
/**
 * fileFetchHelper is called recursively. Each iteration it pushes the results from its fetch into the returnResponse Array, finally calling the callback once all the data needed to be fetched is completed
 * @param {object} request contains the url for the file we want information on
 * @param {string} api
 * @param {array} returnResponse each fetch pushes its error into this array, this array is sent back to file.js with the callback function to be rendered
 * @param {function} fn callback function, used to sendResponse back to file.js once returnResponse is filled with all the data about the particular file
 */
function fileFetchHelper(request, api, returnResponse, fn) {
  var AccessKey = "";
  var SecretKey = "";

  chrome.storage.sync.get(["AccessKey"], function(result) {
    AccessKey = result.AccessKey;

    chrome.storage.sync.get(["SecretKey"], function(result) {
      SecretKey = result.SecretKey;

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": AccessKey,
          "X-Secret-Key": SecretKey
        },
        body:
          '{"query": "query {projects(skip:0 , howmany:100){repository{name url}}}"}'
      };

      fetch(api, opts)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          var secondFetchData = {
            name: "",
            file: "",
            master: true,
            version: ""
          };
          for (var i = 0; i < response.data.projects.length; i++) {
            // loop through data.
            //if the repository name matches, send back the number of violations and duplicates
            //example url: https://github.com/jamesszhou/ZombieDash/blob/master/ZombieDash/GameWorld.cpp
            var repoURL = response.data.projects[i].repository.url;
            if (
              request.url.includes(repoURL.substring(0, repoURL.length - 4)) // -4 is as the request url contains .git at the end of every url
            ) {
              secondFetchData.name = response.data.projects[i].repository.name; //set repository name
              if (request.url === repoURL.substring(0, repoURL.length - 4)) {
                //Homepage of the repository, no need to fetch any files
                secondFetchData.file = null;
              } else if (request.url.includes("master")) {
                //master branch
                var file = request.url.substring(
                  request.url.indexOf("master") + 7,
                  request.url.length
                );
                secondFetchData.file = file; // example would be ZombieDash/GameWorld.cpp. This is the path for the file.
              } else {
                // a version branch
                // example url: https://github.com/jamesszhou/ZombieDash/blob/1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5/ZombieDash/Actor.cpp
                secondFetchData.master = false;
                var version = request.url.substring(
                  // example -> 1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5/ZombieDash/Actor.cpp
                  request.url.indexOf("blob") + 5,
                  request.url.length
                );

                secondFetchData.version = version.substring(
                  // example -> 1b538d8a169b070fb3fd6346b5e4ca5dde46a0e5
                  0,
                  version.indexOf("/")
                );
                secondFetchData.file = version.substring(
                  // example -> ZombieDash/Actor.cpp
                  version.indexOf("/") + 1,
                  version.length
                );
              }
              return secondFetchData;
            }
          }
          throw new Error("no matching project found");
        })
        .then(data => {
          const opts2 = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Access-Key": AccessKey,
              "X-Secret-Key": SecretKey
            },
            body: ""
          };
          // following makes request based on type of error and then branch.
          if (request.kind === "fileViolations") {
            if (data.master)
              //master branch
              opts2.body =
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {id lastAnalysis {violations(howmany:100, skip:' +
                request.skip +
                ', path: \\"' +
                data.file +
                '\\") {line description severity category}}}}"}';
            else
              opts2.body = // revision branch
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {analyses(howmany: 1 skip: 0 revision: \\"' +
                data.version +
                '\\") {violations(howmany:100, skip: 0, path: \\"' +
                data.file +
                '\\"){line description severity category}}}}"}';
          } else if (request.kind === "fileDuplicates") {
            if (data.master)
              opts2.body =
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {id lastAnalysis {duplicates(howmany:100, skip:' +
                request.skip +
                ', prefix: \\"' +
                data.file +
                '\\") {code lineCount occurrences(howmany:6, skip:0){line filename}}}}}"}';
            else
              opts2.body =
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {analyses(howmany: 1 skip: 0 revision: \\"' +
                data.version +
                '\\") {duplicates(howmany: 100, skip: 0, prefix: \\"' +
                data.file +
                '\\") {code lineCount occurrences(howmany: 6, skip: 0) {line filename }}}}}"}';
          } else if (request.kind === "fileComplexFunctions") {
            if (data.master)
              opts2.body =
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {name lastAnalysis{complexFunctions(howmany: 100, skip:' +
                request.skip +
                ', path: \\"' +
                data.file +
                '\\"){functionName complexity length filename lineStart}}}}"}';
            else
              opts2.body =
                '{"query": "query {project(name: \\"' +
                data.name +
                '\\") {name analyses(howmany:1, skip: 0, revision: \\"' +
                data.version +
                '\\"){complexFunctions(howmany: 100, skip:' +
                request.skip +
                ', path: \\"' +
                data.file +
                '\\"){functionName complexity length filename lineStart}}}}"}';
          }

          return timeout(5000, fetch(api, opts2));
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          // each response requies a different kind of "sendResponse" the if is for master branch, else is for other branch
          var tempResponse; // assign value depending on whether the response is from master or revision branch and based on type of error
          if (request.kind === "fileComplexFunctions") {
            if (response.data.project.lastAnalysis)
              tempResponse =
                response.data.project.lastAnalysis.complexFunctions;
            else
              tempResponse = response.data.project.analyses[0].complexFunctions;
          }
          if (request.kind === "fileDuplicates") {
            if (response.data.project.lastAnalysis)
              tempResponse = response.data.project.lastAnalysis.duplicates;
            else tempResponse = response.data.project.analyses[0].duplicates;
          }
          if (request.kind === "fileViolations") {
            if (response.data.project.lastAnalysis)
              tempResponse = response.data.project.lastAnalysis.violations;
            else tempResponse = response.data.project.analyses[0].violations;
          }

          returnResponse.push({
            // push the fetch result onto the array with the kind of error the result was
            error: request.kind,
            response: tempResponse
          });
          if (tempResponse.length >= 100) {
            // fetch the next 100 instances of the particular error
            request.skip = request.skip + 100;
            fileFetchHelper(request, api, returnResponse, fn);
          } else {
            // as we have fetched all the occurences of the previous error, fetch information on another error
            // The progression of this fuction first fetchs for ComplexFunctions -> Duplicates -> Violations

            if (request.kind === "fileViolations") {
              fn(returnResponse); //call the callback if all the Violations are accounted for. At this point returnResponse contains all the errors for the particular file
            } else {
              if (request.kind === "fileComplexFunctions")
                request.kind = "fileDuplicates";
              else if (request.kind === "fileDuplicates")
                request.kind = "fileViolations";
              request.skip = 0;
              fileFetchHelper(request, api, returnResponse, fn);
            }
          }
        })
        .catch(error => {
          if (error.toString().includes("no matching project found"))
            fn({ data: null });
          else {
            if (error.toString().includes("timeout")) fn("timeout");
            else fn("fetchFailed");
          }
        });
    });
  });
}
