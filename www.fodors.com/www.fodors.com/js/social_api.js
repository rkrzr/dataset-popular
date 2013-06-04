document.write('<scr'+'ipt type="text/javascript" src="/js/StringUtil.js" ></scr'+'ipt>');
var globalFB = undefined;
var twitwindow = undefined;
var token = undefined;
var member_id = undefined;

var lgprocess = '';

var logintype = '';

if (typeof window.referrer != 'undefined') {

	pathArray = window.referrer.split( '/' );
	host = pathArray[2];
	
	if(host.indexOf('fodr') > 0 || host.indexOf('fodors') > 0) {
		var referrer = window.referrer;
	} else {
		var referrer = '/';
	
	}

} else {
	var referrer = '/';
}


   
$(document).ready(function() {

	var userConnected = 0;
	var currentUser = new Object();
	var accesstoken = '';
	var fbClicked = false;
	

	

	//The app value below needs to be held in coldfusion or this whole thing needs to be held outside of this function so it is secure.
	window.fbAsyncInit = function() {
		FB.init({
			//appId      : '331863573570405', //Fodors Dev
			appId		: '131261190345537', 
			channelUrl : '//www.fodors.com/test/channel.php', 
			status     : true, 
			cookie     : true, 
			xfbml      : true  
		});
		
				var userinfo = $.parseJSON($.cookie('fodors_user'));
				
				 if(userinfo != null) {
				 	$.ajax({
						type: "POST",
						url: "/support/social-signon/check.cfm",
						data: {key: userinfo.token, type: userinfo.type}
					}).done(function(data) {
					
		
						if (data.status == "valid"){
								$(".login-status").html('<ul class="loggedin-tools"><li><a href="/community/profile/'+ data.member_id.toLowerCase() + '/" rel="nofollow">Welcome ' + data.member_id +'</a></li><li><a href="/login/logout.html?url_certified=' + window.location +'" onclick="logout();return(false);" rel="nofollow" class="logout-link">Log Out</a></li></ul>');
								$(".logged-out").slideUp("fast");

							}
					});
				 }

					
			

		
		lgprocess = getUrlVars()["s"];
		logintype = getUrlVars()["type"];
		
		if(lgprocess == "login" && (logintype == "fb" || logintype == 't')) {
			registerInfo();
		} 		
	};



	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));

	

	function loginFB() {
		FB.login(
			function(response) {
				if (response.authResponse) {
					console.log(response);
					t = response.authResponse.userID;
					accesstoken = response.authResponse.accessToken;
					FB.api('/me', function(response) {
						$.ajax({
							type: "POST",
							url: "/support/social-signon/registered.cfm",
							data: {bryan: "Hello", duck:undefined, email: response.email, type: 'Facebook', key: accesstoken, u:t}
						}).done(function(data) {
						//console.log(data);
						var userinfo = {'member_id': response.username, 'email': response.email, 'type':'Facebook','token':data.accesstoken, 'profile_img': 'https://graph.facebook.com/' + response.username + '/picture?type=large', 'referrer': referrer, 'user_id': t };
								
								$.cookie('fodors_user',JSON.stringify(userinfo),{path:"/"});
							if (data.status == "valid"){
								
								if(typeof variables != 'undefined' && variables.url != null && variables.label != null) {
									window.location.assign(variables.url);
								} 
							
								if(typeof currentPage != 'undefined' && currentPage == 'register') {
									window.location.assign(referrer);
								} else {
									$(".login-status").html('<ul class="loggedin-tools"><li><a href="/community/profile/'+ data.member_id.toLowerCase() + '/" rel="nofollow">Welcome ' + data.member_id +'</a></li><li><a href="/login/logout.html?url_certified=' + window.location +'" onclick="logoutFB();logout();return(false);" rel="nofollow" class="logout-link">Log Out</a></li></ul>');
								}
								

								
							$(".logged-out").slideUp("fast");
							}
							
							else {
								//alert("Oh no!");
								var url = $('input[name=url_certified]').val();
								var label = $('input[name=label_certified]').val();
								window.location.assign("/login/register.html?s=login&type=fb&url_certified=" + url + "&label_certified=" + label);
								//alert("Gets here tho!");
							}
						});
					});
				}
				else {
					//console.log('User cancelled login or did not fully authorize.');
				}
			},
			{scope: 'email,publish_actions'}
		);
	}
	$("#fb-login").unbind('click').click(function(e){
		//alert("3");
			loginFB();
		$(".logged-out").css("display","none");
	});
	
		
	$("#twitter-login").click(function(){

	twitwindow = window.open("/support/twitter/redirect.php", "twitwindow", "location=1,status=1,scrollbars=1,  width=800,height=850");
	

	});
	
	
	function logout() {
		$.removeCookie('fodors_user');
		$.removeCookie('FODORSNG');
	}

	function siteLogin() {
		FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct user interaction (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
	}
	
	
	function testAPI() {
    	console.log('Welcome!  Fetching your information.... ');
    	FB.api('/me', function(response) {
    	  console.log('Good to see you, ' + response.name + '.');
    	});
  	}
	
	function registerInfo(accesstoken) {

			//FB.api('/me', function(response) {
			var userinfo = $.parseJSON($.cookie('fodors_user'));
			var memberid = $.trim(userinfo.member_id.replace(/ /g, "_").replace(/\./g, '_'));
			if ($("#member_id").length > 0) $("#member_id").val(memberid).blur();
			if ($("#email_address").length > 0) $("#email_address").val(userinfo.email).blur();
			if ($("#email_verify").length > 0) $("#email_verify").val(userinfo.email).blur();
			if ($("#method").length > 0) $("#method").val(userinfo.type);
			if ($("#token").length > 0) $("#token").val(userinfo.token);
			//console.log(userinfo);
		//});
		
	}
	
	
});



/*
function registerTwitterInfo(accesstoken) {
	var memberid = $.trim(response.username.replace(/ /g, "_").replace(/\./g, '_'));
			if ($("#member_id").length > 0) $("#member_id").val(memberid).blur();
			if ($("#email_address").length > 0) $("#email_address").val(response.email).blur();
			if ($("#email_verify").length > 0) $("#email_verify").val(response.email).blur();
			if ($("#method").length > 0) $("#method").val("Facebook");
			if ($("#token").length > 0) $("#token").val(accesstoken);
			if ($("#profile").length > 0) $("#profile").attr('src', 'https://graph.facebook.com/' + response.username + '/picture');

	var url = document.URL;
	if(strstr(url,'register.html',false)) {
		// if its a registration, lets post to submit a new user based on the information we got from the user during social sign up
	}
	else if (strstr(url,'/login/social_login.html',false)) {
		// we should post the social login variables as json back to gatekeepers/social_login.cfm
	} 

	displayChange();

	//this call needs to encode the return data as json and then post to social_login.cfm should be named json
}
*/



function twitterCallback(response) {
	//First checking db if no entry, then insert, then login them in

	//SQL Insert in db
	//console.log(response);
	// getTwitterInfo(response);
}

function twitterpopup() {

	twitwindow = window.open("/support/twitter/redirect.php", "twitwindow", "location=1,status=1,scrollbars=1,  width=800,height=850");
	
	/*
if (typeof twitwindow.attachEvent != "undefined") {
    twitwindow.attachEvent("onunload", doStuffOnUnload);
} else if (typeof twitwindow.addEventListener != "undefined") {
    twitwindow.addEventListener("unload", doStuffOnUnload, false);
}*/

	}
	

function doStuffOnUnload() {
			
			setTimeout(function() {processTwitter()},1000);
}

function processTwitter() {
	var userinfo = $.parseJSON($.cookie('fodors_user'));
	if(typeof variables === 'undefined') {
		variables = new Object();
		variables.url = undefined;
		variables.label= undefined;
	}
	//console.log(userinfo); 
	if(userinfo != null) {

    					$.ajax({
							type: "POST",
							url: "/support/social-signon/registered.cfm",
							data: {email: "", type: 'Twitter', key: userinfo.token, username:userinfo.member_id}
							
						}).done(function(data) {
							//console.log(data);
 							if (data.status == "valid"){

 								if(typeof variables === 'undefined' && variables.url != null && variables.label != null) {
									window.location.assign(variables.url);
								} 
								
 								if(typeof currentPage != 'undefined' && currentPage == 'register') {
									window.location.assign(referrer);
								} else {
									$(".login-status").html('<ul class="loggedin-tools"><li><a href="/community/profile/'+ data.member_id.toLowerCase() + '/" rel="nofollow">Welcome ' + data.member_id +'</a></li><li><a href="/login/logout.html?url_certified=' + window.location +'" onclick="logoutFB();logout();return(false);" rel="nofollow" class="logout-link">Log Out</a></li></ul>');
									$(".logged-out").slideUp("fast");
								}

								


							}
							else if (data.status == "confirm") {
 								if(typeof showLinkBox == 'function') {
 									//console.log(userinfo);
									 showLinkBox('user',userinfo);
								} else {
									$(".logged-out").html('<a href="##" rel="nofollow" class="close-link">X</a><div class="link-accounts"><p>We found a user with your Twitter handle: <strong>' + userinfo.member_id + '</strong>.</p> <p>Is this you? If so, enter your password below to link your accounts.</p><p><label for="linkemail">Password: <input id="password" type="password" size="30"/></label></p><p><input type="submit" name="submit" id="linksubmit" value="Link Accounts"/></p><p>Forgot your password? Please contact <a href="mailto:registration@fodors.com">registration@fodors.com</a>.</p></div>');
								}
							} else {
								//alert("Oh no!");
								var url = $('input[name=url_certified]').val();
								var label = $('input[name=label_certified]').val();
								window.location.assign("/login/register.html?s=login&type=t&url_certified=" + url + "&label_certified=" + label);
								//alert("Gets here tho!");
							}
						});
	}
}

$("#linksubmit").live('click', function() {

	var userinfo = $.parseJSON($.cookie('fodors_user'));
	//console.log(userinfo);
	if(userinfo != null) {
		 $.ajax({
								type: "POST",
								url: "/support/social-signon/link.cfm",
								data: {email: "", type: 'Twitter', key: userinfo.token, member_id:$.trim(userinfo.member_id), password: $('#password').val()}
								
							}).done(function(data) {
								//console.log(data);
	 							if (data.status =="valid"){
									$(".login-status").html('<ul class="loggedin-tools"><li><a href="/community/profile/'+ data.member_id.toLowerCase() + '/" rel="nofollow">Welcome ' + data.member_id +'</a></li><li><a href="/login/logout.html?url_certified=' + window.location +'" onclick="logout();return(false);" rel="nofollow" class="logout-link">Log Out</a></li></ul>');
									$(".logged-out").html('<a href="##" rel="nofollow" class="close-link">X</a><div class="link-accounts">Your accounts have been successfully linked. Thank you.</div>');
									
								}else {
									//alert("Oh no! Your Twitter is not registered!");
									if(data.status == "login_fail") {
										//window.location.assign("/login/register.html?s=login&type=t&p=i");
									}
								}
		});
	}
});


function displayChange() {
	//console.log('display changed');
	var url = document.URL;
	// removes elements if the user is currently logged in with us and a social network.
	if(strstr(url,'register.html',false)) {
		$("#social-signup").hide();
	}
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

