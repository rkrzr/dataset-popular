
var currentDomain = 'user.uefa.com';
if (window.location.hash == '#_=_') window.location.hash = '';
var LANGUAGE_PREFIX = "";
{
    if (location.host.substr(2, 1) == ".") LANGUAGE_PREFIX = location.host.substr(0, 3);
}

var REMOTE = location.protocol + "//" + LANGUAGE_PREFIX + currentDomain;

function doLogin(email, password, rememberMe, returnUrl) {
    easyXdmBootstrapper.afterEasyXdmIsLoaded(function () {
        easyXdmBootstrapper.afterXhrIsInitialized(function () {
    xhr.request({
        url: "/Account/LogOn?returnUrl=" + returnUrl,
        method: "POST",
        headers: {
            "Login-Type": "Ajax",
            "Remote-Origin": window.location.protocol + "//" + window.location.host //document.location.origin
        },
        data: { Email: email, Password: password, RememberMe: rememberMe },
        timeout: 30 * 1000
    }, success_login_handler,
        uefa_login_error
        );
        });
    });
};

function success_login_handler(xsuccess) {


    if (xsuccess.headers["Uefa-Cookie"] != null) {
        var uefaCookie = eval('(' + xsuccess.headers["Uefa-Cookie"] + ')');
        //jaaulde.utils.cookies.set(uefaCookie.cookieName, uefaCookie.cookieValue, { path: uefaCookie.cookieOptions.path, domain: uefaCookie.cookieOptions.domain, expiresAt: uefaCookie.cookieOptions.expires });
        Cookie.set(uefaCookie[0].cookieName, uefaCookie[0].cookieValue, uefaCookie[0].cookieOptions.expires, uefaCookie[0].cookieOptions.path, uefaCookie[0].cookieOptions.domain, false);
        Cookie.set(uefaCookie[1].cookieName, uefaCookie[1].cookieValue, uefaCookie[1].cookieOptions.expires, uefaCookie[1].cookieOptions.path, uefaCookie[1].cookieOptions.domain, false);

        xsuccess.returnUrl = uefaCookie[0].returnUrl;

        //SiteCatalyst code for pop-up login button
        var s = s_gi(s_account);
        s.linkTrackVars = 'events,eVar36';
        s.linkTrackEvents = 'event7';
        s.eVar36 = window.location.href;
        s.events = 'event7';
        s.tl(this, 'o', 'User login');

        uefa_login_success(xsuccess);
    }
    else if (xsuccess.headers["Uefa-Error"] != null) {
        var loginError = eval('(' + xsuccess.headers["Uefa-Error"] + ')');
        var err = new Object();
        err.data = loginError;

        if (err.data.errorCode == 6  // blocked account
        || err.data.errorCode == 5 // IncompleteRegisteredUser
        || err.data.errorCode == 3 // T&C Not Accepted) 
        || err.data.errorCode == 2 // Unverified Account
        || err.data.errorCode == 1) { // Inactive Accou
            window.location = updateinsertqsparam(err.data.data, 'returnUrl', getReturnUrl(window.location.href));
        } else if (err.data.errorCode == 4) {
            var retUrl = getReturnUrl(window.location.href);
            if (retUrl.toLowerCase().indexOf("/account/logon") != -1)
                window.location = REMOTE + '/account/logon?errorCode=4';
            else
                window.location = updateinsertqsparam(REMOTE + "/account/logon?errorCode=4", 'returnUrl', retUrl);
        }
        else {

            err.loginStatus = 1;
            err.message = err.data.errorMessage; //'Login validation failed.';

            uefa_login_error(err);
        }
    }
    else {
        var err = new Object();
        err.data = null;
        err.loginStatus = 2;
        err.message = 'Server error.';

        uefa_login_error(err);
    }


}

function updateinsertqsparam(url, name, value) {
    if (value == null)
        return;

    if (value.indexOf(url) >= 0)
        return url;

    value = value.replace('#', '');

    var paramKey = name + '=';
    var paramKeyNoValue = paramKey + '&';
    if (url.indexOf(paramKeyNoValue) >= 0) {
        return url.replace(paramKeyNoValue, paramKey + value + '&');
    }
    else {
        var idx = -1;
        idx = url.indexOf(paramKey);

        if (idx >= 0 && (idx + paramKey.length) == url.length) {
            return url.replace(paramKey, paramKey + value);
        }
    }

    if (url.length > 0) {

        if (url.charAt(url.length - 1) == '?')
            return url + paramKey + value;
        else if (url.indexOf('?') < 0) {
            return url + '?' + paramKey + value;
        }
        else {
            if (url.charAt(url.length - 1) == '&')
                return url + paramKey + value;
            else
                return url + '&' + paramKey + value;
        }

    }

    return url;
}


function getReturnUrl(loc) {
    var returnIndex = loc.toLowerCase().lastIndexOf("returnurl");
    if (returnIndex < 0) {
        return escape(loc);
    }
    return loc.substr(returnIndex + 10);
}

function getReturnUrlForIDPLogin(loc) {
    var returnIndex = loc.toLowerCase().lastIndexOf("returnurl");
    if (returnIndex < 0) {
        return encodeURIComponent(loc);
    }
    return loc.substr(returnIndex + 10);
}

function getUrlLang(loc) {
    var langPrefix = "";
    {
        if (location.host.substr(2, 1) == ".") langPrefix = location.host.substr(0, 3);
    }
    return langPrefix;
}

var IDP = new function () {
    facebookPopup = true;
    liveIdPopup = true;
    googlePopup = true;
    yahooPopup = true;

    var width = 500;
    var height = 500;
    var left = parseInt((screen.availWidth / 2) - (width / 2));
    var top = parseInt((screen.availHeight / 2) - (height / 2));
    var windowFeatures = "width=" + width + ",height=" + height + ",status,resizable=true,scrollbars=true,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;

    var idpLoginWin;

    isSameDomain = function () {
        return document.domain === currentDomain;
    }
    authorizeLink = function (controller, loginAction, returnUrl, flow) {
        /* 
        The pop up window needs to be opened in the onclick chain in order to not be blocked by pop up blockers. 
        This is why we do not open it in the ajax callback, but prior to the ajax request, and in the callback we only change the location 
        */

        var url = REMOTE + "/" + controller + "/" + loginAction
        url = updateinsertqsparam(url, "returnUrl", (returnUrl ? returnUrl : ""));
        url = updateinsertqsparam(url, "flow", (flow ? flow : ""));
        url = updateinsertqsparam(url, "isPopUp", "true");
        idpLoginWin = window.open(url, "IDPLogin", windowFeatures, true);
    }

    function uefa_login_error_idp(xerror) {
        idpLoginWin.close();
    }

    getLoginLink = function (that, thatWindow, idpName) {
        if (idpName === "facebook") {
            if (facebookPopup) {
                if (isSameDomain()) {
                    return authorizeLink('Account', 'LoginWithFacebook', getReturnUrl(thatWindow.location.href));
                } else {
                    return authorizeLinkForCrossDomain('Account', 'LoginWithFacebook', getReturnUrlForIDPLogin(thatWindow.location.href));
                }
            }

            return that.href = 'http://' + getUrlLang(thatWindow.location.href) + currentDomain + '/Account/LoginWithFacebook?returnUrl=' + getReturnUrl(thatWindow.location.href)
        }
        if (idpName === "google") {
            if (googlePopup) {
                if (isSameDomain()) {
                    return authorizeLink('Account', 'LoginWithGoogle', getReturnUrl(thatWindow.location.href));
                } else {
                    return authorizeLinkForCrossDomain('Account', 'LoginWithGoogle', getReturnUrlForIDPLogin(thatWindow.location.href));
                }
            }

            return that.href = 'http://' + getUrlLang(thatWindow.location.href) + currentDomain + '/Account/LoginWithGoogle?returnUrl=' + getReturnUrl(thatWindow.location.href)
        }
        if (idpName === "windows") {
            if (liveIdPopup) {
                if (isSameDomain()) {
                    return authorizeLink('Account', 'LoginWithLiveId', getReturnUrl(thatWindow.location.href));
                } else {
                    return authorizeLinkForCrossDomain('Account', 'LoginWithLiveId', getReturnUrlForIDPLogin(thatWindow.location.href));
                }
            }

            return that.href = 'http://' + getUrlLang(thatWindow.location.href) + currentDomain + '/Account/LoginWithLiveId?returnUrl=' + getReturnUrl(thatWindow.location.href)
        }
        if (idpName === "yahoo") {
            if (yahooPopup) {
                if (isSameDomain()) {
                    return authorizeLink('Account', 'LoginWithYahoo', getReturnUrl(thatWindow.location.href));
                } else {
                    return authorizeLinkForCrossDomain('Account', 'LoginWithYahoo', getReturnUrlForIDPLogin(thatWindow.location.href));
                }
            }

            return that.href = 'http://' + getUrlLang(thatWindow.location.href) + currentDomain + '/Account/LoginWithYahoo?returnUrl=' + getReturnUrl(thatWindow.location.href)
        }
    };

    var idpLoginWin;
    authorizeLinkForCrossDomain = function (controller, loginAction, returnUrl, flow) {
        openPopup(controller, loginAction, returnUrl, flow);
    }

    var proxy;
    function openPopup(controller, loginAction, returnUrl, flow) {


        idpLoginWin = window.open(REMOTE + "/Remote/Blank", "IDPLogin", windowFeatures);

        var remoteUrl = REMOTE + "/Remote/Index";

        easyXdmBootstrapper.afterEasyXdmIsLoaded(function () {
        proxy = new easyXDM.Rpc(/** The configuration */{
        local: REMOTE + "/easyxdm/name.html",
        swf: REMOTE + "/easyxdm/easyxdm.swf",
        remoteHelper: REMOTE + "/easyxdm/name.html",
        remote: remoteUrl
    }, {
        remote: {
            open: {},
            postMessage: {}
        },
        local: {
            /**
            * Register the method that should handle incoming data
            * @param {Object} data
            * @param {String} origin
            */
            postMessage: function (data) {
                if (data.redirectUrl) {
                    window.location = data.redirectUrl;
                }
                else {
                    window.location.reload();
                }
            }
        }
    });

    // lets tell the proxy to open up the window as soon as possible
    proxy.open("IDPLogin", controller, loginAction, returnUrl, flow);
    });
}
return {
    authorizeLink: authorizeLink,
    authorizeLinkForCrossDomain: authorizeLinkForCrossDomain,
    getLoginLink: getLoginLink
};
}
