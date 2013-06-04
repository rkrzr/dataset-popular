 	//***********************************************************************
	//* APPLICATION	: DDF+ Web
	//* COMPONENT	: 
	//* PAGE		: This is a javascript library used by IMRD for direct link to the DDF+
	//* CREATION		: 16.01.2001
	//* AUTHOR		: WTO / Vincent Graf (sqli)
	//* CONTENT		: a single function that submit the hidden form of the calling page
	//*		
	//***********************************************************************
	//* UPDATES		:
	//*
	//***********************************************************************
<!--
	function f_submit(strQuery,strLanguage) {

		var iH = 600;
		var iW = 600;
		if(document.all) {
			//IE
			iH=document.body.offsetHeight * 0.9;
			iW=document.body.offsetWidth * 0.9;
		}
		else if (document.layers) {        
			//NS
			iH = window.outerHeight*0.9;
			iW = window.outerWidth*0.9;
		}    
//		window.open("", "", "height=" + iH + ",width=" + iW + ",fullscreen=0,location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0");
		document.hiddenform.query.value=strQuery;
		document.hiddenform.language.value=strLanguage;
		document.hiddenform.action = "https://docs.wto.org/dol2fe/imrd/gen_redirectSearch.asp";
		document.hiddenform.submit();
	}
	function openAWindow( pageToLoad, winName, width, height,
center) 
{ 

xposition=0; yposition=0;
if ((parseInt(navigator.appVersion) >= 4 ) &&
(center)){
xposition = (screen.width - width) / 2;
yposition = (screen.height - height) / 2; 

} 

args = "width=" + width + "," 
+ "height=" + height + "," 
+ "location=0," 
+ "menubar=1,"
+ "resizable=1,"
+ "scrollbars=1,"
+ "status=0," 
+ "titlebar=0,"
+ "toolbar=0,"
+ "hotkeys=0,"
+ "screenx=" + xposition + "," //NN Only
+ "screeny=" + yposition + "," //NN Only
+ "left=" + xposition + "," //IE Only
+ "top=" + yposition; //IE Only 

window.open( pageToLoad,winName,args ); 


} 

//-->