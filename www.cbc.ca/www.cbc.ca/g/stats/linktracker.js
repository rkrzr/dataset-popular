if(!CBC) { var CBC = {}; }
if(!CBC.APP) { CBC.APP = {}; }
if(!CBC.APP.SC) { CBC.APP.SC = {}; }

CBC.APP.SC.LinkTracker = function () {

	var $P = [];

	$P.sc = null;
	$P.separator = ':';
	var $SCU = CBC.APP.SC.UTIL;
	var $ = $SCU.getElementById;

	return {

		init : function() {
			$P.sc = s_cbc_sitecatalyst;
		},

		trackElement : function(params) {

			try {

				var element = params.element;
				var o = CBC.APP.SC.LinkTracker.getParams(params);

				CBC.APP.SC.LinkTracker.registerLinkClick(element,o);
			} catch(e) {
				// catch all trackElement errors
				this.debug(e);
			}
		},

		trackArea : function (elArray) {

			try {

				if(!($SCU.typecheck(elArray).array)) {
					elArray = [elArray];
				}

				for(i = 0; i < elArray.length; i++) {

					var params = elArray[i];

					if($SCU.typecheck(params).string) {
						params = {'e':params,'p':params};
					}

					if(params.p) { params.linkPos = params.p; }

					var listenerParams = {'type':'click',
										  'obj':this,
										  'params':params,
										  'callback':function(e,o) {
											// e.preventDefault();
											this.registerLinkClick(e,o);
										  }
					};

					if(!!params.e) {

						var element = params.e;

						if(typeof element == 'string') {
							element = $(element).el;
							if(!!element) {
								listenerParams.element = element;
							}
						} else if(element.nodeType == 1) {
							listenerParams.element = element;
						}

						if(listenerParams.element) {
							$SCU.addListener(listenerParams);
						}
					}
			
				}

			} catch(e) {
				// catch all track area errors
				this.debug(e);
			}
		
		},

		appendlpos : function(element,linkName,linkPos) {
			if(!element || !linkName || !linkPos) { return; }
			if(element.name) { return; }

			var nameAttr = '&lid='+linkName+'&lpos='+linkPos;

			// Explanation: In IE 6, possibly 7, the name attribute of an element can not be
			// changed directly. As a work around, a temporary element is created in the String
			// based IE way, with the intended name AND id attribute. The attributes are then
			// copied to the target element with mergeAttributes (IE only function).
			var tempElement = null;
			try {
				var idStr = (!!element.id) ? ' id="'+element.id+'"' : '';
				tempElement = document.createElement("<a name='"+nameAttr+"'"+idStr+">");	
			} catch(e) {} 

			if(tempElement === null || tempElement.nodeName != 'A') {
				element.name = nameAttr;
			} else {
				// we should only be in this function if using an IE browser
				tempElement.innerHTML = element.innerHTML;
				element.mergeAttributes(tempElement,false);
			}
		},

		debugtl : function(linkTarget, linkType, linkHier) {
			console.log('target='+linkTarget+' | type='+linkType+' | hierarchy='+linkHier);
		},

		debug : function(error) {
			//if(!!console && !!console.log) {
				//console.log(error);
			//}
		},

		registerLinkClick : function(e, o) {

			try {

				var linkTarget = (e.nodeType!==1)?$SCU.getAnchor(e.target):e;
				if(!linkTarget) { linkTarget = true; }
				var linkName = (o.linkName)?o.linkName:unescape(linkTarget.innerHTML);
				linkName = $SCU.stripHTML(linkName);
				var linkPos = (o.linkPos)?o.linkPos:'';
				
				// set any props that have been passed in
				var propsArray = [];
				if(!!o.props) {
					for(var prop in o.props) {
						if(o.props.hasOwnProperty(prop) && $SCU.typecheck(prop) !== 'function') {
							propsArray.push(prop);
							s_cbc_sitecatalyst[prop] = o.props[prop];
						}
					}
				}

				this.appendlpos(linkTarget,linkName,linkPos);

				if(o.ajax) {

					var linkPage = (o.linkPage)?o.linkPage:document.location.href;
					var linkType = '';
					if (!o.linkType) { 
						linkType = 'o'; 
					} else {
						switch (o.linkType){
							case 'exit': 
								linkType = 'e';
								break;
							case 'download':
								linkType = 'd';
								break;
							default:
								linkType = 'o';
								break;
						}
					}

					$P.sc = $SCU.getSCInstance();

					$P.sc.linkTrackVars = 'prop22,prop23,prop24,eVar11';

					if(CBC.APP.SC.PageTracker) {
						$P.sc.linkTrackVars = 'prop21,' + $P.sc.linkTrackVars;
					}

					if(propsArray.length > 0) { $P.sc.linkTrackVars += ',' + propsArray.join(','); }

					if(o.events) {
						$P.sc.linkTrackVars += ',events';
						$P.sc.linkTrackEvents = o.events;
						$P.sc.events = o.events;
					}

					$P.sc.tl(linkTarget, linkType, linkPage+$P.separator+linkPos+$P.separator+linkName);
				}

			} catch(error) {
				// catch all registerLinkClick errors
				this.debug(error);
			}

		},

		trackWeatherWidget : function() {
			this.trackArea({'e':'gn-mycbc','p':'weatherwidget'});
		},

		trackReaderComments : function() {
			// tracks either or, depending on which id is available
			this.trackArea({'e':'readercomments','p':'yourvoice'});
			this.trackArea({'e':'cmt_switcher','p':'yourvoice'});
		},

		trackFooter : function() {
			this.trackArea({'e':'footer-links','p':'footer'});
		},

		trackStoryWrapper : function() {

			this.trackArea([
				{'e':'recommendations_display','p':'also-read'},
				{'e':'lineup-content','p':'features'},
				{'e':'intlinks','p':'related'}
			]);

			var tHeadMod = function(linupId,tracker) {
				var contentpanes = $SCU.getElementsByClassName('tc',linupId);
				if(!contentpanes) { return; }

				tracker.trackArea([
					{'e':contentpanes[0],'p':'top-headlines'},
					{'e':contentpanes[1],'p':'recommended'},
					{'e':contentpanes[2],'p':'commented'}
				]);
			}

			tHeadMod('sr-lineup1',this);

			if(window.location.href.match('canada/.*?/story/')) {
				tHeadMod('sr-lineup2',this);
			}

			this.trackWeatherWidget();
			this.trackFooter();
		},

		trackContentAreaIndex : function() {

			var areas = [
				{'e':$SCU.getElementsByClassName('promogrp','left')[0],'p':'features'},
				{'e':'reg-lineups','p':'headlines-across-canada'},
				{'e':'cpnews','p':'moreheadlines'},
				{'e':'nat-lineups','p':'headlines'}
			];

			var promogrp = $SCU.getElementsByClassName('promogrp','right')[0];
			var header = promogrp.getElementsByTagName('h2')[0];

			if(header && header.innerHTML.match('Latest Video.*')) {
				areas.push({'e':promogrp,'p':'latest-video'});
			}
			this.trackArea(areas);
			
			var contentpanes = $SCU.getElementsByClassName('tc','newstabs');
			if(!contentpanes) { return; }

			this.trackArea([
				{'e':contentpanes[0],'p':'top-headlines'},
				{'e':contentpanes[1],'p':'most-viewed'},
				{'e':contentpanes[2],'p':'recommended'},
				{'e':contentpanes[3],'p':'commented'}
			]);

			this.trackWeatherWidget();
			this.trackReaderComments();
			this.trackFooter();
		},

		trackHomePage : function() {
			
			var areas = [
				{'e':$SCU.getElementsByClassName('topstory','n')[0],'p':'news-promos'},
				{'e':'n-small','p':'news-promos-small'},
				{'e':'s-small','p':'sports-promos-small'},
				{'e':'e-small','p':'entertainment-promos-small'},
				{'e':'localnews','p':'local-news'}
			];

			areas.push({'e':$('n').tags('ul')[0],'p':'news-top-headlines'});
			areas.push({'e':$('s').tags('ul')[0],'p':'sports-top-headlines'});
			areas.push({'e':$('e').tags('ul')[0],'p':'entertainment-top-headlines'});

			this.trackArea(areas);

			var contentpanes = $SCU.getElementsByClassName('tc','stories');

			this.trackArea([
				{'e':contentpanes[0],'p':'most-viewed'},
				{'e':contentpanes[1],'p':'most-recommended'}
			]);

			this.trackReaderComments();
			this.trackFooter();

		},

		trackRegionIndex : function(region) {
			
			if(!region) { return; }

			var out = function(element) {
				//console.dir(element);
				return element;
			};

			var AreaByClass = function(_class,_parent,_index,_label) {
				return {
					get : function () { return {'e':$SCU.getElementsByClassName(_class,_parent)[_index],'p':_label}; } 
				};
			};

			var AreaByTag = function(_tag,_parent,_index,_label) {
				return {
					get : function () { return {'e':$(_parent).tags(_tag)[_index],'p':_label}; } 
				};
			};

			var AreaByChild = function(_parent,_index,_label) {
				return {
					get : function () { return {'e':$(_parent).el.children[_index],'p':_label}; } 
				};
			};

			var AreaByLastChild = function(_parent,_label) {
				return {
					get : function () { return {'e':$(_parent).el.children[$(_parent).el.children.length-1],'p':_label}; } 
				};
			};

			var AreaById = function(_id,_label) {
				return {
					get : function () { return {'e':$(_id).el,'p':_label}; } 
				};
			};

			var basicConfig = function() {
				return [
					new AreaByClass('tc','newstabs',0,'top-headlines'),
					new AreaByClass('tc','newstabs',1,'most-viewed'),
					new AreaByClass('tc','newstabs',2,'recommended'),
					new AreaByClass('tc','newstabs',3,'commented'),
					new AreaByTag('div','right',0,'region-weather')
				];
			};

			var getRegionalAreas = function(regionalConfigArray) {

				var areas = [];

				for(var i = 0; i < regionalConfigArray.length; i++) {
					try {
						areas.push(out(regionalConfigArray[i].get()));
					} catch(e) {}
				}

				return areas;
			};

			var rdata = {
				'toronto': function(){ return getRegionalAreas(basicConfig().concat([
					new AreaById('news-split','news-headlines-features'),
					new AreaById('local-split','features'),
					new AreaByLastChild('left','events'),
					new AreaByChild('right',3,'video-on-demand')
					]));
				},
				'ottawa': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByChild('left',2,'news-headlines-features'),
					new AreaByChild('left',3,'features'),
					new AreaByLastChild('left','events'),
					new AreaByChild('right',2,'video-on-demand')
					]));
				},
				'montreal': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByChild('left',2,'news-headlines-features'),
					new AreaByChild('left',3,'features'),
					new AreaByChild('right',2,'video-on-demand')
					]));
				},
				'windsor': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('news-split','more-headlines'),
					new AreaById('local-split','features'),
					new AreaByChild('right',3,'video-on-demand')
					]));
				},
				'thunderbay': function() { return getRegionalAreas([
					new AreaByChild('left',0,'top-headlines'),
					new AreaByChild('left',1,'top-headlines'),
					new AreaByTag('div','right',0,'region-weather'),
					new AreaByChild('left',2,'features')
					]);
				},
				'sudbury': function() { return getRegionalAreas([
					new AreaByChild('left',0,'top-headlines'),
					new AreaByChild('left',1,'top-headlines'),
					new AreaByTag('div','right',0,'region-weather'),
					new AreaByChild('left',2,'features')
					]);
				},
				'sask': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByClass('split-l','left',1,'news-headlines'),
					new AreaByClass('split-l','left',0,'features'),
					new AreaByChild('right',3,'video-on-demand')
					]));
				},
				'manitoba': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByClass('split-l','left',1,'news-headlines'),
					new AreaByClass('split-l','left',0,'features'),
					new AreaByChild('right',3,'video-on-demand')
					]));
				},
				'nb': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('local-features','features'),
					new AreaByClass('module','left',1,'news-headlines-features'),
					new AreaByChild('right',4,'video-on-demand')
					]));
				},
				'pei': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('local-features','features'),
					new AreaByClass('module','left',1,'news-headlines-features'),
					new AreaByChild('right',5,'video-on-demand')
					]));
				},
				'ns': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('local-features','features'),
					new AreaByClass('module','left',1,'news-headlines-features'),
					new AreaByChild('right',4,'video-on-demand')
					]));
				},
				'nl': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('local-features','features'),
					new AreaByClass('module','left',1,'news-headlines-features'),
					new AreaByChild('right',2,'video-on-demand')
					]));
				},
				'north': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('local-features','features'),
					new AreaByClass('module','left',1,'news-headlines-features'),
					new AreaByChild('right',3,'video-on-demand')
					]));
				},
				'calgary': function() { return getRegionalAreas(basicConfig().concat([
					new AreaById('half-l','features'),
					new AreaByChild('left',3,'news-headlines-features'),
					new AreaByChild('right',2,'video-on-demand')
					]));
				},
				'edmonton': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByChild('left',1,'features'),
					new AreaByChild('left',2,'news-headlines-features'),
					new AreaByChild('right',2,'video-on-demand')
					]));
				},
				'bc': function() { return getRegionalAreas(basicConfig().concat([
					new AreaByChild('left',3,'features'),
					new AreaByLastChild('left','news-headlines-features'),
					new AreaById('tpClips1','latest-video'),
					new AreaById('tpClips2','most-viewed-video')
					]));
				}
			};

			try {
				this.trackArea(rdata[region]());
			} catch(e) {}
		},

		globalLinkTracking : function() {

			try {

				var activeLi = $SCU.getElementsByClassName('active','zones')[1];

				this.trackArea([
					{'e':'zonebar','p':'subnav'},
					{'e':activeLi,'p':'breadcrumb'}
				]);

			} catch (e) {}
		}
	};
}();

CBC.APP.SC.LinkTracker.init();
