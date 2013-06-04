function renderDialog(href, target){
	var link = "<a id=\"exit_anchor\" href=\"" + href + "\" ";
	if (target != "" && target != null) {
		link += "target=\"" + target + "\" ";
	}
	link += ">" + href + "</a>";
	
	var content = "Click the link to access " + link + " ";
	if (target != "" && target != null) {
		content += "(link opens in a new window)";
	}
	
	//if (href.match(/flickr|youtube|facebook|twitter|myspace/i))
	content += "<br/><br/><b>Please check the Privacy Policy of the site you are visiting.</b>";
	
	content += "<br/><br/>We hope your visit was informative and enjoyable.";

	$("#exit_div").html(content);
}


// Reuse the existing exit div for the Terms of Use dialog
var termsElement = "#exit_div";
var termsAccepted = false;

// Function to accept the terms of use and forward the link
function acceptTermsOfUse(href) {
	//	termsAccepted = true;	// Don't show the dialog again
	closeTermsOfUse();
	document.location.href = href;
}

// Function to close the terms of use; as opposed to having jquery items in onclick
function closeTermsOfUse() {
	$(termsElement).dialog('close');
}

// Pops the Terms of Use dialog with a link to open if clicking "I Agree"
function openTermsOfUse(href) {
	$(termsElement).attr("title", "Terms of Use");
	var text = "";
	text += "January 14, 2011<br/>";
	text += "<p>This terms of use agreement (the \"Agreement\") governs your use of the data (the \"Data\") available through this FinancialStability.gov Web site (the \"Site\"). You acknowledge that you have read and understood the Site's Privacy Policy, available at <a href=\"http://www.treasury.gov/SitePolicies/Pages/privacy.aspx\" title=\"Privacy Policy\" target=\"_blank\">http://www.treasury.gov/SitePolicies/Pages/privacy.aspx</a>, including without limitation the Disclaimer of Endorsement, the Disclaimer of Liability, and Official Seal, Names and Symbols. In addition, you acknowledge that once the Data has been downloaded from the Site, the United States Government (including the Department of the Treasury) cannot vouch for its quality and timeliness, and the United States Government cannot vouch for any analyses conducted with the Data retrieved from the Site.</p>";
	text += "<p>The Site may modify this Agreement from time to time, and your continued use of the Data and/or the Site constitutes your acceptance of any and all modifications.</p>";
	text += "<p>No copyright may be claimed for any work on this Site that was created or maintained by any Federal employee in the course of their duties. Images and text appearing on the Site may be freely copied, however, with respect to the Data you agree:";
	text += "<ol>";
	text += "<li>To cite the date that Data was accessed or retrieved from FinancialStability.gov; and</li>";
	text += "<li>To clearly state that \"FinancialStability.gov and the United States Government (including the Department of the Treasury) cannot vouch for the data or analyses derived from this data after the data has been retrieved from FinancialStability.gov\".</li>"
	text += "</ol>";
	text += "</p>";
	text += "<p>This Agreement and the Data available through this Site is not intended to, and does not, create any right or benefit, substantive or procedural, enforceable at law or in equity, by a party against the United States Government, its Departments, Agencies, or other entities, its officers, employees, or agents. Nothing in this Agreement alters, or impedes the ability to carry out, the authorities of the United States Government, its Departments, Agencies, or other entities, its officers, employees, or agents to perform their responsibilities under law and consistent with applicable legal authorities, appropriations, and presidential guidance, nor does this Agreement limit the protection afforded any information by other provisions of law.</p>";
	text += "<p>By clicking on the \"I Accept\" button below, I acknowledge that I have read, understand, and agree to the above conditions.</p>";
	text += "<form><p align=\"center\"><input type=\"button\" value=\"  I Accept  \" onclick=\"acceptTermsOfUse('"+encodeURI(href)+"')\"> <input type=\"button\" value=\"  Cancel  \" onclick=\"closeTermsOfUse()\"></p></form>";
	$(termsElement).html(text);
	
	$(termsElement).dialog({ modal: true, closeOnEscape: true, height: 540, width: 750, autoOpen: false });
	$(termsElement).dialog('open');
}


//a parsed URL
function UrlInfo(url) {
  var setProperties = function(url) {
	  var protocolPos = url.indexOf("://") + 3;
	  if (protocolPos > 0) {
	  	that.protocol = url.substr(0, protocolPos - 3);
	  }
	
	  var ret =  url.substr(protocolPos, url.length - protocolPos);
	  var slash = ret.indexOf("/");
	  var qmark = ret.indexOf("?");
	  if (qmark < 0)  qmark = Math.max() * -1; //why is max a negative #... very strange
	  
	  var pos = (slash <= qmark) ? slash : qmark;
	  
	  if (pos> 0) {
	  	that.host = ret.substr(0, pos);
	  	that.pathAndQuerystring= ret.substr(pos, ret.length - pos); 
	  } else {
	  	that.host = ret;
	  }
		  		
	  var dot = that.host.lastIndexOf(".");
	  if (dot > 0) {
	    that.extension = that.host.substr(dot + 1);
	  }
	  
	  return url;
  };

  var that = this; // workaround to ecmascript bug that enables setting public properties in 'private' method setProperties 
  this.protocol = "";
  this.host = "";
  this.pathAndQuerystring = "";
  this.extension = "";
  this.fullUrl = setProperties(url);
}

// Creating custom :external selector
$.expr[':'].external = function (obj) {
  return (obj.hostname != location.hostname && obj.href.indexOf("javascript") < 0);
};

// Custom :tarpTransactionLink selector - confirm dialog for links that match TARP Transactions
$.expr[':'].tarpTransactionLink = function(obj) {
	var url = new UrlInfo(obj.href);
	try {
		if (url.pathAndQuerystring.match(/\/initiatives\/financial-stability\/briefing-room\/reports\/tarp-transactions\/DocumentsTARPTransactions\/.*\.xls.*/)) {
			return true; // this will find both .xls and .xlsx files in the doc lib
		}
	} catch (err) {}
	return false;
}


// Startup Method
$(document).ready(function () {
	// TARP Transaction Link Catcher
	try {
		$('a:tarpTransactionLink').addClass('tarpTransactionLink');
	} catch (err) {
		console.log(err);
	}
	$(".tarpTransactionLink").click(function() {
	  	var url = $(this).attr("href");

		if (!termsAccepted) {
			openTermsOfUse(url);
		}
		else {
			acceptTermsOfUse(url);
		}

		return false;
  	});


	// External Link Catcher
  try {
	  // Add 'external' CSS class to all external links - try/catch to avoid edit mode errors.
	  $('a:external').addClass('external');
  } catch (err) { }

  $(".external").click(function (d, e) {
  	var url = new UrlInfo($(this).attr("href"));
  	if (url.host == "www.addthis.com") return true; 
  	
    if(url.host != "")
    {
		//Click events for external links that need to be recorded in GA
    	_gaq.push(['_trackEvent','External Link Clicks - Hostname',url.host,document.location.href]);
    	_gaq.push(['_trackEvent','External Link Clicks - URL',url.fullUrl,document.location.href]);
    	
	    var showModal = !(url.extension == "gov" || url.extension == "gov:8001" || url.extension == "mil" || url.host == "service.govdelivery.com" || url.host == "public.govdelivery.com");
		var newWindow = $(this).attr("target") != null && $(this).attr("target") != "";
		
	    if (!showModal) {
	    	if (newWindow) {
	    		window.open(url.fullUrl);
	    	} else {
		      location.open(url.fullUrl);
		    }
	    } else {
		  renderDialog(url.fullUrl, $(this).attr("target"));
          $("#exit_div").attr("title", "You are leaving the Treasury.gov Website");
	      $("#exit_div").dialog({ modal: true, closeOnEscape: true, height: 275, width: 375, autoOpen: false });
	      $("#exit_div").dialog('open');
	    }
	    return false;
    }
  });

  $("#exit_anchor").live("click", function () {
  	$("#exit_div").dialog('close');
  });

});