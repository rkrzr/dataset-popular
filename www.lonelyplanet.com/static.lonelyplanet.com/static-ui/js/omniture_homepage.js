omnitureLinkClick = function(desc, podName, url) {	
    // try and log to omniture, if omniture library available/loaded/
    if (typeof s_gi!="undefined") {
        var s=s_gi(s_account);
        s.linkTrackVars='prop26,prop27,eVar31,eVar32';
        s.linkTrackEvents='None';
        s.prop26=podName;
        s.prop27=desc;
        s.eVar31=podName;
        s.eVar32=desc;
        s.tl(this,'o', 'Homepage :: '+podName+' :: '+desc);
    }
    document.location.href=url;
};

omnitureTrackHeading = function(desc, url) {
	omnitureLinkClick(desc, 'Module-Heading', url);
};

omnitureTrackRunningLink = function(desc, url) {
	omnitureLinkClick(desc, 'Module-Running', url);
};

omnitureTrackSidebar = function(desc, url) {
	omnitureLinkClick(desc, 'Module-Side', url);
};

omnitureTrackReadMoreLink = function(desc, url) {
	omnitureLinkClick(desc, 'Module-Read-More', url);
};

(function($) {	
		// List all module
		$('#homepage-editorial-content div.hpModule ul.hpModuleContent li').each(function () {

			// related search header
			$(this).find('h4 a').click(function() {
				omnitureTrackHeading($(this).find('h4 a').text(), $(this).attr('href'));
			});
			
			// heading title
			var desc = $(this).find('h2').text();
			
			// heading
			$(this).find('h2 a').click(function() {
				omnitureTrackHeading(desc, $(this).attr('href'));
			});

			// images
			$(this)
			.find('div a').click(function() {
				omnitureTrackRunningLink(desc, $(this).attr('href'));
			});
			
			// running links
			$(this).find('p a').click(function() {
				omnitureTrackRunningLink(desc, $(this).attr('href'));
			});
			
			// read more links
			$(this).find('li.featureRelated a').click(function() {
				omnitureTrackReadMoreLink(desc, $(this).attr('href'));
			});
			
		});
		
		// List all carousel entry
		$('#homepage-carousel ul li').each(function () {
			$(this)
			.find('div').filter(function () {return !$(this).hasClass('carouselBanner') })
			.find('a')
			.click(function() {
				var podName = 'Flash Carousel';
				var podTitle = $(this).attr('title');
				var url = $(this).attr('href');
				omnitureLinkClick(podTitle, podName, url);
			});		
		});		
})(jQuery);
