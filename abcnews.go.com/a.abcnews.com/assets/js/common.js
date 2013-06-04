if(typeof gSafeOnload == "undefined"){
	var gSafeOnload = new Array(0);
	var gSafeOnunload = new Array(0);
	var gSafeResize = new Array(0);
	var isWindowLoaded = false;	
	
	function SafeOnload()
	{	var func;
		isWindowLoaded = true;
		while(gSafeOnload.length>0){
			try{
				func = gSafeOnload.shift();
				func();
			}
			catch(e){}
		}
	}
	
	function SafeOnunload()
	{	var func;
		while(gSafeOnunload.length>0){
			try{
				func = gSafeOnunload.shift();
				func();
			}
			catch(e){}
		}
	}
	
	if (window.onload != SafeOnload){
		if  ((typeof window.onload) == "function"){
			gSafeOnload.push(window.onload);
		}
		window.onload = SafeOnload;
	}
	if (window.onunload != SafeOnunload){
		if  ((typeof window.onunload) == "function"){
			gSafeOnunload.push(window.onunload);
		}
		window.onunload = SafeOnunload;
	}
	function addOnload(f){	
		if(!isWindowLoaded){
			gSafeOnload.push(f);
		}
		else{
			f();
		}
	}
	
	function addOnunload(f){	
		gSafeOnunload.push(f);
	}
	
	addOnload(function(){
		var el = getBodyElement();
		var indicators = getElementsWithAttribute(el,'class','loading-indicator');
		for(var i=0;i<indicators.length;i++){
			indicators[i].style.display="none";
		}
	});
	
	function addResize(f){	
		gSafeResize.push(f);
	}
	
	function SafeResize(){
		var len = gSafeResize.length;
		for(var i=0;i<len;i++){
			gSafeResize[i]();
		}
	}
	
	if (window.onresize != SafeResize){
		if  ((typeof window.onresize) == "function"){
			addResize(window.onresize);
		}
		window.onresize = SafeResize;
	}
	
	/*document.onkeydown = function(evt){
		if(!evt) var evt = event;
		var target = evt.target ? evt.target : evt.srcElement;
		//if keydown target is not a form input, focus the search box
		if(target == null || (typeof target.value=='undefined') || target.type=='image'){
			var el = document.getElementById('searchtext');
			if(el!=null){
				if(isAlphaChar(evt)){
					el.focus();
				}
			}
		}
	}*/
	
	function isAlphaChar(evt){
		if(!evt) var evt = event;
		return !evt.altKey && !evt.ctrlKey && evt.keyCode >=65 && evt.keyCode <=90;
	}
	
	function getEventTarget(evt){
        var targ;
        if (!evt) var evt = window.event;
        if (evt.target) targ = evt.target;
        else if (evt.srcElement) targ = evt.srcElement;
        if (targ.nodeType == 3) // defeat Safari bug
                targ = targ.parentNode;
        return targ;
	}
	
	function descendsFrom(el,ancestor){
		try{
		 	while(el.parentNode!=null){
		 		if(el.parentNode == ancestor) return true;
		 		el=el.parentNode;
		 	}
	 	}
	 	catch(e){}
	 	return false;
	 }
	 
	 function stopEvent(e){
    	if(!e){
    		e = event;
    	}
    	 e.cancelBubble = true;
         if (e.stopPropagation) { e.stopPropagation(); }
         if (e.preventDefault) {e.preventDefault();}
    }
    
    function absLeft(e){
    	if (!e) var e = window.event;
    	if (e.pageX ){
    		return e.pageX;
    	}
    	else if(e.clientX){
    		return e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    	}
    }
    
    function absTop(e){
    	if (!e) var e = window.event;
    	if (e.pageY ){
    		return e.pageY;
    	}
    	else if(e.clientY){
    		return e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    	}
    }
    
    //dim = "Left" or "Top"
    function calcPosition(object, dim){
        var tmpElt = object;
        var pos = 0;
        while(tmpElt != null &&  tmpElt.tagName != "BODY" ) {
        	pos += parseInt(tmpElt["offset" + dim]);
            tmpElt = tmpElt.offsetParent;
        }
        return pos;
    }
    
     //dim = "Left" or "Top"
    function calcPosition(object, dim, ancestor){
        var tmpElt = object;
        var pos = 0;
        while(tmpElt != null &&  tmpElt != ancestor ) {
        	pos += parseInt(tmpElt["offset" + dim]);
            tmpElt = tmpElt.offsetParent;
        }
        return pos;
    }
    
    function getHeadElement(){
    	var head = document.getElementsByTagName('head')[0];
		if(head==null){
			head = document.getElementsByTagName('body')[0];
		}
		return head;
    }
    
    function getBodyElement(){
    	return document.getElementsByTagName('body')[0];
    }
    
    function createCookie(name,value,days,domain) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		
    		if(domain !=null && typeof domain != 'undefined'){
    			domain = "; domain=" + domain;
    		}	
      		
      		//alert("All: "+value+expires+domain+"; path=/");
      		
		document.cookie = name+"="+value+expires+domain+"; path=/";
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function tgSearch(tg) {
		var tgQuery = '';
		tgQueryVal = tg.searchtext.value;
		if(tgQueryVal.trim() == ''){
			tgQueryVal='ABC News';
		}
		var baseUrl = window.searchBaseUrl != null ? window.searchBaseUrl : 'http://abcnews.go.com';
		tgQuery = baseUrl+'/search?searchtext=' + encodeURIComponent(tgQueryVal);
		window.open(tgQuery,'_parent');
		return false;
	}
	
	function getUsersGreeting(staticBaseURL) {
	
		userFName = readCookie("USERFNAME")			
		
		if(isValidSWID() && isValidBLUE() &&  userFName != 'NRT') {
			if(userFName != null && userFName != 'null' && typeof userFName != 'undefined') {
				document.write("Welcome, " + userFName+" | ");
			}		
			document.write('<a href="http://abcnews.go.com/assets/globalLogout.html">Sign Out</a>');
		}
		else {
			document.write("<a href=\"https://register.go.com/global/abcnews/register?appRedirect="+escape(document.URL)+"\">Register</a> | ");
			document.write("<a href=\"https://register.go.com/global/abcnews/login?rd=true&appRedirect="+escape(document.URL)+"\">Sign In</a>");
			//document.write("<a href=\"\">&nbsp;&nbsp;(What's This?)</a>");
			
		}
	}

	function isValidIcaughtReg() {
		var ICAUGHTREG = readCookie("ICAUGHTREG");
		
		if(isValidSWID() && isValidBLUE() && ICAUGHTREG != null) {
			return true;
		}
		else {
			return false;
		}
	}
	function isValidSWID() {
		var SWID = readCookie("SWID");
		if(SWID != null) {
			SWID = SWID.toString();
		}
		if(SWID != null && SWID.length != 0 && SWID.charAt(0) == '{' && SWID.charAt(SWID.length-1) == '}') {
			return true;
		}
		else {
			return false;
		}
	}	
	function isValidBLUE() {
		var BLUE = readCookie("BLUE");
		//alert("BLUE: "+BLUE);
		if(BLUE != null && BLUE != 'null' && typeof BLUE != 'undefined') {
			return true;
		}
		else {
			return false;
		}
	}
	function eraseCookie( name, path, domain ) {

		if ( readCookie( name ) ) {
			document.cookie = name + '=' +
				( ( path ) ? ';path=' + path : '') +
				( ( domain ) ? ';domain=' + domain : '' ) +
				';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	}
	
	function setOpacity(object, opacity) {
		if(object){
			object.style.opacity = (opacity == 1 ? 0.99 : opacity);
			object.style.MozOpacity = (opacity == 1 ? 0.99 : opacity);
			object.style.KhtmlOpacity = opacity;
			if (object.style.setAttribute) {
				if(opacity==1){
					object.style.setAttribute("filter","");
				}
				else{
					object.style.setAttribute("filter",  "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opacity * 100) + ")");
				}
			}
		}
	}
	
	function getOpacity(object){
		if(object){
			if(object.style.display == 'none')
				return 0;
			if(object.style.opacity)
				return parseFloat(object.style.opacity);
			if(object.style.MozOpacity)
				return parseFloat(object.style.MozOpacity);
			if(object.style.KhtmlOpacity)
				return parseFloat(object.style.KhtmlOpacity);
			if(object.style.filter){
				var opacity = object.style.filter.match(/alpha\(opacity=(.*)\)/i);
				if(opacity[1]) return parseFloat(opacity[1]) / 100;
			}
		}
		return 1.0;
	}

	function getElementById(el,id){
		if(!isEmpty(el)){
			if(el.id && el.id == id){
				return el;
			}
			var eid = el.attributes ? el.attributes['id'] : null;
			if(eid && eid==id){
				return el;
			}
			if(el.childNodes){
				var len = el.childNodes.length;
				var cn, tel;
				for(var i=0;i<len;i++){
					cn = el.childNodes[i];
					if(cn.nodeType==1){
						tel = getElementById(cn,id);
						if(tel){
							return tel;
						}
					}
				}
			}
		}
		else{
			return document.getElementById(id);
		}
		return null;
	}
	
	function getElementsWithAttribute(el,name,value){
	 	var array = new Array();
	 	if(el!=null){
			var attr = el.getAttribute(name);
			if((typeof attr != "undefined") && attr==value){
				array[array.length]=el;
			}
			else if (name=='class' && (el.className==value)){
				array[array.length]=el;
			}
			var len = el.childNodes.length;
			var child;
			for(var i=0;i<len;i++){
				child = el.childNodes[i];
				if(child.nodeType==1){
					array = array.concat(getElementsWithAttribute(child,name,value));
				}
			}
	 	}
	 	return array;
	 }
	 
	function removeEventHandlers(el,recurse){
		el.onclick=null;
		el.ondblclick=null;
		el.onmousedown=null;
		el.onmouseup=null;
		el.onmouseover=null;
		el.onmouseout=null;
		el.onmouseenter=null;
		el.onmouseleave=null;
		el.onkeydown=null;
		el.onkeypress=null;
		el.onkeyup=null;
		el.onblur=null;
		el.onfocus=null;
		el.oncontextmenu=null;
		el.onmousemove=null;
		el.onchange=null;
		el.onreset=null;
		el.onselect=null;
		el.onsubmit=null;
		if(recurse){
			var i,child;
			var len = el.childNodes.length;
			for(i=0;i<len;i++){
				child = el.childNodes[i];
				if(child.nodeType==1){
					removeEventHandlers(child,recurse);
				}
			}
		}
	}
	
	function openPopup(url, name, width, height, features) {
		var newurl = url.toLowerCase();
		if (newurl.indexOf('playerindex') != -1 || newurl.indexOf('videologin') != -1) { //full window
			var popup = window.open(url);
			popup.focus();
		} else { //popup
			adjH = (height<635)?20:0;
			adjW = (width<741)?60:0;
			adjW = ((width<743)&&(width>741))?58:adjW;
			var winFeatures = (features) ? "," + features : "";
			var xPos = (screen.availWidth) / 2 - (width / 2);
			var yPos = (screen.availHeight / 2) - (height / 2);
			var winAttribs = "width=" + (width+adjW) + ",height=" + (height+adjH) + ",left=" + xPos + ",top=" + yPos + winFeatures;
			var popup = window.open(url, name, winAttribs);
			popup.focus();
		}
			
	}

	function isEmpty(arg){
		return (!arg || arg==null);
	}
	//fix IE flicker
	try{
		document.execCommand("BackgroundImageCache", false ,true);
	}
	catch(e){}
	function qsParam(keyParam) {
		var query = window.location.search.substring(1);
		var parms = query.split('&');
		for (var i=0; i<parms.length; i++) {
			var pos = parms[i].indexOf('=');
			if (pos > 0) {
				var key = parms[i].substring(0,pos);
				if(keyParam == key) {
					return parms[i].substring(pos+1);
				}
			}
		}
		return null;
	}	
	
	function loadScript(url){
		var head = getHeadElement();
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript"); 
		script.src = url;
		head.appendChild(script); 
	}
	
	abcNewsObj = new Object();
	abcNewsObj.strip = function(){
		for(n=1;n<arguments.length;n++){	
			this.tagTmp = document.getElementsByTagName(arguments[n]);
			for(i=0;i<this.tagTmp.length;i++){
				this.tmp = this.tagTmp[i];
				this.tmp1 = this.tmp.childNodes[0];
				this.tmp1.parentNode.removeChild(this.tmp1);
			}
		}
	}
	
}
//// Add array methods
if(!Array.prototype.shift) { // if this method does not exist..
	Array.prototype.shift = function(){
        firstElement = this[0];
        this.reverse();
        this.length = Math.max(this.length-1,0);
        this.reverse();
        return firstElement;
	}   
}
if(!Array.prototype.unshift) { // if this method does not exist..
    Array.prototype.unshift = function(){
		this.reverse();
		for(var i=arguments.length-1;i>=0;i--){
			this[this.length]=arguments[i]
		}
		this.reverse();
		return this.length
	}
}
if(!Array.prototype.push) { // if this method does not exist..
	Array.prototype.push = function(){
		for(var i=0;i<arguments.length;i++){
			this[this.length]=arguments[i];
		}
       	return this.length;
    }     
}
if(!Array.prototype.pop) { // if this method does not exist..
	Array.prototype.pop = function(){
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
    }
}
if(!Array.prototype.remove) {
	Array.prototype.remove = function(obj){
		for(var i=0;i<this.length;i++){
			if(this[i] == obj){
				this.slice(i,1);
				i--;
				this.length = Math.max(this.length-1,0);
			}
		}
	}
}
if(!Array.prototype.binarySearch) {
	Array.prototype.binarySearch = function(item,comparator){
	  var left = -1,
		  right = this.length,
		  mid,
		  comp;
	
	  while(right - left > 1)
	  {
		mid = (left + right) >>> 1;
		comp = comparator.compare(item,this[mid]);
		if(comp == 0)
		  return mid;
		else if(comp > 0)
		  left = mid;
		else
		  right = mid;
	  }
	
	  if(comparator.compare(item,this[right]) != 0)
		return -(right + 1);
	
	  return right;
	}
}
if(!String.prototype.trim){
	String.prototype.trim = function () {
	    return this.replace(/^\s*/, "").replace(/\s*$/, "");
	}
}

function textCounter(field,maxlimit) {
	if (field.value.length > maxlimit){
	alert ('A maximum of ' + maxlimit + ' characters is allowed.');
	field.value = field.value.substring(0, maxlimit);
	}
}

	function loadDeferredImages(selector){
				$(selector).each(function() {
				var $this = $(this);
				if($this.attr("_src")){
					$this.attr("src", $this.attr("_src")).removeAttr("_src");
				}
			});
		}