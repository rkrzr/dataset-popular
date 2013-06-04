pswdLessReg.message = '';
currLoc = window.location+'';

pswdLessReg.selectItem = function(){
	listMenuObj = document.getElementById('listMenu');
	selListItem = ((pswdLessReg.listItem.length > 0)&&(listMenuObj))?document.getElementById('listMenu').selectedIndex:0;
	document.getElementById('listFormVal').value = pswdLessReg.listItem[selListItem].value;
	
	pswdLessReg.message = '';
	pswdLessReg.msgObj.innerHTML = pswdLessReg.message;
}
	style = (pswdLessReg.listItem.length == 1)?'double':'single';
	document.write('<div class="wNodeLeft '+style+'">');
	document.write('<div class="pswdLessRegHeadline">E-mail Address</div> <input type="text" id="emailFormVal" name="emailAddress" />');
	document.write('</div>');

	if(pswdLessReg.listItem.length>1){
		document.write('<div class="wNodeRight">');
		document.write('<div class="pswdLessRegHeadline"><a name="reg">Select Newsletter</a></div>');
		document.write('<select id="listMenu" onchange="pswdLessReg.selectItem();">');
		for(i=0;i<pswdLessReg.listItem.length;i++){
			document.write('<option>'+pswdLessReg.listItem[i].name+'</option>');
		}
		document.write('</select>');
		document.write('<input type="hidden" name="list" id="listFormVal" value="" />');
		document.write('</div>');
	}else{
		document.write('<input type="hidden" name="list" id="listFormVal" value="'+pswdLessReg.listItem[0].value+'" />');
	}
	document.write('<div class="clearboth"><!--empty--></div>');
	document.write('<div id="pswdLessRegMsg"></div>');
	pswdLessReg.msgObj = document.getElementById('pswdLessRegMsg')
	document.write('<div class="clearboth"><!--empty--></div>');
	pswdLessReg.buttonImg = (typeof pswdLessReg.imageButton != 'undefined')?﻿pswdLessReg.imageButton:'http://a.abcnews.com/assets/images/buttons/btn-newsletter.gif';
	pswdLessReg.button = (pswdLessReg.listItem[0].value=='InsiderDTR')?'<a href="javascript:pswdLessReg.process()" name="lpos=widget[Newsletter]&lid=[SignUp]"><img src="'+pswdLessReg.buttonImg+'" alt="sign up" border="0" /></a>':'<a href="javascript:pswdLessReg.process()" name="lpos=widget[Newsletter]&lid=[SignUp]"><img src="'+pswdLessReg.buttonImg+'" alt="sign up" border="0" /></a>';
	document.write('<div id="pswdSubmitBut">'+pswdLessReg.button+'</div>');
	

/*function formElementFromCookie(elementID, cookieName){

	cookieValue = ""

	if(isValidSWID() && isValidBLUE()) {
		cookieValue = readCookie(cookieName);

		if(cookieValue == null) {
			cookieValue = "";
		}
	}
	document.getElementById(elementID).value = cookieValue;
}

formElementFromCookie('emailFormVal','EMAIL');*/

function checkEmailAddress() {
	emailVal = document.getElementById('emailFormVal').value;
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (filter.test(emailVal))
		emailValid=true
	else{
		emailValid=false
	}
	return (emailValid)
}
function checkListName() {
	listVal = document.getElementById('listFormVal').value;
	if ((listVal!='')&&(listVal!=null))
		listValid=true
	else{
		listValid=false
	}
	return (listValid)
}

pswdLessReg.validEntry = function(){
	pswdLessReg.message = '';
	pswdLessReg.isValid = true;
	if(!checkListName()){
		pswdLessReg.message += 'Please select a newsletter to subscribe to.';
		pswdLessReg.msgObj.className = 'errorMessage';
		pswdLessRegMsgObj.innerHTML = pswdLessReg.message;
		pswdLessReg.isValid = false;
	}
	if(!checkEmailAddress()){
		pswdLessReg.message += 'Please enter a valid e-mail address.';
		pswdLessReg.msgObj.className = 'errorMessage';
		pswdLessReg.msgObj.innerHTML = pswdLessReg.message;
		pswdLessReg.isValid = false;
	}
	return pswdLessReg.isValid
}

pswdLessReg.buttonLock = function(state){
	if(state == 'lock'){
		document.getElementById('pswdSubmitBut').innerHTML = 'Sending request...';
	}else{
		document.getElementById('pswdSubmitBut').innerHTML = pswdLessReg.button;
	}
}

pswdLessReg.process = function(){
	if(pswdLessReg.validEntry()){
		pswdLessReg.buttonLock('lock');
		fromURL = currLoc.replace('?','qqqq');
		url = 'http://app.abcnews.go.com/app/newsletterSignon?emailAddress='+emailVal+'&list='+listVal+'&fromURL='+fromURL;
		var headID = document.getElementsByTagName("head")[0];         
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = url;
		headID.appendChild(newScript);
	}
}

pswdLessReg.render = function(){
	pswdLessReg.buttonLock('release');
	pswdLessReg.message = '';
	if(pswdLessReg.redirectGoRegURL){
		pswdLessReg.message += 'This address has been registered. You\'ll need to <a href="'+pswdLessReg.redirectGoRegURL+'" target="_top">click here to log in and continue</a>.';
		pswdLessReg.msgObj.className = 'errorMessage';
		//window.location = pswdLessReg.redirectGoRegURL;
	}else if(pswdLessReg.attemptStatus == 'failed'){
		if(pswdLessReg.resultErrorCode.indexOf('emailaddress.invalid') > -1){
			pswdLessReg.message += 'Sorry, you must enter a valid e-mail address';
			pswdLessReg.msgObj.className = 'errorMessage';
		}
	}else if(pswdLessReg.attemptStatus == 'successful'){
		pswdLessReg.message += 'Thanks for subscribing! We will send the subscription to: '+pswdLessReg.emailAddress;
		pswdLessReg.msgObj.className = 'successMessage';
	}else if((pswdLessReg.resultErrorLength != "0")||(pswdLessReg.loginType == 'registered not logged in')){
		pswdLessReg.message += 'There was a problem with your request. Please try again later.';
		pswdLessReg.msgObj.className = 'errorMessage';
	}
	pswdLessReg.msgObj.innerHTML = pswdLessReg.message;
	//removeScriptTag(url);
	
	pswdLessReg.redirectGoRegURL = '';
	pswdLessReg.attemptStatus = '';
	pswdLessReg.loginType = '';
	
	
}

if(currLoc.indexOf('#reg') > -1){
	pswdLessReg.message += 'Thanks for subscribing!';
	pswdLessReg.msgObj.className = 'successMessage';
	pswdLessReg.msgObj.innerHTML = pswdLessReg.message;
}

pswdLessReg.selectItem();