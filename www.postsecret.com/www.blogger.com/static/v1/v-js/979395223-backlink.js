// Global variable which is populated by the dynamic javascript
// retrieved from a request to the blogger server
var BL_Backlinks = new Array();
var BL_BacklinkCount = new Array();

function BL_processBacklinkTemplate(templateHTML) {
  var finalHTML = '';
  for (i = 0; i < BL_Backlinks.length; i++) {
    var html = templateHTML;
    var escapedURL = encodeURIComponent(BL_Backlinks[i]['BlogBacklinkURL']);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkURL\$(>|%3E|&gt;)/g, BL_Backlinks[i]['BlogBacklinkURL']);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkURLEscaped\$(>|%3E|&gt;)/g, escapedURL);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkTitle\$(>|%3E|&gt;)/g, BL_Backlinks[i]['BlogBacklinkTitle']);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkSnippet\$(>|%3E|&gt;)/g, BL_Backlinks[i]['BlogBacklinkSnippet']);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkAuthor\$(>|%3E|&gt;)/g, BL_Backlinks[i]['BlogBacklinkAuthor']);
    html = html.replace(/(<|%3C|&lt;)\$BlogBacklinkDateTime\$(>|%3E|&gt;)/g, BL_Backlinks[i]['BlogBacklinkDateTime']);
    finalHTML += html;
  }
  return finalHTML;
}

function BL_writeBacklinks() {
  var dcomDiv = document.getElementById('blogger-dcom-block');
  if (dcomDiv != null && dcomDiv.innerHTML) {
    var finalHTML = BL_processBacklinkTemplate(dcomDiv.innerHTML);
    // Add a div with a unique id to test if the subsequent write
    // succeeded
    if (finalHTML != '') {
      finalHTML += '<span id="blogger-dcom-ihtest"></span>';
      dcomDiv.innerHTML = finalHTML;
      if (document.getElementById('blogger-dcom-ihtest')) {
        dcomDiv.style.display = 'block';
      }
    }
  }
}

function BL_addOnLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function BL_loadScript(url) {
  if (document.getElementById) {
    var script = document.createElement('script');
    script.defer = true;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

function BL_populateBacklinksCount() {
  var linkSpans = document.getElementsByTagName('span');
  var postQuery = '';
  for (var i = 0; i < linkSpans.length; i++) {
    if (linkSpans[i].className == 'backlinkcount') {
      var postId = linkSpans[i].id;
      if (postId) {
        BL_BacklinkCount[postId] = linkSpans[i];
        postQuery += '&postID=' + postId;
      }
    }
  }
  if (postQuery != '') {
    var url = window.BL_backlinkURL + '?blogID=' + window.BL_blogId + postQuery;
    BL_loadScript(url);
  }
}

BL_addOnLoadEvent(function() { BL_populateBacklinksCount(); });
