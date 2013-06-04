  	<!--
    // Use Closure Syntax to Hide Slides $() from other JQuery libraries used later in document;
   var jq142 = jQuery.noConflict();
   (function($){
   	// Begin Original Slides Code
   	 $(document).ready(function() {
      $('#slides').cycle({ pager: '#slideshow_links', 
                           pause: 1, 
                           speed: 300, 
                           timeout: 5000, 
                           cleartype:  true, 
                           cleartypeNoBg:  true,
                           pagerAnchorBuilder: function(idx, slide) {
                             var title = $('.slideshow_content span', slide).text();
                             // for now, only replace single quotes
                             title = title.replace('&#39;', "'");
                           
                             var img = $('.slideshow_content', slide).html();
                             var id = idx + 1;
                             return '<a title="' + title + '" href="#">' + id + '</a>';
                           }
                           });
                           
            $("#slideshow_links a").tooltip();
    });
   	// End Original Slides Code
    })(jq142);
    -->