// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: McClatchyDC 
////////////////////////////////////////////////////////////////////////////

// MI Stats Function 
function miStatsObject(){}

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "McClatchyDC"; 	    						// Site Name
mistats.account     = "nmmclatchy";         						// Report Suite ID
mistats.bizunit     = "MCD";                						// Business Unit
mistats.pubname     = "DC";                 						// Publication Code
mistats.regcookie   = "mcclatchydc_user_auth";   					// Insite Cookie Name
mistats.segcookie   = "segments"; 	            					// Insite Segments Cookie Name
mistats.sitefile    = "http://media.mcclatchydc.com/misites/mcd/mcclatchydc.js";	// Site File Name

// Third Party
mistats.tacoda      = "17793";								// Tacoda ID
mistats.tyntid	    = "user=c8H7N-btSr34aRadbiUt4I&s=120";				// Tynt ID

// Yahoo Site Variables
if(typeof(miyahoo) != 'undefined') {

        miyahoo.ads.live.yahoo.request_type = "fc";
        miyahoo.ads.preview.yahoo.request_type = "ac";
        miyahoo.ads.live.yahoo.enabled = true;
        miyahoo.ads.live.dart.enabled = true;
        miyahoo.ads.preview.yahoo.enabled = false;
        miyahoo.ads.preview.dart.enabled = true;

        misite = {};
        misite.yahoo_pub_id = "22200095039";
        misite.yahoo_site_name = "McClatchy Washington Bureau";
}

// Call custom .js file for sites use (uncomment to use)
//document.write("\n<" + "script type='text/javascript' src='http://media.mcclatchyinteractive.com/mistats/custom.js'>" + "</" + "script>");
