/**
 * Plugin: jquery.zRSSFeed
 * 
 * Version: 1.0.1
 * (c) Copyright 2010, Zazar Ltd
 * 
 * Description: jQuery plugin for display of RSS feeds via Google Feed API
 *              (Based on original plugin jGFeed by jQuery HowTo)
 * 
 * History:
 * 1.0.1 - Corrected issue with multiple instances

$(document).ready(function () {
  $('#sci-news-minifeed').rssfeed('http://news.sciencemag.org/rss/current.xml?v=2', {
    limit: 4
  });
});

 *
 **/


(function($){

  var current = null; 
  
  $.fn.rssfeed = function(url, options) {  
  
    // Set pluign defaults
    var defaults = {
      limit: 10,
      header: true,
      titletag: 'span class="item-title"',
      date: true,
      content: true,
      snippet: true,
      showerror: true,
      errormsg: '',
      key: null
    };  
    var options = $.extend(defaults, options); 
    
    // Functions
    return this.each(function(i, e) {
      var $e = $(e);
      
      // Add feed class to user div
      if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');
      
      // Check for valid url
      if(url == null) return false;

      // Create Google Feed API address
      var api = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + url;
      if (options.limit != null) api += "&num=" + options.limit;
      if (options.key != null) api += "&key=" + options.key;

      // Send request
      $.getJSON(api, function(data){
        
        // Check for error
        if (data.responseStatus == 200) {
  
          // Process the feeds
          _callback(e, data.responseData.feed, options);
        } else {

          // Handle error if required
          if (options.showerror)
            if (options.errormsg != '') {
              var msg = options.errormsg;
            } else {
              var msg = data.responseDetails;
            };
            $(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
        };
      });        
    });
  };
  
  // Callback function to create HTML result
  var _callback = function(e, feeds, options) {
    if (!feeds) {
      return false;
    }
    var html = '';  
    var row = 'even';  
    
    // Add header if required
    if (options.header)
    
    // Add feeds
    for (var i=0; i<feeds.entries.length; i++) {
      
      // Get individual feed
      var entry = feeds.entries[i];
      var thumbnail = null;
      var section = null;
      if(entry.mediaGroups){
        thumbnail = entry.mediaGroups[0].contents[0].thumbnails[0].url;
      }else{
        thumbnail= "http://news.sciencemag.org/scienceinsider/site-img/default-th.jpg";
      }
      //console.log(entry);
      
      if(entry.link.indexOf("sciencenow") > 0){
        section = "<em>Science</em>NOW";
      }else{
        section = "<em>Science</em>Insider";
      }
    
      
      // Format published date
      var entryDate = new Date(entry.publishedDate);
      var month=new Array(12);
      month[0]="January";
      month[1]="February";
      month[2]="March";
      month[3]="April";
      month[4]="May";
      month[5]="June";
      month[6]="July";
      month[7]="August";
      month[8]="September";
      month[9]="October";
      month[10]="November";
      month[11]="December";

      var pubDate = entryDate.getDate() + " " + month[entryDate.getMonth()] + " " + entryDate.getFullYear();
      
      // Add feed row
      html += '<dt>' + '<a href="'+entry.link.replace("?rss=1", "") +'"><img class="thumb" src="'+ thumbnail +'" alt="" title="Go to article on <em&gt;Science</em&gt;Insider" height="60" width="60" /></a><span class="overline">'+ pubDate +' | <span class="loud">' +section+'</span></span>' +
        '<'+ options.titletag +'><a href="'+ entry.link.replace("?rss=1", "") +'" title="View this feed at '+ feeds.title +'">'+ entry.title +'</a></'+ options.titletag +'>'
      if (options.content) {
      
        // Use feed snippet if available and optioned
        if (options.snippet && entry.contentSnippet != '') {
          var content = entry.contentSnippet;
        } else {
          var content = entry.content;
        }
      }
      
      html += '</dt><dd>'+ content +'</dd>';
      
      // Alternate row classes
      if (row == 'odd') {
        row = 'even';
      } else {
        row = 'odd';
      }      
    }
    html += $(e).html();
    
    $(e).html(html);
  };
})(jQuery);
