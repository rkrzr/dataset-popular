/* Orig. by Paul Sowden, 11/2/2001, A List Apart,
	http://alistapart.com/stories/alternate/
*/

function setActiveStyleSheet(title) {
	var i, a, main;
	// For all links...
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		// ...to stylesheets with titles:
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			/* Disable all alt stylesheets; 
				enable the sheet named in title parameter
			*/
			a.disabled = true;
			if(a.getAttribute("title") == title) a.disabled = false;
		}
	}
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}
