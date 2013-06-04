(function () {
/* AA put all code in a closure so it won't be visible to other code on the page & to prevent global variables being declared */

// -------------------------------------------------------------------------------
// <copyright file="cookiepolicy.js" company="RBI">
// Copyright (c) 2012 All Right Reserved Reed Business Information
//
// THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
// KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
// </copyright>
// <author>Reed Business Information</author>
// <date>2012-07-06</date>
// <version>3.0.1</version>
// <summary>Contains a basic implementation of RBI cookie policy</summary>
// <issueNotes>a potential problem on clicking close button resolved; 
//      When using on a secure page ensure it is included using https:// and defer e.g.:
//          <script type="text/javascript" defer="defer" src="/Scripts/rbicookiepolicy.js"/>
//      In IE9 the cookie can be removed by visiting the temporary internet files</issueNotes>
// -------------------------------------------------------------------------------

var rbiCookiePolicy = {};



/* ------------------------------------------------------------------------
Required variables
------------------------------------------------------------------------*/

//settings: please change these
rbiCookiePolicy.defaults = {};

rbiCookiePolicy.defaults.websiteName = 'New Scientist';

rbiCookiePolicy.defaults.websitepolicy_link = "http://www.newscientist.com/info/in9?full=true#cookies";

rbiCookiePolicy.defaults.stylesheet_path = "/css/rbiCookiePolicy_style.css";

rbiCookiePolicy.defaults.cookieName = "rbi_cookies_accepted";

rbiCookiePolicy.defaults.cookiePolicyVersion = "v1";

rbiCookiePolicy.defaults.cookieAge = 18250; //default expiry of 18250 days

rbiCookiePolicy.defaults.useInlineStyling = false;

// These will only take effect where inline styling is turned on - otherwise they should be supplied in a css file
rbiCookiePolicy.defaults.styling = {}; 
rbiCookiePolicy.defaults.styling.textColour = 'white';
rbiCookiePolicy.defaults.styling.backgroundColour = '#0177A7';
rbiCookiePolicy.defaults.styling.pushDownHeight = '75px';
rbiCookiePolicy.defaults.styling.closeButtonImage = '/img/icon/rbicookie_popup_close_btn.jpg';
//end of styling settings


//You shouldn't need to change these:
rbiCookiePolicy.pushDownText = "<p {0}>Our website uses cookies, which are small text files that are widely used in order to make websites work more effectively. To continue using our website and consent to the use of cookies, click away from this box or click 'Close'</p>";

/*templates: don't expect too much from the formatting function*/
rbiCookiePolicy.websiteTextTemplate = '<h2 {1}>Cookies on the {0} website</h2>';

rbiCookiePolicy.htmlTemplate = '<div id="rbiCookiePolicy_pushDownBoxWrapper" {7}><div id="rbiCookiePolicy_pushDownBox" {0}> <div id="rbiCookiePolicy_siteTitle" {1}>{2}</div><div id="rbiCookiePolicy_mainInformation" {3}><a onclick="return closeClick();" href="#" id="rbiCookiePolicy_closeBtn" {4}>close </a>{5}<a target="_blank" href="{6}" class="popupReadmoreLink" {8}>Find out about our cookies and how to change them</a></div></div></div>';

rbiCookiePolicy.pushDownObject;

    
/* ------------------------------------------------------------------------
First point load function.
Is triggered when document loads.
------------------------------------------------------------------------*/
function rbiCookiePolicy_load() {
    
    if (!cookieExists()) {
        if (!rbiCookiePolicy.defaults.useInlineStyling){
            addStylesheet();
        }
    
        showPushDown();
        addClickEvents();
    }
}
/* ------------------------------------------------------------------------
Adds css file to the head of document.
------------------------------------------------------------------------*/
function addStylesheet() {
    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = rbiCookiePolicy.defaults.stylesheet_path;
    cssNode.media = 'screen';
    headID.appendChild(cssNode);
}

/* ------------------------------------------------------------------------
Very simple string formatter modified from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/
------------------------------------------------------------------------*/
function stringFormat() {
  var args = arguments;
  return args[0].replace(/{(\d+)}/g, function(match, number) { 
    var argsPosition = 1 + Number(number);
    return typeof args[argsPosition] != 'undefined'
      ? args[argsPosition]
      : match
    ;
  });
};

/* ------------------------------------------------------------------------
Displays the rbi cookie pushDown box.
------------------------------------------------------------------------*/
function showPushDown() {
    var mainStyle = '';
    var titleStyle = '';
    var mainInformationStyle = '';
    var closeLinkStyle = '';
    var informationLinkTarget = rbiCookiePolicy.defaults.websitepolicy_link;
    var wrapperStyle = '';
    var titleTextStyle = '';
    var moreInfoStyle = '';
    var pushdownTextStyle = '';
    

    if (rbiCookiePolicy.defaults.useInlineStyling) {
        mainStyle = stringFormat('style="margin:auto; width: 960px; height: 100%;background-color: {0};color: {0};font-family: Arial, sans-serif, serif;"', rbiCookiePolicy.defaults.styling.textColour);
        titleStyle = stringFormat('style="float:left;background-color: {0};height: 100%;width: 150px; margin:0"', rbiCookiePolicy.defaults.styling.backgroundColour);
        mainInformationStyle = stringFormat('style="float:left; background-color: {0};width: 809px;height: 100%; margin:0 0 0 1px; font-size: 12px;"', rbiCookiePolicy.defaults.styling.backgroundColour);
        closeLinkStyle = stringFormat('style="float: right;margin: 10px;color: {0} !important;text-decoration: none !important;background-image: url(\'{1}\');font-weight: bold;background-position: right 2px;background-repeat: no-repeat;padding-right:15px;"', rbiCookiePolicy.defaults.styling.textColour, rbiCookiePolicy.defaults.styling.closeButtonImage);
        wrapperStyle = stringFormat('style="width: 100%; background-color: {0}; height: {1}"', rbiCookiePolicy.defaults.styling.backgroundColour, rbiCookiePolicy.defaults.styling.pushDownHeight);
        titleTextStyle = stringFormat('style="font-size: 14px; margin: 10px; text-align: right;"');
        moreInfoStyle =  stringFormat('style="float:right;margin-right: 5px; color: {0} !important;font-weight: bold;"', rbiCookiePolicy.defaults.styling.textColour);
        pushdownTextStyle = 'style="margin:10px"';
    }
    
    var pushdownText = stringFormat(rbiCookiePolicy.pushDownText, pushdownTextStyle);
    var titleText = stringFormat(rbiCookiePolicy.websiteTextTemplate, rbiCookiePolicy.defaults.websiteName, titleTextStyle);
    
    var pushDownHTML = stringFormat(rbiCookiePolicy.htmlTemplate, mainStyle, titleStyle, titleText, mainInformationStyle, closeLinkStyle, pushdownText, informationLinkTarget, wrapperStyle, moreInfoStyle);
    
    if (!document.body) {
        document.write(pushDownHTML);
    }
    else {
       //where the body already exists, it is not safe to simply write to it, so we effectively insert HTML at the top of it.
       document.body.innerHTML = pushDownHTML + document.body.innerHTML;
    }
    
    rbiCookiePolicy_pushDownObject = document.getElementById('rbiCookiePolicy_pushDownBoxWrapper');
}

/* ------------------------------------------------------------------------
 Checks if the given element is visible.
------------------------------------------------------------------------*/
function rbiCookiePolicy_isVisible(obj) 
{
    if (obj == document)
        return true;
    
    if (!obj)
        return false;
    if (!obj.parentNode)
        return false;
    if (obj.style) {
        if (obj.style.display == 'none')
            return false;
        if (obj.style.visibility == 'hidden')
            return false;
    }

    //Try the computed style in a standard way
    if (window.getComputedStyle) {
        var style = window.getComputedStyle(obj, "")
        if (style.display == 'none')
            return false;
        if (style.visibility == 'hidden')
            return false;
    }

    //Or get the computed style using IE's silly proprietary way
    var style = obj.currentStyle;
    if (style) {
        if (style['display'] == 'none')
            return false;
        if (style['visibility'] == 'hidden')
            return false;
    }
    
    return true;
}

/* ------------------------------------------------------------------------
 Checks if the outside of the pushDown has been clicked.
------------------------------------------------------------------------*/
function addClickEvents() {
    rbiCookiePolicy_pushDownObject.onclick = function(event) {
        var event = event || window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    }
    var clickEvent = function() {
        if (rbiCookiePolicy_isVisible(rbiCookiePolicy_pushDownObject)) {
            rbiCookiePolicy_pushDownObject.style.display = 'none';
            createCookie(rbiCookiePolicy.defaults.cookieName, rbiCookiePolicy.defaults.cookiePolicyVersion, rbiCookiePolicy.defaults.cookieAge);
        }
    };
    var closeClickEvent = function() {
        clickEvent();
        return false;
    };

    document.onclick = clickEvent;
    document.getElementById('rbiCookiePolicy_closeBtn').onclick = closeClickEvent

}

/* ------------------------------------------------------------------------
Checks if rbi acceptance cookie already exists and matches the latest 
version. Returns true if exists, false if it doesn't.
------------------------------------------------------------------------*/
function cookieExists() {
    
    var cookieValue = readCookie(rbiCookiePolicy.defaults.cookieName);
    
    if (!cookieValue)
        return false;
    
    if (cookieValue == rbiCookiePolicy.defaults.cookiePolicyVersion)
        return true;
    
    return false;
}

/* ------------------------------------------------------------------------
Creates a cookie with the given name, value and expiry days.
------------------------------------------------------------------------*/
function createCookie(name, value, days) {
    var expires = "";
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    
    document.cookie = name + "=" + value + expires + "; path=/";
}

/* ------------------------------------------------------------------------
Looks up and returns a cookie based on the given name.
------------------------------------------------------------------------*/
function readCookie(cName) {
    var i, x, y, arRcookies = document.cookie.split(";");
    for (i = 0; i < arRcookies.length; i++) {
        x = arRcookies[i].substr(0, arRcookies[i].indexOf("="));
        y = arRcookies[i].substr(arRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cName) {
            return unescape(y);
        }
    }
}


//TODO use document.body.insertBefore(p, document.body.firstChild);


// First execution point
rbiCookiePolicy_load();


})();

