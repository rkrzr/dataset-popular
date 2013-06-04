jQuery(document).ready(function() {
  var groupClasses = new Array();
  jQuery('.search-result.solr-grouped').each(function(index, item){
    item = jQuery(item)
    currentGroupClass = item.attr('class').substr(item.attr('class').lastIndexOf('solr-group-'));
    if(jQuery.inArray(currentGroupClass, groupClasses) < 0) {
      groupClasses.push(currentGroupClass);
    }
  });

  jQuery.each(groupClasses, function(index, item) {
    currentGroup = jQuery('.search-result.solr-grouped.' + item);
    currentGroup.wrapAll('<li id="' + item + '-all" />');
    currentGroup.wrapAll('<ol class="apachesolr_search-results-grouped search-results-grouped">');
    jQuery('#' + item + '-all').prepend('<span>Group: ' + item.replace('solr-group-', '') +'</span>');
  });
});
;
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);;
/*! Picturefill - Author: Scott Jehl, 2012 | License: MIT/GPLv2 */
/*
  Picturefill: A polyfill for proposed behavior of the picture element, which does not yet exist, but should. :)
  * Notes:
    * For active discussion of the picture element, see http://www.w3.org/community/respimg/
    * While this code does work, it is intended to be used only for example purposes until either:
      A) A W3C Candidate Recommendation for <picture> is released
      B) A major browser implements <picture>
*/
(function( w ){

  // Enable strict mode
  "use strict";

  // User preference for HD content when available
  var prefHD = false || w.localStorage && w.localStorage[ "picturefill-prefHD" ] === "true",
    hasHD;

  // Test if `<picture>` is supported natively, if so, exit - no polyfill needed.
  if ( !!( w.document.createElement( "picture" ) && w.document.createElement( "source" ) && w.HTMLPictureElement ) ){
    return;
  }

  w.picturefill = function() {
    function _copyAttributes(src, tar) {
      if (src.getAttribute( "width" ) && src.getAttribute( "height" )) {
        tar.width = src.getAttribute( "width" );
        tar.height = src.getAttribute( "height" );
      }
      if (src.getAttribute( "title" )) {
        tar.title = src.getAttribute( "title" );
      }
      if (src.getAttribute( "class" )) {
        tar.setAttribute ("class", src.getAttribute( "class" ));
      }
    }

    var ps = w.document.getElementsByTagName( "picture" );

    // Loop the pictures
    for( var i = 0, il = ps.length; i < il; i++ ){
      var sources = ps[ i ].getElementsByTagName( "source" ),
        picImg = null,
        matches = [];

      // If no sources are found, they're likely erased from the DOM. Try finding them inside comments.
      if( !sources.length ){
        var picText =  ps[ i ].innerHTML,
          frag = w.document.createElement( "div" ),
          // For IE9, convert the source elements to divs
          srcs = picText.replace( /(<)source([^>]+>)/gmi, "$1div$2" ).match( /<div[^>]+>/gmi );

        frag.innerHTML = srcs.join( "" );
        sources = frag.getElementsByTagName( "div" );
      }

      // See which sources match
      for( var j = 0, jl = sources.length; j < jl; j++ ){
        var media = sources[ j ].getAttribute( "media" );
        // if there's no media specified, OR w.matchMedia is supported
        if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
          matches.push( sources[ j ] );
        }
      }

      // Find any existing img element in the picture element
      picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

      if( matches.length ){
        // Grab the most appropriate (last) match.
        var match = matches.pop(),
          srcset = match.getAttribute( "srcset" );

        if( !picImg ){
          picImg = w.document.createElement( "img" );
          picImg.alt = ps[ i ].getAttribute( "alt" );
          ps[ i ].appendChild( picImg );
        }

        if( srcset ) {
            var screenRes = ( w.devicePixelRatio ) || 1, // Is it worth looping through reasonable matchMedia values here?
              sources = srcset.split(","); // Split comma-separated `srcset` sources into an array.

            hasHD = w.devicePixelRatio > 1;

            for( var res = sources.length, r = res - 1; r >= 0; r-- ) { // Loop through each source/resolution in `srcset`.
              var source = sources[ r ].replace(/^\s*/, '').replace(/\s*$/, '').split(" "), // Remove any leading whitespace, then split on spaces.
                resMatch = parseFloat( source[1], 10 ); // Parse out the resolution for each source in `srcset`.

              if( screenRes >= resMatch ) {
                if( picImg.getAttribute( "src" ) !== source[0] ) {
                  var newImg = document.createElement("img");

                  newImg.src = source[0];
                  _copyAttributes(match, newImg);
                  picImg.parentNode.replaceChild( newImg, picImg );
                }
                break; // We’ve matched, so bail out of the loop here.
              }
            }
        } else {
          // No `srcset` in play, so just use the `src` value:
          picImg.src = match.getAttribute( "src" );
          _copyAttributes(match, picImg);
        }
      }
    }
    /*
// Manual resolution switching, to simulate UA interference.
    if( hasHD ){
      var body = w.document.getElementsByTagName("body")[0],
        prevSwitch = w.document.getElementById( "#toggle-res" ),
        picSwitch = w.document.createElement( "a" );

      if( prevSwitch ){
        body.removeChild( prevSwitch );
      }

      picSwitch.id = "toggle-res";
      picSwitch.href = "#";
      picSwitch.innerHTML = ( prefHD ? "S" : "H" ) + "D only";
      picSwitch.title = "Switch images to " + ( prefHD ? "Standard" : "High" ) + "Definition";
      picSwitch.className = "pf-pref pf-pref-" + ( prefHD ? "standard" : "high" );

      body.insertBefore( picSwitch, body.children[0] );

      picSwitch.onclick = function(){
        prefHD = !prefHD;
        if( w.localStorage ){
          w.localStorage[ "picturefill-prefHD" ] = prefHD;
        }
        return false;
      };
    }*/
  };

  // Run on resize and domready (w.load as a fallback)
  if( w.addEventListener ){
    w.addEventListener( "resize", w.picturefill, false );
    w.addEventListener( "DOMContentLoaded", function(){
      w.picturefill();
      // Run once only
      w.removeEventListener( "load", w.picturefill, false );
    }, false );
    w.addEventListener( "load", w.picturefill, false );
  }
  else if( w.attachEvent ){
    w.attachEvent( "onload", w.picturefill );
  }
})( this );;
/*
	--------------------------------------------------------------------------
	(c) 2007 Lawrence Akka
	 - jquery version of the spamspan code (c) 2006 SpamSpan (www.spamspan.com)

	This program is distributed under the terms of the GNU General Public
	Licence version 2, available at http://www.gnu.org/licenses/gpl.txt
	--------------------------------------------------------------------------
*/

(function ($) { //Standard drupal jQuery wrapper.  See http://drupal.org/update/modules/6/7#javascript_compatibility
// load SpamSpan
Drupal.behaviors.spamspan = {
  attach: function(context, settings) {
// get each span with class spamspan
       $("span.spamspan", context).each(function (index) {
// for each such span, set mail to the relevant value, removing spaces
	    var _mail = ($("span.u", this).text() +
	    	"@" +
	    	$("span.d", this).text())
	    	.replace(/\s+/g, '')
	    	.replace(/\[dot\]/g, '.');
// Find the header text, and remove the round brackets from the start and end
	    var _headerText = $("span.h", this).text().replace(/^ ?\((.*)\) ?$/, "$1");
	    // split into individual headers, and return as an array of header=value pairs
	    var _headers = $.map(_headerText.split(/, /), function(n, i){
            return (n.replace(/: /,"="));
          });
// Find the anchor text, and remove the round brackets from the start and end
	    var _anchorText = $("span.t", this).text().replace(/^ \((.*)\)$/, "$1");
// Build the mailto URI
  var _mailto = "mailto:" + encodeURIComponent(_mail);
  var _headerstring = _headers.join('&');
  _mailto += _headerstring ? ("?" + _headerstring) : '';
// create the <a> element, and replace the original span contents
   	    $(this).after(
		$("<a></a>")
		.attr("href", _mailto)
		.html(_anchorText ? _anchorText : _mail)
		.addClass("spamspan")
		).remove();
	} );
}
};
}) (jQuery);;
/**
 * @file
 * JavaScript integrations between the Caption Filter module and particular
 * WYSIWYG editors. This file also implements Insert module hooks to respond
 * to the insertion of content into a WYSIWYG or textarea.
 */
(function ($) {

$(document).bind('insertIntoActiveEditor', function(event, options) {
  if (options['fields']['title'] && Drupal.settings.captionFilter.widgets[options['widgetType']]) {
    options['content'] = '[caption]' + options['content'] + options['fields']['title'] + '[/caption]';
  }
});

Drupal.captionFilter = Drupal.captionFilter || {};

Drupal.captionFilter.toHTML = function(co, editor) {
  return co.replace(/(?:<p>)?\[caption([^\]]*)\]([\s\S]+?)\[\/caption\](?:<\/p>)?[\s\u00a0]*/g, function(a,b,c){
    var id, cls, w, tempClass;

    b = b.replace(/\\'|\\&#39;|\\&#039;/g, '&#39;').replace(/\\"|\\&quot;/g, '&quot;');
    c = c.replace(/\\&#39;|\\&#039;/g, '&#39;').replace(/\\&quot;/g, '&quot;');
    id = b.match(/id=['"]([^'"]+)/i);
    cls = b.match(/align=['"]([^'"]+)/i);
    w = c.match(/width=['"]([0-9]+)/);

    id = ( id && id[1] ) ? id[1] : '';
    cls = ( cls && cls[1] ) ? 'caption-' + cls[1] : '';
    w = ( w && w[1] ) ? w[1] : '';

    if (editor == 'tinymce')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else if (editor == 'ckeditor')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else
      tempClass = '';

    return '<div class="caption ' + cls + ' ' + tempClass + ' draggable"><div class="caption-inner" style="width: '+(parseInt(w))+'px">' + c + '</div></div>';
  });
};

Drupal.captionFilter.toTag = function(co) {
  return co.replace(/(<div class="caption [^"]*">)\s*<div[^>]+>(.+?)<\/div>\s*<\/div>\s*/gi, function(match, captionWrapper, contents) {
    var align;
    align = captionWrapper.match(/class=.*?caption-(left|center|right)/i);
    align = (align && align[1]) ? align[1] : '';

    return '[caption' + (align ? (' align="' + align + '"') : '') + ']' + contents + '[/caption]';
  });
};

})(jQuery);
;
