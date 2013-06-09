/*
	Tagging for links - jTagging
	Only looks at anchor tags that have a 'data-tagid' attribute
	Add "checkingtags=yes" to the URL to only display what would be done
	
	2012-02-14 BCook initial version
	2012-03-02 BCook Add breadcrumb links
	2012-04-30 BCook Add nightline_promo
*/

/* ******************************************************************  */
/*      Add tagging for links to this function: getTaggingInfo         */
/*   The link, or anchor tag, must have a unique ID for the            */
/*   data-tagid attribute                                              */
/*  For example, <a href="http://..." data-tagid="share_email_top">    */
/*                                                                     */
/* If the method is NOT the default, executeTagging may have to change */
/* ******************************************************************  */
function getTaggingInfo(id,linkText,unknownReturn) {
		var taggingInfo=new Object();
		
		taggingInfo.method = "ntptEventTag";  // Change in switch if different
		var evd;
		
		switch(id)
		{
			// --- Banner links - Healthy Information Section ---
			case 'health-information-banner':
				taggingInfo.params="ev=internal link&evDetail=health-information&location=banner";
			break;

			case 'disease-index-banner':
				taggingInfo.params="ev=internal link&evDetail=diseases-and-conditions-a-to-z&location=banner";
			break;

			case 'symptom-index-banner':
				taggingInfo.params="ev=internal-link&evDetail=symptom-checker&location=banner";
			break;

			case 'drug-herb-index-banner':
				taggingInfo.params="ev=internal-link&evDetail=drugs-supplements-a-to-z&location=banner";
			break;

			case 'test-procedure-index-banner':
				taggingInfo.params="ev=internal-link&evDetail=tests-and-procedures-a-to-z&location=banner";
			break;

			case 'healthy-living-index-banner':
				taggingInfo.params="ev=internal-link&evDetail=healthy-living&location=banner";
			break;

			case 'blog-index-banner':
				taggingInfo.params="ev=internal-link&evDetail=expert-blogs&location=banner";
			break;

			case 'mayo-clinic-store-banner':
				taggingInfo.params="ev=internal-link&evDetail=mayo-clinic-bookstore&location=banner";
			break;

			case '3-shield-logo-banner':
				taggingInfo.params="ev=internal-link&evDetail=3-shield-logo&location=banner";
			break;
			
			// --- Share on links ---
			case 'share_twitter_top':
				taggingInfo.params="ev=widget&evDetail=twitter&location=top";
			break;
			
			case 'share_facebook_top':
				taggingInfo.params="ev=widget&evDetail=facebook&location=top";
			break;
			
			case 'share_email_top':
				taggingInfo.params="ev=widget&evDetail=email&location=top";
			break;
			
			// -- Task 42627 - Nightline promo
			case 'nightline_promo':
				taggingInfo.params = "ev=external-link&evDetail=nightline-promo&location=left-channel";
			break;
			
			// -- Task 41981 - Housecall signup
			case 'housecall_leftpanel':
				taggingInfo.params = "ev=external-link&evDetail=housecall-newsletter-signup&location=left-channel";
			break;
			case 'newsletter_footer':
				taggingInfo.params = "ev=external-link&evDetail=newsletter-subscription-services&location=footer";
			break;
			case 'newsletter_sitemap':
				taggingInfo.params = "ev=external-link&evDetail=newsletter-subscription-services&location=sitemap";
			break;
			
			// Task 38750
			// Breakcrumb links use the text of the breadcrumb for the evDetail by
			// removing all punctuation, changing spaces to dashes, and making all lower case
			case 'breadcrumb':
				evd = linkText.toLowerCase();
				evd = evd.replace(/[:\.,-\/#!(){}\'\"]/g,"");  // Remove all punctuation characters.  g means global/all
				evd = evd.replace(/ /g,"-");  // Replace each space with a dash g-means all
				taggingInfo.params="ev=breadcrumb-link&evDetail=" + evd;
			break;
			
			default:
				if (unknownReturn =="") { 
					taggingInfo.params="ev=unknown&evDetail=unknown&location=unknown";
				} else {
					taggingInfo.params = unknownReturn
				}
			break;
		}
		
		return taggingInfo;
}

/* ============================================================================= */
/*             Below is supporting code for the tagging                          */
/* ============================================================================= */

// --- Fires the tagging code
// If adding to this switch, also add to showExecuteTagging
function executeTagging(taggingInfo) {
	switch(taggingInfo.method) {
		case "ntptEventTag":
			ntptEventTag(taggingInfo.params);
		break;
		
		case "ntptLinkTag":
			ntptLinkTag(this,'',-1);
		break;
		
		default:
			ntptEventTag(taggingInfo.params);
		break;
	}
}

// --- Shows what it would execute - for checkingtags mode
// Could use the javascript eval() function - but more overhead there
function showExecuteTagging(taggingInfo) {
	var retVal = "";
	
	switch(taggingInfo.method) {
		case "ntptEventTag":
			retVal = "ntptEventTag('" + taggingInfo.params + "')";
		break;
		
		case "ntptLinkTag":
			retVal = "ntptLinkTag(this,'',-1)";
		break;
		
		default:
			retVal = "ntptEventTag('" + taggingInfo.params + "')";
		break;
	}
	
	return retVal;
}

// --- When the document has loaded, add delegates
$(document).ready(function(){

	// If the URL does NOT include, 'checkingtags=yes'
	if (!SoCDoesUrlContain("checkingTags=yes")) {
	
	   // Only concerned with anchor tags that have an id starting with 'tlink_', i.e. tagged links
/*	   $("a[id^=tlink_]").click(function(){
			var id=$(this).attr('id');
			var linkText = $(this).text();
			var taggingInfo = getTaggingInfo(id, linkText,"notFound");
			if (taggingInfo.params != "notFound") {
				executeTagging(taggingInfo);
			}
		});
*/		
		// Only concerned with anchor tags with an attribute of data-tagid
		$("a[data-tagid]").click(function(){
			var id=$(this).attr('data-tagid');
			var linkText=$(this).text();
			var taggingInfo = getTaggingInfo(id, linkText,"notFound");
			if (taggingInfo.params != "notFound") {
				executeTagging(taggingInfo);
			}
		});
	}
	else {  // If checking tags, then any link clicked on
	
		// -- Classify links to whether they are tagged or not --
		var linkObj;
		var id;
		var dataid;
		var linkText;
		var url;
		var onclick;
		var taggingInfo;
		var borderStyle;
		var highlightColor;
		var len = $('a').length;
		
		// From what I've read, the javascript loop is much faster than the jQuery .each
		for(var idx = 0; idx < len; idx++) {
			linkObj = $('a').eq(idx);
			url=linkObj.attr('href');
			id=linkObj.attr('id');
			dataid=linkObj.attr('data-tagid');
			linkText = linkObj.text();
			onclick = getOnclickText(linkObj);
			taggingInfo = getTaggingInfo(dataid,linkText,"notFound");
			if (dataid && dataid != ""){
				borderStyle = "dashed";
			} else {
				borderStyle = "dotted";
			}
			
			if (taggingInfo.params != "notFound") {
				highlightColor = "green";
			} else if (onclick && onclick != "") {
				if (hasTaggingInOnclick(onclick)) {
					highlightColor = "blue";
				} else {
					highlightColor = "orange";
				}
			} else {
				highlightColor = "red";
			}
			
			linkObj.css("border","2px " + borderStyle + " " + highlightColor );
		}

		var msg = "-------------- Checking tags is ON --------------\n\n";
		msg += "Click on a link to see its information\n\n";
		msg += "Link borders key:\n";
		msg += "* Green - tagged by its data-tagid\n";
		msg += "* Blue - tagged by its onclick event\n\n";
		msg += "* Orange - NOT tagged, but has an onclick event\n";
		msg += "* Red - NOT tagged\n\n";
		msg += "* Dashed - has a data-tagid\n";
		msg += "* Dotted - has NO data-tagid\n\n";
		msg += "Remove the 'checkingtags=...' from the URL to turn off Checking tags mode.\n\n";
		msg += "Options:\n";
		msg += "* checkingTags=yes - links can NOT be followed\n";
		msg += "* checkingTags=yesAllowFollow - links can be followed\n\n";
		msg += "  (Total anchor tags: " + len + ")\n";
		alert(msg);
		
		// -- Add delegate for all anchor tags to show tagging info and not follow (return false)
		$("a").click(function(){
			var url=$(this).attr('href');
			var id=$(this).attr('id');
			var dataid=$(this).attr('data-tagid');
			var text=$(this).text();
			
			if (id == ""){id="<no ID defined>";}
			if (dataid == ""){dataid="<no data-tagid defined>";}
			var onclick = getOnclickText($(this));
			
			var taggingInfo = getTaggingInfo(dataid,text,"notFound");
			if (taggingInfo.params != "notFound") {
				taggingMsg = showExecuteTagging(taggingInfo);
			} else {
				taggingMsg = "[NONE]";
			}
			
			msg = "-------------- Checking tags --------------\n\n";
			msg += "link text = " + text + "\n\n";
			msg += "- - - - - - - - -\n";
			msg += "data-tagid = " + dataid + "\n\n";
			msg += "Tagging By data-tagid = " + taggingMsg + "\n\n";
			msg += "onclick = " + onclick + "\n";
			msg += "- - - - - - - - -\n\n";
			msg += "URL = " + url + "\n\n";
			msg += "ID = " + id + "\n\n";
			
			var pp = SoCDoesUrlContain("checkingTags=yesAllowFollow");
			
			if (!pp) {
				alert(msg);
				return false; // Don't go to the link
			} else {  // Allow following of the link
				msg += "\n\n----------------------------\n\n";
				msg += "Follow link?\n";
				msg += "* OK will follow the link (default)\n";
				msg += "* Cancel will NOT follow the link";
				
				if (confirm(msg)) {				
					return true; 
				} else {
					return false; // Don't go to the link
				}
			}

		});
	}
   });
   
function getOnclickText (thisRef) {
	var firstElement=thisRef[0];  // Get just the first item
	var onclick = firstElement.attributes.getNamedItem("onclick");
	if (onclick) {
		onclick = onclick.textContent;
	}
	return onclick;
}

function hasTaggingInOnclick (onclickText) {
	var retVal = false;
	
	if (onclickText) {
		var tt = onclickText.toLowerCase();	
		retVal = (tt.indexOf("ntpteventtag") >= 0) || (tt.indexOf("ntptlinktag") >= 0);
	}
	
	return retVal;
}

function SoCDoesUrlContain(testString) {
	var retVal = false;
	var locLowerCase = window.location.toString().toLowerCase();
	retVal = (locLowerCase.indexOf(testString.toLowerCase()) >= 0);
	return retVal;
}
