$(function() {

	/* Write the dialog html pop up */
	var dialogText = "The link provided below is for convenience only, and is not an endorsement of either the linked-to entity or any product or service";
	//$('#wrapper').after($('<div id="2ClickAlert"/>'));
	$('<div/>').appendTo($('body')).attr('id','2ClickAlert');
	$('#2ClickAlert').addClass('dialog').append('<p>' + dialogText + '</p>');
	/* End of Write */

		/* dialog options */
			$('.dialog').dialog({
				autoOpen: false,
				modal: true,
				title: 'Alert',
				resizable: false,
				show: 'fade',
				hide: 'fade',
				buttons: {                
	                "Cancel": function() {
	                    $(this).dialog("close");
					    return false;
	                },
	                "Proceed": function() {
	                    $(this).dialog("close");
					    window.open($(this).dialog('option', 'anchor'));
					    return true;
	                }
	            }
			});
			
			/* Trigger to open dialog */
			$('.twoclick').click(function(event){
					event.preventDefault();
					$('.dialog').dialog('option', 'anchor', $(this).attr('href'));
		            $('.dialog').dialog('open');
		            $('.ui-dialog button:first-child').removeClass('ui-state-focus');
		            //return false;		
							
			});
			
			
});
