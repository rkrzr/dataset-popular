if(!CBC) { var CBC = {}; }
if(!CBC.APP) { CBC.APP = {}; }
if(!CBC.APP.SC) { CBC.APP.SC = {}; }
CBC.APP.SC.PageTracker = function() {
	var $SC = null;
	var $P = [];
	var $SCU = CBC.APP.SC.UTIL;
	$P.statsflags = {}; //indicates which variables need to be defined
	$P.channel = "misc"; //stores the stats channel of current page
	$P.subsection = []; //stores the stats subcategories of the current page
	$P.pageurl = ""; //stores the trimmed page url
	$P.searchprefix = "";
	$P.separator = ":";
	$P.index = "index";
	$P.contenttype = "page";
	$P.pagetype = "";
	$P.pagetitle = "";
	$P.scqs = {};
	$P.directory = "";
	$P.pageName = null;
	$P.hier1 = null;

	// event is broadcast when pageName is set
	var scEvents = function() {
		var subscribers = [];
		return {
			init:function() {
				var continueExection = true;
				subscribers = [];

				$SCU.createInterval(
					function() {
						if($P.pageName !== null) {
							for(var i = 0; i < subscribers.length; i++) {
								subscribers[i]();
								continueExection = false;
							}
						}
					},
					500, // interval
					20,  // max number of executions
					function() { return continueExection; }
				);
			},
			subscribe : function(callback) {
				subscribers.push(callback);
			}
		};
	}();
	//sort root folders by stats channel 
	var _misc = [
		{dir:"contests", sc:["contests"]},
		{dir:"artspots"},
		{dir:"independentproducers"},
		{dir:"itunes"},
		{dir:"ombudsman"},
		{dir:"permissions"},
		{dir:"pitch"},
		{dir:"programsales"},
		{dir:"radiocommissions"},
		{dir:"screechhollow"},
		{dir:"services"},
		{dir:"slideshow"},
		{dir:"stillphoto"},
		{dir:"tvfacilities"},
		{dir:"programguide"},
		{dir:"designlibrary"},
		{dir:"asianheritage", sc:["factual"]},
		{dir:"widgets"}
	];
	var _sports = [
		{dir:"canadiens", sc:["hockey"]},
		{dir:"torchrelay", sc:["olympics"]},
		{dir:"olympics", sc:["olympics"]}
	];
	var _news = [
		{dir:"aboriginal", sc:["aboriginal"]},
		{dir:"nunnonone", sc:["politics"]},
		{dir:"thehouse", sc:["politics"]},
		{dir:"albertapolitics", sc:["politics"]},
		{dir:"ottawablog", sc:["regions", "ottawa"]},
		{dir:"stormcentre", sc:["weather"]},
		{dir:"crossroads-afghanistan"},
		{dir:"joandonaldsonscholars"},
		{dir:"weather"},
		{dir:"freeheadlines", sc:["syndication"]},
		{dir:"marketplace", sc:["consumerlife"]},
		{dir:"smartshift", sc:["business"]},
		{dir:"amberalert"},
		{dir:"newsatsixcalgary", sc:["tv","regions","calgary"]},
		{dir:"vancouverlatenight",sc:["tv","regions","vancouver"]},
		{dir:"vancouverweekend", sc:["tv","regions","vancouver"]},
		{dir:"landandsea", sc:["tv","regions","newfoundland"]},
		{dir:"landandseanl", sc:["tv","regions","newfoundland"]}
	];
		var _radio = [
		{dir:"w6", sc:["news"]},
		{dir:"winschgaoug", sc:["news"]},
		{dir:"worldthishour", sc:["news"]},
		{dir:"worldthisweekend", sc:["news"]},
		{dir:"asithappens", sc:["radio1", "news"]},
		{dir:"podcasting", sc:["podcasting"]},
		{dir:"radiosummer", sc:["radio1"]},
		{dir:"checkup", sc:["radio1","currentaffairs"]},
		{dir:"white_coat_black_art", sc:["radio1","entertainment"]},
		{dir:"day_6", sc:["radio1","entertainment"]},
		{dir:"dispatches", sc:["radio1", "news", "world"]},
		{dir:"themorningshow", sc:["radio1"]},
		{dir:"thenextchapter", sc:["radio1"]},
		{dir:"apropos", sc:["radio1"]},
		{dir:"thesingerandthesong", sc:["radio2"]},
		{dir:"books"},
		{dir:"canadaday"},
		{dir:"frequency"},
		{dir:"gzowskiinternships"},
		{dir:"listen"},
		{dir:"qms"},
		{dir:"radio2"},
		{dir:"radioshows"},
		{dir:"sirius"},
	];
	var _tv = [
	  {dir:"beingalone",sc:["bold","entertainment"]},
	  {dir:"remember"},
	  {dir:"bold"}
	];
	var _kids = [
		{dir:'parents'}
	];
	var _programguide = [
		{dir:"programschedule"}
	];
	//channel:misc, sc1:corporate
	var _corporate = ["facilities", "faq", "help", "museum", "thefacts", "amberalert", "contact",'ombudsman','permissions','programsales'];
	
	// channel:news, sc1:tv
	var _tvnews = ["fifth", "morning", "thenational", "weekends", "connect", "mansbridge", "national"];
	
	// channel:tv, sc1:"factual"
	var _tvfactual = ["ccma","chinarises", "geologic", "nextprimeminister", "projectx", "testthenation", "thewomenwent", "triplesensation", 
	"halifaxcomedyfest", "bestrecipes", "dragonsden", "stevenandchris", "superspeller", "thehour", "atthetable", "fashionfile", "geologic",
	"maria", "roadshow", "wheeloffortune"];

	// channel:tv, sc1:documentaries
	var _tvdocumentaries = ["oneocean", "history", "natureofthings", "documentarychannel", "doczone", "greatwar", "passionateeyemonday", "passionateeyesunday"];
	
	// channel:tv, sc1:"entertainment"
	var _tvent = ["battle", "coronation", "doctorwho", "heartland", "justforlaughs", "kidsinthehall", "littlemosque", "loveletters",
	"mercerreport", "reflections", "republicofdoyle", "ronjames", "theborder", "trojanhorse", "tudors", "winnipegcomedy",
	"h2o", "18tolife", "22minutes", "beingerica", "holiday", "wildroses","rickmercer","download"];
	
	// channel:news, sc1:"tv", sc2:"regions"
	var _regionaltvnews = ["newsatsix", "newsatsixnb", "newsatsixns", "newssaskatchewan", "northbeat", "iteam", "compass",
	"cbcnewstoronto", "tvnewsmontreal", "tvnewsvancouver","tvnewsmontreal",
	"tvnewsottawa", "tvnewsvancouver", "vancouverlatenight", "vancouverweekend", "igalaaq" ,"maamuitaau","newsatsixmontreal","newsatsixottawa",
	"newsatsixpei","newsatsixtoronto","newsatsixwindsor"];
	
	// channel:radio, sc1:"radio1", sc2:"news", sc3:"regions"
	var _regionalradio1news = ["airplay", "allinaday", "allinaweekend", "allpointswest", "allthebest", "anewday", "atlanticairwave", "breakaway",
	"bcalmanac", "connections", "crosstown", "daybreak", "daybreakalberta", "daybreakmaritimes", "daybreakmontreal", "daybreaknorth",
	"daybreaksouth", "denedayalti", "earlyedition", "edmontonam", "eyoudipajimoon", "fisheriesbroadcast", "homerun", "informationmorning",
	"mainstreet", "mainstreetpei", "metromorning", "nipivut", "northwind", "ontariotoday", "onthecoast", "onthego", "ontheisland", "ottawamorning",
	"overnight", "quebecam", "qulliq", "radioactive", "radionoonmontreal", "thecentralmorningshow", "thetrailbreaker", "theweekender",
	"thewestcoastmorningshow", "tidegodi", "trailsend", "tusaavik", "tuttavik", "uptospeed", "wildrose"," deneyati", "radionoon", "cinqasix",
	"hereandnow","hereandnownl","hereandnowtoronto"];
	
	// channel:radio, sc1:"radio1", sc2:"entertainment"
	var _regionalradio1ent = ["performancehour","bandwidth","earlier","freshair","keewatincountry", "keyofa", "legotshedeh" ,"musicraft", "nantaii",
	"northcountry", "northernair", "nxnw", "weekendmornings", "wiretap", "hotair", "wam", "afghanada"];
	
	
	// channel:radio sc1:"radio1", sc2:"entertainment", sc3:""
	var _radio1ent = ["definitely_not_the_opera","go","irrelevantshow","laughoutloud","minorityreport","monsoonhouse","q","rootsandwings","snb",
	"vinyltap", "socket", "sundayrequestshow", "talkingbooks", "tausunni", "thedebaters", "rootsandwings", "the_sunday_edition"];
	
	// channel: radio sc1:"radio1", sc2:"currentaffairs", sc3:""
	var _radio1currentaffairs = ["living_out_loud","cest_la_vie","tapestry","ideas","in_the_field","quirks","spark","the_current","the_story_fromh_ere"];
	

	var _channels = ["news",  "tv",   "tv",       "tv", "radio",       "radio", "radio",    "misc", "radio",                "radio",            "radio",             "news",          "news", "sports", "misc",     "tv",           'kids', 'programguide']; //channels map one to one with mapping below
	var _mapping =  [_tvnews, _tvent, _tvfactual, _tv, _radio1currentaffairs, _radio,  _radio1ent, _misc, _regionalradio1ent, _regionalradio1news, _regionaltvnews, _news,  _sports,  _corporate, _tvdocumentaries, _kids,  _programguide]; //order matters (listed as most popular to least popular to increase search efficiency
	var _commonsc = []; //stores the common subcategories
	return{
		init : function(){
			if (s_cbc_sitecatalyst){ $SC = s_cbc_sitecatalyst; }
			else { return;}
			if (CBC.APP.SC.ptinit && CBC.APP.SC.ptinit == "false") {return;}
			scEvents.init();

			// server & local time info
			var obj = {};
			obj = this.getTimeVars();
			if (typeof(obj.var8) != "undefined") { $SC.prop8 = $SC.eVar8 = obj.var8; }
        		if (typeof(obj.var9) != "undefined") { $SC.prop9 = $SC.eVar9 = obj.var9; }
        		if (typeof(obj.var10) != "undefined") { $SC.prop10 = $SC.eVar10 = obj.var10; }

			this.setSearchPrefix();
			if (CBC.APP.SC.QueryString){
				$P.scqs = this.queryStringToObj(CBC.APP.SC.QueryString);
				if(!$P.pagetitle) {
					$P.pagetitle = (!!$P.scqs.pagetitle) ? $P.scqs.pagetitle : '';
				}
                // if(!!$P.scqs.suite) {
                //  $SC = $SCU.getSCInstance($P.scqs.suite);
                // }
				this.getUrl();
				this.parseStatsVars();
			}
			else { 
				this.getUrl();
				this.checkIfSet();
			}
			//else this.setDefaults();
			try {
				CBC.APP.SC.LinkTracker.globalLinkTracking();
			} catch(e) {}
		},
		parseStatsVars : function (){ //page owners use vars.html to hardcode sc values
			//assuming channel and type are required
			$P.channel = $P.scqs.contentarea; //used to construct page name
			$SC.channel = $P.channel;
			$P.subsection = [];
			var j; // loop index

			if($P.scqs.contenttype)
			{ $P.contenttype = $P.scqs.contenttype;} //used to construct page name
			$SC.prop4 = $P.contenttype;

			for(j = 1; j <= 4; j++) {
				if ($P.scqs['subsection'+j]) {$P.subsection.push($P.scqs['subsection'+j]); }
			}

			this.setBlogVars();

			$SC.pageName = this.setPageName();
			$SC.hier1 = $P.hier1;

			this.setSubsectionVars();

			$SC.prop14 = this.removeDomain($P.pageurl);
			$SC.eVar14 = $P.pageurl;

			$SC.prop15 = this.getUserSegmentation();
			
			this.registerPageView();
		},
		
		makeTwoDigits : function (n){
			return (typeof n === 'number') ? ('0' + n).slice(-2) : null;
		}, 

		getFourDigitsTime : function (dt){			
			return  (dt && typeof dt.getHours === 'function') ? this.makeTwoDigits(dt.getHours())  + this.makeTwoDigits(dt.getMinutes()) : null;
		},

		getlocalTimeZone : function (dt){
			var localTimeZone = (dt && typeof dt.getTimezoneOffset === 'function') ? -dt.getTimezoneOffset()/60 : null;

			return localTimeZone;
		},

		getTimePartingInfo : function (dt, tz){
			
			return (dt && tz && typeof dt.getHours === 'function' && typeof tz === 'number') ? $SC.getTimeParting('w',tz) + '|' + $SC.getTimeParting('d',tz) + '|' + this.makeTwoDigits(dt.getHours()) + ((dt.getMinutes() > 30) ? '30' : '00') : null;
			
		},

		getTimeVars : function() {
			
			var  obj = {},
		   	     localTime = new Date(),
			     localTimeZone = this.getlocalTimeZone(localTime);
				
	        	obj.var8 = this.getFourDigitsTime(localTime);
    	    	        obj.var9 = this.getFourDigitsTime(localTime) + "|" + localTimeZone; 
        		obj.var10 = $SC.getTimeParting('w',localTimeZone) + '|' + $SC.getTimeParting('d',localTimeZone) + '|' + ('0' + localTime.getHours()).slice(-2) + ((localTime.getMinutes() > 30) ? '30' : '00');
			
				return obj;
		},

		setBlogVars : function() {
			if($P.scqs.blogauthor) { $SC.prop25 = $P.scqs.blogauthor;}
			if($P.scqs.title) { $SC.prop27 = $P.scqs.title;}
			if($P.scqs.blogname) { $SC.prop26 = $P.scqs.blogname; $P.subsection.push($P.scqs.blogname); }
			if($P.scqs.blogentrydate) { $SC.prop28 = $P.scqs.blogentrydate; }
		},

		checkIfSet : function (){ //check which stat variables have been set before anything is done
			
			if (typeof($SC.channel) == "undefined") { $P.statsflags.channel = false; } else { $P.statsflags.channel = true; }
			if (typeof($SC.prop1) == "undefined") { $P.statsflags.prop1 = false; } else { $P.statsflags.prop1 = true; }
			if (typeof($SC.prop2) == "undefined") { $P.statsflags.prop2 = false; } else { $P.statsflags.prop2 = true; }
			if (typeof($SC.prop3) == "undefined") { $P.statsflags.prop3 = false; } else { $P.statsflags.prop3 = true; }
			if (typeof($SC.prop4) == "undefined") { $P.statsflags.prop4 = false; } else { $P.statsflags.prop4 = true; }
			if (typeof($SC.prop14) == "undefined") { $P.statsflags.prop14 = false; } else { $P.statsflags.prop14 = true; }
			if (typeof($SC.eVar14) == "undefined") { $P.statsflags.eVar14 = false; } else { $P.statsflags.eVar14 = true; }
			if (typeof($SC.prop15) == "undefined") { $P.statsflags.prop15 = false; } else { $P.statsflags.prop15 = true; }
			if (typeof($SC.pageName) == "undefined") { $P.statsflags.pageName = false; } else { $P.statsflags.pageName = true; }
			if (typeof($SC.hier1) == "undefined") { $P.statsflags.hier1 = false; } else { $P.statsflags.hier1 = true; }
				
			this.setCommonSubcategories();
		},
		setCommonSubcategories : function(){
			_commonsc[0] = ["tv"];  //tvnews
			_commonsc[1] = ["entertainment"]; //tvent
			_commonsc[2] = ["factual"]; //tvfactual
			_commonsc[4] = ["radio1", "currentaffairs"]; //radio1currentaffairs
			_commonsc[6] = ["radio1", "entertainment"]; //radio1ent
			_commonsc[8] = ["radio1", "factual"]; //regionalradio1factual
			_commonsc[9] = ["radio1", "entertainment"]; //regionalradio1ent
			_commonsc[10] = ["radio1", "news","regions"]; //regionalradio1news
			_commonsc[11] = ["tv", "regions"]; //regionaltvnews
			_commonsc[14] = ["corporate"]; //regionaltvnews
			_commonsc[15] = ["documentaries"]; //regionaltvnews
			this.getStatsVars();
		},
		getUrl : function(){
			var path = '';

			if(!$P.scqs.url) {
				path = window.location.href;
			} else {
				path = decodeURIComponent($P.scqs.url);
			}
			
			//search for hash and remove
			var hsh = path.indexOf("#");
			if (hsh != -1) { path = path.substring(0, hsh); }

			//search for query string and remove
			var qs = path.indexOf("?");
			if (qs != -1) { path = path.substring(0, qs); }
			
			$P.pageurl = path;
		},
		removeDomain : function(url) {
			return url.replace(/http:\/\/.*?cbc\.ca(:.*?)*\//,'');
		},
		getStatsVars : function(){
			var mapDirExists = false;
			var subject = '';
			var matches = null;
			for (var i=0; i < _mapping.length; i++){
				for (var j=0; j < _mapping[i].length; j++){
					if (!!_mapping[i][j].dir){ //array contains objects CASE 1 
						subject = $P.searchprefix+_mapping[i][j].dir;
						matches = $P.pageurl.match(subject+'/(.*)$');
						if (matches){ //match found
							$P.directory = _mapping[i][j].dir;
							$P.channel = _channels[i]; //assign channel
							if (_mapping[i][j].sc){
								for (var k=0; k < _mapping[i][j].sc.length; k++){
									$P.subsection.push(_mapping[i][j].sc[k]); //assign subcategories
								}
							}
							this.setStatsVars();
							return;
						}
					}else{ //array contains strings CASE 2
						subject = $P.searchprefix+_mapping[i][j];
						matches = $P.pageurl.match(subject+'/(.*)$');
						if (matches){ //match found
							$P.directory = _mapping[i][j];
							$P.channel = _channels[i]; //assign channel
							for (var l=0; l < _commonsc[i].length; l++){
								$P.subsection.push(_commonsc[i][l]); //assign subcategories
							}
							this.setStatsVars();
							return;
						}
					}
				}
			}//no match found
			this.setDefaults();
		},
		setStatsVars : function(){ //run if match is found
			if (!$P.statsflags.pageName) { 
				
				$SC.pageName = this.setPageName();

			}
			if (!$P.statsflags.channel) { $SC.channel = $P.channel; } //channel
			this.setSubsectionVars();
			if (!$P.statsflags.prop4) { $SC.prop4 = $P.contenttype; } //content type
			if (!$P.statsflags.prop14) { $SC.prop14 = this.removeDomain($P.pageurl); } 
			if (!$P.statsflags.eVar14) { $SC.eVar14 = $P.pageurl; } 
			if (!$P.statsflags.hier1) { $SC.hier1 = $P.hier1; } 
			if(!$P.statsflags.prop15) { $SC.prop15 = this.getUserSegmentation(); }
			this.registerPageView();
		},

		setSubsectionVars : function() {
			for(var j = 0; j < 3; j++) {
				if(!!$P.subsection[j]) {
					var subSlice = $P.subsection.slice(0,j+1);
					$SC['prop'+(j+1)] = $P.channel + ':' +  subSlice.join(':');
				}
			}
		},

		setDefaults : function(){//run if match is not found
			if (!$P.statsflags.pageName) { 
				
				$SC.pageName = this.setPageName();

			}
			if (!$P.statsflags.channel) { $SC.channel = $P.channel; } 
			if (!$P.statsflags.prop1) { $SC.prop1 = ""; } 
			if (!$P.statsflags.prop2) { $SC.prop2 = ""; } 
			if (!$P.statsflags.prop3) { $SC.prop3 = ""; } 
			if (!$P.statsflags.prop4) { $SC.prop4 = $P.contenttype; } //content type
			if (!$P.statsflags.prop14) { $SC.prop14 = this.removeDomain($P.pageurl); } 
			if (!$P.statsflags.eVar14) { $SC.eVar14 = $P.pageurl; } 
			if(!$P.statsflags.prop15) { $SC.prop15 = this.getUserSegmentation(); }
			this.registerPageView();
		},
		buildPageName : function() {

			var subsection = $P.subsection.join($P.separator);
			var elements = [];

			if(arguments.length > 0) { elements = $SCU.arrayFromArguments(arguments); } 
			if(!!elements[0] && $SCU.typecheck(elements[0]).array && elements[0].length > 0) { elements = elements[0]; }

			if($P.subsection.length > 0) { elements.splice(0,0,subsection); } 
			elements.splice(0,0,$P.channel);

			var pageName;

			if(CBC.APP.SC.PageTracker.objEmpty($P.scqs) && !$P.directory) {
				pageName = 'misc:'+$P.pageurl.replace(/:/g,'-');
			} else {
				pageName = elements.join($P.separator);
			}

			return pageName;
		},
		getPageName : function() {
			return $P.pageName;
		},
		setPageName : function(){
			
			//format of pageName is "channel:subsection:subsection:subsection:contenttype";

			if($P.contenttype !== "page") {
				if ($P.contenttype == "story" && $P.scqs.title) { // story content type
					this.handleStory();
				} else if($P.contenttype == "videoclip" && $P.scqs.title) {
					this.handleVideoClip();
				} else if($P.contenttype == "error") {
					this.handleErrorPage();
				} else if($P.contenttype == "index") {
					this.handleIndexPage();
				} else if ($P.contenttype == "blog") { // blog content type
					this.handleBlog();
				} else if($P.contenttype === "photogallery" && !!$P.scqs.datapath) { // photo gallery
					this.handlePhotoGallery();
				} else if($P.contenttype === "imagegallery") {
					this.handleImageGallery();
				} else { // all other content types
					this.handleOtherContent();
				}
			} else if($P.contenttype === "page") { // page content type
				this.handleGenericPage();
			}

			return $P.pageName;

		},

		handleStory : function() {
			if(CBC.APP.SC.storyTitle) {
				$SC.prop5 = decodeURIComponent(CBC.APP.SC.storyTitle);
			}
			var storyDate = this.dateFromStoryUrl();
			$P.scqs.title = $P.scqs.title.replace(/\//g, "-"); 
			if(storyDate !== '' && this.oldStory(storyDate)) { // if the story date is greater than 1 year
				$P.pageName = this.buildPageName($P.contenttype,storyDate.getFullYear());
				$SC.prop11 = this.buildPageName($P.contenttype,$P.scqs.title);
			} else {
				$P.pageName = this.buildPageName($P.contenttype,$P.scqs.title);
				$SC.prop11 = $P.pageName;
			}
			$P.hier1 = this.getHierarchy();
		},

		handleVideoClip : function() {
			$P.pageName = this.buildPageName($P.contenttype,$P.scqs.title);
			$P.hier1 = this.getHierarchy();
		},

		handleErrorPage : function() {
			$SC.pageType = "errorPage";
			$P.pageName = this.buildPageName();
			$P.hier1 = this.getHierarchy();
		},

		handleIndexPage : function() {
			$P.pageName = this.buildPageName('index');
			$P.hier1 = this.getHierarchy();
		},

		handleBlog : function() {
			var args = [];
			var blogcategorypath;
			if(!!$P.scqs.blogcategorypath) {
				blogcategorypath = $P.scqs.blogcategorypath.split('/');
				args.push(blogcategorypath.join(':')); 
			} 
			if(!!$P.scqs.blogarchivetitle) { args.push($P.scqs.blogarchivetitle); } 
			if(!!$P.scqs.title) { args.push($P.scqs.title); } 
			if(!$P.scqs.blogarchivetitle && !$P.scqs.title) { args.push(this.getSubFoldersAndFile($P.scqs.blogurl || "")); }
			$P.pageName = this.buildPageName(args);
			$P.hier1 = this.getHierarchy();
			if(!!blogcategorypath) {
				for(var i = 0; i < blogcategorypath.length; i++) {
					$P.subsection.push(blogcategorypath[i]);
				}
			}
		},

		handlePhotoGallery : function() {
			var events = {
				'context':this,
				'failure':function(){$P.pageName = this.buildPageName();},
				'success':function(params) {
					var request = params[0];
					var xml = request.responseXML;
					var title = '';
					try {
						title = xml.getElementsByTagName('title')[0].firstChild.nodeValue;
					} catch(e) {}
					$P.pageName = this.buildPageName(title);
				}
			};
			CBC.UTIL.makeRequest($P.scqs.datapath,events,{});
			$P.hier1 = this.getHierarchy();
		},

		handleImageGallery : function() {
			var imageGalleryTitle = null;
			var continueExection = true;
			$SCU.createInterval(function() {
				try{
					imageGalleryTitle = CBC.APP.Imagegalleries[0].getGalleryTitle();
					$P.pageName = this.buildPageName(imageGalleryTitle);
				} catch(e) {}

				if(imageGalleryTitle !== null) {
					continueExection = false;
				}
			},
			500,
			10,
			function() { return continueExection; },
			function() { $P.pageName = this.buildPageName(); });
			$P.hier1 = this.getHierarchy();
		},

		handleOtherContent : function() {
			if(!!$P.contenttype){
				$P.pageName = this.buildPageName($P.contenttype);
			} else {
				$P.pageName = this.buildPageName();
			}
			$P.hier1 = this.getHierarchy();
		},

		handleGenericPage : function() {

			var args = [];

			if(this.objEmpty($P.scqs) && !!$P.directory) {
				args.push($P.directory);
				var subs = this.getSubFolders($P.directory);
				if(subs !== '') { args.push(subs); }
			}

			var currentFile = this.getCurrentFile();

			if(currentFile != 'cbc' && currentFile != 'web' && !$P.scqs.filename) {
				args.push(currentFile);
			}

			if(args.length > 0) {
				$P.pageName = this.buildPageName(args);
			} else {
				$P.pageName = this.buildPageName();
			}
			$P.hier1 = this.getHierarchy($P.directory);
		},

		getHierarchy : function(additional){
			if ($P.subsection.length === 0) { return ($P.channel); }
			var subsection = $P.subsection.join(",");
			var hier = $P.channel+","+subsection;

			if(!!additional) { hier += ',' + additional; }

			return hier;
		},
		registerPageView : function (){
			scEvents.subscribe(function() {
                                $SC.prop31 = '';
				$SC.pageName = $P.pageName;
				$SC.t();
			});
		},

		getSubFolders : function(dir) {
			var url = $P.pageurl;
			var regex = new RegExp(dir+"\/(.*)\/");
			var matches = url.match(regex);
			if(!!matches && matches.length == 2) {
				var subfolders = matches[1].replace('/',$P.separator);
				return subfolders;
			} else {
				return '';
			}
		},
		getCurrentFile : function() {
			var url = $P.pageurl;
			var filename = url.match(/.*\/([^?#]*)/)[1];
			return (filename !== '') ? filename : 'index.html';
		},
		getSubFoldersAndFile : function(fromFolder) {
			var url = $P.pageurl.toLowerCase();
			fromFolder = this.replaceFromList(fromFolder.toLowerCase(),[/blog\/$/,/content\/$/]);
			var regex = null;
			if(!!fromFolder) {
				regex = new RegExp(fromFolder+"([^#?]*)");
			} else {
				regex = new RegExp("https*:\/\/.*?\/([^#?]*)");
			}
			var filename = regex.exec(url)[1];
			filename = filename.replace(/\/$/g,'');
			filename = filename.replace(/\//g,':');
			return (filename !== '') ? filename : 'index.html';
		},
		replaceFromList : function(subject,list) {
			for(var idx = 0; idx < list.length; idx++) {
				if(subject.match(list[idx])) {
					subject = subject.replace(list[idx],'');
				}
			}
			return subject;
		},
		queryStringToObj : function (qs){
			var pairs = qs.split(/[;&]/);
			var obj = {};
			for (var i=0; i<pairs.length; i++) {
				var pair = pairs[i].split('=');
				var key = unescape(pair[0].toLowerCase());
				var val = unescape(pair[1]).replace(/\+/g, ' ');
				if (key.length > 0 && val.length > 0) {
					obj[key] = val;
				}
			}
			return obj;
		},
		getVal : function(privateParam){
			return $P[privateParam];
		},
		objEmpty : function(obj) {
			for (var x in obj) {
				if(typeof obj[x] !== 'function') {
					return false;
				}
			}
			return true;
		},
		setSearchPrefix : function() {
			if(window.location.port.length > 0) {
				$P.searchprefix = 'cbc.ca:'+window.location.port+'/';
			} else {
				$P.searchprefix = 'cbc.ca/';
			}
		},
		oldStory : function(date1) {
			var testDate = new Date();
			var currentYear = testDate.getFullYear();
			testDate.setFullYear(currentYear - 1);
			return date1 < testDate;
		},
		dateFromStoryUrl : function() {
			var retVal = '';

			try {
				var dateparts = /^.*story\/(\d{4}\/\d{2}\/\d{2}).*$/.exec(window.location.href)[1].split('/');
				retVal = new Date(dateparts[0],dateparts[1],dateparts[2]);
			} catch(e) {}

			return retVal;
		},
		createCookie: function(name,value,days) {
			var expires = '';
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
				while (c.charAt(0)===' ') { c = c.substring(1,c.length); }
				if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
			}
			return null;
		},
		getUserSegmentation : function() {
			var loginStatus = ((this.isLoggedIn()) ? 'loggedin' : 'anonymous');
			var commentor = ((this.isCommentor()) ? 'commentor' : '');
			return loginStatus + ((commentor !== '') ? ' | ' +  commentor : ''); 
		},
		isLoggedIn : function() {

			try {

				//checks to see if the current user is logged into the member center
				//via the "at" cookie. If the cookie is set, the user is logged in.

				if(!!this.readCookie('at')) {
					return true;
				} else {
					return false;
				}

			} catch(e) {
				return false;
			}
		},
		isCommentor : function() {
			try {
				var cbcLocal = decodeURIComponent(this.readCookie('cbclocal'));
				if(cbcLocal.indexOf('commentor=true') != -1) {
					return true;
				} else {
					return false;
				}
			} catch(e) {
				return false;
			}
		}
	};
}();
CBC.APP.SC.PageTracker.init();

if(YUI !== null && typeof YUI !== 'undefined') {

    YUI(_CBC_LOADER).use('node', 'event', 'cbc_core' ,function(Y,result) {
        if(result.success) {

            function byPartialClassName(className,parentEl) {
                var nodes = CBC.APP.SC.UTIL.getElementsByClassName(className,parentEl),
                    ynodes = [],
                    i = 0,
                    l = nodes.length;
                for(;i<l;i+=1) {
                    ynodes.push(new Y.Node(nodes[i]));
                }
                return new Y.NodeList(ynodes);
            }

            function isImageLoaded(impnode){
              if (Y.UA.ie > 0 && !impnode._node.complete){
                setTimeout(function(){isImageLoaded(impnode)}, 1000);
                return;
              }else if(Y.UA.ie == 0 && (impnode._node.naturalWidth == 0 || impnode._node.naturalHeight == 0)) {
                setTimeout(function(){isImageLoaded(impnode)}, 1000);
                return;
              }
              var positionLabel = impnode.getAttribute('class').replace(/^.*?scimp-(\w+).*$/g,'$1');
              if (s_cbc_sitecatalyst && CBC.APP.SC && CBC.APP.SC.QueryString && Y && Y.CBC && Y.CBC.Util){//send call if dependencies available
                var separator = ":";
                var subsection = [];
                var $U = new Y.CBC.Util();
                var _scqs = $U.queryStringToObj(CBC.APP.SC.QueryString);
                for(j = 1; j <= 4; j++) {
                  if (_scqs['subsection'+j])
                    subsection.push(_scqs['subsection'+j]);
                }
                var _baseprop31 = _scqs.contentarea +separator + subsection.join(separator) + separator;
                s_cbc_sitecatalyst.linkTrackVars = 'prop31';
                s_cbc_sitecatalyst.prop31 = _baseprop31 + positionLabel.toLowerCase().replace(/ /g,"");
                s_cbc_sitecatalyst.tl(true, "o", positionLabel);
              }
              isSponsorImgLink(impnode);
            }
            function isSponsorImgLink(impnode){
              if (!impnode.ancestor("a"))
                return false;
              Y.on("click", function(el){
                el.preventDefault();
                //var positionLabel = el.currentTarget.one('img[class*="scimp-"]').getAttribute('class').replace(/^.*?scimp-(\w+).*$/g,'$1');
                var positionLabel = byPartialClassName('scimp-*', el.currentTarget._node).item(0).getAttribute('class').replace(/^.*?scimp-(\w+).*$/g,'$1');
                var pimpnode = el.currentTarget._node;
                if (s_cbc_sitecatalyst && CBC.APP.SC.LinkTracker){
                  s_cbc_sitecatalyst.linkTrackVars = 'prop21,prop22,prop23,prop24,eVar11';
                  CBC.APP.SC.LinkTracker.registerLinkClick(pimpnode, {linkName:positionLabel, linkPos:positionLabel});
                }
                document.location.href = impnode.ancestor("a").get("href");
              }, impnode.ancestor("a"));
              return true;
            }

            (function() {
                
                var ltnodes, positionLabel, pimpnodes, impnodes;
                ltnodes = byPartialClassName('sclt-*');

                ltnodes.each(function(el) {
                    positionLabel = el.getAttribute('class').replace(/^.*?sclt-(\w+).*$/g,'$1');
                    CBC.APP.SC.LinkTracker.trackArea({'e':el._node,'p':positionLabel});
                });
                
                pimpnodes = Y.all(".scimp");
                pimpnodes.each(function(pimpnode){
                  //impnodes = pimpnode.all('img[class*="scimp-"]');
                  impnodes = byPartialClassName("scimp-*", pimpnode._node);
                  impnodes.each(function(impnode){
                      isImageLoaded(impnode);
                  });
                });
                
            }());
        }
    });

}
