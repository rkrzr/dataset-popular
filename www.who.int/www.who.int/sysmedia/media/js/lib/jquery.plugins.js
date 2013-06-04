/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};



/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


/**
 * Development Tools.
 * @author NOSE	
 */
jQuery.fn.devTools = function(op) {	
	// defaults
	var defaults =  {	
			developStyleKeyCode:49,
			selectorDevelopSwitch:".develop_switch",
			developStyleTitle:"develop",
			developStyleCSS:"../style/css/screen/develop.css",
			developCookie:"develop",
			developStyleActive:false,
			mobileStyleKeyCode:50,
			selectorMobileSwitch:"#foot_mobile-page",
			mobileStyleTitle:"mobile",
			mobileStyleCSS:"../style/css/mobile/mobile.css",
			mobileCookie:"mobile",
			mobileStyleActive:false,
			languageStyleKeyCode:51,
			selectorLanguageSwitch:"#language_ar",
			languageStyleTitle:"lang",
			languageStyleCSS:"../style/css/language/lang_ar.css",
			languageCookie:"lang",
			languageStyleActive:false
	};
	jQuery.extend(defaults, op);

	// event key pressed
    jQuery(document).bind('keypress', function(event) {
         handleKeyPressed(event);
    });

    // initialize dev style
    if (defaults.developStyleActive  || jQuery.cookie(defaults.developCookie) != null) {
    	defaults.developStyleActive = false;
    	switchDevelopStyle();
    }

	// init mobile style
	if (defaults.mobileStyleActive || jQuery.cookie(defaults.mobileCookie) != null) {	
		defaults.mobileStyleActive = false;
		switchMobileStyle();
	}

	// init language style
	if (defaults.languageStyleActive || jQuery.cookie(defaults.languageCookie) != null) {	
		defaults.languageStyleActive = false;
		switchLanguageStyle();
	}

	// events
	jQuery(defaults.selectorMobileSwitch).bind("click",function(){
		switchMobileStyle();
		return false;
	});
	jQuery(defaults.selectorDevelopSwitch).bind("click",function(){
		switchDevelopStyle();
		return false;
	});
	jQuery(defaults.selectorLanguageSwitch).bind("click",function(){
		switchLanguageStyle();
		return false;
	});



	/**
	* Handles key events.
	*/
	function handleKeyPressed(e) {

	   // code
	   var code = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

	   // develop style
	   if (code == defaults.developStyleKeyCode) {
	   	  	switchDevelopStyle();
	   }

	   // mobile style
	   if (code == defaults.mobileStyleKeyCode) {
	   	  	switchMobileStyle();
	   }

	   // language style
	   if (code == defaults.languageStyleKeyCode) {
	   	  	switchLanguageStyle();
	   }

	};


	/*
	* Switches the develop style.
	*/
	function switchDevelopStyle() {
		// switch
		switchStyle(defaults.developStyleTitle,defaults.developStyleCSS,defaults.developStyleActive,defaults.developCookie);
		defaults.developStyleActive = ! defaults.developStyleActive;
	}

	/*
	* Switches the mobile style.
	*/
	function switchMobileStyle() {
		switchStyle(defaults.mobileStyleTitle,defaults.mobileStyleCSS,defaults.mobileStyleActive,defaults.mobileCookie);
		defaults.mobileStyleActive = ! defaults.mobileStyleActive;
	}

	/*
	* Switches the language style.
	*/
	function switchLanguageStyle() {

		// style
		switchStyle(defaults.languageStyleTitle,defaults.languageStyleCSS,defaults.languageStyleActive,defaults.languageCookie);
		defaults.languageStyleActive = ! defaults.languageStyleActive;

		// direction
		jQuery("html").attr("dir",null);
		if (defaults.languageStyleActive) {
			jQuery("html").attr("dir","ltr");
		}
	}


	/*
	 * Enables/disables the style sheet.
	 */
	function switchStyle(title,href,active,cookie) {	

		// switch
		if (active) {
			jQuery('link[rel*=style]').each(function(i) {
                if (this.getAttribute('title') == title) {	

					// switch style
                    this.disabled = ! this.disabled;
					if (this.disabled) {
						// remove cookie
						jQuery.cookie(cookie,null,{path:'/'});
					}
                }
            });
	    } 
		// state
		else {			
			// dom element
		    var c = document.createElement('link');
            c.type = 'text/css';
            c.rel = 'stylesheet';
            c.title = title;
            c.href = href;
			c.disabled = false;
            jQuery('head')[0].appendChild(c);

			// set cookie
			jQuery.cookie(cookie,title,{path:'/'});
		}


		// return
		return false;
	 }

    // return
    return this;
};


/**
 * jQuery Indexer Plugin.
 * @author NOSE	
 */
jQuery.fn.indexer = function(op) {	
	
	// defaults
	var defaults =  {	
		selectorIndex:".index li",
		selectorText:"a span",
		classIndexed:"indexed",
		selectorInactivated:"#search_input input",
		classFocus:"focus",
		scrollSpeed:100,
		scrollOffset:100,
		scrollEasing:"easeOutSine",
		timeFlash:150,
		timeTimeout:1200
	};
	jQuery.extend(defaults, op);
	
	// vars
	var index = "";
	var indexTimer = null;
	
	// references
	var elIndexer = jQuery(this);
	var elsInactivater = jQuery(defaults.selectorInactivated);
	var indexes = jQuery(defaults.selectorIndex,this);
	var indexcount = 0;
	
	// focus
	jQuery(elsInactivater).focus(function() {                
         jQuery(this).addClass(defaults.classFocus);
	});
	jQuery(elsInactivater).blur(function(){
	      jQuery(this).removeClass(defaults.classFocus);
	 });

	

	
	// event key pressed
    jQuery(document).bind("keydown", function(event) {
         handleKeyPressed(event);
    });
	
	
	/**
	* Handles key events.
	*/
	function handleKeyPressed(e) {
		
		// active
		if (indexerActive()) {

	   		// character code
	   		var code = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			if (code < 48 || code > 90) {
				return true;
			}
	
			// index string
			index += String.fromCharCode(code);
			
			// update index
			updateIndex(index)
	
			// start timer
			startTimer();
		}
		
		// return
		return true;

	}
	
	/**
	* Indexes the elements.
	*/
	function updateIndex(keyword) {
		
		// reset
		jQuery(indexes).removeClass(defaults.classIndexed);
		indexcount = 0;
		
		// vars
		var mtop = 1000000;
		
		// index
		keyword = keyword.toLowerCase();
		for (var i = 0; i < indexes.length; i++) {
			var current = jQuery(indexes[i]);
			var currentString = jQuery(defaults.selectorText,current).html();
			if (currentString != null && currentString.toLowerCase().indexOf(keyword) >= 0) {
				jQuery(current).addClass(defaults.classIndexed);
				mtop = Math.min(mtop,jQuery(current).offset().top);
				indexcount++;
			}
			
		}
		
		// scroll
		if (mtop < 1000000) {
			jQuery('html,body').animate({scrollTop:mtop-defaults.scrollOffset}, defaults.scrollSpeed, defaults.scrollEasing);
		}
	}
	
	/**
	* Resets the index.
	*/
	function resetIndex() {
		
		
		// flash
		var flashTime = 0;
		if (indexcount <= 0) {
			flashTime = defaults.timeFlash;
			jQuery(indexes).addClass(defaults.classIndexed);
		}
		
		// remove indexed
		window.setTimeout(function(){
			jQuery(indexes).removeClass(defaults.classIndexed);
		}, flashTime);
		
		// reset
		index = "";
		indexcount = 0;
		
	}
	
	/*
	* Starts the timer.
	*/
	var timeout = function() {
	
		// clear
		window.clearTimeout(indexTimer);
		indexTimer = null;
		
		// reset
		resetIndex();
	};
	function startTimer() {
		
		// clear timer
		if(indexTimer != null){
		    window.clearTimeout(indexTimer);
		    indexTimer = null;
		 }
		
		// start timer
		indexTimer = window.setTimeout(timeout, defaults.timeTimeout);
	}
	
	/*
	* Determines if the indexer is active.
	*/
	function indexerActive()  {
		var active = false;
		if (jQuery(elIndexer).is(":visible") && jQuery(elIndexer).position().left > 0 && ! jQuery(elsInactivater).hasClass(defaults.classFocus)) {
			active = true;
		}
		return active;
	}

	

  
    // return
    return this;
};



/**
 * Toggler allows to show/hide a single item.
 * @author CNPP
 *
 * @requires jquery.js, jquery.cookie.js
 * @example $("#item1").toggler("#item1Content",{msgCollapsed:"item 1 collapsed",msgExpanded:"item 1 expanded"});
 * @before  
	<h3 class="collapsed" id="item1">item 1 collapsed</h3>
	<div class="hide" id="item1Content">
	content 1
	</div>
 *
 * @param content The id of the content to show/hide.
 * 
 * @option classCollapsed 	Class name collapsed.
 * @option classExpanded 	Class name expanded.
 * @option classPersist 	Class name persist.
 * @option msgCollapsed		Message for state collapsed.
 * @option msgExpanded		Message for state expanded.
 * @option slide			True to slide.
 * @option slideDownSpeed 	Values slow or fast.
 * @option slideUpSpeed 	Values slow or fast.
 * @option collapsed		True if initially collapsed.
 * @option persist			True to persist state (requires jquery.cookie.js).
 * 
 * 
 * @version 1.0.0	initial version			
 */
jQuery.fn.toggler = function(content,op) {	
	// defaults
	var defaults =  {	
			classCollapsed:"collapsed",
			classExpanded:"expanded",
			classPersist:"persist",
			msgCollapsed:null,
			msgExpanded:null,
			animate:true,
			timeAnimateShow:120,
			timeAnimateHide:60,
			easingAnimateShow:"easeInSine",
			easingAnimateHide:"easeInSine",
			expanded:false,
			persist:true,
			cookie:"toggler_"
	};
	jQuery.extend(defaults, op);
	
	
	// references
	var elItem = jQuery(this);
	var elItemContent = jQuery(this);
	if (elItemContent.children().size() > 0) {
		elItemContent = elItemContent.children();	
	}
	jQuery(elItemContent).attr("title",jQuery(elItemContent).html());
	
	// params
	if (jQuery(elItem).hasClass(defaults.classPersist)) {
		defaults.persist = true;	
	}
	var cname = defaults.cookie+jQuery(elItem).attr("id");
	var expanded = defaults.expanded;
	if (defaults.persist && jQuery.cookie(cname)) {
		var v = jQuery.cookie(cname);
		expanded = false;
		if (v == "expanded") {
			expanded = true;	
		}
	}
	
	
	// init
	if (expanded) {
		showItem();
	}
	else {
		hideItem();
	}
	
	// event
	jQuery(this).click(function(){
		toggleItem();
		return false;
	})
	
	/*
	 * Toggles the item.
	 */
	function toggleItem() {
		// item
		if (expanded) {
			hideItem(defaults.animate);
		}	
		else {
			showItem(defaults.animate);
		}
		// state
		expanded = ! expanded;
		if (defaults.persist) {
			var v = "hidden";
			if (expanded) {v = "expanded"};
			jQuery.cookie(cname,v,{path: '/'});
		}
	}
	/*
	 * Shows the item.
	 */
	function showItem(animate) {
		
		// item
		jQuery(elItem).removeClass(defaults.classCollapsed);
		jQuery(elItem).addClass(defaults.classExpanded);
		if (defaults.msgExpanded) {
			jQuery(elItemContent).html(defaults.msgExpanded).attr("title",defaults.msgExpanded);
		}
		
		// content
		if (animate) {
			jQuery(content).animate({"height":"toggle"},defaults.timeAnimateShow,defaults.easingAnimateShow);
		}
		else {
			jQuery(content).show();
		}		
	}
	/*
	 * Hides the item.
	 */
	function hideItem(animate) {
		// item
		jQuery(elItem).removeClass(defaults.classExpanded);
		jQuery(elItem).addClass(defaults.classCollapsed);
		if (defaults.msgExpanded) {
			jQuery(elItemContent).html(defaults.msgCollapsed).attr("title",defaults.msgCollapsed);
		}
		
		// content
		if (animate) {
			jQuery(content).animate({"height":"toggle"},defaults.timeAnimateHide,defaults.easingAnimateHide);
		}
		else {
			jQuery(content).hide();
		}
	}

  
    // return
    return this;
};

/**
 * jQuery Plugin Scroller.
 * @author NOSE
 * @version 1.0.0	initial version			
 */
jQuery.fn.scroller = function(op) {	
	// defaults
	var defaults =  {	
			scrollSpeed: 300,
			scrollEasing: "easeOutSine",
			anchor:false
	};
	jQuery.extend(defaults, op);
	
	// scroll
	jQuery(this).bind("click",scrollIt);
	
	/**
	* Scrolls to an element.
	*/
	function scrollIt() {
	  var target = jQuery(this).attr('href');
	  var elTarget = jQuery(target);
	  if (defaults.anchor) {
	  	target = target.substring(1,target.length);
	  	elTarget = jQuery("a[name='"+target+"']");
      }
      var targetOffset = elTarget.offset().top;
      jQuery('html,body').animate({scrollTop: targetOffset}, defaults.scrollSpeed, defaults.scrollEasing);
	  return false;
	}
  

 
    // return
    return this;
};


/**
 * jQuery Plugin Panel.
 * @author NOSE
 * @version 1.0.0	initial version			
 */
jQuery.fn.panel = function(op) {	
	// defaults
	var defaults =  {	
			selectorClose:"#ticker_close",
			timeClose:300,
			cookieName: "news-ticker"
	};
	jQuery.extend(defaults, op);  
	
	// references
	var elPanel = jQuery(this);
	
	// check
	var cookieValue = jQuery.cookie(defaults.cookieName);
	if (cookieValue != null) {
		jQuery(elPanel).hide();
		return this;
	}
	
	// events
	jQuery(defaults.selectorClose,this).bind("click",hidePanel);
	
	
	/*
	* Hides the panel.
	*/
	function hidePanel() {
		// set cookie
		jQuery.cookie(defaults.cookieName, 'hidden', {path: '/'});
		
		// hide
		jQuery(elPanel).hide();
	}

 
    // return
    return this;
};



/**
 * jQuery Plugin Story.
 * @author NOSE
 * @version 1.0.0	initial version			
 */
jQuery.fn.story = function(op) {	
	// defaults
	var defaults =  {	
			classSelected:"selected",
			classHidden:"story_invisible",
			selectorStoryList:"ul.stories",
			selectorStory:"ul.stories li a",
			adjustHeight:true,
			timeFadeOut:300,
			timeFadeIn:150
	};
	jQuery.extend(defaults, op);
	
	// stories
	var elsStory = jQuery(".story",this);
	if (elsStory.length <= 0) {
		return this;
	}
	jQuery(elsStory).addClass(defaults.classHidden);
	
	// current
	var elCurrentStory = jQuery(".story:first",this);
	jQuery(elCurrentStory).removeClass(defaults.classHidden);
	
	// selector
	var elStoryList = jQuery(defaults.selectorStoryList,this);
	var elsStorySelector = jQuery(defaults.selectorStory,this);
	var currentStoryId = jQuery(elsStorySelector[0]).attr("href");
	jQuery(elsStorySelector[0]).parent().addClass(defaults.classSelected);
	
	// change
	jQuery(elsStorySelector).bind("click",function(){
		// selected
		jQuery(elsStorySelector).parent().removeClass(defaults.classSelected);
		jQuery(this).parent().addClass(defaults.classSelected);
		
		// story
		var storyId = jQuery(this).attr("href");
		if (storyId != currentStoryId) {
			
			// change
			jQuery(elCurrentStory).fadeOut(defaults.timeFadeOut, function() {
				jQuery(elCurrentStory).addClass(defaults.classHidden);
				elCurrentStory = jQuery(storyId);
				currentStoryId = storyId;
				jQuery(elCurrentStory).removeClass(defaults.classHidden);
		    	jQuery(elCurrentStory).fadeIn(defaults.timeFadeIn);
			});
			return false;
		}
		return false;
	});
	
	// adjust height
	if (defaults.adjustHeight) {
		jQuery(window).bind("load",function(){
			
			// story
			var maxHeight = 0;
			jQuery(elsStory).each(function(ind,el) {
				maxHeight = Math.max(jQuery(el).height(),maxHeight);
			});
			jQuery(elsStory).css("height",maxHeight);
			
			// selecta
			maxHeight = 0;
			jQuery(elsStorySelector).each(function(ind,el) {
				maxHeight = Math.max(jQuery(el).height(),maxHeight);
			});
			jQuery(elsStorySelector).css("height",maxHeight);
			
		});
    }

 
    // return
    return this;
};

/**
 * FieldEnhancer enhances a standard form field.
 * @author CNPP
 *
 * @requires jquery.js 
 * @example $("#searchTerm").fieldEnhancer("aFormName","#aFormId");
 * @before  
	<form name="aFormName" id="aFormId" action="#">
		<input type="text" name="searchTerm" id="searchTerm" size="8" tabindex="1" />
		<input type="submit" name="sendSearch" id="sendSearch" value="Suchen" class="Submit" tabindex="6" />
	</form>
 *
 * @param formName 		The name of the form.
 * @param formId 		The id of the form.
 * 
 * @option fieldValue 	Default field value.
 * @option classFocus 	State focus class name.
 * @option classBlur 	State blur class name.
 * @version 1.0.0	initial version			
 */
jQuery.fn.fieldEnhancer = function(formName,formId,op) {	
	// defaults
	var defaults =  {	
			fieldValue: "search ...",
			classFocus: "focus",
			classBlur: "blur"
	};
	jQuery.extend(defaults, op);
	
	// init
	var field = jQuery(this);
	var fieldName = field.attr("name");
	if (document[formName][fieldName] == null) {
		return;
	}
	stateBlur();
	
	// events
	field.bind("focus", function(){stateFocus()});
	field.bind("blur", function(){stateBlur()});
	jQuery(formId).bind("submit", function() { 
			submitForm();
	})
	
	/*
	* Handles the focus state.
	*/
	function stateFocus() {
		if (document[formName][fieldName].value == defaults.fieldValue) {
			// value										
  			document[formName][fieldName].value = "";
			// class
			field.addClass("focus");
			field.removeClass("blur");
		}
	}
	
	/*
	* Handles the blur state.
	*/
	function stateBlur() {
		var currentValue = document[formName][fieldName].value;
		if (currentValue == "" || currentValue == defaults.fieldValue) {
			field.addClass("blur");
			field.removeClass("focus");
  			document[formName][fieldName].value = defaults.fieldValue;
		}
	}
	/*
	* Submit the form.
	*/
	function submitForm() {
		// reset
		var currentValue = document[formName][fieldName].value;
		if (currentValue == defaults.fieldValue) {
			document[formName][fieldName].value = "";
		}
		return true;
	}
	
 
    // return
    return this;
};




/**
* jQuery Plugin dropdown implements a nice dropdown selector.
* @author NOSE
*/
jQuery.fn.dropdown = function(op) {
	// defaults
	var defaults = {
		durationSlideDown:200,
		durationSlideUp:100,
	 	catchEvent: "click",
		selectorSelector: ".dropdown_selector, a.dropdown_selector"
	 };
	 jQuery.extend(defaults, op);
	
	// state
	var expanded = false;

	
	// references
	var elDropdownContainer = jQuery(this);
	var elDropdownList = jQuery("ul",this);
	var elDropdownSelector = jQuery(defaults.selectorSelector,this);
	
	// prepare
	if (jQuery.browser.msie) {
		// set width explizit for hover effect
		jQuery(elDropdownSelector).css({"width":jQuery(elDropdownContainer).width()-10});
	}
	
	// position list
	jQuery(elDropdownList).css({"position":"absolute","display":"none"});
	
	// event
	jQuery(elDropdownSelector).bind(defaults.catchEvent,toggleDropdown);
	jQuery("html, body").bind("click",closeDropdown);
	
			
	/*
	* Toggles the dropdown.
	*/
	function toggleDropdown() {
		if (expanded) {
			closeDropdown();	
		}
		else {
			openDropdown();	
		}
		return false;
	}
	/*
	* Opens the dropdown.
	*/
	function openDropdown() {
		if (! expanded) {
			// position list
			jQuery(elDropdownList).css({"width":jQuery(elDropdownContainer).width()});
				
			// slide it
			jQuery(elDropdownList).slideDown({duration: defaults.durationSlideDown, easing: "easeOutSine", complete: function(){expanded = true}});
		}
		return true;
	}
	/*
	* Closes the dropdown.
	*/
	function closeDropdown() {
		if (expanded) {
			jQuery(elDropdownList).slideUp({duration: defaults.durationSlideUp, easing: "easeOutSine", complete: function(){expanded = false}});
		}
		return true;
	}
	
	
	// chain
	return true;
}




/*
 * nyroModal - jQuery Plugin
 * http://nyromodal.nyrodev.com
 *
 * Copyright (c) 2008 Cedric Nirousset (nyrodev.com)
 * Licensed under the MIT license
 *
 * $Date: 2008-11-29 (Sat, 29 Nov 2008) $
 * $version: 1.3.1
 */
jQuery(function($) {

	// -------------------------------------------------------
	// Private Variables
	// -------------------------------------------------------

	var isIE6 = ($.browser.msie && parseInt($.browser.version.substr(0,1)) < 7);
	var body = $('body');

	var currentSettings;

	// To know if the fix for the Issue 10 should be applied (or has been applied)
	var fixFF = false;

	// Used for retrieve the content from an hidden div
	var contentElt;
	var contentEltLast;

	// Contains info about nyroModal state and all div references
	var modal = {
		started: false,
		ready: false,
		dataReady: false,
		anim: false,
		loadingShown: false,
		transition: false,
		error: false,
		full: null,
		bg: null,
		loading: null,
		tmp: null,
		content: null,
		wrapper: null,
		closing: false,
		contentWrapper: null,
		scripts: new Array()
	};

	// Indicate of the height or the width was resized, to reinit the currentsettings related to null
	var resized = {
		width: false,
		height: false
	};


	// -------------------------------------------------------
	// Public function
	// -------------------------------------------------------

	// jQuery extension function. A paramater object could be used to overwrite the default settings
	$.fn.nyroModal = function(settings) {
		if (!this)
			return false;
		return this.each(function(){
			if (this.nodeName.toLowerCase() == 'form') {
				$(this).submit(function(e) {
					if (this.enctype == 'multipart/form-data') {
						processModal($.extend(settings, {
							from: this
						}));
						return true;
					}
					e.preventDefault();
					processModal($.extend(settings, {
						from: this
					}));
					return false;
				});
			} else {
				$(this).click(function(e) {
					e.preventDefault();
					processModal($.extend(settings, {
						from: this
					}));
					return false;
				});
			}
		});
	};

	// jQuery extension function to call manually the modal. A paramater object could be used to overwrite the default settings
	$.fn.nyroModalManual = function(settings) {
		if (!this.length)
			processModal(settings);
		return this.each(function(){
			processModal($.extend(settings, {
				from: this
			}));
		});
	};

	$.nyroModalManual = function(settings) {
		processModal(settings);
	};

	// Update the current settings
	// object settings
	// string deep1 first key where overwrite the settings
	// string deep2 second key where overwrite the settings
	$.nyroModalSettings = function(settings, deep1, deep2) {
		setCurrentSettings(settings, deep1, deep2);
		if (!deep1 && modal.started) {
			if (modal.bg && settings.bgColor)
				currentSettings.updateBgColor(modal, currentSettings, function(){});

			if (modal.contentWrapper && settings.title) {
				title = $('h1#nyroModalTitle', modal.contentWrapper);
				if (title.length)
					title.text(settings.title);
				else
					modal.contentWrapper.prepend('<h1 id="nyroModalTitle">'+settings.title+'</h1>');
			}

			if (modal.content && (modal.dataReady && !modal.anim && !modal.transition) && (settings.width || settings.height)) {
				calculateSize(true);

				if (fixFF)
					modal.content.css({position: ''});
				currentSettings.resize(modal, currentSettings, function() {
					if (fixFF)
						modal.content.css({position: 'fixed'});
					if ($.isFunction(currentSettings.endResize))
						currentSettings.endResize(modal, currentSettings);
				});
			}
		}
	};

	// Remove the modal function
	$.nyroModalRemove = function() {
		removeModal();
	};

	// Go to the next image for a gallery
	// return false if nothing was done
	$.nyroModalNext = function() {
		var link = getGalleryLink(1);
		if (link)
			return link.nyroModalManual(currentSettings);
		return false;
	};

	// Go to the previous image for a gallery
	// return false if nothing was done
	$.nyroModalPrev = function() {
		var link = getGalleryLink(-1);
		if (link)
			return link.nyroModalManual(currentSettings);
		return false;
	};


	// -------------------------------------------------------
	// Default Settings
	// -------------------------------------------------------

	$.fn.nyroModal.settings = {
		debug: false, // Show the debug in the background

		modal: false, // Esc key or click backgrdound enabling or not

		type: '', // nyroModal type (form, formData, iframe, image, etc...)
		from: '', // Dom object where the call come from
		hash: '', // Eventual hash in the url

		processHandler: null, // Handler just before the real process

		selIndicator: 'nyroModalSel', // Value added when a form or Ajax is sent with a filter content

		formIndicator: 'nyroModal', // Value added when a form is sent

		content: null, // Raw content if type content is used

		bgColor: '#000000', // Background color

		ajax: {}, // Ajax option (url, data, type, success will be overwritten for a form, url and success only for an ajax call)

		swf: { // Swf player options if swf type is used.
			wmode: 'transparent'
		},

		width: null, // default Width If null, will be calculate automatically
		height: null, // default Height If null, will be calculate automatically

		minWidth: 400, // Minimum width
		minHeight: 300, // Minimum height

		resizable: true, // Indicate if the content is resizable. Will be set to false for swf
		autoSizable: true, // Indicate if the content is auto sizable. If not, the min size will be used

		padding: 25, // padding for the max modal size

		regexImg: '[^\.]\.(jpg|jpeg|png|tiff|gif|bmp)\s*$', // Regex to find images
		defaultImgAlt: 'Image', // Default alt attribute for the images
		setWidthImgTitle: true, // Set the width to the image title
		ltr: true, // Left to Right by default. Put to false for Hebrew or Right to Left language

		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			bg: {
				zIndex: 100,
				position: 'fixed',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%'
			},
			wrapper: {
				zIndex: 101,
				position: 'fixed',
				top: '50%',
				left: '50%'
			},
			wrapper2: {
			},
			content: {
				overflow: 'auto'
			},
			loading: {
				zIndex: 102,
				position: 'fixed',
				top: '50%',
				left: '50%',
				marginTop: '-50px',
				marginLeft: '-50px'
			}
		},

		wrap: { // Wrapper div used to style the modal regarding the content type
			div: '<div class="wrapper"></div>',
			ajax: '<div class="wrapper"></div>',
			form: '<div class="wrapper"></div>',
			formData: '<div class="wrapper"></div>',
			image: '<div class="wrapperImg"></div>',
			gallery: '<div class="wrapperImg"><a href="#" class="nyroModalPrev">Prev</a><a href="#"  class="nyroModalNext">Next</a></div>', // Use .nyroModalPrev and .nyroModalNext to set the navigation link
			swf: '<div class="wrapperSwf"></div>',
			iframe: '<div class="wrapperIframe"></div>',
			manual: '<div class="wrapper"></div>'
		},

		closeButton: '<a href="#" class="nyroModalClose" id="closeBut" title="close">Close</a>', // Adding automaticly as the first child of #nyroModalWrapper
		
		title: null, // Modal title
		titleFromIframe: true, // When using iframe in the same domain, try to get the title from it

		openSelector: '.nyroModal', // selector for open a new modal. will be used to parse automaticly at page loading
		closeSelector: '.nyroModalClose', // selector to close the modal

		contentLoading: '<a href="#" class="nyroModalClose">Cancel</a>', // Loading div content

		errorClass: 'error', // CSS Error class added to the loading div in case of error
		contentError: 'The requested content cannot be loaded.<br />Please try again later.<br /><a href="#" class="nyroModalClose">Close</a>', // Content placed in the loading div in case of error

		handleError: null, // Callback in case of error

		showBackground: showBackground, // Show background animation function
		hideBackground: hideBackground, // Hide background animation function

		endFillContent: null, // Will be called after filling and wraping the content, before parsing closeSelector and openSelector and showing the content
		showContent: showContent, // Show content animation function
		endShowContent: null, // Will be called once the content is shown
		beforeHideContent: null, // Will be called just before the modal closing
		hideContent: hideContent, // Hide content animation function

		showTransition: showTransition, // Show the transition animation (a modal is already shown and a new one is requested)
		hideTransition: hideTransition, // Hide the transition animation to show the content

		showLoading: showLoading, // show loading animation function
		hideLoading: hideLoading, // hide loading animation function

		resize: resize, // Resize animation function
		endResize: null, // Will be called one the content is resized

		updateBgColor: updateBgColor, // Change background color animation function

		endRemove: null // Will be called once the modal is totally gone
	};


	// -------------------------------------------------------
	// Private function
	// -------------------------------------------------------

	// Main function
	function processModal(settings) {
		if (modal.loadingShown || modal.transition || modal.anim)
			return;
		debug('processModal');
		modal.started = true;
		setDefaultCurrentSettings(settings);
		modal.error = false;
		modal.closing = false;
		modal.dataReady = false;
		modal.scripts = new Array();

		currentSettings.type = fileType();

		if ($.isFunction(currentSettings.processHandler))
			currentSettings.processHandler(currentSettings);

		from = currentSettings.from;
		url = currentSettings.url;

		if (currentSettings.type == 'swf') {
			// Swf is transforming as a raw content
			currentSettings.resizable = false;
			setCurrentSettings({overflow: 'hidden'}, 'css', 'content');
			currentSettings.content = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+currentSettings.width+'" height="'+currentSettings.height+'"><param name="movie" value="'+url+'"></param>';
			var tmp = '';
			$.each(currentSettings.swf, function(name, val) {
				currentSettings.content+= '<param name="'+name+'" value="'+val+'"></param>';
				tmp+= ' '+name+'="'+val+'"';
			});
			currentSettings.content+= '<embed src="'+url+'" type="application/x-shockwave-flash" width="'+currentSettings.width+'" height="'+currentSettings.height+'"'+tmp+'></embed></object>';
		}

		if (from) {
			var jFrom = $(from);
			if (currentSettings.type == 'form') {
				var data = $(from).serializeArray();
				data.push({name: currentSettings.formIndicator, value: 1});
				if (currentSettings.selector)
					data.push({name: currentSettings.selIndicator, value: currentSettings.selector.substring(1)});
				$.ajax($.extend({}, currentSettings.ajax, {
						url: url,
						data: data,
						type: from.method,
						success: ajaxLoaded,
						error: loadingError
					}));
				debug('Form Ajax Load: '+jFrom.attr('action'));
				showModal();
			} else if (currentSettings.type == 'formData') {
				// Form with data. We're using a hidden iframe
				initModal();
				jFrom.attr('target', 'nyroModalIframe');
				jFrom.attr('action', url);
				jFrom.prepend('<input type="hidden" name="'+currentSettings.formIndicator+'" value="1" />');
				if (currentSettings.selector)
					jFrom.prepend('<input type="hidden" name="'+currentSettings.selIndicator+'" value="'+currentSettings.selector.substring(1)+'" />');
				modal.tmp.html('<iframe frameborder="0" hspace="0" name="nyroModalIframe"></iframe>');
				$('iframe', modal.tmp)
					.css({
						width: currentSettings.width,
						height: currentSettings.height
					})
					.error(loadingError)
					.load(formDataLoaded);
				debug('Form Data Load: '+jFrom.attr('action'));
				showModal();
				showContentOrLoading();
			} else if (currentSettings.type == 'image' || currentSettings.type == 'gallery') {
				var title = jFrom.attr('title') || currentSettings.defaultImgAlt;
				initModal();
				modal.tmp.html('<img id="nyroModalImg" />').find('img').attr('alt', title);
				debug('Image Load: '+url);
				modal.tmp.css({lineHeight: 0});
				$('img', modal.tmp)
					.error(loadingError)
					.load(function() {
						debug('Image Loaded: '+this.src);
						$(this).unbind('load');
						var w = modal.tmp.width();
						var h = modal.tmp.height();
						modal.tmp.css({lineHeight: ''});
						setCurrentSettings({
							width: w,
							height: h,
							imgWidth: w,
							imgHeight: h
						});
						setCurrentSettings({overflow: 'hidden'}, 'css', 'content');
						modal.dataReady = true;
						if (modal.loadingShown || modal.transition)
							showContentOrLoading();
					})
					.attr('src', url);
				showModal();
			} else if (currentSettings.type == 'iframe') {
				initModal();
				modal.tmp.html('<iframe frameborder="0" hspace="0" src="'+url+'" name="nyroModalIframe"></iframe>');
				debug('Iframe Load: '+url);
				$('iframe', modal.tmp).eq(0)
					.css({
						width: '100%',
						height: isDoctypeStrict()? '99%' : '100%'
					})
					.load(function(e) {
						if (currentSettings.titleFromIframe && url.indexOf(window.location.hostname) > -1)
							$.nyroModalSettings({title: $('iframe', modal.full).contents().find('title').text()});
					});
				currentSettings.autoSizable = false;
				modal.dataReady = true;
				showModal();
			} else if (currentSettings.type) {
				// Could be every other kind of type or a dom selector
				debug('Content: '+currentSettings.type);
				initModal();
				modal.tmp.html(currentSettings.content);
				var w = modal.tmp.width();
				var h = modal.tmp.height();
				var div = $(currentSettings.type);
				if (div.length) {
					setCurrentSettings({type: 'div'});
					w = div.width();
					h = div.height();
					if (contentElt)
						contentEltLast = contentElt;
					contentElt = div;
					modal.tmp.append(div.contents());
				}
				setCurrentSettings({
					width: w,
					height: h
				});
				if (modal.tmp.html())
					modal.dataReady = true;
				else
					loadingError();
				showModal();
				showContentOrLoading();
			} else {
				debug('Ajax Load: '+url);
				setCurrentSettings({type: 'ajax'});
				var data = currentSettings.ajax.data || {};
				if (currentSettings.selector) {
					if (typeof data == "string") {
						data+= '&'+currentSettings.selIndicator+'='+currentSettings.selector.substring(1);
					} else {
						data[currentSettings.selIndicator] = currentSettings.selector.substring(1);
					}
				}
				$.ajax($.extend(true, currentSettings.ajax, {
					url: url,
					success: ajaxLoaded,
					error: loadingError,
					data: data
				}));
				showModal();
			}
		} else if (currentSettings.content) {
			// Raw content not from a DOM element
			debug('Content: '+currentSettings.type);
			setCurrentSettings({type: 'manual'});
			initModal();
			modal.tmp.html($('<div/>').html(currentSettings.content).contents());
			if (modal.tmp.html())
				modal.dataReady = true;
			else
				loadingError();
			showModal();
		} else {
			// What should we show here? nothing happen
		}
	}

	// Update the current settings
	// object settings
	// string deep1 first key where overwrite the settings
	// string deep2 second key where overwrite the settings
	function setDefaultCurrentSettings(settings) {
		debug('setDefaultCurrentSettings');
		currentSettings = $.extend({}, $.fn.nyroModal.settings, settings);
		currentSettings.selector = '';
		currentSettings.borderW = 0;
		currentSettings.borderH = 0;
		currentSettings.resizable = true;
		setMargin();
	}

	function setCurrentSettings(settings, deep1, deep2) {
		if (modal.started) {
			if (deep1 && deep2) {
				$.extend(currentSettings[deep1][deep2], settings);
			} else if (deep1) {
				$.extend(currentSettings[deep1], settings);
			} else {
				$.extend(currentSettings, settings);
			}
		} else {
			if (deep1 && deep2) {
				$.extend($.fn.nyroModal.settings[deep1][deep2], settings);
			} else if (deep1) {
				$.extend($.fn.nyroModal.settings[deep1], settings);
			} else {
				$.extend($.fn.nyroModal.settings, settings);
			}
		}
	}

	// Set the margin for postionning the element. Useful for IE6
	function setMarginScroll() {
		if (isIE6) {
			if (document.documentElement) {
				currentSettings.marginScrollLeft = document.documentElement.scrollLeft;
				currentSettings.marginScrollTop = document.documentElement.scrollTop;
			} else {
				currentSettings.marginScrollLeft = document.body.scrollLeft;
				currentSettings.marginScrollTop = document.body.scrollTop;
			}
		} else {
			currentSettings.marginScrollLeft = 0;
			currentSettings.marginScrollTop = 0;
		}
	}

	// Set the margin for the content
	function setMargin() {
		setMarginScroll();
		currentSettings.marginLeft = -(currentSettings.width+currentSettings.borderW)/2 + currentSettings.marginScrollLeft;
		currentSettings.marginTop = -(currentSettings.height+currentSettings.borderH)/2 + currentSettings.marginScrollTop;
	}

	// Set the margin for the current loading
	function setMarginloading() {
		setMarginScroll();
		var outer = getOuter(modal.loading);
		currentSettings.marginTopLoading = -(modal.loading.height() + outer.h.border + outer.h.padding)/2 + currentSettings.marginScrollTop;
		currentSettings.marginLeftLoading = -(modal.loading.width() + outer.w.border + outer.w.padding)/2 + currentSettings.marginScrollLeft;
	}

	// Init the nyroModal div by settings the CSS elements and hide needed elements
	function initModal() {
		debug('initModal');
		if (!modal.full) {
			if (currentSettings.debug)
				setCurrentSettings({color: 'white'}, 'css', 'bg');

			var iframeHideIE = '';
			if (isIE6) {
				body.css({
					height: body.height()+'px',
					width: body.width()+'px',
					position: 'static',
					overflow: 'hidden'
				});
				$('html').css({overflow: 'hidden'});
				setCurrentSettings({
					position: 'absolute',
					height: '110%',
					width: '110%',
					top: currentSettings.marginScrollTop+'px',
					left: currentSettings.marginScrollLeft+'px'
				}, 'css', 'bg');

				setCurrentSettings({position: 'absolute'}, 'css', 'loading');
				setCurrentSettings({position: 'absolute'}, 'css', 'wrapper');

				iframeHideIE = $('<iframe id="nyroModalIframeHideIe"></iframe>')
								.css($.extend({},
									currentSettings.css.bg, {
										opacity: 0,
										zIndex: 50,
										border: 'none'
									}));
			}

			body.append($('<div id="nyroModalFull"><div id="nyroModalBg"></div><div id="nyroModalWrapper"><div id="nyroModalContent"></div></div><div id="nyrModalTmp"></div><div id="nyroModalLoading"></div></div>').hide());

			modal.full = $('#nyroModalFull').show();
			modal.bg = $('#nyroModalBg')
				.css($.extend({
						backgroundColor: currentSettings.bgColor
					}, currentSettings.css.bg))
				.before(iframeHideIE);
			if (!currentSettings.modal)
				modal.bg.click(removeModal);
			modal.loading = $('#nyroModalLoading')
				.css(currentSettings.css.loading)
				.hide();
			modal.contentWrapper = $('#nyroModalWrapper')
				.css(currentSettings.css.wrapper)
				.hide();
			modal.content = $('#nyroModalContent');
			modal.tmp = $('#nyrModalTmp').hide();

			// To stop the mousewheel if the the plugin is available
			if ($.isFunction($.fn.mousewheel)) {
				modal.content.mousewheel(function(e, d) {
					var elt = modal.content.get(0);
					if ((d > 0 && elt.scrollTop == 0) ||
							(d < 0 && elt.scrollHeight - elt.scrollTop == elt.clientHeight)) {
						e.preventDefault();
						e.stopPropagation();
					}
				});
			}

			$(document).keydown(keyHandler);
			modal.content.css({width: 'auto', height: 'auto'});
			modal.contentWrapper.css({width: 'auto', height: 'auto'});
		}
	}

	// Show the modal (ie: the background and then the loading if needed or the content directly)
	function showModal() {
		debug('showModal');
		if (!modal.ready) {
			initModal();
			modal.anim = true;
			currentSettings.showBackground(modal, currentSettings, endBackground);
		} else {
			modal.anim = true;
			modal.transition = true;
			currentSettings.showTransition(modal, currentSettings, function(){endHideContent();modal.anim=false;showContentOrLoading();});
		}
	}

	// Used for the escape key or the arrow in the gallery type
	function keyHandler(e) {
		if (e.keyCode == 27) {
			if (!currentSettings.modal)
				removeModal();
		} else if (currentSettings.type == 'gallery' && modal.ready && modal.dataReady && !modal.anim && !modal.transition) {
			if (e.keyCode == 39 || e.keyCode == 40) {
				e.preventDefault();
				$('.nyroModalNext', modal.content).eq(0).trigger('click');
				return false;
			} else if (e.keyCode == 37 || e.keyCode == 38) {
				e.preventDefault();
				$('.nyroModalPrev', modal.content).eq(0).trigger('click');
				return false;
			}
		}
	}

	// Determine the filetype regarding the link DOM element
	function fileType() {
		if (currentSettings.forceType) {
			var tmp = currentSettings.forceType;
			if (!currentSettings.content)
				currentSettings.from = true;
			currentSettings.forceType = null;
			return tmp;
		}

		var from = currentSettings.from;

		var url;

		if (from && from.nodeName) {
			var jFrom = $(from);
			currentSettings.url = url = from.nodeName.toLowerCase() == 'form'? jFrom.attr('action') : from.href;

			if (jFrom.attr('rev') == 'modal')
				currentSettings.modal = true;

			if (jFrom.attr('title'))
				currentSettings.title = jFrom.attr('title');

			var imgType = imageType(url, from);
			if (imgType)
				return imgType;

			if (from.target && from.target.toLowerCase() == '_blank' || (from.hostname && from.hostname.replace(/:\d*$/,'') != window.location.hostname.replace(/:\d*$/,''))) {
				return 'iframe';
			} else if (from.nodeName.toLowerCase() == 'form') {
				setCurrentSettings(extractUrlSel(url));
				if (jFrom.attr('enctype') == 'multipart/form-data')
					return 'formData';
				return 'form';
			}
		} else {
			url = currentSettings.url;
			if (!currentSettings.content)
				currentSettings.from = true;

			if (!url)
				return null;

			var reg1 = new RegExp("^http://", "g");
			if (url.match(reg1))
				return 'iframe';
		}

		var imgType = imageType(url, from);
		if (imgType)
			return imgType;

		var swf = new RegExp('[^\.]\.(swf)\s*$', 'i');
		if (swf.test(url))
			return 'swf';

		var tmp = extractUrlSel(url);
		setCurrentSettings(tmp);

		if (!tmp.url)
			return tmp.selector;
	}

	function imageType(url, from) {
		var image = new RegExp(currentSettings.regexImg, 'i');
		if (image.test(url)) {
			if (from && from.rel)
				return 'gallery';
			else
				return 'image';
		}
	}

	function extractUrlSel(url) {
		var ret = {
			url: null,
			selector: null
		};

		if (url) {
			var hash = getHash(url);
			var hashLoc = getHash(window.location.href);
			var curLoc = window.location.href.substring(0, window.location.href.length - hashLoc.length);
			var req = url.substring(0, url.length - hash.length);

			if (req == curLoc) {
				ret.selector = hash;
			} else {
				ret.url = req;
				ret.selector = hash;
			}
		}
		return ret;
	}

	// Called when the content cannot be loaded or tiemout reached
	function loadingError() {
		debug('loadingError');

		modal.error = true;

		if (!modal.ready)
			return;

		if ($.isFunction(currentSettings.handleError))
			currentSettings.handleError(modal, currentSettings);

		modal.loading
			.addClass(currentSettings.errorClass)
			.html(currentSettings.contentError);
		$(currentSettings.closeSelector, modal.loading).click(removeModal);
		setMarginloading();
		modal.loading
			.css({
				marginTop: currentSettings.marginTopLoading+'px',
				marginLeft: currentSettings.marginLeftLoading+'px'
			});
	}

	// Put the content from modal.tmp to modal.content
	function fillContent() {
		debug('fillContent');
		if (!modal.tmp.html())
			return;

		modal.content.html(modal.tmp.contents());
		modal.tmp.empty();
		wrapContent();

		if ($.isFunction(currentSettings.endFillContent))
			currentSettings.endFillContent(modal, currentSettings);

		modal.content.append(modal.scripts);

		var currentSettingsNew = $.extend({}, currentSettings);
		if (resized.width)
			currentSettingsNew.width = null;
		if (resized.height)
			currentSettingsNew.height = null;
		$(currentSettings.closeSelector, modal.contentWrapper).click(removeModal);
		$(currentSettings.openSelector, modal.contentWrapper).nyroModal(currentSettingsNew);
	}

	// Wrap the content and update the modal size if needed
	function wrapContent() {
		debug('wrapContent');

		var wrap = $(currentSettings.wrap[currentSettings.type]);
		modal.content.append(wrap.children().remove());
		modal.contentWrapper.wrapInner(wrap);

		if (currentSettings.type == 'gallery') {
			// Set the action for the next and prev button (or remove them)

			var linkPrev = getGalleryLink(-1);
			if (linkPrev) {
				$('.nyroModalPrev', modal.contentWrapper)
					.attr('href', linkPrev.attr('href'))
					.click(function(e) {
						e.preventDefault();
						linkPrev.nyroModalManual(currentSettings);
						return false;
					});
			} else {
				$('.nyroModalPrev', modal.contentWrapper).remove();
			}
			var linkNext = getGalleryLink(1);
			if (linkNext) {
				$('.nyroModalNext', modal.contentWrapper)
					.attr('href', linkNext.attr('href'))
					.click(function(e) {
						e.preventDefault();
						linkNext.nyroModalManual(currentSettings);
						return false;
					});
			} else {
				$('.nyroModalNext', modal.contentWrapper).remove();
			}
		}

		calculateSize();
	}

	function getGalleryLink(dir) {
		if (currentSettings.type == 'gallery') {
			if (!currentSettings.ltr)
				dir *= -1;
			// next
			var gallery = $('[rel="'+currentSettings.from.rel+'"]');
			var currentIndex = gallery.index(currentSettings.from);
			var index = currentIndex + dir;
			if (index >= 0 && index < gallery.length)
				return gallery.eq(index);
		}
		return false;
	}

	// Calculate the size for the contentWrapper
	function calculateSize(resizing) {
		debug('calculateSize');

		if (!modal.wrapper)
			modal.wrapper = modal.contentWrapper.children(':first');

		resized.width = false;
		resized.height = false;
		if (currentSettings.autoSizable && (!currentSettings.width || !currentSettings.height)) {
			modal.contentWrapper.css({opacity: 0}).show();
			var tmp = {
				width: 'auto',
				height: 'auto'
			};
			if (currentSettings.width)
				tmp.width = currentSettings.width;
			if (currentSettings.height)
				tmp.height = currentSettings.height;
			modal.content.css(tmp);
			if (!currentSettings.width) {
				currentSettings.width = modal.content.width();
				resized.width = true;
			}
			if (!currentSettings.height) {
				currentSettings.height = modal.content.height();
				resized.height = true;
			}
			modal.contentWrapper.hide().css({opacity: 1});
		}

		currentSettings.width = Math.max(currentSettings.width, currentSettings.minWidth);
		currentSettings.height = Math.max(currentSettings.height, currentSettings.minHeight);

		var outerWrapper = getOuter(modal.contentWrapper);
		var outerWrapper2 = getOuter(modal.wrapper);
		var outerContent = getOuter(modal.content);

		var tmp = {
			content: {
				width: currentSettings.width,
				height: currentSettings.height
			},
			wrapper2: {
				width: currentSettings.width + outerContent.w.total,
				height: currentSettings.height + outerContent.h.total
			},
			wrapper: {
				width: currentSettings.width + outerContent.w.total + outerWrapper2.w.total,
				height: currentSettings.height + outerContent.h.total + outerWrapper2.h.total
			}
		};

		if (currentSettings.resizable) {
			var maxHeight = $(window).height()
					- currentSettings.padding*2
					- outerWrapper.h.border
					- (tmp.wrapper.height - currentSettings.height);
			var maxWidth = $(window).width()
					- currentSettings.padding*2
					- outerWrapper.w.border
					- (tmp.wrapper.width - currentSettings.width);

			if (tmp.content.height > maxHeight || tmp.content.width > maxWidth) {
				// We're gonna resize the modal as it will goes outside the view port
				if (currentSettings.type == 'image' || currentSettings.type == 'gallery') {
					// An image is resized proportionnaly
					var diffW = tmp.content.width - currentSettings.imgWidth;
					var diffH = tmp.content.height - currentSettings.imgHeight;
						if (diffH < 0) diffH = 0;
						if (diffW < 0) diffW = 0;
					var calcH = maxHeight - diffH;
					var calcW = maxWidth - diffW;
					var ratio = Math.min(calcH/currentSettings.imgHeight, calcW/currentSettings.imgWidth);

					calcH = Math.floor(currentSettings.imgHeight*ratio);
					calcW = Math.floor(currentSettings.imgWidth*ratio);
					$('img#nyroModalImg', modal.content).css({
						height: calcH+'px',
						width: calcW+'px'
					});
					tmp.content.height = calcH + diffH;
					tmp.content.width = calcW + diffW;
				} else {
					// For an HTML content, we simply decrease the size
					tmp.content.height = Math.min(tmp.content.height, maxHeight);
					tmp.content.width = Math.min(tmp.content.width, maxWidth);
				}
				tmp.wrapper2 = {
						width: tmp.content.width + outerContent.w.total,
						height: tmp.content.height + outerContent.h.total
					};
				tmp.wrapper = {
						width: tmp.content.width + outerContent.w.total + outerWrapper2.w.total,
						height: tmp.content.height + outerContent.h.total + outerWrapper2.h.total
					};
			}
		}

		modal.content.css($.extend({}, tmp.content, currentSettings.css.content));
		modal.wrapper.css($.extend({}, tmp.wrapper2, currentSettings.css.wrapper2));

		if (!resizing) {
			modal.contentWrapper.css($.extend({}, tmp.wrapper, currentSettings.css.wrapper));
			if (currentSettings.type == 'image' || currentSettings.type == 'gallery') {
				// Adding the title for the image
				var title = $('img', modal.content).attr('alt');
				$('img', modal.content).removeAttr('alt');
				if (title != currentSettings.defaultImgAlt) {
					var divTitle = $('<div>'+title+'</div>');
					modal.content.append(divTitle);
					if (currentSettings.setWidthImgTitle) {
						var outerDivTitle = getOuter(divTitle);
						divTitle.css({width: (tmp.content.width + outerContent.w.padding - outerDivTitle.w.total)+'px'});
					}
				}
			}

			if (!currentSettings.modal)
				modal.contentWrapper.prepend(currentSettings.closeButton);
		}

		if (currentSettings.title)
			modal.contentWrapper.prepend('<h1 id="nyroModalTitle">'+currentSettings.title+'</h1>');

		tmp.wrapper.borderW = outerWrapper.w.border;
		tmp.wrapper.borderH = outerWrapper.h.border;

		setCurrentSettings(tmp.wrapper);
		setMargin();
	}

	function removeModal(e) {
		debug('removeModal');
		if (e)
			e.preventDefault();
		if (modal.full && modal.ready) {
			modal.ready = false;
			modal.anim = true;
			modal.closing = true;
			if (modal.loadingShown || modal.transition) {
				currentSettings.hideLoading(modal, currentSettings, function() {
						modal.loading.hide();
						modal.loadingShown = false;
						modal.transition = false;
						currentSettings.hideBackground(modal, currentSettings, endRemove);
					});
			} else {
				if (fixFF)
					modal.content.css({position: ''}); // Fix Issue #10, remove the attribute
				modal.wrapper.css({overflow: 'hidden'}); // Used to fix a visual issue when hiding
				modal.content.css({overflow: 'hidden'}); // Used to fix a visual issue when hiding
				if ($.isFunction(currentSettings.beforeHideContent)) {
					currentSettings.beforeHideContent(modal, currentSettings, function() {
						currentSettings.hideContent(modal, currentSettings, function() {
							endHideContent();
							currentSettings.hideBackground(modal, currentSettings, endRemove);
						});
					});
				} else {
					currentSettings.hideContent(modal, currentSettings, function() {
							endHideContent();
							currentSettings.hideBackground(modal, currentSettings, endRemove);
						});
				}
			}
		}
		if (e)
			return false;
	}

	function showContentOrLoading() {
		debug('showContentOrLoading');
		if (modal.ready && !modal.anim) {
			if (modal.dataReady) {
				if (modal.tmp.html()) {
					modal.anim = true;
					if (modal.transition) {
						fillContent();
						currentSettings.hideTransition(modal, currentSettings, function() {
							modal.loading.hide();
							modal.transition = false;
							modal.loadingShown = false;
							endShowContent();
						});
					} else {
						currentSettings.hideLoading(modal, currentSettings, function() {
								modal.loading.hide();
								modal.loadingShown = false;
								fillContent();
								setMarginloading();
								currentSettings.showContent(modal, $.extend({}, currentSettings), endShowContent);
							});
					}
				}
			} else if (!modal.loadingShown && !modal.transition) {
				modal.anim = true;
				modal.loadingShown = true;
				if (modal.error)
					loadingError();
				else
					modal.loading.html(currentSettings.contentLoading);
				$(currentSettings.closeSelector, modal.loading).click(removeModal);
				setMarginloading();
				currentSettings.showLoading(modal, currentSettings, function(){modal.anim=false;showContentOrLoading();});
			}
		}
	}


	// -------------------------------------------------------
	// Private Data Loaded callback
	// -------------------------------------------------------

	function ajaxLoaded(data) {
		debug('AjaxLoaded: '+this.url);
		modal.tmp.html(currentSettings.selector
			?filterScripts($('<div>'+data+'</div>').find(currentSettings.selector).contents())
			:filterScripts(data));
		if (modal.tmp.html()) {
			modal.dataReady = true;
			showContentOrLoading();
		} else
			loadingError();
	}

	function formDataLoaded() {
		debug('formDataLoaded');
		var jFrom = $(currentSettings.from);
		jFrom.attr('action', jFrom.attr('action')+currentSettings.selector);
		jFrom.attr('target', '');
		$('input[name='+currentSettings.formIndicator+']', currentSettings.from).remove();
		var iframe = modal.tmp.children('iframe');
		var iframeContent = iframe.unbind('load').contents().find(currentSettings.selector || 'body').not('script[src]');
		iframe.attr('src', 'about:blank'); // Used to stop the loading in FF
		modal.tmp.html(iframeContent.html());
		if (modal.tmp.html()) {
			modal.dataReady = true;
			showContentOrLoading();
		} else
			loadingError();
	}


	// -------------------------------------------------------
	// Private Animation callback
	// -------------------------------------------------------

	function endHideContent() {
		debug('endHideContent');
		modal.anim = false;
		if (contentEltLast) {
			contentEltLast.append(modal.content.contents());
			contentEltLast= null;
		} else if (contentElt) {
			contentElt.append(modal.content.contents());
			contentElt= null;
		}
		modal.content.empty();
		modal.contentWrapper
			.empty()
			.removeAttr('style');

		if (modal.closing || modal.transition)
			modal.contentWrapper.hide();

		modal.contentWrapper
			.css(currentSettings.css.wrapper)
			.append(modal.content);
		showContentOrLoading();
	}

	function endRemove() {
		debug('endRemove');
		$(document).unbind('keydown', keyHandler);
		modal.anim = false;
		modal.full.remove();
		modal.full = null;
		if (isIE6) {
			body.css({height: '', width: '', position: '', overflow: ''});
			$('html').css({overflow: ''});
		}
		if ($.isFunction(currentSettings.endRemove))
			currentSettings.endRemove(modal, currentSettings);
	}

	function endBackground() {
		debug('endBackground');
		modal.ready = true;
		modal.anim = false;
		showContentOrLoading();
	}

	function endShowContent() {
		debug('endShowContent');
		modal.anim = false;
		modal.contentWrapper.css({opacity: ''}); // for the close button in IE
		fixFF = $.browser.mozilla && parseFloat($.browser.version) < 1.9 && currentSettings.type != 'gallery' && currentSettings.type != 'image';
		if (fixFF)
			modal.content.css({position: 'fixed'}); // Fix Issue #10
		if ($.isFunction(currentSettings.endShowContent))
			currentSettings.endShowContent(modal, currentSettings);
		if (resized.width)
			setCurrentSettings({width: null});
		if (resized.height)
			setCurrentSettings({height: null});
	}


	// -------------------------------------------------------
	// Utilities
	// -------------------------------------------------------

	// Get the selector from an url (as string)
	function getHash(url) {
		if (typeof url == 'string') {
			var hashPos = url.indexOf('#');
			if (hashPos > -1)
				return url.substring(hashPos);
		}
		return '';
	}

	// Filter an html content to remove the script[src]
	function filterScripts(data) {
		// Removing the body, head and html tag
		if (typeof data == 'string')
			data = data.replace(/<\/?(html|head|body)([^>]*)>/gi, '');
		var tmp = new Array();
		$.each($.clean({0:data}, this.ownerDocument), function() {
			if ($.nodeName(this, "script")) {
				if (!this.src || $(this).attr('rel') == 'forceLoad')
					modal.scripts.push(this);
			} else
				tmp.push(this);
		});
		return tmp;
	}

	// Get the vertical and horizontal margin, padding and border dimension
	function getOuter(elm) {
		elm = elm.get(0);
		var ret = {
			h: {
				margin: getCurCSS(elm, 'marginTop') + getCurCSS(elm, 'marginBottom'),
				border: getCurCSS(elm, 'borderTopWidth') + getCurCSS(elm, 'borderBottomWidth'),
				padding: getCurCSS(elm, 'paddingTop') + getCurCSS(elm, 'paddingBottom')
			},
			w: {
				margin: getCurCSS(elm, 'marginLeft') + getCurCSS(elm, 'marginRight'),
				border: getCurCSS(elm, 'borderLeftWidth') + getCurCSS(elm, 'borderRightWidth'),
				padding: getCurCSS(elm, 'paddingLeft') + getCurCSS(elm, 'paddingRight')
			}
		};

		ret.h.outer = ret.h.margin + ret.h.border;
		ret.w.outer = ret.w.margin + ret.w.border;

		ret.h.inner = ret.h.padding + ret.h.border;
		ret.w.inner = ret.w.padding + ret.w.border;

		ret.h.total = ret.h.outer + ret.h.padding;
		ret.w.total = ret.w.outer + ret.w.padding;

		return ret;
	}

	function getCurCSS(elm, name) {
		var ret = parseInt($.curCSS(elm, name, true));
		if (isNaN(ret))
			ret = 0;
		return ret;
	}

	function isDoctypeStrict() {
		var doctype = '';
		if ($.browser.opera) {
			return true;
		} else if ($.browser.msie) {
			var re = /\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;
			var res = false;
			if($.browser.msie)
				res = document.all[0].nodeType == 8 ? re.test(document.all[0].nodeValue) : false;
			if (res)
				doctype = RegExp.$3;
		} else
			doctype = document.doctype.systemId;
		return doctype.toLowerCase().indexOf('strict') > -1
	}

	// Proxy Debug function
	function debug(msg) {
		if ($.fn.nyroModal.settings.debug || currentSettings && currentSettings.debug)
			nyroModalDebug(msg, modal, currentSettings || {});
	}

	// -------------------------------------------------------
	// Default animation function
	// -------------------------------------------------------

	function showBackground(elts, settings, callback) {
		elts.bg.css({opacity:0}).fadeTo(500, 0.75, callback);
	}

	function hideBackground(elts, settings, callback) {
		elts.bg.fadeOut(300, callback);
	}

	function showLoading(elts, settings, callback) {
		elts.loading
			.css({
				marginTop: settings.marginTopLoading+'px',
				marginLeft: settings.marginLeftLoading+'px',
				opacity: 0
			})
			.show()
			.animate({
				opacity: 1
			}, {complete: callback, duration: 400});
	}

	function hideLoading(elts, settings, callback) {
		callback();
	}

	function showContent(elts, settings, callback) {
		elts.loading
			.css({
				marginTop: settings.marginTopLoading+'px',
				marginLeft: settings.marginLeftLoading+'px'
			})
			.show()
			.animate({
				width: settings.width+'px',
				height: settings.height+'px',
				marginTop: settings.marginTop+'px',
				marginLeft: settings.marginLeft+'px'
			}, {duration: 350, complete: function() {
				elts.contentWrapper
					.css({
						width: settings.width+'px',
						height: settings.height+'px',
						marginTop: settings.marginTop+'px',
						marginLeft: settings.marginLeft+'px'
					})
					.show();
					elts.loading.fadeOut(200, callback);
				}
			});
	}

	function hideContent(elts, settings, callback) {
		elts.contentWrapper
			.animate({
				height: '50px',
				width: '50px',
				marginTop: (-(25+settings.borderH)/2 + settings.marginScrollTop)+'px',
				marginLeft: (-(25+settings.borderW)/2 + settings.marginScrollLeft)+'px'
			}, {duration: 350, complete: function() {
				elts.contentWrapper.hide();
				callback();
			}});
	}

	function showTransition(elts, settings, callback) {
		// Put the loading with the same dimensions of the current content
		elts.loading
			.css({
				marginTop: elts.contentWrapper.css('marginTop'),
				marginLeft: elts.contentWrapper.css('marginLeft'),
				height: elts.contentWrapper.css('height'),
				width: elts.contentWrapper.css('width'),
				opacity: 0
			})
			.show()
			.fadeTo(400, 1, function() {
					elts.contentWrapper.hide();
					callback();
				});
	}

	function hideTransition(elts, settings, callback) {
		// Place the content wrapper underneath the the loading with the right dimensions
		elts.contentWrapper
			.hide()
			.css({
				width: settings.width+'px',
				marginLeft: settings.marginLeft+'px',
				height: settings.height+'px',
				marginTop: settings.marginTop+'px',
				opacity: 1
			});
		elts.loading
			.animate({
				width: settings.width+'px',
				marginLeft: settings.marginLeft+'px',
				height: settings.height+'px',
				marginTop: settings.marginTop+'px'
			}, {complete: function() {
					elts.contentWrapper.show();
					elts.loading.fadeOut(400, function() {
						elts.loading.hide();
						callback();
					});
				}, duration: 350});
	}

	function resize(elts, settings, callback) {
		elts.contentWrapper
			.animate({
				width: settings.width+'px',
				marginLeft: settings.marginLeft+'px',
				height: settings.height+'px',
				marginTop: settings.marginTop+'px'
			}, {complete: callback, duration: 400});
	}

	function updateBgColor(elts, settings, callback) {
		if (!$.fx.step.backgroundColor) {
			elts.bg.css({backgroundColor: settings.bgColor});
			callback();
		} else
			elts.bg
				.animate({
					backgroundColor: settings.bgColor
				}, {complete: callback, duration: 400});
	}

	// -------------------------------------------------------
	// Default initialization
	// -------------------------------------------------------

	$($.fn.nyroModal.settings.openSelector).nyroModal();

});

// Default debug function, to be overwritten if needed
//      Be aware that the settings parameter could be empty
function nyroModalDebug(msg, elts, settings) {
	console.log(msg);
	if (elts.full)
		elts.bg.prepend(msg+'<br />');
}





/*!
 * jQuery UI 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function(c){c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.2",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==
"hidden")return false;b=b&&b=="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,f,g){return c.ui.isOverAxis(a,d,f)&&c.ui.isOverAxis(b,e,g)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect",
"none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",
1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==undefined)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b=="absolute"||b=="relative"||b=="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");return(/input|select|textarea|button|object/.test(b)?
!a.disabled:"a"==b||"area"==b?a.href||!isNaN(d):!isNaN(d))&&!c(a)["area"==b?"parents":"closest"](":hidden").length},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b){var j=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add(this).each(function(){b(this).triggerHandler("remove")});return j.call(b(this),a,c)})};b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend({},c.options);b[e][a].prototype=
b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==undefined){h=i;return false}}):this.each(function(){var g=
b.data(this,a);if(g){d&&g.option(d);g._init()}else b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){this.element=b(c).data(this.widgetName,this);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();
this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===undefined)return this.options[a];d={};d[a]=c}b.each(d,function(f,
h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=
b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(a);this._mouseDownEvent=a;var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();
return true}}this._mouseMoveDelegate=function(d){return b._mouseMove(d)};this._mouseUpDelegate=function(d){return b._mouseUp(d)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.browser.safari||a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&
this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=a.target==this._mouseDownEvent.target;this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-
a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=
0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=
g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,
elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?
-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position=
"relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);
;


/*
 * jQuery UI Tabs 1.8.2
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d){function s(){return++u}function v(){return++w}var u=0,w=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'},_create:function(){this._tabify(true)},_setOption:function(c,e){if(c=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[c]=e;this._tabify()}},_tabId:function(c){return c.title&&c.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+s()},_sanitizeSelector:function(c){return c.replace(/:/g,"\\:")},_cookie:function(){var c=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+v());return d.cookie.apply(null,[c].concat(d.makeArray(arguments)))},_ui:function(c,e){return{tab:c,panel:e,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var c=
d(this);c.html(c.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function e(g,f){g.css({display:""});!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}this.list=this.element.find("ol,ul").eq(0);this.lis=d("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);var a=this,b=this.options,h=/^#.+/;this.anchors.each(function(g,f){var j=d(f).attr("href"),l=j.split("#")[0],p;if(l&&(l===location.toString().split("#")[0]||
(p=d("base")[0])&&l===p.href)){j=f.hash;f.href=j}if(h.test(j))a.panels=a.panels.add(a._sanitizeSelector(j));else if(j!="#"){d.data(f,"href.tabs",j);d.data(f,"load.tabs",j.replace(/#.*$/,""));j=a._tabId(f);f.href="#"+j;f=d("#"+j);if(!f.length){f=d(b.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g-1]||a.list);f.data("destroy.tabs",true)}a.panels=a.panels.add(f)}else b.disabled.push(g)});if(c){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(b.selected===undefined){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){b.selected=g;return false}});if(typeof b.selected!="number"&&b.cookie)b.selected=parseInt(a._cookie(),10);if(typeof b.selected!="number"&&this.lis.filter(".ui-tabs-selected").length)b.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));b.selected=b.selected||(this.lis.length?0:-1)}else if(b.selected===null)b.selected=-1;b.selected=b.selected>=0&&this.anchors[b.selected]||b.selected<0?b.selected:0;b.disabled=d.unique(b.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return a.lis.index(g)}))).sort();d.inArray(b.selected,b.disabled)!=-1&&b.disabled.splice(d.inArray(b.selected,b.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(b.selected>=0&&this.anchors.length){this.panels.eq(b.selected).removeClass("ui-tabs-hide");this.lis.eq(b.selected).addClass("ui-tabs-selected ui-state-active");a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[b.selected],a.panels[b.selected]))});this.load(b.selected)}d(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs");a.lis=a.anchors=a.panels=null})}else b.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[b.collapsible?"addClass":
"removeClass"]("ui-tabs-collapsible");b.cookie&&this._cookie(b.selected,b.cookie);c=0;for(var i;i=this.lis[c];c++)d(i)[d.inArray(c,b.disabled)!=-1&&!d(i).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");b.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(b.event!="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",
function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(b.fx)if(d.isArray(b.fx)){m=b.fx[0];o=b.fx[1]}else m=o=b.fx;var q=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);a._trigger("show",
null,a._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");a._trigger("show",null,a._ui(g,f[0]))},r=m?function(g,f){f.animate(m,m.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);a.element.dequeue("tabs")})}:function(g,f){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");a.element.dequeue("tabs")};this.anchors.bind(b.event+".tabs",
function(){var g=this,f=d(this).closest("li"),j=a.panels.filter(":not(.ui-tabs-hide)"),l=d(a._sanitizeSelector(this.hash));if(f.hasClass("ui-tabs-selected")&&!b.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||a._trigger("select",null,a._ui(this,l[0]))===false){this.blur();return false}b.selected=a.anchors.index(this);a.abort();if(b.collapsible)if(f.hasClass("ui-tabs-selected")){b.selected=-1;b.cookie&&a._cookie(b.selected,b.cookie);a.element.queue("tabs",function(){r(g,
j)}).dequeue("tabs");this.blur();return false}else if(!j.length){b.cookie&&a._cookie(b.selected,b.cookie);a.element.queue("tabs",function(){q(g,l)});a.load(a.anchors.index(this));this.blur();return false}b.cookie&&a._cookie(b.selected,b.cookie);if(l.length){j.length&&a.element.queue("tabs",function(){r(g,j)});a.element.queue("tabs",function(){q(g,l)});a.load(a.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",
function(){return false})},destroy:function(){var c=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=e;var a=d(this).unbind(".tabs");d.each(["href","load","cache"],function(b,h){a.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,
"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});c.cookie&&this._cookie(null,c.cookie);return this},add:function(c,e,a){if(a===undefined)a=this.anchors.length;var b=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,e));c=!c.indexOf("#")?c.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",
true);var i=d("#"+c);i.length||(i=d(h.panelTemplate).attr("id",c).data("destroy.tabs",true));i.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(a>=this.lis.length){e.appendTo(this.list);i.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[a]);i.insertBefore(this.panels[a])}h.disabled=d.map(h.disabled,function(k){return k>=a?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");i.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[a],this.panels[a]));return this},remove:function(c){var e=this.options,a=this.lis.eq(c).remove(),b=this.panels.eq(c).remove();if(a.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(c+(c+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=c}),function(h){return h>=c?--h:h});this._tabify();this._trigger("remove",
null,this._ui(a.find("a")[0],b[0]));return this},enable:function(c){var e=this.options;if(d.inArray(c,e.disabled)!=-1){this.lis.eq(c).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(a){return a!=c});this._trigger("enable",null,this._ui(this.anchors[c],this.panels[c]));return this}},disable:function(c){var e=this.options;if(c!=e.selected){this.lis.eq(c).addClass("ui-state-disabled");e.disabled.push(c);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}return this},
select:function(c){if(typeof c=="string")c=this.anchors.index(this.anchors.filter("[href$="+c+"]"));else if(c===null)c=-1;if(c==-1&&this.options.collapsible)c=this.options.selected;this.anchors.eq(c).trigger(this.options.event+".tabs");return this},load:function(c){var e=this,a=this.options,b=this.anchors.eq(c)[0],h=d.data(b,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(b,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(c).addClass("ui-state-processing");
if(a.spinner){var i=d("span",b);i.data("label.tabs",i.html()).html(a.spinner)}this.xhr=d.ajax(d.extend({},a.ajaxOptions,{url:h,success:function(k,n){d(e._sanitizeSelector(b.hash)).html(k);e._cleanup();a.cache&&d.data(b,"cache.tabs",true);e._trigger("load",null,e._ui(e.anchors[c],e.panels[c]));try{a.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[c],e.panels[c]));try{a.ajaxOptions.error(k,n,c,b)}catch(m){}}}));e.element.dequeue("tabs");return this}},
abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(c,e){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.2"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(c,e){var a=this,b=this.options,h=a._rotate||(a._rotate=
function(i){clearTimeout(a.rotation);a.rotation=setTimeout(function(){var k=b.selected;a.select(++k<a.anchors.length?k:0)},c);i&&i.stopPropagation()});e=a._unrotate||(a._unrotate=!e?function(i){i.clientX&&a.rotate(null)}:function(){t=b.selected;h()});if(c){this.element.bind("tabsshow",h);this.anchors.bind(b.event+".tabs",e);h()}else{clearTimeout(a.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(b.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
;


