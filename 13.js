/**
 * @file
 * Copyright (c) 2017 Constructive Media, LLC
 *
 * The MIT license
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * Cmatgame themization
 */

(function ($) {
  $('.summary-instructions .instructions-more, .body-instructions .instructions-less ').prev().addClass('last');
 })(jQuery);

var swf1 = '<div></div>';
var intervalId;
var afg_container = "<div></div>";
  jQuery("#afg_container").replaceWith('<div id="afg_container"><h1 style="margin:20px 180px;">Just a moment while your game loads...</h1><div id="afg_preloader"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="640" height="512" id="preloader" align="middle"><param name="wmode" value="direct"><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="false"/><param name="movie" value="ima3_preloader_1.5.swf"/><param name="quality" value="high"/><param name="bgcolor" value="#ffffff"/><param name="flashvars" value="adTagUrl=https%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F45966600%2FVideo_Ad_1%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26description_url%3D' + encodeURIComponent(document.location.href) + '%26correlator%3D%5Btimestamp%5D"/><embed src="http://www.coolmath-games.com/sites/cmatgame/files/adtesting/0-blym-test/ima3_preloader_1.5.swf" quality="high" bgcolor="#000000" width="640" height="512" name="preloader" align="middle" allowscriptaccess="always" allowfullscreen="false" type="application/x-shockwave-flash" flashvars="adTagUrl=https%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x480%26iu%3D%2F45966600%2FVideo_Ad_1%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dxml_vast2%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26description_url%3D' + encodeURIComponent(document.location.href) + '%26correlator%3D%5Btimestamp%5D" pluginspage="http://www.adobe.com/go/getflashplayer"><object type="application/x-shockwave-flash" data="//www.gstatic.com/osd/hbe.swf?id=0~0" width="1" height="1" style="visibility: hidden; opacity: 0; z-index: -999999; position: fixed; left: 651.5px; top: 562.59375px;"><param name="movie" value="//www.gstatic.com/osd/hbe.swf?id=0~0"/><param name="allowscriptaccess" value="always"/></object></object></div><!--preloader--></div><!--container!!!!!-->');

if(jQuery('#afg_container').length){
  console.log('afg present set hight to 0');
  jQuery('.field_game').css('height','0');
}else {
  jQuery('.field-game').css('height',null);
  console.log('height hide');
}
function checkIfFlashIsEnabled() {
  var ie_flash; 
  try { ie_flash = (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) !== false) } catch(err) { ie_flash = false; } 
  var _flash_installed = ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || ie_flash); 
  if(typeof _flash_installed == 'undefined' || !_flash_installed) {
    return false;
  } else {
    return true;
  }
}


function flashDetectionMessage() {
  //console.log('flash is undefined');
  // jQuery('object#preloader embed').height(250).width(600);
  //  jQuery('#container123').html('<div class="noscript" style="color:#FFF;"><img src="/sites/cmatgame/files/enable-flash/enable-flash-new.png" alt="click here to enable flash" /><div class="bottom-text"><p>If that doesn\'t work, <a href="/fix-flash" class="fix-flash-2">go here for more help.</div>');
  jQuery('.field-game').css('display','none');
  jQuery('.no-flash').css('display','none');
  jQuery('#afg_container').css('display','none').html('<div></div>');
  jQuery('#no-flash-overlay').show();
  jQuery('.load-wrap').hide();
  jQuery('#continue-container').hide();
  jQuery('#afg_container').css({'margin-bottom':'0px'});
//  jQuery('.title-instructions').prepend('<div class="enable-flash-bubble"><p class="flash-bubble-text"> To play this game you need to enable Flash. ' +
//'Just click the gray box above, then click â€œAllowâ€.</p><p class="flash-bubble-small">If that doesn\'t work, <a href="/fix-flash" class="flash-bubble-link">go here for more help.</a></p></div>');
  var flash_disabled =localStorage.getItem("flash_disabled");
  if(jQuery('.unlock-link').length) {
    jQuery('#subscriber-banner').hide();
  }
  if(flash_disabled == null) {
    localStorage.setItem("flash_disabled", "true");
    // Google Analytics
    if(typeof __gaTracker !== "undefined") {
      __gaTracker('send', {
          'hitType': 'event',          // Required.
          'eventCategory': "Flash Status",   // Required .
          'eventAction': "Flash Disabled",      // Required.
          'eventLabel': document.title,
          'eventValue': "0",
          'nonInteraction': 1
      });
    }
  }
}

function playerEvents(){

  console.log('playerEvents function called');

    // event will fire when ad content starts playback
    Bolt.on('cmg-player', Bolt.BOLT_AD_STARTED, function() {

      console.log('Bolt.BOLT_AD_STARTED Event Fired');
      
    });

  // event fired after successful ad completes playback or no ads are returned
  Bolt.on('cmg-player', 'showHiddenContainer', function() {
      console.log( 'Bolt.showHiddenContainer Fired' );
      removePrerollAndDisplayGame();
  });

}
function removeAdSwfJWPLayer() {
}




function createIeObject(url){
   var div = document.createElement("div");
   div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" +url + "'></object>";
   return div.firstChild;
}

function remove_anon_user_blocks() {
  var cmatgame_subscriber = getCookie('cmg_sx');
   if(typeof cmatgame_subscriber !== 'undefined' && cmatgame_subscriber !== null) {
      jQuery("body").addClass("subscribed-users logged-in");
      //console.log('valid subscriber / logged in class ')
    }
    if (jQuery(".pane-bean-subscriber-promo").length <= 0) {
      if (jQuery("body").hasClass("logged-in")) {
        jQuery("body").addClass("subscribed-users");
      }
    }
  jQuery(".page-frontpage .content-column-wrapper .main-aside .inside div").each(function() {
    if(jQuery(this).hasClass('panel-pane')) {
	  righttrailclass = jQuery(this).attr('class');
	  if(righttrailclass.search('pane-cmatgame-advertisement-cm-g-homepage') != -1) {
	    jQuery(this).remove(); 		
	  }
      if(righttrailclass.search('pane-bean-right-rail-bottom-playlist-hp') != -1) {
	    jQuery(this).insertAfter(jQuery(".page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-homepage-top-right-rail-jigsaw-p")); 	
        jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-homepage-top-right-rail-jigsaw-p').css('margin-bottom','24px');
        jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-right-rail-bottom-playlist-hp').css('margin-bottom','46px');
        jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-right-rail-bottom-playlist-hp').css('margin-top','24px');		
	  }	  
	}  
  });
  jQuery('.content-column-wrapper').css('width','1186px');
  jQuery('.panel-pane.pane-block.pane-bean-coolmath-header').replaceWith('');
  jQuery('.panel-pane.pane-block.pane-bean-game-page-no-ads-promo').replaceWith('');
  jQuery('.pane-bean-subscriber-promo a').css({'display':'inline-block','visibility':'hidden'});
  jQuery('.homepage-remove-ads-1').replaceWith('');
  jQuery('.pane-bean-game-page-no-ads-promo').replaceWith('');
  ////Front page
  jQuery('body.front .panel-pane .pane-content .global-wrapper-content .new-games .link-more-wrapper').css('margin-bottom','53px');
  jQuery('body.front .subscribed-users .content-column-wrapper').css('margin-top','45px');

  //playlist page tweak still
  jQuery('body.logged-in.section-1-playlists .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'4px !important'});

  //Basic Pages
  jQuery('.node-type-page .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-40px !important'});
  jQuery('.node-type-page .global-wrapper .content-column-wrapper .main-column').css({'position':'relative','top':'-7px !important'});

  ///unlockable game list
  jQuery('body.logged-in.page-1-unlockable-game-list .content-column-wrapper').css('margin-top','45px');
  jQuery('body.logged-in.page-1-unlockable-game-list .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-31px'});
  ///complte game list
  jQuery('body.logged-in.page-1-complete-game-list .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-52px'});
  ///taxonomy pages
  jQuery('body.logged-in.page-taxonomy .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-21px !important'});
  jQuery('body.logged-in.page-taxonomy .global-wrapper .content-column-wrapper  .pane-categories-panel-pane-2').css({'position':'relative','top':'-3px !important'});

  ///gamae pages
  jQuery('.node-type-game .global-wrapper .content-column-wrapper .main-column').css({'position':'relative','top':'-5px !important'});
  jQuery('body.extra-large-game-item .global-wrapper .content-column-wrapper .main-column').css('width','980px');
  jQuery('.node-type-game .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-61px !important'});

}
function remove_ads_from_free_game_pages() {
  jQuery(".ad-wrapper").each(function() {
    var self = jQuery(this);
    self.replaceWith("");
  });
  //Exceptions
  // jQuery('.page-frontpage .main-column .inside').css('margin-top','40px');
  var userpages = /signup|user|subscribe-info/;
  if(!userpages.test(window.location.pathname)) {
    jQuery('.content-column-wrapper').css('width','1186px');
  }
  jQuery('.content-column-wrapper').css('width','1186px');
  jQuery('.panel-pane.pane-block.pane-bean-coolmath-header').replaceWith('');
  jQuery('.global-wrapper .pane-cmatgame-advertisement-cm-g-homepage-300x250-top').replaceWith('');//css('height', '0');
  jQuery('.pane-cmatgame-advertisement-cm-g-otherpages-300x250-top').replaceWith('');
  jQuery('.homepage-remove-ads-1').replaceWith('');
  jQuery('.node-type-game .global-wrapper .global-content-wrapper .content-column-wrapper .main-column .pane-page-content .pane-content .pane-bean-game-page-no-ads-promo .game-page-no-add').css('display','none');  // jQuery('.pane-bean-game-page-no-ads-promo').replaceWith('').css('','');
  jQuery('.adobe-analytics-sub-experience').css('display','none');
  jQuery('.page-1-unlockable-game-list .view-header').replaceWith('');
  jQuery('body.extra-large-game-item .global-wrapper .content-column-wrapper .main-column').css('width','980px');
  jQuery('.global-wrapper .global-content-wrapper .pane-bean-subscriber-promo').html('<div class="pane-bean-subscriber-promo"><a href="/subscribe-info/">Parents and Teachers</a></div>');

  ////Front page
  jQuery('body.front .subscribed-users .content-column-wrapper').css('margin-top','45px');
  //playlist page tweak still
  jQuery('body.logged-in.section-1-playlists .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'4px !important'});

  //Basic Pages
  jQuery('.node-type-page .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-40px !important'});
  jQuery('.node-type-page .global-wrapper .content-column-wrapper .main-column').css({'position':'relative','top':'-7px !important'});

  ///unlockable game list
  jQuery('body.logged-in.page-1-unlockable-game-list .content-column-wrapper').css('margin-top','45px');
  jQuery('body.logged-in.page-1-unlockable-game-list .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-31px'});
  //complte game list
  jQuery('body.logged-in.page-1-complete-game-list .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-52px'});
  ///taxonomy pages
  jQuery('body.logged-in.page-taxonomy .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-21px !important'});
  jQuery('body.logged-in.page-taxonomy .global-wrapper .content-column-wrapper  .pane-categories-panel-pane-2').css({'position':'relative','top':'-3px !important'});

  ///gamae pages
  jQuery('.node-type-game .global-wrapper .content-column-wrapper .main-column').css({'position':'relative','top':'-5px !important'});
  jQuery('.node-type-game .global-wrapper .content-column-wrapper .main-aside .pane-bean-right-rail-top-playlist').css({'position':'relative','top':'-61px !important'});

  //header
  if(typeof cmg_school_whitelisted !== 'undefined' && cmg_school_whitelisted !== null || typeof cmg_no_ads !== 'undefined' && cmg_no_ads !== null) {
    jQuery('body').removeClass('not-logged-in');
    jQuery('body').addClass('logged-in');
    if(jQuery('.header-banner-block .pane-bean-subscriber-promo').length) {
      var parents_promo = '<div class=\"panel-pane pane-block pane-bean-parents-promo\"><div class=\"pane-content\"><div class=\"entity entity-bean bean-content-block clearfix\" about=\"/block/subscriber-promo\" typeof=\"\"><div class=\"content\"><div class=\"field-text-block\"><p><a class=\"top-subscriber-promo\" href=\"/subscribe-info\">Subscribe Now</a></p></div></div></div></div></div>';
      jQuery('.panel-pane.pane-block.pane-bean-subscriber-promo').replaceWith(parents_promo);
      jQuery('#user-login-form .welcome-box .first.last').addClass('element-invisible');
    }
  }

}

(function ($, Drupal, window, document, undefined) {
  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.cmatgame_leaderboard_post_user_score = {

    attach: function(context,settings) {
      //do we have game id data that need to be sent to backend?
      var user_game_id = sessionStorage.getItem("game_id");
      var user_score_json_data = sessionStorage.getItem(user_game_id+ 'user_score_json_data');
      if(user_game_id != null  && user_score_json_data != null) {
        //do ajax call to update the score in database
      jQuery.post("/ajax/score", JSON.parse(user_score_json_data));
      sessionStorage.removeItem(user_game_id+'user_score_json_data');
      sessionStorage.removeItem("game_id");
      }
    }
  }
  Drupal.behaviors.cmatgame_subscriber_behavior = {
    user_logout: function (event) {
      //console.log("Logout clicked "+event);
      event.preventDefault();
      cmg_vs = getCookie('cmg_ux');

      var dest = '';
      if(window.location.pathname !== 'undefined' && window.location.pathname !== '' && (window.location.pathname === '/' || window.location.pathname === '/myaccount')) {
        dest = '?destination=frontpage';
      } else if(window.location.pathname !== 'undefined' && window.location.pathname !== '' && window.location.pathname !== '/') {
        dest = '?destination='+window.location.pathname;
      }
      if(typeof cmg_vs !== 'undefined' && cmg_vs !== null) {
        if(getCookie('cmg_sx') !== null) {
          cmg_vs = cmg_vs + '/'+getCookie('cmg_sx');
        }
        dest = '/'+cmg_vs + dest + '&'+new Date().getTime();
      } else {
        dest = dest + '&'+new Date().getTime();
      }
      if(window.location.host === 'cmatgame.local') {
        window.location.href = 'http://' +window.location.host + '/sub_check/logout'+dest;
      } else if(typeof cmg_vs !== 'undefined' && cmg_vs !== null && getCookie('cmg_sx') !== null) {
        window.location.href = 'http://' +window.location.host + '/sub_check/logout'+dest;
      } else {
        window.location.href = 'http://' +window.location.host + '/user/logout'+dest;
      }
    },
    user_loginbar_update: function () {
      var dest = '';
      if(window.location.pathname !== 'undefined' && window.location.pathname !== '' && window.location.pathname !== '/') {
        dest = '?destination='+window.location.pathname;
      }
      var welcome_html = '<a class="chess-link-header" href="/0-chess">Coolmath Games Chess</a><li class="first"><a href="/myaccount" title="My Account">My Account</a></li><li>/</li><li class="last"><a href="/sub_check/logout" onClick="Drupal.behaviors.cmatgame_subscriber_behavior.user_logout(event); return false;" title="Log Out">Log Out</a></li>';
      var login_html = '<a class="chess-link-header" href="/0-chess">Coolmath Games Chess</a><li class="first last"><a title="Subscriber Login" class="welcome-text" href="/user/login'+dest+'">Subscriber Login</a></li>';
      var cmatgame_login = getCookie('cmg_l');
      var cmatgame_editor = getCookie('cmg_editor');
      if(typeof cmatgame_editor !== 'undefined' && cmatgame_editor !== null && cmatgame_editor !== '' && !isNaN(cmatgame_editor)) {
        cmatgame_editor = parseInt(cmatgame_editor);
        welcome_html = '<a class="chess-link-header" href="/0-chess">Coolmath Games Chess</a><li class="first"><a href="/user/'+cmatgame_editor+'/edit" title="My Account">My Account</a></li><li>/</li><li class="last"><a href="/sub_check/logout" onClick="Drupal.behaviors.cmatgame_subscriber_behavior.user_logout(event); return false;" title="Log Out">Log Out</a></li>';
      }
      if(typeof cmg_school_whitelisted !== 'undefined' && cmg_school_whitelisted === 'yes') {
        welcome_html = '<a class="chess-link-header" href="/0-chess">Coolmath Games Chess</a>';
        login_html = welcome_html;
      }
      
      if(typeof cmatgame_login !== undefined && cmatgame_login !== '' && cmatgame_login !==  null) {
        jQuery(".pane-cmatgame-subscription-userloginbar2 .welcome-box").replaceWith('<ul class="welcome-box">'+welcome_html +'</ul>');
        //console.log("cmatgame_login cookie "+cmatgame_login);
      } else {
        jQuery(".pane-cmatgame-subscription-userloginbar2 .welcome-box").replaceWith('<ul class="welcome-box">'+login_html +'</ul>');
        //console.log("cmatgame_login cookie "+cmatgame_login);
      }
    },
    attach: function(context, settings) {
      // Place your code here.
      Drupal.behaviors.cmatgame_subscriber_behavior.user_loginbar_update();
    }
  };
})(jQuery, Drupal, this, this.document);

//sets cookie to false for ab testing(if user has been in test previously. it's now reset to false 
//setCookie('new-ab-test-cookie', 'false', '');
aboveBlock = '<div class="above-block"><div class="hand-container" style="display:inline-block;"><img src="/sites/cmatgame/files/old-domain/hand.png" /></div><div class="text-container" style="display:inline-block;"><img class="headline-text" src="/sites/cmatgame/files/old-domain/text.png">    <div class="main-text">You shouldnâ€™t be! We just dropped the hyphen in our name.<br><a href="https://www.coolmathgames.com">Coolmath-Games</a> is now <a href="https://www.coolmathgames.com">Coolmath Games</a>. <a href="/unblock-coolmath-games" class="learn-more-domain">Learn more ></a></div></div></div>';
jQuery(document).ready(function ($) {
  // console.log("cmatgame.js. ready");
  if (typeof zipCodeIncluded === "undefined") {
    zipCodeIncluded = ' ';
    aboveBlock = '';
    // console.log('undefined');
  } else if(zipCodeIncluded === "true"){
    aboveBlock = '<div class="above-block"><div class="hand-container" style="display:inline-block;"><img src="/sites/cmatgame/files/old-domain/hand.png" /></div><div class="text-container" style="display:inline-block;"><img class="headline-text" src="/sites/cmatgame/files/old-domain/text.png">    <div class="main-text">You shouldnâ€™t be! We just dropped the hyphen in our name.<br><a href="https://www.coolmathgames.com">Coolmath-Games</a> is now <a href="https://www.coolmathgames.com">Coolmath Games</a>. <a href="/whitelist-coolmath-games" class="learn-more-domain">Learn more ></a></div></div></div>';
    jQuery('.domain-placeholder').html(aboveBlock);
    // console.log('not undefined');
  }
  // console.log(zipCodeIncluded + ' zipCodeIncluded');
  // jQuery(aboveBlock).prependTo('.pane-pane-messages');
  // console.log('messages');
  if(jQuery('body').hasClass('.page-1-playlists')) {
    jQuery('.above-block').css({'margin-left':'227px','width':'698px'});
  }
  if(window.location.href.indexOf("1-") > -1) {
    jQuery('.above-block').css({'margin-left':'181px','height':'98px','width':'689px'});
  }
  if(window.location.href.indexOf("0-jigsaw-puzzles") > -1){
    jQuery('.above-block').css({'margin-left':'140px','height':'98px','width':'689px'});
  }
  if(window.location.href.indexOf("trivia") > -1){
    jQuery('.above-block').css({'margin-left':'160px','height':'98px','width':'689px'});
  }
  if(window.location.href.indexOf("quiz-category") > -1){
    jQuery('.above-block').css({'margin-left':'160px','height':'98px','width':'689px'});
  }
  if(jQuery('body').hasClass('.wide-game-item')){
    jQuery('.above-block').css({'margin-left':'155px','height':'65px'});
  }
  if(jQuery('body').hasClass('.large-game-item')){
    jQuery('.above-block').css({'margin-left':'34px','height':'65px'});
  }
  if(window.location.href.indexOf("signup") > -1 || window.location.href.indexOf("myaccount") > -1 || window.location.href.indexOf("user") > -1){
    jQuery('.above-block').html(' ');
    jQuery('.above-block').css('height','0px');
  }
  if(jQuery('body').hasClass('front')){
    jQuery('.above-block').css({'margin-left':'181px','height':'98px','width':'689px'});
  }

  //Add class to body tag based on browser
  var userAgent = navigator.userAgent;
  var appVersion = navigator.appVersion;
  var browserName = "";
  var OSName = "";
  if (userAgent.indexOf("MSIE") !== -1)
    browserName = "ie";
  if (userAgent.indexOf("Chrome") !== -1)
    browserName = "chrome";
  if (userAgent.indexOf("Firefox") !== -1)
    browserName = "firefox";
  jQuery("body").addClass(browserName);

  if (appVersion.indexOf("Win") !== -1)
    OSName = "windowsOS";
  if (appVersion.indexOf("Mac") !== -1)
    OSName = "macOS";
  if (appVersion.indexOf("Linux") !== -1)
    OSName = "linuxOs";
  jQuery("body").addClass(OSName);
  if (navigator.userAgent.indexOf('Mac OS X') != -1) {
    jQuery("body").addClass("mac_browsers");
    //console.log("MAC Browsers");
  } else {
    jQuery("body").addClass("pc");
    //console.log("Windows PC");
  }
  if (window.location.href.indexOf("?random_true") > -1) {
    jQuery(".menu_random").addClass(" active");
  }
//check ab test cookie value
  abTestCookie = getCookie('new-ab-test-cookie');
  if (abTestCookie == 'true'){
//      console.log("abTestCookie True");
        removeAdSwfJWPLayer();
  }


  if (abTestCookie == 'true' && (typeof preRollCookie == undefined || typeof preRollCookie == "undefined")){
//      console.log("abTestCookie True preRollCookie != undefined");
      setCookie('new-ab-test-cookie', 'false', '1800000');
  } 

  abTestCookie_1 = getCookie('no-refresh-cookie');

  if (abTestCookie_1 == 'true' && (typeof noRefreshCookie == undefined || typeof noRefreshCookie == "undefined")){
//      console.log("abTestCookie True preRollCookie != undefined");
      setCookie('no-refresh-cookie', 'false', '1800000');
  } 
  //Remove ads when user is an active subscriber
  var cmg_sx = getCookie("cmg_sx");
  if(typeof cmg_sx === undefined || cmg_sx === "" || cmg_sx === null) {
    //check if user is from GDPR countries
    if(getCookie('GDPR') !== null && getCookie('GDPR_All') == null && jQuery(".field-game").length) {
      removeAdSwfJWPLayer();
    }
    status = checkActiveUser();
    if(jQuery('.subscribe-to-unlock-link').length) {
      trackEventNonInteractive('Unlock All Levels category', 'subscribe to unlock button loaded', document.title); 
      }
  } else if(typeof cmg_sx !== undefined && cmg_sx !== "" && cmg_sx !== null) {
    //////margin for logged in users in experience
    // jQuery('.subscribed-users .global-wrapper .global-content-wrapper .main-header .header-banner-block .pane-bean-cmg-logo').css({'position':'relative','left':'0px'});
    jQuery(".ad-wrapper").each(function() {
      var self = $(this);
      self.replaceWith("");
    });
    if(jQuery(".field-game").length || jQuery('#swfgame').length) {
      removeAdSwfJWPLayer();
      if(checkIfFlashIsEnabled()) {
        jQuery("#subscriber-banner").replaceWith('<div id="subscriber-banner" class="adobe-analytics-sub-unlock"><a onclick="unlockAllLevels();" class="unlock-link">click-to-unlock</a></div>');
        if(jQuery('.unlock-link').length) {
         trackEvent('Unlock All Levels category', 'unlock all levels button loaded', document.title);       
         }
      } else {
        jQuery('#subscriber-banner').hide();
      }
    }
    remove_anon_user_blocks();
  }

  if(document.getElementById("swf_1") != null) {
    /*
    var swf_1_game_url = Drupal.settings.swfembed.swf.swf_1.url;
    swf_1_game_url = swf_1_game_url.replace("http:",window.location.protocol);

    game_element = document.getElementById("swf_1"),
    */
    //isMSIE = /*@cc_on!@*/false,
    /*
    obj = (isMSIE) ? createIeObject(swf_1_game_url) : document.createElement("object");
    if (!isMSIE) {
     obj.setAttribute("type", "application/x-shockwave-flash");
     obj.setAttribute("data", swf_1_game_url);
    }
    //Add attributes to <object>
    obj.setAttribute("id", "swfObjID");
    obj.setAttribute("width", Drupal.settings.swfembed.swf.swf_1.width);
    obj.setAttribute("height", Drupal.settings.swfembed.swf.swf_1.height);
    */
    
    var swf_game_url = jQuery("#swfgame").attr("src");
    console.log("jQuery(document).ready : New swf implementation iFrame attr src "+swf_game_url);
    if(typeof swf_game_url !== 'undefined' && swf_game_url.indexOf("//") === 0) {
      swf_game_url = window.location.protocol + swf_game_url;
    } else if(typeof swf_game_url !== 'undefined' && swf_game_url.indexOf("//")  > 0) {
      swf_game_url = swf_game_url.replace("http:",window.location.protocol);  
    }
    newswfiframe = '<iframe id="swfgame" src="' +  swf_game_url + '" class="' + jQuery("#swfgame").attr("class") +'" width="' + jQuery("#swfgame").attr("width") +'" height="' + jQuery("#swfgame").attr("height") +'" scrolling="no" marginwidth="0" vspace="0" frameborder="0" hspace="0" marginheight="0"></iframe>';
    //jQuery("#swfgame").replaceWith(newswfiframe);
  } 
     


  if(document.getElementById('timer_div')!=null) {
    var swf_game_url = jQuery("#swfgame").attr("src");
    if((typeof swf_game_url !== 'undefined' && !checkIfFlashIsEnabled())) {
      hide_preroll_ads = true;
      removeAdSwfJWPLayer();
    }
    var seconds_left = preroll_ads_timer ? preroll_ads_timer + 1 : 10;
    intervalId  = setInterval(function() {
      seconds_left--;
      //console.log("seconds left::" + seconds_left);
      if(typeof  isPrerollVideoPassbackAdDisplayed != 'undefined' && isPrerollVideoPassbackAdDisplayed) {
        document.getElementById('continue-link').innerHTML = '';
        if(document.getElementById('timer_div')!=null) {
          document.getElementById('timer_div').innerHTML = '<a href="javascript:removePrerollAndDisplayGame();"><div class="continue-link-yellow">Continue to Game &#9654;</div></a>';
        }
      } else {
        if(document.getElementById('timer_div')!=null) {
          document.getElementById('timer_div').innerHTML = seconds_left;
        }
      }
      if (seconds_left <= 0) {
        if(document.getElementById('timer_div')!=null) {
          document.getElementById('continue-link').innerHTML = '';
          document.getElementById('timer_div').innerHTML = '<a href="javascript:removePrerollAndDisplayGame();"><div class="continue-link-yellow">Continue to Game &#9654;</div></a>';
        }
         clearInterval(intervalId);
         if(typeof isPrerollVideoPassbackAdDisplayed != 'undefined' && isPrerollVideoPassbackAdDisplayed) {
           //remove Preroll Video Passback Ad and display the game
           removeAdSwfJWPLayer();
           isPrerollVideoPassbackAdDisplayed = false;
         }
      }
    }, 1000);
  }

  
  if((function() { var ie_flash; try { ie_flash = (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) !== false) } catch(err) { ie_flash = false; } var _flash_installed = ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || ie_flash); return _flash_installed; })()
   != undefined){
    var flash_disabled =localStorage.getItem("flash_disabled");
    if(flash_disabled != null) {
      if(typeof __gaTracker !== "undefined") {
        __gaTracker('send', {
        'hitType': 'event',          // Required.
        'eventCategory': "Flash Status",   // Required.
        'eventAction': "Flash Re Enabled",      // Required.
        'eventLabel': document.title,
        'eventValue': "0",
        'nonInteraction': 1
        });
      }
      localStorage.removeItem("flash_disabled");
    }
  }
  
  //freeTrialUser - remove ad warppers
  if((typeof freeTrialUser !== 'undefined' && freeTrialUser) || (typeof cmg_school_whitelisted !== 'undefined' && cmg_school_whitelisted) || (typeof cmg_no_ads !== 'undefined' && cmg_no_ads)) {
    remove_ads_from_free_game_pages();
  }
  if(checkIfInExperience()){
    //console.log('in experience');
    jQuery('body').removeClass('not-logged-in');
    jQuery('body').addClass('logged-in');
    jQuery('.subscribed-users .global-wrapper .global-content-wrapper .main-header .header-banner-block .pane-bean-cmg-logo').css({'position':'relative','left':'0px'});
    
    //Replace Go Ad Free header promo with parents and teachers promo
    if(typeof freeTrialUser !== 'undefined' && freeTrialUser && typeof targeted_state !== 'undefined' && targeted_state && jQuery('.panel-pane.pane-block.pane-bean-subscriber-promo').length) {
      jQuery('.panel-pane.pane-block.pane-bean-subscriber-promo').replaceWith('<div class="panel-pane pane-block"><div class="panel-pane pane-block"><div class="pane-bean-parents-promo" style="display: block;"><a href="/subscribe-info/" style="display: block;">Parents and Teachers</a></div></div></div>')
    } else if(typeof freeTrialUser !== 'undefined' && freeTrialUser && typeof targeted_state !== 'undefined' && targeted_state && jQuery('.panel-pane.pane-block .pane-bean-subscriber-promo').length) {
      jQuery('.panel-pane.pane-block .pane-bean-subscriber-promo').replaceWith('<div class="panel-pane pane-block"><div class="panel-pane pane-block"><div class="pane-bean-parents-promo" style="display: block;"><a href="/subscribe-info/" style="display: block;">Parents and Teachers</a></div></div></div>')
    }
    //CLSS-1712
    jQuery(".page-frontpage .content-column-wrapper .main-aside .inside div").each(function() {
      if(jQuery(this).hasClass('panel-pane')) {
        righttrailclass = jQuery(this).attr('class');
        if(righttrailclass.search('pane-cmatgame-advertisement-cm-g-homepage') != -1) {
          jQuery(this).remove();
        }
        if(righttrailclass.search('pane-bean-right-rail-bottom-playlist-hp') != -1) {
          jQuery(this).insertAfter(jQuery(".page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-homepage-top-right-rail-jigsaw-p"));  
          jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-homepage-top-right-rail-jigsaw-p').css('margin-bottom','24px');
          jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-right-rail-bottom-playlist-hp').css('margin-bottom','46px');
          jQuery('.page-frontpage .content-column-wrapper .main-aside .inside .pane-bean-right-rail-bottom-playlist-hp').css('margin-top','24px');
        }
      }
    });
  }
  
  //check if the session is still valid
  cmguser_session_revalidate();

  //freeTrialUser and thank you page -- GA events for form submission events
  subscription_event_handler();
  
  //Store jigsaw puzzle puzzle level user selected in local storage
  store_jigsaw_puzzle_level();
  
  //display error message when session expired
  session_expired_handler();
  
  /* Get current PST date and add to title of related daily games block in node page */
  dailygames_psd_date();


  function replacePuzzleInstructions(){
    jQuery('.node-puzzle .field-label').html('JIGSAW PUZZLE INSTRUCTIONS:')
    jQuery('.field-puzzle-instructions').html('Drag and drop the pieces into place. How fast can you solve the puzzle?');
    jQuery('.field-puzzle-thumbnail').css('margin','40px 192px');
  }

  if(jQuery('.field-puzzle-instructions').length) {
    console.log('puzzle instructions');
    replacePuzzleInstructions();
  }

  if(jQuery('.pane-cmatgame-advertisement-cm-g-homepage-160x600-left').length){
    var top = jQuery('.pane-cmatgame-advertisement-cm-g-homepage-160x600-left').offset().top;
    jQuery(window).scroll(function (event) {
      var y = jQuery(this).scrollTop();
      if (y >= top)
        jQuery('.pane-cmatgame-advertisement-cm-g-homepage-160x600-left').addClass('fixed');
      else
        jQuery('.pane-cmatgame-advertisement-cm-g-homepage-160x600-left').removeClass('fixed');
    });
  } else if(jQuery('.pane-cmatgame-advertisement-cm-g-otherpages-160x600-left').length){
    var otherTop = jQuery('.pane-cmatgame-advertisement-cm-g-otherpages-160x600-left').offset().top;
    jQuery(window).scroll(function (event) {
      var y = jQuery(this).scrollTop();
      if (y >= otherTop)
        jQuery('.pane-cmatgame-advertisement-cm-g-otherpages-160x600-left').addClass('fixed');
      else
        jQuery('.pane-cmatgame-advertisement-cm-g-otherpages-160x600-left').removeClass('fixed');
    });
  }
});

function session_expired_handler() {
  if(getCookie('cmg_exp') !== null) {
    setCookie('cmg_exp', 'false', -1000000);
    var msgHtml = '<div class="messages--status messages status"><h2 class="element-invisible">Error message</h2>'+
      'Hi â€“ Youâ€™ve automatically been logged out of your Coolmath Games subscription. '+
      'Your subscription allows you to access Coolmath Games from up to 3 different web browsers at once â€“ and youâ€™ve now exceeded that limit or you have been logged out from an another session. '+
      'Please login again to access your subscription.'+
      '</div>';
    jQuery('.panel-pane.pane-pane-messages .pane-content').html(msgHtml);
  }
}

function getParameterByName(name) {
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(location.href);
  if (results === null) {
    return "";
  }
  return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function subscription_event_handler() {
  var signupPages = /signup|user\/[0-9]*\/subscription|myaccount/;
  var cmgsubl = /cmgsubl/;
  if(window.location.pathname === "/thankyou" && typeof subscriberLeg !== 'undefined' && 
      ( (typeof freeTrialUser !== 'undefined' && freeTrialUser && subscriberLeg !== 'Default Leg')
      || cmgsubl.test(location.search) ) ) {  
    var pageReloaded = false;
    var cmgTp = /cmgtypl/;
    if((cmgsubl.test(location.search) || !cmgTp.test(location.search) ) && (!testCMGStorage() ||  (testCMGStorage() && localStorage.getItem('cmgtypl') === null)) ) {
      var date = new Date();
      var hour = date.getHours();
      var usersubpage = /user\/[0-9]*\/subscription/;
      var gaaction = 'Subscription success';
      var cmgsubValue = getParameterByName('cmgsubl');
      
      if(cmgsubValue === 2 || cmgsubValue === '2') {
        gaaction = 'Subscription Reactivation success';
        trackEvent('Subscription Reactivation', gaaction, document.title);
        trackEvent('Subscription Reactivation', gaaction+' hour', hour);
      } else {
        trackEvent('Premium Subscription ' +subscriberLeg, gaaction, document.title);
        trackEvent('Premium Subscription ' +subscriberLeg, gaaction+' hour', hour);
      }
      
      
      //console.log('GA Event: Premium Subscription ' +subscriberLeg + ', '+gaaction+' hour, ' + hour);
      //replace history to add query param and also localstorage if available
      localStorage.setItem('cmgtypl', true);
      var cmgtypl_dt = new Date();
      cmgtypl_dt = cmgtypl_dt.getTime();
      var cmgtypl_search = "cmgtypl="+cmgtypl_dt;
      if(location.search && !cmgTp.test(location.search)) {
        cmgtypl_search = location.search + '&'+cmgtypl_search;
      } else if(location.search ) {
        cmgtypl_search = location.search;
      }
      history.replaceState("Thank you", "Thank you", location.pathname + cmgtypl_search);
    }
  } else if(signupPages.test(location.pathname) && testCMGStorage() && localStorage.getItem('cmgtypl') !== null) {
    localStorage.removeItem('cmgtypl');
  } else if(typeof freeTrialUser !== 'undefined' && freeTrialUser && signupPages.test(location.pathname) && typeof subscriberLeg !== 'undefined' && subscriberLeg !== 'Default Leg' && jQuery('.messages--error.messages.error').length) {
    //signup page with error
    var error_msg = jQuery('.messages--error.messages.error').text();
    error_msg = error_msg.replace(/Error message/gm,"");
    error_msg = error_msg.replace(/(\r\n|\n|\r)/gm,"");
    trackEventNonInteractive('Premium Subscription ' +subscriberLeg, 'Subscription error', error_msg);
    //console.log('GA Event: Premium Subscription ' +subscriberLeg + ', Subscription error, ' + error_msg);
  }
}

function testCMGStorage() {
  var cmgls = 'cmgls';
  try {
      localStorage.setItem(cmgls, true);
      localStorage.removeItem(cmgls);
      return true;
  } catch(e) {
      return false;
  }
}

function checkIfInExperience(){
 var cmatgame_subscriber = getCookie('cmg_sx');
  var validSubscriber = false;
  if(typeof cmatgame_subscriber !== 'undefined' && cmatgame_subscriber !== null) {
   validSubscriber = true;
   jQuery('.subscribed-users .global-wrapper .global-content-wrapper .main-header .header-banner-block .pane-bean-cmg-logo').css({'position':'relative','left':'0px'});
  }
  if(!validSubscriber && !schoolHours && targetStateUser && getCookie('cmg_active_anonymous_user') === null && getCookie('cmg_editor') === null) {
    return true;
  }
  return false;
};

function setCookie(key, value, exptime) {
    //document.cookie = key + '=' + value + ';';
    var d = new Date();
    d.setTime(d.getTime() + exptime);
    var expires = "expires="+d.toUTCString();
    document.cookie = key + "=" + value + "; " + expires +"; path=/; domain=."+window.location.host;
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function checkActiveUser() {
  //We do not have new subscriber info. Check for older info.
  status = 0;
  jQuery('body').removeClass('logged-in').addClass('not-logged-in');
  
  //Not an active subscriber. Check if the user is logged in.
  cmgArr = unescape(getCookie('cmg_ux')).split("|");//365
  cmg_l = getCookie('cmg_l');
  cmgUx = 0;
  cmgLx = 1;
  if(typeof cmgArr !== 'undefined' && cmgArr.length == 2 && cmgArr[0] !== 'undefined' && cmgArr[0] !== '' && cmgArr[0] !== null && cmgArr[1]) {
    cmgUx = 1;
  }
  
  if(typeof cmg_l !== 'undefined' && cmg_l !== '' && cmg_l !== null) {
    cmgLx  = 0;
  }
  if(cmgUx && cmgLx) {
    status = getcmguserstatus(cmgArr[0], cmg_l);
  } else {
    //console.log("logged in user display ads");
    status = 0;
  }
  return status;
}

function getcmguserstatus(cmg_ux, cmg_l) {
  url = "/ajax/subscriber/status/"+cmg_ux +'/'+cmg_ux+ '?'+new Date().getTime();
  if(typeof cmg_l !== 'undefined' && cmg_l !== '' && cmg_l !== null) {
    url = "/ajax/subscriber/status/"+cmg_ux+'/'+cmg_l + '?'+new Date().getTime();
  }
  status = 0;
  
  jQuery.getJSON(url, function(data) {
    cmg_sx = getCookie('cmg_sx');
    if(typeof data.sx !== undefined && data.sx === cmg_ux && typeof data.st !== undefined && data.st && typeof cmg_sx !== undefined && cmg_sx !== "" && cmg_sx !== null) {
      status = 1;
      jQuery('body').removeClass('not-logged-in');
      jQuery('body').addClass('subscribed-users');
      jQuery('body').addClass('logged-in');
      jQuery(".ad-wrapper").each(function() {
          var self = jQuery(this);
          self.replaceWith("");
      });
      if(jQuery(".field-game").length) {
          removeAdSwfJWPLayer();
          jQuery("#subscriber-banner").replaceWith('<div id="subscriber-banner" class="adobe-analytics-sub-unlock"><a onclick="unlockAllLevels();" class="unlock-link">click-to-unlock</a></div>');
      }
      remove_anon_user_blocks();
    }
    cmg_ll = getCookie('cmg_l');
    if(typeof cmg_ll !== undefined && cmg_ll !== '' && cmg_ll !== null) {
      Drupal.behaviors.cmatgame_subscriber_behavior.user_loginbar_update();
    }
  });
  return status;
}
//Revalidate the user session only if valid subscriber
function cmguser_session_revalidate() {
  if(getCookie('cmg_sx') === null || window.location.pathname === '/myaccount' || window.location.pathname === '/cmatgame/login') {
    return;
  }
  var cmgvs = '';
  var cmgsx = '';
  var cmgl = '';
  var cmgux = '';
  if(getCookie('cmg_sx') !== null) {
    cmgsx = getCookie('cmg_sx');
  }
  if(getCookie('cmg_ux') !== null) {
    cmgux = getCookie('cmg_ux');
  }
  if(getCookie('cmg_vs') !== null) {
    cmgvs = getCookie('cmg_vs');
  }
  //valid subscriber and no session
  if(cmgsx !== '' && cmgux !== '' && cmgvs === '') {
    //console.log("Validating session for "+cmgux);
    if(getCookie('cmg_l') !== null) {
      cmgl = getCookie('cmg_l');
    }
    url = "/ajax/sub_check/session/"+cmgux +'/'+cmgux+ '?'+new Date().getTime();
    if(cmgl !== '') {
      url = "/ajax/sub_check/session/"+cmgux+'/'+cmgl + '?'+new Date().getTime();
    }
    jQuery.getJSON(url, function(data) {
      cmgvs1 = getCookie('cmg_vs');
      if(typeof data.vs !== undefined && data.vs === true && typeof data.st !== undefined && data.st === true && typeof cmgvs1 !== undefined && cmgvs1 !== "" && cmgvs1 !== null && typeof data.sx !== 'undefined' && data.sx === cmgvs1) {
        status = 1;
        //console.log("CMG subscriber has valid session");
      } else {
        //console.log("CMG subscriber does not have a valid session or was logged out from another session");
        //Reload the page after 5 seconds user to login page
        var dest = '';
        if(window.location.pathname !== 'undefined' && window.location.pathname !== '' && (window.location.pathname === '/' || window.location.pathname === '/myaccount')) {
          dest = '?destination=frontpage&smooab=true';
        } else if(window.location.pathname !== 'undefined' && window.location.pathname !== '' && window.location.pathname !== '/') {
          dest = '?destination='+window.location.pathname+'&smooab=true';
        }
        if(data.msg !== 'undefined' && data.msg !== '') {
          //var msgHtml = '<div class="messages--status messages error"><h2 class="element-invisible">Status message</h2>'+data.msg+'</div>';
          //jQuery('.panel-pane.pane-pane-messages .pane-content').html(msgHtml);
        }
        //setTimeout(function(){
        setCookie('cmg_exp', 'true', '1800000');
          if(window.location.host === 'cmatgame.local') {
            window.location.href = 'http://' +window.location.host + '/user/login'+dest;
          } else {
            //console.log("calling http://" +window.location.host + "/session/logout"+dest);
            window.location.href = 'http://' +window.location.host + '/session/logout'+dest;
          }
        //}, 1000);
      }
    });
  } else if(cmgsx !== '' && cmgux !== '' && cmgvs !== '')  {
    //console.log("We have a valid session.No revalidation done at this time for "+cmgux);
  } else if(cmgsx === '' && cmgux === '' && cmgvs === '') {
    //console.log("User not logged in. No session validation is needed");
  }
}

/* Get current PST date and add to title of related daily games block in node page */
function dailygames_psd_date() {
  if(jQuery('.node-type-game .global-wrapper .global-content-wrapper .content-column-wrapper .main-column .pane-page-content .pane-content .pane-game-details-pane-daily-games').length || jQuery('.section-1-daily-games .global-content-wrapper .content-column-wrapper .main-column .inside .panel-pane h1.pane-title').length) {
	var offset = 420; 
    var offsetMillis = offset * 60 * 1000;
    var today = new Date();
    var millis = today.getTime();
    var timeZoneOffset = (today.getTimezoneOffset() * 60 * 1000);
    var pst = millis - offsetMillis; 
    var currentDate = new Date(pst);
	var dayarray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var montharray = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
	var displaydate = dayarray[currentDate.getDay()] + ", " + montharray[currentDate.getMonth()] + " " + ordinal_suffix_of(currentDate.getDate());
    jQuery('.node-type-game .global-wrapper .global-content-wrapper .content-column-wrapper .main-column .pane-page-content .pane-content .pane-game-details-pane-daily-games .pane-title').html("<div class='daily-games-text'>Daily Games</div> <span class='dailygamesdate'>" + displaydate +"</span>");
    jQuery('.section-1-daily-games .global-content-wrapper .content-column-wrapper .main-column .inside .panel-pane h1.pane-title').html("<div class='daily-games-text'>Daily Games</div><span class='dailygamesdate'>" + displaydate +"</span>");
  }
  jQuery('.daily-games-text').html('<img src="/sites/cmatgame/files/bird.png" alt="daily games" class="daily-games-header" />');
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "<sup>st</sup>";
    }
    if (j == 2 && k != 12) {
        return i + "<sup>nd</sup>";
    }
    if (j == 3 && k != 13) {
        return i + "<sup>rd</sup>";
    }
    return i + "<sup>th</sup>";
}

//Store jigsaw puzzle puzzle level user selected in local storage
function store_jigsaw_puzzle_level() {
  var jiqsawnodepage = /online-jigsaw-puzzles/;
  var segment_str = window.location.pathname; 
  if(jiqsawnodepage.test(segment_str)) {
    var segment_array = segment_str.split( '/' );
    var last_segment = segment_array[segment_array.length - 1];
    localStorage.setItem('puzzlelevel', last_segment);
 }
  var puzzlelevel = localStorage.getItem("puzzlelevel");
  var jiqsawlandingpage = /0-jigsaw-puzzles/;
  if(puzzlelevel != null && jiqsawlandingpage.test(segment_str)) {
  jQuery(".page-0-jigsaw-puzzles .view-today-s-puzzles .playlists-queue-wrapper div").each(function() {
    if(jQuery(this).hasClass('playlist-category-node')) {
	   var oldurl = jQuery(this).find('a').attr('href'); 
	   var newUrl = oldurl.replace("/easy", "/" + puzzlelevel);
       newUrl = newUrl.replace("/medium", "/" + puzzlelevel);
       newUrl = newUrl.replace("/hard", "/" + puzzlelevel);	   
	   jQuery(this).find('a').attr("href", newUrl);
	   var oldurl_2 = jQuery(this).find('div span.playlist-category-title a').attr('href'); 
	   var newUrl_2 = oldurl_2.replace("/easy", "/" + puzzlelevel);
       newUrl_2 = newUrl_2.replace("/medium", "/" + puzzlelevel);
       newUrl_2 = newUrl_2.replace("/hard", "/" + puzzlelevel);	   
	   jQuery(this).find('div span.playlist-category-title a').attr("href", newUrl_2);
	}  
  }); 
  }
  var jiqsawcategorypage = /puzzle-category|jigsaw-puzzles/;
  if(puzzlelevel != null && jiqsawcategorypage.test(segment_str)) {
  jQuery(".page-taxonomy .view-puzzle-category .playlists-queue-wrapper div").each(function() {
    if(jQuery(this).hasClass('playlist-category-node')) {
	   var oldurl = jQuery(this).find('a').attr('href'); 
	   var newUrl = oldurl.replace("/easy", "/" + puzzlelevel);
       newUrl = newUrl.replace("/medium", "/" + puzzlelevel);
       newUrl = newUrl.replace("/hard", "/" + puzzlelevel);	   
	   jQuery(this).find('a').attr("href", newUrl);
	   var oldurl_2 = jQuery(this).find('h3 span a').attr('href'); 
	   var newUrl_2 = oldurl_2.replace("/easy", "/" + puzzlelevel);
       newUrl_2 = newUrl_2.replace("/medium", "/" + puzzlelevel);
       newUrl_2 = newUrl_2.replace("/hard", "/" + puzzlelevel);	   
	   jQuery(this).find('h3 span a').attr("href", newUrl_2);
	}  
  }); 
  }
}
;
