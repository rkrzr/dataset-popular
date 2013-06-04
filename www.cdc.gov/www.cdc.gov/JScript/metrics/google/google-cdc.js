
// Make sure the CDC and CDC.Metrics namespaces are defined.
if (typeof CDC == "undefined") var CDC = new Object();
if (typeof CDC.Metrics == "undefined") CDC.Metrics = new Object();

// Declare an object for handling Google Analytics methods/actions.
CDC.Metrics.GoogleAnalytics = function() {

	// A class used to define a mapping between a Google Analytics account number and a URL expression (either 
	//	RegExp or simple "indexOf" type match).
	function RegistrationEntry(accountNumber, domain, urlPattern, isRegExp, enabled) {
		this.AccountNumber = accountNumber;
		this.Domain = domain;
		this.UrlPattern = urlPattern;
		this.IsRegExp = isRegExp;
		this.Enabled = enabled;
	};

	// Holds the collection of mappings between Google Analytics accounts and URL patterns.
	var RegistrationList = new Array(
		// Begin OADC
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/(.(?!/))*$', true, false),
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov$', true, true),
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/$', true, true),
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/index.htm$', true, true),
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/404.html$', true, true),
		new RegistrationEntry('UA-31796593-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/privacy.html$', true, true),
		new RegistrationEntry('UA-31796593-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/vitalsigns/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/media/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/about/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/24-7/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCIPC DUIP
		new RegistrationEntry('UA-32091200-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/motorvehiclesafety/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32091200-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/homeandrecreationalsafety/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32091200-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/parentsarethekey/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32091200-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/safechild/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCIRD
		new RegistrationEntry('UA-32141807-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/vaccines/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32141807-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/hand-foot-mouth/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32141807-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/pertussis/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32141807-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/norovirus/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32141807-7', 'www.cdc.gov', 'https?://www\.cdc\.gov/getsmart/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OMHHE
		new RegistrationEntry('UA-32143311-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/minorityhealth/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32143311-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/healthequity/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32143311-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/healthdisparities/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NIOSH
		new RegistrationEntry('UA-32208630-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/niosh/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32208630-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/spanish/niosh/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32208630-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/noes/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32208630-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/rtecs/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32208630-6', 'www.cdc.gov', 'https?://www\.cdc\.gov/wtc/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OSTLTS
		new RegistrationEntry('UA-32246926-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/ostlts/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32246926-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/stltpublichealth/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32246926-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/phap/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32246926-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/phcommunities/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32246926-6', 'www.cdc.gov', 'https?://www\.cdc\.gov/phlp/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OADC Social Media
		new RegistrationEntry('UA-32141570-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/socialmedia/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OADS Grand-Rounds
		new RegistrationEntry('UA-32215266-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/grand-rounds/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCEZID 
		new RegistrationEntry('UA-32199000-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/salmonella/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32199000-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/cfs/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32199000-6', 'wwwnc.cdc.gov', 'https?://wwwnc\.cdc\.gov/travel/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32199000-7', 'wwwnc.cdc.gov', 'https?://wwwnc\.cdc\.gov/eid/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32199000-8', 'www.cdc.gov', 'https?://www\.cdc\.gov/mrsa/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-33759567-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/cfs/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-38525357-1', 'www.cdc.gov', 'https?://www\.cdc\.gov/hai/(?:[\\?/](?:.*)?)?', true, true),
                // Begin NCEZID-DVBD
		new RegistrationEntry('UA-32213864-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/ncidod/dvbid/westnile/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32213864-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/lyme/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32213864-9', 'www.cdc.gov', 'https?://www\.cdc\.gov/rmsf/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32213864-18', 'www.cdc.gov', 'https?://www\.cdc\.gov/ticknet/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32213864-19', 'www.cdc.gov', 'https?://www\.cdc\.gov/dengue/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCHHSTP
		new RegistrationEntry('UA-32208182-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/hpv/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-34641145-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/hiv/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OSELS
		new RegistrationEntry('UA-32215188-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/osels/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32215188-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/phin/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32215188-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/ehrmeaningfuluse/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCEH
		new RegistrationEntry('UA-32258545-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/nceh/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32258545-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/asthma/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32258545-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/co/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32258545-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/nutritionreport/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32258545-6', 'www.cdc.gov', 'https?://www\.cdc\.gov/exposurereport/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OCCP
		new RegistrationEntry('UA-32247336-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/occp/(?:[\\?/](?:.*)?)?', true, true),
		// Begin CDC en Espanol
		new RegistrationEntry('UA-32299522-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/spanish/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OADC Seasonal Flu
		new RegistrationEntry('UA-32243961-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/flu/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32243961-3', 'espanol.cdc.gov', 'https?://espanol\.cdc\.gov/enes/flu/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OPHG
		new RegistrationEntry('UA-32336672-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/genomics/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCBDDD
		new RegistrationEntry('UA-32142325-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/ncbddd/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32142325-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/parents/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32142325-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/preconception/(?:[\\?/](?:.*)?)?', true, true),
		// Begin CGH
		new RegistrationEntry('UA-32388587-2', 'www.cdc.gov', 'https?://www\.cdc\.gov/globalhealth/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32388587-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/malaria/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32388587-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/parasites/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32388587-5', 'www.cdc.gov', 'https?://www\.cdc\.gov/globalaids/(?:[\\?/](?:.*)?)?', true, true),
		// Begin NCCDPHP
		new RegistrationEntry('UA-32388895-3', 'www.cdc.gov', 'https?://www\.cdc\.gov/healthyyouth/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-32388895-4', 'www.cdc.gov', 'https?://www\.cdc\.gov/tobacco/campaign/tips/(?:[\\?/](?:.*)?)?', true, true),
		// Begin OADC DEV
		new RegistrationEntry('UA-31796593-7', 'wwwdev.cdc.gov', 'https?://wwwdev\.cdc\.gov/(.(?!/))*$', true, true),
		new RegistrationEntry('UA-31796593-8', 'wwwdev.cdc.gov', 'https?://wwwdev\.cdc\.gov/vitalsigns(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-9', 'wwwdev.cdc.gov', 'https?://wwwdev\.cdc\.gov/media/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-10', 'wwwdev.cdc.gov', 'https?://wwwdev\.cdc\.gov/about/(?:[\\?/](?:.*)?)?', true, true),
		new RegistrationEntry('UA-31796593-11', 'wwwdev.cdc.gov', 'https?://wwwdev\.cdc\.gov/24-7/(?:[\\?/](?:.*)?)?', true, true)
	);

	return {
	
		Registration : function () {
			var result = new RegistrationEntry('UA-NNNNNNNN-N', 'www.cdc.gov', '', false, false);
			var url = location.href;
			var hashLocation = url.indexOf("#");
			if (hashLocation > 0) {
				url = url.substring(0, hashLocation);
			}
			for (var i = 0; i < RegistrationList.length; i++) {
				if (RegistrationList[i].IsRegExp) {
					var exp = new RegExp(RegistrationList[i].UrlPattern, "mi");
					if (exp.test(url) && RegistrationList[i].Enabled) {
						result = RegistrationList[i];
						break;
					}
				} else {
					if (url.indexOf(RegistrationList[i].UrlPattern) == 0 && RegistrationList[i].Enabled) {
						result = RegistrationList[i];
						break;
					}
				}
			}
			return result;
		}

	};
}();
// The core Google Analytics code with CDC modifications.
var _gaq = _gaq || [];
_gaq.push(function() {_gat._anonymizeIp();});
// Send the metrics request for the global account.
if (document.location.hostname == 'wwwdev.cdc.gov') {
	_gaq.push(
		['_setAccount', 'UA-32510962-2'],	// This should be the "global" account for cdc.gov.
		['_setDomainName', 'wwwdev.cdc.gov'],	// This should be the domain associated with the "global" account.
		['_trackPageview'],
		['_trackPageLoadTime']
	);
} else {
	_gaq.push(
		['_setAccount', 'UA-32510962-1'],	// This should be the "global" account for cdc.gov.
		['_setDomainName', 'www.cdc.gov'],	// This should be the domain associated with the "global" account.
		['_trackPageview'],
		['_trackPageLoadTime']
	);
}
// And now send the account/subweb specific request (if enabled).
var _cdcGoogleAnalytics = CDC.Metrics.GoogleAnalytics.Registration();
if (_cdcGoogleAnalytics.Enabled) {
	_gaq.push(
		['_setAccount', _cdcGoogleAnalytics.AccountNumber],
		['_setDomainName', _cdcGoogleAnalytics.Domain],
		['_trackPageview'],
		['_trackPageLoadTime']
	);
}
// Write out the GA script reference that actually fires the metrics requests.
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Add the click handlers to track specific events in GA.
$(document).ready(function() {
	$('a').not('a[href^="#"]').click(function() {
		var href = $(this).attr('href');
		if ($(this).hasClass('external') && !$(this).hasClass('skip')) {
			_gaq.push(['_trackEvent', 'Outbound Links', href, href, undefined, false]);
			setTimeout(function() { }, 100);
		} else if ($(this).find('span.plugIns').length > 0) {
			var fileType = href;
			if (fileType.indexOf('?') > -1) {
				fileType = fileType.substring(0, fileType.indexOf('?'));
			}
			if (fileType.indexOf('#') > -1) {
				fileType = fileType.substring(0, fileType.indexOf('#'));
			}
			fileType = fileType.substring(fileType.lastIndexOf('.') + 1).toUpperCase();
			_gaq.push(['_trackEvent', 'Download', fileType, href, undefined, true]);
		} else if ($(this).parent().attr('id') == 'facebookBlock') {
			_gaq.push(['_trackSocial', 'Facebook', 'Recommend', href]);
		} else if ($(this).parent().attr('id') == 'twitterBlock') {
			_gaq.push(['_trackSocial', 'Twitter', 'Tweet', href]);
		} else {
			// Determine the type of button clicked by the CSS class of the parent <li> element.
			var network = $(this).parents('li').attr('class');
			if (network && network.length > 0) {
				network = network.charAt(0).toUpperCase() + network.slice(1).toLowerCase(); 
			}
			var socialAction = "Share"; // Default for non-Facebook/Twitter actions.
			// For Facebook/Twitter we want to differentiate the actions for right-rail and bottom buttons.
			if ($(this).parent().hasClass('facebook')) {
				socialAction = "Like";
			} else if ($(this).parent().hasClass('twitter')) {
				socialAction = "Follow";
			}
			if (network == 'Facebook' ||
				network == 'Twitter' ||
				network == 'Favorites' ||
				network == 'Delicious' ||
				network == 'Google' ||
				network == 'Digg') {
				_gaq.push(['_trackSocial', network, socialAction, href]);
			}
		}
	});
});
