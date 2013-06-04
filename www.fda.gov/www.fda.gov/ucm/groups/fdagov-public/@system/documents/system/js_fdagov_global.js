/*
 * js_fdagov_global.js
 * Updated 27 September 2011
 *
 * This code is almost identical to the code maintained by the FDA, except one 
 * fix was applied so that the default font size was 100% instead of 90%.  
 *
 * Changes to this code are commented with comments that begin with a "##" tag.
 */ 

var currTab = 1;
var currSlide = 1;
var nextSlideNum;
var numSlides;



function atload() 
{init(); setActiveTab();}
window.onload=atload;

function init()
{
	numSlides = $('img', '.basics_slideImg').length-1; //subtract the current slide img
	$("#basics_counter").html("<span id='basics_curr'>1</span> of " + numSlides);
	for (x=1; x<=numSlides; x++){
		document.getElementById("basics_slide"+x).style.display = 'none';
	}
	
	try {
		document.getElementById("basics_mainTopicsHead").style.display = 'none';
		document.getElementById("basics_whatsNewHead").style.display = 'none';
		document.getElementById("basics_stayConnectedHead").style.display = 'none';
		$("#basics_acc1").css('overflow', 'hidden');
		$("#basics_acc2").css('overflow', 'hidden');
		$("#basics_slideshowWrap").css('overflow', 'hidden');
		$("#basics_mainTopicsLeft").css('float', 'left');
		$("#basics_mainTopicsRight").css('float', 'right');
		document.getElementById("basics_currSlide").innerHTML = document.getElementById("basics_slide1").innerHTML;
	}
	catch(e){}  // wont produce errors on non-slideshow pages
}


function changeImg(imgSrc, element)
{
	document.getElementById(element).src = imgSrc;
}


function prevSlide()
{
	if (currSlide == 1)
		nextSlideNum = numSlides;
	else
		nextSlideNum = currSlide - 1;
		
	$("#basics_currSlide").fadeOut(450, function() {
        // Animation complete
		document.getElementById('basics_currSlide').innerHTML = document.getElementById('basics_slide'+nextSlideNum).innerHTML;
      });
	
	$("#basics_currSlide").fadeIn(450, function() {
        // Animation complete
      });
	
	document.getElementById("basics_curr").innerHTML = nextSlideNum;
	currSlide = nextSlideNum;
}

function nextSlide()
{
	if (currSlide == numSlides)
		nextSlideNum = 1;
	else
		nextSlideNum = currSlide + 1;
	
	$("#basics_currSlide").fadeOut(450, function() {
        // Animation complete
		document.getElementById('basics_currSlide').innerHTML = document.getElementById('basics_slide'+nextSlideNum).innerHTML;
      });

	$("#basics_currSlide").fadeIn(450, function() {
        // Animation complete
      });

	document.getElementById("basics_curr").innerHTML = nextSlideNum;
	currSlide = nextSlideNum;
}

function changeTab(selectedTab)
{
	var currTab = document.getElementById("basics_t"+selectedTab);
	var currTabText = document.getElementById("basics_t_txt"+selectedTab);
	
	for (i=1; i<=3; i++)
	{
		document.getElementById("basics_t"+i).style.background = "url('/ucm/groups/fdagov-public/@system/documents/system/img_fdagov_footer_blue.png') repeat-x scroll left top #E6F0F5";
		document.getElementById("basics_t"+i).style.borderBottom = '1px solid #cedbd9';
		document.getElementById("basics_t"+i).style.top = '0px';
		document.getElementById("basics_t_txt"+i).style.color = '#fff';
	}
	
	currTab.style.background = 'none';
	currTab.style.backgroundColor = '#FFFFFF';
	currTab.style.borderBottom = '0px solid black';
	currTab.style.top = '1px';
	currTabText.style.color = '#000000';
	
	setCurrTabContent(selectedTab);
}

function setCurrTabContent(selectedTab)
{
	var mainTabHolder = document.getElementById('basics_content');
	var mainTopicsItems = document.getElementById('basics_mainTopics');
	var whatsNewItems = document.getElementById('basics_whats_new');
	var stayConnectedItems = document.getElementById('basics_stay_connected');
	mainTopicsItems.style.display = 'none';
	whatsNewItems.style.display = 'none';
	stayConnectedItems.style.display = 'none';
	
	switch (selectedTab)
	{
		case 1:
			mainTabHolder.innerHTML = mainTopicsItems.innerHTML;
			break;
		case 2:
			mainTabHolder.innerHTML = whatsNewItems.innerHTML;
			break;
		case 3:
			mainTabHolder.innerHTML = stayConnectedItems.innerHTML;
			break;
	}
}

function toggleSlide(element, des_height)
{
	var currentHeight = $('#'+element).css('height');

	if (currentHeight == '0px'){
	$('#'+element).animate({
    height: des_height
  	}, 500);
	}
	
	else{
	$('#'+element).animate({
    height: 0
  	}, 500);
	}
}

function changeImagesArray(array) {		var d = document; var img;		for (var i=0; i<array.length; i+=2) {			img = null; var n = array[i];			if (d.images) {img = d.images[n];}			
	if (!img && d.getElementById) {img = d.getElementById(n);}			if (img) {img.src = array[i+1];}		}	}function changeImages() {	changeImagesArray(changeImages.arguments);}
		
		// The different text sizes we support.
// var sizes = new Array("60%", "70%", "80%", "90%", "100%", "110%", "120%", "130%", "140%");
var sizes = new Array( "70%", "80%", "90%", "100%", "110%", "120%", "126%");

// ## CHANGED defaultSize from 2 to 3 ## 
var defaultSize = 3; // default to 100%
// Holds the index of the current size.
var currentSize = defaultSize;
// Special variable for Mozilla because of how it handles CSS rules.
var ruleCount;
// Domain of the session cookie.
var sessionCookieDomain = ".fda.gov";
// Set the div string.
var divStr = "#content";

// Here, get the current value of the cookie, if it exists, and style the page accordingly.
if (getCookie("textSize") != "") {
   currentSize = Number(getCookie("textSize"));
   /* changes done as part of task 324. Browser specific font changing is code commented
   The setStyle() is called from htm file*/

	/*if (document.styleSheets[1].cssRules) { // Mozilla
		setStyleMozilla(divStr);
	}
	else { // IE
		setStyleIE(divStr);
	}*/
}

// Parses through the current cookie, if it exists, and pulls out the relevant value.
function getCookie(name) {
   if (document.cookie.length > 0) {
	   var start = document.cookie.indexOf(name + "=");
		if (start != -1) {
		   start += (name.length + 1);
			var end = document.cookie.indexOf(";", start);
			if (end == -1) {
			   end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		}
	}
	return "";
}

// Make the text size either bigger or smaller.
function changeTextSize(offset) {
	currentSize = currentSize + offset;
	if (currentSize >= sizes.length) { // don't overflow the sizes array
	   currentSize = sizes.length - 1;
	}
	if (currentSize < 0) { // don't underflow the sizes array
		currentSize = 0;
   }

   /* changes done as part of task 324. Browser specific font changing code is commented 
   and is made same to all kinds of browsers*/
   
	/*if (document.styleSheets[1].cssRules) { // Mozilla
		if (document.styleSheets[1].cssRules[0]) {
			setStyleMozilla(divStr);
		}
	}
	else if (document.styleSheets[0].rules) { // IE
		setStyleIE(divStr);
	}
	else { // do nothing for unrecognized browsers
	}*/
	setStyle();
	// Set the cookie
	document.cookie = 'textSize='+ currentSize + '; path=/; domain=' + sessionCookieDomain;
}

function setStyleMozilla(divStr) {
	ruleCount = document.styleSheets[1].cssRules.length;
	document.styleSheets[1].insertRule(divStr + " { font-size: " + sizes[currentSize] + "; }", ruleCount);
}

function setStyleIE(divStr) {
	//alert("setting style "+sizes[currentSize]);
	document.styleSheets[0].addRule(divStr, "font-size: " + sizes[currentSize] + ";");
}

function setStyle() {
	document.getElementById("content").style.fontSize = sizes[currentSize];
}

// Function to fix the right/bottom margins on rounded corner spans post-load, for IE
// This is necessary because IE is dumb and sometimes renders an extra pixel on the right/bottom
function fixMargin(obj) {
   if (document.styleSheets[0].rules) { // only want to do this for IE
      var bottomMarginSize = ((obj.offsetHeight % 2) == 1) ? "-1px" : "0px";
      var rightMarginSize = ((obj.offsetWidth % 2) == 1) ? "-1px" : "0px";
      var spans = obj.getElementsByTagName('span');
      for (var i=0; i<spans.length; i++) {
         if (spans[i].className.match(/b[l|r]_/)) {
	    spans[i].style.marginBottom = bottomMarginSize;
         }
         if (spans[i].className.match(/[t|b]r_/)) {
            spans[i].style.marginRight = rightMarginSize;
         }
      }
   }
}

<!--
$(document).ready(function(){
	// Possible link list items from #content, .middle-column,.middle-column_2, or .middle-column_3	
	var x = 0;
	if ( ($("div.middle-column a").length) > 0 )
		var y = $("div.middle-column a");
	else if ( ($("div.middle-column_2 a").length) > 0 )
		var y = $("div.middle-column_2 a");
	else if ( ($("div.middle-column_3 a").length) > 0 )
		var y = $("div.middle-column_3 a");
	else 
		var y = $("div#content a");
	
	// Generates the Footnote Links
	$("div#footnote div").append("<ol>" +
		$(y).map(function()
		{
			var pattern1 = new RegExp("\/");
			var pattern2 = new RegExp("http:");
			
			if ( pattern1.test( $(this).attr("href") ) == true )
			{
				x = x + 1;
				if (pattern2.test( $(this).attr("href") ) == true )
				{
					$(this).after("<span class='footnote_number'><sup>" + x + "</sup></span>");
					return ("<li>" + $(this).attr("href") + "</li>");
				}
				else
				{
					$(this).after("<span class='footnote_number'><sup>" + x + "</sup></span>");
					return ("<li><!--$FDAGovSiteHeader-->" + $(this).attr("href") + "</li>");
				}
			}
		}).get().join("")
	)+"</ol>";
});
//-->

/*  Table sorting script  */
/* You can change these values */
var image_path = "/ucm/groups/fdagov-public/@system/documents/system/";
var image_up = "img_fdagov_sortup.gif";
var image_down = "img_fdagov_sortdown.gif";
var image_none = "img_fdagov_sortnone.gif";
var europeandate = false;
var alternate_row_colors = true;

/* Don't change anything below this unless you know what you're doing */
addEvent(window, "load", sortables_init);

var SORT_COLUMN_INDEX;
var thead = false;

function sortables_init() {
	// Find all tables with class sortable and make them sortable
	if (!document.getElementsByTagName) return;
	tbls = document.getElementsByTagName("table");
	for (ti=0;ti<tbls.length;ti++) {
		thisTbl = tbls[ti];
		if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
			ts_makeSortable(thisTbl);
		}
	}
}

function ts_makeSortable(t) {
	if (t.rows && t.rows.length > 0) {
		if (t.tHead && t.tHead.rows.length > 0) {
			var firstRow = t.tHead.rows[t.tHead.rows.length-1];
			thead = true;
		} else {
			var firstRow = t.rows[0];
		}
	}
	if (!firstRow) return;
	
	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i=0;i<firstRow.cells.length;i++) {
		var cell = firstRow.cells[i];
		var txt = ts_getInnerText(cell);
		if (cell.className != "unsortable" && cell.className.indexOf("unsortable") == -1) {
			cell.innerHTML = '<a href="#" class="sortheader" onclick="ts_resortTable(this, '+i+');return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;<img src="'+ image_path + image_none + '" alt="&darr;"/></span></a>';
		}
	}
	if (alternate_row_colors) {
		alternate(t);
	}
}

function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}

function ts_resortTable(lnk, clid) {
	var span;
	for (var ci=0;ci<lnk.childNodes.length;ci++) {
		if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
	}
	var spantext = ts_getInnerText(span);
	var td = lnk.parentNode;
	var column = clid || td.cellIndex;
	var t = getParent(td,'TABLE');
	// Work out a type for the column
	if (t.rows.length <= 1) return;
	var itm = "";
	var i = 0;
	while (itm == "" && i < t.tBodies[0].rows.length) {
		var itm = ts_getInnerText(t.tBodies[0].rows[i].cells[column]);
		itm = trim(itm);
		if (itm.substr(0,4) == "<!--" || itm.length == 0) {
			itm = "";
		}
		i++;
	}
	if (itm == "") return; 
	sortfn = ts_sort_caseinsensitive;
	if (itm.match(/^\d\d[\/\.-][a-zA-z][a-zA-Z][a-zA-Z][\/\.-]\d\d\d\d$/)) sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/\.-]\d\d[\/\.-]\d\d\d{2}?$/)) sortfn = ts_sort_date;
	if (itm.match(/^-?[£$€Û¢´]\d/)) sortfn = ts_sort_numeric;
	if (itm.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) sortfn = ts_sort_numeric;
	SORT_COLUMN_INDEX = column;
	var firstRow = new Array();
	var newRows = new Array();
	for (k=0;k<t.tBodies.length;k++) {
		for (i=0;i<t.tBodies[k].rows[0].length;i++) { 
			firstRow[i] = t.tBodies[k].rows[0][i]; 
		}
	}
	for (k=0;k<t.tBodies.length;k++) {
		if (!thead) {
			// Skip the first row
			for (j=1;j<t.tBodies[k].rows.length;j++) { 
				newRows[j-1] = t.tBodies[k].rows[j];
			}
		} else {
			// Do NOT skip the first row
			for (j=0;j<t.tBodies[k].rows.length;j++) { 
				newRows[j] = t.tBodies[k].rows[j];
			}
		}
	}
	newRows.sort(sortfn);
	if (span.getAttribute("sortdir") == 'down') {
			ARROW = '&nbsp;&nbsp;<img src="'+ image_path + image_down + '" alt="Sort Descending"/>';
			newRows.reverse();
			span.setAttribute('sortdir','up');
	} else {
			ARROW = '&nbsp;&nbsp;<img src="'+ image_path + image_up + '" alt="Sort Ascending"/>';
			span.setAttribute('sortdir','down');
	} 
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0; i<newRows.length; i++) { 
		if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) {
			t.tBodies[0].appendChild(newRows[i]);
		}
	}
    // do sortbottom rows only
    for (i=0; i<newRows.length; i++) {
		if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) 
			t.tBodies[0].appendChild(newRows[i]);
	}
	// Delete any other arrows there may be showing
	var allspans = document.getElementsByTagName("span");
	for (var ci=0;ci<allspans.length;ci++) {
		if (allspans[ci].className == 'sortarrow') {
			if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
				allspans[ci].innerHTML = '&nbsp;&nbsp;<img src="'+ image_path + image_none + '" alt="No Sort Selected"/>';
			}
		}
	}		
	span.innerHTML = ARROW;
	alternate(t);
}

function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}

function sort_date(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	dt = "00000000";
	if (date.length == 11) {
		mtstr = date.substr(3,3);
		mtstr = mtstr.toLowerCase();
		switch(mtstr) {
			case "jan": var mt = "01"; break;
			case "feb": var mt = "02"; break;
			case "mar": var mt = "03"; break;
			case "apr": var mt = "04"; break;
			case "may": var mt = "05"; break;
			case "jun": var mt = "06"; break;
			case "jul": var mt = "07"; break;
			case "aug": var mt = "08"; break;
			case "sep": var mt = "09"; break;
			case "oct": var mt = "10"; break;
			case "nov": var mt = "11"; break;
			case "dec": var mt = "12"; break;
			// default: var mt = "00";
		}
		dt = date.substr(7,4)+mt+date.substr(0,2);
		return dt;
	} else if (date.length == 10) {
		if (europeandate == false) {
			dt = date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
			return dt;
		} else {
			dt = date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
			return dt;
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (europeandate == true) {
			dt = yr+date.substr(3,2)+date.substr(0,2);
			return dt;
		} else {
			dt = yr+date.substr(0,2)+date.substr(3,2);
			return dt;
		}
	}
	return dt;
}

function ts_sort_date(a,b) {
	dt1 = sort_date(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
	dt2 = sort_date(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));
	
	if (dt1==dt2) {
		return 0;
	}
	if (dt1<dt2) { 
		return -1;
	}
	return 1;
}
function ts_sort_numeric(a,b) {
	var aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	aa = clean_num(aa);
	var bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	bb = clean_num(bb);
	return compare_numeric(aa,bb);
}
function compare_numeric(a,b) {
	var a = parseFloat(a);
	a = (isNaN(a) ? 0 : a);
	var b = parseFloat(b);
	b = (isNaN(b) ? 0 : b);
	return a - b;
}
function ts_sort_caseinsensitive(a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
	if (aa==bb) {
		return 0;
	}
	if (aa<bb) {
		return -1;
	}
	return 1;
}
function ts_sort_default(a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	if (aa==bb) {
		return 0;
	}
	if (aa<bb) {
		return -1;
	}
	return 1;
}
function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,	NS6 and Mozilla
// By Scott Andrew
{
	if (elm.addEventListener){
		elm.addEventListener(evType, fn, useCapture);
		return true;
	} else if (elm.attachEvent){
		var r = elm.attachEvent("on"+evType, fn);
		return r;
	} else {
		alert("Handler could not be removed");
	}
}
function clean_num(str) {
	str = str.replace(new RegExp(/[^-?0-9.]/g),"");
	return str;
}
function trim(s) {
	return s.replace(/^\s+|\s+$/g, "");
}
function alternate(table) {
	// Take object table and get all it's tbodies.
	var tableBodies = table.getElementsByTagName("tbody");
	// Loop through these tbodies
	for (var i = 0; i < tableBodies.length; i++) {
		// Take the tbody, and get all it's rows
		var tableRows = tableBodies[i].getElementsByTagName("tr");
		// Loop through these rows
		// Start at 1 because we want to leave the heading row untouched
		for (var j = 0; j < tableRows.length; j++) {
			// Check if j is even, and apply classes for both possible results
			if ( (j % 2) == 0  ) {
				if ( !(tableRows[j].className.indexOf('odd') == -1) ) {
					tableRows[j].className = tableRows[j].className.replace('odd', 'even');
				} else {
					if ( tableRows[j].className.indexOf('even') == -1 ) {
						tableRows[j].className += " even";
					}
				}
			} else {
				if ( !(tableRows[j].className.indexOf('even') == -1) ) {
					tableRows[j].className = tableRows[j].className.replace('even', 'odd');
				} else {
					if ( tableRows[j].className.indexOf('odd') == -1 ) {
						tableRows[j].className += " odd";
					}
				}
			} 
		}
	}
}

//These functions are used for FDA Basics Charts and analytics
//UCM1176986
//UCM215588
var tempChart; var tempColor;
var charts = new Array();
var currYear = null;

function writeChart(passedChart, type, title, color, c_max, c_interval)
{
        Highcharts.visualize = function(table, options) {
   // the categories
   options.xAxis.categories = [];
   $('tbody th', table).each( function(i) {
      options.xAxis.categories.push(this.innerHTML);
   });
  
   // the data series
   options.series = [];
   $('tr', table).each( function(i) {
      var tr = this;
      $('th, td', tr).each( function(j) {
         if (j > 0) { // skip first column
            if (i == 0) { // get the name and init the series
               options.series[j - 1] = {
                                  color: color,
                                  lineWidth: 3,
                  name: this.innerHTML,
                  data: [],
                                  marker: {
                                symbol: 'circle',
                        lineWidth: 2
                                  }
               };
            } else { // add values
                           var b = breakCommas(this);
               options.series[j - 1].data.push(parseFloat(b));
            }
         }
      });
   });
  
   var passedChart = new Highcharts.Chart(options);
   charts.push(passedChart);
}

function breakCommas(b)
{
        b = b.innerHTML;
        var c_loc = b.indexOf(',');
        while(c_loc != -1){
        var t_b = b.substring(c_loc+1, b.length);
        var t_a = b.substring(0, c_loc);
        b = t_a + t_b;
        c_loc = b.indexOf(',');
        }
       
        return(b);

}

function checkDec(a)
{
        var b = a.toString();
        if (b.indexOf(".") != -1)
                return true;
}
  
// On document ready, call visualize on the datatable.
$(document).ready(function() {            
   var table = document.getElementById('table_' + type),
   options = {
         chart: {
            renderTo: 'bm_'+type+'_container',
            defaultSeriesType: 'line',
                        backgroundColor: null,
                        margin: [45,20,85,80]
         },
                 credits: {
                enabled: false
         },
         title: {
            text: title
         },
         xAxis: {
                        labels: {
            formatter: function() {
                                var ta = this.value;
                                var t_loc = ta.indexOf(' ');
                                var tb = ta.substring(t_loc, ta.length);
                                ta = ta.substring(0, t_loc);
                                ta = '<b>'+ta + '</b><br/>' + tb;
                return ta;
            }
        }
         },
         yAxis: {
                        endOnTick: true,
                        min: 0,
                        max: c_max,
                        tickInterval: c_interval,
            title: {
               text: type,
                           margin: 60
            },
                        alternateGridColor: '#F5F5F5',
                        labels: { formatter: function() {
                                                        return (Highcharts.numberFormat(this.value, 0, ','))
                                                }
                                        }
               
         },
         tooltip: {
            formatter: function() {
                           if (checkDec(this.y) == true)
                                return ('<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y);
                           else
                return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, ',');
            }
         }
      };
     
   Highcharts.visualize(table, options);
});
}

function setCurrent(switchToA, switchToB)
{
        for (i=0; i<charts.length; i++)
        {
                try{
                        charts[i].destroy();
                }
                catch (error)
                {}
        }
        var current = document.getElementById('bm_currContent');
        var b = "<div id="+switchToA+">"+document.getElementById(switchToA).innerHTML+"</div>";
        if (typeof switchToB != 'undefined')
                b += "<div id="+switchToB+">"+document.getElementById(switchToB).innerHTML+"</div>";
       
        current.innerHTML = b;
        current.style.height = 'auto';
}

function initHide()
{
        var nW = $(".bm_wrap").length;
        $('.bm_months_container').css('height', '0px');
        var a;
        for (i=1; i<nW+1; i++){
                a = document.getElementById('bm_wrap_' + i);
                a.style.display = 'none';
        }
}

function setTab(c)
{
var nT = $('#bm_tabs ul li').length;
        for (i=0; i<nT; i++)
        {
                var tempTab = document.getElementById('tab'+i);
                tempTab.style.top = '0px';
                tempTab.style.background = '#E6F0F5';
        }

        var changeTab = document.getElementById('tab'+c);
        changeTab.style.top = '1px';
        changeTab.style.borderBottom = '0px solid black';
        changeTab.style.background = '#fff';
}

function slideOpenMonths(p_year)
{
var desH =  $('#bm_months_'+p_year+' ul').height();
desH += 30;

if (p_year != currYear)
{
        $('#bm_months_'+p_year).animate({
                height: desH + 'px'
                }, 500, function(){
        });
        slideCloseMonths();
        currYear = p_year;
}
else
        slideCloseMonths();
}


function slideCloseMonths()
{
$('#bm_months_'+currYear).animate({
        height: '0px'
        }, 500, function(){
});
currYear = null;
}    
//End of FDA Basics Charting Functions

// This function supports the use multiple tabs

(function($){ 
     $.fn.extend({  
         tabify: function( callback ) {
         	
			function getHref(el){
				hash = $(el).find('a').attr('href');
				hash = hash.substring(0,hash.length-4);
				return hash;
			}
			
		 	function setActive(el){
		 		
				$(el).addClass('active');
				$(getHref(el)).show();
				$(el).siblings('li').each(function(){
					$(this).removeClass('active');
					$(getHref(this)).hide();
				});
			}
			
			return this.each(function() {
			
				var self = this;
				var	callbackArguments 	=	{'ul':$(self)};
					
				$(this).find('li a').each(function(){
					$(this).attr('href',$(this).attr('href') + '-tab');
				});
			
				function handleHash(){
					
					if(location.hash && $(self).find('a[href=' + location.hash + ']').length > 0){				
						setActive($(self).find('a[href=' + location.hash + ']').parent());
					}
				}
				
				if(location.hash){
					handleHash();
				}
					
				setInterval(handleHash,100);
				
				$(this).find('li').each(function(){
					if($(this).hasClass('active')){
						$(getHref(this)).show();
					} else {
						$(getHref(this)).hide();
					}
				});
				
				if(callback){
					callback(callbackArguments);
				}	
				
            }); 
        } 
    }); 
})(jQuery);


function setActiveTab(){
/* 

Sets the active tab in the top navigation by parsing the URL.
IF the active tab is not one of the major centers (drugs, food, etc)
	no tab will be highlighted

Should the site section names change or be re-ordered, the siteSections array will need to be altered.
	
*/

var siteSections = ["Home", "Food", "Drugs", "MedicalDevices", "Radiation-EmittingProducts", "BiologicsBloodVaccines", "AnimalVeterinary", "Cosmetics", "TobaccoProducts"]; // home only used as a location placeholder.

	var thisLocation = location.pathname.split("/")[1];
	if (thisLocation.toLowerCase() == "fdagov") // if WCMS get next location
		thisLocation = location.pathname.split("/")[2];
	
	var position;
	
	
	if (thisLocation.length == 0){
		position = 0;
	}
		
	for (i=0; i<siteSections.length; i++){
		if (thisLocation == siteSections[i])
			position = i;
	}
	
	// set class on tab using position
	var thisTab = $("#fda-topmenu .menu-tabbed li a")[position];
	if(isNaN(thisLocation) == true)
		$(thisTab).addClass("selected-tab");
}