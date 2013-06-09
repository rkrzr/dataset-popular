/* Enforce /guide/ is same as home page */

;

// This code uses JavaScript to build search URL and send search request directly to the database
// that is asking for the request. This works only for resources at a top-level URL.
// If JavaScript is turned off, or a redirect loop would occur, the search form's HTTP GET is
// allowed to continue.

if (typeof(jQuery) != 'undefined') {
    (function($) {
        // BK-5746.
        // This is the default function that returns the search URL
        // You can override this by defining NCBISearchBar_searchUrl.
        var defaultSearchUrl = function() {
            var db = $('#entrez-search-db');
            var term = $('#term');
            if (db && term && db[0] && term[0]) {
            
                // The searchUrl is the selected database's data-search-uri attribute, if set; otherwise it's /dbname/.
                var searchUrl = $("option:selected", db[0]).attr('data-search-uri') || ("/" + db[0].value + "/");
                
                var termParam = 
                    (term[0].value.replace(/^\s+/,'').length != 0) ?
                        "?term=" + encodeURIComponent(term[0].value).replace(/%20/,'+') : 
                        "";
                        
                return searchUrl + termParam;
            }
        }
        
        function searchUrl() {
            // If the user has overridden the URL function:
            var url = "";
            if (typeof(NCBISearchBar_customSearchUrl) != "undefined") {
                url = NCBISearchBar_customSearchUrl();
            }
            if (!url) {
                url = defaultSearchUrl();
            }
            return url;
        }
        
        // Handle search submit request
        function do_search() {
        
            var form = $('#entrez-search-form');
            
            // Disable crap portal-injected parameters so they are not sent to search URI
            $('input[type="hidden"][name^="p$"]', form).each(function() {
                $(this).attr('disabled', 'disabled');
            });
            
            // Get new search URL with term, etc.
            var search_url = searchUrl();

            // Log request            
            search_ping();

            // Use POST for big things, GET for everything else
            if (search_url.length > 2000) {
                form.attr('method','POST');
                form.attr('action',search_url.replace(/\?.*/,''));
            } else {
                window.location = search_url;
                return false;
            }
            return true;
        }
        
        // Copied from Entrez...
        function search_ping() {
	        var cVals = ncbi.sg.getInstance()._cachedVals;
	
	        var searchDetails = {}
	        searchDetails["jsEvent"] = "search";
	        
	        var app = cVals["ncbi_app"];
	        var db = cVals["ncbi_db"];
	        var pd = cVals["ncbi_pdid"];
	        var pc = cVals["ncbi_pcid"];
	        
	        var sel = document.getElementById("entrez-search-db");
	        var searchDB = sel.options[sel.selectedIndex].value;
	        var searchText = document.getElementById("term").value;
	        
	        if( app ){ searchDetails["ncbi_app"] = app.value; }
	        if( db ){ searchDetails["ncbi_db"] = db.value; }
	        if( pd ){ searchDetails["ncbi_pdid"] = pd.value; }
	        if( pc ){ searchDetails["ncbi_pcid"] = pc.value; }
	        if( searchDB ){ searchDetails["searchdb"] = searchDB;}
	        if( searchText ){ searchDetails["searchtext"] = searchText;}
	        
	        ncbi.sg.ping(searchDetails);
        }
        
        // User function NCBISearchBar_handle_autocomp(), if defined, must handle search request, including submit, if any
        function autocomp_select(event, sgData) {
           var term = $('#term');
           if (typeof(NCBISearchBar_handle_autocomp) != 'undefined') {
              NCBISearchBar_handle_autocomp(event, sgData);
           } else {
              if (!term.val().trim()) {
                 $('#term').val(sgData.optionSelected||sgData.userTyped);
              }
              
              // Only explicitly trigger submit if user didn't.
              if (sgData.optionIndex >= 0) {
                 $('#entrez-search-form').submit();
              }
           }
        }

        $(document).ready(function() {

            var db = $('#entrez-search-db');
            var term = $('#term');
            var form = $('#entrez-search-form');

            db.removeAttr('disabled'); // Reenable if this is backbutton
            
            // Handle autocomplete events
            term.bind("ncbiautocompleteenter", autocomp_select ).bind("ncbiautocompleteoptionclick", autocomp_select );
            
            // If form is submitted, handle POST (if necessary) and logging.
            form.submit(do_search);
            
            // Turn autocomplete on or off depending on whether the new database
            // has an autocomplete dict defined on the selected option.
            $('#entrez-search-db').change(function() {
               var acdict = $('#entrez-search-db option:selected').attr('data-ac-dict');
               if (acdict) {
                  $("#term").ncbiautocomplete("option","isEnabled",true).ncbiautocomplete("option","dictionary",acdict);
                  console.info("Setting autocomplete dictionary to " + acdict);
               } else {
                   console.info("Disabling autocomplete dictionary");
                  $("#term").ncbiautocomplete("turnOff");
               }
            });
          }); // End document.ready
    })(jQuery); // Close scope
};



