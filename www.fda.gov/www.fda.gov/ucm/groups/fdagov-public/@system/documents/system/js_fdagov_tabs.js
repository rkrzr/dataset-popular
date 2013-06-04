/*
*
* homepage tabs
*
*/

var AccTabs = (function() {
		$(function() {
			//for each DIV containing a set of tabs...
			$(".tabs3").each( 
				function(t){
					var tabsDiv=$(this);
					var list='';
					//for the h2 in each tab div
					$(tabsDiv).find("h2").each(
						function(h){
							var tabId="tabF" + t + "-" + h;
							$(this).attr({"id": tabId, "tabindex": "-1"});
							list+='<li><a href="#' + tabId + '">' + $(this).text() + '</a></li>';
						}
					);
					$(tabsDiv).prepend('<ul class="tabsMenu">' + list + '</ul>').find(">div").addClass("tabF").hide();
					$(tabsDiv).find(".tabF:first").show();
					$(tabsDiv).find(".tabsMenu>li:first").toggleClass("current").find("a").prepend('<span>Current Tab: </span>');
					//for each tabs menu link
					$(tabsDiv).find(">ul>li>a").each(
						function(a){
							$(this).click(
								function(e){
									e.preventDefault();
									$(tabsDiv).find(">ul>li.current").removeClass("current").find(">a>span").remove();
									$(this).blur();
									$(tabsDiv).find(".tabF:visible").hide();
									$(tabsDiv).find(".tabF").eq(a).show();
									$(tabsDiv).find(".tabF").eq(a).focus();
									$(this).prepend('<span>Current Tab: </span>').parent().addClass("current");
									//set focus to target h2 inside the relevant, previously hidden tab -- NOTE: focus is being set AFTER the span is written to the tabs menu li anchor
									$($(this).attr("href")).focus();
								}
							);
						}
					);
				}
			);
		});
	})();



