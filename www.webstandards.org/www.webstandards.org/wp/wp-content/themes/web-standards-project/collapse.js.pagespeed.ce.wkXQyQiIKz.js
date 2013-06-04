/*
	WaSP JavaScript File
*/

// simple comment form checker just as an extra layer / instant feedback
function commentFormScreen() {
	var good = true;
	var reqFieldIds = new Array("author","email","comment");
	
	for (x=0;x<reqFieldIds.length;x++) {

		if (document.getElementById(reqFieldIds[x])) {
			if (document.getElementById(reqFieldIds[x]).value.length==0) {
				document.getElementById(reqFieldIds[x]).parentNode.className = "error";
				good = false;
			} else {
				document.getElementById(reqFieldIds[x]).parentNode.className = "";
			}
		}
	}
	
	if (!good) {
		alert("Please fill out all required fields.");
	}
	return good;
}


// attach the onsubmit event if the comment form is there
function commentFormInit() {
	if (document.getElementById) { 
		if (document.getElementById("commentform")) {
			document.getElementById("commentform").onsubmit = commentFormScreen;
		}
	}
}


addOnLoad(commentFormInit);



// ADD ONLOAD
// allows adding more than one function to the window's onload event
// based on Simon Willison's closure demo
function addOnLoad(func) {
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

// ADD ONUNLOAD
// allows adding more than one function to the window's onlunload event
// based on Simon Willison's closure demo
function addOnUnLoad(func) {
	var oldonunload = window.onunload;
	if (typeof window.onunload != 'function') {
		window.onunload = function() {
			func();
			window.onload = null;
			window.onunload = null;
		}
	} else {
		window.onunload = function() {
			oldonunload();
			func();
		}
	}
}

/* SETMAJER_DEOBFUSCATE 1.0
de-obfuscates an email address in a MAILTO: link; 

PARAMETERS
--

MARKUP NEEDED

- anchor (A) tag with a MAILTO: URL as the value of the HREF attribute
- the @ in the email addy should be replaced with the string '-REPLACE_WITH_AT_SYMBOL-'
- the body of the email should be set to 'replace%20-REPLACE_WITH_AT_SYMBOL-%20in%20the%20to:%20address%20with%20@'
  using the query string method (i.e. ?body= or &amp;body= depending on whether the subject has been defined

STYLES NEEDED
--

*/

function setmajer_deobfuscate() {
var anchors,numAnchors,currAnchor,i
//	get an array of the anchors in the document
	anchors = document.getElementsByTagName('A');

	numAnchors = anchors.length;
//	iterate through the anchors
	for (i = 0; i < anchors.length; i++) {
		currAnchor = anchors [i];
//		if the anchor is a MAILTO:, replace the obfuscation slug with the '@' symbol
		if (currAnchor.href.match(/mailto:/i)) {
			currAnchor.href = currAnchor.href.replace(/-REPLACE_WITH_AT_SYMBOL-/,'@')
			currAnchor.href = currAnchor.href.replace(/([?&]|\&amp;)body=replace%20-REPLACE_WITH_AT_SYMBOL-%20in%20the%20to:%20address%20with%20@/,'')
		}
	}
}
addOnLoad(setmajer_deobfuscate);

/*	SETMAJER_COLLAPSER 1.0
Turns an anchor into a button to show/hide the contents of an element

PARAMETERS
name			= string equal to the variable name used to hold the reference to this script
anchorElement	= reference to the anchor which will trigger the collapse/expand behavior

MARKUP NEEDED
- container element wrapping the content to be hidden (collapsed) 
- anchor tag
- anchor tag ID must be stmjrCollapse-[containerID] (if the container is to be expanded to start)
  or stmjrExpand-[containerID] (if the container is to be collapsed to start) where [containerID]
  is replaced with the actual ID of the container element
- if a custom link text + title for the anchor is desired, then the slug to be placed after 
  'Collapse ' and 'Expand ' should be placed in the title attribute of the container (most times,
  this will be the name of the page section to be collapsed)

STYLES NEEDED
.collapsed * {
	display: none;
}

@media speech {
	.collapsed * {
		display: block;
	}
}

.collapsed .stmjrCollapse {
	display: block;
}

SCRIPTS NEEDED
ADD ONUNLOAD (based on Simon Willison's multi-handler function for the onload event)

REFINEMENTS FOR FUTURE VERSIONS
- add styles programmatically
- use DOM methods for adding/removing the class
*/
// Constructor function
function stmjr_collapse(name,anchorElement) {
//	if the DOM methods we need are implemented...
	if (document.getElementById && document.createTextNode && document.appendChild) {
//		declare our counter + length variables
		var i,len

//		set the name for this script so we can refer to ourselves when constructing functions later on
		this.name = name;

//		Get collapse anchor
		this.anchor = anchorElement;

//		determine and store slug used for the prefix of the collapsing element's ID
		var slug = ('stmjrCollapse-' == this.anchor.id.match(/^stmjrCollapse-/))?'stmjrCollapse':'stmjrExpand';

//		Extract the container ID from the anchor ID by clipping off the slug and '-'
		var containerID = this.anchor.id.substr(slug.length + 1);

//		Get collapsible container
		this.container = document.getElementById(containerID);
//		If either the anchor or container are missing, return false
		if	(!this.anchor || !this.container) return false;
//		Store the supplied anchor text for the expanded state or a default
		this.expandedText = ('string' == typeof this.container.title)?'Collapse ' + this.container.title:'Click to collapse';
//		Store the supplied anchor text for the collapsed state or a default
		this.collapsedText = ('string' == typeof this.container.title)?'Expand ' + this.container.title:'Click to expand';
//		Check the slug to see if we're to be collapsed to start
		if ('stmjrExpand' == slug) {
//			collapse the container
			this.collapse();
//		otherwise expand it (won't do squat other than change the link text, which is the point)
		} else {
			this.expand()
		}
//		add the 'stay visible' class to the anchor; if there is already a class present, 
//		then concatenate rather than just set className
		this.anchor.className = (0 == this.anchor.className.length)?'stmjrNoCollapse':this.anchor.className + 'stmjrNoCollapse';
//		Add the event handler to the anchor
		this.anchor.onclick = new Function('return ' + this.name + '.toggle();');
//		Add the cleanup method to the onunload event to prevent memory leakage
		addOnUnLoad(new Function('return ' + this.name + '.cleanup();'));
		return this;
	}
	return false;
}
//	method to collapse the elements contents
stmjr_collapse.prototype.toggle = function() {
//	if the element is already collapsed, expand it
	if (this.isCollapsed) {
		this.expand();
//	otherwise, collapse it
	} else {
		this.collapse();
	}
//	return false to prevent navigating to the anchor
	return false;
}
//	method to collapse the element
stmjr_collapse.prototype.collapse = function() {
//	add the collapse class -- with a leading space if there's already a class
	this.container.className = (0 < this.container.className.len)?' collapsed':'collapsed';
//	change the title + link text to the collapsed text
	this.swapAnchorText(this.collapsedText);
//	mark this object as collapsed
	this.isCollapsed = true;
	return true;
}
//	method to expand the element
stmjr_collapse.prototype.expand = function() {
//	swap out the collapsed classname
	this.container.className = this.container.className.replace(/ ?collapsed\b/,'');
//	change the title + link text to the expanded text
	this.swapAnchorText(this.expandedText);
//	mark this object as not collapsed
	this.isCollapsed = false;
	return true;
}
stmjr_collapse.prototype.swapAnchorText = function(newText) {
//		Swap out title text on the anchor
		this.anchor.title = newText;
//		Clear out all children of the anchor
		var len = this.anchor.childNodes.length;
		for (i = 0; i < len; i++) {
			this.anchor.removeChild(this.anchor.childNodes[i])
		}
//		Add the new link text to the anchor
		this.anchor.appendChild(document.createTextNode(newText));
}
// cleanup this function
stmjr_collapse.prototype.cleanup = function() {
	this.anchor.onclick = null;
	window[this.name] = null;
	return true;
}
// Initialization function
function stmjrCollapseInit() {
	if (document.getElementsByTagName) {
//		get an array of all anchors in the document
		var anchors = document.getElementsByTagName('a');
//		loop through the anchors
		var num = anchors.length;
		for (var i = 0; i < num; i++) {
//			if the anchor's ID contains the prefix for which we're looking..,
			if (anchors[i].id.match(/^stmjrCollapse-/) || anchors[i].id.match(/^stmjrExpand-/)) {
//				instantiate a new stmjr_collapse object and add it to the window namespace
				window['stmjr_collapse' + i] = new stmjr_collapse('stmjr_collapse' + i,anchors[i]);
			}
		}
		return true;
	}
	return false;
}
addOnLoad(stmjrCollapseInit);
