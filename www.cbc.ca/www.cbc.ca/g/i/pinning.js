YUI(_CBC_LOADER).use(function(Y) {

	if (Y.UA.ie == 9) {

		Y.use('lib_jquery_pinable', function(Y) {

			try {
			
				// First, we need to check if the browser is in already Site Mode
				if (window.external.msIsSiteMode()) {
			
					// Here we clear the Jump List to remove any existing items (optional)
					window.external.msSiteModeClearJumpList();
								
					var pin_stories,
						pin_section;

					if (typeof advertising_site == 'string') {

						pin_section = advertising_site.split('.')[1];

					} else {

						var whref = window.location.href;
						if (whref.indexOf('cbc.ca/news/') > -1) {
							pin_section = 'news';
						} else if (whref.indexOf('cbc.ca/sports/') > -1) {
							pin_section = 'sports';
						} else if (whref.indexOf('cbc.ca/video/') > -1) {
							pin_section = 'video';
						}

					}

					// Create a Custom Jump List Category to hold our Dynamic Jump List items related to the section
					window.external.msSiteModeCreateJumpList("CBC " + pin_section.substr(0, 1).toUpperCase() + pin_section.substr(1));

					switch(pin_section){

						case 'news':

							// Get top stories
							pin_stories = Y.all('.leadStory h2 a');

							// Here we're looping through the top stories in reverse.
							// Dynamic Jump List items are added at the top of the list,
							// in the reverse order from how they appear in the script.		
							for(var i = pin_stories.size() - 1; i >= 0; i--){
								// Get <h2> content
								var pin_headline = pin_stories.item(i).getContent();	
								// Filter out html tags from end of text, leaving only headline text
								pin_headline = pin_headline.substring(0,pin_headline.indexOf('<br'));

								// Get URL
								var pin_href = pin_stories.item(i).get('href');

								// Add story to Jump List
								window.external.msSiteModeAddJumpListItem(pin_headline, pin_href, "/favicon.ico", "self");
							}
							break;

						case 'sports':
							// Get top stories - using first-level child symbol to prevent grabbing 'related' stories
							pin_stories = Y.all('.topheadlines > ul > li > a');

							// Here we're looping through the top stories in reverse.
							// Dynamic Jump List items are added at the top of the list,
							// in the reverse order from how they appear in the script.		
							for(var i = pin_stories.size() - 1; i >= 0; i--){
								// Get <span class="headline"> content
								var pin_headline = pin_stories.item(i).one('.headline').getContent();
								// Filter out <span> tag (if exists) in front of text, leaving only headline text
								pin_headline = pin_headline.substring(pin_headline.indexOf('</span>')).replace('</span>','');

								// Get URL
								var pin_href = pin_stories.item(i).get('href');

								// Add story to Jump List
								window.external.msSiteModeAddJumpListItem(pin_headline, pin_href, "/favicon.ico", "self");
							}
							break;

						case 'video':
							// Get top stories
							pin_stories = Y.all('#clips .clip');

							// Here we're looping through the top stories in reverse.
							// Dynamic Jump List items are added at the top of the list,
							// in the reverse order from how they appear in the script.		
							for(var i = pin_stories.size() - 1; i >= 0; i--){
								// Get <span class="headline"> content
								var pin_headline = pin_stories.item(i).one('.id').getContent();

								// Get URL
								var pin_href = 'http://www.cbc.ca/video/#/Shows/1221254309/ID=' + pin_stories.item(i).get('id');

								// Add story to Jump List
								window.external.msSiteModeAddJumpListItem(pin_headline, pin_href+"?cmp=pinned-ie9", "/favicon.ico", "self");
							}
							break;					

					}// switch
					
				} // msIsSiteMode
				
			} catch (e) {
				// Fail silently.
			}

			// Init Discoverability
			$('body').pinable({
				discStyle: 'toast',
				logoPath: '/i/l/jquery/pinable/cbc-logo-pinning.png',
				message: 'Drag this icon to your Windows taskbar for quicker access to CBC.'
			});		

		}); // use.lib_jquery_pinable

	} // ua detect

});
