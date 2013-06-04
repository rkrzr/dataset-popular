var shareUtil = new Object();
shareUtil.settings = ['storyTextSm','storyTextMd','storyTextLg'];
shareUtil.current = '';
shareUtil.setFontSize = function(size, div) {
	$('#'+div).removeClass();
	$('#'+div).addClass(size);
}

shareUtil.changeFontSize = function(action, div) {
	//var index = shareUtil.settings.indexOf(shareUtil.current);
    var index = 0;
    for (i=0; i<shareUtil.settings.length; i++) {
        if (shareUtil.settings[i] == shareUtil.current) {
            index = i;
            break;
        }
    }

	var flag = 1;
	
	if (action == 'decrease') {
		flag = -1;
	} 

	if (index == -1) {
		size = 'storyTextMd';
	} else if (((index+flag) < shareUtil.settings.length) && ((index+flag) >= 0)){
		size = shareUtil.settings[index+flag];
	}
	
	if (shareUtil.current != size) {
		shareUtil.current = size;
		createCookie("fontSize", size, 4641);
		shareUtil.setFontSize(size, div);
		if(leftRailVideoOpen){
		   setTimeout(positionPlayer(leftRailContainerObj),500);
	    }
	    
	    if(typeof listStoryFlag != 'undefined'){
	    	 if(listStoryFlag){
	    	 	listContainerDiv = $('#listItems');
	    	 	listItemDiv = $('#listItems > .listItem').eq(listStoryCurrTab);
	    	 	listDivOffSet = 60;
	    	 	if($.browser.msie){   		 	
	    	 		if((parseInt($.browser.version, 10)) < 8){
	    	 			listDivOffSet = 80
	    	 		}
	    	 	}
	    	 	
	    	 	if(action == 'decrease'){
	    	 		listContainerDiv.height(listContainerDiv.height() - listDivOffSet)
	    	 		listItemDiv.height((listItemDiv.height() - listDivOffSet))
	    	 	}else if(action == 'increase'){
	    	 		listContainerDiv.height((listContainerDiv.height() + listDivOffSet))
	    	 		listItemDiv.height((listItemDiv.height() + listDivOffSet))
				}  
	    	 }
	    }	   				   
	}
}


function shareNewsObj() {
	this.toolbox = function(config) {
		//console.log($("#"+this.target+" > div > div > a").length);
		$("#"+this.options.renderDiv+" > div > div > div > a").each(function(index) {
			if ($(this).hasClass("abcnews_print")) {
				$(this).html('<span class="at300bs"></span> Print');
				$(this).click(function(){
					//DO NOT CHANGE IN NEWSPREVIEW
					//window.open(config.print,'_blank');
					CleanPrintPrintHtml('http://abcnews.go.com/'+config.print);
					return false;
				});

			} else if ($(this).hasClass("abcnews_single_page")) {
				singleLabel = (typeof config.singleLabel != 'undefined') ? config.singleLabel : 'Single Page'
				$(this).html('<span class="at300bs"></span> ' + singleLabel);
				$(this).click(function(){
					window.location.href = config.single;
				});

			} else if ($(this).hasClass("abcnews_comments")) {
			    if(config.numOfComments.indexOf("disqus")>0){//handle new commenting system
                     $(this).html('<span class="at300bs"></span>' + config.numOfComments);
			    }else{
				commentsLabel = (typeof config.commentsLabel != 'undefined') ? config.commentsLabel : 'Comment' //'Post a Comment'
				if (config.numOfComments >= 3) {
					$(this).html('<span class="at300bs"></span>' + config.numOfComments + ' ' + $(this).html());
				} else {
					$(this).html('<span class="at300bs"></span> ' +commentsLabel);
				}
				$(this).click(function(){
					window.location.href = config.comments;
				});
			    }

			}
		});
		
		$("#"+this.options.renderDiv+" > div > div > div > div").each(function(index) {
			if ($(this).hasClass("abcnews_font_sizes")) {

				//$(this).html('<a href="javascript:void(0);" onclick="shareUtil.changeFontSize(\'storyTextSm\',\''+config.fontDiv+'\');return false;">small</a> <a href="javascript:void(0);" onclick="shareUtil.changeFontSize(\'storyTextMd\',\''+config.fontDiv+'\');return false;">medium</a> <a href="javascript:void(0);" onclick="shareUtil.changeFontSize(\'storyTextLg\',\''+config.fontDiv+'\');return false;">large</a>');
				
				increaseText = (typeof config.fontIncSymbol != 'undefined') ? config.fontIncSymbol : '+'
				decreaseText = (typeof config.fontDecSymbol != 'undefined') ? config.fontDecSymbol : '-'
				showFontLabelFirst = true;
				
				if(typeof config.fontLabelFirst != 'undefined'){
					$(this).html('<span class="at300bs"></span><div class="btn"><a href="javascript:void(0);" id="decrease" onclick="shareUtil.changeFontSize(\'decrease\',\''+config.fontDiv+'\');return false;" title="decrease">'+decreaseText+'</a> <span class="divide">/</span> <a href="javascript:void(0);" id="increase" onclick="shareUtil.changeFontSize(\'increase\',\''+config.fontDiv+'\');return false;" title="increase">'+increaseText+'</a></div><div class="label">Text Size</div>');

				}else{				
					$(this).html('<span class="at300bs"></span> <div class="label">Text Size</div> <div class="btn"><a href="javascript:void(0);" id="decrease" onclick="shareUtil.changeFontSize(\'decrease\',\''+config.fontDiv+'\');return false;" title="decrease">'+decreaseText+'</a> <span class="divide">/</span> <a href="javascript:void(0);" id="increase" onclick="shareUtil.changeFontSize(\'increase\',\''+config.fontDiv+'\');return false;" title="increase">'+increaseText+'</a></div>');
				}
			} 
		});
	}

	this.render = function() {
		var config = this.options;
		var tbx = document.getElementById(config.renderDiv);
		var options = config.share;
		var group = '';
		var button = '';
		var scount = 0;
		var mcount = 0;
		var lastGroup = '';
		var title = '';
		var button = '';
		var lastItem = '';
		var fblike = '';
		var label = '';
		var size = '';
		var removeHref = false;
		var overrideURL = '';
		var tooltip = '';
		var plusOneOpts = '';
		var tweetOpts = ''; //used to override layout etc
		var twitterOpts = '';
		var linkedInOpts = '';
		var fbOpts = '';    //if empty, button defaults to recommend
		var fbLayoutOpts = '';
		var isPreview = (document.domain == "newspreview.corp.dig.com")?true:false;

		for (s=0; s<options.length; s++) { //group
			lastGroup = (s == options.length-1) ? ' share-group-last' : '';
			title = (options[s]['title'] != '') ? '<span class="share-title">'+options[s]['title']+'</span>' : '';
			//console.log("group " + options[s]['items'].length);
			button = '';
			for (m=0; m<options[s]['items'].length; m++) { //items
				lastItem = (m == options[s]['items'].length-1) ? ' share-btn-last' : '';
				
				
				
				//recommend is default. if fbLikeOpts is present, remove recommend 
				if(options[s]['items'][m]['code'] == 'addthis_button_facebook_like'){
					fblike = (typeof config.fbOpts != "undefined" && config.fbOpts != "") ? '' : ' fb:like:action="recommend" fb:like:width="125"'; 
					fbLayoutOpts = (typeof config.fbConfig != "undefined" && config.fbConfig != "") ? config.fbConfig : "";
				}else{
				    fblike = "";
				    fbLayoutOpts = "";
				}
				
				
				//twitter option 
				//twitterOpts = (options[s]['items'][m]['code'] == 'addthis_button_twitter') ? ' tw:related="abc"' : '';
				//twitterOpts = (options[s]['items'][m]['code'] == 'addthis_button_twitter') ? '' : '';
				
				//remove href
				removeHref = (options[s]['items'][m]['code'] == 'abcnews_font_sizes') ? true : false;
				
				//label = (options[s]['items'][m]['label']) ? '<span class="share-label">'+options[s]['items'][m]['name']+'</span>' : '';
				
				tooltip = options[s]['items'][m]['name'];
				label = (options[s]['items'][m]['label']) ? options[s]['items'][m]['name'] : '';
				
				button += '<div class="share-btn share-btn-'+m +' '+lastItem+'">';

				if(options[s]['items'][m]['code'] == 'addthis_button_google_plusone'){
					plusOneOpts = (typeof config.plusOneConfig != "undefined" && config.plusOneConfig != "") ? config.plusOneConfig : ''; 
				}else{
					plusOneOpts = "";
				}
				
				if(options[s]['items'][m]['code'] == 'addthis_button_tweet'){
					tweetOpts = (typeof config.tweetOpts != "undefined" && config.tweetOpts != "") ? config.tweetOpts + ' tw:related="abc"' : ' tw:related="abc"'; 
				}else{
					tweetOpts = "";
				}
				
				if(options[s]['items'][m]['code'] == 'addthis_button_linkedin_counter'){
					linkedInOpts = (typeof config.linkedInOpts != "undefined" && config.linkedInOpts != "") ? config.linkedInOpts  : '';
				}else{
					linkedInOpts = "";
				}
				//linkedInOpts = (options[s]['items'][m]['code'] == 'addthis_button_linkedin_counter') ? '' : '';
				
				overrideURL = (typeof config.url != "undefined" && config.url != "") ? 'addthis:url="'+config.url+'"' : '';
				if (!removeHref) {
					button += '<a class="'+options[s]['items'][m]['code'] + ' label-'+options[s]['items'][m]['label']+'"'+fblike+' '+overrideURL+' title="'+tooltip+'"'+plusOneOpts+''+fbLayoutOpts+''+tweetOpts+''+twitterOpts+''+linkedInOpts+'>'+label+'</a>';
				} else {
					button += '<div class="'+options[s]['items'][m]['code']+' label-'+options[s]['items'][m]['label']+'"'+fblike+'>'+label+'</div>';
				}
				
				button += '</div>';
				if(options[s]['items'][m]['code'] == 'addthis_button_facebook_like' && isPreview){
				    button = '';
				}
				//console.log(button);
				//console.log(overrideURL)
			}
			group += '<div class="share-group share-group-'+s+lastGroup+'">'+title+button+'<div class="clearboth"><!-- empty //--></div></div>';
		}
		//tbx.innerHTML = '<div class="share-container">' + group + '</div><div class="clearboth"><!-- empty //--></div>';
		document.write('<div class="share-container">' + group + '<div class="clearboth"><!-- empty //--></div></div>');
		addthis.toolbox("#"+this.target);
		this.toolbox(config);
		
		if (config.fontDiv != undefined) {
			shareUtil.current = readCookie("fontSize");
			if (shareUtil.current) {
				shareUtil.setFontSize(shareUtil.current,config.fontDiv);
			} else {
				shareUtil.current = 'storyTextMd';
			}
		}
	}
}

function shareIt(){
    var sTop = window.screen.height/2-(218);
    var sLeft = window.screen.width/2-(313);
    var shareThisURL = window.location.href.replace(/localhost:8080|newspreview.corp.dig.com|qa.n7.abcnews.go.com/, 'abcnews.go.com');
    var shareUrl = "http://www.facebook.com/sharer.php?u="+shareThisURL+"&t="+document.title;
    window.open(shareUrl,'sharer','toolbar=0,status=0,width=626,height=256,top='+sTop+',left='+sLeft)
}
function getShareCount(){
      var sharedURL = window.location.href.replace(location.hash,"");
      sharedURL =  sharedURL.replace(/localhost:8080|newspreview.corp.dig.com|qa.n7.abcnews.go.com/, 'abcnews.go.com');
      FB.api('/fql', 'GET', {q:'select share_count from link_stat where url="'+sharedURL+'"'}, function(response){
      if (response && response.data)
        $(".sharebtn-fbshare .bubbleCount .num").html(response.data[0].share_count);
        $(".sharebtn-fbshare .bubbleWrapper").show();
      });
}
