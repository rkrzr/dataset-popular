var W_Helpful = (function () {

	var TRACKER_URL = new Array();
	TRACKER_URL.push('http://webapps.dol.gov/FSPublic/Data.mvc/Log');
	TRACKER_URL.push('/pls/oshaweb/helpful_data.html');
	var Display_ = '<div id="W_Helpful">'
		+ '<input type="hidden" id="ResponseYesNo" name="ResponseYesNo" value="" />'
		+ '<div id="W_Helpful_question_Div"><div class="W_Helpful_message">'
		+ '<img src="//www.dol.gov/images/page-rating-star.gif" alt="Feedback Star" id="W_Helpful_Star" />'
		+ '<a href="javascript:void(0)" id="W_Helpful_question_Link" title="Click here to give your feedback about this page"><strong>Was this page helpful?</strong></a></div></div>'

		+ '<div id="W_Helpful_yesORno"  style="display:none;">'
		+ '<div id="W_Helpful_yes"><input type="checkbox" id="W_Helpful_accurate-yes" />'
		+ '<label  id="xyzYes" for="W_Helpful_accurate-yes">Yes</label></div>'

		+ '<div id="W_Helpful_no"><input type="checkbox" id="W_Helpful_accurate-no" />'
		+ '<label id="xyzNo" for="W_Helpful_accurate-no">No</label></div>'

		+ '</div>'
		+ '<form>'
		+ '<div id="W_Helpful_comment" style="display:none;">'
		+ '<div class="W_Helpful_message" id="W_Helpful_message"><p><label for="W_Helpful_helpful-input">How can we make better? <br />(250 Character max.)</label></p></div><br />'
		+ '<textarea id="W_Helpful_helpful-input"></textarea>'
		+ '<p><input id="W_Helpful_comment-submit" type="button" value="Submit"/>&nbsp&nbsp<input id="W_Helpful_comment-skip" type="button" value="Skip"/></p>'
		+ '<hr /><p class="feedback">We are collecting this info under OMB clearance number <br/>1225-0059</p>'
		+ '</div>'
		+ '</form>'

		+ '<div id="W_Helpful_confirm" style="display:none;">'
		+ '<p class="feedback" id="FBResponse" tabindex="0" role="alert" data-valmsg-summary="true"><strong>Thank you for your feedback!</strong></p>'
		+ '<p class="feedback">Please <a href="http://www.dol.gov/dol/contact/" style="text-decoration:underline;">Contact Us</a> if you have any other comments or questions!</p>'
		+ '<div id="W_Helpful_Close-Confirmation"><p class="feedback">x <a href="javascript:document.url" id="w_Helpful_Close" style="text-decoration:underline;">Close</a></p></div>'
		+ '</div>'

		+ '</div>';

	var Display_UI = function (prependTo, after) {
		if (after) {
			$(prependTo).prepend(Display_);
		} else {
			$(prependTo).append(Display_);
		}
		$('#W_Helpful').show();
	}
	return {
		init: function (prependTo) {
			var attrName = location.hostname+location.pathname +".isSurveyComplete";
			if(sessionStorage && sessionStorage.getItem(attrName)) {	
				return;
			}
			
			Display_UI(prependTo);

			$('#W_Helpful_helpful-input').on('keyup', function(){
				var limit = 250
				var text = $('#W_Helpful_helpful-input').val();
				var chars = text.length;
				if(chars > limit) {
					var new_text = text.substr(0, limit);
					$('#W_Helpful_helpful-input').val(new_text);
				}
			});

			$('#W_Helpful_Close-Confirmation').on('click', function () {
				$('#W_Helpful_question_Div').removeAttr("style");
				var cssObj1 = {
					'cursor':'pointer'
					//'width':'170px',
					//'font-size':'12px'
				}
				$('#W_Helpful_question_Div').css(cssObj1);
				$('#W_Helpful_helpful-input').val('');
				$('#W_Helpful_accurate-yes').removeAttr('checked');
				$('#W_Helpful_accurate-no').removeAttr('checked');
				W_Helpful.Hide('#W_Helpful_confirm');
			});

			$('#W_Helpful_comment-skip').on('click', function () {
				W_Helpful.Show('#W_Helpful_confirm');
				W_Helpful.Hide('#W_Helpful_comment');
				setTimeout(function() { $('#FBResponse').attr('tabindex', 0).focus(); }, 1000); //ravi focus issue change from w_Helpful_Close to W_Helpful_confirm
				//$('#W_Helpful').remove();
				
				var attrName = location.hostname+location.pathname +".isSurveyComplete";
				if(sessionStorage) {
					sessionStorage.setItem(attrName,true);
				}
			});

			$("#W_Helpful_question_Link").bind( "click keydown", function (evt) {
				var charCode = (evt.which) ? evt.which : evt.keyCode
				if (charCode == '13' || charCode  == '0' || charCode == '1' || charCode == undefined) {
					var cookie_ls = document.cookie;
					if (cookie_ls.indexOf(document.location) < -1) {
						return;
					}
					evt.preventDefault();

					if( $('#W_Helpful_yesORno').is(':visible')) {
						W_Helpful.Hide('#W_Helpful_yesORno');
						var cssObj1 = {
							'cursor':'pointer'
							//'width':'170px',
							//'font-size':'12px'
						}
						$('#W_Helpful_question_Div').css(cssObj1);
						$('#W_Helpful_question_Div').removeAttr("style");
						return;
					}

					if( $('#W_Helpful_comment').is(':visible')) {
						return;
					}

					if( $('#W_Helpful_confirm').is(':visible')) {
						return;
					}
					
					//document.cookie = "ThisPageHasBeenReviewed=Yes";
					var cssObj3 = 
					{
						//'height':'15px',
						'cursor':'pointer'
						//'width':'170px',
						//'font-size':'12px',
						//'border': '1px solid #D8D5D4',
						//'background-color':'#FAF8CC'
					}
			
					$('#W_Helpful_question_Div').css(cssObj3); 

					W_Helpful.Show('#W_Helpful_yesORno');

					setTimeout(function() { $('#W_Helpful_accurate-yes').focus(); }, 1000);
				}
			});

			$('#W_Helpful_accurate-yes').bind( "click keydown", function (evt) {
				var charCode = (evt.which) ? evt.which : evt.keyCode
				if (charCode == '13' || charCode  == '0' || charCode == '1' || charCode == undefined) 
				{
					document.cookie = window.location.href;
					//alert(window.location.href + " from " + document.referrer + "; path=/;")
					$('#ResponseYesNo').val('yes');
					W_Helpful.Hide('#W_Helpful_yesORno');
					$("#W_Helpful_message").html("<label for=W_Helpful_helpful-input><strong>Great, can we make it even better?</strong><br />(250 Character max.)</label>");
					W_Helpful.TakeResponse('yes', '', 'q');
					W_Helpful.Show('#W_Helpful_comment');
					setTimeout(function() { $('#W_Helpful_helpful-input').focus(); }, 1000);
				}
			});

			$('#W_Helpful_accurate-no').bind( "click keydown", function (evt) {
				var charCode = (evt.which) ? evt.which : evt.keyCode
				if (charCode == '13' || charCode  == '0' || charCode == '1' || charCode == undefined) 
				{
					document.cookie = window.location.href;
					$("#W_Helpful_message").html("<label for=W_Helpful_helpful-input><strong>How can we make it better?</strong> <br />(250 Character max.)</label>");
					$('#ResponseYesNo').val('no');
					W_Helpful.Hide('#W_Helpful_yesORno');
					W_Helpful.TakeResponse('no', '', 'q');
					W_Helpful.Show('#W_Helpful_comment');
					setTimeout(function() { $('#W_Helpful_helpful-input').focus(); }, 1000);
				}
			});

			$('#W_Helpful_comment-submit').on('click', function () {
				if (jQuery.trim($('#W_Helpful_helpful-input').val()) != '') {
					W_Helpful.TakeResponse($('#ResponseYesNo').val(), $('#W_Helpful_helpful-input').val(), 'c');
				}
				W_Helpful.Hide('#W_Helpful_comment');
				W_Helpful.Show('#W_Helpful_confirm');
				setTimeout(function() { $('#FBResponse').attr('tabindex', 0).focus(); }, 1000); //Ravi changes from w_Helpful_Close to W_Helpful_confirm
				$('#W_Helpful').remove();
				
				var attrName = location.hostname+location.pathname +".isSurveyComplete";
				if(sessionStorage) {
					sessionStorage.setItem(attrName,true);
				}
			});
		},
		TakeResponse: function (quest, commt, PostType) {
			for (var i = 0; i < TRACKER_URL.length; i++){
				var logTo = TRACKER_URL[i];
				var pageUrl = document.URL;
				if (typeof XDomainRequest != 'undefined') {
					//alert("?dolurl=" + pageUrl + "&question=" + quest + "&suggestion=" + commt + "&posttype=" + PostType);
					var xdr = new XDomainRequest();
					xdr.open("GET", logTo + "?question=" + quest + "&suggestion=" + commt + "&posttype=" + PostType + "&dolurl=" + pageUrl);
					xdr.send();
					xdr.onload = function () {/*alert('Checking IE Response');*/}
				} else {
					$.getJSON(logTo, { dolurl: pageUrl, question: quest, suggestion: commt, posttype: PostType });
				}
			}
		},
		Hide: function (selector) {
			$(selector).slideUp('slow');
		},
		Show: function (selector) {
			$(selector).slideDown('slow');
		}
	}
})();
	