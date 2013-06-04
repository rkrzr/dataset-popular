$(function() {

	var requestcount = 0;
	var jscroll = '';
	var api = '';
	var n = 0;
	
	var requestcount1 = 0;
	var q = 0;
 
    $( "#search-q" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "/support/predictivesearch/results.cfm",
          dataType: "json",
          data: {
          dest_id:0,
          term: request.term
          },
          success: function( data ) {
          	requestcount = data.items.length;
            response( $.map( data.items, function( item ) {
              return {label: __highlight(item.label, request.term),
                    value: item.value};
            }));
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) { 
          	//console.log("error");
                  //  console.log("Status: " + textStatus); 
                  //  console.log("Error: " + errorThrown); 
                } 
        });
      },
      minLength: 3,
      delay: 500,
      select: function( event, ui ) {
      	event.preventDefault();
      	$( "#search-q" ).val(ui.item.text);
		window.location =ui.item.value.replace("http://www.fodors.com/","/"); 
      },
      
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        window.autocomplete = true;
        if(requestcount > 10) {
             $("#ui-id-1.ui-autocomplete").addClass("autocomplete-scroll");
        	 $("#ui-id-1.ui-autocomplete").removeClass("autocomplete-padding");
	        if(n == 0) {
	        	n = 1;
	        	//console.log('initialize jscrollPane search');
	        	$("#ui-id-1.ui-autocomplete").jScrollPane({
	    			
	    		});
	        } else {
	        	//console.log('reinitialize jscrollPane search');
	        	api = $("#ui-id-1.ui-autocomplete").data('jsp');
	    		api.reinitialise();
	        }
        	
        }  else {
        	  $("#ui-id-1.ui-autocomplete").removeClass("autocomplete-scroll");
              $("#ui-id-1.ui-autocomplete").addClass("autocomplete-padding");

        }
        //console.log($(window).width());
        if ( $(window).width() < 601) { 
        	//console.log("mobile");
            $("#ui-id-1.ui-autocomplete").addClass("ui-autocomplete-dim-mobile");
    	} else {
        	//console.log("desktop");
           		 $("#ui-id-1.ui-autocomplete").addClass("ui-autocomplete-dim");
    	}

        
      },
      close: function() {
          window.autocomplete = false;
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

      }
    }).data( "autocomplete" )._renderItem = renderElement;
    
   function __highlight(s, t) {
   t = t.replace('%','');
   t = t.replace('St ','St. ');
   t = t.replace('st ','st. ');
 
  var matcher = new RegExp("("+$.ui.autocomplete.escapeRegex(t)+")", "ig" );
  return s.replace(matcher, "<strong>$1</strong>");
}

if(document.getElementById('guidebook_text')){

	$( "#guidebook_text" ).autocomplete({
	      source: function( request, response ) {
	        $.ajax({
	          url: "/support/predictivesearch/guidebooks.cfm",
	          dataType: "json",
	          data: {
	          dest_id:0,
	          term: request.term
	          },
	          success: function( data ) {
	          	requestcount1 = data.items.length;
	            response( $.map( data.items, function( item ) {
	              return {label: __highlight(item.label, request.term),
	                    value: item.value};
	            }));
	          },
	          error: function(XMLHttpRequest, textStatus, errorThrown) { 
	          	//console.log("error");
	                //    console.log("Status: " + textStatus); 
	                 //   console.log("Error: " + errorThrown); 
	                } 
	        });
	      },
	      minLength: 3,
	      delay: 500,
	      select: function( event, ui ) {
	      	event.preventDefault();
	      	$( "#search-q" ).val(ui.item.text);
			window.location =ui.item.value; 
	      },
	      
	      open: function() {
	      	  window.autocomplete = true;
	        $( "#ui-id-2.ui-autocomplete" ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	        
	        if(requestcount1 > 10) {
	             $("#ui-id-2.ui-autocomplete").addClass("autocomplete-scroll");
	        	 $("#ui-id-2.ui-autocomplete").removeClass("autocomplete-padding");
		        if(q == 0) {
		        	//console.log('initialize jscrollPane guidebooks');
		        	q = 1;
		        	$("#ui-id-2.ui-autocomplete").jScrollPane({
		    			
		    		});
		        } else {
		        	//console.log('reinitialize jscrollPane guidebooks');
		        	api = $("#ui-id-2.ui-autocomplete").data('jsp');
		        	//console.log(api);
		    		api.reinitialise();
		        }
	        	
	        }  else {
	        	  $("#ui-id-2.ui-autocomplete").removeClass("autocomplete-scroll");
	              $("#ui-id-2.ui-autocomplete").addClass("autocomplete-padding");
	
	        }
	             
	            
				$("#ui-id-2.ui-autocomplete").addClass("ui-autocomplete-width");
        	
	
	
	      },
	      close: function() {
	      	  window.autocomplete = false;
	        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	
	      }
	    }).data( "autocomplete" )._renderItem = renderElement;
	    
	   function __highlight(s, t) {
	   t = t.replace('%','');
	   t = t.replace('St ','St. ');
	   t = t.replace('st ','st. ');
	  var matcher = new RegExp("("+$.ui.autocomplete.escapeRegex(t)+")", "ig" );
	  return s.replace(matcher, "<strong>$1</strong>");
	}

}

    function renderElement( ul, item ) {
                  // only change here was to replace .text() with .html()
                  return $( "<li></li>" )
                        .data( "item.autocomplete", item )
                        .append( $( "<a></a>" ).html(item.label) )
                        .appendTo( ul );
               
    }
    
    
    
    
$('body').mousedown(function(event) {
		
		if(event.target.id.indexOf("ui-id") == -1) {
			 if (window.autocomplete){
             $('#ui-id-1.ui-autocomplete').hide();
            setHiding();    
        	} 
		}
                     
    });

           
   

    
function setHiding(){
        // track whether the field has focus
        window.autocomplete = false;
       // hideResults();
    }

    /*
$( "#search-q" ).live("keyup",function(){
    	console.log($( "#search-q" ).val());
    });
*/
  });