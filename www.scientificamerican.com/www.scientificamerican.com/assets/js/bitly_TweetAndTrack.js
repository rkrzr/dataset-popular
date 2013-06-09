/*
    version 1.01
	from their site on 26 Mar 2009
	requires bitly javascript api:
    http://code.google.com/p/bitly-api/wiki/JavascriptClientApiDocumentation
*/

var TweetAndTrack = {};
TweetAndTrack.open = function(targ, url) {
    var child_spans = targ.getElementsByTagName('span');
    if (child_spans && child_spans.length > 0) {
        var msg = child_spans[0].innerHTML.toString();
    } else {
        msg = '';
    }
    
    var callback_name = url.replace(/\W/g, '');
    BitlyCB[callback_name] = function(data) {
        var result = TweetAndTrack.popResult(data);
        var tweet_url = "http://twitter.com/home?status=" + encodeURIComponent(msg + " " + result.shortUrl);
        TweetAndTrack.newWindow(tweet_url, "600", "400");
    };
    BitlyClient.call('shorten', {'longUrl': url, 'history': '1'}, 'BitlyCB.' + callback_name);
    // BitlyClient.shorten(url, 'BitlyCB.' + callback_name);
    return false;
};

TweetAndTrack.popResult = function(data) {
    // Results are keyed by longUrl, so we need to grab the first one.
    for (var r in data.results) {
        return data.results[r];
    }
};

TweetAndTrack.newWindow = function(url, width, height) {
  var a = function() {
    if(!window.open(url,'t','scrollbars=yes,toolbar=1,resizable=1,status=1,width='+width+',height='+height))document.location.href=url;
  };
  
  if( /Firefox/.test(navigator.userAgent)) {
    setTimeout(a,0);
  } else {
    a();
  }
};