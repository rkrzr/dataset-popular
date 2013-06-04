// Copyright 2004-2006 Google Inc.
// All Rights Reserved.

/**
 * @fileoverview A bunch of XML HTTP recipes used to do RPC from within
 * JavaScript from Gagan Saksena's wiki page
 * http://wiki.corp.google.com/twiki/bin/view/Main/JavaScriptRecipes
 */


/**
 * The active x identifier used for ie.
 * @type String
 * @private
 */
var XH_ieProgId_;


// Domain for XMLHttpRequest readyState
var XML_READY_STATE_UNINITIALIZED = 0;
var XML_READY_STATE_LOADING = 1;
var XML_READY_STATE_LOADED = 2;
var XML_READY_STATE_INTERACTIVE = 3;
var XML_READY_STATE_COMPLETED = 4;


/**
 * Initialize the private state used by other functions.
 * @private
 */
function XH_XmlHttpInit_() {
  // The following blog post describes what PROG IDs to use to create the
  // XMLHTTP object in Internet Explorer:
  // http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
  // However we do not (yet) fully trust that this will be OK for old versions
  // of IE on Win9x so we therefore keep the last 2.
  // Versions 4 and 5 have been removed because 3.0 is the preferred "fallback"
  // per the article above.
  // - Version 5 was built for Office applications and is not recommended for
  //   web applications.
  // - Version 4 has been superseded by 6 and is only intended for legacy apps.
  // - Version 3 has a wide install base and is serviced regularly with the OS.

  /**
   * Candidate Active X types.
   * @type Array.<String>
   * @private
   */
  var XH_ACTIVE_X_IDENTS = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0",
                            "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];

  if (typeof XMLHttpRequest == "undefined" &&
      typeof ActiveXObject != "undefined") {
    for (var i = 0; i < XH_ACTIVE_X_IDENTS.length; i++) {
      var candidate = XH_ACTIVE_X_IDENTS[i];

      try {
        new ActiveXObject(candidate);
        XH_ieProgId_ = candidate;
        break;
      } catch (e) {
        // do nothing; try next choice
      }
    }

    // couldn't find any matches
    if (!XH_ieProgId_) {
      throw Error("Could not create ActiveXObject. ActiveX might be disabled," +
                  " or MSXML might not be installed.");
    }
  }
}


XH_XmlHttpInit_();


/**
 * Create and return an xml http request object that can be passed to
 * {@link #XH_XmlHttpGET} or {@link #XH_XmlHttpPOST}.
 */
function XH_XmlHttpCreate() {
  if (XH_ieProgId_) {
    return new ActiveXObject(XH_ieProgId_);
  } else {
    return new XMLHttpRequest();
  }
}


/**
 * Send a get request.
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 * @param {string} url the service to contact
 * @param {Function} handler function called when the response is received.
 */
function XH_XmlHttpGET(xmlHttp, url, handler) {
  xmlHttp.open("GET", url, true);
  xmlHttp.onreadystatechange = handler;
  XH_XmlHttpSend(xmlHttp, null);
}

/**
 * Send a post request.
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 * @param {string} url the service to contact
 * @param {string} data the request content.
 * @param {Function} handler function called when the response is received.
 */
function XH_XmlHttpPOST(xmlHttp, url, data, handler) {
  xmlHttp.open("POST", url, true);
  xmlHttp.onreadystatechange = handler;
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.setRequestHeader("Content-Length",
      /** @type {string} */ (data.length));
  XH_XmlHttpSend(xmlHttp, data);
}

/**
 * Opens a XMLHttpRequest object and sets the onreadystatechange handler
 *
 * @deprecated You might as well do this directly in your code.
 *
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 * @param {string} verb The HTTP verb to use.
 * @param {string} url the service to contact
 * @param {Function} handler function called when the response is received.
 */
function XH_XmlHttpOpen(xmlHttp, verb, url, handler) {
  xmlHttp.open(verb, url, true);
  xmlHttp.onreadystatechange = handler;
}


/**
 * Calls 'setRequestHeader' on the XMLHttpRequest object
 *
 * @deprecated This does not do anything.
 *
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 * @param {string} name The name of the HTTP header.
 * @param {string} value The value of the HTTP header.
 */
function XH_XmlHttpSetRequestHeader(xmlHttp, name, value) {
  xmlHttp.setRequestHeader(name, value);
}


/**
 * Calls 'send' on the XMLHttpRequest object and calls a function called 'log'
 * if any error occured.
 *
 * @deprecated This dependes on a function called 'log'. You are better of
 * handling your errors on application level.
 *
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 * @param {String|Null} data the request content.
 */
function XH_XmlHttpSend(xmlHttp, data) {
  try {
    xmlHttp.send(data);
  } catch (e) {
    // You may want to log/debug this error one that you should be aware of is
    // e.number == -2146697208, which occurs when the 'Languages...' setting in
    // IE is empty.
    // This is not entirely true. The same error code is used when the user is
    // off line.
    log('XMLHttpSend failed ' + e.toString() + '<br>' + e.stack);
    throw e;
  }
}


/**
 * Calls 'abort' on the XMLHttpRequest object and calls a function called 'log'
 * if any error occured.
 *
 * @deprecated This depends on a function called 'SafeTimeout'. You should call
 *     'abort' directly on your XMLHttpRequest object instead.
 *
 * @param {XMLHttpRequest} xmlHttp as from {@link XH_XmlHttpCreate}.
 */
function XH_XmlHttpAbort(xmlHttp) {
  // IE crashes if you NULL out the onreadystatechange synchronously
  SafeTimeout(window, function() {
    xmlHttp.onreadystatechange = function() {};
  }, 0);
  if (xmlHttp.readyState < XML_READY_STATE_COMPLETED) {
    xmlHttp.abort();
  }
}
function getHTTPRequest() {
	var xmlhttp = false;
	try {
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e) {
	try {
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	} catch (E) {
		xmlhttp = false; 
	}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}	

