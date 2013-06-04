function ProcessImn(){}
function ProcessImnMarkers(){}	

// struct to hold state from the interval function
var pluginLink = {
	possiblePlugins: [],
	hrefElements: [],
	actualPlugins: [],
	intervalID: null,
	busy: false
};

// Interval method to run the plugin search on a timer as opposed to all at once.
// Needed for IE7 workaround.
function intervalMethod() {
	if (!pluginLink.busy) {
		pluginLink.busy = true;
		try {  //try/catch to avoid edit mode errors.
			if (pluginLink.hrefElements.length > 0) {
				// Pop from the list of HREFs on the page and fold the extensions
				var href = pluginLink.hrefElements.pop();
				if (href != "")
				{
					var extension = href.substr(href.length - 3, 3);
					if ($.inArray(extension, pluginLink.possiblePlugins) != -1 &&
						$.inArray(extension, pluginLink.actualPlugins) == -1) {
						// Add the extension as an actual plugin
						pluginLink.actualPlugins.push(extension);
					}
				}
			}
			else {
				// No more HREFs left. Clear this timer, and display the plugins
				clearInterval(pluginLink.intervalID);
				if (pluginLink.actualPlugins.length > 0) {
					$.each(pluginLink.actualPlugins, function(index, value) {
						$("." + value).show();
					});
				}
				else {
					// No plugins at all
					$("#t-footer-req").hide();
				}
			}
		} catch (err) { }
		pluginLink.busy = false;
	}
}

// Overrides the SharePoint menu hover in order to remove the SharePoint hover delay which
// was causing issues with menu hovers getting "stuck"
function overrideMenu_HoverStatic(item)
{        
	var node=Menu_HoverRoot(item);
	var data=Menu_GetData(item);
	if (!data) return;
	__disappearAfter=data.disappearAfter;
	Menu_Expand(node, data.horizontalOffset, data.verticalOffset);      
}


$(document).ready(function() {
	//Set Treasury-For onClick event
	$("#slickbox a").click(function() {
		_gaq.push(['_trackEvent','Treasury For', $(this).attr('title'), $(this).attr('href')]);
	});
	if (document.location.pathname=='/Pages/treasury-for-text-view.aspx') {
		$(".tabs-right-content a").click(function() {
		    _gaq.push(['_trackEvent','Treasury For', $(this).attr('title'), $(this).attr('href')]);	
		    //alert('hello');
		});
		
	}
	
	
	$("#slick-toggle, td#zz1_TopNavigationMenuV4n1 a, #slickbox").hover(
		function() { $('#slickbox').show(); }, 
		function() { $('#slickbox').hide(); }
	);

	$("#tabs2").tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$("#tabs2 li").removeClass('ui-corner-top').addClass('ui-corner-left');
	
	$(".watermark").focus(function() {
		$(this).removeClass("watermark");
		$(this).val("");
		$(this).blur(function() {
			$(this).addClass("watermark");
		});
	});	
	
	$(function() {
		$(".watermark").val("Search");
		
		$("li[name='pluginLink']").each(function(index, element) {
			pluginLink.possiblePlugins.push(element.className);
		});

		// Build the list of HREFs to analyze for plugins in the interval method
		$("a").each(function(index, element) {
			pluginLink.hrefElements.push(element.href);
		});
		
		// Fire off the plugin timer to hit every millisecond
		pluginLink.intervalID = setInterval(intervalMethod, 1);
	});
});

	$(document).ready(function() {

	// Get the top nav tabs to keep their hover style when the cursor is over the flyouts
	var thisId;			// Variable to hold the id of the flyout container
	var thisTabId;		// Variable to hold the id of the associated tab
	var thisTabLink;	// Variable to hold the link in the associated tab
	var thisTabTable;	// Variable to hold the table in the associated tab
	var isIE = false;	// IE doesn't understand backjground-position, so we have to handle it differently
	var bgp;			// Variable to hold the tab's background positioning

	// Bind to the hover event for all of the flyout containers
	$("div.zz1_TopNavigationMenuV4_0").hover(
		// On hover
		function(){
			// Grab this flyout container's id
			thisId = $(this).attr("id");
			// The tab associated with this flyout container has an id which is the same, less the trailing 'Items'
			thisTabId = thisId.substring(0, thisId.indexOf("Items"));
			thisTabLink = $("td#" + thisTabId + " a");
			thisTabTable = $("td#" + thisTabId + " table");
			
			// Mimic the changes caused when hovering over the tab itself
			$(thisTabTable).addClass("ms-topNavHover");
			$(thisTabLink).addClass("ms-topNavHover");
			$(thisTabLink).css({
				"color": "#045d9d"
			});

			// Deal with the selected tab
			if($(thisTabLink).hasClass("ms-topnavselected")) {
				// Get the current background-position-x. IE doesn't understand background-position, so need to handle differently
				bgp = $(thisTabLink).css('background-position');
				if(typeof(bgp) === 'undefined') {
					isIE = true;
				}
				$(thisTabLink).css({
					"background": "#fff url('/Style%20Library/images/treas/t-topheader-hover.jpg') repeat-x"
				});
				if(isIE) {
					$(thisTabLink).css({
						"background-position-x": "0%",
						"background-position-y": "0%"
					});
				} else {
					$(thisTabLink).css({
						"background-position": "0% 0%"
					});
				}
			}
		},

		// On hoverout
		function(){

			// Remove the mimicry
			$(thisTabTable).removeClass("ms-topNavHover");
			$(thisTabLink).removeClass("ms-topNavHover");
			$(thisTabLink).css({
				"color": ""
			});
			// Deal with the selected tab
			if($(thisTabLink).hasClass("ms-topnavselected")) {
				$(thisTabLink).css({
					"background": "",
					"background-image": "",
					"background-repeat": "",
					"background-color": ""
				});
				if(isIE) {
					$(thisTabLink).css({
						"background-position-x": "",
						"background-position-y": ""
					});
				} else {
					$(thisTabLink).css({
						"background-position": ""
					});
				}
			}
		}
	);

	// Handle the 'Treasury For...' top nav tab
	// when any of these objects are hovered, show the slickbox
	$("#slick-toggle, td#zz1_TopNavigationMenuV4n1 a, #slickbox").hover(
		function() {
			$('#slickbox').show();
		}, 
		function() {
			$('#slickbox').hide();
		}
	);

	// When the slickbox or the slick-toggle divs are hovered, trigger the hover style for the underlying top nav tab
	var treasForTab = $("#zz1_TopNavigationMenuV4n1 .ms-topnav");
	$("div#slickbox, #slick-toggle").hover(
		// On hover
		function(){
			$(treasForTab).addClass("ms-topNavHover").css("color", "#045d9d");
		},

		// On hoverout
		function(){
			$(treasForTab).removeClass("ms-topNavHover").css("color", "");
		}
	);
	
	// Fix up some of the styles in the slickbox
	$("#tabs2").tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
	$("#tabs2 li").removeClass('ui-corner-top').addClass('ui-corner-left');
	
});



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-19138737-1']);
_gaq.push(['_trackPageview']);
_gaq.push(['_trackPageLoadTime']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();



/* foresee script - only reference script on prod */
var domainhostname = window.location.hostname.toLowerCase();
var produrls=["www.treasury.gov","treasury.gov","origins.treasury.gov","orgins.treasury.arcdns.gov"];
for (url in produrls)
{
 if (domainhostname == produrls[url])
 {
  document.write('<script src="', '/Style Library/foresee/foresee-trigger.js', '" type="text/JavaScript"></script>');
  break;
 }
}
// Track Downloads Script
function trackDownloads (){
	var trackIt = function() {
		var downloadLink;
		downloadLink = this.pathname;
		//alert(downloadLink)
		_gaq.push(['_trackPageview', downloadLink]);
    };
	var links = $("#t-content-main-content a, #t-content-main-content area");
	var whitelist = /(jpg|csv|pdf|zip|doc*|xls*|ppt*|txt|pip|del|ff|xml|epub|xsd)$/i;
	for (var i = 0, l = links.length; i < l; i++) {
			var match = links[i].pathname.match(whitelist);
			if (typeof match !== "undefined" && match !== null) {
				links[i].onclick = trackIt;
			}
		}
}
$(document).ready(function(){
	trackDownloads();
	$("#t-network-tw").attr("href","http://twitter.com/USTreasury/");
});
