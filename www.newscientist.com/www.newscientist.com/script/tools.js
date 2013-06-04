

// header and footer login
function rollReveal(divid)
{
document.getElementById(divid).style.visibility = 'visible';
}

function rollRestore(divid)
{
document.getElementById(divid).style.visibility = 'hidden';
}




// Tabbed boxes
function switchTab(tabView,tabHide) {

if (document.getElementById)
{
	document.getElementById(tabView).style.display = "inline";
	document.getElementById(tabHide).style.display = "none";
	return false;
}
}



// Comment form preview window
var comPrevTargetName = "comPreviewWin";
var comPrevAction = "/commenting/preview";

function commentpreview() {
	var comForm = document.getElementById("commentForm");
	
	if (comForm != null) {
		// note original settings
	    var originalTarget = comForm.target;
	    var originalAction = comForm.action;

	    // make a new popup window
		var myWin = window.open("",comPrevTargetName,"width=500,height=350,scrollbars=yes,toolbar=0");

		// make form submit to whatever target and action 
	    comForm.target = comPrevTargetName;
	    comForm.action = comPrevAction;
	    comForm.submit();

	 	// revert to original settings
	    comForm.target = originalTarget;
	    comForm.action = originalAction;
	}
	return true;
}