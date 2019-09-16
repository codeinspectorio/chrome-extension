const jsdom = require("jsdom");
const { JSDOM } = jsdom;
export var mockHTML_repositoriesAddProjectInfoToPage = new JSDOM(`<!DOCTYPE html>
<html>
    <body>
            <div id="user-repositories-list">

                    <ul data-filterable-for="your-repos-filter" data-filterable-type="substring">
                        
                
                <li class="col-12 d-flex width-full py-4 border-bottom public source" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
                  <div class="col-10 col-lg-9 d-inline-block">
                    <div class="d-inline-block mb-1">
                      <h3>
                        <a href="/jamesszhou/ZombieDash" itemprop="name codeRepository">
                        ZombieDash</a>
                        
                      </h3>
                
                
                    </div>
                
                    <div>
                    </div>
                
                
                    <div class="f6 text-gray mt-2">
                
                        <span class="ml-0 mr-3">
                  <span class="repo-language-color" style="background-color: #f34b7d"></span>
                  <span itemprop="programmingLanguage">C++</span>
                </span>
                
                
                
                
                        Updated <relative-time datetime="2019-07-20T21:34:19Z" title="Jul 20, 2019, 2:34 PM PDT">on Jul 20</relative-time>
                    </div>
                  </div>
                
                  <div class="col-2 col-lg-3 d-flex flex-column flex-justify-around">
                      <div class="text-right">
                        
                  <div class="d-inline-block js-toggler-container js-social-container starring-container ">
                    <!-- </textarea></xmp> --><form class="starred js-social-form" data-remote="true" action="/jamesszhou/ZombieDash/unstar" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="gkieOcJJB3xjS/kXjBBasq3YO4NCpbtePZnlTTA4jJ6uvGi9dcgpS3bNKc5OGYn37dwZS+MmVGSn3rlbye+DmA==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this repository" title="Unstar jamesszhou/ZombieDash" data-ga-click="Repository, click unstar button, action:profiles#show; text:Unstar">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Unstar
                      </button>
                </form>   <!-- </textarea></xmp> --><form class="unstarred js-social-form" data-remote="true" action="/jamesszhou/ZombieDash/star" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="k9+PVOCsftwL540p37ReeX2o9tRSexiN+BZeHBGRLyZodjaUhmFEsVzAzsn65CdxPDMhaFopSkZphJDjwOXg9Q==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Star" aria-label="Star this repository" title="Star jamesszhou/ZombieDash" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Star
                      </button>
                </form>  </div>
                
                      </div>
                
                    <div class="text-right hide-lg hide-md hide-sm hide-xs mt-2">
                      
                
                
                  <span class="tooltipped tooltipped-s" aria-label="Past year of activity">
                    <svg width="155" height="30">
                      <defs>
                        <linearGradient id="gradient-178964381" x1="0" x2="0" y1="1" y2="0">
                            <stop offset="10%" stop-color="#c6e48b"></stop>
                            <stop offset="33%" stop-color="#7bc96f"></stop>
                            <stop offset="66%" stop-color="#239a3b"></stop>
                            <stop offset="90%" stop-color="#196127"></stop>
                        </linearGradient>
                        <mask id="sparkline-178964381" x="0" y="0" width="155" height="28">
                          <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,3 87,1 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,2 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2">
                        </polyline></mask>
                      </defs>
                
                      <g transform="translate(0, -11)">
                        <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-178964381); mask: url(#sparkline-178964381)"></rect>
                      </g>
                    </svg>
                  </span>
                
                    </div>
                  </div>
                </li>
                
                        
                
                <li class="col-12 d-flex width-full py-4 border-bottom public fork" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
                  <div class="col-10 col-lg-9 d-inline-block">
                    <div class="d-inline-block mb-1">
                      <h3>
                        <a href="/jamesszhou/flask" itemprop="name codeRepository">
                        flask</a>
                        
                      </h3>
                
                        <span class="f6 text-gray mb-1">
                          Forked from <a class="muted-link" href="/pallets/flask">pallets/flask</a>
                        </span>
                
                    </div>
                
                    <div>
                        <p class="col-9 d-inline-block text-gray mb-2 pr-4" itemprop="description">
                          The Python micro framework for building web applications.
                        </p>
                    </div>
                
                
                    <div class="f6 text-gray mt-2">
                
                        <span class="ml-0 mr-3">
                  <span class="repo-language-color" style="background-color: #3572A5"></span>
                  <span itemprop="programmingLanguage">Python</span>
                </span>
                
                        <a class="muted-link mr-3" href="/jamesszhou/flask/network/members">
                          <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                          12,893
                        </a>
                
                        <span class="mr-3">
                          <svg class="octicon octicon-law mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7 4c-.83 0-1.5-.67-1.5-1.5S6.17 1 7 1s1.5.67 1.5 1.5S7.83 4 7 4zm7 6c0 1.11-.89 2-2 2h-1c-1.11 0-2-.89-2-2l2-4h-1c-.55 0-1-.45-1-1H8v8c.42 0 1 .45 1 1h1c.42 0 1 .45 1 1H3c0-.55.58-1 1-1h1c0-.55.58-1 1-1h.03L6 5H5c0 .55-.45 1-1 1H3l2 4c0 1.11-.89 2-2 2H2c-1.11 0-2-.89-2-2l2-4H1V5h3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1h3v1h-1l2 4zM2.5 7L1 10h3L2.5 7zM13 10l-1.5-3-1.5 3h3z"></path></svg>BSD 3-Clause "New" or "Revised" License
                        </span>
                
                
                        Updated <relative-time datetime="2019-07-10T19:45:42Z" title="Jul 10, 2019, 12:45 PM PDT">on Jul 10</relative-time>
                    </div>
                  </div>
                
                  <div class="col-2 col-lg-3 d-flex flex-column flex-justify-around">
                      <div class="text-right">
                        
                  <div class="d-inline-block js-toggler-container js-social-container starring-container ">
                    <!-- </textarea></xmp> --><form class="starred js-social-form" data-remote="true" action="/jamesszhou/flask/unstar" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="UMKu9GI1evsWmfy/lq1KgJPulUbqdupIH9SAG7H1JPtaZmgKO02NSNk19li+V6H8HmcIodyGmuTG/SoZYVdo3A==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this repository" title="Unstar jamesszhou/flask" data-ga-click="Repository, click unstar button, action:profiles#show; text:Unstar">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Unstar
                      </button>
                </form>    <!-- </textarea></xmp> --><form class="unstarred js-social-form" data-remote="true" action="/jamesszhou/flask/star" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="tFlVgUjMTDbkT1lsi7l1ne8mOWV7Q7aahPPwIL8B3Id9e3iNOQnI8WYEDlPrbdGzYbfZytsIhRgrznWKkqINtg==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Star" aria-label="Star this repository" title="Star jamesszhou/flask" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Star
                      </button>
                </form>  </div>
                
                      </div>
                
                    <div class="text-right hide-lg hide-md hide-sm hide-xs ">
                      
                
                
                  <span class="tooltipped tooltipped-s" aria-label="Past year of activity">
                    <svg width="155" height="30">
                      <defs>
                        <linearGradient id="gradient-196475996" x1="0" x2="0" y1="1" y2="0">
                            <stop offset="10%" stop-color="#c6e48b"></stop>
                            <stop offset="33%" stop-color="#7bc96f"></stop>
                            <stop offset="66%" stop-color="#239a3b"></stop>
                            <stop offset="90%" stop-color="#196127"></stop>
                        </linearGradient>
                        <mask id="sparkline-196475996" x="0" y="0" width="155" height="28">
                          <polyline transform="translate(0, 28) scale(1,-1)" points="0,5.26 3,7.09 6,2.2199999999999998 9,1.6099999999999999 12,2.2199999999999998 15,2.83 18,6.48 21,2.2199999999999998 24,7.09 27,1.0 30,1.0 33,2.2199999999999998 36,2.83 39,1.6099999999999999 42,2.83 45,3.43 48,29.0 51,2.83 54,1.6099999999999999 57,2.2199999999999998 60,1.0 63,1.6099999999999999 66,1.0 69,4.04 72,1.6099999999999999 75,2.83 78,1.6099999999999999 81,1.6099999999999999 84,1.0 87,2.2199999999999998 90,4.65 93,1.6099999999999999 96,2.2199999999999998 99,16.22 102,4.04 105,25.35 108,7.7 111,26.57 114,2.2199999999999998 117,8.3 120,8.91 123,12.57 126,8.91 129,4.65 132,1.0 135,1.0 138,1.0 141,1.0 144,1.0 147,1.0 150,1.0 153,1.0 " fill="transparent" stroke="#8cc665" stroke-width="2">
                        </polyline></mask>
                      </defs>
                
                      <g transform="translate(0, 2.0)">
                        <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-196475996); mask: url(#sparkline-196475996)"></rect>
                      </g>
                    </svg>
                  </span>
                
                    </div>
                  </div>
                </li>
                
                        
                
                <li class="col-12 d-flex width-full py-4 border-bottom private source" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
                  <div class="col-10 col-lg-9 d-inline-block">
                    <div class="d-inline-block mb-1">
                      <h3>
                        <a href="/jamesszhou/git-test" itemprop="name codeRepository">
                        git-test</a>
                        <span class="Label Label--outline v-align-middle ml-1 mb-1">Private</span>
                      </h3>
                
                
                    </div>
                
                    <div>
                    </div>
                
                
                    <div class="f6 text-gray mt-2">
                
                        <span class="ml-0 mr-3">
                  <span class="repo-language-color" style="background-color: #e34c26"></span>
                  <span itemprop="programmingLanguage">HTML</span>
                </span>
                
                
                
                
                        Updated <relative-time datetime="2019-04-08T17:38:03Z" title="Apr 8, 2019, 10:38 AM PDT">on Apr 8</relative-time>
                    </div>
                  </div>
                
                  <div class="col-2 col-lg-3 d-flex flex-column flex-justify-around">
                      <div class="text-right">
                        
                  <div class="d-inline-block js-toggler-container js-social-container starring-container ">
                    <!-- </textarea></xmp> --><form class="starred js-social-form" data-remote="true" action="/jamesszhou/git-test/unstar" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="g0ssAX5QufE6XP7Ct5U2hXKmGXHM+LlBHU26ax1pnpASA8ciGQui8LvDcDpvDZAZo+kO6Z+Q8qFG5P4QW9UxwQ==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this repository" title="Unstar jamesszhou/git-test" data-ga-click="Repository, click unstar button, action:profiles#show; text:Unstar">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Unstar
                      </button>
                </form>    <!-- </textarea></xmp> --><form class="unstarred js-social-form" data-remote="true" action="/jamesszhou/git-test/star" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="+Ervcs2zzntZ1M6yYIjFmDpNx73d4K1+XlKGchvG+ItJ96jCbk7OOj5NK8+lxKnQF0QHbB7Rq9lVa4ipyl0lKQ==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Star" aria-label="Star this repository" title="Star jamesszhou/git-test" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Star
                      </button>
                </form>  </div>
                
                      </div>
                
                    <div class="text-right hide-lg hide-md hide-sm hide-xs mt-2">
                      
                
                
                  <span class="tooltipped tooltipped-s" aria-label="Past year of activity">
                    <svg width="155" height="30">
                      <defs>
                        <linearGradient id="gradient-180200843" x1="0" x2="0" y1="1" y2="0">
                            <stop offset="10%" stop-color="#c6e48b"></stop>
                            <stop offset="33%" stop-color="#7bc96f"></stop>
                            <stop offset="66%" stop-color="#239a3b"></stop>
                            <stop offset="90%" stop-color="#196127"></stop>
                        </linearGradient>
                        <mask id="sparkline-180200843" x="0" y="0" width="155" height="28">
                          <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,1 87,5 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2">
                        </polyline></mask>
                      </defs>
                
                      <g transform="translate(0, -10)">
                        <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-180200843); mask: url(#sparkline-180200843)"></rect>
                      </g>
                    </svg>
                  </span>
                
                    </div>
                  </div>
                </li>
                
                        
                
                <li class="col-12 d-flex width-full py-4 border-bottom public source" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
                  <div class="col-10 col-lg-9 d-inline-block">
                    <div class="d-inline-block mb-1">
                      <h3>
                        <a href="/jamesszhou/jamesszhou.github.io" itemprop="name codeRepository">
                        jamesszhou.github.io</a>
                        
                      </h3>
                
                
                    </div>
                
                    <div>
                        <p class="col-9 d-inline-block text-gray mb-2 pr-4" itemprop="description">
                          professional website
                        </p>
                    </div>
                
                
                    <div class="f6 text-gray mt-2">
                
                        <span class="ml-0 mr-3">
                  <span class="repo-language-color" style="background-color: #e34c26"></span>
                  <span itemprop="programmingLanguage">HTML</span>
                </span>
                
                
                
                
                        Updated <relative-time datetime="2019-04-03T04:06:28Z" title="Apr 2, 2019, 9:06 PM PDT">on Apr 2</relative-time>
                    </div>
                  </div>
                
                  <div class="col-2 col-lg-3 d-flex flex-column flex-justify-around">
                      <div class="text-right">
                        
                  <div class="d-inline-block js-toggler-container js-social-container starring-container ">
                    <!-- </textarea></xmp> --><form class="starred js-social-form" data-remote="true" action="/jamesszhou/jamesszhou.github.io/unstar" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="NwotpaHC2Y7cLLiFyxgsVTdNcj+i33yNxGI6LODdSrgqBP5fck8WJ7nakuPgKDuznC/EvqNWgBXazwnuYhbIww==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this repository" title="Unstar jamesszhou/jamesszhou.github.io" data-ga-click="Repository, click unstar button, action:profiles#show; text:Unstar">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Unstar
                      </button>
                </form>    <!-- </textarea></xmp> --><form class="unstarred js-social-form" data-remote="true" action="/jamesszhou/jamesszhou.github.io/star" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="P3IO3fnUTJz07XN/P1l9WoowJcxgm4tj8r5i4THgaqbsAymoUN/parQGQjrYYVhK+rWBqypKhKm5UrxkysFkEA==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Star" aria-label="Star this repository" title="Star jamesszhou/jamesszhou.github.io" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Star
                      </button>
                </form>  </div>
                
                      </div>
                
                    <div class="text-right hide-lg hide-md hide-sm hide-xs ">
                      
                
                
                  <span class="tooltipped tooltipped-s" aria-label="Past year of activity">
                    <svg width="155" height="30">
                      <defs>
                        <linearGradient id="gradient-178335967" x1="0" x2="0" y1="1" y2="0">
                            <stop offset="10%" stop-color="#c6e48b"></stop>
                            <stop offset="33%" stop-color="#7bc96f"></stop>
                            <stop offset="66%" stop-color="#239a3b"></stop>
                            <stop offset="90%" stop-color="#196127"></stop>
                        </linearGradient>
                        <mask id="sparkline-178335967" x="0" y="0" width="155" height="28">
                          <polyline transform="translate(0, 28) scale(1,-1)" points="0,1 3,1 6,1 9,1 12,1 15,1 18,1 21,1 24,1 27,1 30,1 33,1 36,1 39,1 42,1 45,1 48,1 51,1 54,1 57,1 60,1 63,1 66,1 69,1 72,1 75,1 78,1 81,1 84,20 87,11 90,1 93,1 96,1 99,1 102,1 105,1 108,1 111,1 114,1 117,1 120,1 123,1 126,1 129,1 132,1 135,1 138,1 141,1 144,1 147,1 150,1 153,1 " fill="transparent" stroke="#8cc665" stroke-width="2">
                        </polyline></mask>
                      </defs>
                
                      <g transform="translate(0, -3)">
                        <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-178335967); mask: url(#sparkline-178335967)"></rect>
                      </g>
                    </svg>
                  </span>
                
                    </div>
                  </div>
                </li>
                
                        
                
                <li class="col-12 d-flex width-full py-4 border-bottom public source" itemprop="owns" itemscope="" itemtype="http://schema.org/Code">
                  <div class="col-10 col-lg-9 d-inline-block">
                    <div class="d-inline-block mb-1">
                      <h3>
                        <a href="/jamesszhou/iAwake" itemprop="name codeRepository">
                        iAwake</a>
                        
                      </h3>
                
                
                    </div>
                
                    <div>
                        <p class="col-9 d-inline-block text-gray mb-2 pr-4" itemprop="description">
                          LAHacks 2019
                        </p>
                    </div>
                
                
                      <div class="topics-row-container d-inline-flex flex-wrap flex-items-center f6 my-1">
                          <a class="topic-tag topic-tag-link f6 my-1" href="/topics/swift" title="Topic: swift" data-ga-click="Topic, repository list" data-octo-click="topic_click" data-octo-dimensions="topic:swift,repository_id:178709801,repository_nwo:jamesszhou/iAwake,repository_public:true,repository_is_fork:false">
                  swift
                </a>
                
                          <a class="topic-tag topic-tag-link f6 my-1" href="/topics/python" title="Topic: python" data-ga-click="Topic, repository list" data-octo-click="topic_click" data-octo-dimensions="topic:python,repository_id:178709801,repository_nwo:jamesszhou/iAwake,repository_public:true,repository_is_fork:false">
                  python
                </a>
                
                      </div>
                
                    <div class="f6 text-gray mt-2">
                
                        <span class="ml-0 mr-3">
                  <span class="repo-language-color" style="background-color: #ffac45"></span>
                  <span itemprop="programmingLanguage">Swift</span>
                </span>
                
                        <a class="muted-link mr-3" href="/jamesszhou/iAwake/stargazers">
                          <svg aria-label="star" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                          2
                        </a>
                        <a class="muted-link mr-3" href="/jamesszhou/iAwake/network/members">
                          <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                          2
                        </a>
                
                
                
                        Updated <relative-time datetime="2019-04-01T23:30:58Z" title="Apr 1, 2019, 4:30 PM PDT">on Apr 1</relative-time>
                    </div>
                  </div>
                
                  <div class="col-2 col-lg-3 d-flex flex-column flex-justify-around">
                      <div class="text-right">
                        
                  <div class="d-inline-block js-toggler-container js-social-container starring-container ">
                    <!-- </textarea></xmp> --><form class="starred js-social-form" data-remote="true" action="/jamesszhou/iAwake/unstar" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="Ln3nIV+V0R/OUNCU/FgosofokHggOCcTt6ZF7Y324s3HlT0N+J05sTGyJH2r5cUqRa3d+LfymCjMWs5fqyIymw==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Unstar" aria-label="Unstar this repository" title="Unstar jamesszhou/iAwake" data-ga-click="Repository, click unstar button, action:profiles#show; text:Unstar">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Unstar
                      </button>
                </form>    <!-- </textarea></xmp> --><form class="unstarred js-social-form" data-remote="true" action="/jamesszhou/iAwake/star" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="tx5meo+KxcFSPIGaCyYrLi4Mxv4nqEjMxRIX7XFFLSqWfqsqE9ve9wiTEUkcjEL6/BDZfvuJX5H05rOsXiqkTA==">
                      <input type="hidden" name="context" value="user_stars">
                      <button class="btn btn-sm  js-toggler-target" type="submit" value="Star" aria-label="Star this repository" title="Star jamesszhou/iAwake" data-ga-click="Repository, click star button, action:profiles#show; text:Star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>Star
                      </button>
                </form>  </div>
                
                      </div>
                
                    <div class="text-right hide-lg hide-md hide-sm hide-xs ">
                      
                
                
                  <span class="tooltipped tooltipped-s" aria-label="Past year of activity">
                    <svg width="155" height="30">
                      <defs>
                        <linearGradient id="gradient-178709801" x1="0" x2="0" y1="1" y2="0">
                            <stop offset="10%" stop-color="#c6e48b"></stop>
                            <stop offset="33%" stop-color="#7bc96f"></stop>
                            <stop offset="66%" stop-color="#239a3b"></stop>
                            <stop offset="90%" stop-color="#196127"></stop>
                        </linearGradient>
                        <mask id="sparkline-178709801" x="0" y="0" width="155" height="28">
                          <polyline transform="translate(0, 28) scale(1,-1)" points="0,1.0 3,1.0 6,1.0 9,1.0 12,1.0 15,1.0 18,1.0 21,1.0 24,1.0 27,1.0 30,1.0 33,1.0 36,1.0 39,1.0 42,1.0 45,1.0 48,1.0 51,1.0 54,1.0 57,1.0 60,1.0 63,1.0 66,1.0 69,1.0 72,1.0 75,1.0 78,1.0 81,1.0 84,29.0 87,1.0 90,1.0 93,1.0 96,1.0 99,1.0 102,1.0 105,1.0 108,1.0 111,1.0 114,1.0 117,1.0 120,1.0 123,1.0 126,1.0 129,1.0 132,1.0 135,1.0 138,1.0 141,1.0 144,1.0 147,1.0 150,1.0 153,1.0 " fill="transparent" stroke="#8cc665" stroke-width="2">
                        </polyline></mask>
                      </defs>
                
                      <g transform="translate(0, 2.0)">
                        <rect x="0" y="-2" width="155" height="30" style="stroke: none; fill: url(#gradient-178709801); mask: url(#sparkline-178709801)"></rect>
                      </g>
                    </svg>
                  </span>
                
                    </div>
                  </div>
                </li>
                
                    </ul>
                </div>
    </body>
   
</html>

      `);
