$(document).ready(function($){
	$("#nojs").hide();
        // Clear Search on focus - add text on blur
	$('input.search-input').each(function(){
		$(this)
		.data('default',$(this).val())
		.addClass('inactive')
		.focus(function(){
			$(this).removeClass('inactive');
			if($(this).val()==$(this).data('default')||''){
				$(this).val('');
			}
		})
		.blur(function(){
			var default_val = $(this).data('default');
			if ($(this).val()==''){
				$(this).addClass('inactive');
				$(this).val($(this).data('default'));
			}
		});
	});		
	
    //
    // Homepage Scrolling feature	
    //
    var tabCount = 4;
    var tabDelay = 8000;
    var fadeDelay = 500;

    var featured = $("#featured");

    featured.show().tabs({fx: {opacity: "toggle"}, show: onTabShow});
    startRotatingFeature();

    featured.append('<a href="#" id="replay" class="stop-scroll"><img src="/images/replay.png" alt="Replay" /></a>');
    var replay = $("#replay");
    replay.click(function() {
	replay.fadeOut(fadeDelay);
        startRotatingFeature();
	return true;
    });

    function startRotatingFeature() {
      featured.tabs('select', 0);
      featured.tabs("rotate", tabDelay, false);
    }

    function stopRotatingFeature() {
      featured.tabs("rotate", 0);
      setTimeout(function() {replay.fadeIn(fadeDelay);}, Math.floor(tabDelay/2));
    }

    // Tried to display "replay" after clicking on a tab, but 
    // the rotate action appears as a click too.
    function onTabSelect(event, ui) {
      //stopRotatingFeature();
    }

    function onTabShow(event, ui) {
      if(ui.index == (tabCount - 1)) {
        stopRotatingFeature();
      }
    }

});

	
/*PIE*/
if("PIE" in window) {
	$(function($) {
        	$('#main-body').each(function() {PIE.attach(this);});
		$('#news').each(function() {PIE.attach(this);});
		$('#widgets').each(function() {PIE.attach(this);});
		$('.search-input').each(function() {PIE.attach(this);});
		$('#footer').each(function() {PIE.attach(this);});
	});
}


//
// JavaScript loader
// based on http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
// and http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
//
function loadScript(url, callback){

    var script = document.createElement("script");
	script.type = "text/javascript";
        script.async = true;

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
		script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(script, x);

    return script;

} // loadScript


function loadStyle(url, media)
{
  var css = document.createElement("link");
  css.rel  = "stylesheet";
  css.href = url;
  css.type = "text/css";
  if(media) {
      css.media = media;
  }
  document.getElementsByTagName("head")[0].appendChild(css);

  return css;

} // loadStyle

//
// Load search autocomplete
//
loadScript("/core/nlm-autocomplete/1.0/nlm-autocomplete.min.js", function() {
    $(document).ready(function() {
        nlm.autocomplete.add({element: "#search", dictionary: "nlm-ac-dictionary", width: 0});
    });
});
loadStyle("/core/nlm-autocomplete/1.0/nlm-autocomplete.css");

loadScript("/core/nlm-notifyExternal/1.0/nlm-notifyExternal.min.js", function() {
    $(document).ready(function() {
      nlm.notifyExternal.setNotification();
    });
});

//
// Load AddThis
//
/*
$(window).load(function() {
    loadScript(location.protocol + "//s7.addthis.com/js/250/addthis_widget.js#username=nationallibraryofmedicine", function() {
        // call AddThis API here rather than rely on class based configuration?
    });
});
*/