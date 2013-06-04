$(document).ready(function() {

    /*---- Latest Tweet functionality ----*/
	$.getJSON("http://twitter.com/statuses/user_timeline/NatGeo.json?callback=?", function(data) {

		var h3Html = $("#latest_tweet > h3").html();
		$("#latest_tweet").html($("<h3 />").addClass("title").html(h3Html));

		var i=0;
		for (i = 0;i <= 3;i++) {
			
		    // Twitter returns results in raw text form, so this makes all the links clickable, as well as any included trending topics and usernames.
		    var twitText = data[i].text.
		        replace(/http:\/\/\S+/g,  '<a href="$&" target="_blank">$&</a>'). 
	            replace(/\s(@)(\w+)/g,    ' <a href="http://twitter.com/$2" target="_blank">@$2</a>'). 
	            replace(/\s(#)(\w+)/g,    ' <a href="http://search.twitter.com/search?q=%23$2" target="_blank">#$2</a>');

			$("#latest_tweet").append('<p>'+ twitText +'</p><p class="timestamp">'+ get_relative_time(data[i].created_at) +' from '+ data[i].source +'</p>');
		}
    });    
});


function get_relative_time(obj){
		var b=obj.split(" ");
		obj=b[1]+" "+b[2]+", "+b[5]+" "+b[3];
		var a=Date.parse(obj);
		var d=(arguments.length>1)?arguments[1]:new Date();
		var e=parseInt((d.getTime()-a)/1000);
		e=e+(d.getTimezoneOffset()*60);
		if(e<60){return"less than a minute ago"}else{if(e<120){return"about a minute ago"}else{if(e<(60*60)){return(parseInt(e/60)).toString()+" minutes ago"}else{if(e<(120*60)){return"about an hour ago"}else{if(e<(24*60*60)){return"about "+(parseInt(e/3600)).toString()+" hours ago"}else{if(e<(48*60*60)){return"1 day ago"}else{return(parseInt(e/86400)).toString()+" days ago"}}}}}}
	};