/////////////////////////////////////////////////////////////////////////////
// 
// Project   : Web Content Management JavaScript Library (WCM)
//
// FileName  : wcm.toggle.js
// FileType  : JavaScript
// Created   : June 2007
// Version   : 10gR4 (10.1.4.0.0)
//
// Comments  : 
//
// Copyright : Oracle, Incorporated Confidential and Proprietary
//
//             This computer program contains valuable, confidential and proprietary
//             information. Disclosure, use, or reproduction without the written
//             authorization of Oracle is prohibited. This unpublished
//             work by Oracle is protected by the laws of the United States
//             and other countries. If publication of the computer program should occur,
//             the following notice shall apply:
//
//             Copyright (c) 2007, 2008, Oracle. All rights reserved.
//
/////////////////////////////////////////////////////////////////////////////

var WCM = WCM || {}; // namespace object

//***************************************************************************

WCM.DHTML = WCM.DHTML || {}; // namespace object

//***************************************************************************

WCM.CONTRIBUTOR = WCM.CONTRIBUTOR || {}; // namespace object

//***************************************************************************

WCM.CONTRIBUTOR.mode = "wcm.contributor.mode";
WCM.CONTRIBUTOR.sscontributor = "SSContributor";

//***************************************************************************
//***************************************************************************
//********************************** WCM ************************************
//***************************************************************************
//***************************************************************************

WCM.IS_MAC = (navigator.platform.toLowerCase().indexOf('mac') > -1);
WCM.IS_CHROME = (navigator.userAgent.toLowerCase().indexOf("chrome") > -1);
WCM.IS_SAFARI = (((navigator.userAgent.toLowerCase().indexOf("applewebkit") > -1) || (navigator.userAgent.toLowerCase().indexOf("apple") > -1)) && !WCM.IS_CHROME);

//***************************************************************************

WCM.IsString = function(obj) { return (typeof obj == 'string'); }
WCM.IsBoolean = function(obj) { return (typeof obj == 'boolean'); }
WCM.IsUndefined = function(obj) { return (typeof obj == 'undefined'); }
WCM.IsNull = function(obj) { return (obj == null); }
WCM.IsValid = function(obj) { return (!WCM.IsNull(obj) && !WCM.IsUndefined(obj)); }
WCM.IsFunction = function(obj) { return (typeof obj == 'function'); }

//***************************************************************************

WCM.ToBool = function(obj, def)
{
	if (WCM.IsValid(obj))
	{
		return ((obj == 1) || (obj == true) || (obj == "1") || (obj.toString().toLowerCase() == "true") || (obj.toString().toLowerCase() == 'yes'));
	}

	return (WCM.IsBoolean(def) ? def : false);
};

//***************************************************************************

WCM.GetUrlBase = function(context)
{
	context = WCM.IsString(context) ? context : (context || window).location.href;
	return context.split("?")[0].split("#")[0];
}

//***************************************************************************

WCM.GetBookmark = function(context)
{
	context = WCM.IsString(context) ? context : (context || window).location.href;
	return (WCM.IsString(context.split("#")[1])) ? "#"+context.split("#")[1] : "";
}

//***************************************************************************

WCM.GetQueryString = function(context)
{
	return WCM.IsString(context) ? ((context.split('?')[1] && '?'+context.split('?')[1].split('#')[0]) || '') : (context || window).location.search;
}

//***************************************************************************

WCM.GetQueryStringValue = function(name, query)
{
	query = WCM.GetQueryString(query);

	if (query.indexOf(name) >= 0)
	{
		var q = query.replace(/.*\?/, '');

		if (WCM.IsValid(q) && q.length > 0)
		{
			var pairs = q.split("&");
			for (var i = 0; i < pairs.length; i++)
			{
				var p = pairs[i].split("=");
				if (name == p[0])
					return decodeURIComponent(p[1]);
			}
		}
	}
	return null;
}

//***************************************************************************

WCM.RemoveQueryStringValue = function(name, query)
{
	query = WCM.GetQueryString(query);

	if (query.indexOf(name) >= 0)
	{
		var q = query.replace(/\?/,'');

		if (WCM.IsValid(q) && q.length > 0)
		{
			var tmp = "";
			var pairs = q.split("&");
			for (var i = 0; i < pairs.length; i++)
			{
				var p = pairs[i].split("=");
				if (name != p[0])
					tmp += "&" + p[0] + "=" + p[1];
			}
			return tmp.replace(/\&/,'?');
		}
	}
	return query;
}

//***************************************************************************

WCM.SetCookie = function(name, value, days)
{
	var expires = null;
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires=" + date.toGMTString();
	}
	else
		expires = "";

	document.cookie = name+"="+value+expires+"; path=/";
}

//***************************************************************************

WCM.GetCookie = function(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ')
			c = c.substring(1,c.length);
		c = unescape(c); // mmccabe Bug 9654183 cookies written from ASP are escaped. 
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//***************************************************************************

WCM.ReloadURL = function(url, context)
{
	context = context || window;
	url = url || WCM.GetUrl(context);

	if (context.location.href.toString() != url)
		context.location = url;
	else
		context.location.reload(true);
}

//***************************************************************************

WCM.GenerateUniqueId = function(prepend, append)
{
	return (prepend || '') + (''+Math.random()).replace(/\./, '') + (WCM.Counter++) + (append || '');
}

//***************************************************************************
//***************************************************************************
//******************************* WCM.DHTML *********************************
//***************************************************************************
//***************************************************************************

WCM.DHTML.ID = function(id, context)
{
	if (WCM.IsValid(id) && WCM.IsString(id))
		return (context || document).getElementById(id);
	else
		return null;
}

//***************************************************************************

WCM.DHTML.ToObject = function(obj, def)
{
	return WCM.DHTML.ID(obj) || def || obj || null;
}

//***************************************************************************

WCM.DHTML.GetEventObject = function(e) 
{ 
	return (e ? e : window.event); 
}

//***************************************************************************

WCM.DHTML.GetEventCtrlKey = function(e) 
{ 
	e = WCM.DHTML.GetEventObject(e); 
	return e.ctrlKey; 
}

//***************************************************************************

WCM.DHTML.GetEventShiftKey = function(e) 
{ 
	e = WCM.DHTML.GetEventObject(e); 
	return e.shiftKey; 
}

//***************************************************************************

WCM.DHTML.GetEventKeyCode = function(e) 
{ 
	e = WCM.DHTML.GetEventObject(e); 
	return e.keyCode; 
}

//***************************************************************************

WCM.DHTML.CleanUpCache = {};

//***************************************************************************

WCM.DHTML.AddEvent = function(elm, evType, fn, useCapture)
{
	elm = WCM.DHTML.ToObject(elm);
	if (WCM.IsValid(elm))
	{
		if (elm.addEventListener)
		{
			elm.addEventListener(evType, fn, useCapture);
			return true;
		}
		else if (elm.attachEvent)
		{
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		}
		else
		{
			elm['on' + evType] = fn;
		}
		
		if (evType != 'unload')
		{
			WCM.DHTML.CleanUpCache[WCM.GenerateUniqueId()] = {
				"elm" : elm,
				"evType" : evType,
				"fn" : fn,
				"useCapture" : useCapture
			};
		}
	}
}

//***************************************************************************

WCM.DHTML.RemoveEvent = function(elm, evType, fn, useCapture)
{
	elm = WCM.DHTML.ToObject(elm);

	if (WCM.IsValid(elm) && WCM.IsString(evType) && WCM.IsFunction(fn))
	{
		if (elm.removeEventListener)
		{
			elm.removeEventListener(evType, fn, useCapture);
			return true;
		}
		else if (elm.detachEvent)
		{
			elm.detachEvent('on' + evType, fn);
		}
		else
		{
			elm['on' + evType] = null;
		}
	}
}

//***************************************************************************

WCM.DHTML.CleanUpEventHandlers = function()
{
	WCM.DHTML.RemoveEvent(window, 'unload', WCM.DHTML.CleanUpEventHandlers);
	
	var key = '';
	var wait = {};

	for (key in WCM.DHTML.CleanUpCache)
	{
		var fn = WCM.DHTML.CleanUpCache[key].fn;
		var elm = WCM.DHTML.CleanUpCache[key].elm;
		var evType = WCM.DHTML.CleanUpCache[key].evType;
		var useCapture = WCM.DHTML.CleanUpCache[key].useCapture;
				
		if (WCM.IsValid(elm) && WCM.IsFunction(fn) && WCM.IsString(evType))
		{
			WCM.DHTML.RemoveEvent(elm, evType, fn, useCapture);
			
			fn = null;
			if (elm.location && elm.self && elm.self.location && elm.self == elm)
			{
				wait[WCM.GenerateUniqueId()] = elm;
			}
			else
			{
				elm = null;
			}
		}
	}
	
	key = '';
	for (key in wait)
	{
		wait[key] = null;
	};
	
	WCM.DHTML.CleanUpCache = null;
	delete WCM.DHTML['CleanUpCache'];
}

//***************************************************************************

WCM.DHTML.AddEvent(window, 'unload', WCM.DHTML.CleanUpEventHandlers);

//***************************************************************************
//***************************************************************************
//**************************** WCM.CONTRIBUTOR ******************************
//***************************************************************************
//***************************************************************************

WCM.CONTRIBUTOR.OnKeyUp = WCM.CONTRIBUTOR.OnKeyUp || function(e)
{
	if ((WCM.DHTML.GetEventCtrlKey(e)) &&
	    (WCM.DHTML.GetEventShiftKey(e)) && 
	    (WCM.DHTML.GetEventKeyCode(e) == 116))
	{
		WCM.CONTRIBUTOR.Toggle();
	}
}

//***************************************************************************

WCM.CONTRIBUTOR.IsContributorMode = WCM.CONTRIBUTOR.IsContributorMode || function()
{
	var qs = WCM.GetQueryStringValue(WCM.CONTRIBUTOR.mode);
	var cookie = WCM.GetCookie(WCM.CONTRIBUTOR.mode);
	
	if (!WCM.IsNull(qs))
	{
		return WCM.ToBool(qs);
	}
	else if (WCM.IsValid(SSContributor))
	{
		return WCM.ToBool(SSContributor);
	}
	else if (!WCM.IsNull(cookie))
	{
		return WCM.ToBool(cookie);
	}
	
	return false; 
}

//***************************************************************************

WCM.CONTRIBUTOR.Toggle = WCM.CONTRIBUTOR.Toggle || function()
{
	var hash = WCM.GetBookmark();
	var query = WCM.GetQueryString();

	// Clean up query string
	if (WCM.IsValid(query) && query.length > 0)
	{
		query = WCM.RemoveQueryStringValue(WCM.CONTRIBUTOR.mode, query);
		query = WCM.RemoveQueryStringValue(WCM.CONTRIBUTOR.sscontributor, query);
	}
	
	if (WCM.CONTRIBUTOR.IsContributorMode()) // Disable
	{
		WCM.SetCookie(WCM.CONTRIBUTOR.mode, "false");
	}
	else // Enable
	{
		WCM.SetCookie(WCM.CONTRIBUTOR.mode, "true");
	}

	WCM.ReloadURL(WCM.GetUrlBase() + query + hash);
}

//***************************************************************************

WCM.DHTML.AddEvent(document, (WCM.IS_MAC && WCM.IS_SAFARI) ? 'keydown' : 'keyup', WCM.CONTRIBUTOR.OnKeyUp);

//***************************************************************************




