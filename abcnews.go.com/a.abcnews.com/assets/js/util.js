dynamicJS = new Object();

dynamicJS.load = function(id,url){

	this.headNode = document.getElementsByTagName("head")[0];         

	this.newJS = document.createElement('script');

	this.newJS.type = 'text/javascript';

	this.newJS.id = (id)?id:url;

	this.newJS.src = url;

	this.headNode.appendChild(this.newJS);

}

dynamicJS.unload = function(id,url){

	this.targetObj = (id)?document.getElementById(id):false;

	this.targetObj = (!this.targetObj)?document.getElementById(url):this.targetObj;

	if(this.targetObj){

		this.headNode = document.getElementsByTagName("head")[0];

		this.headNode.removeChild(this.targetObj);

	}

}

//ad & pageview

function abcnTrack(action) {

	s_omni.pageName = s_omni.pageName+'pane';

	s_omni.eVar16 = s_omni.pageName;

	s_omni.prop19 = s_omni.pageName;

	s_omni.t();

}

function refreshSyncAd(){

	abcnTrack();

	window.open(syncAdUrl,syncAdFrameTarget);

}

function getParam(name) {

	var start=location.search.indexOf("?"+name+"=");

	if (start<0) start=location.search.indexOf("&"+name+"=");

	if (start<0) return '';

	start += name.length+2;

	var end=location.search.indexOf("&",start)-1;

	if (end<0) end=location.search.length;

	var result='';

	for(var i=start;i<=end;i++) {

		var c=location.search.charAt(i);

		result=result+(c=='+'?' ':c);

	}

	return unescape(result);

}

var lastStRsObj = null; 

function loadResults(state, url){

	currStRsCode = (state)?state.toUpperCase():currStRsCode; 

	ddStObj = document.getElementById(currStRsCode); 

	if(ddStObj){dynamicJS.unload(ddStObj.id);}	 

	if((lastStRsObj)&&(lastStRsObj != currStRsCode)){

			 

		removeStRsObj = document.getElementById(lastStRsObj);

		if(removeStRsObj){dynamicJS.unload(removeStRsObj.id);} 

	} 

			 

	dynamicJS.load(currStRsCode,url);

	lastStRsObj = currStRsCode;

}