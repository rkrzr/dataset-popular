var mbox32Data=''; //global metrics flag
var s_eVar32='';
var s_prop32='';
var oOrfs=new Object();

if (typeof(sABTest)=="undefined"){
	sABTest='';
}

function mboxRecord(sORF,sRecipe) { 
	if (typeof sRecipe == 'number') sRecipe=sRecipe.toString();
	//mbox32Data+=((mbox32Data.length>0)?':':'')+'fv-'+((typeof oOrfs[sORF] == 'undefined')?'000000':''+oOrfs[sORF])+'-'+sORF+((typeof sRecipe == 'undefined')?'':'-'+sRecipe.toLowerCase());
	mbox32Data+=((mbox32Data.length>0)?':':'')+sORF+((typeof sRecipe == 'undefined')?'':'-'+sRecipe.toLowerCase());
	s_eVar32=mbox32Data;
	s_prop32=s_eVar32;
}

function mboxBuildFlashTest(sORF,sRecipe) {
	if (typeof sRecipe == 'number') sRecipe=sRecipe.toString();
	sABTest+=((sABTest.length>0)?'||':'')+sORF+((typeof sRecipe == 'undefined')?'|NaN':'|'+sRecipe.toLowerCase());
	mboxRecord(sORF,sRecipe);
}

function mboxConvert(sId) {
	// fires hidden conversion event
	var proxyImage = new Image();
	proxyImage.src = document.location.protocol + '//mbox4.offermatica.com/m2/zaaz/ubox/image?mbox=' + sId + '&mboxDefault=' + escape(document.location.protocol + '//www.ford.com/assets/images/sp.gif') + 
		'&mboxURL=' + escape(document.location.href) + 
		'&mboxSession=' + mboxFactoryDefault.getSessionId().getId() + 
		'&mboxPC=' + mboxFactoryDefault.getPCId().getId() + 
		'&mboxXDomain=disabled';
		i=1;
}

function mboxTrackClick(existingMboxName, trackedMboxName){
	var url = mboxFactoryDefault.get(existingMboxName).getURL();
	url = url.replace("mbox=" + existingMboxName,"mbox=" + trackedMboxName);
	url = url.replace("mboxPage=" + mboxFactoryDefault.getPageId(),"mboxPage=" + mboxGenerateId());
	(new Image()).src = url;

}


function mboxEvalCall(call,c5){
	s_prop5=c5;
	sendAnalyticsEvent()
	eval(call);
}

function mboxEval(action,props,call){
	eval(props);
	eval(call);
	eval(action);
}