/**
* WHO JavaScript stuff.
* @author NOSE
* V1.02 updated hoverables to fix media buffet links

*/

function fixMenu() {
// place holder for fixMenu function
};

var WHO = {
	
	/**
	* Initialize.
	*/
	initOnReady: function() {
		
		// develop tools
		//jQuery(document).devTools();
					
		// context
		var ctxPage = jQuery("#page");
		var ctxHeader = jQuery("#header");
		var ctxMain = jQuery("#main");
		var ctxSidebar = jQuery("#sidebar");
		var ctxContent = jQuery("#content");
		
		// init all
		WHO.prepareFlags();
		WHO.initPanel(ctxPage);
		//WHO.initSearch(ctxHeader);
		WHO.initToggler(ctxMain);
		WHO.initModal(ctxMain);
		WHO.initScroller(ctxMain);
		WHO.initHoverable(ctxMain);
		WHO.initDropdowns(ctxMain);
		WHO.initFacets(ctxSidebar);
		WHO.initIndexes(ctxContent);
		WHO.initTabs(ctxContent);
		WHO.initStories(ctxContent);
		WHO.initPrintLinks(ctxPage);

	},
	
	/**
	* Prepares the flags.
	*/
	browserIE:false,
	browserIE6:false,
	prepareFlags: function() {
		// browser flags
		if (jQuery.browser.msie) {
			WHO.browserIE = true;
		}
		if (jQuery.browser.msie && jQuery.browser.version.substr(0,1)<7) {
			WHO.browserIE6 = true;
		}
	},
	
	
	
	/**
	* Initialize the panel.
	*/
	initPanel: function(ctx) {	
		
		// ticker
		jQuery("#ticker").panel();
	},
	
	
	/**
	* Initialize the togglers.
	*/
	initToggler: function(ctx) {	
		
		// togglers
		jQuery(".toggler",ctx).each(function(ind,el) {
			// vars
			var id = jQuery(el).attr("id");
			var msgExpanded = null;
			var msgCollapsed = null;
			var expanded = false;
			var title = jQuery(this).attr("title");
			if (jQuery(el).hasClass("expanded")) {
				expanded = true;	
			}
			if (title.indexOf("$") >= 0) {
				var msgs = title.split("$");
				msgCollapsed = msgs[0];
				msgExpanded = msgs[1];
			}
			
			// toggle
			jQuery(el).toggler("."+id,{expanded:expanded,msgCollapsed:msgCollapsed,msgExpanded:msgExpanded,animate:false});
											 
		});
	},
	
	/**
	 * Initialize the modal.
	 */
	initModal: function(ctx){
		jQuery(".modal",ctx).nyroModal({
			bgColor:'#F5F5F5',
			minHeight:'100',
			hideContent:function hideModal(elts, settings, callback) {
			  elts.wrapper.hide().animate({opacity: 0}, {complete: callback, duration: 80}); 
			},
			showBackground:function showBackground(elts, settings, callback) {
				elts.bg.css({opacity:0}).fadeTo(300, 0.75, callback);
			}
		});
	},
	
	/**
	* Initialize tabs.
	*/
	initTabs: function(ctx) {
		// tabs
		jQuery("#tabs",ctx).tabs({cookie:{expires:30},fx:{opacity:'toggle'}});
	},
	
	
	/**
	* Initialize search.
	*/
	initSearch: function(ctx) {
		// field enhancer
		jQuery("#search_input input",ctx).fieldEnhancer("search_form","#search_form",{"fieldValue":"Search WHO.int"});
	},
	
	/**
	* Initialize stories.
	*/
	initStories: function(ctx) {
		// story
		jQuery(".stories",ctx).each(function(ind,el) {
			jQuery(el).story();
		});
	},
	
	/**
	 * Initialize the scroller.
	 */
	initScroller: function(ctx) {
		jQuery(".scroller",ctx).scroller();
		jQuery("sup a",ctx).scroller({"anchor":true});
	},
		
	/**
	* Initialize the hoverables.
	*/
	initHoverable: function(ctx) {	
		
		// hoverables
		jQuery(".hoverable, a.image, a.link_image, a.modal, ul.feature li, ul.index li, ul.events li, ul.listing > li:not(.listing_dropdown)",ctx).each(function(i,els){
			
			// events
			jQuery(els).bind("mouseenter",function(){
				jQuery(this).addClass("hover");
				jQuery("img",this).animate({opacity: 0.9}, 180);
			});
			jQuery(els).bind("mouseleave",function(){
				jQuery(this).removeClass("hover");
				jQuery("img",this).animate({opacity: 1.0}, 300);
			});
			jQuery(els).bind("click",function(){
				// modal
				if (jQuery(this).hasClass("modal")) {
					return true;
				}
				
				// follow link
				var h = jQuery("a",this).attr("href");
				if (h == null) {
					h = jQuery(this).attr("href");
				};
				if (h != null) {
					window.location.href = h;
					return false;
				};
			});
		});
		

	},
	
	/**
	* Initializes the dropdowns.
	*/
	initDropdowns: function(ctx) {
		var z = 100;
		jQuery("div.dropdown").each(function(){
			jQuery(this).dropdown();
			jQuery(this).css("z-index",z);
			z--;
		});
		jQuery("li.listing_dropdown").each(function(){
			jQuery(this).css({"z-index":z,"height":45});
			z--;
		});
	},
	
	/**
	* Initializes the facets.
	*/
	initFacets: function(ctx) {
		// form
		var facetForm = jQuery("#facets form");
		if (facetForm != null) {
			// we have form
			var inputs = jQuery("input",facetForm);
			// a change resubmits the form
			jQuery(inputs).bind("change",function(){
				jQuery(facetForm).submit();
			});
		}
	},
	
	/**
	* Initializes the indexes.
	*/
	initIndexes: function(ctx) {
		// indexed
		if (! WHO.browserIE6) {
			jQuery(".indexes").each(function(){
				jQuery(this).indexer();
			});
		}
	},
	
	/**
	* Initialize the print links.
	*/
	initPrintLinks: function(ctx) {	
		jQuery("#pageaction_print, .print",ctx).bind("click",function(){
			window.print();
		});
	}
}
jQuery(document).ready(function(){
	WHO.initOnReady();
});

if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function($) {
        var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
        var baseHref = '';
        if (jQuery('base').attr('href') != undefined)
            baseHref = jQuery('base').attr('href');
        jQuery('a').each(function() {
            var href = jQuery(this).attr('href');
            if (href && href.match(/^mailto\:/i)) {
                jQuery(this).click(function() {
                    var mailLink = href.replace(/^mailto\:/i, '');
                    _gaq.push(['_trackEvent', 'Email', 'Click', mailLink]);
                });
            }
            else if (href && href.match(filetypes)) {
                jQuery(this).click(function() {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    var filePath = href;
                    _gaq.push(['_trackEvent', 'Download', 'Click-' + extension, filePath]);
                    //if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
                    //    setTimeout(function() { location.href = baseHref + href; }, 200);
                    //    return false;
                    // }
                });
            }
        });
    });
}
