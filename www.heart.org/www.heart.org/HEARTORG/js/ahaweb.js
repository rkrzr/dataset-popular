	function displayAlert(cookieName){
		var mycookieID=readCookie(cookieName);
		if(mycookieID != null){
			//hide the alert box.
			document.getElementById('alertWrapper').style.display='none';
			document.getElementById('closeCheck').style.display='block';  
		}else{
			//Display the alert box.
		    document.getElementById('alertWrapper').style.display='block';
		    document.getElementById('closeCheck').style.display='none';  
		}
		return false;
	}
	
	function removeCookie(cookieName, cookieValue){
	    var d = new Date();
		document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString()+"; path=/";
		return false;
	}
	
	function createCookie(name,value){ 
		document.cookie = name+'='+value+'; path=/';
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
	 	var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			
			while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
		}
		 return null;
	}


	function getHTTPRequest() {
		var xmlhttp = false;
		try {
			xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
		try {
			xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (E) {
			xmlhttp = false; 
		}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}	


	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; 
	  for(k=0;k<=a[3];k++){ 
		  for(i=0;i<(a.length-2);i+=3)
		  if ((x=MM_findObj('Image'+k))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	  }
	}
	
	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
 /**
 * Contributed by Vishwas
 * This javacript is used by DWR framework to include the pages dynamically.
 * Pass url along with params  
 * Version: 1.0.1
 * Note: Works with DWR framework
 */
	function forward(params) {	   
	  DynamicFileIncluder.getInclude(params,function(data) {	    
	    dwr.util.setValue("forward", data, { escapeHtml:false }); 
	  });  
	}
	function saveRecipe(contentId, profileTransient){
		var responseMsg ="";	
		if(profileTransient == 'true'){
			var xmlhttp = getHTTPRequest();				
			var uri = '/HEARTORG/dd/checkProfile.jsp';
			xmlhttp.open('GET',uri,false);
			xmlhttp.send(null);
			xmlhttp.onreadystatechange = function()
			{	
				if (xmlhttp.readyState == 4) 
				{
					responseMsg=xmlhttp.responseText;
				}
			};
			if(responseMsg == null || responseMsg.length < 1){
				responseMsg=xmlhttp.responseText;
			}
			profileTransient = responseMsg;
		}		
		if(profileTransient == 'true'){
			$.fn.colorbox({inline:true, href:"#inline_example1"});
		}else{
			responseMsg ="";
			resetErrorLabel();
			var xmlhttp = getHTTPRequest();				
			var uri = '/HEARTORG/dd/saveRecipeToProfile.jsp?contentId='+contentId;
			xmlhttp.open('GET',uri,false);
			xmlhttp.send(null);
			xmlhttp.onreadystatechange = function()
			{	
				if (xmlhttp.readyState == 4) 
				{
					responseMsg=xmlhttp.responseText;
				}
			};
			if(responseMsg == null || responseMsg.length < 1){
				responseMsg=xmlhttp.responseText;
			}
			$.fn.colorbox({inline:true, href:"#inline_example2"});
			setValue('e2',"<img src=\"/HEARTORG/images/mozilla_blu.gif\">");
			setValue('e2',responseMsg);
		}
		return false;
	}	
	function ValidateForm(contentId){
		resetErrorLabel();
		setValue('e1',"<img src=\"/HEARTORG/images/mozilla_blu.gif\">");
		var errorFound = false;
		var loginStatus = ""; 
		var userName=(document.getElementById("userName")).value;
		var password=(document.getElementById("password")).value;

		/*********************************************/
		if(isEmptyString(userName) && isEmptyString(password)){		
			setValue('e1',"Please enter your Username & Password.");		
			if(!errorFound){errorFound = true;scrollLocation = 750;focusElement="userName";}
		}
		/*********************************************/
		else{ 
			if(isEmptyString(userName)){		
				setValue('e1',"Please enter your Username.");		
				if(!errorFound){errorFound = true;scrollLocation = 750;focusElement="userName";}
			}
			else if(isEmptyString(password)){
				setValue('e1',"Please enter your Password.");		
				if(!errorFound){errorFound = true;scrollLocation = 750;focusElement="password";}
			}
		}
		/*********************************************/
		if(!errorFound){
			loginStatus = validateLogin(userName, password);
			if(loginStatus == "invalid"){
				setValue('e1',"Please enter a valid Username/Password.");		
				if(!errorFound){errorFound = true;scrollLocation = 750;focusElement="userName";}
			}
		}
		/*********************************************/
		if(errorFound){
			return false;
		}
		saveRecipe(contentId, false);
		//$.fn.colorbox.close();
		return false;	
	 }

	function validateLogin(username, password) {
		var responseMsg ="";	
		var xmlhttp = getHTTPRequest();				
		var uri = '/HEARTORG/dd/loginCheck.jsp?username='+username+'&password='+password;
		xmlhttp.open('GET',uri,false);
		xmlhttp.onreadystatechange = function()
		{	
			if (xmlhttp.readyState == 4) 
			{
				responseMsg=xmlhttp.responseText;
			}
		};
		xmlhttp.send(null);
		if(responseMsg == null || responseMsg.length < 1){
			responseMsg=xmlhttp.responseText;
		}
		return responseMsg;
	}

	function setValue(field , value){ 	
	 	var errorDiv = document.getElementById(field);	
	 	errorDiv.innerHTML = value;	
	}
	
	function resetErrorLabel(){		
		setValue("e1","");
		setValue("e2","");
	} 

	/*Check for Empty String*/
	function isEmptyString(chkStr) {

		if (chkStr == "") {
			return true;
		}
		else {
			var numWhiteSpaces = 0;
			for (var i=0; i < chkStr.length; i++) {
				if (chkStr.substring(i, i+1) == " ") {
					numWhiteSpaces++;
				}
			}
			if (numWhiteSpaces == chkStr.length) {
				return true;
			}
			else {
				return false;
			}
		}
	}	
	function checkSearchKeyValid(){
		var returnValue = true;
		var q=document.getElementById("q");
		if(q.value == null || q.value=='' || q.value=='How Can We Help Your Heart?' ){
			q.value="";
			returnValue = false;
			q.focus();
		}
		return returnValue;	
	 }	
	function displayComments(){
		if(document.getElementById('ahaContentLeft') != null && document.getElementById('showComment') != null && document.getElementById('showComment').innerHTML != null){
			document.getElementById('ahaContentLeft').innerHTML = document.getElementById('ahaContentLeft').innerHTML+document.getElementById('showComment').innerHTML;
			document.getElementById('showComment').innerHTML="";
		}
	}