(function() {
  var f = document.getElementById('cse-search-box');
  if (!f) {
    f = document.getElementById('cse-search-box-main');
  }
  if (f && f.q) {
    var q = f.q;
    var n = navigator;
    var l = location;
    var su = function () {
      var u = document.createElement('input');
      var v = document.location.toString();
      var existingSiteurl = /(?:[?&]siteurl=)([^&#]*)/.exec(v);
      if (existingSiteurl) {
        v = decodeURI(existingSiteurl[1]);
      }
      var delimIndex = v.indexOf('://');
      if (delimIndex >= 0) {
        v = v.substring(delimIndex + '://'.length, v.length);
      }
      u.name = 'siteurl';
      u.value = v;
      u.type = 'hidden';
      f.appendChild(u);
    };
    if (n.appName == 'Microsoft Internet Explorer') {
      var s = f.parentNode.childNodes;
      for (var i = 0; i < s.length; i++) {
        if (s[i].nodeName == 'SCRIPT' &&
            s[i].attributes['src'] &&
            s[i].attributes['src'].nodeValue == unescape('https:\x2F\x2Fwww.google.com\x2Fcse\x2Fbrand?form=cse-search-box\x26lang=en\x26sitesearch=true')) {
          su();
          break;
        }
      }
    } else {
      su();
    }


    if (window.history.navigationMode) {
      window.history.navigationMode = 'compatible';
    }

    var back = "url('/search-site.gif') no-repeat scroll 0 -1px white";

    jQuery(q).blur(function(){
      if (q.value == '') {
        q.style.background = back;
      }
    });
    jQuery(q).trigger('blur');

    jQuery(q).focus(function(){
      q.style.background = '#ffffff';
    });
  }
})();
