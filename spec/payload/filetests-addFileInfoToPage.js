const jsdom = require("jsdom");
const { JSDOM } = jsdom;
export var mockHTML_addFileInfoToPage = new JSDOM(`
      <!DOCTYPE html>
      <html>
    <head>
      <style>
        .blob-num {
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          color: rgba(27, 31, 35, 0.3);
          cursor: pointer;
          font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
          font-size: 12px;
          line-height: 20px;
          min-width: 50px;
          padding-left: 10px;
          padding-right: 10px;
          text-align: right;
          user-select: none;
          vertical-align: top;
          white-space: nowrap;
          width: 1%;
        }
        .blob-num:before {
          content: attr(data-line-number);
        }
      </style>
    </head>
    <body>
      <div class="Box mt-3 position-relative">
        <div itemprop="text" class="Box-body p-0 blob-wrapper data type-c ">
            <div itemprop="text" class="Box-body p-0 blob-wrapper data type-c ">
        <table class="highlight tab-size js-file-line-container" data-tab-size="8">
        <tbody><tr>
          <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
          <td id="LC1" class="blob-code blob-code-inner js-file-line">#<span class="pl-k">ifndef</span> GAMECONSTANTS_H_</td>
        </tr>
        <tr>
          <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
          <td id="LC2" class="blob-code blob-code-inner js-file-line">#<span class="pl-k">define</span> <span class="pl-en">GAMECONSTANTS_H_</span></td>
        </tr>
        <tr>
          <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
          <td id="LC3" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
          <td id="LC4" class="blob-code blob-code-inner js-file-line">#<span class="pl-k">include</span> <span class="pl-s"><span class="pl-pds">&lt;</span>random<span class="pl-pds">&gt;</span></span></td>
        </tr>
        <tr>
          <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
          <td id="LC5" class="blob-code blob-code-inner js-file-line">#<span class="pl-k">include</span> <span class="pl-s"><span class="pl-pds">&lt;</span>utility<span class="pl-pds">&gt;</span></span></td>
        </tr>
        <tr>
          <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
          <td id="LC6" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
          <td id="LC7" class="blob-code blob-code-inner js-file-line"><span class="pl-c"><span class="pl-c">//</span> IDs for the game objects</span></td>
        </tr>
        <tr>
          <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
          <td id="LC8" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
          <td id="LC9" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_PLAYER               =  <span class="pl-c1">0</span>;</td>
        </tr>
        <tr>
          <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
          <td id="LC10" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_ZOMBIE               =  <span class="pl-c1">1</span>;</td>
        </tr>
        <tr>
          <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
          <td id="LC11" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_CITIZEN              =  <span class="pl-c1">2</span>;</td>
        </tr>
        <tr>
          <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
          <td id="LC12" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_FLAME                =  <span class="pl-c1">3</span>;</td>
        </tr>
        <tr>
          <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
          <td id="LC13" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_VOMIT                =  <span class="pl-c1">4</span>;</td>
        </tr>
        <tr>
          <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
          <td id="LC14" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_PIT                  =  <span class="pl-c1">5</span>;</td>
        </tr>
        <tr>
          <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
          <td id="LC15" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_LANDMINE             =  <span class="pl-c1">6</span>;</td>
        </tr>
        <tr>
          <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
          <td id="LC16" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_VACCINE_GOODIE       =  <span class="pl-c1">7</span>;</td>
        </tr>
        <tr>
          <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
          <td id="LC17" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_GAS_CAN_GOODIE       =  <span class="pl-c1">8</span>;</td>
        </tr>
        <tr>
          <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
          <td id="LC18" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_LANDMINE_GOODIE      =  <span class="pl-c1">9</span>;</td>
        </tr>
        <tr>
          <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
          <td id="LC19" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_EXIT                 = <span class="pl-c1">10</span>;</td>
        </tr>
        <tr>
          <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
          <td id="LC20" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> IID_WALL                 = <span class="pl-c1">11</span>;</td>
        </tr>
        <tr>
          <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
          <td id="LC21" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
          <td id="LC22" class="blob-code blob-code-inner js-file-line"><span class="pl-c"><span class="pl-c">//</span> sounds</span></td>
        </tr>
        <tr>
          <td id="L23" class="blob-num js-line-number" data-line-number="23"></td>
          <td id="LC23" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L24" class="blob-num js-line-number" data-line-number="24"></td>
          <td id="LC24" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_PLAYER_FIRE      =  <span class="pl-c1">0</span>;</td>
        </tr>
        <tr>
          <td id="L25" class="blob-num js-line-number" data-line-number="25"></td>
          <td id="LC25" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_PLAYER_DIE       =  <span class="pl-c1">1</span>;</td>
        </tr>
        <tr>
          <td id="L26" class="blob-num js-line-number" data-line-number="26"></td>
          <td id="LC26" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_ZOMBIE_BORN      =  <span class="pl-c1">2</span>;</td>
        </tr>
        <tr>
          <td id="L27" class="blob-num js-line-number" data-line-number="27"></td>
          <td id="LC27" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_ZOMBIE_VOMIT     =  <span class="pl-c1">3</span>;</td>
        </tr>
        <tr>
          <td id="L28" class="blob-num js-line-number" data-line-number="28"></td>
          <td id="LC28" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_ZOMBIE_DIE       =  <span class="pl-c1">4</span>;</td>
        </tr>
        <tr>
          <td id="L29" class="blob-num js-line-number" data-line-number="29"></td>
          <td id="LC29" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_CITIZEN_INFECTED =  <span class="pl-c1">5</span>;</td>
        </tr>
        <tr>
          <td id="L30" class="blob-num js-line-number" data-line-number="30"></td>
          <td id="LC30" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_CITIZEN_SAVED    =  <span class="pl-c1">6</span>;</td>
        </tr>
        <tr>
          <td id="L31" class="blob-num js-line-number" data-line-number="31"></td>
          <td id="LC31" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_CITIZEN_DIE      =  <span class="pl-c1">7</span>;</td>
        </tr>
        <tr>
          <td id="L32" class="blob-num js-line-number" data-line-number="32"></td>
          <td id="LC32" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_GOT_GOODIE       =  <span class="pl-c1">8</span>;</td>
        </tr>
        <tr>
          <td id="L33" class="blob-num js-line-number" data-line-number="33"></td>
          <td id="LC33" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_LANDMINE_EXPLODE =  <span class="pl-c1">9</span>;</td>
        </tr>
        <tr>
          <td id="L34" class="blob-num js-line-number" data-line-number="34"></td>
          <td id="LC34" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_LEVEL_FINISHED   = <span class="pl-c1">10</span>;</td>
        </tr>
        <tr>
          <td id="L35" class="blob-num js-line-number" data-line-number="35"></td>
          <td id="LC35" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_THEME            = <span class="pl-c1">11</span>;</td>
        </tr>
        <tr>
          <td id="L36" class="blob-num js-line-number" data-line-number="36"></td>
          <td id="LC36" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L37" class="blob-num js-line-number" data-line-number="37"></td>
          <td id="LC37" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SOUND_NONE             = -<span class="pl-c1">1</span>;</td>
        </tr>
        <tr>
          <td id="L38" class="blob-num js-line-number" data-line-number="38"></td>
          <td id="LC38" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L39" class="blob-num js-line-number" data-line-number="39"></td>
          <td id="LC39" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L40" class="blob-num js-line-number" data-line-number="40"></td>
          <td id="LC40" class="blob-code blob-code-inner js-file-line"><span class="pl-c"><span class="pl-c">//</span> keys the user can hit</span></td>
        </tr>
        <tr>
          <td id="L41" class="blob-num js-line-number" data-line-number="41"></td>
          <td id="LC41" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L42" class="blob-num js-line-number" data-line-number="42"></td>
          <td id="LC42" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_LEFT  = <span class="pl-c1">1000</span>;</td>
        </tr>
        <tr>
          <td id="L43" class="blob-num js-line-number" data-line-number="43"></td>
          <td id="LC43" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_RIGHT = <span class="pl-c1">1001</span>;</td>
        </tr>
        <tr>
          <td id="L44" class="blob-num js-line-number" data-line-number="44"></td>
          <td id="LC44" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_UP    = <span class="pl-c1">1002</span>;</td>
        </tr>
        <tr>
          <td id="L45" class="blob-num js-line-number" data-line-number="45"></td>
          <td id="LC45" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_DOWN  = <span class="pl-c1">1003</span>;</td>
        </tr>
        <tr>
          <td id="L46" class="blob-num js-line-number" data-line-number="46"></td>
          <td id="LC46" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_SPACE = <span class="pl-s"><span class="pl-pds">'</span> <span class="pl-pds">'</span></span>;</td>
        </tr>
        <tr>
          <td id="L47" class="blob-num js-line-number" data-line-number="47"></td>
          <td id="LC47" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_TAB   = <span class="pl-s"><span class="pl-pds">'</span><span class="pl-cce">\t</span><span class="pl-pds">'</span></span>;</td>
        </tr>
        <tr>
          <td id="L48" class="blob-num js-line-number" data-line-number="48"></td>
          <td id="LC48" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> KEY_PRESS_ENTER = <span class="pl-s"><span class="pl-pds">'</span><span class="pl-cce">\r</span><span class="pl-pds">'</span></span>;</td>
        </tr>
        <tr>
          <td id="L49" class="blob-num js-line-number" data-line-number="49"></td>
          <td id="LC49" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L50" class="blob-num js-line-number" data-line-number="50"></td>
          <td id="LC50" class="blob-code blob-code-inner js-file-line"><span class="pl-c"><span class="pl-c">//</span> view, sprite, and level data dimensions</span></td>
        </tr>
        <tr>
          <td id="L51" class="blob-num js-line-number" data-line-number="51"></td>
          <td id="LC51" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L52" class="blob-num js-line-number" data-line-number="52"></td>
          <td id="LC52" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> VIEW_WIDTH = <span class="pl-c1">256</span>;</td>
        </tr>
        <tr>
          <td id="L53" class="blob-num js-line-number" data-line-number="53"></td>
          <td id="LC53" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> VIEW_HEIGHT = <span class="pl-c1">256</span>;</td>
        </tr>
        <tr>
          <td id="L54" class="blob-num js-line-number" data-line-number="54"></td>
          <td id="LC54" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L55" class="blob-num js-line-number" data-line-number="55"></td>
          <td id="LC55" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SPRITE_WIDTH = <span class="pl-c1">16</span>;</td>
        </tr>
        <tr>
          <td id="L56" class="blob-num js-line-number" data-line-number="56"></td>
          <td id="LC56" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> SPRITE_HEIGHT = <span class="pl-c1">16</span>;</td>
        </tr>
        <tr>
          <td id="L57" class="blob-num js-line-number" data-line-number="57"></td>
          <td id="LC57" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L58" class="blob-num js-line-number" data-line-number="58"></td>
          <td id="LC58" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> LEVEL_WIDTH = VIEW_WIDTH / SPRITE_WIDTH;</td>
        </tr>
        <tr>
          <td id="L59" class="blob-num js-line-number" data-line-number="59"></td>
          <td id="LC59" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> LEVEL_HEIGHT = VIEW_HEIGHT / SPRITE_HEIGHT;</td>
        </tr>
        <tr>
          <td id="L60" class="blob-num js-line-number" data-line-number="60"></td>
          <td id="LC60" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L61" class="blob-num js-line-number" data-line-number="61"></td>
          <td id="LC61" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">double</span> SPRITE_WIDTH_GL = .<span class="pl-c1">6</span>; <span class="pl-c"><span class="pl-c">//</span> note - this is tied implicitly to SPRITE_WIDTH due to carey's sloppy openGL programming</span></td>
        </tr>
        <tr>
          <td id="L62" class="blob-num js-line-number" data-line-number="62"></td>
          <td id="LC62" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">double</span> SPRITE_HEIGHT_GL = .<span class="pl-c1">5</span>; <span class="pl-c"><span class="pl-c">//</span> note - this is tied implicitly to SPRITE_HEIGHT due to carey's sloppy openGL programming</span></td>
        </tr>
        <tr>
          <td id="L63" class="blob-num js-line-number" data-line-number="63"></td>
          <td id="LC63" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L64" class="blob-num js-line-number" data-line-number="64"></td>
          <td id="LC64" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L65" class="blob-num js-line-number" data-line-number="65"></td>
          <td id="LC65" class="blob-code blob-code-inner js-file-line"><span class="pl-c"><span class="pl-c">//</span> status of each tick (did the player die?)</span></td>
        </tr>
        <tr>
          <td id="L66" class="blob-num js-line-number" data-line-number="66"></td>
          <td id="LC66" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L67" class="blob-num js-line-number" data-line-number="67"></td>
          <td id="LC67" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> GWSTATUS_PLAYER_DIED   = <span class="pl-c1">0</span>;</td>
        </tr>
        <tr>
          <td id="L68" class="blob-num js-line-number" data-line-number="68"></td>
          <td id="LC68" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> GWSTATUS_CONTINUE_GAME = <span class="pl-c1">1</span>;</td>
        </tr>
        <tr>
          <td id="L69" class="blob-num js-line-number" data-line-number="69"></td>
          <td id="LC69" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> GWSTATUS_PLAYER_WON    = <span class="pl-c1">2</span>;</td>
        </tr>
        <tr>
          <td id="L70" class="blob-num js-line-number" data-line-number="70"></td>
          <td id="LC70" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> GWSTATUS_FINISHED_LEVEL= <span class="pl-c1">3</span>;</td>
        </tr>
        <tr>
          <td id="L71" class="blob-num js-line-number" data-line-number="71"></td>
          <td id="LC71" class="blob-code blob-code-inner js-file-line"><span class="pl-k">const</span> <span class="pl-k">int</span> GWSTATUS_LEVEL_ERROR   = <span class="pl-c1">4</span>;</td>
        </tr>
        <tr>
          <td id="L72" class="blob-num js-line-number" data-line-number="72"></td>
          <td id="LC72" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L73" class="blob-num js-line-number" data-line-number="73"></td>
          <td id="LC73" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L74" class="blob-num js-line-number" data-line-number="74"></td>
          <td id="LC74" class="blob-code blob-code-inner js-file-line">  <span class="pl-c"><span class="pl-c">//</span> Return a uniformly distributed random int from min to max, inclusive</span></td>
        </tr>
        <tr>
          <td id="L75" class="blob-num js-line-number" data-line-number="75"></td>
          <td id="LC75" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L76" class="blob-num js-line-number" data-line-number="76"></td>
          <td id="LC76" class="blob-code blob-code-inner js-file-line"><span class="pl-k">inline</span></td>
        </tr>
        <tr>
          <td id="L77" class="blob-num js-line-number" data-line-number="77"></td>
          <td id="LC77" class="blob-code blob-code-inner js-file-line"><span class="pl-k">int</span> <span class="pl-en">randInt</span>(<span class="pl-k">int</span> min, <span class="pl-k">int</span> max)</td>
        </tr>
        <tr>
          <td id="L78" class="blob-num js-line-number" data-line-number="78"></td>
          <td id="LC78" class="blob-code blob-code-inner js-file-line">{</td>
        </tr>
        <tr>
          <td id="L79" class="blob-num js-line-number" data-line-number="79"></td>
          <td id="LC79" class="blob-code blob-code-inner js-file-line">    <span class="pl-k">if</span> (max &lt; min)</td>
        </tr>
        <tr>
          <td id="L80" class="blob-num js-line-number" data-line-number="80"></td>
          <td id="LC80" class="blob-code blob-code-inner js-file-line">        <span class="pl-c1">std::swap</span>(max, min);</td>
        </tr>
        <tr>
          <td id="L81" class="blob-num js-line-number" data-line-number="81"></td>
          <td id="LC81" class="blob-code blob-code-inner js-file-line">    <span class="pl-k">static</span> std::random_device rd;</td>
        </tr>
        <tr>
          <td id="L82" class="blob-num js-line-number" data-line-number="82"></td>
          <td id="LC82" class="blob-code blob-code-inner js-file-line">    <span class="pl-k">static</span> std::mt19937 <span class="pl-smi">generator</span>(<span class="pl-c1">rd</span>());</td>
        </tr>
        <tr>
          <td id="L83" class="blob-num js-line-number" data-line-number="83"></td>
          <td id="LC83" class="blob-code blob-code-inner js-file-line">    std::uniform_int_distribution&lt;&gt; <span class="pl-c1">distro</span>(min, max);</td>
        </tr>
        <tr>
          <td id="L84" class="blob-num js-line-number" data-line-number="84"></td>
          <td id="LC84" class="blob-code blob-code-inner js-file-line">    <span class="pl-k">return</span> <span class="pl-c1">distro</span>(generator);</td>
        </tr>
        <tr>
          <td id="L85" class="blob-num js-line-number" data-line-number="85"></td>
          <td id="LC85" class="blob-code blob-code-inner js-file-line">}</td>
        </tr>
        <tr>
          <td id="L86" class="blob-num js-line-number" data-line-number="86"></td>
          <td id="LC86" class="blob-code blob-code-inner js-file-line">
  </td>
        </tr>
        <tr>
          <td id="L87" class="blob-num js-line-number" data-line-number="87"></td>
          <td id="LC87" class="blob-code blob-code-inner js-file-line">#<span class="pl-k">endif</span> <span class="pl-c"><span class="pl-c">//</span> GAMECONSTANTS_H_</span></td>
        </tr>
  </tbody></table>
  
                  </div>
        </div>
      </div>
    </body>
  </html>
  
      `);
