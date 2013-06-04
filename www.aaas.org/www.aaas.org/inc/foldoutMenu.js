/**********************************************************************************
FoldoutMenu
*   Copyright (C) 2001 <a href="http://www.dhtmlcentral.com/dhtmlcentral/thomas_brattli.asp">Thomas Brattli</a>
*   This script was released at DHTMLCentral.com
*   Visit for more great scripts!
*   This may be used and changed freely as long as this msg is intact!
*   We will also appreciate any links you could give us.
*
*   Made by <a href="http://www.dhtmlcentral.com/dhtmlcentral/thomas_brattli.asp">Thomas Brattli</a>
*********************************************************************************/

function lib_bwcheck(){ //Browsercheck (needed)
	// *** MOD BEGIN ~ 2006-05-01 ~ BSWEENEY ***
	// This function was not designed to detect IE7/IE8, resulting in a 
	// severely broken version of the FoldoutMenu. I've updated the code 
	// by adding checks for IE7/IE8.
	// This function was not designed to detect Safari. Though no adverse 
	// affects are known [Brian Sweeney has] added 
	// the check for future use.
	this.ver=navigator.appVersion
	this.agent=navigator.userAgent
	this.dom=document.getElementById?1:0
	this.opera5=this.agent.indexOf("Opera 5")>-1
	this.safari=this.agent.indexOf("Safari")>-1
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0;
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
	this.ie7=(this.ver.indexOf("MSIE 7")>-1 && this.dom && !this.opera5)?1:0;
	this.ie8=(this.ver.indexOf("MSIE 8")>-1 && this.dom)?1:0;
	this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
	this.ie=this.ie4||this.ie5||this.ie6||this.ie7||this.ie8
	this.mac=this.agent.indexOf("Mac")>-1
	this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0;
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie8 || this.ie7 || this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5)
	// *** MOD END ***
	return this
}
var bw=new lib_bwcheck()


/*** variables you can configure ***/

var stayFolded = false			//Stay open when you click a new toplink?
foldImg = 1						//Do you want images (if not set to 0 and remove the images from the body)?
mainOffsetY = 0					//Vertical space adjustment between the main items, in pixels.

//This is the default image.
//Remember to change the actual images in the page as well, but remember to keep the name of the image.
var unImg=new Image();
// P2061's image:
// unImg.src='/images/plus.gif'
 unImg.src='/images/pixel.gif'
// unImg.src='/images/submenu_arrow_on.gif'

var exImg=new Image();					//Making an image variable...
// Project 2061's image:
// exImg.src='/images/minus.gif'
exImg.src='/images/submenu_arrow_down.gif'	//...this is the source of the image that it changes to when the menu expands.

// NOTE: if you change the position of divCont from absolute to relative, you can put the foldoutmenu in a table.
// HOWEVER it will no longer work in netscape 4. If you wish to support netscape 4, you have to use absolute positioning.

/*** There should be no need to change anything beyond this. ***/



// A unit of measure that will be added when setting the position of a layer.
var px = bw.ns4||window.opera?"":"px";

if(navigator.userAgent.indexOf('Opera')>-1 && document.getElementById){ //Opera 5 resize fix.
	scrX= innerWidth; scrY= innerHeight;
	document.onmousemove= function(){
		if(scrX<innerWidth-10 || scrY<innerHeight-10 || scrX>innerWidth+10 || scrY>innerHeight+10){
			scrX = innerWidth;
			scrY = innerHeight;
			initFoldout();
		}
	};
}

//object constructor...
function makeMenu(obj,nest){
	nest= (!nest)?"":'document.'+nest+'.';
	this.el= bw.ie4?document.all[obj]:bw.ns4?eval(nest+'document.'+obj):document.getElementById(obj);
   	if ( typeof(this.el) != "undefined" && this.el != null ) {
   		this.css= bw.ns4?this.el:this.el.style;
		this.ref= bw.ns4?this.el.document:document;
		this.x= (bw.ns4||bw.opera5)?this.css.left:this.el.offsetLeft;
		this.y= (bw.ns4||bw.opera5)?this.css.top:this.el.offsetTop;
		this.h= (bw.ie||bw.ns6)?this.el.offsetHeight:bw.ns4?this.ref.height:bw.opera5?this.css.pixelHeight:0;
		// MODIFIED ~ BSWEENEY ~ 2005-09-02
		// If an menu element is set to display:none Safari will return NaN for it's height.
		// In order for following items to be positioned appropriately we have to make sure that 
		// if no height is available that the height is set to zero.
		typeof(this.h)=='undefined'?this.h=0:null;
		// END MODIFIED
    	this.vis= b_vis;
		this.hideIt= b_hideIt;
    	this.showIt= b_showIt;
    	this.moveIt= b_moveIt;
    	this.resizeIt= b_resizeIt;
		this.present = true;
	} else {
		this.present = false;
	}
	return this;
}

//object methods...
function b_showIt(){this.css.visibility='visible'}
function b_hideIt(){this.css.visibility='hidden'}
function b_vis(){if(this.css.visibility=='hidden' || this.css.visibility=='HIDDEN' || this.css.visibility=='hide') return true;}
function b_moveIt(x,y){this.x=x; this.y=y; this.css.left=this.x+px; this.css.top=this.y+px}
function b_resizeIt(y){
	if (bw.ie||bw.ns6) {
		this.css.height=y;
	} else if ( bw.ns4 ) {
		this.ref.height=y;
	} else if ( bw.opera5 ) {
		this.css.pixelHeight=y;
	}
}

/************************************************************************************
This is the function that changes the sub menus to folded or unfolded state.
************************************************************************************/
function menu(num){
	var cHeight = 0;

	if(bw.bw){
		if (!stayFolded){
			for (var i=0; i<oSub.length-1; i++){
				if (i!=num){
					oSub[i].hideIt()
					if (foldImg) {
						// MODIFIED ~ BSWEENEY ~ 2005-09-02
						// With the addition of non-menu items (i.e. the site tools) 
						// we had to use a pixel image to replace the default +/- image
						// so that no major changes had to be made to the menu script.
						// By default the script was changing all images, this modification
						// was made to take into account the possibility of non-menu items;
						// the image is only changed if it matches the "open" image.
						if (oTop[i].ref["imgA"+i].src.substr(oTop[i].ref["imgA"+i].src.lastIndexOf('/')+1, oTop[i].ref["imgA"+i].src.length) == exImg.src.substr(exImg.src.lastIndexOf('/')+1, exImg.src.length)) {
							oTop[i].ref["imgA"+i].src = unImg.src;
						}
						// END MODIFIED
					}
				}
			}
			for(var i=1; i<oTop.length; i++){
				cHeight = cHeight + oTop[i].h;
				oTop[i].moveIt(0,oTop[i-1].y+oTop[i-1].h)
			}
		}
		if (oSub[num].vis()){
			oSub[num].showIt()
			if (foldImg)oTop[num].ref["imgA"+num].src = exImg.src
			cHeight = cHeight +oSub[num].h;
		}else{
			oSub[num].hideIt()
			if(foldImg)oTop[num].ref["imgA"+num].src = unImg.src
		}
		for(var i=1; i<oTop.length; i++){
			if (!oSub[i-1].vis()) oTop[i].moveIt(0,oTop[i-1].y+oTop[i-1].h+oSub[i-1].h+mainOffsetY)
			else oTop[i].moveIt(0,oTop[i-1].y+oTop[i-1].h+mainOffsetY)
		}
	}
	// *** MOD BEGIN ~ 2006-01-19 ~ BSWEENEY ***
	// When we [Project 2061] added the "breadcrumb" to the template we wanted to move the menu 
	// down slightly. The height of the leftnav container had to be adjusted 
	// to take into account the modification. Original value "cHeight+49"

// Altered outside of Project 2061.
//	oCont.resizeIt(cHeight+53);
oCont.resizeIt(cHeight+49);

	// *** MOD END ***
}

/*********************************************************************
The init function... there should be no need to change anything here.
*********************************************************************/
function initFoldout(){
	//Making the containing menu object if present....
	oCont = new makeMenu('divCont');
	if ( oCont.present != false ) {

		//Fixing the browsercheck for opera... this can be removed if the browsercheck has been updated!!
		//bw.opera5 = (navigator.userAgent.indexOf("Opera")>-1 && document.getElementById)?true:false
		//if (bw.opera5) bw.ns6 = 0

		oTop = new Array()
		oSub = new Array()
		//Making the objects and hiding the subs...
		for (var i=0; i<FoldNumber+1; i++){
			oTop[i] = new makeMenu('divTop'+i,'divCont')
			oSub[i] = new makeMenu('divSub'+i,'divCont.document.divTop'+i)
			oSub[i].hideIt()
		}

		//Positioning the top objects...
		// *** MOD BEGIN ~ 2006-01-19 ~ BSWEENEY ***
		// When we [Project 2061] added the "breadcrumb" to the template we wanted to move the menu 
		// down slightly. The height of the leftnav container had to be adjusted 
		// to take into account the modification. Original value "0"

// Deactivated outside of 2061. Do not use. -- MG
//		var cHeight = 4;
// Original:
		var cHeight = 0;

		// *** MOD END ***

		// *** MOD BEGIN ~ 2006-01-19 ~ BSWEENEY ***
		// When we [Project 2061] added the "breadcrumb" to the template we wanted to move the menu 
		// down slightly. Changed the oTop[0].moveIt() values from their original values of 
		// (0,32) and (0,30) respectively. Also made a change to the CSS to accommodate the 
		// leftnav header.

// Deactivated outside of 2061. Do not use. -- MG
//		if (browser == 'Netscape' && version < 5.0) oTop[0].moveIt(0,37)
//		else oTop[0].moveIt(0,35)

// Original:
		if (browser == 'Netscape' && version < 5.0) oTop[0].moveIt(0,32)
		else oTop[0].moveIt(0,30)

		// *** MOD END ***

		for (var i=1; i<oTop.length; i++){
			cHeight = cHeight + oTop[i].h;
			oTop[i].moveIt(0, oTop[i-1].y+oTop[i-1].h);
			if ( i==(oTop.length-1) ) {
				if (bw.ns4) oTop[i].hideIt();
			}
		}

		//Resizeing and showing the containing menu object...
		oCont.resizeIt(cHeight+49);
		oCont.showIt();
	}
}