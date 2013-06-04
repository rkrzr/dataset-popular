/*
	Autonomy port of AMA JavaScript code
*/

function logoutApplicationLink() {
	var strApos ="'";
	var strHref = location.protocol + "//" + location.hostname + location.pathname + encodeURIComponent(location.search);
	strHref = strHref.replace("%3B", "\;"); 
	var ldap = document.cookie.indexOf("AMAHTTPSESSIONID");
	if (ldap != -1) {			
		document.write('<a id="signin" HREF="https://extapps.ama-assn.org/login/logout?url=' + strHref + '&M=GET">Sign Out</a>');
	} else {			
		document.write('<strong><a id="signin" HREF="https://extapps.ama-assn.org/login/?url=' + strHref + '&M=GET" onMouseDown="dcsMultiTrack(' + strApos + 'WT.z_login' + strApos + ',' + strApos + '1' + strApos+ ')">Sign In</a></strong> / <a id="signin" HREF="https://extapps.ama-assn.org/login/?url=' + strHref + '&M=GET" onMouseDown="dcsMultiTrack('+ strApos + 'DCS.dcsuri' + strApos + ',' + strApos + location.pathname + strApos + ',' + strApos + 'WT.ti' + strApos + ',' + strApos + document.title + strApos + ','+ strApos+'WT.z_login' + strApos + ',' + strApos + '1' + strApos+ ')">Create an Account</a>');
	}		

}
function welcomeback(name){
	var ldap = document.cookie.indexOf("AMAHTTPSESSIONID");
	if (ldap != -1) {
		if(name != ""){
			document.write('<span id="welcomeback">Welcome back</span>');
			document.write('<span id="username">' + name + '</span>');
		}
	}
}
function removeSpecialCharacters(text){
text =  text.replace(/[^a-zA-Z 0-9]+/g,'');
return text;
}
$(document).ready(function() {
$(".zebra tr:odd").addClass("alt");
});

			$(document).ready(function(){
				//hide the all of the element with class msg_body
				$(".pluck-community-sublink").hide();
				//toggle the componenet with class msg_body
				$(".pluck-community-headlink").click(function(){
					$(this).next(".pluck-community-sublink ").slideToggle(600);
				});
			});
