var _CBC_LOADER = {
	base:"/i/l/yui/3.4.1/",
	root:"3.4.1/",
	combine: true,
	comboBase: "/i/l/comboloader/index.php?b=i/l/yui&f=",
	charset: 'utf-8',
	timeout: 10000,
	allowRollup: false,
	filter: {
		'searchExp' : '(&)(?!f=)',
		'replaceStr': ','	
	},
	modules: {
		//util
		'cbc_old_core': { type:'js', fullpath:'/includes/objects/core-v2/core.js' },

		'cbc_core': { type:'js', fullpath:'/i/o/cbc/v10/core-min.js', requires:['cookie'] },

		'cbc_config': { type:'js', fullpath:'/i/o/cbc/v10/config/cbc.js', requires:['cbc_core'] },

		'cbc_forms': { type:'js', fullpath:'/i/o/cbc/v10/forms-min.js' },

		'cbc_paginator_style': { type:'css', fullpath:'/i/o/cbc/v10/paginator.css' },
		'cbc_paginator_style_v11': { type:'css', fullpath:'/i/o/cbc/v10/paginator_v11.css' },
		'cbc_paginator': { type:'js', fullpath:'/i/o/cbc/v10/paginator-min.js', requires:['cbc_core', 'node'] },

		'cbc_modal': { type:'js', fullpath:'/i/o/modalbox/modalbox-min.js', requires:['cbc_core', 'cbc_modal_style', 'node', 'anim-easing', 'event-custom'] },
		'cbc_modal_style': { type:'css', fullpath:'/i/o/modalbox/modalbox.css' },

		'cbc_weather': { type:'js', fullpath:'/weather/includes/js/weather.js', requires:['cbc_core', 'cbc_weather_stations', 'node', 'event'] },
		'cbc_weather_module': { type:'js', fullpath:'/i/o/weathermodule/wm-min.js', requires:['cbc_core', 'cbc_weather_module_style', 'cbc_weather_stations', 'io-base', 'node'] },
		'cbc_weather_module_style': { type:'css', fullpath:'/i/o/weathermodule/wm.css' },

		'cbc_personalize': { type:'js', fullpath:'/i/o/personalize/settings-min.js', requires:['cbc_core', 'cbc_modal', 'cbc_personalize_style', 'cbc_tabs', 'cbc_weather_stations'] },
		'cbc_personalize_style': { type:'css', fullpath:'/i/o/personalize/settings.css' },
		'cbc_weather_stations': { type:'js', fullpath:'/i/o/personalize/stations.js' },

		'cbc_tabs': { type:'js', fullpath:'/i/o/tabs/sst-min.js', requires:['cbc_core', 'cbc_tabs_style'] } ,
		'cbc_tabs_style': { type:'css', fullpath:'/i/o/tabs/sst.css' },

		'cbc_geoip': { type:'js', fullpath:'/geoip/weatherByIP' },

		'cbc_auth': { type:'js',  fullpath: '/i/o/auth/v10/auth-min.js', requires:['cbc_core', 'node', 'gigya', 'cbc_config', 'cbc_authlink_style'] },
		'cbc_authlink_style': { type:'css',fullpath: '/i/o/auth/v10/authlink.css' },
		'cbc_authlink': { type:'js',  fullpath: '/i/o/auth/v10/authlink-min.js', requires:['cbc_authlink_style', 'cbc_core', 'node', 'cbc_config', 'gigya', 'cookie'] },

        'cbc_ccpopup_style': { type:'css',fullpath: '/contentconnector/css/popup.css' },

		'cbc_rotator': { type:'js', fullpath:'/i/o/rotator/rotator.js', requires:['cbc_core', 'node', 'anim', 'io', 'cbc_rotator_style', 'event-custom'] },
		'cbc_rotator_style': { type:'css', fullpath:'/i/o/rotator/rotator.css' },

		'cbc_carousel': { type:'js', fullpath:'/i/o/carousel/v11/carousel.js', requires:['cbc_carousel_style', 'cbc_core', 'node', 'anim', 'transition', 'event-move'] },
		'cbc_carousel_style': { type:'css', fullpath:'/i/o/carousel/v11/carousel.css' },

		'cbc_socialmedia': { type:'js', fullpath:'/i/o/sm/v10/js/core.js', requires:['pluck', 'cbc_core', 'node'] },

		//radio listen live
		'cbc_radio': { fullpath:'/video/radio/js/cbc.js' },
		'cbc_radio_menu': { fullpath:'/video/radio/js/radioMenus.js', requires:['cbc_radio', 'cbc_radio_menu_style', 'yui2_domevent', 'yui2_connect', 'yui2_get', 'cbc_radio_streams'] },
		'cbc_radio_menu_style': { type:'css', fullpath:'/video/radio/css/radioMenus.css' },
		'cbc_radio_streams': { fullpath:'/video/radio/js/radioStreams.js', requires:['cbc_radio', 'cbc_old_core'] },
		'cbc_radio_header': { fullpath:'/video/radio/js/radioHeader.js', requires:['cbc_radio', 'yui2_domevent', 'yui2_connect', 'yui2_anim', 'yui2_json', 'cbc_radio_streams', 'cbc_radio_menu'] },

		//video
		"cbc.video.embed.swfvideoplayer" : { type:"js", fullpath:"/video/js/SWFVideoPlayer.js", requires: ["node","swf", "base"]},

		//lib
		'lib_sort': { type:'js', fullpath:'/i/l/objsort/1.1/objsort.js' },
		'lib_swfaddress_2.4': { type:'js', fullpath:'/i/l/swfaddress/2.4/swfaddress.js' },
		'lib_swfobject_2.2': { type:'js', fullpath:'/i/l/swfobject/2.2/swfobject.js', requires:['node-base'] },
		'lib_jquery_1.5.1': { type:'js', fullpath:'/i/l/jquery/jquery-1.5.1.min.js' },
		'lib_discoverability_style': { type:'css', fullpath:'/i/l/jquery/pinable/discoverability.css' },
		'lib_jquery_pinable': { type:'js', fullpath:'/i/l/jquery/pinable/jquery.pinable.js', requires:['lib_jquery_1.5.1', 'lib_discoverability_style', 'node'] },

		//ext lib
		'comscore': { type:'js', fullpath:'http://b.scorecardresearch.com/beacon.js' },
		'gigya': { type:'js', fullpath:'http://cdn.gigya.com/JS/socialize.js?apikey=2_D_R4jG9HPDjelwI5F2eqWHGI-vMdNUVrQq7THCL2DoR6iDli2OKe-LOznINJv12e' },
		'pluck': { type:'js', fullpath:'http://sitelife.cbc.ca/ver1.0/Direct/JavascriptSDKProxy' },


		//yui2
		'yui2_domevent': { fullpath:'/includes/lib/yui/2.7.0b/yahoo-dom-event/yahoo-dom-event.js' },
		'yui2_anim': { fullpath:'/includes/lib/yui/2.7.0b/animation/animation-min.js' },
		'yui2_get': { fullpath:'/includes/lib/yui/2.7.0b/get/get-min.js' },
		'yui2_connect': { fullpath:'/includes/lib/yui/2.7.0b/connection/connection-min.js' },
		'yui2_json': { fullpath:'/includes/lib/yui/2.7.0b/json/json-min.js' }
	}
};
var _CBC_MODULES = _CBC_LOADER; //note _CBC_MODULES is deprecated, please use _CBC_LOADER
try{document.domain = 'cbc.ca';}catch(e){}