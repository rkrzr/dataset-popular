if (document.getElementsByTagName) {
        // Initialize external link handlers
        var hrefs = document.getElementsByTagName("a");
        for (var l = 0; l < hrefs.length; l++) {
    			try{
             //protocol, host, hostname, port, pathname, search, hash
  				 if (hrefs[l].protocol == "mailto:") {
               startListening(hrefs[l],"click",trackMailto);
             } 
  				 else if (hrefs[l].hostname == location.host) {
               var path = hrefs[l].pathname + hrefs[l].search;
  	         var isDoc = path.match(/\.(?:doc|eps|jpg|png|svg|xls|ppt|pdf|xls|zip|txt|vsd|vxd|js|css|rar|exe|wma|mov|avi|wmv|mp3|mp4)($|\&|\?)/);
               if (isDoc) {
                 startListening(hrefs[l],"click",trackExternalLinks);
               }
             } 
  				 else {
                 startListening(hrefs[l],"click",trackExternalLinks);
             }
    			}
    			catch(e){
    					continue;
    			}
        }
}

function startListening (obj,evnt,func) {
        if (obj.addEventListener) {
                obj.addEventListener(evnt,func,false);
        } else if (obj.attachEvent) {
                obj.attachEvent("on" + evnt,func);
        }
}

function trackMailto (evnt) {
				
				var href = (evnt.srcElement) ? evnt.srcElement.href : this.href;
        var mailto = href.substring(7);
        //if (typeof(pageTracker) == "object") _gaq.push('_trackEvent', 'MailTo', 'mailto');
         _gat._getTrackerByName()._trackEvent('MailTo', mailto);


				
		    //alert(mailto);		
}

function trackExternalLinks (evnt) {
        var e = (evnt.srcElement) ? evnt.srcElement : this;
				var category = "File Downloads";
        while (e.tagName != "A") {
                e = e.parentNode;
        }
        var lnk = (e.pathname.charAt(0) == "/") ? e.pathname : "/" + e.pathname;
        if (e.search && e.pathname.indexOf(e.search) == -1) lnk += e.search;
        if (e.hostname != location.host) {
				lnk = e.hostname + lnk;
				category = "External Links";
        }
				//if (typeof(pageTracker) == "object") _gaq.push('_trackEvent', category, lnk); 
                _gat._getTrackerByName()._trackEvent(category, lnk);
		
				//alert(lnk);
}