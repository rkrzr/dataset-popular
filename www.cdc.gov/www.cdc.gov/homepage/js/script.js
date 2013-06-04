$(function(){

	// Make sure that any anchor that is clicked does not keep the focus.
	$('a').mouseup(function() { $(this).blur(); });
	
	if($(window).width() < 640  && $.browser.mobile) {
		// do something to suit the query
		
		$('body').addClass('mobile');
	//} else if($(window).width() < 360) {
			// do something
	//} else {
		// $('meta[name=viewport]').attr('content', 'width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1');
	}

	// The following is a temporary fix for style issues that appear in Compatibility View in IE
	if (document.documentMode && document.documentMode < 8) {
		$('#highlight1').css({ 'height':'auto' });
		$('#highlight1 aside').css({ 'width':'235px', 'height':'auto', 'min-height':'227px' });
		$('#highlight1 figure').css({ 'float':'left' });
		$('#highlight1 figure a img').css({ 'width':'600px', 'height':'299px' });
	}

	if (navigator.platform == 'iPod' || 
		navigator.platform == 'iPhone') {
		$('ul#services li#share ul li.favorites').css('display', 'none');
		$('ul#services li#share').click(function() {
			var sublist = $('ul#services li#share ul');
			if ($(this).hasClass('sffocus')) {
				$(this).removeClass('sffocus');
				sublist.css('right', '60px');
				sublist.css('top', '0px');
				sublist.css('visibility','hidden');
				sublist.css('position', 'relative');
				sublist.css('display', 'none');
			} else {
				$(this).addClass('sffocus');
				sublist.css('right', '60px');
				sublist.css('top', '0px');
				sublist.css('visibility','visible');
				sublist.css('position', 'relative');
				sublist.css('display', 'inline-block');
				sublist.css('margin-bottom', '10px');
			}
			return false;
		});
	} else if (navigator.platform == 'iPad') {
		$('ul#services li#share ul li.favorites').css('display', 'none');
		$('ul#services li#share > a').click(function() {
			if ($('ul#services li#share').hasClass('sfhover')) {
				$('ul#services li#share').removeClass('sfhover');
				$('ul#services li#share ul').css('visibility','hidden');
			} else {
				$('ul#services li#share').addClass('sfhover');
				$('ul#services li#share ul').css('visibility','visible');
			}
			return false;
		});
	} else if (navigator.userAgent.match(/Android/i) != null) {
		$('ul#services li#share ul li.favorites').css('display', 'none');
		$('ul#services li#share > a').click(function() {
			if ($('ul#services li#share').hasClass('sffocus')) {
				$('ul#services li#share').removeClass('sffocus');
				$('ul#services li#share ul').css('opacity', '0');
			} else {
				$('ul#services li#share ul').css('margin-top', '4px');
				$('ul#services li#share').addClass('sffocus');
				$('ul#services li#share ul').css('opacity', '1');
			}
			return false;
		});
	} else {
		$('ul#services li#share > a').click(function() {
			return false;
		});
	}
	
	if ($('html').attr('lang') != 'es') {
	
		// Change this variable to false to disable real-time Twitter/Facebook updates.
		var realTimeEnabled = true;
		if (realTimeEnabled && $.support.ajax && !(navigator.platform == 'BlackBerry' && navigator.appVersion.substring(0, 6) == '5.0.0.')) {

			var numberOfItems = 1;

			$('div#tweet div.socl-loader-graphic').css('display', 'block');

			$.getJSON('http://www2c.cdc.gov/podcasts/feed.asp?feedid=200&format=json&callback=?',
				function (data) {
					try {
						var block = $('#socialMedia div#tweet div.socl-comment-text');
						var newItem = $('<p id="item-tweet" style="display: none;" />');
						var cdcGovHeader = $('<a class="socl-user" href="https://twitter.com/CDCgov" target="_blank">CDC Twitter</a>');
						$('#socialMedia div#tweet div.socl-comment-text p').remove();
						$('#socialMedia div#tweet div.socl-comment-text a.socl-user').remove();
						block.append(newItem);
						block.append(cdcGovHeader);
						var i = 0;
						var numberFound = 0;
						while (numberFound < numberOfItems && i < data.entries.length) {
							if (data.entries[i].description != '') {
								if (numberFound < numberOfItems - 1) {
									newItem.html(newItem.html() + '<div class="feed-item">' + $('<div style="display: none;"/>').html(data.entries[i].description).text().replace(/\<\/?em\>/g, '') + '</div>');
								} else {
									newItem.html(newItem.html() + '<div class="feed-item lastChild">' + $('<div style="display: none;"/>').html(data.entries[i].description).text().replace(/\<\/?em\>/g, '') + '</div>');
								}
								// Needed to look at every anchor href attribute to fixup http:// references.
								newItem.find('a').each(function() {
									var target = $(this).prop('href');
									// Need to save/restore link text because of issue with IE replacing it when HREF property is set.
									var linkText = $(this).html();
									if (target.indexOf('http://twitter.com') == 0) {
										$(this).prop('href', target.replace('http://twitter.com', 'https://twitter.com'));
									} else if (target.indexOf('http://search.twitter.com/search') == 0) {
										$(this).prop('href', target.replace('http://search.twitter.com/search', 'https://twitter.com/search'));
									} else if (target.indexOf('/') == 0) {
										$(this).prop('href', 'https://twitter.com' + target);
									}
									// Restore the link text (IE fix).
									$(this).html(linkText);
								});
								numberFound++;
							}
							i++;
						}
						block.append(newItem);
						$('#item-tweet').fadeIn(400, function() { });
						$('div#tweet div.socl-loader-graphic').css('display', 'none');
						$('div#tweet div.socl-comment-text a.failover').css('display', 'none');
					} catch(err) {
						$('div#tweet div.socl-loader-graphic').css('display', 'none');
						$('div#tweet div.socl-comment-text a.failover').css('display', 'block');
					}
				})
				.error(function() {
					$('div#tweet div.socl-loader-graphic').css('display', 'none');
					$('div#tweet div.socl-comment-text a.failover').css('display', 'block');
				});

			$('div#facebook div.socl-loader-graphic').css('display', 'block');

			$.getJSON('http://www2c.cdc.gov/podcasts/feed.asp?feedid=199&format=json&callback=?',
				function (data) {
					try {
						var block = $('#socialMedia div#facebook div.socl-comment-text');
						var newItem = $('<p id="item-fb" style="display: none;" />');
						var cdcGovHeader = $('<a class="socl-user" href="https://www.facebook.com/CDC" target="_blank">CDC Facebook</a>');
						$('#socialMedia div#facebook div.socl-comment-text p').remove();
						$('#socialMedia div#facebook div.socl-comment-text a.socl-user').remove();
						block.append(newItem);
						block.append(cdcGovHeader)
						var i = 0;
						var numberFound = 0;
						while (numberFound < 1 && i < data.entries.length) {
							if (data.entries[i].title != '') {
								// Remove all the <br/> tags.
								var rawEntry = data.entries[i].description;
								rawEntry = rawEntry.replace(/&lt;br\/&gt;/gi, '');
								rawEntry = rawEntry.replace(/onclick=&quot;.*&quot;\);&quot;/gi, '');
								rawEntry = rawEntry.replace(/onmouseover=&quot;.*&quot;\);&quot;/gi, '');
								// And now remove everything after the closing of the last anchor in the post.
								var endAnchorTag = '&lt;/a&gt;';
								var endAnchorPos = rawEntry.lastIndexOf(endAnchorTag);
								if (endAnchorPos > -1) {
									rawEntry = rawEntry.substring(0, endAnchorPos + endAnchorTag.length);
								}
								// Now add the item (HTML encoded).
								if (numberFound < numberOfItems - 1) {
									newItem.html(newItem.html() + '<div class="feed-item">' + $('<div style="display: none;"/>').html(rawEntry).text() + '</div>');
								} else {
									newItem.html(newItem.html() + '<div class="feed-item lastChild">' + $('<div style="display: none;"/>').html(rawEntry).text() + '</div>');
								}
								// Needed to look at every anchor href attribute because of IE Compatibility View bug using jQuery selectors.
								newItem.find('a').each(function() {
									var target = $(this).prop('href');
									// Need to save/restore link text because of issue with IE replacing it when HREF property is set.
									var linkText = $(this).html();
									if (target.indexOf('http://' + location.host + '/profile.php?') == 0) {
										$(this).prop('href', target.replace('http://' + location.host, 'https://www.facebook.com'));
									} else if (target.indexOf('https://' + location.host + '/profile.php?') == 0) {
										$(this).prop('href', target.replace(location.host, 'www.facebook.com'));
									} else if (target.indexOf('http://' + location.host + '/l.php?') == 0) {
										$(this).prop('href', target.replace('http://' + location.host + '/l.php?', 'https://www.facebook.com/l.php?'));
									} else if (target.indexOf('https://' + location.host + '/l.php?') == 0) {
										$(this).prop('href', target.replace(location.host, 'www.facebook.com'));
									} else if (target.indexOf('http://www.facebook.com/') == 0) {
										$(this).prop('href', target.replace('http://www.facebook.com/', 'https://www.facebook.com/'));
									} else if (target.indexOf('/') == 0) {
										$(this).prop('href', 'https://www.facebook.com' + target);
									}
									// Restore the link text (IE fix).
									$(this).html(linkText);
								});
								newItem.find('a[title^="To tag someone"]').each(function() {
									$(this).prop('title', $(this).text());
								});
								newItem.find('a').filter(function(){ return /(jpe?g|png|gif)$/i.test($(this).attr('href')); }).remove();
								numberFound++;
							}
							i++;
						}
						block.append(newItem);
						$('#item-fb img').attr('alt', 'image from Facebook').css('display', 'none');
						$('#item-fb').fadeIn(400, function() { });
						$('div#facebook div.socl-loader-graphic').css('display', 'none');
						$('div#facebook div.socl-comment-text a.failover').css('display', 'none');
					} catch(err) {
						$('div#facebook div.socl-loader-graphic').css('display', 'none');
						$('div#facebook div.socl-comment-text a.failover').css('display', 'block');
					}
				})
				.error(function() {
					$('div#facebook div.socl-loader-graphic').css('display', 'none');
					$('div#facebook div.socl-comment-text a.failover').css('display', 'block');
				});

		} else if (realTimeEnabled && navigator.platform == 'BlackBerry' && navigator.appVersion.substring(0, 6) == '5.0.0.') {
			$('div#tweet div.socl-loader-graphic').css('display', 'none');
			$('div#facebook div.socl-loader-graphic').css('display', 'none');
			$('div#tweet div.socl-comment-text a.failover').css('display', 'block');
			$('div#facebook div.socl-comment-text a.failover').css('display', 'block');
			$('aside #facebook h4 a').css('padding-left', '28px');
			$('div#AZlist-container ol.AZlist').css({'float':'left'});
			$('div#branding-logoImage div.header a').css({'float':'left'});
		} else {
			$('div#tweet div.socl-loader-graphic').css('display', 'none');
			$('div#facebook div.socl-loader-graphic').css('display', 'none');
			$('aside #tweet .socl-comment-text p').css('display', 'block');
			$('aside #facebook .socl-comment-text p').css('display', 'block');
		}

	}
	
});
