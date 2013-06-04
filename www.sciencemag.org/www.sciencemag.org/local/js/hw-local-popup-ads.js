function getCookie(name) {
        var cookie = " " + document.cookie;
        var search = " " + name + "=";
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
                offset = cookie.indexOf(search);
                if (offset != -1) {
                        offset += search.length;
                        end = cookie.indexOf(";", offset)
                        if (end == -1) {
                                end = cookie.length;
                        }
                        setStr = unescape(cookie.substring(offset, end));
                }
        }
        return(setStr);
}
function survey_popup () {
	var survey_popup = getCookie('survey_popup');
        if (survey_popup == null) {
                setCookie("survey_popup", "true", "", "/");
window.open("http://www.sciencemag.org/marketing/ed_survey/ed_survey.dtl", 'surveypop', 'toolbar=0, location=0, directories=0, menuBar=0,  resizable=1, width=425, height=475, left=50, top=50');
  }

}

/***********institutional user pop up******************/

$(document).ready(function() {
	if (typeof OAS_usertype != "undefined") {
		if (OAS_usertype == "INST") {
			var inst_popup = getCookie('inst_popup2');
    		if (inst_popup == null) {
               	setCookie("inst_popup2", "true", 30, "/");
               	window.open('http://www.sciencemag.org/site/inst_popup.html', 'instpopup', 'toolbar=0, location=0, directories=0, menuBar=0,  resizable=1, width=550, height=500, left=50, top=50');
			}	
 		}
	}
});
