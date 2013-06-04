/* PLUGIN DIRECTORY
What you can find in this file [listed in order they appear]

	1.) Bookmark and Share 
	2.) jQuery Mobile Detection - http://detectmobilebrowser.com
	
 */

//******************************************************************************************//
// Some useful string functions.
//******************************************************************************************//

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
} 

String.prototype.lTrim = function () {
	return this.replace(/^\s+/g, "");
}

String.prototype.rTrim = function () {
	return this.replace(/\s+$/g, "");
}

String.prototype.left = function(len) {
	return (len > this.length) ? this : this.substring(0, len);
}

String.prototype.right = function(len) {
	return (len > this.length) ? this : this.substring(this.length - len);
}

String.prototype.beginsWith = function(t) {
	return (t.toLowerCase() == this.substring(0, t.length).toLowerCase());
} 

String.prototype.endsWith = function(t) {
	return (t.toLowerCase() == this.substring(this.length - t.length).toLowerCase());
}

// usage: log('inside coolFunc', this, arguments);
window.log = function(){
	log.history = log.history || [];	// store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
		arguments.callee = arguments.callee.caller;
		console.log( Array.prototype.slice.call(arguments) );
	}
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/**
 * 1.) Bookmark and Share Scripts
 * @author 
 * v. 1.0?
 */
function addBookmarkHover(id) {
	var elem = $("#" + id);
	if (elem.length > 0) {
		if (id == "share") {
			if ($("body.widePage").length > 0 && elem.siblings().length < 4) {
				elem.addClass("sfhover-left");
			} else {
				elem.addClass("sfhover");
			}			
		} else {
			elem.addClass("sfhover");
		}
	}
}
function removeBookmarkHover(id) {
	var elem = $("#" + id);
	if (elem.length > 0) {
		if (elem.hasClass("sfhover")) {
			elem.removeClass("sfhover");
		}
		if (elem.hasClass("sfhover-left")) {
			elem.removeClass("sfhover-left");
		}
	}
}

/*
 * The javascript class that handles showing and hiding the bookmark/share "window" by
 * applying and removing the "sfhover" CSS class to the LI element.
 */
if (typeof CDC == "undefined") var CDC = new Object();
if (typeof CDC.Share == "undefined") CDC.Share = new Object();
CDC.Share = function() {
}
CDC.Share.prototype = {
	timeout : null,
	showPopup : function() {
		clearTimeout(this.timeout);
		if (this.className.indexOf("sfhover") < 0) {
			var command = "addBookmarkHover('" + this.id + "')";
			this.timeout = setTimeout(command, 300);
		}
	},
	hidePopup : function() {
		if (this.className.indexOf("sfhover") < 0) {
			clearTimeout(this.timeout);
		} else {
			var command = "removeBookmarkHover('" + this.id + "')";
			this.timeout = setTimeout(command, 200);
		}
	}
}

/*
 * A function that iterates through the collection of LI items with a class of "share" and
 * sets the event handlers for the onmouseover and onmouseout events.
 */
shareHover = function() {
	$("li.share").each(function() {
		var shareNavLi = $(this);
		if (shareNavLi.length > 0) {
			var shareClass = new CDC.Share(shareNavLi);
			shareNavLi.bind("mouseover", shareClass.showPopup);
			shareNavLi.bind("mouseout", shareClass.hidePopup);
		}
	});
}

/*
 * A function that iterates through the collection of LI items with a class of "share" and
 * sets the event handlers for the onfocus and onblur events.  These handlers are needed
 * to support keyboard-driven navigation of the bookmark/share functionality.
 */
mcAccessible = function() {
	$("li.share").each(function() {
		var shareNavLi = $(this);
		if (shareNavLi.length > 0) {
			shareNavLi.bind("focus", function() {
				// Add sfhover class if it doesn't already exist.
				var elem = $(this);
				if (elem.id == "share") {
					if ($("body.widePage").length > 0 && elem.siblings().length < 4) {
						elem.addClass("sfhover-left");
					} else {
						elem.addClass("sfhover");
					}
				} else {
					elem.addClass("sfhover");
				}
			});
			shareNavLi.bind("blur", function() {
				// Remove sfhover class.
				var elem = $(this);
				if (elem.hasClass("sfhover")) {
					elem.removeClass("sfhover");
				}
				if (elem.hasClass("sfhover-left")) {
					elem.removeClass("sfhover-left");
				}
			});
			shareNavLi.find("a").each(function() {
				var mcEl = $(this);			
				mcEl.bind("focus", function() {
					var elem = $(this);
					elem.addClass("sffocus");
					var parentElem = elem.parent();
					while (parentElem.length > 0 && !parentElem.hasClass("share")) {
						parentElem = parentElem.parent();
					}
					if ($("body.widePage").length > 0 && parentElem.siblings().length < 4) {
						parentElem.addClass("sfhover-left");
					} else {
						parentElem.addClass("sfhover");
					}
				});
				mcEl.bind("blur", function() {
					var elem = $(this);
					elem.removeClass("sffocus");
					var parentElem = elem.parent();
					while (parentElem.length > 0 && !parentElem.hasClass("share")) {
						parentElem = parentElem.parent();
					}
					if (parentElem.hasClass("sfhover")) {
						parentElem.removeClass("sfhover");
					}
					if (parentElem.hasClass("sfhover-left")) {
						parentElem.removeClass("sfhover-left");
					}
				});
			});
		}
	});
}

/*
 * The accessibility script and hover script is being loaded for all
 * browsers since we are relying on javascript for the delayed hover effects. - thanks http://www.brothercake.com/site/resources/scripts/onload/ for event handler logic.
 */
if (window.addEventListener) {// gecko, safari, konqueror and standard
	window.addEventListener('load', mcAccessible, false); 
	window.addEventListener('load', shareHover, false);
} else if (document.addEventListener) { // opera 7
	document.addEventListener('load', mcAccessible, false);
	document.addEventListener('load', shareHover, false);
} else if (window.attachEvent) { // win/ie
	window.attachEvent('onload', shareHover);
	window.attachEvent('onload', mcAccessible);
} else { // mac/ie5
	if (typeof window.onload == 'function') {
		var existing = onload;
		window.onload = function() {
			existing();
			shareHover();
			mcAccessible();
		}
	} else {
		window.onload = function() {
			shareHover();
			mcAccessible();
		}
	}
}

var cdcShareWindowObjectReference;
/*
 * A function that opens the selected bookmark/share website and passes the URL and title
 * using the API for that site.
 */
function openBookmarkSite(sitename) {
	var title;
	var url;
	if (sitename.toLowerCase() == "favorites") {
		title = document.title;
		url = location.href;
		if (url.endsWith("#")) {
			url = url.substring(0, url.length - 1);
		}
		if (window.sidebar) { // firefox
			window.sidebar.addPanel(title, url, "");
		} else if (document.all) { // IE
			external.AddFavorite(url, title);
		} else if (window.opera && window.print) { // opera
			var elem = document.createElement('a');
			elem.setAttribute('href', url);
			elem.setAttribute('title', title);
			elem.setAttribute('rel', 'sidebar');
			elem.click();
		}
	} else {
		title = escape(document.title);
		url = escape(location.href);
		if (url.endsWith("#")) {
			url = url.substring(0, url.length - 1);
		}
		var bookmarkURL;
		if (sitename.toLowerCase() == "delicious") {
			bookmarkURL = "http://delicious.com/save?url=" + url + "&title=" + title;
		} else if (sitename.toLowerCase() == "digg") {
			bookmarkURL = "http://digg.com/submit?url=" + url + "&title=" + title + "&media=news";
		} else if (sitename.toLowerCase() == "facebook") {
			bookmarkURL = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + title;
		} else if (sitename.toLowerCase() == "google") {
			bookmarkURL = "http://www.google.com/bookmarks/mark?op=add&bkmk=" + url + "&title=" + title;
		} else if (sitename.toLowerCase() == "technorati") {
			bookmarkURL = "http://technorati.com/faves?sub=favthis&add=" + url;
		} else if (sitename.toLowerCase() == "twitter") {
			bookmarkURL =  "http://twitter.com/?status=" + url;
		}
		
		cdcShareWindowObjectReference = window.open(bookmarkURL, "_blank", "height=500,width=780,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes");
	}
	window.location.reload(true);
	cancel(this);
}


/**
 * 2.) jQuery client detection 
 
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

