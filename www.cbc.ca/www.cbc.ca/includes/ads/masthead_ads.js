if(typeof Ads == 'undefined') {
    var Ads = function(){

        //default ad_zones and ad_sections for each site (listed as specific url -> generic url) 
        var cbc = ['/programguide/', '/contact/', '/video/', '/nozone/'];
        var sports = ['/olympics/', '/hockey/', '/football/', '/skiing/', '/curling/', '/figureskating/', '/basketball/', '/baseball/', '/soccer/', '/amateur/', '/livevideo/', '/tennis/', '/golf/', '/racing/', '/trackandfield/', '/speedskating/', '/sports/'];
        var news = ['/bc/', '/calgary/', '/edmonton/', '/sask/', '/manitoba/', '/toronto/', '/ottawa/', '/montreal/', '/ns/', '/pei/', '/newfoundland/', '/nb/', '/north/', '/sudbury/', '/windsor/', '/thunderbay/', '/canada/', '/world/', '/arts/books/', '/arts/film/', '/arts/tv/', '/arts/music/', '/arts/artdesign/', '/arts/theatre/', '/arts/media/','/arts/', '/consumer/', '/diversions/', '/politics/', '/news/'];
        var money = ['/money/', '/business/'];
        var health = ['/health/'];
        var technology = ['/technology/'];
        var ent = ['/thehour/', '/littlemosque/', '/tudors/', '/coronation/', '/dragonsden/', '/stevenandchris/', '/mercerreport/', '/airfarce/', '/22minutes/', '/justforlaughs/', '/beingerica/', '/games/', '/entertainment/'];
        var tv = ['/television/', '/national/', '/fifth/', '/jeopardy/', '/wheeloffortune/', '/marketplace/', '/natureofthings/', '/heartland/', '/documentaries/'];
        var radio = ['/radioone/', '/radio2/', '/radio3/', '/podcasting/', '/sirius/', '/frequency/','/radio/'];
        var weather = ['/weather/'];
        var kids = ['/kids/', '/kidscbc/'];
        var sites = ['cbc.money.ca', 'cbc.health.ca', 'cbc.technology.ca', 'cbc.news.ca', 'cbc.sports.ca', 'cbc.ent.ca', 'cbc.tv.ca', 'cbc.src.ca', 'cbc.weather.ca', 'cbc.kids.ca', 'cbc.ca'];
        var mapping = [money, health, technology, news, sports, ent, tv, radio, weather, kids, cbc]; //order matters (listed as specific url -> generic url) (last element is the default ad_site & last element of default ad_site is the default ad_zone)

        // stores takeover mode type
        var adType = 'normal';
        // keeps track of widgets registered on the current page
        var widgets = {};
        // maintains priority level of certain widgets, which determine whether or not the big box can be changed
        var widgetPriority = {'player':1,'gallery':2};
        // points to html file which is loaded into big box iframe
        var bigBoxLoader = '/includes/ads/bbframe.html';
        // big box iframe id (change it here and only here!!!)
        var bigBoxIframeID = "bigbox";
        var bigBoxIframeContainerID = "bigboxwrap";
        // default big box height
        var bigBoxHeight = '250';
        return{
            init : function(){
                if (typeof( window.ord ) == "undefined") {  ord = this.generateOrdValue(); }
                if (typeof( window.advertising_site ) == "undefined") {  advertising_site = null; }
                if (typeof( window.advertising_zone ) == "undefined") {  advertising_zone = null; }
                if (typeof( window.advertising_section ) == "undefined") {  advertising_section = null; }
                if (typeof( window.advertising_category ) == "undefined") {  advertising_category = null; }
                if (typeof( window.advertising_page_type ) == "undefined") {  advertising_page_type = null; }
                if (typeof( window.advertising_content_category ) == "undefined") {  advertising_content_category = null; }
                if (typeof( window.advertising_surround_session ) == "undefined") {  advertising_surround_session = ""; }
                if (typeof( window.advertising_keyword ) == "undefined") {  advertising_keyword = ""; }
                if (typeof( window.advertising_dcopt ) == "undefined") {  advertising_dcopt = "dcopt=ist;"; } else { advertising_dcopt=""; }
                if (typeof( window.advertising_tile ) == "undefined") {  advertising_tile = this.getNextAdTileValue(); }
                if (typeof( window.advertising_size ) == "undefined") {  advertising_size = "728x90"; }
                if (typeof( window.advertising_position ) == "undefined") {  advertising_position = "topleader"; }
                if (typeof( window.advertising_exclusions ) == "undefined") { advertising_exclusions = ''; } else { advertising_exclusions = this.parseExclusions( window.advertising_exclusions ); }

                this.parseUrl(document.location.href);
            },
            parseUrl : function(uri){
                var path = uri;
                var ad_tag_flags = {};
                var ad_tags = {};
                //check if any advertising tags have already been manually set
                ad_tags.ad_site = (typeof( window.advertising_site ) != "undefined")?advertising_site:null;
                ad_tags.ad_zone = (typeof( window.advertising_zone ) != "undefined")?advertising_zone:null;
                ad_tags.ad_page_type = (typeof( window.advertising_page_type ) != "undefined")?advertising_page_type:null;
                ad_tags.ad_section = (typeof( window.advertising_section ) != "undefined")?advertising_section:null;
                ad_tags.ad_category = (typeof( window.advertising_category ) != "undefined")?advertising_category:null;
                ad_tags.content_category = (typeof( window.advertising_content_category ) != "undefined")?advertising_content_category:null;
                
                if (ad_tags.ad_section === null && ad_tags.ad_zone !== null) {ad_tags.ad_section = ad_tags.ad_zone; }
                
                //flags to indicate that variables were set manually
                ad_tag_flags.site_is_set = (ad_tags.ad_site === null)?false:true;
                ad_tag_flags.zone_is_set = (ad_tags.ad_zone === null)?false:true;
                ad_tag_flags.page_type_is_set = (ad_tags.ad_page_type === null)?false:true;
                ad_tag_flags.section_is_set = (ad_tags.ad_section === null)?false:true;
                ad_tag_flags.category_is_set = (ad_tags.ad_category === null)?false:true;
                ad_tag_flags.content_category_is_set = (ad_tags.content_category === null)?false:true;

                //check if on a search results page before chopping off query string
                var keywords = path.match(/.cbc.ca\/search\/(.*)q=([^&]*)/);
                if (keywords !== null) {
                    advertising_keyword = 'kw='+keywords[2]+';';
                    advertising_keyword = advertising_keyword.replace(/@/g,"%40"); //ie doesn't escape this unsafe character
                }

                //search for hash and remove
                var hsh = path.indexOf("#");
                if (hsh != -1) { path = path.substring(0, hsh); }

                //search for query string and remove
                var qs = path.indexOf("?");
                if (qs != -1) { path = path.substring(0, qs); }
                
                //parse path for page_type if not already manually set
                if (ad_tag_flags.page_type_is_set === false) {
                    ad_tags.ad_page_type = 'story'; //default page type to story
                    if (path.match('index.html') || path.substr((path.length-1),1)=='/') {
                        ad_tags.ad_page_type = 'index';
                    }
                }
                
                //parse path for ad site and ad zone		
                if (ad_tags.ad_site === null || ad_tags.ad_zone === null || ad_tags.ad_section === null || ad_tags.ad_category === null){
                    var tagz = this.findAdTags({path:path, tagz:ad_tags, flags:ad_tag_flags});
                    ad_tags.ad_site = tagz.ad_site;
                    ad_tags.ad_zone = tagz.ad_zone;
                    ad_tags.ad_section = tagz.ad_section;
                    if (tagz.ad_category) { ad_tags.ad_category = tagz.ad_category; }
                }
                
                //parse path for cbc wide ad categories
                if (ad_tag_flags.category_is_set === false){
                    var category_matches;
                    if (path.match(/\/stanleycup([0-9]*)\//) !== null){
                        category_matches = path.match(/\/stanleycup([0-9]*)\//);
                        ad_tags.ad_category = 'stanleycup' + category_matches[1];
                    }else if (path.indexOf('/hockeynightincanada/') != -1){
                        ad_tags.ad_category = 'hockeynightincanada';
                    }else if (path.match(/\/([A-Za-z\-]+)votes([0-9]*)\//) !== null){
                        category_matches = path.match(/\/([A-Za-z\-]+)votes([0-9]*)\//);
                        ad_tags.ad_category = category_matches[1] + 'votes' + category_matches[2];
                    }else if (path.match(/\/greycup([0-9]+)\//) !== null){
                        category_matches = path.match(/\/greycup([0-9]+)\//);
                        ad_tags.ad_category = 'greycup' + category_matches[1];
                    }else if (path.indexOf('/olympics/') != -1) { ad_tags.ad_category = 'olympics'; }
                    else if (path.indexOf('/ourgame/') != -1) { ad_tags.ad_category = 'ourgame'; }
                    else if (path.indexOf('/testthenation/') != -1) { ad_tags.ad_category = 'testthenation'; }
                    else if (path.indexOf('/forums/') != -1) { ad_tags.ad_category = 'forums'; }
                    else if (path.indexOf('/photogallery/') != -1 || path.indexOf('/photogalleries/') != -1) { ad_tags.ad_category = 'photogallery'; }
                    else if (path.indexOf('/blogs/') != -1) { ad_tags.ad_category = 'blogs'; }
                }
                //check if ad_zone starts with number or contains a number following a slash or contains whitespace (not allowed)
                if (ad_tags.ad_zone !== null){
                    ad_tags.ad_zone = ad_tags.ad_zone.replace(/\s+/g,'');
                    if (ad_tags.ad_zone.match(/^[0-9]|\/[0-9]/) !== null) {ad_tags.ad_zone = null; ad_tag_flags.zone_is_set=false;}
                }
                //check if values in key value pairs contain spaces and replace with %20
                if (ad_tags.ad_section !== null) { ad_tags.ad_section = ad_tags.ad_section.replace(/\s+/g,'%20'); }
                if (ad_tags.ad_category !== null) { ad_tags.ad_category = ad_tags.ad_category.replace(/\s+/g,'%20'); }
                if (ad_tags.ad_page_type !== null) { ad_tags.ad_page_type = ad_tags.ad_page_type.replace(/\s+/g,'%20'); }
                if (ad_tags.content_category !== null) { ad_tags.content_category = ad_tags.content_category.replace(/\s+/g,'%20'); }
                
                //set defaults if still null
                ad_tags.ad_site =(ad_tags.ad_site===null && ad_tag_flags.site_is_set===false)?sites[sites.length-1]:ad_tags.ad_site;
                ad_tags.ad_zone =(ad_tags.ad_zone===null && ad_tag_flags.zone_is_set===false)?mapping[mapping.length-1][mapping[mapping.length-1].length-1]:ad_tags.ad_zone;
                
                //format ad_zone and ad_section to drop into ad tag
                if (ad_tags.ad_zone !== null) {
                    ad_tags.ad_zone = ad_tags.ad_zone.replace(/^\//,'');
                    ad_tags.ad_zone = ad_tags.ad_zone.replace(/\/$/,'');
                }
                if (ad_tags.ad_section !== null) {
                    ad_tags.ad_section = ad_tags.ad_section.replace(/^\//,'');
                    ad_tags.ad_section = ad_tags.ad_section.replace(/\/$/,'');
                }
                
                //set ad variables
                advertising_site = ad_tags.ad_site;
                advertising_zone = ad_tags.ad_zone;
                advertising_section = ad_tags.ad_section;
                advertising_page_type = ad_tags.ad_page_type;
                advertising_category = ad_tags.ad_category;
                advertising_content_category = ad_tags.content_category;
                
                //set surround session
                var ss = this.readCookieProperty("cbca", "ss");
                if (ss !== "null") { advertising_surround_session = "srnd=" + ss + ";"; }
                if (ss == "null" && advertising_surround_session != "") { advertising_surround_session = "srnd=" + advertising_surround_session + ";"; }
            },
            findAdTags : function(o){
                var flags = o.flags;
                var path = o.path;
                var tagz = o.tagz;
                for (var i=0; i < mapping.length; i++){
                    for (var j=0; j < mapping[i].length; j++){
                        if (path.indexOf(mapping[i][j]) != -1){
                            tagz.ad_site = (flags.site_is_set === false)?sites[i]:tagz.ad_site; 
                            tagz.ad_zone = (flags.zone_is_set === false)?mapping[i][j]:tagz.ad_zone;
                            tagz.ad_section = (flags.section_is_set === false)?tagz.ad_zone.replace(/\//g, ""):tagz.ad_section;
                            var testslashinzone = tagz.ad_zone.replace(/^\//,'').replace(/\/$/,'').split("/");
                            if (testslashinzone.length > 1) {
                                if (flags.zone_is_set === false) { tagz.ad_zone = testslashinzone[0]; }
                                if (flags.section_is_set === false) { tagz.ad_section = testslashinzone[0]; }
                                if (flags.category_is_set === false) { tagz.ad_category = testslashinzone[1]; }
                            }
                            return tagz;
                        }
                    }
                }
                return tagz;
            },
            createCookie: function(name,value,days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
                }
                document.cookie = name+"="+value+expires+"; path=/";
            },
            readCookie: function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)===' ')  { c = c.substring(1,c.length); }
                    if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
                }
                return null;
            },
            eraseCookie: function(name) {
                this.createCookie(name,"",-1);
            },
            getObjectFromCookie: function(cookiename) {
                var pair;
                var obj = {};
                var str = this.readCookie(cookiename);
                if (!str) { return null; }
                str = str.split("&");
                for (var i=0; i<str.length;i++) {
                    pair = str[i].split("=");
                    pair[0] = pair[0].replace(/\s/,"");
                    obj[pair[0]] = pair[1];
                }
                return obj;
            },
            objToQueryString: function(obj) {
                var qs = "";
                var i = 0;
                for (var key in obj) {
                    if(typeof obj[key] !== 'function') {
                        if (i>0) { qs+="&"; }
                        qs+= (key+"="+obj[key]);
                        i++;
                    }
                }
                return qs;
            },
            changeCookieProperty: function(name, property, value){
                if (!this.readCookie(name)) {
                    this.createCookie(name, property+"="+value+";");
                    return;
                }
                var obj = this.getObjectFromCookie(name);
                obj[property] = value;
                var newvalue = this.objToQueryString(obj);
                this.createCookie(name, newvalue);
            },
            readCookieProperty: function(name, property){
                var value = this.readCookie(name);
                if (!value) { return "null"; }
                var obj = this.getObjectFromCookie(name);
                return obj[property];
            },
            parseExclusions:function( exclusions ) {
                var tags        = exclusions.split( ',' ),
                    parsedTags  = '';
                    
                while( tags.length ) {
                    var tag     = tags.shift();
                    parsedTags  += '!c=' + tag + ';'; 
                }
                
                return parsedTags;
            },
            displayAd : function(bustCache) {
				var dcopt = (advertising_size === "300x250" || advertising_size === "300x250,300x600")?"":advertising_dcopt;
                document.write('<script language="JavaScript" src="http://ad.doubleclick.net/N5876/adj/'+ advertising_site + '/' + advertising_zone + ';pos='+advertising_position+';' + dcopt + 'tile='+advertising_tile+';sz='+advertising_size+';page='+ advertising_page_type +';section='+advertising_section+';category='+advertising_category+';'+((advertising_content_category) ? 'contcat='+advertising_content_category+';' : '')+advertising_keyword+advertising_surround_session+advertising_exclusions+'ord=' + ord + ((bustCache) ? ';cb='+this.generateRandomNum() : '') + '?" type="text/javascript"><\/script>');
            },

            // functions for manipulating the big box ---------------------------------------------------------------------------------
            iframeSrcParse : function () {
                // parse variables that have been passed to iframe
                try {
                                    advertising_dcopt = q.match(/addcopt=([^&]*)/);
                    advertising_content_category = q.match(/contcat=([^&]*)/);
                    advertising_surround_session = "";
                    advertising_keyword = "";
                    ord = q.match(/ord=([0-9]+[^&])/);
                    active_zone = q.match(/activezone=([0-9A-Za-z]+[^&]*)/);
                    advertising_site = q.match(/adsite=([0-9A-Za-z\.]+[^&]*)/);
                    advertising_zone = q.match(/adzone=([0-9A-Za-z\/]+[^&]*)/);
                    advertising_section = q.match(/adsection=([0-9A-Za-z\/]+[^&]*)/);
                    advertising_category = q.match(/adcategory=([0-9A-Za-z\/]+[^&]*)/);
                    advertising_page_type = q.match(/adpagetype=([0-9A-Za-z]+[^&]*)/);
                    advertising_position = q.match(/pos=([0-9A-Za-z]+[^&]*)/);
                    advertising_tile = q.match(/tile=([0-9]+[^&])/);
                    advertising_exclusions = q.match(/adexclusions=([0-9A-Za-z,!=]+[^&]*)/);

                    ord = (ord === null) ? this.generateOrdValue() : ord[1];
                    active_zone = (active_zone === null)?undefined:active_zone[1];
                                    if(advertising_dcopt !== null) {
                                        advertising_dcopt = (advertising_dcopt[1] === "dcopt=ist;") ? advertising_dcopt[1]:"";
                                    } else {
                                        advertising_dcopt = "dcopt=ist;";
                                    }
                    advertising_site = (advertising_site === null)?"cbc.ca":advertising_site[1];
                    advertising_zone = (advertising_zone === null)?"nozone":advertising_zone[1];
                    advertising_page_type = (advertising_page_type === null)?"story":advertising_page_type[1];
                    advertising_section = (advertising_section === null)?"null":advertising_section[1];
                    advertising_category = (advertising_category === null)?"null":advertising_category[1];
                    advertising_content_category = (advertising_content_category === null)?null:advertising_content_category[1];
                    advertising_position = (advertising_position === null)?"null":advertising_position[1];
                    advertising_tile = (advertising_tile === null) ? this.getNextAdTileValue() : advertising_tile[1];
                    advertising_exclusions = (advertising_exclusions === null)?"":advertising_exclusions[ 1 ];
                    
                    //set surround session
                    var ss = Ads.readCookieProperty("cbca", "ss");
                    if (ss != "null") { advertising_surround_session = "srnd=" + ss + ";"; }
                    if (ss == "null" && advertising_surround_session != "") { advertising_surround_session = "srnd=" + advertising_surround_session + ";"; }
                }catch(e){}
            },
            defaultAdVars : function() {
                var ord = this.generateOrdValue();
                if(advertising_site == "undefined") { advertising_site = "cbc.ca"; }
                if(advertising_zone == "undefined") { advertising_zone = "nozone"; }
                if(advertising_page_type == "undefined") { advertising_page_type = "story"; }
                if(advertising_section == "undefined") { advertising_section = "null"; }
                if(advertising_category == "undefined") { advertising_category = "null"; }
                if(advertising_dcopt == "undefined") { advertising_dcopt = "dcopt=ist;"; }
                if(advertising_content_category == "undefined") { advertising_content_category = "null"; }
                if(advertising_keyword == "undefined") { advertising_keyword = ""; }
                if(advertising_surround_session == "undefined") { advertising_surround_session = ""; }
                if(advertising_exclusions == "undefined" ) { advertising_exclusions = ""; }
            },
            setAdType : function(type) {
                adType = type;
            },
            getAdType : function() {
                return adType;
            },
            areCompanionAdsEnabled : function() {
                if(adType === 'takeover') {
                    return false;
                } else {
                    return true;
                }
            },
            registerWidget : function(widgetType) {
                widgets[widgetType] = widgetPriority[widgetType];
            },
            getNextAdTileValue : function() {
                var tileVal = 1;

                Ads.getNextAdTileValue = function() {
                    if(arguments.length > 0) {
                        tileVal = arguments[0];
                    }
                    return tileVal++;
                };

                return tileVal++;

            },
            generateRandomNum : function() {
                return Math.floor(Math.random() * 10000000000000000);
            },
            generateOrdValue : function() {
                ord = this.generateRandomNum();
                return ord;
            },
            getOrdValue : function() {
                return ord;
            },
            getBigBoxParams : function() {
                var adqueryparams = {};
                if(ord !== null) { adqueryparams.ord = ord; }
                if(advertising_site !== null) { adqueryparams.adsite = advertising_site; }
                if(advertising_zone !== null) { adqueryparams.adzone = advertising_zone; }
                if(advertising_section !== null) { adqueryparams.adsection = advertising_section; }
                if(advertising_category !== null) { adqueryparams.adcategory = advertising_category; }
                if(advertising_content_category !== null) { adqueryparams.contcat = advertising_content_category; }
                if(advertising_page_type !== null) { adqueryparams.adpagetype = advertising_page_type; }
                            if(advertising_dcopt !== null) { adqueryparams.addcopt = advertising_dcopt; }
                adqueryparams.tile = this.getNextAdTileValue();
                adqueryparams.pos = 'tobpox';
                if(advertising_exclusions !== null) { adqueryparams.adexclusions = advertising_exclusions; }
                
                return adqueryparams;
            },
            displayBigBox : function() {

                var query = this.buildFrameQueryString(this.getBigBoxParams());

                document.write('<div id="bigboxwrap"><iframe id="'+bigBoxIframeID+'" src="'+bigBoxLoader+query+'" scrolling="no" width="300" height="250" frameborder="0"><\/iframe></div>');
            },
            buildFrameQueryString : function(params) {
                var adquery = '';
                var paramCount = 0;
                var delimiter;
                for(var n in params) {
                    if(typeof params[n] !== 'function') {
                        if(paramCount < 1) {
                            delimiter = '?';	
                        } else {
                            delimiter = '&';
                        }
                        if(params[n] !== null) {
                            adquery += delimiter+n+'='+params[n];
                        }
                        paramCount++;
                    }
                }
                return adquery;
            },
            getHighestPriorityWidget : function() {
                
                // widget name
                var widget = null;

                // assign high number to priority tracking var (lower numbers are higher priority).
                var highestPriority = Number.MAX_VALUE;

                // iterate over widget priority levels
                for (var x in widgets) {
                    // if current widget priority is less than the currently held highest
                    if(widgets[x] < highestPriority) {
                        // assign priority level to tracking var
                        highestPriority = widgets[x];
                        widget = x;
                    }
                }

                return widget;
            },
            refreshBigBox : function(widgetType) {

                // must determine priority level of widget 
                // attempting to change the big bog.

                // currently, the embedded player has highest priority
                // and image gallery widgets have second highest priority
                try {
                    var dartURL = null;
                    if(arguments.length > 1) {
                        dartURL = arguments[1];
                    }

                    // if the priority level of the current requesting widget matches the current highest priority of all widgets
                    // and the page is not in take over mode
                    var highest = this.getHighestPriorityWidget();
                    if(highest !== null && widgetType === highest && adType !== 'takeover') {
                      var bboxwrap = document.getElementById(bigBoxIframeContainerID);
    			      var f = document.createElement('iframe');
                      if(!dartURL){
	                    this.generateOrdValue();
                        var query = this.buildFrameQueryString(this.getBigBoxParams());
                        f.src = bigBoxLoader + query;
                      } else{
                        f.src = dartURL;
                      }
                      f.width='300'; f.scrolling='no'; f.height='250'; f.frameBorder=0;
                      bboxwrap.innerHTML = '';
                      bboxwrap.appendChild( f );
                    }
                } catch (e) {} 
            },
            refreshBigBoxWithContent : function(widgetType) {

                // must determine priority level of widget 
                // attempting to change the big box.

                // currently, the embedded player has highest priority
                // and image gallery widgets have second highest priority
                try {
                    var dartContent = null;
                    if(arguments.length > 1) {
                        dartContent = arguments[1];
                    }

                    // if the priority level of the current requesting widget matches the current highest priority of all widgets
                    // and the page is not in take over mode
                    var highest = this.getHighestPriorityWidget();
                    if(highest !== null && widgetType === highest && adType !== 'takeover') {
						var bboxwrap = document.getElementById(bigBoxIframeContainerID);
						var bbox = document.getElementById(bigBoxIframeID);
                        if(dartContent !== null) {
						   bboxwrap.innerHTML = dartContent;
                        } else {
                            this.generateOrdValue();
                            var query = this.buildFrameQueryString(this.getBigBoxParams());
                            bbox.src = bigBoxLoader + query;
                        }
                    }
                } catch (e) {} 
            },
            setBigBoxIframeHeight : function(height) {
                try {
                    var bb = document.getElementById(bigBoxIframeID);
                    bb.style.height = height + 'px';	
                    var adDivParent = document.getElementById('advert300x250');
                    var adDiv = adDivParent.getElementsByTagName('div')[0];
                    adDiv.style.height = height + 'px';
                } catch(e) {}
            },
            setBigBoxHeight : function(height) {
                this.bigBoxHeight = height;
            },
            getBigBoxHeight : function() {
                return this.bigBoxHeight;
            }
        };
    }();
    Ads.init();
}
