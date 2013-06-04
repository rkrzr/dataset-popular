
/* - ++resource++easyslider-portlet.js - */
// http://www.fbi.gov/portal_javascripts/++resource++easyslider-portlet.js?original=1
(function($){$(document).ready(function(){$(".slider-portlet").hover(
function(){var height=$(this).css('height');height=parseInt(height.substring(0,height.length-2));$(this).find(".slider-over").animate({top:(height-30)+"px"},500,"swing")},
function(){$(this).find(".slider-over").animate({top:"0px"},750,"swing")})})})(jQuery);
