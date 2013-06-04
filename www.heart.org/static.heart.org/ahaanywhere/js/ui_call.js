$(document).ready(function(){
		
	
	// Accordion - WCM Expandable Widget
	// $("#accordion").accordion({ header: "h3", autoHeight: false }) ;
	
	
	
	

	
	// Tabs
	$('#tabs').tabs({ fx: { opacity: 'toggle' } });
	$('#tabs2').tabs({ fx: { opacity: 'toggle' } }); /* Most Popular Tab Widget */
	
	
	$('#wcm_tabs2').tabs({ fx: { opacity: 'toggle' } }); /* Tabs for the WCM Widget */
	
/*
	$('#tabs3').tabs({ fx: { opacity: 'toggle' } });
	$('#tabs4').tabs({ fx: { opacity: 'toggle' } });
*/

	$('#ahatabs').tabs({ fx: { opacity: 'toggle' } });/* 	AHA Home page tabs */


	// Slider - Alert Box 
	$('#slider').slider({
		range: true,
		values: [17, 67]
	});
	
	
	//Funciton to remove borders on the NavWrapper
	$("ul.infoList li:last-child").children("a").children("span").addClass("noBorder");
	$("ul.orgList li:last-child").children("a").children("span").addClass("noBorder").addClass("noPadding");
	//End Navigation	
	$("ol.tablist li:last-child").addClass("noBorder");
	
	$('#whatsnew ol.whatsnewlist li:last-child').addClass('removeBorders');
	
	//ECC Every other li
	$('body.ecc #wrapper .content_wrapper #ahaContentRight div.popular_articles .widget_rightcontainer #tabs2 .ui-tabs-panel .tabdiv ol.tablist li:nth-child(odd)').addClass('odd');
	
	//removing the bottom border in the listWidget and rssWidget
	//added 12/3/2010
	$('.listWidget .widgetContent ul li:last-child').css("border-bottom","0");

	//Toggle Widget
	//Detect toggle widget exist
	//If yes
	//Add span with arrows
	//Date:08/08/2012
	var toggleWidgetExist = $('.toggleWidget').length;
	if(toggleWidgetExist > 0){
		var spanArrowHTML = "<span class='ui-icon ui-icon-triangle-1-e'></span>";
		$('.toggleHeading').each(function(){
			$(this).addClass('ui-state-default');
			$(this).prepend(spanArrowHTML);
		});

		$('.toggleHeading .toggleOpen').hover(function(){
			//on
			$(this).parent().addClass('ui-state-hover');
		},
			function(){
			//off
			$(this).parent().removeClass('ui-state-hover');
		});


		$(".toggleWidget .toggleHeading a.toggleOpen").click(function(e){

		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next().slideToggle();

		if($(this).hasClass('active')){
			$(this).parent().addClass('ui-state-active');
			$(this).prev().removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
		}else{
			$(this).parent().removeClass('ui-state-active');
			$(this).prev().removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
		}

		});




	}//End Toggle

	//Audio Widget
	var audioWidgetExist = $('.audioWidget').length;
	if(audioWidgetExist > 0){
		$('.audioWidget li a').click(function(e){
			$('.audioWidget li').removeClass('currentTrack');
			$(this).parent().addClass('currentTrack');
		});
	}//end if



	
});


