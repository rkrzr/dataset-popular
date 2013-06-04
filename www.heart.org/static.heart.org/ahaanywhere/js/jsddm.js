
var timeout         = 200;
var closetimer		= 0;
var ddmenuitem      = 0;
var toggleHiLite	= 0;

function jsddm_open()
{	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = $(this).find('div').eq(0).css('visibility', 'visible');
	ddmenuitem = $(this).find('div').eq(0).css('z-index', '99999');
	$(this).children("span").children("a").css('color','#c02942');
	}

function jsddm_close()
{	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
	if(toggleHiLite) toggleHiLite.css('color','');
}

function jsddm_timer()
{	closetimer = window.setTimeout(jsddm_close, timeout);$(this).children("span").children("a").css('color','#5d5d5d');}

function jsddm_canceltimer()
{	if(closetimer)
	{	window.clearTimeout(closetimer);
		closetimer = null;}}


function languageMenu_open()
{
	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = $('#languagesWrapper').css('visibility', 'visible');
	toggleHiLite = $('span.linkLanguages a').css('color','#D41017');
}

function localizationMenu_open()
{
	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = $('#localizationWrapper').css('visibility', 'visible');
	toggleHiLite = $('span.linkLocal a').css('color','#D41017');
}





	$(document).ready(function(){
		$('#jsddm > li').bind('mouseover', jsddm_open);
		$('#jsddm > li').bind('mouseout',  jsddm_timer);
	
	
		$('span.linkLanguages a').bind('mouseover', languageMenu_open);
		$('span.linkLanguages a').bind('mouseout',  jsddm_timer);
		$('#languagesWrapper').bind('mouseover', languageMenu_open);
		$('#languagesWrapper').bind('mouseout',  jsddm_timer);
		
		$('span.linkLocal a').bind('mouseover', localizationMenu_open);
		$('span.linkLocal a').bind('mouseout', jsddm_timer);
		$('#localizationWrapper').bind('mouseover', localizationMenu_open);
		$('#localizationWrapper').bind('mouseout',  jsddm_timer);
		
		
		/*
var subWrapHeight = $('#subNavWrapper').height();
		var localWrapTopPos = $('#localizationWrapper').css('top');
		var numberLocalWrapTopPos = parseInt(localWrapTopPos);
		var newTopPos = (subWrapHeight - numberLocalWrapTopPos) - (2 * (subWrapHeight - numberLocalWrapTopPos));
		var newTopPosStr = newTopPos + "px";
		$('#localizationWrapper').css('top', newTopPosStr);
		$('#languagesWrapper').css('top', newTopPosStr);
*/

		
			});
			
			
		
			
			
			
