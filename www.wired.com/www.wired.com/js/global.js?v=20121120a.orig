
/* Mobify *********************************************************************/
    /* Disabled in favor of Mobify JS
    var _mm = "http://m.wired.com/";
    (function() {
        if ( document.domain.indexOf("howto.wired.com") >= 0 ) {
            return;
        }
        if ( document.domain.indexOf("wired.com") >= 0 ) {
            var m = document.createElement('script');
                m.type = 'text/javascript';
                m.async = true;
                m.src = 'http' + (document.location.protocol[4] == 's' ? 's' : '') + '://m.wired.com/mobify/redirect.js';
            var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(m, s);
        }
    })();
    */

jQuery(function(){

/* Top Nav ********************************************************************/

    // Mouseovers
    jQuery('#pnav_list a.primaryLink').bind('mouseover', function() {
        jQuery(this).addClass('over');
    }).bind('mouseout', function() {
        jQuery(this).removeClass('over');
    });

    // Dropdowns for the top nav
    jQuery('#pnav_list a.primaryLink').bind('mouseenter', function() {
        // hide all the menus that may be showing already
        jQuery('.dropdownMenu').hide();
        jQuery(this).parentsUntil('#pnav_list').find('.dropdownMenu').show();
        jQuery(this).addClass('over');
    });

    // Actions on leaving the dropdown
    jQuery('#pnav_list li .dropdownMenu').bind('mouseleave', function() {
        jQuery(this).delay(500).fadeOut(200);
        jQuery(this).parentsUntil('#pnav_list').find('a.primaryLink').removeClass('over');
    });

/* Footer ********************************************************************/

    // Select links
    jQuery('#footer_dropdowns_subscribe, #footer_dropdowns_sites, #footer_dropdowns_international').bind('change', function() {
        window.open(jQuery(this).val());
    });

/* Sign In/Sign Out ***********************************************************/

    // Check if the user is logged in
    var username_string = CN.cookie.get('amg_user_info');
    if (username_string !== '') {
        jQuery('#gh_greeting').html('<span class="gh_username">Hi, <a href="/user/profile_update">' + username_string + '</a>&nbsp;|&nbsp;</span><a href="/user/logout">Sign Out</a>&nbsp;|');
    } else {
        jQuery('#gh_greeting').html('<a href="/user/login">Sign In</a>&nbsp;|');
    }

});

/*  OLDER CODE.  Sort and strip out what is unused */

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}

/*
 * (c)2006 Jesse Skinner/Dean Edwards/Matthias Miller/John Resig
 * Special thanks to Dan Webb's domready.js Prototype extension
 * and Simon Willison's addLoadEvent
 *
 * For more info, see:
 * http://www.thefutureoftheweb.com/blog/adddomloadevent
 */

addDOMLoadEvent = (function(){
    // create event function stack
    var load_events = [],
        load_timer,
        script,
        done,
        exec,
        old_onload,
        init = function () {
            done = true;

            // kill the timer
            clearInterval(load_timer);

            // execute each function in the stack in the order they were added
            while (exec = load_events.shift())
                exec();

            if (script) script.onreadystatechange = '';
        };

    return function (func) {
        // if the init function was already ran, just run this function now and stop
        if (done) return func();

        if (!load_events[0]) {
            // for Mozilla/Opera9
            if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", init, false);

            // for Internet Explorer
            /*@cc_on @*/
            /*@if (@_win32)
                document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
                script = document.getElementById("__ie_onload");
                script.onreadystatechange = function() {
                    if (this.readyState == "complete")
                        init(); // call the onload handler
                };
            /*@end @*/

            // for Safari
            if (/WebKit/i.test(navigator.userAgent)) { // sniff
                load_timer = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState))
                        init(); // call the onload handler
                }, 10);
            }

            // for other browsers set the window.onload, but also execute the old window.onload
            old_onload = window.onload;
            window.onload = function() {
                init();
                if (old_onload) old_onload();
            };
        }

        load_events.push(func);
    }
})();

/*Utility Functions*/
var cnp = window.cnp || {};
cnp.util = {};
cnp.util.getElements = function(classname, tagname, root){
	var all, elements, element;
	if(!root){
		root = document;
	}
	else if(typeof root == "string"){
		root = document.getElementById(root);
	}
	if(!tagname){
		tagname = "*";
	}
	all = root.getElementsByTagName(tagname);
	if(!classname){
		return all;
	}
	elements = [];
	for(var i = 0; i < all.length; i++){
		element = all[i];
		if(cnp.util.isMember(element,classname)){
			elements.push(element)
		}
	}
	return elements;
};
cnp.util.isMember = function(element, classname){
	var classes, whitespace, c;
	classes = element.className;
	if(!classes){
		return false;
	}
	if(classes == classname){
		return true;
	}
	whitespace = /\s+/;
	if (!whitespace.test(classes)){
		return false;
	}
	c = classes.split(whitespace);
	for(var i = 0; i < c.length; i++){
		if (c[i] == classname){
			return true;
		}
	}
	return false;
};
cnp.util.makeElement = function(args){
	var element;
	var tagName = args.tagName;
	var attributes = args.attributes;
	var children = args.children;
	element = document.createElement(tagName);
	if(attributes){
		for(var prop in attributes){
			if(attributes.hasOwnProperty(prop)){
				element[prop] = attributes[prop];
			}
		}
	}
	if(children){
		for(var i=0; i<children.length; i++){
			element.appendChild( children[i]);
		}
	}
	return element;
};
cnp.util.isDescendant= function(ancestor, descendant){
	if(!ancestor || !descendant) return;
	try{
		var similarDescendants = ancestor.getElementsByTagName(descendant.nodeName);
		for(var i=0; i<similarDescendants.length; i++)
			if( similarDescendants[i] == descendant ) return true;
	}catch(e){
		//console.dir(e);
	}
	return false;
};
cnp.util.getAncestors = function(element){
	var parents = new Array( );
	while( element.parentNode ){
		if( element.parentNode.nodeType == 1 )
			parents.push(element.parentNode);
			element = element.parentNode;
	}
	return parents;
};
cnp.util.getOffsetParents = function(element){
	var offsetParents = new Array( );
	while( element.offsetParent ){
		if( element.offsetParent.nodeType == 1 )
			offsetParents.push(element.offsetParent);
			element = element.offsetParent;
	}
	return offsetParents;
};
cnp.SelectNavigator = function(element){
    this.element = element;
    this.element.onchange = function(){
        var destination = this.options[this.selectedIndex].value;
        if(destination.match(/http.*/)){
            window.open(destination);
        }
    }
};
/* end utilities*/

/* begin common cookie functions.  see http://techweb/javascript_commons/docs/cookies.html for documentation. */
/* Set cookie value */
function setCookie(name, value, escapeValue, expires, path, domain, secure) {

    var cookieToken = name + '=' + ((escapeValue) ?  escape(value) : value) + ((expires) ? '; expires=' + expires.toGMTString() : '') + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + ((secure) ? '; secure' : '');
    document.cookie = cookieToken;

}

/* Get cookie value */
function getCookie(name) {
    var allCookies = document.cookie;

    var cookieName = name + "=";
    var start = allCookies.indexOf("; " + cookieName);

    if (start == -1) {
        start = allCookies.indexOf(cookieName);
        if (start != 0) return null;
    }
    else start += 2;

    var end = document.cookie.indexOf(";", start);
    if (end == -1) end = allCookies.length;

    return unescape(allCookies.substring(start + cookieName.length, end));
}

/* Delete a cookie */
function deleteCookie(name, path, domain) {
    var value = getCookie(name);
    if (value != null) document.cookie = name + '=' + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
    return value;
}

/* end common cookie functions. */

function showSponsorTxt() {
    var sponsorEl = "";
    var popularEl = "";
    var multimediaEl = "";
    var adImg = "";
    var popularAdImg = "";
    var multimediaAdImg = "";

    if ( document.getElementById("sponsor") != null ) {
        sponsorEl = document.getElementById("sponsor");
        adImg = sponsorEl.getElementsByTagName('img');

        if ( adImg.length != 0 ) {
            for (var i=0; i < adImg.length; i++) {
                if (adImg[i].width > 1 && document.getElementById("byTxt") != null )
                    document.getElementById("byTxt").style.display = "block";
            }
        }
    }

    if ( document.getElementById("popular_sponsor") != null ) {
        popularEl = document.getElementById("popular_sponsor");
        popularAdImg = popularEl.getElementsByTagName('img');

        if ( popularAdImg.length != 0 ) {
            for (var i=0; i < popularAdImg.length; i++) {
                if (popularAdImg[i].width > 1 && document.getElementById("popular_byTxt") != null )
                    document.getElementById("popular_byTxt").style.display = "block";
            }
        }
    }

    if ( document.getElementById("sponsorMM") != null ) {
        multimediaEl = document.getElementById("sponsorMM");
        multimediaAdImg = multimediaEl.getElementsByTagName('img');

        if ( multimediaAdImg.length != 0 ) {
            for (var i=0; i < multimediaAdImg.length; i++) {
                if (multimediaAdImg[i].width > 1 && document.getElementById("byTxtMM") != null )
                    document.getElementById("byTxtMM").style.display = "block";
            }
        }
    }
}
addLoadEvent(showSponsorTxt);

// function to get login status
function loginStatus() {
    var cookies = document.cookie;
    var loginLink = document.getElementById("login_link");
    var logoutLink = document.getElementById("logout_link");

    // see if wired_reddit cookie exists
    var redditCookie = cookies.indexOf("wired_reddit=");

    if(!loginLink && !logoutLink) return false;
    if(redditCookie != -1) {
        loginLink.style.display = "none";
        logoutLink.style.display = "inline";
    } else {
        loginLink.style.display = "inline";
        logoutLink.style.display = "none";
    }
}
addLoadEvent(loginStatus);

// support for loading RSS Feeds

function chopItems(contentString){
	var titleLinkMap = new Array();
	try{
		var regex  =  new RegExp("<item(?:\s|.)*?>(?:\s|.)*?<\/item>","g");
		var regexTitle  =  new RegExp("<title(?:\s|.)*?>((?:\s|.)*?)<\/title>","g");
		var regexLink  =  new RegExp("<link(?:\s|.)*?>((?:\s|.)*?)<\/link>","g");
		var matches = contentString.match(regex);
		var upperLimit = matches.length > 5 ? 5 : matches.length;
		for(var i=0;i<upperLimit;i++){
			var itemString = matches[i];
			itemString.match(regexTitle);
			var titleString = RegExp.$1;
			itemString.match(regexLink)[0];
			var linkString = RegExp.$1;
			var obj = {title:titleString,link:linkString};
			titleLinkMap.push(obj);
		}
	}catch(e){
		alert(e);
	}
	return titleLinkMap;
}


function populateFeeds(urlValue,containerId){
	var date = new Date();
	var params = "urlVal="+urlValue+"&ts="+date.getTime();
	new Ajax.Request('/nolayout/rssproxy', {
		method: 'get',
		crossSite:true,
		parameters:params,
		onSuccess: function(transport) {
			var responseXML = transport.responseText;
			var itemLinkArray = chopItems(responseXML);


			var containerTd = document.getElementById(containerId);
			var wrapperDiv = document.createElement("div");
			wrapperDiv.className = "rss-box";

			var ulNode = document.createElement("UL");
			ulNode.className = "rss-items";

			wrapperDiv.appendChild(ulNode);
			containerTd.appendChild(wrapperDiv);

			var len = itemLinkArray.length;

			for(var i=0;i < len;i++){
				var myItem = itemLinkArray[i];
				var liNode = createLinkNode(myItem.title,myItem.link);
				ulNode.appendChild(liNode);
			}

		},

	onFailure: function(transport) {
		//alert('f');
	 }

	});

}

function createLinkNode(title,link){
	var liNode = document.createElement("LI");
	liNode.className = "rss-item";

	var hrefNode = document.createElement("A");
	hrefNode.target = "_self";
	hrefNode.title = title;
	hrefNode.href = link;
	hrefNode.appendChild(document.createTextNode(title));
	hrefNode.className = "rss-item";

	liNode.appendChild(hrefNode);

	return liNode;
}


function getXMLDom(stringValue){
	var doc = null;
	if (window.ActiveXObject)
	{
		doc=new ActiveXObject("Microsoft.XMLDOM");
		doc.async="false";
		doc.loadXML(stringValue);
	}
	else
	{
		var parser=new DOMParser();
		doc=parser.parseFromString(stringValue,"text/xml");
	}
	return doc;
}


/* Parses URL Pathname
        Author: Jamie L. Marin, Senior Web Developer
        Date: June !5, 2005
*/

/* Sets varibles for URI pathname and pathname length */
var browserURI = location.pathname;
var uriLength = browserURI.length;

/* Creates Array */
var directories = new Array( );

/* Find out indexes of first, next, and last slashes */
var startSlash = browserURI.indexOf('/');
var nextSlash =  browserURI.indexOf('/', startSlash + 1);
var lastSlash = browserURI.lastIndexOf('/');
var slashCount = 0;

/* test for one deep section */
if (startSlash == lastSlash)
{
        directories[slashCount] = location.pathname.slice(startSlash + 1);
}


/* Loop to define sections from 1 to N */
while (startSlash != lastSlash || nextSlash != -1)
{
        directories[slashCount] = location.pathname.substring(startSlash + 1,nextSlash);

        if (lastSlash + 1 != uriLength)
                directories[slashCount +1] = browserURI.slice(nextSlash + 1);

        startSlash = nextSlash;
        nextSlash =  browserURI.indexOf('/', startSlash + 1);
        slashCount++;
}

var paths = new Array( );

function parsePath(path) {
    var pathLength = path.length;

    var sSlash = path.indexOf('/');
    var nSlash =  path.indexOf('/', sSlash + 1);
    var lSlash = path.lastIndexOf('/');
    var sCount = 0;

    if (sSlash == lSlash)
    {
        paths[sCount] = path.slice(sSlash + 1);
    }

    /* Loop to define sections from 1 to N */
    while (sSlash != lSlash || nSlash != -1)
    {
        paths[sCount] = path.substring(sSlash + 1,nSlash);

        if (lSlash + 1 != pathLength)
                paths[sCount +1] = path.slice(nSlash + 1);

        sSlash = nSlash;
        nSlash =  path.indexOf('/', sSlash + 1);
        sCount++;
    }

}

/* Set User Friendly Variables */
var firstDir = directories[0];
var lastDir = directories[directories.length-1];

/* set Omni-friendly path */
var omniHierarchy = "";
for (var i=0; i<directories.length; i++) {
    omniHierarchy += directories[i];
    if (i != directories.length - 1)
        omniHierarchy += ",";
}

var setPageType = "";
var setProp1 = "";
var setProp2 = "";
var setProp3 = "";
var setProp5 = "";
var setProp6 = "";
var setProp7 = "";
var setProp8 = "";
var setProp9 = "";

var setEvents = "";

if (directories[0] == "") {
    setProp6 = "homepage";
    omniHierarchy = "homepage";
}
if (directories.length >= 1 && directories[0] != "")
    setProp6 = directories[0];
if (directories.length >= 2)
    setProp7 = setProp6 + '/' + directories[1];
if (directories.length >= 3)
    setProp8 = setProp7 + '/' + directories[2];
if (directories.length >= 4)
    setProp9 = setProp8 + '/' + directories[3];

function setProps() {
    setProp6 = "";
    setProp7 = "";
    setProp8 = "";
    setProp9 = "";
    if (paths.length >= 1 && paths[0] != "")
    setProp6 = paths[0];
    if (paths.length >= 2)
        setProp7 = setProp6 + '/' + paths[1];
    if (paths.length >= 3)
        setProp8 = setProp7 + '/' + paths[2];
    if (paths.length >= 4)
        setProp9 = setProp8 + '/' + paths[3];
}

function trackData(evnt) {
    s.linkTrackVars="events";
    s.linkTrackEvents=evnt;
    s.events=evnt;
    s.tl(this,'o','AjaxCall');
}

/**** Microsoft Audience Extension ****/
function writeMicrosoftAudienceTag() {
    MSEXT_domain = document.location.host.split('.');
    MSEXT_domain = MSEXT_domain[(MSEXT_domain.length - 2)];
    MSEXT_path = document.location.pathname.split('/');
    MSEXT_request = document.location.protocol + "//view.atdmt.com/action/MSFT_CondeNet_AE_ExtData/v3/atc1." + MSEXT_domain;
    MSEXT_request += (MSEXT_path[1] != '') && (MSEXT_path[1] != undefined) ? "/atc2." + MSEXT_path[1] : '';
    MSEXT_request += (MSEXT_path[2] != '') && (MSEXT_path[2] != undefined) ? "/atc3." + MSEXT_path[2] : '';
    MSEXT_request += '/';
    var footerId = document.getElementById("footer");
    var newElem = document.createElement("img");
    newElem.src = MSEXT_request;
    newElem.height = "1";
    newElem.width = "1";
    if(footerId)
        footerId.appendChild(newElem);
}
addLoadEvent(writeMicrosoftAudienceTag);
/**************************************/

//check if no ad is being served and hide container div if so
function detectPushdownAd() {
    if (document.getElementById('pushdownAd'))
    {
		var pushdownAd = document.getElementById('pushdownAd');

		var pushdownAdHeight = pushdownAd.offsetHeight;

		if ( pushdownAdHeight <= 60)
			pushdownAd.style.display = "block";
    }
}

// remove the trailing slash and pagination (/all, or /2, for example)
// from the ends of blog permalink urls for the omniture s.pageName param
function scrubStatsBlogPermalinkPageName() {
    pathArray = window.location.pathname.split('/');

    var lastPathElement;
    do {
        lastPathElement = pathArray.pop();
    } while(!lastPathElement || lastPathElement.length == 0);

    paginationFilter = /^([0-9]+|all)$/
    if(!paginationFilter.test(lastPathElement)) {
        pathArray.push(lastPathElement);
    }

    s.pageName = window.location.protocol + '//' + window.location.hostname + pathArray.join('/');
}


/* Dart Site modifier class for iPad ua detection.
 * Appends the suffic '.ipad' to the dart site for ipad
 * specific targeting.
 * @see dartCall.js for usage
 */
var dartSiteModifier = (function(ua){
    var suff="",
        pat=/.*\.[\w\.]+\/.*/;

    //If browser is iPad based, add the iPad specific dart string.
    if (ua.indexOf('ipad')!==-1){
            suff ='.ipad';
    }

    return {
        setSite : function(dartCall){
            return dartCall.match(pat)[0].split('/').join(suff+'/');
        }
    }
 })(navigator.userAgent.toLowerCase());


/**** Temporarily change search combo boxes ****/
function removeChildNodes(ctrl) {
  while (ctrl.childNodes[0])
  {
    ctrl.removeChild(ctrl.childNodes[0]);
  }
  return;
}

/**************************************/

/**
 * get url parameter
 **/
function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( window.location.href );
      if( results == null )
      return "";
      else
      return results[1];
}